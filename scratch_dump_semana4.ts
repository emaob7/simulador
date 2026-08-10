import { questionsSemana4 } from './src/data/semana4/questions';
import * as fs from 'fs';

let output = '';
questionsSemana4.forEach(q => {
  output += `ID: ${q.id}\n`;
  output += `Tema: ${q.tema}\n`;
  output += `Subtema: ${q.subtema}\n`;
  output += `Text: ${q.text}\n`;
  output += `Explanation: ${q.explanation.substring(0, 200)}...\n`;
  output += `--------------------------------------------------\n`;
});

fs.writeFileSync('scratch_semana4_dump.txt', output, 'utf8');
console.log("Week 4 dump written to scratch_semana4_dump.txt. Total questions:", questionsSemana4.length);
