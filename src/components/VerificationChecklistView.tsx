import React, { useState } from 'react';
import { VerificationChecklistItem } from '../types';
import { CheckSquare, Square, Building2, Plus, Copy, Check } from 'lucide-react';

interface VerificationChecklistViewProps {
  checklist: VerificationChecklistItem[];
  onToggleVerified: (id: string) => void;
  onAddCustomItem: (item: VerificationChecklistItem) => void;
}

export const VerificationChecklistView: React.FC<VerificationChecklistViewProps> = ({
  checklist,
  onToggleVerified,
  onAddCustomItem,
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAction, setNewAction] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newRationale, setNewRationale] = useState('');
  const [newPriority, setNewPriority] = useState<'critical' | 'high' | 'medium'>('high');
  const [copied, setCopied] = useState(false);

  const filteredItems = checklist.filter((item) => {
    if (priorityFilter === 'all') return true;
    return item.priority === priorityFilter;
  });

  const verifiedCount = checklist.filter((i) => i.verified).length;
  const progressPercent = checklist.length > 0 ? Math.round((verifiedCount / checklist.length) * 100) : 0;

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAction.trim() || !newTarget.trim()) return;

    onAddCustomItem({
      id: `custom-${Date.now()}`,
      priority: newPriority,
      actionItem: newAction.trim(),
      targetEntityOrDocument: newTarget.trim(),
      rationale: newRationale.trim() || 'Custom user verification requirement',
      verified: false,
    });

    setNewAction('');
    setNewTarget('');
    setNewRationale('');
    setShowAddForm(false);
  };

  const handleCopyChecklist = () => {
    const text = checklist
      .map((item, idx) => {
        const status = item.verified ? '[x]' : '[ ]';
        return `${status} ${idx + 1}. [${item.priority.toUpperCase()}] ${item.actionItem}\n   Target: ${item.targetEntityOrDocument}\n   Rationale: ${item.rationale}\n`;
      })
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPriorityStyle = (p: string) => {
    switch (p) {
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
      {/* Header and Progress Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Prioritized Verification Checklist
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Actionable investigation steps before executing your decision.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyChecklist}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-sky-100 dark:border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied to Clipboard' : 'Copy Checklist'}
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-all shadow-sm shadow-sky-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Verification Task
          </button>
        </div>
      </div>

      {/* Progress bar card */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Verification Progress:</span>
            <span className="font-mono tabular-nums text-sky-700 dark:text-sky-400">{verifiedCount} of {checklist.length} Verified</span>
            <span className="text-slate-400">({progressPercent}%)</span>
          </div>
          <div className="w-full sm:w-64 h-2 bg-sky-50 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1 p-1 bg-sky-50 dark:bg-slate-800 rounded-lg shrink-0 border border-sky-100 dark:border-slate-700">
          <button
            onClick={() => setPriorityFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              priorityFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-sky-800'
            }`}
          >
            All ({checklist.length})
          </button>
          <button
            onClick={() => setPriorityFilter('critical')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              priorityFilter === 'critical'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
            }`}
          >
            Critical ({checklist.filter((c) => c.priority === 'critical').length})
          </button>
          <button
            onClick={() => setPriorityFilter('high')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              priorityFilter === 'high'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
            }`}
          >
            High ({checklist.filter((c) => c.priority === 'high').length})
          </button>
        </div>
      </div>

      {/* Add Custom Item Modal / Inline Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleCreateCustom}
          className="p-5 bg-sky-50/60 dark:bg-slate-800/80 rounded-2xl border border-sky-100 dark:border-slate-700 space-y-4"
        >
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            Add Custom Verification Task
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Action Item</label>
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g. Call admissions office to ask about grace periods"
                required
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Entity or Document</label>
              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="e.g. Higher Ed Department Handbook 2026"
                required
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Rationale</label>
              <input
                type="text"
                value={newRationale}
                onChange={(e) => setNewRationale(e.target.value)}
                placeholder="Why this must be confirmed"
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg"
            >
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Checklist items */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onToggleVerified(item.id)}
            className={`p-4 bg-white dark:bg-slate-900 rounded-2xl border transition-all cursor-pointer shadow-xs ${
              item.verified
                ? 'border-sky-300 dark:border-sky-900/60 bg-sky-50/30 dark:bg-sky-950/10 opacity-75'
                : 'border-sky-100 dark:border-slate-800 hover:border-sky-200 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVerified(item.id);
                }}
                className="mt-0.5 text-slate-400 hover:text-sky-600 shrink-0"
              >
                {item.verified ? (
                  <CheckSquare className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                )}
              </button>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400 font-semibold">#{idx + 1}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${getPriorityStyle(item.priority)}`}>
                    {item.priority}
                  </span>
                  {item.verified && (
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <div className={`text-sm font-semibold ${item.verified ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                  {item.actionItem}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span><strong className="text-slate-700 dark:text-slate-300">Entity:</strong> {item.targetEntityOrDocument}</span>
                  </div>
                  {item.rationale && (
                    <div>
                      <span><strong className="text-slate-700 dark:text-slate-300">Why:</strong> {item.rationale}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
