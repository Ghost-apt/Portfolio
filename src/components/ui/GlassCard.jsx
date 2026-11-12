import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable glassmorphic card component with smooth hover state.
 */
export default function GlassCard({
  children,
  className = '',
  variant = 'card', // 'card' | 'hero'
  hover = true,
  ...props
}) {
  const variantClass = variant === 'hero' ? 'glass-hero-pill' : 'glass-panel';
  const hoverClass = hover ? 'glass-panel-hover' : '';

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 ${variantClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
