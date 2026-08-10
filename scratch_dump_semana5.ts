import { questionsSemana5 } from './src/data/semana5/questions';
import * as fs from 'fs';

let output = '';
questionsSemana5.forEach(q => {
  output += `ID: ${q.id}\n`;
  output += `Materia: ${q.materia}\n`;
  output += `Tema: ${q.tema}\n`;
  output += `Subtema: ${q.subtema}\n`;
  output += `Text: ${q.text}\n`;
  output += `Explanation: ${q.explanation.substring(0, 200)}...\n`;
  output += `--------------------------------------------------\n`;
});

fs.writeFileSync('scratch_semana5_dump.txt', output, 'utf8');
console.log("Week 5 dump written to scratch_semana5_dump.txt. Total questions:", questionsSemana5.length);
