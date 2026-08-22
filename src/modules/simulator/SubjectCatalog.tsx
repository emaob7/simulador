import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Play } from 'lucide-react';
import type { Question, QuizScope } from '../../types';
import { STUDY_SUBJECTS, STUDY_TOPICS, classifyQuestionForStudy } from '../../utils/studyCatalog';

interface SubjectCatalogProps {
  questions: Question[];
  progress: Array<{ question_id?: string; is_correct?: boolean }>;
  onPrepare: (scope: QuizScope, questions: Question[]) => void;
}

interface CatalogMetric {
  seen: number;
  completion: number;
  accuracy: number;
}

function getMetric(questions: Question[], progress: SubjectCatalogProps['progress']): CatalogMetric {
  const ids = new Set(questions.map(question => question.id));
  const attempts = progress.filter(item => item.question_id && ids.has(item.question_id));
  const seen = new Set(attempts.map(item => item.question_id)).size;
  const correct = attempts.filter(item => item.is_correct).length;
  return {
    seen,
    completion: questions.length ? Math.round((seen / questions.length) * 100) : 0,
    accuracy: attempts.length ? Math.round((correct / attempts.length) * 100) : 0,
  };
}

function makeScope(type: QuizScope['type'], id: string, label: string, materia: string, questions: Question[]): QuizScope {
  return {
    type,
    id,
    label,
    materia,
    sourceWeeks: Array.from(new Set(questions.map(question => question.semana))).sort((a, b) => a - b),
  };
}

export function SubjectCatalog({ questions, progress, onPrepare }: SubjectCatalogProps) {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const catalog = useMemo(() => STUDY_SUBJECTS.map(subject => {
    const subjectQuestions = questions.filter(question => question.materia === subject.materia);
    const topicItems = subject.topicIds.map(topicId => {
      const definition = STUDY_TOPICS.find(topic => topic.id === topicId)!;
      const topicQuestions = subjectQuestions.filter(question => classifyQuestionForStudy(question).topicId === topicId);
      const subtopicMap = new Map<string, Question[]>();
      topicQuestions.forEach(question => {
        const label = classifyQuestionForStudy(question).subtopicLabel;
        const list = subtopicMap.get(label) || [];
        list.push(question);
        subtopicMap.set(label, list);
      });
      return {
        definition,
        questions: topicQuestions,
        metric: getMetric(topicQuestions, progress),
        subtopics: Array.from(subtopicMap.entries())
          .map(([label, subtopicQuestions]) => ({ label, questions: subtopicQuestions, metric: getMetric(subtopicQuestions, progress) }))
          .sort((a, b) => a.label.localeCompare(b.label, 'es')),
      };
    });
    return { subject, questions: subjectQuestions, metric: getMetric(subjectQuestions, progress), topics: topicItems };
  }), [questions, progress]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
      {catalog.map(({ subject, questions: subjectQuestions, metric: subjectMetric, topics }) => (
        <section key={subject.id} className="bg-[#121212] border border-white/[0.08] rounded-xl overflow-hidden">
          <header className="px-5 py-5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Materia</p>
              <h3 className="text-lg font-bold text-white mt-1">{subject.label}</h3>
              <p className="text-xs text-[#8F8F8F] mt-1">
                {subjectQuestions.length} preguntas · {subjectMetric.seen} resueltas · {subjectMetric.accuracy}% precisión
              </p>
            </div>
            <button
              type="button"
              onClick={() => onPrepare(makeScope('subject', subject.id, subject.label, subject.materia, subjectQuestions), subjectQuestions)}
              className="px-4 py-2.5 rounded-lg bg-primary text-[#0A0A0A] text-[10px] uppercase tracking-wider font-black hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              Entrenar materia
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </header>

          <div>
            {topics.map(({ definition, questions: topicQuestions, metric, subtopics }) => {
              const expanded = Boolean(expandedTopics[definition.id]);
              return (
                <article key={definition.id} className="border-b border-white/[0.06] last:border-0">
                  <button
                    type="button"
                    onClick={() => setExpandedTopics(current => ({ ...current, [definition.id]: !expanded }))}
                    className="w-full px-5 py-4 text-left hover:bg-white/[0.025] transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${expanded ? 'text-primary' : 'text-white'}`}>{definition.label}</span>
                        <span className="text-[10px] text-[#777]">{topicQuestions.length} preguntas</span>
                        {metric.seen > 0 && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 text-[#B8B8B8]">
                            {metric.accuracy}% ACC
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-24 h-1 rounded-full bg-white/[0.07] overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${metric.completion}%` }} />
                        </div>
                        <span className="text-[9px] text-[#777]">{metric.completion}% completado</span>
                      </div>
                    </div>
                    {expanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-[#666]" />}
                  </button>

                  {expanded && (
                    <div className="px-5 pb-5 bg-black/10">
                      <div className="pt-1 pb-4 flex items-center justify-between gap-3">
                        <p className="text-[10px] uppercase tracking-wider text-[#777]">Subtemas disponibles</p>
                        <button
                          type="button"
                          onClick={() => onPrepare(makeScope('topic', definition.id, definition.label, definition.materia, topicQuestions), topicQuestions)}
                          className="px-3.5 py-2 rounded-lg border border-primary/40 text-primary text-[9px] uppercase tracking-wider font-black hover:bg-primary/10 transition-colors"
                        >
                          Configurar tema
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {subtopics.map(subtopic => {
                          const scopeId = `${definition.id}:${subtopic.label}`;
                          return (
                            <div key={subtopic.label} className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] px-3 py-2.5 bg-white/[0.015]">
                              <div className="min-w-0">
                                <p className="text-xs text-[#D8D8D8] font-medium truncate">{subtopic.label}</p>
                                <p className="text-[9px] text-[#777] mt-0.5">
                                  {subtopic.questions.length} preguntas · {subtopic.metric.completion}% completado
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => onPrepare(makeScope('subtopic', scopeId, `${definition.label} · ${subtopic.label}`, definition.materia, subtopic.questions), subtopic.questions)}
                                className="text-[9px] uppercase tracking-wider font-bold text-primary hover:text-white transition-colors shrink-0"
                              >
                                Seleccionar
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

