import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Lock, 
  Download, 
  Upload, 
  Trash2, 
  Check, 
  Bell, 
  Sliders, 
  User, 
  Globe, 
  Cpu, 
  Sparkles, 
  Key, 
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  Save,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { CreatorProfile, PlatformConnection, ContentProject, BrandDeal, IncomeRecord, CreatorGoal } from '../types';

interface SettingsPrivacyProps {
  creator: CreatorProfile;
  platforms: PlatformConnection[];
  projects: ContentProject[];
  brandDeals: BrandDeal[];
  incomeRecords: IncomeRecord[];
  goals: CreatorGoal[];
  onUpdateCreator: (updated: Partial<CreatorProfile>) => void;
  onResetData?: () => void;
  onImportData?: (importedData: any) => void;
}

export const SettingsPrivacy: React.FC<SettingsPrivacyProps> = ({
  creator,
  platforms,
  projects,
  brandDeals,
  incomeRecords,
  goals,
  onUpdateCreator,
  onResetData,
  onImportData,
}) => {
  // Active settings section
  const [activeSection, setActiveSection] = useState<'profile' | 'workflow' | 'privacy' | 'notifications' | 'data'>('profile');

  // Profile Form State
  const [name, setName] = useState(creator.name);
  const [handle, setHandle] = useState(creator.handle);
  const [niche, setNiche] = useState(creator.niche);
  const [targetAudience, setTargetAudience] = useState(creator.targetAudience);
  const [bio, setBio] = useState(creator.bio || '');
  const [avatar, setAvatar] = useState(creator.avatar);
  const [currency, setCurrency] = useState(creator.preferredCurrency || 'USD');
  const [country, setCountry] = useState(creator.country || 'United States');

  // Workflow Preferences
  const [weeklyGoal, setWeeklyGoal] = useState<number>(3);
  const [coachTone, setCoachTone] = useState<'strategic' | 'encouraging' | 'aggressive'>('strategic');
  const [autoRepurpose, setAutoRepurpose] = useState(true);
  const [timezone, setTimezone] = useState('America/New_York (EST)');
  const [defaultPlatforms, setDefaultPlatforms] = useState<string[]>(['youtube', 'tiktok', 'twitter']);

  // Privacy & Telemetry Settings
  const [telemetryEnabled, setTelemetryEnabled] = useState(false);
  const [privateVaultEnabled, setPrivateVaultEnabled] = useState(true);
  const [hideFinancialsOnDashboard, setHideFinancialsOnDashboard] = useState(false);

  // Notifications Settings
  const [notifyMorningBriefing, setNotifyMorningBriefing] = useState(true);
  const [notifyPublishWindows, setNotifyPublishWindows] = useState(true);
  const [notifyDealDeadlines, setNotifyDealDeadlines] = useState(true);
  const [notifyTrendSurges, setNotifyTrendSurges] = useState(true);

  // Status message
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Save changes
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateCreator({
      name,
      handle,
      niche,
      targetAudience,
      bio,
      avatar,
      preferredCurrency: currency,
      country,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Export all Workspace Data as JSON
  const handleExportWorkspace = () => {
    const exportData = {
      version: '2.4',
      exportDate: new Date().toISOString(),
      creator: {
        ...creator,
        name,
        handle,
        niche,
        targetAudience,
        bio,
        preferredCurrency: currency,
      },
      workflowPreferences: {
        weeklyGoal,
        coachTone,
        autoRepurpose,
        timezone,
        defaultPlatforms,
      },
      privacySettings: {
        telemetryEnabled,
        privateVaultEnabled,
        hideFinancialsOnDashboard,
      },
      projects,
      brandDeals,
      incomeRecords,
      goals,
      platforms: platforms.map(p => ({
        platform: p.platform,
        name: p.name,
        handle: p.handle,
        connected: p.connected,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `creatorhub-backup-${name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Import JSON
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.creator && onImportData) {
          onImportData(parsed);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2500);
        } else if (parsed.creator) {
          onUpdateCreator(parsed.creator);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2500);
        }
      } catch (err) {
        alert('Invalid JSON backup file. Please select a valid CreatorHub export.');
      }
    };
    reader.readAsText(file);
  };

  const toggleDefaultPlatform = (plat: string) => {
    setDefaultPlatforms(prev => 
      prev.includes(plat) ? prev.filter(p => p !== plat) : [...prev, plat]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Settings & Privacy
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage your creator profile, publishing preferences, privacy vault, and workspace backups.
            </p>
          </div>
        </div>

        {/* Global Save Button */}
        <button
          onClick={() => handleSaveProfile()}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-cyan-400 hover:to-indigo-500 active:scale-95 transition"
        >
          <Save className="h-3.5 w-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>All settings and preferences have been updated and persisted securely.</span>
        </div>
      )}

      {/* Layout: Section Navigation Tabs & Form Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Nav Tabs */}
        <div className="lg:col-span-3 space-y-1.5">
          {[
            { id: 'profile' as const, label: 'Creator Profile', icon: User, desc: 'Identity & niche info' },
            { id: 'workflow' as const, label: 'Workflow & Automation', icon: Sliders, desc: 'Platforms & schedule' },
            { id: 'privacy' as const, label: 'Privacy & Security', icon: Shield, desc: 'Local vault & tokens' },
            { id: 'notifications' as const, label: 'Cadence & Alerts', icon: Bell, desc: 'Briefings & reminders' },
            { id: 'data' as const, label: 'Data & Portability', icon: Database, desc: 'Export & backup JSON' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                  isActive
                    ? 'border-indigo-500/40 bg-indigo-500/15 text-white font-semibold shadow-sm shadow-indigo-500/10'
                    : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-semibold text-white">{tab.label}</div>
                  <div className="text-[10px] text-slate-400">{tab.desc}</div>
                </div>
              </button>
            );
          })}

          {/* Local-First Storage Badge */}
          <div className="mt-4 rounded-xl border border-white/5 bg-[#0a0b12] p-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px] mb-1">
              <Lock className="h-3.5 w-3.5" />
              <span>Zero-Leak Private Vault</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Your unreleased scripts, private deals, and brand pricing are kept strictly local to your workspace.
            </p>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-9">
          {/* SECTION 1: CREATOR PROFILE */}
          {activeSection === 'profile' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-6 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white">Creator Identity & Channel Profile</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  This context calibrates the AI Creator Coach, hook evaluations, and trend discovery.
                </p>
              </div>

              {/* Avatar & Display Preview */}
              <div className="flex items-center gap-4">
                <img
                  src={avatar}
                  alt={name}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/20"
                />
                <div className="space-y-1.5 flex-1 max-w-md">
                  <label className="text-xs font-semibold text-slate-300">Avatar Image URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#080910] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Channel Handle</label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Primary Niche / Category</label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g. AI & Tech Workflows, Fitness, Finance"
                    className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Preferred Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                  >
                    <option value="USD">$ USD (US Dollar)</option>
                    <option value="EUR">€ EUR (Euro)</option>
                    <option value="GBP">£ GBP (British Pound)</option>
                    <option value="CAD">$ CAD (Canadian Dollar)</option>
                    <option value="AUD">$ AUD (Australian Dollar)</option>
                    <option value="INR">₹ INR (Indian Rupee)</option>
                    <option value="JPY">¥ JPY (Japanese Yen)</option>
                  </select>
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Audience Description</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Tech professionals, solopreneurs, and curious developers"
                  className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              {/* Bio & Channel Thesis */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Channel Bio & Mission Statement</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Empowering solo creators with high-efficiency autonomous workflows and real-time distribution..."
                  className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-y"
                />
              </div>
            </div>
          )}

          {/* SECTION 2: WORKFLOW & AUTOMATION */}
          {activeSection === 'workflow' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-6 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white">Publishing Workflow & OS Automation</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure default targets, AI coaching rigor, and repurposing triggers.
                </p>
              </div>

              {/* Default Platforms Selection */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Default Platforms for New Projects:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'youtube', label: 'YouTube' },
                    { id: 'tiktok', label: 'TikTok' },
                    { id: 'instagram', label: 'Instagram' },
                    { id: 'twitter', label: 'X / Twitter' },
                    { id: 'linkedin', label: 'LinkedIn' },
                  ].map((p) => {
                    const isChecked = defaultPlatforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => toggleDefaultPlatform(p.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition ${
                          isChecked
                            ? 'border-cyan-500/40 bg-cyan-500/10 text-white font-semibold'
                            : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{p.label}</span>
                        {isChecked && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Publishing Cadence & AI Coach Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Publishing Cadence</label>
                  <select
                    value={weeklyGoal}
                    onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                  >
                    <option value={1}>1 piece / week (Deep Research & Polish)</option>
                    <option value={2}>2 pieces / week (Balanced Growth)</option>
                    <option value={3}>3 pieces / week (High Velocity Standard)</option>
                    <option value={5}>5 pieces / week (Aggressive Daily Cadence)</option>
                    <option value={7}>7+ pieces / week (Full Media Company)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">AI Coach Strategic Rigor</label>
                  <select
                    value={coachTone}
                    onChange={(e) => setCoachTone(e.target.value as any)}
                    className="w-full rounded-xl border border-white/10 bg-[#080910] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                  >
                    <option value="strategic">Strategic & Direct (Zero Fluff, Data First)</option>
                    <option value="encouraging">Supportive Growth Partner (Motivational)</option>
                    <option value="aggressive">Algorithmic Hacker (High Retention Focus)</option>
                  </select>
                </div>
              </div>

              {/* Automation Toggles */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div>
                    <h4 className="text-xs font-semibold text-white">Auto-Generate Repurposed Variations</h4>
                    <p className="text-[11px] text-slate-400">
                      Instantly draft native vertical video and thread formats whenever you save a long-form project.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoRepurpose}
                    onChange={(e) => setAutoRepurpose(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div>
                    <h4 className="text-xs font-semibold text-white">Audience Timezone Normalization</h4>
                    <p className="text-[11px] text-slate-400">
                      Calibrate calendar recommendations against prime viewer activity windows.
                    </p>
                  </div>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="rounded-lg border border-white/10 bg-[#080910] px-2.5 py-1 text-xs text-white"
                  >
                    <option value="America/New_York (EST)">New York (EST)</option>
                    <option value="America/Los_Angeles (PST)">Los Angeles (PST)</option>
                    <option value="Europe/London (GMT)">London (GMT)</option>
                    <option value="Asia/Kolkata (IST)">India (IST)</option>
                    <option value="Asia/Tokyo (JST)">Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: PRIVACY & SECURITY */}
          {activeSection === 'privacy' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-6 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white">Privacy, Security & Data Sovereignty</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your intellectual property, brand contracts, and audience data are protected by design.
                </p>
              </div>

              {/* Security Pillars Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                    <Shield className="h-4 w-4" />
                    <span>Local-First Private Sandbox</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unreleased video scripts, sponsor contracts, and brand deal deliverables are stored securely in your private workspace sandbox.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                    <Cpu className="h-4 w-4" />
                    <span>Ephemeral AI Diagnostics</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pre-publish analyses and retention hook audits are processed ephemerally on dedicated backend instances with zero public data training.
                  </p>
                </div>
              </div>

              {/* Privacy Toggles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div>
                    <h4 className="text-xs font-semibold text-white">Hide Financial & Brand Deal Totals</h4>
                    <p className="text-[11px] text-slate-400">
                      Mask exact revenue numbers on the dashboard when screen sharing or recording live streams.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={hideFinancialsOnDashboard}
                    onChange={(e) => setHideFinancialsOnDashboard(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div>
                    <h4 className="text-xs font-semibold text-white">Contribute Anonymous Trend Telemetry</h4>
                    <p className="text-[11px] text-slate-400">
                      Share anonymized topic velocity signals to improve collective Trend Radar velocity scores.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={telemetryEnabled}
                    onChange={(e) => setTelemetryEnabled(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              {/* Connected Accounts Security Status */}
              <div className="pt-2 border-t border-white/5 space-y-2.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Platform OAuth Token Health
                </h4>
                <div className="space-y-2">
                  {platforms.map((p) => (
                    <div key={p.platform} className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.01] text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white capitalize">{p.name}</span>
                        <span className="text-slate-400">({p.handle})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-md border ${
                          p.connected 
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' 
                            : 'border-slate-700 bg-slate-800 text-slate-400'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${p.connected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                          {p.connected ? 'Token Active' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: CADENCE & ALERTS */}
          {activeSection === 'notifications' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-6 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white">Cadence & Production Alerts</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Stay ahead of publication windows, brand sponsorship invoices, and viral breakout opportunities.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Daily "What Should I Do Next?" Morning Briefing',
                    desc: 'Evaluates your calendar deadlines and unread retention hooks every morning at 8:00 AM.',
                    state: notifyMorningBriefing,
                    setter: setNotifyMorningBriefing,
                  },
                  {
                    title: 'Publishing Window Warning (3 Hours Prior)',
                    desc: 'Alerts you 3 hours before peak algorithmic audience activity to finalize video packaging.',
                    state: notifyPublishWindows,
                    setter: setNotifyPublishWindows,
                  },
                  {
                    title: 'Brand Sponsorship Net-30 Invoice Reminders',
                    desc: 'Notifies you when deliverables are awaiting brand sign-off or invoice payouts are overdue.',
                    state: notifyDealDeadlines,
                    setter: setNotifyDealDeadlines,
                  },
                  {
                    title: 'Trend Radar Velocity Spikes (+200% Breakouts)',
                    desc: 'Pings when a high-momentum keyword surges in your specific niche.',
                    state: notifyTrendSurges,
                    setter: setNotifyTrendSurges,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div>
                      <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: DATA PORTABILITY & WORKSPACE */}
          {activeSection === 'data' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0d16] p-6 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white">Data Portability & Workspace Management</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Export complete backups of your projects, brand deals, and analytics in standardized JSON.
                </p>
              </div>

              {/* Data Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Projects</span>
                  <span className="text-lg font-bold text-white block mt-0.5">{projects.length}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Brand Deals</span>
                  <span className="text-lg font-bold text-white block mt-0.5">{brandDeals.length}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Income Logs</span>
                  <span className="text-lg font-bold text-white block mt-0.5">{incomeRecords.length}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Platforms</span>
                  <span className="text-lg font-bold text-white block mt-0.5">{platforms.filter(p => p.connected).length}/{platforms.length}</span>
                </div>
              </div>

              {/* Backup & Restore Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-white">Export Full Workspace Backup</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Download an offline copy of your creator profile, video projects, brand sponsorship details, and calendar items.
                  </p>
                  <button
                    onClick={handleExportWorkspace}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Workspace (.json)</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-purple-400" />
                    <h4 className="text-xs font-bold text-white">Restore Workspace Backup</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Load a previously exported CreatorHub JSON file to restore your projects, profile, and deals.
                  </p>
                  <label className="w-full flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition cursor-pointer">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Select Backup File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileImport}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Danger Zone: Reset Workspace */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-rose-500/30 bg-rose-500/5">
                  <div>
                    <h4 className="text-xs font-bold text-rose-300">Reset Local Storage & Seed Data</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Clear cached local data and restore the initial CreatorHub template state.
                    </p>
                  </div>
                  
                  {resetConfirmOpen ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setResetConfirmOpen(false)}
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-300 hover:bg-white/10"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          if (onResetData) {
                            onResetData();
                          } else {
                            window.location.reload();
                          }
                        }}
                        className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-500"
                      >
                        Confirm Reset
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setResetConfirmOpen(true)}
                      className="flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Reset Data</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
