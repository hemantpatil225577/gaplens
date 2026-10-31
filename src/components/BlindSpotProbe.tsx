import React, { useState } from 'react';
import { SourceItem, ProbeResult } from '../types';
import { Search, Sparkles, AlertCircle, CheckCircle2, HelpCircle, Loader2 } from 'lucide-react';

interface BlindSpotProbeProps {
  sources: SourceItem[];
  topic: string;
}

export const BlindSpotProbe: React.FC<BlindSpotProbeProps> = ({ sources, topic }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProbeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleQuestions = [
    'Are there any GPA renewal requirements in college?',
    'What happens if I take a medical leave or switch majors?',
    'Is there any household income ceiling mentioned?',
    'Which portal URL is the active official submission link?',
  ];

  const handleProbe = async (questionToAsk: string) => {
    if (!questionToAsk.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/probe-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToAsk,
          sources,
          topic,
        }),
      });

      if (!response.ok) {
        throw new Error(`Probe failed: HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Probe error:', err);
      setError(err.message || 'Failed to probe question against sources');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED_DARK_SPOT':
        return {
          label: 'Confirmed Dark Spot (Void in Sources)',
          style: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50',
          icon: AlertCircle,
        };
      case 'PARTIAL_AMBIGUOUS':
        return {
          label: 'Partially Mentioned / Ambiguous',
          style: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50',
          icon: HelpCircle,
        };
      case 'COVERED':
        return {
          label: 'Directly Covered in Source Text',
          style: 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50',
          icon: CheckCircle2,
        };
      default:
        return {
          label: status,
          style: 'text-slate-700 bg-slate-50 border-slate-200',
          icon: HelpCircle,
        };
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Interactive Blind Spot Prober
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ask any specific question to verify whether it exists in the sources or represents an information dark spot.
        </p>
      </div>

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleProbe(query);
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Does any source specify renewal GPA conditions or credit pace?"
            className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg disabled:opacity-40 transition-opacity flex items-center gap-1.5 shrink-0 shadow-sm shadow-sky-600/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Probing...
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" /> Probe Void
            </>
          )}
        </button>
      </form>

      {/* Fast sample question buttons */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-medium mr-1">Quick probe:</span>
        {sampleQuestions.map((sq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(sq);
              handleProbe(sq);
            }}
            className="px-2.5 py-1 text-[11px] font-medium bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 text-sky-800 dark:text-sky-300 rounded-md transition-colors text-left border border-sky-100/60 dark:border-slate-700"
          >
            "{sq}"
          </button>
        ))}
      </div>

      {/* Result Display */}
      {error && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-lg text-xs text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {result && (
        <div className="p-4 rounded-xl bg-sky-50/40 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {React.createElement(getStatusBadge(result.status).icon, {
                className: `w-4 h-4 ${
                  result.status === 'CONFIRMED_DARK_SPOT'
                    ? 'text-rose-500'
                    : result.status === 'PARTIAL_AMBIGUOUS'
                    ? 'text-amber-500'
                    : 'text-sky-500'
                }`,
              })}
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                  getStatusBadge(result.status).style
                }`}
              >
                {getStatusBadge(result.status).label}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {result.explanation}
          </p>

          {result.evidenceQuotes && result.evidenceQuotes.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Found Source Excerpts:
              </span>
              {result.evidenceQuotes.map((eq, i) => (
                <div
                  key={i}
                  className="p-2 bg-white dark:bg-slate-900 rounded border border-sky-100 dark:border-slate-800 text-xs italic text-slate-600 dark:text-slate-400"
                >
                  <span className="font-mono font-bold text-sky-700 dark:text-sky-300 not-italic mr-1.5">
                    [{eq.sourceId}]:
                  </span>
                  "{eq.quote}"
                </div>
              ))}
            </div>
          )}

          {result.whatIsMissing && (
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <span className="font-semibold">Still Missing: </span>
              {result.whatIsMissing}
            </div>
          )}

          <div className="pt-2 border-t border-sky-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Recommended Next Step: </span>
            {result.recommendedVerification}
          </div>
        </div>
      )}
    </div>
  );
};
