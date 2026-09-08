import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  Tag, 
  CheckCircle2, 
  Trash2, 
  Layers, 
  Wand2, 
  Copy, 
  Check,
  RefreshCw
} from 'lucide-react';
import { ContentProject, PlatformId, ProjectStatus } from '../types';
import { getPlatformIcon, getPlatformName, getPlatformBadgeColor } from '../utils/platformHelpers';

interface ProjectModalProps {
  isOpen: boolean;
  project: ContentProject | null;
  onClose: () => void;
  onSave: (saved: ContentProject) => void;
  onDelete?: (id: string) => void;
  creatorNiche: string;
}

const ALL_PLATFORMS: PlatformId[] = ['youtube', 'instagram', 'tiktok', 'twitter', 'linkedin', 'facebook', 'pinterest'];

const ALL_STATUSES: { id: ProjectStatus; label: string }[] = [
  { id: 'idea', label: 'Idea' },
  { id: 'planning', label: 'Planning' },
  { id: 'creating', label: 'Creating' },
  { id: 'ready_for_review', label: 'Ready for Review' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'published', label: 'Published' },
  { id: 'analyzing', label: 'Analyzing' },
  { id: 'completed', label: 'Completed' },
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
  onDelete,
  creatorNiche
}) => {
  if (!isOpen) return null;

  const isEditing = !!project?.id;

  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [topic, setTopic] = useState(project?.topic || '');
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'idea');
  const [targetPlatforms, setTargetPlatforms] = useState<PlatformId[]>(
    project?.targetPlatforms || ['youtube', 'instagram']
  );
  const [scheduledDate, setScheduledDate] = useState(project?.scheduledDate || '');
  const [scheduledTime, setScheduledTime] = useState(project?.scheduledTime || '18:00');
  const [script, setScript] = useState(project?.script || '');
  const [tagsInput, setTagsInput] = useState(project?.tags?.join(', ') || '');
  const [selectedPlatformTab, setSelectedPlatformTab] = useState<PlatformId>(
    targetPlatforms[0] || 'youtube'
  );

  // Platform specific versions state
  const [platformVersions, setPlatformVersions] = useState<ContentProject['platformVersions']>(
    project?.platformVersions || ({} as any)
  );

  // AI Assistant in modal
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const togglePlatform = (p: PlatformId) => {
    setTargetPlatforms(prev => {
      const next = prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p];
      if (!next.includes(selectedPlatformTab) && next.length > 0) {
        setSelectedPlatformTab(next[0]);
      }
      return next;
    });
  };

  const handleGenerateAIScript = async () => {
    if (!title && !topic) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: selectedPlatformTab,
          contentType: 'Video / Post Script',
          topic: topic || title,
          niche: creatorNiche,
          tone: 'Engaging, direct, high retention',
          targetAudience: 'Digital creators and enthusiasts'
        })
      });
      const data = await res.json();
      if (data.script) {
        setScript(data.script);
      }
      if (data.titles && data.titles[0] && !title) {
        setTitle(data.titles[0]);
      }
      if (data.hashtags) {
        const currentVersion = platformVersions[selectedPlatformTab] || {
          platform: selectedPlatformTab,
          title: title,
          caption: '',
          hashtags: [],
          callToAction: data.callToAction || '',
          formatSuggestion: ''
        };
        setPlatformVersions(prev => ({
          ...prev,
          [selectedPlatformTab]: {
            ...currentVersion,
            title: title || data.titles?.[0] || '',
            caption: data.script ? data.script.slice(0, 300) : currentVersion.caption,
            hashtags: data.hashtags || [],
            callToAction: data.callToAction || currentVersion.callToAction,
          }
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const savedProject: ContentProject = {
      id: project?.id || `proj_${Date.now()}`,
      title: title || 'Untitled Project',
      description,
      topic: topic || 'General Topic',
      niche: creatorNiche,
      status,
      targetPlatforms: targetPlatforms.length > 0 ? targetPlatforms : ['youtube'],
      scheduledDate: scheduledDate || undefined,
      scheduledTime: scheduledTime || undefined,
      script,
      tags: tags.length > 0 ? tags : ['Content'],
      platformVersions,
      metrics: project?.metrics,
      createdAt: project?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSave(savedProject);
    onClose();
  };

  const currentVersion = platformVersions[selectedPlatformTab] || {
    platform: selectedPlatformTab,
    title: '',
    caption: '',
    hashtags: [],
    callToAction: '',
    formatSuggestion: ''
  };

  const updateCurrentVersion = (field: string, value: any) => {
    setPlatformVersions(prev => ({
      ...prev,
      [selectedPlatformTab]: {
        ...currentVersion,
        [field]: value
      }
    }));
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-[#0e111d] p-6 shadow-2xl text-left my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <h2 className="text-base font-bold text-white">
              {isEditing ? `Edit Project: ${project.title}` : 'Create New Content Project'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this project?')) {
                    onDelete(project.id);
                    onClose();
                  }
                }}
                className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10 transition"
                title="Delete Project"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
          {/* Title & Topic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
              <input
                type="text"
                placeholder="e.g. 5 Game-Changing AI Tools for Video Creators"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Core Topic / Angle</label>
              <input
                type="text"
                placeholder="e.g. AI Video Production"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Pipeline Status & Schedule Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Workflow Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full rounded-xl border border-white/10 bg-[#141724] px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                {ALL_STATUSES.map(st => (
                  <option key={st.id} value={st.id} className="bg-[#141724] text-white">
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Publishing Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Optimal Post Time</label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Target Platforms Multi-Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Platforms</label>
            <div className="flex flex-wrap gap-2">
              {ALL_PLATFORMS.map(p => {
                const isSelected = targetPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition ${
                      isSelected
                        ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-200 font-semibold'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]'
                    }`}
                  >
                    {getPlatformIcon(p, 'w-3.5 h-3.5')}
                    <span>{getPlatformName(p)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description & Overview */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description & Strategic Goals</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes this piece unique? Target retention goal or key takeaway..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          {/* Script / Outline Editor with AI Assistant */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Core Script / Content Blueprint</span>
              </label>

              <button
                type="button"
                onClick={handleGenerateAIScript}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-1 text-[11px] font-semibold text-white shadow-md shadow-indigo-600/30 hover:opacity-95 disabled:opacity-50 transition"
              >
                {isGenerating ? (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                ) : (
                  <Wand2 className="h-3 w-3" />
                )}
                <span>{isGenerating ? 'Drafting with Gemini...' : 'Generate Script Outline with AI'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Write or generate your video script, speaking points, and visual directions here..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none font-mono leading-relaxed"
            />
          </div>

          {/* Platform Versions Tabs */}
          {targetPlatforms.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-bold text-white">Platform-Tailored Versioning</span>
                <div className="flex gap-1">
                  {targetPlatforms.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPlatformTab(p)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition ${
                        selectedPlatformTab === p
                          ? 'bg-white/15 text-white font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {getPlatformIcon(p, 'w-3 h-3')}
                      <span>{getPlatformName(p)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-300">
                      {getPlatformName(selectedPlatformTab)} Title / First-Line Hook
                    </label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentVersion.title || title, 'ver_title')}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copiedField === 'ver_title' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={currentVersion.title}
                    onChange={(e) => updateCurrentVersion('title', e.target.value)}
                    placeholder={`Customized title for ${getPlatformName(selectedPlatformTab)}`}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-300">
                      {getPlatformName(selectedPlatformTab)} Caption & Body
                    </label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentVersion.caption, 'ver_caption')}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copiedField === 'ver_caption' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={currentVersion.caption}
                    onChange={(e) => updateCurrentVersion('caption', e.target.value)}
                    placeholder={`Native caption with spacing, emojis, and structure...`}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Call To Action (CTA)</label>
                    <input
                      type="text"
                      value={currentVersion.callToAction || ''}
                      onChange={(e) => updateCurrentVersion('callToAction', e.target.value)}
                      placeholder="e.g. Save this post & comment below"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Format Recommendation</label>
                    <input
                      type="text"
                      value={currentVersion.formatSuggestion || ''}
                      onChange={(e) => updateCurrentVersion('formatSuggestion', e.target.value)}
                      placeholder="e.g. 9:16 Video, high tempo"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma Separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. AI, Tutorial, Productivity, Growth"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Footer Submit Button */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
