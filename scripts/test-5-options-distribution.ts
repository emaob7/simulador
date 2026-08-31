import { shuffleQuestionOptions } from '../src/utils/quizShuffler';
import type { Question } from '../src/types';

const q5: Question = {
  id: 'test_5_opts',
  text: 'Pregunta de prueba con 5 opciones',
  options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'],
  correctOptionIndex: 0,
  explanation: 'Prueba',
  materia: 'Medicina Interna',
  semana: 1,
  tema: 'Test'
};

const counts = [0, 0, 0, 0, 0];
const total = 50000;

for (let i = 0; i < total; i++) {
  const shuffled = shuffleQuestionOptions(q5);
  counts[shuffled.correctOptionIndex]++;
}

console.log("=== DISTRIBUCIÓN EN PREGUNTAS DE 5 OPCIONES (50.000 iteraciones) ===");
counts.forEach((c, idx) => {
  const letter = String.fromCharCode(65 + idx);
  const pct = ((c / total) * 100).toFixed(2);
  console.log(` • Opción ${letter}: ${c} veces (${pct}%)`);
});
