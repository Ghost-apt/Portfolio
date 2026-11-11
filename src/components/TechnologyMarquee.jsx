import React from 'react';

const technologies = [
  'React.js',
  'JavaScript',
  'Python',
  'Java',
  'Node.js',
  'Express',
  'MongoDB',
  'Machine Learning',
  'Generative AI',
  'RAG',
  'AWS',
];

export default function TechnologyMarquee() {
  const repeatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative w-full py-4 sm:py-5 border-t border-white/[0.08] bg-black/40 backdrop-blur-sm overflow-hidden select-none">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-8 sm:gap-14">
        {repeatedTechs.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 shrink-0 text-neutral-400 hover:text-white transition-colors duration-200 text-xs sm:text-[13px] font-mono tracking-wider"
          >
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
