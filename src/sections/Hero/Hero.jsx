import React from 'react';
import AmbientBackground from '../../effects/ambient/AmbientBackground';
import HeroContent from './HeroContent';
import CurvedLine from './CurvedLine';
import TechnologyMarquee from './TechnologyMarquee';
import { useTheme } from '../../hooks/useTheme';
import './Hero.css';

/**
 * Hero - Full-viewport landing page with exact background design from index(1).html.
 * Layer 0: Solid black background (#030303 in Dark Mode, #FFFFFF in Light Mode)
 * Layer 1: Procedural WebGL fluid smoke canvas
 * Layer 2: Subtle hero vignette
 * Layer 3: Subtle monochromatic noise texture
 * Layer 4: Animated curved ambient line with traveling illuminated point
 * Content: Preserved centered typography, CTA buttons, and bottom technology marquee
 */
export default function Hero({ onOpenResume }) {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen w-full max-w-full flex flex-col justify-between items-center bg-[var(--bg-hero,#030303)] text-[var(--text-primary)] overflow-hidden pt-24 sm:pt-28 select-none z-10 transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#030303' : 'var(--bg-hero, #FFFFFF)' }}
    >
      {/* Layer 1: Real-time WebGL GPU Fluid Smoke from index(1).html */}
      <AmbientBackground />

      {/* Layer 2: Subtle Hero Vignette from index(1).html */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* Layer 3: Subtle Monochromatic Noise Texture from index(1).html */}
      <div className="noise" aria-hidden="true" />

      {/* Centered Typography & Hero Actions (Preserved intact) */}
      <div className="relative z-20 w-full flex justify-center">
        <HeroContent />
      </div>

      {/* Layer 4: Lower Section with Animated Curved Line & Technology Marquee */}
      <div className="relative z-20 w-full max-w-full min-w-0 overflow-hidden mt-auto" style={{ contain: 'paint' }}>
        <CurvedLine />
        <TechnologyMarquee />
      </div>
    </section>
  );
}
