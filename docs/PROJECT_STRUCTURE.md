# Project Architecture & Structure

This document provides a comprehensive structural reference for the entire personal developer portfolio codebase of **Anurag Singh**.

---

## 🌳 High-Level Directory Tree

```
c:\VS CODE\Portfolio\
│
├── public/                          # Static public assets served directly at root
│   ├── favicon/                     # Favicon variants & manifest
│   ├── fonts/                       # Local font files
│   ├── images/                      # Static branding images & profile pictures
│   ├── projects/                    # Project screenshot previews
│   └── resume/                      # PDF resume downloads
│
├── src/                             # Source code
│   │
│   ├── assets/                      # Bundled static assets processed by Vite
│   │   ├── fonts/                   # Webfont packages
│   │   ├── icons/                   # Custom SVG icons
│   │   ├── images/                  # Processed images
│   │   └── textures/                # WebGL shader noise textures
│   │
│   ├── components/                  # Reusable UI & presentation components
│   │   ├── common/                  # Atomic primitives (Button, Container, SectionHeading)
│   │   ├── navigation/              # Navigation systems (Navbar, NavLinks, MobileMenu)
│   │   ├── animations/              # Motion wrappers (RevealAnimation, MagneticButton)
│   │   └── ui/                      # Composite components (GlassCard, Modals, Accordion)
│   │
│   ├── sections/                    # Distinct page sections (each isolated with JSX & CSS)
│   │   ├── Hero/                    # Monochromatic Hero section & Curved Line
│   │   ├── About/                   # Narrative Bio & Core Focus areas
│   │   ├── Expertise/               # 4 Capability cards
│   │   ├── Skills/                  # Categorized skill badges
│   │   ├── Projects/                # Interactive project showcases & detail view
│   │   ├── Process/                 # 4-Stage engineering workflow
│   │   ├── Experience/              # Career trajectory & milestones
│   │   ├── EngineeringApproach/     # Engineering principles & philosophy
│   │   ├── FAQ/                     # Frequently asked questions accordion
│   │   ├── Contact/                 # Direct contact channels & CTA
│   │   └── Footer/                  # Closing brand footer & copyright
│   │
│   ├── effects/                     # Independent visual shader & graphics engines
│   │   ├── ambient/                 # Real-time WebGL fluid smoke shader system
│   │   ├── webgl/                   # Canvas wrappers & context management
│   │   ├── particles/               # Lower section interactive particle lighting
│   │   └── cursor/                  # Custom magnetic cursor (optional)
│   │
│   ├── data/                        # Centralized content layer (ZERO hardcoded text in components)
│   │   ├── personalInfo.js          # Name, titles, bios, headlines, email
│   │   ├── socialLinks.js           # GitHub, LinkedIn, contact channels
│   │   ├── navigation.js            # Navbar menu links & marquee pills
│   │   ├── projects.js              # Full project catalog with specs & stats
│   │   ├── skills.js                # Skill categories, tech stacks, levels
│   │   ├── expertise.js             # Core engineering capability definitions
│   │   ├── experience.js            # Milestones and timeline data
│   │   ├── education.js             # Academic degrees & coursework
│   │   ├── process.js               # Engineering lifecycle steps
│   │   ├── testimonials.js          # Engineering principles & philosophy
│   │   ├── faq.js                   # FAQ questions and answers
│   │   └── portfolio.js             # Central barrel re-exporting all data
│   │
│   ├── config/                      # Global configurations & theme tokens
│   │   ├── siteConfig.js            # Metadata, SEO, section toggles
│   │   ├── theme.js                 # Colors, typography, glassmorphism presets
│   │   └── animationConfig.js       # Durations, easings, WebGL smoke defaults
│   │
│   ├── hooks/                       # Custom React utility hooks
│   │   ├── useScrollProgress.js     # Window & element scroll tracking
│   │   ├── useMediaQuery.js         # Responsive breakpoint listener
│   │   ├── useReducedMotion.js      # Accessibility preference detection
│   │   └── useWebGLSupport.js       # Browser WebGL compatibility check
│   │
│   ├── layouts/                     # High-level page layouts
│   │   └── MainLayout.jsx           # App shell with smooth scroll & nav
│   │
│   ├── styles/                      # Modular CSS stylesheets
│   │   ├── variables.css            # CSS custom properties & color definitions
│   │   ├── typography.css           # Font families, sizes, weights
│   │   ├── utilities.css            # Glassmorphism, animations, custom helpers
│   │   ├── responsive.css           # Mobile & tablet layout adjustments
│   │   ├── global.css               # Base document styles & resets
│   │   └── index.css                # Master CSS entry point
│   │
│   ├── utils/                       # Pure utility functions & constants
│   │   ├── constants.js             # Breakpoints, section keys, routes
│   │   ├── helpers.js               # String manipulation, formatters
│   │   └── assetPaths.js            # Safe public asset path resolvers
│   │
│   ├── App.jsx                      # Application root component
│   ├── main.jsx                     # Vite DOM entry point
│   └── index.css                    # Direct CSS hook for main.jsx
│
├── docs/                            # Comprehensive developer documentation
│   ├── HOW_TO_EDIT.md               # Beginner-friendly guide to modifying content
│   ├── PROJECT_STRUCTURE.md         # This architectural directory guide
│   ├── DESIGN_SYSTEM.md             # Colors, typography, glassmorphism, spacing
│   ├── ANIMATION_GUIDE.md           # WebGL fluid smoke shader & Framer Motion specs
│   ├── DEPLOYMENT_GUIDE.md          # Production build & hosting guides
│   └── REFACTORING_REPORT.md        # Technical refactoring log & inventory
│
├── .env.example                     # Environment variables template
├── index.html                       # HTML5 entry shell
├── package.json                     # NPM dependencies and scripts
├── tailwind.config.js               # Tailwind design system configuration
└── vite.config.js                   # Vite bundler build configuration
```

---

## 📂 Detailed Folder Roles

### 1. `src/data/` (The Content Layer)
All text, project information, and links reside here.
- **Why this matters**: You never have to search through JSX component code to change a sentence, replace a project description, or update your social media link.
- **Rule**: Every component reads from `src/data/`. No strings are hardcoded into components.

### 2. `src/sections/` (Page Sections)
Each section of the single-page application is housed in its own dedicated directory:
- `Hero/`: Contains the monochromatic hero headline, animated curved SVG line, CTA buttons, and technology marquee.
- `About/`: Narrative introduction and core focus bullet points.
- `Expertise/`: Grid of cards showcasing full-stack engineering, AI/ML, backend architecture, and intelligent systems.
- `Skills/`: Organized tech stack badges by category.
- `Projects/`: Interactive showcase with live links, GitHub repos, technical metrics, and modal details.
- `Process/`: Step-by-step engineering lifecycle (Discover → Architect → Develop → Optimize).
- `Experience/`: Engineering trajectory and experience timeline.
- `EngineeringApproach/`: Core tenets, engineering principles, and design philosophy.
- `FAQ/`: Accessible accordion interface for common inquiries.
- `Contact/`: Direct contact CTA section with interactive channels.
- `Footer/`: Brand signature, navigation anchors, and copyright.

### 3. `src/effects/` (Visual Effects & Shader Engines)
Houses all GPU-accelerated and canvas-based graphics:
- `ambient/`: The decoupled Three.js WebGL fluid smoke shader engine. Contains:
  - `FluidSmoke.jsx`: Three.js lifecycle, requestAnimationFrame loop, mouse lerp.
  - `ambientShader.js`: Custom GLSL vertex and fragment shaders using Fractal Brownian Motion (FBM) and domain warping.
  - `ambientUniforms.js`: Configurable parameters (speed, brightness, opacity, distortion, noise scale).
  - `AmbientBackground.jsx`: Protective wrapper that detects WebGL capability and handles reduced motion gracefully.
- `webgl/`: Low-level WebGL context manager, clamped DPR utility, and full-viewport canvas component.
- `particles/`: Lightweight interactive particle grid for lower sections.

### 4. `src/components/` (Reusable Component System)
- `common/`: Clean atomic primitives like `Button.jsx`, `Container.jsx`, `SectionHeading.jsx`, and `ScrollToTop.jsx`.
- `navigation/`: `Navbar.jsx`, `NavLinks.jsx`, and `MobileMenu.jsx` for desktop and mobile devices.
- `animations/`: Reusable motion wrappers like `RevealAnimation.jsx` and `MagneticButton.jsx`.
- `ui/`: Composite components including `GlassCard.jsx`, `Accordion.jsx`, `ProjectModal.jsx`, and `ResumeModal.jsx`.

### 5. `src/config/` (Theme & Behavior Controls)
- `siteConfig.js`: Site metadata, SEO descriptions, and feature/section toggle switches.
- `theme.js`: JavaScript tokens for colors, fonts, border radii, and glassmorphism styling.
- `animationConfig.js`: Framer Motion timing curves and default ambient smoke settings.

### 6. `src/styles/` (Modular Style Sheets)
- `variables.css`: Root CSS custom properties for both the monochromatic hero and the deep space theme.
- `typography.css`: Font declarations, weights, line heights, and letter spacing.
- `utilities.css`: Custom utility classes for glassmorphic backdrops, glowing borders, and animations.
- `responsive.css`: Breakpoint rules ensuring responsive layouts across mobile, tablet, and desktop viewports.
- `global.css`: Reset rules, custom scrollbars, and selection highlights.

---

## 🔄 Backward Compatibility Layer

To ensure that any existing scripts, legacy imports, or external references never break, backward compatibility re-exports are provided:
- `src/data/portfolio.js` re-exports all data objects from individual files in `src/data/`.
- `src/components/*.jsx` re-exports corresponding modular components from `src/components/common/`, `src/components/navigation/`, `src/components/ui/`, and `src/effects/`.
- `src/sections/*.jsx` re-exports sections from their respective folders.

This dual-layer architecture guarantees backward compatibility while providing modularity.
