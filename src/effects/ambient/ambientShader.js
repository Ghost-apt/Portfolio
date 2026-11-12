/**
 * =====================================================================
 * GLSL SHADERS FOR CINEMATIC MONOCHROMATIC FLUID SMOKE
 * =====================================================================
 * Real-time GPU procedural volumetric smoke and liquid-silk simulation.
 * Features:
 * - 6-octave Fractal Brownian Motion (FBM) with rotated harmonic octaves
 * - Dual recursive domain warping (Inigo Quilez algorithm)
 * - Volumetric finite-difference normal estimation
 * - Dual directional lighting (key light + silver rim light)
 * - Spatial density masking & typographic negative space shield
 * - Filmic high-frequency dithering to prevent 8-bit banding
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

  // Centralized Control Uniforms
  uniform float u_animation_speed;     // Time multiplier for organic flow
  uniform float u_smoke_density;       // Base plume density multiplier
  uniform float u_smoke_opacity;       // Overall alpha blend against pure black
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
    vec2 mouseOffset = (u_mouse - 0.5) * 0.75;
    float mouseDist = length(p - mouseOffset);
    vec2 mouseRipple = vec2(
      sin(mouseDist * 4.5 - u_time * 0.35),
      cos(mouseDist * 4.5 - u_time * 0.35)
    ) * 0.06 * exp(-mouseDist * 2.2) * u_mouse_intensity;

    // Layer 1: Broad volumetric ocean of smoke
    float flowT = t * (u_fluid_flow_speed / 0.12);
    q = vec2(
      fbm(p + vec2(0.0, 0.0) + vec2(flowT * 0.32, flowT * 0.18)),
      fbm(p + vec2(5.2, 1.3) + vec2(-flowT * 0.22, flowT * 0.28))
    );

    // Layer 2: Delicate flowing liquid-silk ribbons with domain warping
    float dist = u_distortion_strength;
    r = vec2(
      fbm(p + dist * q + vec2(1.7, 9.2) + vec2(flowT * 0.18, -flowT * 0.25) + mouseRipple),
      fbm(p + (dist * 0.92) * q + vec2(8.3, 2.8) + vec2(-flowT * 0.28, flowT * 0.14) - mouseRipple)
    );

    // Final recursive composition
    return fbm(p + (dist * 1.05) * r + vec2(flowT * 0.09, flowT * 0.16));
  }

  void main() {
    // Aspect-ratio normalized coordinates centered at (0, 0)
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Scale space by noiseScale
    vec2 p = st * u_noise_scale;

    vec2 q;
    vec2 r;
    float f = fluidPattern(p, q, r);

    // ===================================================================
    // SPATIAL MASKS & TYPOGRAPHIC SHIELD
    // ===================================================================
    // 1. Right plume: dominant smoke mass flowing behind headline
    float rightPlume = smoothstep(-0.25 / u_blur_strength, 0.85 * u_blur_strength, st.x + 0.15) * 1.25;
    rightPlume *= smoothstep(1.35 * u_blur_strength, 0.35 / u_blur_strength, abs(st.y));

    // 2. Left plume: secondary soft accent formation
    float leftPlume = smoothstep(-0.2 / u_blur_strength, 0.9 * u_blur_strength, -st.x - 0.2) * 0.55;
    leftPlume *= smoothstep(1.25 * u_blur_strength, 0.3 / u_blur_strength, abs(st.y));

    // Combined spatial envelope
    float spatialMask = clamp(rightPlume + leftPlume, 0.0, 1.3);

    // 3. Typographic negative space shield: protects headline and buttons
    float centerDistX = abs(st.x) * 1.4;
    float centerDistY = abs(st.y) * 1.9;
    float centerDist = sqrt(centerDistX * centerDistX + centerDistY * centerDistY);
    float centerReadability = smoothstep(0.20, 0.95, centerDist);
    centerReadability = mix(0.12, 1.0, centerReadability);

    // Total fluid density field scaled by smokeDensity and contrast
    float density = f * spatialMask * centerReadability * u_smoke_density;
    density = smoothstep(0.08, u_smoke_contrast, density);

    // ===================================================================
    // VOLUMETRIC NORMAL LIGHTING & SILK SHEEN
    // ===================================================================
    // Finite difference surface normal approximation
    float eps = 0.015;
    vec2 dummyQ, dummyR;
    float dX = fluidPattern(p + vec2(eps, 0.0), dummyQ, dummyR) - fluidPattern(p - vec2(eps, 0.0), dummyQ, dummyR);
    float dY = fluidPattern(p + vec2(0.0, eps), dummyQ, dummyR) - fluidPattern(p - vec2(0.0, eps), dummyQ, dummyR);
    vec3 normal = normalize(vec3(-dX * 1.6, -dY * 1.6, 0.14));

    // Primary Key Light (Top-right illumination)
    vec3 keyLightDir = normalize(vec3(0.55, 0.75, 0.5));
    float diffuse = clamp(dot(normal, keyLightDir), 0.0, 1.0);

    // Liquid Silk Specular Highlight
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfVec = normalize(keyLightDir + viewDir);
    float spec = pow(clamp(dot(normal, halfVec), 0.0, 1.0), 12.0) * (u_highlight_intensity * 0.75);

    // Secondary Subtle Rim Light (Bottom-left grazing fill)
    vec3 rimLightDir = normalize(vec3(-0.5, -0.4, 0.35));
    float rim = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 3.0) * clamp(dot(normal, rimLightDir), 0.0, 1.0);
    rim *= (u_highlight_intensity * 0.45);

    // ===================================================================
    // MONOCHROMATIC LUXURY COLOR RAMP
    // ===================================================================
    vec3 cDeepBlack = vec3(0.0, 0.0, 0.0);
    vec3 cCharcoal  = vec3(0.035, 0.035, 0.042);
    vec3 cMidGrey   = vec3(0.22, 0.23, 0.26);
    vec3 cSilver    = vec3(0.66, 0.68, 0.72);
    vec3 cWhite     = vec3(0.94, 0.95, 0.98);

    vec3 color = mix(cDeepBlack, cCharcoal, smoothstep(0.0, 0.20, density));
    color = mix(color, cMidGrey, smoothstep(0.18, 0.52, density));
    color = mix(color, cSilver, smoothstep(0.46, 0.80, density));
    color = mix(color, cWhite, smoothstep(0.74, 1.0, density));

    // Lighting contributions
    color += cWhite * spec * density;
    color += cSilver * rim * density;
    color += cSilver * diffuse * 0.12 * density;
    color *= u_smoke_brightness;

    // Filmic high-frequency dithering to prevent 8-bit banding on dark gradients
    float grain = (hash(gl_FragCoord.xy + fract(u_time * 0.5)) - 0.5) * 0.009;
    color += vec3(grain);

    // Edge vignette
    float vig = 1.0 - smoothstep(0.75, 1.5, length(st * vec2(0.9, 1.0)));
    color *= vig;

    gl_FragColor = vec4(color, u_smoke_opacity);
  }
`;

export default { vertexShader, fragmentShader };
