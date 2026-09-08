import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  Flame, 
  Compass, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { TrendTopic, ContentProject } from '../types';

interface TrendRadarProps {
  trends: TrendTopic[];
  onConvertTrendToProject: (trend: TrendTopic) => void;
  creatorNiche: string;
}

export const TrendRadar: React.FC<TrendRadarProps> = ({
  trends,
  onConvertTrendToProject,
  creatorNiche
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getAngles = (t: TrendTopic): string[] => {
    if (Array.isArray(t.suggestedAngles) && t.suggestedAngles.length > 0) {
      return t.suggestedAngles;
    }
    if (t.suggestedAngle) {
      return [t.suggestedAngle];
    }
    return ['Deep-dive walkthrough and practical creator framework'];
  };

  const filteredTrends = trends.filter(t => {
    const angles = getAngles(t);
    const matchesSearch = t.topic.toLowerCase().includes(search.toLowerCase()) ||
      angles.some(a => a.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(trends.map(t => t.category).filter(Boolean)))];

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" /> Trend Discovery Radar
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Audience Search Surge Signals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Trend Radar & Content Angles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Detect breakout queries in your niche early and convert high-velocity topics into actionable production projects.
          </p>
        </div>

        <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-amber-400" />
          <span>Real-time Velocity Index Active</span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0c0e18] p-3 rounded-2xl border border-white/10">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search emerging topics, technologies, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 self-start sm:self-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTrends.map((trend) => {
          const angles = getAngles(trend);
          const velocityLabel = trend.velocity || (trend.momentumScore ? `${trend.momentumScore}% Velocity` : 'High Velocity');
          const competitionLabel = trend.competitionLevel || 'Moderate';

          return (
            <div
              key={trend.id}
              className="rounded-2xl border border-white/10 bg-[#0b0d18] p-5 flex flex-col justify-between hover:border-amber-500/40 transition space-y-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10.5px] font-bold px-2.5 py-0.5 flex items-center gap-1">
                    <Flame className="h-3 w-3" /> {velocityLabel}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Search Vol: <strong className="text-white">{trend.searchVolume}</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-sans">
                  {trend.topic}
                </h3>

                <div className="mt-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Recommended Content Angles:
                  </span>
                  {angles.map((angle, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-xs text-slate-300 flex items-start gap-2"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{angle}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Competition: <strong className="text-white capitalize">{competitionLabel}</strong>
                </span>

                <button
                  onClick={() => onConvertTrendToProject(trend)}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 hover:opacity-95 active:scale-95 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Turn into Project</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
