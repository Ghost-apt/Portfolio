import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

/**
 * CurvedLine - Elegant SVG wave path with traveling illuminated point
 * and accompanying editorial labels. Adapts between Light and Dark mode.
 */
export default function CurvedLine() {
  const { isDark } = useTheme();
  // Exact curved path from index(1).html
  const pathData = "M-20 77 C170 77 215 78 340 67 S510 14 650 35 S815 90 960 65 S1170 10 1460 38";

  const strokeColor = isDark ? "rgba(220, 220, 220, 0.58)" : "rgba(40, 40, 40, 0.38)";
  const beadColor = isDark ? "#ffffff" : "#111111";
  const trailColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(40, 40, 40, 0.4)";

  return (
    <div className="relative w-full max-w-full overflow-hidden select-none pointer-events-none py-1 transition-colors duration-300">
      {/* SVG Curved Path & Traveling Illuminated Bead from index(1).html */}
      <div className="relative w-full h-16 sm:h-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-hidden"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="point-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Ambient Wave Path from index(1).html */}
          <path
            d={pathData}
            stroke={strokeColor}
            strokeWidth="1"
            strokeLinecap="round"
            className="curve-path"
          />

          {/* Primary Traveling Illuminated Point from index(1).html */}
          <g filter="url(#point-glow)">
            <circle r="3" fill={beadColor} className="curve-dot">
              <animateMotion
                path={pathData}
                dur="9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Subtle Secondary Ambient Dot for Depth */}
          <g opacity="0.45" filter="url(#point-glow)">
            <circle r="1.8" fill={trailColor}>
              <animateMotion
                path={pathData}
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>

      {/* Editorial Labels & Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between text-[9px] sm:text-[11px] font-mono tracking-[0.25em] text-neutral-500 dark:text-neutral-400 -mt-2 transition-colors duration-300">
        {/* Left Label */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-1 h-1 rounded-full bg-neutral-800/70 dark:bg-white/60 animate-ping" />
          <span className="uppercase">SCROLL DOWN</span>
        </div>

        {/* Center Animated Indicator */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 opacity-75"
        >
          <div className="w-4 h-6 rounded-full border border-black/25 dark:border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-neutral-800 dark:bg-white"
            />
          </div>
        </motion.div>

        {/* Right Label */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="uppercase">TO EXPLORE MY WORK</span>
          <span className="w-1 h-1 rounded-full bg-neutral-800/70 dark:bg-white/60" />
        </div>
      </div>
    </div>
  );
}
