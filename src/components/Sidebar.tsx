import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Sparkles, 
  FolderKanban, 
  Repeat, 
  CheckCircle2, 
  BarChart3, 
  Calendar, 
  Briefcase, 
  Radio, 
  ShieldAlert, 
  Link2, 
  Settings,
  Flame,
  ChevronRight
} from 'lucide-react';

export type NavTab = 
  | 'command_center'
  | 'what_next'
  | 'ai_coach'
  | 'workspace'
  | 'repurpose'
  | 'analyzer'
  | 'analytics'
  | 'calendar'
  | 'business'
  | 'trends'
  | 'copyright'
  | 'platforms'
  | 'settings';

export interface SidebarProps {
  currentTab?: NavTab;
  activeTab?: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadActionsCount?: number;
  pendingActionCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  unreadActionsCount,
  pendingActionCount,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const selectedTab = activeTab || currentTab || 'command_center';
  const urgentCount = pendingActionCount ?? unreadActionsCount ?? 0;

  const navSections = [
    {
      title: 'INTELLIGENCE & ACTIONS',
      items: [
        {
          id: 'command_center' as NavTab,
          label: 'Command Center',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          id: 'what_next' as NavTab,
          label: 'What Should I Do Next?',
          icon: Flame,
          badge: urgentCount > 0 ? `${urgentCount} Urgent` : null,
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        },
        {
          id: 'ai_coach' as NavTab,
          label: 'AI Creator Coach',
          icon: Bot,
          badge: 'Live',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        },
      ]
    },
    {
      title: 'CONTENT WORKFLOW',
      items: [
        {
          id: 'workspace' as NavTab,
          label: 'Content Workspace',
          icon: FolderKanban,
          badge: null,
        },
        {
          id: 'repurpose' as NavTab,
          label: 'Repurpose Engine',
          icon: Repeat,
          badge: '1-to-6',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        },
        {
          id: 'analyzer' as NavTab,
          label: 'Pre-Publish Analyzer',
          icon: CheckCircle2,
          badge: null,
        },
        {
          id: 'calendar' as NavTab,
          label: 'Content Calendar',
          icon: Calendar,
          badge: null,
        },
      ]
    },
    {
      title: 'PERFORMANCE & GROWTH',
      items: [
        {
          id: 'analytics' as NavTab,
          label: 'Analytics & Insights',
          icon: BarChart3,
          badge: null,
        },
        {
          id: 'business' as NavTab,
          label: 'Business & Brand Deals',
          icon: Briefcase,
          badge: '$10.8k',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          id: 'trends' as NavTab,
          label: 'Trend Radar',
          icon: Radio,
          badge: 'Hot',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        },
        {
          id: 'copyright' as NavTab,
          label: 'Copyright Risk Center',
          icon: ShieldAlert,
          badge: null,
        },
      ]
    },
    {
      title: 'SYSTEM & ACCOUNTS',
      items: [
        {
          id: 'platforms' as NavTab,
          label: 'Connected Accounts',
          icon: Link2,
          badge: '5/7',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        },
        {
          id: 'settings' as NavTab,
          label: 'Settings & Privacy',
          icon: Settings,
          badge: null,
        },
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 pt-16 lg:pt-0 lg:static lg:z-auto w-64 shrink-0 border-r border-white/10 bg-[#080910]/98 lg:bg-[#080910]/95 backdrop-blur-2xl flex flex-col justify-between py-4 px-3 overflow-y-auto transition-transform duration-200 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase font-sans">
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = selectedTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`group w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white font-semibold border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className={`rounded-md border px-1.5 py-0.5 text-[9.5px] font-semibold leading-none ${item.badgeColor || 'border-white/10 bg-white/5 text-slate-300'}`}>
                            {item.badge}
                          </span>
                        )}
                        {isActive && <ChevronRight className="h-3 w-3 text-cyan-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* OS Intelligence Status Footnote */}
        <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-950/40 to-slate-900/60 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white">Creator Intelligence</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="mt-1 text-[10.5px] text-slate-400 leading-relaxed">
            Active recommendations updated from live performance signals & calendar deadlines.
          </p>
        </div>
      </aside>
    </>
  );
};
