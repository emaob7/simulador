export type YieldLevel = 'ALTO' | 'MEDIO' | 'BAJO';
export type Materia = 'Medicina Interna' | 'Pediatría' | 'Cirugía' | 'Ginecología y Obstetricia';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  
  materia: Materia;
  semana: number;
  tema: string;
  subtema: string;
  module: string;
  pagina?: string;
  docx_tema?: string;
}

export interface AnswerRecord {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timeTakenSeconds: number;
}

export type QuizScopeType = 'week' | 'subject' | 'topic' | 'subtopic' | 'random' | 'saved';

export interface QuizScope {
  type: QuizScopeType;
  id: string;
  label: string;
  materia: string;
  semana?: number;
  sourceWeeks: number[];
}

// --- New Models ---

export interface FirebaseUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  role: 'admin' | 'aspirante';
  isApproved: boolean;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string | null; email: string | null; }[];
  }
}

export interface UserProgress {
  user_id: string;
  question_id: string;
  is_correct: boolean;
  time_spent?: number;
  materia: Materia;
  tema: string;
  subtema: string;
  subtema_grupo: string;
  date: Date;
}

export interface Session {
  user_id: string;
  score: number;
  total_questions: number;
  date: Date;
  semana: number;
  materia: string;
  scopeType?: QuizScopeType;
  scopeId?: string;
  scopeLabel?: string;
  sourceWeeks?: number[];
}

export interface QuestionBookmark {
  user_id: string;
  question_id: string;
  date: Date;
}

