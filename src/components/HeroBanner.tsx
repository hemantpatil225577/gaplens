import React from 'react';
import { Sparkles, ShieldAlert, BookOpen, ArrowRight, Compass, CheckCircle2 } from 'lucide-react';
import { BENCHMARK_SCENARIOS } from '../data/benchmarks';
import { BenchmarkScenario } from '../types';

interface HeroBannerProps {
  onSelectScenario: (scenario: BenchmarkScenario) => void;
  currentScenarioId: string;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectScenario,
  currentScenarioId,
  onRunAnalysis,
  isAnalyzing,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50/40 to-sky-100/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-sky-200/80 dark:border-sky-900/40 shadow-lg shadow-sky-500/5 p-6 sm:p-8 lg:p-10 transition-colors">
      {/* Decorative Sky Blue Ambient Glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-sky-300/20 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 bg-sky-200/30 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Mission & Pipeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Editorial Subtitle */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="px-2.5 py-1 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-mono uppercase tracking-wider border border-sky-200/80 dark:border-sky-800/80">
              AI Intelligence Platform
            </span>
            <span aria-hidden="true" className="text-sky-300 dark:text-slate-600">·</span>
            <span className="text-slate-600 dark:text-slate-400">
              Information Gap & Void Detection
            </span>
          </div>

          {/* Primary Headline */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Detect what online sources leave out <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400">before committing to a decision.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              Standard search finds pages; summarizers condense text. <strong>GapLens</strong> analyzes multi-source documents to expose unstated conditions, contradictory requirements, and outdated rules with source-traceable evidence.
            </p>
          </div>

          {/* 4-Step Interactive Pipeline Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pb-1">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold block">01. INGEST</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">URLs & Documents</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold block">02. AUDIT</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Dark Spot Voids</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold block">03. RECONCILE</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Conflicting Claims</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold block">04. VERIFY</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Action Checklist</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-sky-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Presets:</span>
              {BENCHMARK_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => onSelectScenario(scen)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    scen.id === currentScenarioId
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-sky-100 dark:border-slate-700'
                  }`}
                >
                  {scen.title.split(' ')[0]} {scen.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Card Preview with Radar Image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-sky-200/80 dark:border-slate-800 shadow-xl shadow-sky-500/10">
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/hero_darkspot_radar_1793429165165.jpg"
                alt="Information Dark Spot Radar"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-sky-500/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-xs">
                Active Audit Radar
              </div>
            </div>

            <div className="p-4 space-y-2.5 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Epistemic Radar Matrix
                </span>
                <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">
                  Live Audit Model
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Evaluates multi-source information density, flags dark spot voids, and cross-checks claim contradictions before high-stakes execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
