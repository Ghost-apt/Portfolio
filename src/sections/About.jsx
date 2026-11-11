import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Brain, Compass, Terminal, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Accent Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101A30]/80 border border-blue-500/20 text-xs font-mono tracking-wider text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 // PROFESSIONAL IDENTITY</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.15]">
            Beyond the <span className="text-gradient-cyan">Code.</span>
          </h2>

          {/* Descriptions */}
          <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] font-sans leading-relaxed">
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Focus Areas Bullets */}
          <div className="pt-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-3">
              Core Engineering Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {personalInfo.focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#101A30] hover:bg-[#162244] border border-blue-500/30 hover:border-cyan-400/50 shadow-lg shadow-blue-950/40 transition-all hover:scale-105"
            >
              <span>Explore My Projects</span>
              <ArrowDown className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Abstract Developer Visual Card & Floating Badges */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Visual Card */}
          <div className="relative rounded-3xl bg-[#0B1120] border border-blue-500/25 p-6 sm:p-8 shadow-2xl overflow-hidden group">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10 opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Terminal Mockup Header */}
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/40 font-mono text-xs text-slate-400 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-cyan-400/80">anuragsingh.dev</span>
            </div>

            {/* Code / Architecture Matrix */}
            <div className="my-6 space-y-3 font-mono text-xs relative z-10">
              <div className="text-slate-400">
                <span className="text-blue-400">const</span> developer = &#123;
              </div>
              <div className="pl-4 space-y-1 text-slate-300">
                <div>name: <span className="text-cyan-300">"Anurag Singh"</span>,</div>
                <div>title: <span className="text-cyan-300">"Full Stack × AI/ML"</span>,</div>
                <div>mission: <span className="text-emerald-300">"Intelligent & Scalable Systems"</span>,</div>
                <div>frontend: [<span className="text-cyan-300">"React"</span>, <span className="text-cyan-300">"Tailwind"</span>],</div>
                <div>backend: [<span className="text-cyan-300">"Python"</span>, <span className="text-cyan-300">"Node"</span>, <span className="text-cyan-300">"Java"</span>],</div>
                <div>ai_core: [<span className="text-cyan-300">"GenAI"</span>, <span className="text-cyan-300">"RAG"</span>, <span className="text-cyan-300">"Vector Search"</span>]</div>
              </div>
              <div className="text-slate-400">&#125;;</div>
            </div>

            {/* Architecture Highlights Pill */}
            <div className="pt-4 border-t border-blue-900/30 flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Production Ready
              </span>
              <span>2026 Ready</span>
            </div>
          </div>

          {/* Floating Pill Badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-2 sm:-right-4 px-3.5 py-2 rounded-xl bg-[#101A30]/95 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-xl backdrop-blur-md flex items-center gap-2"
          >
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            <span>RAG & Vector Search</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 -left-2 sm:-left-4 px-3.5 py-2 rounded-xl bg-[#101A30]/95 border border-blue-500/40 text-xs font-mono text-blue-300 shadow-xl backdrop-blur-md flex items-center gap-2"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>Full Stack Artisan</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
