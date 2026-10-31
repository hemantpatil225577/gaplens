import React from 'react';
import { BENCHMARK_SCENARIOS } from '../data/benchmarks';
import { BenchmarkScenario } from '../types';
import { X, Sparkles, Database, Check, ArrowRight } from 'lucide-react';

interface BenchmarkSelectorModalProps {
  onSelectScenario: (scenario: BenchmarkScenario) => void;
  onClose: () => void;
  currentScenarioId: string;
}

export const BenchmarkSelectorModal: React.FC<BenchmarkSelectorModalProps> = ({
  onSelectScenario,
  onClose,
  currentScenarioId,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Benchmark Investigation Presets
              </h3>
              <p className="text-xs text-slate-500">
                Load curated multi-source scenarios demonstrating real-world information gaps.
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

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-4">
          {BENCHMARK_SCENARIOS.map((scen) => {
            const isSelected = scen.id === currentScenarioId;
            return (
              <div
                key={scen.id}
                onClick={() => {
                  onSelectScenario(scen);
                  onClose();
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-slate-900 dark:border-amber-400 bg-slate-50 dark:bg-slate-800/80 ring-1 ring-slate-900 dark:ring-amber-400'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {scen.tag}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-mono text-slate-400">
                        {scen.sources.length} Verified Sources
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {scen.title}
                    </h4>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Active Benchmark
                      </>
                    ) : (
                      <>
                        Load Scenario <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {scen.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">Key Traps:</span>
                  <span>{scen.sampleFindingsSummary}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
