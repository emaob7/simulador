import { questionsSemana3 } from './src/data/semana3/questions';
import * as fs from 'fs';

let output = '';
questionsSemana3.forEach(q => {
  output += `ID: ${q.id}\n`;
  output += `Tema: ${q.tema}\n`;
  output += `Subtema: ${q.subtema}\n`;
  output += `Text: ${q.text}\n`;
  output += `Explanation: ${q.explanation.substring(0, 200)}...\n`;
  output += `--------------------------------------------------\n`;
});

fs.writeFileSync('scratch_semana3_dump.txt', output, 'utf8');
console.log("Week 3 dump written to scratch_semana3_dump.txt. Total questions:", questionsSemana3.length);
