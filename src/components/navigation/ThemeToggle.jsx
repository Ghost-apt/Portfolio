import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

/**
 * ThemeToggle - Minimalist, luxury theme switch icon button.
 * Smoothly toggles between Dark Mode and Light Mode with micro-animations.
 */
export default function ThemeToggle({ id, className = '' }) {
  const { theme, isDark, toggleTheme } = useTheme();

  const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  return (
    <motion.button
      id={id}
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full transition-colors duration-300 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black border ${
        isDark
          ? 'bg-white/[0.04] border-white/15 text-neutral-300 hover:text-white hover:border-white/40 hover:bg-white/[0.08]'
          : 'bg-black/[0.04] border-black/15 text-neutral-700 hover:text-black hover:border-black/40 hover:bg-black/[0.08]'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -60, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 60, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-neutral-200" strokeWidth={1.8} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 60, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -60, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-neutral-800" strokeWidth={1.8} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
