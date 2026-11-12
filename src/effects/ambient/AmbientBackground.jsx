import React from 'react';
import FluidSmoke from './FluidSmoke';
import { ambientConfig } from './ambientUniforms';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * AmbientBackground - Top-level ambient controller.
 * Handles WebGL capability detection, graceful fallback, and motion accessibility.
 */
export default function AmbientBackground({
  config = ambientConfig,
  className = '',
  bgClass = 'bg-black',
}) {
  const isWebGLSupported = useWebGLSupport();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 w-full h-full ${bgClass} overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {isWebGLSupported ? (
        <FluidSmoke
          config={config}
          reducedMotion={prefersReducedMotion}
        />
      ) : (
        /* Graceful pure CSS monochromatic fallback */
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a0c] to-[#18181c]" />
      )}
    </div>
  );
}
