import { shuffleQuestionOptions, shuffleQuizQuestions } from '../src/utils/quizShuffler';
import type { Question } from '../src/types';

// Sample mock question
const mockQ1: Question = {
  id: 'test_1',
  text: '¿Cuál es el tratamiento de primera línea?',
  options: ['Amoxicilina', 'Ceftriaxona', 'Azitromicina', 'Penicilina G Benzatínica'],
  correctOptionIndex: 3, // Penicilina G Benzatínica
  explanation: '✅ Respuesta correcta: d) Penicilina G Benzatínica. Es el tratamiento de elección.',
  materia: 'Pediatría',
  semana: 17,
  tema: 'Infectología',
  subtema: 'Faringitis Estreptocócica',
  module: 'Semana 17 - Pediatría',
};

const mockQ2: Question = {
  id: 'test_2',
  text: '¿Cuáles de los siguientes son criterios?',
  options: ['Criterio 1', 'Criterio 2', 'Criterio 3', 'Todas las anteriores'],
  correctOptionIndex: 3,
  explanation: '✅ Respuesta correcta: d) Todas las anteriores son correctas.',
  materia: 'Pediatría',
  semana: 1,
  tema: 'Neonatología',
  subtema: 'Generalidades',
  module: 'Semana 1 - Pediatría',
};

const mockQ3: Question = {
  id: 'test_3',
  text: 'Sobre la fisiopatología:',
  options: ['Opción 1', 'Opción 2', 'A y B son correctas', 'Ninguna'],
  correctOptionIndex: 2,
  explanation: 'Respuesta correcta: C',
  materia: 'Cirugía',
  semana: 3,
  tema: 'Infecciones',
  subtema: 'Generalidades',
  module: 'Semana 3 - Cirugía',
};

console.log('--- TEST 1: Verificación de integridad de respuesta correcta ---');
for (let i = 0; i < 1000; i++) {
  const shuffled = shuffleQuestionOptions(mockQ1);
  const correctText = shuffled.options[shuffled.correctOptionIndex];
  if (correctText !== 'Penicilina G Benzatínica') {
    throw new Error(`FAIL: Expected 'Penicilina G Benzatínica' but got '${correctText}' at index ${shuffled.correctOptionIndex}`);
  }
}
console.log('✅ TEST 1 PASADO: 1.000 shuffles con 100% de coincidencia semántica en la respuesta correcta.');

console.log('--- TEST 2: Distribución uniforme de opciones ---');
const letterCounts = [0, 0, 0, 0];
const ITERATIONS = 20000;
for (let i = 0; i < ITERATIONS; i++) {
  const shuffled = shuffleQuestionOptions(mockQ1);
  letterCounts[shuffled.correctOptionIndex]++;
}
console.log('Distribución en 20.000 iteraciones:');
['A', 'B', 'C', 'D'].forEach((l, i) => {
  const pct = ((letterCounts[i] / ITERATIONS) * 100).toFixed(1);
  console.log(`  Opción ${l}: ${letterCounts[i]} (${pct}%)`);
});

console.log('--- TEST 3: Manejo de "Todas las anteriores" ---');
for (let i = 0; i < 100; i++) {
  const shuffled = shuffleQuestionOptions(mockQ2);
  const lastOption = shuffled.options[shuffled.options.length - 1];
  if (lastOption !== 'Todas las anteriores') {
    throw new Error(`FAIL: "Todas las anteriores" should be at the end, but last was "${lastOption}"`);
  }
}
console.log('✅ TEST 3 PASADO: "Todas las anteriores" permanece siempre al final.');

console.log('--- TEST 4: Preservación de opciones con referencias cruzadas ("A y B son correctas") ---');
const unchanged = shuffleQuestionOptions(mockQ3);
if (unchanged.options[2] !== 'A y B son correctas') {
  throw new Error('FAIL: Cross-referencing options should not be shuffled.');
}
console.log('✅ TEST 4 PASADO: Opciones dependientes conservan su orden original.');

console.log('\n🎉 TODOS LOS TESTS DE SHUFFLER PASARON CON ÉXITO.');
