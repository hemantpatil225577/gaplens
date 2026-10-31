import React, { useState } from 'react';
import { AnalysisResult, SourceItem } from '../types';
import { Network, Compass, Eye } from 'lucide-react';

interface VoidGraphVisualizerProps {
  analysis: AnalysisResult;
  sources: SourceItem[];
  onInspectSource: (sourceId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const VoidGraphVisualizer: React.FC<VoidGraphVisualizerProps> = ({
  analysis,
  sources,
  onInspectSource,
  onNavigateTab,
}) => {
  const [activeView, setActiveView] = useState<'radar' | 'graph'>('radar');
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    label: string;
    type: 'source' | 'fact' | 'void' | 'conflict';
    description: string;
    details?: string[];
  } | null>(null);

  // Radar Dimensions setup
  const radarDimensions = [
    { label: 'Eligibility', score: 85, angle: 0 },
    { label: 'Renewal Rules', score: 12, angle: 60, isVoid: true },
    { label: 'Deadlines & Cycles', score: 45, angle: 120 },
    { label: 'Tax & Documents', score: 50, angle: 180, isConflict: true },
    { label: 'Displacement / Stacking', score: 18, angle: 240, isVoid: true },
    { label: 'Governance & Appeals', score: 25, angle: 300, isVoid: true },
  ];

  const centerX = 160;
  const centerY = 160;
  const maxRadius = 110;

  // Calculate radar polygon points
  const points = radarDimensions
    .map((dim) => {
      const rad = (dim.angle - 90) * (Math.PI / 180);
      const r = (dim.score / 100) * maxRadius;
      const x = centerX + r * Math.cos(rad);
      const y = centerY + r * Math.sin(rad);
      return `${x},${y}`;
    })
    .join(' ');

  // Graph nodes representation
  const graphNodes = [
    ...sources.map((s, idx) => ({
      id: s.id,
      label: `[${s.id}] ${s.title.slice(0, 18)}...`,
      type: 'source' as const,
      x: 80 + idx * 160,
      y: 90,
      description: s.title,
      details: [`Date/Cycle: ${s.dateOrCycle || 'Undated'}`, `Type: ${s.sourceType}`],
    })),
    {
      id: 'F1',
      label: 'Verified: $10,000/yr Award',
      type: 'fact' as const,
      x: 140,
      y: 200,
      description: 'Confirmed across sources S1 and S2 for public in-state STEM programs.',
      details: ['Consensus: Unanimous', 'Confidence: High'],
    },
    {
      id: 'C1',
      label: 'Income Cap: $65k vs $80k',
      type: 'conflict' as const,
      x: 300,
      y: 210,
      description: 'Source 1 enforces $65,000 household cap; Source 2 references 2026 expansion to $80,000.',
      details: ['Nature: Direct Contradiction', 'Severity: High'],
    },
    {
      id: 'V1',
      label: 'VOID: College GPA Renewal',
      type: 'void' as const,
      x: 220,
      y: 290,
      description: 'No source covers the minimum collegiate GPA or annual credit hour pace required to retain funding.',
      details: ['Status: Complete Absence', 'Risk: Revocation of funding sophomore year'],
    },
    {
      id: 'V2',
      label: 'VOID: Major Switch Clawback',
      type: 'void' as const,
      x: 420,
      y: 280,
      description: 'Unstated whether changing from pure science to data analytics forfeits the grant.',
      details: ['Status: Information Void', 'Risk: Repayment liability'],
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Epistemic Topology & Void Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual topology plotting verified knowledge clusters against unmapped information voids.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-sky-50 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveView('radar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeView === 'radar'
                ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-sky-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-sky-600" /> Polar Radar
          </button>
          <button
            onClick={() => setActiveView('graph')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeView === 'graph'
                ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-sky-800'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-sky-600" /> Topology Network
          </button>
        </div>
      </div>

      {activeView === 'radar' ? (
        /* Radar View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 flex justify-center py-2">
            <div className="relative w-80 h-80">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 320">
                {/* Concentric Guideline Rings */}
                {[0.25, 0.5, 0.75, 1.0].map((level, idx) => (
                  <circle
                    key={idx}
                    cx={centerX}
                    cy={centerY}
                    r={maxRadius * level}
                    fill="none"
                    className="stroke-sky-100 dark:stroke-slate-800"
                    strokeWidth="1"
                    strokeDasharray={level < 1 ? '3 3' : 'none'}
                  />
                ))}

                {/* Axis Spokes */}
                {radarDimensions.map((dim, idx) => {
                  const rad = (dim.angle - 90) * (Math.PI / 180);
                  const x = centerX + maxRadius * Math.cos(rad);
                  const y = centerY + maxRadius * Math.sin(rad);
                  return (
                    <line
                      key={idx}
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      className="stroke-sky-100 dark:stroke-slate-800"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Radar Polygon Area in vibrant Sky Blue */}
                <polygon
                  points={points}
                  className="fill-sky-400/20 stroke-sky-500"
                  strokeWidth="2.5"
                />

                {/* Node Points on Radar */}
                {radarDimensions.map((dim, idx) => {
                  const rad = (dim.angle - 90) * (Math.PI / 180);
                  const r = (dim.score / 100) * maxRadius;
                  const x = centerX + r * Math.cos(rad);
                  const y = centerY + r * Math.sin(rad);

                  const textR = maxRadius + 22;
                  const textX = centerX + textR * Math.cos(rad);
                  const textY = centerY + textR * Math.sin(rad);

                  return (
                    <g key={idx}>
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        className={
                          dim.isVoid
                            ? 'fill-rose-500 stroke-white dark:stroke-slate-900 cursor-pointer'
                            : dim.isConflict
                            ? 'fill-amber-500 stroke-white dark:stroke-slate-900 cursor-pointer'
                            : 'fill-sky-500 stroke-white dark:stroke-slate-900 cursor-pointer'
                        }
                        strokeWidth="2"
                        onClick={() =>
                          setSelectedNode({
                            id: dim.label,
                            label: dim.label,
                            type: dim.isVoid ? 'void' : dim.isConflict ? 'conflict' : 'fact',
                            description: `Dimension coverage evaluated at ${dim.score}%.`,
                            details: [
                              dim.isVoid ? 'Classified as an Information Void / Dark Spot' : 'Verified evidence available',
                            ],
                          })
                        }
                      />
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[10px] font-semibold fill-slate-700 dark:fill-slate-300 font-sans"
                      >
                        {dim.label} ({dim.score}%)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Radar Analysis Panel Right */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                <span>Coverage Void Diagnosis</span>
                <span className="font-mono text-sky-700 dark:text-sky-400 font-bold">
                  3 of 6 Dimensions in Critical Void
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The polar radar demonstrates asymmetric coverage. While initial high school eligibility is documented (85%), long-term sustainability dimensions (Renewal Rules at 12%, Stacking at 18%, and Appeals at 25%) are in severe collapse.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Dimension Vulnerabilities:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20">
                  <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Renewal Rules (12%)
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                    GPA threshold & credit load pace omitted from all source pages.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
                  <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Tax & Paperwork (50%)
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                    Conflicting document demands (W-2 vs IRS Form 1040).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Network Topology Graph */
        <div className="space-y-4">
          <div className="relative h-80 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            <svg className="w-full h-full" viewBox="0 0 540 340">
              <line x1="120" y1="90" x2="140" y2="200" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="280" y1="90" x2="140" y2="200" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

              <line x1="120" y1="90" x2="300" y2="210" stroke="#f43f5e" strokeWidth="2" opacity="0.8" />
              <line x1="280" y1="90" x2="300" y2="210" stroke="#f43f5e" strokeWidth="2" opacity="0.8" />

              <line x1="120" y1="90" x2="220" y2="290" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.5" />
              <line x1="280" y1="90" x2="220" y2="290" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.5" />
              <line x1="440" y1="90" x2="420" y2="280" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.5" />

              {graphNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                let fill = '#0f172a';
                let stroke = '#0284c7';

                if (node.type === 'source') {
                  fill = '#0284c7';
                  stroke = '#38bdf8';
                } else if (node.type === 'fact') {
                  fill = '#0369a1';
                  stroke = '#38bdf8';
                } else if (node.type === 'conflict') {
                  fill = '#4c0519';
                  stroke = '#f43f5e';
                } else if (node.type === 'void') {
                  fill = '#1e293b';
                  stroke = '#f59e0b';
                }

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <rect
                      x={node.x - 70}
                      y={node.y - 18}
                      width="140"
                      height="36"
                      rx="8"
                      fill={fill}
                      stroke={isSelected ? '#ffffff' : stroke}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {selectedNode && (
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sky-900 dark:text-white uppercase font-mono">
                    {selectedNode.id}
                  </span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedNode.label}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {selectedNode.description}
                </p>
                {selectedNode.details && (
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 font-mono pt-1">
                    {selectedNode.details.map((d, idx) => (
                      <span key={idx} className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-sky-100 dark:border-slate-800">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {selectedNode.type === 'source' && (
                <button
                  onClick={() => onInspectSource(selectedNode.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shrink-0 flex items-center gap-1 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect Document
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
