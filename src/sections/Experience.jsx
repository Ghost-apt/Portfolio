import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, CheckCircle2, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { experienceTimeline } from '../data/faq';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <SectionHeading
        tag="06 // TRAJECTORY"
        title="Experience &"
        highlight="Academic Foundation."
        subtitle="Structured milestones representing deep immersion in software engineering principles, machine learning research, and full-stack development."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Timeline Line */}
        <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-cyan-400/30 to-transparent" />

        <div className="space-y-8 sm:space-y-12">
          {experienceTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative flex flex-col sm:flex-row items-start gap-6 group"
            >
              {/* Timeline Icon Node */}
              <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-[#101A30] border border-blue-500/40 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all z-10 shrink-0 shadow-lg shadow-blue-950/50">
                {item.type.includes('Education') ? (
                  <GraduationCap className="w-6 h-6" />
                ) : item.type.includes('Milestones') ? (
                  <Award className="w-6 h-6" />
                ) : (
                  <Briefcase className="w-6 h-6" />
                )}
              </div>

              {/* Timeline Content Card */}
              <div className="flex-1 w-full rounded-3xl bg-[#0B1120] border border-blue-500/20 p-6 sm:p-8 hover:border-cyan-400/40 transition-all duration-300 shadow-xl group-hover:shadow-[0_10px_30px_-10px_rgba(34,211,238,0.12)]">
                {/* Header with period and status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#101A30] text-cyan-300 border border-blue-500/20">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {item.period}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item.status}
                  </span>
                </div>

                {/* Title & Organization */}
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {item.title}
                </h3>
                <p className="text-sm font-mono text-cyan-400/80 mb-4">
                  {item.organization}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-5 font-sans">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="pt-4 border-t border-blue-900/30 space-y-2">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
