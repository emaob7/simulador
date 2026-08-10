import { Session, UserProgress, QuestionBookmark } from '../types';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import { handleFirestoreError } from '../lib/firebaseUtils';

const isGuest = () => !!localStorage.getItem('dr_rodney_guest_user');

export const DataService = {
  saveSession: async (session: Session) => {
    if (isGuest()) {
      const sessions = JSON.parse(localStorage.getItem('dr_sessions') || '[]');
      sessions.push({ ...session, id: `s_${Date.now()}` });
      localStorage.setItem('dr_sessions', JSON.stringify(sessions));
      return;
    }
    try {
      await addDoc(collection(db, "sessions"), {
        ...session,
        date: session.date.toISOString() 
      }).catch(e => handleFirestoreError(e, 'create', 'sessions'));
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error adding session document: ", e);
    }
  },
  
  getSessions: async (userId: string): Promise<Session[]> => {
    if (isGuest()) {
        const sessions = JSON.parse(localStorage.getItem('dr_sessions') || '[]');
        return sessions.map((s: any) => ({ ...s, date: new Date(s.date) }));
    }
    try {
      const q = query(collection(db, "sessions"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q).catch(e => handleFirestoreError(e, 'list', 'sessions'));
      const sessions: Session[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sessions.push({
          ...data,
          date: new Date(data.date)
        } as Session);
      });
      return sessions;
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error getting sessions: ", e);
      return [];
    }
  },

  getAllSessions: async (): Promise<Session[]> => {
    if (isGuest()) {
        const sessions = JSON.parse(localStorage.getItem('dr_sessions') || '[]');
        return sessions.map((s: any) => ({ ...s, date: new Date(s.date) }));
    }
    try {
      const querySnapshot = await getDocs(collection(db, "sessions")).catch(e => handleFirestoreError(e, 'list', 'sessions'));
      const sessions: Session[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sessions.push({
          ...data,
          date: new Date(data.date)
        } as Session);
      });
      return sessions;
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error getting all sessions: ", e);
      return [];
    }
  },
  
  saveProgress: async (userProgress: UserProgress) => {
    if (isGuest()) {
        const progress = JSON.parse(localStorage.getItem('dr_progress') || '[]');
        progress.push({ ...userProgress, id: `p_${Date.now()}` });
        localStorage.setItem('dr_progress', JSON.stringify(progress));
        return;
    }
    try {
      await addDoc(collection(db, "progress"), {
        ...userProgress,
        date: userProgress.date.toISOString()
      }).catch(e => handleFirestoreError(e, 'create', 'progress'));
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error adding progress document: ", e);
    }
  },
  
  getProgress: async (userId: string): Promise<UserProgress[]> => {
    if (isGuest()) {
        const progress = JSON.parse(localStorage.getItem('dr_progress') || '[]');
        return progress.map((p: any) => ({ ...p, date: new Date(p.date) }));
    }
    try {
      const q = query(collection(db, "progress"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q).catch(e => handleFirestoreError(e, 'list', 'progress'));
      const progress: UserProgress[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        progress.push({
          ...data,
          date: new Date(data.date)
        } as UserProgress);
      });
      return progress;
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error getting progress: ", e);
      return [];
    }
  },

  getAllProgress: async (): Promise<UserProgress[]> => {
    if (isGuest()) {
        const progress = JSON.parse(localStorage.getItem('dr_progress') || '[]');
        return progress.map((p: any) => ({ ...p, date: new Date(p.date) }));
    }
    try {
      const querySnapshot = await getDocs(collection(db, "progress")).catch(e => handleFirestoreError(e, 'list', 'progress'));
      const progress: UserProgress[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        progress.push({
          ...data,
          date: new Date(data.date)
        } as UserProgress);
      });
      return progress;
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error getting all progress: ", e);
      return [];
    }
  },

  resetUserData: async (userId: string) => {
    if (isGuest()) {
        localStorage.removeItem('dr_sessions');
        localStorage.removeItem('dr_progress');
        return;
    }
    try {
      const sessionsQuery = query(collection(db, "sessions"), where("user_id", "==", userId));
      const sessionsSnapshot = await getDocs(sessionsQuery).catch(e => handleFirestoreError(e, 'list', 'sessions'));
      const sessionDeletes = sessionsSnapshot.docs.map(d => deleteDoc(doc(db, "sessions", d.id)).catch(e => handleFirestoreError(e, 'delete', `sessions/${d.id}`)));

      const progressQuery = query(collection(db, "progress"), where("user_id", "==", userId));
      const progressSnapshot = await getDocs(progressQuery).catch(e => handleFirestoreError(e, 'list', 'progress'));
      const progressDeletes = progressSnapshot.docs.map(d => deleteDoc(doc(db, "progress", d.id)).catch(e => handleFirestoreError(e, 'delete', `progress/${d.id}`)));

      // Also reset bookmarks
      const bookmarksQuery = query(collection(db, "bookmarks"), where("user_id", "==", userId));
      const bookmarksSnapshot = await getDocs(bookmarksQuery).catch(e => handleFirestoreError(e, 'list', 'bookmarks'));
      const bookmarkDeletes = bookmarksSnapshot.docs.map(d => deleteDoc(doc(db, "bookmarks", d.id)).catch(e => handleFirestoreError(e, 'delete', `bookmarks/${d.id}`)));

      await Promise.all([...sessionDeletes, ...progressDeletes, ...bookmarkDeletes]);
      console.log('User data reset successfully.');
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error resetting user data: ", e);
      throw e;
    }
  },

  saveProgressBatch: async (progressRecords: UserProgress[]) => {
    if (isGuest()) {
      const progress = JSON.parse(localStorage.getItem('dr_progress') || '[]');
      const newProgress = progressRecords.map((p, idx) => ({ ...p, id: `p_${Date.now()}_${idx}`, date: p.date.toISOString() }));
      localStorage.setItem('dr_progress', JSON.stringify([...progress, ...newProgress]));
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
        await batch.commit().catch(e => handleFirestoreError(e, 'write', 'progress'));
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error committing progress batch: ", e);
    }
  },

  addBookmark: async (userId: string, questionId: string) => {
    if (isGuest()) {
      const bookmarks = JSON.parse(localStorage.getItem('dr_bookmarks') || '[]');
      if (!bookmarks.some((b: any) => b.question_id === questionId)) {
        bookmarks.push({ user_id: userId, question_id: questionId, date: new Date().toISOString() });
        localStorage.setItem('dr_bookmarks', JSON.stringify(bookmarks));
      }
      return;
    }
    try {
      const docId = `${userId}_${questionId}`;
      await setDoc(doc(db, "bookmarks", docId), {
        user_id: userId,
        question_id: questionId,
        date: new Date().toISOString()
      }).catch(e => handleFirestoreError(e, 'create', 'bookmarks'));
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error adding bookmark: ", e);
    }
  },

  removeBookmark: async (userId: string, questionId: string) => {
    if (isGuest()) {
      const bookmarks = JSON.parse(localStorage.getItem('dr_bookmarks') || '[]');
      const filtered = bookmarks.filter((b: any) => b.question_id !== questionId);
      localStorage.setItem('dr_bookmarks', JSON.stringify(filtered));
      return;
    }
    try {
      const docId = `${userId}_${questionId}`;
      await deleteDoc(doc(db, "bookmarks", docId)).catch(e => handleFirestoreError(e, 'delete', `bookmarks/${docId}`));
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error removing bookmark: ", e);
    }
  },

  getBookmarks: async (userId: string): Promise<QuestionBookmark[]> => {
    if (isGuest()) {
      const bookmarks = JSON.parse(localStorage.getItem('dr_bookmarks') || '[]');
      return bookmarks.map((b: any) => ({ ...b, date: new Date(b.date) }));
    }
    try {
      const q = query(collection(db, "bookmarks"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q).catch(e => handleFirestoreError(e, 'list', 'bookmarks'));
      const bookmarks: QuestionBookmark[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        bookmarks.push({
          ...data,
          date: new Date(data.date)
        } as QuestionBookmark);
      });
      return bookmarks;
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      console.error("Error getting bookmarks: ", e);
      return [];
    }
  }
};
