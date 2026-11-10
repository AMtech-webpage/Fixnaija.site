import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
  ActionCodeSettings
} from 'firebase/auth';

// 1. Firebase Client Configuration
// Reads from environment variables; falls back to demo placeholders if not yet populated
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoFixNaijaKeyForTesting_Placeholder',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'fixnaija-prod.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'fixnaija-prod',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'fixnaija-prod.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '85864015996',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:85864015996:web:fixnaija12345678'
};

export const isFirebaseConfigured = (): boolean => {
  const key = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(key && key.length > 20 && !key.includes('Placeholder'));
};

// Initialize Firebase App
export const app: FirebaseApp = getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApp();

// Initialize Firebase Auth
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Translates Firebase Auth error codes into human-friendly messages
 */
export function formatFirebaseAuthError(error: unknown): string {
  if (!error) return 'An unknown error occurred.';
  const code = (error as { code?: string })?.code || '';
  const message = (error as { message?: string })?.message || String(error);

  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is invalid. Please check your spelling.';
    case 'auth/user-disabled':
      return 'This FixNaija account has been temporarily disabled. Contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address. Please log in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters with a combination of letters and numbers.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled before completion.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by your browser. Please allow popups for FixNaija.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Access has been temporarily restricted. Try again later or reset password.';
    case 'auth/network-request-failed':
      return 'Network connection issue. Please check your internet connection.';
    default:
      return message.replace('Firebase: ', '').replace(/\(auth\/[^)]+\)\.?/, '').trim() || 'Authentication operation failed.';
  }
}

/**
 * Register a user with Email & Password in Firebase Authentication
 */
export async function firebaseRegister(email: string, password: string): Promise<User> {
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  return credential.user;
}

/**
 * Send email verification to a Firebase user
 */
export async function firebaseSendEmailVerification(user: User): Promise<void> {
  const actionCodeSettings: ActionCodeSettings = {
    url: window.location.origin + '/?verified=true',
    handleCodeInApp: true,
  };
  await sendEmailVerification(user, actionCodeSettings);
}

/**
 * Sign in with Email & Password
 */
export async function firebaseLogin(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return credential.user;
}

/**
 * Sign in with Google Popup
 */
export async function firebaseLoginWithGoogle(): Promise<User> {
  const credential = await signInWithPopup(auth, googleProvider);
  return credential.user;
}

/**
 * Send Password Reset Email
 */
export async function firebaseSendPasswordReset(email: string): Promise<void> {
  const actionCodeSettings: ActionCodeSettings = {
    url: window.location.origin + '/?reset=true',
    handleCodeInApp: true,
  };
  await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings);
}

/**
 * Logout
 */
export async function firebaseLogout(): Promise<void> {
  await signOut(auth);
}

/**
 * Get current user's ID token (with optional force refresh)
 */
export async function getFirebaseIdToken(forceRefresh = false): Promise<string | null> {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  return await currentUser.getIdToken(forceRefresh);
}
