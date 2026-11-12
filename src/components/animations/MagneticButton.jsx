import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * MagneticButton - Physics-based magnetic hover attraction wrapper.
 * Gently pulls towards the cursor on desktop; gracefully disables on touch/reduced motion.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (prefersReducedMotion) {
    return (
      <div className={`inline-block ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={animationConfig.springs.magnetic}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
