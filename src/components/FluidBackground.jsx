import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_mouse_intensity;
  varying vec2 vUv;

  // Ultra-smooth procedural noise generator
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  // 6-octave Fractal Brownian Motion with decorrelated rotation
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

  // Domain-warped fluid smoke simulation
  float fluidPattern(vec2 p, out vec2 q, out vec2 r) {
    float t = u_time * 0.06;

    // Smooth mouse ripple displacement
    vec2 mouseOffset = (u_mouse - 0.5) * 0.7;
    float mouseDist = length(p - mouseOffset);
    vec2 mouseRipple = vec2(
      sin(mouseDist * 5.0 - u_time * 0.4),
      cos(mouseDist * 5.0 - u_time * 0.4)
    ) * 0.05 * exp(-mouseDist * 2.5) * u_mouse_intensity;

    // First domain warp layer (large organic currents)
    q = vec2(
      fbm(p + vec2(0.0, 0.0) + vec2(t * 0.32, t * 0.18)),
      fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.22, t * 0.28))
    );

    // Second nested domain warp layer (fluid silk tendrils)
    r = vec2(
      fbm(p + 3.0 * q + vec2(1.7, 9.2) + vec2(t * 0.18, -t * 0.25) + mouseRipple),
      fbm(p + 2.8 * q + vec2(8.3, 2.8) + vec2(-t * 0.28, t * 0.14) - mouseRipple)
    );

    // Final warped field
    return fbm(p + 3.2 * r + vec2(t * 0.09, t * 0.16));
  }

  void main() {
    // Aspect-ratio corrected coordinates centered at (0, 0)
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Coordinate scale
    vec2 p = st * 2.05;

    vec2 q;
    vec2 r;
    float f = fluidPattern(p, q, r);

    // --- SPATIAL PLACEMENT MASKS ---
    // 1. Right-side major smoke plume (flows across the right side and behind text)
    float rightPlume = smoothstep(-0.25, 0.85, st.x + 0.15) * 1.25;
    rightPlume *= smoothstep(1.35, 0.35, abs(st.y));

    // 2. Left-side secondary subtle fluid formation
    float leftPlume = smoothstep(-0.2, 0.9, -st.x - 0.2) * 0.55;
    leftPlume *= smoothstep(1.25, 0.3, abs(st.y));

    // Combined spatial envelope
    float spatialMask = clamp(rightPlume + leftPlume, 0.0, 1.3);

    // 3. Negative space in center for high typographic legibility
    // Soft radial falloff in center so text doesn't fight solid white smoke
    float centerDistX = abs(st.x) * 1.4;
    float centerDistY = abs(st.y) * 1.9;
    float centerDist = sqrt(centerDistX * centerDistX + centerDistY * centerDistY);
    float centerReadability = smoothstep(0.22, 0.92, centerDist);
    // Maintain subtle ambient flow behind text without blinding it
    centerReadability = mix(0.12, 1.0, centerReadability);

    // Modulate fluid density by spatial masks
    float density = f * spatialMask * centerReadability;

    // Smooth tonal mapping for silk smoke
    density = smoothstep(0.09, 0.86, density);

    // Volumetric surface normal approximation for soft liquid silk lighting
    float eps = 0.016;
    vec2 dummyQ, dummyR;
    float dX = fluidPattern(p + vec2(eps, 0.0), dummyQ, dummyR) - fluidPattern(p - vec2(eps, 0.0), dummyQ, dummyR);
    float dY = fluidPattern(p + vec2(0.0, eps), dummyQ, dummyR) - fluidPattern(p - vec2(0.0, eps), dummyQ, dummyR);
    vec3 normal = normalize(vec3(-dX * 1.6, -dY * 1.6, 0.14));

    // Directional light from upper-right (silver sheen on smoke ridges)
    vec3 lightDir = normalize(vec3(0.5, 0.7, 0.5));
    float diffuse = clamp(dot(normal, lightDir), 0.0, 1.0);

    // Specular highlight (liquid silk sheen)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(clamp(dot(normal, halfVec), 0.0, 1.0), 10.0) * 0.32;

    // --- MONOCHROMATIC PALETTE ---
    // Pure black -> charcoal -> smoke grey -> luminous silver -> soft white
    vec3 cDeepBlack = vec3(0.0, 0.0, 0.0);
    vec3 cCharcoal  = vec3(0.035, 0.035, 0.042);
    vec3 cMidGrey   = vec3(0.22, 0.23, 0.26);
    vec3 cSilver    = vec3(0.64, 0.66, 0.70);
    vec3 cWhite     = vec3(0.92, 0.93, 0.96);

    // Gradient blending
    vec3 color = mix(cDeepBlack, cCharcoal, smoothstep(0.0, 0.22, density));
    color = mix(color, cMidGrey, smoothstep(0.18, 0.52, density));
    color = mix(color, cSilver, smoothstep(0.46, 0.80, density));
    color = mix(color, cWhite, smoothstep(0.75, 1.0, density));

    // Specular silk sheen & diffuse
    color += cWhite * spec * density;
    color += cSilver * diffuse * 0.10 * density;

    // Very subtle atmospheric grain to prevent banding on 8-bit displays
    float grain = (hash(gl_FragCoord.xy + fract(u_time * 0.5)) - 0.5) * 0.01;
    color += vec3(grain);

    // Vignette towards edges of the hero viewport
    float vig = 1.0 - smoothstep(0.75, 1.5, length(st * vec2(0.9, 1.0)));
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function FluidBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer;
    try {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
      });
      renderer.setPixelRatio(dpr);
      renderer.setSize(container.clientWidth, container.clientHeight);
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Uniforms
    const uniforms = {
      u_resolution: {
        value: new THREE.Vector2(
          container.clientWidth * dpr,
          container.clientHeight * dpr
        ),
      },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_mouse_intensity: { value: 1.0 },
      u_pixelRatio: { value: dpr },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Smooth Mouse Tracking with Lerp
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const handleMouseMove = (e) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const currentDpr = Math.min(window.devicePixelRatio || 1, 1.5);

      renderer.setPixelRatio(currentDpr);
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width * currentDpr, height * currentDpr);
      uniforms.u_pixelRatio.value = currentDpr;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      uniforms.u_time.value += delta;

      // Lerp mouse coordinates
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-black overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {!hasWebGL && (
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a0c] to-[#18181c]" />
      )}
    </div>
  );
}
