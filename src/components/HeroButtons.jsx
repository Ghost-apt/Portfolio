import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function HeroButtons({ onExploreClick, onContactClick }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
      {/* Button 1: Explore Projects */}
      <motion.a
        href="#projects"
        onClick={onExploreClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-white bg-black/40 border border-white/25 hover:border-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md"
      >
        <span>Explore Projects</span>
        <ArrowDownRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
      </motion.a>

      {/* Button 2: Contact Me */}
      <motion.a
        href="#contact"
        onClick={onContactClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-neutral-300 hover:text-white bg-white/[0.03] border border-white/15 hover:border-white/50 hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-md"
      >
        <span>Contact Me</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.a>
    </div>
  );
}
