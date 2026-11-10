import React, { useState } from 'react';
import { X, Check, AlertCircle, Wrench, Shield, Briefcase, Mail, Lock, Phone, User as UserIcon, MapPin } from 'lucide-react';
import { NIGERIAN_STATES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { UserProfile, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onAuthSuccess,
}) => {
  const { register, login, profile } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedState, setSelectedState] = useState('Lagos');
  const [selectedLga, setSelectedLga] = useState('Ikeja');
  const [city, setCity] = useState('Ikeja');

  // Dual Roles: Allow selecting either or both!
  const [roles, setRoles] = useState<UserRole[]>(['hirer']);

  if (!isOpen) return null;

  const currentLgas = NIGERIAN_STATES.find(s => s.state === selectedState)?.lgas || [];

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const found = NIGERIAN_STATES.find(s => s.state === stateName);
    if (found && found.lgas.length > 0) {
      setSelectedLga(found.lgas[0]);
    }
  };

  const toggleRole = (role: UserRole) => {
    if (roles.includes(role)) {
      if (roles.length > 1) {
        setRoles(roles.filter(r => r !== role));
      }
    } else {
      setRoles([...roles, role]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessNotice(null);

    if (!email || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          setErrorMsg('Full name is required for technician and client verification.');
          setLoading(false);
          return;
        }

        const res = await register({
          email: email.trim(),
          password,
          full_name: fullName.trim(),
          phone: phone.trim() || '+234',
          state: selectedState,
          lga: selectedLga,
          city: city.trim() || selectedLga,
          account_roles: roles,
        });

        if (!res.success) {
          setErrorMsg(res.error || 'Registration failed. Please try again.');
        } else {
          setSuccessNotice('Account created with Firebase! Email verification sent.');
          if (profile) onAuthSuccess(profile);
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      } else {
        // Login mode
        const res = await login(email.trim(), password);
        if (!res.success) {
          setErrorMsg(res.error || 'Invalid email or password.');
        } else {
          if (profile) onAuthSuccess(profile);
          onClose();
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-[#0B192C] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#FF6500]">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                {mode === 'signup' ? 'Create FixNaija Account' : 'Welcome Back to FixNaija'}
              </h3>
              <p className="text-xs text-slate-300">
                {mode === 'signup' 
                  ? 'Connect with verified technicians & share technical expertise' 
                  : 'Log in to manage jobs, messages, and services'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#0B192C] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Registration
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#0B192C] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Existing Member Log In
          </button>
        </div>

        {/* Error and Success Notices */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successNotice && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {mode === 'signup' && (
            <>
              {/* Dual-role selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Choose Your Account Role (Select either or both)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => toggleRole('hirer')}
                    className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                      roles.includes('hirer')
                        ? 'border-[#0B192C] bg-slate-50 ring-1 ring-[#0B192C]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <Briefcase className="w-3.5 h-3.5 text-[#FF6500]" />
                        <span>HIRER</span>
                      </div>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center text-white text-[10px] ${
                        roles.includes('hirer') ? 'bg-[#0B192C]' : 'border border-slate-300'
                      }`}>
                        {roles.includes('hirer') && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      I want to hire technicians for repairs and jobs.
                    </p>
                  </div>

                  <div
                    onClick={() => toggleRole('technician')}
                    className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                      roles.includes('technician')
                        ? 'border-[#FF6500] bg-orange-50/40 ring-1 ring-[#FF6500]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <Wrench className="w-3.5 h-3.5 text-[#FF6500]" />
                        <span>TECHNICIAN</span>
                      </div>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center text-white text-[10px] ${
                        roles.includes('technician') ? 'bg-[#FF6500]' : 'border border-slate-300'
                      }`}>
                        {roles.includes('technician') && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      I offer technical skills, publish tutorials & take jobs.
                    </p>
                  </div>
                </div>

                {roles.length === 2 && (
                  <p className="mt-1.5 text-[11px] text-emerald-700 font-medium">
                    Dual Account Active: You can hire pros and publish services from one profile.
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (First and Last Name)
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babajide Adeleke"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Location Selectors: State, LGA, City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white transition-all"
                  >
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s.state} value={s.state}>
                        {s.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    LGA (Local Govt)
                  </label>
                  <select
                    value={selectedLga}
                    onChange={(e) => setSelectedLga(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white transition-all"
                  >
                    {currentLgas.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City or Town */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City or Town / Area
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ikeja, Allen, Yaba, Garki"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === 'signup' ? (
              <span>Complete FixNaija Registration</span>
            ) : (
              <span>Sign In to Account</span>
            )}
          </button>

          {/* Supabase security footnote */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-500">
              Protected by Supabase Auth with Row Level Security.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
