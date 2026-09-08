import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { CreatorProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  initialProfile: CreatorProfile;
  onSave: (updated: Partial<CreatorProfile>) => void;
  onClose: () => void;
}

const AVAILABLE_NICHES = [
  'Technology & AI',
  'Education & Tutorials',
  'Gaming & Esports',
  'Entertainment & Comedy',
  'Business & Solopreneurship',
  'Design & Creative Arts',
  'Fitness & Health',
  'Lifestyle & Travel',
  'Food & Cooking',
  'Music & Audio'
];

const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR'];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  initialProfile,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(initialProfile.name);
  const [niche, setNiche] = useState(initialProfile.niche);
  const [targetAudience, setTargetAudience] = useState(initialProfile.targetAudience);
  const [primaryCategory, setPrimaryCategory] = useState(initialProfile.primaryCategory);
  const [currency, setCurrency] = useState(initialProfile.preferredCurrency);
  const [bio, setBio] = useState(initialProfile.bio);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      niche,
      targetAudience,
      primaryCategory,
      preferredCurrency: currency,
      bio,
      onboardingCompleted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#0e111d] p-6 sm:p-8 shadow-2xl text-left my-8">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Personalize Your Creator OS</h2>
            <p className="text-xs text-slate-400">CreatorHub tunes recommendations, hooks, and analytics to your specific niche.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Creator / Channel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Primary Content Niche</label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_NICHES.map((n) => {
                const isSelected = niche === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNiche(n)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs text-left transition border ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200 font-semibold'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{n}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Who Is Your Target Audience?</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Solo software builders, designers, and video editors"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category Label</label>
              <input
                type="text"
                value={primaryCategory}
                onChange={(e) => setPrimaryCategory(e.target.value)}
                placeholder="e.g. Tech & Design"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#141724] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-[#141724] text-white">{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Creator One-Liner / Bio</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="What is the core mission of your content?"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 transition"
            >
              <span>Activate Personalized OS</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
