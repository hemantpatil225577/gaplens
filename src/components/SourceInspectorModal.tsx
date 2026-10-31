import React, { useState } from 'react';
import { SourceItem } from '../types';
import { X, Search, ExternalLink, Calendar, Building2, Copy, Check, FileText } from 'lucide-react';

interface SourceInspectorModalProps {
  sources: SourceItem[];
  activeSourceId: string | null;
  onClose: () => void;
}

export const SourceInspectorModal: React.FC<SourceInspectorModalProps> = ({
  sources,
  activeSourceId,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>(activeSourceId || sources[0]?.id || 'S1');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const currentSource = sources.find((s) => s.id === selectedId) || sources[0];

  const handleCopy = () => {
    if (!currentSource) return;
    navigator.clipboard.writeText(currentSource.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightContent = (text: string, term: string) => {
    if (!term.trim()) return text;
    const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i} className="bg-amber-200 dark:bg-amber-900/60 dark:text-amber-100 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!currentSource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Evidence Source Inspector
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Source Tabs Bar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {sources.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                selectedId === s.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="font-mono font-bold">[{s.id}]</span>
              <span className="truncate max-w-[150px]">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Source Metadata & Search Bar */}
        <div className="p-4 bg-slate-50/50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                [{currentSource.id}] {currentSource.title}
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                {currentSource.authorOrOrg && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    {currentSource.authorOrOrg}
                  </span>
                )}
                {currentSource.dateOrCycle && (
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {currentSource.dateOrCycle}
                  </span>
                )}
                {currentSource.url && (
                  <a
                    href={currentSource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Visit URL
                  </a>
                )}
              </div>
            </div>

            {/* Keyword Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search keywords in text..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Full Text Viewport */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-amber-200 dark:selection:bg-amber-900">
          {highlightContent(currentSource.content, searchTerm)}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Character count: {currentSource.content.length.toLocaleString()}</span>
          <span>Verified Document Node in Audit Graph</span>
        </div>
      </div>
    </div>
  );
};
