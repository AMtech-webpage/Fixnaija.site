import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Award, 
  Users, 
  Lightbulb, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Target,
  Wrench,
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  onFindTechnicians: () => void;
  onJoinPlatform: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onFindTechnicians,
  onJoinPlatform,
}) => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B192C] text-white pt-16 pb-24 overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="text-[#FF6500] font-bold tracking-wider uppercase">About FixNaija</span>
                <span aria-hidden="true">·</span>
                <span>Bridging Skills & Solutions</span>
                <span aria-hidden="true">·</span>
                <span>Built for Nigeria</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
                Making It Easier to Find the Right Hands.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                FixNaija connects people who need reliable services with skilled professionals who are ready to help. We also give technicians a platform to showcase their expertise, share knowledge, and grow their opportunities.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={onFindTechnicians}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Find a Technician</span>
                </button>

                <button
                  onClick={onJoinPlatform}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-[#FF6500]" />
                  <span>Join FixNaija</span>
                </button>
              </div>

            </div>

            {/* Right Column: High-Impact Visual Element */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900 aspect-[4/3] group">
                <img
                  src="/src/assets/images/about_tech_community_1794310836485.jpg"
                  alt="FixNaija Technical Community collaborating in Lagos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Ambient glass trust pill */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6500]/20 text-[#FF6500] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Technician Community Hub</p>
                      <p className="text-[11px] text-slate-300">Empowering 10,000+ artisans across 36 states</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400">Verified Skills</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0D1829] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 lg:p-16 shadow-xs space-y-8">
          
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#FF6500] uppercase tracking-wider block mb-1">
              Why We Exist
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
              Our Story
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <span className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#FF6500] flex items-center justify-center font-bold text-sm">
                01
              </span>
              <p>
                Finding a reliable technician shouldn't be difficult. Across Nigeria, talented professionals have the skills to solve everyday problems, but many struggle to reach the people who need their services.
              </p>
            </div>

            <div className="space-y-3">
              <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-sm">
                02
              </span>
              <p>
                FixNaija was created to bridge that gap by bringing customers and skilled professionals together in one accessible digital platform, backed by transparent pricing and identity verification.
              </p>
            </div>

            <div className="space-y-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                03
              </span>
              <p>
                Beyond connecting people with services, we believe knowledge should be shared. That's why FixNaija also provides a community where professionals can publish tutorials, share experiences, and help others learn practical skills.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MISSION & VISION DUAL CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6500]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#FF6500] border border-white/10">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#FF6500] uppercase tracking-wider block">
                The North Star
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                "To make finding skilled professionals easier while creating opportunities for technicians to grow, connect, and showcase their expertise."
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 mt-6 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dedicated to Nigerian economic empowerment</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white dark:bg-[#0D1829] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#0B192C] dark:text-white border border-slate-200 dark:border-slate-700">
                <Compass className="w-6 h-6 text-[#FF6500]" />
              </div>
              <span className="text-xs font-bold text-[#FF6500] uppercase tracking-wider block">
                The Long View
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                "To become a trusted digital destination where skills, services, knowledge, and opportunities connect across Africa."
              </p>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Pan-African technology and craftsmanship network</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHAT WE OFFER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#FF6500] uppercase tracking-wider block mb-1">
            Built for Modern Nigeria
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
            What We Offer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            A comprehensive ecosystem designed to meet the real-world needs of service seekers and technical creators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 hover:border-[#FF6500] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#FF6500] flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              1. Find Professionals
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Discover verified technicians based on their verified skills, transparent rates, past job reviews, and exact location.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 hover:border-[#FF6500] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#FF6500]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              2. Share Knowledge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Publish tutorials, technical articles, video masterclasses, and practical step-by-step repair guides for the community.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 hover:border-[#FF6500] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#FF6500] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              3. Connect Easily
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Communicate directly with professionals via end-to-end encrypted private messaging, share equipment photos, and agree on quotes.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 hover:border-[#FF6500] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#FF6500]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              4. Grow Your Skills
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Learn from experienced masters, diagnose faults, and gain vocational proficiency through peer-reviewed Nigerian tutorials.
            </p>
          </div>

        </div>
      </section>

      {/* 5. OUR VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 dark:bg-[#0B1526] rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 dark:border-slate-800/80">
          
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#FF6500] uppercase tracking-wider block mb-1">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
              Our Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              The foundational convictions guiding every product decision and interaction on FixNaija.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white dark:bg-[#0D1829] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trust & Transparency</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Clear pricing, verified identity credentials, and honest escrow guarantees.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0D1829] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
              <Users className="w-6 h-6 text-[#FF6500]" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Accessibility</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Available to everyone, everywhere across Nigeria, mobile-first and low-bandwidth friendly.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0D1829] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
              <Award className="w-6 h-6 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Professionalism</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                High standards of workmanship, safety guidelines, and courteous communication.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0D1829] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
              <HeartHandshake className="w-6 h-6 text-blue-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Community</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Empowering artisans, peer support, and collective growth through shared knowledge.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0D1829] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
              <Lightbulb className="w-6 h-6 text-purple-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Innovation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Leveraging modern web, authentication, and database tech to solve local problems.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CLOSING CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl text-center">
          
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#FF6500]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="text-xs font-bold text-[#FF6500] uppercase tracking-wider block">
              Be Part of the Movement
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Your Skills Have a Place Here.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether you're looking for help or offering your expertise, FixNaija gives you a place to connect.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onFindTechnicians}
                className="w-full sm:w-auto px-7 py-3.5 bg-white text-[#0B192C] hover:bg-slate-100 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#FF6500]" />
                <span>Find a Technician</span>
              </button>

              <button
                onClick={onJoinPlatform}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Join FixNaija</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
