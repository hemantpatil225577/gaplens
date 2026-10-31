import React from 'react';
import { Sun, Moon, Sparkles, Database, RefreshCw, Trophy, Search, Presentation } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleDark: () => void;
  onOpenBenchmarks: () => void;
  onOpenGuide: () => void;
  onOpenPresentation: () => void;
  onOpenCommandPalette: () => void;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  onOpenBenchmarks,
  onOpenGuide,
  onOpenPresentation,
  onOpenCommandPalette,
  onRunAnalysis,
  isAnalyzing,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-sky-100 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark with custom logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
            }}
            className="hover:opacity-95 transition-opacity"
          >
            <Logo size="md" />
          </a>

          {/* Zone 2: Clean single-line navigation links with sky-blue active state */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'overview'
                  ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : ''
              }`}
            >
              Audit Overview
            </button>
            <button
              onClick={() => setActiveTab('topology')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'topology'
                  ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : ''
              }`}
            >
              Void Topology
            </button>
            <button
              onClick={() => setActiveTab('gaps')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'gaps'
                  ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : ''
              }`}
            >
              Dark Spots
            </button>
            <button
              onClick={() => setActiveTab('conflicts')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'conflicts'
                  ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : ''
              }`}
            >
              Contradictions
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'simulator'
                  ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : ''
              }`}
            >
              Simulator
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'checklist'
                  ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : ''
              }`}
            >
              Checklist
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'sources'
                  ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                  : ''
              }`}
            >
              Corpus
            </button>
          </nav>

          {/* Zone 3: 1 primary action + search + theme button */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Cmd+K Quick Search Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 text-xs text-sky-700 dark:text-sky-300 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-sky-100 dark:border-slate-700"
              title="Search and commands (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-sky-500" />
              <span className="font-mono text-[11px] text-sky-600 dark:text-sky-400 font-semibold">⌘K</span>
            </button>

            <button
              onClick={onOpenPresentation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-900 dark:text-sky-200 bg-sky-100/80 hover:bg-sky-200/80 dark:bg-sky-900/40 dark:hover:bg-sky-800/60 border border-sky-300/80 dark:border-sky-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
              title="View Hackathon Pitch Deck & Download PPT"
            >
              <Presentation className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Pitch PPT</span>
            </button>

            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200/80 dark:border-sky-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Hackathon Demo & Rubric Guide"
            >
              <Trophy className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span className="hidden sm:inline">Judge Guide</span>
            </button>

            <button
              onClick={onOpenBenchmarks}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Load Hackathon Benchmarks"
            >
              <Database className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Presets
            </button>

            <button
              onClick={toggleDark}
              className="p-2 text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={onRunAnalysis}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg disabled:opacity-50 transition-all shadow-md shadow-sky-600/20 whitespace-nowrap shrink-0 font-sans"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Analyzing Gaps...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                  Run Dark Spot Audit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
