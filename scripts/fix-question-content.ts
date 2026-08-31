import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import type { Question } from '../src/types';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const correctIndexOverrides: Record<string, number> = {
  gyo_s4_q58: 3,
  gyo_s4_q61: 3,
  gyo_s4_q66: 0,
  gyo_s4_q70: 0,
  mi_cardio_w_q104: 2,
  mi_cardio_w_q106: 0,
  mi_cardio_w_q107: 0,
  mi_cardio_w_q108: 2,
  mi_cardio_w_q109: 0,
  mi_cardio_w_q110: 0,
  mi_cardio_w_q111: 0,
  mi_cardio_w_q112: 1,
  mi_cardio_w_q113: 0,
  mi_cardio_w_q114: 1,
  mi_cardio_w_q115: 0,
  mi_cardio_w_q116: 0,
  mi_cardio_w_q117: 1,
  mi_cardio_w_q118: 0,
  mi_cardio_w_q120: 0,
  mi_cardio_w_q121: 0,
  mi_cardio_w_q122: 0,
  mi_cardio_w_q123: 0,
  mi_cardio_w_q124: 0,
  mi_cardio_w_q125: 0,
  mi_cardio_w_q126: 0,
  mi_cardio_w_q127: 1,
  mi_cardio_w_q128: 0,
  mi_cardio_w_q129: 0,
  mi_cardio_w_q130: 0,
  mi_cardio_w_q131: 0,
};

const cleanTextStarts: Record<string, string> = {
  gyo_s4_q41: '¿Cómo se denomina la línea de demarcación',
  gyo_s4_q44: 'Respecto a la anatomía del espacio superficial',
  gyo_s4_q52: 'Respecto a los ligamentos pélvicos',
  gyo_s4_q59: 'En relación con el desarrollo embriológico',
  gyo_s4_q61: 'Para diferenciar el género fenotípico',
  gyo_s4_q66: 'En relación con el exceso de andrógenos',
  gyo_s4_q68: 'En la clasificación de las anomalías',
  gyo_s4_q69: 'En relación con las anomalías de los conductos',
  mi_cardio_w_q110: '¿Cuál es el fármaco y el rango objetivo',
  mi_cardio_w_q124: '¿Cuál es el mecanismo de acción del cilostazol',
  mi_cardio_w_q128: '¿Cuál es la causa más común de muerte',
  cx_estomago_q78: '¿Qué tipo de úlcera gástrica se asocia',
  cx_estomago_q79: '¿Qué tipo de úlcera gástrica corresponde',
  cx_estomago_q80: '¿Qué tipo de úlcera gástrica se localiza',
  cx_estomago_q81: '¿Qué tipo de úlcera gástrica es inducida',
  cx_estomago_q83: 'Una mujer consulta por dolor urente',
  cx_estomago_q95: '¿Qué vitamina se relaciona',
  cx_estomago_q96: 'Alrededor del 10% de los adenocarcinomas',
  cx_estomago_q105: 'Un paciente con antecedente de cirugía gástrica',
  cx_estomago_q106: 'Un paciente presenta síndrome de evacuación gástrica',
};

function optionQuote(question: Question, letter: string): string {
  const index = letter.toUpperCase().charCodeAt(0) - 65;
  const option = question.options[index];
  return option ? `«${option.replace(/[.!?]+$/, '')}»` : 'La alternativa indicada';
}

function cleanExplanation(question: Question): string {
  let text = question.explanation || '';

  if (question.id === 'neo_docx_q59') {
    const leakStart = text.indexOf('\n\nema: NeonatologíaSubtema:');
    if (leakStart >= 0) text = text.slice(0, leakStart).trim();
  }

  // El artefacto OCR aparece en enumeraciones de opciones; "tinte ictérico" es legítimo.
  text = text
    .replace(/\bLas opciones\s+[^.\n]{0,35}\b(?:tinte|tintes|cyd|byd)\b/gi, 'Las demás alternativas')
    .replace(/\blas opciones\s+[^.\n]{0,35}\b(?:tinte|tintes|cyd|byd)\b/gi, 'las demás alternativas');

  // Desgloses explícitos: A: Correcta / B) Falsa, incluidos varios ítems en una línea.
  text = text.replace(
    /(^|\n|[•●○■◆▪▫-])\s*\*{0,2}([A-E])\*{0,2}\s*[.:)]\s*(Correcta|Incorrecta|Falsa|Verdadera)\b/gim,
    (_match, prefix: string, letter: string, verdict: string) =>
      `${prefix} **${optionQuote(question, letter)} — Afirmación ${verdict.toLowerCase()}**`,
  );

  // Cabeceras de respuesta correcta con letra fija.
  text = text.replace(
    /(?:✅\s*)?Respuesta\s+correcta\s*:\s*[A-E](?=\s*(?:[).:]|\n|$))\s*[).:]?\s*/gi,
    'Respuesta correcta: ',
  );

  // Referencias singulares: "la opción B" pasa a identificar el contenido semántico.
  text = text.replace(
    /\b(?:la\s+)?opci[oó]n\s+([A-E])\b\s*[).:]?/gi,
    (_match, letter: string) => optionQuote(question, letter),
  );

  // Enumeraciones de letras restantes que no contenían artefactos OCR.
  text = text.replace(
    /\bLas opciones\s+[A-E](?:\s*,\s*[A-E])+(?:\s*(?:y|e)\s*[A-E])?\b/gi,
    'Las demás alternativas',
  );
  text = text.replace(
    /\bLas opciones\s+[A-E]\s+(?:y|e)\s+[A-E]\b/gi,
    'Las demás alternativas',
  );
  text = text.replace(
    /\bLas opciones\s+[A-E]\)(?:\s*,\s*[A-E]\))*(?:\s*(?:y|e)\s*[A-E]\))?/gi,
    'Las demás alternativas',
  );
  text = text.replace(/»\)\s*/g, '» ');

  return text;
}

interface Edit {
  start: number;
  end: number;
  replacement: string;
}

let changedQuestions = 0;
let changedFiles = 0;

for (let week = 1; week <= 18; week += 1) {
  const module = await import(`../src/data/semana${week}/questions.ts`);
  const questions = module[`questionsSemana${week}`] as Question[];
  const file = path.join(root, 'src', 'data', `semana${week}`, 'questions.ts');
  let source = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const edits: Edit[] = [];
  const questionsById = new Map(questions.map((question) => [question.id, question]));

  const visit = (node: ts.Node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const properties = new Map<string, ts.PropertyAssignment>();
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
          ? property.name.text
          : undefined;
        if (name) properties.set(name, property);
      }

      const idProperty = properties.get('id');
      if (idProperty && ts.isStringLiteral(idProperty.initializer)) {
        const question = questionsById.get(idProperty.initializer.text);
        if (question) {
          const replacements: Record<string, unknown> = {};
          const start = cleanTextStarts[question.id];
          if (start) {
            const cleanStart = question.text.lastIndexOf(start);
            if (cleanStart < 0) throw new Error(`No se encontró el inicio limpio de ${question.id}`);
            replacements.text = question.text.slice(cleanStart).trim();
          }

          const newIndex = correctIndexOverrides[question.id] ?? question.correctOptionIndex;
          if (newIndex !== question.correctOptionIndex) replacements.correctOptionIndex = newIndex;

          const newExplanation = cleanExplanation(question);
          if (newExplanation !== question.explanation) replacements.explanation = newExplanation;

          for (const [field, value] of Object.entries(replacements)) {
            const property = properties.get(field);
            if (!property) throw new Error(`${question.id}: falta el campo ${field}`);
            edits.push({
              start: property.initializer.getStart(sourceFile),
              end: property.initializer.getEnd(),
              replacement: JSON.stringify(value),
            });
          }

          if (Object.keys(replacements).length > 0) changedQuestions += 1;
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  if (edits.length > 0) {
    for (const edit of edits.sort((a, b) => b.start - a.start)) {
      source = source.slice(0, edit.start) + edit.replacement + source.slice(edit.end);
    }
    fs.writeFileSync(file, source, 'utf8');
    changedFiles += 1;
  }
}

console.log(`Corrección aplicada: ${changedQuestions} preguntas en ${changedFiles} archivos.`);
