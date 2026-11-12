# Design System & Visual Guidelines

This document details the visual design specifications, color tokens, typography scales, glassmorphism parameters, and layout conventions used throughout the portfolio of **Anurag Singh**.

---

## 🎨 Dual-Atmosphere Visual Concept

The portfolio combines two complementary visual atmospheres:

```
┌────────────────────────────────────────────────────────┐
│                   1. HERO SECTION                      │
│       Monochromatic, Minimalist, Cinematic             │
│   • Pure Black background (#000000)                    │
│   • Real-Time WebGL Silver/White Ambient Smoke         │
│   • Crisp White Centered Typography                    │
│   • Floating White Navigation & Minimalist Pills       │
│   • Single Thin Curved Animated Line Across Lower Hero │
└────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│              2. LOWER PORTFOLIO SECTIONS               │
│        Deep Space Tech Dark Theme                      │
│   • Deep Slate Black & Midnight Blues (#050816)        │
│   • Electric Blue (#3B82F6) & Cyan (#22D3EE) Accents   │
│   • Frosted Glassmorphism Cards (#101A30 / Blur)       │
│   • Subtle Ambient Grid & Particle Lighting            │
└────────────────────────────────────────────────────────┘
```

---

## 1. Color Palette Tokens

### Tier 1: Monochromatic Hero Palette
Used exclusively in the Hero viewport to evoke a high-end editorial and cinematic aesthetic.

| Token | Hex Value | CSS Variable | Purpose |
| :--- | :--- | :--- | :--- |
| **Pure Black** | `#000000` | `--color-pure-black` | Hero background canvas & backdrop |
| **Charcoal** | `#09090B` | `--color-charcoal` | Subtle dark borders & badge fills |
| **Smoke Grey** | `#27272A` | `--color-smoke-grey` | Divider lines & muted text |
| **Silver** | `#A1A1AA` | `--color-silver` | Secondary hero copy & descriptions |
| **Pure White** | `#FFFFFF` | `--color-white` | Primary headings, active pills, smoke peaks |

### Tier 2: Lower Portfolio Deep Space Palette
Used in all sections below the Hero for technical depth and vibrant interaction points.

| Token | Hex Value | CSS Variable | Tailwind Class | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Primary BG** | `#050816` | `--primary-bg` | `bg-[#050816]` | Base background for body sections |
| **Secondary BG** | `#0B1120` | `--secondary-bg` | `bg-[#0B1120]` | Alternating section containers & modals |
| **Card BG** | `#101A30` | `--card-bg` | `bg-[#101A30]` | Glassmorphic card surfaces |
| **Electric Blue** | `#3B82F6` | `--blue-accent` | `text-blue-500`, `border-blue-500` | Primary interactive highlights & glows |
| **Cyan** | `#22D3EE` | `--cyan-accent` | `text-cyan-400`, `border-cyan-400` | Secondary accents, metric tags, gradients |
| **Primary Text** | `#F8FAFC` | `--text-primary` | `text-slate-100` | Section headings, primary text |
| **Secondary Text**| `#94A3B8` | `--text-secondary` | `text-slate-400` | Body copy, technical specifications |

---

## 2. Typography System

### Typefaces
- **Primary Body Font**: `Inter`, `-apple-system`, `sans-serif`
  Clean, highly legible geometric sans-serif for body copy, buttons, and captions.
- **Display & Heading Font**: `Space Grotesk`, `Sora`, `sans-serif`
  Futuristic, architectural display font for hero headlines and section titles.
- **Monospace Code Font**: `JetBrains Mono`, `monospace`
  Crisp monospaced font for metrics, technical badges, code snippets, and timestamps.

### Typographic Scale

| Level | Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | `clamp(2.75rem, 6.5vw, 5.5rem)` | 700 / Bold | `-0.035em` | Hero main headline |
| **Hero Subtitle** | `clamp(1.125rem, 2vw, 1.35rem)` | 400 / Regular | `normal` | Hero bio intro text |
| **Section Title** | `clamp(2rem, 4vw, 3rem)` | 700 / Bold | `-0.025em` | Main section headings |
| **Section Badge** | `0.75rem` (12px) | 600 / SemiBold | `0.15em` (Caps) | Category badges above section titles |
| **Card Heading** | `1.25rem` – `1.5rem` | 600 / SemiBold | `-0.015em` | Project & expertise card titles |
| **Body Large** | `1.125rem` (18px) | 400 / Regular | `normal` | Featured narrative paragraphs |
| **Body Regular** | `1rem` (16px) | 400 / Regular | `normal` | Standard text and descriptions |
| **Caption / Meta** | `0.875rem` (14px) | 500 / Medium | `normal` | Project metadata, tags, dates |

---

## 3. Glassmorphism & Card Design

Every card utilizes a layered glassmorphic surface that balances depth with legibility:

```css
/* Glass Card Specification */
.glass-panel {
  background: rgba(16, 26, 48, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(59, 130, 246, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 1.25rem; /* 20px */
}

/* Glass Card Interactive Hover State */
.glass-panel:hover {
  border-color: rgba(34, 211, 238, 0.35);
  box-shadow: 0 12px 40px 0 rgba(59, 130, 246, 0.12);
  transform: translateY(-2px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 4. Spacing & Layout Grid

### Container Widths
- **Max Viewport**: `max-w-7xl` (`80rem` / `1280px`)
- **Reading Container**: `max-w-3xl` (`48rem` / `768px`)
- **Hero Focus Container**: `max-w-5xl` (`64rem` / `1024px`)

### Responsive Padding
- Mobile (`< 640px`): `px-4 py-16`
- Tablet (`640px – 1024px`): `px-6 py-24`
- Desktop (`> 1024px`): `px-8 py-32`

---

## 5. Reusable Component Styles

### Primary CTA Button (Hero)
- **Shape**: Pill (`rounded-full`)
- **Background**: White (`#FFFFFF`)
- **Text**: Pure Black (`#000000`), font weight 600
- **Interaction**: Scale to `1.03` on hover, smooth shadow expansion.

### Secondary Outline Button (Hero)
- **Shape**: Pill (`rounded-full`)
- **Background**: Translucent white (`rgba(255, 255, 255, 0.04)`) with subtle backdrop blur
- **Border**: Translucent grey (`rgba(255, 255, 255, 0.15)`)
- **Text**: Silver/White (`#F4F4F5`)
- **Hover**: Border brightens to `rgba(255, 255, 255, 0.4)`.

### Technical Pill Badges
- **Shape**: Rounded (`rounded-full` or `rounded-lg`)
- **Typography**: JetBrains Mono, `text-xs`
- **Fills**: Low opacity cyan (`bg-cyan-500/10`) with matching border (`border-cyan-500/20`) and text (`text-cyan-400`).
