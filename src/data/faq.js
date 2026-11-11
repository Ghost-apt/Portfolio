export const faqData = [
  {
    question: "Who is Anurag Singh?",
    answer:
      "I am a Full Stack Developer and AI/ML Engineer focused on bridging software engineering with machine learning. I design and build end-to-end applications ranging from intuitive React frontends to resilient Python/Node.js backend architectures and intelligent Generative AI/RAG solutions."
  },
  {
    question: "What technologies do you work with?",
    answer:
      "My primary frontend stack includes React.js, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS. For backend engineering, I work with Python, Java, Node.js, Express.js, and RESTful APIs. For data persistence, I leverage MongoDB and SQL. In AI/ML, I actively specialize in Generative AI, RAG (Retrieval-Augmented Generation), Vector Search, Embeddings, NLP, and Machine Learning models."
  },
  {
    question: "Are you interested in Full Stack Development?",
    answer:
      "Yes, absolutely. Full-stack development is foundational to how I work. Building complete systems from database schema design and API endpoints to fluid user interfaces allows me to deliver coherent, high-performance software that solves real user problems."
  },
  {
    question: "What areas of AI/ML interest you?",
    answer:
      "I am deeply interested in applied AI systems: particularly Generative AI, Retrieval-Augmented Generation (RAG), Graph RAG for multi-hop reasoning, vector similarity search, Natural Language Processing, and intelligent agentic workflows that augment human capabilities in production environments."
  },
  {
    question: "What projects have you built?",
    answer:
      "Key projects include SmartCampus-AI (an intelligent university management and student support platform), an AI-Powered Resume Shortlisting System (semantic matching and NLP parsing for candidate evaluation), Graph RAG Benchmark (research pipeline exploring hybrid vector-graph knowledge retrieval), and a Bank Management System (ACID-compliant financial operations in Java & SQL)."
  },
  {
    question: "How can someone collaborate with you?",
    answer:
      "You can reach out through the contact form on this site, send an email directly to anurag.dev.tech@gmail.com, or connect with me on LinkedIn. I am always open to exploring compelling engineering opportunities, software consulting, and collaborative AI product development."
  },
  {
    question: "Where can I explore your source code?",
    answer:
      "You can explore my open-source projects, system architectures, and code repositories on my GitHub profile at github.com/anuragsingh. All featured projects include direct links to view code repositories and technical documentation."
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    tagline: "Problem Understanding & Scoping",
    description:
      "Deeply understanding user requirements, architectural constraints, and operational goals before writing any code. Establishing verifiable benchmarks and scope boundaries.",
    icon: "Compass",
  },
  {
    step: "02",
    title: "Architect",
    tagline: "System Design & Data Modeling",
    description:
      "Planning data schemas, API contracts, system modularity, and AI retrieval strategies. Designing for scalability, latency targets, and maintainable abstractions.",
    icon: "Layers",
  },
  {
    step: "03",
    title: "Develop",
    tagline: "High-Craft Implementation",
    description:
      "Building clean, tested React interfaces, secure REST microservices, and AI inference pipelines with modern coding standards and defensive programming.",
    icon: "Code",
  },
  {
    step: "04",
    title: "Optimize",
    tagline: "Refinement & Performance Tuning",
    description:
      "Rigorous debugging, token and query optimization, latency reduction, cross-device testing, and delivering an accessible, resilient digital product.",
    icon: "Zap",
  },
];

export const engineeringPrinciples = [
  {
    title: "Clean Code & Modularity",
    tagline: "Self-documenting, maintainable architecture",
    description:
      "Writing readable, reusable, and predictable code with explicit boundaries, clean component composition, and comprehensive error handling.",
    icon: "ShieldCheck",
    codeSnippet: `// Composable & predictable architecture\nconst useQueryPipeline = (source) => {\n  const [data, setData] = useState(null);\n  // Verified state flow & clear contracts\n};`
  },
  {
    title: "First-Principles Problem Solving",
    tagline: "Root cause analysis over surface fixes",
    description:
      "Deconstructing complex software and algorithmic challenges to their core dynamics before selecting frameworks, models, or design patterns.",
    icon: "Target",
    codeSnippet: `// Focus on structural simplicity\nfunction resolveRetrievalConflict(nodes) {\n  return nodes.filter(isVerifiable);\n}`
  },
  {
    title: "Continuous Learning",
    tagline: "Rapid adaptation to technological frontiers",
    description:
      "Staying at the vanguard of modern AI developments, LLM orchestration, modern cloud paradigms, and full-stack developer tooling.",
    icon: "GraduationCap",
    codeSnippet: `// Continual experimentation & benchmarking\nconst benchmark = async () => {\n  return await evaluatePrecision();\n};`
  },
  {
    title: "Scalable Architecture",
    tagline: "Built for throughput, resilience and growth",
    description:
      "Designing systems with decoupled services, normalized database integrity, atomic transactions, and efficient retrieval pipelines that scale smoothly.",
    icon: "Cpu",
    codeSnippet: `// Decoupled services with ACID guarantees\ninterface ServiceContract {\n  executeTransaction(ctx: Context): Result;\n}`
  }
];

export const experienceTimeline = [
  {
    period: "2023 — Present",
    type: "Focus & Continuous Development",
    title: "Full Stack & AI/ML Engineering Practice",
    organization: "Independent & Project Development",
    description:
      "Engineering full-stack web applications and AI-driven systems. Specializing in React, Python, Node.js, and implementing cutting-edge RAG and semantic vector search architectures.",
    highlights: [
      "Built SmartCampus-AI university management & AI student assistant",
      "Developed AI-powered resume shortlisting system with NLP embeddings",
      "Researched Graph RAG benchmarking and multi-hop retrieval pipelines"
    ],
    status: "Active"
  },
  {
    period: "Academic Education",
    type: "Education",
    title: "Computer Science & Engineering Studies",
    organization: "University Degree Program",
    description:
      "Rigorous foundation in computer science principles: Data Structures & Algorithms, Object-Oriented Programming (Java/Python), Database Management Systems (SQL), Operating Systems, and Machine Learning fundamentals.",
    highlights: [
      "Core coursework in DBMS, Operating Systems, Computer Networks & AI",
      "Hands-on architectural software projects (Bank Management System, SmartCampus)",
      "Continuous practical application of algorithms and software design patterns"
    ],
    status: "Completed / In Progress"
  },
  {
    period: "Technical Milestones & Certifications",
    type: "Certifications & Milestones",
    title: "Full Stack & Machine Learning Specialization",
    organization: "Continuous Self-Directed & Course Curricula",
    description:
      "Targeted technical mastery across React ecosystem, modern backend development with Python/Node.js, and advanced AI/ML topics including Large Language Models and Vector Search.",
    highlights: [
      "Full Stack Web Development certification / project completions",
      "Machine Learning, NLP & Generative AI workflows",
      "Database architecture and relational SQL query optimization"
    ],
    status: "Verified Skills"
  }
];
