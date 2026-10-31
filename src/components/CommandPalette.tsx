import React, { useState, useEffect } from 'react';
import { Search, X, AlertCircle, ArrowRightLeft, CheckSquare, FileText, Sparkles, Command } from 'lucide-react';
import { AnalysisResult, SourceItem, BenchmarkScenario } from '../types';
import { BENCHMARK_SCENARIOS } from '../data/benchmarks';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult;
  sources: SourceItem[];
  onNavigateTab: (tab: string) => void;
  onSelectScenario: (scen: BenchmarkScenario) => void;
  onRunAnalysis: () => void;
  onInspectSource: (sourceId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  analysis,
  sources,
  onNavigateTab,
  onSelectScenario,
  onRunAnalysis,
  onInspectSource,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search results calculation
  const cleanQ = query.toLowerCase().trim();

  const matchedGaps = analysis.darkSpots.filter(
    (g) => g.gapTitle.toLowerCase().includes(cleanQ) || g.category.toLowerCase().includes(cleanQ) || g.whyItMatters.toLowerCase().includes(cleanQ)
  );

  const matchedConflicts = analysis.conflictingClaims.filter(
    (c) => c.topic.toLowerCase().includes(cleanQ) || c.analysis.toLowerCase().includes(cleanQ)
  );

  const matchedChecklist = analysis.verificationChecklist.filter(
    (v) => v.actionItem.toLowerCase().includes(cleanQ) || v.targetEntityOrDocument.toLowerCase().includes(cleanQ)
  );

  const matchedSources = sources.filter(
    (s) => s.title.toLowerCase().includes(cleanQ) || s.id.toLowerCase().includes(cleanQ)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[75vh] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dark spots, contradictions, tasks, sources or commands..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Viewport */}
        <div className="p-3 overflow-y-auto space-y-4 text-xs">
          {/* Quick Actions */}
          {!cleanQ && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Quick Platform Actions
              </span>
              <button
                onClick={() => {
                  onRunAnalysis();
                  onClose();
                }}
                className="w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between text-slate-700 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold">Re-run Full Dark Spot Audit with Gemini</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">Action</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('gaps');
                  onClose();
                }}
                className="w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between text-slate-700 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>View All Information Gaps & Voids</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">Tab</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('checklist');
                  onClose();
                }}
                className="w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between text-slate-700 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-blue-500" />
                  <span>Open Prioritized Verification Checklist</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">Tab</span>
              </button>
            </div>
          )}

          {/* Matched Dark Spots */}
          {matchedGaps.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                Dark Spots & Voids ({matchedGaps.length})
              </span>
              {matchedGaps.map((gap) => (
                <button
                  key={gap.id}
                  onClick={() => {
                    onNavigateTab('gaps');
                    onClose();
                  }}
                  className="w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-start gap-2 text-slate-800 dark:text-slate-200"
                >
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">{gap.gapTitle}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-lg">{gap.whyItMatters}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Matched Conflicts */}
          {matchedConflicts.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-rose-500">
                Contradictory Claims ({matchedConflicts.length})
              </span>
              {matchedConflicts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onNavigateTab('conflicts');
                    onClose();
                  }}
                  className="w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-start gap-2 text-slate-800 dark:text-slate-200"
                >
                  <ArrowRightLeft className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">{c.topic}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-lg">{c.analysis}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Matched Sources */}
          {matchedSources.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-blue-500">
                Sources in Corpus ({matchedSources.length})
              </span>
              {matchedSources.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onInspectSource(s.id);
                    onClose();
                  }}
                  className="w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between text-slate-800 dark:text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="font-mono font-bold">[{s.id}]</span>
                    <span>{s.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Inspect</span>
                </button>
              ))}
            </div>
          )}

          {/* Scenarios Preset Switching */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Switch Benchmark Case
            </span>
            {BENCHMARK_SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                onClick={() => {
                  onSelectScenario(scen);
                  onClose();
                }}
                className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between text-slate-600 dark:text-slate-300"
              >
                <span>{scen.title}</span>
                <span className="font-mono text-[10px] text-slate-400">{scen.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">
              ESC
            </kbd>
            <span>to close</span>
          </div>
          <span>GapLens Global Quick Command</span>
        </div>
      </div>
    </div>
  );
};
