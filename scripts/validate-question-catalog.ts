import { classifyQuestionForStudy, STUDY_TOPICS } from '../src/utils/studyCatalog';
import type { Question } from '../src/types';

const expectedWeekCounts = [121, 109, 84, 74, 95, 94, 82, 104, 139, 141, 106, 80, 101, 294, 109, 99];
const questions: Question[] = [];

for (let week = 1; week <= 16; week += 1) {
  const module = await import(`../src/data/semana${week}/questions.ts`);
  const weekQuestions = module[`questionsSemana${week}`] as Question[];
  if (weekQuestions.length !== expectedWeekCounts[week - 1]) {
    throw new Error(`Semana ${week}: ${weekQuestions.length}; esperado ${expectedWeekCounts[week - 1]}`);
  }
  questions.push(...weekQuestions);
}

const ids = new Set<string>();
const topicCounts = new Map<string, number>();
for (const question of questions) {
  if (ids.has(question.id)) throw new Error(`ID duplicado: ${question.id}`);
  ids.add(question.id);
  const classification = classifyQuestionForStudy(question);
  if (!classification.topicId || !classification.topicLabel || !classification.subtopicLabel) {
    throw new Error(`Clasificación incompleta: ${question.id}`);
  }
  topicCounts.set(classification.topicId, (topicCounts.get(classification.topicId) || 0) + 1);
}

if (questions.length !== 1832) throw new Error(`Total ${questions.length}; esperado 1832`);

const emptyTopics = STUDY_TOPICS.filter(topic => !topicCounts.get(topic.id));
if (emptyTopics.length) throw new Error(`Temas sin preguntas: ${emptyTopics.map(topic => topic.label).join(', ')}`);

console.log(`Catálogo válido: ${questions.length} preguntas, ${ids.size} IDs únicos, ${topicCounts.size} temas activos.`);
for (const topic of STUDY_TOPICS) {
  console.log(`${topic.materia} | ${topic.label}: ${topicCounts.get(topic.id)}`);
}

