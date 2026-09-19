import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Question } from '../src/types';
import { WEEK_CATALOG, loadWeekQuestions } from '../src/data/weekCatalog';
import { extractExplanationsFromMarkdown } from './obsidian-explanation-parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vault = process.env.OBSIDIAN_VAULT || path.join(process.env.USERPROFILE || '', 'Documents', 'Banco_Preguntas_CONAREM');
const apply = process.argv.includes('--apply');

console.log('=== IMPORTADOR QUIRÚRGICO DE EXPLICACIONES DESDE OBSIDIAN ===');
console.log('Buscando en:', vault);

// 1. Extraer todas las explicaciones de Obsidian
const obsidianExplanations = new Map<string, string>();

function scanDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name.includes('Backup')) continue;
      scanDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('00') && !entry.name.startsWith('📜')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const [id, explanation] of extractExplanationsFromMarkdown(content)) obsidianExplanations.set(id, explanation);
    }
  }
}

scanDirectory(vault);
console.log(`Explicaciones extraídas de Obsidian: ${obsidianExplanations.size}`);

// 2. Actualizar quirúrgicamente solo el campo 'explanation' en questions.ts de cada semana
let totalUpdated = 0;

for (const definition of WEEK_CATALOG) {
  const w = definition.week;
  const filePath = path.join(root, 'src', 'data', `semana${w}`, 'questions.ts');
  if (!fs.existsSync(filePath)) continue;

  const questions = (await loadWeekQuestions(w)).map(question => ({ ...question }));

  let weekUpdated = 0;
  for (const q of questions) {
    const newExpl = obsidianExplanations.get(q.id);
    if (newExpl && newExpl !== q.explanation) {
      q.explanation = newExpl;
      weekUpdated++;
      totalUpdated++;
    }
  }

  // Guardar archivo formateado
  const fileContent = `import { Question } from '../../types';\n\nexport const questionsSemana${w}: Question[] = ${JSON.stringify(questions, null, 2)};\n`;
  if (apply && weekUpdated > 0) fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Semana ${w}: ${weekUpdated} explicaciones actualizadas con tablas y jerarquía.`);
}

console.log(`\n${apply ? 'Aplicadas' : 'Dry run'}: ${totalUpdated} explicaciones de ${WEEK_CATALOG.reduce((sum, week) => sum + week.count, 0)} preguntas.`);
