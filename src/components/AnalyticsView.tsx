import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  DollarSign
} from 'lucide-react';
import { PlatformConnection, ContentProject, CreatorProfile } from '../types';
import { getPlatformIcon, getPlatformName, getPlatformBadgeColor } from '../utils/platformHelpers';

interface AnalyticsViewProps {
  platforms: PlatformConnection[];
  projects: ContentProject[];
  creator: CreatorProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  platforms,
  projects,
  creator
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const connectedPlatforms = platforms.filter(p => p.connected);
  const totalAudience = connectedPlatforms.reduce((sum, p) => sum + p.audienceCount, 0);
  const totalViews = connectedPlatforms.reduce((sum, p) => sum + p.views30d, 0);
  const avgEngagement = (connectedPlatforms.reduce((sum, p) => sum + p.engagementRate, 0) / (connectedPlatforms.length || 1)).toFixed(1);

  // Performance breakdown by content format
  const formatBreakdown = [
    { format: 'Short-Form Video (Reels/TikTok/Shorts)', share: '54%', views: '1,420,000', eng: '9.2%', status: 'Highest Reach Velocity' },
    { format: 'Long-Form Deep Dive (YouTube)', share: '31%', views: '814,000', eng: '8.4%', status: 'Highest Watch Time & AdSense' },
    { format: 'Visual Carousels / Threads (LinkedIn/X)', share: '15%', views: '394,000', eng: '4.8%', status: 'Highest Inbound Sponsorship DM' },
  ];

  // Actionable diagnosis questions
  const actionableQuestions = [
    {
      question: 'Why did my recent AI Workflow video beat baseline by +48%?',
      answer: 'Visual Retention Peak: Viewers did not drop off at minute 02:15 because you switched directly to screen demonstration without an extended intro monologue. Hook velocity was 82% higher than average.',
      takeaway: 'Repeat the 3-second rapid proof pattern in your next 2 videos.'
    },
    {
      question: 'When is my audience genuinely most active to maximize early comments?',
      answer: 'Tuesdays and Thursdays between 17:30 and 19:45 local timezone. Videos uploaded during this window receive 3.1x faster algorithmic indexation than morning posts.',
      takeaway: 'Schedule your upcoming video project for Thursday at 18:00.'
    },
    {
      question: 'Which content category drives the highest long-term subscribers?',
      answer: 'Tutorial breakdowns drive 64% of all net-new channel subscribers, whereas reactive tech news commentary drives brief spikes with 40% lower retention.',
      takeaway: 'Maintain a 70/30 ratio of durable Evergreen Tutorials to Trending Reactions.'
    }
  ];

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" /> Actionable Intelligence
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Zero Vanity Blindspots</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Cross-Platform Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Every metric explains what happened, why it happened, and what you should do next to grow.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#0c0e18] border border-white/10 p-1 rounded-xl">
          {(['7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                timeRange === range
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* Core Operational KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Aggregated Reach</span>
            <Eye className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-sans">
            {(totalViews / 1000000).toFixed(2)}M
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+14.8% vs previous period</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            Driven primarily by short-form video discovery algorithms.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Community</span>
            <Users className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-sans">
            {totalAudience.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+2,140 net followers this month</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            YouTube subscribers show the highest multi-month retention.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Average Engagement</span>
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-sans">
            {avgEngagement}%
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-cyan-400">
            <span>High-Performing (Top 15% Niche)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            Measured strictly by genuine comments, saves, and shares.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Top Revenue Source</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-sans">
            Sponsorships
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400">
            <span>68% of total creator revenue</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            Long-form video integrations yield $3,200 avg per brand placement.
          </p>
        </div>
      </div>

      {/* Actionable Intelligence Diagnosis Section */}
      <div className="rounded-2xl border border-white/10 bg-[#0b0d18] p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 w-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Actionable Insights & Performance Diagnosis</h3>
            <p className="text-xs text-slate-400">Clear explanations derived from retention graphs and audience behavior.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionableQuestions.map((q, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-between space-y-3"
            >
              <div>
                <h4 className="text-xs font-bold text-cyan-300 font-sans leading-snug">
                  "{q.question}"
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {q.answer}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-start gap-1.5 text-[11px] text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span className="font-medium">Action: {q.takeaway}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Comparison Matrix */}
      <div className="rounded-2xl border border-white/10 bg-[#0b0d18] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Platform Performance Breakdown</h3>
            <p className="text-xs text-slate-400">Audience scale, 30-day velocity, engagement health, and sync freshness.</p>
          </div>
          <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5">
            Official OAuth Feeds
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Platform</th>
                <th className="px-4 py-3">Audience Size</th>
                <th className="px-4 py-3">30-Day Growth</th>
                <th className="px-4 py-3">Views / Reach</th>
                <th className="px-4 py-3">Engagement</th>
                <th className="px-4 py-3">Platform Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {connectedPlatforms.map((p) => (
                <tr key={p.platform} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      {getPlatformIcon(p.platform, 'w-4 h-4')}
                      <div>
                        <span className="font-bold text-white">{getPlatformName(p.platform)}</span>
                        <div className="text-[10px] text-slate-400 font-mono">@{p.platform}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-white">
                    {p.audienceCount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-emerald-400">
                    {p.audienceGrowthRate}
                  </td>
                  <td className="px-4 py-3.5 text-slate-200">
                    {(p.views30d / 1000).toFixed(0)}k
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-white">{p.engagementRate}%</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5">
                      Healthy & Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Format Breakdown */}
      <div className="rounded-2xl border border-white/10 bg-[#0b0d18] p-5">
        <h3 className="text-sm font-bold text-white mb-1">Content Format Efficiency</h3>
        <p className="text-xs text-slate-400 mb-4">
          Comparing output velocity to reach payoff so you spend creative effort where leverage is highest.
        </p>

        <div className="space-y-3">
          {formatBreakdown.map((fb, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-white">{fb.format}</span>
                <p className="text-[11px] text-cyan-400">{fb.status}</p>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 block">30d Views</span>
                  <span className="font-bold text-white">{fb.views}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Avg Eng</span>
                  <span className="font-bold text-emerald-400">{fb.eng}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Reach Share</span>
                  <span className="font-bold text-indigo-300">{fb.share}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
