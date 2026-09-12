import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { handleFirestoreError } from '../lib/firebaseUtils';

const provider = new GoogleAuthProvider();

export const AuthService = {
  ensureUserDoc: async (user: { uid: string; email: string | null; displayName?: string | null; photoURL?: string | null }) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef).catch(e => {
        console.warn("Could not check user doc:", e);
        return null;
      });

      const isAdmin = user.email === 'roeyduary@gmail.com' || user.email === 'emanuelob7@gmail.com';

      if (!userSnap || !userSnap.exists()) {
        const newUser = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Aspirante',
          photoURL: user.photoURL || '',
          isApproved: isAdmin,
          role: isAdmin ? 'admin' : 'aspirante',
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, newUser).catch(e => handleFirestoreError(e, 'create', `users/${user.uid}`));
        return newUser;
      } else {
        const data = userSnap.data();
        if (isAdmin && (!data?.isApproved || data?.role !== 'admin')) {
          await updateDoc(userRef, {
            isApproved: true,
            role: 'admin'
          }).catch(e => console.warn("Could not update admin role:", e));
        }
        return data;
      }
    } catch (error) {
      console.warn("Error ensuring user doc:", error);
      return null;
    }
  },

  loginWithGoogle: async () => {
    try {
      localStorage.removeItem('dr_rodney_guest_user');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      await AuthService.ensureUserDoc(user);
      return user;
    } catch (error) {
      if (error instanceof Error && error.message.includes('FirestoreErrorInfo')) throw error;
      console.error("Error logging in with Google", error);
      throw error;
    }
  },
  loginAsGuest: async () => {
    // Para modo demo sin Firebase configurado
    const guestUser = {
      uid: 'guest_user',
      email: 'guest@drrodney.app',
      displayName: 'Dr. Invitado',
      photoURL: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      isApproved: true,
      role: 'aspirante'
    };
    localStorage.setItem('dr_rodney_guest_user', JSON.stringify(guestUser));
    window.location.reload(); // Recargar para que App.tsx lo detecte
    return guestUser;
  },
  logout: async () => {
    localStorage.removeItem('dr_rodney_guest_user');
    await signOut(auth);
  },
  
  getUsers: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users')).catch(e => handleFirestoreError(e, 'list', 'users'));
      if (!querySnapshot) return [];
      return querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
    } catch (e) {
      console.error("Error fetching users:", e);
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      return [];
    }
  },
  
  toggleUserApproval: async (uid: string, currentStatus: boolean) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        isApproved: !currentStatus
      }).catch(e => handleFirestoreError(e, 'update', `users/${uid}`));
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      throw e;
    }
  }
};
