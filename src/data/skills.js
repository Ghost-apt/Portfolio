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
    title: "Cloud & Dev Environments",
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

export const expertiseAreas = [
  {
    number: "01",
    title: "Full Stack Development",
    description:
      "Developing modern, responsive and scalable web applications with clean React components, robust state management, and ergonomic user experiences.",
    icon: "Code2",
    features: [
      "Modern React.js & Tailwind CSS",
      "Clean, scalable component architecture",
      "Responsive, cross-device interfaces",
      "Performant state & client rendering"
    ],
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    borderGlow: "group-hover:border-blue-500/50"
  },
  {
    number: "02",
    title: "AI & Machine Learning",
    description:
      "Creating intelligent solutions using machine learning and AI technologies, data feature extraction, classification models, and algorithmic pipelines.",
    icon: "Brain",
    features: [
      "Machine learning model pipelines",
      "NLP text parsing & semantic analysis",
      "Classification & regression (SVM, algorithms)",
      "Data preprocessing & evaluation metrics"
    ],
    gradient: "from-cyan-500/20 via-cyan-600/10 to-transparent",
    borderGlow: "group-hover:border-cyan-500/50"
  },
  {
    number: "03",
    title: "Backend Engineering",
    description:
      "Building APIs, database architectures and reliable backend services engineered for low latency, security, and high transactional reliability.",
    icon: "ServerCog",
    features: [
      "RESTful API design & documentation",
      "Node.js, Express & Python services",
      "Relational SQL & MongoDB schema design",
      "Authentication, authorization & security"
    ],
    gradient: "from-indigo-500/20 via-indigo-600/10 to-transparent",
    borderGlow: "group-hover:border-indigo-500/50"
  },
  {
    number: "04",
    title: "Generative AI & RAG",
    description:
      "Exploring LLM-powered applications, retrieval systems, vector databases, and intelligent assistants that connect proprietary knowledge with foundation models.",
    icon: "Sparkles",
    features: [
      "Retrieval-Augmented Generation (RAG)",
      "Vector search & semantic embeddings",
      "Knowledge graph hybrid indexing",
      "Prompt orchestration & AI agent logic"
    ],
    gradient: "from-teal-500/20 via-teal-600/10 to-transparent",
    borderGlow: "group-hover:border-teal-500/50"
  }
];
