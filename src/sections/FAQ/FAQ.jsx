import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { faqData } from '../../data/faq';
import './FAQ.css';

/**
 * FAQ - Interactive accordion for inquiries.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        tag="08 // INQUIRIES"
        title="Frequently Asked"
        highlight="Questions."
        subtitle="Clarifications on engineering stack, AI focus areas, collaboration channels, and development background."
      />

      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                isOpen
                  ? 'bg-[#0B1120] border-cyan-400/40 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.1)]'
                  : 'bg-[#0B1120]/70 border-blue-500/20 hover:border-blue-500/40'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                id={`faq-question-${item.id || index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id || index}`}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span className="text-base sm:text-lg font-bold font-display text-white">
                  {item.question}
                </span>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen
                      ? 'bg-cyan-400/20 text-cyan-300'
                      : 'bg-slate-800/80 text-slate-400'
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${item.id || index}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id || index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#94A3B8] leading-relaxed border-t border-blue-900/30 font-sans">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
