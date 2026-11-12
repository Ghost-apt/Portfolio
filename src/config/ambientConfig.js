/**
 * =====================================================================
 * CENTRALIZED AMBIENT FLUID SMOKE CONFIGURATION
 * =====================================================================
 * Single source of truth for tuning the real-time GPU WebGL smoke simulation.
 * Adjust these values to modify fluid dynamics, luminance, turbulence,
 * lighting, and adaptive hardware quality without modifying shader math.
 */

export const ambientConfig = {
  // 1. Animation Speed: Controls the rate of internal temporal evolution.
  // Higher = faster churning smoke; Lower = slow, majestic silk drift.
  animationSpeed: 0.065,

  // 2. Smoke Density: Base volume and plume fullness multiplier.
  // Higher = thicker, denser billows; Lower = ethereal, diaphanous haze.
  smokeDensity: 1.15,

  // 3. Smoke Opacity: Overall alpha transparency blending with pure black canvas.
  smokeOpacity: 1.0,

  // 4. Smoke Brightness: Multiplier scaling the brightest white/silver highlights.
  smokeBrightness: 1.08,

  // 5. Smoke Contrast: Steepness of the tonal threshold curve between deep black
  // voids and bright silk ridges.
  smokeContrast: 0.88,

  // 6. Noise Scale: Spatial frequency of the fractal noise field.
  // Smaller = massive volumetric clouds; Larger = intricate fine tendrils.
  noiseScale: 2.05,

  // 7. Distortion Strength: Amplitude of recursive domain-warping vectors.
  // Higher = intense chaotic eddies and swirling silk ribbons; Lower = gentle ripples.
  distortionStrength: 3.2,

  // 8. Fluid Flow Speed: Rate of horizontal drift vector across the screen.
  fluidFlowSpeed: 0.12,

  // 9. Mouse Influence: Sensitivity of the smoke to cursor and touch displacement.
  mouseInfluence: 0.85,

  // 10. Blur Strength: Soft Gaussian falloff multiplier on plume boundaries.
  blurStrength: 1.2,

  // 11. Highlight Intensity: Specular reflection sheen along normal ridges.
  // Produces the liquid-mercury / flowing silk highlights from reference videos.
  highlightIntensity: 0.45,

  // 12. Mobile Quality Preset: Optimized for mobile and battery conservation.
  mobileQuality: {
    maxDpr: 1.25,        // Clamps DPR to 1.25 on handheld screens
    noiseOctaves: 4,     // Reduced octaves for lower fragment fill cost
    speedMultiplier: 0.9,// Slightly calmer speed on mobile
  },

  // 13. Desktop Quality Preset: Full fidelity for high-resolution displays.
  desktopQuality: {
    maxDpr: 1.5,         // Clamped to 1.5 to protect 4K retina displays
    noiseOctaves: 6,     // Full 6-octave Fractal Brownian Motion
    speedMultiplier: 1.0,// Standard flow speed
  },

  // Closing CTA Preset (Tailored for the bottom contact section)
  ctaSection: {
    animationSpeed: 0.045,
    smokeDensity: 0.85,
    smokeOpacity: 0.75,
    smokeBrightness: 0.95,
    smokeContrast: 0.82,
    noiseScale: 1.85,
    distortionStrength: 2.6,
    mouseInfluence: 0.5,
    highlightIntensity: 0.35,
  },
};

export const ambientUniformDefaults = ambientConfig;
export default ambientConfig;
