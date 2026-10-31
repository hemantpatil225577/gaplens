export interface SourceItem {
  id: string; // "S1", "S2", etc.
  title: string;
  url?: string;
  authorOrOrg?: string;
  dateOrCycle?: string;
  sourceType: 'official' | 'guide' | 'forum' | 'news' | 'academic' | 'other';
  content: string;
  isCustom?: boolean;
}

export interface EstablishedFact {
  id: string;
  fact: string;
  evidenceSnippet: string;
  sourceIds: string[];
  consensusLevel: 'unanimous' | 'majority' | 'single_source';
  confidence: 'high' | 'moderate';
}

export interface DarkSpot {
  id: string;
  category: 'Eligibility & Renewal' | 'Financial & Costs' | 'Deadlines & Timelines' | 'Required Documentation' | 'Penalties & Clawbacks' | 'Procedure & Legal' | string;
  gapTitle: string;
  whyItMatters: string;
  severity: 'critical' | 'high' | 'moderate';
  missingDetails: string[];
  suggestedQuestionsToAsk: string[];
  recommendedSourceTypeToConsult: string;
}

export interface ConflictingClaim {
  id: string;
  topic: string;
  natureOfConflict: 'direct_contradiction' | 'different_conditions' | 'temporal_discrepancy' | 'ambiguous_wording' | string;
  severity: 'high' | 'medium' | 'low';
  claimA: {
    sourceId: string;
    sourceTitle?: string;
    claimText: string;
    exactQuote: string;
    dateOrCycle?: string;
  };
  claimB: {
    sourceId: string;
    sourceTitle?: string;
    claimText: string;
    exactQuote: string;
    dateOrCycle?: string;
  };
  analysis: string;
  resolutionAdvice: string;
}

export interface TemporalWarning {
  id: string;
  sourceId: string;
  sourceTitle?: string;
  statedDateOrCycle: string;
  warningType: 'expired_cycle' | 'outdated_regulations' | 'undated_risk' | 'temporal_drift' | string;
  explanation: string;
  riskLevel: 'high' | 'medium' | 'low';
  recommendedVerification: string;
}

export interface VerificationChecklistItem {
  id: string;
  priority: 'critical' | 'high' | 'medium';
  actionItem: string;
  targetEntityOrDocument: string;
  rationale: string;
  verified?: boolean;
  userNotes?: string;
  relatedGapOrConflictId?: string;
}

export interface AnalysisOverview {
  topicSummary: string;
  sourcesAnalyzedCount?: number;
  criticalDarkSpotsCount?: number;
  potentialConflictsCount?: number;
  outdatedSourcesCount?: number;
  overallCompletenessScore: number; // 0 - 100
  decisionConfidenceNote: string;
}

export interface AnalysisResult {
  overview: AnalysisOverview;
  establishedFacts: EstablishedFact[];
  darkSpots: DarkSpot[];
  conflictingClaims: ConflictingClaim[];
  temporalWarnings: TemporalWarning[];
  verificationChecklist: VerificationChecklistItem[];
  unansweredQuestions: string[];
  analyzedAt?: string;
}

export interface BenchmarkScenario {
  id: string;
  tag: string;
  title: string;
  description: string;
  topic: string;
  decisionGoal: string;
  sources: SourceItem[];
  sampleFindingsSummary: string;
}

export interface ProbeResult {
  status: 'COVERED' | 'PARTIAL_AMBIGUOUS' | 'CONFIRMED_DARK_SPOT';
  explanation: string;
  evidenceQuotes?: Array<{ sourceId: string; quote: string }>;
  whatIsMissing?: string;
  recommendedVerification: string;
}
