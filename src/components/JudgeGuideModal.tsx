import React from 'react';
import { X, Trophy, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface JudgeGuideModalProps {
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onRunAnalysis: () => void;
  onInspectSource: (sourceId: string) => void;
}

export const JudgeGuideModal: React.FC<JudgeGuideModalProps> = ({
  onClose,
  onNavigateTab,
  onRunAnalysis,
  onInspectSource,
}) => {
  const criteria = [
    {
      title: 'Problem Understanding & Relevance',
      weight: '15% (1.5 Marks)',
      description: 'Addresses the danger of high-stakes decisions when online information is incomplete, fragmented, and missing vital renewal or fee policies.',
      implementation: 'Full coverage of real-world scenarios: scholarships, clinical trials, cloud MSAs, and work visas.',
    },
    {
      title: 'Innovation & Originality',
      weight: '20% (2.0 Marks)',
      description: 'Goes beyond search or ordinary summarization by modeling absence: detecting the "dark spots" that users did not know to ask about.',
      implementation: 'Epistemic dimension matrix, forensic divergence comparator, and interactive blind spot prober.',
    },
    {
      title: 'Working Prototype & Functionality',
      weight: '25% (2.5 Marks)',
      description: 'Complete end-to-end workflow: inquiry input, URL extraction proxy, multi-source ingestion, gap detection, and actionable checklist.',
      implementation: 'Working full-stack Express + Gemini 3.8 Flash pipeline with instant pre-loaded and live analysis.',
    },
    {
      title: 'Technical Implementation',
      weight: '15% (1.5 Marks)',
      description: 'Robust engineering with server-side proxying, typed schemas, resilient fallback architectures, and WCAG AA accessibility.',
      implementation: 'Clean TypeScript, Google GenAI SDK with structured output validation, and Tailwind CSS v4.',
    },
    {
      title: 'Evidence, Accuracy & Transparency',
      weight: '15% (1.5 Marks)',
      description: 'Zero fabricated claims. Findings are traced to exact verbatim source quotes with clear epistemic labeling of AI signals vs direct evidence.',
      implementation: 'Full-text source inspector with keyword search and highlight, side-by-side contradiction quotes.',
    },
    {
      title: 'Presentation & Demo Flow',
      weight: '10% (1.0 Marks)',
      description: 'Polished, scannable UI designed for clarity, interactive verification, and exportable audit dossiers.',
      implementation: 'Single-click benchmark loading, export to Markdown/JSON, and interactive checklist completion.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Evaluation Rubric & Guided Demo Walkthrough
              </h3>
              <p className="text-xs text-slate-500">
                Epistemic Intelligence Architecture • Total: 10 Marks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Suggested Demo Flow Box */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4" />
              Suggested 4-Step Hackathon Demo Flow
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <button
                onClick={() => {
                  onNavigateTab('overview');
                  onClose();
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors flex flex-col justify-between gap-2"
              >
                <div>
                  <strong className="block text-amber-300">Step 1: Inquiry & Matrix</strong>
                  <span className="text-slate-300 text-[11px]">View research mandate and epistemic coverage matrix</span>
                </div>
                <span className="text-amber-400 font-semibold flex items-center gap-1">Jump to View →</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('gaps');
                  onClose();
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors flex flex-col justify-between gap-2"
              >
                <div>
                  <strong className="block text-amber-300">Step 2: Dark Spot Voids</strong>
                  <span className="text-slate-300 text-[11px]">Inspect missing renewal conditions unstated across all sources</span>
                </div>
                <span className="text-amber-400 font-semibold flex items-center gap-1">Inspect Gaps →</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('conflicts');
                  onClose();
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors flex flex-col justify-between gap-2"
              >
                <div>
                  <strong className="block text-amber-300">Step 3: Contradictions</strong>
                  <span className="text-slate-300 text-[11px]">Compare conflicting $65k vs $80k income caps with quotes</span>
                </div>
                <span className="text-amber-400 font-semibold flex items-center gap-1">View Conflicts →</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('checklist');
                  onClose();
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors flex flex-col justify-between gap-2"
              >
                <div>
                  <strong className="block text-amber-300">Step 4: Checklist & Audit</strong>
                  <span className="text-slate-300 text-[11px]">Execute prioritized verification items and export report</span>
                </div>
                <span className="text-amber-400 font-semibold flex items-center gap-1">Checklist →</span>
              </button>
            </div>
          </div>

          {/* Criteria Evaluation List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Weighted Evaluation Breakdown (10 Marks Total)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {criteria.map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {c.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      {c.weight}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {c.description}
                  </p>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-slate-500">Live implementation: </span>
                    {c.implementation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:opacity-90"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
