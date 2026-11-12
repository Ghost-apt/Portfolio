/**
 * =====================================================================
 * PROJECTS PORTFOLIO DATA
 * =====================================================================
 * Add, edit, reorder or remove projects from this single file.
 */

export const projectsData = [
  {
    id: "smartcampus-ai",
    title: "SmartCampus-AI",
    subtitle: "Intelligent University Management & Student Support System",
    category: "Full Stack & AI",
    badge: "Featured Platform",
    featured: true,
    displayOrder: 1,
    thumbnail: "/projects/smartcampus.png",
    shortDescription:
      "An intelligent university management platform connecting students, faculty, administrators, and academic departments through integrated services and AI-powered student support.",
    detailedDescription:
      "SmartCampus-AI centralizes academic workflows into a unified, intelligent portal. It bridges administrative management with adaptive student assistance, utilizing machine learning algorithms to recommend personalized learning pathways and automate routine academic administration.",
    highlights: [
      "Student & faculty identity lifecycle management",
      "Course scheduling & dynamic attendance tracking",
      "Automated fee processing & billing ledger",
      "Assignment evaluation & examination governance",
      "AI-powered 24/7 conversational student academic assistant",
      "Personalized learning & coursework recommendations",
      "Departmental academic analytics & performance dashboards"
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "AI Integration",
      "REST APIs",
      "Tailwind CSS"
    ],
    architecture: {
      client: "React.js SPA with Tailwind CSS responsive dashboard",
      server: "Node.js & Express RESTful services with JWT authentication",
      aiService: "Python microservice for predictive analytics & recommendations",
      database: "MongoDB document store for flexible academic records"
    },
    demoUrl: null, // Set to live URL when deployed
    githubUrl: "https://github.com/anuragsingh/smartcampus-ai",
    visualType: "campus",
    stats: [
      { label: "Core Modules", value: "8+" },
      { label: "AI Response Time", value: "< 250ms" },
      { label: "Architecture", value: "Microservices" }
    ]
  },
  {
    id: "resume-shortlisting-ai",
    title: "AI-Powered Resume Shortlisting System",
    subtitle: "Intelligent Candidate Screening & Document Analysis Engine",
    category: "AI / NLP",
    badge: "Machine Learning",
    featured: true,
    displayOrder: 2,
    thumbnail: "/projects/resume-ai.png",
    shortDescription:
      "An AI-powered application designed to analyze resumes, process complex job descriptions, and support intelligent candidate evaluation with precision semantic matching.",
    detailedDescription:
      "Engineered to eliminate manual recruitment bottlenecks, this system ingests candidate resumes across heterogeneous formats (PDF, DOCX), extracts structured candidate entities, and leverages NLP vector embeddings to evaluate candidate alignment against nuanced job descriptions with verifiable scoring transparency.",
    highlights: [
      "Multi-format document ingestion pipeline (PDF, DOCX parsing)",
      "High-accuracy entity extraction for technical skills & experience",
      "Job description semantic parsing & key requirements mapping",
      "Cosine similarity scoring with vector embeddings & NLP models",
      "Candidate qualification ranking & gap identification",
      "Interactive recruiter dashboard with filterable scoring views"
    ],
    technologies: [
      "Python",
      "Machine Learning",
      "NLP",
      "Embeddings",
      "SVM",
      "Vector Search",
      "React.js",
      "REST APIs"
    ],
    architecture: {
      pipeline: "PyPDF2 & python-docx textual extraction and tokenization",
      nlp: "Sentence Transformers embeddings & SVM classification models",
      frontend: "React dashboard with dynamic rank cards & score distribution",
      backend: "Python REST API for batch document processing"
    },
    demoUrl: null,
    githubUrl: "https://github.com/anuragsingh/ai-resume-shortlisting",
    visualType: "resume",
    stats: [
      { label: "Parsing Accuracy", value: "95%+" },
      { label: "Doc Formats", value: "PDF / DOCX" },
      { label: "Matching", value: "Semantic Vector" }
    ]
  },
  {
    id: "graph-rag-benchmark",
    title: "Graph RAG Benchmark",
    subtitle: "Knowledge Graph Retrieval & Context Optimization Research",
    category: "GenAI & RAG",
    badge: "AI Research",
    featured: true,
    displayOrder: 3,
    thumbnail: "/projects/graph-rag.png",
    shortDescription:
      "An AI research-oriented project exploring Graph RAG workflows, knowledge retrieval fidelity, and multi-hop reasoning evaluation in retrieval-based AI systems.",
    detailedDescription:
      "Traditional vector RAG struggles with multi-hop relational queries across disjoint documents. This benchmark framework constructs knowledge graphs from enterprise corpora, combines dense vector search with graph traversal, and quantifies context precision, recall, and hallucination reduction across diverse query classes.",
    highlights: [
      "Knowledge graph indexing pipeline from unstructured text",
      "Hybrid retrieval: Dense vector embeddings + Graph entity linking",
      "Contextual recall & precision evaluation test suites",
      "Comparative latency and token efficiency benchmarks",
      "Multi-hop question answering evaluation datasets",
      "Comprehensive metric visualization & report generator"
    ],
    technologies: [
      "Python",
      "Generative AI",
      "RAG Systems",
      "Embeddings",
      "Vector Search",
      "Knowledge Graphs",
      "REST APIs"
    ],
    architecture: {
      graphLayer: "Graph entity-relation mapping and community clustering",
      retriever: "Hybrid vector search + Subgraph traversal context builder",
      evaluation: "Context relevance, ground-truth faithfulness & answer recall",
      tooling: "Python benchmarking suite with structured logging"
    },
    demoUrl: null,
    githubUrl: "https://github.com/anuragsingh/graph-rag-benchmark",
    visualType: "graph",
    stats: [
      { label: "Multi-Hop Accuracy", value: "+38% Gain" },
      { label: "Context Pruning", value: "40% Token Save" },
      { label: "Focus", value: "Enterprise RAG" }
    ]
  },
  {
    id: "bank-management-system",
    title: "Bank Management System",
    subtitle: "Enterprise Financial Operations & Account Governance",
    category: "Backend & Systems",
    badge: "System Architecture",
    featured: true,
    displayOrder: 4,
    thumbnail: "/projects/bank-system.png",
    shortDescription:
      "A robust software application focused on secure banking operations, transactional integrity, and structured management of enterprise financial records.",
    detailedDescription:
      "Built with strict adherence to ACID transactional principles and enterprise software patterns. Manages account creation, authenticated fund transfers, interest compounding, and audit-ready transactional ledgers through normalized relational database schemas.",
    highlights: [
      "Secure multi-tiered user authentication & authorization",
      "ACID-compliant atomic transactional fund transfers",
      "Comprehensive deposit, withdrawal & balance reconciliation",
      "Detailed statement generation & historical audit logging",
      "Relational schema design with foreign key constraints & indexing",
      "Defensive input validation and concurrency handling"
    ],
    technologies: [
      "Java",
      "SQL",
      "Database Architecture",
      "REST APIs",
      "OOP Design Patterns",
      "Data Integrity"
    ],
    architecture: {
      core: "Java application implementing layered architecture (Controller, Service, DAO)",
      database: "Relational SQL database with strict referential integrity",
      security: "Encrypted credential storage & session state validation",
      patterns: "Factory, Singleton, and Data Access Object (DAO) patterns"
    },
    demoUrl: null,
    githubUrl: "https://github.com/anuragsingh/bank-management-system",
    visualType: "bank",
    stats: [
      { label: "ACID", value: "100% Compliant" },
      { label: "Architecture", value: "Layered DAO" },
      { label: "Database", value: "Relational SQL" }
    ]
  }
];

export const projects = projectsData;
export default projectsData;
