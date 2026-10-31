import React, { useState } from 'react';
import { DarkSpot } from '../types';
import { AlertCircle, HelpCircle, CheckSquare, Building2 } from 'lucide-react';

interface DarkSpotsViewProps {
  darkSpots: DarkSpot[];
  onAddChecklistItem: (item: {
    priority: 'critical' | 'high' | 'medium';
    actionItem: string;
    targetEntityOrDocument: string;
    rationale: string;
    relatedGapOrConflictId?: string;
  }) => void;
}

export const DarkSpotsView: React.FC<DarkSpotsViewProps> = ({
  darkSpots,
  onAddChecklistItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const categories = Array.from(new Set(darkSpots.map((d) => d.category)));

  const filteredSpots = darkSpots.filter((spot) => {
    const matchCategory = selectedCategory === 'all' || spot.category === selectedCategory;
    const matchSeverity = selectedSeverity === 'all' || spot.severity === selectedSeverity;
    return matchCategory && matchSeverity;
  });

  const handleConvertToChecklist = (spot: DarkSpot) => {
    onAddChecklistItem({
      priority: spot.severity === 'critical' ? 'critical' : spot.severity === 'high' ? 'high' : 'medium',
      actionItem: `Clarify ${spot.gapTitle.toLowerCase()} with official authorities.`,
      targetEntityOrDocument: spot.recommendedSourceTypeToConsult,
      rationale: spot.whyItMatters,
      relatedGapOrConflictId: spot.id,
    });
    setAddedIds((prev) => new Set(prev).add(spot.id));
  };

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50';
      case 'high':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50';
      default:
        return 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Information Dark Spots
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Critical omissions and prerequisites completely absent across all reviewed sources.
          </p>
        </div>

        {/* Filter Controls with Sky Blue accents */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-sky-50 dark:bg-slate-800 rounded-lg border border-sky-100 dark:border-slate-700">
            <button
              onClick={() => setSelectedSeverity('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedSeverity === 'all'
                  ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-sky-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedSeverity('critical')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedSeverity === 'critical'
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
              }`}
            >
              Critical ({darkSpots.filter((s) => s.severity === 'critical').length})
            </button>
            <button
              onClick={() => setSelectedSeverity('high')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedSeverity === 'high'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
              }`}
            >
              High
            </button>
          </div>

          {categories.length > 1 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-sky-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-400"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Dark Spots Cards */}
      {filteredSpots.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <p className="text-base font-semibold text-slate-900 dark:text-white">No Dark Spots in this filter</p>
          <p className="text-sm text-slate-500 mt-1">Try resetting the severity or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredSpots.map((spot) => {
            const isAdded = addedIds.has(spot.id);
            return (
              <div
                key={spot.id}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs space-y-4 hover:border-sky-300 dark:hover:border-slate-700 transition-colors"
              >
                {/* Card Title & Clean Unboxed Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-sky-700 dark:text-sky-300">{spot.category}</span>
                      <span aria-hidden="true" className="text-sky-200">·</span>
                      <span className="font-mono">{spot.id}</span>
                      <span aria-hidden="true" className="text-sky-200">·</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${getSeverityStyle(spot.severity)}`}>
                        {spot.severity} Risk
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {spot.gapTitle}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleConvertToChecklist(spot)}
                    disabled={isAdded}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                      isAdded
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-default'
                        : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                    }`}
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    {isAdded ? 'Added to Checklist' : 'Track in Checklist'}
                  </button>
                </div>

                {/* High Stakes Consequence */}
                <div className="p-3.5 bg-sky-50/40 dark:bg-slate-800/60 rounded-xl border border-sky-100/80 dark:border-slate-800 text-sm">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">High-Stakes Risk: </span>
                  <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{spot.whyItMatters}</span>
                </div>

                {/* Missing Details Checklist */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Omitted Details Not Found in Any Source:
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {spot.missingDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">×</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Probing Questions & Verification Destination */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2 border-t border-sky-50 dark:border-slate-800 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                      <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
                      <span>Suggested Questions to Ask:</span>
                    </div>
                    <ul className="space-y-1 pl-5 list-disc text-slate-600 dark:text-slate-400">
                      {spot.suggestedQuestionsToAsk.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Authoritative Source to Verify:</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 pl-5">
                      {spot.recommendedSourceTypeToConsult}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
