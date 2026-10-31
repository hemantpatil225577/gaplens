import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

export function createPdfDeck() {
  // 16:9 ratio in pt: 960 width x 540 height
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [960, 540],
  });

  const W = 960;
  const H = 540;

  // Color palette
  const BG_DARK = [11, 19, 43]; // #0B132B
  const CARD_DARK = [28, 37, 65]; // #1C2541
  const CARD_BORDER = [58, 80, 107]; // #3A506B
  const ACCENT_SKY = [56, 189, 248]; // #38BDF8
  const ACCENT_CYAN = [6, 182, 212]; // #06B6D4
  const ACCENT_EMERALD = [16, 185, 129]; // #10B981
  const ACCENT_AMBER = [245, 158, 11]; // #F59E0B
  const ACCENT_ROSE = [244, 63, 94]; // #F43F5E
  const TEXT_WHITE = [255, 255, 255];
  const TEXT_MUTED = [148, 163, 184]; // #94A3B8
  const TEXT_BODY = [226, 232, 240]; // #E2E8F0

  function drawSlideBase(slideNum, category, title) {
    // Background
    doc.setFillColor(...BG_DARK);
    doc.rect(0, 0, W, H, 'F');

    // Top Accent line
    doc.setFillColor(...ACCENT_SKY);
    doc.rect(0, 0, W, 4, 'F');

    // Category Badge
    if (category) {
      doc.setFillColor(...CARD_DARK);
      doc.setDrawColor(...ACCENT_SKY);
      doc.setLineWidth(1);
      doc.roundedRect(50, 24, 180, 24, 4, 4, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...ACCENT_SKY);
      doc.text(category.toUpperCase(), 140, 39, { align: 'center' });
    }

    // Title
    if (title) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(...TEXT_WHITE);
      doc.text(title, 50, 72);

      // Separator line
      doc.setDrawColor(...CARD_BORDER);
      doc.setLineWidth(1);
      doc.line(50, 84, W - 50, 84);
    }

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_MUTED);
    doc.text('GapLens  •  AI-Assisted Epistemic Gap & Void Detection Platform', 50, H - 18);
    doc.text(`Slide ${slideNum} of 8`, W - 50, H - 18, { align: 'right' });
  }

  // ---------------------------------------------------------------------------
  // SLIDE 1: Title Slide
  // ---------------------------------------------------------------------------
  // Background
  doc.setFillColor(...BG_DARK);
  doc.rect(0, 0, W, H, 'F');

  // Top accent bar
  doc.setFillColor(...ACCENT_SKY);
  doc.rect(0, 0, W, 6, 'F');

  // Badge
  doc.setFillColor(...CARD_DARK);
  doc.setDrawColor(...ACCENT_SKY);
  doc.setLineWidth(1);
  doc.roundedRect(60, 60, 220, 26, 6, 6, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT_SKY);
  doc.text('HACKATHON PRESENTATION 2026', 170, 77, { align: 'center' });

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(44);
  doc.setTextColor(...TEXT_WHITE);
  doc.text('GapLens', 60, 140);

  // Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...ACCENT_CYAN);
  doc.text('AI-Assisted Epistemic Gap & Void Detection Platform', 60, 175);

  // Big Callout Card
  doc.setFillColor(...CARD_DARK);
  doc.setDrawColor(...CARD_BORDER);
  doc.setLineWidth(1);
  doc.roundedRect(60, 210, W - 120, 110, 8, 8, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...TEXT_WHITE);
  doc.text('The Paradigm Shift:', 85, 245);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(...TEXT_BODY);
  const quote = '"Every current AI summarizes what has been written. GapLens exposes the critical omissions, conflicting claims, and temporal decay that will get you blindsided."';
  const splitQuote = doc.splitTextToSize(quote, W - 170);
  doc.text(splitQuote, 85, 275);

  // 3 Metadata Footer Cards
  const metaCards = [
    { label: 'TRACK', val: 'Epistemic AI & Information Reliability', x: 60, w: 260 },
    { label: 'CORE VALUE', val: 'Auditing Absence Over Retrieval', x: 345, w: 260 },
    { label: 'GITHUB REPOSITORY', val: 'github.com/hemantpatil225577/gaplens', x: 630, w: 270 },
  ];

  metaCards.forEach((c) => {
    doc.setFillColor(...CARD_DARK);
    doc.setDrawColor(...CARD_BORDER);
    doc.setLineWidth(1);
    doc.roundedRect(c.x, 345, c.w, 95, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...ACCENT_SKY);
    doc.text(c.label, c.x + 16, 372);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...TEXT_WHITE);
    const splitVal = doc.splitTextToSize(c.val, c.w - 32);
    doc.text(splitVal, c.x + 16, 395);
  });

  // Slide 1 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Apache 2.0 Open Source  •  Powered by Google Gemini 3.8 Flash', 60, H - 25);
  doc.text('Slide 1 of 8', W - 60, H - 25, { align: 'right' });

  // ---------------------------------------------------------------------------
  // SLIDE 2: The Core Problem
  // ---------------------------------------------------------------------------
  doc.addPage([W, H], 'landscape');
  drawSlideBase(2, 'The Core Problem', 'The Digital Dark Spot & Retrieval Blindness');

  // Left Box: The Retrieval Trap
  doc.setFillColor(...CARD_DARK);
  doc.setDrawColor(...ACCENT_ROSE);
  doc.setLineWidth(1.5);
  doc.roundedRect(50, 105, 410, 380, 8, 8, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...ACCENT_ROSE);
  doc.text('THE RETRIEVAL BLINDNESS TRAP', 70, 135);

  const leftPoints = [
    { title: 'False Sense of Completeness', desc: 'Users assume a well-crafted AI answer covers everything that matters. In reality, LLMs only synthesize ingested text without checking for missing conditions.' },
    { title: 'Absence is Completely Invisible', desc: 'Standard RAG only retrieves keyword matches. If an applicant doesn’t know to ask about "retroactive clawbacks", neither Google nor ChatGPT will alert them.' },
    { title: 'Silent Catastrophes in High Stakes', desc: 'Students lose $80k scholarships over unlisted GPA maintenance rules; patients enter trials missing exclusion criteria; startups sign MSAs with unmentioned 4-hour SLA downtime exclusions.' }
  ];

  let curY = 165;
  leftPoints.forEach(p => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(`• ${p.title}:`, 70, curY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT_BODY);
    const lines = doc.splitTextToSize(p.desc, 360);
    doc.text(lines, 80, curY + 16);
    curY += 20 + lines.length * 13;
  });

  // Right Side: 3 Pain Points
  const painPoints = [
    {
      title: 'Epistemic Omission (Dark Spots)',
      badge: 'HIGH RISK',
      badgeColor: ACCENT_ROSE,
      desc: 'Critical prerequisites, hidden GPA thresholds, and clawback liabilities omitted across all consulted web portals.',
      y: 105
    },
    {
      title: 'Unstated Contradictions',
      badge: 'AMBIGUITY',
      badgeColor: ACCENT_AMBER,
      desc: 'Disparate portals quote mutually exclusive thresholds (e.g. $45k vs $60k income ceiling or 1 vs 2 recommendation letters).',
      y: 235
    },
    {
      title: 'Temporal Drift & Decay',
      badge: 'STALE DATA',
      badgeColor: ACCENT_SKY,
      desc: 'Outdated 2023 handbooks and archived forum advice surface as top search hits and are erroneously applied to 2026 cycles.',
      y: 365
    }
  ];

  painPoints.forEach(p => {
    doc.setFillColor(...CARD_DARK);
    doc.setDrawColor(...CARD_BORDER);
    doc.setLineWidth(1);
    doc.roundedRect(480, p.y, 430, 115, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(p.title, 500, p.y + 30);

    // Badge
    doc.setFillColor(...BG_DARK);
    doc.setDrawColor(...p.badgeColor);
    doc.setLineWidth(1);
    doc.roundedRect(810, p.y + 16, 85, 20, 4, 4, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...p.badgeColor);
    doc.text(p.badge, 852, p.y + 29, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT_BODY);
    const dlines = doc.splitTextToSize(p.desc, 390);
    doc.text(dlines, 500, p.y + 60);
  });

  // ---------------------------------------------------------------------------
  // SLIDE 3: The GapLens Solution
  // ---------------------------------------------------------------------------
  doc.addPage([W, H], 'landscape');
  drawSlideBase(3, 'The Solution', 'GapLens: Modeling the Negative Space of Knowledge');

  const pillars = [
    {
      step: '01',
      title: 'Auditing Absence',
      subtitle: 'Epistemic Negative Space',
      color: ACCENT_SKY,
      x: 50,
      points: [
        'Analyzes what is NOT said across the entire corpus of provided sources.',
        'Audits against domain ontologies (Scholarships, Grants, Visas, Medical, Legal).',
        'Detects hidden disqualifiers, clawbacks, and unmentioned prerequisites.'
      ]
    },
    {
      step: '02',
      title: 'Forensic Divergence',
      subtitle: 'Verbatim Contradictions',
      color: ACCENT_CYAN,
      x: 350,
      points: [
        'Performs cross-source sentence alignment to spot conflicting numbers and rules.',
        'Extracts exact side-by-side verbatim quotes with source attribution.',
        'Provides transparent guidance on which authority takes legal precedence.'
      ]
    },
    {
      step: '03',
      title: 'Actionable Verification',
      subtitle: 'Pre-Commitment Punchlist',
      color: ACCENT_EMERALD,
      x: 650,
      points: [
        'Transforms discovered voids into a prioritized verification checklist.',
        'Routes each uncertainty to the exact office to call (bursar, consul, registrar).',
        'Includes a "What-If" stress testing simulator to forecast decision failure modes.'
      ]
    }
  ];

  pillars.forEach(col => {
    doc.setFillColor(...CARD_DARK);
    doc.setDrawColor(...col.color);
    doc.setLineWidth(1.5);
    doc.roundedRect(col.x, 105, 260, 380, 8, 8, 'FD');

    // Step
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...col.color);
    doc.text(col.step, col.x + 20, 140);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13.5);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(col.title, col.x + 20, 170);

    // Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...col.color);
    doc.text(col.subtitle, col.x + 20, 190);

    // Separator line
    doc.setDrawColor(...CARD_BORDER);
    doc.setLineWidth(1);
    doc.line(col.x + 20, 205, col.x + 240, 205);

    // Points
    let py = 230;
    col.points.forEach(pt => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...TEXT_BODY);
      const lines = doc.splitTextToSize(`• ${pt}`, 220);
      doc.text(lines, col.x + 20, py);
      py += lines.length * 14 + 14;
    });
  });

  // ---------------------------------------------------------------------------
  // SLIDE 4: System Architecture
  // ---------------------------------------------------------------------------
  doc.addPage([W, H], 'landscape');
  drawSlideBase(4, 'System Architecture', 'Dual-Pass Epistemic Pipeline & Provenance Engine');

  // 4 Horizontal Pipeline Boxes
  const pipeline = [
    { num: '1', title: 'Ingest & Clean', desc: 'Raw text, PDF, URL proxy with Cheerio DOM cleaning and date metadata heuristics', color: ACCENT_SKY, x: 50 },
    { num: '2', title: 'Epistemic Audit', desc: 'Gemini 3.8 Flash audits 6 dimensions: eligibility, clawbacks, renewal, deadlines, liabilities', color: ACCENT_CYAN, x: 275 },
    { num: '3', title: 'Divergence Map', desc: 'Cross-document alignment identifies semantic conflicts & temporal cycle mismatches', color: ACCENT_AMBER, x: 500 },
    { num: '4', title: 'Action Dossier', desc: 'Calculates completeness score, builds verification checklist & stress-test simulator', color: ACCENT_EMERALD, x: 725 }
  ];

  pipeline.forEach(p => {
    doc.setFillColor(...CARD_DARK);
    doc.setDrawColor(...p.color);
    doc.setLineWidth(1.5);
    doc.roundedRect(p.x, 105, 185, 160, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...p.color);
    doc.text(`STEP ${p.num}`, p.x + 16, 132);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(p.title, p.x + 16, 155);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_BODY);
    const dlines = doc.splitTextToSize(p.desc, 155);
    doc.text(dlines, p.x + 16, 178);
  });

  // Bottom 2 Big Feature Highlights
  doc.setFillColor(...CARD_DARK);
  doc.setDrawColor(...CARD_BORDER);
  doc.setLineWidth(1);
  doc.roundedRect(50, 285, 420, 200, 6, 6, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...ACCENT_SKY);
  doc.text('CORE TECHNICAL INNOVATIONS', 70, 312);

  const archInnovations = [
    { title: 'Epistemic Dimension Matrix', desc: 'Evaluates omissions across 6 structural axes: Eligibility, Financials, Renewal Rules, Deadlines, Jurisdiction, and Liabilities.' },
    { title: 'Strict JSON Schema Enforcement', desc: 'Calls Gemini with responseMimeType "application/json" and rigid response schemas for zero hallucinated formatting.' },
    { title: 'Verbatim Citation Provenance', desc: 'Zero synthetic quotes; all contradictions extract exact text snippets directly from the ingested source documents.' }
  ];

  let ay = 336;
  archInnovations.forEach(item => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(`• ${item.title}:`, 70, ay);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_BODY);
    const l = doc.splitTextToSize(item.desc, 380);
    doc.text(l, 80, ay + 13);
    ay += 16 + l.length * 11;
  });

  // Right Bottom Box: Security & Full-Stack
  doc.setFillColor(...CARD_DARK);
  doc.setDrawColor(...CARD_BORDER);
  doc.setLineWidth(1);
  doc.roundedRect(490, 285, 420, 200, 6, 6, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...ACCENT_EMERALD);
  doc.text('SECURITY & FULL-STACK RESILIENCE', 510, 312);

  const secInnovations = [
    { title: 'Server-Side Proxy Architecture', desc: 'Node.js Express backend keeps Gemini API credentials isolated. Client applications never expose private API keys.' },
    { title: 'Precomputed High-Stakes Benchmarks', desc: 'Instant demo execution across four distinct real-world domains with zero latency or cold-start delay.' },
    { title: 'Deterministic Heuristic Fallback Engine', desc: 'Built-in offline discrepancy and omission rules guarantee 100% demo uptime even under network or rate-limit constraints.' }
  ];

  let sy = 336;
  secInnovations.forEach(item => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(`• ${item.title}:`, 510, sy);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_BODY);
    const l = doc.splitTextToSize(item.desc, 380);
    doc.text(l, 520, sy + 13);
    sy += 16 + l.length * 11;
  });

  // ---------------------------------------------------------------------------
  // SLIDE 5: Key Features Showcase
  // ---------------------------------------------------------------------------
  doc.addPage([W, H], 'landscape');
  drawSlideBase(5, 'Key Features', 'Built for High-Stakes Decision Verification');

  const featureGrid = [
    {
      badge: 'VOID DETECTION',
      title: 'Dark Spot Matrix & Topology',
      desc: 'Visualizes missing facts by category and severity. Displays why each omission is hazardous and what specific questions must be asked.',
      color: ACCENT_ROSE,
      x: 50,
      y: 105
    },
    {
      badge: 'CONFLICT RADAR',
      title: 'Contradiction Forensic Radar',
      desc: 'Side-by-side claim comparison with exact quotes, divergence analysis, and guidance on which policy or year takes legal precedence.',
      color: ACCENT_AMBER,
      x: 490,
      y: 105
    },
    {
      badge: 'TEMPORAL DRIFT',
      title: 'Temporal Decay & Cycle Audit',
      desc: 'Detects outdated documentation (e.g. 2023 regulations applied to 2026 applications) and flags stale terms vulnerable to policy drift.',
      color: ACCENT_SKY,
      x: 50,
      y: 235
    },
    {
      badge: 'STRESS TESTER',
      title: 'Interactive Decision Simulator',
      desc: 'Lets users stress-test hypothetical scenarios: "What if my GPA drops to 3.4?" or "What if I take a leave of absence?" with real-time risk projections.',
      color: ACCENT_EMERALD,
      x: 490,
      y: 235
    },
    {
      badge: 'PROVENANCE',
      title: 'Verbatim Source Inspector',
      desc: 'Full-text in-app document viewer with keyword search and highlight, proving zero hallucination and showing exact textual context.',
      color: ACCENT_CYAN,
      x: 50,
      y: 365
    },
    {
      badge: 'EXPORT SUITE',
      title: 'Audio Briefing & Multi-Export',
      desc: 'Generates browser text-to-speech voice debriefings and exports comprehensive audit dossiers to Markdown, JSON, and PowerPoint presentations.',
      color: TEXT_WHITE,
      x: 490,
      y: 365
    }
  ];

  featureGrid.forEach(f => {
    doc.setFillColor(...CARD_DARK);
    doc.setDrawColor(...CARD_BORDER);
    doc.setLineWidth(1);
    doc.roundedRect(f.x, f.y, 420, 115, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...f.color);
    doc.text(f.badge, f.x + 18, f.y + 24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(f.title, f.x + 18, f.y + 44);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(...TEXT_BODY);
    const dlines = doc.splitTextToSize(f.desc, 385);
    doc.text(dlines, f.x + 18, f.y + 64);
  });

  // ---------------------------------------------------------------------------
  // SLIDE 6: Competitive Edge (Table)
  // ---------------------------------------------------------------------------
  doc.addPage([W, H], 'landscape');
  drawSlideBase(6, 'Competitive Edge', 'GapLens vs. Standard Search & Conventional LLM Summarizers');

  // Table configuration
  const startX = 50;
  const startY = 105;
  const colW = [190, 220, 220, 230];
  const totalW = colW.reduce((a, b) => a + b, 0);

  const headers = ['Capability / Metric', 'Google Search / Perplexity', 'ChatGPT / Standard RAG', 'GapLens Epistemic Auditor'];

  // Draw Header Row
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(startX, startY, totalW, 36, 'F');
  doc.setDrawColor(...CARD_BORDER);
  doc.setLineWidth(1);
  doc.rect(startX, startY, totalW, 36, 'S');

  let curColX = startX;
  headers.forEach((h, i) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...(i === 3 ? ACCENT_SKY : (i === 0 ? TEXT_WHITE : TEXT_MUTED)));
    doc.text(h, curColX + 12, startY + 22);
    curColX += colW[i];
  });

  const tableRows = [
    [
      'Detection of Unstated Gaps',
      'None (Only retrieves keywords)',
      'Rare (Prone to hallucinating answers)',
      'Native (Epistemic Void Modeling)'
    ],
    [
      'Cross-Source Contradictions',
      'Left to human to compare',
      'Smooths over discrepancies',
      'Exact verbatim quote alignment'
    ],
    [
      'Temporal Staleness Audit',
      'Ranked by SEO, not validity',
      'No cycle or expiration check',
      'Flags cycle drift & legacy rules'
    ],
    [
      'Decision Actionability',
      'Unstructured web links',
      'Generic paragraphs of advice',
      'Prioritized verification checklist'
    ],
    [
      'Evidence Transparency',
      'Web snippet only',
      'Opaque neural generation',
      'Verbatim source inspection'
    ]
  ];

  let rY = startY + 36;
  const rowH = 68;
  tableRows.forEach((row, ri) => {
    doc.setFillColor(...(ri % 2 === 0 ? CARD_DARK : [20, 28, 50]));
    doc.rect(startX, rY, totalW, rowH, 'F');
    doc.setDrawColor(...CARD_BORDER);
    doc.setLineWidth(1);
    doc.rect(startX, rY, totalW, rowH, 'S');

    let cX = startX;
    row.forEach((cell, ci) => {
      doc.setFont('helvetica', ci === 0 || ci === 3 ? 'bold' : 'normal');
      doc.setFontSize(9);
      if (ci === 0) doc.setTextColor(...TEXT_WHITE);
      else if (ci === 3) doc.setTextColor(...ACCENT_EMERALD);
      else doc.setTextColor(...TEXT_BODY);

      const clines = doc.splitTextToSize(cell, colW[ci] - 24);
      doc.text(clines, cX + 12, rY + 30);
      cX += colW[ci];
    });

    rY += rowH;
  });

  // ---------------------------------------------------------------------------
  // SLIDE 7: Demo Benchmarks
  // ---------------------------------------------------------------------------
  doc.addPage([W, H], 'landscape');
  drawSlideBase(7, 'Demo Benchmarks', 'Tested Across 4 Real-World High-Stakes Domains');

  const benchmarks = [
    {
      title: '1. STEM Fellowship Trap',
      domain: 'HIGHER EDUCATION FUNDING',
      color: ACCENT_SKY,
      darkSpot: 'Hidden 3.75 GPA requirement & $80,000 retroactive clawback upon changing majors.',
      conflict: 'Flyer claims $80k income cap; Official Bylaws state $65k hard ceiling.',
      x: 50,
      y: 105
    },
    {
      title: '2. Oncology Clinical Trial',
      domain: 'BIOMEDICAL & HEALTHCARE',
      color: ACCENT_ROSE,
      darkSpot: 'Unpublished autoimmune exclusion clause; lack of post-trial drug access guarantee.',
      conflict: 'Hospital portal says travel is 100% subsidized; consent form specifies $500 cap.',
      x: 490,
      y: 105
    },
    {
      title: '3. Cloud Enterprise MSA',
      domain: 'B2B SOFTWARE & LEGAL',
      color: ACCENT_AMBER,
      darkSpot: 'Zero compensation for outages under 4 hours; unmentioned 8% auto-renewal escalator.',
      conflict: 'Marketing brochure claims 99.99% uptime; legal terms exclude scheduled maintenance.',
      x: 50,
      y: 295
    },
    {
      title: '4. Tech Work Visa Pathway',
      domain: 'IMMIGRATION & RELOCATION',
      color: ACCENT_EMERALD,
      darkSpot: 'Absence of spouse work authorization (H-4) rules & mandatory 6-month exit grace.',
      conflict: 'Government portal lists $1,500 fee; embassy bulletin lists $2,800 processing fee.',
      x: 490,
      y: 295
    }
  ];

  benchmarks.forEach(b => {
    doc.setFillColor(...CARD_DARK);
    doc.setDrawColor(...b.color);
    doc.setLineWidth(1.2);
    doc.roundedRect(b.x, b.y, 420, 175, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...b.color);
    doc.text(b.domain, b.x + 18, b.y + 24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(b.title, b.x + 18, b.y + 44);

    // Dark Spot
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(...ACCENT_ROSE);
    doc.text('Dark Spot Omission:', b.x + 18, b.y + 70);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_BODY);
    const dlines = doc.splitTextToSize(b.darkSpot, 380);
    doc.text(dlines, b.x + 18, b.y + 86);

    // Conflict
    const cy = b.y + 86 + dlines.length * 11 + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(...ACCENT_AMBER);
    doc.text('Factual Divergence:', b.x + 18, cy);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_BODY);
    const clines = doc.splitTextToSize(b.conflict, 380);
    doc.text(clines, b.x + 18, cy + 16);
  });

  // ---------------------------------------------------------------------------
  // SLIDE 8: Roadmap & Impact
  // ---------------------------------------------------------------------------
  doc.addPage([W, H], 'landscape');
  drawSlideBase(8, 'Roadmap & Impact', 'From Hackathon Prototype to Epistemic Infrastructure');

  const roadmap = [
    {
      phase: 'PHASE 1 (TODAY)',
      title: 'Full-Stack Web Auditor',
      color: ACCENT_SKY,
      x: 50,
      points: [
        'Live Express + React + Gemini pipeline',
        'Multi-source ingestion & text scraper',
        'Interactive topology & blind spot probe',
        'Open-source repository on GitHub'
      ]
    },
    {
      phase: 'PHASE 2 (Q2 2026)',
      title: 'Browser Real-Time Sentinel',
      color: ACCENT_CYAN,
      x: 350,
      points: [
        'Chrome/Edge extension reading Terms of Service',
        'Real-time ambient dark spot alerts on sign-up pages',
        'Automatic cross-checking against official gazettes',
        'Crowdsourced community void reporting'
      ]
    },
    {
      phase: 'PHASE 3 (Q4 2026)',
      title: 'Enterprise Epistemic API',
      color: ACCENT_EMERALD,
      x: 650,
      points: [
        'SDK integration for legal tech & compliance',
        'Automated contract red-flagging before signature',
        'Academic peer review omission scanner',
        'Enterprise data room completeness audit'
      ]
    }
  ];

  roadmap.forEach(r => {
    doc.setFillColor(...CARD_DARK);
    doc.setDrawColor(...r.color);
    doc.setLineWidth(1.2);
    doc.roundedRect(r.x, 105, 260, 240, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...r.color);
    doc.text(r.phase, r.x + 18, 130);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(...TEXT_WHITE);
    doc.text(r.title, r.x + 18, 152);

    let py = 180;
    r.points.forEach(pt => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(...TEXT_BODY);
      const lines = doc.splitTextToSize(`• ${pt}`, 225);
      doc.text(lines, r.x + 18, py);
      py += lines.length * 12 + 10;
    });
  });

  // Call To Action Banner
  doc.setFillColor(...CARD_DARK);
  doc.setDrawColor(...ACCENT_SKY);
  doc.setLineWidth(1.5);
  doc.roundedRect(50, 365, W - 100, 115, 8, 8, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...ACCENT_SKY);
  doc.text('TRY GAPLENS LIVE & EXPLORE THE OPEN SOURCE CODEBASE', 75, 400);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...TEXT_WHITE);
  doc.text('GitHub: https://github.com/hemantpatil225577/gaplens', 75, 428);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Licensed under Apache-2.0  •  Built with Google Gemini 3.8 Flash & React 19  •  Ready for evaluation', 75, 452);

  return doc;
}

// Generate file if executed directly
if (process.argv[1] && process.argv[1].endsWith('generate_pdf.js')) {
  try {
    const doc = createPdfDeck();
    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const publicPath = path.join(publicDir, 'GapLens_Hackathon_Pitch_Deck.pdf');
    const rootPath = path.resolve('GapLens_Hackathon_Pitch_Deck.pdf');

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    fs.writeFileSync(publicPath, pdfBuffer);
    fs.writeFileSync(rootPath, pdfBuffer);

    console.log(`Successfully generated pitch deck PDF:`);
    console.log(` - ${publicPath} (${pdfBuffer.length} bytes)`);
    console.log(` - ${rootPath} (${pdfBuffer.length} bytes)`);
  } catch (err) {
    console.error('Failed to generate PDF:', err);
    process.exit(1);
  }
}
