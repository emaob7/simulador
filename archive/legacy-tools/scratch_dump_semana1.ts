import { questionsSemana1 } from './src/data/semana1/questions';
import * as fs from 'fs';

let output = '';
questionsSemana1.forEach(q => {
  output += `ID: ${q.id}\n`;
  output += `Materia: ${q.materia}\n`;
  output += `Tema: ${q.tema}\n`;
  output += `Subtema: ${q.subtema}\n`;
  output += `Text: ${q.text}\n`;
  output += `Explanation: ${q.explanation.substring(0, 200)}...\n`;
  output += `--------------------------------------------------\n`;
});

fs.writeFileSync('scratch_semana1_dump.txt', output, 'utf8');
console.log("Week 1 dump written to scratch_semana1_dump.txt. Total questions:", questionsSemana1.length);
