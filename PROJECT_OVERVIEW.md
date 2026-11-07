# GapLens: Comprehensive Project Overview & Technical Dossier

> **AI-Assisted Epistemic Gap & Void Detection Platform**  
> *Auditing what is missing, contradictory, and dangerously outdated across scattered web sources before high-stakes decisions are finalized.*

---

## 1. Executive Summary & Project Details

### 1.1 Context & The Problem: "The Digital Dark Spot"
Modern search engines and retrieval-augmented generation (RAG) models operate on a fundamental paradigm: **retrieval of positive presence**. When a user queries information regarding a government scholarship, university admission, cross-border visa, financial grant, or clinical guideline, current search engines return relevant documents and LLM summarizers distill what is written.

However, in high-stakes decisions, **the most dangerous risk is not what is in the text—it is what has been omitted, contradicted, or superseded.**

This phenomenon is known as the **"Digital Dark Spot"** or **"Retrieval Blindness"**:
- **Omission Blindness:** Official guidelines often omit critical edge cases, silent disqualifiers, renewal GPA criteria, clawback obligations, or hidden prerequisites that third-party forums discuss only informally.
- **Contradiction Ambiguity:** Third-party blogs, university advisories, and official circulars frequently state mutually exclusive eligibility thresholds (e.g., family income limits of $45,000 vs. $60,000; requirement of 1 vs. 2 letters of recommendation).
- **Temporal Decay:** Outdated web pages from previous fiscal or academic cycles remain highly ranked in search engines, quoting expired deadlines, obsolete forms, or superseded policy rules without clear deprecation warnings.

When users make life-altering decisions based solely on conventional search or simple LLM summaries, these invisible dark spots lead to rejected applications, forfeited funding, financial penalties, or legal disqualification.

### 1.2 The GapLens Mission
**GapLens is an epistemic auditor designed to inspect the negative space of information.**  
Instead of asking *"What do these documents say?"*, GapLens asks:
> *"Across all these sources, what critical requirements are completely absent? Where do these sources disagree with each other on factual terms? Which claims are tethered to obsolete temporal cycles? And what specific steps must the user take with issuing authorities to resolve these uncertainties?"*

GapLens empowers students, grant applicants, legal researchers, compliance officers, and everyday citizens to cross-examine multiple web sources simultaneously, illuminating latent blind spots before irreversible commitments are made.

---

## 2. Comprehensive Feature Breakdown

GapLens delivers an end-to-end audit pipeline organized into eight dedicated modules:

### 2.1 Multi-Corpus Ingestion & Live Web Scraper Proxy
- **Dual-Mode Input:** Users can input live web URLs, paste raw unstructured text (circulars, terms & conditions, forum threads, PDF excerpts), or instantly load pre-configured real-world benchmark datasets.
- **Server-Side Scraper Proxy (`/api/fetch-url`):** A robust backend endpoint cleans DOM structures, extracts main article content, removes tracking noise/ads, and parses publication dates and metadata heuristics.
- **Benchmark Library:** Ships with pre-loaded realistic scenarios:
  1. *National Merit & Need Scholarship Application* (Official portal vs. Alumni advice blog vs. Financial aid forum).
  2. *Cross-Border Student Visa & Financial Clearance* (Embassy circulars vs. Student advisory wikis).
  3. *Small Business Tech Modernization Grant* (Procurement portal vs. Third-party vendor guides).

### 2.2 Sourced vs. Inferred Epistemic Segregation
- **Strict Evidence Boundaries:** GapLens prevents AI hallucination smoothing by strictly categorizing every finding into two distinct epistemic tiers:
  - **Direct Sourced Findings:** Verifiable facts explicitly stated in evaluated texts, mapped to their exact source origin.
  - **Inferred Dark Spots:** Crucial requirements derived from domain-specific ontologies (e.g., standard grant governance standards) that are conspicuously missing from all ingested sources.
- **Severity Classification:** Gaps are color-coded and ranked by operational impact: **Critical** (leads to immediate failure/rejection), **High** (causes delay or financial clawback), and **Moderate** (advisory or administrative nuance).

### 2.3 Forensic Contradiction Radar
- **Cross-Source Factual Discrepancies:** Identifies direct conflicts between sources on numerical values, deadlines, eligibility limits, and procedural requirements.
- **Verbatim Citation Trails:** Displays side-by-side comparative quotes with source IDs, publication dates, and authoritativeness weights so users can immediately see who said what.
- **Conflict Resolution Guidance:** Evaluates which source carries higher legal or institutional authority and recommends which figure to verify first.

### 2.4 Temporal Decay & Recency Warning Engine
- **Lifecycle & Cycle Extraction:** Automatically dates documents and tags them against the active fiscal, academic, or policy cycle.
- **Staleness Alerts:** Warns users when an advisory post dates from an older cycle (e.g., 2023 handbook rules applied to a 2025/2026 application).
- **Undated Warning:** Explicitly flags third-party guides and unverified wikis that conceal their last-updated timestamps.

### 2.5 Prioritized Verification Checklist & Authority Routing
- **Actionable Step-by-Step Punchlist:** Transforms abstract analytical insights into a concrete, prioritized pre-flight checklist.
- **Authority Routing:** Specifies the exact institutional office (e.g., *"University Financial Aid Bursar"*, *"Consular Visa Officer"*, *"State Grant Procurement Committee"*) that must be contacted to resolve each uncertainty.
- **Interactive Triage:** Users can toggle status items between *Pending*, *In Progress*, and *Verified*, keeping track of their audit workflow in real time.

### 2.6 Interactive Blind Spot Probe & "What-If" Decision Simulator
- **Natural Language Probe:** Users can query the ingested corpus for specific hidden terms (e.g., *"Does any source mention criminal background checks or drug screening?"*).
- **"What-If" Stress Testing:** Users simulate risky decision paths (e.g., *"What happens if I submit my application with an unofficial transcript because my university is closed for winter break?"*).
- **Failure Mode Projections:** Simulates potential administrative consequences, identifying whether the action results in immediate disqualification, a cure period, or an automatic waiver.

### 2.7 Visual Topology & Polar Dark Spot Matrix
- **Custom Polar Severity Radar:** A 6-axis epistemic radar mapping coverage and gap vulnerability across:
  1. *Eligibility Criteria*
  2. *Financial Obligations & Clawbacks*
  3. *Renewal / Continuation Rules*
  4. *Procedural Deadlines*
  5. *Jurisdictional Limits*
  6. *Post-Event Liabilities*
- **Interactive Force-Directed Source Network:** A visual topological graph rendering the web of ingested sources linked to discovered gaps and contradictions, revealing which source is the primary origin of conflicting claims.

### 2.8 Executive Audio Briefing & Dossier Exporter
- **Audio Executive Summary:** A built-in voice synthesizer (using the Web Speech API) delivers a spoken debrief of high-risk findings for rapid review.
- **Audit Dossier Exporter:** One-click export to comprehensive Markdown or JSON reports with timestamps, checksums, and citation trails for legal, academic, or administrative archival.

---

## 3. Uniqueness & Competitive Differentiation

| Capability / Attribute | Standard Search Engine (Google, Bing) | Generic LLM Summarizer (ChatGPT, Claude) | GapLens Platform |
|---|---|---|---|
| **Core Objective** | Retrieve relevant pages containing keyword matches | Condense and rephrase provided text | Audit the **negative space** (what is missing or conflicting) |
| **Handling of Omissions** | Ignores omitted content completely | Hallucinates or assumes reasonable defaults | Systematically audits 6 epistemic dimensions for complete voids |
| **Contradiction Detection** | Indexes conflicting pages without comparative reconciliation | Often merges conflicting figures into an averaged summary | Explicit side-by-side verbatim quotes with trust scoring |
| **Temporal Awareness** | Prioritizes SEO rank, often surfacing outdated blogs | Treats past-year guidance as timeless truth | Tags cycle-decay and warns against superseded guidelines |
| **Hallucination Safeguards** | High noise ratio | "Helpful" hallucination smoothing | Strict segregation between **Sourced Facts** and **Inferred Gaps** |
| **Actionable Output** | List of hyperlinks | Paragraphs of descriptive prose | Prioritized verification checklist routed to specific authorities |

### Key Architectural Differentiators:
1. **Auditing the Negative Space:** Unlike traditional AI tools trained to generate plausible answers, GapLens's prompt ontology and heuristic rules are specifically primed to detect *epistemic absences*.
2. **Provenance & Traceability:** Every identified contradiction is anchored by verbatim quotes from the ingested documents, completely eliminating black-box opacity.
3. **Fail-Safe Fallback Engine:** If the Gemini API is unreachable or rate-limited, GapLens automatically activates a deterministic offline heuristic analyzer, guaranteeing zero downtime during audits.

---

## 4. Technical Stack & Implementation Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          GapLens Client (React 19)                    │
│  ┌───────────────────────┐  ┌───────────────────┐  ┌────────────────┐ │
│  │   AnalysisDashboard   │  │   DarkSpotMatrix  │  │ DecisionSim    │ │
│  └───────────────────────┘  └───────────────────┘  └────────────────┘ │
│  ┌───────────────────────┐  ┌───────────────────┐  ┌────────────────┐ │
│  │   SourcesPanel        │  │ PresentationModal │  │ AudioBriefing  │ │
│  └───────────────────────┘  └───────────────────┘  └────────────────┘ │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ REST / API Calls
┌────────────────────────────────────▼───────────────────────────────────┐
│                    Express.js Backend (server.ts)                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ POST /api/analyze-sources   -> Gemini 3.8 Flash + Schema Engine  │  │
│  │ POST /api/simulate-decision -> Scenario stress tester            │  │
│  │ POST /api/fetch-url         -> Cheerio Web Scraper & Sanitizer   │  │
│  │ GET  /api/health            -> System diagnostics & uptime check │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴────────────────────────┐
           ▼                                                  ▼
┌─────────────────────────────┐                    ┌─────────────────────┐
│  Google Gemini 3.8 Flash    │                    │  Live Web Scraper   │
│  (@google/genai SDK)        │                    │  (Cheerio / Axios)  │
│  - Strict JSON Schemas      │                    │  - DOM Sanitization │
│  - Low Temperature (0.2)    │                    │  - Date extraction  │
└─────────────────────────────┘                    └─────────────────────┘
```

### 4.1 Frontend Layer
- **Framework:** React 19 SPA running on Vite with TypeScript for strict type safety.
- **Styling & Design System:** Tailwind CSS v4 featuring an "Ocean Clarity" aesthetic (clean white canvases, slate typography, and sky/cyan precision accents).
- **Icons & Motion:** Lucide React vector icons with subtle Framer Motion / CSS micro-animations.
- **Data Visualization:** Handcrafted SVG Polar Radar chart and dynamic canvas-free network topology graph.
- **Audio Synthesis:** Web Audio / SpeechSynthesis API for browser-native spoken executive briefings.

### 4.2 Backend & API Layer
- **Server:** Node.js + Express (`server.ts`) configured with Vite middleware in development and static asset streaming in production.
- **Web Scraping Proxy:** `/api/fetch-url` uses Axios and Cheerio to fetch external articles, strip boilerplate scripts/stylesheets, and extract clean text and publication timestamps.
- **API Security:** Server-side proxy architecture isolates Google Gemini API keys from the client runtime; client applications never expose API keys.

### 4.3 AI & Epistemic Reasoning Engine
- **Foundation Model:** Google Gemini 3.8 Flash via the modern `@google/genai` TypeScript SDK.
- **Structured Schema Enforcement:** Gemini calls use `responseMimeType: "application/json"` paired with strict response schemas to guarantee deterministic JSON output without markdown delimiters.
- **Temperature Optimization:** Low temperature (`0.2`) to minimize hallucination and enforce rigid analytical fidelity.
- **Deterministic Heuristic Fallback:** Built-in keyword, temporal pattern matching, and discrepancy heuristics provide comprehensive audit output even if the LLM backend encounters rate limits.

---

## 5. Demonstration Benchmarks & Validation Results

| Test Scenario | Ingested Sources | Key Detected Dark Spots | Key Detected Contradictions | Temporal Alerts |
|---|---|---|---|---|
| **National STEM Scholarship** | 1. Official Guidelines<br>2. Alumni Experience Blog<br>3. Reddit Financial Aid Post | • Renewal GPA cutoff omitted in official rules.<br>• Summer research funding policy absent.<br>• Tax liability of stipend unaddressed. | • Source A: Maximum family income $45,000.<br>• Source B: Eligibility up to $60,000.<br>• Source A requires 1 recommendation; Source C states 2. | • Alumni blog verified to reference 2023 handbook instead of 2025/2026 active cycle. |
| **Cross-Border Student Visa** | 1. Embassy Circular<br>2. University International Office<br>3. Community Wiki | • Proof of liquid funds duration unspecified.<br>• Health insurance repatriation coverage absent. | • Discrepancy on biometric processing fee ($160 vs. $185).<br>• Conflicting medical clinic authorization lists. | • Community wiki dated 18 months prior; misses recent consular regulation amendments. |
| **Small Business Tech Grant** | 1. State Procurement RFP<br>2. Vendor Blog<br>3. Chamber of Commerce FAQ | • Clawback penalty terms for early employee departures omitted.<br>• Matching fund escrow timeline unspecified. | • Commercial software eligibility conflicted between cloud vs. on-premise licensing. | • RFP references superseded state administrative code revision. |

---

## 6. Future Scope & Product Roadmap

```
  Phase 1 (Q1-Q2)             Phase 2 (Q3)               Phase 3 (Q4)               Phase 4 (Beyond)
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌───────────────────┐
│ Browser Sentinel│  ──►  │ Live Web Crawl  │  ──►  │ Enterprise API  │  ──►  │ Fine-Tuned Void   │
│ Chrome Extension│       │ & Grounding     │       │ & CI/CD Scanner │       │ SLM Models        │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └───────────────────┘
```

### Phase 1: Real-Time Browser Sentinel Extension
- **Chrome / Firefox Extension:** Passively monitors user browsing as they review scholarship portals, visa forms, or medical guidelines.
- **Floating Epistemic HUD:** Alerts the user in real time when the page they are viewing contradicts a page they reviewed 5 minutes earlier or lacks standard domain requirements.

### Phase 2: Autonomous Web Crawling & Live Grounding
- **One-Click Authority Crawl:** Users input a single topic (e.g., *"Fulbright Foreign Student Program India 2026"*), and GapLens automatically discovers, fetches, and cross-audits the top 10 official and community sources.
- **Live Search Grounding:** Integrates Gemini Grounding with Google Search to independently verify if a missing deadline has been published on an auxiliary government gazette.

### Phase 3: Enterprise Compliance & Legal Contract Auditor
- **Multi-Party Contract Review:** Cross-audits NDAs, Master Service Agreements (MSAs), and Statements of Work (SOWs) across vendor proposals to pinpoint absent indemnification clauses or conflicting liability caps.
- **CI/CD Policy Scanners:** Automated pull-request bot that audits corporate policy wikis, employee handbooks, and regulatory filings for temporal obsolescence before publication.

### Phase 4: Collaborative Multi-Auditor Workspace & Specialized Epistemic SLMs
- **Team Workspaces:** Shared audit dossiers where legal, procurement, or academic advisory teams can assign verification checklist items to specific team members.
- **Specialized Small Language Models (SLMs):** Train lightweight, domain-specific models optimized specifically for negative space reasoning in medical protocols, legal disclosures, and public benefit eligibility.

---

## 7. Conclusion

In an era where AI models produce plausible summaries at blistering speeds, **the greatest danger is trusting a summary that looks complete but conceals critical omissions**.

GapLens pioneers a shift from **Retrieval of the Present** to **Auditing of the Absent**. By systematically identifying omissions, cross-checking conflicting claims, detecting temporal decay, and synthesizing actionable verification steps, GapLens serves as the essential truth-testing layer for high-stakes human decision making.

---
*Created by Hemant Patil | Apache-2.0 Open Source License | Powered by Google Gemini*
