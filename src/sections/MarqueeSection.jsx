import React from 'react';
import { marqueeTechnologies } from '../data/portfolio';
import { Sparkles } from 'lucide-react';

export default function MarqueeSection() {
  const repeatedItems = [...marqueeTechnologies, ...marqueeTechnologies, ...marqueeTechnologies];

  return (
    <div className="relative py-8 md:py-12 border-y border-blue-500/15 bg-[#0B1120]/60 backdrop-blur-md overflow-hidden">
      {/* Edge Fades for sleek infinite look */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-6 sm:gap-10">
        {repeatedItems.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 sm:gap-4 shrink-0 text-slate-300 hover:text-cyan-300 transition-colors select-none font-display font-medium text-sm sm:text-base tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="whitespace-nowrap">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
