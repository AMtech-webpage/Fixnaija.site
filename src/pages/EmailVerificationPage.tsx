import React, { useState } from 'react';
import { 
  MailCheck, 
  Send, 
  RotateCw, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EmailVerificationPageProps {
  onVerificationComplete: () => void;
}

export const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({
  onVerificationComplete,
}) => {
  const { firebaseUser, resendVerificationEmail, refreshSession, logout } = useAuth();
  
  const [resending, setResending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const email = firebaseUser?.email || 'your registered email';

  const handleResend = async () => {
    setResending(true);
    setNotice(null);
    setErrorMsg(null);

    const result = await resendVerificationEmail();
    setResending(false);

    if (result.success) {
      setNotice('A fresh verification link has been sent to your inbox.');
    } else {
      setErrorMsg(result.error || 'Failed to dispatch email. Please wait 60 seconds.');
    }
  };

  const handleCheckStatus = async () => {
    setRefreshing(true);
    setNotice(null);
    setErrorMsg(null);

    await refreshSession();
    setRefreshing(false);

    if (firebaseUser?.emailVerified) {
      onVerificationComplete();
    } else {
      setErrorMsg('Your email is not yet confirmed in Firebase Auth. Please click the link in your email inbox.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white dark:bg-[#0D1829] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        
        {/* Banner Header */}
        <div className="bg-[#0B192C] p-8 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#FF6500] flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
            <MailCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Verify Your Email Address
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            FixNaija Security Requirement
          </p>
        </div>

        <div className="p-8 space-y-6">
          
          {/* Trust notice */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Identity Protection Policy</span>
            </div>
            <p className="leading-relaxed text-amber-800 dark:text-amber-300">
              FixNaija enforces verified emails for all members before unlocking protected marketplace features (messaging, booking technicians, receiving jobs, or publishing guides).
            </p>
          </div>

          {/* User Email Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Verification Dispatched To:
            </span>
            <p className="text-sm font-extrabold text-[#0B192C] dark:text-white break-all">
              {email}
            </p>
          </div>

          {/* Feedback Notices */}
          {notice && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{notice}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-2 text-xs text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleCheckStatus}
              disabled={refreshing}
              className="w-full py-3.5 px-4 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {refreshing ? (
                <RotateCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>I've Verified, Continue to FixNaija</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={handleResend}
              disabled={resending}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{resending ? 'Dispatching email...' : 'Resend Verification Email'}</span>
            </button>
          </div>

          {/* Logout */}
          <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => logout()}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out and use another email</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
