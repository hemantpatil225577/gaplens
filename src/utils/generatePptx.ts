import pptxgen from 'pptxgenjs';
import { PRESENTATION_SLIDES } from '../data/presentationSlides';

export async function downloadPitchDeckPptx(): Promise<void> {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'GapLens Team';
  pptx.company = 'GapLens';
  pptx.subject = 'AI-Assisted Epistemic Gap & Void Detection Platform';
  pptx.title = 'GapLens - Hackathon Pitch Deck';

  const BG_DARK = '0B132B';
  const CARD_DARK = '1C2541';
  const CARD_BORDER = '3A506B';
  const ACCENT_SKY = '38BDF8';
  const ACCENT_CYAN = '06B6D4';
  const ACCENT_EMERALD = '10B981';
  const ACCENT_AMBER = 'F59E0B';
  const ACCENT_ROSE = 'F43F5E';
  const TEXT_WHITE = 'FFFFFF';
  const TEXT_MUTED = '94A3B8';
  const TEXT_BODY = 'E2E8F0';

  // Helper for Slide Header
  const addHeader = (slide: pptxgen.Slide, category: string, title: string) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 1.0,
      y: 0.45,
      w: 2.6,
      h: 0.35,
      rectRadius: 0.08,
      fill: { color: '1C2541' },
      line: { color: '38BDF8', width: 1 },
    });
    slide.addText(category, {
      x: 1.0,
      y: 0.45,
      w: 2.6,
      h: 0.35,
      fontSize: 8.5,
      fontFace: 'Arial Black',
      color: '38BDF8',
      align: 'center',
      valign: 'middle',
    });

    slide.addText(title, {
      x: 1.0,
      y: 0.85,
      w: 11.3,
      h: 0.65,
      fontSize: 22,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
      valign: 'middle',
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: 1.0,
      y: 1.55,
      w: 11.3,
      h: 0.02,
      fill: { color: '3A506B' },
    });
  };

  // -------------------------------------------------------------
  // SLIDE 1: Title & Tagline
  // -------------------------------------------------------------
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_DARK };
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.15,
    fill: { color: ACCENT_SKY },
  });

  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 1.2,
    w: 3.2,
    h: 0.45,
    rectRadius: 0.1,
    fill: { color: CARD_DARK },
    line: { color: ACCENT_SKY, width: 1 },
  });
  slide1.addText('HACKATHON PRESENTATION 2026', {
    x: 1.0,
    y: 1.2,
    w: 3.2,
    h: 0.45,
    fontSize: 10,
    fontFace: 'Arial',
    bold: true,
    color: ACCENT_SKY,
    align: 'center',
    valign: 'middle',
  });

  slide1.addText('GapLens', {
    x: 1.0,
    y: 1.8,
    w: 11.3,
    h: 1.2,
    fontSize: 54,
    fontFace: 'Arial Black',
    bold: true,
    color: TEXT_WHITE,
    valign: 'middle',
  });

  slide1.addText('AI-Assisted Epistemic Gap & Void Detection Platform', {
    x: 1.0,
    y: 3.0,
    w: 11.3,
    h: 0.6,
    fontSize: 22,
    fontFace: 'Arial',
    bold: true,
    color: ACCENT_CYAN,
  });

  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 3.8,
    w: 11.3,
    h: 1.3,
    rectRadius: 0.1,
    fill: { color: CARD_DARK },
    line: { color: CARD_BORDER, width: 1 },
  });
  slide1.addText(
    '"Every AI summarizes what has been written.\nGapLens exposes the critical omissions that will get you blindsided."',
    {
      x: 1.3,
      y: 3.9,
      w: 10.7,
      h: 1.1,
      fontSize: 15,
      fontFace: 'Arial',
      italic: true,
      color: TEXT_BODY,
      valign: 'middle',
    }
  );

  const metaCards = [
    { label: 'TRACK', value: 'Epistemic AI & Information Reliability', x: 1.0, w: 4.0 },
    { label: 'CORE VALUE', value: 'Auditing Absence Over Retrieval', x: 5.3, w: 3.6 },
    { label: 'REPOSITORY', value: 'github.com/hemantpatil225577/gaplens', x: 9.2, w: 3.1 },
  ];
  metaCards.forEach((c) => {
    slide1.addShape(pptx.ShapeType.roundRect, {
      x: c.x,
      y: 5.4,
      w: c.w,
      h: 1.1,
      rectRadius: 0.08,
      fill: { color: CARD_DARK },
      line: { color: CARD_BORDER, width: 1 },
    });
    slide1.addText(c.label, {
      x: c.x + 0.2,
      y: 5.5,
      w: c.w - 0.4,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_MUTED,
    });
    slide1.addText(c.value, {
      x: c.x + 0.2,
      y: 5.8,
      w: c.w - 0.4,
      h: 0.55,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE,
    });
  });
  slide1.addNotes(PRESENTATION_SLIDES[0].speakerNotes);

  // -------------------------------------------------------------
  // SLIDE 2: The Core Problem: The Digital Dark Spot
  // -------------------------------------------------------------
  const slide2 = pptx.addSlide();
  slide2.background = { color: BG_DARK };
  addHeader(slide2, 'THE CORE PROBLEM', 'The Digital Dark Spot & Retrieval Blindness');

  slide2.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 1.8,
    w: 5.4,
    h: 4.8,
    rectRadius: 0.12,
    fill: { color: CARD_DARK },
    line: { color: ACCENT_ROSE, width: 1.5 },
  });
  slide2.addText('THE RETRIEVAL BLINDNESS TRAP', {
    x: 1.3,
    y: 2.0,
    w: 4.8,
    h: 0.35,
    fontSize: 13,
    fontFace: 'Arial Black',
    color: ACCENT_ROSE,
  });
  slide2.addText(
    [
      { text: '• False Sense of Completeness: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Users assume a well-crafted AI answer covers everything that matters.\n\n', options: { color: TEXT_BODY } },
      { text: '• Absence is Invisible: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Standard RAG only retrieves what matches user keywords. If a user doesn\'t know to ask about "retroactive clawbacks", neither Google nor ChatGPT will surface it.\n\n', options: { color: TEXT_BODY } },
      { text: '• Silent Disasters in High-Stakes Decisions:\n', options: { bold: true, color: TEXT_WHITE } },
      { text: '  - Students losing $80,000 grants due to undisclosed GPA maintenance clauses.\n  - Patients enrolling in trials without unlisted exclusion criteria.\n  - Startups signing Cloud MSAs missing SLA downtime compensation caps.', options: { color: TEXT_MUTED } },
    ],
    { x: 1.3, y: 2.45, w: 4.8, h: 4.0, fontSize: 11.5, fontFace: 'Arial' }
  );

  const painPoints = [
    {
      title: 'Epistemic Omission',
      badge: 'HIGH RISK',
      color: ACCENT_ROSE,
      desc: 'Vital caveats, renewal obligations, and hidden caps absent across all consulted sources.',
      y: 1.8,
    },
    {
      title: 'Unstated Contradictions',
      badge: 'AMBIGUITY',
      color: ACCENT_AMBER,
      desc: 'Different portals or versions claim conflicting income thresholds or deadlines without notice.',
      y: 3.45,
    },
    {
      title: 'Temporal Drift & Decay',
      badge: 'STALE DATA',
      color: ACCENT_SKY,
      desc: 'Information published in 2023 or for prior fiscal cycles applied to 2026 scenarios.',
      y: 5.1,
    },
  ];

  painPoints.forEach((p) => {
    slide2.addShape(pptx.ShapeType.roundRect, {
      x: 6.8,
      y: p.y,
      w: 5.5,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: CARD_DARK },
      line: { color: CARD_BORDER, width: 1 },
    });
    slide2.addText(p.title, {
      x: 7.1,
      y: p.y + 0.15,
      w: 3.4,
      h: 0.3,
      fontSize: 13,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE,
    });
    slide2.addShape(pptx.ShapeType.roundRect, {
      x: 10.6,
      y: p.y + 0.15,
      w: 1.4,
      h: 0.28,
      rectRadius: 0.06,
      fill: { color: BG_DARK },
      line: { color: p.color, width: 1 },
    });
    slide2.addText(p.badge, {
      x: 10.6,
      y: p.y + 0.15,
      w: 1.4,
      h: 0.28,
      fontSize: 8,
      fontFace: 'Arial',
      bold: true,
      color: p.color,
      align: 'center',
      valign: 'middle',
    });
    slide2.addText(p.desc, {
      x: 7.1,
      y: p.y + 0.55,
      w: 4.9,
      h: 0.8,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: TEXT_BODY,
    });
  });
  slide2.addNotes(PRESENTATION_SLIDES[1].speakerNotes);

  // -------------------------------------------------------------
  // SLIDE 3: The GapLens Solution
  // -------------------------------------------------------------
  const slide3 = pptx.addSlide();
  slide3.background = { color: BG_DARK };
  addHeader(slide3, 'THE SOLUTION', 'GapLens: Modeling the Negative Space of Knowledge');

  const pillars = [
    {
      step: '01',
      title: 'Auditing Absence',
      subtitle: 'Epistemic Negative Space',
      color: ACCENT_SKY,
      x: 1.0,
      points: [
        'Analyzes what is NOT said across the entire corpus of provided sources.',
        'Evaluates against domain-specific epistemic benchmarks (scholarships, clinical, legal).',
        'Generates critical "Dark Spots" ranked by severity and decision impact.',
      ],
    },
    {
      step: '02',
      title: 'Forensic Divergence',
      subtitle: 'Verbatim Contradictions',
      color: ACCENT_CYAN,
      x: 5.0,
      points: [
        'Performs cross-source sentence alignment to spot conflicting terms.',
        'Extracts verbatim quotes with exact source attribution (zero hallucination).',
        'Gives transparent resolution guidance on which source takes legal precedence.',
      ],
    },
    {
      step: '03',
      title: 'Actionable Verification',
      subtitle: 'Pre-Commitment Checklist',
      color: ACCENT_EMERALD,
      x: 9.0,
      points: [
        'Transforms discovered omissions into a prioritized verification checklist.',
        'Specifies exact regulatory bodies, admissions officers, or PIs to consult.',
        'Provides an interactive Blind Spot Simulator to stress-test scenarios.',
      ],
    },
  ];

  pillars.forEach((col) => {
    slide3.addShape(pptx.ShapeType.roundRect, {
      x: col.x,
      y: 1.8,
      w: 3.7,
      h: 4.8,
      rectRadius: 0.12,
      fill: { color: CARD_DARK },
      line: { color: col.color, width: 1.5 },
    });

    slide3.addText(col.step, {
      x: col.x + 0.3,
      y: 2.0,
      w: 0.8,
      h: 0.4,
      fontSize: 18,
      fontFace: 'Arial Black',
      color: col.color,
    });
    slide3.addText(col.title, {
      x: col.x + 0.3,
      y: 2.4,
      w: 3.1,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE,
    });
    slide3.addText(col.subtitle, {
      x: col.x + 0.3,
      y: 2.75,
      w: 3.1,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: col.color,
    });

    const bulletItems = col.points.map((pt) => ({
      text: `• ${pt}\n\n`,
      options: { color: TEXT_BODY },
    }));
    slide3.addText(bulletItems, {
      x: col.x + 0.3,
      y: 3.2,
      w: 3.1,
      h: 3.2,
      fontSize: 10.5,
      fontFace: 'Arial',
    });
  });
  slide3.addNotes(PRESENTATION_SLIDES[2].speakerNotes);

  // -------------------------------------------------------------
  // SLIDE 4: Architecture & Epistemic Pipeline
  // -------------------------------------------------------------
  const slide4 = pptx.addSlide();
  slide4.background = { color: BG_DARK };
  addHeader(slide4, 'SYSTEM ARCHITECTURE', 'Dual-Pass Epistemic Pipeline & Provenance Engine');

  const flowSteps = [
    { step: '1. Ingest & Fetch', desc: 'Raw text, PDF, URL proxy with DOM cleaning & metadata normalization', x: 1.0, color: ACCENT_SKY },
    { step: '2. Epistemic Audit', desc: 'Gemini 3.8 Flash evaluates 6 epistemic dimensions: eligibility, clawbacks, renewal, liability', x: 3.9, color: ACCENT_CYAN },
    { step: '3. Divergence Map', desc: 'Cross-document alignment identifies semantic conflicts & temporal cycle mismatches', x: 6.8, color: ACCENT_AMBER },
    { step: '4. Action Dossier', desc: 'Calculates completeness score, builds verification checklist & stress-test simulator', x: 9.7, color: ACCENT_EMERALD },
  ];

  flowSteps.forEach((s) => {
    slide4.addShape(pptx.ShapeType.roundRect, {
      x: s.x,
      y: 1.8,
      w: 2.6,
      h: 2.2,
      rectRadius: 0.1,
      fill: { color: CARD_DARK },
      line: { color: s.color, width: 1.5 },
    });
    slide4.addText(s.step, {
      x: s.x + 0.2,
      y: 1.95,
      w: 2.2,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: s.color,
    });
    slide4.addText(s.desc, {
      x: s.x + 0.2,
      y: 2.35,
      w: 2.2,
      h: 1.5,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_BODY,
    });
  });

  slide4.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 4.3,
    w: 5.5,
    h: 2.4,
    rectRadius: 0.1,
    fill: { color: CARD_DARK },
    line: { color: CARD_BORDER, width: 1 },
  });
  slide4.addText('CORE TECHNICAL INNOVATIONS', {
    x: 1.3,
    y: 4.45,
    w: 5.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial Black',
    color: ACCENT_SKY,
  });
  slide4.addText(
    [
      { text: '• Epistemic Dimension Matrix: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Evaluates gaps across 6 structural dimensions: Eligibility, Financial, Renewal, Timeline, Jurisdiction, Liability.\n', options: { color: TEXT_BODY } },
      { text: '• Strict JSON Schema Validation: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Enforces type-safe structures via @google/genai SDK with schema enforcement.\n', options: { color: TEXT_BODY } },
      { text: '• Verbatim Citation Extraction: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Zero synthetic quotes; all contradictions verified against source corpus.', options: { color: TEXT_BODY } },
    ],
    { x: 1.3, y: 4.8, w: 5.0, h: 1.8, fontSize: 9.5, fontFace: 'Arial' }
  );

  slide4.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 4.3,
    w: 5.5,
    h: 2.4,
    rectRadius: 0.1,
    fill: { color: CARD_DARK },
    line: { color: CARD_BORDER, width: 1 },
  });
  slide4.addText('SECURITY & FULL-STACK RESILIENCE', {
    x: 7.1,
    y: 4.45,
    w: 5.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial Black',
    color: ACCENT_EMERALD,
  });
  slide4.addText(
    [
      { text: '• Server-Side Proxy Isolation: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Node/Express proxy securely wraps AI endpoints; zero API key leakage to browser.\n', options: { color: TEXT_BODY } },
      { text: '• Zero-Latency Precomputed Benchmarks: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Instant live demos for judges across 4 diverse high-stakes scenarios.\n', options: { color: TEXT_BODY } },
      { text: '• Built-in Fallback Epistemic Engine: ', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Ensures 100% demo uptime even under network or rate-limit constraints.', options: { color: TEXT_BODY } },
    ],
    { x: 7.1, y: 4.8, w: 5.0, h: 1.8, fontSize: 9.5, fontFace: 'Arial' }
  );
  slide4.addNotes(PRESENTATION_SLIDES[3].speakerNotes);

  // -------------------------------------------------------------
  // SLIDE 5: Key Features Showcase
  // -------------------------------------------------------------
  const slide5 = pptx.addSlide();
  slide5.background = { color: BG_DARK };
  addHeader(slide5, 'KEY FEATURES', 'Built for High-Stakes Decision Verification');

  const features = [
    {
      title: 'Dark Spot Matrix & Topology',
      desc: 'Visualizes missing facts by category and severity. Displays exactly why each omission is hazardous and what questions must be asked.',
      icon: 'VOID DETECTION',
      color: ACCENT_ROSE,
      x: 1.0,
      y: 1.8,
    },
    {
      title: 'Contradiction Forensic Radar',
      desc: 'Side-by-side claim comparison with exact quotes, divergence analysis, and guidance on which policy or year takes legal precedence.',
      icon: 'CONFLICT RADAR',
      color: ACCENT_AMBER,
      x: 6.8,
      y: 1.8,
    },
    {
      title: 'Temporal Decay & Cycle Audit',
      desc: 'Detects outdated documentation (e.g. 2023 regulations applied to 2026 applications) and flags stale terms vulnerable to policy drift.',
      icon: 'TEMPORAL DRIFT',
      color: ACCENT_SKY,
      x: 1.0,
      y: 3.5,
    },
    {
      title: 'Interactive Blind Spot Simulator',
      desc: 'Lets users stress-test hypothetical scenarios: "What if my GPA drops to 3.4?" or "What if I take a leave of absence?" with real-time risk simulation.',
      icon: 'STRESS TESTER',
      color: ACCENT_EMERALD,
      x: 6.8,
      y: 3.5,
    },
    {
      title: 'Verbatim Source Inspector',
      desc: 'Full-text in-app document viewer with keyword search and highlight, proving zero hallucination and showing exact context.',
      icon: 'PROVENANCE',
      color: ACCENT_CYAN,
      x: 1.0,
      y: 5.2,
    },
    {
      title: 'Audio Briefing & Multi-Format Export',
      desc: 'Generates voice debriefings and exports comprehensive audit dossiers to Markdown, JSON, and fully formatted PowerPoint presentations.',
      icon: 'EXPORT SUITE',
      color: TEXT_WHITE,
      x: 6.8,
      y: 5.2,
    },
  ];

  features.forEach((f) => {
    slide5.addShape(pptx.ShapeType.roundRect, {
      x: f.x,
      y: f.y,
      w: 5.5,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: CARD_DARK },
      line: { color: CARD_BORDER, width: 1 },
    });
    slide5.addText(f.icon, {
      x: f.x + 0.25,
      y: f.y + 0.15,
      w: 2.5,
      h: 0.25,
      fontSize: 8,
      fontFace: 'Arial Black',
      color: f.color,
    });
    slide5.addText(f.title, {
      x: f.x + 0.25,
      y: f.y + 0.38,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE,
    });
    slide5.addText(f.desc, {
      x: f.x + 0.25,
      y: f.y + 0.72,
      w: 5.0,
      h: 0.65,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_BODY,
    });
  });
  slide5.addNotes(PRESENTATION_SLIDES[4].speakerNotes);

  // -------------------------------------------------------------
  // SLIDE 6: GapLens vs Conventional AI
  // -------------------------------------------------------------
  const slide6 = pptx.addSlide();
  slide6.background = { color: BG_DARK };
  addHeader(slide6, 'COMPETITIVE EDGE', 'GapLens vs. Standard Search & LLM Summarizers');

  const tableData: pptxgen.TableRow[] = [
    [
      { text: 'Capability', options: { bold: true, color: TEXT_WHITE, fill: { color: '0F172A' } } },
      { text: 'Google Search / Perplexity', options: { bold: true, color: TEXT_MUTED, fill: { color: '0F172A' } } },
      { text: 'Standard ChatGPT / RAG', options: { bold: true, color: TEXT_MUTED, fill: { color: '0F172A' } } },
      { text: 'GapLens Epistemic Auditor', options: { bold: true, color: ACCENT_SKY, fill: { color: '0F172A' } } },
    ],
    [
      { text: 'Detection of Unstated Gaps', options: { bold: true, color: TEXT_WHITE } },
      { text: '❌ None (Only matches keywords)', options: { color: TEXT_MUTED } },
      { text: '❌ Rare (Prone to hallucinated fill)', options: { color: TEXT_MUTED } },
      { text: '✅ Native (Epistemic Void Modeling)', options: { bold: true, color: ACCENT_EMERALD } },
    ],
    [
      { text: 'Cross-Source Contradictions', options: { bold: true, color: TEXT_WHITE } },
      { text: '⚠️ Left to human to compare', options: { color: TEXT_MUTED } },
      { text: '⚠️ Smooths over discrepancies', options: { color: TEXT_MUTED } },
      { text: '✅ Exact verbatim quote alignment', options: { bold: true, color: ACCENT_EMERALD } },
    ],
    [
      { text: 'Temporal Staleness Audit', options: { bold: true, color: TEXT_WHITE } },
      { text: '⚠️ Ranked by SEO, not validity', options: { color: TEXT_MUTED } },
      { text: '❌ No cycle or expiration check', options: { color: TEXT_MUTED } },
      { text: '✅ Flags cycle drift & legacy rules', options: { bold: true, color: ACCENT_EMERALD } },
    ],
    [
      { text: 'Decision Actionability', options: { bold: true, color: TEXT_WHITE } },
      { text: '❌ Unstructured web links', options: { color: TEXT_MUTED } },
      { text: '⚠️ Generic paragraphs of advice', options: { color: TEXT_MUTED } },
      { text: '✅ Prioritized verification checklist', options: { bold: true, color: ACCENT_EMERALD } },
    ],
    [
      { text: 'Evidence Transparency', options: { bold: true, color: TEXT_WHITE } },
      { text: 'Web snippet only', options: { color: TEXT_MUTED } },
      { text: 'Opaque neural generation', options: { color: TEXT_MUTED } },
      { text: '✅ Verbatim source inspection', options: { bold: true, color: ACCENT_EMERALD } },
    ],
  ];

  slide6.addTable(tableData, {
    x: 1.0,
    y: 1.8,
    w: 11.3,
    h: 4.8,
    colW: [2.5, 2.9, 2.9, 3.0],
    border: { pt: 1, color: CARD_BORDER },
    fill: { color: CARD_DARK },
    fontSize: 10,
    fontFace: 'Arial',
    align: 'left',
    valign: 'middle',
  });
  slide6.addNotes(PRESENTATION_SLIDES[5].speakerNotes);

  // -------------------------------------------------------------
  // SLIDE 7: Live Benchmarks & Evidence
  // -------------------------------------------------------------
  const slide7 = pptx.addSlide();
  slide7.background = { color: BG_DARK };
  addHeader(slide7, 'DEMO BENCHMARKS', 'Tested Across 4 Real-World High-Stakes Domains');

  const scenarios = [
    {
      title: '1. STEM Fellowship Trap',
      domain: 'Higher Education Funding',
      darkSpot: 'Hidden 3.75 GPA requirement & $80,000 retroactive clawback upon changing majors.',
      conflict: 'Flyer claims $80k income cap; Official Bylaws state $65k hard ceiling.',
      color: ACCENT_SKY,
      x: 1.0,
      y: 1.8,
    },
    {
      title: '2. Oncology Clinical Trial',
      domain: 'Biomedical & Healthcare',
      darkSpot: 'Unpublished autoimmune exclusion clause; lack of post-trial drug access guarantee.',
      conflict: 'Hospital portal says travel is 100% subsidized; consent form specifies $500 cap.',
      color: ACCENT_ROSE,
      x: 6.8,
      y: 1.8,
    },
    {
      title: '3. Cloud Enterprise MSA',
      domain: 'B2B Software & Legal',
      darkSpot: 'Zero compensation for outages under 4 hours; unmentioned 8% auto-renewal escalator.',
      conflict: 'Marketing brochure claims 99.99% uptime; legal terms exclude scheduled maintenance.',
      color: ACCENT_AMBER,
      x: 1.0,
      y: 4.3,
    },
    {
      title: '4. Tech Work Visa Pathway',
      domain: 'Immigration & Relocation',
      darkSpot: 'Absence of spouse work authorization (H-4) rules & mandatory 6-month exit grace.',
      conflict: 'Government portal lists $1,500 fee; embassy bulletin lists $2,800 processing fee.',
      color: ACCENT_EMERALD,
      x: 6.8,
      y: 4.3,
    },
  ];

  scenarios.forEach((s) => {
    slide7.addShape(pptx.ShapeType.roundRect, {
      x: s.x,
      y: s.y,
      w: 5.5,
      h: 2.3,
      rectRadius: 0.1,
      fill: { color: CARD_DARK },
      line: { color: s.color, width: 1.2 },
    });
    slide7.addText(s.title, {
      x: s.x + 0.25,
      y: s.y + 0.15,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE,
    });
    slide7.addText(s.domain.toUpperCase(), {
      x: s.x + 0.25,
      y: s.y + 0.42,
      w: 5.0,
      h: 0.2,
      fontSize: 8,
      fontFace: 'Arial',
      bold: true,
      color: s.color,
    });
    slide7.addText(
      [
        { text: 'Dark Spot Omission: ', options: { bold: true, color: ACCENT_ROSE } },
        { text: `${s.darkSpot}\n`, options: { color: TEXT_BODY } },
        { text: 'Divergence: ', options: { bold: true, color: ACCENT_AMBER } },
        { text: s.conflict, options: { color: TEXT_MUTED } },
      ],
      { x: s.x + 0.25, y: s.y + 0.68, w: 5.0, h: 1.5, fontSize: 9.5, fontFace: 'Arial' }
    );
  });
  slide7.addNotes(PRESENTATION_SLIDES[6].speakerNotes);

  // -------------------------------------------------------------
  // SLIDE 8: Roadmap, Impact & Vision
  // -------------------------------------------------------------
  const slide8 = pptx.addSlide();
  slide8.background = { color: BG_DARK };
  addHeader(slide8, 'ROADMAP & IMPACT', 'From Hackathon Prototype to Epistemic Infrastructure');

  const roadmapItems = [
    {
      phase: 'PHASE 1 (TODAY)',
      title: 'Full-Stack Web Auditor',
      color: ACCENT_SKY,
      x: 1.0,
      points: [
        'Live Express + React + Gemini pipeline',
        'Multi-source ingestion & text scraper',
        'Interactive topology & blind spot probe',
        'Open-source repository on GitHub',
      ],
    },
    {
      phase: 'PHASE 2 (Q2 2026)',
      title: 'Browser Real-Time Sentinel',
      color: ACCENT_CYAN,
      x: 5.0,
      points: [
        'Chrome/Edge extension reading Terms of Service',
        'Real-time ambient dark spot alerts on sign-up pages',
        'Automatic cross-checking against regulatory gazettes',
        'Crowdsourced community void reporting',
      ],
    },
    {
      phase: 'PHASE 3 (Q4 2026)',
      title: 'Enterprise Epistemic API',
      color: ACCENT_EMERALD,
      x: 9.0,
      points: [
        'SDK integration for legal tech & compliance',
        'Automated contract red-flagging before signature',
        'Academic peer review omission scanner',
        'Enterprise data room epistemic completeness audit',
      ],
    },
  ];

  roadmapItems.forEach((r) => {
    slide8.addShape(pptx.ShapeType.roundRect, {
      x: r.x,
      y: 1.8,
      w: 3.7,
      h: 3.4,
      rectRadius: 0.1,
      fill: { color: CARD_DARK },
      line: { color: r.color, width: 1.2 },
    });
    slide8.addText(r.phase, {
      x: r.x + 0.25,
      y: 2.0,
      w: 3.2,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial Black',
      color: r.color,
    });
    slide8.addText(r.title, {
      x: r.x + 0.25,
      y: 2.25,
      w: 3.2,
      h: 0.35,
      fontSize: 13,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE,
    });
    const pts = r.points.map((p) => ({ text: `• ${p}\n\n`, options: { color: TEXT_BODY } }));
    slide8.addText(pts, {
      x: r.x + 0.25,
      y: 2.65,
      w: 3.2,
      h: 2.4,
      fontSize: 10,
      fontFace: 'Arial',
    });
  });

  slide8.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 5.4,
    w: 11.3,
    h: 1.2,
    rectRadius: 0.1,
    fill: { color: CARD_DARK },
    line: { color: ACCENT_SKY, width: 1.5 },
  });
  slide8.addText('TRY GAPLENS LIVE & EXPLORE THE CODEBASE', {
    x: 1.3,
    y: 5.55,
    w: 7.0,
    h: 0.3,
    fontSize: 13,
    fontFace: 'Arial Black',
    color: ACCENT_SKY,
  });
  slide8.addText('GitHub: https://github.com/hemantpatil225577/gaplens  •  Apache 2.0 License  •  Ready for Demo & Questions', {
    x: 1.3,
    y: 5.9,
    w: 10.5,
    h: 0.45,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: TEXT_WHITE,
  });
  slide8.addNotes(PRESENTATION_SLIDES[7].speakerNotes);

  // Directly trigger client-side download of the PPTX file
  await pptx.writeFile({ fileName: 'GapLens_Hackathon_Pitch_Deck.pptx' });
}
