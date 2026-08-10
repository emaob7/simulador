import { questionsSemana1 } from './src/data/semana1/questions';
import { questionsSemana2 } from './src/data/semana2/questions';
import { questionsSemana3 } from './src/data/semana3/questions';
import { questionsSemana4 } from './src/data/semana4/questions';
import { questionsSemana5 } from './src/data/semana5/questions';
import { questionsSemana6 } from './src/data/semana6/questions';
import { questionsSemana7 } from './src/data/semana7/questions';
import { analyzeSubtema } from './src/utils/normalizer';

const weeks = [
  { s: 1, name: 'Neonatología', qs: questionsSemana1 },
  { s: 2, name: 'Endocrinología', qs: questionsSemana2 },
  { s: 3, name: 'Infecciones, cicatrización y piel', qs: questionsSemana3 },
  { s: 4, name: 'Anatomía, trastornos anatómicos y prolapsos de órganos pélvicos', qs: questionsSemana4 },
  { s: 5, name: 'Nutrición, desnutrición y antropometría', qs: questionsSemana5 },
  { s: 6, name: 'Oncohematología y Cuidados Críticos', qs: questionsSemana6 },
  { s: 7, name: 'Traumatismos y Quemaduras', qs: questionsSemana7 },
];

function testAnalyzeSubtema(
  rawSubtema: string | undefined,
  materia?: string,
  _semana?: number | string,
  questionText?: string,
  questionId?: string
) {
  return analyzeSubtema(rawSubtema, materia, _semana, questionText, questionId);
}

weeks.forEach(({ s, name, qs }) => {
  const subtemas = new Set<string>();
  qs.forEach(q => {
    if (q.subtema) {
      const { normalizado } = testAnalyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
      subtemas.add(normalizado);
    }
  });

  console.log(`\n=== Semana ${s}: ${name} ===`);
  const groups: Record<string, string[]> = {};
  Array.from(subtemas).sort().forEach(st => {
    const { grupo } = testAnalyzeSubtema(st, qs[0].materia, s);
    const groupName = grupo || 'Otros Trastornos';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(st);
  });

  Object.entries(groups).sort().forEach(([groupName, subItems]) => {
    console.log(`  Group: "${groupName}"`);
    console.log(`    Subtemas: ${JSON.stringify(subItems)}`);
  });
});
