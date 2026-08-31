import { questionsSemana10 } from '../src/data/semana10/questions';
import { parseExplanation } from '../src/utils/explanationParser';

const q56 = questionsSemana10.find(q => q.id === 'semana10_cardio_q56');
if (q56) {
  console.log("=== ANTES DEL FIX ===");
  const sectionsBefore = parseExplanation(q56.explanation);
  sectionsBefore.forEach(s => {
    console.log(`\n--- SECCIÓN: [${s.title}] ---`);
    console.log(s.rawText);
  });
}
