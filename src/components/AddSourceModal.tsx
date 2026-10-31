import React, { useState, useRef } from 'react';
import { SourceItem } from '../types';
import { X, Globe, FileText, Loader2, Link2, Plus, UploadCloud, Sparkles, HelpCircle } from 'lucide-react';

interface AddSourceModalProps {
  onAddSource: (source: SourceItem) => void;
  onClose: () => void;
  nextId: string;
}

export const AddSourceModal: React.FC<AddSourceModalProps> = ({
  onAddSource,
  onClose,
  nextId,
}) => {
  const [tab, setTab] = useState<'url' | 'manual' | 'file'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [sourceType, setSourceType] = useState<SourceItem['sourceType']>('official');
  const [dateOrCycle, setDateOrCycle] = useState('');
  const [authorOrOrg, setAuthorOrOrg] = useState('');
  const [content, setContent] = useState('');

  // Drag and drop states
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ready-to-test example public URLs
  const sampleUrls = [
    {
      label: 'Wikipedia: Merit Scholarship Policy',
      url: 'https://en.wikipedia.org/wiki/Scholarship',
      category: 'Academic',
    },
    {
      label: 'NIH Clinical Research Guidelines',
      url: 'https://www.nih.gov/health-information',
      category: 'Healthcare',
    },
    {
      label: 'W3C Web Standards Specification',
      url: 'https://www.w3.org/standards/',
      category: 'Technical',
    },
    {
      label: 'Mozilla Developer Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web',
      category: 'Developer',
    },
  ];

  const handleFetchUrl = async (e?: React.FormEvent, urlOverride?: string) => {
    if (e) e.preventDefault();
    const targetUrl = urlOverride || urlInput;
    if (!targetUrl.trim() || isFetching) return;

    setIsFetching(true);
    setFetchError(null);

    try {
      const res = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch content from URL');
      }

      setTitle(data.title || 'Fetched Document');
      setDateOrCycle(data.dateOrCycle || 'Unknown / Not stated');
      setContent(data.content || '');
      try {
        setAuthorOrOrg(new URL(targetUrl).hostname);
      } catch {
        setAuthorOrOrg('External Website');
      }
      setTab('manual'); // switch to review form so user can inspect extracted text
    } catch (err: any) {
      setFetchError(err.message || 'Network fetch failed. You can paste text manually instead.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleProcessFile = (file: File) => {
    setUploadedFileName(file.name);
    setTitle(file.name.replace(/\.[^/.]+$/, ''));
    setAuthorOrOrg('Uploaded Document');

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text || '');
      setTab('manual');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddSource({
      id: nextId,
      title: title.trim(),
      url: urlInput.trim() || undefined,
      authorOrOrg: authorOrOrg.trim() || undefined,
      dateOrCycle: dateOrCycle.trim() || undefined,
      sourceType,
      content: content.trim(),
      isCustom: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-sky-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Source Material [{nextId}]
              </h3>
              <p className="text-[11px] text-slate-500">
                Any public article, official portal, blog, or document related to your topic.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: URL Fetch vs Direct Paste vs Upload */}
        <div className="flex border-b border-sky-100 dark:border-slate-800 bg-sky-50/50 dark:bg-slate-800/60 p-1">
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'url'
                ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-sky-800 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Fetch URL
          </button>
          <button
            type="button"
            onClick={() => setTab('file')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'file'
                ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-sky-800 dark:hover:text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setTab('manual')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'manual'
                ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-sky-800 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Paste Text
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {tab === 'url' && (
            <div className="space-y-4">
              <form onSubmit={(e) => handleFetchUrl(e)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Website or Article URL:
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.edu/scholarship-details"
                        required
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isFetching || !urlInput.trim()}
                      className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg disabled:opacity-40 transition-opacity flex items-center gap-1.5 shrink-0 shadow-sm shadow-sky-600/20"
                    >
                      {isFetching ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Fetching...
                        </>
                      ) : (
                        'Fetch & Extract'
                      )}
                    </button>
                  </div>
                </div>

                {fetchError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-lg text-xs text-rose-700 dark:text-rose-300">
                    {fetchError}
                  </div>
                )}
              </form>

              {/* Ready-to-test sample URLs */}
              <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-800 dark:text-sky-300">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Click to test live sample URLs:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleUrls.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setUrlInput(sample.url);
                        handleFetchUrl(undefined, sample.url);
                      }}
                      className="p-2.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-sky-50/80 dark:hover:bg-slate-800 border border-sky-100/80 dark:border-slate-700 text-left transition-colors flex flex-col gap-0.5 group"
                    >
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-600">
                        {sample.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono truncate">
                        {sample.url}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guidance on what URLs to enter */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                  Konse URLs daalne chahiye? (Which URLs work best?)
                </div>
                <ul className="space-y-1 text-[11px] list-disc pl-4 text-slate-600 dark:text-slate-400">
                  <li><strong>Official Source:</strong> Official website / portal (e.g. scholarship portal, university page, government notice).</li>
                  <li><strong>Third-party Advisory:</strong> Blog post, news summary, or guide explaining the topic.</li>
                  <li><strong>Discussion / Community:</strong> Reddit thread, forum post, or review where applicants share real experiences.</li>
                </ul>
                <p className="text-[11px] text-sky-700 dark:text-sky-400 pt-1">
                  💡 Tip: The platform discovers gaps best when you give 2 or 3 different perspectives on the same topic!
                </p>
              </div>
            </div>
          )}

          {tab === 'file' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-sky-500 bg-sky-500/10'
                    : 'border-sky-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-slate-600 bg-sky-50/20 dark:bg-slate-800/40'
                }`}
              >
                <UploadCloud className="w-8 h-8 text-sky-500" />
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {uploadedFileName ? `Loaded: ${uploadedFileName}` : 'Drag & Drop document or click to browse'}
                </div>
                <p className="text-[11px] text-slate-400">
                  Supports .txt, .md, .csv, .json text documents
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.csv,.json"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleProcessFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {tab === 'manual' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Document / Page Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Official Scholarship Guidelines 2026"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Source Type</label>
                  <select
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="official">Official Authority</option>
                    <option value="guide">Guide / Advisory</option>
                    <option value="forum">Community / Forum</option>
                    <option value="news">News / Press</option>
                    <option value="academic">Academic / Clinical</option>
                    <option value="other">Other Document</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Published Date or Cycle</label>
                  <input
                    type="text"
                    value={dateOrCycle}
                    onChange={(e) => setDateOrCycle(e.target.value)}
                    placeholder="e.g. Jan 2026 or Cycle 2024"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Author or Entity</label>
                  <input
                    type="text"
                    value={authorOrOrg}
                    onChange={(e) => setAuthorOrOrg(e.target.value)}
                    placeholder="e.g. Higher Ed Agency"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Source Text Content</span>
                  <span className="font-mono text-slate-400 font-normal">{content.length} chars</span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  placeholder="Paste the raw text of the document, website, or advisory note here..."
                  required
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm"
                >
                  Add to Audit Corpus
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
