import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Geometric Lens & Dark Spot Focal Beacon */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 p-0.5 shadow-sm shadow-sky-500/20`}>
        <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-950 flex items-center justify-center relative overflow-hidden">
          {/* Subtle Sky Radial Glow */}
          <div className="absolute inset-0 bg-radial-at-c from-sky-100/60 dark:from-sky-500/20 to-transparent" />

          {/* SVG Vector Beacon */}
          <svg
            viewBox="0 0 36 36"
            className="w-full h-full p-1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Circular Ring with subtle gap */}
            <circle
              cx="18"
              cy="18"
              r="13"
              stroke="url(#skyGradient)"
              strokeWidth="2.5"
              strokeDasharray="18 4 14 4"
            />

            {/* Radar Crosshairs */}
            <line x1="18" y1="2" x2="18" y2="7" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="29" x2="18" y2="34" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="18" x2="7" y2="18" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <line x1="29" y1="18" x2="34" y2="18" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />

            {/* Center Focal "Dark Spot" Aperture */}
            <circle
              cx="18"
              cy="18"
              r="5"
              className="fill-slate-950 dark:fill-white"
            />
            {/* Core Lens Dot */}
            <circle
              cx="18"
              cy="18"
              r="2"
              className="fill-sky-400 dark:fill-sky-500"
            />

            <defs>
              <linearGradient id="skyGradient" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="0.5" stopColor="#0ea5e9" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5 ${textSizes[size]}`}>
            <span>Gap</span>
            <span className="text-sky-600 dark:text-sky-400 font-extrabold">Lens</span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-sky-600/80 dark:text-sky-400/80 uppercase font-semibold mt-0.5">
            Information Gap Detection
          </span>
        </div>
      )}
    </div>
  );
};
