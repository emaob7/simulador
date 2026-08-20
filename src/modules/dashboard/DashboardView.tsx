import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  Target, 
  Sparkles, 
  Flame, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  ArrowRight, 
  Bookmark, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  TrendingUp,
  Award
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
}

export function DashboardView({
  onReforzar,
  allQuestions,
  onQuestionSelect,
  savedQuestionIds = [],
  onStartBookmarksQuiz,
  sessions = [],
  progress = []
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'weeks' | 'weaknesses'>('weeks');

  const normalizeMateriaName = (m: string): Materia => {
    const lower = (m || '').toLowerCase();
    if (lower.includes('pediatr')) return 'Pediatría';
    if (lower.includes('interna') || lower.includes('medicina')) return 'Medicina Interna';
    if (lower.includes('cirug')) return 'Cirugía';
    if (lower.includes('ginec') || lower.includes('obste')) return 'Ginecología y Obstetricia';
    return 'Pediatría';
  };

  // 1. Overall stats
  const totalQuestionsAnswered = useMemo(() => {
    const seen = new Set(progress.map(p => p.question_id));
    return seen.size;
  }, [progress]);

  const globalAccuracy = useMemo(() => {
    const totalQ = sessions.reduce((sum, s) => sum + (s.total_questions || 0), 0);
    const totalC = sessions.reduce((sum, s) => sum + (s.score || 0), 0);
    return totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
  }, [sessions]);

  // 2. Stats por materia
  const materiaStats = useMemo(() => {
    return MATERIAS.map(m => {
      const qOfMateria = allQuestions.filter(q => normalizeMateriaName(q.materia) === m);
      const total = qOfMateria.length;
      
      const qIds = new Set(qOfMateria.map(q => q.id));
      const seen = progress.filter(p => qIds.has(p.question_id));
      const seenUnique = new Set(seen.map(p => p.question_id)).size;
      const progressPercent = total > 0 ? Math.round((seenUnique / total) * 100) : 0;

      const sessionsOfMateria = sessions.filter(s => normalizeMateriaName(s.materia) === m);
      const totalQ = sessionsOfMateria.reduce((sum, s) => sum + (s.total_questions || 0), 0);
      const totalC = sessionsOfMateria.reduce((sum, s) => sum + (s.score || 0), 0);
      const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;

      let status: 'safe' | 'risk' | 'critical' | 'unstarted' = 'unstarted';
      if (seenUnique > 0) {
        if (accuracy >= 75) status = 'safe';
        else if (accuracy >= 60) status = 'risk';
        else status = 'critical';
      }

      return {
        materia: m as Materia,
        total,
        vistas: seenUnique,
        porcentaje: progressPercent,
        precision: accuracy,
        status,
        totalSesiones: sessionsOfMateria.length
      };
    });
  }, [allQuestions, progress, sessions]);

  const defaultMateria = useMemo(() => {
    const answered = materiaStats.filter(s => s.vistas > 0).sort((a, b) => b.vistas - a.vistas);
    return answered[0]?.materia || 'Pediatría';
  }, [materiaStats]);

  const [selectedMateria, setSelectedMateria] = useState<Materia>(defaultMateria);

  const availableSemanas = useMemo(() => {
    const semanas = new Set<number>();
    allQuestions.forEach(q => {
      if (normalizeMateriaName(q.materia) === selectedMateria) {
        semanas.add(q.semana);
      }
    });
    return Array.from(semanas).sort((a, b) => a - b);
  }, [allQuestions, selectedMateria]);

  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({});

  const toggleWeek = (semana: number) => {
    setExpandedWeeks(prev => ({ ...prev, [semana]: !prev[semana] }));
  };

  // 3. Puntos débiles por subtema
  const subtopicMap = useMemo(() => {
    const map: Record<string, {
      name: string;
      semana: number;
      total: number;
      correct: number;
      fails: number;
      score: number;
    }> = {};

    progress.forEach(p => {
      const q = allQuestions.find(x => x.id === p.question_id);
      if (!q || normalizeMateriaName(q.materia) !== selectedMateria) return;
      
      const subInfo = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
      const subName = subInfo.normalizado || q.subtema || 'General';

      if (!map[subName]) {
        map[subName] = {
          name: subName,
          semana: q.semana,
          total: 0,
          correct: 0,
          fails: 0,
          score: 0
        };
      }

      map[subName].total += 1;
      if (p.is_correct) {
        map[subName].correct += 1;
      } else {
        map[subName].fails += 1;
      }
    });

    Object.values(map).forEach(s => {
      s.score = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    });

    return map;
  }, [progress, allQuestions, selectedMateria]);

  // Tema prioritario a reforzar
  const topPrioritySubtopic = useMemo(() => {
    const failedSubtopics = Object.values(subtopicMap)
      .filter(s => s.fails > 0)
      .sort((a, b) => a.score - b.score || b.fails - a.fails);
    return failedSubtopics[0] || null;
  }, [subtopicMap]);

  // Lista ordenada de subtemas para diagnóstico
  const rankedSubtopics = useMemo(() => {
    return Object.values(subtopicMap).sort((a, b) => a.score - b.score || b.fails - a.fails);
  }, [subtopicMap]);

  // 4. Datos por semana y mapa de preguntas
  const weeklyProgressData = useMemo(() => {
    return availableSemanas.map(semana => {
      const questionsOfSemana = allQuestions.filter(
        q => normalizeMateriaName(q.materia) === selectedMateria && q.semana === semana
      );
      const total = questionsOfSemana.length;
      
      const qIds = new Set(questionsOfSemana.map(q => q.id));
      const seenRecords = progress.filter(p => qIds.has(p.question_id));
      
      const statusMap: Record<string, { resolved: boolean; isCorrect: boolean }> = {};
      seenRecords.forEach(p => {
        statusMap[p.question_id] = {
          resolved: true,
          isCorrect: p.is_correct
        };
      });

      const vistas = Object.keys(statusMap).length;
      const porcentaje = total > 0 ? Math.round((vistas / total) * 100) : 0;
      const temas = Array.from(new Set(questionsOfSemana.map(q => q.tema).filter(Boolean)));

      const questionsData = questionsOfSemana.map(q => ({
        id: q.id,
        text: q.text,
        resolved: !!statusMap[q.id]?.resolved,
        isCorrect: !!statusMap[q.id]?.isCorrect
      }));

      return {
        semana,
        total,
        vistas,
        porcentaje,
        temas,
        questionsData
      };
    });
  }, [allQuestions, progress, selectedMateria, availableSemanas]);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      
      {/* NIVEL 1: ENCABEZADO & 3 KPIS PRINCIPALES (MINIMALISTA MATE) */}
      <div className="space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white font-manrope">
            Panel de Rendimiento
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Diagnóstico de aciertos, puntos débiles y cobertura de temario CONAREM.
          </p>
        </div>

        {/* 3 KPIs en fila sobria */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* KPI 1: Banco Resuelto */}
          <div className="bg-[#141416] border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Banco Resuelto
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-white font-mono">{totalQuestionsAnswered}</span>
                <span className="text-xs text-zinc-500 font-medium font-mono">/ {allQuestions.length}</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                {allQuestions.length > 0 ? Math.round((totalQuestionsAnswered / allQuestions.length) * 100) : 0}% de cobertura oficial
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Target className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 2: Precisión Global */}
          <div className="bg-[#141416] border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Precisión Global
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl font-bold font-mono ${
                  globalAccuracy >= 75 ? 'text-emerald-400' : globalAccuracy >= 60 ? 'text-amber-400' : 'text-zinc-200'
                }`}>
                  {globalAccuracy}%
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                En {sessions.length} {sessions.length === 1 ? 'simulacro' : 'simulacros'} realizados
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 3: Preguntas Guardadas */}
          <div 
            onClick={() => {
              if (savedQuestionIds.length > 0 && onStartBookmarksQuiz) onStartBookmarksQuiz();
            }}
            className={`bg-[#141416] border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all ${
              savedQuestionIds.length > 0 ? 'cursor-pointer hover:border-zinc-700 hover:bg-[#18181B]' : ''
            }`}
          >
            <div>
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Preguntas Guardadas
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-amber-400 font-mono">{savedQuestionIds.length}</span>
                <span className="text-xs text-zinc-500 font-medium">favoritas</span>
              </div>
              {savedQuestionIds.length > 0 ? (
                <span className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1 mt-1 hover:underline">
                  Ver preguntas guardadas →
                </span>
              ) : (
                <p className="text-[11px] text-zinc-500 mt-1">Sin preguntas marcadas</p>
              )}
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400/90">
              <Bookmark className="w-5 h-5 fill-current opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* NIVEL 2: SELECTOR DE ESPECIALIDADES (MATTE Y SOBRIO) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Especialidad en Estudio
          </span>
          <span className="text-xs text-zinc-400">
            Seleccionada: <strong className="text-white font-semibold">{selectedMateria}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {materiaStats.map(stat => {
            const m = stat.materia;
            const isSelected = selectedMateria === m;

            let badge = (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                Sin iniciar
              </span>
            );

            if (stat.status === 'safe') {
              badge = (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                  Dominado ({stat.precision}%)
                </span>
              );
            } else if (stat.status === 'risk') {
              badge = (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-950/40 text-amber-400 border border-amber-800/40">
                  En riesgo ({stat.precision}%)
                </span>
              );
            } else if (stat.status === 'critical') {
              badge = (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-rose-950/40 text-rose-400 border border-rose-800/40">
                  Reforzar ({stat.precision}%)
                </span>
              );
            }

            return (
              <button
                key={m}
                onClick={() => setSelectedMateria(m)}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#18181B] border-primary/60 text-white shadow-sm'
                    : 'bg-[#141416] border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-[#161619]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-white'}`}>
                    {m}
                  </h3>
                  {badge}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>{stat.vistas} de {stat.total} preguntas</span>
                    <span className="font-mono">{stat.porcentaje}%</span>
                  </div>
                  {/* Progress bar sutil */}
                  <div className="w-full bg-zinc-800/80 rounded-full h-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-primary' : 'bg-zinc-500'
                      }`}
                      style={{ width: `${stat.porcentaje}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* NIVEL 3: PLAN DE ACCIÓN FOCALIZADO (REFUERZO DE PUNTO DÉBIL) */}
      {topPrioritySubtopic && (
        <div className="bg-[#141416] border border-amber-500/30 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Prioridad de Refuerzo
                </span>
                <span className="text-xs text-zinc-400">en {selectedMateria}</span>
              </div>
              <h2 className="text-base font-bold text-white mt-1">
                {topPrioritySubtopic.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {topPrioritySubtopic.correct} aciertos de {topPrioritySubtopic.total} intentos ({topPrioritySubtopic.fails} fallos registrados).
              </p>
            </div>
          </div>

          <button
            onClick={() => onReforzar && onReforzar(selectedMateria, topPrioritySubtopic.name)}
            className="w-full sm:w-auto px-5 py-2.5 bg-primary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Reforzar este tema</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* NIVEL 4: EXPLORACIÓN MODULAR CON PESTAÑAS (MAPA SEMANAL vs PUNTOS DÉBILES) */}
      <div className="bg-[#141416] border border-zinc-800/80 rounded-2xl p-4 md:p-6 space-y-5 shadow-sm">
        
        {/* Selector de Pestañas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('weeks')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'weeks'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Mapa por Semanas</span>
            </button>

            <button
              onClick={() => setActiveTab('weaknesses')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'weaknesses'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Diagnóstico por Subtemas ({rankedSubtopics.length})</span>
            </button>
          </div>

          <span className="text-xs text-zinc-400 font-medium">
            {selectedMateria} • {availableSemanas.length} {availableSemanas.length === 1 ? 'semana' : 'semanas'}
          </span>
        </div>

        {/* CONTENIDO PESTAÑA 1: MAPA POR SEMANAS */}
        {activeTab === 'weeks' && (
          <div className="space-y-3">
            {weeklyProgressData.map(weekData => {
              const isExpanded = expandedWeeks[weekData.semana] || false;
              return (
                <div 
                  key={weekData.semana}
                  className="bg-[#18181B]/70 border border-zinc-800/80 rounded-xl p-4 transition-colors"
                >
                  <div 
                    onClick={() => toggleWeek(weekData.semana)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg bg-zinc-800 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-white">Semana {weekData.semana}</h4>
                          <span className="text-xs text-zinc-500 font-medium">
                            · {weekData.vistas} de {weekData.total} resueltas
                          </span>
                        </div>
                        {weekData.temas.length > 0 && (
                          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                            {weekData.temas.join(' • ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="text-sm font-bold font-mono text-zinc-300">
                      {weekData.porcentaje}%
                    </span>
                  </div>

                  {/* Cuadrícula desplegable de preguntas */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span>Haz clic en un número para abrir esa pregunta directamente:</span>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500"></span> Correcta</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-500"></span> Fallada</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-zinc-700"></span> Pendiente</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1.5">
                        {weekData.questionsData?.map((q, idx) => (
                          <button
                            key={q.id}
                            onClick={() => onQuestionSelect && onQuestionSelect(q.id)}
                            title={`Pregunta ${idx + 1}: ${q.resolved ? (q.isCorrect ? 'Correcta' : 'Incorrecta') : 'Pendiente'}`}
                            className={`h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center border ${
                              q.resolved 
                                ? (q.isCorrect 
                                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/50' 
                                    : 'bg-rose-950/40 text-rose-300 border-rose-700/50 hover:bg-rose-900/50')
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CONTENIDO PESTAÑA 2: DIAGNÓSTICO POR SUBTEMAS */}
        {activeTab === 'weaknesses' && (
          <div className="space-y-2.5">
            {rankedSubtopics.length > 0 ? (
              rankedSubtopics.map(sub => {
                const isDominado = sub.score >= 75;
                const isRegular = sub.score >= 60 && sub.score < 75;

                return (
                  <div
                    key={sub.name}
                    className="bg-[#18181B]/70 border border-zinc-800/80 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          isDominado ? 'bg-emerald-400' : isRegular ? 'bg-amber-400' : 'bg-rose-400'
                        }`} />
                        <h4 className="font-medium text-xs md:text-sm text-white truncate" title={sub.name}>
                          {sub.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Semana {sub.semana} · {sub.correct} correctas / {sub.fails} fallos ({sub.total} preguntas hechas)
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                        isDominado 
                          ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40' 
                          : isRegular 
                            ? 'bg-amber-950/30 text-amber-400 border-amber-800/40' 
                            : 'bg-rose-950/30 text-rose-400 border-rose-800/40'
                      }`}>
                        {sub.score}% acierto
                      </span>

                      <button
                        onClick={() => onReforzar && onReforzar(selectedMateria, sub.name)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white rounded-lg border border-zinc-700/80 transition-colors cursor-pointer"
                      >
                        Practicar
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-xl">
                Aún no has respondido preguntas en {selectedMateria}. Resuelve preguntas para ver el desglose por subtemas.
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
