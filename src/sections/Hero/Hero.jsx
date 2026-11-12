import React from 'react';
import AmbientBackground from '../../effects/ambient/AmbientBackground';
import HeroContent from './HeroContent';
import CurvedLine from './CurvedLine';
import TechnologyMarquee from './TechnologyMarquee';
import { useTheme } from '../../hooks/useTheme';
import './Hero.css';

/**
 * Hero - Full-viewport landing page with dual theme support.
 * Composes independent ambient fluid smoke background, center content,
 * curved line with traveling bead, and bottom technology marquee.
 */
export default function Hero({ onOpenResume }) {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen w-full max-w-full flex flex-col justify-between items-center bg-white dark:bg-black text-neutral-950 dark:text-white overflow-hidden pt-24 sm:pt-28 select-none z-10 transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#000000' : '#FFFFFF' }}
    >
      {/* Real-time WebGL GPU Fluid Smoke (Theme-Adaptive) */}
      <AmbientBackground />

      {/* Centered Typography & Hero Actions */}
      <HeroContent />

      {/* Lower Section: Curved Line with Traveling Illuminated Point & Ticker */}
      <div className="relative z-20 w-full max-w-full min-w-0 overflow-hidden mt-auto" style={{ contain: 'paint' }}>
        <CurvedLine />
        <TechnologyMarquee />
      </div>
    </section>
  );
}
