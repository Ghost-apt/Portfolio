import React from 'react';
import { motion } from 'framer-motion';
import FluidBackground from '../components/FluidBackground';
import HeroButtons from '../components/HeroButtons';
import CurvedLine from '../components/CurvedLine';
import TechnologyMarquee from '../components/TechnologyMarquee';

export default function Hero({ onOpenResume }) {
  // Line-by-line reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-black text-white overflow-hidden pt-24 sm:pt-28 select-none z-10"
    >
      {/* Real-time WebGL GPU Monochromatic Fluid Smoke Background */}
      <FluidBackground />

      {/* Main Center Content Container */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-8 flex-1 flex flex-col justify-center items-center text-center my-auto py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-6 sm:space-y-7 max-w-4xl"
        >
          {/* Small Introduction Badge Pill */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-neutral-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="uppercase">FULL STACK DEVELOPER × AI/ML ENGINEER</span>
            </div>
          </motion.div>

          {/* Oversized Centered Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light font-display tracking-tight text-white leading-[1.08] sm:leading-[1.06]"
          >
            Building intelligent
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              digital experiences.
            </span>
          </motion.h1>

          {/* Supporting Bio Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-400 font-sans leading-relaxed tracking-wide font-normal"
          >
            I'm <span className="text-white font-medium">Anurag Singh</span> — a developer passionate about building scalable applications and intelligent AI-powered systems.
          </motion.p>

          {/* Outlined Pill-Style Action Buttons */}
          <motion.div variants={itemVariants} className="pt-2">
            <HeroButtons />
          </motion.div>
        </motion.div>
      </div>

      {/* Lower Hero Section: Animated Curved Line with Traveling Illuminated Point */}
      <div className="relative z-20 w-full mt-auto">
        <CurvedLine />
        {/* Technology Marquee along the bottom edge */}
        <TechnologyMarquee />
      </div>
    </section>
  );
}
