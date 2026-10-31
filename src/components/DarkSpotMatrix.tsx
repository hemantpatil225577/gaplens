import React from 'react';
import { AnalysisResult, SourceItem } from '../types';
import { Eye, ArrowRight } from 'lucide-react';

interface DarkSpotMatrixProps {
  analysis: AnalysisResult;
  sources: SourceItem[];
  onInspectSource: (sourceId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const DarkSpotMatrix: React.FC<DarkSpotMatrixProps> = ({
  analysis,
  sources,
  onInspectSource,
  onNavigateTab,
}) => {
  const coreDimensions = [
    { key: 'eligibility', name: 'Initial Eligibility Criteria', categoryMatch: 'Eligibility' },
    { key: 'renewal', name: 'Retention & Renewal Conditions', categoryMatch: 'Renewal' },
    { key: 'deadlines', name: 'Application Deadlines & Cycle', categoryMatch: 'Deadlines' },
    { key: 'documents', name: 'Mandatory Verification Documents', categoryMatch: 'Documentation' },
    { key: 'financial', name: 'Financial Caps & Clawbacks', categoryMatch: 'Financial' },
  ];

  const getCellStatus = (dimension: typeof coreDimensions[0], source: SourceItem) => {
    const conflict = analysis.conflictingClaims.find((c) =>
      (c.claimA.sourceId === source.id || c.claimB.sourceId === source.id) &&
      (c.topic.toLowerCase().includes(dimension.name.toLowerCase().slice(0, 5)) ||
       c.topic.toLowerCase().includes(dimension.categoryMatch.toLowerCase()))
    );

    if (conflict) {
      return {
        type: 'conflict',
        label: 'Conflicted Claim',
        bg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300 border-rose-200 dark:border-rose-900/60',
        dot: 'bg-rose-500',
        detail: conflict.topic,
      };
    }

    const darkSpot = analysis.darkSpots.find((ds) =>
      ds.category.toLowerCase().includes(dimension.categoryMatch.toLowerCase()) ||
      ds.gapTitle.toLowerCase().includes(dimension.name.toLowerCase().slice(0, 5))
    );

    const keywords = dimension.name.toLowerCase().split(' ');
    const hasAnyMention = keywords.some(
      (kw) => kw.length > 4 && source.content.toLowerCase().includes(kw)
    );

    if (darkSpot && !hasAnyMention) {
      return {
        type: 'void',
        label: 'Information Dark Spot',
        bg: 'bg-amber-50/80 text-amber-900 dark:bg-slate-900 dark:text-amber-300 border-amber-300 dark:border-amber-900/50',
        dot: 'bg-amber-500 animate-pulse',
        detail: darkSpot.gapTitle,
      };
    }

    if (hasAnyMention) {
      return {
        type: 'covered',
        label: 'Covered',
        bg: 'bg-sky-50 text-sky-800 dark:bg-sky-950/30 dark:text-sky-300 border-sky-200 dark:border-sky-900/60',
        dot: 'bg-sky-500',
        detail: 'Direct evidence present',
      };
    }

    return {
      type: 'void',
      label: 'Unaddressed',
      bg: 'bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-slate-200 dark:border-slate-800',
      dot: 'bg-slate-400',
      detail: 'No criteria stated',
    };
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Epistemic Dimension Coverage Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual inspection grid plotting essential decision dimensions against reviewed sources. Dark Spot voids highlight what no source covers.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Covered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Conflicted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Dark Spot Void</span>
          </div>
        </div>
      </div>

      {/* Responsive Matrix Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-sky-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-sky-50/40 dark:bg-slate-800/20">
              <th className="py-3 px-4 w-1/4 rounded-l-lg">Decision Dimension</th>
              {sources.map((src, i) => (
                <th key={src.id} className={`py-3 px-3 ${i === sources.length - 1 ? 'rounded-r-lg' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sky-800 dark:text-sky-300 font-bold">
                      [{src.id}]
                    </span>
                    <button
                      onClick={() => onInspectSource(src.id)}
                      className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </div>
                  <div className="text-[11px] font-normal text-slate-500 truncate max-w-[160px]">
                    {src.title}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-50 dark:divide-slate-800/80 text-xs">
            {coreDimensions.map((dim) => (
              <tr key={dim.key} className="hover:bg-sky-50/20 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                  {dim.name}
                </td>
                {sources.map((src) => {
                  const cell = getCellStatus(dim, src);
                  return (
                    <td key={src.id} className="py-3.5 px-3">
                      <div
                        className={`p-2 rounded-lg border transition-all text-xs flex flex-col gap-1 ${cell.bg}`}
                      >
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className={`w-1.5 h-1.5 rounded-full ${cell.dot}`} />
                          <span>{cell.label}</span>
                        </div>
                        <span className="text-[11px] opacity-80 line-clamp-1">
                          {cell.detail}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span>Click on any source header to inspect the original text behind these classifications.</span>
        <button
          onClick={() => onNavigateTab('gaps')}
          className="text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-1"
        >
          Explore All Identified Dark Spots <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
