import React from 'react';
import { motion } from 'framer-motion';

/**
 * Editorial section heading component with glowing tag, large title,
 * gradient highlight, and explanatory subtitle.
 * Seamlessly adapts between Light Mode and Dark Mode.
 */
export default function SectionHeading({
  tag,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-16 md:mb-24 ${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
      } ${className}`}
    >
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-[#101A30]/80 border border-black/15 dark:border-blue-500/20 text-xs font-mono tracking-wider text-neutral-800 dark:text-cyan-400 mb-4 backdrop-blur-md shadow-sm transition-colors duration-300 ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 dark:bg-cyan-400 animate-pulse" />
          <span>{tag}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white font-display leading-[1.15] transition-colors duration-300"
      >
        {title}{' '}
        {highlight && (
          <span className="text-gradient-cyan block sm:inline">
            {highlight}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 md:mt-6 text-base sm:text-lg text-neutral-600 dark:text-[#94A3B8] leading-relaxed font-sans transition-colors duration-300"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
