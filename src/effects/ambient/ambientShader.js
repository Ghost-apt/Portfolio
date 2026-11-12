/**
 * =====================================================================
 * GLSL SHADERS FOR CINEMATIC MONOCHROMATIC FLUID SMOKE
 * =====================================================================
 * Real-time GPU procedural volumetric smoke and liquid-silk simulation.
 * Exact recreation of the reference design (desktop-hero.png & mobile-hero.png):
 * - Pure black #000000 negative space across left and center
 * - Voluminous flowing liquid-silk smoke plume across the right
 * - Subtle atmospheric accent entering from the left edge
 * - High-contrast illuminated white/silver surfaces and dark crevice gaps
 * - Transparent alpha blending over solid CSS #000000 background
 * - Razor-sharp white headline readability
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

    // ===================================================================
    // EXACT SPATIAL FORMATION (Matching Reference Screenshot 2)
    // ===================================================================
    // 1. Right Plume: Primary volumetric smoke formation
    // Starts at st.x = 0.16 on desktop (allowing text to sit in pure black)
    float rightPlumeX = smoothstep(0.15, 0.48, st.x);
    float rightPlumeY = 1.0 - smoothstep(0.40 * u_blur_strength, 0.74 * u_blur_strength, abs(st.y));
    float rightPlume = rightPlumeX * rightPlumeY;

    // 2. Left Plume: Subtle dark atmospheric accent entering from the left edge
    float leftPlumeX = smoothstep(-0.55, -0.85, st.x);
    float leftPlumeY = 1.0 - smoothstep(0.35 * u_blur_strength, 0.65 * u_blur_strength, abs(st.y));
    float leftPlume = leftPlumeX * leftPlumeY * 0.28;

    // Combine spatial plume envelope
    float spatialMask = clamp(rightPlume + leftPlume, 0.0, 1.0);

    // 3. Typographic negative space shield: ensures headline reading zone remains pure black
    float textZone = length((st - vec2(-0.16, 0.02)) * vec2(1.2, 1.9));
    float textShield = smoothstep(0.12, 0.50, textZone);
    spatialMask *= textShield;

    // 4. Non-linear shaped turbulence for sculpted folds & deep crevices
    float shapedF = pow(f, 1.5);
    float rawRibbons = smoothstep(0.24, 0.72, shapedF);
    float density = rawRibbons * spatialMask * u_smoke_density;
    density = clamp(density, 0.0, 1.0);

    // If outside plume or in deep crevice, output 100% transparent black
    if (density <= 0.001) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }

    // ===================================================================
    // VOLUMETRIC NORMAL LIGHTING & SILK SPECULAR SHEEN
    // ===================================================================
    // Volumetric gradient from domain-warping flow vector r
    vec2 grad = (r - 0.5) * 2.0;
    vec3 normal = normalize(vec3(-grad.x * 2.4, -grad.y * 2.4, 0.45));

    // Directional Key Light from top-right (matches reference lighting angle)
    vec3 keyLightDir = normalize(vec3(0.55, 0.72, 0.48));
    float diffuse = clamp(dot(normal, keyLightDir), 0.0, 1.0);

    // Liquid Silk Specular Highlight (shininess 32.0 for razor-thin silk glints)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfVec = normalize(keyLightDir + viewDir);
    float spec = pow(clamp(dot(normal, halfVec), 0.0, 1.0), 32.0) * (u_highlight_intensity * 0.90);

    // Secondary Subtle Rim Light (bottom-left grazing fill)
    vec3 rimLightDir = normalize(vec3(-0.6, -0.4, 0.35));
    float rim = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 2.5) * clamp(dot(normal, rimLightDir), 0.0, 1.0);
    rim *= (u_highlight_intensity * 0.30);

    // ===================================================================
    // MONOCHROMATIC LUXURY COLOR RAMP (Matching Screenshot 2)
    // ===================================================================
    vec3 cShadowCrevice = vec3(0.05, 0.05, 0.065);
    vec3 cDarkGraphite  = vec3(0.18, 0.19, 0.23);
    vec3 cMidSilver     = vec3(0.50, 0.52, 0.58);
    vec3 cBrightSilver  = vec3(0.82, 0.85, 0.90);
    vec3 cWhite         = vec3(0.98, 0.99, 1.0);

    // Light-responsive base color: diffuse shapes the shadow/light balance
    float illumination = clamp(diffuse * 0.75 + 0.25, 0.0, 1.0);
    vec3 baseSmoke = mix(cShadowCrevice, cDarkGraphite, smoothstep(0.05, 0.35, density));
    baseSmoke = mix(baseSmoke, cMidSilver, smoothstep(0.30, 0.70, density * illumination));
    baseSmoke = mix(baseSmoke, cBrightSilver, smoothstep(0.65, 0.95, density * illumination));

    // Specular silk sheen on ridge peaks
    vec3 color = baseSmoke + cWhite * spec * density;
    color += cBrightSilver * rim * density * 0.4;
    color *= u_smoke_brightness;
    color = clamp(color, vec3(0.0), vec3(1.0));

    // Filmic high-frequency dithering only on active smoke to eliminate 8-bit banding
    float grain = (hash(gl_FragCoord.xy + fract(u_time * 0.3)) - 0.5) * 0.005;
    color += vec3(grain) * smoothstep(0.02, 0.25, density);
    color = clamp(color, vec3(0.0), vec3(1.0));

    // Alpha transparency:
    // Feathers smoothly into transparent black at edges and in crevices
    float alpha = smoothstep(0.02, 0.52, density) * u_smoke_opacity;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default { vertexShader, fragmentShader };
