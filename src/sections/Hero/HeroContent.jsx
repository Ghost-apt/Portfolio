import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroButtons from './HeroButtons';
import { personalInfo } from '../../data/personalInfo';
import { containerStaggerVariants, itemFadeUpVariants } from '../../animations/animationVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * HeroContent - Center typography, introduction badge, description, and action triggers.
 * Enhanced with gentle scroll-driven parallax and staggered reveals.
 */
export default function HeroContent({ onExploreClick, onContactClick }) {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Gentle subtle parallax translation and fade
  const yParallax = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 55]);
  const opacityParallax = useTransform(scrollY, [0, 450], [1, prefersReducedMotion ? 1 : 0.35]);

  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center items-center my-auto py-8">
      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        variants={containerStaggerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center space-y-6 sm:space-y-7 max-w-3xl lg:-translate-x-12"
      >
        {/* Introduction Badge Pill */}
        <motion.div variants={itemFadeUpVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="uppercase">{personalInfo.heroBadge || personalInfo.tagline}</span>
          </div>
        </motion.div>

        {/* Oversized Centered Headline */}
        <motion.h1
          variants={itemFadeUpVariants}
          className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-light font-display tracking-tight text-white leading-[1.08] sm:leading-[1.06]"
        >
          {personalInfo.heroHeadingLine1 || "Building intelligent"}
          <span className="block font-normal text-white">
            {personalInfo.heroHeadingLine2 || "digital experiences."}
          </span>
        </motion.h1>

        {/* Supporting Bio Description */}
        <motion.p
          variants={itemFadeUpVariants}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-wide font-normal"
        >
          {personalInfo.heroSubtext}
        </motion.p>

        {/* Outlined Pill Action Buttons with Magnetic Physics */}
        <motion.div variants={itemFadeUpVariants} className="pt-2">
          <HeroButtons
            onExploreClick={onExploreClick}
            onContactClick={onContactClick}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
