import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

/**
 * ResumeModal - Interactive printable and downloadable resume viewer.
 */
export default function ResumeModal({ isOpen, onClose }) {
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

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Resume and Developer Profile Dialog"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#0B1120] border border-black/15 dark:border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col text-neutral-900 dark:text-slate-100"
        >
          {/* Action Toolbar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 dark:border-slate-800 print:hidden">
            <span className="text-xs font-mono text-neutral-800 dark:text-cyan-400 font-semibold tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-cyan-400 animate-pulse" />
              VERIFIED DEVELOPER PROFILE
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white transition-colors border border-black/10 dark:border-slate-700"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-neutral-700 dark:text-cyan-400" />
                <span>Print / Save PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Close resume view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div className="overflow-y-auto space-y-6 pr-2 font-sans print:text-black">
            {/* Header */}
            <div className="border-b border-black/10 dark:border-slate-800 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 dark:text-white tracking-tight">
                    {personalInfo.name}
                  </h2>
                  <p className="text-sm font-mono text-neutral-700 dark:text-cyan-400 font-medium mt-0.5">
                    {personalInfo.professionalTitle || personalInfo.title}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-neutral-700 dark:text-cyan-400" />
                    {personalInfo.email}
                  </span>
                  <span>•</span>
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-cyan-400 mb-2 font-semibold">
                Professional Profile
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
                Full Stack Developer and AI/ML Engineer with a deep passion for designing scalable applications, intelligent systems, and high-performance digital architectures. Hands-on expertise integrating modern frontend interfaces (React) with robust backend microservices (Python, Node.js, Java) and cutting-edge AI technologies including Generative AI, RAG, and vector search.
              </p>
            </div>

            {/* Technical Skills Matrix */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-cyan-400 mb-2.5 font-semibold">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-[#101A30]/80 border border-black/10 dark:border-blue-500/15">
                  <span className="font-mono text-neutral-900 dark:text-cyan-300 font-semibold block mb-0.5">Frontend:</span>
                  <span className="text-neutral-700 dark:text-slate-300">React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Design</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-[#101A30]/80 border border-black/10 dark:border-blue-500/15">
                  <span className="font-mono text-neutral-900 dark:text-cyan-300 font-semibold block mb-0.5">Backend:</span>
                  <span className="text-neutral-700 dark:text-slate-300">Python, Java, Node.js, Express.js, REST APIs, System Architecture</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-[#101A30]/80 border border-black/10 dark:border-blue-500/15">
                  <span className="font-mono text-neutral-900 dark:text-cyan-300 font-semibold block mb-0.5">AI / Machine Learning:</span>
                  <span className="text-neutral-700 dark:text-slate-300">Generative AI, RAG Systems, Vector Search, Embeddings, NLP, SVM, AI Integration</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-[#101A30]/80 border border-black/10 dark:border-blue-500/15">
                  <span className="font-mono text-neutral-900 dark:text-cyan-300 font-semibold block mb-0.5">Databases & Cloud:</span>
                  <span className="text-neutral-700 dark:text-slate-300">MongoDB, SQL (Relational Design & ACID), AWS, Google Cloud, Git</span>
                </div>
              </div>
            </div>

            {/* Key Engineering Projects */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-cyan-400 mb-2.5 font-semibold">
                Featured Engineering Projects
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101A30]/60 border border-black/10 dark:border-blue-500/15">
                  <div className="flex justify-between items-baseline font-display font-semibold text-neutral-950 dark:text-white">
                    <span>SmartCampus-AI</span>
                    <span className="text-[11px] font-mono text-neutral-600 dark:text-cyan-400">React • Node • Express • Mongo • Python AI</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-slate-300 mt-1">
                    Engineered an intelligent university platform integrating academic administration with a 24/7 AI student assistant and personalized learning recommendations.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101A30]/60 border border-black/10 dark:border-blue-500/15">
                  <div className="flex justify-between items-baseline font-display font-semibold text-neutral-950 dark:text-white">
                    <span>AI-Powered Resume Shortlisting System</span>
                    <span className="text-[11px] font-mono text-neutral-600 dark:text-cyan-400">Python • ML • NLP • Embeddings • Vector Search</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-slate-300 mt-1">
                    Built a resume parser and semantic scoring engine evaluating candidate alignment against job descriptions with high-accuracy vector similarity.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101A30]/60 border border-black/10 dark:border-blue-500/15">
                  <div className="flex justify-between items-baseline font-display font-semibold text-neutral-950 dark:text-white">
                    <span>Graph RAG Benchmark</span>
                    <span className="text-[11px] font-mono text-neutral-600 dark:text-cyan-400">GenAI • Graph RAG • Embeddings • Python</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-slate-300 mt-1">
                    AI research framework exploring knowledge graph traversal and vector search synergies for multi-hop retrieval queries and context optimization.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101A30]/60 border border-black/10 dark:border-blue-500/15">
                  <div className="flex justify-between items-baseline font-display font-semibold text-neutral-950 dark:text-white">
                    <span>Bank Management System</span>
                    <span className="text-[11px] font-mono text-neutral-600 dark:text-cyan-400">Java • SQL • ACID Architecture • Security</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-slate-300 mt-1">
                    Developed enterprise banking application managing accounts, secure transactions, and historical ledgers with strict SQL ACID guarantees.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Core Competencies */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-cyan-400 mb-2 font-semibold">
                Education & CS Foundations
              </h3>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101A30]/60 border border-black/10 dark:border-blue-500/15 text-xs sm:text-sm">
                <div className="font-semibold text-neutral-950 dark:text-white">Computer Science & Engineering Studies</div>
                <div className="text-xs text-neutral-600 dark:text-slate-400 mt-0.5">
                  Focus: Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Software Engineering, AI & Machine Learning.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
