import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Question } from '../src/types';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const semana18Path = path.join(root, 'src', 'data', 'semana18', 'questions.ts');
const newQuestionsJsonPath = path.join(root, 'scripts', 'neuro-part2-parsed.json');

const newQuestions: Question[] = JSON.parse(fs.readFileSync(newQuestionsJsonPath, 'utf8'));
console.log(`Cargadas ${newQuestions.length} preguntas nuevas para Neurología.`);

// Load existing questions
const mod = await import('../src/data/semana18/questions');
const existingQuestions = mod.questionsSemana18 as Question[];
console.log(`Semana 18 actual tiene ${existingQuestions.length} preguntas.`);

// Filter out any that might already exist by ID
const existingIds = new Set(existingQuestions.map(q => q.id));
const toAdd = newQuestions.filter(q => !existingIds.has(q.id));
console.log(`Preguntas a agregar: ${toAdd.length}`);

const combined = [...existingQuestions, ...toAdd];
console.log(`Nuevo total de Semana 18: ${combined.length} preguntas.`);

// Write back to questions.ts
const content = `import { Question } from '../../types';\n\nexport const questionsSemana18: Question[] = ${JSON.stringify(combined, null, 2)};\n`;
fs.writeFileSync(semana18Path, content, 'utf8');

console.log('✅ questionsSemana18 actualizada exitosamente.');
