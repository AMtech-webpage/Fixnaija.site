import React from 'react';
import { Wrench, ShieldCheck, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'technicians' | 'learn' | 'how-it-works') => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <footer className="bg-[#0B192C] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10">
                <Wrench className="w-5 h-5 text-[#FF6500]" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Fix<span className="text-[#FF6500]">Naija</span>
                </span>
                <span className="block text-[11px] text-slate-400 font-medium tracking-wider uppercase">
                  fixnaija.site
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              FixNaija is Nigeria's premier digital platform connecting verified technicians with people and businesses who need urgent repairs, installations, and maintenance. We also empower artisans through practical technical education.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Technicians
              </span>
              <span aria-hidden="true">·</span>
              <span>36 Nigerian States</span>
              <span aria-hidden="true">·</span>
              <span>Secure Escrow Protection</span>
            </div>
          </div>

          {/* Column 3: Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('technicians')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Find Verified Technicians
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('learn')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Learning Community & Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('how-it-works')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  How FixNaija Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAuth('signup')} 
                  className="hover:text-[#FF6500] transition-colors text-[#FF6500] font-medium"
                >
                  Become a Technician
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Popular Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Service Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('technicians')} className="hover:text-white transition-colors">Generator & Solar Repair</button></li>
              <li><button onClick={() => onNavigate('technicians')} className="hover:text-white transition-colors">Mac & Computer Board Repair</button></li>
              <li><button onClick={() => onNavigate('technicians')} className="hover:text-white transition-colors">iPhone & Android Hardware</button></li>
              <li><button onClick={() => onNavigate('technicians')} className="hover:text-white transition-colors">Air Conditioning & HVAC</button></li>
              <li><button onClick={() => onNavigate('technicians')} className="hover:text-white transition-colors">Electrical & DB Wiring</button></li>
              <li><button onClick={() => onNavigate('technicians')} className="hover:text-white transition-colors">Plumbing & Submersible Pumps</button></li>
            </ul>
          </div>

          {/* Column 5: Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              HQ & Support
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF6500] shrink-0 mt-0.5" />
                <span>FixNaija Hub, 42 Montgomery Road, Yaba, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6500] shrink-0" />
                <span>+234 (01) 888 3490 / +234 800-FIX-NAIJA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6500] shrink-0" />
                <span>support@fixnaija.site</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#FF6500] shrink-0" />
                <span>fixnaija.site</span>
              </li>
            </ul>

            <div className="pt-4 flex items-center gap-3">
              <a href="#twitter" aria-label="X / Twitter" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF6500] hover:text-white flex items-center justify-center transition-colors text-slate-300">
                <span className="text-xs font-bold">X</span>
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF6500] hover:text-white flex items-center justify-center transition-colors text-slate-300">
                <span className="text-xs font-bold">IG</span>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF6500] hover:text-white flex items-center justify-center transition-colors text-slate-300">
                <span className="text-xs font-bold">IN</span>
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF6500] hover:text-white flex items-center justify-center transition-colors text-slate-300">
                <span className="text-xs font-bold">YT</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal notices */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FixNaija Technologies Ltd. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>RC: 1984201 (CAC Nigeria)</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <button className="hover:text-slate-300 transition-colors">Technician Code of Conduct</button>
            <button className="hover:text-slate-300 transition-colors">Security & Trust</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
