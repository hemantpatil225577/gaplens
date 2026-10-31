import React from 'react';
import { AnalysisResult, SourceItem } from '../types';
import { AlertTriangle, AlertCircle, CheckCircle2, History, ArrowRight } from 'lucide-react';
import { DarkSpotMatrix } from './DarkSpotMatrix';

interface OverviewMetricsProps {
  analysis: AnalysisResult;
  sources: SourceItem[];
  onNavigateTab: (tab: string) => void;
  onInspectSource: (sourceId: string) => void;
  topic: string;
  decisionGoal: string;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({
  analysis,
  sources,
  onNavigateTab,
  onInspectSource,
  topic,
  decisionGoal,
}) => {
  const { overview } = analysis;
  const score = overview.overallCompletenessScore;

  // Circular gauge math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-sky-500 stroke-sky-500';
    if (val >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getScoreBadge = (val: number) => {
    if (val >= 80) return { label: 'Adequate Coverage', style: 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50' };
    if (val >= 50) return { label: 'Substantial Gaps', style: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50' };
    return { label: 'High-Risk Information Void', style: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50' };
  };

  const badge = getScoreBadge(score);

  return (
    <div className="space-y-6">
      {/* Executive Mandate & Radial Scorecard */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                Audited Research Mandate
              </span>
              <span aria-hidden="true" className="text-sky-300">·</span>
              <span className="font-mono tabular-nums">{sources.length} Documents Ingested</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              {topic}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-slate-200">Decision Mandate:</strong> {decisionGoal}
            </p>
          </div>

          {/* Radial Circular Gauge */}
          <div className="flex items-center gap-5 p-4 rounded-xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-800 shrink-0">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className={`transition-all duration-1000 ease-out ${getScoreColor(score)}`}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white leading-none">
                  {score}%
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-400 mt-0.5">
                  Coverage
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Epistemic Rating</span>
              <div className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${badge.style}`}>
                {badge.label}
              </div>
              <p className="text-[11px] text-slate-400 max-w-[150px]">
                {score < 50 ? 'Significant blind spots present' : 'Actionable with caution'}
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Synthesis */}
        <div className="mt-5 pt-4 border-t border-sky-50 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>{overview.topicSummary}</p>
        </div>
      </div>

      {/* 4-Stat Strip with High-Density Polish */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Dark Spots */}
        <button
          onClick={() => onNavigateTab('gaps')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 text-left hover:border-sky-300 dark:hover:border-sky-500 transition-colors group cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Critical Dark Spots</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {analysis.darkSpots.length}
            </span>
            <span className="text-xs text-sky-600 dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
              Review voids <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Vital prerequisites unaddressed across all sources
          </p>
        </button>

        {/* Metric 2: Contradictions */}
        <button
          onClick={() => onNavigateTab('conflicts')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 text-left hover:border-rose-300 dark:hover:border-rose-500 transition-colors group cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Conflicting Claims</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {analysis.conflictingClaims.length}
            </span>
            <span className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
              Compare <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Direct contradictions between reviewed documents
          </p>
        </button>

        {/* Metric 3: Temporal Warnings */}
        <button
          onClick={() => onNavigateTab('temporal')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 text-left hover:border-orange-300 dark:hover:border-orange-500 transition-colors group cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Temporal Warnings</span>
            <History className="w-4 h-4 text-orange-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {analysis.temporalWarnings.length}
            </span>
            <span className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
              Audit dates <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Outdated application cycles or undated notices
          </p>
        </button>

        {/* Metric 4: Action Checklist */}
        <button
          onClick={() => onNavigateTab('checklist')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 text-left hover:border-sky-300 dark:hover:border-sky-500 transition-colors group cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Verification Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {analysis.verificationChecklist.length}
            </span>
            <span className="text-xs text-sky-600 dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
              Take action <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Prioritized steps before committing to a decision
          </p>
        </button>
      </div>

      {/* Visual Dimension Coverage Matrix */}
      <DarkSpotMatrix
        analysis={analysis}
        sources={sources}
        onInspectSource={onInspectSource}
        onNavigateTab={onNavigateTab}
      />

      {/* Advisory Callout & Epistemic Taxonomy Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 bg-amber-500/10 border border-amber-500/20 dark:bg-amber-950/20 dark:border-amber-900/40 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Auditor Cautionary Advisory</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">
            {overview.decisionConfidenceNote}
          </p>
          <div className="pt-2 text-xs text-amber-700 dark:text-amber-400/80">
            Recommendation: Do not finalize any application, contract, or clinical choice until the critical checklist items are verified against primary regulatory sources.
          </div>
        </div>

        {/* Epistemic Transparency Key */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-2xl space-y-3">
          <div className="text-xs font-semibold text-slate-900 dark:text-white">
            Epistemic Classification Standard
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Sourced Direct Evidence:</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">Verbatim text verified in explicit source quotes.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Dark Spot Signal:</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">Critical baseline requirement absent from all reviewed documents.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Claim Contradiction:</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">Conflicting statements between Source A and Source B.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Temporal Anomaly:</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">Expired cycles, obsolete regulations, or missing timestamps.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
