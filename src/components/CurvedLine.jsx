import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CurvedLine() {
  // Smooth organic curve spanning 1440 units horizontally
  const pathData = "M 0 38 C 240 10, 480 62, 720 35 C 960 12, 1200 58, 1440 32";

  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none py-2">
      {/* SVG Curved Path & Traveling Illuminated Bead */}
      <div className="relative w-full h-14 sm:h-16">
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Soft Glow Filter for the traveling point */}
            <filter id="point-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle Gradient for the curve stroke */}
            <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="20%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background Ambient Ghost Path */}
          <path
            d={pathData}
            stroke="url(#curve-gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Traveling Illuminated Point (Glowing White Bead) */}
          <g filter="url(#point-glow)">
            <circle r="3.5" fill="#ffffff">
              <animateMotion
                path={pathData}
                dur="9s"
                repeatCount="indefinite"
                keyPoints="0;1;0"
                keyTimes="0;0.5;1"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
              />
            </circle>
          </g>

          {/* Secondary Micro-Sparkle Traveling in Reverse */}
          <g opacity="0.6" filter="url(#point-glow)">
            <circle r="2" fill="#d1d5db">
              <animateMotion
                path={pathData}
                dur="14s"
                repeatCount="indefinite"
                keyPoints="1;0;1"
                keyTimes="0;0.5;1"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
              />
            </circle>
          </g>
        </svg>
      </div>

      {/* Accompanying Editorial Labels & Center Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-neutral-400 -mt-2">
        {/* Left Label */}
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-white/60 animate-ping" />
          <span className="uppercase">SCROLL DOWN</span>
        </div>

        {/* Center Animated Indicator */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 opacity-75"
        >
          <div className="w-4 h-6 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>

        {/* Right Label */}
        <div className="flex items-center gap-2">
          <span className="uppercase">TO EXPLORE MY WORK</span>
          <span className="w-1 h-1 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
