import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Music, 
  Video, 
  FileText, 
  ArrowRight, 
  ExternalLink,
  Info,
  Layers,
  Search
} from 'lucide-react';
import { PlatformId } from '../types';
import { getPlatformName } from '../utils/platformHelpers';

interface CopyrightCenterProps {
  onNavigateToAnalyzer?: () => void;
}

export const CopyrightCenter: React.FC<CopyrightCenterProps> = ({ onNavigateToAnalyzer }) => {
  const [platform, setPlatform] = useState<PlatformId>('youtube');
  const [contentText, setContentText] = useState('Background track: Instrumental remix of top 40 song, with 15 seconds of movie trailer B-roll clip, mentioning Nike trademark in title');
  const [isScanning, setIsScanning] = useState(false);

  const [scanResult, setScanResult] = useState<{
    overallStatus: string;
    severityScore: number;
    detectedRisks: Array<{
      category: string;
      item: string;
      severity: 'low' | 'medium' | 'high';
      impact: string;
      solution: string;
    }>;
    safeActionSteps: string[];
    licensingVerdict: string;
  }>({
    overallStatus: 'Moderate Caution',
    severityScore: 62,
    detectedRisks: [
      {
        category: 'Commercial Audio',
        item: 'Top 40 Instrumental Remix',
        severity: 'high',
        impact: 'High probability of YouTube Content ID claim or muted audio on TikTok/IG reels.',
        solution: 'Replace with royalty-free catalog (Epidemic Sound, Artlist, or YouTube Audio Library).'
      },
      {
        category: 'Movie Trailer B-Roll',
        item: '15-second movie clip',
        severity: 'medium',
        impact: 'Borderline fair use. Over 5 seconds without transformative critique triggers automated visual fingerprinting.',
        solution: 'Limit clip to under 4 seconds, add voiceover commentary, or use press-kit B-roll with fair use framing.'
      },
      {
        category: 'Trademark In Title',
        item: '"Nike" mention',
        severity: 'low',
        impact: 'Nominative fair use is allowed for commentary, but avoid implying official brand endorsement.',
        solution: 'Add clear "Independent Review" or disclaimer in the description.'
      }
    ],
    safeActionSteps: [
      'Swap third-party remix with pre-cleared track from YouTube Audio Library or commercial license.',
      'Trim movie trailer clip to under 3.5 seconds with continuous educational voiceover.',
      'Include FTC sponsorship disclosure or non-affiliation note in video description.',
      'Check Content ID status in YouTube Studio draft before releasing video to public.'
    ],
    licensingVerdict: 'The video contains 1 critical commercial audio risk that will jeopardize monetization. Replace background audio before final render.'
  });

  const handleRunScan = async () => {
    if (!contentText.trim()) return;
    setIsScanning(true);

    try {
      const res = await fetch('/api/ai/copyright-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentText,
          platform: getPlatformName(platform),
        })
      });

      const data = await res.json();
      if (data && data.overallStatus) {
        setScanResult(data);
      }
    } catch (err) {
      console.error('Copyright check failed:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const getSeverityBadge = (sev: 'low' | 'medium' | 'high') => {
    switch (sev) {
      case 'high':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-300';
      case 'medium':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
      default:
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Copyright Risk & Monetization Safety Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Scan video elements, music tracks, movie clips, and trademark mentions to prevent Content ID claims.
            </p>
          </div>
        </div>

        {onNavigateToAnalyzer && (
          <button
            onClick={onNavigateToAnalyzer}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition"
          >
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            <span>Pre-Publish Analyzer</span>
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Element Scanner Input */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-2">
                Target Publishing Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['youtube', 'tiktok', 'instagram'] as PlatformId[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium capitalize transition ${
                      platform === p
                        ? 'border-rose-500/40 bg-rose-500/10 text-white font-semibold'
                        : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]'
                    }`}
                  >
                    {getPlatformName(p)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1.5">
                Assets / Audio / B-Roll Used in Video
              </label>
              <textarea
                rows={4}
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                placeholder="List song titles, remix names, movie/show clips, brand logos, or celebrity footage..."
                className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition leading-relaxed resize-y"
              />
            </div>

            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-rose-500/20 hover:from-rose-400 hover:to-amber-500 active:scale-95 transition disabled:opacity-60"
            >
              <Search className={`h-3.5 w-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning Content ID Database...' : 'Run Copyright & Fair-Use Scan'}</span>
            </button>
          </div>

          {/* Safe Harbor Best Practices Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Safe Harbor Creator Rules</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Audio:</strong> Only use tracks from your commercial license subscription or platform audio libraries for sponsored videos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Transformative Clips:</strong> Under US Section 107 Fair Use, clips must be accompanied by explicit critical commentary.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Pre-Flight Check:</strong> Always upload as "Unlisted" for at least 60 minutes so YouTube Content ID finishes its automated pass.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Scan Results */}
        <div className="lg:col-span-6 space-y-5">
          {/* Risk Level Banner */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#120f18] to-[#0a0a12] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Monetization Risk Assessment
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {scanResult.overallStatus}
                </h3>
              </div>

              <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${
                scanResult.severityScore > 60
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                  : scanResult.severityScore > 30
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              }`}>
                Risk Level: {scanResult.severityScore}/100
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {scanResult.licensingVerdict}
            </p>
          </div>

          {/* Detected Risks Breakdown */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-5 space-y-3.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Detected Vulnerabilities ({scanResult.detectedRisks.length})
            </h3>

            <div className="space-y-3">
              {scanResult.detectedRisks.map((risk, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-xs font-bold text-white">{risk.item}</span>
                      <span className="text-[10px] text-slate-400">({risk.category})</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase ${getSeverityBadge(risk.severity)}`}>
                      {risk.severity} risk
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-300">Potential Impact:</strong> {risk.impact}
                  </p>

                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11.5px] text-emerald-300">
                    <strong className="text-white">Recommended Fix:</strong> {risk.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safe Action Steps Checklist */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Action Plan to Guarantee Full Monetization
            </h3>

            <div className="space-y-2">
              {scanResult.safeActionSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02] text-xs text-slate-300">
                  <span className="flex h-5 w-5 rounded-md bg-white/5 text-cyan-400 font-bold text-[10px] items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
