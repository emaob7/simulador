import { shuffleQuestionOptions, shuffleQuizQuestions } from '../src/utils/quizShuffler';
import type { Question } from '../src/types';

const catalog: Question[] = [];
for (let week = 1; week <= 18; week += 1) {
  const module = await import(`../src/data/semana${week}/questions.ts`);
  catalog.push(...module[`questionsSemana${week}`] as Question[]);
}

if (catalog.length !== 2342) {
  throw new Error(`FAIL: El catálogo tiene ${catalog.length} preguntas; se esperaban 2342.`);
}

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
  if (shuffled.explanation !== mockQ1.explanation) {
    throw new Error('FAIL: El shuffler modificó la explicación.');
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

console.log('--- TEST 5: Integridad de las 2.342 preguntas reales ---');
for (const question of catalog) {
  const originalOptions = [...question.options];
  const originalCorrectText = question.options[question.correctOptionIndex];
  const originalExplanation = question.explanation;
  const originalIndex = question.correctOptionIndex;

  if (originalCorrectText === undefined) {
    throw new Error(`FAIL [${question.id}]: correctOptionIndex fuera de rango.`);
  }

  for (let iteration = 0; iteration < 10; iteration += 1) {
    const shuffled = shuffleQuestionOptions(question);
    if (shuffled.options[shuffled.correctOptionIndex] !== originalCorrectText) {
      throw new Error(`FAIL [${question.id}]: la respuesta correcta cambió tras el shuffle ${iteration + 1}.`);
    }
    if (shuffled.explanation !== originalExplanation) {
      throw new Error(`FAIL [${question.id}]: la explicación fue reescrita tras el shuffle ${iteration + 1}.`);
    }
  }

  if (question.correctOptionIndex !== originalIndex || question.explanation !== originalExplanation) {
    throw new Error(`FAIL [${question.id}]: el objeto de origen fue mutado.`);
  }
  if (question.options.some((option, index) => option !== originalOptions[index])) {
    throw new Error(`FAIL [${question.id}]: las opciones de origen fueron mutadas.`);
  }
}
console.log('✅ TEST 5 PASADO: respuesta, explicación y objeto fuente íntegros en 23.420 shuffles.');

console.log('--- TEST 6: Integridad del quiz completo ---');
const originalById = new Map(catalog.map(question => [question.id, question]));
const shuffledQuiz = shuffleQuizQuestions(catalog);
if (shuffledQuiz.length !== catalog.length) throw new Error('FAIL: El shuffle alteró el total del catálogo.');
for (const shuffled of shuffledQuiz) {
  const original = originalById.get(shuffled.id);
  if (!original) throw new Error(`FAIL: El shuffle introdujo el ID desconocido ${shuffled.id}.`);
  if (shuffled.options[shuffled.correctOptionIndex] !== original.options[original.correctOptionIndex]) {
    throw new Error(`FAIL [${shuffled.id}]: respuesta incorrecta en shuffleQuizQuestions.`);
  }
  if (shuffled.explanation !== original.explanation) {
    throw new Error(`FAIL [${shuffled.id}]: explicación modificada en shuffleQuizQuestions.`);
  }
}
console.log('✅ TEST 6 PASADO: el quiz completo conserva IDs, respuestas y explicaciones.');

console.log('\n🎉 TODOS LOS TESTS DE SHUFFLER PASARON CON ÉXITO.');
