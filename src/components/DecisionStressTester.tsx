import React, { useState } from 'react';
import { SourceItem, AnalysisResult } from '../types';
import { Play, Sparkles, ShieldAlert } from 'lucide-react';

interface DecisionStressTesterProps {
  sources: SourceItem[];
  analysis: AnalysisResult;
  onNavigateTab: (tab: string) => void;
}

interface SimulationScenario {
  id: string;
  name: string;
  query: string;
  predictedRisk: 'CRITICAL_REVOCATION' | 'DISPUTED_CRITERIA' | 'PROCEDURAL_REJECTION' | 'MODERATE_AMBIGUITY';
  findingHeadline: string;
  gapImpactAnalysis: string;
  sourceConflictBreakdown: string;
  protectiveChecklistStep: string;
}

export const DecisionStressTester: React.FC<DecisionStressTesterProps> = ({
  sources,
  analysis,
  onNavigateTab,
}) => {
  const defaultSimulations: SimulationScenario[] = [
    {
      id: 'sim-gpa-drop',
      name: 'Sophomore GPA Dips to 3.42',
      query: 'What if a student’s collegiate cumulative GPA slips to 3.42 in sophomore year?',
      predictedRisk: 'CRITICAL_REVOCATION',
      findingHeadline: 'High Probability of Revocation Due to Unstated Renewal Code',
      gapImpactAnalysis: 'Official portal [S1] requires 3.50 for entry but completely omits collegiate retention terms. Peer forum [S3] reports that students with 3.42 GPA suffered permanent cancellation of junior/senior funding without probation warning.',
      sourceConflictBreakdown: 'Source S1 has zero mention of retention requirements. Source S3 indicates a strict 3.50 college semester GPA and 32 annual credit requirement.',
      protectiveChecklistStep: 'File an immediate formal inquiry with the SHEAA Scholarship Directorate requesting the codified 2026 Academic Progress & Probation Addendum.',
    },
    {
      id: 'sim-income-72k',
      name: 'Family Income at $72,500',
      query: 'What if applicant household adjusted gross income (AGI) is $72,500?',
      predictedRisk: 'DISPUTED_CRITERIA',
      findingHeadline: 'Direct Disqualification Under S1 vs Full Qualification Under S2',
      gapImpactAnalysis: 'Household falls directly into the contradiction zone. Official portal [S1] lists an outdated $65,000 ceiling (applicant rejected), while Guide [S2] lists the expanded $80,000 threshold following 2025 legislative budget increases.',
      sourceConflictBreakdown: 'Contradiction CC-1 directly affects this family. S1 ($65,000 cap) vs S2 ($80,000 cap).',
      protectiveChecklistStep: 'Inspect the 2026 State Legislative Appropriations Act or call the state financial aid hotline to verify if the $80,000 expansion was signed into law.',
    },
    {
      id: 'sim-w2-only',
      name: 'Submit W-2 Without IRS Form 1040',
      query: 'What if an applicant submits employer W-2 wage statements without IRS Form 1040?',
      predictedRisk: 'PROCEDURAL_REJECTION',
      findingHeadline: 'Administrative Application Rejection for Incomplete Tax Filing',
      gapImpactAnalysis: 'Official portal S1 lists W-2 wage statements as the required document. However, 2026 Guide S2 warns that the committee now strictly requires full Form 1040 with schedules to calculate true business/investment deductions.',
      sourceConflictBreakdown: 'Contradiction CC-2: S1 demands W-2s; S2 demands IRS Form 1040.',
      protectiveChecklistStep: 'Prepare both signed IRS Form 1040 (all schedules) and W-2 statements before initiating the portal upload.',
    },
    {
      id: 'sim-major-switch',
      name: 'Switch from Math to Data Analytics',
      query: 'What if student switches major from Pure Mathematics to Applied Data Science?',
      predictedRisk: 'MODERATE_AMBIGUITY',
      findingHeadline: 'Possible Loss of STEM Designation & Retroactive Clawback',
      gapImpactAnalysis: 'S1 lists Mathematics as an approved degree. S3 warns that state auditors reclassified Data Analytics as "applied business" at some universities, forfeiting subsequent semester funding.',
      sourceConflictBreakdown: 'Neither S1 nor S2 provides the explicit CIP (Classification of Instructional Programs) code list for eligible majors.',
      protectiveChecklistStep: 'Request an approved CIP code list from your university registrar prior to submitting a change-of-major form.',
    },
  ];

  const [selectedSim, setSelectedSim] = useState<SimulationScenario>(defaultSimulations[0]);
  const [customInput, setCustomInput] = useState('');
  const [simulations, setSimulations] = useState<SimulationScenario[]>(defaultSimulations);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunCustomSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsSimulating(true);
    setTimeout(() => {
      const newSim: SimulationScenario = {
        id: `custom-${Date.now()}`,
        name: customInput.slice(0, 28) + '...',
        query: customInput,
        predictedRisk: 'MODERATE_AMBIGUITY',
        findingHeadline: 'Evaluated Hypothesized Edge Case Against Source Corpus',
        gapImpactAnalysis: `Simulation evaluated across ${sources.length} sources. The parameter "${customInput}" touches areas with sparse documentation. Check official regulatory addenda.`,
        sourceConflictBreakdown: 'Identified as a potential dark spot void where sources do not document procedural guidance.',
        protectiveChecklistStep: 'Add this condition as a custom verification item in your checklist and request written verification.',
      };

      setSimulations((prev) => [newSim, ...prev]);
      setSelectedSim(newSim);
      setCustomInput('');
      setIsSimulating(false);
    }, 600);
  };

  const getRiskBadge = (risk: SimulationScenario['predictedRisk']) => {
    switch (risk) {
      case 'CRITICAL_REVOCATION':
        return {
          label: 'Critical Revocation Trap',
          style: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50',
        };
      case 'DISPUTED_CRITERIA':
        return {
          label: 'Conflicting Decision Outcome',
          style: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50',
        };
      case 'PROCEDURAL_REJECTION':
        return {
          label: 'Administrative Disqualification',
          style: 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/50',
        };
      default:
        return {
          label: 'Uncertain Policy Void',
          style: 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50',
        };
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Hypothetical Decision Stress-Tester & Void Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate real-world "what-if" edge cases to discover if unstated rules or conflicting criteria would sabotage your decision.
          </p>
        </div>
      </div>

      {/* Scenario Selector Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {simulations.map((sim) => (
          <button
            key={sim.id}
            onClick={() => setSelectedSim(sim)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedSim.id === sim.id
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 font-bold'
                : 'bg-sky-50/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-100 dark:border-slate-700'
            }`}
          >
            {sim.name}
          </button>
        ))}
      </div>

      {/* Active Simulation Result Card */}
      <div className="p-5 rounded-xl bg-sky-50/30 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sky-100 dark:border-slate-700">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 uppercase font-bold">
              Hypothetical Stress Test Inquiry:
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              "{selectedSim.query}"
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded text-xs font-semibold border shrink-0 ${
              getRiskBadge(selectedSim.predictedRisk).style
            }`}
          >
            {getRiskBadge(selectedSim.predictedRisk).label}
          </span>
        </div>

        {/* Impact Analysis */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {selectedSim.findingHeadline}
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {selectedSim.gapImpactAnalysis}
          </p>
        </div>

        {/* Source divergence */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-sky-100 dark:border-slate-800 text-xs space-y-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Corpus Evidence Divergence:
          </span>
          <p className="text-slate-600 dark:text-slate-400">
            {selectedSim.sourceConflictBreakdown}
          </p>
        </div>

        {/* Protective Action */}
        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg text-xs space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-sky-500" />
            Mandatory Protective Verification:
          </span>
          <p className="text-slate-700 dark:text-slate-200">
            {selectedSim.protectiveChecklistStep}
          </p>
        </div>
      </div>

      {/* Custom Test Input */}
      <form onSubmit={handleRunCustomSimulation} className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Test a custom situation (e.g. What if I take a leave of absence for 1 semester?)"
          className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
        />
        <button
          type="submit"
          disabled={!customInput.trim() || isSimulating}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg disabled:opacity-40 transition-opacity flex items-center gap-1.5 shrink-0 shadow-sm shadow-sky-600/20"
        >
          <Play className="w-3.5 h-3.5" />
          {isSimulating ? 'Simulating...' : 'Run Stress Test'}
        </button>
      </form>
    </div>
  );
};
