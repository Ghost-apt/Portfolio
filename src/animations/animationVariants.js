import { animationConfig } from '../config/animationConfig';

/**
 * =====================================================================
 * FRAMER MOTION ANIMATION VARIANTS
 * =====================================================================
 * Reusable animation variant presets connected to centralized animationConfig.
 */

export const containerStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.staggerInterval,
      delayChildren: animationConfig.hero.initialDelay,
    },
  },
};

export const itemFadeUpVariants = {
  hidden: { opacity: 0, y: animationConfig.scrollRevealDistance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.globalDuration,
      ease: animationConfig.transitionEasing,
    },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: animationConfig.globalDuration,
      ease: animationConfig.transitionEasing,
    },
  },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationConfig.globalDuration,
      ease: animationConfig.transitionEasing,
    },
  },
};

export default {
  containerStaggerVariants,
  itemFadeUpVariants,
  fadeInVariants,
  scaleUpVariants,
};
