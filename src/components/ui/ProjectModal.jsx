import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, CheckCircle, ArrowUpRight } from 'lucide-react';
import ProjectVisual from '../../sections/Projects/ProjectVisual';

/**
 * ProjectModal - Architectural Blueprint modal dialog.
 */
export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0B1120] border border-black/15 dark:border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col text-neutral-900 dark:text-slate-100"
          >
            {/* Ambient Background Glow inside modal */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-100 text-neutral-800 border border-neutral-200 dark:bg-blue-950/80 dark:text-cyan-300 dark:border-blue-700/40">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-100 text-neutral-700 dark:bg-slate-800/80 dark:text-slate-300">
                    {project.badge}
                  </span>
                </div>
                <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-cyan-400 font-mono mt-1">
                  {project.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 dark:bg-slate-800/60 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="overflow-y-auto space-y-6 pt-4 pr-1">
              {/* Visual preview */}
              <div className="w-full rounded-2xl overflow-hidden border border-black/10 dark:border-blue-500/20 shadow-lg">
                <ProjectVisual type={project.visualType} />
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-slate-400 mb-2">
                  System Overview
                </h4>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed font-sans">
                  {project.detailedDescription}
                </p>
              </div>

              {/* System Architecture Grid */}
              {project.architecture && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-slate-400 mb-3">
                    Architectural Blueprint
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(project.architecture).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#101A30]/80 border border-black/10 dark:border-blue-500/15"
                      >
                        <div className="text-[11px] font-mono text-neutral-700 dark:text-cyan-400 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </div>
                        <div className="text-xs text-neutral-800 dark:text-slate-200">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-slate-400 mb-3">
                  Engineered Capabilities & Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-neutral-900 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-slate-400 mb-2.5">
                  Verified Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-neutral-100 text-neutral-800 border border-black/10 dark:bg-[#101A30] dark:text-cyan-300 dark:border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 mt-4 border-t border-black/10 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-neutral-500 dark:text-slate-400 hidden sm:inline">
                Verified implementation repository
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 dark:text-slate-300 dark:hover:text-white dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-500 dark:hover:from-blue-500 dark:hover:to-cyan-400 shadow-md transition-all hover:scale-[1.02]"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
