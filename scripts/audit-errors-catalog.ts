import { pathToFileURL } from 'node:url';
import type { Question } from '../src/types';

export const EXPECTED_WEEK_COUNTS = [121, 109, 84, 74, 95, 94, 82, 104, 139, 141, 106, 80, 101, 294, 109, 99, 303, 163] as const;

export type AuditIssueCode =
  | 'answer-index-mismatch'
  | 'positional-reference'
  | 'letter-breakdown'
  | 'contaminated-question-text'
  | 'ocr-artifact'
  | 'invalid-correct-index'
  | 'duplicate-option';

export interface CatalogQuestion { week: number; question: Question }

export interface AuditIssue {
  code: AuditIssueCode;
  week: number;
  id: string;
  message: string;
  snippet: string;
}

export interface WeekAuditStats {
  week: number;
  count: number;
  discrepancies: number;
  positionalReferences: number;
  breakdowns: number;
  contaminatedTexts: number;
  ocrArtifacts: number;
  invalidIndices: number;
  duplicateOptions: number;
}

export interface CatalogAuditReport {
  totalQuestions: number;
  affectedQuestions: number;
  issueCounts: Record<AuditIssueCode, number>;
  weekStats: WeekAuditStats[];
  issues: AuditIssue[];
}

export const BLOCKING_ISSUE_CODES: readonly AuditIssueCode[] = [
  'answer-index-mismatch', 'positional-reference', 'letter-breakdown',
  'contaminated-question-text', 'ocr-artifact', 'invalid-correct-index', 'duplicate-option',
];

const POSITIONAL_REFERENCE_PATTERN = /\b(?:la\s+opci[oó]n|las\s+opciones)\s+[A-E]\b/i;
const CORRECT_ANSWER_LETTER_PATTERN = /\brespuesta\s+correcta\s*:\s*[A-E](?=\s*[).:])/i;
const LETTER_BREAKDOWN_PATTERN = /(?:^|\n|[•-])\s*\*{0,2}[A-E]\*{0,2}\s*[.:)]\s*(?:Correcta|Incorrecta|Falsa|Verdadera)\b/gim;
const CLAIMED_ANSWER_PATTERN = /(?:la\s+opci[oó]n|respuesta\s+correcta\s*:)\s*([A-E])\s*(?:es\s+la\s+correcta|\))/i;
const CONTAMINATED_TEXT_PATTERN = /^(?:\s|[#*_`>\-])*?(?:✅|❌|📚|🧠|🔍|ANÁLISIS|RESPUESTA\s+CORRECTA|CONCEPTOS\s+CLAVE|REPASO\s+ACTIVO|REFERENCIA)/i;
// “tinte ictérico” es terminología válida; solo bloqueamos la corrupción posicional conocida.
const OCR_ARTIFACT_PATTERN = /(?:\bopciones?\b[^.!?\n]{0,100}\btintes?\b|\bcyd\b)/i;

function emptyIssueCounts(): Record<AuditIssueCode, number> {
  return {
    'answer-index-mismatch': 0, 'positional-reference': 0, 'letter-breakdown': 0,
    'contaminated-question-text': 0, 'ocr-artifact': 0,
    'invalid-correct-index': 0, 'duplicate-option': 0,
  };
}

function snippet(value: string): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, 180);
}

function normalizeOption(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

export async function loadQuestionCatalog(): Promise<CatalogQuestion[]> {
  const catalog: CatalogQuestion[] = [];
  for (let week = 1; week <= EXPECTED_WEEK_COUNTS.length; week += 1) {
    const module = await import(`../src/data/semana${week}/questions.ts`);
    const weekQuestions = module[`questionsSemana${week}`] as Question[];
    for (const question of weekQuestions) catalog.push({ week, question });
  }
  return catalog;
}

export function auditQuestionCatalog(catalog: readonly CatalogQuestion[]): CatalogAuditReport {
  const issues: AuditIssue[] = [];
  const issueCounts = emptyIssueCounts();
  const weekStatsByWeek = new Map<number, WeekAuditStats>();

  for (let week = 1; week <= EXPECTED_WEEK_COUNTS.length; week += 1) {
    weekStatsByWeek.set(week, {
      week, count: catalog.filter(entry => entry.week === week).length,
      discrepancies: 0, positionalReferences: 0, breakdowns: 0, contaminatedTexts: 0,
      ocrArtifacts: 0, invalidIndices: 0, duplicateOptions: 0,
    });
  }

  const addIssue = (issue: AuditIssue) => {
    issues.push(issue);
    issueCounts[issue.code] += 1;
    const stats = weekStatsByWeek.get(issue.week);
    if (!stats) return;
    if (issue.code === 'answer-index-mismatch') stats.discrepancies += 1;
    if (issue.code === 'positional-reference') stats.positionalReferences += 1;
    if (issue.code === 'letter-breakdown') stats.breakdowns += 1;
    if (issue.code === 'contaminated-question-text') stats.contaminatedTexts += 1;
    if (issue.code === 'ocr-artifact') stats.ocrArtifacts += 1;
    if (issue.code === 'invalid-correct-index') stats.invalidIndices += 1;
    if (issue.code === 'duplicate-option') stats.duplicateOptions += 1;
  };

  for (const { week, question } of catalog) {
    const explanation = question.explanation || '';
    const options = question.options || [];
    const index = question.correctOptionIndex;

    if (!Number.isInteger(index) || index < 0 || index >= options.length) {
      addIssue({ code: 'invalid-correct-index', week, id: question.id,
        message: `correctOptionIndex=${index} no apunta a una de las ${options.length} opciones.`, snippet: snippet(question.text) });
    }

    const optionIndicesByText = new Map<string, number[]>();
    options.forEach((option, optionIndex) => {
      const normalized = normalizeOption(option);
      const indices = optionIndicesByText.get(normalized) || [];
      indices.push(optionIndex);
      optionIndicesByText.set(normalized, indices);
    });
    for (const [normalized, indices] of optionIndicesByText) {
      if (normalized && indices.length > 1) {
        addIssue({ code: 'duplicate-option', week, id: question.id,
          message: `La misma opción aparece en las posiciones ${indices.map(value => String.fromCharCode(65 + value)).join(', ')}.`,
          snippet: snippet(options[indices[0]]) });
      }
    }

    if (POSITIONAL_REFERENCE_PATTERN.test(explanation) || CORRECT_ANSWER_LETTER_PATTERN.test(explanation)) {
      addIssue({ code: 'positional-reference', week, id: question.id,
        message: 'La explicación depende de una letra de opción.', snippet: snippet(explanation) });
    }

    const breakdownCount = [...explanation.matchAll(LETTER_BREAKDOWN_PATTERN)].length;
    if (breakdownCount >= 2) {
      addIssue({ code: 'letter-breakdown', week, id: question.id,
        message: `La explicación contiene un desglose posicional de ${breakdownCount} opciones.`, snippet: snippet(explanation) });
    }

    const claim = explanation.match(CLAIMED_ANSWER_PATTERN);
    if (claim && Number.isInteger(index) && index >= 0 && index < options.length) {
      const claimedIndex = claim[1].toUpperCase().charCodeAt(0) - 65;
      if (claimedIndex !== index) {
        addIssue({ code: 'answer-index-mismatch', week, id: question.id,
          message: `La explicación declara ${claim[1].toUpperCase()}, pero correctOptionIndex apunta a ${String.fromCharCode(65 + index)}.`,
          snippet: snippet(question.text) });
      }
    }

    if (CONTAMINATED_TEXT_PATTERN.test(question.text)) {
      addIssue({ code: 'contaminated-question-text', week, id: question.id,
        message: 'El enunciado comienza con contenido propio de una explicación.', snippet: snippet(question.text) });
    }

    const artifactSource = `${question.text}\n${explanation}\n${options.join('\n')}`;
    const artifact = artifactSource.match(OCR_ARTIFACT_PATTERN);
    if (artifact) {
      addIssue({ code: 'ocr-artifact', week, id: question.id,
        message: `Se detectó el artefacto textual “${artifact[0]}”.`, snippet: snippet(artifactSource) });
    }
  }

  issues.sort((left, right) => left.week - right.week || left.id.localeCompare(right.id) || left.code.localeCompare(right.code));
  return {
    totalQuestions: catalog.length,
    affectedQuestions: new Set(issues.map(issue => `${issue.week}:${issue.id}`)).size,
    issueCounts, weekStats: [...weekStatsByWeek.values()], issues,
  };
}

export function getBlockingIssues(report: CatalogAuditReport): AuditIssue[] {
  return report.issues.filter(issue => BLOCKING_ISSUE_CODES.includes(issue.code));
}

export function formatAuditReport(report: CatalogAuditReport): string {
  const lines = [
    '========================================================================',
    `REPORTE DE AUDITORÍA: ${report.totalQuestions} PREGUNTAS (18 SEMANAS)`,
    '========================================================================', '',
    'Semana | Total | Discrep. | Posicional | Desglose | Contam. | OCR | Índice | Duplic.',
    '------------------------------------------------------------------------',
  ];
  for (const stats of report.weekStats) {
    lines.push(`Sem ${String(stats.week).padEnd(2)}  | ${String(stats.count).padEnd(5)} | ${String(stats.discrepancies).padEnd(8)} | ${String(stats.positionalReferences).padEnd(10)} | ${String(stats.breakdowns).padEnd(8)} | ${String(stats.contaminatedTexts).padEnd(7)} | ${String(stats.ocrArtifacts).padEnd(3)} | ${String(stats.invalidIndices).padEnd(6)} | ${stats.duplicateOptions}`);
  }
  lines.push('------------------------------------------------------------------------', `Preguntas afectadas: ${report.affectedQuestions}`,
    ...Object.entries(report.issueCounts).map(([code, count]) => `${code}: ${count}`), '', 'DETALLE:',
    ...report.issues.map(issue => `- Sem ${issue.week} [${issue.id}] ${issue.code}: ${issue.message}`));
  return lines.join('\n');
}

async function main() {
  const report = auditQuestionCatalog(await loadQuestionCatalog());
  console.log(process.argv.includes('--json') ? JSON.stringify(report, null, 2) : formatAuditReport(report));
}

const entryPoint = process.argv[1] ? pathToFileURL(process.argv[1]).href : '';
if (import.meta.url === entryPoint) {
  main().catch(error => { console.error(error); process.exitCode = 1; });
}
