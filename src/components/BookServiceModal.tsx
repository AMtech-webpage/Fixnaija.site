import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Technician, JobRequest, UserProfile } from '../types';
import { NIGERIAN_STATES } from '../data/mockData';

interface BookServiceModalProps {
  technician: Technician | null;
  currentUser: UserProfile | null;
  onClose: () => void;
  onSubmitBooking: (job: JobRequest) => void;
  onPromptAuth: () => void;
}

export const BookServiceModal: React.FC<BookServiceModalProps> = ({
  technician,
  currentUser,
  onClose,
  onSubmitBooking,
  onPromptAuth,
}) => {
  const [serviceTitle, setServiceTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedState, setSelectedState] = useState(technician?.state || 'Lagos');
  const [selectedLga, setSelectedLga] = useState(technician?.lga || 'Ikeja');
  const [address, setAddress] = useState('');
  const [budgetNaira, setBudgetNaira] = useState<number>(technician?.hourly_rate_naira || 10000);
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!technician) return null;

  const currentLgas = NIGERIAN_STATES.find(s => s.state === selectedState)?.lgas || [];

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const found = NIGERIAN_STATES.find(s => s.state === stateName);
    if (found && found.lgas.length > 0) {
      setSelectedLga(found.lgas[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      onPromptAuth();
      return;
    }

    setIsSubmitting(true);

    const newJob: JobRequest = {
      id: 'job-' + Date.now().toString(),
      hirer_id: currentUser.id,
      hirer_name: currentUser.full_name,
      hirer_phone: currentUser.phone || '+234 800 000 0000',
      technician_id: technician.id,
      technician_name: technician.full_name,
      category: technician.category,
      service_title: serviceTitle.trim() || `${technician.category} Inspection`,
      description: description.trim(),
      state: selectedState,
      lga: selectedLga,
      address: address.trim() || `${selectedLga}, ${selectedState}`,
      budget_naira: Number(budgetNaira) || 10000,
      status: 'pending',
      created_at: 'Just now',
      preferred_date: preferredDate,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      onSubmitBooking(newJob);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#0D1829] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150 transition-colors">
        
        {/* Header */}
        <div className="bg-[#0B192C] p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#FF6500] uppercase tracking-wider">
              FixNaija Job Request
            </span>
            <h3 className="text-lg font-bold">Request Service from {technician.full_name}</h3>
            <p className="text-xs text-slate-300">{technician.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Job Request Dispatched!</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              {technician.full_name} has received your job notification in their FixNaija dashboard and will respond promptly via private message.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Quick Service Preset */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select Service or Describe Custom Problem
              </label>
              <select
                onChange={(e) => {
                  const srv = technician.services.find(s => s.name === e.target.value);
                  if (srv) {
                    setServiceTitle(srv.name);
                    setBudgetNaira(srv.price_naira);
                  } else {
                    setServiceTitle(e.target.value);
                  }
                }}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 transition-all cursor-pointer"
              >
                <option value="" className="dark:bg-slate-800">-- Choose Standard Service or Custom --</option>
                {technician.services.map((s) => (
                  <option key={s.id} value={s.name} className="dark:bg-slate-800">
                    {s.name} (₦{s.price_naira.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Service title if custom */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Service Task Title
              </label>
              <input
                type="text"
                required
                value={serviceTitle}
                onChange={(e) => setServiceTitle(e.target.value)}
                placeholder="e.g. Generator AVR Replacement or Inverter Inspection"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Fault Description & Symptoms
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what is happening (e.g. generator starts and stops, spark plug is black, water leaking from pipe, etc.)"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 transition-all resize-none"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
                >
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s.state} value={s.state} className="dark:bg-slate-800">
                      {s.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  LGA
                </label>
                <select
                  value={selectedLga}
                  onChange={(e) => setSelectedLga(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
                >
                  {currentLgas.map((lga) => (
                    <option key={lga} value={lga} className="dark:bg-slate-800">
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Street Address / Landmark
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 25 Toyin Street, Ikeja, Lagos"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
            </div>

            {/* Budget & Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Budget (₦ Naira)
                </label>
                <input
                  type="number"
                  min="2000"
                  step="500"
                  required
                  value={budgetNaira}
                  onChange={(e) => setBudgetNaira(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Timeframe
                </label>
                <input
                  type="text"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  placeholder="e.g. Tomorrow 2pm"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#FF6500] hover:bg-[#e05900] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Send Job Request to Technician</span>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
              Payment is held in FixNaija escrow until you confirm the work is completed to satisfaction.
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
