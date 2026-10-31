import React from 'react';
import { EstablishedFact } from '../types';
import { CheckCircle2, Quote, Layers, ShieldCheck } from 'lucide-react';

interface EstablishedFactsViewProps {
  facts: EstablishedFact[];
  onInspectSource?: (sourceId: string) => void;
}

export const EstablishedFactsView: React.FC<EstablishedFactsViewProps> = ({
  facts,
  onInspectSource,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sourced Established Findings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Direct facts explicitly verified across the reviewed source documents with verifiable citation references.
        </p>
      </div>

      <div className="space-y-4">
        {facts.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  #{idx + 1}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Consensus: <strong className="text-slate-800 dark:text-slate-200 capitalize">{item.consensusLevel.replace('_', ' ')}</strong>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> High Confidence
                </span>
              </div>

              {/* Sourced Reference IDs */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Attributed Sources:</span>
                {item.sourceIds.map((sid) => (
                  <button
                    key={sid}
                    onClick={() => onInspectSource?.(sid)}
                    className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                    title={`Inspect ${sid}`}
                  >
                    [{sid}]
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
              {item.fact}
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-800 text-xs italic text-slate-600 dark:text-slate-400 flex items-start gap-2">
              <Quote className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>"{item.evidenceSnippet}"</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
