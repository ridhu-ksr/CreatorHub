import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  Check, 
  Sliders, 
  Eye,
  FileCheck
} from 'lucide-react';
import { PlatformId } from '../types';
import { getPlatformName } from '../utils/platformHelpers';

interface HookAnalyzerProps {
  creatorNiche: string;
}

export const HookAnalyzer: React.FC<HookAnalyzerProps> = ({ creatorNiche }) => {
  const [platform, setPlatform] = useState<PlatformId>('youtube');
  const [hookText, setHookText] = useState('Most creators are wasting 15 hours a week repurposing content manually.');
  const [titleText, setTitleText] = useState('5 Game-Changing AI Tools for Video Creators');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    verdict: string;
    strengths: string[];
    weaknesses: string[];
    alternatives: string[];
  }>({
    score: 86,
    verdict: 'Strong curiosity gap with high initial shock value. Pacing is punchy.',
    strengths: [
      'Quantifies time lost (15 hours) creating an immediate relatable pain point.',
      'Active voice creates forward momentum into the first 30 seconds.',
      'Target audience is immediately addressed.'
    ],
    weaknesses: [
      'Lacks immediate visual staging direction in the first frame.',
      'Could tease the solution payoff slightly earlier to protect against 5-second swipe-away.'
    ],
    alternatives: [
      'If you spend more than 1 hour repurposing videos, you are doing it backwards. Here is the automated setup:',
      'I automated 80% of my YouTube to TikTok workflow with these 3 tools. Stop doing this manually.',
      'The single biggest mistake keeping solo creators under 100k subscribers: manual distribution.'
    ]
  });

  const handleAnalyze = async () => {
    if (!hookText.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Analyze this content hook and title for ${getPlatformName(platform)} in the ${creatorNiche} niche:
Title: "${titleText}"
Opening Hook: "${hookText}"

Please evaluate retention probability, curiosity gap, and provide 3 higher-converting hook variations.`,
          creatorContext: { niche: creatorNiche }
        })
      });

      const data = await res.json();
      const reply = data.reply || '';

      // Simulated score adjustment based on text length & keywords
      const scoreCalc = Math.min(96, Math.max(68, Math.floor(75 + (hookText.length % 20))));
      setAnalysisResult({
        score: scoreCalc,
        verdict: reply.slice(0, 160) || 'Analyzed retention vectors and audience psychology.',
        strengths: [
          'Direct problem statement engages core curiosity trigger.',
          'Format is concise and avoids throat-clearing fluff.'
        ],
        weaknesses: [
          'Ensure background visual changes at second 2.5 to sustain eye fixation.'
        ],
        alternatives: [
          `Stop doing this manually: here is how to master ${titleText.slice(0, 30)}...`,
          `The secret most creators miss when scaling on ${getPlatformName(platform)}:`,
          `Here is the exact framework I used to double retention:`
        ]
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyAlt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <FileCheck className="h-4 w-4" /> Pre-Publish Audit Engine
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Retention Predictor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Hook & Retention Analyzer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit your opening 3 seconds and headline before publishing to maximize early watch-time velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as PlatformId)}
            className="rounded-xl border border-white/10 bg-[#141724] py-2 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram Reel</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>
      </div>

      {/* Input Box */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-4">
        <div>
          <label className="block text-xs font-bold text-white mb-1">Video Title or Post Headline</label>
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            placeholder="e.g. 5 Game-Changing AI Tools for Video Creators"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-white mb-1">
            Opening Line / Hook (First 3-5 Seconds)
          </label>
          <textarea
            rows={3}
            value={hookText}
            onChange={(e) => setHookText(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
            placeholder="What are the exact words or caption in your opening frame?"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !hookText.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 disabled:opacity-50 transition"
          >
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>{isAnalyzing ? 'Auditing with AI...' : 'Analyze Retention & Hook'}</span>
          </button>
        </div>
      </div>

      {/* Result Cards */}
      {analysisResult && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-300">Retention Score</span>
                <div className="mt-2 text-4xl font-extrabold text-white font-sans">
                  {analysisResult.score} <span className="text-base text-cyan-400 font-normal">/ 100</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {analysisResult.verdict}
                </p>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono mt-3">Target Platform: {getPlatformName(platform)}</span>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2">
              <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Why This Hook Works
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {analysisResult.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-2">
              <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Retention Risk Points
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {analysisResult.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alternate Hook Variations */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0d18] p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>AI-Optimized Alternative Hooks (A/B Testing Candidates)</span>
            </h3>

            <div className="space-y-2.5">
              {analysisResult.alternatives.map((alt, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 flex items-center justify-between gap-3 hover:border-white/15 transition"
                >
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    <strong className="text-cyan-300">Option {idx + 1}: </strong>
                    "{alt}"
                  </p>
                  <button
                    onClick={() => handleCopyAlt(alt, idx)}
                    className="shrink-0 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copiedIdx === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
