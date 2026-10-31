import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AudioBriefingPlayerProps {
  analysis: AnalysisResult;
  topic: string;
}

export const AudioBriefingPlayer: React.FC<AudioBriefingPlayerProps> = ({
  analysis,
  topic,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isSupported, setIsSupported] = useState(true);

  const scriptText = `Forensic information gap audit by GapLens for ${topic}. Our multi-source cross-examination evaluated ${analysis.overview.sourcesAnalyzedCount || 3} documents. The epistemic coverage score is ${analysis.overview.overallCompletenessScore} percent. Warning: ${analysis.darkSpots.length} critical information voids were detected, including unstated collegiate GPA renewal criteria. Furthermore, ${analysis.conflictingClaims.length} contradictory claims exist regarding household income limits and required tax paperwork. We recommend executing all high-priority checklist items before committing to this decision.`;

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(scriptText);
        utterance.rate = playbackRate;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleReset = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleChangeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying && isSupported) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.rate = rate;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
      <div className="flex items-center gap-4">
        {/* Auditor Avatar */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-sky-200 dark:border-slate-700 shadow-xs">
          <img
            src="/src/assets/images/avatar_auditor_lead_1793429163841.jpg"
            alt="Intelligence Auditor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              Auditor Audio Dispatch
            </span>
            <span aria-hidden="true" className="text-sky-200">·</span>
            <span className="text-xs text-slate-500">60-Sec Executive Briefing</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Forensic Gap Summary Briefing
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xl">
            {scriptText}
          </p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
        {/* Simulated Waveform Bars */}
        <div className="hidden sm:flex items-center gap-0.5 h-6 px-2">
          {[40, 75, 55, 90, 60, 30, 80, 45, 95, 50, 70].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-sky-100 dark:bg-slate-700 transition-all duration-300 ${
                isPlaying ? 'bg-sky-500 animate-pulse' : ''
              }`}
              style={{ height: isPlaying ? `${Math.min(100, h + (i % 3) * 15)}%` : '30%' }}
            />
          ))}
        </div>

        {/* Speed Buttons */}
        <div className="flex items-center gap-1 p-1 bg-sky-50 dark:bg-slate-800 rounded-lg text-xs font-mono font-semibold">
          {[1.0, 1.25, 1.5].map((rate) => (
            <button
              key={rate}
              onClick={() => handleChangeRate(rate)}
              className={`px-2 py-0.5 rounded transition-colors ${
                playbackRate === rate
                  ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-sky-700 dark:hover:text-white'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm shadow-sky-600/20 transition-all"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" /> Pause
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Play Briefing
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
          title="Reset Audio"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
