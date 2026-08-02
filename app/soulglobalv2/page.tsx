import ProjectPage from "@/components/ProjectPage";

export default function SoulGlobalV2() {
  const data = {
    title: "Soul Global 2.0",
    description: "A full architectural rewrite of Soul Global — from a React + REST monolith to Next.js 16 Server Components with durable workflows.",
    articleImage: "/soulglobalv2/soulglobalv2brand.png",
    content: "Version 1 proved the product but accumulated client-side complexity and a brittle order model. Version 2 is a ground-up rewrite on a server-component-first architecture, with Inngest workflows and a complete Brazilian import tax engine. The hard part was migrating live production data while v1 kept serving paying customers.",
    role: ["Software Engineer", "Full Stack", "Architect"],
    tools: ["Bun", "Next.js 16", "React 19", "PostgreSQL", "Drizzle ORM", "Inngest", "Decimal.js", "next-intl"],
    integrations: ["Supabase", "Siscomex (Portal Único)", "Asaas", "ZapSign", "ShipsGo", "Anthropic Claude"],
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
        title: "The system, end to end",
        description: "Four personas hit one App Router, which talks to a service layer, a pure pricing engine, 55 Postgres tables and eight external systems — while inbound webhooks feed 18 durable Inngest functions. Tap any node to open it.",
        visual: "sg-system-map" as const,
      },
      {
        title: "Live data migration (11-step → 7-step)",
        description: "Migrated the legacy schema to a simpler order model while preserving every historical order, contract, and payment — as two versioned pipelines of idempotent phases, with the old-to-new id map kept in a real table so a crash never means starting over.",
        visual: "sg-migration" as const,
      },
      {
        title: "Client-fetching → React Server Components",
        description: "Re-architected to Next.js 16 Server Components by default, dropping initial load weight and reworking auth and caching that were core to v1's client-side SWR model.",
      },
      {
        title: "Durable workflows with Inngest",
        description: "Replaced manual state machines and fragile cron jobs with 18 Inngest functions — serialised one-per-shipment, retried three times, idempotent by design, so payment reconciliation and customs progression survive crashes and 3rd-party outages.",
        visual: "sg-event-flow" as const,
      },
      {
        title: "Brazilian import tax engine",
        description: "Full CIF → II → IPI → PIS/COFINS → Siscomex → AFRMM → ICMS cascade, including the \"por dentro\" gross-up, computed with Decimal.js so rounding never drifts.",
        visual: "sg-tax-cascade" as const,
      },
      {
        title: "Four personas on one database",
        description: "Importers, Chinese sourcing partners, customs brokers and platform staff each get their own route group, gated in the layout before any child renders and backed by a signed active-organization cookie.",
        visual: "sg-tenancy" as const,
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}
