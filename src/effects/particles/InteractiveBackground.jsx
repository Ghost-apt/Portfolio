import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * InteractiveBackground - Subtle ambient lighting and grid for lower portfolio sections.
 * Automatically adapts between Light Mode and Dark Mode.
 */
export default function InteractiveBackground() {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full max-w-full transition-opacity duration-500"
      style={{ contain: 'paint' }}
      aria-hidden="true"
    >
      {/* Subtle Grid Pattern */}
      <div className={`absolute inset-0 ${isDark ? 'bg-grid-pattern opacity-25' : 'opacity-10'}`} />

      {/* Primary Ambient Highlights */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-pulse-slow transition-opacity duration-500"
        style={{
          opacity: isDark ? 0.15 : 0.08,
          background: isDark
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(180, 180, 190, 0.04) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, rgba(100, 100, 110, 0.02) 40%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-[35%] -right-[15%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-slow transition-opacity duration-500"
        style={{
          opacity: isDark ? 0.10 : 0.06,
          background: isDark
            ? 'radial-gradient(circle, rgba(200, 205, 215, 0.10) 0%, rgba(120, 125, 135, 0.03) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.06) 0%, rgba(80, 85, 95, 0.02) 45%, transparent 70%)',
        }}
      />

      {/* Interactive Cursor Spotlight Glow (desktop only) */}
      <div
        className="hidden md:block absolute w-[700px] h-[700px] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] transition-opacity duration-500 pointer-events-none"
        style={{
          left: 'var(--mouse-x, 50vw)',
          top: 'var(--mouse-y, 50vh)',
          opacity: isDark ? 0.10 : 0.04,
          background: isDark
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(180, 180, 190, 0.05) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, rgba(80, 80, 90, 0.02) 45%, transparent 70%)',
        }}
      />
    </div>
  );
}
