import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  Target, 
  Sparkles, 
  Flame, 
  ChevronRight, 
  ChevronDown, 
  RotateCcw,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Bookmark,
  Calendar,
  Layers
} from 'lucide-react';
import { Question } from '../../types';
import { analyzeSubtema } from '../../utils/normalizer';

const MATERIAS = ['Pediatría', 'Medicina Interna', 'Cirugía', 'Ginecología y Obstetricia'] as const;
type Materia = typeof MATERIAS[number];

const MATERIA_ICONS: Record<Materia, React.ReactNode> = {
  'Pediatría': <Layers className="w-5 h-5" />,
  'Medicina Interna': <Flame className="w-5 h-5" />,
  'Cirugía': <Target className="w-5 h-5" />,
  'Ginecología y Obstetricia': <Sparkles className="w-5 h-5" />
};

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
  userId,
  onReforzar,
  allQuestions,
  onQuestionSelect,
  savedQuestionIds = [],
  onStartBookmarksQuiz,
  sessions = [],
  progress = [],
  onReloadData
}: DashboardViewProps) {

  // Normalize names
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
    if (availableSemanas.length > 0) {
      setSelectedSemanaSubtemas('all');
    }
  }, [selectedMateria, availableSemanas]);

  const [selectedSemanaSubtemas, setSelectedSemanaSubtemas] = useState<number | 'all'>('all');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({});

  const toggleWeek = (semana: number) => {
    setExpandedWeeks(prev => ({ ...prev, [semana]: !prev[semana] }));
  };

  // Subtopic performance calculations
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

  // Critical subtopics (Lowest accuracy with at least 1 fail)
  const worstSubtopics = useMemo(() => {
    return Object.values(subtopicMap)
      .filter(s => s.fails > 0)
      .sort((a, b) => a.score - b.score || b.fails - a.fails)
      .slice(0, 4);
  }, [subtopicMap]);

  // Priority #1 subtopic
  const topPrioritySubtopic = worstSubtopics[0] || null;

  // Filtered subtopics list
  const subtemasDataFull = useMemo(() => {
    let list = Object.values(subtopicMap);
    if (selectedSemanaSubtemas !== 'all') {
      list = list.filter(s => s.semana === selectedSemanaSubtemas);
    }
    return list.sort((a, b) => a.score - b.score);
  }, [subtopicMap, selectedSemanaSubtemas]);

  // Weekly question map
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
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6A84A]"></span>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#FFFFFF] font-manrope">
              Tu Panel de Rendimiento
            </h1>
          </div>
          <p className="text-xs text-[#A6A6A6] mt-1 font-medium">
            Analiza tus aciertos por especialidad, identifica tus puntos débiles y refuerza antes del examen.
          </p>
        </div>

        {onReloadData && (
          <button
            onClick={onReloadData}
            className="self-start sm:self-auto px-4 py-2 bg-[#2E2E2E] hover:bg-[#2E2E2E]/80 border border-[#424242] hover:border-[#C6A84A]/40 text-xs font-bold text-[#A6A6A6] hover:text-[#E0AF26] rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E0AF26]" />
            Actualizar datos
          </button>
        )}
      </div>

      {/* 2. TARJETAS DE RESUMEN GLOBAL */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Respondidas */}
        <div className="bg-[#2E2E2E] border border-[#424242] rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#A6A6A6] uppercase tracking-wider mb-1">Preguntas Respondidas</p>
            <p className="text-3xl font-black font-manrope text-[#FFFFFF]">
              {totalQuestionsAnswered} <span className="text-sm font-semibold text-[#A6A6A6]">/ {allQuestions.length}</span>
            </p>
            <p className="text-[11px] text-[#A6A6A6] mt-1 font-medium">
              {allQuestions.length > 0 ? Math.round((totalQuestionsAnswered / allQuestions.length) * 100) : 0}% del banco resuelto
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] border border-[#424242] flex items-center justify-center text-[#E0AF26]">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Precisión Global */}
        <div className="bg-[#2E2E2E] border border-[#424242] rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#A6A6A6] uppercase tracking-wider mb-1">Precisión Global</p>
            <p className="text-3xl font-black font-manrope text-[#E0AF26]">
              {globalAccuracy}%
            </p>
            <p className="text-[11px] text-[#A6A6A6] mt-1 font-medium">
              En {sessions.length} simulacros completados
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] border border-[#424242] flex items-center justify-center text-[#E0AF26]">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Preguntas Guardadas */}
        <div className="bg-[#2E2E2E] border border-[#424242] rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#A6A6A6] uppercase tracking-wider mb-1">Preguntas Guardadas</p>
            <p className="text-3xl font-black font-manrope text-[#E0AF26]">
              {savedQuestionIds.length} <span className="text-sm font-semibold text-[#A6A6A6]">favoritas</span>
            </p>
            {savedQuestionIds.length > 0 && (
              <button
                onClick={onStartBookmarksQuiz}
                className="mt-2 text-[11px] font-bold text-[#E0AF26] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Repasar guardadas <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] border border-[#424242] flex items-center justify-center text-[#E0AF26]">
            <Bookmark className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. SELECTOR PRINCIPAL DE ESPECIALIDAD */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#A6A6A6]">
            Elige una Especialidad para Explorar
          </h2>
          <span className="text-xs font-medium text-[#A6A6A6]">
            Viendo: <strong className="text-[#E0AF26]">{selectedMateria}</strong>
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
                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'bg-[#2E2E2E] border-[#C6A84A] shadow-[0_0_25px_rgba(198,168,74,0.2)] ring-1 ring-[#C6A84A]'
                    : 'bg-[#2E2E2E] border-[#424242] hover:border-[#C6A84A]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#C6A84A] text-[#121212]' : 'bg-[#1C1C1C] text-[#A6A6A6] border border-[#424242]'}`}>
                    {MATERIA_ICONS[m]}
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${
                      stat.precision >= 75 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : (stat.precision >= 60 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400')
                    }`}>
                      {stat.precision}% de precisión
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className={`font-manrope font-black text-base ${isSelected ? 'text-[#E0AF26]' : 'text-[#FFFFFF]'}`}>
                    {m}
                  </h3>
                  <p className="text-xs text-[#A6A6A6] mt-0.5 font-medium">
                    {stat.vistas} de {stat.total} preguntas resueltas
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#1C1C1C] rounded-full h-1.5 overflow-hidden border border-[#424242]/40">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${isSelected ? 'bg-[#E0AF26]' : 'bg-[#A6A6A6]/40'}`}
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
        <div className="bg-[#2E2E2E] border border-[#C6A84A] rounded-3xl p-6 md:p-7 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#1C1C1C] border border-[#C6A84A]/40 rounded-2xl text-[#E0AF26] shrink-0 mt-1">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#C6A84A]/20 text-[#E0AF26] border border-[#C6A84A]/30">
                  Prioridad #1 de Refuerzo
                </span>
                <span className="text-xs text-[#A6A6A6]">en {selectedMateria}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-[#FFFFFF] mt-1">
                {topPrioritySubtopic.name}
              </h2>
              <p className="text-sm text-[#A6A6A6] mt-1">
                Has acertado solo <strong className="text-[#FFFFFF]">{topPrioritySubtopic.correct} de {topPrioritySubtopic.total}</strong> preguntas ({topPrioritySubtopic.fails} fallos detectados).
              </p>
            </div>
          </div>

          <button
            onClick={() => onReforzar && onReforzar(selectedMateria, topPrioritySubtopic.name)}
            className="w-full md:w-auto px-7 py-3.5 bg-[#E0AF26] hover:bg-[#C6A84A] text-[#121212] font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            Reforzar este subtema ahora
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : null}

      {/* 5. ZONAS CRÍTICAS / SUBTEMAS A MEJORAR */}
      {worstSubtopics.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#A6A6A6] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            Subtemas con Mayor Índice de Fallos en {selectedMateria}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {worstSubtopics.map((sub, idx) => (
              <div
                key={sub.name}
                className="bg-[#2E2E2E] border border-rose-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-rose-500/60 transition-all shadow-md"
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
                  <h3 className="font-bold text-sm text-[#FFFFFF] line-clamp-2" title={sub.name}>
                    {sub.name}
                  </h3>
                  <p className="text-xs text-[#A6A6A6] mt-1">
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
      <div className="bg-[#2E2E2E] border border-[#424242] rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2.5 text-[#FFFFFF]">
              <BarChart3 className="w-5 h-5 text-[#E0AF26]" />
              Detalle de Rendimiento por Subtema en {selectedMateria}
            </h2>
            <p className="text-xs text-[#A6A6A6] mt-0.5">
              Haz clic en cualquier subtema para hacer un simulacro enfocado.
            </p>
          </div>

          {/* Filtro por Semanas */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedSemanaSubtemas('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                selectedSemanaSubtemas === 'all'
                  ? 'bg-[#E0AF26] text-[#121212]'
                  : 'bg-[#1C1C1C] text-[#A6A6A6] hover:bg-[#424242] hover:text-white border border-[#424242]'
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
                    ? 'bg-[#E0AF26] text-[#121212]'
                    : 'bg-[#1C1C1C] text-[#A6A6A6] hover:bg-[#424242] hover:text-white border border-[#424242]'
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
                  className="bg-[#1C1C1C] hover:bg-[#1C1C1C]/80 border border-[#424242] hover:border-[#C6A84A]/40 p-4 rounded-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${isDominado ? 'bg-emerald-400' : (isRegular ? 'bg-amber-400' : 'bg-rose-400')}`}></span>
                      <h3 className="font-bold text-sm text-[#FFFFFF] truncate" title={sub.name}>
                        {sub.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-[#A6A6A6]">
                      <span>{sub.correct} correctas de {sub.total} preguntas</span>
                      <span>•</span>
                      <span>Semana {sub.semana}</span>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="w-full bg-[#2E2E2E] rounded-full h-1.5 mt-2 overflow-hidden max-w-md border border-[#424242]/30">
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
                      <p className="text-[10px] text-[#A6A6A6] uppercase font-bold">
                        {isDominado ? 'Dominado' : (isRegular ? 'En proceso' : 'Reforzar')}
                      </p>
                    </div>

                    <button
                      onClick={() => onReforzar && onReforzar(selectedMateria, sub.name)}
                      className="px-4 py-2 bg-[#2E2E2E] hover:bg-[#E0AF26] text-[#FFFFFF] hover:text-[#121212] border border-[#424242] rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Practicar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-[#A6A6A6] text-sm border-2 border-dashed border-[#424242] rounded-2xl">
            No hay respuestas registradas para este filtro en {selectedMateria}. Resuelve preguntas en el simulador para ver el diagnóstico aquí.
          </div>
        )}
      </div>

      {/* 7. AVANCE POR SEMANAS DE LA ESPECIALIDAD */}
      <div className="bg-[#2E2E2E] border border-[#424242] rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
        <div>
          <h2 className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2.5 text-[#FFFFFF]">
            <Calendar className="w-5 h-5 text-[#E0AF26]" />
            Progreso Semana a Semana en {selectedMateria}
          </h2>
          <p className="text-xs text-[#A6A6A6] mt-0.5">
            Despliega cada semana para ver exactamente qué preguntas ya respondiste y cuáles te faltan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {weeklyProgressData.map((weekData) => {
            const isExpanded = expandedWeeks[weekData.semana] || false;
            return (
              <div 
                key={weekData.semana} 
                className="bg-[#1C1C1C] p-5 rounded-2xl border border-[#424242] hover:border-[#C6A84A]/30 transition-all flex flex-col gap-3"
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleWeek(weekData.semana)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-[#2E2E2E] border border-[#424242] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-[#A6A6A6]" />
                    </div>
                    <div>
                      <h3 className="text-[#FFFFFF] font-black text-base">
                        Semana {weekData.semana}
                      </h3>
                      <p className="text-xs text-[#A6A6A6]">
                        {weekData.vistas} de {weekData.total} preguntas resueltas
                      </p>
                    </div>
                  </div>

                  <span className="text-xl font-black font-manrope text-[#E0AF26]">
                    {weekData.porcentaje}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#2E2E2E] rounded-full h-2 overflow-hidden border border-[#424242]/30">
                  <div 
                    className="bg-[#E0AF26] h-2 rounded-full transition-all duration-700"
                    style={{ width: `${weekData.porcentaje}%` }}
                  ></div>
                </div>

                {/* Temas tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {weekData.temas.map(tema => (
                    <span key={tema} className="px-2.5 py-0.5 bg-[#2E2E2E] border border-[#424242] rounded-md text-[#FAF9F6] text-[10px]">
                      {tema}
                    </span>
                  ))}
                </div>

                {/* Cuadrícula desplegable de preguntas */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#424242] animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs font-bold text-[#A6A6A6] mb-3">
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
                              : 'bg-[#2E2E2E] text-[#A6A6A6] border-[#424242] hover:border-[#C6A84A]'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-[#A6A6A6] flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-emerald-500"></span> Correctas
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-500/60"></span> Falladas
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-[#2E2E2E] border border-[#424242]"></span> Sin responder
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
