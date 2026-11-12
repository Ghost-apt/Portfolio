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
| **Fluid Smoke Animation (Speed, brightness, noise scale)** | [`src/effects/ambient/ambientUniforms.js`](file:///c:/VS%20CODE/Portfolio/src/effects/ambient/ambientUniforms.js) |
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
  email: "anurag.dev.tech@gmail.com",
  location: "India",
  availabilityStatus: "Available for High-Impact Roles & Innovative Projects",
  
  // ...
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

Open [`src/effects/ambient/ambientUniforms.js`](file:///c:/VS%20CODE/Portfolio/src/effects/ambient/ambientUniforms.js).

This file controls the real-time GPU WebGL shader that renders the monochromatic fluid smoke background in the Hero section. You can adjust:

```javascript
export const ambientUniformDefaults = {
  // Speed of the organic smoke flow (Default: 0.14)
  // Higher = faster flowing smoke; Lower = slow, cinematic drift
  speed: 0.14,

  // Brightness of the smoke formation (Default: 0.88)
  brightness: 0.88,

  // Maximum opacity of the smoke layer (Default: 0.85)
  opacity: 0.85,

  // Fluid turbulence / domain-warping distortion intensity (Default: 1.35)
  distortion: 1.35,

  // Noise scale / graininess of the fractal formations (Default: 1.8)
  noiseScale: 1.8,

  // Contrast between dark voids and bright silk formations (Default: 1.45)
  contrast: 1.45,

  // Mouse interaction sensitivity (Default: 0.12)
  mouseInfluence: 0.12,
};
```

Try tweaking `speed: 0.10` for an even slower, whisper-soft atmosphere, or `distortion: 1.6` for more swirling eddies.

---

## 5. Customizing Colors & Theme Tokens

Open [`src/config/theme.js`](file:///c:/VS%20CODE/Portfolio/src/config/theme.js) and [`src/styles/variables.css`](file:///c:/VS%20CODE/Portfolio/src/styles/variables.css).

The portfolio follows a strict two-tier palette:
1. **Hero Section (Monochromatic)**: Pure black (`#000000`), charcoal (`#09090B`), silver (`#A1A1AA`), white (`#FFFFFF`).
2. **Lower Portfolio Sections (Deep Space Dark)**: Deep blue background (`#050816`), card backgrounds (`#101A30`), electric blue accent (`#3B82F6`), cyan accent (`#22D3EE`).

To change any accent color:
1. Update `theme.js`:
   ```javascript
   accentBlue: "#3B82F6", // Change to your preferred primary accent
   accentCyan: "#22D3EE", // Change to your preferred secondary accent
   ```
2. Update the corresponding CSS variables in `src/styles/variables.css`:
   ```css
   --blue-accent: #3B82F6;
   --cyan-accent: #22D3EE;
   ```

---

## 6. Updating Social Links & Navigation

### Social Links:
Open [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js) and update your URLs:

```javascript
export const socialLinks = {
  email: "anurag.dev.tech@gmail.com",
  github: "https://github.com/anuragsingh",
  linkedin: "https://linkedin.com/in/anurag-singh",
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
