import React from 'react';
import { 
  Sparkles, 
  Plus, 
  Globe, 
  RefreshCw, 
  ChevronDown, 
  Zap,
  Menu,
  Settings
} from 'lucide-react';
import { CreatorProfile, CreatorHubScore } from '../types';

export interface NavbarProps {
  creator: CreatorProfile;
  score?: CreatorHubScore;
  onNewProject?: () => void;
  onOpenProfile?: () => void;
  onOpenOnboarding?: () => void;
  onOpenSettings?: () => void;
  onOpenAuth?: () => void;
  onToggleLanding?: () => void;
  onToggleLandingPage?: () => void;
  isLandingView?: boolean;
  onRefreshSync?: () => void;
  isSyncing?: boolean;
  onToggleMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  creator,
  score,
  onNewProject,
  onOpenProfile,
  onOpenOnboarding,
  onOpenSettings,
  onOpenAuth,
  onToggleLanding,
  onToggleLandingPage,
  isLandingView = false,
  onRefreshSync,
  isSyncing = false,
  onToggleMobileSidebar
}) => {
  const safeScore: CreatorHubScore = score || {
    overall: 84,
    contentConsistency: 88,
    engagement: 76,
    contentPerformance: 89,
    goalProgress: 81,
    explanation: 'Your score gained +3 points this week.',
    recentChange: '+3 pts this week',
  };

  const handleToggleLanding = onToggleLanding || onToggleLandingPage || (() => {});
  const handleOpenProfile = onOpenProfile || onOpenOnboarding || (() => {});

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0b12]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 -ml-2 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}

          <div 
            onClick={handleToggleLanding}
            className="group flex items-center gap-2.5 cursor-pointer"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-500/30 transition-all">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#0d0e17]">
                <Zap className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white font-sans">
                  Creator<span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Hub</span>
                </span>
                <span className="hidden sm:inline-flex items-center rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                  OS v2.4
                </span>
              </div>
              <p className="hidden md:block text-[10.5px] font-medium tracking-wide text-slate-400 uppercase">
                One Hub. Every Platform. Endless Creativity.
              </p>
            </div>
          </div>
        </div>

        {/* Center Indicators: Sync & CreatorHub Score */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Sync status */}
          <button
            onClick={onRefreshSync}
            disabled={isSyncing}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300 hover:bg-white/[0.08] transition"
            title="Sync all connected social accounts"
          >
            <RefreshCw className={`h-3 w-3 text-cyan-400 ${isSyncing ? 'animate-spin text-cyan-300' : ''}`} />
            <span>{isSyncing ? 'Syncing APIs...' : '5 Accounts Connected'}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* CreatorHub Score Pill */}
          <div className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-slate-400">CreatorHub Score:</span>
            <span className="font-bold text-white">{safeScore.overall}/100</span>
            <span className="text-[10px] font-medium text-emerald-400">{safeScore.recentChange}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Landing page preview toggle */}
          <button
            onClick={handleToggleLanding}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition border ${
              isLandingView
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'text-slate-300 border-white/10 hover:bg-white/[0.06]'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isLandingView ? 'Back to Workspace' : 'Landing Page'}</span>
          </button>

          {/* Create Project Button */}
          {onNewProject && (
            <button
              onClick={onNewProject}
              className="group relative flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:from-cyan-400 hover:to-indigo-500 active:scale-95 transition-all"
            >
              <Plus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
              <span>New Project</span>
            </button>
          )}

          {/* Settings & Privacy Quick Trigger */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
              title="Open Settings & Privacy"
              aria-label="Settings and Privacy"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}

          {/* Creator Profile Trigger */}
          <div
            onClick={handleOpenProfile}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-1 pr-2.5 cursor-pointer hover:bg-white/[0.08] transition"
          >
            <img
              src={creator.avatar}
              alt={creator.name}
              className="h-7 w-7 rounded-md object-cover border border-white/20"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">{creator.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{creator.niche}</p>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
