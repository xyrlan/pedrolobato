"use client";
import SystemMap, { type MapDetail, type MapEdgeSpec, type MapNodeSpec } from "./SystemMap";

const NODES: MapNodeSpec[] = [
  { id: "personas", x: 0, y: 20, label: "4 personas", tag: "route groups" },
  { id: "app", x: 250, y: 20, label: "app router", tag: "rsc + actions" },
  { id: "services", x: 500, y: 20, label: "services", tag: "12.5k loc" },
  { id: "ai", x: 250, y: 130, label: "ai layer", tag: "claude" },
  { id: "domain", x: 500, y: 130, label: "domain engine", tag: "pure decimal" },
  { id: "db", x: 750, y: 75, label: "postgres", tag: "55 tables" },
  { id: "external", x: 0, y: 260, label: "external systems", tag: "8 providers" },
  { id: "webhooks", x: 250, y: 260, label: "webhooks", tag: "verify only" },
  { id: "inngest", x: 500, y: 260, label: "inngest", tag: "18 functions" },
];

const EDGES: MapEdgeSpec[] = [
  ["e1", "personas", "app", "s-r", "t-l", "layout gate"],
  ["e2", "app", "services", "s-r", "t-l", "server action"],
  ["e3", "app", "ai", "s-b", "t-t", "stream"],
  ["e4", "services", "domain", "s-b", "t-t"],
  ["e5", "services", "db", "s-r", "t-l", "drizzle"],
  ["e6", "domain", "db", "s-r", "t-l", "snapshot"],
  ["e7", "services", "external", "s-l", "t-t", "outbound"],
  ["e8", "external", "webhooks", "s-r", "t-l", "callback"],
  ["e9", "webhooks", "inngest", "s-r", "t-l", "inngest.send()"],
  ["e10", "inngest", "db", "s-r", "t-b", "step.run()"],
  ["e11", "ai", "db", "s-r", "t-l"],
];

const DETAILS: Record<string, MapDetail> = {
  personas: {
    title: "Personas · route groups",
    summary:
      "Each group is a security boundary. Its layout.tsx is an async Server Component that resolves the gate before any child renders.",
    items: [
      { name: "(admin)", meta: "SUPER_ADMIN · SUPER_ADMIN_EMPLOYEE" },
      { name: "(dashboard)", meta: "importer — signed org cookie + membership" },
      { name: "(china)", meta: "sourcing partner — + isChinaPartner" },
      { name: "(broker)", meta: "customs broker org" },
      { name: "(auth)", meta: "login · register owner|seller · reset" },
      { name: "/quote/[publicToken]", meta: "tokenized proposal, no account needed" },
    ],
  },
  app: {
    title: "Next.js App Router",
    summary:
      "Server Components by default, dynamic-first. No cache layer — request-level memoization plus explicit revalidation.",
    items: [
      { name: "50 files with 'use server'", meta: "auth → zod → ownership → service" },
      { name: "15 route handlers", meta: "webhooks, AI stream, PDF, CSV/XLSX import" },
      { name: "React.cache()", meta: "memoizes auth + org lookup per request" },
      { name: "185 revalidatePath()", meta: "invalidation is explicit, not tag-based" },
      { name: "proxy.ts", meta: "refreshes Supabase session, skips webhook routes" },
      { name: "next-intl", meta: "pt · en · zh from a cookie" },
    ],
  },
  services: {
    title: "Service layer",
    summary:
      "~12.5k LOC orchestrating Drizzle plus the integration adapters. Every entry point re-checks org ownership.",
    items: [
      { name: "quote-workflow.service", meta: "947 LOC" },
      { name: "sourcing.service", meta: "843 LOC" },
      { name: "shipment-merge.service", meta: "831 LOC · integration tested" },
      { name: "simulation-items.service", meta: "715 LOC" },
      { name: "product.service", meta: "574 LOC" },
      { name: "zapsign · shipsgo · asaas", meta: "integration adapters" },
    ],
  },
  domain: {
    title: "Domain engine · pure",
    summary:
      "The only part of the codebase with zero database imports. Money never touches a JS number.",
    items: [
      { name: "landed-cost-engine.ts", meta: "orchestrates the cascade" },
      { name: "tax-cascade.ts", meta: "II → IPI → PIS/COFINS → ICMS por dentro" },
      { name: "apportionment.ts", meta: "splits freight/insurance across line items" },
      { name: "Decimal.js", meta: "ROUND_HALF_UP at every step" },
      { name: "landed-cost-engine.test.ts", meta: "bun test" },
    ],
  },
  db: {
    title: "PostgreSQL · Drizzle",
    summary:
      "55 tables across 12 schema modules, 26 migrations. Supabase transaction pooler, prepare: false.",
    items: [
      { name: "quotes · quote_items", meta: "frozen tax snapshots per item" },
      { name: "shipments", meta: "DUIMP + legacy DI, 3 org relations" },
      { name: "transactions · exchange_contracts", meta: "dual Asaas accounts" },
      { name: "sourcing_requests · quotations", meta: "China portal" },
      { name: "audit_logs · integration_logs", meta: "old/new values + changedKeys" },
      { name: "webhook_events", meta: "inbound queue, attempts + lastError" },
    ],
  },
  webhooks: {
    title: "Inbound webhooks",
    summary:
      "Thin by design: verify, find the local row, emit an event. No business logic. Excluded from the auth proxy matcher — they carry no user session.",
    items: [
      { name: "/api/webhooks/shipsgo", meta: "hmac-sha256 · timingSafeEqual" },
      { name: "/api/webhooks/asaas", meta: "asaas-access-token header" },
      { name: "/api/webhooks/zapsign", meta: "doc_signed · doc_refused" },
      { name: "webhook_events", meta: "every delivery persisted before processing" },
    ],
  },
  inngest: {
    title: "Inngest · 18 durable functions",
    summary:
      "Serialised one-per-shipment, retried three times, idempotent through guarded UPDATEs. Replaces hand-rolled state machines and cron polling.",
    items: [
      { name: "shipment-step-evaluator", meta: "the core state machine" },
      { name: "quote-contract-signed", meta: "quote → shipment, in one transaction" },
      { name: "shipment-invoice-scheduler", meta: "step.sleepUntil(eta) — no polling" },
      { name: "amendment-signed / refused", meta: "human-in-the-loop saga" },
      { name: "shipment-duimp-registered", meta: "pulls the customs snapshot" },
      { name: "sourcing-daily-reminder", meta: "cron 0 1 * * * — 09:00 Shanghai" },
    ],
  },
  external: {
    title: "External systems",
    summary:
      "Every outbound call is logged with its payload in integration_logs.",
    items: [
      { name: "Siscomex Portal Único", meta: "auth · CATP · CADA · DUIMP · Carga" },
      { name: "Asaas", meta: "two accounts — BR imports and 2B service fees" },
      { name: "ZapSign", meta: "contract + amendment e-signature" },
      { name: "ShipsGo", meta: "container and air waybill tracking" },
      { name: "Evolution API", meta: "WhatsApp notifications" },
      { name: "BCB PTAX · Mailtrap", meta: "FX rate · transactional email" },
    ],
  },
  ai: {
    title: "AI layer",
    summary:
      "Claude through the Vercel AI SDK. Tenancy is enforced outside the model — organizationId is closed over, never an argument the LLM can set.",
    items: [
      { name: "claude-sonnet-4-6", meta: "invoice / product-list parsing" },
      { name: "claude-haiku-4-5", meta: "assistant + NCM suggestion" },
      { name: "buildAssistantTools(ctx)", meta: "org context closed over the tools" },
      { name: "ai_usage_daily", meta: "atomic per-org daily rate limit" },
      { name: "history-window.ts", meta: "trims to a valid tool-call boundary" },
    ],
  },
};

export default function SgSystemMap() {
  return (
    <SystemMap
      label="System map"
      nodes={NODES}
      edges={EDGES}
      details={DETAILS}
      initial="inngest"
    />
  );
}
