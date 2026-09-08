import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { CommandCenter } from './components/CommandCenter';
import { WhatShouldIDoNext } from './components/WhatShouldIDoNext';
import { AICreatorCoach } from './components/AICreatorCoach';
import { ContentWorkspace } from './components/ContentWorkspace';
import { RepurposeEngine } from './components/RepurposeEngine';
import { AnalyticsView } from './components/AnalyticsView';
import { ContentCalendar } from './components/ContentCalendar';
import { BusinessTracker } from './components/BusinessTracker';
import { TrendRadar } from './components/TrendRadar';
import { PrePublishAnalyzer } from './components/PrePublishAnalyzer';
import { SettingsPrivacy } from './components/SettingsPrivacy';
import { CopyrightCenter } from './components/CopyrightCenter';
import { PlatformsManager } from './components/PlatformsManager';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ProjectModal } from './components/ProjectModal';
import { 
  initialCreatorProfile, 
  initialPlatforms, 
  initialProjects, 
  initialPriorityActions, 
  initialScore, 
  initialIncomeRecords, 
  initialBrandDeals, 
  initialTrends, 
  initialGoals 
} from './data/initialData';
import { 
  CreatorProfile, 
  PlatformConnection, 
  ContentProject, 
  PriorityAction, 
  CreatorHubScore, 
  IncomeRecord, 
  BrandDeal, 
  TrendTopic, 
  CreatorGoal, 
  PlatformId,
  PlatformContentVersion
} from './types';

export default function App() {
  // Navigation & View State
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('command_center');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Core Data States with LocalStorage Hydration
  const [creator, setCreator] = useState<CreatorProfile>(() => {
    const saved = localStorage.getItem('creatorhub_profile');
    return saved ? JSON.parse(saved) : initialCreatorProfile;
  });

  const [platforms, setPlatforms] = useState<PlatformConnection[]>(() => {
    const saved = localStorage.getItem('creatorhub_platforms');
    return saved ? JSON.parse(saved) : initialPlatforms;
  });

  const [projects, setProjects] = useState<ContentProject[]>(() => {
    const saved = localStorage.getItem('creatorhub_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [actions, setActions] = useState<PriorityAction[]>(() => {
    const saved = localStorage.getItem('creatorhub_actions');
    return saved ? JSON.parse(saved) : initialPriorityActions;
  });

  const [score, setScore] = useState<CreatorHubScore>(initialScore);
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>(() => {
    const saved = localStorage.getItem('creatorhub_income');
    return saved ? JSON.parse(saved) : initialIncomeRecords;
  });

  const [brandDeals, setBrandDeals] = useState<BrandDeal[]>(() => {
    const saved = localStorage.getItem('creatorhub_deals');
    return saved ? JSON.parse(saved) : initialBrandDeals;
  });

  const [trends, setTrends] = useState<TrendTopic[]>(initialTrends);
  const [goals, setGoals] = useState<CreatorGoal[]>(initialGoals);

  // Modals State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ContentProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isRefreshingActions, setIsRefreshingActions] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Persist primary data
  useEffect(() => {
    localStorage.setItem('creatorhub_profile', JSON.stringify(creator));
  }, [creator]);

  useEffect(() => {
    localStorage.setItem('creatorhub_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('creatorhub_platforms', JSON.stringify(platforms));
  }, [platforms]);

  useEffect(() => {
    localStorage.setItem('creatorhub_deals', JSON.stringify(brandDeals));
  }, [brandDeals]);

  // Action Execution Handler
  const handleExecuteAction = (action: PriorityAction) => {
    const targetProjId = action.projectId || action.targetId;
    switch (action.actionTarget) {
      case 'project':
        if (targetProjId) {
          const targetProj = projects.find(p => p.id === targetProjId);
          if (targetProj) {
            setSelectedProjectForModal(targetProj);
            setIsProjectModalOpen(true);
            return;
          }
        }
        setActiveTab('workspace');
        break;
      case 'repurpose':
        setActiveTab('repurpose');
        break;
      case 'analyzer':
        setActiveTab('analyzer');
        break;
      case 'coach':
        setActiveTab('ai_coach');
        break;
      case 'calendar':
        setActiveTab('calendar');
        break;
      case 'analytics':
        setActiveTab('analytics');
        break;
      case 'monetization':
        setActiveTab('business');
        break;
      default:
        setActiveTab('workspace');
    }
  };

  // Re-evaluate actions using Gemini backend
  const handleRefreshActions = async () => {
    setIsRefreshingActions(true);
    try {
      const res = await fetch('/api/ai/next-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorNiche: creator.niche,
          projects: projects.map(p => ({ title: p.title, status: p.status, deadline: p.scheduledDate })),
          goals: goals.map(g => `${g.title} (${g.currentValue}/${g.targetValue})`),
          connectedPlatforms: platforms.filter(p => p.connected).map(p => p.platform)
        })
      });

      const data = await res.json();
      if (data.actions && Array.isArray(data.actions)) {
        setActions(data.actions);
        localStorage.setItem('creatorhub_actions', JSON.stringify(data.actions));
      }
    } catch (err) {
      console.error('Failed to re-evaluate actions:', err);
    } finally {
      setIsRefreshingActions(false);
    }
  };

  // Save / Update Project
  const handleSaveProject = (saved: ContentProject) => {
    setProjects(prev => {
      const exists = prev.some(p => p.id === saved.id);
      if (exists) {
        return prev.map(p => p.id === saved.id ? saved : p);
      }
      return [saved, ...prev];
    });
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Turn Trend topic into a new Content Project
  const handleConvertTrendToProject = (trend: TrendTopic) => {
    const angleText = (trend.suggestedAngles && trend.suggestedAngles[0]) || trend.suggestedAngle || trend.topic;
    const newProj: ContentProject = {
      id: `proj_trend_${Date.now()}`,
      title: `${trend.topic}: Breakdown & Analysis`,
      description: `Exploring angle: ${angleText}`,
      topic: trend.topic,
      niche: creator.niche,
      status: 'planning',
      targetPlatforms: ['youtube', 'tiktok', 'twitter'],
      scheduledDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      scheduledTime: '18:00',
      tags: [trend.category, 'Trending', 'Analysis'],
      platformVersions: {} as any,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setProjects(prev => [newProj, ...prev]);
    setSelectedProjectForModal(newProj);
    setIsProjectModalOpen(true);
  };

  // Save Repurposed Versions to Project
  const handleSaveRepurposedVersions = (projectId: string, versions: Record<PlatformId, PlatformContentVersion>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          platformVersions: {
            ...p.platformVersions,
            ...versions
          },
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
  };

  // Toggle platform connection
  const handleTogglePlatformConnect = (platformId: PlatformId) => {
    setPlatforms(prev => prev.map(p => {
      if (p.platform === platformId) {
        return {
          ...p,
          connected: !p.connected,
          lastSync: !p.connected ? 'Just now' : p.lastSync
        };
      }
      return p;
    }));
  };

  // Add Brand Deal
  const handleAddBrandDeal = (deal: BrandDeal) => {
    setBrandDeals(prev => [deal, ...prev]);
  };

  // Update Deal Status
  const handleUpdateDealStatus = (dealId: string, status: BrandDeal['status']) => {
    setBrandDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          status,
          payoutStatus: (status === 'paid' || status === 'completed') ? 'received' : d.payoutStatus
        };
      }
      return d;
    }));
  };

  // Update project hook & title from PrePublishAnalyzer
  const handleUpdateProjectHook = (projectId: string, updatedHook: string, updatedTitle: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          title: updatedTitle || p.title,
          script: updatedHook ? `${updatedHook}\n\n${p.script || ''}` : p.script,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
  };

  // Update creator profile from Settings & Privacy
  const handleUpdateCreator = (updated: Partial<CreatorProfile>) => {
    setCreator(prev => ({
      ...prev,
      ...updated
    }));
  };

  // Import full workspace from JSON backup
  const handleImportWorkspace = (imported: any) => {
    if (imported.creator) {
      setCreator(imported.creator);
      localStorage.setItem('creatorhub_profile', JSON.stringify(imported.creator));
    }
    if (imported.projects && Array.isArray(imported.projects)) {
      setProjects(imported.projects);
      localStorage.setItem('creatorhub_projects', JSON.stringify(imported.projects));
    }
    if (imported.brandDeals && Array.isArray(imported.brandDeals)) {
      setBrandDeals(imported.brandDeals);
      localStorage.setItem('creatorhub_deals', JSON.stringify(imported.brandDeals));
    }
    if (imported.incomeRecords && Array.isArray(imported.incomeRecords)) {
      setIncomeRecords(imported.incomeRecords);
      localStorage.setItem('creatorhub_income', JSON.stringify(imported.incomeRecords));
    }
    if (imported.goals && Array.isArray(imported.goals)) {
      setGoals(imported.goals);
    }
  };

  // Reset workspace to initial template state
  const handleResetData = () => {
    localStorage.clear();
    setCreator(initialCreatorProfile);
    setProjects(initialProjects);
    setPlatforms(initialPlatforms);
    setActions(initialPriorityActions);
    setIncomeRecords(initialIncomeRecords);
    setBrandDeals(initialBrandDeals);
    setGoals(initialGoals);
    setTrends(initialTrends);
  };

  // If user is on the Landing Page view
  if (isLandingPage) {
    return (
      <LandingPage
        onGetStarted={() => {
          setIsLandingPage(false);
          setIsOnboardingModalOpen(true);
        }}
        onExploreWorkspace={() => {
          setIsLandingPage(false);
          setActiveTab('command_center');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        creator={creator}
        score={score}
        onNewProject={() => {
          setSelectedProjectForModal(null);
          setIsProjectModalOpen(true);
        }}
        onOpenProfile={() => setIsOnboardingModalOpen(true)}
        onOpenOnboarding={() => setIsOnboardingModalOpen(true)}
        onOpenSettings={() => setActiveTab('settings')}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onToggleLanding={() => setIsLandingPage(prev => !prev)}
        onToggleLandingPage={() => setIsLandingPage(true)}
        isLandingView={isLandingPage}
        onRefreshSync={() => {
          setIsSyncing(true);
          setTimeout(() => setIsSyncing(false), 800);
        }}
        isSyncing={isSyncing}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Main Workspace Layout */}
      <div className="flex pt-16">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setIsMobileSidebarOpen(false);
          }}
          pendingActionCount={actions.filter(a => a.priority === 'high').length}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Center Stage Content View */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-6 max-w-7xl mx-auto">
          {activeTab === 'command_center' && (
            <CommandCenter
              creator={creator}
              platforms={platforms}
              actions={actions}
              score={score}
              projects={projects}
              incomeRecords={incomeRecords}
              goals={goals}
              onExecuteAction={handleExecuteAction}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectProject={(p) => {
                setSelectedProjectForModal(p);
                setIsProjectModalOpen(true);
              }}
            />
          )}

          {activeTab === 'what_next' && (
            <WhatShouldIDoNext
              actions={actions}
              creator={creator}
              projects={projects}
              onExecuteAction={handleExecuteAction}
              onRefreshActions={handleRefreshActions}
              isRefreshing={isRefreshingActions}
            />
          )}

          {activeTab === 'ai_coach' && (
            <AICreatorCoach
              creator={creator}
              platforms={platforms}
              projects={projects}
              goals={goals}
            />
          )}

          {activeTab === 'workspace' && (
            <ContentWorkspace
              projects={projects}
              onSaveProject={handleSaveProject}
              onDeleteProject={handleDeleteProject}
              creatorNiche={creator.niche}
            />
          )}

          {activeTab === 'repurpose' && (
            <RepurposeEngine
              projects={projects}
              creatorNiche={creator.niche}
              onSaveToProject={handleSaveRepurposedVersions}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              platforms={platforms}
              projects={projects}
              creator={creator}
            />
          )}

          {activeTab === 'calendar' && (
            <ContentCalendar
              projects={projects}
              onSelectProject={(p) => {
                setSelectedProjectForModal(p);
                setIsProjectModalOpen(true);
              }}
              onNewProject={() => {
                setSelectedProjectForModal(null);
                setIsProjectModalOpen(true);
              }}
            />
          )}

          {activeTab === 'business' && (
            <BusinessTracker
              incomeRecords={incomeRecords}
              brandDeals={brandDeals}
              goals={goals}
              onAddDeal={handleAddBrandDeal}
              onUpdateDealStatus={handleUpdateDealStatus}
            />
          )}

          {activeTab === 'trends' && (
            <TrendRadar
              trends={trends}
              onConvertTrendToProject={handleConvertTrendToProject}
              creatorNiche={creator.niche}
            />
          )}

          {(activeTab === 'analyzer' || activeTab === 'hook_analyzer') && (
            <PrePublishAnalyzer
              creatorNiche={creator.niche}
              projects={projects}
              onSaveToProject={handleUpdateProjectHook}
              onNavigateToCopyright={() => setActiveTab('copyright')}
            />
          )}

          {activeTab === 'copyright' && (
            <CopyrightCenter
              onNavigateToAnalyzer={() => setActiveTab('analyzer')}
            />
          )}

          {activeTab === 'platforms' && (
            <PlatformsManager
              platforms={platforms}
              onToggleConnect={handleTogglePlatformConnect}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPrivacy
              creator={creator}
              platforms={platforms}
              projects={projects}
              brandDeals={brandDeals}
              incomeRecords={incomeRecords}
              goals={goals}
              onUpdateCreator={handleUpdateCreator}
              onResetData={handleResetData}
              onImportData={handleImportWorkspace}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={(user) => {
          setCreator(prev => ({
            ...prev,
            name: user.name,
          }));
        }}
      />

      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        initialProfile={creator}
        onSave={(updated) => {
          setCreator(prev => ({ ...prev, ...updated }));
        }}
        onClose={() => setIsOnboardingModalOpen(false)}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        project={selectedProjectForModal}
        onClose={() => {
          setIsProjectModalOpen(false);
          setSelectedProjectForModal(null);
        }}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
        creatorNiche={creator.niche}
      />
    </div>
  );
}
