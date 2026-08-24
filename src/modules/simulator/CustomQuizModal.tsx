import React, { useState, useMemo } from 'react';
import { X, Check, Sliders, BookOpen, Clock, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import type { Question, QuizScope } from '../../types';
import { STUDY_SUBJECTS, STUDY_TOPICS, classifyQuestionForStudy } from '../../utils/studyCatalog';

interface CustomQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  allQuestions: Question[];
  onStartQuiz: (questions: Question[], scope: QuizScope, config: { count: number; mode: 'practice' | 'exam' }) => void;
}

export function CustomQuizModal({ isOpen, onClose, allQuestions, onStartQuiz }: CustomQuizModalProps) {
  // Map of topicId -> boolean
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(() => {
    // Default: all topics selected
    return new Set(STUDY_TOPICS.map(t => t.id));
  });

  const [expandedMaterias, setExpandedMaterias] = useState<Record<string, boolean>>({
    'Pediatría': true,
    'Medicina Interna': false,
    'Cirugía': false,
    'Ginecología y Obstetricia': false,
  });

  const [questionCount, setQuestionCount] = useState<number>(20);
  const [isCustomCount, setIsCustomCount] = useState<boolean>(false);
  const [customInputVal, setCustomInputVal] = useState<string>('20');
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');

  // Pre-calculate questions per topic
  const questionsByTopic = useMemo(() => {
    const map = new Map<string, Question[]>();
    STUDY_TOPICS.forEach(t => map.set(t.id, []));
    allQuestions.forEach(q => {
      const cls = classifyQuestionForStudy(q);
      const list = map.get(cls.topicId);
      if (list) {
        list.push(q);
      }
    });
    return map;
  }, [allQuestions]);

  // Pool of questions based on selected topics
  const matchingQuestions = useMemo(() => {
    const pool: Question[] = [];
    selectedTopicIds.forEach(topicId => {
      const qs = questionsByTopic.get(topicId);
      if (qs) {
        pool.push(...qs);
      }
    });
    return pool;
  }, [selectedTopicIds, questionsByTopic]);

  if (!isOpen) return null;

  const toggleMateriaExpand = (materia: string) => {
    setExpandedMaterias(prev => ({ ...prev, [materia]: !prev[materia] }));
  };

  const toggleTopic = (topicId: string) => {
    setSelectedTopicIds(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const toggleAllTopicsInMateria = (materia: string) => {
    const subject = STUDY_SUBJECTS.find(s => s.materia === materia);
    if (!subject) return;

    const allSelected = subject.topicIds.every(id => selectedTopicIds.has(id));
    setSelectedTopicIds(prev => {
      const next = new Set(prev);
      if (allSelected) {
        subject.topicIds.forEach(id => next.delete(id));
      } else {
        subject.topicIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedTopicIds(new Set(STUDY_TOPICS.map(t => t.id)));
  };

  const deselectAll = () => {
    setSelectedTopicIds(new Set());
  };

  const handleStart = () => {
    if (matchingQuestions.length === 0) return;

    const countToTake = isCustomCount
      ? Math.min(Math.max(1, parseInt(customInputVal) || 20), matchingQuestions.length)
      : Math.min(questionCount, matchingQuestions.length);

    // Shuffle
    const shuffled = [...matchingQuestions].sort(() => 0.5 - Math.random()).slice(0, countToTake);

    // Get list of selected materias for scope description
    const selectedMateriasList = STUDY_SUBJECTS
      .filter(s => s.topicIds.some(id => selectedTopicIds.has(id)))
      .map(s => s.materia);

    const materiaLabel = selectedMateriasList.length === 4 
      ? 'Todas las materias'
      : selectedMateriasList.length === 1
      ? selectedMateriasList[0]
      : `${selectedMateriasList.length} materias seleccionadas`;

    const scope: QuizScope = {
      type: 'random',
      id: `custom-quiz-${Date.now()}`,
      label: `Simulacro Personalizado (${countToTake} preguntas)`,
      materia: materiaLabel,
      sourceWeeks: Array.from(new Set(shuffled.map(q => q.semana))).sort((a, b) => a - b),
    };

    onStartQuiz(shuffled, scope, { count: countToTake, mode });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#121212] border border-[#C6A84A]/30 rounded-2xl shadow-[0_0_50px_rgba(198,168,74,0.15)] flex flex-col overflow-hidden text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#1A1A1A]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide uppercase font-manrope text-white">
                Personalizar Simulacro
              </h2>
              <p className="text-xs text-[#A6A6A6]">
                Elige las materias y temas clínicos para tu evaluación a medida
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#A6A6A6] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar">
          
          {/* Section 1: Selector de Materias y Temas Clínicos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-primary font-manrope flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                1. Selección de Materias y Temas Clínicos
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-[11px] font-bold text-[#E0AF26] hover:underline px-2 py-0.5"
                >
                  Seleccionar Todo
                </button>
                <span className="text-[#444]">•</span>
                <button
                  type="button"
                  onClick={deselectAll}
                  className="text-[11px] font-bold text-[#A6A6A6] hover:text-white px-2 py-0.5"
                >
                  Limpiar
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {STUDY_SUBJECTS.map(subject => {
                const isExpanded = expandedMaterias[subject.materia] ?? false;
                const subjectTopics = STUDY_TOPICS.filter(t => t.materia === subject.materia);
                const selectedInSubject = subjectTopics.filter(t => selectedTopicIds.has(t.id)).length;
                const totalInSubject = subjectTopics.length;
                const allSelected = selectedInSubject === totalInSubject;
                const someSelected = selectedInSubject > 0 && !allSelected;

                const subjectQuestionsCount = subjectTopics.reduce((acc, t) => acc + (questionsByTopic.get(t.id)?.length || 0), 0);
                const selectedQuestionsCount = subjectTopics
                  .filter(t => selectedTopicIds.has(t.id))
                  .reduce((acc, t) => acc + (questionsByTopic.get(t.id)?.length || 0), 0);

                return (
                  <div 
                    key={subject.id} 
                    className="border border-white/10 rounded-xl overflow-hidden bg-[#161616] transition-colors hover:border-white/20"
                  >
                    {/* Materia Header Bar */}
                    <div className="flex items-center justify-between p-3.5 bg-[#1C1C1C] cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          ref={el => {
                            if (el) el.indeterminate = someSelected;
                          }}
                          onChange={() => toggleAllTopicsInMateria(subject.materia)}
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary bg-[#121212] cursor-pointer accent-[#E0AF26]"
                        />
                        <span 
                          onClick={() => toggleMateriaExpand(subject.materia)}
                          className="font-bold text-sm text-white hover:text-primary transition-colors flex items-center gap-2"
                        >
                          {subject.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-[#C6A84A] border border-white/5">
                          {selectedQuestionsCount} / {subjectQuestionsCount} Q
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleMateriaExpand(subject.materia)}
                          className="text-[#A6A6A6] hover:text-white p-1"
                        >
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Subtopics List */}
                    {isExpanded && (
                      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#121212] border-t border-white/5">
                        {subjectTopics.map(topic => {
                          const isChecked = selectedTopicIds.has(topic.id);
                          const count = questionsByTopic.get(topic.id)?.length || 0;

                          return (
                            <label
                              key={topic.id}
                              className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                                isChecked
                                  ? 'bg-primary/10 border-primary/40 text-white shadow-[0_0_10px_rgba(198,168,74,0.08)]'
                                  : 'bg-white/[0.02] border-white/5 text-[#8E8E8E] hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleTopic(topic.id)}
                                  className="w-3.5 h-3.5 rounded border-white/20 text-primary focus:ring-primary bg-transparent cursor-pointer accent-[#E0AF26]"
                                />
                                <span className={`truncate font-medium ${isChecked ? 'text-white' : ''}`}>
                                  {topic.label}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-[#A6A6A6] shrink-0 pl-2">
                                {count} Q
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Cantidad de Preguntas */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-primary font-manrope flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                2. Cantidad de Preguntas
              </span>
              <span className="text-[11px] text-[#A6A6A6]">
                Universo disponible: <strong className="text-white">{matchingQuestions.length}</strong> preguntas
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[10, 20, 30, 50, 100].map(val => {
                const isSelected = !isCustomCount && questionCount === val;
                const isDisabled = matchingQuestions.length < val;

                return (
                  <button
                    key={val}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      setIsCustomCount(false);
                      setQuestionCount(val);
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-primary text-[#0A0A0A] border-primary font-black shadow-[0_0_15px_rgba(198,168,74,0.3)]'
                        : isDisabled
                        ? 'bg-white/[0.02] border-white/5 text-[#444] cursor-not-allowed'
                        : 'bg-[#181818] border-white/10 text-[#A6A6A6] hover:text-white hover:bg-[#222]'
                    }`}
                  >
                    {val} Q
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setIsCustomCount(false);
                  setQuestionCount(matchingQuestions.length);
                }}
                disabled={matchingQuestions.length === 0}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  !isCustomCount && questionCount === matchingQuestions.length && matchingQuestions.length > 0
                    ? 'bg-primary text-[#0A0A0A] border-primary font-black shadow-[0_0_15px_rgba(198,168,74,0.3)]'
                    : 'bg-[#181818] border-white/10 text-[#A6A6A6] hover:text-white hover:bg-[#222]'
                }`}
              >
                Todas ({matchingQuestions.length})
              </button>
            </div>
          </div>

          {/* Section 3: Modo de Simulación */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-primary font-manrope flex items-center gap-1.5 mb-3">
              <Clock className="w-3.5 h-3.5" />
              3. Modo de Simulación
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setMode('practice')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  mode === 'practice'
                    ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(198,168,74,0.15)] text-white'
                    : 'bg-[#161616] border-white/10 text-[#A6A6A6] hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="quiz_mode"
                  checked={mode === 'practice'}
                  onChange={() => setMode('practice')}
                  className="mt-0.5 accent-[#E0AF26]"
                />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Modo Práctica (Tutor)
                  </h4>
                  <p className="text-[11px] text-[#A6A6A6] mt-1 leading-relaxed">
                    Retroalimentación inmediata con explicación clínica detallada tras responder cada pregunta.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setMode('exam')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  mode === 'exam'
                    ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(198,168,74,0.15)] text-white'
                    : 'bg-[#161616] border-white/10 text-[#A6A6A6] hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="quiz_mode"
                  checked={mode === 'exam'}
                  onChange={() => setMode('exam')}
                  className="mt-0.5 accent-[#E0AF26]"
                />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Modo Examen Real
                  </h4>
                  <p className="text-[11px] text-[#A6A6A6] mt-1 leading-relaxed">
                    Cronómetro continuo tipo CONAREM. Las respuestas y la justificación se revelan al finalizar todo el examen.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#161616]">
          <div className="text-xs text-[#A6A6A6]">
            Total a evaluar: <strong className="text-[#E0AF26] font-mono text-sm">{Math.min(questionCount, matchingQuestions.length)}</strong> preguntas
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-[#A6A6A6] hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleStart}
              disabled={matchingQuestions.length === 0}
              className="px-6 py-2.5 rounded-xl bg-primary text-[#0A0A0A] text-xs font-black uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_25px_rgba(198,168,74,0.3)] hover:shadow-[0_0_40px_rgba(198,168,74,0.5)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Iniciar Simulacro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
