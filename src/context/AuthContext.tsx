import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  firebaseRegister, 
  firebaseLogin, 
  firebaseLoginWithGoogle, 
  firebaseSendEmailVerification, 
  firebaseSendPasswordReset, 
  firebaseLogout, 
  formatFirebaseAuthError,
  isFirebaseConfigured
} from '../lib/firebase';
import { 
  syncProfileWithBackend, 
  fetchCurrentServerProfile, 
  setSupabaseCustomToken 
} from '../lib/supabase';
import { UserProfile, UserRole } from '../types';

export interface RegisterFormData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  state: string;
  lga: string;
  city: string;
  account_roles: UserRole[];
}

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isEmailVerified: boolean;
  authError: string | null;
  register: (data: RegisterFormData) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<void>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Monitor Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const serverProfile = await fetchCurrentServerProfile(idToken);
          
          if (serverProfile) {
            setProfile({
              ...serverProfile,
              email_verified: user.emailVerified,
            });
          } else {
            // Minimal profile if server hasn't created one yet
            setProfile({
              id: 'prof-' + user.uid.slice(0, 8),
              firebase_uid: user.uid,
              email: user.email || '',
              full_name: user.displayName || 'FixNaija Member',
              account_roles: ['hirer'],
              roles: ['hirer'],
              email_verified: user.emailVerified,
              created_at: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.error('Session restoration error:', err);
        }
      } else {
        setProfile(null);
        setSupabaseCustomToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * User Registration with Firebase Auth and Server-side Supabase Profile Sync
   */
  const register = async (formData: RegisterFormData): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);
    try {
      // 1. Create account in Firebase Auth
      const user = await firebaseRegister(formData.email, formData.password);
      
      // 2. Automatically dispatch email verification
      try {
        await firebaseSendEmailVerification(user);
      } catch (verificationErr) {
        console.warn('Initial email verification dispatch warning:', verificationErr);
      }

      // 3. Obtain verified Firebase ID token
      const idToken = await user.getIdToken(true);

      // 4. Secure server-side Supabase profile creation
      const syncResult = await syncProfileWithBackend(idToken, {
        full_name: formData.full_name,
        phone: formData.phone,
        state: formData.state,
        lga: formData.lga,
        city: formData.city,
        account_roles: formData.account_roles,
      });

      if (!syncResult.success) {
        throw new Error(syncResult.error || 'Failed to initialize database profile.');
      }

      setFirebaseUser(user);
      setProfile(syncResult.profile || null);

      return { success: true };
    } catch (err: unknown) {
      const formatted = formatFirebaseAuthError(err);
      setAuthError(formatted);
      return { success: false, error: formatted };
    }
  };

  /**
   * User Login with Firebase Auth
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);
    try {
      const user = await firebaseLogin(email, password);
      const idToken = await user.getIdToken();
      const serverProfile = await fetchCurrentServerProfile(idToken);

      setFirebaseUser(user);
      setProfile(serverProfile);

      return { success: true };
    } catch (err: unknown) {
      const formatted = formatFirebaseAuthError(err);
      setAuthError(formatted);
      return { success: false, error: formatted };
    }
  };

  /**
   * Google Sign-in with Firebase
   */
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);
    try {
      const user = await firebaseLoginWithGoogle();
      const idToken = await user.getIdToken();

      // Ensure profile exists in Supabase
      const syncResult = await syncProfileWithBackend(idToken, {
        full_name: user.displayName || 'FixNaija User',
        account_roles: ['hirer', 'technician'],
        avatar_url: user.photoURL || undefined,
      });

      setFirebaseUser(user);
      setProfile(syncResult.profile || null);

      return { success: true };
    } catch (err: unknown) {
      const formatted = formatFirebaseAuthError(err);
      setAuthError(formatted);
      return { success: false, error: formatted };
    }
  };

  /**
   * Logout from Firebase
   */
  const logout = async (): Promise<void> => {
    try {
      await firebaseLogout();
    } finally {
      setFirebaseUser(null);
      setProfile(null);
      setSupabaseCustomToken(null);
    }
  };

  /**
   * Resend Verification Email
   */
  const resendVerificationEmail = async (): Promise<{ success: boolean; error?: string }> => {
    if (!auth.currentUser) {
      return { success: false, error: 'No active session found.' };
    }
    try {
      await firebaseSendEmailVerification(auth.currentUser);
      return { success: true };
    } catch (err) {
      const formatted = formatFirebaseAuthError(err);
      return { success: false, error: formatted };
    }
  };

  /**
   * Password Reset
   */
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await firebaseSendPasswordReset(email);
      return { success: true };
    } catch (err) {
      const formatted = formatFirebaseAuthError(err);
      return { success: false, error: formatted };
    }
  };

  /**
   * Refresh current session status (useful after clicking email verification link)
   */
  const refreshSession = async (): Promise<void> => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setFirebaseUser({ ...auth.currentUser });
      const idToken = await auth.currentUser.getIdToken(true);
      const serverProfile = await fetchCurrentServerProfile(idToken);
      if (serverProfile) {
        setProfile({
          ...serverProfile,
          email_verified: auth.currentUser.emailVerified,
        });
      }
    }
  };

  const isEmailVerified = Boolean(firebaseUser?.emailVerified);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        loading,
        isEmailVerified,
        authError,
        register,
        login,
        loginWithGoogle,
        logout,
        resendVerificationEmail,
        resetPassword,
        refreshSession,
        setProfile,
        isConfigured: isFirebaseConfigured(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
