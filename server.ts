import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  generateCoachReply,
  getFallbackNextActions,
  getFallbackContent,
  getFallbackRepurposedVersions,
  getFallbackAnalysis,
  getFallbackTrends,
  getFallbackCopyrightCheck,
} from './src/serverFallbacks';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY' && key.trim().length > 5) {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
        });
      } catch (err) {
        console.warn('GoogleGenAI initialization warning:', err);
      }
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    const hasKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({ status: 'ok', geminiAvailable: hasKey });
  });

  // AI Creator Coach
  app.post('/api/ai/coach', async (req, res) => {
    try {
      const { message, history, creatorContext } = req.body;
      const ai = getAI();

      if (ai) {
        try {
          const prompt = `You are CreatorHub AI Creator Coach, an elite, strategic, highly actionable advisor for content creators.
Your mission is to help creators answer: "WHAT SHOULD I CREATE, DO, AND IMPROVE NEXT?"
You provide transparent, pragmatic, data-driven advice. You never give generic fluff. You always recommend specific actions, hooks, angles, and workflow tips.

Creator Context:
- Name: ${creatorContext?.name || 'Creator'}
- Niche: ${creatorContext?.niche || 'Digital Content'}
- Target Audience: ${creatorContext?.targetAudience || 'General audience'}
- Active Goals: ${JSON.stringify(creatorContext?.goals || [])}
- Connected Platforms: ${JSON.stringify(creatorContext?.platforms || [])}

User message: ${message || 'Give me my strategic daily briefing and top recommendations for today.'}

Provide your response in structured, direct, motivating prose with actionable next steps.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
          });

          if (response?.text) {
            return res.json({ reply: response.text, source: 'gemini' });
          }
        } catch (geminiError: any) {
          console.warn('Gemini API note (switching to local Creator Intelligence engine):', geminiError?.message || geminiError);
        }
      }

      // High quality dynamic fallback response tailored to context
      const reply = generateCoachReply(message, creatorContext);
      return res.json({
        reply,
        source: 'local_heuristic',
      });
    } catch (error: any) {
      console.warn('Error in /api/ai/coach, serving fallback:', error?.message);
      const reply = generateCoachReply(req.body?.message, req.body?.creatorContext);
      res.json({ reply, source: 'local_heuristic' });
    }
  });

  // What Should I Do Next Engine
  app.post('/api/ai/next-actions', async (req, res) => {
    try {
      const { creatorContext, activeProjects, recentMetrics } = req.body;
      const ai = getAI();

      if (ai) {
        try {
          const prompt = `You are the "What Should I Do Next?" engine for CreatorHub.
Analyze this creator's situation:
- Niche: ${creatorContext?.niche}
- Projects: ${JSON.stringify(activeProjects?.slice(0, 4) || [])}
- Metrics: ${JSON.stringify(recentMetrics || {})}

Return a strictly valid JSON array of 3 or 4 prioritized action objects.
Each object must have:
- id: string
- priority: one of "high", "opportunity", "schedule", "improvement"
- category: one of "urgent", "content", "audience", "optimization"
- title: concise title
- reason: why this matters now
- supportingInformation: real data or timing context
- suggestedAction: explicit concrete action
- actionButtonText: 2-4 words button label
- actionTarget: one of "project", "repurpose", "analyzer", "calendar", "coach"
- score: number between 70 and 99

Return ONLY the raw JSON array. Do not enclose in markdown code fences if possible, or use standard json.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            }
          });

          if (response?.text) {
            const parsed = JSON.parse(response.text);
            if (Array.isArray(parsed) && parsed.length > 0) {
              return res.json({ actions: parsed });
            }
          }
        } catch (geminiError: any) {
          console.warn('Gemini API note in next-actions, serving fallback:', geminiError?.message || geminiError);
        }
      }

      const actions = getFallbackNextActions(creatorContext, activeProjects, recentMetrics);
      return res.json({ actions });
    } catch (error: any) {
      console.warn('Error in /api/ai/next-actions, serving fallback:', error?.message);
      const actions = getFallbackNextActions(req.body?.creatorContext, req.body?.activeProjects, req.body?.recentMetrics);
      res.json({ actions });
    }
  });

  // AI Content Generator
  app.post('/api/ai/generate-content', async (req, res) => {
    try {
      const { platform, contentType, topic, niche, tone, targetAudience } = req.body;
      const ai = getAI();

      if (ai) {
        try {
          const prompt = `You are the CreatorHub AI Content Creation Engine.
Generate optimized content for:
- Platform: ${platform || 'YouTube'}
- Content Type: ${contentType || 'Video / Post'}
- Topic: ${topic}
- Niche: ${niche}
- Tone: ${tone || 'Authoritative yet accessible'}
- Target Audience: ${targetAudience}

Return JSON with:
- titles: array of 3 punchy, high-CTR titles
- hooks: array of 3 high-retention opening hooks tailored to the platform
- script: comprehensive outline / script with timestamp cues and visual directions
- hashtags: array of 5-8 relevant hashtags
- keywords: array of 5 SEO/discoverability keywords
- callToAction: strong, engagement-driving CTA`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            }
          });

          if (response?.text) {
            const parsed = JSON.parse(response.text);
            if (parsed && typeof parsed === 'object') {
              return res.json(parsed);
            }
          }
        } catch (geminiError: any) {
          console.warn('Gemini API note in generate-content, serving fallback:', geminiError?.message || geminiError);
        }
      }

      const fallback = getFallbackContent({ platform, contentType, topic, niche, tone, targetAudience });
      return res.json(fallback);
    } catch (error: any) {
      console.warn('Error in /api/ai/generate-content, serving fallback:', error?.message);
      const fallback = getFallbackContent(req.body || {});
      res.json(fallback);
    }
  });

  // Repurpose Engine
  app.post('/api/ai/repurpose', async (req, res) => {
    try {
      const { sourceContent, sourcePlatform, targetPlatforms, niche } = req.body;
      const ai = getAI();

      if (ai) {
        try {
          const prompt = `You are CreatorHub's Content Repurposing Engine.
Source Content: "${sourceContent}"
Original Platform: ${sourcePlatform || 'General'}
Niche: ${niche || 'Creator Economy'}
Target Platforms to adapt for: ${JSON.stringify(targetPlatforms || ['youtube', 'instagram', 'tiktok', 'twitter', 'linkedin'])}

ADAPTATION RULES:
Do NOT simply copy-paste. Respect each platform's distinct native psychology:
- YouTube: High intrigue titles, clear descriptions, retention bookmarks.
- Instagram: Visual hook, readable line breaks, high-engagement question CTA, aesthetic hashtags.
- TikTok: Ultra-fast 1.5s hook, punchy visual cues, search-optimized tags.
- X (Twitter): Sharp 1st-tweet thread hook with curiosity gap, bulleted value points, RT ask.
- LinkedIn: Professional framing, personal founder/creator lesson, discussion question.

Return a JSON object with a key "versions" mapping each target platform to an object:
{
  "platform": platform_name,
  "title": title_string,
  "hook": opening_hook_string,
  "caption": full_text_or_script_body,
  "hashtags": array_of_tags,
  "callToAction": cta_string,
  "formatSuggestion": format_string
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            }
          });

          if (response?.text) {
            const parsed = JSON.parse(response.text);
            if (parsed && parsed.versions) {
              return res.json(parsed);
            }
          }
        } catch (geminiError: any) {
          console.warn('Gemini API note in repurpose, serving fallback:', geminiError?.message || geminiError);
        }
      }

      const versions = getFallbackRepurposedVersions(sourceContent, sourcePlatform, targetPlatforms, niche);
      return res.json({ versions });
    } catch (error: any) {
      console.warn('Error in /api/ai/repurpose, serving fallback:', error?.message);
      const versions = getFallbackRepurposedVersions(req.body?.sourceContent, req.body?.sourcePlatform, req.body?.targetPlatforms, req.body?.niche);
      res.json({ versions });
    }
  });

  // Pre-Publish Content Analyzer
  app.post('/api/ai/analyze-content', async (req, res) => {
    try {
      const { title, caption, platform, niche, targetAudience, hook } = req.body;
      const ai = getAI();

      if (ai) {
        try {
          const prompt = `You are CreatorHub Pre-Publish Content Analyzer.
Evaluate this draft:
- Platform: ${platform}
- Title: ${title}
- Hook: ${hook || ''}
- Caption/Script: ${caption}
- Niche: ${niche}
- Target Audience: ${targetAudience}

Evaluate objectively without false guarantees. Return JSON:
{
  "titleClarity": number (0-100),
  "audienceRelevance": number (0-100),
  "hookStrength": number (0-100),
  "keywordRelevance": number (0-100),
  "overallScore": number (0-100),
  "hookCritique": string (constructive analysis of the opening hook),
  "suggestedBetterHooks": array of 3 stronger, punchier hook alternatives,
  "keywordSuggestions": array of 4-6 high-traffic search keywords to include,
  "recommendations": array of 3-4 specific tactical improvements
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            }
          });

          if (response?.text) {
            const parsed = JSON.parse(response.text);
            if (parsed && parsed.overallScore !== undefined) {
              return res.json(parsed);
            }
          }
        } catch (geminiError: any) {
          console.warn('Gemini API note in analyze-content, serving fallback:', geminiError?.message || geminiError);
        }
      }

      const analysis = getFallbackAnalysis(title, caption, platform, niche, targetAudience, hook);
      return res.json(analysis);
    } catch (error: any) {
      console.warn('Error in /api/ai/analyze-content, serving fallback:', error?.message);
      const analysis = getFallbackAnalysis(
        req.body?.title,
        req.body?.caption,
        req.body?.platform,
        req.body?.niche,
        req.body?.targetAudience,
        req.body?.hook
      );
      res.json(analysis);
    }
  });

  // Trend Radar Engine
  app.post('/api/ai/trend-radar', async (req, res) => {
    try {
      const { niche, platform } = req.body;
      const ai = getAI();

      if (ai) {
        try {
          const prompt = `You are CreatorHub Trend Radar.
Identify 4 high-momentum, current trending topics for:
- Niche: ${niche || 'Creative Tech'}
- Platform: ${platform || 'All Platforms'}

Return JSON with a "trends" array containing objects with:
- id: string
- topic: trending concept or query
- niche: niche name
- platform: platform name
- momentumScore: number 75-99
- searchVolume: string (e.g. "+240% this week")
- suggestedAngle: unique creator angle to cover it
- exampleHook: gripping opening hook
- category: topic category`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            }
          });

          if (response?.text) {
            const parsed = JSON.parse(response.text);
            if (parsed && Array.isArray(parsed.trends) && parsed.trends.length > 0) {
              return res.json(parsed);
            }
          }
        } catch (geminiError: any) {
          console.warn('Gemini API note in trend-radar, serving fallback:', geminiError?.message || geminiError);
        }
      }

      const trends = getFallbackTrends(niche, platform);
      return res.json({ trends });
    } catch (error: any) {
      console.warn('Error in /api/ai/trend-radar, serving fallback:', error?.message);
      const trends = getFallbackTrends(req.body?.niche, req.body?.platform);
      res.json({ trends });
    }
  });

  // Copyright and Risk Assessment
  app.post('/api/ai/copyright-check', async (req, res) => {
    try {
      const { contentText, mediaDescription, platform } = req.body;
      const ai = getAI();

      if (ai) {
        try {
          const prompt = `You are CreatorHub Copyright & Content Risk Center.
Analyze this planned content for copyright, licensing, and platform policy risks:
- Platform: ${platform}
- Content Text: ${contentText}
- Media Description: ${mediaDescription || 'Standard creator video/media'}

Evaluate:
1. Music & commercial audio licensing concerns
2. Image / visual asset licensing
3. Video clip fair-use considerations
4. Duplicate / repetitive content flags

Return JSON:
{
  "overallStatus": string ("Low Risk", "Moderate Caution", or "High Risk Action Required"),
  "risks": array of objects with:
    - id: string
    - category: "music" | "image" | "video_clip" | "duplicate_text"
    - severity: "low" | "medium" | "high"
    - title: string
    - riskDescription: string
    - recommendedAction: string
    - safeAlternatives: string
  "legalDisclaimer": "Automated checks are risk indicators and do not guarantee copyright clearance or legal compliance."
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            }
          });

          if (response?.text) {
            const parsed = JSON.parse(response.text);
            if (parsed && parsed.risks) {
              return res.json(parsed);
            }
          }
        } catch (geminiError: any) {
          console.warn('Gemini API note in copyright-check, serving fallback:', geminiError?.message || geminiError);
        }
      }

      const report = getFallbackCopyrightCheck(contentText, mediaDescription, platform);
      return res.json(report);
    } catch (error: any) {
      console.warn('Error in /api/ai/copyright-check, serving fallback:', error?.message);
      const report = getFallbackCopyrightCheck(req.body?.contentText, req.body?.mediaDescription, req.body?.platform);
      res.json(report);
    }
  });

  // Vite Middleware in Dev or Static Serving in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CreatorHub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start CreatorHub server:', err);
});
