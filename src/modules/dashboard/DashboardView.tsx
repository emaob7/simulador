import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Calendar,
  ChevronDown,
  Flame
} from 'lucide-react';
import { Question } from '../../types';
import { analyzeSubtema } from '../../utils/normalizer';

const MATERIAS = ['Pediatría', 'Medicina Interna', 'Cirugía', 'Ginecología y Obstetricia'] as const;
type Materia = typeof MATERIAS[number];

interface DashboardViewProps {
  userId?: string;
  onReforzar?: (materia: string, subtema: string) => void;
  allQuestions: Question[];
  onQuestionSelect?: (id: string) => void;
  savedQuestionIds?: string[];
  onStartBookmarksQuiz?: () => void;
  sessions?: any[];
  progress?: any[];
  onReloadData?: () => void;
  pendingDraft?: any;
  onResumeDraft?: () => void;
  onDiscardDraft?: () => void;
  onNewSession?: () => void;
}

const normalizeMateriaName = (materia: string): Materia => {
  const normalized = (materia || '').toLowerCase();
  if (normalized.includes('pediatr')) return 'Pediatría';
  if (normalized.includes('interna') || normalized.includes('medicina')) return 'Medicina Interna';
  if (normalized.includes('cirug')) return 'Cirugía';
  if (normalized.includes('ginec') || normalized.includes('obste')) return 'Ginecología y Obstetricia';
  return 'Pediatría';
};

export function DashboardView({
  onReforzar,
  allQuestions,
  onQuestionSelect,
  savedQuestionIds = [],
  onStartBookmarksQuiz,
  sessions = [],
  progress = [],
  pendingDraft,
  onResumeDraft,
  onDiscardDraft,
  onNewSession
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'weeks' | 'weaknesses'>('weeks');
  const [selectedMateria, setSelectedMateria] = useState<Materia>('Medicina Interna');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({});

  const totalQuestionsAnswered = useMemo(() => {
    return new Set(progress.map(item => item.question_id).filter(Boolean)).size;
  }, [progress]);

  const globalAccuracy = useMemo(() => {
    const total = sessions.reduce((sum, session) => sum + (session.total_questions || 0), 0);
    const correct = sessions.reduce((sum, session) => sum + (session.score || 0), 0);
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }, [sessions]);

  const materiaStats = useMemo(() => {
    return MATERIAS.map(materia => {
      const questions = allQuestions.filter(question => normalizeMateriaName(question.materia) === materia);
      const ids = new Set(questions.map(question => question.id));
      const seen = new Set(progress.filter(item => ids.has(item.question_id)).map(item => item.question_id)).size;

      const materiaSessions = sessions.filter(session => normalizeMateriaName(session.materia) === materia);
      const attempts = materiaSessions.reduce((sum, session) => sum + (session.total_questions || 0), 0);
      const correct = materiaSessions.reduce((sum, session) => sum + (session.score || 0), 0);

      return {
        materia,
        total: questions.length,
        vistas: seen,
        porcentaje: questions.length > 0 ? Math.round((seen / questions.length) * 100) : 0,
        precision: attempts > 0 ? Math.round((correct / attempts) * 100) : 0
      };
    });
  }, [allQuestions, progress, sessions]);

  const availableSemanas = useMemo(() => {
    return Array.from(new Set(
      allQuestions
        .filter(question => normalizeMateriaName(question.materia) === selectedMateria)
        .map(question => question.semana)
    )).sort((a, b) => a - b);
  }, [allQuestions, selectedMateria]);

  const subtopicMap = useMemo(() => {
    const map: Record<string, {
      name: string;
      semana: number;
      total: number;
      correct: number;
      fails: number;
      score: number;
    }> = {};

    progress.forEach(item => {
      const question = allQuestions.find(candidate => candidate.id === item.question_id);
      if (!question || normalizeMateriaName(question.materia) !== selectedMateria) return;

      const normalized = analyzeSubtema(
        question.subtema,
        question.materia,
        question.semana,
        question.text,
        question.id
      ).normalizado || question.subtema || 'General';

      if (!map[normalized]) {
        map[normalized] = {
          name: normalized,
          semana: question.semana,
          total: 0,
          correct: 0,
          fails: 0,
          score: 0
        };
      }

      map[normalized].total += 1;
      if (item.is_correct) map[normalized].correct += 1;
      else map[normalized].fails += 1;
    });

    Object.values(map).forEach(item => {
      item.score = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
    });

    return map;
  }, [allQuestions, progress, selectedMateria]);

  const rankedSubtopics = useMemo(() => {
    return Object.values(subtopicMap).sort((a, b) => a.score - b.score || b.fails - a.fails);
  }, [subtopicMap]);

  const topPrioritySubtopic = useMemo(() => {
    return rankedSubtopics.find(item => item.fails > 0) || null;
  }, [rankedSubtopics]);

  const weeklyProgressData = useMemo(() => {
    return availableSemanas.map(semana => {
      const questions = allQuestions.filter(question =>
        normalizeMateriaName(question.materia) === selectedMateria && question.semana === semana
      );
      const ids = new Set(questions.map(question => question.id));
      const records = progress.filter(item => ids.has(item.question_id));
      const statusById: Record<string, { resolved: boolean; isCorrect: boolean }> = {};

      records.forEach(item => {
        statusById[item.question_id] = { resolved: true, isCorrect: item.is_correct };
      });

      const seen = Object.keys(statusById).length;
      return {
        semana,
        total: questions.length,
        vistas: seen,
        porcentaje: questions.length > 0 ? Math.round((seen / questions.length) * 100) : 0,
        temas: Array.from(new Set(questions.map(question => question.tema).filter(Boolean))),
        questionsData: questions.map(question => ({
          id: question.id,
          resolved: Boolean(statusById[question.id]?.resolved),
          isCorrect: Boolean(statusById[question.id]?.isCorrect)
        }))
      };
    });
  }, [allQuestions, availableSemanas, progress, selectedMateria]);

  const toggleWeek = (semana: number) => {
    setExpandedWeeks(current => ({ ...current, [semana]: !current[semana] }));
  };

  const numberFormatter = useMemo(() => new Intl.NumberFormat('es-PY'), []);
  const currentDateLabel = useMemo(() => {
    const label = new Intl.DateTimeFormat('es-PY', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(new Date());
    return label.charAt(0).toUpperCase() + label.slice(1);
  }, []);
  const coverage = allQuestions.length > 0
    ? Math.round((totalQuestionsAnswered / allQuestions.length) * 100)
    : 0;

  return (
    <div className="w-full min-w-0 max-w-[calc(100vw-2rem)] space-y-6 overflow-hidden animate-in fade-in duration-200 md:max-w-none">
      <section className="space-y-4">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-manrope text-xl font-bold tracking-tight text-[#F4F2EC] md:text-2xl">
              Panel de rendimiento
            </h1>
            <p className="mt-1 text-[10px] text-[#77766F]">
              {currentDateLabel}{pendingDraft ? ` · ${pendingDraft.scopeType === 'week' || !pendingDraft.scopeType ? `Semana ${pendingDraft.semana} activa` : 'Sesión temática activa'}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onNewSession}
            className="h-10 rounded-lg bg-primary px-6 text-xs font-semibold text-[#11110F] transition-colors hover:bg-[#D3B657]"
          >
            Nueva sesión
          </button>
        </header>

        {pendingDraft && (
          <div className="flex flex-col gap-4 rounded-lg border border-[#2A281F] bg-[#12120F] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="border-l-[3px] border-primary pl-4">
              <p className="text-[10px] font-medium text-[#8F8D84]">
                Sesión sin terminar · {pendingDraft.pendingOnly ? `${pendingDraft.totalCount} pendientes` : `${pendingDraft.answeredCount} de ${pendingDraft.totalCount} respondidas`}
              </p>
              <h2 className="mt-1 text-sm font-semibold text-[#F4F2EC] md:text-base">
                {pendingDraft.scopeLabel || pendingDraft.tema || 'Simulacro en curso'}
              </h2>
              <p className="mt-1 text-[10px] text-[#77766F]">
                {pendingDraft.materia}{pendingDraft.scopeType === 'week' || !pendingDraft.scopeType ? ` · Semana ${pendingDraft.semana}` : ' · Selección por materia'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onDiscardDraft}
                className="h-9 rounded-lg border border-[#2A2925] px-5 text-[11px] font-semibold text-[#B0AEA5] transition-colors hover:border-[#4A4740] hover:text-white"
              >
                Descartar
              </button>
              <button
                type="button"
                onClick={onResumeDraft}
                className="h-9 rounded-lg bg-primary px-5 text-[11px] font-semibold text-[#11110F] transition-colors hover:bg-[#D3B657]"
              >
                Reanudar sesión
              </button>
            </div>
          </div>
        )}

        <div>
          <h2 className="font-manrope text-2xl font-semibold tracking-tight text-[#F4F2EC]">Tu avance</h2>
          <p className="mt-1 text-xs text-[#77766F]">
            Una lectura clara de lo que ya dominás y de lo que conviene reforzar hoy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-[#141412] p-4">
            <p className="text-[10px] font-medium text-[#77766F]">Banco resuelto</p>
            <p className="mt-3 font-manrope text-2xl font-semibold text-[#F4F2EC]">
              {numberFormatter.format(totalQuestionsAnswered)}
              <span className="ml-1.5 text-xs font-medium text-[#686760]">/ {numberFormatter.format(allQuestions.length)}</span>
            </p>
            <p className="mt-1 text-[10px] text-[#77766F]">{coverage}% de cobertura oficial</p>
          </div>

          <div className="rounded-lg bg-[#141412] p-4">
            <p className="text-[10px] font-medium text-[#77766F]">Precisión global</p>
            <p className="mt-3 font-manrope text-2xl font-semibold text-[#F4F2EC]">{globalAccuracy}%</p>
            <p className="mt-1 text-[10px] text-[#77766F]">
              En {sessions.length} {sessions.length === 1 ? 'simulacro realizado' : 'simulacros realizados'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => savedQuestionIds.length > 0 && onStartBookmarksQuiz?.()}
            className="rounded-lg bg-[#141412] p-4 text-left transition-colors hover:bg-[#181815] disabled:cursor-default"
            disabled={savedQuestionIds.length === 0}
          >
            <p className="text-[10px] font-medium text-[#77766F]">Preguntas guardadas</p>
            <p className="mt-3 font-manrope text-2xl font-semibold text-primary">{savedQuestionIds.length}</p>
            <p className="mt-1 text-[10px] text-[#77766F]">
              {savedQuestionIds.length > 0 ? 'Ver preguntas guardadas' : 'Sin preguntas marcadas'}
            </p>
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-medium text-[#77766F]">Especialidad en estudio</p>
          <p className="text-[10px] text-[#77766F]">Seleccionada: <span className="text-[#D4D1C8]">{selectedMateria}</span></p>
        </div>

        <div className="grid overflow-hidden rounded-lg bg-[#141412] sm:grid-cols-2 lg:grid-cols-4">
          {materiaStats.map((stat, index) => {
            const selected = stat.materia === selectedMateria;
            return (
              <button
                type="button"
                key={stat.materia}
                onClick={() => setSelectedMateria(stat.materia)}
                className={`relative min-h-[104px] p-4 text-left transition-colors hover:bg-[#181815] ${
                  index > 0 ? 'border-t border-[#26251F] sm:border-l lg:border-t-0' : ''
                } ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}
              >
                <h3 className={`text-sm font-semibold ${selected ? 'text-primary' : 'text-[#F4F2EC]'}`}>
                  {stat.materia}
                </h3>
                <div className="mt-4 flex items-center justify-between text-[10px] text-[#77766F]">
                  <span>{numberFormatter.format(stat.vistas)} de {numberFormatter.format(stat.total)} preguntas</span>
                  <span className={selected ? 'text-primary' : ''}>{stat.porcentaje}%</span>
                </div>
                <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-[#2A2924]">
                  <div
                    className={`h-full rounded-full ${selected ? 'bg-primary' : 'bg-[#8A887F]'}`}
                    style={{ width: `${Math.max(stat.porcentaje, stat.vistas > 0 ? 2 : 0)}%` }}
                  />
                </div>
                {selected && <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary" />}
              </button>
            );
          })}
        </div>
      </section>

      {topPrioritySubtopic && (
        <section className="flex flex-col gap-4 rounded-lg border border-[#343023] bg-[#12120F] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 border-l-[3px] border-primary pl-4">
            <Flame className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-[10px] font-medium text-primary">Prioridad de hoy · {selectedMateria}</p>
              <h2 className="mt-2 text-sm font-semibold text-[#F4F2EC]">{topPrioritySubtopic.name}</h2>
              <p className="mt-1 text-[10px] text-[#77766F]">
                {topPrioritySubtopic.correct} aciertos de {topPrioritySubtopic.total} intentos · {topPrioritySubtopic.fails} fallos registrados
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onReforzar?.(selectedMateria, topPrioritySubtopic.name)}
            className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-[11px] font-semibold text-[#11110F] transition-colors hover:bg-[#D3B657]"
          >
            Reforzar este tema
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </section>
      )}

      <section className="rounded-lg bg-[#141412] p-4 md:p-6">
        <div className="flex flex-col gap-4 border-b border-[#282720] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-manrope text-lg font-semibold text-[#F4F2EC]">Mapa de estudio</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('weeks')}
                className={`flex h-9 items-center gap-2 rounded-lg px-3 text-[11px] font-semibold transition-colors ${
                  activeTab === 'weeks'
                    ? 'border border-[#34332C] bg-[#191916] text-[#F4F2EC]'
                    : 'text-[#77766F] hover:text-[#D4D1C8]'
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                Mapa por semanas
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('weaknesses')}
                className={`flex h-9 items-center gap-2 rounded-lg px-3 text-[11px] font-semibold transition-colors ${
                  activeTab === 'weaknesses'
                    ? 'border border-[#34332C] bg-[#191916] text-[#F4F2EC]'
                    : 'text-[#77766F] hover:text-[#D4D1C8]'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Diagnóstico por subtemas ({rankedSubtopics.length})
              </button>
            </div>
          </div>
          <p className="text-[10px] text-[#77766F]">
            {selectedMateria} · {availableSemanas.length} {availableSemanas.length === 1 ? 'semana' : 'semanas'}
          </p>
        </div>

        {activeTab === 'weeks' && (
          <div className="divide-y divide-[#282720]">
            {weeklyProgressData.map(week => {
              const expanded = Boolean(expandedWeeks[week.semana]);
              return (
                <article key={week.semana}>
                  <button
                    type="button"
                    onClick={() => toggleWeek(week.semana)}
                    className="flex w-full items-center gap-3 py-4 text-left"
                  >
                    <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-[#77766F] transition-transform ${expanded ? 'rotate-180' : '-rotate-90'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-xs font-semibold text-[#F4F2EC]">Semana {week.semana}</h3>
                        <span className="text-[10px] text-[#77766F]">{week.vistas} de {week.total} resueltas</span>
                      </div>
                      {week.temas.length > 0 && (
                        <p className="mt-1 truncate text-[9px] text-[#77766F]">{week.temas.join(' · ')}</p>
                      )}
                    </div>
                    <span className={`text-[11px] font-semibold ${week.porcentaje >= 20 ? 'text-primary' : 'text-[#D4D1C8]'}`}>
                      {week.porcentaje}%
                    </span>
                  </button>

                  {expanded && (
                    <div className="pb-5 pl-7">
                      <p className="mb-3 text-[10px] text-[#77766F]">Seleccioná una pregunta para abrirla directamente.</p>
                      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16">
                        {week.questionsData.map((question, index) => (
                          <button
                            type="button"
                            key={question.id}
                            onClick={() => onQuestionSelect?.(question.id)}
                            className={`h-8 rounded-md border text-[10px] font-semibold transition-colors ${
                              question.resolved
                                ? question.isCorrect
                                  ? 'border-emerald-800/50 bg-emerald-950/30 text-emerald-300'
                                  : 'border-rose-800/50 bg-rose-950/30 text-rose-300'
                                : 'border-[#302F29] bg-[#10100F] text-[#8F8D84] hover:border-[#4A4840] hover:text-white'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {activeTab === 'weaknesses' && (
          <div className="divide-y divide-[#282720]">
            {rankedSubtopics.length > 0 ? rankedSubtopics.map(subtopic => (
              <div key={subtopic.name} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-xs font-semibold text-[#F4F2EC]">{subtopic.name}</h3>
                  <p className="mt-1 text-[10px] text-[#77766F]">
                    Semana {subtopic.semana} · {subtopic.correct} correctas · {subtopic.fails} fallos
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-semibold ${
                    subtopic.score >= 75 ? 'text-emerald-400' : subtopic.score >= 60 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {subtopic.score}%
                  </span>
                  <button
                    type="button"
                    onClick={() => onReforzar?.(selectedMateria, subtopic.name)}
                    className="h-8 rounded-lg border border-[#34332C] px-3 text-[10px] font-semibold text-[#D4D1C8] transition-colors hover:border-[#4A4840] hover:text-white"
                  >
                    Practicar
                  </button>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center text-xs text-[#77766F]">
                Todavía no hay respuestas registradas en {selectedMateria}.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
