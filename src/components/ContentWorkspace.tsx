import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Tag, 
  CheckCircle2, 
  Eye, 
  Layers, 
  ArrowRight,
  List,
  Columns,
  Share2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ContentProject, PlatformId, ProjectStatus } from '../types';
import { getPlatformIcon, getPlatformName, getPlatformBadgeColor } from '../utils/platformHelpers';
import { ProjectModal } from './ProjectModal';

interface ContentWorkspaceProps {
  projects: ContentProject[];
  onSaveProject: (project: ContentProject) => void;
  onDeleteProject: (id: string) => void;
  creatorNiche: string;
}

const PIPELINE_COLUMNS: { id: ProjectStatus; title: string; color: string }[] = [
  { id: 'idea', title: 'Idea Stage', color: 'border-slate-500/30 text-slate-300' },
  { id: 'planning', title: 'Planning', color: 'border-blue-500/30 text-blue-300' },
  { id: 'creating', title: 'In Production', color: 'border-amber-500/30 text-amber-300' },
  { id: 'ready_for_review', title: 'Ready for Review', color: 'border-purple-500/30 text-purple-300' },
  { id: 'scheduled', title: 'Scheduled', color: 'border-cyan-500/30 text-cyan-300' },
  { id: 'published', title: 'Published & Live', color: 'border-emerald-500/30 text-emerald-300' },
];

export const ContentWorkspace: React.FC<ContentWorkspaceProps> = ({
  projects,
  onSaveProject,
  onDeleteProject,
  creatorNiche
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [editingProject, setEditingProject] = useState<ContentProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlatform = 
      selectedPlatform === 'all' || p.targetPlatforms.includes(selectedPlatform as PlatformId);

    return matchesSearch && matchesPlatform;
  });

  const handleOpenNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (p: ContentProject) => {
    setEditingProject(p);
    setIsModalOpen(true);
  };

  const handleAdvanceStatus = (p: ContentProject, e: React.MouseEvent) => {
    e.stopPropagation();
    const statusOrder: ProjectStatus[] = ['idea', 'planning', 'creating', 'ready_for_review', 'scheduled', 'published', 'analyzing', 'completed'];
    const currentIndex = statusOrder.indexOf(p.status);
    if (currentIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIndex + 1];
      onSaveProject({
        ...p,
        status: nextStatus,
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <FolderKanban className="h-4 w-4" /> Content Lifecycle Architecture
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Total Projects: {projects.length}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Content Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your entire project pipeline from initial concept to multi-platform publishing and retention analysis.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 active:scale-95 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Content Project</span>
        </button>
      </div>

      {/* Control Bar: Search, Platform Filter & View Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0c0e18] p-3 rounded-2xl border border-white/10">
        <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects, topics, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#141724] py-2 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All Platforms</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>

        <div className="flex items-center gap-1 self-end sm:self-auto border border-white/10 rounded-xl p-1 bg-white/[0.02]">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'kanban'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="h-3.5 w-3.5" />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'list'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {PIPELINE_COLUMNS.map((col) => {
            const columnProjects = filteredProjects.filter(p => p.status === col.id);
            return (
              <div
                key={col.id}
                className="rounded-2xl border border-white/10 bg-[#0b0d18] p-3 flex flex-col min-w-[260px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>
                    {col.title}
                  </span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                    {columnProjects.length}
                  </span>
                </div>

                {/* Column Project Cards */}
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
                  {columnProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleEdit(p)}
                      className="group rounded-xl border border-white/10 bg-white/[0.02] p-3.5 hover:bg-white/[0.05] hover:border-cyan-500/40 cursor-pointer transition-all space-y-2.5 relative shadow-sm"
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        {p.targetPlatforms.map(plat => (
                          <span
                            key={plat}
                            className={`rounded border px-1.5 py-0.2 text-[9px] font-semibold ${getPlatformBadgeColor(plat)}`}
                          >
                            {getPlatformName(plat)}
                          </span>
                        ))}
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {p.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {p.description || p.topic}
                      </p>

                      {p.scheduledDate && (
                        <div className="flex items-center gap-1 text-[10.5px] text-cyan-400 font-mono">
                          <Calendar className="h-3 w-3" />
                          <span>{p.scheduledDate}</span>
                          {p.scheduledTime && <span>{p.scheduledTime}</span>}
                        </div>
                      )}

                      {/* Performance tags if published */}
                      {p.metrics?.views && (
                        <div className="flex items-center justify-between text-[10px] text-emerald-400 pt-1.5 border-t border-white/5">
                          <span>{p.metrics.views.toLocaleString()} Views</span>
                          <span>{p.metrics.engagementRate}% Eng</span>
                        </div>
                      )}

                      {/* Advance Pipeline Button */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Click to edit</span>
                        {col.id !== 'published' && (
                          <button
                            type="button"
                            onClick={(e) => handleAdvanceStatus(p, e)}
                            className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-cyan-500/10 transition"
                            title="Move to next pipeline stage"
                          >
                            <span>Advance</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {columnProjects.length === 0 && (
                    <div className="py-8 text-center text-[11px] text-slate-500 italic">
                      No projects in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl border border-white/10 bg-[#0b0d18] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Project Title & Topic</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Platforms</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Metrics</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => handleEdit(p)}
                  className="hover:bg-white/[0.03] cursor-pointer transition"
                >
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-white text-xs">{p.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{p.topic}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="capitalize rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-slate-300">
                      {p.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1.5">
                      {p.targetPlatforms.map(plat => (
                        <span key={plat} title={getPlatformName(plat)}>
                          {getPlatformIcon(plat, 'w-3.5 h-3.5')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">
                    {p.scheduledDate || 'Not set'}
                  </td>
                  <td className="px-4 py-3.5 text-[11px]">
                    {p.metrics?.views ? (
                      <span className="text-emerald-400 font-semibold">{p.metrics.views.toLocaleString()} views</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        project={editingProject}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveProject}
        onDelete={onDeleteProject}
        creatorNiche={creatorNiche}
      />
    </div>
  );
};
