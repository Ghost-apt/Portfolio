/**
 * =====================================================================
 * SITE CONFIGURATION
 * =====================================================================
 * Global website metadata, SEO settings, and section visibility toggles.
 */

export const siteConfig = {
  name: "Anurag Singh",
  title: "Anurag Singh | Full Stack Developer & AI/ML Engineer",
  description:
    "Explore the portfolio of Anurag Singh, a Full Stack Developer and AI/ML Engineer building modern web applications and intelligent AI-powered solutions.",
  keywords: [
    "Anurag Singh",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Generative AI",
    "RAG Systems",
    "React",
    "Python",
    "Node.js",
    "Tailwind CSS",
    "Machine Learning"
  ],
  author: "Anurag Singh",
  email: "anurag.dev.tech@gmail.com",
  themeColor: "#050816",
  // Configurable base URL; defaults to window origin or env var without inventing a hardcoded domain
  siteUrl: typeof window !== 'undefined' ? window.location.origin : (import.meta.env?.VITE_SITE_URL || ''),

  // Section Visibility Toggles (Easily enable/disable entire sections)
  sections: {
    hero: true,
    marquee: true,
    about: true,
    expertise: true,
    skills: true,
    projects: true,
    process: true,
    experience: true,
    principles: true,
    faq: true,
    contact: true,
    footer: true,
  },

  // Metadata for Open Graph
  openGraph: {
    type: "website",
    title: "Anurag Singh | Full Stack Developer & AI/ML Engineer",
    description: "Explore the portfolio of Anurag Singh, a Full Stack Developer and AI/ML Engineer building modern web applications and intelligent AI-powered solutions.",
    image: "/favicon.svg",
  },
};

export default siteConfig;
