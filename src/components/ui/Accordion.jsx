import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

/**
 * Accordion - Accessible, smooth expand/collapse accordion item.
 */
export default function Accordion({
  title,
  children,
  isOpen = false,
  onToggle,
  className = '',
}) {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
        isOpen
          ? 'bg-[#0B1120] border-cyan-400/40 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.1)]'
          : 'bg-[#0B1120]/70 border-blue-500/20 hover:border-blue-500/40'
      } ${className}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-bold font-display text-white">
          {title}
        </span>

        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isOpen
              ? 'bg-cyan-400/20 text-cyan-300'
              : 'bg-slate-800/80 text-slate-400'
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#94A3B8] leading-relaxed border-t border-blue-900/30 font-sans">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
