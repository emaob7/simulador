import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Play, 
  Search, 
  Layers, 
  Flame, 
  Target, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { Question } from '../../types';
import { analyzeSubtema } from '../../utils/normalizer';

const MATERIAS = ['Todas', 'Pediatría', 'Medicina Interna', 'Cirugía', 'Ginecología y Obstetricia'] as const;
type MateriaFilter = typeof MATERIAS[number];

const MATERIA_ICONS: Record<string, React.ReactNode> = {
  'Pediatría': <Layers className="w-4 h-4 text-sky-400" />,
  'Medicina Interna': <Flame className="w-4 h-4 text-amber-400" />,
  'Cirugía': <Target className="w-4 h-4 text-emerald-400" />,
  'Ginecología y Obstetricia': <Sparkles className="w-4 h-4 text-pink-400" />,
};

interface SavedQuestionsViewProps {
  allQuestions: Question[];
  savedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onStartQuizWithQuestions: (questions: Question[]) => void;
  onQuestionSelect: (questionId: string) => void;
  onBackToSimulator: () => void;
}

export function SavedQuestionsView({
  allQuestions,
  savedQuestionIds,
  onToggleBookmark,
  onStartQuizWithQuestions,
  onQuestionSelect,
  onBackToSimulator
}: SavedQuestionsViewProps) {
  const [selectedMateria, setSelectedMateria] = useState<MateriaFilter>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Obtener todas las preguntas guardadas
  const savedQuestions = useMemo(() => {
    return allQuestions.filter(q => savedQuestionIds.includes(q.id));
  }, [allQuestions, savedQuestionIds]);

  // 2. Conteo por materias
  const materiaCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Todas': savedQuestions.length,
      'Pediatría': 0,
      'Medicina Interna': 0,
      'Cirugía': 0,
      'Ginecología y Obstetricia': 0
    };

    savedQuestions.forEach(q => {
      const m = q.materia;
      if (counts[m] !== undefined) {
        counts[m]++;
      }
    });

    return counts;
  }, [savedQuestions]);

  // 3. Filtrar por materia y búsqueda
  const filteredQuestions = useMemo(() => {
    return savedQuestions.filter(q => {
      const matchesMateria = selectedMateria === 'Todas' || q.materia === selectedMateria;
      const matchesSearch = !searchQuery.trim() || 
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.subtema && q.subtema.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.tema && q.tema.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesMateria && matchesSearch;
    });
  }, [savedQuestions, selectedMateria, searchQuery]);

  const handleStartFilteredQuiz = () => {
    if (filteredQuestions.length === 0) return;
    onStartQuizWithQuestions(filteredQuestions);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* 1. HEADER CON ACCIONES */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#121212]/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSimulator}
              className="p-2 rounded-xl bg-[#2E2E2E] hover:bg-[#2E2E2E]/80 border border-[#424242] text-[#A6A6A6] hover:text-white transition-all cursor-pointer shadow-sm"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#C6A84A]/20 border border-[#C6A84A]/30 text-[#E0AF26]">
                <Bookmark className="w-5 h-5 fill-current" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-manrope">
                Preguntas Guardadas
              </h1>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[#A6A6A6] max-w-xl font-medium pl-11">
            Tienes <strong className="text-[#E0AF26]">{savedQuestions.length}</strong> preguntas marcadas como favoritas para entrenamiento focalizado.
          </p>
        </div>

        {savedQuestions.length > 0 && (
          <button
            onClick={handleStartFilteredQuiz}
            disabled={filteredQuestions.length === 0}
            className="relative z-10 px-6 py-3.5 bg-primary text-[#0A0A0A] font-black rounded-xl uppercase tracking-wider text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(198,168,74,0.3)] hover:shadow-[0_0_35px_rgba(198,168,74,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>
              {selectedMateria === 'Todas' 
                ? `Repasar Todas (${filteredQuestions.length})` 
                : `Repasar ${selectedMateria} (${filteredQuestions.length})`}
            </span>
          </button>
        )}
      </div>

      {/* 2. PESTAÑAS DE MATERIAS Y BUSCADOR */}
      <div className="space-y-4">
        {/* Selector de Materias */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {MATERIAS.map(materia => {
            const isSelected = selectedMateria === materia;
            const count = materiaCounts[materia] || 0;
            const icon = MATERIA_ICONS[materia];

            return (
              <button
                key={materia}
                onClick={() => setSelectedMateria(materia)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all duration-200 cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-[#2E2E2E] text-[#E0AF26] border-[#C6A84A] shadow-[0_0_20px_rgba(198,168,74,0.2)] ring-1 ring-[#C6A84A]/50'
                    : 'bg-[#1C1C1C] text-[#A6A6A6] border-[#424242]/50 hover:border-[#C6A84A]/40 hover:text-white'
                }`}
              >
                {icon}
                <span>{materia}</span>
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                  isSelected 
                    ? 'bg-[#C6A84A]/25 text-[#E0AF26] border border-[#C6A84A]/30' 
                    : count > 0 ? 'bg-white/10 text-white' : 'bg-white/5 text-[#A6A6A6]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Buscador de preguntas guardadas */}
        {savedQuestions.length > 0 && (
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por texto, subtema o diagnóstico en tus preguntas guardadas..."
              className="w-full bg-[#1C1C1C] border border-[#424242] focus:border-[#C6A84A] focus:ring-1 focus:ring-[#C6A84A] text-xs md:text-sm py-3 pl-10 pr-4 rounded-2xl text-white placeholder:text-[#A6A6A6] transition-all outline-none"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#A6A6A6] pointer-events-none" />
          </div>
        )}
      </div>

      {/* 3. LISTADO DE PREGUNTAS GUARDADAS */}
      {filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#A6A6A6] px-1 font-semibold">
            <span>Mostrando {filteredQuestions.length} {filteredQuestions.length === 1 ? 'pregunta' : 'preguntas'}</span>
            <span>Especialidad: <strong className="text-[#E0AF26]">{selectedMateria}</strong></span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredQuestions.map((q) => {
              const subInfo = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);

              return (
                <div
                  key={q.id}
                  className="bg-[#1C1C1C]/90 hover:bg-[#1E1E1E] border border-[#424242]/60 hover:border-[#C6A84A]/40 rounded-2xl p-5 md:p-6 transition-all duration-200 shadow-md flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-3">
                    {/* Metadatos superiores */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-wider text-[#E0AF26]">
                          {q.materia} • Semana {q.semana}
                        </span>
                        <span className="text-[11px] text-[#A6A6A6] font-semibold">
                          {subInfo.normalizado || q.subtema}
                        </span>
                      </div>

                      <span className="text-[10px] text-[#A6A6A6]/60 font-mono">
                        ID: {q.id}
                      </span>
                    </div>

                    {/* Enunciado */}
                    <p className="text-sm md:text-base font-semibold text-white leading-relaxed">
                      {q.text}
                    </p>

                    {/* Vista previa de opciones */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === q.correctOptionIndex;
                        return (
                          <div 
                            key={oIdx}
                            className={`p-2.5 rounded-xl text-xs flex items-center gap-2.5 border ${
                              isCorrect 
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 font-medium' 
                                : 'bg-[#121212]/50 border-white/5 text-[#A6A6A6]'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                              isCorrect 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-white/5 text-[#A6A6A6]'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="line-clamp-1">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Acciones de la tarjeta */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className="px-3.5 py-2 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                      title="Quitar de guardadas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Quitar</span>
                    </button>

                    <button
                      onClick={() => onQuestionSelect(q.id)}
                      className="px-4 py-2 rounded-xl bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 border border-[#C6A84A]/40 text-[#E0AF26] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                    >
                      <span>Practicar esta pregunta</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Estado vacío */
        <div className="text-center py-16 px-6 bg-[#121212]/50 rounded-3xl border border-white/5 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#1C1C1C] border border-[#424242] text-[#E0AF26] flex items-center justify-center mx-auto shadow-inner">
            <Bookmark className="w-8 h-8 opacity-40" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              {savedQuestions.length === 0 
                ? 'No tienes preguntas guardadas aún' 
                : `No hay preguntas guardadas en ${selectedMateria}`}
            </h3>
            <p className="text-xs text-[#A6A6A6] max-w-md mx-auto leading-relaxed">
              {savedQuestions.length === 0 
                ? 'Haz clic en el icono de marcador (marcapáginas) durante cualquier simulacro o revisión para guardar preguntas y repasarlas aquí.' 
                : 'Selecciona otra materia arriba para ver tus otras preguntas guardadas.'}
            </p>
          </div>
          <button
            onClick={onBackToSimulator}
            className="mt-4 px-6 py-3 bg-[#2E2E2E] hover:bg-[#2E2E2E]/80 border border-[#C6A84A]/40 text-[#E0AF26] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ir al Simulador</span>
          </button>
        </div>
      )}

    </div>
  );
}
