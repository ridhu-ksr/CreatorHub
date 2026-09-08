import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Zap,
  Sliders,
  Filter,
  Check
} from 'lucide-react';
import { PriorityAction, CreatorProfile, ContentProject, ActionPriority } from '../types';

interface WhatShouldIDoNextProps {
  actions: PriorityAction[];
  creator: CreatorProfile;
  projects: ContentProject[];
  onExecuteAction: (action: PriorityAction) => void;
  onRefreshActions: () => Promise<void>;
  isRefreshing: boolean;
}

export const WhatShouldIDoNext: React.FC<WhatShouldIDoNextProps> = ({
  actions,
  creator,
  projects,
  onExecuteAction,
  onRefreshActions,
  isRefreshing
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | ActionPriority>('all');
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const filteredActions = actions.filter(a => {
    if (selectedFilter === 'all') return true;
    return a.priority === selectedFilter;
  });

  const handleToggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header with Evaluation Engine Explanation */}
      <div className="border-b border-white/10 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Flame className="h-4 w-4" /> Recommendation Intelligence
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Algorithmic Scoring Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              What Should I Do Next?
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Transparent prioritization based on: <span className="text-white font-mono">Priority = Urgency + Potential Impact + Goal Relevance + Content Opportunity</span>.
            </p>
          </div>

          <button
            onClick={onRefreshActions}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-500/20 hover:opacity-95 disabled:opacity-50 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Re-Evaluating Signals...' : 'Re-Evaluate Signals with AI'}</span>
          </button>
        </div>
      </div>

      {/* Formula & Weight Transparency Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-cyan-400" />
            Transparent Scoring Breakdown
          </span>
          <span className="text-[11px] text-slate-400">Real-time dynamic weights</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <span className="text-[11px] font-semibold text-rose-400">Urgency (35%)</span>
            <p className="text-[10.5px] text-slate-400 mt-1">Deadlines, audience peak windows & unanswered high-value comments.</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <span className="text-[11px] font-semibold text-amber-400">Potential Impact (30%)</span>
            <p className="text-[10.5px] text-slate-400 mt-1">Audience retention delta, estimated view multiplier, and search breakout.</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <span className="text-[11px] font-semibold text-indigo-400">Goal Relevance (20%)</span>
            <p className="text-[10.5px] text-slate-400 mt-1">Direct alignment with your stated 100k subscriber and $12k revenue milestones.</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <span className="text-[11px] font-semibold text-emerald-400">Content Opportunity (15%)</span>
            <p className="text-[10.5px] text-slate-400 mt-1">Unrepurposed video transcripts, trending niche queries & low-effort wins.</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="h-3 w-3" /> Filter by Priority:
        </span>
        <button
          onClick={() => setSelectedFilter('all')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            selectedFilter === 'all'
              ? 'bg-white/15 text-white font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          All Recommendations ({actions.length})
        </button>
        <button
          onClick={() => setSelectedFilter('high')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            selectedFilter === 'high'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          🔴 High Priority
        </button>
        <button
          onClick={() => setSelectedFilter('opportunity')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            selectedFilter === 'opportunity'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          🟠 Opportunities
        </button>
        <button
          onClick={() => setSelectedFilter('schedule')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            selectedFilter === 'schedule'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          🟡 Schedule
        </button>
        <button
          onClick={() => setSelectedFilter('improvement')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            selectedFilter === 'improvement'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          🟢 Improvement
        </button>
      </div>

      {/* Prioritized List of Actions */}
      <div className="space-y-4">
        {filteredActions.map((act) => {
          const isDone = completedIds.includes(act.id);
          return (
            <div
              key={act.id}
              className={`rounded-2xl border transition-all p-5 ${
                isDone
                  ? 'border-white/5 bg-white/[0.01] opacity-60'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={(e) => handleToggleComplete(act.id, e)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                      isDone
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                        : 'border-white/20 bg-white/5 text-transparent hover:border-white/40'
                    }`}
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {act.priority === 'high' && (
                        <span className="rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5">
                          🔴 HIGH PRIORITY
                        </span>
                      )}
                      {act.priority === 'opportunity' && (
                        <span className="rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5">
                          🟠 CONTENT OPPORTUNITY
                        </span>
                      )}
                      {act.priority === 'schedule' && (
                        <span className="rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5">
                          🟡 SCHEDULE
                        </span>
                      )}
                      {act.priority === 'improvement' && (
                        <span className="rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5">
                          🟢 IMPROVEMENT
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Priority Score: <span className="text-white">{act.score}/100</span>
                      </span>
                    </div>

                    <h3 className={`text-base font-bold text-white font-sans ${isDone ? 'line-through text-slate-400' : ''}`}>
                      {act.title}
                    </h3>

                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      <strong className="text-white">Why: </strong>{act.reason}
                    </p>

                    <div className="mt-2 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-xs text-slate-400 space-y-1">
                      <div>
                        <span className="text-cyan-400 font-semibold">Supporting Signals: </span>
                        {act.supportingInformation}
                      </div>
                      <div>
                        <span className="text-emerald-400 font-semibold">Suggested Action: </span>
                        {act.suggestedAction}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0">
                  <button
                    onClick={() => onExecuteAction(act)}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:opacity-95 active:scale-95 transition"
                  >
                    <span>{act.actionButtonText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <span className="text-[10px] text-slate-500 font-mono">
                    Target: {act.actionTarget.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
