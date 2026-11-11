# Anurag Singh — Personal Developer Portfolio

> **Full Stack Developer × AI/ML Engineer**  
> "Building intelligent digital experiences by combining modern full-stack engineering with Artificial Intelligence and Machine Learning."

A world-class, premium, editorial-style personal portfolio designed and engineered for **Anurag Singh**. Inspired by award-winning creative developer websites with a minimal luxury dark aesthetic, oversized typography, ambient blurred gradient orbs, and interactive project showcases.

---

## ✨ Features

- **Cinematic Dark Visual Aesthetic:** Deep `#050816` canvas with electric blue (`#3B82F6`) and cyan (`#22D3EE`) blurred lighting, subtle grid patterns, and interactive cursor spotlight.
- **Editorial Typography:** High-contrast typographic scale utilizing *Space Grotesk*, *Sora*, and *Inter*.
- **Floating Island Navigation:** Pill-shaped glassmorphic navigation bar with real-time active section tracking, smooth anchor scrolling, and a responsive mobile drawer menu.
- **Hero Section:** Full-screen hero featuring the animated badge `FULL STACK DEVELOPER × AI/ML ENGINEER`, oversized name presentation, staggered text reveals, action triggers, and a resume modal.
- **Infinite Marquee:** Seamless horizontal marquee showcasing core technologies with a pause-on-hover interaction.
- **"Beyond the Code" About Section:** Editorial layout paired with an interactive code & system matrix visual card.
- **Expertise Cards:** 4 high-craft capability cards (Full Stack Development, AI & Machine Learning, Backend Engineering, Generative AI & RAG).
- **Categorized Technical Arsenal:** Interactive filterable skills chips across Frontend, Backend, Databases, AI/ML, and Cloud — without fake percentage bars.
- **Featured Projects Gallery:**
  - **SmartCampus-AI:** Intelligent university management & 24/7 AI student assistant.
  - **AI-Powered Resume Shortlisting System:** Ingestion, PDF/DOCX parsing, and vector semantic evaluation.
  - **Graph RAG Benchmark:** Knowledge graph hybrid retrieval & multi-hop context optimization testbed.
  - **Bank Management System:** Enterprise Java & SQL transactional architecture with ACID guarantees.
  - *Interactive Blueprint Inspector modal with architectural breakdown and GitHub repository links.*
- **4-Stage Engineering Process:** 01 Discover, 02 Architect, 03 Develop, 04 Optimize.
- **Engineering Trajectory:** Verified academic and technical milestones timeline.
- **"How I Approach Engineering":** Core software principles (Clean Code, Problem Solving, Continuous Learning, Scalable Architecture).
- **Interactive FAQ Accordion:** Smooth expand/collapse answering key recruiter and collaborator inquiries.
- **Real Contact Section:** Integrated mail client launcher with prefilled subject/body, copy-email feedback button, and direct LinkedIn/GitHub links.
- **Verified Developer Resume Modal:** Printable and downloadable resume layout accessible with one click.

---

## 🛠️ Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom Color Palette & Typography Extensions)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Typography:** Space Grotesk, Sora, Inter, JetBrains Mono

---

## 📁 Project Architecture

```
Portfolio/
├── public/
│   └── favicon.svg           # Custom AS monogram vector favicon
├── src/
│   ├── assets/               # Static visual assets
│   ├── components/           # Reusable UI components
│   │   ├── Footer.jsx        # Minimal footer with quick links & back-to-top
│   │   ├── InteractiveBackground.jsx # Gradient orbs & cursor glow
│   │   ├── Navbar.jsx        # Floating glassmorphic header
│   │   ├── ProjectModal.jsx  # Architectural blueprint viewer
│   │   ├── ProjectVisual.jsx # Bespoke UI mockups for each project
│   │   ├── ResumeModal.jsx   # Interactive & printable resume modal
│   │   └── SectionHeading.jsx# Editorial section heading component
│   ├── data/                 # Centralized configuration data
│   │   ├── faq.js            # FAQ, engineering principles, timeline & process
│   │   ├── portfolio.js      # Personal details, focus areas & navigation
│   │   ├── projects.js       # Featured projects data & metrics
│   │   └── skills.js         # Categorized technical competencies
│   ├── sections/             # Page sections
│   │   ├── About.jsx         # Beyond the Code
│   │   ├── Contact.jsx       # Direct contact form & channels
│   │   ├── EngineeringApproach.jsx # Engineering tenets
│   │   ├── Experience.jsx    # Academic & technical trajectory
│   │   ├── Expertise.jsx     # What I Do
│   │   ├── FAQ.jsx           # Accordion inquiries
│   │   ├── Hero.jsx          # Full-screen hero
│   │   ├── MarqueeSection.jsx# Infinite tech ticker
│   │   ├── Process.jsx       # 4-stage engineering lifecycle
│   │   ├── Projects.jsx      # Featured works gallery
│   │   └── Skills.jsx        # Technical skills matrix
│   ├── App.jsx               # Application root
│   ├── index.css             # Tailwind & custom scrollbar/vignette styles
│   └── main.jsx              # DOM Entry point
├── index.html                # Semantic HTML with SEO meta tags & fonts
├── package.json              # Dependencies & build scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Custom theme & utility extensions
└── vite.config.js            # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation

```bash
# Clone the repository or navigate to directory
cd "c:\VS CODE\Portfolio"

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Vite development server
npm run dev
```

Visit `http://localhost:3000` (or the port specified in terminal) in your browser.

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## ✏️ How to Personalize Data

All data is separated into dedicated files inside `src/data/`:

1. **Personal Information & Bio:** Edit `src/data/portfolio.js` to change social handles, email, bio text, or taglines.
2. **Projects:** Edit `src/data/projects.js` to add new projects, update live URLs, or change GitHub repositories.
3. **Skills:** Edit `src/data/skills.js` to add newly learned technologies, frameworks, or tools.
4. **FAQ & Principles:** Edit `src/data/faq.js` to modify questions, answers, and timeline items.

---

## 📄 License

© 2026 Anurag Singh. All rights reserved.
