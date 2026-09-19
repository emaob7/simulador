import assert from 'node:assert/strict';
import type { Question } from '../src/types';
import { auditQuestionCatalog, getBlockingIssues } from './audit-errors-catalog';

function question(id: string, patch: Partial<Question> = {}): Question {
  return {
    id,
    text: '¿Cuál es la afirmación correcta?',
    options: ['Primera opción', 'Segunda opción', 'Tercera opción', 'Cuarta opción'],
    correctOptionIndex: 0,
    explanation: '«Primera opción» es la correcta por la razón indicada.',
    materia: 'Pediatría', semana: 1, tema: 'Prueba', subtema: 'Prueba', module: 'Prueba',
    ...patch,
  };
}

const catalog = [
  question('test_q01', { options: ['a) prefijo residual', 'B', 'C', 'D'] }),
  question('test_q02', { text: 'Pregunta 1. ¿Qué corresponde?' }),
  question('test_q03', { explanation: 'Explicación válida.\nPregunta 2\na) Uno\nb) Dos' }),
  question('test_q04', { explanation: 'La explicación termina en síndrome de' }),
  question('test_q05', { correctOptionIndex: 1, explanation: '«Primera opción» es la correcta.' }),
  question('test_q06', {
    text: 'Todas son verdaderas, EXCEPTO:', correctOptionIndex: 1,
    explanation: '**Incorrecta:** «Segunda opción» — contradice el enunciado.',
  }),
  ...Array.from({ length: 10 }, (_, index) => question(`biased_q${String(index + 10).padStart(2, '0')}`, {
    correctOptionIndex: index < 7 ? 0 : index - 6,
    explanation: 'Explicación sin citas posicionales.',
  })),
].map(item => ({ week: 1, question: item }));

const report = auditQuestionCatalog(catalog);
const errors = getBlockingIssues(report);
for (const code of ['option-prefix', 'question-prefix', 'glued-question-tail', 'truncated-explanation', 'quoted-answer-mismatch']) {
  assert(errors.some(issue => issue.code === code), `Falta detectar ${code}`);
}
assert(!errors.some(issue => issue.id === 'test_q06' && issue.code === 'quoted-answer-mismatch'), 'EXCEPTO legítima no debe marcarse');
assert(report.issues.some(issue => issue.code === 'key-concentration' && issue.severity === 'warning'));
console.log('Auditor del catálogo: errores estructurales, EXCEPTO legítima y alerta >60 % verificados.');
