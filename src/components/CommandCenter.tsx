import React from 'react';
import { 
  Flame, 
  Sparkles, 
  ArrowUpRight, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  DollarSign, 
  Repeat, 
  Bot, 
  ExternalLink,
  ChevronRight,
  Activity,
  AlertTriangle,
  Play
} from 'lucide-react';
import { 
  CreatorProfile, 
  PlatformConnection, 
  PriorityAction, 
  CreatorHubScore, 
  ContentProject, 
  IncomeRecord,
  CreatorGoal
} from '../types';
import { getPlatformIcon, getPlatformBadgeColor, getPlatformName } from '../utils/platformHelpers';
import { NavTab } from './Sidebar';

interface CommandCenterProps {
  creator: CreatorProfile;
  platforms: PlatformConnection[];
  actions: PriorityAction[];
  score: CreatorHubScore;
  projects: ContentProject[];
  incomeRecords: IncomeRecord[];
  goals: CreatorGoal[];
  onExecuteAction: (action: PriorityAction) => void;
  onNavigateTab: (tab: NavTab) => void;
  onSelectProject: (project: ContentProject) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  creator,
  platforms,
  actions,
  score,
  projects,
  incomeRecords,
  goals,
  onExecuteAction,
  onNavigateTab,
  onSelectProject
}) => {
  const safeScore: CreatorHubScore = score || {
    overall: 84,
    contentConsistency: 88,
    engagement: 76,
    contentPerformance: 89,
    goalProgress: 81,
    explanation: 'Your score gained +3 points this week driven by higher retention on your YouTube breakdown and a steady 4-post weekly cadence.',
    recentChange: '+3 pts this week',
  };

  // Aggregate real stats
  const connectedPlatforms = platforms.filter(p => p.connected);
  const totalAudience = connectedPlatforms.reduce((acc, p) => acc + p.audienceCount, 0);
  const totalViews30d = connectedPlatforms.reduce((acc, p) => acc + p.views30d, 0);
  const avgEngagement = (connectedPlatforms.reduce((acc, p) => acc + p.engagementRate, 0) / (connectedPlatforms.length || 1)).toFixed(1);
  const totalIncome = incomeRecords.reduce((acc, i) => acc + i.amount, 0);

  const upcomingScheduled = projects.filter(p => p.status === 'scheduled');
  const activeDrafts = projects.filter(p => ['idea', 'planning', 'creating', 'ready_for_review'].includes(p.status));
  const publishedProjects = projects.filter(p => p.status === 'published');
  const bestProject = publishedProjects[0] || projects[0];

  const getPriorityBadge = (priority: PriorityAction['priority']) => {
    switch (priority) {
      case 'high':
        return <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-md">🔴 High Priority</span>;
      case 'opportunity':
        return <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">🟠 Content Opportunity</span>;
      case 'schedule':
        return <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-md">🟡 Schedule</span>;
      case 'improvement':
        return <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">🟢 Improvement</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Dynamic Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Command Center</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{creator.niche}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 font-sans">
            Good Afternoon, {creator.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Here are your data-backed recommendations and platform status for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('ai_coach')}
            className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <Bot className="h-4 w-4 text-cyan-400" />
            <span>Open AI Coach</span>
          </button>
          <button
            onClick={() => onNavigateTab('workspace')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:opacity-95 transition"
          >
            <span>View All Projects ({projects.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Focus Banner: WHAT SHOULD I DO NEXT? */}
      <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#101424] via-[#0d101c] to-[#0a0c16] p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-60 h-60 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2 font-sans">
                WHAT SHOULD I DO NEXT?
                <span className="rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5">
                  Recommendation Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Prioritized by Urgency + Potential Reach Impact + Goal Relevance.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('what_next')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <span>View Full Prioritization Engine</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Priority Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((act) => (
            <div
              key={act.id}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-4.5 hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  {getPriorityBadge(act.priority)}
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    Priority Score: <span className="text-white">{act.score}/100</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                  {act.title}
                </h3>

                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  <strong className="text-slate-200">Why: </strong>{act.reason}
                </p>

                <div className="mt-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-2 text-[11px] text-slate-400">
                  <span className="text-cyan-400 font-semibold">Supporting signal: </span>
                  {act.supportingInformation}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                  Action: {act.suggestedAction}
                </span>
                <button
                  onClick={() => onExecuteAction(act)}
                  className="shrink-0 flex items-center gap-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 text-xs font-semibold active:scale-95 transition-all"
                >
                  <span>{act.actionButtonText}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top 4 Performance & Reach Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Audience</span>
            <Users className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-sans">{totalAudience.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-400">+9.2%</span>
          </div>
          <p className="text-[10.5px] text-slate-400 mt-1">Across {connectedPlatforms.length} connected platforms</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">30-Day Total Views</span>
            <Eye className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-sans">{(totalViews30d / 1000000).toFixed(2)}M</span>
            <span className="text-xs font-semibold text-emerald-400">+14.8%</span>
          </div>
          <p className="text-[10.5px] text-slate-400 mt-1">Verified platform API data</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Average Engagement</span>
            <Activity className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-sans">{avgEngagement}%</span>
            <span className="text-xs font-semibold text-cyan-400">High Tier</span>
          </div>
          <p className="text-[10.5px] text-slate-400 mt-1">Comments + Shares / Impressions</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Monthly Creator Income</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-sans">${totalIncome.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-400">5 Streams</span>
          </div>
          <p className="text-[10.5px] text-slate-400 mt-1">Verified payouts + deals</p>
        </div>
      </section>

      {/* Middle Row: Connected Platforms Overview & CreatorHub Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Platforms Strip */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Connected Platforms</h3>
              <p className="text-xs text-slate-400">Real-time status, audience reach, and publishing availability.</p>
            </div>
            <button
              onClick={() => onNavigateTab('platforms')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1"
            >
              <span>Manage Accounts</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {connectedPlatforms.map((p) => (
              <div
                key={p.platform}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(p.platform, 'w-4 h-4')}
                    <span className="text-xs font-bold text-white">{getPlatformName(p.platform)}</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" title="Connected & Synced" />
                </div>

                <div className="mt-2.5 flex items-baseline justify-between">
                  <span className="text-base font-extrabold text-white">{p.audienceCount.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-emerald-400">{p.audienceGrowthRate}</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                  <span>30d Views: {(p.views30d / 1000).toFixed(0)}k</span>
                  <span className="text-slate-300 font-medium">{p.engagementRate}% Eng.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CreatorHub Score Breakdown */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 to-slate-900/60 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white font-sans">CreatorHub Score</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400">{safeScore.recentChange}</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-indigo-500/40">
                <span className="text-2xl font-black text-white font-sans">{safeScore.overall}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">High Production Velocity</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Calculated transparently across 4 objective operational pillars:
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-0.5">
                  <span>Consistency Cadence</span>
                  <span className="font-bold text-white">{safeScore.contentConsistency}/100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${safeScore.contentConsistency}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-0.5">
                  <span>Audience Engagement</span>
                  <span className="font-bold text-white">{safeScore.engagement}/100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-400" style={{ width: `${safeScore.engagement}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-0.5">
                  <span>Content Performance</span>
                  <span className="font-bold text-white">{safeScore.contentPerformance}/100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-400" style={{ width: `${safeScore.contentPerformance}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-0.5">
                  <span>Goal Progression</span>
                  <span className="font-bold text-white">{safeScore.goalProgress}/100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${safeScore.goalProgress}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 leading-snug">
            {safeScore.explanation}
          </div>
        </div>
      </div>

      {/* Bottom Row: Creator Workload Monitor & Best Performing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creator Workload Monitor */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Creator Workload Monitor</h3>
            </div>
            <span className="rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5">
              Sustainable Cadence
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Monitoring active drafts, upcoming deadlines, and cross-platform publishing commitments.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <span className="text-lg font-bold text-white">{activeDrafts.length}</span>
              <p className="text-[10.5px] text-slate-400 mt-0.5">Active In-Progress</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <span className="text-lg font-bold text-cyan-400">{upcomingScheduled.length}</span>
              <p className="text-[10.5px] text-slate-400 mt-0.5">Scheduled Ready</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <span className="text-lg font-bold text-indigo-400">4.2 / 5.0</span>
              <p className="text-[10.5px] text-slate-400 mt-0.5">Posts This Week</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-white">Workload Recommendation:</span>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                Your schedule is well-balanced for the next 48 hours. Focus on completing project <span className="text-cyan-300 font-mono font-medium">#{upcomingScheduled[0]?.title.slice(0, 25)}...</span> before initiating a new brainstorm.
              </p>
            </div>
          </div>
        </div>

        {/* Best-Performing Content Breakdown */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Best-Performing Content (30 Days)</h3>
            </div>
            <span className="text-xs font-semibold text-purple-400">Top +48% Baseline</span>
          </div>

          {bestProject ? (
            <div 
              onClick={() => onSelectProject(bestProject)}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-950/20 to-slate-900/40 p-4 cursor-pointer hover:border-purple-500/40 transition group"
            >
              <div className="flex items-center gap-2 mb-2">
                {bestProject.targetPlatforms.map(p => (
                  <span key={p} className={`rounded border px-1.5 py-0.5 text-[9px] font-semibold ${getPlatformBadgeColor(p)}`}>
                    {getPlatformName(p)}
                  </span>
                ))}
                <span className="text-[10px] text-slate-400 font-mono ml-auto">Published {bestProject.scheduledDate}</span>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors font-sans">
                {bestProject.title}
              </h4>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center pt-3 border-t border-white/10">
                <div>
                  <span className="text-xs font-bold text-white">{bestProject.metrics?.views?.toLocaleString() || '89.4k'}</span>
                  <p className="text-[10px] text-slate-400">Views</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-white">{bestProject.metrics?.engagementRate || 8.7}%</span>
                  <p className="text-[10px] text-slate-400">Engagement</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-white">{bestProject.metrics?.shares || 1120}</span>
                  <p className="text-[10px] text-slate-400">Shares</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400">${bestProject.metrics?.revenueEstimated || 840}</span>
                  <p className="text-[10px] text-slate-400">Est. Revenue</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-purple-300 pt-2 font-medium">
                <span>AI Insight: Demonstration section drove 68% audience retention</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Open Project <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
