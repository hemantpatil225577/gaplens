# GapLens 🔍
> **AI-Assisted Information Gap Detection & Epistemic Audit Platform**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_API-3.8_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

---

## 📌 Problem Statement: The "Digital Dark Spot"

People rely on online information to make high-stakes decisions about education, career choices, public services, healthcare, and finance. However, relevant information is frequently scattered across disparate web portals, unofficial forums, and outdated notices. 

Current search engines focus on **retrieving** available content, while modern LLM summarizers **condense** existing text. **Neither tells you what is missing, what is contradictory, or what is dangerously out of date.**

A user researching a scholarship may find general eligibility guidelines, but easily miss:
- Hidden renewal GPA thresholds.
- Conflicting document requirements between official portals and third-party guides.
- Unofficial application deadlines referencing prior-year cycles.
- Critical prerequisites that are completely absent across all reviewed documents.

**GapLens** is built to bridge this gap: an AI-assisted information auditor that scans across multiple sources to expose epistemic dark spots, flag conflicting claims with verbatim citations, alert users to temporal decay, and provide an actionable, prioritized verification checklist before a decision is finalized.

---

## 🚀 Key Features

### 1. Dual-Corpus Ingestion & Live Scraper Proxy
- Add custom source URLs, paste raw document texts, or choose from pre-engineered benchmark scenarios (e.g., *Merit & Need Scholarship Review*, *Tech Grant Procurement*).
- Built-in backend proxy (`/api/fetch-url`) retrieves web articles cleanly, parses DOM content, and extracts publication dates automatically.

### 2. Sourced vs. Inferred Epistemic Segregation
- Clear separation between **Direct Sourced Findings** (verbatim text backed by citations) and **AI-Inferred Dark Spots** (signals derived from domain ontology where standard requirements are absent).

### 3. Conflicting Claims & Contradiction Radar
- Identifies factual discrepancies across sources (e.g., Source A states family income under $45,000; Source B claims eligibility up to $60,000).
- Side-by-side comparative quotes with source attribution and trust weight analysis.

### 4. Temporal Decay & Recency Warning System
- Automatically tags sources by publication date or academic/fiscal cycle.
- Warns users when advice or document requirements originate from superseded years or undated blogs.

### 5. Prioritized Verification Checklist
- Dynamic, prioritized action list categorized by risk severity (**Critical**, **High**, **Moderate**).
- Includes the specific official authority to contact or link to check before proceeding.
- Interactive status tracking (mark verified, in-progress, or flagged).

### 6. Interactive Blind Spot Probe & "What-If" Decision Simulator
- Ask specific verification questions (e.g., *"Does any source cover criminal record clearances?"*).
- Simulates high-stakes decision scenarios (e.g., *"What happens if you submit without official tax returns?"*) to reveal latent failure modes.

### 7. Visual Topology & Polar Dark Spot Matrix
- Interactive graphical network connecting evaluated sources to discovered gaps and conflicts.
- Polar severity radar visualizing epistemic coverage across Eligibility, Deadlines, Financials, and Documentation.

### 8. Voice Briefing & Exportable Audit Dossiers
- **Audio Executive Briefing:** Browser-synthesized audio debrief summarizing critical findings for busy decision-makers.
- **Audit Dossier Export:** Generate and download comprehensive Markdown or JSON reports, complete with timestamps and citation trails.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Design** | Tailwind CSS v4, Lucide React Icons, Motion (Framer Motion) |
| **AI & LLM Engine** | `@google/genai` TypeScript SDK (Powered by `gemini-3.8-flash`) |
| **Backend & Proxy** | Express.js, Node.js (`server.ts` full-stack architecture) |
| **Visualization** | Custom SVG Polar Radar & Interactive Network Topology Graphs |
| **Audio** | HTML5 SpeechSynthesis Web Audio API |

---

## 📂 Project Architecture

```
├── server.ts                    # Express server with Gemini API routes & web scraper proxy
├── src/
│   ├── App.tsx                  # Main orchestration container & tab navigation
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Tailwind CSS v4 design tokens & theme setup
│   ├── components/
│   │   ├── Logo.tsx             # Vector focal reticle & radar logo
│   │   ├── HeroBanner.tsx       # Dynamic header & quick metrics
│   │   ├── AnalysisDashboard.tsx# Core findings dashboard (gaps, conflicts, checklist)
│   │   ├── DarkSpotMatrix.tsx   # Polar radar & visual node network graph
│   │   ├── SourcesPanel.tsx     # Source management & URL ingestion
│   │   ├── DecisionSimulator.tsx# "What-If" stress testing simulator
│   │   ├── CommandPalette.tsx   # Cmd+K keyboard shortcut launcher
│   │   ├── ExportModal.tsx      # Comprehensive Markdown/JSON dossier exporter
│   │   └── AudioBriefingPlayer.tsx # Text-to-speech executive summary
│   ├── data/
│   │   └── benchmarks.ts        # Out-of-the-box real-world benchmark datasets
│   └── types/
│       └── index.ts             # TypeScript interfaces for sources, gaps & findings
├── index.html                   # HTML entry point with meta tags & icons
├── package.json                 # Dependencies and build scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration with Tailwind CSS v4 plugin
```

---

## ⚡ Getting Started & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/gaplens.git
cd gaplens
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```bash
# Required for Gemini AI API analysis
GEMINI_API_KEY="your-google-gemini-api-key"

# Port (defaults to 3000)
PORT=3000
```
> **Note:** You can obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🧪 Demonstration & Benchmark Scenarios

GapLens includes pre-loaded, multi-source benchmarks for immediate testing without manual copying:

1. **National Merit Scholarship Application:**
   - Evaluates official guidelines vs. alumni blog vs. financial forum.
   - **Detected Gaps:** Renewal GPA threshold unspecified; summer funding rules absent.
   - **Detected Conflicts:** Contrasting parent income caps ($45,000 vs. $60,000) and contradictory recommendation letter counts (1 vs. 2).
   - **Detected Decay:** Alumni blog verified to reference the superseded 2023–2024 handbook.

2. **Cross-Border Student Visa Clearance:**
   - Discrepancies between official embassy circulars and student advisory wikis regarding proof of liquid funds.

---

## 🛡️ Responsible AI & Epistemic Transparency

GapLens strictly enforces transparent AI heuristics:
- **Never hallucinates authority:** Gaps are framed as *potential missing requirements* rather than certain truths.
- **Traceable lineage:** Every flagged contradiction is coupled with the exact source reference ID and quote.
- **Human-in-the-loop:** The prioritized checklist provides actionable questions for users to verify directly with issuing authorities.

---

## 📜 License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.
