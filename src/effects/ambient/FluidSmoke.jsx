import React, { useEffect, useRef } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  Vector2,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
} from 'three';
import { vertexShader, fragmentShader } from './ambientShader';
import { ambientConfig } from '../../config/ambientConfig';
import { getClampedDpr, disposeThreeResources } from '../webgl/webglUtils';

/**
 * FluidSmoke - Real-time GPU fluid smoke renderer.
 *
 * Implements procedural domain-warped FBM fluid dynamics in a custom GLSL shader.
 * Features:
 * - Dynamic uniform synchronization without WebGL context recreation
 * - Visibility-aware rendering (pauses rAF when scrolled off-screen or tab hidden)
 * - Multi-touch & pointer gesture responsiveness with smooth lerp interpolation
 * - Hardware-adaptive DPR clamping (mobile vs desktop presets)
 * - Complete resource disposal on unmount
 */
export default function FluidSmoke({
  config = ambientConfig,
  reducedMotion = false,
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Synchronize uniforms when configuration or reduced-motion preferences change
  useEffect(() => {
    if (uniformsRef.current) {
      const u = uniformsRef.current;
      const speed = reducedMotion
        ? 0.015
        : (config.animationSpeed ?? config.smokeSpeed ?? 0.065);

      if (u.u_animation_speed) u.u_animation_speed.value = speed;
      if (u.u_smoke_density) u.u_smoke_density.value = config.smokeDensity ?? 1.15;
      if (u.u_smoke_opacity) u.u_smoke_opacity.value = config.smokeOpacity ?? 1.0;
      if (u.u_smoke_brightness) u.u_smoke_brightness.value = config.smokeBrightness ?? 1.08;
      if (u.u_smoke_contrast) u.u_smoke_contrast.value = config.smokeContrast ?? 0.88;
      if (u.u_noise_scale) u.u_noise_scale.value = config.noiseScale ?? 2.05;
      if (u.u_distortion_strength) {
        u.u_distortion_strength.value = config.distortionStrength ?? config.fluidDistortion ?? 3.2;
      }
      if (u.u_fluid_flow_speed) u.u_fluid_flow_speed.value = config.fluidFlowSpeed ?? 0.12;
      if (u.u_mouse_intensity) u.u_mouse_intensity.value = config.mouseInfluence ?? 0.85;
      if (u.u_blur_strength) u.u_blur_strength.value = config.blurStrength ?? 1.2;
      if (u.u_highlight_intensity) u.u_highlight_intensity.value = config.highlightIntensity ?? 0.45;
    }
  }, [config, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Detect mobile vs desktop quality profile
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
    const targetMaxDpr = isMobile
      ? (config.mobileQuality?.maxDpr ?? 1.25)
      : (config.desktopQuality?.maxDpr ?? config.maxDpr ?? 1.5);
    const dpr = getClampedDpr(targetMaxDpr);

    // 1. Scene & Orthographic Full-Screen Camera
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const initialW = Math.max(container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920), 100);
    const initialH = Math.max(container.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 1080), 100);

    // 2. WebGL Renderer
    let renderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
        premultipliedAlpha: false,
      });
      renderer.setClearColor(0x000000, 0.0);
      renderer.setPixelRatio(dpr);
      renderer.setSize(initialW, initialH);
    } catch (e) {
      console.warn('WebGL initialization failed in FluidSmoke:', e);
      return;
    }

    // 3. Shader Uniforms
    const speed = reducedMotion
      ? 0.015
      : (config.animationSpeed ?? config.smokeSpeed ?? 0.065);

    const uniforms = {
      u_resolution: {
        value: new Vector2(
          initialW * dpr,
          initialH * dpr
        ),
      },
      u_time: { value: 0 },
      u_mouse: { value: new Vector2(0.5, 0.5) },
      u_mouse_intensity: { value: config.mouseInfluence ?? 0.85 },
      u_animation_speed: { value: speed },
      u_smoke_density: { value: config.smokeDensity ?? 1.15 },
      u_smoke_opacity: { value: config.smokeOpacity ?? 1.0 },
      u_smoke_brightness: { value: config.smokeBrightness ?? 1.08 },
      u_smoke_contrast: { value: config.smokeContrast ?? 0.88 },
      u_noise_scale: { value: config.noiseScale ?? 2.05 },
      u_distortion_strength: {
        value: config.distortionStrength ?? config.fluidDistortion ?? 3.2,
      },
      u_fluid_flow_speed: { value: config.fluidFlowSpeed ?? 0.12 },
      u_blur_strength: { value: config.blurStrength ?? 1.2 },
      u_highlight_intensity: { value: config.highlightIntensity ?? 0.45 },
    };

    uniformsRef.current = uniforms;

    // 4. Mesh & Material
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // 5. Smooth Cursor & Touch Tracking with Lerp
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const handlePointerMove = (clientX, clientY) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetMouseX = Math.max(0.0, Math.min(1.0, (clientX - rect.left) / rect.width));
        targetMouseY = Math.max(0.0, Math.min(1.0, 1.0 - (clientY - rect.top) / rect.height));
      }
    };

    const handleMouseMove = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    // 6. Viewport Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = Math.max(container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920), 100);
      const height = Math.max(container.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 1080), 100);
      const currentDpr = getClampedDpr(targetMaxDpr);

      renderer.setPixelRatio(currentDpr);
      renderer.setSize(width, height);
      if (uniforms.u_resolution) {
        uniforms.u_resolution.value.set(width * currentDpr, height * currentDpr);
      }
    };

    window.addEventListener('resize', handleResize);

    // 7. Visibility Observer (Pause rAF when off-screen or tab hidden to save GPU)
    let animationFrameId;
    let isRunning = true;
    let lastTime = performance.now();

    const startAnimationLoop = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopAnimationLoop = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    // 7b. Graceful WebGL Context Loss Handling
    const handleContextLost = (e) => {
      e.preventDefault();
      stopAnimationLoop();
      console.warn('WebGL context lost in FluidSmoke. Rendering paused.');
    };

    const handleContextRestored = () => {
      console.info('WebGL context restored in FluidSmoke. Re-initializing.');
      handleResize();
      startAnimationLoop();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !document.hidden) {
          startAnimationLoop();
        } else {
          stopAnimationLoop();
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimationLoop();
      } else if (isVisibleRef.current) {
        startAnimationLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 8. Animation Loop
    const animate = (time) => {
      if (!isRunning) return;

      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // Update simulation time
      uniforms.u_time.value += delta;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Cleanup & Complete Resource Disposal
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      uniformsRef.current = null;
      disposeThreeResources(mesh, renderer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ backgroundColor: '#000000' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}
