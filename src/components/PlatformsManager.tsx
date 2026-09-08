import React from 'react';
import { 
  Share2, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Lock,
  Zap,
  Info
} from 'lucide-react';
import { PlatformConnection, PlatformId } from '../types';
import { getPlatformIcon, getPlatformName } from '../utils/platformHelpers';

interface PlatformsManagerProps {
  platforms: PlatformConnection[];
  onToggleConnect: (platformId: PlatformId) => void;
}

export const PlatformsManager: React.FC<PlatformsManagerProps> = ({
  platforms,
  onToggleConnect
}) => {
  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Share2 className="h-4 w-4" /> Official API Integrations
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">OAuth 2.0 Direct Tokens</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Connected Platforms & Sync
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Authorize official API access to read metrics, sync audience growth, and dispatch multi-platform content.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs text-emerald-300 font-semibold">
          <ShieldCheck className="h-4 w-4" />
          <span>Zero-Password Official OAuth Only</span>
        </div>
      </div>

      {/* Security & Authentication Notice */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-4 flex items-start gap-3">
        <Lock className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
          <span className="font-bold text-white">Authentic Security & Zero Fake Data Guarantee: </span>
          <span>
            CreatorHub strictly utilizes official OAuth 2.0 authorization endpoints. We never view, request, or store your passwords. Content is only scheduled or published when explicitly triggered by you.
          </span>
        </div>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((conn) => {
          return (
            <div
              key={conn.platform}
              className={`rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                conn.connected
                  ? 'border-white/15 bg-[#0b0d18]'
                  : 'border-white/5 bg-white/[0.01] opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    {getPlatformIcon(conn.platform, 'w-5 h-5')}
                    <div>
                      <h3 className="text-sm font-bold text-white">{getPlatformName(conn.platform)}</h3>
                      {conn.handle && (
                        <span className="text-[11px] text-slate-400 font-mono">@{conn.handle}</span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1.5 ${
                      conn.connected
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-500/15 border border-slate-500/30 text-slate-400'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${conn.connected ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                    {conn.connected ? 'Connected & Active' : 'Not Connected'}
                  </span>
                </div>

                {conn.connected ? (
                  <div className="grid grid-cols-3 gap-2 text-center py-2">
                    <div className="rounded-xl bg-white/[0.02] p-2.5 border border-white/5">
                      <span className="text-xs font-bold text-white font-sans">{conn.audienceCount.toLocaleString()}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Followers / Subs</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.02] p-2.5 border border-white/5">
                      <span className="text-xs font-bold text-emerald-400 font-sans">{conn.audienceGrowthRate}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">30d Growth</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.02] p-2.5 border border-white/5">
                      <span className="text-xs font-bold text-cyan-300 font-sans">{conn.engagementRate}%</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Eng. Rate</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-xs text-slate-400 leading-relaxed">
                    Connect your {getPlatformName(conn.platform)} account to synchronize your follower metrics, watch duration, and automated scheduling.
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  {conn.connected ? `Synced ${conn.lastSync}` : 'Requires OAuth grant'}
                </span>

                <button
                  onClick={() => onToggleConnect(conn.platform)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition active:scale-95 ${
                    conn.connected
                      ? 'border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20'
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-indigo-600/30 hover:opacity-95'
                  }`}
                >
                  {conn.connected ? 'Disconnect Platform' : `Authorize ${getPlatformName(conn.platform)}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
