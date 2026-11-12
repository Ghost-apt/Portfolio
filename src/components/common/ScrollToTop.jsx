import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTop - Floating back-to-top button appearing after scrolling down.
 */
export default function ScrollToTop({ threshold = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-black/80 border border-white/20 text-white hover:bg-white hover:text-black shadow-xl backdrop-blur-md transition-colors"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
