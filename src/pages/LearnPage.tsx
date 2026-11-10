import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Plus, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Tutorial, UserProfile } from '../types';

interface LearnPageProps {
  tutorials: Tutorial[];
  onSelectTutorial: (tutorial: Tutorial) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onPublishTutorial: (tutorial: Partial<Tutorial>) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({
  tutorials,
  onSelectTutorial,
  currentUser,
  onOpenAuth,
  onPublishTutorial,
}) => {
  const [activeFormat, setActiveFormat] = useState<'all' | 'video' | 'article' | 'guide'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // New tutorial form state
  const [pubTitle, setPubTitle] = useState('');
  const [pubType, setPubType] = useState<'video' | 'article' | 'guide'>('guide');
  const [pubCategory, setPubCategory] = useState('Generator Repair');
  const [pubExcerpt, setPubExcerpt] = useState('');
  const [pubStepTitle, setPubStepTitle] = useState('');
  const [pubStepDetail, setPubStepDetail] = useState('');

  const categories = ['Generator Repair', 'Computer Repair', 'Home Services', 'Air Conditioning', 'Phone Repair', 'Electrical Services'];

  const filteredTutorials = tutorials.filter(t => {
    if (activeFormat !== 'all' && t.type !== activeFormat) return false;
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = t.title.toLowerCase().includes(q);
      const matchesExcerpt = t.excerpt.toLowerCase().includes(q);
      const matchesAuthor = t.author.name.toLowerCase().includes(q);
      if (!matchesTitle && !matchesExcerpt && !matchesAuthor) return false;
    }
    return true;
  });

  const handleCreateTutorial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth('signup');
      return;
    }

    const newTutorial: Partial<Tutorial> = {
      title: pubTitle,
      type: pubType,
      category: pubCategory,
      read_time: pubType === 'video' ? '6 min watch' : '5 min read',
      excerpt: pubExcerpt,
      cover_image: '/src/assets/images/generator_solar_repair_1794306643540.jpg',
      content: pubExcerpt,
      steps: pubStepTitle ? [
        {
          step: 1,
          title: pubStepTitle,
          detail: pubStepDetail || 'Check the connections and verify voltage output.',
          tip: 'Always isolate the power source before probing.'
        }
      ] : undefined,
      published_at: 'Just now',
    };

    onPublishTutorial(newTutorial);
    setIsPublishModalOpen(false);
    setPubTitle('');
    setPubExcerpt('');
    setPubStepTitle('');
    setPubStepDetail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
            <span>FixNaija Academy & Community</span>
            <span aria-hidden="true">·</span>
            <span>Learn & Troubleshoot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Learn Practical Technical Skills from Nigeria's Best Hands
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Browse step-by-step diagnostic guides, troubleshooting checklists, and video masterclasses published by certified technicians.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={() => {
              if (!currentUser) {
                onOpenAuth('signup');
              } else {
                setIsPublishModalOpen(true);
              }
            }}
            className="w-full sm:w-auto px-5 py-3 bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Publish a Guide or Tutorial</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Format segmented control (Buttons allowed per frontend-design skill) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveFormat('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFormat === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setActiveFormat('video')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeFormat === 'video' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play className="w-3 h-3 text-[#FF6500]" />
              <span>Video Masterclasses</span>
            </button>
            <button
              onClick={() => setActiveFormat('guide')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeFormat === 'guide' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3 h-3 text-[#FF6500]" />
              <span>Step-by-Step Guides</span>
            </button>
            <button
              onClick={() => setActiveFormat('article')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFormat === 'article' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Articles
            </button>
          </div>

          {/* Search */}
          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials & guides..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white"
            />
          </div>

        </div>

        {/* Category Pills/Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-500 shrink-0">Topic:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg shrink-0 font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#0B192C] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Topics
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0B192C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Tutorials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tut) => (
          <div
            key={tut.id}
            onClick={() => onSelectTutorial(tut)}
            className="cursor-pointer group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#FF6500] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Cover */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={tut.cover_image}
                  alt={tut.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5">
                  {tut.type === 'video' ? <Play className="w-3 h-3 fill-white" /> : <BookOpen className="w-3 h-3" />}
                  <span className="capitalize">{tut.type}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-0.5 rounded text-[10px] font-mono tabular-nums">
                  {tut.read_time}
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="text-[#FF6500] font-bold uppercase tracking-wider">{tut.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{tut.published_at}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors leading-snug line-clamp-2">
                  {tut.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {tut.excerpt}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <img
                  src={tut.author.avatar_url}
                  alt={tut.author.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1 font-semibold text-slate-900">
                    <span>{tut.author.name}</span>
                    {tut.author.verified && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 font-medium">
                <span className="tabular-nums">{tut.likes_count} likes</span>
                <span className="tabular-nums">{tut.comments_count} comments</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Publish Modal for Technicians */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0B192C] p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#FF6500] uppercase tracking-wider">
                  Technician Creator Studio
                </span>
                <h3 className="text-lg font-bold">Publish Guide or Video Masterclass</h3>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTutorial} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Format Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['guide', 'video', 'article'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setPubType(fmt)}
                      className={`py-2 text-xs font-bold rounded-lg capitalize border ${
                        pubType === fmt
                          ? 'bg-[#0B192C] text-white border-[#0B192C]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={pubCategory}
                  onChange={(e) => setPubCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tutorial Title
                </label>
                <input
                  type="text"
                  required
                  value={pubTitle}
                  onChange={(e) => setPubTitle(e.target.value)}
                  placeholder="e.g. How to Safely Balance Lithium Inverter Batteries"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  required
                  rows={2}
                  value={pubExcerpt}
                  onChange={(e) => setPubExcerpt(e.target.value)}
                  placeholder="Explain what the reader or student will learn..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-900 block">
                  Add Step 1 Diagnostic Instruction
                </span>
                <input
                  type="text"
                  value={pubStepTitle}
                  onChange={(e) => setPubStepTitle(e.target.value)}
                  placeholder="Step 1 Headline (e.g. Check Resistance across terminals)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <textarea
                  rows={2}
                  value={pubStepDetail}
                  onChange={(e) => setPubStepDetail(e.target.value)}
                  placeholder="Step 1 Technical Details and Pro-Tip..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6500] hover:bg-[#e05900] text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Publish to FixNaija Learning Feed
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
