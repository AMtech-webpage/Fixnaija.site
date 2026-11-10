import React, { useState } from 'react';
import { 
  Wrench, 
  Briefcase, 
  Check, 
  AlertCircle, 
  User as UserIcon, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NIGERIAN_STATES } from '../data/mockData';
import { UserRole } from '../types';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
  onRegistrationComplete: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigateToLogin,
  onRegistrationComplete,
}) => {
  const { register, loginWithGoogle } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedState, setSelectedState] = useState('Lagos');
  const [selectedLga, setSelectedLga] = useState('Ikeja');
  const [city, setCity] = useState('Ikeja');
  const [roles, setRoles] = useState<UserRole[]>(['hirer']);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your entry.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    const result = await register({
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+234',
      password,
      state: selectedState,
      lga: selectedLga,
      city: city.trim() || selectedLga,
      account_roles: roles,
    });

    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to create your FixNaija account.');
    } else {
      onRegistrationComplete();
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    const result = await loginWithGoogle();
    setLoading(false);
    if (!result.success) {
      setErrorMsg(result.error || 'Google sign-in failed.');
    } else {
      onRegistrationComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-[#0B192C] p-8 text-white text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto mb-3 border border-white/10">
            <Wrench className="w-6 h-6 text-[#FF6500]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Create Your FixNaija Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Powered by Firebase Authentication with encrypted identity & trusted Supabase database storage.
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mx-8 mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Account Capabilities / Roles: Hirer, Technician or Both */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Select Your Account Capabilities (Choose One or Both)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => toggleRole('hirer')}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  roles.includes('hirer')
                    ? 'border-[#0B192C] bg-slate-50 ring-2 ring-[#0B192C]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Briefcase className="w-4 h-4 text-[#FF6500]" />
                    <span>HIRER</span>
                  </div>
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center text-white text-[10px] ${
                    roles.includes('hirer') ? 'bg-[#0B192C]' : 'border border-slate-300'
                  }`}>
                    {roles.includes('hirer') && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  I need to find and hire verified technicians for home and business repairs.
                </p>
              </div>

              <div
                onClick={() => toggleRole('technician')}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  roles.includes('technician')
                    ? 'border-[#FF6500] bg-orange-50/50 ring-2 ring-[#FF6500]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Wrench className="w-4 h-4 text-[#FF6500]" />
                    <span>TECHNICIAN</span>
                  </div>
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center text-white text-[10px] ${
                    roles.includes('technician') ? 'bg-[#FF6500]' : 'border border-slate-300'
                  }`}>
                    {roles.includes('technician') && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  I offer skilled repair services, publish tutorials, and take customer bookings.
                </p>
              </div>
            </div>

            {roles.length === 2 && (
              <p className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Dual Role Active: Switch seamlessly between hiring and taking service requests.</span>
              </p>
            )}
          </div>

          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Babajide Adeleke"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
                />
              </div>
            </div>

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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address (Verification link will be dispatched)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
              />
            </div>
          </div>

          {/* State, LGA, City */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
              >
                {NIGERIAN_STATES.map((s) => (
                  <option key={s.state} value={s.state}>{s.state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LGA</label>
              <select
                value={selectedLga}
                onChange={(e) => setSelectedLga(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
              >
                {currentLgas.map((lga) => (
                  <option key={lga} value={lga}>{lga}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City / Town</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Allen Avenue"
                  className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password (Min. 6 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create strong password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Register with Firebase Auth & Sync to Supabase</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 font-medium">Or</span>
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Footer Navigation Link */}
          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#FF6500] font-bold hover:underline"
            >
              Sign In to FixNaija
            </button>
          </p>

        </form>

      </div>
    </div>
  );
};
