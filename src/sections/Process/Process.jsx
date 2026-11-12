import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Layers, Code, Zap } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { processSteps } from '../../data/process';
import './Process.css';

const iconMap = {
  Compass: Compass,
  Layers: Layers,
  Code: Code,
  Zap: Zap,
};

/**
 * Process - 4-stage engineering methodology lifecycle.
 */
export default function Process() {
  return (
    <section id="process" className="process-section relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        tag="05 // METHODOLOGY"
        title="Engineering"
        highlight="Process."
        subtitle="A disciplined 4-stage lifecycle ensuring architectural elegance, low-latency execution, and dependable product delivery."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {processSteps.map((step, index) => {
          const Icon = iconMap[step.icon] || Compass;

          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-[#0B1120] border border-blue-500/20 p-7 sm:p-8 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
            >
              {/* Top ambient hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#101A30] border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mt-1 mb-4">
                  {step.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              {/* Progress Indicator Accent */}
              <div className="mt-8 pt-4 border-t border-blue-900/30 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Phase {step.step}</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
