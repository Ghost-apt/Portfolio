# How to Edit Your Portfolio

Welcome to your modular portfolio codebase! Every piece of content, styling token, animation setting, and project detail has been cleanly decoupled into dedicated configuration files.

> **Golden Rule**: You **never** need to touch React component code (`.jsx`) just to edit text, add a project, update a skill, or change a link. Everything you need is centralized in `src/data/` and `src/config/`.

---

## 📋 Quick Edit Lookup Table

Find what you want to change in the table below to see the exact file to open:

| What do you want to change? | File to edit |
| :--- | :--- |
| **Name, Title, Bio, Tagline, Email, Location** | [`src/data/personalInfo.js`](file:///c:/VS%20CODE/Portfolio/src/data/personalInfo.js) |
| **Projects (Add, remove, edit details, tags, metrics)** | [`src/data/projects.js`](file:///c:/VS%20CODE/Portfolio/src/data/projects.js) |
| **Technical Skills (Categories, skill names, proficiency)** | [`src/data/skills.js`](file:///c:/VS%20CODE/Portfolio/src/data/skills.js) |
| **Areas of Expertise (Cards on homepage)** | [`src/data/expertise.js`](file:///c:/VS%20CODE/Portfolio/src/data/expertise.js) |
| **Work Experience & Milestones** | [`src/data/experience.js`](file:///c:/VS%20CODE/Portfolio/src/data/experience.js) |
| **Education & Certifications** | [`src/data/education.js`](file:///c:/VS%20CODE/Portfolio/src/data/education.js) |
| **Development Process Steps (Discover, Architect, etc.)** | [`src/data/process.js`](file:///c:/VS%20CODE/Portfolio/src/data/process.js) |
| **Engineering Principles & Tenets** | [`src/data/testimonials.js`](file:///c:/VS%20CODE/Portfolio/src/data/testimonials.js) |
| **Frequently Asked Questions (FAQ Accordion)** | [`src/data/faq.js`](file:///c:/VS%20CODE/Portfolio/src/data/faq.js) |
| **Social Links (GitHub, LinkedIn, Email, Twitter/X)** | [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js) |
| **Navigation Links & Marquee Tech Pills** | [`src/data/navigation.js`](file:///c:/VS%20CODE/Portfolio/src/data/navigation.js) |
| **Fluid Smoke Animation (13 Centralized Parameters)** | [`src/config/ambientConfig.js`](file:///c:/VS%20CODE/Portfolio/src/config/ambientConfig.js) |
| **Color Palette & Design Tokens** | [`src/config/theme.js`](file:///c:/VS%20CODE/Portfolio/src/config/theme.js) & [`src/styles/variables.css`](file:///c:/VS%20CODE/Portfolio/src/styles/variables.css) |
| **Section Visibility (Enable/disable any section)** | [`src/config/siteConfig.js`](file:///c:/VS%20CODE/Portfolio/src/config/siteConfig.js) |
| **Resume PDF File** | [`public/resume/Anurag_Singh_Resume.pdf`](file:///c:/VS%20CODE/Portfolio/public/resume/) |

---

## 1. Editing Personal Details & Headlines

Open [`src/data/personalInfo.js`](file:///c:/VS%20CODE/Portfolio/src/data/personalInfo.js):

```javascript
export const personalInfo = {
  name: "Anurag Singh",
  professionalTitle: "Full Stack Developer | AI/ML Engineer",
  
  // Hero section badge and headings
  heroBadge: "FULL STACK DEVELOPER × AI/ML ENGINEER",
  heroHeadingLine1: "Building intelligent",
  heroHeadingLine2: "digital experiences.",
  
  // Hero subtext
  heroDetailedIntro:
    "I engineer intelligent digital experiences through full-stack development, artificial intelligence and modern software engineering.",

  // Contact points
  email: "gm956582@gmail.com",
  location: "India",
  availabilityStatus: "Available for High-Impact Roles & Innovative Projects",
  
  // Call to action
  cta: {
    heading: "Let's Connect",
    subtext:
      "Have an idea, an opportunity or an interesting project? Feel free to get in touch.",
  },
};
```

Simply update any string inside the quotes, save the file, and Vite will immediately hot-reload the changes in your browser.

---

## 2. Managing Projects (Add, Edit, Remove)

Open [`src/data/projects.js`](file:///c:/VS%20CODE/Portfolio/src/data/projects.js).

Every project is defined as an independent object inside the `projects` array:

```javascript
{
  id: "rag-intelligence-engine",
  title: "Autonomous RAG Knowledge Engine",
  category: "AI & Full-Stack Systems",
  featured: true,
  summary: "Enterprise-grade Retrieval-Augmented Generation platform...",
  description: "A production-oriented intelligence engine that leverages vector embeddings...",
  tech: ["Python", "FastAPI", "React", "Pinecone", "LangChain", "OpenAI"],
  highlights: [
    "Sub-120ms semantic search over 250k+ technical documents",
    "Hybrid keyword + vector reranking pipeline",
    "Role-based multi-tenant security architecture"
  ],
  stats: [
    { label: "Search Latency", value: "<120ms" },
    { label: "Embedding Precision", value: "98.4%" },
    { label: "Docs Indexed", value: "250K+" }
  ],
  links: {
    github: "https://github.com/anurag-singh/rag-engine",
    live: "https://rag-demo.anuragsingh.dev"
  }
}
```

### To Add a New Project:
1. Duplicate one of the existing project blocks.
2. Change the `id` to a unique slug (e.g. `my-new-project`).
3. Fill in your project title, category, summary, technologies, and metrics.
4. Set `featured: true` if you want it prominently displayed.

### To Remove a Project:
Simply delete or comment out the object block `{ ... }` from the `projects` array.

---

## 3. Updating Skills

Open [`src/data/skills.js`](file:///c:/VS%20CODE/Portfolio/src/data/skills.js).

Skills are organized into distinct engineering categories:

```javascript
export const skillCategories = [
  {
    name: "AI & Machine Learning",
    description: "Deep learning, LLM systems, neural architectures and semantic search.",
    skills: [
      { name: "Generative AI", level: "Advanced" },
      { name: "RAG Systems", level: "Advanced" },
      { name: "Vector Search", level: "Proficient" },
      // Add or remove skills here
    ]
  },
  {
    name: "Frontend Engineering",
    // ...
  }
];
```

To add a new skill to any category, just add an object `{ name: "New Skill", level: "Advanced" }` to the `skills` array.

---

## 4. Tuning the Ambient Fluid Smoke Animation

Open [`src/config/ambientConfig.js`](file:///c:/VS%20CODE/Portfolio/src/config/ambientConfig.js).

This file controls the real-time GPU WebGL shader that renders the monochromatic fluid smoke background in the Hero section and closing Contact section. You can adjust all 13 centralized parameters without editing shader math:

```javascript
export const ambientConfig = {
  // 1. Rate of internal temporal evolution (Lower = slow silk drift, Higher = faster churning)
  animationSpeed: 0.065,

  // 2. Base volume and plume fullness multiplier
  smokeDensity: 1.15,

  // 3. Overall alpha transparency blending
  smokeOpacity: 1.0,

  // 4. Multiplier scaling the brightest white/silver highlights
  smokeBrightness: 1.08,

  // 5. Contrast threshold separating deep black voids from bright silk ridges
  smokeContrast: 0.88,

  // 6. Spatial frequency of the fractal noise field (Lower = massive billows)
  noiseScale: 2.05,

  // 7. Amplitude of recursive domain-warping vectors (eddies and silk ribbons)
  distortionStrength: 3.2,

  // 8. Rate of horizontal drift vector across the screen
  fluidFlowSpeed: 0.12,

  // 9. Sensitivity to cursor and touch displacement
  mouseInfluence: 0.85,

  // 10. Soft Gaussian falloff multiplier on plume boundaries
  blurStrength: 1.2,

  // 11. Specular reflection sheen along normal ridges (mercury highlight effect)
  highlightIntensity: 0.45,

  // 12. Mobile hardware quality profile (battery & performance)
  mobileQuality: { maxDpr: 1.25, noiseOctaves: 4, speedMultiplier: 0.9 },

  // 13. Desktop quality profile (full 6-octave fidelity)
  desktopQuality: { maxDpr: 1.5, noiseOctaves: 6, speedMultiplier: 1.0 },

  // Preset applied to the closing Contact CTA section
  ctaSection: { /* Calmer ambient preset */ },
};
```

Try tweaking `animationSpeed: 0.04` for an even slower, whisper-soft atmosphere, or `distortionStrength: 4.0` for more swirling eddies.

---

## 5. Customizing Colors & Theme Tokens

Open [`src/config/theme.js`](file:///c:/VS%20CODE/Portfolio/src/config/theme.js) and [`src/styles/variables.css`](file:///c:/VS%20CODE/Portfolio/src/styles/variables.css).

The portfolio follows a strict two-tier palette:
1. **Hero Section (Monochromatic)**: Pure black (`#000000`), charcoal (`#09090B`), silver (`#A1A1AA`), white (`#FFFFFF`).
2. **Lower Portfolio Sections (Deep Space Dark)**: Deep blue background (`#050816`), card backgrounds (`#101A30`), electric blue accent (`#3B82F6`), cyan accent (`#22D3EE`).

---

## 5. Customizing Dark Mode, Light Mode & Design Tokens

Your portfolio features a centralized, production-grade Dual Theme System with full Dark Mode and Light Mode support.

### Theme Architecture:
- **Default Mode**: Dark Mode (`#000000` deep black space, white/silver typography, dark cards, WebGL fluid smoke).
- **Light Mode**: Light Mode (`#FFFFFF` pure white, `#F7F7F7` soft canvas, crisp `#111111` typography, white cards with subtle borders/shadows, light WebGL fluid smoke ribbons).
- **WebGL Shader Sync**: The fluid smoke shader interpolates between themes in real-time (`u_theme` uniform: `0.0` for Dark, `1.0` for Light) without context resets, frame drops, or flickering.
- **Persistence**: User preference is stored in `localStorage` under `'anurag-portfolio-theme'`. An inline `<script>` in `index.html` prevents any white/dark flash on page reload.

### Editing Theme Tokens:
Open [`src/config/theme.js`](file:///c:/VS%20CODE/Portfolio/src/config/theme.js) to adjust colors for both themes:

```javascript
export const theme = {
  // DARK MODE PALETTE
  dark: {
    bgPrimary: '#000000',
    bgSecondary: '#050816',
    bgCard: '#0B1120',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    borderColor: 'rgba(59, 130, 246, 0.20)',
    // ...
  },

  // LIGHT MODE PALETTE
  light: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F7F7F7',
    bgCard: '#FFFFFF',
    textPrimary: '#111111',
    textSecondary: '#555555',
    borderColor: 'rgba(0, 0, 0, 0.10)',
    // ...
  },
};
```

### CSS Variables:
Open [`src/styles/variables.css`](file:///c:/VS%20CODE/Portfolio/src/styles/variables.css) to customize raw CSS variables:
```css
[data-theme="dark"] {
  --bg-primary: #000000;
  --bg-secondary: #050816;
  --bg-card: #0B1120;
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;
  --border-color: rgba(59, 130, 246, 0.20);
}

[data-theme="light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F7F7;
  --bg-card: #FFFFFF;
  --text-primary: #111111;
  --text-secondary: #555555;
  --border-color: rgba(0, 0, 0, 0.10);
}
```

### Theme Toggle Button:
The toggle button is located at the top-right of the navbar ([`src/components/navigation/ThemeToggle.jsx`](file:///c:/VS%20CODE/Portfolio/src/components/navigation/ThemeToggle.jsx)), adjacent to the Resume button. It features animated Moon/Sun icon morphing, micro-interactions, full keyboard accessibility, and an adaptive tooltip.

---

## 6. Updating Social Links & Contact Channels

All contact points and social channel URLs are centralized in [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js) and [`src/data/personalInfo.js`](file:///c:/VS%20CODE/Portfolio/src/data/personalInfo.js).

### Where to Change Each Detail:

1. **Email Address (`gm956582@gmail.com`):**
   - Open [`src/data/personalInfo.js`](file:///c:/VS%20CODE/Portfolio/src/data/personalInfo.js) and update `email`:
     ```javascript
     email: "gm956582@gmail.com",
     ```
   - Open [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js) and update `email` and `rawEmail`:
     ```javascript
     email: "mailto:gm956582@gmail.com",
     rawEmail: "gm956582@gmail.com",
     ```
   - *Note:* Also mirror in [`src/config/siteConfig.js`](file:///c:/VS%20CODE/Portfolio/src/config/siteConfig.js) (`email`) and [`index.html`](file:///c:/VS%20CODE/Portfolio/index.html) (JSON-LD schema).

2. **GitHub Profile URL (`https://github.com/Ghost-apt`):**
   - Open [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js) and update:
     ```javascript
     github: "https://github.com/Ghost-apt",
     githubUsername: "Ghost-apt",
     ```

3. **LinkedIn Profile URL (`https://www.linkedin.com/in/anurag-singh-33897226a/`):**
   - Open [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js) and update:
     ```javascript
     linkedin: "https://www.linkedin.com/in/anurag-singh-33897226a/",
     linkedinName: "Anurag Singh",
     ```

### Complete `src/data/socialLinks.js` Template:
```javascript
export const socialLinks = {
  github: "https://github.com/Ghost-apt",
  linkedin: "https://www.linkedin.com/in/anurag-singh-33897226a/",
  email: "mailto:gm956582@gmail.com",
  rawEmail: "gm956582@gmail.com",
  githubUsername: "Ghost-apt",
  linkedinName: "Anurag Singh",
  location: "India",
  // ...
};
```

### Navigation Links & Marquee:
Open [`src/data/navigation.js`](file:///c:/VS%20CODE/Portfolio/src/data/navigation.js):
- `navLinks`: Controls the items in the floating navbar (e.g., About, Projects, Experience, Contact).
- `marqueeTechnologies`: Controls the technology tags scrolling horizontally below the Hero section.

---

## 7. Enabling or Disabling Sections

Open [`src/config/siteConfig.js`](file:///c:/VS%20CODE/Portfolio/src/config/siteConfig.js).

Under `sections`, you can toggle any section on or off with a simple boolean:

```javascript
sections: {
  hero: true,
  about: true,
  expertise: true,
  skills: true,
  projects: true,
  process: true,
  experience: true,
  engineeringApproach: true,
  faq: true,
  contact: true,
  footer: true,
}
```

If you ever want to temporarily hide the FAQ section, just change `faq: false`.

---

## 8. Replacing Your Resume PDF

1. Name your updated resume PDF file `Anurag_Singh_Resume.pdf`.
2. Place it in the [`public/resume/`](file:///c:/VS%20CODE/Portfolio/public/resume/) folder:
   `c:\VS CODE\Portfolio\public\resume\Anurag_Singh_Resume.pdf`
3. If you use a different filename, update `resumePath` in [`src/data/personalInfo.js`](file:///c:/VS%20CODE/Portfolio/src/data/personalInfo.js):
   ```javascript
   resumePath: "/resume/Your_New_Filename.pdf"
   ```

---

## 9. Testing Your Changes Locally

Run the development server in your terminal:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Any edits you make to the files above will appear immediately thanks to Vite's instant hot-reloading!
