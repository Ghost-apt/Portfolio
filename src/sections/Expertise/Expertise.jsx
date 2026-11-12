import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, ServerCog, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { expertiseAreas } from '../../data/expertise';
import './Expertise.css';

const iconMap = {
  Code2: Code2,
  Brain: Brain,
  ServerCog: ServerCog,
  Sparkles: Sparkles,
};

/**
 * Expertise - 4 core capability cards with dual theme support.
 */
export default function Expertise() {
  return (
    <section id="expertise" className="expertise-section relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        tag="02 // CAPABILITIES"
        title="What I"
        highlight="Do Best."
        subtitle="Bridging modern full-stack engineering with applied artificial intelligence to build dependable, high-performance digital systems."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {expertiseAreas.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Code2;

          return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-white dark:bg-[#0B1120]/90 border border-black/10 dark:border-blue-500/20 p-8 sm:p-10 hover:border-black/30 dark:hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 shadow-md dark:shadow-none hover:shadow-xl dark:hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.12)] overflow-hidden"
            >
              {/* Subtle dynamic background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Top Bar with Icon & Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-[#101A30] border border-black/10 dark:border-blue-500/30 flex items-center justify-center text-neutral-900 dark:text-cyan-400 group-hover:scale-110 group-hover:text-black dark:group-hover:text-cyan-300 transition-all duration-300 shadow-sm dark:shadow-lg dark:shadow-blue-950/30">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-neutral-300 dark:text-slate-700 group-hover:text-neutral-500 dark:group-hover:text-cyan-400/50 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-950 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-[#94A3B8] leading-relaxed transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="pt-4 border-t border-black/10 dark:border-blue-900/30 space-y-2 transition-colors duration-300">
                  {item.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
