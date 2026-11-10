import React, { useState } from 'react';
import { 
  Wrench, 
  Menu, 
  X, 
  MessageSquare, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  Database,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';

export type AppTab = 
  | 'home' 
  | 'technicians' 
  | 'learn' 
  | 'how-it-works' 
  | 'dashboard' 
  | 'messages' 
  | 'login' 
  | 'register' 
  | 'reset-password' 
  | 'verify-email';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (initialMode?: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenSupabaseModal: () => void;
  activeRole: 'hirer' | 'technician';
  onToggleRole: () => void;
  unreadCount?: number;
  isEmailVerified?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenSupabaseModal,
  activeRole,
  onToggleRole,
  unreadCount = 1,
  isEmailVerified = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (tab: AppTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B192C] flex items-center justify-center text-white shadow-sm group-hover:bg-[#071322] transition-colors relative">
              <Wrench className="w-5 h-5 text-[#FF6500]" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FF6500] border-2 border-white flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#0B192C]">
                  Fix<span className="text-[#FF6500]">Naija</span>
                </span>
              </div>
              <span className="hidden sm:block text-[11px] font-medium text-slate-500 tracking-wide">
                Nigeria's Skills & Repair Marketplace
              </span>
            </div>
          </button>

          {/* Zone 2: Primary Nav Links (Single line, text with subtle underline hover) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0B192C] ${
                activeTab === 'home' ? 'text-[#0B192C] font-semibold border-b-2 border-[#FF6500] pb-1' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('technicians')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0B192C] ${
                activeTab === 'technicians' ? 'text-[#0B192C] font-semibold border-b-2 border-[#FF6500] pb-1' : ''
              }`}
            >
              Find Technicians
            </button>
            <button
              onClick={() => handleNavClick('learn')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0B192C] ${
                activeTab === 'learn' ? 'text-[#0B192C] font-semibold border-b-2 border-[#FF6500] pb-1' : ''
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0B192C] ${
                activeTab === 'how-it-works' ? 'text-[#0B192C] font-semibold border-b-2 border-[#FF6500] pb-1' : ''
              }`}
            >
              How It Works
            </button>
          </nav>

          {/* Zone 3: Actions & Profile State */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            
            {/* Architecture status pill/button */}
            <button
              onClick={onOpenSupabaseModal}
              title="Inspect Firebase Auth + Supabase Architecture & Schema"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Database className="w-3.5 h-3.5 text-[#FF6500]" />
              <span>Firebase Auth + Supabase DB</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* Email Verification Required Alert Pill */}
                {!isEmailVerified && (
                  <button
                    onClick={() => handleNavClick('verify-email')}
                    className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-300 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 animate-pulse"
                    title="Email verification pending in Firebase Auth"
                  >
                    Verify Email
                  </button>
                )}

                {/* Dual-role toggle */}
                {currentUser.roles && currentUser.roles.length > 1 && (
                  <button
                    onClick={onToggleRole}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                    title="Switch active dashboard viewpoint"
                  >
                    <span className="text-slate-400">Mode:</span>
                    <span className="text-[#FF6500] uppercase font-bold tracking-wider">
                      {activeRole}
                    </span>
                  </button>
                )}

                {/* Messages button with badge */}
                <button
                  onClick={() => handleNavClick('messages')}
                  className="relative p-2 text-slate-600 hover:text-[#0B192C] hover:bg-slate-100 rounded-lg transition-colors"
                  title="Private Messages"
                >
                  <MessageSquare className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF6500] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Dashboard button */}
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === 'dashboard'
                      ? 'bg-[#0B192C] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                {/* Profile dropdown trigger */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-xs font-bold">
                      {currentUser.full_name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-xs font-medium text-slate-700 max-w-[100px] truncate">
                      {currentUser.full_name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.full_name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-[#FF6500]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{(currentUser.roles || ['hirer']).join(' & ')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Technician Workspace
                      </button>
                      <button
                        onClick={() => handleNavClick('messages')}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Private Messages
                      </button>
                      <div className="border-t border-slate-100 my-1" />
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2 text-sm font-semibold text-[#0B192C] hover:text-[#FF6500] transition-colors whitespace-nowrap shrink-0"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#FF6500] hover:bg-[#e05900] active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            {currentUser && (
              <button
                onClick={() => handleNavClick('messages')}
                className="relative p-2 text-slate-600"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#FF6500] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 text-left text-sm font-medium rounded-lg ${
                activeTab === 'home' ? 'bg-[#0B192C] text-white' : 'text-slate-700 bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('technicians')}
              className={`p-2.5 text-left text-sm font-medium rounded-lg ${
                activeTab === 'technicians' ? 'bg-[#0B192C] text-white' : 'text-slate-700 bg-slate-50'
              }`}
            >
              Find Technicians
            </button>
            <button
              onClick={() => handleNavClick('learn')}
              className={`p-2.5 text-left text-sm font-medium rounded-lg ${
                activeTab === 'learn' ? 'bg-[#0B192C] text-white' : 'text-slate-700 bg-slate-50'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`p-2.5 text-left text-sm font-medium rounded-lg ${
                activeTab === 'how-it-works' ? 'bg-[#0B192C] text-white' : 'text-slate-700 bg-slate-50'
              }`}
            >
              How It Works
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSupabaseModal();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4 text-[#FF6500]" />
              <span>Supabase Schema & Settings</span>
            </button>

            {currentUser ? (
              <div className="space-y-2 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{currentUser.full_name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.city}, {currentUser.state}</p>
                  </div>
                  {currentUser.roles && currentUser.roles.length > 1 && (
                    <button
                      onClick={onToggleRole}
                      className="px-2.5 py-1 text-[11px] font-bold rounded bg-white border border-slate-200 text-[#FF6500]"
                    >
                      {activeRole.toUpperCase()}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="py-2.5 px-4 text-xs font-semibold bg-[#0B192C] text-white rounded-xl text-center"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('messages')}
                    className="py-2.5 px-4 text-xs font-semibold bg-slate-100 text-slate-800 rounded-xl text-center"
                  >
                    Messages ({unreadCount})
                  </button>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-xs font-semibold text-rose-600 text-center"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-3 px-4 text-sm font-semibold text-[#0B192C] bg-slate-100 rounded-xl text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="py-3 px-4 text-sm font-semibold text-white bg-[#FF6500] rounded-xl text-center"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
