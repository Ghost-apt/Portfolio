/**
 * =====================================================================
 * GLSL SHADERS FOR CINEMATIC MONOCHROMATIC FLUID SMOKE
 * =====================================================================
 * Real-time GPU procedural volumetric smoke and liquid-silk simulation.
 * Pure monochromatic luxury with dual theme support:
 * - Dark Mode (u_theme = 0.0): Deep pitch black (#000000) with charcoal/silver smoke
 * - Light Mode (u_theme = 1.0): Clean white (#FFFFFF) with soft silver/graphite smoke
 * - Shimmering specular highlights on surface normals
 * - Natural organic fluid flow across the screen
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
      fbm(p + vec2(0.0, 0.0) + vec2(flowT * 0.30, flowT * 0.16)),
      fbm(p + vec2(5.2, 1.3) + vec2(-flowT * 0.20, flowT * 0.26))
    );

    // Layer 2: Delicate flowing liquid-silk ribbons with domain warping
    float dist = u_distortion_strength;
    r = vec2(
      fbm(p + dist * q + vec2(1.7, 9.2) + vec2(flowT * 0.16, -flowT * 0.22) + mouseRipple),
      fbm(p + (dist * 0.92) * q + vec2(8.3, 2.8) + vec2(-flowT * 0.24, flowT * 0.12) - mouseRipple)
    );

    // Final recursive composition
    return fbm(p + (dist * 1.05) * r + vec2(flowT * 0.08, flowT * 0.14));
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

    // Dynamic Theme Canvas Base
    vec3 cBaseBg = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0), u_theme);

    // 3. Volumetric Plume Masks:
    // Main plume: graceful billow centered toward right/center
    vec2 plume1Pos = (st - vec2(0.25, -0.05)) * vec2(0.95, 1.4);
    float plume1 = 1.0 - smoothstep(0.20 * u_blur_strength, 0.95 * u_blur_strength, length(plume1Pos));

    // Secondary accent plume on left
    vec2 plume2Pos = (st - vec2(-0.45, 0.20)) * vec2(1.2, 1.5);
    float plume2 = 1.0 - smoothstep(0.15 * u_blur_strength, 0.70 * u_blur_strength, length(plume2Pos));

    float spatialEnvelope = clamp(plume1 * 1.0 + plume2 * 0.40, 0.0, 1.0);

    // Screen border vignette to guarantee pure background at edges
    float borderFade = 1.0 - smoothstep(0.70, 1.35, length(st * vec2(0.85, 1.05)));
    spatialEnvelope *= borderFade;

    // 4. Threshold turbulence into distinct smoke ribbons
    float ribbons = smoothstep(0.44, 0.76, f);
    float density = ribbons * spatialEnvelope * u_smoke_density;
    density = clamp(density, 0.0, 0.85);

    // Instant exit for void regions
    if (density <= 0.001) {
      gl_FragColor = vec4(cBaseBg, u_smoke_opacity);
      return;
    }

    // 5. Volumetric Surface Normal from Warp Vector r
    vec2 grad = (r - 0.5) * 2.0;
    vec3 normal = normalize(vec3(-grad.x * 1.8, -grad.y * 1.8, 0.60));

    // 6. Volumetric Directional Lighting
    // Key Light (top-right)
    vec3 keyLightDir = normalize(vec3(0.55, 0.70, 0.45));
    float diffuse = clamp(dot(normal, keyLightDir), 0.0, 1.0);

    // Specular Silk Reflection (shininess 48.0 for razor-thin glints on ridges)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfVec = normalize(keyLightDir + viewDir);
    float spec = pow(clamp(dot(normal, halfVec), 0.0, 1.0), 48.0) * (u_highlight_intensity * 0.75);

    // Rim Light (grazing angle)
    vec3 rimLightDir = normalize(vec3(-0.6, -0.4, 0.35));
    float rim = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 2.5) * clamp(dot(normal, rimLightDir), 0.0, 1.0);
    rim *= (u_highlight_intensity * 0.30);

    // 7. Theme-Calibrated Color Palettes
    // In Dark Mode: dark charcoal to metallic silver on pure black
    // In Light Mode: soft silvery-grey to graphite ribbons on pure white
    vec3 cCharcoal     = mix(vec3(0.045, 0.045, 0.052), vec3(0.93, 0.94, 0.96), u_theme);
    vec3 cMidGrey      = mix(vec3(0.18, 0.19, 0.22),     vec3(0.83, 0.85, 0.89), u_theme);
    vec3 cSilver       = mix(vec3(0.40, 0.42, 0.47),     vec3(0.70, 0.72, 0.77), u_theme);
    vec3 cSilkSilver   = mix(vec3(0.58, 0.60, 0.66),     vec3(0.58, 0.60, 0.66), u_theme);
    vec3 cSpecularSilk = mix(vec3(0.85, 0.88, 0.95),     vec3(0.96, 0.97, 1.00), u_theme);

    vec3 color = mix(cBaseBg, cCharcoal, smoothstep(0.0, 0.18, density));
    color = mix(color, cMidGrey, smoothstep(0.14, 0.50, density));
    color = mix(color, cSilver, smoothstep(0.45, 0.80, density));
    color = mix(color, cSilkSilver, smoothstep(0.75, 0.95, density));

    // Specular crests & subtle rim
    float lightMultiplier = mix(1.0, 0.6, u_theme);
    color += cSpecularSilk * spec * density * lightMultiplier;
    color += cSilver * rim * density * lightMultiplier;
    color += cMidGrey * diffuse * 0.10 * density * lightMultiplier;
    color *= u_smoke_brightness;

    // Filmic high-frequency dithering
    float grain = (hash(gl_FragCoord.xy + fract(u_time * 0.3)) - 0.5) * 0.005;
    color += vec3(grain) * smoothstep(0.02, 0.25, density);

    // Guard contrast ranges
    float maxClamp = mix(0.72, 1.00, u_theme);
    float minClamp = mix(0.00, 0.45, u_theme);
    color = clamp(color, vec3(minClamp), vec3(maxClamp));

    gl_FragColor = vec4(color, u_smoke_opacity);
  }
`;

export default { vertexShader, fragmentShader };
