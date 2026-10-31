import React from 'react';
import { TemporalWarning, SourceItem } from '../types';
import { History, Calendar, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

interface TemporalAuditViewProps {
  warnings: TemporalWarning[];
  sources: SourceItem[];
  onInspectSource?: (sourceId: string) => void;
}

export const TemporalAuditView: React.FC<TemporalAuditViewProps> = ({
  warnings,
  sources,
  onInspectSource,
}) => {
  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50';
      case 'medium':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50';
      default:
        return 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Temporal & Cycle Recency Audit
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Detection of expired application cycles, obsolete policies, and undated claims.
        </p>
      </div>

      {/* Sources Recency Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sources.map((src) => {
          const hasWarning = warnings.some((w) => w.sourceId === src.id);
          return (
            <div
              key={src.id}
              className={`p-4 bg-white dark:bg-slate-900 rounded-xl border shadow-xs space-y-2 ${
                hasWarning
                  ? 'border-amber-300 dark:border-amber-900/60 bg-amber-50/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {src.id}
                </span>
                <span className="text-slate-500 font-mono text-[11px] truncate max-w-[140px]">
                  {src.dateOrCycle || 'No Date Stated'}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {src.title}
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                {hasWarning ? (
                  <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Temporal Risk Detected
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Fresh / Current Cycle
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning Cards */}
      <div className="space-y-4">
        {warnings.map((warning) => (
          <div
            key={warning.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {warning.sourceId}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-700 dark:text-slate-200 font-semibold truncate max-w-[280px]">
                  {warning.sourceTitle || warning.sourceId}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${getRiskStyle(warning.riskLevel)}`}>
                  {warning.riskLevel} Risk
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Stated: {warning.statedDateOrCycle}</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {warning.explanation}
            </p>

            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-lg border border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Recommended Recency Verification: </span>
                <span>{warning.recommendedVerification}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
