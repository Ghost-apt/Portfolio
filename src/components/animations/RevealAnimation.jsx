import React from 'react';
import { motion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * RevealAnimation - Scroll-triggered entrance animation wrapper.
 */
export default function RevealAnimation({
  children,
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = animationConfig.scrollRevealDistance,
  duration = animationConfig.globalDuration,
  className = '',
  once = true,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const offsetMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = offsetMap[direction] || offsetMap.up;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialOffset.x, y: initialOffset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: animationConfig.transitionEasing,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
