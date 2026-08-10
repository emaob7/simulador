import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { analyzeSubtema } from '../utils/normalizer';
import { Materia } from '../types';
import { questionsSemana1 } from '../data/semana1/questions';
import { questionsSemana2 } from '../data/semana2/questions';
import { questionsSemana3 } from '../data/semana3/questions';
import { questionsSemana4 } from '../data/semana4/questions';
import { questionsSemana5 } from '../data/semana5/questions';
import { questionsSemana6 } from '../data/semana6/questions';
import { questionsSemana7 } from '../data/semana7/questions';
import { questionsSemana8 } from '../data/semana8/questions';
import { questionsSemana9 } from '../data/semana9/questions';

const allQuestions = [
  ...questionsSemana1,
  ...questionsSemana2,
  ...questionsSemana3,
  ...questionsSemana4,
  ...questionsSemana5,
  ...questionsSemana6,
  ...questionsSemana7,
  ...questionsSemana8,
  ...questionsSemana9,
];

const MATERIAS: Materia[] = ['Pediatría', 'Medicina Interna', 'Cirugía', 'Ginecología y Obstetricia'];

const isGuest = () => !!localStorage.getItem('dr_rodney_guest_user');

export const MockDataService = {
  generateDataForUser: async (userId: string, name: string) => {
    console.log(`Generating mock data for ${name} (${userId})...`);
    
    // 1. Create 8-12 Sessions
    const sessions: any[] = [];
    const progressRecords: any[] = [];
    const numSessions = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numSessions; i++) {
        const materia = MATERIAS[Math.floor(Math.random() * MATERIAS.length)];
        const semana = (i % 9) + 1; // Distribute across weeks 1 to 9
        const total_questions = 15 + Math.floor(Math.random() * 15);
        const score = Math.floor(total_questions * (0.45 + Math.random() * 0.45)); // 45% to 90% accuracy
        
        const session: any = {
            user_id: userId,
            materia,
            semana,
            total_questions,
            score,
            date: new Date(Date.now() - (numSessions - i) * 2 * 24 * 60 * 60 * 1000).toISOString(),
            tema: 'Simulacro General'
        };
        
        sessions.push(session);
        
        // Pick real questions matching the materia and week
        let availableQs = allQuestions.filter(q => q.materia === materia && q.semana === semana);
        if (availableQs.length === 0) {
            availableQs = allQuestions.filter(q => q.materia === materia);
        }
        if (availableQs.length === 0) {
            availableQs = allQuestions;
        }
        
        const shuffledQs = [...availableQs].sort(() => 0.5 - Math.random());
        
        // Generate correct flags that sum to exactly 'score'
        const correctFlags = Array(total_questions).fill(false).map((_, idx) => idx < score);
        correctFlags.sort(() => 0.5 - Math.random());
        
        // 2. Create Progress for this session
        for (let j = 0; j < total_questions; j++) {
            const question = shuffledQs[j % shuffledQs.length];
            const subInfo = analyzeSubtema(question.subtema, question.materia, question.semana, question.text, question.id);
            
            const progress: any = {
                user_id: userId,
                question_id: question.id,
                materia: question.materia,
                tema: question.tema || 'Desconocido',
                subtema: subInfo.normalizado,
                subtema_grupo: subInfo.grupo,
                is_correct: correctFlags[j],
                date: session.date
            };
            progressRecords.push(progress);
        }
    }
    
    if (isGuest()) {
        localStorage.setItem('dr_sessions', JSON.stringify(sessions));
        localStorage.setItem('dr_progress', JSON.stringify(progressRecords));
    } else {
        const sessionPromises = sessions.map(s => addDoc(collection(db, "sessions"), s));
        const progressPromises = progressRecords.map(p => addDoc(collection(db, "progress"), p));
        await Promise.all([...sessionPromises, ...progressPromises]);
    }
    
    console.log(`Done generating data for ${name}`);
  },

  generateGlobalMockData: async (users: any[]) => {
    if (isGuest()) {
        await MockDataService.generateDataForUser('guest_user', 'Dr. Invitado');
        return;
    }
    // Approve all users first
    const approvalPromises = users.map(u => 
        updateDoc(doc(db, 'users', u.uid), { isApproved: true })
    );
    await Promise.all(approvalPromises);

    for (const user of users) {
        await MockDataService.generateDataForUser(user.uid, user.displayName || user.email);
    }
  }
};
