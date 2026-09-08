import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Copy, 
  Check, 
  Send, 
  Eye, 
  Clock, 
  Sliders, 
  ArrowRight, 
  Hash, 
  RefreshCw, 
  FileText, 
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Film,
  Layers,
  ChevronDown
} from 'lucide-react';
import { PlatformId, ContentProject, PrePublishAnalysis } from '../types';
import { getPlatformName, getPlatformIcon } from '../utils/platformHelpers';

interface PrePublishAnalyzerProps {
  creatorNiche: string;
  projects?: ContentProject[];
  onSaveToProject?: (projectId: string, updatedHook: string, updatedTitle: string) => void;
  onNavigateToCopyright?: () => void;
}

export const PrePublishAnalyzer: React.FC<PrePublishAnalyzerProps> = ({
  creatorNiche,
  projects = [],
  onSaveToProject,
  onNavigateToCopyright,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [platform, setPlatform] = useState<PlatformId>('youtube');
  const [title, setTitle] = useState('5 Untapped Tools That Will 10x Your Creator Output in 2026');
  const [hook, setHook] = useState('If you are spending more than 2 hours editing and repurposing videos, you are doing it backwards. Here is the exact automated system:');
  const [caption, setCaption] = useState('In this breakdown, I demonstrate the 3-layer workflow top creators use to produce 10x more content across YouTube, TikTok, and X without burning out.\n\nKey takeaways:\n1. Never edit from scratch\n2. Script for the first 3 seconds\n3. Leverage native repurposing models\n\nDrop your current biggest bottleneck below!');
  const [targetAudience, setTargetAudience] = useState('Solo content creators and digital media entrepreneurs');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Pre-flight checklist state
  const [checklist, setChecklist] = useState({
    mobileThumbnail: true,
    firstFramePunch: true,
    noDeadAirIntro: true,
    audioBalanced: true,
    captionsEnabled: true,
    clearCta: false,
    pinnedCommentReady: false,
  });

  const [analysis, setAnalysis] = useState<PrePublishAnalysis>({
    titleClarity: 92,
    audienceRelevance: 94,
    hookStrength: 88,
    keywordRelevance: 86,
    overallScore: 90,
    hookCritique: 'Strong curiosity gap and quantified time dilemma in the opening sentence. The phrase "doing it backwards" creates instant cognitive tension.',
    suggestedBetterHooks: [
      'Stop editing videos manually: here is the 3-layer automated setup top creators use.',
      'If your content creation takes more than 5 hours a week, you are making this 1 crucial mistake.',
      'I tested 20+ creator workflows over the last 90 days. Here are the only 3 tools that actually scaled output.'
    ],
    keywordSuggestions: [
      'creator workflow automation',
      'video retention tips',
      'content scaling system',
      'algorithmic distribution',
      'high retention hooks'
    ],
    recommendations: [
      'Show the final automated output within the first 1.5 seconds before explaining the system.',
      'Trim 3 words from the opening hook to deliver the primary thesis under 2.5 seconds.',
      'Front-load your primary keyword in the first 60 characters of the description for search indexing.',
      'Pin a comment asking viewers for their single biggest time-waster to ignite comment velocity.'
    ]
  });

  // When user selects an existing project from dropdown
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    if (!projectId) return;

    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      setTitle(proj.title || '');
      setHook(proj.platformVersions?.[platform]?.hook || proj.script?.slice(0, 140) || '');
      setCaption(proj.platformVersions?.[platform]?.caption || proj.description || '');
      if (proj.targetPlatforms && proj.targetPlatforms.length > 0) {
        setPlatform(proj.targetPlatforms[0]);
      }
    }
  };

  // Run AI content analysis
  const handleRunAudit = async () => {
    if (!title.trim() && !hook.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/analyze-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          hook,
          caption,
          platform: getPlatformName(platform),
          niche: creatorNiche,
          targetAudience,
        })
      });

      const data = await res.json();
      if (data && data.overallScore !== undefined) {
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Audit failed, using local diagnostic:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleApplyHook = (newHook: string) => {
    setHook(newHook);
    if (selectedProjectId && onSaveToProject) {
      onSaveToProject(selectedProjectId, newHook, title);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const toggleChecklistItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;
  const totalChecklistCount = Object.keys(checklist).length;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 70) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getBestPostingTime = (plat: PlatformId): string => {
    switch (plat) {
      case 'youtube': return 'Tuesday & Thursday, 2:00 PM - 5:00 PM EST (Peak Browse Indexing)';
      case 'tiktok': return 'Daily, 6:30 PM - 9:30 PM EST (Peak Scroll Engagement)';
      case 'instagram': return 'Wednesday & Friday, 11:00 AM - 1:00 PM & 7:00 PM EST';
      case 'twitter': return 'Monday - Thursday, 8:00 AM - 10:30 AM EST (Morning Catch-Up)';
      case 'linkedin': return 'Tuesday - Thursday, 7:45 AM - 9:15 AM EST (Pre-Workday Read)';
      default: return 'Weekdays, 12:00 PM - 3:00 PM Local Audience Window';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                Pre-Publish Analyzer & Quality Gate
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Audit retention hooks, algorithmic readiness, SEO discoverability, and pre-flight checklists before publishing.
              </p>
            </div>
          </div>
        </div>

        {/* Project Selector & Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {projects.length > 0 && (
            <div className="relative min-w-[200px]">
              <select
                value={selectedProjectId}
                onChange={(e) => handleSelectProject(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#0c0d16] px-3.5 py-2 pr-8 text-xs font-medium text-slate-200 hover:border-white/20 focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="">Load from Project...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title.slice(0, 32)}...
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>
          )}

          <button
            onClick={handleRunAudit}
            disabled={isAnalyzing}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-cyan-400 hover:to-indigo-500 active:scale-95 transition disabled:opacity-60"
          >
            <Sparkles className={`h-3.5 w-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Auditing Vectors...' : 'Run Quality Audit'}</span>
          </button>
        </div>
      </div>

      {/* Saved Toast Notification */}
      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300 animate-in fade-in">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Optimized hook and title successfully saved back to project!</span>
        </div>
      )}

      {/* Main Grid: Input Draft on Left, Diagnostic Intelligence on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Draft Editor & Platform Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Target Platform Pill Selector */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-4">
            <label className="text-xs font-semibold text-slate-300 block mb-2.5">
              Select Target Platform:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['youtube', 'tiktok', 'instagram', 'twitter', 'linkedin'] as PlatformId[]).map((p) => {
                const isSelected = platform === p;
                return (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-medium transition ${
                      isSelected
                        ? 'border-cyan-500/50 bg-cyan-500/15 text-white shadow-sm shadow-cyan-500/20 font-semibold'
                        : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                    }`}
                  >
                    <span className="text-base">{getPlatformIcon(p)}</span>
                    <span className="text-[11px] capitalize">{getPlatformName(p)}</span>
                  </button>
                );
              })}
            </div>

            {/* Posting Window Advisory */}
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-2.5 text-xs text-slate-300">
              <Clock className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Recommended Posting Window: </span>
                <span className="text-slate-300">{getBestPostingTime(platform)}</span>
              </div>
            </div>
          </div>

          {/* Title & Headline Input */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <span>Working Title / Main Headline</span>
                <span className="text-[10px] text-slate-400">({title.length} characters)</span>
              </label>
              <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-md border ${
                title.length >= 40 && title.length <= 70 
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' 
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
              }`}>
                {title.length >= 40 && title.length <= 70 ? 'Ideal Length (40-70)' : 'Consider 40-70 chars'}
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 Untapped Tools Top Creators Use in 2026..."
              className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* First 3 Seconds Hook Input */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>First 2-3 Seconds Hook (Visual / Audio)</span>
              </label>
              <span className="text-[10.5px] text-cyan-400 font-medium">Critical for 80% of retention</span>
            </div>
            <textarea
              rows={3}
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="The exact first frame words or visual dilemma that stops the scroll..."
              className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition leading-relaxed resize-y"
            />
            <p className="text-[11px] text-slate-400">
              Tip: Avoid introductory intros or branding. The very first frame must display the climax, paradox, or dilemma.
            </p>
          </div>

          {/* Caption / Description Input */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-4 space-y-3">
            <label className="text-xs font-semibold text-slate-200 block">
              Caption, Description & Call-To-Action:
            </label>
            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Full post caption, timestamps, and pinned engagement question..."
              className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition leading-relaxed resize-y"
            />
          </div>

          {/* Pre-Flight Physical Checklist */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Pre-Flight Checklist ({completedChecklistCount}/{totalChecklistCount})
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-cyan-400">
                {Math.round((completedChecklistCount / totalChecklistCount) * 100)}% Complete
              </span>
            </div>

            <div className="space-y-2">
              {[
                { key: 'mobileThumbnail' as const, label: 'Thumbnail text tested at small mobile size (high contrast)' },
                { key: 'firstFramePunch' as const, label: 'First frame has dynamic visual movement (no static pause)' },
                { key: 'noDeadAirIntro' as const, label: 'Intro cut immediately to thesis (0 logo animation)' },
                { key: 'audioBalanced' as const, label: 'Audio loudness normalized (-14 LUFS YouTube / -16 LUFS Reels)' },
                { key: 'captionsEnabled' as const, label: 'Dynamic captions or subtitles rendered for silent viewers' },
                { key: 'clearCta' as const, label: 'Single explicit Call To Action with zero ambiguity' },
                { key: 'pinnedCommentReady' as const, label: 'Engagement prompt drafted for the pinned comment slot' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition text-xs text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.key]}
                    onChange={() => toggleChecklistItem(item.key)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                  />
                  <span className={checklist[item.key] ? 'line-through text-slate-500' : 'text-slate-200'}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Algorithmic Diagnostic & Recommendations */}
        <div className="lg:col-span-6 space-y-5">
          {/* Main Quality Score Gauge Card */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e101c] to-[#07080d] p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  Algorithmic Readiness Score
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {analysis.overallScore >= 85 ? 'High Distribution Potential' : analysis.overallScore >= 70 ? 'Solid Reach Candidate' : 'Requires Revision'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evaluated against benchmark performance in {creatorNiche}.
                </p>
              </div>

              <div className={`flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-2 font-black text-2xl sm:text-3xl shrink-0 ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}
              </div>
            </div>

            {/* 4 Vector Meters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[
                { label: 'Hook Strength', val: analysis.hookStrength },
                { label: 'Title Curiosity', val: analysis.titleClarity },
                { label: 'SEO & Search', val: analysis.keywordRelevance },
                { label: 'Audience Fit', val: analysis.audienceRelevance },
              ].map((v, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="text-[10.5px] text-slate-400 block font-medium">{v.label}</span>
                  <span className="text-lg font-bold text-white mt-1 block">{v.val}%</span>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full ${
                        v.val >= 85 ? 'bg-cyan-400' : v.val >= 70 ? 'bg-indigo-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${v.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Hook Critique Box */}
            <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Retention Diagnostic Verdict</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.hookCritique}
              </p>
            </div>
          </div>

          {/* AI Alternative Hooks Generator */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Higher-Converting Alternative Hooks
                </h3>
              </div>
              <span className="text-[10.5px] text-purple-300 font-medium">A/B Testing Variants</span>
            </div>

            <div className="space-y-2.5">
              {analysis.suggestedBetterHooks.map((altHook, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] p-3.5 hover:border-purple-500/30 hover:bg-purple-500/5 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      "{altHook}"
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/5">
                    <button
                      onClick={() => copyToClipboard(altHook, `hook_${idx}`)}
                      className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
                    >
                      {copiedItem === `hook_${idx}` ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Hook</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleApplyHook(altHook)}
                      className="flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[11px] font-semibold text-purple-300 hover:bg-purple-500/20 transition"
                    >
                      <span>Apply to Draft</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Recommendations */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-5 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Actionable Algorithmic Tweaks
              </h3>
            </div>

            <div className="space-y-2">
              {analysis.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-slate-300 leading-relaxed">
                  <span className="flex h-5 w-5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-[10px] items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discoverability SEO Keywords Cloud */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recommended Search Keywords & Tags
                </h3>
              </div>
              <button
                onClick={() => {
                  const allTags = analysis.keywordSuggestions.map(k => `#${k.replace(/\s+/g, '')}`).join(' ');
                  copyToClipboard(allTags, 'all_tags');
                }}
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
              >
                {copiedItem === 'all_tags' ? 'Copied All Tags!' : 'Copy All Tags'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {analysis.keywordSuggestions.map((kw, i) => (
                <span
                  key={i}
                  onClick={() => copyToClipboard(kw, `kw_${i}`)}
                  className="cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition"
                  title="Click to copy"
                >
                  <span>{kw}</span>
                  {copiedItem === `kw_${i}` && <Check className="h-3 w-3 text-emerald-400" />}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Bridge to Copyright Center */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Commercial Rights & Copyright Gate</h4>
                <p className="text-[11px] text-slate-400">
                  Ensure all music, sponsored trademarks, and fair-use clips are cleared.
                </p>
              </div>
            </div>

            {onNavigateToCopyright && (
              <button
                onClick={onNavigateToCopyright}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition shrink-0"
              >
                <span>Check Rights</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
