import React from 'react';
import { SourceItem } from '../types';
import { Plus, FileText, ExternalLink, Calendar, Building2, Trash2, Eye } from 'lucide-react';

interface SourcesPanelProps {
  sources: SourceItem[];
  onAddSourceClick: () => void;
  onInspectSource: (sourceId: string) => void;
  onDeleteSource: (sourceId: string) => void;
  topic: string;
  setTopic: (t: string) => void;
  decisionGoal: string;
  setDecisionGoal: (g: string) => void;
}

export const SourcesPanel: React.FC<SourcesPanelProps> = ({
  sources,
  onAddSourceClick,
  onInspectSource,
  onDeleteSource,
  topic,
  setTopic,
  decisionGoal,
  setDecisionGoal,
}) => {
  const getSourceTypeLabel = (type: string) => {
    switch (type) {
      case 'official':
        return 'Official Authority';
      case 'guide':
        return 'Advisory Guide';
      case 'forum':
        return 'Community / Forum';
      case 'news':
        return 'Press / Media';
      case 'academic':
        return 'Academic / Clinical';
      default:
        return 'Document';
    }
  };

  return (
    <div className="space-y-6">
      {/* Research Mandate Editor */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Research Mandate & Decision Scope
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {sources.length} active documents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Primary Research Question / Inquiry
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. What should I verify before applying for this scholarship?"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              High-Stakes Decision Goal
            </label>
            <input
              type="text"
              value={decisionGoal}
              onChange={(e) => setDecisionGoal(e.target.value)}
              placeholder="e.g. Ensure 4-year funding continuity without revocation risks"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Sources list */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Source Material Corpus
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Selected documents, websites, and notices reviewed by the GapLens engine.
          </p>
        </div>

        <button
          onClick={onAddSourceClick}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Source Material
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                  [{src.id}]
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {src.title}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  · {getSourceTypeLabel(src.sourceType)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onInspectSource(src.id)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect Document
                </button>
                {sources.length > 1 && (
                  <button
                    onClick={() => onDeleteSource(src.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                    title="Remove source"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              {src.authorOrOrg && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {src.authorOrOrg}
                </span>
              )}
              {src.dateOrCycle && (
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {src.dateOrCycle}
                </span>
              )}
              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> {new URL(src.url).hostname}
                </a>
              )}
              <span className="font-mono text-slate-400">
                {src.content.length.toLocaleString()} characters
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 font-mono bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-100 dark:border-slate-800">
              {src.content.slice(0, 240)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
