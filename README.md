# Anurag Singh — Personal Developer Portfolio

> **Full Stack Developer × AI/ML Engineer**  
> *"I build intelligent digital experiences by combining modern full-stack engineering with Artificial Intelligence and Machine Learning."*

A world-class, premium, modular personal portfolio designed and engineered for **Anurag Singh**. Features a cinematic monochromatic hero section with real-time GPU-accelerated WebGL ambient fluid smoke simulation, transitioning into a modern dark deep space theme for project showcases, technical skills, and engineering trajectory.

---

## 📚 Developer & Deployment Documentation

Complete guides and audit reports are available in the [`docs/`](file:///c:/VS%20CODE/Portfolio/docs/) directory:

- 🛠️ [**Post-Launch Maintenance Guide** (`docs/MAINTENANCE_GUIDE.md`)](file:///c:/VS%20CODE/Portfolio/docs/MAINTENANCE_GUIDE.md) — Monthly maintenance checklist, content update procedure, dependency updates, and rollbacks.
- 📋 [**Phase 7 Post-Launch Report** (`docs/POST_LAUNCH_REPORT.md`)](file:///c:/VS%20CODE/Portfolio/docs/POST_LAUNCH_REPORT.md) — Monitoring strategy, baseline performance metrics, security audit, and enhancement roadmap.
- 🚀 [**Vercel Production Deployment Guide** (`docs/VERCEL_DEPLOYMENT_GUIDE.md`)](file:///c:/VS%20CODE/Portfolio/docs/VERCEL_DEPLOYMENT_GUIDE.md) — Step-by-step instructions for deploying to Vercel, adding custom domains, and verifying HTTPS.
- 📋 [**Phase 6 Deployment Report** (`docs/PHASE6_DEPLOYMENT_REPORT.md`)](file:///c:/VS%20CODE/Portfolio/docs/PHASE6_DEPLOYMENT_REPORT.md) — Production build inventory, security checks, and public release verification.
- ⚡ [**Phase 5 SEO & Performance Report** (`docs/PHASE5_PRODUCTION_OPTIMIZATION_REPORT.md`)](file:///c:/VS%20CODE/Portfolio/docs/PHASE5_PRODUCTION_OPTIMIZATION_REPORT.md) — Technical SEO, WCAG 2.2 AA accessibility, Core Web Vitals, and code splitting.
- 🌪️ [**Phase 4 Advanced Animations Report** (`docs/PHASE4_ANIMATION_REPORT.md`)](file:///c:/VS%20CODE/Portfolio/docs/PHASE4_ANIMATION_REPORT.md) — Real-time WebGL smoke engine, FBM domain warping, normal lighting, and 147 FPS benchmarks.
- 📖 [**How to Edit Your Portfolio** (`docs/HOW_TO_EDIT.md`)](file:///c:/VS%20CODE/Portfolio/docs/HOW_TO_EDIT.md) — Step-by-step lookup guide for modifying text, projects, skills, colors, and smoke animation settings without touching component code.
- 🌳 [**Project Architecture & Structure** (`docs/PROJECT_STRUCTURE.md`)](file:///c:/VS%20CODE/Portfolio/docs/PROJECT_STRUCTURE.md) — Detailed breakdown of every folder, file, and architectural boundary.
- 🎨 [**Design System & Visual Guidelines** (`docs/DESIGN_SYSTEM.md`)](file:///c:/VS%20CODE/Portfolio/docs/DESIGN_SYSTEM.md) — Monochromatic hero palette, deep space dark theme, glassmorphism tokens, and typography.
- 🌪️ [**Animation & WebGL Shader Guide** (`docs/ANIMATION_GUIDE.md`)](file:///c:/VS%20CODE/Portfolio/docs/ANIMATION_GUIDE.md) — Three.js fluid smoke math (FBM, domain warping, lighting) and Framer Motion variants.
- 📋 [**Refactoring Report** (`docs/REFACTORING_REPORT.md`)](file:///c:/VS%20CODE/Portfolio/docs/REFACTORING_REPORT.md) — Complete inventory of architectural upgrades and verifications.

---

## ✨ Architectural Highlights

- **Real-Time WebGL Fluid Ambient Smoke**: Custom Three.js GLSL fragment shader with Fractal Brownian Motion (FBM) and domain warping. Renders cinematic silver/white fluid smoke behind hero typography with smooth mouse interaction.
- **Strict Separation of Data and UI**: 100% of copy, project details, skills, social links, FAQs, and engineering principles reside in `src/data/`. Zero hardcoded content in React components.
- **Isolated Page Sections**: Every section is packaged in its own directory under `src/sections/` (`Hero/`, `About/`, `Expertise/`, `Skills/`, `Projects/`, `Process/`, `Experience/`, `EngineeringApproach/`, `FAQ/`, `Contact/`, `Footer/`).
- **Atomic & UI Component Library**: Cleanly separated into `src/components/common/`, `src/components/navigation/`, `src/components/animations/`, and `src/components/ui/`.
- **Decoupled Graphics Engine**: WebGL canvas lifecycle, DPR clamping, and smoke uniform parameters isolated in `src/effects/`.
- **Central Design Tokens & Theme Control**: Easily adjust colors, typography, and section toggles in `src/config/` and `src/styles/`.
- **Full Backward Compatibility**: Dual-layer re-exports maintain compatibility with any existing imports.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & Modular CSS Custom Properties
- **3D & Shaders**: Three.js & GLSL (Fractal Brownian Motion, Domain Warping)
- **Motion & Physics**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Space Grotesk, Sora, Inter, JetBrains Mono

---

## 📁 Directory Structure

```
Portfolio/
├── public/                  # Static assets (favicon, fonts, images, resume, projects)
├── src/
│   ├── assets/              # Bundled assets (icons, images, textures)
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Button, Container, SectionHeading, ScrollToTop
│   │   ├── navigation/      # Navbar, NavLinks, MobileMenu
│   │   ├── animations/      # RevealAnimation, MagneticButton, PageTransition
│   │   └── ui/              # GlassCard, Accordion, ProjectModal, ResumeModal
│   ├── sections/            # Self-contained page sections (JSX, CSS, subcomponents)
│   ├── effects/             # WebGL fluid smoke shader, canvas utils, particle grid
│   ├── data/                # Content layer (personalInfo, projects, skills, etc.)
│   ├── config/              # siteConfig, theme tokens, animationConfig
│   ├── hooks/               # useScrollProgress, useMediaQuery, useReducedMotion, useWebGLSupport
│   ├── layouts/             # MainLayout app shell
│   ├── styles/              # variables.css, typography.css, utilities.css, global.css
│   └── utils/               # constants, helpers, asset resolution
├── docs/                    # Complete developer & editing manuals
├── .env.example             # Environment template
└── vite.config.js           # Vite build configuration
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. Any change to `src/data/` or `src/config/` triggers instant hot-reloading.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## ✏️ Quick Content Editing Summary

| What you want to edit | File to open |
| :--- | :--- |
| **Personal Bio, Title, Email** | [`src/data/personalInfo.js`](file:///c:/VS%20CODE/Portfolio/src/data/personalInfo.js) |
| **Projects (Add/Edit/Remove)** | [`src/data/projects.js`](file:///c:/VS%20CODE/Portfolio/src/data/projects.js) |
| **Technical Skills** | [`src/data/skills.js`](file:///c:/VS%20CODE/Portfolio/src/data/skills.js) |
| **Smoke Shader Speed / Brightness** | [`src/effects/ambient/ambientUniforms.js`](file:///c:/VS%20CODE/Portfolio/src/effects/ambient/ambientUniforms.js) |
| **Colors & Theme** | [`src/config/theme.js`](file:///c:/VS%20CODE/Portfolio/src/config/theme.js) & [`src/styles/variables.css`](file:///c:/VS%20CODE/Portfolio/src/styles/variables.css) |
| **Toggle Sections On/Off** | [`src/config/siteConfig.js`](file:///c:/VS%20CODE/Portfolio/src/config/siteConfig.js) |
| **Social Links** | [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js) |

*For full instructions, read [`docs/HOW_TO_EDIT.md`](file:///c:/VS%20CODE/Portfolio/docs/HOW_TO_EDIT.md).*

---

## 📄 License

© 2026 Anurag Singh. All rights reserved.
