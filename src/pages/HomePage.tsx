import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  Play, 
  BookOpen, 
  ChevronRight,
  Cpu,
  Smartphone,
  Laptop,
  Zap,
  Wind,
  Tv,
  Home
} from 'lucide-react';
import { ServiceCategory, Technician, Tutorial } from '../types';
import { NIGERIAN_STATES } from '../data/mockData';
import { AppTab } from '../components/Navbar';

interface HomePageProps {
  categories: ServiceCategory[];
  technicians: Technician[];
  tutorials: Tutorial[];
  onSelectCategory: (categoryName: string) => void;
  onSelectTechnician: (tech: Technician) => void;
  onSelectTutorial: (tutorial: Tutorial) => void;
  onNavigate: (tab: AppTab) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onSearch: (keyword: string, category: string, state: string, lga: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categories,
  technicians,
  tutorials,
  onSelectCategory,
  onSelectTechnician,
  onSelectTutorial,
  onNavigate,
  onOpenAuth,
  onSearch,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('Lagos');
  const [selectedLga, setSelectedLga] = useState('All LGAs');

  const availableLgas = NIGERIAN_STATES.find(s => s.state === selectedState)?.lgas || [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchKeyword, selectedCategory, selectedState, selectedLga === 'All LGAs' ? '' : selectedLga);
    onNavigate('technicians');
  };

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#FF6500]" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-[#FF6500]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#FF6500]" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-[#FF6500]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#FF6500]" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#FF6500]" />;
      case 'Tv': return <Tv className="w-5 h-5 text-[#FF6500]" />;
      case 'Home': return <Home className="w-5 h-5 text-[#FF6500]" />;
      default: return <Wrench className="w-5 h-5 text-[#FF6500]" />;
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B192C] text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust kicker without pills */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="text-[#FF6500] font-bold tracking-wider uppercase">FixNaija Verified Platform</span>
                <span aria-hidden="true">·</span>
                <span>Connecting 36 States</span>
                <span aria-hidden="true">·</span>
                <span>NIN Verified Pros</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Find the Right Hands for Every Job.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Connect with skilled professionals, discover practical solutions and get your problems fixed without the stress. Guaranteed workmanship, transparent pricing, and instant escrow safety.
              </p>

              {/* Prominent Multi-Zone Search Bar */}
              <form 
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 bg-white dark:bg-[#0D1829] rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700 text-slate-900 dark:text-white grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4"
              >
                {/* Keyword input */}
                <div className="sm:col-span-4 relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Search generator, AC, laptop repair..."
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-transparent border-0 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Category selector */}
                <div className="sm:col-span-3 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pl-2 flex items-center">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-transparent border-0 focus:outline-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-[#0D1829]">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name} className="dark:bg-[#0D1829]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location selector (State & LGA) */}
                <div className="sm:col-span-3 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pl-2 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedLga('All LGAs');
                    }}
                    className="w-full py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-transparent border-0 focus:outline-none cursor-pointer"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st.state} value={st.state} className="dark:bg-[#0D1829]">
                        {st.state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-full py-3 px-4 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Quick tags */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 flex-wrap">
                <span className="text-slate-500">Popular searches:</span>
                <button 
                  onClick={() => { setSelectedCategory('Generator Repair'); onNavigate('technicians'); }}
                  className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
                >
                  Generator Servicing
                </button>
                <span aria-hidden="true">·</span>
                <button 
                  onClick={() => { setSelectedCategory('Computer Repair'); onNavigate('technicians'); }}
                  className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
                >
                  MacBook Repair
                </button>
                <span aria-hidden="true">·</span>
                <button 
                  onClick={() => { setSelectedCategory('Air Conditioning'); onNavigate('technicians'); }}
                  className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
                >
                  Split AC Gas Leak
                </button>
                <span aria-hidden="true">·</span>
                <button 
                  onClick={() => { setSelectedCategory('Electrical Services'); onNavigate('technicians'); }}
                  className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
                >
                  Solar Inverters
                </button>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 aspect-[4/3] group">
                <img
                  src="/src/assets/images/hero_technician_repair_1794306643365.jpg"
                  alt="FixNaija Technician in modern workshop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Trust Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Verified Technician Guarantee</p>
                      <p className="text-[11px] text-slate-300">Identity, trade test & address audited</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#FF6500] tabular-nums">100% Escrow</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-[#0D1829] rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800 transition-colors">
          
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tabular-nums">
              20M+
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Trusted by Over 20M Users Globally
            </p>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#FF6500] tabular-nums">
              ₦45M+
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              USDT & Naira Work Paid Out
            </p>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tabular-nums flex items-center justify-center gap-1">
              <span>4.8</span>
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 inline" />
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Community Satisfaction Rating
            </p>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tabular-nums">
              36 States
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Nationwide Coverage in Nigeria
            </p>
          </div>

        </div>
      </section>

      {/* 3. POPULAR SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
              <span>Essential Expertise</span>
              <span aria-hidden="true">·</span>
              <span>Available 24/7</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight mt-1">
              Popular Service Categories
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              From residential generator tune-ups to precision micro-soldering, hire vetted professionals with upfront transparent rates.
            </p>
          </div>

          <button
            onClick={() => onNavigate('technicians')}
            className="text-xs font-bold text-[#FF6500] hover:text-[#e05900] flex items-center gap-1 group whitespace-nowrap"
          >
            <span>Explore All 8 Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigate('technicians');
              }}
              className="cursor-pointer group p-5 bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-[#FF6500] dark:hover:border-[#FF6500] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 flex items-center justify-center transition-colors mb-4">
                  {renderCategoryIcon(cat.iconName)}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#FF6500] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {cat.popular_issues.slice(0, 2).map((issue) => (
                    <span key={issue} className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {cat.technician_count} verified pros
                </span>
                <span className="font-bold text-[#0B192C] dark:text-white tabular-nums">
                  From ₦{cat.starting_price_naira.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TOP-RATED TECHNICIANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
              <span>Verified Artisans</span>
              <span aria-hidden="true">·</span>
              <span>Audited Workmanship</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight mt-1">
              Top-Rated Technicians
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Reviewed by real Nigerian homeowners, offices, and businesses with transparent job histories.
            </p>
          </div>

          <button
            onClick={() => onNavigate('technicians')}
            className="text-xs font-bold text-[#FF6500] hover:text-[#e05900] flex items-center gap-1 group whitespace-nowrap"
          >
            <span>View All Technicians</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Technician Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.slice(0, 3).map((tech) => (
            <div
              key={tech.id}
              className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                
                {/* Header Profile Row */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={tech.avatar_url}
                      alt={tech.full_name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                    {tech.verified && (
                      <div 
                        title="FixNaija Verified"
                        className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border border-white dark:border-[#0D1829]"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-[#FF6500] transition-colors">
                      {tech.full_name}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 line-clamp-1">
                      {tech.title}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="tabular-nums">{tech.rating.toFixed(2)}</span>
                      </div>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">({tech.reviews_count} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Location and Category */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tech.city}, {tech.state}</span>
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {tech.category}
                  </span>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {tech.bio}
                </p>

                {/* Proficiencies */}
                <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                  {tech.skills.slice(0, 3).map((sk) => (
                    <span key={sk} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Inspection Fee</span>
                  <span className="text-sm font-extrabold text-[#0B192C] dark:text-white tabular-nums">
                    ₦{tech.hourly_rate_naira.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onSelectTechnician(tech)}
                  className="px-4 py-2 bg-[#0B192C] dark:bg-slate-700 hover:bg-[#FF6500] dark:hover:bg-[#FF6500] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. EXPLORE THE LEARNING COMMUNITY */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
                <span>Knowledge Sharing</span>
                <span aria-hidden="true">·</span>
                <span>Open Technical Education</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Explore the Learning Community
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Technicians publish real-world repair breakdowns, video masterclasses, and diagnostic checklists to educate the public and build trust.
              </p>
            </div>

            <button
              onClick={() => onNavigate('learn')}
              className="text-xs font-bold text-[#FF6500] hover:text-white flex items-center gap-1 group whitespace-nowrap"
            >
              <span>Visit Learning Community</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Tutorial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.slice(0, 3).map((tut) => (
              <div
                key={tut.id}
                onClick={() => onSelectTutorial(tut)}
                className="cursor-pointer group bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden hover:border-[#FF6500] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={tut.cover_image}
                      alt={tut.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1">
                      {tut.type === 'video' ? <Play className="w-3 h-3 fill-white" /> : <BookOpen className="w-3 h-3" />}
                      <span className="capitalize">{tut.type}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-0.5 rounded text-[10px] font-mono tabular-nums">
                      {tut.read_time}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-[#FF6500] font-semibold">{tut.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tut.published_at}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#FF6500] transition-colors leading-snug line-clamp-2">
                      {tut.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {tut.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Author & Engagement */}
                <div className="p-5 pt-0 border-t border-slate-700/60 mt-4 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={tut.author.avatar_url}
                      alt={tut.author.name}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-medium text-slate-200">{tut.author.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="tabular-nums">{tut.likes_count} likes</span>
                    <span className="tabular-nums">{tut.comments_count} comments</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. HOW FIXNAIJA WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider mb-2">
            <span>Simple & Transparent</span>
            <span aria-hidden="true">·</span>
            <span>Zero Headaches</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
            How FixNaija Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Get your appliances, generators, and electronics repaired with verified peace of mind in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 text-center relative shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#0B192C] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Find a Professional
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Browse vetted technicians by location, category, customer reviews, and transparent pricing in your exact local government area.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 text-center relative shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#FF6500] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Connect & Discuss Your Problem
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Use our private messaging system to share photos of the fault, agree on diagnostic inspection fees, and set convenient arrival times.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 text-center relative shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#0B192C] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Get the Job Done
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Technician delivers high-quality service at your premises or workshop. Funds are only disbursed once you confirm you are 100% satisfied.
            </p>
          </div>

        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B192C] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6500]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
              <span>Technician Onboarding</span>
              <span aria-hidden="true">·</span>
              <span>Grow Your Client Base</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your Skills Deserve an Audience.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Join FixNaija and connect with people who need your expertise. Publish tutorials to demonstrate your authority, receive verified customer bookings, and earn with guaranteed escrow protection.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Become a Technician</span>
              </button>

              <button
                onClick={() => onNavigate('technicians')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Find a Technician</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 pt-2">
              No subscription fee to start. Retain your direct clientele.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
