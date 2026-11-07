import React, { useState } from 'react';
import { AnalysisResult, SourceItem } from '../types';
import { X, Download, Copy, Check, FileCode, FileText } from 'lucide-react';

interface ExportModalProps {
  analysis: AnalysisResult;
  sources: SourceItem[];
  topic: string;
  decisionGoal: string;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  analysis,
  sources,
  topic,
  decisionGoal,
  onClose,
}) => {
  const [format, setFormat] = useState<'markdown' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    return `# GAPLENS AUDIT DOSSIER
Generated: ${new Date().toISOString()}

## RESEARCH MANDATE
- **Topic:** ${topic}
- **Decision Target:** ${decisionGoal}
- **Overall Completeness Score:** ${analysis.overview.overallCompletenessScore}%
- **Advisory:** ${analysis.overview.decisionConfidenceNote}

## SUMMARY OF TOPIC
${analysis.overview.topicSummary}

---

## 1. CRITICAL INFORMATION DARK SPOTS (${analysis.darkSpots.length})
${analysis.darkSpots
  .map(
    (ds, idx) => `### ${idx + 1}. [${ds.severity.toUpperCase()}] ${ds.gapTitle}
- **Category:** ${ds.category}
- **High-Stakes Risk:** ${ds.whyItMatters}
- **Missing Elements:**
${ds.missingDetails.map((d) => `  - [ ] ${d}`).join('\n')}
- **Recommended Verification Authority:** ${ds.recommendedSourceTypeToConsult}
`
  )
  .join('\n')}

---

## 2. CROSS-SOURCE CONTRADICTIONS (${analysis.conflictingClaims.length})
${analysis.conflictingClaims
  .map(
    (c, idx) => `### ${idx + 1}. ${c.topic} (${c.severity.toUpperCase()} SEVERITY)
- **Claim A [${c.claimA.sourceId}]:** "${c.claimA.exactQuote}"
- **Claim B [${c.claimB.sourceId}]:** "${c.claimB.exactQuote}"
- **Forensic Divergence:** ${c.analysis}
- **Resolution Advice:** ${c.resolutionAdvice}
`
  )
  .join('\n')}

---

## 3. TEMPORAL & CYCLE ANOMALIES (${analysis.temporalWarnings.length})
${analysis.temporalWarnings
  .map(
    (tw, idx) => `### ${idx + 1}. [${tw.riskLevel.toUpperCase()}] Source ${tw.sourceId} (${tw.statedDateOrCycle})
- **Issue:** ${tw.explanation}
- **Recommended Recency Check:** ${tw.recommendedVerification}
`
  )
  .join('\n')}

---

## 4. PRIORITIZED VERIFICATION CHECKLIST
${analysis.verificationChecklist
  .map(
    (v, idx) => `${v.verified ? '[x]' : '[ ]'} ${idx + 1}. [${v.priority.toUpperCase()}] ${v.actionItem}
   Target: ${v.targetEntityOrDocument}
   Rationale: ${v.rationale}`
  )
  .join('\n\n')}

---

## 5. EVALUATED SOURCES (${sources.length})
${sources
  .map(
    (s) => `### [${s.id}] ${s.title}
- Type: ${s.sourceType}
- Date/Cycle: ${s.dateOrCycle || 'Undated'}
- URL: ${s.url || 'N/A'}
- Organization: ${s.authorOrOrg || 'N/A'}
`
  )
  .join('\n')}
`;
  };

  const contentToDisplay = format === 'markdown' ? generateMarkdown() : JSON.stringify({ topic, decisionGoal, analysis, sources }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `gaplens-audit-${Date.now()}.${format === 'markdown' ? 'md' : 'json'}`;
    const blob = new Blob([contentToDisplay], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Export Audit Dossier
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat('markdown')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                format === 'markdown'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Markdown
            </button>
            <button
              onClick={() => setFormat('json')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                format === 'json'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              JSON
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap selection:bg-amber-200">
          {contentToDisplay}
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <span className="text-xs text-slate-500">
            Audit report contains all {analysis.darkSpots.length} dark spots, {analysis.conflictingClaims.length} conflicts, and verification checklist.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:opacity-90 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
