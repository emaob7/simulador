import React, { useState, useMemo, useEffect } from 'react';
import { questionsSemana1 } from './data/semana1/questions';
import { questionsSemana2 } from './data/semana2/questions';
import { questionsSemana3 } from './data/semana3/questions';
import { questionsSemana4 } from './data/semana4/questions';
import { questionsSemana5 } from './data/semana5/questions';
import { questionsSemana6 } from './data/semana6/questions';
import { questionsSemana7 } from './data/semana7/questions';
import { questionsSemana8 } from './data/semana8/questions';
import { questionsSemana9 } from './data/semana9/questions';
import { questionsSemana10 } from './data/semana10/questions';
import { questionsSemana11 } from './data/semana11/questions';
import { questionsSemana12 } from './data/semana12/questions';
import { questionsSemana13 } from './data/semana13/questions';
import { questionsSemana14 } from './data/semana14/questions';
import { questionsSemana15 } from './data/semana15/questions';
import { questionsSemana16 } from './data/semana16/questions';
import { Question, AnswerRecord } from './types';
import { QuizView } from './modules/simulator/QuizView';
import { ResultsView } from './modules/results/ResultsView';
import { DashboardView } from './modules/dashboard/DashboardView';
import { LoginView } from './modules/auth/LoginView';
import { PendingApprovalView } from './modules/auth/PendingApprovalView';
import { AdminView } from './modules/admin/AdminView';
import { SavedQuestionsView } from './modules/saved/SavedQuestionsView';
import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';
import { Button } from './components/ui/Button';
import { DataService } from './services/DataService';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { analyzeSubtema } from './utils/normalizer';

// romanToInt removed

type ViewState = 'dashboard' | 'simulator' | 'quiz' | 'results' | 'quiz-config' | 'admin' | 'saved';

const allQuestions: Question[] = [
  ...questionsSemana1,
  ...questionsSemana2,
  ...questionsSemana3,
  ...questionsSemana4,
  ...questionsSemana5,
  ...questionsSemana6,
  ...questionsSemana7,
  ...questionsSemana8,
  ...questionsSemana9,
  ...questionsSemana10,
  ...questionsSemana11,
  ...questionsSemana12,
  ...questionsSemana13,
  ...questionsSemana14,
  ...questionsSemana15,
  ...questionsSemana16,
];

export const getWeekThemeTitle = (materia: string, semana: number): string => {
  const s = Number(semana);
  if (s === 1) return "Neonatología";
  if (s === 2) return "Endocrinología";
  if (s === 3) return "Infecciones, cicatrización y piel";
  if (s === 4) return "Anatomía, trastornos anatómicos y prolapsos de órganos pélvicos";
  if (s === 5) return "Nutrición, desnutrición y antropometría";
  if (s === 6) return "Oncohematología y Cuidados Críticos";
  if (s === 7) return "Traumatismos y Quemaduras";
  if (s === 8) return "Endocrinología de la reproducción, infecciones ginecológicas y dolor pélvico crónico";
  if (s === 9) return "Vacunas y Crecimiento y Desarrollo";
  if (s === 10) return "Cardiología";
  if (s === 11) return "Esófago y Estómago";
  if (s === 12) return "Amenorreas, Anticonceptivos y Menopausia";
  if (s === 13) return "Urgencias y Emergencias Pediátricas";
  if (s === 14) return "Neumología y Reumatología";
  if (s === 15) return "Cirugía Torácica y Mamas (Pared torácica, pulmón, mediastino, pleura y mamas)";
  if (s === 16) return "Síndrome de Ovarios Poliquísticos, Sangrado Uterino Anormal, Patología Uterina Benigna y Endometriosis";
  return "";
};

// Study materials removed

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [view, setView] = useState<ViewState>('dashboard');
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedMateria, setSelectedMateria] = useState<string | null>(null);
  const [selectedSemana, setSelectedSemana] = useState<number | null>(null);
  const [selectedTema, setSelectedTema] = useState<string | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({});
  const [quizConfig, setQuizConfig] = useState<{ count: number | 'all', mode: 'practice' | 'exam' }>({ count: 20, mode: 'exam' });
  const [selectedSubtemas, setSelectedSubtemas] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [showSubthemesInConfig, setShowSubthemesInConfig] = useState(true);
  const [expandedSubthemes, setExpandedSubthemes] = useState<string[]>([]);

  const toggleSubthemeExpanded = (st: string) => {
    setExpandedSubthemes(prev =>
      prev.includes(st) ? prev.filter(x => x !== st) : [...prev, st]
    );
  };
  const [savedQuestionIds, setSavedQuestionIds] = useState<string[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const toggleGroupExpanded = (groupName: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupName)
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };
  const [userProgress, setUserProgress] = useState<any[]>([]);

  const fetchProgress = async () => {
    if (!user || user.uid === 'guest') return;
    try {
      const progressList = await DataService.getProgress(user.uid);
      setUserProgress(progressList);
    } catch (e) {
      console.error("Error fetching progress for simulator view", e);
    }
  };

  const handleReloadData = async () => {
    if (!user) return;
    try {
      const progressList = await DataService.getProgress(user.uid);
      setUserProgress(progressList);
      const loadedSessions = await DataService.getSessions(user.uid);
      setSessions(loadedSessions);
    } catch (e) {
      console.error("Error reloading database data", e);
    }
  };

  const fetchBookmarks = async () => {
    if (!user) return;
    try {
      const list = await DataService.getBookmarks(user.uid);
      setSavedQuestionIds(list.map(b => b.question_id));
    } catch (e) {
      console.error("Error fetching bookmarks", e);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user, view]);

  useEffect(() => {
    fetchProgress();
  }, [user, view]);

  useEffect(() => {
    const guestUserStr = localStorage.getItem('dr_rodney_guest_user');
    if (guestUserStr) {
      try {
        const guestUser = JSON.parse(guestUserStr);
        setUser({ uid: guestUser.uid, email: guestUser.email, displayName: guestUser.displayName, photoURL: guestUser.photoURL } as any);
        setUserData(guestUser);
        setLoadingAuth(false);
        return; // Don't subscribe to firebase if in guest mode
      } catch (e) {
        console.error("Error parsing guest user", e);
        localStorage.removeItem('dr_rodney_guest_user');
      }
    }

    let unsubDoc: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (unsubDoc) {
        unsubDoc();
        unsubDoc = null;
      }

      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, 'users', firebaseUser.uid);
        unsubDoc = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
          setLoadingAuth(false);
        }, (error) => {
          console.error("Error al obtener datos del usuario:", error);
          // Si hay error de permisos, igual quitamos el loading para no trabar la app
          setLoadingAuth(false); 
        });
      } else {
        setUser(null);
        setUserData(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubDoc) {
        unsubDoc();
      }
    };
  }, []);

  const toggleWeek = (materia: string, semana: string) => {
    const key = `${materia}-${semana}`;
    setExpandedWeeks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getEffectiveTema = (q: Question) => {
    const { grupo } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
    return grupo;
  };

  const subjectsByMateria = useMemo(() => {
    const grouped: Record<string, Record<number, string[]>> = {};
    allQuestions.forEach(q => {
      if (!grouped[q.materia]) {
        grouped[q.materia] = {};
      }
      if (!grouped[q.materia][q.semana]) {
        grouped[q.materia][q.semana] = [];
      }
      
      const effectiveTema = getEffectiveTema(q);

      if (!grouped[q.materia][q.semana].includes(effectiveTema)) {
        grouped[q.materia][q.semana].push(effectiveTema);
      }
    });
    return grouped;
  }, []);

  const availableSubtemasForConfig = useMemo(() => {
    if (view !== 'quiz-config' || !selectedMateria || selectedSemana === null) return [];
    let filtered = allQuestions.filter(q => q.materia === selectedMateria && q.semana === selectedSemana);
    
    const isCombinedTema = !selectedTema || selectedTema.includes(' • ') || selectedTema === 'Todos los Temas';
    if (!isCombinedTema) {
      filtered = filtered.filter(q => getEffectiveTema(q) === selectedTema);
    }

    const subtemas = new Set<string>();
    filtered.forEach(q => {
      if (q.subtema) {
        const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
        subtemas.add(normalizado);
      }
    });
    return Array.from(subtemas).sort();
  }, [selectedMateria, selectedSemana, selectedTema, view]);

  const subthemeCounts = useMemo(() => {
    if (view !== 'quiz-config' || !selectedMateria || selectedSemana === null) return {} as Record<string, number>;
    let filtered = allQuestions.filter(q => q.materia === selectedMateria && q.semana === selectedSemana);
    
    const isCombinedTema = !selectedTema || selectedTema.includes(' • ') || selectedTema === 'Todos los Temas';
    if (!isCombinedTema) {
      filtered = filtered.filter(q => getEffectiveTema(q) === selectedTema);
    }

    const counts: Record<string, number> = {};
    filtered.forEach(q => {
      if (q.subtema) {
        const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
        counts[normalizado] = (counts[normalizado] || 0) + 1;
      }
    });
    return counts;
  }, [selectedMateria, selectedSemana, selectedTema, view]);

  const groupedSubtemasForConfig = useMemo(() => {
    if (view !== 'quiz-config' || !selectedMateria || selectedSemana === null) return [];
    
    const groups: Record<string, string[]> = {};
    availableSubtemasForConfig.forEach(st => {
      const { grupo } = analyzeSubtema(st, selectedMateria, selectedSemana);
      if (!groups[grupo]) {
        groups[grupo] = [];
      }
      groups[grupo].push(st);
    });
    
    return Object.entries(groups).map(([group, subtemas]) => ({
      group,
      subtemas: subtemas.sort()
    })).sort((a, b) => a.group.localeCompare(b.group));
  }, [availableSubtemasForConfig, selectedMateria, selectedSemana, view]);

  const baseQuestionsForWeek = useMemo(() => {
    if (!selectedMateria || selectedSemana === null) return [];
    let filtered = allQuestions.filter(q => q.materia === selectedMateria && q.semana === selectedSemana);
    
    const isCombinedTema = !selectedTema || selectedTema.includes(' • ') || selectedTema === 'Todos los Temas';
    if (!isCombinedTema) {
      filtered = filtered.filter(q => getEffectiveTema(q) === selectedTema);
    }
    return filtered;
  }, [selectedMateria, selectedSemana, selectedTema]);

  const filteredAvailableQuestions = useMemo(() => {
    return baseQuestionsForWeek;
  }, [baseQuestionsForWeek]);

  const handleSliderChange = (count: number) => {
    const ids = baseQuestionsForWeek.slice(0, count).map(q => q.id);
    setSelectedQuestionIds(ids);
    setQuizConfig(prev => ({ ...prev, count }));
  };

  const handleToggleQuestion = (id: string) => {
    setSelectedQuestionIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      setQuizConfig(config => ({ ...config, count: next.length }));
      return next;
    });
  };

  const handleToggleSubtheme = (st: string) => {
    const subthemeQs = baseQuestionsForWeek.filter(q => {
      if (!q.subtema) return false;
      const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
      return normalizado === st;
    });
    const subthemeQIds = subthemeQs.map(q => q.id);
    const anySelected = subthemeQs.some(q => selectedQuestionIds.includes(q.id));
    
    setSelectedQuestionIds(prev => {
      let next;
      if (anySelected) {
        next = prev.filter(id => !subthemeQIds.includes(id));
      } else {
        next = Array.from(new Set([...prev, ...subthemeQIds]));
      }
      setQuizConfig(config => ({ ...config, count: next.length }));
      return next;
    });
  };

  const handleToggleBookmark = async (questionId: string) => {
    if (!user) return;
    const isBookmarked = savedQuestionIds.includes(questionId);
    if (isBookmarked) {
      setSavedQuestionIds(prev => prev.filter(id => id !== questionId));
      await DataService.removeBookmark(user.uid, questionId);
    } else {
      setSavedQuestionIds(prev => [...prev, questionId]);
      await DataService.addBookmark(user.uid, questionId);
    }
  };

  const handleAnswerImmediate = (questionId: string, isCorrect: boolean, timeSpent: number) => {
    if (!user) return;
    const question = allQuestions.find(q => q.id === questionId);
    const subInfo = analyzeSubtema(question?.subtema, question?.materia, question?.semana, question?.text, question?.id);
    
    const newRecord = {
      user_id: user.uid,
      question_id: questionId,
      is_correct: isCorrect,
      time_spent: timeSpent,
      tema: question?.tema || 'Desconocido',
      subtema: subInfo.normalizado,
      subtema_grupo: subInfo.grupo,
      materia: question?.materia || 'Pediatría',
      date: new Date()
    };
    
    DataService.saveProgress(newRecord);
    setUserProgress(prev => [...prev, newRecord]);
  };

  const handleStartBookmarksQuiz = () => {
    setView('saved');
  };

  const handleStartQuizWithQuestions = (questions: Question[]) => {
    if (!questions || questions.length === 0) return;
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuestionsState(shuffled);
    setSelectedMateria('Repaso de Guardadas');
    setSelectedSemana(0);
    setSelectedTema('Preguntas Favoritas');
    setQuizConfig({ count: shuffled.length, mode: 'practice' });
    setView('quiz');
  };

  const questionStatusMap = useMemo(() => {
    const map = new Map<string, 'correct' | 'incorrect' | 'unanswered'>();
    if (!userProgress || userProgress.length === 0) return map;

    const groups: Record<string, any[]> = {};
    userProgress.forEach(p => {
      if (!p.question_id) return;
      if (!groups[p.question_id]) {
        groups[p.question_id] = [];
      }
      groups[p.question_id].push(p);
    });

    const getMs = (val: any) => {
      if (!val) return 0;
      if (val instanceof Date) return val.getTime();
      if (val.seconds) return val.seconds * 1000;
      return new Date(val).getTime() || 0;
    };

    Object.entries(groups).forEach(([qId, list]) => {
      if (list.length === 0) return;
      list.sort((a, b) => getMs(b.date) - getMs(a.date));
      map.set(qId, list[0].is_correct ? 'correct' : 'incorrect');
    });

    return map;
  }, [userProgress]);

  const getLatestStatusForQuestion = (questionId: string) => {
    return questionStatusMap.get(questionId) || 'unanswered';
  };

  const handlePrepareQuiz = (materia: string, semana: number, tema: string, showSubthemes: boolean = true) => {
    setSelectedMateria(materia);
    setSelectedSemana(semana);
    setSelectedTema(tema);
    setExpandedGroups([]);
    setShowSubthemesInConfig(showSubthemes);
    
    let filtered = allQuestions.filter(q => q.materia === materia && q.semana === semana);
    const isCombinedTema = !tema || tema.includes(' • ') || tema === 'Todos los Temas';
    if (!isCombinedTema) {
      filtered = filtered.filter(q => getEffectiveTema(q) === tema);
    }

    const st = new Set<string>();
    filtered.forEach(q => {
      if (q.subtema) {
        const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
        st.add(normalizado);
      }
    });
    setSelectedSubtemas(Array.from(st));
    
    // Initialize selected question IDs and count
    setSelectedQuestionIds(filtered.map(q => q.id));
    setQuizConfig(prev => ({ ...prev, count: filtered.length }));
    setView('quiz-config');
  };

  const handleQuickStartQuiz = (materia: string, semana: number) => {
    setSelectedMateria(materia);
    setSelectedSemana(semana);
    setSelectedTema('Todos los Temas');
    
    const filtered = allQuestions.filter(q => q.materia === materia && q.semana === semana);
    setQuestionsState(filtered);
    setAnswers([]);
    setQuizConfig({ count: filtered.length, mode: 'practice' });
    setView('quiz');
  };

  const handleStartQuiz = () => {
    const ordered = allQuestions.filter(q => selectedQuestionIds.includes(q.id));
    const questionsToRun = ordered.length > 0 
      ? ordered 
      : allQuestions.filter(q => q.materia === selectedMateria && q.semana === selectedSemana);
    setQuestionsState(questionsToRun);
    setAnswers([]);
    setView('quiz');
  };

  const handleStartRandomQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 20);
    setQuestionsState(shuffled);
    setAnswers([]);
    setSelectedMateria('Simulacro Aleatorio');
    setSelectedSemana(0);
    setSelectedTema('Mix General');
    setQuizConfig({ count: 20, mode: 'exam' });
    setView('quiz');
  };

  const handleReforzar = (materia: string, subtemaQuery: string) => {
    setLoadingAction(true);
    try {
      // 1. Find all questions matching the subtopic normalized name
      const matchingQuestions = allQuestions.filter(q => {
        if (q.materia !== materia) return false;
        const { normalizado, grupo } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
        return normalizado === subtemaQuery || grupo === subtemaQuery || q.tema === subtemaQuery;
      });

      // 2. Prioritize failed question IDs
      const failedIds = new Set(
        (userProgress || [])
          .filter(p => p.materia === materia && p.is_correct === false)
          .map(p => p.question_id)
      );

      let selectedQs = matchingQuestions.filter(q => failedIds.has(q.id));

      // Fallback: fill with all subtheme questions if no failed records found
      if (selectedQs.length < 10) {
        const remaining = matchingQuestions.filter(q => !selectedQs.some(s => s.id === q.id));
        selectedQs = [...selectedQs, ...remaining];
      }

      if (selectedQs.length === 0) {
        alert("No se encontraron preguntas para este tema.");
        setLoadingAction(false);
        return;
      }

      // Shuffle and limit to 10 for focused practice
      selectedQs.sort(() => 0.5 - Math.random());
      selectedQs = selectedQs.slice(0, 10);

      setQuestionsState(selectedQs);
      setAnswers([]);
      setSelectedMateria(`Repaso: ${materia}`);
      setSelectedSemana(selectedQs[0]?.semana || 0);
      setSelectedTema(subtemaQuery);
      setQuizConfig({ count: selectedQs.length, mode: 'practice' });
      setView('quiz');
    } catch (e) {
      console.error(e);
      alert("Hubo un error al iniciar la sesión de refuerzo.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRetryFailed = () => {
    const failedIds = answers.filter(a => !a.isCorrect).map(a => a.questionId);
    const failedQuestions = allQuestions.filter(q => failedIds.includes(q.id));
    setQuestionsState(failedQuestions);
    setView('quiz');
  };

  const handleResetData = async () => {
    if (user) {
      if (window.confirm('¿Estás seguro de que deseas formatear todos tus datos guardados? Esta acción no se puede deshacer.')) {
        try {
          await DataService.resetUserData(user.uid);
          setSessions([]);
          setView('dashboard');
          alert('Datos restaurados correctamente.');
        } catch (e) {
          console.error(e);
          alert('Hubo un error al intentar restaurar los datos.');
        }
      }
    }
  };

  useEffect(() => {
    const handleViewChange = (e: any) => {
      if (e.detail) setView(e.detail);
    };
    window.addEventListener('change-view', handleViewChange);
    return () => window.removeEventListener('change-view', handleViewChange);
  }, []);

  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      if (user) {
        const loadedSessions = await DataService.getSessions(user.uid);
        setSessions(loadedSessions);
      }
    };
    loadSessions();
  }, [view, user]);

  const isMastered = (materia: string, semana: number) => {
    const filteredSessions = sessions.filter(s => s.materia === materia && s.semana === semana);
    if (filteredSessions.length === 0) return false;
    const avg = filteredSessions.reduce((sum, s) => sum + (s.score / s.total_questions), 0) / filteredSessions.length;
    return avg >= 0.9;
  };

  const [questionsState, setQuestionsState] = useState<Question[]>(allQuestions);

  const handleCompleteQuiz = async (results: AnswerRecord[]) => {
    setAnswers(results);
    
    if (user) {
      setLoadingAction(true);
      const correctAnswers = results.filter(a => a.isCorrect).length;
      
      try {
        // Save Session
        await DataService.saveSession({
            user_id: user.uid, 
            score: correctAnswers,
            total_questions: results.length,
            date: new Date(),
            semana: selectedSemana || 0,
            materia: selectedMateria || 'Desconocida'
        });

        // Save individual progress records in batch ONLY in exam mode
        if (quizConfig.mode === 'exam') {
          const progressRecords = results.map(result => {
            const question = allQuestions.find(q => q.id === result.questionId);
            const subInfo = analyzeSubtema(question?.subtema, question?.materia, question?.semana, question?.text, question?.id);
            return {
              user_id: user.uid, 
              question_id: result.questionId,
              is_correct: result.isCorrect,
              time_spent: result.timeTakenSeconds,
              tema: question?.tema || 'Desconocido',
              subtema: subInfo.normalizado,
              subtema_grupo: subInfo.grupo,
              materia: question?.materia || 'Pediatría',
              date: new Date()
            };
          });
          await DataService.saveProgressBatch(progressRecords);
          
          // Re-fetch progress and sessions immediately
          const progressList = await DataService.getProgress(user.uid);
          setUserProgress(progressList);
          const loadedSessions = await DataService.getSessions(user.uid);
          setSessions(loadedSessions);
        } else {
          // Re-fetch sessions in practice mode
          const loadedSessions = await DataService.getSessions(user.uid);
          setSessions(loadedSessions);
        }
      } catch (e) {
        console.error("Error saving quiz results:", e);
      } finally {
        setLoadingAction(false);
      }
    }

    setView('results');
  };

  const handleQuestionSelect = (questionId: string) => {
    const q = allQuestions.find(x => x.id === questionId);
    if (q) {
      setQuestionsState([q]);
      setAnswers([]);
      setView('quiz');
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'dashboard': return 'Dr. Rodney - Analíticas de Rendimiento';
      case 'simulator': return 'Dr. Rodney - Simulador CONAREM';
      case 'saved': return 'Dr. Rodney - Preguntas Guardadas';
      case 'quiz': return 'Dr. Rodney - Entrenamiento Activo';
      case 'results': return 'Dr. Rodney - Análisis de Resultados';
      case 'admin': return 'Dr. Rodney - Administración';
      default: return 'Dr. Rodney - Preparación Estratégica CONAREM';
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  if (userData && !userData.isApproved) {
    return <PendingApprovalView />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-on-surface selection:bg-primary selection:text-[#0A0A0A] flex">
      <Sidebar 
        currentView={view} 
        setCurrentView={setView} 
        userData={userData} 
        onResetData={handleResetData} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        savedCount={savedQuestionIds.length}
        onStartBookmarksQuiz={handleStartBookmarksQuiz}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'xl:ml-20' : 'xl:ml-72'}`}>
        <TopAppBar 
          title={getTitle()} 
          userData={userData} 
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => {
            if (window.innerWidth < 1280) {
              setIsSidebarOpen(!isSidebarOpen);
            } else {
              setIsSidebarCollapsed(!isSidebarCollapsed);
            }
          }}
          savedCount={savedQuestionIds.length}
          onStartBookmarks={handleStartBookmarksQuiz}
          allQuestions={allQuestions}
          onQuestionSelect={handleQuestionSelect}
        />
        
        <main className="p-4 md:p-8 max-w-[1600px] w-full mx-auto">
          {view === 'dashboard' && (
            <DashboardView 
              userId={user.uid} 
              onReforzar={handleReforzar} 
              allQuestions={allQuestions} 
              onQuestionSelect={handleQuestionSelect} 
              savedQuestionIds={savedQuestionIds}
              onStartBookmarksQuiz={handleStartBookmarksQuiz}
              sessions={sessions}
              progress={userProgress}
              onReloadData={handleReloadData}
            />
          )}
          {view === 'admin' && userData?.role === 'admin' && <AdminView />}

          
          {view === 'quiz-config' && (
            <div className="max-w-3xl mx-auto py-8 px-4">
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-manrope">Configurar Sesión</h2>
                    <p className="text-[#A0A0A0] font-semibold text-sm tracking-wide">
                      {selectedMateria} • Semana {selectedSemana}
                    </p>
                    <p className="text-primary font-extrabold text-xl tracking-tight">
                      {getWeekThemeTitle(selectedMateria || "", selectedSemana || 0) || selectedTema}
                    </p>
                    {getWeekThemeTitle(selectedMateria || "", selectedSemana || 0) && selectedTema && selectedTema !== 'Todos los Temas' && (
                      <p className="text-xs text-[#A0A0A0] font-medium">Tema de Estudio: {selectedTema}</p>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-[0.2em]">Cantidad de preguntas</label>
                        <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg">
                          {selectedQuestionIds.length} / {filteredAvailableQuestions.length}
                        </span>
                      </div>
                      <div className="py-2">
                        <input
                          type="range"
                          min={1}
                          max={filteredAvailableQuestions.length || 1}
                          value={selectedQuestionIds.length}
                          onChange={(e) => handleSliderChange(Number(e.target.value))}
                          disabled={filteredAvailableQuestions.length === 0}
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: `linear-gradient(to right, #C6A84A 0%, #C6A84A ${((selectedQuestionIds.length) / (filteredAvailableQuestions.length || 1)) * 100}%, rgba(255,255,255,0.1) ${((selectedQuestionIds.length) / (filteredAvailableQuestions.length || 1)) * 100}%, rgba(255,255,255,0.1) 100%)`
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {[10, 20, 40].map(val => {
                          if (filteredAvailableQuestions.length < val) return null;
                          const isSelected = selectedQuestionIds.length === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => {
                                const ids = filteredAvailableQuestions.slice(0, val).map(q => q.id);
                                setSelectedQuestionIds(ids);
                                setQuizConfig(prev => ({ ...prev, count: val }));
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                                isSelected 
                                  ? 'bg-primary/20 border-primary text-primary shadow-[0_0_12px_rgba(198,168,74,0.15)]' 
                                  : 'bg-white/5 border-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white'
                              }`}
                            >
                               {val} q
                            </button>
                          );
                        })}
                        {filteredAvailableQuestions.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const ids = filteredAvailableQuestions.map(q => q.id);
                              setSelectedQuestionIds(ids);
                              setQuizConfig(prev => ({ ...prev, count: ids.length }));
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                              selectedQuestionIds.length === filteredAvailableQuestions.length
                                ? 'bg-primary/20 border-primary text-primary shadow-[0_0_12px_rgba(198,168,74,0.15)]' 
                                : 'bg-white/5 border-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            Todas ({filteredAvailableQuestions.length})
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-[0.2em] mb-4 block">Modo de estudio</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setQuizConfig(prev => ({ ...prev, mode: 'practice' }))}
                          className={`p-6 rounded-2xl border transition-all text-left group relative cursor-pointer ${
                            quizConfig.mode === 'practice' 
                              ? 'bg-primary/10 border-primary shadow-inner text-white' 
                              : 'bg-white/5 border-white/5 hover:border-white/10 text-white'
                          }`}
                        >
                          {quizConfig.mode === 'practice' && (
                            <span translate="no" className="notranslate absolute top-4 right-4 text-[9px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1">
                              <Check className="w-3 h-3 text-primary" />
                              Activo
                            </span>
                          )}
                          <p className={`font-bold mb-1 ${quizConfig.mode === 'practice' ? 'text-primary' : 'text-white'}`}>Modo Práctica</p>
                          <p className="text-xs text-[#A0A0A0] leading-relaxed">Sin presión de tiempo. Ideal para aprender y revisar explicaciones.</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuizConfig(prev => ({ ...prev, mode: 'exam' }))}
                          className={`p-6 rounded-2xl border transition-all text-left group relative cursor-pointer ${
                            quizConfig.mode === 'exam' 
                              ? 'bg-primary/10 border-primary shadow-inner text-white' 
                              : 'bg-white/5 border-white/5 hover:border-white/10 text-white'
                          }`}
                        >
                          {quizConfig.mode === 'exam' && (
                            <span translate="no" className="notranslate absolute top-4 right-4 text-[9px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1">
                              <Check className="w-3 h-3 text-primary" />
                              Activo
                            </span>
                          )}
                          <p className={`font-bold mb-1 ${quizConfig.mode === 'exam' ? 'text-primary' : 'text-white'}`}>Modo Examen</p>
                          <p className="text-xs text-[#A0A0A0] leading-relaxed">Con tiempo límite por pregunta. Simula la presión real del CONAREM.</p>
                        </button>
                      </div>
                    </div>

                    {availableSubtemasForConfig.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-[0.2em] block m-0">Subtemas Específicos</label>
                          <div className="flex gap-3">
                            <button 
                              type="button"
                              onClick={() => {
                                const allIds = baseQuestionsForWeek.map(q => q.id);
                                setSelectedQuestionIds(allIds);
                                setQuizConfig(config => ({ ...config, count: allIds.length }));
                              }}
                              className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Todos
                            </button>
                            <span className="text-white/20">|</span>
                            <button 
                              type="button"
                              onClick={() => {
                                const pendingIds = baseQuestionsForWeek.filter(q => getLatestStatusForQuestion(q.id) === 'unanswered').map(q => q.id);
                                setSelectedQuestionIds(pendingIds);
                                setQuizConfig(config => ({ ...config, count: pendingIds.length }));
                              }}
                              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Solo Pendientes
                            </button>
                            <span className="text-white/20">|</span>
                            <button 
                              type="button"
                              onClick={() => {
                                const incorrectIds = baseQuestionsForWeek.filter(q => getLatestStatusForQuestion(q.id) === 'incorrect').map(q => q.id);
                                setSelectedQuestionIds(incorrectIds);
                                setQuizConfig(config => ({ ...config, count: incorrectIds.length }));
                              }}
                              className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Solo Incorrectas
                            </button>
                            <span className="text-white/20">|</span>
                            <button 
                              type="button"
                              onClick={() => {
                                setSelectedQuestionIds([]);
                                setQuizConfig(config => ({ ...config, count: 0 }));
                              }}
                              className="text-[10px] font-bold text-[#A0A0A0] hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Ninguno
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/25 scrollbar-track-transparent pt-2">
                          {groupedSubtemasForConfig.map(({ group, subtemas }) => {
                            const groupQs = baseQuestionsForWeek.filter(q => {
                              if (!q.subtema) return false;
                              const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
                              return subtemas.includes(normalizado);
                            });
                            const selectedGroupCount = groupQs.filter(q => selectedQuestionIds.includes(q.id)).length;
                            const totalGroupCount = groupQs.length;
                            const isGroupAllSelected = selectedGroupCount === totalGroupCount && totalGroupCount > 0;
                            const isGroupAnySelected = selectedGroupCount > 0;
                            const isGroupExpanded = expandedGroups.includes(group);

                            const handleToggleGroup = (e: React.MouseEvent) => {
                              e.stopPropagation();
                              const groupQIds = groupQs.map(q => q.id);
                              if (isGroupAllSelected) {
                                setSelectedQuestionIds(prev => {
                                  const next = prev.filter(id => !groupQIds.includes(id));
                                  setQuizConfig(config => ({ ...config, count: next.length }));
                                  return next;
                                });
                              } else {
                                setSelectedQuestionIds(prev => {
                                  const next = [...prev, ...groupQIds.filter(id => !prev.includes(id))];
                                  setQuizConfig(config => ({ ...config, count: next.length }));
                                  return next;
                                });
                              }
                            };

                            return (
                              <div key={group} className="space-y-2">
                                {/* Nivel 1: Encabezado de Grupo Jerárquico */}
                                <div 
                                  onClick={() => toggleGroupExpanded(group)}
                                  className="flex items-center justify-between py-2.5 px-2 cursor-pointer border-b border-white/10 hover:border-primary/40 transition-colors group/header"
                                >
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={isGroupAnySelected}
                                      ref={el => {
                                        if (el) el.indeterminate = isGroupAnySelected && !isGroupAllSelected;
                                      }}
                                      onClick={handleToggleGroup}
                                      onChange={() => {}}
                                      className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary focus:ring-offset-0 bg-transparent cursor-pointer"
                                    />
                                    <span className={`text-xs font-black uppercase tracking-wider font-manrope transition-colors ${
                                      isGroupAnySelected ? 'text-primary' : 'text-white/90 group-hover/header:text-primary'
                                    }`}>
                                      {group}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                      isGroupAnySelected ? 'bg-primary/15 text-primary border border-primary/20' : 'bg-white/5 text-[#A0A0A0]'
                                    }`}>
                                      {selectedGroupCount}/{totalGroupCount}
                                    </span>
                                    <span className="text-[#A0A0A0] text-xs font-bold">
                                      {isGroupExpanded ? '▲' : '▼'}
                                    </span>
                                  </div>
                                </div>

                                {/* Nivel 2: Subtemas Jerárquicos Indentados */}
                                {isGroupExpanded && (
                                  <div className="pl-4 ml-2 border-l border-white/10 space-y-1.5 pt-1 animate-in fade-in duration-200">
                                    {subtemas.map(st => {
                                      const subthemeQs = baseQuestionsForWeek.filter(q => {
                                        if (!q.subtema) return false;
                                        const { normalizado } = analyzeSubtema(q.subtema, q.materia, q.semana, q.text, q.id);
                                        return normalizado === st;
                                      });
                                      const selectedCount = subthemeQs.filter(q => selectedQuestionIds.includes(q.id)).length;
                                      const totalCount = subthemeQs.length;
                                      const isAllSelected = selectedCount === totalCount;
                                      const isAnySelected = selectedCount > 0;

                                      return (
                                        <div
                                          key={st}
                                          onClick={() => handleToggleSubtheme(st)}
                                          className={`p-3 rounded-lg transition-all cursor-pointer flex items-center justify-between text-xs border ${
                                            isAnySelected
                                              ? 'bg-primary/10 border-primary/30 text-white shadow-[0_0_12px_rgba(198,168,74,0.1)]'
                                              : 'bg-white/[0.01] border-white/5 text-[#A0A0A0] hover:bg-white/5 hover:text-white'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <input
                                              type="checkbox"
                                              checked={isAnySelected}
                                              ref={el => {
                                                if (el) el.indeterminate = isAnySelected && !isAllSelected;
                                              }}
                                              onChange={() => {}}
                                              className="w-3.5 h-3.5 rounded border-white/10 text-primary focus:ring-primary bg-transparent cursor-pointer"
                                            />
                                            <span className={`font-semibold ${isAnySelected ? 'text-primary' : ''}`}>
                                              {st}
                                            </span>
                                          </div>

                                          <span className="text-[10px] font-mono text-[#A0A0A0]">
                                            {selectedCount}/{totalCount}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="text-[10px] text-[#A0A0A0] mt-3 text-right font-bold uppercase tracking-wider">
                          {selectedQuestionIds.length} preguntas seleccionadas
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setView('simulator')}
                      className="flex-1 py-6 border-white/5 text-[#A0A0A0] hover:text-white"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleStartQuiz}
                      disabled={selectedQuestionIds.length === 0}
                      className="flex-[2] py-6 bg-primary text-[#0A0A0A] font-black uppercase tracking-widest shadow-[0_0_40px_rgba(198,168,74,0.3)] hover:shadow-[0_0_60px_rgba(198,168,74,0.5)] disabled:opacity-50 disabled:shadow-none disabled:hover:shadow-none disabled:bg-primary/50 disabled:cursor-not-allowed rounded-xl"
                    >
                      Iniciar Simulación
                    </Button>
                  </div>
                </div>
            </div>
          )}
          
          {view === 'simulator' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center bg-[#121212]/50 backdrop-blur-md p-8 rounded-2xl border border-white/5 mb-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.05] to-transparent pointer-events-none"></div>
                <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-primary font-manrope">Simulador Estratégico</h2>
                  <p className="text-sm text-[#A0A0A0] max-w-md">El sistema detecta tus debilidades. Inicia un simulacro para medir tu nivel actual.</p>
                </div>
                <button 
                  onClick={handleStartRandomQuiz}
                  className="relative z-10 px-8 py-4 bg-primary text-[#0A0A0A] font-bold rounded-xl uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_30px_rgba(198,168,74,0.3)] hover:shadow-[0_0_50px_rgba(198,168,74,0.5)]"
                >
                  Simulacro Aleatorio (20 q)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {Object.entries(subjectsByMateria).map(([materia, semanas]) => (
                  <div key={materia} className="flex flex-col bg-[#121212]/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative group transition-all duration-500 hover:border-primary/30 h-full">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="px-8 py-6 border-b border-white/5 bg-[#1E1E1E]/20 relative overflow-hidden shrink-0">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-full bg-primary/[0.03] blur-xl"></div>
                      <h3 className="relative z-10 text-[12px] font-bold text-primary/90 tracking-[0.25em] uppercase drop-shadow-sm font-manrope">
                        {materia}
                      </h3>
                    </div>

                    <div className="flex flex-col flex-grow">
                      {Object.entries(semanas).sort(([a], [b]) => Number(a) - Number(b)).map(([semana, temas]) => {
                        const isExpanded = !!expandedWeeks[`${materia}-${semana}`];
                        const questionsInWeek = allQuestions.filter(q => q && q.materia === materia && q.semana === Number(semana));
                        const count = questionsInWeek.length;
                        
                        const qIds = new Set(questionsInWeek.map(q => q.id));
                        const validProgress = (userProgress || []).filter(p => p && p.question_id && qIds.has(p.question_id));
                        const seenIds = new Set(validProgress.map(p => p.question_id));
                        const seenCount = seenIds.size;
                        const progressPercent = count > 0 ? Math.round((seenCount / count) * 100) : 0;

                        // Calculate accuracy for this week
                        const weekCorrectCount = validProgress.filter(p => p.is_correct).length;
                        const weekTotalCount = validProgress.length;
                        const weekAccuracy = weekTotalCount > 0 ? Math.round((weekCorrectCount / weekTotalCount) * 100) : 0;
                        
                        // Determine color class based on accuracy
                        let accuracyColor = 'text-primary'; 
                        let progressBarColor = 'bg-primary'; 
                        let weekStatusDotColor = 'bg-neutral-300';
                        
                        if (seenCount > 0) {
                          if (weekAccuracy >= 75) {
                            accuracyColor = 'text-emerald-400';
                            progressBarColor = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                            weekStatusDotColor = 'bg-emerald-500';
                          } else if (weekAccuracy >= 60) {
                            accuracyColor = 'text-amber-400';
                            progressBarColor = 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]';
                            weekStatusDotColor = 'bg-amber-500';
                          } else {
                            accuracyColor = 'text-rose-400';
                            progressBarColor = 'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                            weekStatusDotColor = 'bg-rose-500';
                          }
                        }

                        return (
                          <div key={semana} className="border-b border-white/5 last:border-0">
                            <button
                              onClick={() => toggleWeek(materia, semana)}
                              className="w-full flex items-center justify-between px-8 py-6 hover:bg-primary/[0.02] transition-colors text-left group/btn"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isExpanded ? 'bg-primary' : weekStatusDotColor}`}></div>
                                <div className="flex flex-col">
                                  <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className={`font-semibold text-lg leading-tight transition-colors ${isExpanded ? 'text-primary' : 'text-on-surface group-hover/btn:text-primary'}`}>
                                      Semana {semana}
                                    </span>
                                    <span className="text-xs text-[#A0A0A0]/70 font-semibold">
                                      · {count} {count === 1 ? 'pregunta' : 'preguntas'}
                                    </span>
                                    {seenCount > 0 && (
                                      <span className={`text-[10px] font-black ${accuracyColor} bg-white/5 border border-white/5 px-2 py-0.5 rounded ml-2`}>
                                        {weekAccuracy}% ACC
                                      </span>
                                    )}
                                  </div>
                                  {getWeekThemeTitle(materia, Number(semana)) && (
                                    <span className="text-[11px] font-bold text-primary/75 uppercase tracking-wider block mt-0.5">
                                      {getWeekThemeTitle(materia, Number(semana))}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-primary" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-neutral-600 group-hover/btn:text-primary/50 transition-colors" />
                              )}
                            </button>
                            
                            {isExpanded && (
                              <div className="px-8 pb-6 pt-1 bg-transparent animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pl-6">
                                  <div className="flex items-center gap-6 flex-wrap">
                                    <div className="flex flex-col">
                                      <span className="text-sm font-extrabold text-white">
                                        {count} {count === 1 ? 'pregunta' : 'preguntas'}
                                      </span>
                                      <span className="text-[10px] text-[#A0A0A0] font-semibold uppercase tracking-wider mt-0.5">
                                        {seenCount} resueltas
                                      </span>
                                    </div>
                                    <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-bold text-primary flex items-center gap-2">
                                        {progressPercent}% completado
                                      </span>
                                      <div className="w-24 bg-white/5 rounded-full h-1 mt-1.5 overflow-hidden">
                                        <div 
                                          className={`${progressBarColor} h-1 rounded-full transition-all duration-1000`}
                                          style={{ width: `${progressPercent}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Button 
                                      onClick={() => handlePrepareQuiz(materia, Number(semana), 'Todos los Temas', true)}
                                      className="bg-primary border border-transparent text-[#0A0A0A] hover:bg-primary/90 font-black px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(198,168,74,0.25)] hover:shadow-[0_0_35px_rgba(198,168,74,0.45)] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                      <span>Iniciar Entrenamiento</span>
                                      <ChevronRight className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'saved' && (
            <SavedQuestionsView 
              allQuestions={allQuestions}
              savedQuestionIds={savedQuestionIds}
              onToggleBookmark={handleToggleBookmark}
              onStartQuizWithQuestions={handleStartQuizWithQuestions}
              onQuestionSelect={handleQuestionSelect}
              onBackToSimulator={() => setView('simulator')}
            />
          )}

          {view === 'quiz' && (
            <QuizView 
              questions={questionsState} 
              onComplete={handleCompleteQuiz} 
              mode={quizConfig.mode}
              savedQuestionIds={savedQuestionIds}
              onToggleBookmark={handleToggleBookmark}
              onAnswerImmediate={handleAnswerImmediate}
            />
          )}

          {view === 'results' && (
            <ResultsView 
              questions={questionsState} 
              answers={answers} 
              onRestart={() => setView('simulator')} 
              onRetryFailed={handleRetryFailed}
              userId={user.uid}
              savedQuestionIds={savedQuestionIds}
              onToggleBookmark={handleToggleBookmark}
              progress={userProgress}
            />
          )}
        </main>
      </div>

      {loadingAction && (
        <div className="fixed inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-[9999] flex items-center justify-center flex-col gap-4 animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="text-white font-black uppercase tracking-widest text-[10px]">Preparando material de refuerzo...</span>
        </div>
      )}

      {/* Study material modal removed */}
    </div>
  );
}
