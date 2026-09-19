import { pathToFileURL } from 'node:url';
import type { Question } from '../src/types';
import { WEEK_CATALOG, loadWeekQuestions } from '../src/data/weekCatalog';

export type AuditSeverity = 'error' | 'warning';
export type AuditIssueCode =
  | 'invalid-correct-index'
  | 'duplicate-option'
  | 'option-prefix'
  | 'question-prefix'
  | 'contaminated-question-text'
  | 'glued-question-tail'
  | 'truncated-explanation'
  | 'quoted-answer-mismatch'
  | 'answer-index-mismatch'
  | 'ocr-artifact'
  | 'key-concentration'
  | 'positional-reference'
  | 'letter-breakdown';

export interface CatalogQuestion { week: number; question: Question }
export interface AuditIssue {
  code: AuditIssueCode;
  severity: AuditSeverity;
  week: number;
  id: string;
  message: string;
  snippet: string;
}
export interface WeekAuditStats { week: number; count: number; errors: number; warnings: number }
export interface CatalogAuditReport {
  totalQuestions: number;
  affectedQuestions: number;
  errorCount: number;
  warningCount: number;
  issueCounts: Record<AuditIssueCode, number>;
  weekStats: WeekAuditStats[];
  issues: AuditIssue[];
}

export const BLOCKING_ISSUE_CODES: readonly AuditIssueCode[] = [
  'invalid-correct-index', 'duplicate-option', 'option-prefix', 'question-prefix',
  'contaminated-question-text', 'glued-question-tail', 'truncated-explanation',
  'quoted-answer-mismatch', 'answer-index-mismatch', 'ocr-artifact',
];

const POSITIONAL_REFERENCE_PATTERN = /\b(?:la\s+opci[oó]n|las\s+opciones)\s+[A-E]\b/i;
const CORRECT_ANSWER_LETTER_PATTERN = /\brespuesta\s+correcta\s*:\s*([A-E])(?=\s*[).:])/i;
const LETTER_BREAKDOWN_PATTERN = /(?:^|\n|[•-])\s*\*{0,2}[A-E]\*{0,2}\s*[.:)]\s*(?:Correcta|Incorrecta|Falsa|Verdadera)\b/gim;
const QUESTION_PREFIX_PATTERN = /^\s*(?:pregunta|caso\s+cl[ií]nico)\s*\d+\s*[:.)-]?\s*/i;
const OPTION_PREFIX_PATTERN = /^\s*[a-e]\)\s+/i;
const CONTAMINATED_TEXT_PATTERN = /^\s*(?:ema|tema|subtema|m[oó]dulo)\s*:/i;
const EMBEDDED_METADATA_PATTERN = /(?:📖\s*Referencia:|(?:^|\n)\s*PREGUNTA\s+\d+\b|\bSubtema:\s*[^¿\n]{0,160}¿)/i;
const GLUED_QUESTION_TAIL_PATTERN = /(?:^|\n)\s*(?:pregunta|caso\s+cl[ií]nico)\s*\d+\b[\s\S]{0,700}(?:^|\n)\s*[a-e]\)\s+/im;
const TRUNCATED_EXPLANATION_PATTERN = /(?:s[ií]ndrome\s+de|divert[ií]culo\s+de|varicela-|\bVV|\bPiM)\s*[.*_`]*$/;
const OCR_ARTIFACT_PATTERN = /(?:\bopciones?\b[^.!?\n]{0,100}\btintes?\b|\bcyd\b)/i;
const NEGATIVE_STEM_PATTERN = /\b(?:excepto|incorrect[ao]s?|fals[ao]s?|no\s+(?:es|son|corresponde|incluye|se\s+considera))\b/i;
const ISSUE_CODES: readonly AuditIssueCode[] = [
  'invalid-correct-index', 'duplicate-option', 'option-prefix', 'question-prefix',
  'contaminated-question-text', 'glued-question-tail', 'truncated-explanation',
  'quoted-answer-mismatch', 'answer-index-mismatch', 'ocr-artifact',
  'key-concentration', 'positional-reference', 'letter-breakdown',
];

function emptyIssueCounts(): Record<AuditIssueCode, number> {
  return Object.fromEntries(ISSUE_CODES.map(code => [code, 0])) as Record<AuditIssueCode, number>;
}
function snippet(value: string): string { return value.replace(/\s+/g, ' ').trim().slice(0, 180); }
function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[“”"'`´]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}
function findOptionIndex(quote: string, options: readonly string[]): number {
  const normalizedQuote = normalize(quote);
  if (normalizedQuote.length < 5) return -1;
  return options.findIndex(option => {
    const normalizedOption = normalize(option);
    return normalizedOption === normalizedQuote
      || (Math.min(normalizedOption.length, normalizedQuote.length) >= 18
        && (normalizedOption.includes(normalizedQuote) || normalizedQuote.includes(normalizedOption)));
  });
}
function relevantQuotedAnswer(explanation: string, negativeStem: boolean): string | undefined {
  const desired = negativeStem ? 'incorrecta' : 'correcta';
  const labelFirst = new RegExp(`(?:\\*{0,2}${desired}\\*{0,2})\\s*:\\s*«([^»]+)»`, 'i').exec(explanation);
  if (labelFirst) return labelFirst[1];
  const quoteFirst = new RegExp(`«([^»]+)»\\s+(?:es|resulta|se\\s+considera)\\s+(?:la\\s+)?${desired}`, 'i').exec(explanation);
  return quoteFirst?.[1];
}
function batchPrefix(id: string): string { return id.replace(/\d+$/, ''); }

export async function loadQuestionCatalog(): Promise<CatalogQuestion[]> {
  const catalog: CatalogQuestion[] = [];
  for (const definition of WEEK_CATALOG) {
    const questions = await loadWeekQuestions(definition.week);
    catalog.push(...questions.map(question => ({ week: definition.week, question })));
  }
  return catalog;
}

export function auditQuestionCatalog(catalog: readonly CatalogQuestion[]): CatalogAuditReport {
  const issues: AuditIssue[] = [];
  const issueCounts = emptyIssueCounts();
  const weekStatsByWeek = new Map(WEEK_CATALOG.map(entry => [entry.week, { week: entry.week, count: 0, errors: 0, warnings: 0 }]));
  const addIssue = (issue: AuditIssue) => {
    issues.push(issue);
    issueCounts[issue.code] += 1;
    const stats = weekStatsByWeek.get(issue.week);
    if (stats) stats[issue.severity === 'error' ? 'errors' : 'warnings'] += 1;
  };

  for (const { week, question } of catalog) {
    const stats = weekStatsByWeek.get(week);
    if (stats) stats.count += 1;
    const explanation = question.explanation || '';
    const options = question.options || [];
    const index = question.correctOptionIndex;

    if (!Number.isInteger(index) || index < 0 || index >= options.length) {
      addIssue({ code: 'invalid-correct-index', severity: 'error', week, id: question.id,
        message: `correctOptionIndex=${index} no apunta a una de las ${options.length} opciones.`, snippet: snippet(question.text) });
    }

    const positionsByOption = new Map<string, number[]>();
    options.forEach((option, optionIndex) => {
      const normalized = normalize(option);
      const positions = positionsByOption.get(normalized) || [];
      positions.push(optionIndex);
      positionsByOption.set(normalized, positions);
      if (OPTION_PREFIX_PATTERN.test(option)) {
        addIssue({ code: 'option-prefix', severity: 'error', week, id: question.id,
          message: `La opción ${String.fromCharCode(65 + optionIndex)} conserva un prefijo a)–e).`, snippet: snippet(option) });
      }
    });
    for (const [normalized, positions] of positionsByOption) {
      if (normalized && positions.length > 1) {
        addIssue({ code: 'duplicate-option', severity: 'error', week, id: question.id,
          message: `La misma opción aparece en ${positions.map(value => String.fromCharCode(65 + value)).join(', ')}.`,
          snippet: snippet(options[positions[0]]) });
      }
    }

    if (QUESTION_PREFIX_PATTERN.test(question.text)) {
      addIssue({ code: 'question-prefix', severity: 'error', week, id: question.id,
        message: 'El enunciado conserva “Pregunta N” o “Caso clínico N”.', snippet: snippet(question.text) });
    }
    if (CONTAMINATED_TEXT_PATTERN.test(question.text) || EMBEDDED_METADATA_PATTERN.test(question.text)) {
      addIssue({ code: 'contaminated-question-text', severity: 'error', week, id: question.id,
        message: 'El enunciado comienza con metadatos de tema/subtema/módulo.', snippet: snippet(question.text) });
    }
    if (GLUED_QUESTION_TAIL_PATTERN.test(explanation)) {
      addIssue({ code: 'glued-question-tail', severity: 'error', week, id: question.id,
        message: 'La explicación contiene el comienzo y opciones de otra pregunta.', snippet: snippet(explanation) });
    }
    if (TRUNCATED_EXPLANATION_PATTERN.test(explanation.trim())) {
      addIssue({ code: 'truncated-explanation', severity: 'error', week, id: question.id,
        message: 'La explicación termina en una señal histórica de truncado antes de una Z.', snippet: snippet(explanation.slice(-220)) });
    }

    const quoted = relevantQuotedAnswer(explanation, NEGATIVE_STEM_PATTERN.test(question.text));
    if (quoted && Number.isInteger(index) && index >= 0 && index < options.length) {
      const quotedIndex = findOptionIndex(quoted, options);
      if (quotedIndex >= 0 && quotedIndex !== index) {
        addIssue({ code: 'quoted-answer-mismatch', severity: 'error', week, id: question.id,
          message: `La explicación cita la opción ${String.fromCharCode(65 + quotedIndex)}, pero la clave apunta a ${String.fromCharCode(65 + index)}.`,
          snippet: snippet(quoted) });
      }
    }

    const declaredLetter = explanation.match(CORRECT_ANSWER_LETTER_PATTERN)?.[1];
    if (declaredLetter && Number.isInteger(index) && index >= 0 && index < options.length) {
      const declaredIndex = declaredLetter.toUpperCase().charCodeAt(0) - 65;
      if (declaredIndex !== index) {
        addIssue({ code: 'answer-index-mismatch', severity: 'error', week, id: question.id,
          message: `La explicación declara ${declaredLetter.toUpperCase()}, pero la clave apunta a ${String.fromCharCode(65 + index)}.`, snippet: snippet(question.text) });
      }
    }

    if (POSITIONAL_REFERENCE_PATTERN.test(explanation) || CORRECT_ANSWER_LETTER_PATTERN.test(explanation)) {
      addIssue({ code: 'positional-reference', severity: 'warning', week, id: question.id,
        message: 'La explicación depende de una letra; quizShuffler debe conservar el orden.', snippet: snippet(explanation) });
    }
    const breakdownCount = [...explanation.matchAll(LETTER_BREAKDOWN_PATTERN)].length;
    if (breakdownCount >= 2) {
      addIssue({ code: 'letter-breakdown', severity: 'warning', week, id: question.id,
        message: `La explicación analiza ${breakdownCount} opciones por letra; se conserva el orden.`, snippet: snippet(explanation) });
    }

    const artifactSource = `${question.text}\n${explanation}\n${options.join('\n')}`;
    const artifact = artifactSource.match(OCR_ARTIFACT_PATTERN);
    if (artifact) {
      addIssue({ code: 'ocr-artifact', severity: 'error', week, id: question.id,
        message: `Se detectó el artefacto textual “${artifact[0]}”.`, snippet: snippet(artifactSource) });
    }
  }

  const batches = new Map<string, CatalogQuestion[]>();
  for (const entry of catalog) {
    const key = `${entry.week}:${batchPrefix(entry.question.id)}`;
    const batch = batches.get(key) || [];
    batch.push(entry);
    batches.set(key, batch);
  }
  for (const batch of batches.values()) {
    if (batch.length < 10) continue;
    const distribution = new Map<number, number>();
    batch.forEach(({ question }) => distribution.set(question.correctOptionIndex, (distribution.get(question.correctOptionIndex) || 0) + 1));
    const [dominantIndex, dominantCount] = [...distribution.entries()].sort((left, right) => right[1] - left[1])[0];
    const ratio = dominantCount / batch.length;
    if (ratio > 0.6) {
      addIssue({ code: 'key-concentration', severity: 'warning', week: batch[0].week, id: `${batchPrefix(batch[0].question.id)}*`,
        message: `${dominantCount}/${batch.length} claves (${(ratio * 100).toFixed(1)} %) caen en ${String.fromCharCode(65 + dominantIndex)}. Revisar contra la fuente.`,
        snippet: [...distribution.entries()].sort().map(([key, count]) => `${String.fromCharCode(65 + key)}=${count}`).join(', ') });
    }
  }

  issues.sort((left, right) => left.week - right.week || left.id.localeCompare(right.id) || left.code.localeCompare(right.code));
  return {
    totalQuestions: catalog.length,
    affectedQuestions: new Set(issues.map(issue => `${issue.week}:${issue.id}`)).size,
    errorCount: issues.filter(issue => issue.severity === 'error').length,
    warningCount: issues.filter(issue => issue.severity === 'warning').length,
    issueCounts,
    weekStats: [...weekStatsByWeek.values()],
    issues,
  };
}

export function getBlockingIssues(report: CatalogAuditReport): AuditIssue[] {
  return report.issues.filter(issue => issue.severity === 'error' && BLOCKING_ISSUE_CODES.includes(issue.code));
}
export function formatAuditReport(report: CatalogAuditReport): string {
  return [
    '========================================================================',
    `REPORTE DE AUDITORÍA: ${report.totalQuestions} PREGUNTAS (${WEEK_CATALOG.length} SEMANAS)`,
    '========================================================================', '',
    'Semana | Total | Errores | Alertas', '----------------------------------',
    ...report.weekStats.map(stats => `Sem ${String(stats.week).padEnd(2)}  | ${String(stats.count).padEnd(5)} | ${String(stats.errors).padEnd(7)} | ${stats.warnings}`),
    '----------------------------------',
    `Errores: ${report.errorCount}; alertas: ${report.warningCount}; preguntas/lotes afectados: ${report.affectedQuestions}`,
    ...Object.entries(report.issueCounts).filter(([, count]) => count > 0).map(([code, count]) => `${code}: ${count}`),
    '', 'DETALLE:',
    ...report.issues.map(issue => `- ${issue.severity.toUpperCase()} Sem ${issue.week} [${issue.id}] ${issue.code}: ${issue.message}`),
  ].join('\n');
}

async function main() {
  const report = auditQuestionCatalog(await loadQuestionCatalog());
  console.log(process.argv.includes('--json') ? JSON.stringify(report, null, 2) : formatAuditReport(report));
}
const entryPoint = process.argv[1] ? pathToFileURL(process.argv[1]).href : '';
if (import.meta.url === entryPoint) main().catch(error => { console.error(error); process.exitCode = 1; });
