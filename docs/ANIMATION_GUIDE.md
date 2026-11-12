# Animation System & WebGL Shader Guide

This document describes the motion design system and GPU-accelerated graphics pipelines utilized across the portfolio of **Anurag Singh**.

---

## 🌪️ Part 1: Real-Time WebGL Fluid Smoke Shader

The centerpiece of the Hero section is a real-time, GPU-rendered monochromatic ambient fluid smoke simulation powered by **Three.js** and custom **GLSL fragment shaders**.

```
┌────────────────────────────────────────────────────────┐
│                   Three.js WebGL Scene                 │
│  • Fullscreen Plane Geometry (Orthographic Camera)     │
│  • Custom ShaderMaterial with 60 FPS RequestAnimation  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                 GLSL Fragment Shader                   │
│  1. Domain-Warped Fractal Brownian Motion (FBM)       │
│  2. Spatial Structure Mask (Large right, subtle left)  │
│  3. Procedural Normal Lighting & Silver Highlights     │
│  4. Smoothed Mouse Vector Influence (Lerped)           │
└────────────────────────────────────────────────────────┘
```

### 1. Mathematical Architecture

#### A. Fractal Brownian Motion (FBM)
The shader generates procedural organic textures by summing successive octaves of 2D Perlin-style simplex noise:

$$\text{FBM}(p) = \sum_{i=0}^{N-1} A \cdot \gamma^i \cdot \text{noise}\left(p \cdot \lambda^i\right)$$

Where:
- $\gamma = 0.5$ (persistence / amplitude decay)
- $\lambda = 2.0$ (lacunarity / frequency doubling)
- $N = 5$ octaves for fluid softness without GPU lag.

#### B. Domain Warping
Rather than evaluating noise directly at coordinate $p$, the coordinates are recursively displaced by noise itself to simulate swirling fluid eddies:

$$q = \begin{pmatrix} \text{FBM}(p + \mathbf{v}_1 \cdot t) \\ \text{FBM}(p + \mathbf{v}_2 \cdot t) \end{pmatrix}$$

$$r = \begin{pmatrix} \text{FBM}(p + 4.0 \cdot q + \mathbf{v}_3 \cdot t) \\ \text{FBM}(p + 4.0 \cdot q + \mathbf{v}_4 \cdot t) \end{pmatrix}$$

$$\text{FluidDensity}(p) = \text{FBM}(p + 4.0 \cdot r)$$

This produces self-similar, non-repeating swirling currents that mimic silk, smoke, and liquid mercury.

#### C. Spatial Density Masking
To prevent the smoke from obscuring central typography while matching the reference aesthetic:
- **Right Formation**: A soft Gaussian falloff centered at $(x \approx 0.65, y \approx 0.50)$ allows thick silver smoke to roll behind the right side of the main heading.
- **Left Formation**: A subtle fluid contour along the left margin provides visual balance.
- **Center Void**: The central viewport is gently attenuated to preserve maximum typographic contrast for the main copy.

#### D. Procedural Lighting & Highlights
The fragment shader approximates surface normals using finite differences:

$$\mathbf{n} = \text{normalize}\left(\begin{pmatrix} \text{density}(x+\epsilon, y) - \text{density}(x-\epsilon, y) \\ \text{density}(x, y+\epsilon) - \text{density}(x, y-\epsilon) \\ 0.08 \end{pmatrix}\right)$$

A virtual directional light illuminates the edges of the smoke billows, generating the characteristic luminous silver highlights seen in the reference video.

---

### 2. Shader Uniform Configuration

All shader parameters are exposed in [`src/effects/ambient/ambientUniforms.js`](file:///c:/VS%20CODE/Portfolio/src/effects/ambient/ambientUniforms.js):

| Uniform Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `speed` | `float` | `0.14` | Temporal evolution speed of the smoke eddies. |
| `brightness` | `float` | `0.88` | Overall luminance multiplier of the white/silver smoke. |
| `opacity` | `float` | `0.85` | Alpha blending intensity against the pure black canvas. |
| `distortion` | `float` | `1.35` | Domain-warping amplitude; controls fluid turbulence. |
| `noiseScale` | `float` | `1.80` | Geometric scale of the noise field across the screen. |
| `contrast` | `float` | `1.45` | Power curve applied to density values for deep shadows. |
| `mouseInfluence` | `float` | `0.12` | Sensitivity of the smoke to pointer movement. |

---

### 3. WebGL Performance Optimizations

1. **Clamped Device Pixel Ratio (DPR)**:
   High-DPI retina displays (e.g., 3x or 4x screens) can overwhelm GPU fragment fill-rates. The renderer strictly clamps DPR:
   ```javascript
   const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
   renderer.setPixelRatio(dpr);
   ```
2. **Context Collision Prevention**:
   The canvas is mounted cleanly via React refs with safe context acquisition, preventing conflicts between WebGL1 and WebGL2.
3. **Smooth Pointer Lerp**:
   Mouse coordinates are interpolated each frame using a linear dampening factor (`0.05`) to prevent jarring jumps when the cursor enters or exits the window.
4. **Complete Resource Disposal**:
   Upon unmount, geometries, materials, textures, and the WebGL renderer context are explicitly disposed of, avoiding memory leaks during hot reloads or route changes.

---

## 🎬 Part 2: Framer Motion Animation Architecture

All UI transitions utilize **Framer Motion** with standard physics spring curves and staggered reveals.

### 1. Motion Tokens (`src/config/animationConfig.js`)

```javascript
export const transitions = {
  smooth: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] // Custom ease-out cubic
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  },
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 25
  }
};
```

### 2. Standard Reveal Variants

Section elements animate into view when scrolled into the viewport using `whileInView`:

```javascript
export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};
```

---

## ♿ Part 3: Accessibility & Reduced Motion

The portfolio respects user operating system preferences for reduced motion (`prefers-reduced-motion: reduce`).

The custom hook [`src/hooks/useReducedMotion.js`](file:///c:/VS%20CODE/Portfolio/src/hooks/useReducedMotion.js) detects the system setting:
- If reduced motion is preferred:
  - The WebGL fluid smoke shader falls back to an ultra-subtle, static monochromatic atmospheric gradient.
  - Framer Motion transitions collapse to immediate fades (`opacity: 1, y: 0`) without translation or scale jumps.
  - Smooth scrolling transforms into instant jumps.
