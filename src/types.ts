export type PlatformId = 'youtube' | 'instagram' | 'tiktok' | 'twitter' | 'linkedin' | 'facebook' | 'pinterest';

export type ProjectStatus = 
  | 'idea'
  | 'planning'
  | 'creating'
  | 'ready_for_review'
  | 'scheduled'
  | 'published'
  | 'analyzing'
  | 'completed';

export type ActionPriority = 'high' | 'opportunity' | 'schedule' | 'improvement';

export type IncomeSource = 
  | 'official_revenue'
  | 'estimated_revenue'
  | 'brand_deals'
  | 'sponsorships'
  | 'affiliate'
  | 'digital_products'
  | 'other';

export type IncomeLabelType = 'official' | 'estimated' | 'user_entered';

export type BrandDealStatus = 'potential' | 'negotiating' | 'active' | 'awaiting_payment' | 'completed' | 'pitched' | 'contract_signed' | 'in_production' | 'published' | 'paid';

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  targetAudience: string;
  primaryCategory: string;
  creatorGoals: string[];
  preferredCurrency: string;
  country: string;
  bio: string;
  onboardingCompleted: boolean;
}

export interface PlatformConnection {
  platform: PlatformId;
  name: string;
  handle: string;
  connected: boolean;
  avatar: string;
  audienceCount: number;
  audienceGrowthRate: string;
  views30d: number;
  engagementRate: number;
  analyticsAvailable: boolean;
  publishingAvailable: boolean;
  monetizationAvailable: boolean;
  isOfficial: boolean;
  lastSync?: string;
  lastSynced?: string;
}

export interface PlatformContentVersion {
  platform: PlatformId;
  title: string;
  hook?: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  formatSuggestion: string;
}

export interface ContentProject {
  id: string;
  title: string;
  description: string;
  topic: string;
  niche: string;
  status: ProjectStatus;
  targetPlatforms: PlatformId[];
  scheduledDate?: string;
  scheduledTime?: string;
  deadline?: string;
  script?: string;
  tags: string[];
  platformVersions: Record<PlatformId, PlatformContentVersion>;
  metrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    engagementRate?: number;
    revenueEstimated?: number;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriorityAction {
  id: string;
  priority: ActionPriority;
  category?: 'urgent' | 'content' | 'audience' | 'optimization';
  title: string;
  reason: string;
  supportingInformation: string;
  suggestedAction: string;
  actionButtonText: string;
  actionTarget: 'project' | 'repurpose' | 'analyzer' | 'calendar' | 'community' | 'coach' | 'analytics' | 'monetization';
  targetId?: string;
  projectId?: string;
  score: number;
  isCompleted?: boolean;
}

export interface CreatorHubScore {
  overall: number;
  contentConsistency: number;
  engagement: number;
  contentPerformance: number;
  goalProgress: number;
  explanation: string;
  recentChange: string;
}

export interface CreatorGoal {
  id: string;
  title: string;
  platform?: PlatformId;
  metricType: 'subscribers' | 'followers' | 'views' | 'posts_per_week' | 'income' | 'engagement';
  currentValue: number;
  targetValue: number;
  unit: string;
  deadline: string;
  category: 'audience' | 'content' | 'revenue';
}

export interface IncomeRecord {
  id: string;
  source: IncomeSource | string;
  platform?: PlatformId;
  title?: string;
  amount: number;
  currency: string;
  date?: string;
  period?: string;
  labelType?: IncomeLabelType;
  verified?: boolean;
  notes?: string;
}

export interface BrandDeal {
  id: string;
  brand?: string;
  brandName?: string;
  campaign?: string;
  deliverables: string | string[];
  payment?: number;
  dealValue?: number;
  currency: string;
  deadline?: string;
  dueDate?: string;
  status: BrandDealStatus;
  payoutStatus?: 'unpaid' | 'received' | 'pending';
  contactName?: string;
  contactPerson?: string;
  contactEmail?: string;
  notes?: string;
}

export interface TrendRadarItem {
  id: string;
  topic: string;
  niche: string;
  platform?: PlatformId;
  momentumScore?: number;
  velocity?: string;
  searchVolume: string;
  suggestedAngle?: string;
  suggestedAngles?: string[];
  exampleHook?: string;
  competitionLevel?: 'low' | 'medium' | 'high';
  category: string;
}

export type TrendTopic = TrendRadarItem;

export interface PrePublishAnalysis {
  titleClarity: number;
  audienceRelevance: number;
  hookStrength: number;
  keywordRelevance: number;
  overallScore: number;
  recommendations: string[];
  hookCritique: string;
  suggestedBetterHooks: string[];
  keywordSuggestions: string[];
}

export interface CopyrightRiskItem {
  id: string;
  category: 'music' | 'image' | 'video_clip' | 'duplicate_text';
  severity: 'low' | 'medium' | 'high';
  title: string;
  riskDescription: string;
  recommendedAction: string;
  safeAlternatives: string;
}
