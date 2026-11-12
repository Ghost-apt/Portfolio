/**
 * =====================================================================
 * CENTRALIZED ANIMATION CONFIGURATION
 * =====================================================================
 * Single source of truth for UI motion curves, reveal timings, physics,
 * hover states, parallax strength, and scroll animations across the portfolio.
 */

export const animationConfig = {
  // 1. Global Durations (seconds)
  globalDuration: 0.65,
  pageTransitionSpeed: 0.5,
  hoverDuration: 0.3,

  // 2. Transition Easings (Cubic Bézier curves)
  transitionEasing: [0.16, 1, 0.3, 1], // Custom smooth quintic-like deceleration
  easings: {
    smoothOut: [0.16, 1, 0.3, 1],       // Primary entrance easing
    snappyOut: [0.22, 1, 0.36, 1],       // Quick responsive UI feedback
    easeInOut: [0.42, 0, 0.58, 1],       // Continuous ambient loop easing
  },

  // 3. Scroll Reveal Coordinates & Timing
  scrollRevealDistance: 28,             // Vertical translation offset (px) for scroll entrances
  staggerInterval: 0.1,                 // Stagger delay between child elements (seconds)

  // 4. Parallax Parameters
  parallaxStrength: 0.15,               // Scroll-driven background & typography translation multiplier

  // 5. Spring Physics Presets for Interactive Elements
  springs: {
    gentle: {
      type: "spring",
      stiffness: 220,
      damping: 28,
    },
    bouncy: {
      type: "spring",
      stiffness: 350,
      damping: 24,
    },
    magnetic: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.6,
    },
    modal: {
      type: "spring",
      stiffness: 320,
      damping: 30,
    },
  },

  // 6. Section Specific Timing Overrides
  hero: {
    initialDelay: 0.15,
    staggerDelay: 0.12,
    badgeDuration: 0.7,
    headingDuration: 0.9,
    buttonDelay: 0.45,
  },

  // 7. Curved Line Animation
  curvedLine: {
    primaryDuration: "9s",
    secondaryDuration: "14s",
  },

  // 8. Marquee Animation Speed (seconds for a full continuous loop)
  marqueeDuration: 32,
};

// Reusable Framer Motion variant builders
export const createFadeUpVariant = (
  distance = animationConfig.scrollRevealDistance,
  duration = animationConfig.globalDuration,
  ease = animationConfig.transitionEasing
) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
});

export const createStaggerVariant = (
  staggerChildren = animationConfig.staggerInterval,
  delayChildren = 0.1
) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export default animationConfig;
