import React, { useState } from 'react';
import { 
  Repeat, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  RefreshCw, 
  Wand2, 
  CheckCircle2, 
  FileText, 
  Share2,
  ChevronDown
} from 'lucide-react';
import { PlatformId, ContentProject, PlatformContentVersion } from '../types';
import { getPlatformIcon, getPlatformName, getPlatformBadgeColor } from '../utils/platformHelpers';

interface RepurposeEngineProps {
  projects: ContentProject[];
  creatorNiche: string;
  onSaveToProject: (projectId: string, versions: Record<PlatformId, PlatformContentVersion>) => void;
}

const ALL_TARGET_PLATFORMS: PlatformId[] = ['youtube', 'instagram', 'tiktok', 'twitter', 'linkedin', 'facebook'];

export const RepurposeEngine: React.FC<RepurposeEngineProps> = ({
  projects,
  creatorNiche,
  onSaveToProject
}) => {
  const [sourceText, setSourceText] = useState(
    projects[0]?.script || '5 AI Tools Every Creative Solo-Builder Needs to Master:\n\n1. Autonomous agent for cross-platform adaptation.\n2. Local small language models for zero-subscription writing.\n3. Automatic b-roll and screen-pacing synthesizer.\n4. Sound design audio generator.\n5. Pre-publish retention predictor.\n\nThe real leverage is not working harder, but letting automated pipelines handle the distribution friction.'
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>([
    'youtube', 'instagram', 'tiktok', 'twitter', 'linkedin'
  ]);
  const [isRepurposing, setIsRepurposing] = useState(false);
  const [generatedVersions, setGeneratedVersions] = useState<Record<string, PlatformContentVersion>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveConfirmation, setSaveConfirmation] = useState(false);

  const togglePlatform = (p: PlatformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  const handleSelectExistingProject = (projId: string) => {
    setSelectedProjectId(projId);
    const p = projects.find(item => item.id === projId);
    if (p) {
      setSourceText(p.script || `${p.title}\n\n${p.description}`);
    }
  };

  const handleRunRepurpose = async () => {
    if (!sourceText.trim() || selectedPlatforms.length === 0) return;
    setIsRepurposing(true);
    setSaveConfirmation(false);

    try {
      const res = await fetch('/api/ai/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceContent: sourceText,
          sourcePlatform: 'General Tutorial',
          targetPlatforms: selectedPlatforms,
          niche: creatorNiche
        })
      });

      const data = await res.json();
      if (data.versions) {
        setGeneratedVersions(data.versions);
      }
    } catch (err) {
      console.error('Error repurposing:', err);
    } finally {
      setIsRepurposing(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveToSelectedProject = () => {
    if (!selectedProjectId || Object.keys(generatedVersions).length === 0) return;
    onSaveToProject(selectedProjectId, generatedVersions as any);
    setSaveConfirmation(true);
    setTimeout(() => setSaveConfirmation(false), 3500);
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Repeat className="h-4 w-4" /> Multiplier Engine
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400">Algorithmic Psychology Tailored</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Content Repurposing Engine
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Create Once, Adapt Everywhere. We don't copy-paste; our engine rewrites hook pacing, formatting, and CTAs natively for each platform.
        </p>
      </div>

      {/* Input Stage Container */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-bold text-white flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-400" />
            <span>1. Select or Paste Original Source Content</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Load from Project:</span>
            <select
              value={selectedProjectId}
              onChange={(e) => handleSelectExistingProject(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#141724] py-1 px-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none max-w-[220px] truncate"
            >
              <option value="">Custom Paste Input</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          rows={5}
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Paste a video script transcript, newsletter issue, or blog summary..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none font-mono leading-relaxed"
        />

        {/* Target Platforms Selection */}
        <div>
          <label className="block text-xs font-bold text-white mb-2">
            2. Choose Target Platforms to Adapt For:
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ALL_TARGET_PLATFORMS.map(p => {
              const isSelected = selectedPlatforms.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs transition ${
                    isSelected
                      ? 'border-purple-500/50 bg-purple-500/20 text-purple-200 font-semibold shadow-sm'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]'
                  }`}
                >
                  {getPlatformIcon(p, 'w-4 h-4')}
                  <span>{getPlatformName(p)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Trigger */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Adapting for {selectedPlatforms.length} platforms simultaneously.
          </span>
          <button
            onClick={handleRunRepurpose}
            disabled={isRepurposing || !sourceText.trim() || selectedPlatforms.length === 0}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:opacity-95 disabled:opacity-50 transition"
          >
            {isRepurposing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
            <span>{isRepurposing ? 'Adapting with Gemini AI...' : 'Generate Platform-Native Versions'}</span>
          </button>
        </div>
      </div>

      {/* Generated Versions Side-by-Side Grid */}
      {Object.keys(generatedVersions).length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Tailored Platform Deliverables</span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5">
                  Ready for Review
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Review each native format before scheduling or copy directly to your clipboard.
              </p>
            </div>

            {selectedProjectId && (
              <button
                onClick={handleSaveToSelectedProject}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Save All Versions to Project</span>
              </button>
            )}
          </div>

          {saveConfirmation && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Platform versions successfully saved to project!</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(generatedVersions).map(([platKey, v]) => {
              const version = v as PlatformContentVersion;
              const pId = platKey as PlatformId;
              return (
                <div
                  key={platKey}
                  className="rounded-2xl border border-white/10 bg-[#0b0d18] p-5 flex flex-col justify-between space-y-3 hover:border-white/20 transition shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(pId, 'w-4 h-4')}
                        <span className="text-xs font-bold text-white">{getPlatformName(pId)}</span>
                      </div>
                      <span className="text-[10.5px] text-slate-400 font-mono">
                        {version.formatSuggestion || 'Native Post'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10.5px] font-bold text-slate-400 uppercase">Title / Hook</span>
                        <button
                          onClick={() => handleCopy(version.title, `${platKey}_title`)}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          {copiedKey === `${platKey}_title` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>Copy Title</span>
                        </button>
                      </div>
                      <p className="text-xs font-bold text-white leading-snug">
                        {version.title}
                      </p>
                    </div>

                    {version.hook && (
                      <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-2 text-[11px] text-cyan-200">
                        <strong className="text-cyan-300">Opening Hook: </strong>
                        {version.hook}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10.5px] font-bold text-slate-400 uppercase">Caption / Script</span>
                        <button
                          onClick={() => handleCopy(version.caption, `${platKey}_cap`)}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          {copiedKey === `${platKey}_cap` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>Copy Text</span>
                        </button>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                        {version.caption}
                      </div>
                    </div>

                    {version.hashtags && version.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {version.hashtags.map((tag, idx) => (
                          <span key={idx} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {version.callToAction && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate">CTA: {version.callToAction}</span>
                      <button
                        onClick={() => handleCopy(`${version.title}\n\n${version.caption}\n\n${version.hashtags?.join(' ')}`, `${platKey}_all`)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 shrink-0 ml-2"
                      >
                        {copiedKey === `${platKey}_all` ? 'Copied!' : 'Copy Entire Post'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
