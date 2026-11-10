import React, { useState, useEffect } from 'react';
import { Navbar, AppTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FindTechniciansPage } from './pages/FindTechniciansPage';
import { LearnPage } from './pages/LearnPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TechnicianDashboard } from './pages/TechnicianDashboard';
import { MessagesPage } from './pages/MessagesPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { PasswordResetPage } from './pages/PasswordResetPage';
import { EmailVerificationPage } from './pages/EmailVerificationPage';

import { TechnicianProfileModal } from './components/TechnicianProfileModal';
import { BookServiceModal } from './components/BookServiceModal';
import { TutorialReaderModal } from './components/TutorialReaderModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';

import { 
  SERVICE_CATEGORIES, 
  INITIAL_TECHNICIANS, 
  INITIAL_TUTORIALS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_JOB_REQUESTS 
} from './data/mockData';
import { Technician, Tutorial, JobRequest, ChatMessage, Conversation, UserRole } from './types';
import { useAuth } from './context/AuthContext';
import { AlertTriangle, MailCheck } from 'lucide-react';

export default function App() {
  const { 
    firebaseUser, 
    profile, 
    isEmailVerified, 
    loading: authLoading, 
    logout 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [activeRole, setActiveRole] = useState<'hirer' | 'technician'>('hirer');

  // Modals
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [bookingTechnician, setBookingTechnician] = useState<Technician | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // App Content State
  const [categories] = useState(SERVICE_CATEGORIES);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [tutorials, setTutorials] = useState<Tutorial[]>(INITIAL_TUTORIALS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [jobRequests, setJobRequests] = useState<JobRequest[]>(INITIAL_JOB_REQUESTS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');

  // Search parameters pre-filled from Home
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('All States');
  const [lgaFilter, setLgaFilter] = useState('All LGAs');

  // Sync active role with profile
  useEffect(() => {
    if (profile?.account_roles) {
      if (profile.account_roles.includes('technician')) {
        setActiveRole('technician');
      } else {
        setActiveRole('hirer');
      }
    }
  }, [profile]);

  const handleToggleRole = () => {
    if (!profile) return;
    const userRoles = profile.account_roles || profile.roles || ['hirer'];
    if (userRoles.includes('hirer') && userRoles.includes('technician')) {
      setActiveRole(prev => (prev === 'hirer' ? 'technician' : 'hirer'));
    }
  };

  const handleSearchFromHome = (keyword: string, category: string, state: string, lga: string) => {
    setSearchFilter(keyword);
    setCategoryFilter(category);
    setStateFilter(state || 'All States');
    setLgaFilter(lga || 'All LGAs');
  };

  const handleSelectCategoryFromHome = (categoryName: string) => {
    setCategoryFilter(categoryName);
    setActiveTab('technicians');
  };

  const handleOpenBooking = (tech: Technician) => {
    setSelectedTechnician(null);
    if (!firebaseUser) {
      setActiveTab('login');
      return;
    }
    if (!isEmailVerified) {
      setActiveTab('verify-email');
      return;
    }
    setBookingTechnician(tech);
  };

  const handleMessageTech = (tech: Technician) => {
    setSelectedTechnician(null);
    if (!firebaseUser) {
      setActiveTab('login');
      return;
    }
    if (!isEmailVerified) {
      setActiveTab('verify-email');
      return;
    }

    let conv = conversations.find(c => c.participant_id === tech.id);
    if (!conv) {
      const newConv: Conversation = {
        id: 'conv-' + Date.now().toString(),
        participant_id: tech.id,
        participant_name: tech.full_name,
        participant_title: tech.title,
        participant_avatar: tech.avatar_url,
        category: tech.category,
        last_message: `Started inquiry regarding ${tech.category}`,
        last_message_time: 'Just now',
        unread_count: 0,
        is_online: true,
      };
      setConversations([newConv, ...conversations]);
      setActiveConversationId(newConv.id);
    } else {
      setActiveConversationId(conv.id);
    }
    setActiveTab('messages');
  };

  const handleSendMessage = (conversationId: string, content: string, attachmentUrl?: string) => {
    const newMessage: ChatMessage = {
      id: 'msg-' + Date.now().toString(),
      conversation_id: conversationId,
      sender_id: profile?.id || firebaseUser?.uid || 'user-current',
      sender_name: profile?.full_name || 'You',
      recipient_id: 'tech',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      attachment_url: attachmentUrl,
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? { ...c, last_message: content || 'Photo attachment sent', last_message_time: 'Just now' }
          : c
      )
    );
  };

  const handleBookingSubmit = (newJob: JobRequest) => {
    setJobRequests([newJob, ...jobRequests]);
  };

  const handleUpdateJobStatus = (jobId: string, newStatus: JobRequest['status']) => {
    setJobRequests(prev =>
      prev.map(j => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
  };

  const handlePublishTutorial = (newTut: Partial<Tutorial>) => {
    const completeTutorial: Tutorial = {
      id: 'tut-' + Date.now().toString(),
      title: newTut.title || 'Practical Troubleshooting Guide',
      type: newTut.type || 'guide',
      category: newTut.category || 'Generator Repair',
      read_time: newTut.read_time || '5 min read',
      author: {
        id: profile?.id || firebaseUser?.uid || 'user-current',
        name: profile?.full_name || 'Verified Technician',
        title: 'FixNaija Specialist',
        avatar_url: profile?.avatar_url || '/src/assets/images/technician_avatar_emeka_1794306643103.jpg',
        verified: true,
      },
      likes_count: 1,
      comments_count: 0,
      views_count: 1,
      cover_image: newTut.cover_image || '/src/assets/images/hero_technician_repair_1794306643365.jpg',
      excerpt: newTut.excerpt || 'Technical guide on troubleshooting equipment faults.',
      content: newTut.content,
      steps: newTut.steps,
      published_at: 'Just now',
    };

    setTutorials([completeTutorial, ...tutorials]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#FF6500] selection:text-white">
      
      {/* Email Verification Sticky Alert Banner */}
      {firebaseUser && !isEmailVerified && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1">
            <AlertTriangle className="w-4 h-4 shrink-0 text-slate-950" />
            <span>
              Email verification pending for <strong>{firebaseUser.email}</strong>. Please confirm your email to activate protected features.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('verify-email')}
            className="px-3 py-1 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shrink-0 ml-4 flex items-center gap-1"
          >
            <MailCheck className="w-3.5 h-3.5" />
            <span>Verify Now</span>
          </button>
        </div>
      )}

      {/* 1. TOP BAR NAVIGATION CONTRACT */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={profile}
        onOpenAuth={(mode) => setActiveTab(mode === 'login' ? 'login' : 'register')}
        onLogout={async () => {
          await logout();
          setActiveTab('home');
        }}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
        activeRole={activeRole}
        onToggleRole={handleToggleRole}
        unreadCount={1}
        isEmailVerified={isEmailVerified}
      />

      {/* 2. MAIN VIEWPORT */}
      <main className="flex-1">
        
        {/* HOMEPAGE */}
        {activeTab === 'home' && (
          <HomePage
            categories={categories}
            technicians={technicians}
            tutorials={tutorials}
            onSelectCategory={handleSelectCategoryFromHome}
            onSelectTechnician={(tech) => setSelectedTechnician(tech)}
            onSelectTutorial={(tut) => setSelectedTutorial(tut)}
            onNavigate={setActiveTab}
            onOpenAuth={(mode) => setActiveTab(mode === 'login' ? 'login' : 'register')}
            onSearch={handleSearchFromHome}
          />
        )}

        {/* FIND TECHNICIANS */}
        {activeTab === 'technicians' && (
          <FindTechniciansPage
            technicians={technicians}
            categories={categories}
            onSelectTechnician={(tech) => setSelectedTechnician(tech)}
            onBookService={handleOpenBooking}
            onMessageTech={handleMessageTech}
            initialCategory={categoryFilter}
            initialSearch={searchFilter}
            initialState={stateFilter}
            initialLga={lgaFilter}
          />
        )}

        {/* LEARN & COMMUNITY */}
        {activeTab === 'learn' && (
          <LearnPage
            tutorials={tutorials}
            onSelectTutorial={(tut) => setSelectedTutorial(tut)}
            currentUser={profile}
            onOpenAuth={(mode) => setActiveTab(mode === 'login' ? 'login' : 'register')}
            onPublishTutorial={handlePublishTutorial}
          />
        )}

        {/* HOW IT WORKS */}
        {activeTab === 'how-it-works' && (
          <HowItWorksPage
            onOpenAuth={(mode) => setActiveTab(mode === 'login' ? 'login' : 'register')}
            onFindTechnicians={() => setActiveTab('technicians')}
          />
        )}

        {/* REGISTRATION PAGE */}
        {activeTab === 'register' && (
          <RegisterPage
            onNavigateToLogin={() => setActiveTab('login')}
            onRegistrationComplete={() => setActiveTab('verify-email')}
          />
        )}

        {/* LOGIN PAGE */}
        {activeTab === 'login' && (
          <LoginPage
            onNavigateToRegister={() => setActiveTab('register')}
            onNavigateToResetPassword={() => setActiveTab('reset-password')}
            onLoginSuccess={() => {
              if (isEmailVerified) {
                setActiveTab('dashboard');
              } else {
                setActiveTab('verify-email');
              }
            }}
          />
        )}

        {/* PASSWORD RESET PAGE */}
        {activeTab === 'reset-password' && (
          <PasswordResetPage
            onNavigateToLogin={() => setActiveTab('login')}
          />
        )}

        {/* EMAIL VERIFICATION PAGE */}
        {activeTab === 'verify-email' && (
          <EmailVerificationPage
            onVerificationComplete={() => setActiveTab('dashboard')}
          />
        )}

        {/* PROTECTED TECHNICIAN / HIRER DASHBOARD */}
        {activeTab === 'dashboard' && (
          !firebaseUser ? (
            <LoginPage
              onNavigateToRegister={() => setActiveTab('register')}
              onNavigateToResetPassword={() => setActiveTab('reset-password')}
              onLoginSuccess={() => setActiveTab('dashboard')}
            />
          ) : !isEmailVerified ? (
            <EmailVerificationPage
              onVerificationComplete={() => setActiveTab('dashboard')}
            />
          ) : profile ? (
            <TechnicianDashboard
              currentUser={profile}
              jobRequests={jobRequests}
              onUpdateJobStatus={handleUpdateJobStatus}
              onLogout={async () => {
                await logout();
                setActiveTab('home');
              }}
              onNavigateToMessages={() => setActiveTab('messages')}
              onNavigateToLearn={() => setActiveTab('learn')}
              activeRole={activeRole}
              onToggleRole={handleToggleRole}
            />
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
              <span className="w-6 h-6 border-2 border-[#FF6500] border-t-transparent rounded-full animate-spin inline-block" />
              <p className="text-xs text-slate-500">Syncing database profile with verified Firebase token...</p>
            </div>
          )
        )}

        {/* PROTECTED PRIVATE MESSAGES */}
        {activeTab === 'messages' && (
          !firebaseUser ? (
            <LoginPage
              onNavigateToRegister={() => setActiveTab('register')}
              onNavigateToResetPassword={() => setActiveTab('reset-password')}
              onLoginSuccess={() => setActiveTab('messages')}
            />
          ) : !isEmailVerified ? (
            <EmailVerificationPage
              onVerificationComplete={() => setActiveTab('messages')}
            />
          ) : (
            <MessagesPage
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={setActiveConversationId}
              messages={messages}
              onSendMessage={handleSendMessage}
              currentUser={profile}
              onBookTechnician={() => {
                const activeConv = conversations.find(c => c.id === activeConversationId);
                const tech = technicians.find(t => t.id === activeConv?.participant_id) || technicians[0];
                handleOpenBooking(tech);
              }}
            />
          )
        )}
      </main>

      {/* 3. PLATFORM FOOTER */}
      <Footer
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenAuth={(mode) => setActiveTab(mode === 'login' ? 'login' : 'register')}
      />

      {/* 4. MODALS & DRAWERS */}
      <TechnicianProfileModal
        technician={selectedTechnician}
        onClose={() => setSelectedTechnician(null)}
        onBookService={handleOpenBooking}
        onMessageTech={handleMessageTech}
      />

      <BookServiceModal
        technician={bookingTechnician}
        currentUser={profile}
        onClose={() => setBookingTechnician(null)}
        onSubmitBooking={handleBookingSubmit}
        onPromptAuth={() => setActiveTab('login')}
      />

      <TutorialReaderModal
        tutorial={selectedTutorial}
        currentUser={profile}
        onClose={() => setSelectedTutorial(null)}
        onPromptAuth={() => setActiveTab('login')}
      />

      <SupabaseConfigModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />

    </div>
  );
}
