import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';

/**
 * MobileMenu - Slide-down drawer navigation for mobile viewports.
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
          className="fixed inset-x-4 top-20 z-40 p-6 rounded-2xl bg-[#030303]/95 border border-white/15 backdrop-blur-2xl shadow-2xl lg:hidden"
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
                      ? 'bg-white/[0.08] text-white border border-white/20 font-medium'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="text-sm font-sans">{link.name}</span>
                  <span className="text-xs font-mono text-neutral-500">→</span>
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
              {onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs font-mono text-neutral-300 hover:text-white"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Resume
                </button>
              )}
              <a
                href="#contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-xs font-medium tracking-wide shadow-lg"
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
