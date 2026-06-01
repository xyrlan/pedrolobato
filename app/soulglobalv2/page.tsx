import ProjectPage from "@/components/ProjectPage";

export default function SoulGlobalV2() {
  const data = {
    title: "Soul Global 2.0",
    description: "A full architectural rewrite of Soul Global — from a React + REST monolith to Next.js 16 Server Components with durable workflows.",
    articleImage: "/soulglobalv2/soulglobalv2brand.png",
    content: "Version 1 proved the product but accumulated client-side complexity and a brittle order model. Version 2 is a ground-up rewrite on a server-component-first architecture, with Inngest workflows and a complete Brazilian import tax engine. The hard part was migrating live production data while v1 kept serving paying customers.",
    role: ["Software Engineer", "Full Stack", "Architect"],
    tools: ["Bun", "Next.js 16", "React 19", "PostgreSQL", "Drizzle ORM", "Inngest", "Decimal.js", "next-intl"],
    integrations: ["Supabase Auth", "Asaas", "Inngest", "Mailtrap", "Anthropic Claude"],
    duration: "2025 - Present",
    links: [
      {
        name: "soulglobal.com.br",
        url: "https://soulglobal.com.br",
        icon: "🌐"
      },
    ],
    features: [
      {
        title: "Live data migration (11-step → 7-step)",
        description: "Migrated the legacy schema to a simpler order model while preserving every historical order, contract, and payment. Ran in shadow mode against production for weeks, comparing v1 vs v2 row-by-row before a reversible cutover.",
      },
      {
        title: "Client-fetching → React Server Components",
        description: "Re-architected to Next.js 16 Server Components by default, dropping initial load weight and reworking auth and caching that were core to v1's client-side SWR model.",
      },
      {
        title: "Durable workflows with Inngest",
        description: "Replaced manual state machines and fragile cron jobs with Inngest workflows — order progression, payment reconciliation, and operator queues survive crashes, retries, and 3rd-party outages.",
      },
      {
        title: "Brazilian import tax engine",
        description: "Full CIF → II → IPI → PIS/COFINS → ICMS cascade with multi-currency handling, computed with Decimal.js so rounding never drifts.",
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}
