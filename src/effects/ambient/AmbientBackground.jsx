import React from 'react';
import FluidSmoke from './FluidSmoke';
import { ambientConfig } from './ambientUniforms';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTheme } from '../../hooks/useTheme';

/**
 * AmbientBackground - Top-level ambient controller with dual theme support.
 * Handles WebGL capability detection, graceful fallback, and motion accessibility.
 */
export default function AmbientBackground({
  config = ambientConfig,
  className = '',
  bgClass = 'bg-black',
}) {
  const isWebGLSupported = useWebGLSupport();
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 transition-colors duration-300 ${isDark ? bgClass : 'bg-white'} ${className}`}
      style={{ backgroundColor: isDark ? '#000000' : '#FFFFFF' }}
      aria-hidden="true"
    >
      {isWebGLSupported ? (
        <FluidSmoke
          config={config}
          reducedMotion={prefersReducedMotion}
        />
      ) : (
        /* Graceful CSS monochromatic fallback */
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-tr from-black via-[#0a0a0c] to-[#18181c]'
              : 'bg-gradient-to-tr from-white via-[#f7f7f8] to-[#ededf0]'
          }`}
        />
      )}
    </div>
  );
}
