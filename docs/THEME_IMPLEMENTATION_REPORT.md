# Dark Mode & Light Mode Implementation Report

**Project**: Anurag Singh — Full Stack Developer & AI/ML Engineer Personal Portfolio  
**Status**: Production Verified & Fully Functional  
**Date**: November 12, 2026  

---

## 1. Executive Summary

A centralized, luxury-grade Dual Theme System has been architected and integrated into Anurag Singh's personal portfolio. 

- **Dark Mode (Default)**: Preserves the authentic black cinematic aesthetic (`#000000` deep space, crisp white/silver typography, monochromatic cards, outlined action buttons, and WebGL ambient fluid smoke).
- **Light Mode**: Transforms the entire application into an elegant, high-contrast, clean white theme (`#FFFFFF` background, `#F7F7F7` secondary canvas, deep `#111111` readable typography, pure white cards with soft borders/shadows, and smooth silver/graphite fluid smoke ribbons).
- **Smooth Real-Time WebGL Shader Adaptation**: The Three.js ambient fluid smoke shader adapts dynamically between themes through a dedicated `uniform float u_theme;` smoothly interpolated in the animation loop without context destruction or frame drops.
- **Instant Anti-Flash Reload**: An inline `<head>` script in `index.html` synchronously resolves the active theme before CSS parsing or DOM rendering, preventing any white or dark flash on page refresh.
- **Top-Right Navbar Positioning**: The theme toggle is aligned next to the Resume button on desktop (`[Resume] [Theme Toggle]`) and accessible directly in the mobile header without obstructing navigation.

---

## 2. Architecture & File Structure

```
Portfolio/
├── index.html                                 # Anti-flash synchronous theme bootstrap
├── tailwind.config.js                         # Tailwind darkMode: ['class', '[data-theme="dark"]']
├── src/
│   ├── config/
│   │   ├── theme.js                           # Centralized dark & light color tokens
│   │   └── ambientConfig.js                   # WebGL smoke parameters
│   ├── context/
│   │   └── ThemeContext.jsx                   # Centralized React context, state & persistence
│   ├── hooks/
│   │   └── useTheme.js                        # Custom theme hook bridge
│   ├── styles/
│   │   ├── variables.css                      # CSS custom properties for [data-theme]
│   │   └── global.css                         # Smooth 300ms transitions & themed scrollbars
│   ├── effects/
│   │   └── ambient/
│   │       ├── ambientShader.js               # GLSL fragment shader with u_theme uniform
│   │       ├── FluidSmoke.jsx                 # Per-frame u_theme lerp & clearColor sync
│   │       └── AmbientBackground.jsx          # Dual-theme canvas wrapper
│   ├── components/
│   │   └── navigation/
│   │       ├── ThemeToggle.jsx                # Animated Sun/Moon toggle with micro-animations
│   │       ├── Navbar.jsx                     # Desktop [Resume] [Theme Toggle] layout
│   │       ├── NavLinks.jsx                   # Theme-aware active pill and links
│   │       └── MobileMenu.jsx                 # Theme-aware mobile slide-over drawer
│   ├── sections/
│   │   ├── Hero/                              # Monochromatic hero, SVG curve & marquee
│   │   ├── About/                             # Bio, matrix, terminal, focus areas
│   │   ├── Expertise/                         # Core competencies cards & checklists
│   │   ├── Skills/                            # Filter tabs, category cards, skill badges
│   │   ├── Projects/                          # Filter tabs, project cards, telemetry mockups
│   │   ├── Process/                           # 4-stage methodology lifecycle cards
│   │   ├── Experience/                        # Milestones, timeline nodes & period pills
│   │   ├── EngineeringApproach/               # Principles & syntax-highlighted code blocks
│   │   ├── FAQ/                               # Interactive accordion with themed borders
│   │   ├── Contact/                           # Email card, social channels & direct form
│   │   └── Footer/                            # Identity, quick links, and scroll-to-top
│   └── components/ui/
│       ├── ProjectModal.jsx                   # Architectural blueprint dialog
│       └── ResumeModal.jsx                    # Interactive printable developer profile
└── test_theme_suite.cjs                       # Automated headless verification suite
```

---

## 3. Design Tokens & Color Palettes

### Dark Mode (Default)
| Property | Value | Description |
| :--- | :--- | :--- |
| `--bg-primary` | `#000000` | Deep black hero and page foundation |
| `--bg-secondary` | `#050816` | Deep navy/slate section background |
| `--bg-card` | `#0B1120` | Monochromatic component card surface |
| `--bg-card-subtle` | `#101A30` | Inset badges, code blocks & controls |
| `--text-primary` | `#FFFFFF` | High-contrast heading typography |
| `--text-secondary` | `#94A3B8` | Body copy and descriptive text |
| `--border-color` | `rgba(59, 130, 246, 0.20)` | Subtle glowing borders |
| WebGL Smoke | Charcoal & Silver Ribbons | Deep atmospheric volumetric mist |

### Light Mode
| Property | Value | Description |
| :--- | :--- | :--- |
| `--bg-primary` | `#FFFFFF` | Crisp pure white canvas |
| `--bg-secondary` | `#F7F7F7` | Soft neutral off-white section background |
| `--bg-card` | `#FFFFFF` | Clean white elevated cards |
| `--bg-card-subtle` | `#F1F5F9` | Light slate tags, pills & code blocks |
| `--text-primary` | `#111111` | Deep charcoal/black readable typography |
| `--text-secondary` | `#555555` | Balanced neutral body copy |
| `--border-color` | `rgba(0, 0, 0, 0.10)` | Elegant subtle card borders & dividers |
| WebGL Smoke | Silver & Graphite Ribbons | Soft volumetric mist preserving text legibility |

---

## 4. WebGL Fluid Smoke Dynamic Theme Adaptation

Unlike simple CSS overlays, the fluid smoke background runs a custom Three.js GLSL procedural shader.

In [`src/effects/ambient/ambientShader.js`](file:///c:/VS%20CODE/Portfolio/src/effects/ambient/ambientShader.js):
```glsl
uniform float u_theme; // 0.0 = Dark Mode, 1.0 = Light Mode

// Interpolate base background and smoke ribbons
vec3 darkBase = vec3(0.00, 0.00, 0.00);
vec3 lightBase = vec3(1.00, 1.00, 1.00);
vec3 baseBg = mix(darkBase, lightBase, u_theme);

vec3 darkSmoke = vec3(0.55, 0.60, 0.70);
vec3 lightSmoke = vec3(0.35, 0.40, 0.45);
vec3 smokeColor = mix(darkSmoke, lightSmoke, u_theme);
```

In [`src/effects/ambient/FluidSmoke.jsx`](file:///c:/VS%20CODE/Portfolio/src/effects/ambient/FluidSmoke.jsx):
- Uses per-frame linear interpolation (`lerp`) to gently transition `uniforms.u_theme` toward `targetTheme` (`0.0` or `1.0`) at `10%` per frame.
- Synchronizes `renderer.setClearColor(isDark ? 0x000000 : 0xffffff, 1.0)`.
- Eliminates WebGL context destruction, re-initialization lag, and screen flickering.

---

## 5. Theme Toggle Component & Navbar Integration

Located at [`src/components/navigation/ThemeToggle.jsx`](file:///c:/VS%20CODE/Portfolio/src/components/navigation/ThemeToggle.jsx):
- **Desktop Navbar**: Placed on the far right adjacent to the Resume button (`[Resume] [Theme Toggle]`).
- **Mobile Header**: Placed beside the hamburger menu button with dedicated tap target spacing (`w-8.5 h-8.5`).
- **Micro-Animations**: Framer Motion rotation (`-60deg` to `0deg` for Moon, `+60deg` to `0deg` for Sun), spring scale tap effects (`0.94`), and smooth hover lift.
- **Accessibility**: Includes `aria-label`, dynamic `title` tooltip, visible focus ring (`focus-visible:ring-2`), and complete keyboard navigability.

---

## 6. Automated Verification Test Suite

The test suite [`test_theme_suite.cjs`](file:///c:/VS%20CODE/Portfolio/test_theme_suite.cjs) was executed using headless Microsoft Edge via Puppeteer against the production Vite build.

### Test Results Summary:
| Test Scenario | Action | Expected | Observed | Status |
| :--- | :--- | :--- | :--- | :---: |
| 1. Default Load | Page initialization | `data-theme="dark"`, `#000000` meta | `data-theme="dark"`, `#000000` meta | **PASS** |
| 2. Desktop Toggle | Click `#theme-toggle` | `data-theme="light"`, `#FFFFFF` meta | `data-theme="light"`, `#FFFFFF` meta | **PASS** |
| 3. LocalStorage | Switch theme | `localStorage = "light"` | `localStorage = "light"` | **PASS** |
| 4. Persistence | Reload in Light Mode | `data-theme="light"`, no flash | `data-theme="light"`, 0ms flash | **PASS** |
| 5. Return to Dark | Click `#theme-toggle` again | `data-theme="dark"`, persist reload | `data-theme="dark"`, persisted | **PASS** |
| 6. Mobile Toggle | Viewport 390x844 | `#mobile-theme-toggle` click | Switched to `"light"` seamlessly | **PASS** |
| 7. Blueprint Modal | Open in Light Mode | Elevated white dialog with dark text | High contrast blueprint render | **PASS** |
| 8. Console Audit | Complete session run | 0 browser console errors | **0 errors detected** | **PASS** |

### Verified Screenshots:
- [theme_dark_desktop.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_dark_desktop.png) — Desktop Hero (Dark Mode)
- [theme_dark_sections.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_dark_sections.png) — Content Sections (Dark Mode)
- [theme_light_desktop.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_light_desktop.png) — Desktop Hero (Light Mode)
- [theme_light_sections.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_light_sections.png) — Content Sections (Light Mode)
- [theme_light_projects.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_light_projects.png) — Featured Engineering Projects (Light Mode)
- [theme_light_contact.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_light_contact.png) — Contact Section & Footer (Light Mode)
- [theme_mobile_dark.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_mobile_dark.png) — Mobile Header (Dark Mode)
- [theme_mobile_light.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_mobile_light.png) — Mobile Header (Light Mode)
- [theme_light_project_modal.png](file:///C:/Users/gm956/.gemini/antigravity/brain/608ee04c-5dcf-4be6-af90-02797a6bb7df/theme_light_project_modal.png) — Architectural Blueprint Modal (Light Mode)
