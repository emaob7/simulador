import assert from 'node:assert/strict';
import { extractExplanationsFromMarkdown } from './obsidian-explanation-parser';

const cases = [
  ['zollinger', 'El síndrome de Zollinger-Ellison conserva todo el texto.'],
  ['zika', 'La infección por Zika requiere seguimiento completo.'],
  ['pimz', 'El fenotipo PiMZ no debe cortarse en la Z final.'],
  ['end', 'Esta explicación termina al final del archivo sin separador.'],
] as const;

const markdown = cases.map(([id, explanation], index) =>
  `### Pregunta ${index + 1} (\`${id}\`)\n\n> [!tip] Explicación\n> **Respuesta:** \`A) prueba\`\n>\n> ${explanation}`,
).join('\n\n---\n\n');

const parsed = extractExplanationsFromMarkdown(markdown);
for (const [id, explanation] of cases) assert.equal(parsed.get(id), explanation);
assert.equal(parsed.size, cases.length);
console.log('Parser Obsidian: 4 casos correctos (Zollinger, Zika, PiMZ y fin de archivo).');
