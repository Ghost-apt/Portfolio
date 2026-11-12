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
    <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-8 flex-1 flex flex-col justify-center items-center text-center my-auto py-8">
      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        variants={containerStaggerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center space-y-6 sm:space-y-7 max-w-4xl"
      >
        {/* Introduction Badge Pill */}
        <motion.div variants={itemFadeUpVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="uppercase">{personalInfo.heroBadge || personalInfo.tagline}</span>
          </div>
        </motion.div>

        {/* Oversized Centered Headline with Staggered Line Reveal */}
        <motion.h1
          variants={itemFadeUpVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light font-display tracking-tight text-white leading-[1.08] sm:leading-[1.06] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        >
          <motion.span
            className="block"
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {personalInfo.heroHeadingLine1 || "Building intelligent"}
          </motion.span>
          <motion.span
            className="block font-normal text-white"
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {personalInfo.heroHeadingLine2 || "digital experiences."}
          </motion.span>
        </motion.h1>

        {/* Supporting Bio Description */}
        <motion.p
          variants={itemFadeUpVariants}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-wide font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
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
