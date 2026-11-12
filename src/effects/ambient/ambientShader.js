/**
 * =====================================================================
 * GLSL SHADERS FOR CINEMATIC MONOCHROMATIC FLUID SMOKE
 * =====================================================================
 * Real-time GPU procedural volumetric smoke and liquid-silk simulation.
 * Pure monochromatic luxury with dual theme support and transparent compositing:
 * - Transparent alpha blending so the pure black (#000000) CSS canvas shines through
 * - Right Side: Large flowing silver-white liquid-silk formation with specular sheen
 * - Left Side: Secondary organic smoke plume entering the viewport
 * - Center: Organic fluid negative space keeping the main heading crisp, legible and haze-free
 * - Dual Theme:
 *     * Dark Mode (u_theme = 0.0): Deep black void with charcoal/silver/white ribbons
 *     * Light Mode (u_theme = 1.0): Pure white void with delicate graphite/silver ribbons
 * - Safe GLSL math (no NaN, strictly ordered smoothstep parameters)
 */

export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;

  // Viewport & Temporal Inputs
  uniform vec2  u_resolution;          // Canvas width & height in physical pixels
  uniform float u_time;                // Continuous elapsed simulation time (seconds)
  uniform vec2  u_mouse;               // Smoothed normalized cursor/touch coordinates [0.0 - 1.0]
  uniform float u_theme;               // 0.0 = Dark Mode, 1.0 = Light Mode

  // Centralized Control Uniforms
  uniform float u_animation_speed;     // Time multiplier for organic flow
  uniform float u_smoke_density;       // Base plume density multiplier
  uniform float u_smoke_opacity;       // Overall alpha blend against background
  uniform float u_smoke_brightness;    // Luminance multiplier for white/silver highlights
  uniform float u_smoke_contrast;      // Tonal threshold sharpness
  uniform float u_noise_scale;         // Spatial noise scale
  uniform float u_distortion_strength; // Domain warping displacement amplitude
  uniform float u_fluid_flow_speed;    // Internal drift vector velocity
  uniform float u_mouse_intensity;     // Interactive cursor displacement strength
  uniform float u_blur_strength;       // Soft Gaussian falloff multiplier
  uniform float u_highlight_intensity; // Specular silk reflection intensity

  varying vec2 vUv;

  // ===================================================================
  // PSEUDO-RANDOM HASH & NOISE CORE
  // ===================================================================
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  // Quintic-interpolated value noise (C1 continuous gradients)
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // 2D Rotation matrix to decorrelate successive noise octaves
  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  // ===================================================================
  // 6-OCTAVE FRACTAL BROWNIAN MOTION (FBM)
  // ===================================================================
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.52;
    mat2 rot = rotate2d(0.55);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = rot * p * 2.04 + vec2(2.1, 7.3);
      a *= 0.49;
    }
    return v;
  }

  // ===================================================================
  // MULTI-LAYER DOMAIN-WARPED FLUID PATTERN
  // ===================================================================
  float fluidPattern(vec2 p, out vec2 q, out vec2 r) {
    float t = u_time * u_animation_speed;

    // Interactive pointer displacement with smooth exponential falloff
    vec2 mouseOffset = (u_mouse - 0.5) * 0.85;
    float mouseDist = length(p - mouseOffset);
    vec2 mouseRipple = vec2(
      sin(mouseDist * 4.5 - u_time * 0.4),
      cos(mouseDist * 4.5 - u_time * 0.4)
    ) * 0.07 * exp(-mouseDist * 2.0) * u_mouse_intensity;

    // Layer 1: Broad volumetric drift
    float flowT = t * (u_fluid_flow_speed / 0.12);
    q = vec2(
      fbm(p + vec2(0.0, 0.0) + vec2(flowT * 0.28, flowT * 0.14)),
      fbm(p + vec2(5.2, 1.3) + vec2(-flowT * 0.18, flowT * 0.24))
    );

    // Layer 2: Domain-warped liquid-silk turbulence
    float dist = u_distortion_strength;
    r = vec2(
      fbm(p + dist * q + vec2(1.7, 9.2) + vec2(flowT * 0.14, -flowT * 0.20) + mouseRipple),
      fbm(p + (dist * 0.92) * q + vec2(8.3, 2.8) + vec2(-flowT * 0.22, flowT * 0.10) - mouseRipple)
    );

    // Final recursive composition
    return fbm(p + (dist * 1.08) * r + vec2(flowT * 0.07, flowT * 0.12));
  }

  void main() {
    // 1. Aspect-ratio normalized coordinates centered at (0, 0)
    float minDim = max(min(u_resolution.x, u_resolution.y), 1.0);
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / minDim;

    // 2. Spatial noise coordinate
    vec2 p = st * u_noise_scale;

    vec2 q;
    vec2 r;
    float f = fluidPattern(p, q, r);

    // =================================================================
    // 3. TARGET COMPOSITION PLUME MASKS
    // =================================================================
    // RIGHT SIDE: Large flowing silver-white liquid-silk formation
    vec2 plumeRightPos = (st - vec2(0.40, -0.02)) * vec2(1.0, 1.25);
    float plumeRight = 1.0 - smoothstep(0.22 * u_blur_strength, 0.98 * u_blur_strength, length(plumeRightPos));

    // LEFT SIDE: Smaller organic smoke formation entering the viewport
    vec2 plumeLeftPos = (st - vec2(-0.52, 0.16)) * vec2(1.20, 1.40);
    float plumeLeft = 1.0 - smoothstep(0.14 * u_blur_strength, 0.74 * u_blur_strength, length(plumeLeftPos));

    // CENTER: Deep black negative space around the main heading
    // Perturbed by fluid displacement 'r' for an organic, liquid smoke wrap
    vec2 centerOffset = st + (r - 0.5) * 0.22;
    float centerDist = length(centerOffset * vec2(1.22, 1.80));
    float centerNegativeSpace = smoothstep(0.18, 0.78, centerDist);

    // Combine plumes with organic center negative space cutout
    float spatialEnvelope = (plumeRight * 1.15 + plumeLeft * 0.60) * centerNegativeSpace;
    spatialEnvelope = clamp(spatialEnvelope, 0.0, 1.0);

    // Soft perimeter screen border fade to keep edges pure
    float borderFade = 1.0 - smoothstep(0.70, 1.30, length(st * vec2(0.85, 1.10)));
    spatialEnvelope *= borderFade;

    // 4. Threshold turbulence into distinct, silky fluid ribbons
    float ribbons = smoothstep(0.38, 0.74, f);
    float density = ribbons * spatialEnvelope * u_smoke_density;
    density = clamp(density, 0.0, 1.0);

    // Instant exit for negative space / void regions (100% transparent)
    if (density <= 0.002) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }

    // =================================================================
    // 5. SURFACE NORMAL & VOLUMETRIC DIRECTIONAL LIGHTING
    // =================================================================
    vec2 grad = (r - 0.5) * 2.0;
    vec3 normal = normalize(vec3(-grad.x * 2.2, -grad.y * 2.2, 0.55));

    // Key Light from top-right for luminous dimensional sheen
    vec3 keyLightDir = normalize(vec3(0.58, 0.75, 0.45));
    float diffuse = clamp(dot(normal, keyLightDir), 0.0, 1.0);

    // Specular Silk Reflection for shimmering highlights on ridges
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfVec = normalize(keyLightDir + viewDir);
    float spec = pow(clamp(dot(normal, halfVec), 0.0, 1.0), 36.0) * (u_highlight_intensity * 0.95);

    // Grazing angle rim light
    vec3 rimLightDir = normalize(vec3(-0.65, -0.35, 0.40));
    float rim = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 2.8) * clamp(dot(normal, rimLightDir), 0.0, 1.0);
    rim *= (u_highlight_intensity * 0.35);

    // =================================================================
    // 6. DUAL THEME COLOR PALETTES
    // =================================================================
    // DARK MODE: Rich charcoal base, lustrous silver ribbons, shimmering white crests
    vec3 cDarkCharcoal = vec3(0.08, 0.09, 0.11);
    vec3 cDarkSlate    = vec3(0.24, 0.26, 0.30);
    vec3 cDarkSilver   = vec3(0.60, 0.64, 0.72);
    vec3 cDarkWhite    = vec3(0.92, 0.95, 1.00);

    vec3 darkSmokeColor = mix(cDarkCharcoal, cDarkSlate, smoothstep(0.05, 0.40, density));
    darkSmokeColor = mix(darkSmokeColor, cDarkSilver, smoothstep(0.35, 0.75, density));
    darkSmokeColor = mix(darkSmokeColor, cDarkWhite, smoothstep(0.70, 0.98, density));
    darkSmokeColor += cDarkWhite * spec * density;
    darkSmokeColor += cDarkSilver * rim * density;
    darkSmokeColor += cDarkSlate * diffuse * 0.15 * density;
    darkSmokeColor *= u_smoke_brightness;

    // LIGHT MODE: Soft silver & graphite ribbons on white
    vec3 cLightSilver   = vec3(0.72, 0.74, 0.78);
    vec3 cLightGraphite = vec3(0.42, 0.45, 0.50);
    vec3 lightSmokeColor = mix(cLightSilver, cLightGraphite, smoothstep(0.20, 0.85, density));
    lightSmokeColor *= (u_smoke_brightness * 0.92);

    // Interpolate between dark and light by u_theme
    vec3 finalColor = mix(darkSmokeColor, lightSmokeColor, u_theme);

    // Filmic subtle dither to eliminate banding
    float grain = (hash(gl_FragCoord.xy + fract(u_time * 0.25)) - 0.5) * 0.006;
    finalColor += vec3(grain) * smoothstep(0.05, 0.40, density);

    // =================================================================
    // 7. COMPOSITED TRANSPARENT ALPHA
    // =================================================================
    float darkAlpha  = smoothstep(0.02, 0.85, density) * 0.88 * u_smoke_opacity;
    float lightAlpha = smoothstep(0.03, 0.90, density) * 0.38 * u_smoke_opacity;
    float finalAlpha = mix(darkAlpha, lightAlpha, u_theme);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export default { vertexShader, fragmentShader };
