import { questionsSemana7 } from './src/data/semana7/questions';
import * as fs from 'fs';

let output = '';
questionsSemana7.forEach(q => {
  output += `ID: ${q.id}\n`;
  output += `Tema: ${q.tema}\n`;
  output += `Subtema: ${q.subtema}\n`;
  output += `Text: ${q.text}\n`;
  output += `Explanation: ${q.explanation.substring(0, 200)}...\n`;
  output += `--------------------------------------------------\n`;
});

fs.writeFileSync('scratch_semana7_dump.txt', output, 'utf8');
console.log("Week 7 dump written to scratch_semana7_dump.txt. Total questions:", questionsSemana7.length);
