import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  ShieldCheck, 
  Key, 
  Flame, 
  Server, 
  Check, 
  Copy, 
  ExternalLink 
} from 'lucide-react';
import { isFirebaseConfigured } from '../lib/firebase';
import { isSupabaseConfigured } from '../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/auth/status')
        .then(res => res.json())
        .then(data => setServerStatus(data))
        .catch(() => setServerStatus(null));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const firebaseReady = isFirebaseConfigured() || serverStatus?.firebase?.isConfigured;
  const supabaseReady = isSupabaseConfigured() || serverStatus?.supabase?.isConfigured;

  const copyMigrationPath = () => {
    navigator.clipboard?.writeText('/supabase/migrations/20261110_firebase_auth_profiles.sql');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6500]">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold">FixNaija Architecture Overview</h3>
              <p className="text-xs text-slate-300">Firebase Authentication + Supabase PostgreSQL & Storage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Dual Engine Status Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Firebase Authentication</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900">
                  Exclusive Auth
                </span>
              </div>
              <p className="text-[11px] text-amber-800">
                Email/Password, Email Verification, Password Reset, Google Sign-in & Session persistence.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Supabase PostgreSQL</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                  Primary DB
                </span>
              </div>
              <p className="text-[11px] text-emerald-800">
                User Profiles, Technicians, Services, Tutorials, Jobs, Messages & Storage.
              </p>
            </div>
          </div>

          {/* Security Flow Explanation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Zero-Trust Identity & Token Verification Pipeline
            </h4>
            
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <span className="w-5 h-5 rounded-md bg-[#0B192C] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-slate-900">Firebase Client Authentication</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">User registers or logs in via Firebase SDK, obtaining a cryptographically signed Firebase ID token.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <span className="w-5 h-5 rounded-md bg-[#FF6500] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-slate-900">Server-Side Token Verification (`server.ts`)</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">Server extracts and verifies the Firebase ID token claims. Client-supplied UIDs are discarded. Verified UID is enforced.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-slate-900">Supabase Row Level Security (RLS)</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">Server links the profile to `firebase_uid`. Policies enforce that users can only read/write records matching their verified identity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Migration File Pointer */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">
                SQL Migration: <code className="text-[#FF6500]">/supabase/migrations/20261110_firebase_auth_profiles.sql</code>
              </span>
              <button
                onClick={copyMigrationPath}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Path'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Run this in your Supabase project to generate the `profiles` table with `firebase_uid`, indexes, and RLS functions.
            </p>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#0B192C] text-white text-xs font-bold rounded-xl hover:bg-[#071322] transition-colors"
            >
              Close Overview
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
