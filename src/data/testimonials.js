/**
 * =====================================================================
 * ENGINEERING PRINCIPLES / APPROACH DATA
 * =====================================================================
 * Foundational software and AI engineering tenets.
 * (Used in place of client testimonials to ensure authentic representation)
 */

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

export default engineeringPrinciples;
