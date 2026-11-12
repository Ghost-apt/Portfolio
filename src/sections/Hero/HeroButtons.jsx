import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../../components/animations/MagneticButton';

/**
 * HeroButtons - Outlined pill action buttons enhanced with subtle magnetic attraction.
 * Seamlessly adapts between Light Mode and Dark Mode.
 */
export default function HeroButtons({ onExploreClick, onContactClick }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
      {/* Button 1: Explore Projects */}
      <MagneticButton strength={0.22}>
        <motion.a
          href="#projects"
          onClick={onExploreClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-white bg-black hover:bg-neutral-800 border border-black dark:border-white/25 dark:bg-black/40 dark:hover:border-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md"
        >
          <span>Explore Projects</span>
          <ArrowDownRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-400 group-hover:text-white dark:group-hover:text-black transition-colors group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </motion.a>
      </MagneticButton>

      {/* Button 2: Contact Me */}
      <MagneticButton strength={0.22}>
        <motion.a
          href="#contact"
          onClick={onContactClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-neutral-800 hover:text-black bg-black/[0.04] border border-black/15 hover:border-black/40 hover:bg-black/[0.08] dark:text-neutral-300 dark:hover:text-white dark:bg-white/[0.03] dark:border-white/15 dark:hover:border-white/50 dark:hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-md"
        >
          <span>Contact Me</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </MagneticButton>
    </div>
  );
}
