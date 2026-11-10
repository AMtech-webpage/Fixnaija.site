import React, { useState } from 'react';
import { 
  KeyRound, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PasswordResetPageProps {
  onNavigateToLogin: () => void;
}

export const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ onNavigateToLogin }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter the email address linked to your FixNaija account.');
      return;
    }

    setLoading(true);
    const result = await resetPassword(email.trim());
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to dispatch password reset email.');
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white dark:bg-[#0D1829] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        
        {/* Banner Header */}
        <div className="bg-[#0B192C] p-8 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto mb-3 border border-white/10">
            <KeyRound className="w-6 h-6 text-[#FF6500]" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            We will dispatch an encrypted reset link to your registered email address.
          </p>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Reset Instructions Dispatched!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              If an account is associated with <strong>{email}</strong>, a password recovery link has been delivered to your inbox. Please check your spam or promotions folder if you don't see it within 2 minutes.
            </p>
            <button
              onClick={onNavigateToLogin}
              className="w-full py-3 bg-[#0B192C] dark:bg-[#FF6500] text-white text-xs font-bold rounded-xl hover:bg-[#071322] dark:hover:bg-[#e05900] transition-colors"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-2 text-xs text-rose-800 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. babajide@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Send Password Reset Email</span>
              )}
            </button>

            <button
              type="button"
              onClick={onNavigateToLogin}
              className="w-full py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
