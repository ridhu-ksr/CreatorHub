import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Bot, 
  Flame, 
  Repeat, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle, 
  Layers, 
  Calendar, 
  DollarSign, 
  Lock,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { getPlatformIcon } from '../utils/platformHelpers';
import { PlatformId } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreWorkspace: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onExploreWorkspace
}) => {
  const supportedPlatforms: PlatformId[] = ['youtube', 'instagram', 'tiktok', 'twitter', 'linkedin', 'facebook', 'pinterest'];

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      {/* Aurora Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-10 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[160px] pointer-events-none" />
      <div className="absolute top-[800px] left-10 -z-10 h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-[180px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080d]/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onExploreWorkspace}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center p-[1px]">
              <div className="h-full w-full bg-[#0d0e17] rounded-[11px] flex items-center justify-center">
                <Zap className="h-4 w-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white font-sans">
              Creator<span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Hub</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#problem" className="hover:text-cyan-400 transition">The Problem</a>
            <a href="#coach" className="hover:text-cyan-400 transition">AI Coach</a>
            <a href="#engine" className="hover:text-cyan-400 transition">What Next?</a>
            <a href="#repurpose" className="hover:text-cyan-400 transition">Repurposing</a>
            <a href="#business" className="hover:text-cyan-400 transition">Business</a>
            <a href="#security" className="hover:text-cyan-400 transition">Security</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreWorkspace}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition"
            >
              Live Demo
            </button>
            <button
              onClick={onGetStarted}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-cyan-400 hover:to-indigo-500 active:scale-95 transition-all"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-8 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Next-Generation Creator Operating System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] font-sans">
          ONE HUB.<br />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
            EVERY PLATFORM.
          </span><br />
          ENDLESS CREATIVITY.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Manage your entire creative journey from one intelligent workspace. Turn raw performance data into prioritized daily actions and automated cross-platform distribution.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 hover:opacity-95 active:scale-95 transition-all"
          >
            <span>Get Started with CreatorHub</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onExploreWorkspace}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-md transition-all"
          >
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>Explore Live Command Center</span>
          </button>
        </div>

        {/* Multi-platform pill ticker */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-semibold text-slate-400 mr-2">Integrates seamlessly with:</span>
          {supportedPlatforms.map((p) => (
            <div key={p} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
              {getPlatformIcon(p, 'w-3.5 h-3.5')}
              <span className="capitalize">{p}</span>
            </div>
          ))}
        </div>

        {/* Interactive Preview Mockup Card */}
        <div className="mt-16 rounded-2xl border border-white/15 bg-[#0b0d18]/90 p-3 sm:p-5 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl max-w-5xl mx-auto text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">creatorhub.os // command-center</span>
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-md">
              Live OS Engine Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-950/40 to-slate-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" /> What Should I Do Next?
                </span>
                <span className="text-[11px] text-slate-400">Calculated from 32 Signals</span>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">🔴 High Priority: Publish Scheduled Reel</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">Peak follower engagement window starts in 3 hours. 28% higher retention detected.</p>
                  </div>
                  <span className="text-xs font-bold text-rose-300">Score 94</span>
                </div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">🟠 Content Opportunity: Follow-up Tutorial</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">Your recent breakdown beat 30-day view baseline by +48%. Viewer questions show high demand.</p>
                  </div>
                  <span className="text-xs font-bold text-amber-300">Score 88</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-[#121524] p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5" /> AI Creator Coach
                </span>
                <p className="text-xs text-slate-300 mt-3 italic leading-relaxed">
                  "Good afternoon! Your educational short-form content has performed 35% above recent average. I prepared 3 hook variations for your upcoming tech reel."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">CreatorHub Score:</span>
                <span className="font-bold text-white">84 / 100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">The Creator Bottleneck</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Why Modern Creators Get Overwhelmed
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Solo creators and creative teams are forced to juggle disconnected tools and fragmented analytics without a unified operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Scattered Platforms</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Managing 6+ distinct apps for drafting, scheduling, DMing, analytics, and accounting drains up to 15 hours every week on repetitive manual work.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Confusing Vanity Metrics</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Creators see endless charts and impressions, but traditional dashboards fail to tell them: <span className="text-white font-semibold">what do these numbers actually mean, and what should I do next?</span>
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Monetization Blindspots</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Brand deal deliverables, delayed invoices, affiliate links, and platform ad payouts are scattered across messy spreadsheets and email threads.
            </p>
          </div>
        </div>
      </section>

      {/* The Intelligence Engine Section */}
      <section id="engine" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-4">
              <Cpu className="h-3.5 w-3.5" />
              <span>The Creator Intelligence Cycle</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              An Engine That Answers:<br />
              <span className="text-cyan-400">"What Should I Create, Do, and Improve Next?"</span>
            </h2>
            <p className="text-slate-300 mt-4 text-sm leading-relaxed">
              CreatorHub doesn't just show historical tables. Our recommendation engine mathematically models your upcoming deadlines, incomplete projects, recent audience velocity, and target revenue goals.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300"><strong className="text-white">Transparent Priority Scoring:</strong> Combines Urgency, Potential Impact, Goal Relevance, and Content Opportunity.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300"><strong className="text-white">Action-First Execution:</strong> Every insight has a 1-click execution button into the workspace, repurpose engine, or analyzer.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300"><strong className="text-white">Continuous Feedback Loop:</strong> New performance data continuously re-trains recommendations for your specific niche.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e111d] to-[#080a14] p-6 shadow-xl relative">
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>INPUT SIGNALS</span>
                  <span className="text-cyan-400">INTELLIGENCE STACK</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded bg-white/[0.04] p-2 text-slate-300">✓ Creator Goals</div>
                  <div className="rounded bg-white/[0.04] p-2 text-slate-300">✓ Incomplete Projects</div>
                  <div className="rounded bg-white/[0.04] p-2 text-slate-300">✓ 30-Day Metrics</div>
                  <div className="rounded bg-white/[0.04] p-2 text-slate-300">✓ Publishing Deadlines</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-400 to-indigo-500" />
              </div>

              <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-4 text-center">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Creator Intelligence Engine</span>
                <p className="text-xs text-white font-mono mt-1">Priority = Urgency + Impact + Goal Fit + Trend</p>
              </div>

              <div className="flex justify-center">
                <div className="h-8 w-0.5 bg-gradient-to-b from-indigo-500 to-emerald-400" />
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold text-white">4 Prioritized High-Leverage Actions Delivered</span>
                </div>
                <span className="text-emerald-300 font-mono">1-Click Run</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Repurposing & Features Grid */}
      <section id="repurpose" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">Multiplier Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Create Once. Adapt Everywhere.
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Never copy and paste the same text. CreatorHub natively reformats your core message for the unique algorithmic psychology of YouTube, Instagram, TikTok, X, LinkedIn, and Facebook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition">
            <Repeat className="h-6 w-6 text-purple-400 mb-3" />
            <h3 className="text-base font-bold text-white">Multi-Format Repurposing</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Transform one YouTube script into 9:16 vertical reels, 10-post Twitter threads, visual LinkedIn slides, and searchable descriptions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition">
            <CheckCircle className="h-6 w-6 text-cyan-400 mb-3" />
            <h3 className="text-base font-bold text-white">Pre-Publish Hook Analyzer</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Audit opening lines, title clarity, audience relevance, and SEO keywords before publishing to maximize early retention velocity.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition">
            <Calendar className="h-6 w-6 text-indigo-400 mb-3" />
            <h3 className="text-base font-bold text-white">Unified Content Calendar</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Multi-platform deadline tracker with smart posting time recommendations based on historical audience peak activity.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition">
            <DollarSign className="h-6 w-6 text-emerald-400 mb-3" />
            <h3 className="text-base font-bold text-white">Creator Business & CRM</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Track official AdSense payouts, brand deal milestones, sponsorship contracts, digital product revenue, and creator goals.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition">
            <TrendingUp className="h-6 w-6 text-amber-400 mb-3" />
            <h3 className="text-base font-bold text-white">Trend Radar & Angles</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Detect rising breakout queries in your niche, explore suggested content angles, and convert opportunities into projects with one click.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition">
            <ShieldCheck className="h-6 w-6 text-rose-400 mb-3" />
            <h3 className="text-base font-bold text-white">Copyright & Risk Center</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Flag commercial audio licensing restrictions and fair-use video concerns before posting sponsored brand content.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Strict Real Data Policy */}
      <section id="security" className="py-16 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-indigo-950/30 p-8 sm:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="h-4 w-4" />
                <span>Zero Fake Data Policy & Authentic Security</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Built on Official APIs and Transparent Labels</h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                CreatorHub never requests or stores your social-media passwords. We use official OAuth authorization, strictly isolate creator data, and clearly distinguish between official verified earnings and user-entered estimates.
              </p>
            </div>

            <button
              onClick={onGetStarted}
              className="shrink-0 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 text-xs active:scale-95 transition-all"
            >
              Launch Your Workspace
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-300">CreatorHub OS</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onExploreWorkspace} className="hover:text-slate-300 transition">Command Center</button>
          <a href="#coach" className="hover:text-slate-300 transition">AI Coach</a>
          <a href="#repurpose" className="hover:text-slate-300 transition">Repurposing</a>
          <a href="#security" className="hover:text-slate-300 transition">Security & Privacy</a>
        </div>
      </footer>
    </div>
  );
};
