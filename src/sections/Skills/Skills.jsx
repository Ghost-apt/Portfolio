import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Cpu, Database, Cloud, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { skillCategories } from '../../data/skills';
import './Skills.css';

const categoryIcons = {
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
  Database: Database,
  Cloud: Cloud,
};

/**
 * Skills - Verified technical competencies matrix.
 */
export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <section id="skills" className="skills-section relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <SectionHeading
        tag="03 // ARSENAL"
        title="Technical"
        highlight="Competencies."
        subtitle="A verified toolkit honed through hands-on development of scalable web platforms and intelligent AI systems."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className="relative px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-colors border border-blue-500/20"
        >
          {selectedCategory === 'all' && (
            <motion.div
              layoutId="activeSkillTabIndicator"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${selectedCategory === 'all' ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>
            All Domains
          </span>
        </button>
        {skillCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
            className="relative px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-colors border border-blue-500/20"
          >
            {selectedCategory === category.id && (
              <motion.div
                layoutId="activeSkillTabIndicator"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${selectedCategory === category.id ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>
              {category.title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCategories.map((cat, index) => {
            const Icon = categoryIcons[cat.icon] || Layout;

            return (
              <motion.div
                layout
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-3xl bg-[#0B1120]/80 border border-blue-500/20 p-6 sm:p-7 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#101A30] border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-white">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-mono text-cyan-400/80">
                        {cat.skills.length} core proficiencies
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8] mb-5 leading-relaxed font-sans">
                    {cat.description}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                          skill.highlight
                            ? 'bg-[#101A30] text-cyan-300 border border-cyan-400/30 hover:border-cyan-400'
                            : 'bg-slate-900/70 text-slate-300 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span>{skill.name}</span>
                        {skill.tag && (
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider ml-0.5">
                            {skill.tag}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-900/30 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Verified Competency</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Hands-on Tested
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
