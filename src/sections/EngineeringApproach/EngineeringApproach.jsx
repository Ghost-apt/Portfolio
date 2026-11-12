import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, GraduationCap, Cpu, Code2 } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { engineeringPrinciples } from '../../data/testimonials';
import './EngineeringApproach.css';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Target: Target,
  GraduationCap: GraduationCap,
  Cpu: Cpu,
};

/**
 * EngineeringApproach - "How I Approach Engineering" principles.
 */
export default function EngineeringApproach() {
  return (
    <section id="approach" className="engineering-approach-section relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        tag="07 // PHILOSOPHY"
        title="How I Approach"
        highlight="Engineering."
        subtitle="Foundational engineering tenets guiding every line of code, database schema, and machine learning pipeline I implement."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {engineeringPrinciples.map((principle, index) => {
          const Icon = iconMap[principle.icon] || Code2;

          return (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-3xl bg-white dark:bg-[#0B1120] border border-black/10 dark:border-blue-500/20 p-8 sm:p-9 hover:border-black/25 dark:hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between shadow-lg dark:shadow-xl hover:shadow-xl group hover:-translate-y-1"
            >
              <div>
                {/* Header with Icon and Tagline */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-[#101A30] border border-black/10 dark:border-blue-500/30 flex items-center justify-center text-neutral-800 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-neutral-950 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-cyan-300 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 dark:text-cyan-400/80">
                      {principle.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-600 dark:text-[#94A3B8] leading-relaxed mb-6 font-sans">
                  {principle.description}
                </p>
              </div>

              {/* Code Snippet / Architectural Contract */}
              <div className="rounded-xl bg-neutral-900 dark:bg-[#070D1D] border border-black/10 dark:border-blue-500/15 p-3.5 font-mono text-xs text-slate-300 overflow-x-auto">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
                  <span>core_rule.ts</span>
                  <span className="text-cyan-400">Strict Typing</span>
                </div>
                <pre className="text-cyan-300/90 whitespace-pre">
                  <code>{principle.codeSnippet}</code>
                </pre>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
