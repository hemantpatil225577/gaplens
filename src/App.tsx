/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BENCHMARK_SCENARIOS,
  DEFAULT_PRECOMPUTED_SCHOLARSHIP_ANALYSIS,
} from './data/benchmarks';
import {
  BenchmarkScenario,
  SourceItem,
  AnalysisResult,
  VerificationChecklistItem,
} from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { OverviewMetrics } from './components/OverviewMetrics';
import { DarkSpotsView } from './components/DarkSpotsView';
import { ConflictsView } from './components/ConflictsView';
import { VerificationChecklistView } from './components/VerificationChecklistView';
import { TemporalAuditView } from './components/TemporalAuditView';
import { EstablishedFactsView } from './components/EstablishedFactsView';
import { SourcesPanel } from './components/SourcesPanel';
import { BlindSpotProbe } from './components/BlindSpotProbe';
import { SourceInspectorModal } from './components/SourceInspectorModal';
import { AddSourceModal } from './components/AddSourceModal';
import { BenchmarkSelectorModal } from './components/BenchmarkSelectorModal';
import { ExportModal } from './components/ExportModal';
import { VoidGraphVisualizer } from './components/VoidGraphVisualizer';
import { DecisionStressTester } from './components/DecisionStressTester';
import { AudioBriefingPlayer } from './components/AudioBriefingPlayer';
import { CommandPalette } from './components/CommandPalette';
import {
  ShieldAlert,
  AlertCircle,
  ArrowRightLeft,
  CheckCircle2,
  History,
  FileText,
  Play,
  Network,
  Download,
  Plus,
} from 'lucide-react';

export default function App() {
  // Theme state: default to false for the requested pristine White and Sky Blue interface
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  // Active view tab
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Active benchmark & research state
  const [currentScenario, setCurrentScenario] = useState<BenchmarkScenario>(
    BENCHMARK_SCENARIOS[0]
  );
  const [topic, setTopic] = useState<string>(BENCHMARK_SCENARIOS[0].topic);
  const [decisionGoal, setDecisionGoal] = useState<string>(
    BENCHMARK_SCENARIOS[0].decisionGoal
  );
  const [sources, setSources] = useState<SourceItem[]>(
    BENCHMARK_SCENARIOS[0].sources
  );

  // Analysis state
  const [analysis, setAnalysis] = useState<AnalysisResult>(
    DEFAULT_PRECOMPUTED_SCHOLARSHIP_ANALYSIS
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Modals state
  const [showBenchmarksModal, setShowBenchmarksModal] = useState<boolean>(false);
  const [showAddSourceModal, setShowAddSourceModal] = useState<boolean>(false);
  const [showInspectorModal, setShowInspectorModal] = useState<boolean>(false);
  const [activeInspectorSourceId, setActiveInspectorSourceId] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);

  // Run Dark Spot Audit
  const handleRunAnalysis = async () => {
    if (isAnalyzing || sources.length === 0) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          decisionGoal,
          sources,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Analysis failed with status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      console.error('Error running gap analysis:', err);
      setAnalysisError(err.message || 'Failed to complete dark spot audit.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Switch benchmark scenario
  const handleSelectScenario = async (scenario: BenchmarkScenario) => {
    setCurrentScenario(scenario);
    setTopic(scenario.topic);
    setDecisionGoal(scenario.decisionGoal);
    setSources(scenario.sources);
    setAnalysisError(null);

    // If it's the default scholarship, use precomputed instantly for zero latency
    if (scenario.id === 'scholarship-stem') {
      setAnalysis(DEFAULT_PRECOMPUTED_SCHOLARSHIP_ANALYSIS);
      return;
    }

    // Otherwise automatically invoke live analysis for the new scenario
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: scenario.topic,
          decisionGoal: scenario.decisionGoal,
          sources: scenario.sources,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      } else {
        console.warn('API analyze error, maintaining current analysis structure');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Source operations
  const handleAddSource = (newSource: SourceItem) => {
    setSources((prev) => [...prev, newSource]);
  };

  const handleDeleteSource = (sourceId: string) => {
    setSources((prev) => prev.filter((s) => s.id !== sourceId));
  };

  const handleInspectSource = (sourceId: string) => {
    setActiveInspectorSourceId(sourceId);
    setShowInspectorModal(true);
  };

  // Checklist operations
  const handleToggleVerified = (id: string) => {
    setAnalysis((prev) => ({
      ...prev,
      verificationChecklist: prev.verificationChecklist.map((item) =>
        item.id === id ? { ...item, verified: !item.verified } : item
      ),
    }));
  };

  const handleAddChecklistItem = (item: Partial<VerificationChecklistItem>) => {
    const fullItem: VerificationChecklistItem = {
      id: `task-${Date.now()}`,
      priority: item.priority || 'high',
      actionItem: item.actionItem || 'Verify item',
      targetEntityOrDocument: item.targetEntityOrDocument || 'Official Authority',
      rationale: item.rationale || 'Address flagged dark spot',
      verified: false,
      relatedGapOrConflictId: item.relatedGapOrConflictId,
    };

    setAnalysis((prev) => ({
      ...prev,
      verificationChecklist: [fullItem, ...prev.verificationChecklist],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-sky-200 dark:selection:bg-sky-900/60">
      {/* 1. Header with Logo & Sky-Blue Highlights */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        onOpenBenchmarks={() => setShowBenchmarksModal(true)}
        onOpenCommandPalette={() => setShowCommandPalette(true)}
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
      />

      {/* 2. Secondary Contextual Toolbar / Tab Strip with White & Sky-Blue Theme */}
      <div className="border-b border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            {/* Segmented Tab Controls */}
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-sky-200" />
                Audit Overview
              </button>

              <button
                onClick={() => setActiveTab('topology')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'topology'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <Network className="w-3.5 h-3.5 text-sky-200" />
                Void Topology
              </button>

              <button
                onClick={() => setActiveTab('gaps')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'gaps'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 text-sky-200" />
                Dark Spots ({analysis.darkSpots.length})
              </button>

              <button
                onClick={() => setActiveTab('conflicts')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'conflicts'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-sky-200" />
                Contradictions ({analysis.conflictingClaims.length})
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'simulator'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <Play className="w-3.5 h-3.5 text-sky-200" />
                What-If Simulator
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'checklist'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-200" />
                Checklist ({analysis.verificationChecklist.length})
              </button>

              <button
                onClick={() => setActiveTab('temporal')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'temporal'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <History className="w-3.5 h-3.5 text-sky-200" />
                Recency ({analysis.temporalWarnings.length})
              </button>

              <button
                onClick={() => setActiveTab('facts')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'facts'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-sky-200" />
                Facts ({analysis.establishedFacts.length})
              </button>

              <button
                onClick={() => setActiveTab('sources')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'sources'
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                Corpus ({sources.length})
              </button>
            </div>

            {/* Quick Actions Right */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowAddSourceModal(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-sky-800 dark:text-sky-300 bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-sky-100 dark:border-slate-700"
              >
                <Plus className="w-3.5 h-3.5 text-sky-600" />
                Add URL / Source
              </button>

              <button
                onClick={() => setShowExportModal(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                Export Dossier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Analysis Error Alert */}
      {analysisError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs text-rose-800 dark:text-rose-200 flex items-start justify-between">
            <div>
              <strong className="font-bold">Analysis Warning: </strong>
              {analysisError}
            </div>
            <button
              onClick={() => setAnalysisError(null)}
              className="text-rose-500 hover:text-rose-700 text-sm font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Render Tab Views */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Visual Hero Banner */}
            <HeroBanner
              onSelectScenario={handleSelectScenario}
              currentScenarioId={currentScenario.id}
              onRunAnalysis={handleRunAnalysis}
              isAnalyzing={isAnalyzing}
            />

            {/* Audio Debrief Player */}
            <AudioBriefingPlayer analysis={analysis} topic={topic} />

            {/* Core Metrics & Epistemic Matrix */}
            <OverviewMetrics
              analysis={analysis}
              sources={sources}
              onNavigateTab={setActiveTab}
              onInspectSource={handleInspectSource}
              topic={topic}
              decisionGoal={decisionGoal}
            />

            {/* Topology / Radar View preview on overview */}
            <VoidGraphVisualizer
              analysis={analysis}
              sources={sources}
              onInspectSource={handleInspectSource}
              onNavigateTab={setActiveTab}
            />

            {/* Interactive Blind Spot Prober directly on overview */}
            <BlindSpotProbe sources={sources} topic={topic} />

            {/* Decision Stress Tester preview on overview */}
            <DecisionStressTester
              sources={sources}
              analysis={analysis}
              onNavigateTab={setActiveTab}
            />
          </div>
        )}

        {activeTab === 'topology' && (
          <div className="space-y-8">
            <VoidGraphVisualizer
              analysis={analysis}
              sources={sources}
              onInspectSource={handleInspectSource}
              onNavigateTab={setActiveTab}
            />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-8">
            <DecisionStressTester
              sources={sources}
              analysis={analysis}
              onNavigateTab={setActiveTab}
            />
          </div>
        )}

        {activeTab === 'gaps' && (
          <div className="space-y-8">
            <DarkSpotsView
              darkSpots={analysis.darkSpots}
              onAddChecklistItem={handleAddChecklistItem}
            />
            <BlindSpotProbe sources={sources} topic={topic} />
          </div>
        )}

        {activeTab === 'conflicts' && (
          <ConflictsView
            conflicts={analysis.conflictingClaims}
            onInspectSource={handleInspectSource}
          />
        )}

        {activeTab === 'checklist' && (
          <VerificationChecklistView
            checklist={analysis.verificationChecklist}
            onToggleVerified={handleToggleVerified}
            onAddCustomItem={handleAddChecklistItem}
          />
        )}

        {activeTab === 'temporal' && (
          <TemporalAuditView
            warnings={analysis.temporalWarnings}
            sources={sources}
            onInspectSource={handleInspectSource}
          />
        )}

        {activeTab === 'facts' && (
          <EstablishedFactsView
            facts={analysis.establishedFacts}
            onInspectSource={handleInspectSource}
          />
        )}

        {activeTab === 'sources' && (
          <SourcesPanel
            sources={sources}
            onAddSourceClick={() => setShowAddSourceModal(true)}
            onInspectSource={handleInspectSource}
            onDeleteSource={handleDeleteSource}
            topic={topic}
            setTopic={setTopic}
            decisionGoal={decisionGoal}
            setDecisionGoal={setDecisionGoal}
          />
        )}
      </main>

      {/* 5. Footer with Epistemic Disclaimer */}
      <footer className="mt-auto border-t border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              GapLens — AI-Assisted Information Gap Detection Platform
            </div>
            <p className="text-[11px] text-slate-500">
              Epistemic transparency notice: AI-generated findings are labeled as potential signals and dark spots, not guaranteed facts. Always verify citations against primary sources.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] text-sky-700 dark:text-sky-400 font-semibold">
            <span>AI Information Auditor</span>
            <span aria-hidden="true">·</span>
            <span>Decision Intelligence</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showBenchmarksModal && (
        <BenchmarkSelectorModal
          onSelectScenario={handleSelectScenario}
          onClose={() => setShowBenchmarksModal(false)}
          currentScenarioId={currentScenario.id}
        />
      )}

      {showAddSourceModal && (
        <AddSourceModal
          onAddSource={handleAddSource}
          onClose={() => setShowAddSourceModal(false)}
          nextId={`S${sources.length + 1}`}
        />
      )}

      {showInspectorModal && (
        <SourceInspectorModal
          sources={sources}
          activeSourceId={activeInspectorSourceId}
          onClose={() => setShowInspectorModal(false)}
        />
      )}

      {showExportModal && (
        <ExportModal
          analysis={analysis}
          sources={sources}
          topic={topic}
          decisionGoal={decisionGoal}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {showCommandPalette && (
        <CommandPalette
          isOpen={showCommandPalette}
          onClose={() => setShowCommandPalette(false)}
          analysis={analysis}
          sources={sources}
          onNavigateTab={setActiveTab}
          onSelectScenario={handleSelectScenario}
          onRunAnalysis={handleRunAnalysis}
          onInspectSource={handleInspectSource}
        />
      )}
    </div>
  );
}
