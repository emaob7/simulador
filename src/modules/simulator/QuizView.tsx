import React, { useState, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import { Question, AnswerRecord } from '../../types';
import { Button } from '../../components/ui/Button';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  BookOpen, 
  Lightbulb, 
  Bookmark,
  Save,
  LogOut,
  Check,
  BookmarkCheck,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeSubtema } from '../../utils/normalizer';
import { ExplanationRenderer } from '../../components/ExplanationRenderer';

interface QuizViewProps {
  questions: Question[];
  onComplete: (answers: AnswerRecord[]) => void;
  onSaveAndExit?: (answersMap: Record<string, number>, timeElapsed: number) => void;
  onQuickSave?: (answersMap: Record<string, number>, timeElapsed: number) => Promise<boolean> | void;
  onCancel?: () => void;
  mode?: 'practice' | 'exam';
  savedQuestionIds?: string[];
  onToggleBookmark?: (questionId: string) => void;
  onAnswerImmediate?: (questionId: string, isCorrect: boolean, timeSpent: number) => void;
  initialAnswers?: Record<string, number>;
  initialTimeElapsed?: number;
  draftKey?: string;
  progress?: any[];
}

export function QuizView({ 
  questions, 
  onComplete, 
  onSaveAndExit,
  onQuickSave,
  onCancel,
  mode = 'exam',
  savedQuestionIds = [],
  onToggleBookmark,
  onAnswerImmediate,
  initialAnswers = {},
  initialTimeElapsed = 0,
  draftKey = 'dr_active_quiz_draft'
}: QuizViewProps) {
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    if (Object.keys(initialAnswers).length > 0) return initialAnswers;
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          return parsed.answers;
        }
      }
    } catch (e) {
      console.error("Error cargando draft inicial:", e);
    }
    return {};
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [collapsedQuestions, setCollapsedQuestions] = useState<Record<string, boolean>>({});
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  
  const [timeElapsed, setTimeElapsed] = useState<number>(initialTimeElapsed);
  const [sessionStartTime] = useState<number>(Date.now() - (initialTimeElapsed * 1000));

  const questionStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};
    if (!progress || progress.length === 0) return stats;
    progress.forEach(p => {
      if (!p.question_id) return;
      if (!stats[p.question_id]) {
        stats[p.question_id] = { total: 0, correct: 0 };
      }
      stats[p.question_id].total++;
      if (p.is_correct) stats[p.question_id].correct++;
    });
    return stats;
  }, [progress]);

  // Time limit for the quiz: 1 minute per question
  const timeLimit = questions.length * 60;

  // Auto-guardado en localStorage cada vez que cambian las respuestas o el tiempo
  useEffect(() => {
    if (isSubmitted) return;
    try {
      const draftData = {
        answers,
        timeElapsed,
        questionIds: questions.map(q => q.id),
        materia: questions[0]?.materia || '',
        semana: questions[0]?.semana || 0,
        tema: questions[0]?.tema || '',
        mode,
        updatedAt: Date.now()
      };
      localStorage.setItem(draftKey, JSON.stringify(draftData));
    } catch (e) {
      console.error("Error guardando draft:", e);
    }
  }, [answers, timeElapsed, isSubmitted, questions, mode, draftKey]);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      const currentElapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      setTimeElapsed(currentElapsed);
      
      // Auto-submit if time runs out in exam mode
      if (mode === 'exam' && currentElapsed >= timeLimit) {
        clearInterval(timer);
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartTime, isSubmitted, mode, timeLimit]);

  // Advertencia al recargar
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted && Object.keys(answers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, isSubmitted]);

  if (!questions || questions.length === 0) return <div className="text-white text-center py-12">No hay preguntas disponibles.</div>;

  const scrollToQuestion = (idx: number) => {
    const el = document.getElementById(`question-card-${idx}`);
    if (el) {
      const stickyHeader = document.querySelector('.sticky');
      const offset = stickyHeader ? stickyHeader.getBoundingClientRect().height + 24 : 180;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveQuestionIdx(idx);
    }
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    if (mode === 'practice' && answers[questionId] !== undefined) return;
    
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));

    const qIndex = questions.findIndex(x => x.id === questionId);
    if (qIndex !== -1) {
      setActiveQuestionIdx(qIndex);
    }

    if (onAnswerImmediate) {
      const q = questions.find(x => x.id === questionId);
      if (q) {
        const isCorrect = optionIndex === q.correctOptionIndex;
        const answeredCount = Object.keys(answers).length + 1;
        const estimatedTime = Math.max(1, Math.floor(timeElapsed / answeredCount));
        onAnswerImmediate(questionId, isCorrect, estimatedTime);
      }
    }
  };

  const answeredCount = Object.keys(answers).length;

  const showFeedbackToast = (msg: string) => {
    setSaveToast({ show: true, message: msg });
    setTimeout(() => {
      setSaveToast({ show: false, message: '' });
    }, 3500);
  };

  const handleQuickSave = async () => {
    if (answeredCount === 0) {
      showFeedbackToast("Aún no has respondido ninguna pregunta.");
      return;
    }
    setIsSaving(true);
    if (onQuickSave) {
      await onQuickSave(answers, timeElapsed);
    }
    setIsSaving(false);
    showFeedbackToast(`¡Progreso guardado! (${answeredCount} de ${questions.length} preguntas)`);
  };

  const handleConfirmSaveAndExit = async () => {
    setIsSaving(true);
    if (onSaveAndExit) {
      await onSaveAndExit(answers, timeElapsed);
    } else if (onCancel) {
      onCancel();
    }
    setIsSaving(false);
    setShowExitModal(false);
  };

  const handleExitWithoutSaving = () => {
    try {
      localStorage.removeItem(draftKey);
    } catch (e) {
      console.error(e);
    }
    setShowExitModal(false);
    if (onCancel) {
      onCancel();
    } else if (onSaveAndExit) {
      onSaveAndExit({}, 0);
    }
  };

  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  const handleSubmit = () => {
    handleFinish();
  };

  const handleFinish = () => {
    const avgTime = Math.floor(timeElapsed / Math.max(1, questions.length));
    const finalRecords: AnswerRecord[] = questions.map(q => ({
      questionId: q.id,
      selectedOptionIndex: answers[q.id] ?? -1,
      isCorrect: answers[q.id] === q.correctOptionIndex,
      timeTakenSeconds: avgTime,
    }));
    try {
      localStorage.removeItem(draftKey);
    } catch (e) {
      console.error(e);
    }
    onComplete(finalRecords);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderExplanation = (explanation: string) => {
    return <ExplanationRenderer explanation={explanation} />;
  };

  const currentQ = questions[activeQuestionIdx] || questions[0];
  const subInfo = currentQ ? analyzeSubtema(currentQ.subtema, currentQ.materia, currentQ.semana, currentQ.text, currentQ.id) : { grupo: '', normalizado: '' };
  const materia = questions[0]?.materia || '';
  const semana = questions[0]?.semana || '';

  return (
    <div className="max-w-4xl mx-auto pb-20 relative">
      {/* Toast Feedback */}
      <AnimatePresence>
        {saveToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-[#1E1E1E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-primary/40 flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold tracking-wide">{saveToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Confirmación Guardar y Salir */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#141414] border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <Save className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    ¿Guardar progreso y salir?
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    {materia} • Semana {semana}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Has respondido <strong className="text-primary font-bold">{answeredCount} de {questions.length}</strong> preguntas. 
                Si guardas tu progreso ahora, tus respuestas se registrarán en tus analíticas y podrás continuar el resto más tarde.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleConfirmSaveAndExit}
                  disabled={isSaving}
                  className="w-full py-4 bg-primary text-black font-extrabold uppercase tracking-wider text-xs shadow-lg hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  {isSaving ? 'Guardando progreso...' : 'Guardar respuestas y Salir'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowExitModal(false)}
                  className="w-full py-4 border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-wider text-xs"
                >
                  Continuar respondiendo
                </Button>

                <button
                  onClick={handleExitWithoutSaving}
                  className="w-full pt-2 text-center text-[11px] text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider transition-colors"
                >
                  Salir sin guardar avance
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Context Header (Sticky) - Super Compact */}
      <div className="sticky top-[64px] xl:top-[80px] z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 p-2.5 md:p-3 mb-4 md:mb-6 shadow-2xl">
        <div className="flex justify-between items-center gap-3 mb-2">
          {/* Left: Info y Progreso */}
          <div className="min-w-0 flex-grow flex items-center gap-2 md:gap-3 flex-wrap">
            <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider whitespace-nowrap">
              Semana {semana} / {materia}
            </span>
            <span className="text-[#A0A0A0] text-[10px]">•</span>
            <span className="text-[10px] md:text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-[300px]">
              {subInfo.grupo} {subInfo.normalizado && subInfo.normalizado !== subInfo.grupo ? `• ${subInfo.normalizado}` : ''}
            </span>
            {isSubmitted ? (
              <span className="text-[8px] font-black text-primary uppercase tracking-widest bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">
                Revisión
              </span>
            ) : (
              <span className="text-[8px] font-bold text-[#A0A0A0] uppercase tracking-wider">
                ({answeredCount}/{questions.length})
              </span>
            )}
          </div>

          {/* Right: Actions and Timer */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {mode === 'exam' && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${timeLimit - timeElapsed <= 60 ? 'border-red-500 bg-red-950/20 text-red-400' : 'border-white/5 bg-[#1E1E1E]/50 text-white'} font-mono text-xs font-bold shadow-inner`}>
                <Clock className={`w-3.5 h-3.5 ${timeLimit - timeElapsed <= 60 ? 'text-red-400 animate-pulse' : 'text-[#A0A0A0]'}`} />
                {formatTime(Math.max(0, timeLimit - timeElapsed))}
              </div>
            )}
            {mode === 'practice' && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/5 bg-[#1E1E1E]/50 font-mono text-xs font-bold text-white shadow-inner">
                <Clock className="w-3.5 h-3.5 text-[#A0A0A0]" />
                {formatTime(timeElapsed)}
              </div>
            )}

            {!isSubmitted && (
              <>
                <button
                  onClick={handleQuickSave}
                  disabled={isSaving}
                  title="Guardar progreso"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-white shadow-sm transition-all"
                >
                  <Save className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline text-[11px]">Guardar</span>
                </button>

                <button
                  onClick={() => setShowExitModal(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-primary/30 bg-primary text-black font-extrabold text-[11px] uppercase tracking-wider shadow-sm hover:bg-primary/90 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Guardar y Salir</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar (Super Thin) */}
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-1">
          <div 
            className={`h-full transition-all duration-500 ease-out ${isSubmitted ? 'bg-primary shadow-[0_0_12px_#C6A84A]' : 'bg-primary'}`}
            style={{ width: `${isSubmitted ? 100 : (answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Floating Side Drawer Toggle for Question Navigation */}
      <div className="fixed right-4 bottom-6 z-50">
        <button
          onClick={() => setShowDrawer(!showDrawer)}
          className="flex items-center gap-2 px-4 py-3 bg-[#141824] border border-primary/30 text-primary font-bold text-xs rounded-full shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-xl hover:scale-105 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Navegación ({Object.keys(answers).length}/{questions.length})</span>
        </button>
      </div>

      {/* Question Navigation Drawer */}
      <AnimatePresence>
        {showDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              className="fixed right-0 top-0 h-full w-80 bg-[#12141C] border-l border-white/10 p-6 z-[70] flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-black text-primary font-manrope uppercase tracking-wider">Mapa de Preguntas</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{Object.keys(answers).length} de {questions.length} respondidas</p>
                </div>
                <button onClick={() => setShowDrawer(false)} className="text-gray-400 hover:text-white p-1">
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {questions.map((q, idx) => {
                  const isSelected = answers[q.id] !== undefined;
                  const isActive = activeQuestionIdx === idx;
                  const isBookmarked = savedQuestionIds.includes(q.id);
                  const showFeedback = isSubmitted || (mode === 'practice' && isSelected);
                  const isCorrect = showFeedback && answers[q.id] === q.correctOptionIndex;

                  let btnStyle = "bg-white/5 text-[#A0A0A0] border-white/10 hover:border-white/20";
                  if (isActive) {
                    btnStyle = "bg-primary/20 text-primary border-primary shadow-[0_0_12px_rgba(198,168,74,0.3)] font-black scale-105";
                  } else if (showFeedback) {
                    btnStyle = isCorrect 
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/50";
                  } else if (isSelected) {
                    btnStyle = "bg-white/15 text-white border-white/30";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        scrollToQuestion(idx);
                        setShowDrawer(false);
                      }}
                      className={`h-10 rounded-xl border font-bold font-mono text-xs transition-all flex items-center justify-center relative hover:scale-105 ${btnStyle}`}
                    >
                      {idx + 1}
                      {isBookmarked && (
                        <span className="absolute top-1 right-1 text-[8px] text-primary">★</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Questions List */}
      <div className="px-2 md:px-6 space-y-8 md:space-y-12">
        {questions.map((q, qIndex) => {
          const selectedOption = answers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCollapsed = isSubmitted && (collapsedQuestions[q.id] !== false);
          const showFeedback = isSubmitted || (mode === 'practice' && isAnswered);
          
          return (
            <div key={q.id} id={`question-card-${qIndex}`} className={`rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${isSubmitted ? 'bg-[#121212]/10 border-white/5' : 'bg-[#121212]/50 border-white/5'}`}>
              
              {isCollapsed ? (
                // Collapsed header
                <div className="p-4 flex items-center justify-between gap-4 bg-[#1E1E1E]/10 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span translate="no" className="notranslate flex items-center justify-center w-7 h-7 rounded-xl bg-white/5 text-[#A0A0A0] font-bold text-xs border border-white/5 flex-shrink-0">
                      {qIndex + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold truncate max-w-[200px] sm:max-w-[400px] md:max-w-[600px]">
                      {q.text}
                    </span>
                  </div>
                  <button 
                    onClick={() => setCollapsedQuestions(prev => ({ ...prev, [q.id]: false }))}
                    className="flex-shrink-0 text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/20"
                  >
                    Ver Pregunta
                  </button>
                </div>
              ) : (
                // Expanded question body
                <>
                  <div className={`p-4 md:p-10 border-b border-white/5 ${isSubmitted ? 'bg-transparent' : 'bg-[#1E1E1E]/20'}`}>
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                      <div className="flex items-center gap-3">
                        <span translate="no" className="notranslate flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-xl bg-white/5 text-[#A0A0A0] font-bold text-xs md:text-sm border border-white/5">
                          {qIndex + 1}
                        </span>
                        
                        {onToggleBookmark && (
                          <button
                            type="button"
                            onClick={() => onToggleBookmark(q.id)}
                            className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-[#A0A0A0] hover:text-primary hover:border-primary/20 transition-all cursor-pointer flex items-center justify-center"
                            title={savedQuestionIds.includes(q.id) ? "Quitar de repaso" : "Guardar para repaso"}
                          >
                            <Bookmark className={`w-4 h-4 ${savedQuestionIds.includes(q.id) ? 'fill-primary text-primary' : ''}`} />
                          </button>
                        )}
                      </div>
                      
                      {isSubmitted && (
                        <button 
                          type="button"
                          onClick={() => setCollapsedQuestions(prev => ({ ...prev, [q.id]: true }))}
                          className="text-xs font-bold text-[#A0A0A0] hover:text-white flex items-center gap-1 cursor-pointer bg-white/5 px-2.5 py-1 rounded-lg border border-white/5"
                        >
                          Ocultar Pregunta
                        </button>
                      )}
                    </div>
                    <h2 className="font-bold leading-relaxed text-base md:text-lg text-white">
                      {q.text}
                    </h2>
                  </div>

                  <div className={`p-6 md:p-10 border-b border-white/[0.03] ${isSubmitted ? 'space-y-4' : 'space-y-3'}`}>
                    {q.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrect = index === q.correctOptionIndex;
                      
                      let optionStyle = "bg-[#2E2E2E] border-[#424242] text-[#FAF9F6] hover:border-[#C6A84A]/50 hover:bg-[#2E2E2E]/80";
                      let icon = null;

                      if (showFeedback) {
                        if (isCorrect) {
                          optionStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/40";
                          icon = <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />;
                        } else if (isSelected) {
                          optionStyle = "bg-rose-950/40 border-rose-500 text-rose-300 shadow-md ring-1 ring-rose-500/40";
                          icon = <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
                        } else {
                          optionStyle = "bg-[#2E2E2E]/30 border-[#424242]/30 text-[#A6A6A6] opacity-40";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-[#2E2E2E] border-[#C6A84A] text-[#E0AF26] shadow-[0_0_20px_rgba(198,168,74,0.2)] ring-1 ring-[#C6A84A]";
                      }

                      return (
                        <button
                          key={index}
                          type="button"
                          disabled={showFeedback}
                          onClick={() => handleOptionSelect(q.id, index)}
                          className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${optionStyle} ${!showFeedback ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'}`}
                        >
                          <div className="flex items-center gap-4">
                            <span translate="no" className={`notranslate flex items-center justify-center w-8 h-8 rounded-xl text-sm font-black transition-all duration-200 shrink-0 ${
                              showFeedback && isCorrect 
                                ? 'bg-emerald-500 text-[#121212]' 
                                : (showFeedback && isSelected 
                                    ? 'bg-rose-500 text-white' 
                                    : (isSelected 
                                        ? 'bg-[#E0AF26] text-[#121212]' 
                                        : 'bg-[#1C1C1C] text-[#A6A6A6] border border-[#424242]'))
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className={`text-sm md:text-base leading-relaxed ${
                              showFeedback && isCorrect 
                                ? 'font-bold text-emerald-300' 
                                : (isSelected ? 'text-[#FFFFFF] font-bold' : 'text-[#FAF9F6]')
                            }`}>
                              {option}
                            </span>
                          </div>
                          {icon}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Individual Explanation (shown after submit or in practice mode when answered) */}
              {showFeedback && (
                <div className="mx-6 md:mx-10 mb-6 md:mb-10 mt-6 space-y-6">
                  {/* Feedback si respondió mal */}
                  {selectedOption !== q.correctOptionIndex && (
                    <div className="border-l-2 border-red-500 pl-4 py-1">
                      <div className="text-red-500 font-black uppercase tracking-widest text-[11px] flex items-center gap-1.5">
                        <span>❌</span> DIAGNÓSTICO INCORRECTO
                      </div>
                      <div className="text-xs text-gray-400 mt-1 font-semibold">
                        {analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id).normalizado}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {renderExplanation(q.explanation)}

                    {(q.pagina || questionStats[q.id]) && (
                      <div className="mt-6 pt-4 border-t border-white/[0.04] space-y-2 text-xs text-[#A0A0A0]">
                        {q.pagina && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                            <span className="font-bold text-white">Referencia:</span> {q.pagina.replace(/^(?:📖\s*)?(?:[Rr]eferencia:\s*)*/, '')}
                          </div>
                        )}
                        {questionStats[q.id] && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <Activity className="w-3.5 h-3.5 text-primary" />
                            <span className="font-bold text-white">Tu historial:</span> has respondido esta pregunta {questionStats[q.id].total} {questionStats[q.id].total === 1 ? 'vez' : 'veces'} ({questionStats[q.id].correct} aciertos).
                            <span className="px-2 py-0.5 bg-primary/10 text-primary font-bold rounded text-[10px]">
                              {Math.round((questionStats[q.id].correct / questionStats[q.id].total) * 100)}% precisión
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="px-2 md:px-6 mt-12 md:mt-16 space-y-4">
        {!isSubmitted ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline"
              onClick={() => setShowExitModal(true)}
              className="sm:flex-1 py-5 md:py-6 text-sm font-bold border-white/10 text-white hover:bg-white/5 flex items-center justify-center gap-2 rounded-2xl"
            >
              <Save className="w-4 h-4 text-primary" />
              Guardar y Salir ({answeredCount}/{questions.length})
            </Button>

            <Button 
              onClick={handleSubmit}
              className="sm:flex-[2] py-5 md:py-6 text-base font-black bg-primary text-[#0A0A0A] hover:bg-primary/95 shadow-[0_0_40px_rgba(198,168,74,0.2)] hover:shadow-[0_0_60px_rgba(198,168,74,0.4)] transition-all duration-300 rounded-2xl"
            >
              FINALIZAR Y REVISAR ({answeredCount} / {questions.length})
            </Button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button 
              onClick={handleFinish}
              className="w-full py-6 md:py-8 text-base md:text-lg font-black bg-[#1E1E1E] text-white hover:bg-white/5 shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 border border-white/5 rounded-2xl"
            >
              VER RESULTADOS
              <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
