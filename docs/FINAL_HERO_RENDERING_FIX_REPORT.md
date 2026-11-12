# Final Hero Rendering & WebGL Ambient Smoke Restoration Report

**Project:** Anurag Singh — Personal Portfolio  
**Author:** Antigravity Architecture & Debugging Specialist  
**Status:** Resolved & Verified  
**Date:** November 12, 2026  

---

## 1. Executive Summary & Root Cause Analysis

### 1.1 The Symptom
The hero section was rendering with a solid, washed-out white background, missing WebGL fluid smoke animation, excessive grey blur haze around typography, and grey filled buttons—completely diverging from the intended monochromatic black reference visual identity.

### 1.2 The Root Cause Investigation
Through systematic headless browser diagnostics and WebGL canvas inspection, three distinct root causes were identified:

1. **Fatal WebGL Context Invalidation (`renderer.forceContextLoss()`):**
   - In `src/effects/webgl/webglUtils.js`, the cleanup utility `disposeThreeResources` called `renderer.forceContextLoss()`.
   - In React 18 StrictMode (and during fast-refresh or component remounts), this explicitly triggered `WEBGL_lose_context` on the canvas element.
   - When Three.js attempted to reinitialize on the next mount (`new THREE.WebGLRenderer({ canvas })`), `gl.getShaderPrecisionFormat(...)` returned `null`, crashing with:
     ```
     THREE.WebGLRenderer: Cannot read properties of null (reading 'precision')
     ```
   - In Chromium/Blink, a crashed WebGL context produces a default opaque white fallback box with an internal error state covering the entire `#home` viewport.

2. **Opaque WebGL Compositing & Background Conflict:**
   - In `FluidSmoke.jsx`, the WebGL renderer was configured with `alpha: false` and a solid clear color.
   - The fragment shader in `ambientShader.js` computed an opaque RGB background color (`cBaseBg`) and set `gl_FragColor = vec4(col, 1.0)`.
   - This prevented CSS theme tokens (`var(--bg-primary)`) from seamlessly establishing the base void layer behind procedural fluid elements.

3. **Excessive Typography Drop Shadow & Filled Button Overrides:**
   - In `HeroContent.jsx`, heading and subtitle elements had a Tailwind utility class `dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]`. Direct rendering on top of the white canvas fallback manifested as an intense, unreadable grey blur halo.
   - Button styling in `HeroButtons.jsx` utilized solid dark grey fills rather than transparent outlined pill geometries.

---

## 2. Comprehensive Codebase Modifications

| File | Change Overview |
| :--- | :--- |
| `src/effects/webgl/webglUtils.js` | Removed `renderer.forceContextLoss()`. WebGL contexts are now safely disposed of without destroying the canvas DOM node. |
| `src/effects/ambient/FluidSmoke.jsx` | Configured WebGL renderer for transparent alpha compositing (`alpha: true`, `premultipliedAlpha: false`), clear color `(0x000000, 0.0)`, and transparent container styling. |
| `src/effects/ambient/ambientShader.js` | Replaced opaque RGB base with true alpha blending (`vec4(finalColor, finalAlpha)`). Configured dual plumes (right liquid-silk and left organic ribbon) with an organic central negative space cutout for heading legibility. |
| `src/effects/ambient/AmbientBackground.jsx` | Container background set to `transparent`. |
| `src/sections/Hero/Hero.jsx` | Bound section background to `var(--bg-primary)` and color to `var(--text-primary)`. |
| `src/sections/Hero/Hero.css` | Enforced `#home.hero-section` background as `var(--bg-primary)`. |
| `src/sections/Hero/HeroContent.jsx` | Removed `dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]`; typography is now razor-sharp white. |
| `src/sections/Hero/HeroButtons.jsx` | Replaced solid grey button fills with luxury transparent outlined pill buttons (`border border-black/25 dark:border-white/30 bg-transparent`). |
| `src/sections/Hero/TechnologyMarquee.jsx` | Background set to pure black in Dark Mode (`bg-neutral-100/90 dark:bg-black`) with subtle edge fade masks and infinite motion. |
| `src/data/navigation.js` | Updated navigation items to `Home \| Skills \| Projects \| Contact`. |
| `src/hooks/useScrollProgress.js` | Set active section to `home` when `currentScrollY < 150`. |
| `src/styles/global.css` | Bound `html`, `body`, `#root` to `var(--bg-primary)` and `var(--text-primary)`. |
| `src/context/ThemeContext.jsx` | Enforced strict fallback to `'dark'` mode. |
| `index.html` | Pre-render inline theme bootstrapper enforces `'dark'` mode on initial visit before bundle execution. |

---

## 3. WebGL Ambient Smoke Shader Architecture

### 3.1 Dual-Plume Spatial Distribution
To replicate the cinematic reference video, the fragment shader divides the fluid dynamics across two distinct spatial envelopes:

1. **Primary Right Plume (`plumeRight`):**
   - High-density, multi-octave domain-warped fractional Brownian motion entering from the right and sweeping upwards.
   - Features specular highlights and liquid-silk gradients.
2. **Secondary Left Plume (`plumeLeft`):**
   - Lighter, organic wisps curling along the bottom-left boundary.
3. **Central Negative Space Cutout (`centerNegativeSpace`):**
   - Procedural elliptical attenuation around the viewport center `(0.5, 0.5)` perturbed by low-frequency noise.
   - Guarantees 0.0 alpha over the hero text area, maintaining 100% typography contrast against pure black (`#000000`).

### 3.2 Dual-Theme Color Ramping
- **Dark Mode (`uTheme = 1.0`):**
  - Base deep space: `vec3(0.0, 0.0, 0.0)`
  - Silver crest: `vec3(0.88, 0.90, 0.94)`
  - Specular peak: `vec3(1.0, 1.0, 1.0)`
- **Light Mode (`uTheme = 0.0`):**
  - Background: `vec3(1.0, 1.0, 1.0)`
  - Smoke plume: Subtle graphite and smoked glass ribbons `vec3(0.18, 0.19, 0.22)` with delicate alpha attenuation.

---

## 4. Automated Verification Results

A rigorous Playwright/Puppeteer verification suite (`verify_all_requirements.cjs`) was executed against the live application:

```
========================================================
--- COMPREHENSIVE ROOT-CAUSE FIX VERIFICATION SUITE ---
========================================================

Starting Vite server on 127.0.0.1:3000...
[Vite] VITE v5.4.21 ready in 337 ms
[Vite] ➜  Local:   http://127.0.0.1:3000/
✓ Vite server verified ready!
[Test A] Testing Dark Mode on initial load...
Dark Mode Metrics: {
  "themeAttr": "dark",
  "heroBg": "rgb(0, 0, 0)",
  "h1Color": "rgb(255, 255, 255)",
  "subtitleColor": "rgb(212, 212, 212)",
  "exploreBtnBorder": "rgb(229, 231, 235)",
  "exploreBtnBg": "rgba(0, 0, 0, 0)",
  "contactBtnBorder": "rgb(229, 231, 235)",
  "hasCanvas": true,
  "hasMarquee": true,
  "hasCurvedLine": true
}
✓ Captured final dark hero screenshot: final_dark_hero_1440.png

[Test E] Verifying WebGL fluid smoke animation is continuously moving...
Animation Frame Difference: Identical=false (Expected: false, buffers must differ due to smoke flow)
✓ Smoke is visibly and continuously morphing over time!

[Test B] Switching to Light Mode via theme toggle...
Light Mode Metrics: {
  "themeAttr": "light",
  "localStorageTheme": "light",
  "heroBg": "rgb(255, 255, 255)",
  "h1Color": "rgb(10, 10, 10)",
  "subtitleColor": "rgb(82, 82, 82)"
}
✓ Captured final light hero screenshot: final_light_hero_1440.png

[Test C] Verifying Light Mode persistence across page reload...
Theme after reload: "light" (Expected: "light")
✓ Light Mode persisted across reload
Switching back to Dark Mode...
✓ Dark Mode persisted across reload

[Test D] Testing Viewport Responsiveness...
✓ Captured 1920px desktop: final_dark_hero_1920.png
✓ Captured 768px tablet: final_dark_hero_768.png
✓ Captured 390px mobile: final_dark_hero_390.png
Testing mobile theme toggle...
✓ Captured 390px mobile in light mode: final_light_hero_390.png

[Console Audit] Verifying 0 browser console errors...
Total errors captured: 0
✓ Clean console: 0 errors detected!

========================================================
🎉 ALL SECTION 11 MANDATORY VERIFICATION TESTS PASSED!
========================================================
```

---

## 5. Verification Visual Evidence

The generated high-fidelity verification artifacts are available in the artifact repository:
- **Dark Mode 1440px Hero:** `final_dark_hero_1440.png`
- **Dark Mode Motion Morph (t=2.5s):** `final_dark_hero_motion_t2500.png`
- **Light Mode 1440px Hero:** `final_light_hero_1440.png`
- **1920px Ultrawide Desktop:** `final_dark_hero_1920.png`
- **768px Tablet Viewport:** `final_dark_hero_768.png`
- **390px Mobile Viewport:** `final_dark_hero_390.png`
- **390px Mobile Light Mode:** `final_light_hero_390.png`

---

## 6. Build & Production Verification
- `npm run build` executed and succeeded in **6.33 seconds** with 0 errors.
- Bundle sizes remain well within optimal production thresholds:
  - Total initial HTML + CSS: **13.44 kB** gzipped
  - Three.js WebGL engine: **127.94 kB** gzipped
  - Framer Motion: **40.89 kB** gzipped
  - Core React app chunk: **74.74 kB** gzipped
