import React, { useMemo, useState, useEffect } from 'react';
import { DataService } from '../../services/DataService';
import { Materia, Session, UserProgress, Question } from '../../types';
import { 
  Baby, 
  Activity, 
  Scissors, 
  Heart, 
  RotateCcw, 
  AlertCircle, 
  Bookmark, 
  Target, 
  ArrowRight, 
  ChevronDown, 
  BarChart3,
  Calendar,
  Sparkles,
  Flame
} from 'lucide-react';
import { analyzeSubtema, normalizeMateriaName } from '../../utils/normalizer';

const MATERIAS: Materia[] = ['Pediatría', 'Medicina Interna', 'Cirugía', 'Ginecología y Obstetricia'];

const MATERIA_ICONS: Record<Materia, React.ReactNode> = {
  'Pediatría': <Baby className="w-5 h-5" />,
  'Medicina Interna': <Activity className="w-5 h-5" />,
  'Cirugía': <Scissors className="w-5 h-5" />,
  'Ginecología y Obstetricia': <Heart className="w-5 h-5" />
};

export function DashboardView({ 
  userId, 
  onReforzar, 
  allQuestions = [], 
  onQuestionSelect,
  savedQuestionIds = [],
  onStartBookmarksQuiz,
  sessions: passedSessions,
  progress: passedProgress,
  onReloadData
}: { 
  userId: string, 
  onReforzar?: (materia: string, subtema: string) => void, 
  allQuestions?: Question[], 
  onQuestionSelect?: (questionId: string) => void,
  savedQuestionIds?: string[],
  onStartBookmarksQuiz?: () => void,
  sessions?: Session[],
  progress?: UserProgress[],
  onReloadData?: () => void
}) {
  const [sessionsState, setSessionsState] = useState<Session[]>([]);
  const [progressState, setProgressState] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSemanaSubtemas, setSelectedSemanaSubtemas] = useState<number | 'all'>('all');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({});

  const sessions = passedSessions !== undefined ? passedSessions : sessionsState;
  const progress = passedProgress !== undefined ? passedProgress : progressState;

  const toggleWeek = (semana: number) => {
    setExpandedWeeks(prev => ({ ...prev, [semana]: !prev[semana] }));
  };

  useEffect(() => {
    const loadData = async () => {
      if (passedSessions !== undefined && passedProgress !== undefined) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const loadedSessions = await DataService.getSessions(userId);
      const loadedProgress = await DataService.getProgress(userId);
      setSessionsState(loadedSessions);
      setProgressState(loadedProgress);
      setIsLoading(false);
    };
    loadData();
  }, [userId, passedSessions, passedProgress]);

  const handleGenerateMock = async () => {
    setIsLoading(true);
    const { MockDataService } = await import('../../services/MockDataService');
    await MockDataService.generateDataForUser(userId, 'Dr. Invitado');
    if (onReloadData) {
      await onReloadData();
    } else {
      const loadedSessions = await DataService.getSessions(userId);
      const loadedProgress = await DataService.getProgress(userId);
      setSessionsState(loadedSessions);
      setProgressState(loadedProgress);
    }
    setIsLoading(false);
  };

  // Global totals
  const totalQuestionsAnswered = useMemo(() => {
    const seenUnique = new Set(progress.map(p => p.question_id));
    return seenUnique.size;
  }, [progress]);

  const globalAccuracy = useMemo(() => {
    const totalQ = sessions.reduce((sum, s) => sum + (s.total_questions || 0), 0);
    const totalC = sessions.reduce((sum, s) => sum + (s.score || 0), 0);
    return totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
  }, [sessions]);

  // Materia stats
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

      return {
        materia: m as Materia,
        total,
        vistas: seenUnique,
        porcentaje: progressPercent,
        precision: accuracy,
        totalSesiones: sessionsOfMateria.length
      };
    });
  }, [allQuestions, progress, sessions]);

  const defaultMateria = useMemo(() => {
    const answered = materiaStats.filter(s => s.vistas > 0).sort((a, b) => b.vistas - a.vistas);
    return answered[0]?.materia || 'Pediatría';
  }, [materiaStats]);

  const [selectedMateria, setSelectedMateria] = useState<Materia>(defaultMateria);
  const [hasSetDefaultMateria, setHasSetDefaultMateria] = useState(false);

  useEffect(() => {
    if (sessions.length > 0 && !hasSetDefaultMateria) {
      setSelectedMateria(defaultMateria);
      setHasSetDefaultMateria(true);
    }
  }, [sessions, defaultMateria, hasSetDefaultMateria]);

  const availableSemanas = useMemo(() => {
    const semanas = new Set<number>();
    allQuestions.forEach(q => {
      if (normalizeMateriaName(q.materia) === selectedMateria) {
        semanas.add(q.semana);
      }
    });
    return Array.from(semanas).sort((a, b) => a - b);
  }, [allQuestions, selectedMateria]);

  useEffect(() => {
    if (availableSemanas.length > 0 && !availableSemanas.includes(selectedSemanaSubtemas as number) && selectedSemanaSubtemas !== 'all') {
      setSelectedSemanaSubtemas('all');
    }
  }, [availableSemanas, selectedSemanaSubtemas]);

  const questionInfoMap = useMemo(() => {
    const map = new Map<string, { semana: number, subtema: string, materia: string }>();
    allQuestions.forEach(q => {
      const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
      map.set(q.id, { semana: q.semana, subtema: normalizado, materia: normalizeMateriaName(q.materia) });
    });
    return map;
  }, [allQuestions]);

  const subtemasDataFull = useMemo(() => {
    const groups: Record<string, { correct: number, total: number, semana: number }> = {};
    
    progress.forEach(p => {
      const qInfo = questionInfoMap.get(p.question_id);
      const targetMateria = qInfo ? qInfo.materia : normalizeMateriaName(p.materia);
      
      if (targetMateria === selectedMateria) {
        const qSemana = qInfo ? qInfo.semana : p.semana;
        if (selectedSemanaSubtemas !== 'all' && qSemana !== selectedSemanaSubtemas) {
          return;
        }

        const subtema = qInfo ? qInfo.subtema : (p.subtema || 'General');
        if (!groups[subtema]) groups[subtema] = { correct: 0, total: 0, semana: qSemana };
        groups[subtema].total++;
        if (p.is_correct) groups[subtema].correct++;
      }
    });

    return Object.entries(groups).map(([name, data]) => {
      const score = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      const fails = data.total - data.correct;
      const weakness = fails * 3 + (100 - score) * 0.7;
      return {
        name,
        score,
        correct: data.correct,
        total: data.total,
        fails,
        weakness,
        semana: data.semana
      };
    }).filter(t => t.total > 0).sort((a, b) => a.score - b.score);
  }, [progress, selectedMateria, selectedSemanaSubtemas, questionInfoMap]);

  const worstSubtopics = useMemo(() => {
    return [...subtemasDataFull]
      .filter(s => s.score < 75 || s.fails >= 1)
      .sort((a, b) => b.weakness - a.weakness)
      .slice(0, 4);
  }, [subtemasDataFull]);

  const topPrioritySubtopic = worstSubtopics.length > 0 ? worstSubtopics[0] : null;

  const weeklyProgressData = useMemo(() => {
    const weeks = [...new Set(allQuestions.filter(q => normalizeMateriaName(q.materia) === selectedMateria).map(q => q.semana))].sort((a,b) => a - b);
    return weeks.map(week => {
      const qOfWeek = allQuestions.filter(q => normalizeMateriaName(q.materia) === selectedMateria && q.semana === week);
      const total = qOfWeek.length;
      
      const qIds = new Set(qOfWeek.map(q => q.id));
      const seen = progress.filter(p => qIds.has(p.question_id));
      const seenUniqueIds = new Set(seen.map(p => p.question_id));
      const seenUnique = seenUniqueIds.size;
      const unseen = total - seenUnique;
      
      const temas = [...new Set(qOfWeek.map(q => q.tema))];

      const questionsData = qOfWeek.map(q => {
        const pHistory = seen.filter(p => p.question_id === q.id);
        const resolved = pHistory.length > 0;
        const isCorrect = pHistory.some(p => p.is_correct);
        return {
          id: q.id,
          resolved,
          isCorrect
        };
      });
      
      return {
        semana: week,
        total,
        vistas: seenUnique,
        inéditas: unseen,
        porcentaje: total > 0 ? Math.round((seenUnique / total) * 100) : 0,
        temas,
        questionsData
      };
    });
  }, [allQuestions, progress, selectedMateria]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-sm font-bold text-[#A0A0A0] uppercase tracking-widest">Cargando tus estadísticas de estudio...</p>
      </div>
    );
  }

  if (sessions.length === 0 && progress.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-[#141824] backdrop-blur-md rounded-3xl border border-primary/20 flex items-center justify-center shadow-2xl mb-2 text-primary">
          <Activity className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black font-manrope uppercase tracking-tight text-white">Sin datos de rendimiento</h2>
        <p className="text-[#A0A0A0] font-medium leading-relaxed text-sm">
          Aún no has completado simulacros con este usuario. Puedes empezar tu primer test ahora o generar datos de demostración para explorar las métricas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'simulator' }))}
            className="flex-1 px-8 py-4 bg-primary text-[#0A0A0A] font-black rounded-2xl uppercase tracking-widest text-xs shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
          >
            Ir al Simulador
          </button>
          <button 
            onClick={handleGenerateMock}
            className="flex-1 px-8 py-4 bg-[#1E1E1E] text-white font-black rounded-2xl border border-white/10 uppercase tracking-widest text-xs hover:bg-white/5 shadow-sm transition-all cursor-pointer"
          >
            Generar Demo Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto text-white">
      
      {/* 1. ENCABEZADO Y RESUMEN RÁPIDO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-manrope">
              Tu Panel de Rendimiento
            </h1>
          </div>
          <p className="text-sm text-[#A0A0A0] font-medium mt-1">
            Analiza tus aciertos por especialidad, identifica tus puntos débiles y refuerza antes del examen.
          </p>
        </div>

        {onReloadData && (
          <button
            onClick={onReloadData}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-primary" />
            Actualizar Datos
          </button>
        )}
      </div>

      {/* 2. TARJETAS DE RESUMEN GLOBAL */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Respondidas */}
        <div className="bg-[#141824]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-1">Preguntas Respondidas</p>
            <p className="text-3xl font-black font-manrope text-white">
              {totalQuestionsAnswered} <span className="text-sm font-semibold text-[#A0A0A0]">/ {allQuestions.length}</span>
            </p>
            <p className="text-[11px] text-[#A0A0A0] mt-1">
              {allQuestions.length > 0 ? Math.round((totalQuestionsAnswered / allQuestions.length) * 100) : 0}% del banco total visto
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Precisión Global */}
        <div className="bg-[#141824]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-1">Precisión Global</p>
            <p className="text-3xl font-black font-manrope text-primary">
              {globalAccuracy}%
            </p>
            <p className="text-[11px] text-[#A0A0A0] mt-1">
              En {sessions.length} simulacros completados
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Preguntas Guardadas */}
        <div className="bg-[#141824]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-1">Preguntas Guardadas</p>
            <p className="text-3xl font-black font-manrope text-amber-400">
              {savedQuestionIds.length} <span className="text-sm font-semibold text-[#A0A0A0]">favoritas</span>
            </p>
            {savedQuestionIds.length > 0 && (
              <button
                onClick={onStartBookmarksQuiz}
                className="mt-2 text-[11px] font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1 cursor-pointer"
              >
                Repasar guardadas <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Bookmark className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. SELECTOR PRINCIPAL DE ESPECIALIDAD */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#A0A0A0]">
            Elige una Especialidad para Explorar
          </h2>
          <span className="text-xs font-medium text-[#A0A0A0]">
            Viendo: <strong className="text-white">{selectedMateria}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {materiaStats.map(stat => {
            const m = stat.materia;
            const isSelected = selectedMateria === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedMateria(m)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#272111] to-[#141824] border-primary shadow-[0_0_25px_rgba(198,168,74,0.2)] ring-1 ring-primary'
                    : 'bg-[#141824]/50 border-white/10 hover:border-white/20 hover:bg-[#141824]/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary text-[#0A0A0A]' : 'bg-white/5 text-[#A0A0A0]'}`}>
                    {MATERIA_ICONS[m]}
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-black px-2.5 py-1 rounded-lg border ${
                      stat.precision >= 75 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : (stat.precision >= 60 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400')
                    }`}>
                      {stat.precision}% Precisión
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className={`font-manrope font-black text-base ${isSelected ? 'text-white' : 'text-[#E0E0E0]'}`}>
                    {m}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] mt-0.5">
                    {stat.vistas} de {stat.total} preguntas resueltas
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-700 ${isSelected ? 'bg-primary' : 'bg-white/30'}`}
                    style={{ width: `${stat.porcentaje}%` }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. RECOMENDACIÓN INTELIGENTE DE REFUERZO */}
      {topPrioritySubtopic ? (
        <div className="bg-gradient-to-r from-[#2A2010] via-[#1E1B18] to-[#141824] border border-primary/40 rounded-3xl p-6 md:p-7 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 border border-primary/30 rounded-2xl text-primary shrink-0 mt-1">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  Prioridad #1 de Refuerzo
                </span>
                <span className="text-xs text-[#A0A0A0]">en {selectedMateria}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                {topPrioritySubtopic.name}
              </h2>
              <p className="text-sm text-[#C0C0C0] mt-1">
                Has acertado solo <strong className="text-white">{topPrioritySubtopic.correct} de {topPrioritySubtopic.total}</strong> preguntas ({topPrioritySubtopic.fails} fallos detectados).
              </p>
            </div>
          </div>

          <button
            onClick={() => onReforzar && onReforzar(selectedMateria, topPrioritySubtopic.name)}
            className="w-full md:w-auto px-7 py-3.5 bg-primary text-[#0A0A0A] font-black rounded-xl text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            Reforzar este subtema ahora
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : null}

      {/* 5. ZONAS CRÍTICAS / SUBTEMAS A MEJORAR */}
      {worstSubtopics.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#A0A0A0] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            Subtemas con Mayor Índice de Fallos en {selectedMateria}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {worstSubtopics.map((sub, idx) => (
              <div
                key={sub.name}
                className="bg-[#181216] border border-rose-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-rose-500/60 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      Prioridad {idx + 1}
                    </span>
                    <span className="text-lg font-black text-rose-400">
                      {sub.score}%
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white line-clamp-2" title={sub.name}>
                    {sub.name}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] mt-1">
                    {sub.correct} aciertos / {sub.fails} fallos ({sub.total} preguntas resueltas)
                  </p>
                </div>

                <button
                  onClick={() => onReforzar && onReforzar(selectedMateria, sub.name)}
                  className="w-full py-2.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Practicar Subtema <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. LISTA CLARA DE RENDIMIENTO POR TODOS LOS SUBTEMAS */}
      <div className="bg-[#141824]/60 border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-primary" />
              Detalle de Rendimiento por Subtema en {selectedMateria}
            </h2>
            <p className="text-xs text-[#A0A0A0] mt-0.5">
              Haz clic en cualquier subtema para hacer un simulacro enfocado.
            </p>
          </div>

          {/* Filtro por Semanas */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedSemanaSubtemas('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                selectedSemanaSubtemas === 'all'
                  ? 'bg-primary text-[#0A0A0A]'
                  : 'bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              Todas
            </button>
            {availableSemanas.map(semana => (
              <button
                key={semana}
                onClick={() => setSelectedSemanaSubtemas(semana)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  selectedSemanaSubtemas === semana
                    ? 'bg-primary text-[#0A0A0A]'
                    : 'bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                Semana {semana}
              </button>
            ))}
          </div>
        </div>

        {/* Lista visual de subtemas */}
        {subtemasDataFull.length > 0 ? (
          <div className="flex flex-col gap-3">
            {subtemasDataFull.map(sub => {
              const isDominado = sub.score >= 75;
              const isRegular = sub.score >= 60 && sub.score < 75;
              const isCritico = sub.score < 60;

              return (
                <div
                  key={sub.name}
                  className="bg-[#1A1F30]/70 hover:bg-[#1A1F30] border border-white/5 hover:border-white/20 p-4 rounded-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${isDominado ? 'bg-emerald-400' : (isRegular ? 'bg-amber-400' : 'bg-rose-400')}`}></span>
                      <h3 className="font-bold text-sm text-white truncate" title={sub.name}>
                        {sub.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-[#A0A0A0]">
                      <span>{sub.correct} correctas de {sub.total} preguntas</span>
                      <span>•</span>
                      <span>Semana {sub.semana}</span>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden max-w-md">
                      <div
                        className={`h-1.5 rounded-full ${isDominado ? 'bg-emerald-500' : (isRegular ? 'bg-amber-500' : 'bg-rose-500')}`}
                        style={{ width: `${sub.score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className={`text-lg font-black ${isDominado ? 'text-emerald-400' : (isRegular ? 'text-amber-400' : 'text-rose-400')}`}>
                        {sub.score}%
                      </span>
                      <p className="text-[10px] text-[#A0A0A0] uppercase font-bold">
                        {isDominado ? 'Dominado' : (isRegular ? 'En proceso' : 'Reforzar')}
                      </p>
                    </div>

                    <button
                      onClick={() => onReforzar && onReforzar(selectedMateria, sub.name)}
                      className="px-4 py-2 bg-white/5 hover:bg-primary hover:text-[#0A0A0A] border border-white/10 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Practicar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-[#A0A0A0] text-sm border-2 border-dashed border-white/5 rounded-2xl">
            No hay respuestas registradas para este filtro en {selectedMateria}. Resuelve preguntas en el simulador para ver el diagnóstico aquí.
          </div>
        )}
      </div>

      {/* 7. AVANCE POR SEMANAS DE LA ESPECIALIDAD */}
      <div className="bg-[#141824]/60 border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
        <div>
          <h2 className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-blue-400" />
            Progreso Semana a Semana en {selectedMateria}
          </h2>
          <p className="text-xs text-[#A0A0A0] mt-0.5">
            Despliega cada semana para ver exactamente qué preguntas ya respondiste y cuáles te faltan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {weeklyProgressData.map((weekData) => {
            const isExpanded = expandedWeeks[weekData.semana] || false;
            return (
              <div 
                key={weekData.semana} 
                className="bg-[#1A1F30]/70 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col gap-3"
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleWeek(weekData.semana)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-[#A0A0A0]" />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-base">
                        Semana {weekData.semana}
                      </h3>
                      <p className="text-xs text-[#A0A0A0]">
                        {weekData.vistas} de {weekData.total} preguntas resueltas
                      </p>
                    </div>
                  </div>

                  <span className="text-xl font-black font-manrope text-primary">
                    {weekData.porcentaje}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-700"
                    style={{ width: `${weekData.porcentaje}%` }}
                  ></div>
                </div>

                {/* Temas tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {weekData.temas.map(tema => (
                    <span key={tema} className="px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-md text-[#C0C0C0] text-[10px]">
                      {tema}
                    </span>
                  ))}
                </div>

                {/* Cuadrícula desplegable de preguntas */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs font-bold text-[#A0A0A0] mb-3">
                      Mapa de preguntas (clic para abrir/resolver):
                    </p>
                    <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5">
                      {weekData.questionsData?.map((q, idx) => (
                        <button
                          key={q.id}
                          onClick={() => {
                            if (onQuestionSelect) {
                              onQuestionSelect(q.id);
                            }
                          }}
                          title={`Pregunta ${idx + 1}: ${q.resolved ? (q.isCorrect ? '✅ Correcta' : '❌ Incorrecta') : '⚪ No resuelta'}`}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold border transition-all cursor-pointer hover:scale-110 ${
                            q.resolved 
                              ? (q.isCorrect 
                                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-sm font-black' 
                                  : 'bg-rose-500/30 text-rose-300 border-rose-500/50')
                              : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-[#A0A0A0] flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-emerald-500"></span> Correctas
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-500/60"></span> Falladas
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-white/10"></span> Sin responder
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
