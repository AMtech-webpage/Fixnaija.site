import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { Technician, ServiceCategory } from '../types';
import { NIGERIAN_STATES } from '../data/mockData';

interface FindTechniciansPageProps {
  technicians: Technician[];
  categories: ServiceCategory[];
  onSelectTechnician: (tech: Technician) => void;
  onBookService: (tech: Technician) => void;
  onMessageTech: (tech: Technician) => void;
  initialCategory?: string;
  initialSearch?: string;
  initialState?: string;
  initialLga?: string;
}

export const FindTechniciansPage: React.FC<FindTechniciansPageProps> = ({
  technicians,
  categories,
  onSelectTechnician,
  onBookService,
  onMessageTech,
  initialCategory = '',
  initialSearch = '',
  initialState = 'All States',
  initialLga = 'All LGAs',
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedLga, setSelectedLga] = useState(initialLga);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const availableLgas = useMemo(() => {
    if (selectedState === 'All States') return [];
    return NIGERIAN_STATES.find(s => s.state === selectedState)?.lgas || [];
  }, [selectedState]);

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedLga('All LGAs');
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedState('All States');
    setSelectedLga('All LGAs');
    setMinRating(0);
    setOnlyVerified(false);
    setOnlyAvailable(false);
  };

  const filteredTechnicians = useMemo(() => {
    return technicians.filter(tech => {
      // Category filter
      if (selectedCategory && tech.category !== selectedCategory) {
        return false;
      }
      // State filter
      if (selectedState !== 'All States' && tech.state !== selectedState) {
        return false;
      }
      // LGA filter
      if (selectedLga !== 'All LGAs' && !tech.lga.toLowerCase().includes(selectedLga.toLowerCase())) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && tech.rating < minRating) {
        return false;
      }
      // Verified only
      if (onlyVerified && !tech.verified) {
        return false;
      }
      // Available only
      if (onlyAvailable && !tech.available) {
        return false;
      }
      // Keyword search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = tech.full_name.toLowerCase().includes(q);
        const matchesTitle = tech.title.toLowerCase().includes(q);
        const matchesBio = tech.bio.toLowerCase().includes(q);
        const matchesCategory = tech.category.toLowerCase().includes(q);
        const matchesSkills = tech.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesBio && !matchesCategory && !matchesSkills) {
          return false;
        }
      }
      return true;
    });
  }, [technicians, search, selectedCategory, selectedState, selectedLga, minRating, onlyVerified, onlyAvailable]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Heading */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
            <span>Verified Marketplace</span>
            <span aria-hidden="true">·</span>
            <span>Audited Skills</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Find Verified Technicians Across Nigeria
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Search top-rated Nigerian engineers, plumbers, electricians, AC technicians, and hardware specialists with verified NIN and Federal Trade Test credentials.
          </p>
        </div>
      </div>

      {/* Filter Toolbar Card */}
      <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-sm space-y-4 transition-colors">
        
        {/* Main Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Keyword Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, trade or fault (e.g. Inverter, Mikano, MacBook)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 cursor-pointer"
            >
              <option value="" className="dark:bg-[#0D1829]">All Categories (8)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name} className="dark:bg-[#0D1829]">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Selector */}
          <div className="md:col-span-2">
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 cursor-pointer"
            >
              <option value="All States" className="dark:bg-[#0D1829]">All States</option>
              {NIGERIAN_STATES.map((st) => (
                <option key={st.state} value={st.state} className="dark:bg-[#0D1829]">
                  {st.state}
                </option>
              ))}
            </select>
          </div>

          {/* LGA Selector */}
          <div className="md:col-span-2">
            <select
              value={selectedLga}
              disabled={selectedState === 'All States'}
              onChange={(e) => setSelectedLga(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 cursor-pointer disabled:opacity-50"
            >
              <option value="All LGAs" className="dark:bg-[#0D1829]">All LGAs</option>
              {availableLgas.map((lga) => (
                <option key={lga} value={lga} className="dark:bg-[#0D1829]">
                  {lga}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Secondary Filter Chips Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-500 dark:text-slate-400">Refine by:</span>

            {/* Verified Only */}
            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                onlyVerified 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold' 
                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>NIN & Trade Verified</span>
            </button>

            {/* Available Now */}
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                onlyAvailable 
                  ? 'bg-[#0B192C] dark:bg-[#FF6500] border-[#0B192C] dark:border-[#FF6500] text-white font-semibold' 
                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span>Available Today</span>
            </button>

            {/* Rating Filter */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setMinRating(0)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${minRating === 0 ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
              >
                Any Rating
              </button>
              <button
                onClick={() => setMinRating(4.8)}
                className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors ${minRating === 4.8 ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
              >
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>4.8+</span>
              </button>
            </div>
          </div>

          {/* Reset Filters */}
          {(search || selectedCategory || selectedState !== 'All States' || selectedLga !== 'All LGAs' || minRating > 0 || onlyVerified || onlyAvailable) && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}

        </div>

      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span>
          Showing <strong className="text-slate-900 dark:text-white tabular-nums">{filteredTechnicians.length}</strong> verified technicians
          {selectedCategory && ` in ${selectedCategory}`}
          {selectedState !== 'All States' && ` in ${selectedState}`}
        </span>
        <span className="hidden sm:inline">100% Escrow Protection on every booking</span>
      </div>

      {/* Technicians Grid */}
      {filteredTechnicians.length === 0 ? (
        <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No technicians matched your search criteria</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try broadening your location filter to "All States" or clearing specific category keywords.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#0B192C] dark:bg-[#FF6500] text-white text-xs font-bold rounded-xl mt-2"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                
                {/* Header */}
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
                    <h3 
                      onClick={() => onSelectTechnician(tech)}
                      className="text-base font-bold text-slate-900 dark:text-white hover:text-[#FF6500] cursor-pointer transition-colors"
                    >
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
                  <span className="font-semibold text-slate-800 dark:text-slate-300">
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

              {/* Bottom Card Footer with Actions */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Inspection Fee</span>
                  <span className="text-sm font-extrabold text-[#0B192C] dark:text-white tabular-nums">
                    ₦{tech.hourly_rate_naira.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onMessageTech(tech)}
                    title="Send Private Message"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#0B192C] dark:text-slate-200" />
                  </button>
                  <button
                    onClick={() => onSelectTechnician(tech)}
                    className="px-3.5 py-2 bg-[#0B192C] dark:bg-slate-700 hover:bg-[#FF6500] dark:hover:bg-[#FF6500] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
