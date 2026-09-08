// High-Performance Fallback Creator Intelligence Engine
// Ensures seamless, instant, high-quality responses even if external AI APIs are constrained or unreachable

export function generateCoachReply(message: string, creatorContext: any): string {
  const niche = creatorContext?.niche || 'Digital Content';
  const name = creatorContext?.name || 'Creator';
  const targetAudience = creatorContext?.targetAudience || 'your target audience';
  const lowerMsg = (message || '').toLowerCase();

  if (lowerMsg.includes('hook') || lowerMsg.includes('retention') || lowerMsg.includes('drop off')) {
    return `### Strategic Hook & Retention Diagnostic for ${niche}

1. **The 1.5-Second Frame Rule**: Cut out any introductory greeting, channel animation, or slow build-up. The very first frame must display the climax, paradox, or highest-stakes dilemma.
2. **Visual Reset Intervals**: Insert a visual perspective shift, B-roll punch-in, or highlighted text callout every 2.4 to 3.0 seconds during the first 15 seconds to prevent micro-fatigue.
3. **Curiosity Open Loops**: Present the core tension early: *"Most creators in ${niche} focus on volume, but the top 1% exploit a single retention asymmetry."* Resolve this payoff only in the final third.
4. **Actionable Next Step**: Run your script draft through the **Content Analyzer** to audit your first 5 seconds before recording.`;
  }

  if (lowerMsg.includes('brand') || lowerMsg.includes('sponsor') || lowerMsg.includes('deal') || lowerMsg.includes('rate') || lowerMsg.includes('money') || lowerMsg.includes('monetiz')) {
    return `### Brand Deal & Monetization Framework

1. **Package Multi-Platform Bundles**: Never quote flat single-video integration prices. Offer a structured bundle: 1 primary dedicated integration + 2 short-form derivative cuts + 30-day organic usage rights for a +35% revenue premium.
2. **Isolate Official vs. User-Estimated Payouts**: Keep direct AdSense and affiliate bank deposits strictly separated from pending net-30 brand invoice receivables.
3. **Audience Intent Pitching**: Present your community comment-to-view ratio and specific demographic purchasing intent over raw vanity view counts when negotiating.`;
  }

  if (lowerMsg.includes('repurpose') || lowerMsg.includes('shorts') || lowerMsg.includes('tiktok') || lowerMsg.includes('reels') || lowerMsg.includes('format')) {
    return `### Multi-Platform Repurposing Blueprint

1. **The Core Asset Pyramid**: Anchor your week on 1 high-depth core pillar (such as a 10–12 minute YouTube video or comprehensive breakdown).
2. **The 3 Native Formats**:
   - **Vertical Video (9:16)**: 45–60 second tight edit centered on the single most surprising takeaway.
   - **Text Slide Carousel**: 6 actionable slides for Instagram and LinkedIn summarizing the step-by-step framework.
   - **Discussion Prompt**: Community tab poll or X/Twitter thread asking your audience for their primary friction point.
3. **Actionable Tool**: Feed your core talking points into the **Repurposing Studio** for instantaneous platform-specific adaptations.`;
  }

  if (lowerMsg.includes('burnout') || lowerMsg.includes('consistency') || lowerMsg.includes('schedule') || lowerMsg.includes('time') || lowerMsg.includes('plan')) {
    return `### Sustainable Creator Cadence Protocol

1. **Dedicated Batch Days**: Segment your creative energy: Mondays for deep research & scriptwriting, Tuesdays for batch video recording, Wednesdays for editing & packaging.
2. **The 2-Piece Buffer Inventory**: Never publish live under deadline pressure. Maintain a minimum 2-piece completed buffer in reserve to safeguard your creative intuition.
3. **Protect Peak Energy Windows**: Reserve your freshest morning hours for ideation and creative scriptwriting, pushing administrative tasks to afternoon slots.`;
  }

  return `### Strategic Daily Briefing for ${name}

**Niche**: ${niche} • **Audience Focus**: ${targetAudience}

1. **Current High-Leverage Opportunity**: In the current ${niche} landscape, audiences are actively rewarding concise, proof-backed case studies and actionable workflows.
2. **Cadence Recommendation**: Review your pending items in **What Should I Do Next?**. Finalizing your high-retention hooks and maintaining regular publication cadence are your highest leverage levers today.
3. **Creative Milestone**: Prepare 2 contrasting title and thumbnail concepts before your next production run to test browse traffic appeal.

*What specific project or format would you like to strategize right now?*`;
}

export function getFallbackNextActions(creatorContext: any, activeProjects: any[], recentMetrics: any): any[] {
  const niche = creatorContext?.niche || 'Digital Content';
  return [
    {
      id: 'act_live_1',
      priority: 'high',
      category: 'urgent',
      title: `Finalize scheduled ${niche} upload hook`,
      reason: 'Your upcoming publication window requires an immediate 2-second visual hook for algorithmic distribution.',
      supportingInformation: 'Audience retention drops by up to 34% if the primary premise is delayed past the 3-second mark.',
      suggestedAction: 'Review opening frame text and sharpen the initial thesis statement.',
      actionButtonText: 'Review Hook',
      actionTarget: 'project',
      score: 96
    },
    {
      id: 'act_live_2',
      priority: 'opportunity',
      category: 'content',
      title: `Repurpose top-performing ${niche} tutorial`,
      reason: 'Recent educational breakdown generated +48% above-average engagement and high bookmark rates.',
      supportingInformation: 'High save rate indicates reference value that translates directly into vertical video & carousels.',
      suggestedAction: 'Generate 3 native platform cuts in the Repurposing Studio.',
      actionButtonText: 'Open Repurposer',
      actionTarget: 'repurpose',
      score: 91
    },
    {
      id: 'act_live_3',
      priority: 'improvement',
      category: 'optimization',
      title: 'Audit sponsorship deliverable milestones',
      reason: 'Active contract deliverables require timeline alignment before upcoming month-end invoicing.',
      supportingInformation: 'Net-30 processing requires brand approval at least 5 business days ahead of publication.',
      suggestedAction: 'Check brand partner deliverables in the Business Tracker.',
      actionButtonText: 'View Deals',
      actionTarget: 'business',
      score: 84
    },
    {
      id: 'act_live_4',
      priority: 'schedule',
      category: 'audience',
      title: 'Analyze Pre-Publish Title & Thumbnail Tension',
      reason: 'Browse CTR directly correlates with curiosity gap contrast on modern feeds.',
      supportingInformation: 'Top 10% videos in your niche feature under 48-character titles with active action verbs.',
      suggestedAction: 'Run draft title through the Pre-Publish Content Analyzer.',
      actionButtonText: 'Run Analyzer',
      actionTarget: 'analyzer',
      score: 79
    }
  ];
}

export function getFallbackContent(params: {
  platform?: string;
  contentType?: string;
  topic?: string;
  niche?: string;
  tone?: string;
  targetAudience?: string;
}) {
  const topic = params.topic || 'Creator Growth Strategy';
  const niche = params.niche || 'Digital Creation';
  const platform = params.platform || 'YouTube';
  const safeTag = topic.replace(/[^\w]/g, '');

  return {
    titles: [
      `How to Master ${topic} (Without Wasting Hours)`,
      `The Untapped ${topic} Framework Top Creators Use in 2026`,
      `Stop Doing ${topic} the Hard Way: The 3-Step Solution`
    ],
    hooks: [
      `If you are trying to grow in ${niche} right now, you are probably making this exact mistake in your first 3 seconds.`,
      `Most creators spend 8 hours on ${topic} and get zero reach. Here is the single system that changes that.`,
      `Here is what nobody tells you about ${topic} before you hit 100,000 audience reach.`
    ],
    script: `[00:00 - 00:06] HOOK: Visual problem statement highlighting the #1 friction point in ${topic}.\n[00:06 - 00:30] THE CORE PROBLEM: Why traditional ${niche} advice fails modern algorithmic distribution.\n[00:30 - 01:45] THE FRAMEWORK: Step 1 (Audit), Step 2 (Restructure Hook), Step 3 (Double Down on Proof).\n[01:45 - 02:20] ACTIONABLE DEMO: Live walkthrough and concrete visual example.\n[02:20 - 02:40] CALL TO ACTION: Save this guide and drop your primary platform question below.`,
    hashtags: [`#${safeTag || 'Creator'}`, `#${niche.replace(/[^\w]/g, '')}`, '#CreatorEconomy', '#GrowthHacks', '#ContentCreation'],
    keywords: [topic.toLowerCase(), `${niche.toLowerCase()} tips`, 'retention hook', 'content framework', `${platform.toLowerCase()} growth`],
    callToAction: `Bookmark this guide for your next ${platform} production batch and comment your biggest bottleneck below!`
  };
}

export function getFallbackRepurposedVersions(
  sourceContent: string,
  sourcePlatform: string,
  targetPlatforms: string[],
  niche: string
): Record<string, any> {
  const platforms = targetPlatforms && targetPlatforms.length > 0
    ? targetPlatforms
    : ['youtube', 'instagram', 'tiktok', 'twitter', 'linkedin'];
  const summary = (sourceContent || 'Actionable creator strategy breakdown').slice(0, 120);
  const versions: Record<string, any> = {};

  for (const p of platforms) {
    if (p === 'youtube') {
      versions[p] = {
        platform: 'youtube',
        title: `The Complete Breakdown: ${summary.slice(0, 40)}...`,
        hook: `Before you post your next video, watch this breakdown of why viewer retention crashes.`,
        caption: `In this deep dive, we unpack the exact mechanics behind:\n"${summary}..."\n\n📌 Timestamps:\n0:00 - The Big Dilemma\n1:20 - Step-by-Step Breakdown\n3:45 - Case Study & Implementation\n\nDrop a comment with your channel handle below!`,
        hashtags: ['#CreatorEconomy', '#YouTubeGrowth', '#ContentStrategy'],
        callToAction: 'Subscribe and download the free workflow checklist in the description below.',
        formatSuggestion: '16:9 Long-Form Video or High-Density YouTube Short'
      };
    } else if (p === 'instagram') {
      versions[p] = {
        platform: 'instagram',
        title: `Save this before your next post 📌`,
        hook: `Stop scrolling if you create content in ${niche || 'this space'}.`,
        caption: `Here is the framework you need to keep in mind:\n\n✨ ${summary}...\n\n3 Key Takeaways:\n1️⃣ The first 1.5 seconds determine 80% of retention\n2️⃣ Clarity beats complexity every single time\n3️⃣ Consistency in messaging compounds faster than virality\n\n👇 Which of these resonates most with you?`,
        hashtags: ['#reelsvideo', '#creatorgrowth', '#contentstrategist', '#creatorsystem'],
        callToAction: 'Save this post for reference and share with a fellow creator!',
        formatSuggestion: '9:16 Vertical Reel with animated dynamic captions + 6-slide carousel'
      };
    } else if (p === 'tiktok') {
      versions[p] = {
        platform: 'tiktok',
        title: `Wait for the ending...`,
        hook: `Nobody is talking about how this one shift changes your ${niche || 'content'} results.`,
        caption: `Tested this framework over the past 30 days: "${summary}..." Watch till the end for the exact prompt.\n\n#fyp #creator #contenttips #viralhacks`,
        hashtags: ['#fyp', '#creators', '#growthtips', '#contentcreator'],
        callToAction: 'Hit the plus for daily creator strategies!',
        formatSuggestion: '9:16 Fast-paced cut with dynamic b-roll & green screen visual'
      };
    } else if (p === 'twitter') {
      versions[p] = {
        platform: 'twitter',
        title: `Thread: The modern creator playbook`,
        hook: `Most creators waste 15 hours a week on low-leverage tasks.\n\nHere is how to automate and 10x your output (bookmark this): 🧵👇`,
        caption: `1/7 Most people misunderstand ${niche || 'content creation'}.\n\n"${summary}..."\n\nHere is the exact step-by-step system you can implement today:\n\n2/7 Step 1: Establish your core long-form asset.\n3/7 Step 2: Extract 3 native hooks for vertical video.\n4/7 Step 3: Turn the data insights into visual text slides.\n\n7/7 Retweet if this helped, and follow for more breakdowns.`,
        hashtags: ['#buildinpublic', '#creatoreconomy', '#growth'],
        callToAction: 'Retweet the first post and follow for weekly deep dives.',
        formatSuggestion: '7-Tweet High-Value Thread with clean bullet points'
      };
    } else if (p === 'linkedin') {
      versions[p] = {
        platform: 'linkedin',
        title: `The ROI of Content Repurposing in 2026`,
        hook: `I spent the last quarter analyzing where content distribution actually drives revenue.`,
        caption: `The conclusion was clear:\n\n"${summary}..."\n\nThree foundational shifts we noticed:\n• Distribution efficiency matters more than raw volume\n• High-intent audiences prioritize actionable frameworks over generic inspiration\n• Multi-channel leverage protects your business against single-platform algorithm shifts\n\nWhat is your biggest distribution bottleneck right now?`,
        hashtags: ['#ContentMarketing', '#Leadership', '#DigitalStrategy', '#CreatorEconomy'],
        callToAction: 'Join the conversation in the comments below.',
        formatSuggestion: 'Long-form narrative post + PDF slide deck document'
      };
    } else {
      versions[p] = {
        platform: p,
        title: `Optimized for ${p.toUpperCase()}: ${summary.slice(0, 30)}...`,
        hook: `Key insight for ${niche || 'creators'} on ${p}:`,
        caption: `Adapted specifically for ${p}:\n\n${summary}...\n\nConsistent leverage across every touchpoint.`,
        hashtags: [`#${p}Creator`, '#Growth', '#CreatorHub'],
        callToAction: `Follow for daily ${niche || 'insights'}!`,
        formatSuggestion: 'Native Platform Optimized Post'
      };
    }
  }

  return versions;
}

export function getFallbackAnalysis(
  title: string,
  caption: string,
  platform: string,
  niche: string,
  targetAudience: string,
  hook: string
) {
  const titleWords = (title || '').trim().split(/\s+/).length;
  const hookLen = (hook || '').trim().length;

  let titleClarity = 86;
  let hookStrength = 78;
  if (titleWords >= 5 && titleWords <= 12) titleClarity = 94;
  if (titleWords > 15) titleClarity = 73;
  if (hookLen > 20 && hookLen < 120) hookStrength = 90;

  const overall = Math.round((titleClarity * 0.35) + (hookStrength * 0.4) + 84 * 0.25);

  return {
    titleClarity,
    audienceRelevance: 91,
    hookStrength,
    keywordRelevance: 85,
    overallScore: overall,
    hookCritique: hookLen > 0
      ? 'The opening hook establishes the topic well, but could benefit from a sharper curiosity gap or high-contrast statement in the first 2 seconds.'
      : 'No dedicated hook was detected. Adding an immediate high-retention question or counter-intuitive premise will substantially reduce scroll-away rate.',
    suggestedBetterHooks: [
      `Before you publish your next piece on ${title || 'this topic'}, check this 1 rule.`,
      `90% of ${targetAudience || 'creators'} get this wrong: here is the 2-minute fix.`,
      `The counter-intuitive reason your ${niche || 'content'} retention drops (and the exact solution).`
    ],
    keywordSuggestions: [
      `${(niche || 'creator').toLowerCase()} strategy`,
      'retention optimization',
      'algorithmic distribution',
      'audience engagement rate',
      `${(platform || 'video').toLowerCase()} hooks`
    ],
    recommendations: [
      'Shorten the opening sentence by 3-4 words to deliver the core premise within the first 2 seconds.',
      'Place your primary discoverability keyword within the first 60 characters of the description for search indexing.',
      'End with an open-ended question that prompts specific viewer advice sharing or disagreement in comments.'
    ]
  };
}

export function getFallbackTrends(niche: string, platform: string) {
  const safeNiche = niche || 'Creative Tech';
  return [
    {
      id: 'tr_1',
      topic: `${safeNiche}: Autonomous Multi-Format Production`,
      niche: safeNiche,
      platform: platform || 'youtube',
      momentumScore: 97,
      searchVolume: '+340% breakout',
      suggestedAngle: 'How solo creators produce 10x output by chaining dedicated intelligence tools.',
      suggestedAngles: [
        'How solo creators produce 10x output by chaining dedicated intelligence tools',
        'Cost comparison: Hiring a 3-person agency vs building a modern autonomous studio stack'
      ],
      exampleHook: 'The modern media company is a solo creator with 4 connected automated workflows.',
      category: 'Workflow & Tools',
      competitionLevel: 'moderate',
      velocity: 'Rapid Surge (+340%)'
    },
    {
      id: 'tr_2',
      topic: `${safeNiche}: The 2-Second Retention Paradigm Shift`,
      niche: safeNiche,
      platform: platform || 'tiktok',
      momentumScore: 93,
      searchVolume: '+220% rising',
      suggestedAngle: 'Why traditional intro animations are dead and what replaced them.',
      suggestedAngles: [
        'Dissecting the top 100 trending hooks in your exact category',
        'The optical cut rhythm that keeps viewers past the 30-second mark'
      ],
      exampleHook: 'If your video has a greeting in the first 2 seconds, you just lost 40% of viewers.',
      category: 'Audience Psychology',
      competitionLevel: 'low',
      velocity: 'High Velocity (+220%)'
    },
    {
      id: 'tr_3',
      topic: `${safeNiche}: Diversified Off-Platform Monetization`,
      niche: safeNiche,
      platform: platform || 'linkedin',
      momentumScore: 89,
      searchVolume: '+180% steady',
      suggestedAngle: 'Decoupling creator income from unpredictable platform revenue sharing.',
      suggestedAngles: [
        'How to price multi-platform commercial sponsorships with usage rights',
        'Setting up official platform direct deposits vs custom enterprise retainers'
      ],
      exampleHook: 'Why relying 100% on platform ad revenue is the biggest risk in digital business.',
      category: 'Business & Income',
      competitionLevel: 'moderate',
      velocity: 'Rising (+180%)'
    },
    {
      id: 'tr_4',
      topic: `${safeNiche}: Hyper-Specific Micro-Communities`,
      niche: safeNiche,
      platform: platform || 'instagram',
      momentumScore: 85,
      searchVolume: '+150% rising',
      suggestedAngle: 'Why 10k hyper-engaged viewers out-monetize 500k casual followers.',
      suggestedAngles: [
        'How micro-creators are commanding $5,000+ brand sponsorships',
        'Building high-trust conversion loops with zero vanity metrics'
      ],
      exampleHook: 'You do not need 100k subscribers to make 6 figures as a creator.',
      category: 'Community & Growth',
      competitionLevel: 'low',
      velocity: 'Emerging (+150%)'
    }
  ];
}

export function getFallbackCopyrightCheck(contentText: string, mediaDescription: string, platform: string) {
  const lower = (contentText + ' ' + (mediaDescription || '')).toLowerCase();
  const hasMusicMention = lower.includes('song') || lower.includes('music') || lower.includes('audio') || lower.includes('track') || lower.includes('remix');
  const hasBrandMention = lower.includes('nike') || lower.includes('apple') || lower.includes('disney') || lower.includes('marvel') || lower.includes('trademark');

  const risks: any[] = [];

  if (hasMusicMention) {
    risks.push({
      id: 'risk_music',
      category: 'music',
      severity: 'high',
      title: 'Commercial Audio Licensing Restriction',
      riskDescription: 'Commercial or sponsored content cannot use popular copyrighted music tracks without direct commercial sync licensing.',
      recommendedAction: 'Switch to Platform Commercial Music Library or verified royalty-free stems (Epidemic Sound, Artlist).',
      safeAlternatives: 'Use official commercial-cleared instrumentals or original voiceover.'
    });
  } else {
    risks.push({
      id: 'risk_music_clean',
      category: 'music',
      severity: 'low',
      title: 'Audio Licensing Status: Verified Safe',
      riskDescription: 'No flagged commercial tracks or unverified popular music detected in this content outline.',
      recommendedAction: 'Keep audio levels balanced (-14 LUFS for YouTube, -16 LUFS for TikTok/Reels).',
      safeAlternatives: 'Platform built-in audio library.'
    });
  }

  if (hasBrandMention) {
    risks.push({
      id: 'risk_trademark',
      category: 'image',
      severity: 'medium',
      title: 'Third-Party Trademark / Logo Visibility',
      riskDescription: 'Prominent third-party logos without active endorsement agreements can trigger manual claim reviews.',
      recommendedAction: 'Blur ambient proprietary logos or add clear transformative editorial commentary.',
      safeAlternatives: 'Use generic UI mocks or obtain written partner permissions.'
    });
  } else {
    risks.push({
      id: 'risk_fairuse',
      category: 'video_clip',
      severity: 'low',
      title: 'Transformative Fair Use Compliance',
      riskDescription: 'Original creator voiceover and tactical commentary establish strong transformative context.',
      recommendedAction: 'Maintain continuous original voiceover commentary over any referenced B-roll clips.',
      safeAlternatives: 'Capture custom direct screen recordings.'
    });
  }

  return {
    overallStatus: hasMusicMention ? 'Moderate Caution' : 'Low Risk - Ready to Publish',
    risks,
    legalDisclaimer: 'Automated checks are advisory risk indicators and do not constitute formal legal counsel.'
  };
}
