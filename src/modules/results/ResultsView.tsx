import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Question, AnswerRecord, UserProgress } from '../../types';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, XCircle, Lightbulb, BookOpen, Clock, Activity, Bookmark } from 'lucide-react';
import { DataService } from '../../services/DataService';
import { analyzeSubtema } from '../../utils/normalizer';
import { ExplanationRenderer } from '../../components/ExplanationRenderer';

interface ResultsViewProps {
  questions: Question[];
  answers: AnswerRecord[];
  onRestart: () => void;
  onRetryFailed: () => void;
  userId: string;
  savedQuestionIds?: string[];
  onToggleBookmark?: (questionId: string) => void;
  progress?: UserProgress[];
}

export function ResultsView({ 
  questions, 
  answers, 
  onRestart, 
  onRetryFailed, 
  userId,
  savedQuestionIds = [],
  onToggleBookmark,
  progress
}: ResultsViewProps) {
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const failedAnswers = answers.filter(a => !a.isCorrect);
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const [questionStats, setQuestionStats] = useState<Record<string, { total: number; correct: number }>>({});
  const [collapsedQuestions, setCollapsedQuestions] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const _progress = progress || await DataService.getProgress(userId);
        const stats: Record<string, { total: number; correct: number }> = {};
        _progress.forEach(p => {
          if (!stats[p.question_id]) {
            stats[p.question_id] = { total: 0, correct: 0 };
          }
          stats[p.question_id].total++;
          if (p.is_correct) stats[p.question_id].correct++;
        });
        setQuestionStats(stats);
      } catch (err) {
        console.error('Error fetching progress for stats', err);
      }
    };
    fetchProgress();
  }, [userId, progress]);

  const getBadgeInfo = () => {
    if (scorePercentage >= 90) return { title: '👑 Maestro CONAREM', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    if (scorePercentage >= 75) return { title: '🔥 En Racha (Excelente)', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    if (scorePercentage >= 60) return { title: '📈 Buen Desempeño', color: 'text-primary border-primary/30 bg-primary/10' };
    return { title: '📚 Repaso Requerido', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' };
  };

  const badge = getBadgeInfo();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8 pb-20">
      {/* Dynamic Score Ring & Results Card */}
      <div className="bg-[#141824]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* SVG Score Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-white/10"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-primary transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-white font-manrope">{scorePercentage}%</span>
            </div>
          </div>

          <div>
            <div className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-2 ${badge.color}`}>
              {badge.title}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight font-manrope">
              {correctAnswers} de {totalQuestions} Correctas
            </h1>
            <p className="text-[#A0A0A0] text-xs font-semibold mt-1">
              Simulación de examen CONAREM completada.
            </p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {failedAnswers.length > 0 && (
            <Button 
              onClick={onRetryFailed} 
              className="flex-1 md:flex-none bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 font-bold uppercase tracking-widest text-xs px-6 py-4 rounded-xl transition-all"
            >
              Reintentar Erradas ({failedAnswers.length})
            </Button>
          )}
          <Button 
            onClick={onRestart} 
            className="flex-1 md:flex-none bg-primary text-[#0A0A0A] hover:bg-primary/90 font-black uppercase tracking-widest text-xs px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(198,168,74,0.3)] transition-all"
          >
            Finalizar
          </Button>
        </div>
      </div>

      {/* Revisión del Simulacro */}
      <div className="space-y-6 pt-8">
        {answers.map((answer, i) => {
          const q = questions.find(q => q.id === answer.questionId);
          if (!q) return null;
          const isCollapsed = collapsedQuestions[q.id] === true;
          return (
            <div key={i} className={`rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${isCollapsed ? 'bg-[#121212]/10 border-white/5' : 'bg-[#121212]/50 border-white/5'}`}>
              
              {isCollapsed ? (
                // Collapsed header
                <div className="p-4 flex items-center justify-between gap-4 bg-[#1E1E1E]/10 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-white/5 text-[#A0A0A0] font-bold text-xs border border-white/5 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-primary/10 text-primary rounded border border-primary/20 truncate max-w-[280px] flex-shrink-0">
                      {(() => {
                        const info = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
                        return info.grupo && info.grupo !== info.normalizado ? `${info.grupo} • ${info.normalizado}` : info.normalizado;
                      })()}
                    </span>
                    {onToggleBookmark && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(q.id);
                        }}
                        className="p-1 rounded bg-white/5 border border-white/5 text-[#A0A0A0] hover:text-primary hover:border-primary/25 cursor-pointer flex items-center justify-center flex-shrink-0"
                        title={savedQuestionIds.includes(q.id) ? "Quitar de repaso" : "Guardar para repaso"}
                      >
                        <Bookmark className={`w-3 h-3 ${savedQuestionIds.includes(q.id) ? 'fill-primary text-primary' : ''}`} />
                      </button>
                    )}
                    <span className="text-xs text-gray-400 font-semibold truncate max-w-[150px] sm:max-w-[300px] md:max-w-[450px]">
                      {q.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {answer.isCorrect ? (
                      <span className="text-emerald-400 font-black text-xs px-2 py-0.5 bg-emerald-950/20 border border-emerald-500/20 rounded-lg shadow-sm">
                        Correcto
                      </span>
                    ) : (
                      <span className="text-red-400 font-black text-xs px-2 py-0.5 bg-red-950/20 border border-red-500/20 rounded-lg shadow-sm">
                        Incorrecto
                      </span>
                    )}
                    <button 
                      onClick={() => setCollapsedQuestions(prev => ({ ...prev, [q.id]: false }))}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/20"
                    >
                      Ver Pregunta
                    </button>
                  </div>
                </div>
              ) : (
                // Expanded question body
                <>
                  <div className="p-4 md:p-10 border-b border-white/5 bg-[#1E1E1E]/20">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-xl bg-white/5 text-[#A0A0A0] font-bold text-xs md:text-sm border border-white/5">
                          {i + 1}
                        </span>
                        <span className="px-2.5 py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary rounded border border-primary/20 truncate max-w-[280px]">
                          {(() => {
                            const info = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
                            return info.grupo && info.grupo !== info.normalizado ? `${info.grupo} • ${info.normalizado}` : info.normalizado;
                          })()}
                        </span>
                        {onToggleBookmark && (
                          <button
                            type="button"
                            onClick={() => onToggleBookmark(q.id)}
                            className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-[#A0A0A0] hover:text-primary hover:border-primary/20 transition-all cursor-pointer flex items-center justify-center"
                            title={savedQuestionIds.includes(q.id) ? "Quitar de repaso" : "Guardar para repaso"}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${savedQuestionIds.includes(q.id) ? 'fill-primary text-primary' : ''}`} />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {answer.isCorrect ? (
                          <span className="flex-shrink-0 inline-flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm border border-emerald-500/20 shadow-md">
                            <CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-emerald-600" /> Correcto
                          </span>
                        ) : (
                          <span className="flex-shrink-0 inline-flex items-center gap-2 text-red-400 font-bold bg-red-950/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm border border-red-500/20 shadow-md">
                            <XCircle className="w-4 md:w-5 h-4 md:h-5 text-red-500" /> Incorrecto
                          </span>
                        )}
                        <button 
                          onClick={() => setCollapsedQuestions(prev => ({ ...prev, [q.id]: true }))}
                          className="text-xs font-bold text-[#A0A0A0] hover:text-white flex items-center gap-1 cursor-pointer bg-white/5 px-2.5 py-1 rounded-lg border border-white/5"
                        >
                          Ocultar Pregunta
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-lg md:text-2xl leading-relaxed tracking-tight">
                      {q.text}
                    </h3>
                  </div>

                  <div className="p-6 md:p-10 space-y-4 border-b border-white/[0.03]">
                    {q.options.map((option, index) => {
                      const isSelected = answer.selectedOptionIndex === index;
                      const isCorrect = index === q.correctOptionIndex;
                      
                      let optionStyle = "bg-[#1E1E1E]/20 border-white/5 text-[#A0A0A0] opacity-40 shadow-xs";
                      let icon = null;

                      if (isCorrect) {
                        optionStyle = "bg-emerald-950/20 border-emerald-800 text-emerald-300 shadow-md ring-1 ring-emerald-500/30";
                        icon = <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />;
                      } else if (isSelected) {
                        optionStyle = "bg-red-950/20 border-red-800 text-red-300 shadow-md ring-1 ring-red-500/30";
                        icon = <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
                      }

                      return (
                        <div
                          key={index}
                          className={`w-full text-left p-4 md:p-5 rounded-xl border flex items-center justify-between gap-4 ${optionStyle}`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${isCorrect ? 'bg-emerald-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-white/5 text-[#A0A0A0] border border-white/5'}`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className={`text-sm md:text-base ${isCorrect ? 'font-semibold text-emerald-300' : 'text-[#D5D5D5]'}`}>{option}</span>
                          </div>
                          {icon}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mx-6 md:mx-10 mb-6 md:mb-10 mt-6 space-y-6">
                    <ExplanationRenderer explanation={q.explanation} />
                    {(q.pagina || questionStats[q.id]) && (
                      <div className="pt-4 border-t border-white/[0.04] space-y-2 text-xs text-[#A0A0A0]">
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
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
