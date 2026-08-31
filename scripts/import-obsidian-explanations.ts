import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Question } from '../src/types';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vault = path.join(process.env.USERPROFILE || '', 'Documents', 'Banco_Preguntas_CONAREM');

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
      const blocks = content.split(/\n(?=###\s+Pregunta\s+\d+\s*\(`|\bPregunta\s+\d+\s*\(`)/);
      for (const block of blocks) {
        const idMatch = block.match(/\(`([a-zA-Z0-9_-]+)`\)/);
        if (!idMatch) continue;
        const qId = idMatch[1];

        // Extraer bloque [!tip]
        const tipMatch = block.match(/>\s*\[!tip\][^\n]*\n([\s\S]*?)(?=\n>\s*\[!quote\]|\n---\s*\n|\Z)/);
        if (tipMatch) {
          const rawTip = tipMatch[1];
          const cleanLines = rawTip.split('\n').map(line => {
            if (line.startsWith('> ')) return line.slice(2);
            if (line.startsWith('>')) return line.slice(1);
            return line;
          });

          let cleanExpl = cleanLines.join('\n').trim();
          cleanExpl = cleanExpl.replace(/^\*\*Respuesta:\*\*\s*`[^`]*`\s*/, '').trim();
          cleanExpl = cleanExpl.replace(/^[Rr]espuesta\s+correcta[:\s]*[^\n]*\n/, '').trim();
          
          if (cleanExpl.length > 10) {
            obsidianExplanations.set(qId, cleanExpl);
          }
        }
      }
    }
  }
}

scanDirectory(vault);
console.log(`Explicaciones extraídas de Obsidian: ${obsidianExplanations.size}`);

// 2. Actualizar quirúrgicamente solo el campo 'explanation' en questions.ts de cada semana
let totalUpdated = 0;

for (let w = 1; w <= 18; w++) {
  const filePath = path.join(root, 'src', 'data', `semana${w}`, 'questions.ts');
  if (!fs.existsSync(filePath)) continue;

  const mod = await import(`../src/data/semana${w}/questions.ts`);
  const questions = mod[`questionsSemana${w}`] as Question[];

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
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Semana ${w}: ${weekUpdated} explicaciones actualizadas con tablas y jerarquía.`);
}

console.log(`\n🎉 Total de explicaciones sincronizadas al simulador: ${totalUpdated} de 2298`);
