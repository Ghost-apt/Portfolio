/**
 * =====================================================================
 * TECHNICAL SKILLS ARSENAL DATA
 * =====================================================================
 * Add, remove, or modify your verified technical skills here.
 */

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Architecting responsive, modern, and accessible user interfaces with clean code and interactive feedback.",
    icon: "Layout",
    skills: [
      { name: "React.js", level: "Advanced", tag: "Library", highlight: true },
      { name: "JavaScript (ES6+)", level: "Advanced", tag: "Language", highlight: true },
      { name: "Tailwind CSS", level: "Advanced", tag: "Styling", highlight: true },
      { name: "HTML5", level: "Proficient", tag: "Markup" },
      { name: "CSS3", level: "Proficient", tag: "Styling" },
      { name: "Responsive UI/UX", level: "Proficient", tag: "Design System" },
      { name: "Framer Motion", level: "Proficient", tag: "Animation" },
      { name: "Component Architecture", level: "Proficient", tag: "Pattern" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Designing robust server-side systems, RESTful microservices, and reliable application business logic.",
    icon: "Server",
    skills: [
      { name: "Python", level: "Advanced", tag: "Language", highlight: true },
      { name: "Node.js", level: "Advanced", tag: "Runtime", highlight: true },
      { name: "Java", level: "Proficient", tag: "Language", highlight: true },
      { name: "Express.js", level: "Advanced", tag: "Framework" },
      { name: "REST APIs", level: "Advanced", tag: "Architecture", highlight: true },
      { name: "Authentication & JWT", level: "Proficient", tag: "Security" },
      { name: "OOP & System Design", level: "Proficient", tag: "Architecture" },
      { name: "Microservices", level: "Working Knowledge", tag: "Pattern" },
    ],
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description: "Implementing state-of-the-art Generative AI, RAG architectures, NLP pipelines, and machine learning models.",
    icon: "Cpu",
    skills: [
      { name: "Generative AI", level: "Specialized", tag: "GenAI", highlight: true },
      { name: "RAG Systems", level: "Specialized", tag: "Retrieval", highlight: true },
      { name: "Vector Search", level: "Proficient", tag: "Search", highlight: true },
      { name: "Embeddings", level: "Proficient", tag: "NLP", highlight: true },
      { name: "Machine Learning", level: "Proficient", tag: "AI/ML", highlight: true },
      { name: "Natural Language Processing (NLP)", level: "Proficient", tag: "AI" },
      { name: "Support Vector Machines (SVM)", level: "Proficient", tag: "Algorithm" },
      { name: "AI Integration & Workflows", level: "Advanced", tag: "Integration", highlight: true },
    ],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    description: "Structuring persistent data stores, relational schema integrity, and high-performance vector/document collections.",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: "Advanced", tag: "NoSQL", highlight: true },
      { name: "SQL", level: "Proficient", tag: "Relational", highlight: true },
      { name: "Schema Architecture", level: "Proficient", tag: "Design" },
      { name: "ACID Transactions", level: "Proficient", tag: "Integrity" },
      { name: "Query Optimization", level: "Proficient", tag: "Performance" },
      { name: "Vector Storage", level: "Proficient", tag: "AI Index" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Dev Tools",
    description: "Deploying and managing scalable cloud infrastructure, services, and automated developer tooling.",
    icon: "Cloud",
    skills: [
      { name: "AWS", level: "Working Knowledge", tag: "Cloud", highlight: true },
      { name: "Google Cloud", level: "Working Knowledge", tag: "Cloud", highlight: true },
      { name: "Git & Version Control", level: "Proficient", tag: "Tooling" },
      { name: "CI/CD Concepts", level: "Working Knowledge", tag: "DevOps" },
      { name: "Environment Configuration", level: "Proficient", tag: "Workflow" },
    ],
  },
];

export default skillCategories;
