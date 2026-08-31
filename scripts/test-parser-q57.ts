import { questionsSemana10 } from '../src/data/semana10/questions';
import { parseExplanation } from '../src/utils/explanationParser';

const q57 = questionsSemana10.find(q => q.id === 'semana10_cardio_q57');
if (q57) {
  console.log("=== PARSEO DE Q57 (EJE ELÉCTRICO) ===");
  const sections = parseExplanation(q57.explanation);
  sections.forEach(s => {
    console.log(`\n--- SECCIÓN: [${s.title}] ---`);
    console.log(s.rawText);
  });
}
