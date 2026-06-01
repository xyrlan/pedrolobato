import ProjectPage from "@/components/ProjectPage";

export default function BingxRobot() {
  const data = {
    title: "BingX Robot",
    description: "Autonomous trading platform for BingX perpetual futures — algorithmic bots coordinated by an AI portfolio manager.",
    articleImage: "/bingx/bingxcover.jpg",
    content: "A full-stack trading platform combining deterministic bots (grid, DCA, trailing stop, SMA crossover) with an AI Portfolio Manager built on Claude. Users connect encrypted BingX API keys and either run individual bots or hand portfolio-level discretion to a decision loop that proposes trades, clears them through risk guardrails, and executes — built to run continuously and survive failures.",
    role: ["Software Engineer", "Full Stack"],
    tools: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Inngest", "Vercel AI SDK", "Anthropic Claude"],
    integrations: ["BingX Futures API", "Anthropic Claude", "Inngest", "Supabase Auth"],
    duration: "2026 - Present",
    features: [
      {
        title: "Multiple bot strategies",
        description: "Long/short grid, DCA, trailing stop, and SMA crossover — each with configurable leverage and take-profit, on a decoupled execution core that takes new strategies without touching order placement.",
      },
      {
        title: "AI portfolio manager with guardrails",
        description: "A Claude-driven loop reads portfolio state and proposes trades; every action clears a reviewer layer (margin headroom, volatility caps, capital rules) before reaching the exchange. The AI can't bypass risk controls.",
      },
      {
        title: "Durable orchestration",
        description: "Inngest runs the bot watch and AI tick on schedule with concurrency caps; the worker deploys separately to Railway/Render to dodge Vercel transfer limits while the app stays on Vercel.",
      },
      {
        title: "Secure, precise execution",
        description: "API keys encrypted with AES-256-GCM; custom price/quantity precision and BigInt order-ID handling keep orders accepted by BingX without silent rejections.",
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}
