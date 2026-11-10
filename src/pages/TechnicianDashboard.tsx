import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Wrench, 
  BookOpen, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Settings, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  LogOut, 
  DollarSign, 
  FileText, 
  Upload, 
  ChevronRight, 
  TrendingUp,
  Eye,
  Check,
  X
} from 'lucide-react';
import { UserProfile, JobRequest, ServiceItem, Tutorial } from '../types';

interface TechnicianDashboardProps {
  currentUser: UserProfile;
  jobRequests: JobRequest[];
  onUpdateJobStatus: (jobId: string, newStatus: JobRequest['status']) => void;
  onLogout: () => void;
  onNavigateToMessages: () => void;
  onNavigateToLearn: () => void;
  activeRole: 'hirer' | 'technician';
  onToggleRole: () => void;
}

export const TechnicianDashboard: React.FC<TechnicianDashboardProps> = ({
  currentUser,
  jobRequests,
  onUpdateJobStatus,
  onLogout,
  onNavigateToMessages,
  onNavigateToLearn,
  activeRole,
  onToggleRole,
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'services' | 'tutorials' | 'verification' | 'settings'>('jobs');
  
  // Custom Services state
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 'srv-1', name: 'Comprehensive System Diagnostic', price_naira: 8000, duration_estimate: '1.5 hrs' },
    { id: 'srv-2', name: 'Standard Tune-up & Component Replacement', price_naira: 14000, duration_estimate: '2.5 hrs' },
    { id: 'srv-3', name: 'Emergency On-Site Fault Recovery', price_naira: 25000, duration_estimate: '3 hrs' }
  ]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState<number>(10000);
  const [newServiceDuration, setNewServiceDuration] = useState('2 hrs');
  const [showAddService, setShowAddService] = useState(false);

  // Verification document state
  const [ninDocUploaded, setNinDocUploaded] = useState(true);
  const [tradeDocUploaded, setTradeDocUploaded] = useState(true);
  const [cacDocUploaded, setCacDocUploaded] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const item: ServiceItem = {
      id: 'srv-' + Date.now().toString(),
      name: newServiceName.trim(),
      price_naira: Number(newServicePrice) || 8000,
      duration_estimate: newServiceDuration.trim() || '2 hrs',
    };

    setServices([...services, item]);
    setNewServiceName('');
    setShowAddService(false);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleSimulateUpload = (type: 'cac' | 'trade') => {
    if (type === 'cac') setCacDocUploaded(true);
    if (type === 'trade') setTradeDocUploaded(true);
    setUploadNotice('Document successfully uploaded for verification review by FixNaija Compliance Team.');
    setTimeout(() => setUploadNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard Top Header Bar */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white text-xl font-bold border border-white/15">
            {currentUser.full_name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {currentUser.full_name}
              </h1>
              <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {currentUser.city}, {currentUser.lga}, {currentUser.state} · Joined {new Date(currentUser.created_at).toLocaleDateString()}
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="text-[#FF6500] font-bold">
                Roles: {(currentUser.account_roles || currentUser.roles || ['hirer']).join(' & ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Role Switcher */}
        <div className="flex items-center gap-3 relative z-10">
          {(currentUser.account_roles || currentUser.roles || []).length > 1 && (
            <button
              onClick={onToggleRole}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>Viewing Mode:</span>
              <span className="text-[#FF6500] uppercase font-bold">{activeRole}</span>
            </button>
          )}

          <button
            onClick={onNavigateToMessages}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#FF6500]" />
            <span className="hidden sm:inline">Messages</span>
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

      {/* KPI Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Job Inquiries</span>
          <p className="text-2xl font-extrabold text-[#0B192C] tabular-nums">
            {jobRequests.filter(j => j.status === 'pending').length}
          </p>
          <span className="text-[11px] text-[#FF6500] font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Needs response</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Completed Repairs</span>
          <p className="text-2xl font-extrabold text-[#0B192C] tabular-nums">
            {jobRequests.filter(j => j.status === 'completed').length + 18}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Escrow Disbursed</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Total Revenue Earned</span>
          <p className="text-2xl font-extrabold text-[#FF6500] tabular-nums">
            ₦385,000
          </p>
          <span className="text-[11px] text-slate-400 font-medium">
            Direct to Nigerian Bank
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Customer Rating</span>
          <p className="text-2xl font-extrabold text-[#0B192C] tabular-nums flex items-center gap-1">
            <span>4.92</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
          </p>
          <span className="text-[11px] text-slate-400 font-medium">
            Based on 24 verified reviews
          </span>
        </div>

      </div>

      {/* Main Workspace Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs overflow-x-auto text-xs font-bold text-slate-600">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'jobs' ? 'bg-[#0B192C] text-white shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Requests ({jobRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'services' ? 'bg-[#0B192C] text-white shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Services & Rates ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'verification' ? 'bg-[#0B192C] text-white shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verification & Compliance</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'settings' ? 'bg-[#0B192C] text-white shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Profile & Bank Account</span>
        </button>
      </div>

      {/* Tab Panels */}
      
      {/* 1. JOB REQUESTS TAB */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Incoming Client Requests
            </h3>
            <span className="text-xs text-slate-500">
              Payments protected by FixNaija Escrow
            </span>
          </div>

          <div className="space-y-3">
            {jobRequests.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-[#0B192C]">{job.hirer_name}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{job.address}, {job.lga}, {job.state}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">{job.created_at}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {job.service_title}
                  </h4>
                  
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs pt-1">
                    <span className="font-semibold text-slate-700">
                      Budget: <strong className="text-[#0B192C] tabular-nums">₦{job.budget_naira.toLocaleString()}</strong>
                    </span>
                    <span className="text-slate-500">
                      Preferred Date: <strong>{job.preferred_date}</strong>
                    </span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {job.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onUpdateJobStatus(job.id, 'accepted')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        Accept Job
                      </button>
                      <button
                        onClick={() => onUpdateJobStatus(job.id, 'declined')}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {job.status === 'accepted' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        Accepted
                      </span>
                      <button
                        onClick={() => onUpdateJobStatus(job.id, 'completed')}
                        className="px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#FF6500] text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        Mark Completed
                      </button>
                    </div>
                  )}

                  {job.status === 'completed' && (
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                      Completed & Paid
                    </span>
                  )}

                  {job.status === 'declined' && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg">
                      Declined
                    </span>
                  )}

                  <button
                    onClick={onNavigateToMessages}
                    className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600"
                    title="Open Chat"
                  >
                    <MessageSquare className="w-4 h-4 text-[#0B192C]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SERVICES & RATES TAB */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Service Catalog & Pricing (₦ Naira)
              </h3>
              <p className="text-xs text-slate-500">
                Clients see these service items when viewing your profile or booking on FixNaija.
              </p>
            </div>

            <button
              onClick={() => setShowAddService(!showAddService)}
              className="px-4 py-2 bg-[#FF6500] hover:bg-[#e05900] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          {showAddService && (
            <form onSubmit={handleAddService} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase">New Service Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="e.g. Inverter Battery Desulfation"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Price (₦ Naira)</label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    placeholder="e.g. 2 hrs or 24 hrs"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddService(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0B192C] text-white text-xs font-bold rounded-lg"
                >
                  Save Service
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{srv.name}</h4>
                  <p className="text-xs text-slate-500">Duration: {srv.duration_estimate}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-extrabold text-[#0B192C] tabular-nums">
                    ₦{srv.price_naira.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="text-xs text-slate-400 hover:text-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. VERIFICATION & COMPLIANCE TAB */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              FixNaija Trust & Verification Status
            </h3>
            <p className="text-xs text-slate-500">
              Verified technicians receive up to 5x more customer bookings and the official FixNaija green badge.
            </p>
          </div>

          {uploadNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
              {uploadNotice}
            </div>
          )}

          <div className="space-y-4">
            
            {/* NIN Verification */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    National Identification Number (NIN)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Identity verified against Nigerian NIMC database.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
                Verified
              </span>
            </div>

            {/* Federal Trade Test */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Federal Ministry of Labour Trade Test (Grade 1/2/3)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Official technical competence certificate.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
                Verified Pro
              </span>
            </div>

            {/* CAC Registered Business (Optional) */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Corporate Affairs Commission (CAC) Business Registration
                  </h4>
                  <p className="text-xs text-slate-500">
                    Optional: For registered corporate engineering enterprises.
                  </p>
                </div>
              </div>
              {cacDocUploaded ? (
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-md">
                  Under Review
                </span>
              ) : (
                <button
                  onClick={() => handleSimulateUpload('cac')}
                  className="px-3.5 py-1.5 bg-[#0B192C] text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                >
                  Upload CAC Slip
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 4. SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-xl">
          <h3 className="text-base font-bold text-slate-900">
            Account & Direct Bank Settlement Settings
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                disabled
                value={currentUser.full_name}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="font-bold text-slate-900 block">Nigerian Bank Account (For Escrow Payouts)</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1">Bank Name</label>
                  <select className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-medium">
                    <option>Guaranty Trust Bank (GTBank)</option>
                    <option>Access Bank</option>
                    <option>Zenith Bank</option>
                    <option>First Bank of Nigeria</option>
                    <option>Kuda Microfinance Bank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Account Number (NUBAN)</label>
                  <input
                    type="text"
                    defaultValue="0148920192"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="px-4 py-2 bg-[#0B192C] text-white text-xs font-bold rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
