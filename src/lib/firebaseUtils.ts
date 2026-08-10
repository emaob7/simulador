import { auth } from '../firebase';
import { FirestoreErrorInfo } from '../types';

export function handleFirestoreError(
  error: any,
  operationType: FirestoreErrorInfo['operationType'],
  path: string | null = null
): never {
  const user = auth.currentUser;
  
  const errorInfo: FirestoreErrorInfo = {
    error: error.message || String(error),
    operationType,
    path,
    authInfo: {
      userId: user?.uid || 'anonymous',
      email: user?.email || null,
      emailVerified: user?.emailVerified || false,
      isAnonymous: user?.isAnonymous || true,
      providerInfo: user?.providerData.map(p => ({
        providerId: p.providerId,
        displayName: p.displayName,
        email: p.email
      })) || []
    }
  };

  console.error('Firestore Error Details:', errorInfo);
  throw new Error(JSON.stringify(errorInfo));
}
