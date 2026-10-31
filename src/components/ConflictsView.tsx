import React from 'react';
import { ConflictingClaim } from '../types';
import { ArrowRightLeft, Quote, Compass, FileText } from 'lucide-react';

interface ConflictsViewProps {
  conflicts: ConflictingClaim[];
  onInspectSource?: (sourceId: string) => void;
}

export const ConflictsView: React.FC<ConflictsViewProps> = ({
  conflicts,
  onInspectSource,
}) => {
  const getConflictNatureLabel = (nature: string) => {
    switch (nature) {
      case 'direct_contradiction':
        return 'Direct Contradiction';
      case 'different_conditions':
        return 'Conflicting Requirements';
      case 'temporal_discrepancy':
        return 'Cycle / Temporal Discrepancy';
      default:
        return 'Ambiguous Interpretation';
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'high':
        return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50';
      case 'medium':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50';
      default:
        return 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Cross-Source Contradictions
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Incompatible claims and discrepancies discovered across different source documents.
        </p>
      </div>

      {conflicts.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800">
          <ArrowRightLeft className="w-8 h-8 text-sky-500 mx-auto mb-3" />
          <p className="text-base font-semibold text-slate-900 dark:text-white">No Contradictions Flagged</p>
          <p className="text-sm text-slate-500 mt-1">All evaluated sources appear to be in consensus or non-overlapping on these points.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {conflicts.map((conflict) => (
            <div
              key={conflict.id}
              className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs space-y-5"
            >
              {/* Conflict Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sky-50 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono">{conflict.id}</span>
                    <span aria-hidden="true" className="text-sky-200">·</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${getSeverityBadge(conflict.severity)}`}>
                      {conflict.severity} Severity
                    </span>
                    <span aria-hidden="true" className="text-sky-200">·</span>
                    <span className="font-semibold text-sky-800 dark:text-sky-300">
                      {getConflictNatureLabel(conflict.natureOfConflict)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {conflict.topic}
                  </h3>
                </div>
              </div>

              {/* Side-by-side claims comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Claim A */}
                <div className="p-4 rounded-xl bg-sky-50/30 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-sky-100 dark:bg-slate-700 text-sky-800 dark:text-sky-200">
                        {conflict.claimA.sourceId}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                        {conflict.claimA.sourceTitle || conflict.claimA.sourceId}
                      </span>
                    </div>
                    {conflict.claimA.dateOrCycle && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        {conflict.claimA.dateOrCycle}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {conflict.claimA.claimText}
                  </p>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-sky-100 dark:border-slate-800 text-xs italic text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <Quote className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>"{conflict.claimA.exactQuote}"</span>
                  </div>

                  {onInspectSource && (
                    <button
                      onClick={() => onInspectSource(conflict.claimA.sourceId)}
                      className="text-xs text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-semibold pt-1"
                    >
                      <FileText className="w-3 h-3" /> Inspect source document
                    </button>
                  )}
                </div>

                {/* Claim B */}
                <div className="p-4 rounded-xl bg-sky-50/30 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-sky-100 dark:bg-slate-700 text-sky-800 dark:text-sky-200">
                        {conflict.claimB.sourceId}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                        {conflict.claimB.sourceTitle || conflict.claimB.sourceId}
                      </span>
                    </div>
                    {conflict.claimB.dateOrCycle && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        {conflict.claimB.dateOrCycle}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {conflict.claimB.claimText}
                  </p>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-sky-100 dark:border-slate-800 text-xs italic text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <Quote className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>"{conflict.claimB.exactQuote}"</span>
                  </div>

                  {onInspectSource && (
                    <button
                      onClick={() => onInspectSource(conflict.claimB.sourceId)}
                      className="text-xs text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-semibold pt-1"
                    >
                      <FileText className="w-3 h-3" /> Inspect source document
                    </button>
                  )}
                </div>
              </div>

              {/* Forensic Root-Cause Analysis & Resolution Advice */}
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-2">
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  Forensic Divergence Analysis:
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {conflict.analysis}
                </p>

                <div className="pt-2 border-t border-amber-200/50 dark:border-amber-900/30 flex items-start gap-2 text-xs">
                  <Compass className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">How to Resolve: </span>
                    <span className="text-slate-700 dark:text-slate-300">{conflict.resolutionAdvice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
