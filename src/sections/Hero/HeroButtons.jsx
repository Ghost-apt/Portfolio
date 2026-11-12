import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../../components/animations/MagneticButton';

/**
 * HeroButtons - Outlined pill action buttons enhanced with subtle magnetic attraction.
 * Transparent outlines adhering strictly to the monochromatic luxury reference design.
 */
export default function HeroButtons({ onExploreClick, onContactClick }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
      {/* Button 1: Explore Projects - Transparent Outlined */}
      <MagneticButton strength={0.22}>
        <motion.a
          href="#projects"
          onClick={onExploreClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-neutral-900 dark:text-white bg-transparent border border-black/25 dark:border-white/30 hover:border-black/60 dark:hover:border-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm shadow-none"
        >
          <span>Explore Projects</span>
          <ArrowDownRight className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </motion.a>
      </MagneticButton>

      {/* Button 2: Contact Me - Transparent Outlined */}
      <MagneticButton strength={0.22}>
        <motion.a
          href="#contact"
          onClick={onContactClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-transparent border border-black/15 dark:border-white/20 hover:border-black/40 dark:hover:border-white/50 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm shadow-none"
        >
          <span>Contact Me</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </motion.a>
      </MagneticButton>
    </div>
  );
}
