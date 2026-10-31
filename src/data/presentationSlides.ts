export interface SlideData {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  keyPoints: {
    heading: string;
    details: string;
    badge?: string;
    type?: 'neutral' | 'danger' | 'warning' | 'success';
  }[];
  speakerNotes: string;
  durationEst: string;
}

export const PRESENTATION_SLIDES: SlideData[] = [
  {
    id: 1,
    category: 'HACKATHON PRESENTATION 2026',
    title: 'GapLens',
    subtitle: 'AI-Assisted Epistemic Gap & Void Detection Platform',
    keyPoints: [
      {
        heading: 'The Paradigm Shift',
        details: 'Every AI summarizes what has been written. GapLens exposes the critical omissions that will get you blindsided.',
        badge: 'CORE MISSION',
        type: 'success',
      },
      {
        heading: 'Epistemic Auditing',
        details: 'Audits absence over retrieval: evaluates what critical facts are missing before irreversible decisions.',
        badge: 'INNOVATION',
        type: 'neutral',
      },
      {
        heading: 'Open Source & Ready',
        details: 'Full-stack TypeScript + Express + Gemini 3.8 Flash pipeline with Apache 2.0 license.',
        badge: 'GITHUB REPO',
        type: 'neutral',
      },
    ],
    speakerNotes:
      "Good morning judges and fellow builders. I'm thrilled to present GapLens: an AI-Assisted Epistemic Gap & Void Detection Platform. In today's AI landscape, virtually every LLM excels at summarizing what exists. But when humans make high-stakes decisions—whether accepting an $80k scholarship, enrolling in a clinical trial, or signing an enterprise cloud MSA—what blindsides them is almost never what is written on the page. It's what was silently omitted. GapLens audits what's missing before you commit.",
    durationEst: '30s',
  },
  {
    id: 2,
    category: 'THE CORE PROBLEM',
    title: 'The Digital Dark Spot & Retrieval Blindness',
    subtitle: 'Why Conventional Search and LLM Summaries Lead to Costly Omissions',
    keyPoints: [
      {
        heading: 'Retrieval Blindness',
        details: 'Users assume a confident, coherent AI summary is complete. In reality, traditional RAG only fetches matches for explicit keywords.',
        badge: 'COGNITIVE TRAP',
        type: 'danger',
      },
      {
        heading: 'Absence is Invisible',
        details: 'If an applicant doesn\'t already know to query "retroactive clawback penalties," neither Google nor ChatGPT will surface it.',
        badge: 'THE DARK SPOT',
        type: 'danger',
      },
      {
        heading: 'High-Stakes Fallout',
        details: 'Students losing $80k in unexpected repayments, patients entering trials with unlisted exclusions, and companies hit with surprise renewal escalators.',
        badge: 'REAL DAMAGE',
        type: 'warning',
      },
    ],
    speakerNotes:
      'Here is the core problem: We call this "The Digital Dark Spot." When someone uses an AI assistant today, the response sounds authoritative and complete. This creates Retrieval Blindness. If an applicant asks "What are the requirements for this scholarship?", existing tools summarize the promotional flyer: $20,000 per year, open to engineering majors. What did the flyer leave out? It didn\'t mention a 3.75 GPA requirement or that changing majors triggers an immediate clawback. Because the student didn\'t know to ask about "clawbacks," the omissions remained invisible.',
    durationEst: '45s',
  },
  {
    id: 3,
    category: 'THE SOLUTION',
    title: 'Modeling the Negative Space of Knowledge',
    subtitle: 'From Passive Summarizer to Rigorous Epistemic Auditor',
    keyPoints: [
      {
        heading: '1. Auditing Absence',
        details: 'Evaluates the corpus against 6 domain-specific epistemic dimensions to pinpoint what is NOT stated across any source.',
        badge: 'NEGATIVE SPACE',
        type: 'success',
      },
      {
        heading: '2. Forensic Divergence',
        details: 'Performs cross-source sentence alignment to expose conflicting income caps, dates, and terms with exact verbatim quotes.',
        badge: 'CONTRADICTIONS',
        type: 'warning',
      },
      {
        heading: '3. Pre-Commitment Verification',
        details: 'Converts discovered dark spots into a prioritized checklist specifying the exact office, document, or registrar to cross-examine.',
        badge: 'ACTIONABILITY',
        type: 'success',
      },
    ],
    speakerNotes:
      'This is GapLens. We turn AI from a passive summarizer into an epistemic auditor. Our platform operates on three pillars: First, Auditing Absence. Given a decision goal, it queries: what are the essential operational, legal, and financial facts that any prudent human needs to know, but that NONE of these sources mention? Second, Forensic Divergence. Instead of blending contradictions into a smooth paragraph, GapLens pulls out the exact conflicting sentences side-by-side with verbatim quotes. Third, Actionable Verification. It generates a prioritized pre-commitment checklist.',
    durationEst: '45s',
  },
  {
    id: 4,
    category: 'SYSTEM ARCHITECTURE',
    title: 'Dual-Pass Epistemic Pipeline & Provenance Engine',
    subtitle: 'Resilient Server-Side Architecture with Type-Safe Schemas',
    keyPoints: [
      {
        heading: 'Ingestion & Scraping Proxy',
        details: 'Accepts raw text, pasted documents, and live URLs via a server-side DOM-cleaning proxy that strips tracking and ads.',
        badge: 'INGESTION',
        type: 'neutral',
      },
      {
        heading: 'Dual-Pass Gemini 3.8 Flash Analysis',
        details: 'Pass 1 audits epistemic dimensions (eligibility, clawbacks, renewal, liability); Pass 2 resolves semantic divergence and temporal drift.',
        badge: 'AI ENGINE',
        type: 'success',
      },
      {
        heading: 'Server-Side Security & Zero Key Leakage',
        details: 'All Gemini calls proxy through Express with strict JSON schemas. Built-in instant fallback ensures 100% demo uptime.',
        badge: 'RESILIENCE',
        type: 'neutral',
      },
    ],
    speakerNotes:
      'Under the hood, GapLens uses a clean full-stack architecture. The ingestion layer takes text or URLs through a server-side proxy with HTML cleaning. Next comes our dual-pass epistemic audit powered by Gemini 3.8 Flash using structured JSON schemas. We prompt against an Epistemic Dimension Matrix: evaluating eligibility criteria, financial clawbacks, renewal requirements, and procedural timelines. All API credentials remain isolated on the server.',
    durationEst: '45s',
  },
  {
    id: 5,
    category: 'KEY FEATURES',
    title: 'Core Capabilities & User Experience',
    subtitle: 'Engineered for Clarity, Actionability, and Zero Hallucination',
    keyPoints: [
      {
        heading: 'Dark Spot Matrix & Topology',
        details: 'Calculates an epistemic completeness score (0-100%) and visualizes missing facts categorized by severity and risk.',
        badge: 'VOID MAP',
        type: 'danger',
      },
      {
        heading: 'Contradiction Forensic Radar',
        details: 'Side-by-side comparison of conflicting claims with exact quotes, confidence ratings, and legal precedence guidance.',
        badge: 'FORENSIC RADAR',
        type: 'warning',
      },
      {
        heading: 'Temporal Decay & Blind Spot Simulator',
        details: 'Flags stale policy cycles (e.g. 2023 rules applied to 2026) and lets users simulate "what-if" edge-case scenarios.',
        badge: 'SIMULATOR',
        type: 'success',
      },
    ],
    speakerNotes:
      'Let’s look at the core features inside GapLens: 1. The Dark Spot Matrix and Void Topology: Users immediately see an epistemic completeness score and a categorized list of hidden risks. 2. Contradiction Radar: Pulls out contradictory claims verbatim so the user knows exactly which office to cross-examine. 3. Temporal Drift Engine: Warns you if guidance has aged. 4. Interactive Blind Spot Simulator: Allows what-if stress testing before committing.',
    durationEst: '45s',
  },
  {
    id: 6,
    category: 'COMPETITIVE EDGE',
    title: 'GapLens vs. Standard Search & LLM Summarizers',
    subtitle: 'Why Conventional AI Models Fail at Epistemic Absence',
    keyPoints: [
      {
        heading: 'Standard Search (Google / Perplexity)',
        details: 'Ranked by SEO relevance; completely silent about what unmentioned terms or legal caveats you failed to search for.',
        badge: 'KEYWORD BOUND',
        type: 'neutral',
      },
      {
        heading: 'Standard LLMs (ChatGPT / Claude)',
        details: 'Trained to generate smooth, confident text. When faced with contradictions, LLMs average them out or hallucinate plausible filler.',
        badge: 'HALLUCINATION RISK',
        type: 'danger',
      },
      {
        heading: 'GapLens Epistemic Auditor',
        details: 'Models negative space, highlights verbatim contradictions, checks temporal cycles, and generates a concrete action checklist.',
        badge: 'TRUE AUDIT',
        type: 'success',
      },
    ],
    speakerNotes:
      'Why can’t someone just use ChatGPT? Because standard AI is trained to fill in blanks and sound confident. When sources conflict, standard LLMs often average out the conflict or invent plausible details to make the paragraph read smoothly. GapLens is deliberately engineered for the opposite: It never conceals a contradiction. It separates Sourced facts from Inferred hypotheses. And most importantly, it highlights what the sources left unsaid so users don’t step into a trap.',
    durationEst: '45s',
  },
  {
    id: 7,
    category: 'DEMO BENCHMARKS',
    title: 'Tested Across 4 High-Stakes Domains',
    subtitle: 'Real-World Scenarios Proving Cross-Domain Versatility',
    keyPoints: [
      {
        heading: '1. STEM Fellowship Trap',
        details: 'Uncovers hidden 3.75 GPA maintenance rule and $80,000 retroactive clawback on major switch. Catches $65k vs $80k income cap conflict.',
        badge: 'HIGHER ED',
        type: 'warning',
      },
      {
        heading: '2. Oncology Clinical Trial',
        details: 'Flags unlisted autoimmune exclusion criteria and surfaces conflicting travel expense reimbursement caps ($500 vs 100%).',
        badge: 'HEALTHCARE',
        type: 'danger',
      },
      {
        heading: '3. Cloud Enterprise MSA & Tech Work Visa',
        details: 'Exposes unannounced 8% auto-renewal price escalators in B2B software and missing spouse work authorization rules in immigration.',
        badge: 'LEGAL & IMMIGRATION',
        type: 'neutral',
      },
    ],
    speakerNotes:
      'To prove GapLens isn’t a toy, we benchmarked it across four high-stakes domains: Higher Education, Clinical Trials, Enterprise Cloud MSAs, and Tech Work Visas. Judges can click and test any of these live scenarios right now inside the app with zero load time.',
    durationEst: '40s',
  },
  {
    id: 8,
    category: 'ROADMAP & IMPACT',
    title: 'From Hackathon Prototype to Epistemic Infrastructure',
    subtitle: 'Our Vision for Ambient Omission Detection Across the Web',
    keyPoints: [
      {
        heading: 'Phase 1: Full-Stack Web Platform (Today)',
        details: 'Live Express + React + Gemini pipeline with interactive visualizer, checklist manager, and open-source GitHub repo.',
        badge: 'COMPLETE',
        type: 'success',
      },
      {
        heading: 'Phase 2: Browser Real-Time Sentinel (Q2 2026)',
        details: 'Chrome/Edge extension reading Terms of Service, contracts, and application forms in real time to alert users before clicking "I Agree".',
        badge: 'EXTENSION',
        type: 'neutral',
      },
      {
        heading: 'Phase 3: Enterprise Epistemic API (Q4 2026)',
        details: 'SDK integration for legal tech, insurance underwriting, and academic peer review omission detection.',
        badge: 'ENTERPRISE',
        type: 'neutral',
      },
    ],
    speakerNotes:
      'To conclude: GapLens solves a fundamental blind spot in modern artificial intelligence. We are moving from a working prototype today, to a browser extension that protects everyday consumers from predatory terms, to an enterprise API auditing contracts and clinical protocols. Our entire codebase is open-sourced on GitHub under Apache 2.0. Thank you for your time, and we would love to take your questions!',
    durationEst: '30s',
  },
];
