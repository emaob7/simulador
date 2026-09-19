import { questionsSemana1 } from './src/data/semana1/questions';
import { questionsSemana6 } from './src/data/semana6/questions';
import { analyzeSubtema } from './src/utils/normalizer';

// Define a test version of analyzeSubtema that behaves like our proposed change
function testAnalyzeSubtema(
  rawSubtema: string | undefined,
  materia?: string,
  _semana?: number | string,
  questionText?: string,
  questionId?: string
) {
  // Call the existing analyzeSubtema to get the module (since in our current normalizer, both normalizado and grupo are set to the module name)
  const base = analyzeSubtema(rawSubtema, materia, _semana, questionText, questionId);
  const mod = base.grupo; // This is the module name

  // If it's already a module name, return it
  if (rawSubtema && (rawSubtema.startsWith("Módulo ") || rawSubtema.startsWith("Modulo "))) {
    return { normalizado: rawSubtema, grupo: rawSubtema };
  }

  // Otherwise, the specific subtheme is title-cased rawSubtema, and the group is the module
  const normalizado = rawSubtema ? rawSubtema.toLowerCase()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ") : "General";

  return { normalizado, grupo: mod };
}

const testWeeks = [
  { s: 1, qs: questionsSemana1 },
  { s: 6, qs: questionsSemana6 },
];

testWeeks.forEach(({ s, qs }) => {
  console.log(`--- Week ${s} Grouping Test ---`);
  const subtemas = new Set<string>();
  qs.forEach(q => {
    if (q.subtema) {
      const { normalizado } = testAnalyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
      subtemas.add(normalizado);
    }
  });

  const availableSubtemasForConfig = Array.from(subtemas).sort();

  const groups: Record<string, string[]> = {};
  availableSubtemasForConfig.forEach(st => {
    const { grupo } = testAnalyzeSubtema(st, 'Pediatría', s);
    const groupName = grupo || 'Otros Trastornos';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(st);
  });

  Object.entries(groups).forEach(([groupName, subItems]) => {
    console.log(`Group: "${groupName}"`);
    console.log(`  Items: ${JSON.stringify(subItems)}`);
  });
});
