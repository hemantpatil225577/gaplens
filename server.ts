import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with User-Agent header as required
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface SourceItem {
  id: string;
  title: string;
  url?: string;
  authorOrOrg?: string;
  dateOrCycle?: string;
  sourceType: string;
  content: string;
}

// 1. URL Fetch Proxy Endpoint for retrieving source text
app.post('/api/fetch-url', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Valid URL is required' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 DigitalDarkSpot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(400).json({ error: `Failed to fetch URL: HTTP ${response.status} ${response.statusText}` });
    }

    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : new URL(url).hostname;

    // Extract date meta tags if available
    const dateMetaMatch = html.match(/<meta[^>]+(?:name|property)=["'](?:article:published_time|date|publishdate|pubdate|DC.date.issued)["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["'](?:article:published_time|date|publishdate|pubdate|DC.date.issued)["']/i);
    const dateOrCycle = dateMetaMatch ? dateMetaMatch[1].slice(0, 10) : '';

    // Strip script, style, nav, footer, header tags
    let cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();

    // Cap text to reasonable token size
    if (cleanText.length > 15000) {
      cleanText = cleanText.slice(0, 15000) + '... [Content truncated for analysis]';
    }

    return res.json({
      title,
      url,
      dateOrCycle,
      content: cleanText,
    });
  } catch (err: any) {
    console.error('Fetch URL error:', err);
    return res.status(500).json({
      error: err.name === 'AbortError' ? 'URL request timed out after 9 seconds' : (err.message || 'Failed to fetch content from URL'),
    });
  }
});

// 2. Primary Analysis Endpoint: Dark Spot, Contradiction, Temporal Decay & Verification Checklist Detection
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { topic, decisionGoal, sources, customFocus } = req.body;

    if (!topic || !sources || !Array.isArray(sources) || sources.length === 0) {
      return res.status(400).json({ error: 'Topic and at least one source are required' });
    }

    // Format sources text cleanly for Gemini prompt
    const formattedSources = sources.map((s: SourceItem, idx: number) => {
      const sourceId = s.id || `S${idx + 1}`;
      return `=== SOURCE [${sourceId}] ===
Title: ${s.title}
Source Type: ${s.sourceType || 'Unspecified'}
Published Date / Cycle: ${s.dateOrCycle || 'Unknown / Not stated'}
Author / Org: ${s.authorOrOrg || 'Unspecified'}
URL: ${s.url || 'N/A'}
Content:
${s.content}
=== END SOURCE [${sourceId}] ===`;
    }).join('\n\n');

    const systemInstruction = `You are GAPLENS, a specialized AI-assisted information gap auditor and epistemic validator.
Most search engines retrieve content and summarizers condense existing text. Your critical mission is to detect WHAT IS MISSING, WHAT IS IN CONFLICT, WHAT IS OUTDATED, and WHAT MUST BE VERIFIED before a user makes high-stakes decisions (e.g. scholarship/academic admissions, healthcare/clinical decisions, visa/immigration, legal procurement, investments).

Rules of Analysis:
1. SOURCED EVIDENCE VS AI INFERENCE: Clearly distinguish between facts explicitly stated in the sources and gaps/signals deduced by missing standard domain prerequisites.
2. CITATION DISCIPLINE: For every established fact or conflict, cite the exact source IDs (e.g. ["S1", "S2"]) and include verbatim or near-verbatim quote snippets.
3. CONFLICT DETECTION: Identify genuine contradictions or discrepancies between sources (e.g. differing dollar thresholds, conflicting deadlines, differing document requirements, incompatible eligibility criteria). Note why the difference might exist (e.g. updated cycle, different jurisdiction, third-party inaccuracy).
4. DARK SPOTS (INFORMATION GAPS): For the topic and decision goal, determine what crucial dimensions are completely absent or ambiguously addressed across ALL sources (e.g. renewal clauses, clawback terms, hidden fees, escalation contacts, specific disqualifiers).
5. TEMPORAL AUDIT: Identify sources that reference past application cycles, outdated statutory rules, or lack publication dates.
6. VERIFICATION CHECKLIST: Create a prioritized, highly actionable checklist of items the user must verify next, specifying which official office, portal, or authoritative document they should inspect.
7. Return valid, well-formed JSON matching the specified schema.`;

    const prompt = `Topic / Research Question: "${topic}"
Decision Goal: "${decisionGoal || 'Make a fully informed, high-stakes decision without blind spots'}"
Custom Focus Areas: "${customFocus || 'Standard comprehensive audit'}"

Here are the sources to evaluate:
${formattedSources}

Perform a rigorous, objective information-gap audit. Look deeply for omissions, conflicting statements, temporal mismatches, and unverified assumptions.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.OBJECT,
              properties: {
                topicSummary: { type: Type.STRING, description: '2-3 sentence synthesis of what is known across sources' },
                sourcesAnalyzedCount: { type: Type.INTEGER },
                criticalDarkSpotsCount: { type: Type.INTEGER },
                potentialConflictsCount: { type: Type.INTEGER },
                outdatedSourcesCount: { type: Type.INTEGER },
                overallCompletenessScore: { type: Type.INTEGER, description: 'Estimated coverage score from 0 to 100 for making this decision safely' },
                decisionConfidenceNote: { type: Type.STRING, description: 'Prudent advisory note on whether sources are currently sufficient' },
              },
              required: ['topicSummary', 'overallCompletenessScore', 'decisionConfidenceNote'],
            },
            establishedFacts: {
              type: Type.ARRAY,
              description: 'Key confirmed facts agreed upon across sources with citation references',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  fact: { type: Type.STRING },
                  evidenceSnippet: { type: Type.STRING },
                  sourceIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                  consensusLevel: { type: Type.STRING, description: 'unanimous | majority | single_source' },
                  confidence: { type: Type.STRING, description: 'high | moderate' },
                },
                required: ['id', 'fact', 'evidenceSnippet', 'sourceIds', 'consensusLevel'],
              },
            },
            darkSpots: {
              type: Type.ARRAY,
              description: 'Critical missing information dimensions not answered by any source reviewed',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  category: { type: Type.STRING, description: 'e.g. Eligibility & Renewal, Deadlines & Timelines, Financial & Costs, Required Documentation, Penalties & Clawbacks, Procedure' },
                  gapTitle: { type: Type.STRING },
                  whyItMatters: { type: Type.STRING, description: 'Concrete risk or high-stakes impact of this omission' },
                  severity: { type: Type.STRING, description: 'critical | high | moderate' },
                  missingDetails: { type: Type.ARRAY, items: { type: Type.STRING } },
                  suggestedQuestionsToAsk: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendedSourceTypeToConsult: { type: Type.STRING, description: 'Specific official office or document type to check' },
                },
                required: ['id', 'category', 'gapTitle', 'whyItMatters', 'severity', 'missingDetails', 'recommendedSourceTypeToConsult'],
              },
            },
            conflictingClaims: {
              type: Type.ARRAY,
              description: 'Direct or implicit contradictions between different sources',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  topic: { type: Type.STRING },
                  natureOfConflict: { type: Type.STRING, description: 'direct_contradiction | different_conditions | temporal_discrepancy | ambiguous_wording' },
                  severity: { type: Type.STRING, description: 'high | medium | low' },
                  claimA: {
                    type: Type.OBJECT,
                    properties: {
                      sourceId: { type: Type.STRING },
                      sourceTitle: { type: Type.STRING },
                      claimText: { type: Type.STRING },
                      exactQuote: { type: Type.STRING },
                      dateOrCycle: { type: Type.STRING },
                    },
                    required: ['sourceId', 'claimText', 'exactQuote'],
                  },
                  claimB: {
                    type: Type.OBJECT,
                    properties: {
                      sourceId: { type: Type.STRING },
                      sourceTitle: { type: Type.STRING },
                      claimText: { type: Type.STRING },
                      exactQuote: { type: Type.STRING },
                      dateOrCycle: { type: Type.STRING },
                    },
                    required: ['sourceId', 'claimText', 'exactQuote'],
                  },
                  analysis: { type: Type.STRING, description: 'Why this difference likely arose' },
                  resolutionAdvice: { type: Type.STRING, description: 'How to resolve which one is correct' },
                },
                required: ['id', 'topic', 'severity', 'claimA', 'claimB', 'resolutionAdvice'],
              },
            },
            temporalWarnings: {
              type: Type.ARRAY,
              description: 'Warnings about outdated cycles, stale documents, or missing publication dates',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  sourceId: { type: Type.STRING },
                  sourceTitle: { type: Type.STRING },
                  statedDateOrCycle: { type: Type.STRING },
                  warningType: { type: Type.STRING, description: 'expired_cycle | outdated_regulations | undated_risk | temporal_drift' },
                  explanation: { type: Type.STRING },
                  riskLevel: { type: Type.STRING, description: 'high | medium | low' },
                  recommendedVerification: { type: Type.STRING },
                },
                required: ['id', 'sourceId', 'warningType', 'explanation', 'riskLevel', 'recommendedVerification'],
              },
            },
            verificationChecklist: {
              type: Type.ARRAY,
              description: 'Prioritized checklist of specific actions the user must complete next to eliminate blind spots',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  priority: { type: Type.STRING, description: 'critical | high | medium' },
                  actionItem: { type: Type.STRING },
                  targetEntityOrDocument: { type: Type.STRING },
                  rationale: { type: Type.STRING },
                  verified: { type: Type.BOOLEAN },
                  relatedGapOrConflictId: { type: Type.STRING },
                },
                required: ['id', 'priority', 'actionItem', 'targetEntityOrDocument', 'rationale'],
              },
            },
            unansweredQuestions: {
              type: Type.ARRAY,
              description: 'Critical strategic questions that prudent decision makers must get answered',
              items: { type: Type.STRING },
            },
          },
          required: [
            'overview',
            'establishedFacts',
            'darkSpots',
            'conflictingClaims',
            'temporalWarnings',
            'verificationChecklist',
            'unansweredQuestions',
          ],
        },
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);

    return res.json(parsedData);
  } catch (err: any) {
    console.error('Audit Analysis Error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to complete GapLens audit analysis',
    });
  }
});

// 3. Blind Spot Interactive Probe Endpoint: user asks "Does any source cover X?"
app.post('/api/probe-question', async (req: Request, res: Response) => {
  try {
    const { question, sources, topic } = req.body;
    if (!question || !sources || !Array.isArray(sources)) {
      return res.status(400).json({ error: 'Question and sources are required' });
    }

    const formattedSources = sources.map((s: SourceItem, idx: number) => {
      return `[${s.id || `S${idx + 1}`}] ${s.title} (${s.sourceType}, Date: ${s.dateOrCycle || 'Unknown'}):
${s.content.slice(0, 4000)}`;
    }).join('\n\n');

    const prompt = `Topic Context: "${topic || 'General research'}"
User Question / Specific Blind Spot Probe: "${question}"

Sources evaluated:
${formattedSources}

Task:
Determine whether this specific question is:
1. "COVERED": Clearly answered with direct evidence in one or more sources. Provide the citation and exact quote.
2. "PARTIAL / AMBIGUOUS": Mentioned peripherally, but key criteria or conditions are missing or unclear.
3. "CONFIRMED DARK SPOT": Completely absent in all reviewed sources.

Return JSON with:
{
  "status": "COVERED" | "PARTIAL_AMBIGUOUS" | "CONFIRMED_DARK_SPOT",
  "explanation": "Clear explanation of the status",
  "evidenceQuotes": [{"sourceId": "S1", "quote": "..."}],
  "whatIsMissing": "What critical details are still absent",
  "recommendedVerification": "Specific action to confirm this reliably"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Probe question error:', err);
    return res.status(500).json({ error: err.message || 'Failed to probe question' });
  }
});

// Production vs Development static and vite middlewares
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GapLens platform listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
