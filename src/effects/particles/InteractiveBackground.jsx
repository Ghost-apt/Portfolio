import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground - Subtle ambient lighting and grid for lower portfolio sections.
 */
export default function InteractiveBackground() {
  const containerRef = useRef(null);

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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full max-w-full"
      style={{ contain: 'paint' }}
      aria-hidden="true"
    >
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette" />

      {/* Primary Blurred Glowing Orbs */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full opacity-35 blur-[130px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, #3B82F6 0%, #1D4ED8 40%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-[35%] -right-[15%] w-[600px] h-[600px] rounded-full opacity-25 blur-[140px] animate-float-slow"
        style={{
          background: 'radial-gradient(circle, #22D3EE 0%, #6366F1 45%, transparent 70%)',
        }}
      />

      <div
        className="absolute bottom-[10%] left-[5%] w-[550px] h-[550px] rounded-full opacity-25 blur-[120px] animate-float-reverse"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, #0B1120 60%, transparent 75%)',
        }}
      />

      {/* Interactive Cursor Spotlight Glow (desktop only) */}
      <div
        className="hidden md:block absolute w-[700px] h-[700px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] transition-opacity duration-500 pointer-events-none"
        style={{
          left: 'var(--mouse-x, 50vw)',
          top: 'var(--mouse-y, 50vh)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(34, 211, 238, 0.15) 45%, transparent 70%)',
        }}
      />
    </div>
  );
}
