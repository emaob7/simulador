import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { handleFirestoreError } from '../lib/firebaseUtils';

const provider = new GoogleAuthProvider();

export const AuthService = {
  loginWithGoogle: async () => {
    try {
      localStorage.removeItem('dr_rodney_guest_user');
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error logging in with Google", error);
      throw error;
    }
  },
  // Also runs for restored sessions, repairing profiles missing after a failed signup.
  ensureUserProfile: async (user: User) => {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef).catch(e => handleFirestoreError(e, 'get', `users/${user.uid}`));
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          // Roles are granted by a trusted administrator, never by the client.
          isApproved: false,
          role: 'aspirante'
        }).catch(e => handleFirestoreError(e, 'create', `users/${user.uid}`));
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
      return querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }));
    } catch (e) {
      if (e instanceof Error && e.message.includes('FirestoreErrorInfo')) throw e;
      throw e;
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
