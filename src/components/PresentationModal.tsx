import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Presentation,
  Clock,
  Mic,
  Maximize2,
  FileCode,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PRESENTATION_SLIDES, SlideData } from '../data/presentationSlides';
import { downloadPitchDeckPptx } from '../utils/generatePptx';

interface PresentationModalProps {
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);
  const [copiedAllMarkdown, setCopiedAllMarkdown] = useState<boolean>(false);
  const [isGeneratingPptx, setIsGeneratingPptx] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(true);

  const currentSlide: SlideData = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDownloadPptx = async () => {
    setIsGeneratingPptx(true);
    try {
      await downloadPitchDeckPptx();
    } catch (err) {
      console.error('Failed to generate pptx client-side, falling back to static file:', err);
      // Fallback: direct download of the prebuilt file in /public
      const a = document.createElement('a');
      a.href = '/GapLens_Hackathon_Pitch_Deck.pptx';
      a.download = 'GapLens_Hackathon_Pitch_Deck.pptx';
      a.click();
    } finally {
      setIsGeneratingPptx(false);
    }
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(currentSlide.speakerNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const handleCopyAllMarkdown = () => {
    const md = PRESENTATION_SLIDES.map((s) => {
      return `# Slide ${s.id}: ${s.title}
Category: ${s.category}
Subtitle: ${s.subtitle}
Estimated Speaking Time: ${s.durationEst}

### Key Content:
${s.keyPoints.map((k) => `- **${k.heading}**: ${k.details} [${k.badge || ''}]`).join('\n')}

### Speaker Notes (What to say to judges):
${s.speakerNotes}

---
`;
    }).join('\n');

    navigator.clipboard.writeText(md);
    setCopiedAllMarkdown(true);
    setTimeout(() => setCopiedAllMarkdown(false), 2000);
  };

  const handleDownloadPdf = () => {
    const a = document.createElement('a');
    a.href = '/download/pdf';
    a.download = 'GapLens_Hackathon_Pitch_Deck.pdf';
    a.click();
  };

  const handleOpenPdf = () => {
    window.open('/GapLens_Hackathon_Pitch_Deck.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden text-slate-100">
        {/* Top Control Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  GapLens Pitch Deck
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">
                  Slide {currentSlideIndex + 1} of {totalSlides}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Tailored for Hackathon Pitch & Epistemic AI Rubrics (16:9 Widescreen)
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                showNotes
                  ? 'bg-slate-800 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-white bg-slate-800/40'
              }`}
              title="Toggle Speaker Notes"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Speaker Notes</span>
            </button>

            <button
              onClick={handleCopyAllMarkdown}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
              title="Copy entire slide deck as Markdown"
            >
              {copiedAllMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedAllMarkdown ? 'Copied MD' : 'Copy MD'}</span>
            </button>

            {/* Direct Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 text-xs font-semibold text-rose-100 bg-rose-600/90 hover:bg-rose-500 rounded-lg transition-all shadow-md shadow-rose-900/30 flex items-center gap-1.5 border border-rose-500/50"
              title="Download high-resolution 16:9 PDF presentation"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download PDF</span>
            </button>

            {/* Direct Download PPTX Button */}
            <button
              onClick={handleDownloadPptx}
              disabled={isGeneratingPptx}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-all shadow-md shadow-sky-600/30 flex items-center gap-1.5 disabled:opacity-50"
              title="Download Microsoft PowerPoint (.pptx) presentation"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isGeneratingPptx ? 'Building PPTX...' : 'Download .pptx'}</span>
              <span className="sm:hidden">.pptx</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Stage & Notes Layout */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 bg-slate-950">
          {/* Main Slide Canvas (16:9 Styled Preview) */}
          <div className="relative w-full aspect-16/9 bg-[#0B132B] rounded-xl border border-sky-950/60 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />

            {/* Slide Header Zone */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-800/80 text-sky-400 border border-sky-500/30 rounded-md">
                  {currentSlide.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-sky-400" /> {currentSlide.durationEst}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentSlide.title}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Slide Content Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-auto py-2">
              {currentSlide.keyPoints.map((point, idx) => {
                const borderClass =
                  point.type === 'danger'
                    ? 'border-rose-500/30 bg-rose-950/20'
                    : point.type === 'warning'
                    ? 'border-amber-500/30 bg-amber-950/20'
                    : point.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-900/60';

                const badgeClass =
                  point.type === 'danger'
                    ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                    : point.type === 'warning'
                    ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                    : point.type === 'success'
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                    : 'text-sky-400 border-sky-500/30 bg-sky-500/10';

                return (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl border ${borderClass} flex flex-col justify-between gap-2.5 transition-all hover:border-sky-500/40`}
                  >
                    <div>
                      {point.badge && (
                        <span
                          className={`inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded border mb-2 ${badgeClass}`}
                        >
                          {point.badge}
                        </span>
                      )}
                      <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug">
                        {point.heading}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                        {point.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
              <span>GapLens • Epistemic Gap & Void Detection</span>
              <span className="font-mono">Slide {currentSlide.id} / {totalSlides}</span>
            </div>
          </div>

          {/* Navigation Controls & Carousel Dots */}
          <div className="flex items-center justify-between gap-4 py-1">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {/* Thumbnail dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {PRESENTATION_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    idx === currentSlideIndex
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 font-bold scale-105'
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                  title={slide.title}
                >
                  {slide.id}
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speaker Notes Drawer */}
          {showNotes && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                    Presenter Script for Slide {currentSlide.id} (What to speak out loud)
                  </span>
                </div>
                <button
                  onClick={handleCopyNotes}
                  className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-1 transition-colors"
                >
                  {copiedNotes ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedNotes ? 'Copied' : 'Copy Speech'}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 font-serif">
                "{currentSlide.speakerNotes}"
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct .pdf & .pptx exports generate widescreen 16:9 presentation slides with full speaker notes included.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500">Keyboard shortcuts: ← / → / Space</span>
            <a
              href="https://github.com/hemantpatil225577/gaplens"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
