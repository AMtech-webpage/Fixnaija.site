import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  Phone, 
  Briefcase, 
  Clock, 
  Award,
  ExternalLink
} from 'lucide-react';
import { Technician } from '../types';

interface TechnicianProfileModalProps {
  technician: Technician | null;
  onClose: () => void;
  onBookService: (tech: Technician) => void;
  onMessageTech: (tech: Technician) => void;
}

export const TechnicianProfileModal: React.FC<TechnicianProfileModalProps> = ({
  technician,
  onClose,
  onBookService,
  onMessageTech,
}) => {
  if (!technician) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header with cover banner */}
        <div className="relative bg-[#0B192C] text-white p-6 pb-20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6500] uppercase tracking-wider">
            <span>FixNaija Verified Professional</span>
            <span aria-hidden="true">·</span>
            <span>ID: {technician.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight text-white">
            {technician.full_name}
          </h2>
          <p className="text-sm text-slate-300 mt-0.5">
            {technician.title}
          </p>
        </div>

        {/* Floating Avatar & Fast Stats Strip */}
        <div className="relative px-6 -mt-14 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src={technician.avatar_url}
                alt={technician.full_name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-100"
              />
              {technician.verified && (
                <div 
                  title="FixNaija Verified Pro (NIN & Trade Test Validated)"
                  className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="pb-1">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="tabular-nums">{technician.rating.toFixed(2)}</span>
                <span className="text-xs font-normal text-slate-500">
                  ({technician.reviews_count} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{technician.city}, {technician.lga}, {technician.state}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onMessageTech(technician)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#0B192C]" />
              <span>Message</span>
            </button>
            <button
              onClick={() => onBookService(technician)}
              className="px-5 py-2.5 rounded-xl bg-[#FF6500] hover:bg-[#e05900] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service</span>
            </button>
          </div>
        </div>

        {/* Content Tabs / Sections */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Completed Jobs</p>
              <p className="text-base font-extrabold text-[#0B192C] tabular-nums mt-0.5">
                {technician.jobs_completed}+
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Standard Diagnostic</p>
              <p className="text-base font-extrabold text-[#0B192C] tabular-nums mt-0.5">
                ₦{technician.hourly_rate_naira.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Availability</p>
              <p className="text-base font-extrabold text-emerald-600 mt-0.5">
                {technician.available ? 'Available Now' : 'Book in Advance'}
              </p>
            </div>
          </div>

          {/* About Bio */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Professional Biography
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {technician.bio}
            </p>
          </div>

          {/* Verification Credentials */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Verified Credentials & Compliance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>National Identification Number (NIN) Verified</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-900">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Federal Trade Test Certification Verified</span>
              </div>
            </div>
          </div>

          {/* Skills Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Key Technical Proficiencies
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-700">
              {technician.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Services & Pricing Menu */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Standard Service Menu & Pricing
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {technician.services.map((srv) => (
                <div key={srv.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{srv.name}</p>
                    {srv.duration_estimate && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Estimated time: {srv.duration_estimate}</span>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#0B192C] tabular-nums">
                      ₦{srv.price_naira.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onBookService(technician)}
                      className="block text-[11px] font-semibold text-[#FF6500] hover:underline mt-0.5"
                    >
                      Book this
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact notice */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Phone className="w-4 h-4 text-[#FF6500]" />
              <span>Direct Hotline: <strong className="text-slate-900">{technician.phone}</strong></span>
            </div>
            <span className="text-[11px] text-slate-400">Escrow backed guarantee</span>
          </div>

        </div>

      </div>
    </div>
  );
};
