import React from 'react';
import AmbientBackground from '../../effects/ambient/AmbientBackground';
import HeroContent from './HeroContent';
import CurvedLine from './CurvedLine';
import TechnologyMarquee from './TechnologyMarquee';
import './Hero.css';

/**
 * Hero - Full-viewport landing page.
 * Composes independent ambient fluid smoke background, center content,
 * curved line with traveling bead, and bottom technology marquee.
 */
export default function Hero({ onOpenResume }) {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen w-full max-w-full flex flex-col justify-between items-center bg-black text-white overflow-hidden pt-24 sm:pt-28 select-none z-10"
    >
      {/* Real-time WebGL GPU Monochromatic Fluid Smoke */}
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
