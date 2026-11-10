import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Wrench, 
  Briefcase, 
  ArrowRight, 
  Users
} from 'lucide-react';

interface HowItWorksPageProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onFindTechnicians: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onOpenAuth,
  onFindTechnicians,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
          <span>Trust & Transparency</span>
          <span aria-hidden="true">·</span>
          <span>Zero Scams Guaranteed</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
          How FixNaija Works for Clients and Artisans
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We built FixNaija to solve the trust deficit in Nigeria’s maintenance and repair market. Here is how our dual-protection marketplace and educational community keeps everyone safe.
        </p>
      </div>

      {/* Side-by-side Dual Pathway: For Hirers & For Technicians */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* HIRER PATHWAY */}
        <div className="bg-white dark:bg-[#0D1829] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#FF6500]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0B192C] dark:text-white">For People Who Need Repairs (Hirers)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hire with confidence, peace of mind, and fixed pricing</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-xs flex items-center justify-center text-slate-900 dark:text-white shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Find Your Local Pro</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Search by specific fault (e.g. generator AVR, MacBook liquid damage) and your exact LGA (Ikeja, Lekki, Garki, Port Harcourt). Filter by verified NIN status and reviews.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-xs flex items-center justify-center text-slate-900 dark:text-white shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Discuss & Agree on Diagnosis</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Chat privately through FixNaija, attach photos of the broken appliance, and confirm diagnostic fee and turnaround time before any work commences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-xs flex items-center justify-center text-slate-900 dark:text-white shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Escrow Safety & Completion</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Funds are secured in FixNaija Escrow. Only after the technician arrives, performs the repair, and you verify that your equipment is running perfectly do you release payment.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onFindTechnicians}
            className="w-full py-3 bg-[#0B192C] dark:bg-slate-800 hover:bg-[#071322] dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Browse Technicians Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* TECHNICIAN PATHWAY */}
        <div className="bg-white dark:bg-[#0D1829] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#FF6500] flex items-center justify-center border border-orange-200 dark:border-orange-500/20">
              <Wrench className="w-5 h-5 text-[#FF6500]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0B192C] dark:text-white">For Skilled Technicians & Engineers</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monetize your trade, build credibility, and get paid on time</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-500/20 font-bold text-xs flex items-center justify-center text-[#FF6500] shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Create Identity & Verify Credentials</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Register with your full name and phone number. Submit your NIN and Federal Ministry of Labour Trade Test slip to unlock the verified green badge.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-500/20 font-bold text-xs flex items-center justify-center text-[#FF6500] shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Publish Tutorials & Win Clients</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Share troubleshooting checklists and video masterclasses in our Learning Community. High-value tutorials position you as an undisputed authority in your field.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-500/20 font-bold text-xs flex items-center justify-center text-[#FF6500] shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Receive Direct Bookings & Payouts</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Accept incoming job requests, set your own service rates in Naira, and receive direct settlement into your Nigerian commercial bank account upon completion.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full py-3 bg-[#FF6500] hover:bg-[#e05900] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Apply as a Verified Technician</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Security Triad */}
      <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold">The FixNaija Trust Architecture</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Engineered with strict identity checks and secure database isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">NIN & Trade Test Audited</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every technician profile undergoes verification of National Identification Number and technical qualifications before receiving the green badge.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">100% Escrow Protection</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No technician is paid until the client confirms satisfactory job completion. In case of disputes, FixNaija provides unbiased resolution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Open Knowledge Community</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transparent video tutorials and step-by-step guides allow users to learn basic maintenance and verify technician expertise before hiring.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
