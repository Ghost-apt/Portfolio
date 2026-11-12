/**
 * =====================================================================
 * GLSL SHADERS FROM index(1).html (EXACT REFERENCE INTEGRATION)
 * =====================================================================
 * Real-time procedural monochrome fluid smoke simulation.
 * Extracted and adapted from index(1).html:
 * - hash(), noise(), fbm() with 5 octaves and mat2(1.6, 1.2, -1.2, 1.6)
 * - ribbon() procedural curve with exponential body, wisps, edge, grain, and mask
 * - Organic domain warping: q = p + warp * 0.075
 * - Right Side: Large flowing organic white/silver liquid-silk formation
 * - Left Side: Subtle flowing smoke formation entering from edge
 * - Center: Dark negative space behind hero text ensuring pristine typography contrast
 * - Lower Area: Atmospheric fluid smoke formations
 * - Specular highlight sheen: highlight
 * - Monochromatic color calculation & vignette
 * - Theme-adaptive compositing (Dark mode silver-white over #030303, Light mode graphite ribbons)
 */

export const vertexShader = `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2  u_resolution;
  uniform float u_time;
  uniform vec2  u_mouse;
  uniform float u_theme; // 0.0 = Dark Mode, 1.0 = Light Mode

  // Hash function from index(1).html
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Noise function from index(1).html
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // FBM function from index(1).html (5 octaves, mat2(1.6, 1.2, -1.2, 1.6))
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  // Volumetric silk ribbon function from index(1).html
  float ribbon(vec2 p, float t, float seed, float widthScale) {
    float n = fbm(p * vec2(2.15, 3.5) + vec2(t * 0.055, -t * 0.035) + seed);
    float n2 = fbm(p * 5.2 + vec2(-t * 0.08, t * 0.045) + seed * 2.1);
    float curve = 0.49 + 0.18 * sin(p.x * 2.85 + t * 0.12 + seed) + 0.075 * sin(p.x * 6.8 - t * 0.16 + seed * 1.8) + (n - 0.5) * 0.24 + (n2 - 0.5) * 0.06;
    float d = p.y - curve;
    float body = exp(-abs(d) * (9.0 * widthScale)) * 0.85;
    float crest = exp(-abs(d) * (24.0 * widthScale)) * 0.65;
    float wisps = exp(-abs(d + (0.045 * (n2 - 0.5))) * 50.0) * 0.38;
    float edge = exp(-abs(d) * 4.5) * 0.32;
    float mask = smoothstep(-0.25, 0.15, p.x) * (1.0 - smoothstep(0.92, 1.18, p.x));
    float grain = 0.55 + 0.45 * fbm(p * vec2(8.0, 13.0) + vec2(t * 0.12, -t * 0.09));
    return (body + crest + wisps + edge) * grain * mask;
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = vec2((uv.x - 0.5) * aspect + 0.5, uv.y);
    float t = u_time;

    // Interactive pointer coordinates from index(1).html
    vec2 mouse = (u_mouse - 0.5) * 0.025;
    p += mouse * vec2(0.8, 0.45);

    // Procedural domain warping
    vec2 warp = vec2(fbm(p * 3.0 + vec2(t * 0.035, 0.0)), fbm(p * 3.0 + vec2(4.3, -t * 0.03))) - 0.5;
    vec2 q = p + warp * 0.085;

    // Center negative space cutout for heading legibility
    float centerDist = length((p - vec2(0.48, 0.52)) * vec2(1.15, 1.55));
    float centerNegativeSpace = smoothstep(0.18, 0.52, centerDist);

    // RIGHT SIDE: Large flowing organic white/silver liquid-silk formations
    float a = ribbon(q, t, 1.7, 1.0);
    vec2 q2 = vec2(q.x + 0.05, q.y + 0.22);
    float b = ribbon(q2, t * 0.76, 4.2, 0.85) * 0.62;
    vec2 q3 = vec2(q.x - 0.08, q.y - 0.18);
    float c = ribbon(q3, t * 0.58, 6.8, 0.70) * 0.45;

    // Emphasize right-side volume
    float rightWeight = smoothstep(0.28, 0.85, p.x);
    float rightPlumes = max(max(a, b), c) * (0.45 + 0.75 * rightWeight);

    // LEFT SIDE: Subtle flowing smoke formation entering from edge
    float leftCloud = fbm((p + vec2(-0.16, 0.02)) * vec2(4.0, 3.0) + vec2(-t * 0.05, t * 0.025));
    float leftShape = exp(-length((p - vec2(0.08, 0.42 + 0.08 * sin(t * 0.13))) * vec2(1.8, 1.1)) * 3.6) * smoothstep(0.20, 0.75, leftCloud) * 0.46;

    // LOWER AREA: Additional delicate fluid formations and atmospheric lighting
    float lowerCloud = fbm(p * vec2(3.0, 5.0) + vec2(t * 0.025, -t * 0.045));
    float lowerShape = exp(-abs(p.y - (0.12 + 0.07 * sin(p.x * 4.0 - t * 0.12))) * 14.0) * smoothstep(0.32, 0.72, lowerCloud) * 0.24;

    // Combined volumetric smoke with center negative space attenuation
    float combinedSmoke = max(rightPlumes, max(leftShape, lowerShape));
    float smoke = mix(combinedSmoke * 0.10, combinedSmoke, centerNegativeSpace);

    // High frequency texture & specular silk highlight from index(1).html
    float detail = fbm(q * vec2(10.0, 14.0) + vec2(t * 0.16, -t * 0.12));
    float highlightCurve = 0.49 + 0.18 * sin(q.x * 2.85 + t * 0.12 + 1.7);
    float highlight = pow(max(0.0, 1.0 - abs((q.y - highlightCurve) * 9.0)), 2.8) * (0.35 + 0.65 * detail) * rightWeight;
    highlight = mix(highlight * 0.08, highlight, centerNegativeSpace);

    // Light calculation exactly from index(1).html
    float light = clamp(smoke * 0.85 + highlight * 0.28, 0.0, 1.0);
    light = pow(light, 0.82);

    // Monochromatic color calculation exactly from index(1).html
    vec3 col = vec3(light * 0.88, light * 0.89, light * 0.90);
    float vignette = 1.0 - smoothstep(0.18, 1.05, length((uv - 0.5) * vec2(1.0, 0.9)));
    col *= mix(0.62, 1.0, vignette);
    col *= smoothstep(0.02, 0.16, uv.y) * 0.92 + 0.08;

    // Dual theme compositing:
    // Dark mode: pure white/silver liquid-silk ribbons over transparent background (revealing CSS #030303)
    // Light mode: delicate smoked graphite ribbons over transparent background (revealing CSS #FFFFFF)
    vec3 darkColor = col;
    float darkAlpha = clamp(light * 1.18, 0.0, 1.0);

    vec3 lightColor = mix(vec3(0.96), vec3(0.18, 0.19, 0.22), light);
    float lightAlpha = clamp(light * 0.42, 0.0, 0.65);

    vec3 finalColor = mix(darkColor, lightColor, u_theme);
    float finalAlpha = mix(darkAlpha, lightAlpha, u_theme);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;
