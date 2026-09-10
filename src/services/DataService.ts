import { Session, UserProgress, QuestionBookmark } from '../types';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';

const isGuest = () => !auth.currentUser && !!localStorage.getItem('dr_rodney_guest_user');

// Variable en memoria para no reintentar lecturas costosas si la cuota de Firestore fue superada
let quotaExceeded = false;

// Helpers de caché local ultra-rápido y a prueba de cuota
const getCache = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const setCache = <T>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("LocalStorage no disponible o lleno:", e);
  }
};

export const DataService = {
  saveSession: async (session: Session) => {
    const uid = auth.currentUser?.uid || 'guest';
    const cacheKey = `dr_sessions_${uid}`;
    const localSessions = getCache<any>(cacheKey);
    const newSession = { ...session, id: session.id || `s_${Date.now()}` };
    localSessions.push(newSession);
    setCache(cacheKey, localSessions);

    if (isGuest() || quotaExceeded) {
      return;
    }

    try {
      await addDoc(collection(db, "sessions"), {
        ...session,
        date: session.date.toISOString() 
      });
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
        console.warn("Firestore cuota diaria agotada (sesión guardada localmente)");
      } else {
        console.warn("Error guardando sesión en Firestore (guardada localmente):", e);
      }
    }
  },
  
  getSessions: async (userId: string): Promise<Session[]> => {
    const cacheKey = `dr_sessions_${userId}`;
    const cached = getCache<any>(cacheKey).map((s: any) => ({ ...s, date: new Date(s.date) }));

    if (isGuest() || quotaExceeded) {
      return cached;
    }

    try {
      const q = query(collection(db, "sessions"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      const sessions: Session[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sessions.push({
          ...data,
          date: new Date(data.date)
        } as Session);
      });
      setCache(cacheKey, sessions);
      return sessions;
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
        console.warn("Firestore cuota diaria superada, cargando sesiones desde caché local.");
      } else {
        console.warn("Error obteniendo sesiones de Firestore, usando caché local:", e);
      }
      return cached;
    }
  },

  getAllSessions: async (): Promise<Session[]> => {
    const uid = auth.currentUser?.uid || 'guest';
    return DataService.getSessions(uid);
  },
  
  saveProgress: async (userProgress: UserProgress) => {
    const uid = userProgress.user_id || auth.currentUser?.uid || 'guest';
    const cacheKey = `dr_progress_${uid}`;
    const localProgress = getCache<any>(cacheKey);
    
    // Evitar duplicados por question_id en caché local
    const filtered = localProgress.filter((p: any) => p.question_id !== userProgress.question_id);
    filtered.push({ ...userProgress, id: `p_${Date.now()}` });
    setCache(cacheKey, filtered);

    if (isGuest() || quotaExceeded) {
      return;
    }

    try {
      await addDoc(collection(db, "progress"), {
        ...userProgress,
        date: userProgress.date.toISOString()
      });
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
        console.warn("Firestore cuota diaria agotada (progreso guardado localmente)");
      } else {
        console.warn("Error guardando progreso en Firestore (guardado localmente):", e);
      }
    }
  },

  saveProgressList: async (progressList: UserProgress[]) => {
    if (!progressList || progressList.length === 0) return;
    return DataService.saveProgressBatch(progressList);
  },
  
  getProgress: async (userId: string): Promise<UserProgress[]> => {
    const cacheKey = `dr_progress_${userId}`;
    const cached = getCache<any>(cacheKey).map((p: any) => ({ ...p, date: new Date(p.date) }));

    if (isGuest() || quotaExceeded) {
      return cached;
    }

    try {
      const q = query(collection(db, "progress"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      const progress: UserProgress[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        progress.push({
          ...data,
          date: new Date(data.date)
        } as UserProgress);
      });

      // Sincronizar elementos locales que falten
      const seen = new Set(progress.map(p => p.question_id));
      cached.forEach(c => {
        if (!seen.has(c.question_id)) {
          progress.push(c);
        }
      });

      setCache(cacheKey, progress);
      return progress;
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
        console.warn("Firestore cuota diaria superada, cargando progreso desde caché local.");
      } else {
        console.warn("Error obteniendo progreso de Firestore, usando caché local:", e);
      }
      return cached;
    }
  },

  getAllProgress: async (): Promise<UserProgress[]> => {
    const uid = auth.currentUser?.uid || 'guest';
    return DataService.getProgress(uid);
  },

  resetUserData: async (userId: string) => {
    const sessionsKey = `dr_sessions_${userId}`;
    const progressKey = `dr_progress_${userId}`;
    const bookmarksKey = `dr_bookmarks_${userId}`;
    localStorage.removeItem(sessionsKey);
    localStorage.removeItem(progressKey);
    localStorage.removeItem(bookmarksKey);
    localStorage.removeItem('dr_sessions');
    localStorage.removeItem('dr_progress');
    localStorage.removeItem('dr_bookmarks');

    if (isGuest() || quotaExceeded) {
      return;
    }

    try {
      const sessionsQuery = query(collection(db, "sessions"), where("user_id", "==", userId));
      const sessionsSnapshot = await getDocs(sessionsQuery);
      const sessionDeletes = sessionsSnapshot.docs.map(d => deleteDoc(doc(db, "sessions", d.id)));

      const progressQuery = query(collection(db, "progress"), where("user_id", "==", userId));
      const progressSnapshot = await getDocs(progressQuery);
      const progressDeletes = progressSnapshot.docs.map(d => deleteDoc(doc(db, "progress", d.id)));

      const bookmarksQuery = query(collection(db, "bookmarks"), where("user_id", "==", userId));
      const bookmarksSnapshot = await getDocs(bookmarksQuery);
      const bookmarkDeletes = bookmarksSnapshot.docs.map(d => deleteDoc(doc(db, "bookmarks", d.id)));

      await Promise.allSettled([...sessionDeletes, ...progressDeletes, ...bookmarkDeletes]);
    } catch (e: any) {
      console.warn("Error reseteando datos remotos:", e);
    }
  },

  saveProgressBatch: async (progressRecords: UserProgress[]) => {
    if (!progressRecords || progressRecords.length === 0) return;
    const uid = progressRecords[0]?.user_id || auth.currentUser?.uid || 'guest';
    const cacheKey = `dr_progress_${uid}`;
    const localProgress = getCache<any>(cacheKey);
    
    const incomingMap = new Map(progressRecords.map(p => [p.question_id, p]));
    const updated = localProgress.filter((p: any) => !incomingMap.has(p.question_id));
    progressRecords.forEach((p, idx) => {
      updated.push({ ...p, id: `p_${Date.now()}_${idx}`, date: p.date.toISOString() });
    });
    setCache(cacheKey, updated);

    if (isGuest() || quotaExceeded) {
      return;
    }

    try {
      const batchLimit = 400;
      for (let i = 0; i < progressRecords.length; i += batchLimit) {
        const chunk = progressRecords.slice(i, i + batchLimit);
        const batch = writeBatch(db);
        chunk.forEach(record => {
          const newDocRef = doc(collection(db, "progress"));
          batch.set(newDocRef, {
            ...record,
            date: record.date.toISOString()
          });
        });
        await batch.commit();
      }
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
        console.warn("Firestore cuota agotada al guardar batch (guardado localmente con éxito)");
      } else {
        console.warn("Error al guardar lote en Firestore (guardado en caché local):", e);
      }
    }
  },

  addBookmark: async (userId: string, questionId: string) => {
    const cacheKey = `dr_bookmarks_${userId}`;
    const bookmarks = getCache<any>(cacheKey);
    if (!bookmarks.some((b: any) => b.question_id === questionId)) {
      bookmarks.push({ user_id: userId, question_id: questionId, date: new Date().toISOString() });
      setCache(cacheKey, bookmarks);
    }

    if (isGuest() || quotaExceeded) {
      return;
    }

    try {
      const docId = `${userId}_${questionId}`;
      await setDoc(doc(db, "bookmarks", docId), {
        user_id: userId,
        question_id: questionId,
        date: new Date().toISOString()
      });
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
      }
      console.warn("Error agregando marcador a Firestore (guardado localmente):", e);
    }
  },

  removeBookmark: async (userId: string, questionId: string) => {
    const cacheKey = `dr_bookmarks_${userId}`;
    const bookmarks = getCache<any>(cacheKey);
    const filtered = bookmarks.filter((b: any) => b.question_id !== questionId);
    setCache(cacheKey, filtered);

    if (isGuest() || quotaExceeded) {
      return;
    }

    try {
      const docId = `${userId}_${questionId}`;
      await deleteDoc(doc(db, "bookmarks", docId));
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
      }
      console.warn("Error eliminando marcador de Firestore (eliminado localmente):", e);
    }
  },

  getBookmarks: async (userId: string): Promise<QuestionBookmark[]> => {
    const cacheKey = `dr_bookmarks_${userId}`;
    const cached = getCache<any>(cacheKey).map((b: any) => ({ ...b, date: new Date(b.date) }));

    if (isGuest() || quotaExceeded) {
      return cached;
    }

    try {
      const q = query(collection(db, "bookmarks"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      const bookmarks: QuestionBookmark[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        bookmarks.push({
          ...data,
          date: new Date(data.date)
        } as QuestionBookmark);
      });
      setCache(cacheKey, bookmarks);
      return bookmarks;
    } catch (e: any) {
      if (e?.code === 'resource-exhausted' || String(e).includes('resource-exhausted')) {
        quotaExceeded = true;
        console.warn("Firestore cuota diaria superada, cargando marcadores desde caché local.");
      } else {
        console.warn("Error obteniendo marcadores de Firestore, usando caché local:", e);
      }
      return cached;
    }
  }
};
