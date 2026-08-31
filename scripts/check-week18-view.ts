import { questionsSemana18 } from '../src/data/semana18/questions';
import { classifyQuestionForStudy } from '../src/utils/studyCatalog';

const groups = new Map<string, Map<string, string>>();
const counts = new Map<string, number>();

questionsSemana18.forEach(q => {
  const cls = classifyQuestionForStudy(q);
  if (!groups.has(cls.topicLabel)) groups.set(cls.topicLabel, new Map());
  const key = `${cls.topicId}::${cls.subtopicLabel}`;
  groups.get(cls.topicLabel)!.set(key, cls.subtopicLabel);
  counts.set(key, (counts.get(key) || 0) + 1);
});

console.log("=== VISTA DE SUBTEMAS ESPECÍFICOS EN SEMANA 18 ===");
for (const [topicLabel, subtopics] of groups.entries()) {
  console.log(`\n📌 ${topicLabel}:`);
  for (const [key, subtopicLabel] of subtopics.entries()) {
    console.log(`   [✓] ${subtopicLabel} (${counts.get(key)} preguntas)`);
  }
}
