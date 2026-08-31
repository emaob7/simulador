import { classifyQuestionForStudy, STUDY_TOPICS } from '../src/utils/studyCatalog';
import type { Question } from '../src/types';

const expectedWeekCounts = [121, 109, 84, 74, 95, 94, 82, 104, 139, 141, 106, 80, 101, 294, 109, 99, 303, 163];
const questions: Question[] = [];

for (let week = 1; week <= 18; week += 1) {
  const module = await import(`../src/data/semana${week}/questions.ts`);
  const weekQuestions = module[`questionsSemana${week}`] as Question[];
  if (weekQuestions.length !== expectedWeekCounts[week - 1]) {
    throw new Error(`Semana ${week}: ${weekQuestions.length}; esperado ${expectedWeekCounts[week - 1]}`);
  }
  questions.push(...weekQuestions);
}

const ids = new Set<string>();
const topicCounts = new Map<string, number>();
const subtopicsByTopic = new Map<string, Set<string>>();
const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
for (const question of questions) {
  if (ids.has(question.id)) throw new Error(`ID duplicado: ${question.id}`);
  ids.add(question.id);
  const classification = classifyQuestionForStudy(question);
  if (!classification.topicId || !classification.topicLabel || !classification.subtopicLabel) {
    throw new Error(`Clasificación incompleta: ${question.id}`);
  }
  if (normalized(classification.subtopicLabel) === normalized(classification.topicLabel)) {
    throw new Error(`Subtema idéntico al tema: ${question.id} (${classification.topicLabel})`);
  }
  if (/^(general|otros|miscel[aá]neas?)$/i.test(classification.subtopicLabel.trim())) {
    throw new Error(`Subtema genérico: ${question.id} (${classification.subtopicLabel})`);
  }
  topicCounts.set(classification.topicId, (topicCounts.get(classification.topicId) || 0) + 1);
  if (!subtopicsByTopic.has(classification.topicId)) subtopicsByTopic.set(classification.topicId, new Set());
  subtopicsByTopic.get(classification.topicId)!.add(classification.subtopicLabel);
}

if (questions.length !== 2298) throw new Error(`Total ${questions.length}; esperado 2298`);

const emptyTopics = STUDY_TOPICS.filter(topic => !topicCounts.get(topic.id));
if (emptyTopics.length) throw new Error(`Temas sin preguntas: ${emptyTopics.map(topic => topic.label).join(', ')}`);

const collapsedTopics = STUDY_TOPICS.filter(topic =>
  (topicCounts.get(topic.id) || 0) >= 10 && (subtopicsByTopic.get(topic.id)?.size || 0) < 2
);
if (collapsedTopics.length) throw new Error(`Temas sin desglose estadístico: ${collapsedTopics.map(topic => topic.label).join(', ')}`);

console.log(`Catálogo válido: ${questions.length} preguntas, ${ids.size} IDs únicos, ${topicCounts.size} temas activos.`);
for (const topic of STUDY_TOPICS) {
  console.log(`${topic.materia} | ${topic.label}: ${topicCounts.get(topic.id)}`);
}
