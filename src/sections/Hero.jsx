import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, FileText, Code2, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Hero({ onOpenResume }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden"
    >
      {/* Large Blurred Glowing Orb centered directly behind typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-cyan-400/20 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* Floating Decorative Badges */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden lg:flex items-center gap-2 absolute top-36 left-12 px-3.5 py-1.5 rounded-full bg-[#101A30]/80 border border-blue-500/20 backdrop-blur-md text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/20 animate-float-slow"
      >
        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
        <span>Full-Stack Systems</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:flex items-center gap-2 absolute top-44 right-14 px-3.5 py-1.5 rounded-full bg-[#101A30]/80 border border-cyan-500/20 backdrop-blur-md text-xs font-mono text-blue-300 shadow-lg shadow-blue-950/20 animate-float-reverse"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>GenAI & RAG Architecture</span>
      </motion.div>

      {/* Hero Badge Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101A30]/90 border border-cyan-400/30 text-xs font-mono tracking-widest text-cyan-300 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.15)]"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="w-2 h-2 rounded-full bg-cyan-400 absolute" />
        <span className="ml-1 uppercase font-semibold">{personalInfo.tagline}</span>
      </motion.div>

      {/* Main Heading & Oversized Name */}
      <div className="max-w-5xl mx-auto space-y-3">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg sm:text-2xl md:text-3xl font-medium text-slate-300 font-display tracking-tight"
        >
          {personalInfo.heroHeading}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight text-white leading-none selection:bg-cyan-500/30"
        >
          <span className="inline-block text-gradient">
            ANURAG
          </span>{' '}
          <span className="inline-block text-gradient-cyan">
            SINGH
          </span>
        </motion.h1>
      </div>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-[#94A3B8] leading-relaxed font-sans"
      >
        {personalInfo.heroSubtext}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        {/* Explore Work */}
        <a
          href="#projects"
          className="px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
        >
          <span>Explore My Work</span>
          <ArrowDown className="w-4 h-4 text-cyan-200 group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* Let's Connect */}
        <a
          href="#contact"
          className="px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 bg-[#101A30]/80 hover:bg-[#162244] border border-blue-500/25 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <span>Let's Connect</span>
          <ArrowUpRight className="w-4 h-4 text-cyan-400" />
        </a>

        {/* Download Resume Button */}
        <button
          onClick={onOpenResume}
          className="px-5 py-3.5 rounded-full text-sm font-medium text-slate-300 hover:text-white bg-transparent border border-slate-700/60 hover:border-slate-500 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Resume</span>
        </button>
      </motion.div>

      {/* Status indicator pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-slate-400"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Available for High-Impact Roles & Innovative Projects</span>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1.5,
          delay: 0.8,
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
      </motion.div>
    </section>
  );
}
