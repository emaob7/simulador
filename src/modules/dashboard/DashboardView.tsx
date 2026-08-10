import React, { useMemo, useState, useEffect } from 'react';
import { DataService } from '../../services/DataService';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Materia, Session, UserProgress, Question } from '../../types';
import { ChevronDown, ChevronRight, Baby, Activity, Scissors, Heart, Star, AlertCircle, TrendingUp, CheckCircle, Bookmark } from 'lucide-react';
import { analyzeSubtema } from '../../utils/normalizer';


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const displayName = data.fullName || data.name || label;
    return (
      <div className="bg-[#121212] border border-white/5 p-4 rounded-xl shadow-2xl backdrop-blur-md text-left z-50">
        <p className="text-[#A0A0A0] font-bold text-[10px] uppercase tracking-widest mb-1">{displayName}</p>
        <p className="text-primary font-black text-lg">{`${payload[0].value}% Aciertos`}</p>
      </div>
    );
  }
  return null;
}

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
  const [isMobile, setIsMobile] = useState(false);

  const sessions = passedSessions !== undefined ? passedSessions : sessionsState;
  const progress = passedProgress !== undefined ? passedProgress : progressState;

  const toggleWeek = (semana: number) => {
    setExpandedWeeks(prev => ({ ...prev, [semana]: !prev[semana] }));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const globalAccuracy = useMemo(() => {
    const totalQ = sessions.reduce((sum, s) => sum + s.total_questions, 0);
    const totalC = sessions.reduce((sum, s) => sum + s.score, 0);
    return totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
  }, [sessions]);

  const materiaData = useMemo(() => {
    const groups: Record<string, { correct: number, total: number }> = {};
    MATERIAS.forEach(m => groups[m] = { correct: 0, total: 0 }); 
    
    sessions.forEach(s => {
      if (groups[s.materia]) {
        groups[s.materia].total += s.total_questions;
        groups[s.materia].correct += s.score;
      }
    });

    return Object.entries(groups).map(([name, data]) => ({
      name: name.length > 12 ? name.substring(0, 12) + '...' : name,
      fullName: name as Materia,
      score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      total: data.total
    })).sort((a, b) => a.score - b.score);
  }, [sessions]);

  const materiaStats = useMemo(() => {
    return MATERIAS.map(m => {
      const qOfMateria = allQuestions.filter(q => q.materia === m);
      const total = qOfMateria.length;
      
      const qIds = new Set(qOfMateria.map(q => q.id));
      const seen = progress.filter(p => qIds.has(p.question_id));
      const seenUnique = new Set(seen.map(p => p.question_id)).size;
      const progressPercent = total > 0 ? Math.round((seenUnique / total) * 100) : 0;

      const sessionsOfMateria = sessions.filter(s => s.materia === m);
      const totalQ = sessionsOfMateria.reduce((sum, s) => sum + s.total_questions, 0);
      const totalC = sessionsOfMateria.reduce((sum, s) => sum + s.score, 0);
      const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;

      return {
        materia: m as Materia,
        total,
        vistas: seenUnique,
        porcentaje: progressPercent,
        precision: accuracy
      };
    });
  }, [allQuestions, progress, sessions]);

  const defaultMateria = useMemo(() => {
    const sorted = [...materiaData].sort((a, b) => b.total - a.total);
    return sorted[0]?.total > 0 ? sorted[0].fullName : 'Pediatría';
  }, [materiaData]);

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
      if (q.materia === selectedMateria) {
        semanas.add(q.semana);
      }
    });
    return Array.from(semanas).sort((a, b) => a - b);
  }, [allQuestions, selectedMateria]);

  useEffect(() => {
    if (availableSemanas.length > 0 && !availableSemanas.includes(selectedSemanaSubtemas as number) && selectedSemanaSubtemas !== 'all') {
      setSelectedSemanaSubtemas(availableSemanas[0]);
    }
  }, [availableSemanas, selectedSemanaSubtemas]);

  const weeklyEvolutionData = useMemo(() => {
    const filteredSessions = sessions.filter(s => s.materia === selectedMateria);
    const groups: Record<number, { correct: number, total: number }> = {};
    
    filteredSessions.forEach(s => {
      if (!groups[s.semana]) groups[s.semana] = { correct: 0, total: 0 };
      groups[s.semana].total += s.total_questions;
      groups[s.semana].correct += s.score;
    });

    return Object.entries(groups).map(([semana, data]) => ({
      name: `Sem. ${semana}`,
      semana: Number(semana),
      score: Math.round((data.correct / data.total) * 100)
    })).sort((a, b) => a.semana - b.semana); 
  }, [sessions, selectedMateria]);

  const questionInfoMap = useMemo(() => {
    const map = new Map<string, { semana: number, subtema: string }>();
    allQuestions.forEach(q => {
      const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
      map.set(q.id, { semana: q.semana, subtema: normalizado });
    });
    return map;
  }, [allQuestions]);

  const subtemasDataFull = useMemo(() => {
    const groups: Record<string, { correct: number, total: number }> = {};
    
    progress.forEach(p => {
      const qInfo = questionInfoMap.get(p.question_id);
      if (!qInfo) return; // Skip if question no longer exists

      const qSemana = qInfo.semana;
      const subtema = qInfo.subtema || 'General';
      
      if (p.materia === selectedMateria) {
        if (selectedSemanaSubtemas !== 'all' && qSemana !== selectedSemanaSubtemas) {
          return;
        }

        if (!groups[subtema]) groups[subtema] = { correct: 0, total: 0 };
        groups[subtema].total++;
        if (p.is_correct) groups[subtema].correct++;
      }
    });

    return Object.entries(groups).map(([name, data]) => ({
      name,
      score: Math.round((data.correct / data.total) * 100),
      correct: data.correct,
      total: data.total,
      fill: Math.round((data.correct / data.total) * 100) >= 75 ? '#10b981' : (Math.round((data.correct / data.total) * 100) >= 60 ? '#f59e0b' : '#ef4444')
    })).filter(t => t.total > 0).sort((a, b) => b.score - a.score);
  }, [progress, selectedMateria, selectedSemanaSubtemas, questionInfoMap]);

  const subtemasSortedAsc = [...subtemasDataFull].sort((a, b) => a.score - b.score);
  const worstSubtopics = subtemasSortedAsc.filter(s => s.score < 60).slice(0, 5);
  // Also fallback to the lowest if there are no subtopics below 60
  const topCriticalSubtopics = worstSubtopics.length > 0 ? worstSubtopics : subtemasSortedAsc.slice(0,5);
  const worstSubtopicData = topCriticalSubtopics[0];


  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const score = payload.score;
    const color = score >= 75 ? '#34d399' : (score >= 60 ? '#fbbf24' : '#ef4444');
    return (
      <circle cx={cx} cy={cy} r={6} fill={color} stroke="#121212" strokeWidth={2} />
    );
  };

  const AxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#A0A0A0" fontSize={11} className="font-bold">
          {payload.value.length > 15 ? payload.value.substring(0, 15) + '...' : payload.value}
        </text>
      </g>
    );
  };

  const weeklyProgressData = useMemo(() => {
    const weeks = [...new Set(allQuestions.map(q => q.semana))].sort((a,b) => a - b);
    return weeks.map(week => {
      const qOfWeek = allQuestions.filter(q => q.semana === week);
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
  }, [allQuestions, progress]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-[#121212]/50 backdrop-blur-md rounded-3xl border border-white/5 flex items-center justify-center shadow-2xl mb-4">
          <span className="material-symbols-outlined text-4xl text-primary">analytics</span>
        </div>
        <h2 className="text-3xl font-black font-manrope uppercase tracking-tighter text-white">Sin datos de rendimiento</h2>
        <p className="text-[#A0A0A0] font-medium leading-relaxed">
          Todavía no has completado ninguna simulación. Puedes empezar un simulacro ahora o generar datos de muestra para ver las analíticas en acción.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'simulator' }))}
            className="flex-1 px-8 py-4 bg-primary text-[#0A0A0A] font-black rounded-2xl uppercase tracking-widest text-xs shadow-lg hover:bg-primary/90 transition-all"
          >
            Ir al Simulador
          </button>
          <button 
            onClick={handleGenerateMock}
            className="flex-1 px-8 py-4 bg-[#1E1E1E] text-white font-black rounded-2xl border border-white/5 uppercase tracking-widest text-xs hover:bg-white/5 shadow-sm transition-all"
          >
            Generar Demo Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      
      {/* OVERVIEW STATS & MATERIA SELECTION */}
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-[#A0A0A0] font-black uppercase tracking-[0.2em] text-[10px] mb-3 pl-1">Materia de Estudio</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {materiaStats.map(stat => {
              const m = stat.materia;
              const isActive = selectedMateria === m;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMateria(m)}
                  className={`p-4 rounded-2xl flex flex-col gap-2.5 text-left transition-all duration-300 border cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#241F10] to-[#141620] border-primary/50 shadow-[0_0_20px_rgba(198,168,74,0.15)] scale-[1.02]' 
                      : 'bg-white/[0.02] border-white/5 text-[#A0A0A0] hover:bg-white/5 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-2 rounded-xl transition-colors duration-300 ${isActive ? 'bg-primary/20 text-primary' : 'bg-white/5 text-[#A0A0A0]'}`}>
                      {MATERIA_ICONS[m]}
                    </div>
                    {stat.vistas > 0 && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                        stat.precision >= 75 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : (stat.precision >= 60 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400')
                      }`}>
                        {stat.precision}% ACC
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <h4 className={`font-manrope font-black text-sm tracking-tight ${isActive ? 'text-white' : 'text-[#D0D0D0]'}`}>
                      {m}
                    </h4>
                    <span className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-wider block mt-0.5">
                      {stat.vistas} / {stat.total} preguntas
                    </span>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-1 mt-1 overflow-hidden">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1000 ${
                        isActive ? 'bg-primary shadow-[0_0_8px_#C6A84A]' : 'bg-white/20'
                      }`}
                      style={{ width: `${stat.porcentaje}%` }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Accuracy & Bookmark Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#141824]/60 backdrop-blur-xl rounded-2xl p-5 flex items-center justify-between border border-white/5 shadow-lg">
            <div>
              <h3 className="text-[#A0A0A0] font-black uppercase tracking-[0.2em] text-[10px] mb-1">Precisión Global</h3>
              <p className="text-3xl md:text-4xl font-black text-white tracking-tighter font-manrope">
                {globalAccuracy}<span className="text-xl text-primary">%</span>
              </p>
              <p className="text-[#A0A0A0] text-[9px] font-bold uppercase tracking-widest mt-0.5">
                Historial completo de simulaciones
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black">
              🎯
            </div>
          </div>

          <div className="bg-[#141824]/60 backdrop-blur-xl rounded-2xl p-5 flex items-center justify-between border border-white/5 shadow-lg">
            <div>
              <h3 className="text-[#A0A0A0] font-black uppercase tracking-[0.2em] text-[10px] mb-1">Preguntas Guardadas</h3>
              <p className="text-3xl md:text-4xl font-black text-white tracking-tighter font-manrope">
                {savedQuestionIds.length} <span className="text-xs text-[#A0A0A0] font-bold font-sans">para repaso</span>
              </p>
              <button
                onClick={onStartBookmarksQuiz}
                disabled={savedQuestionIds.length === 0}
                className="mt-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-bold text-[9px] rounded-lg uppercase tracking-wider hover:bg-primary/20 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                Iniciar Repaso ★
              </button>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-black">
              ★
            </div>
          </div>
        </div>
      </div>

      {/* 1. BLOQUE PRÓXIMO PASO */}
      <section className="bg-gradient-to-br from-[#201C10] to-[#12141C] rounded-3xl p-6 md:p-8 border border-primary/30 shadow-2xl relative overflow-hidden flex flex-col justify-center">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <h3 className="font-manrope font-black text-xl md:text-2xl uppercase tracking-tighter mb-3 relative z-10 text-white">Tu Próximo Paso en {selectedMateria}</h3>
        {worstSubtopicData ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#D5D5D5] font-medium text-sm md:text-base leading-relaxed mb-3">
                Entidad recomendada a reforzar: <strong className="font-black text-white text-base md:text-lg">{worstSubtopicData.name}</strong>
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Precisión detectada:</span>
                <span className="text-primary font-black text-lg">{worstSubtopicData.score}%</span>
              </div>
            </div>
            <button 
              onClick={() => onReforzar && worstSubtopicData && onReforzar(selectedMateria, worstSubtopicData.name)}
              className="w-full md:w-auto px-8 py-4 bg-primary text-[#0A0A0A] font-black rounded-xl uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_25px_rgba(198,168,74,0.3)] hover:shadow-[0_0_40px_rgba(198,168,74,0.5)] cursor-pointer"
            >
              Reforzar Diagnóstico
            </button>
          </div>
        ) : (
          <p className="text-[#A0A0A0] font-medium italic relative z-10 text-sm">No hay suficientes datos clínicos de {selectedMateria} para diagnosticar debilidades.</p>
        )}
      </section>

      {/* 2. ZONAS CRÍTICAS (Subtemas) */}
      <section className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl overflow-hidden">
        <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6 md:mb-8 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Zonas Críticas en {selectedMateria}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {worstSubtopics.map((subtema, i) => (
            <div 
              key={i} 
              onClick={() => onReforzar && onReforzar(selectedMateria, subtema.name)}
              className="bg-[#1E1E1E]/50 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-red-500/20 relative overflow-hidden group hover:border-red-500/50 hover:bg-[#1E1E1E]/80 hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between h-40 shadow-md cursor-pointer"
              title={`Haga clic para reforzar el subtema: ${subtema.name}`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-400 to-red-600 transition-all duration-300 group-hover:w-1.5"></div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">Prioridad {i + 1}</p>
                  <span className="material-symbols-outlined text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">offline_bolt</span>
                </div>
                <p className="text-white font-bold text-sm mb-1 line-clamp-2 transition-colors group-hover:text-primary" title={subtema.name}>{subtema.name}</p>
                <p className="text-[#A0A0A0] text-[9px] line-clamp-1 italic">{subtema.correct} de {subtema.total} correctas ({subtema.score}%)</p>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-red-500 font-black text-3xl tracking-tighter leading-none">{subtema.score}<span className="text-sm">%</span></span>
                <span className="text-[#A0A0A0] text-[9px] uppercase font-bold tracking-widest bg-white/5 border border-white/5 px-2 py-0.5 rounded transition-all group-hover:bg-red-500/10 group-hover:text-red-400">{subtema.total} preg.</span>
              </div>
            </div>
          ))}
          {worstSubtopics.length === 0 && topCriticalSubtopics.length > 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-emerald-500/20 rounded-2xl bg-emerald-950/20">
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest">¡Excelente!</p>
              <p className="text-[#D5D5D5] text-sm mt-2">No tienes zonas críticas menores al 60% en esta materia.</p>
            </div>
          )}
          {worstSubtopics.length === 0 && topCriticalSubtopics.length === 0 && (
            <div className="col-span-full text-center py-12 border-2 border-dashed border-white/5 rounded-2xl text-[#A0A0A0] text-sm font-medium">
              No hay suficientes respuestas por subtema para evaluar.
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* 3. EVOLUCIÓN TEMPORAL */}
        <section className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl flex flex-col">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Evolución en {selectedMateria}
            </h3>
            {weeklyEvolutionData.length >= 2 && (
              <div className="text-right">
                <p className="text-[#A0A0A0] text-[8px] md:text-[9px] uppercase font-bold tracking-widest mb-1">Último ciclo</p>
                <p className={`text-xs md:text-sm font-black ${
                  weeklyEvolutionData[weeklyEvolutionData.length - 1].score >= weeklyEvolutionData[weeklyEvolutionData.length - 2].score 
                    ? 'text-emerald-500' 
                    : 'text-red-500'
                }`}>
                  {weeklyEvolutionData[weeklyEvolutionData.length - 1].score >= weeklyEvolutionData[weeklyEvolutionData.length - 2].score ? '+' : ''}
                  {weeklyEvolutionData[weeklyEvolutionData.length - 1].score - weeklyEvolutionData[weeklyEvolutionData.length - 2].score}%
                </p>
              </div>
            )}
          </div>
          
          <div className="h-48 md:h-64 w-full mt-auto">
            {weeklyEvolutionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyEvolutionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C6A84A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C6A84A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#A0A0A0" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#A0A0A0" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#C6A84A" 
                    strokeWidth={3} 
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    dot={{ r: 4, fill: '#0A0A0A', stroke: '#C6A84A', strokeWidth: 2 }} 
                    activeDot={{ r: 6, fill: '#C6A84A', stroke: '#0A0A0A', strokeWidth: 2 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-[#A0A0A0] text-sm font-medium">
                Sin datos en {selectedMateria}
              </div>
            )}
          </div>
        </section>

        {/* 4. COMPARATIVA POR MATERIA */}
        <section className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl flex flex-col">
          <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6 md:mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#A0A0A0]"></span>
            Comparativa General
          </h3>
          <div className="h-48 md:h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={materiaData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#A0A0A0" fontSize={10} tickLine={false} axisLine={false} hide />
                <YAxis dataKey="name" type="category" stroke="#A0A0A0" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} width={100} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar 
                  dataKey="score" 
                  radius={[0, 6, 6, 0]} 
                  barSize={24}
                  onClick={(data: any) => data && setSelectedMateria(data.fullName)}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                >
                  {materiaData.map((entry, index) => {
                    let fill = 'rgba(255,255,255,0.15)';
                    if (entry.fullName === selectedMateria) {
                      fill = '#C6A84A';
                    } else if (entry.total === 0) {
                      fill = 'rgba(255,255,255,0.03)';
                    } else if (entry.score < 60) {
                      fill = 'rgba(239,68,68,0.5)';
                    }
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={fill} 
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[#A0A0A0] text-[10px] uppercase tracking-widest mt-4 font-bold">
            Clic en una barra para analizar materia
          </p>
        </section>
      </div>

      {/* 5. ANÁLISIS POR SUBTEMAS */}
      <section className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Análisis por Subtemas: {selectedMateria}
          </h3>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-[#A0A0A0]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> &gt; 75%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 60-75%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> &lt; 60%</span>
          </div>
        </div>

        <div className="flex flex-row md:flex-wrap gap-2 overflow-x-auto pb-4 scrollbar-hide md:overflow-visible mb-2">
          <button
            onClick={() => setSelectedSemanaSubtemas('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
              selectedSemanaSubtemas === 'all' 
                ? 'bg-primary text-[#0A0A0A] shadow-md' 
                : 'bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            Todas
          </button>
          {availableSemanas.map(semana => (
            <button
              key={semana}
              onClick={() => setSelectedSemanaSubtemas(semana)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                selectedSemanaSubtemas === semana 
                  ? 'bg-primary text-[#0A0A0A] shadow-md' 
                  : 'bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              Semana {semana}
            </button>
          ))}
        </div>

        <div className="h-[500px] w-full">
          {subtemasDataFull.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subtemasDataFull} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={true} />
                <XAxis type="number" domain={[0, 100]} stroke="#A0A0A0" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#A0A0A0" 
                  fontSize={10} 
                  fontWeight={500} 
                  tickLine={false} 
                  axisLine={false} 
                  width={isMobile ? 85 : 150} 
                  tickFormatter={(val) => val.length > (isMobile ? 12 : 25) ? val.substring(0, isMobile ? 12 : 25) + '...' : val} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar 
                  dataKey="score" 
                  radius={[0, 4, 4, 0]} 
                  barSize={16}
                >
                  {subtemasDataFull.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="w-full h-full flex items-center justify-center flex-col gap-2 border-2 border-dashed border-white/5 rounded-2xl text-[#A0A0A0] text-sm font-medium">
                <p>No hay respuestas suficientes para el periodo seleccionado.</p>
             </div>
          )}
        </div>
      </section>

      {/* 6. MONITOREAR AVANCE GLOBAL */}
      <section className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl overflow-hidden">
        <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6 md:mb-8 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Monitorear Avance General por Semana
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {weeklyProgressData.map((weekData) => {
            const isExpanded = expandedWeeks[weekData.semana] || false;
            return (
              <div key={weekData.semana} className="bg-[#1E1E1E]/40 p-5 md:p-6 rounded-2xl border border-white/5 shadow-md flex flex-col hover:border-primary/30 hover:bg-[#1E1E1E]/60 transition-all duration-300 cursor-pointer" onClick={() => toggleWeek(weekData.semana)}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className={`p-2 rounded-lg bg-white/5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5 text-[#A0A0A0]" />
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase tracking-[0.1em] text-lg mb-1">
                        Semana {weekData.semana}
                      </h4>
                      <p className="text-[#A0A0A0] text-xs font-medium">
                        {weekData.vistas} / {weekData.total} preguntas resueltas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-manrope text-primary drop-shadow-sm">
                      {weekData.porcentaje}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-white/5 rounded-full h-2 mb-4 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${weekData.porcentaje}%` }}
                  ></div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/5">
                  <p className="text-[#A0A0A0] text-[10px] font-bold uppercase tracking-widest mb-2">Temas abordados:</p>
                  <div className="flex flex-wrap gap-2">
                    {weekData.temas.map(tema => (
                      <span key={tema} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[#D5D5D5] text-[10px] font-medium">
                        {tema}
                      </span>
                    ))}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-6 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                    <p className="text-[#A0A0A0] text-[10px] font-bold uppercase tracking-widest mb-3">Detalle de Preguntas:</p>
                    <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1.5">
                      {weekData.questionsData?.map((q, idx) => (
                        <div 
                          key={q.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onQuestionSelect && (!q.resolved || !q.isCorrect)) {
                              onQuestionSelect(q.id);
                            } else if (onQuestionSelect) {
                              onQuestionSelect(q.id);
                            }
                          }}
                          title={`Pregunta ${idx + 1}: ${q.resolved ? (q.isCorrect ? 'Correcta' : 'Incorrecta/Vista') : 'No resuelta'}`}
                          className={`w-full aspect-square rounded-sm flex items-center justify-center text-[8px] font-bold border transition-all cursor-pointer hover:scale-105 hover:shadow-md ${
                            q.resolved 
                              ? (q.isCorrect ? 'bg-primary text-[#0A0A0A] border-primary/50' : 'bg-[#A0A0A0]/10 text-white border-white/10')
                              : 'bg-white/5 text-white/20 border-white/5 hover:border-primary/30'
                          }`}
                        >
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-[9px] font-bold uppercase tracking-widest text-[#A0A0A0]">
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-primary border border-primary/50 rounded-sm"></div> Correctas</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#A0A0A0]/10 border border-white/10 rounded-sm"></div> Incorrectas / Vistas</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-white/5 border border-white/5 rounded-sm"></div> Sin resolver</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {weeklyProgressData.length === 0 && (
            <div className="col-span-full py-8 text-center text-[#2E2E2E] text-sm">
              No hay preguntas cargadas en el banco aún.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
