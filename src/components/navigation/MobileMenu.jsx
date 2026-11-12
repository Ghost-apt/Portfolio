import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';

/**
 * MobileMenu - Slide-down drawer navigation for mobile viewports.
 * Adapts between Light Mode and Dark Mode.
 */
export default function MobileMenu({
  isOpen,
  onClose,
  links = [],
  activeSection = 'home',
  onOpenResume,
}) {
  // Close drawer on Escape key for keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-4 top-20 z-40 p-6 rounded-2xl bg-white/95 dark:bg-[#030303]/95 border border-black/15 dark:border-white/15 backdrop-blur-2xl shadow-2xl lg:hidden text-neutral-900 dark:text-white transition-colors duration-300"
        >
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white border border-black/15 dark:border-white/20 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="text-sm font-sans">{link.name}</span>
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">→</span>
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
              {onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/15 dark:border-white/15 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Resume
                </button>
              )}
              <a
                href="#contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-medium tracking-wide shadow-lg transition-colors"
              >
                Let's Connect
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
