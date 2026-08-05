import type { CV } from "./types";

export const en: CV = {
  name: "Pedro Lobato",
  title: "Software Engineer · Full Stack",
  location: "Brasília, DF · Remote",
  pdf: "/cv/pedro-lobato-cv.pdf",
  links: [
    { name: "xyrlancoding@gmail.com", url: "mailto:xyrlancoding@gmail.com" },
    { name: "linkedin.com/in/pedro-lobato", url: "https://linkedin.com/in/pedro-lobato" },
    { name: "github.com/xyrlan", url: "https://github.com/xyrlan" },
  ],
  skills: [
    { label: "Languages", items: "TypeScript, Python, C# (.NET), SQL" },
    {
      label: "Frameworks",
      items: "Next.js, React, Vue, Nuxt, NestJS, Node.js, .NET, Tailwind CSS, Motion, GSAP",
    },
    {
      label: "Data",
      items: "PostgreSQL, Drizzle ORM, Prisma, MongoDB, Redis, Supabase",
    },
    {
      label: "Platform",
      items: "Vercel, Cloudflare, Railway, Inngest, Bun, Sentry, Git",
    },
    { label: "AI", items: "Vercel AI SDK, Anthropic Claude, tool calling, RAG" },
    { label: "Languages spoken", items: "English (fluent), Portuguese (native)" },
  ],
  experience: [
    {
      role: "Principal Software Engineer",
      company: "Soul Global",
      link: "https://soulglobal.com.br",
      mode: "Remote",
      period: "05/2024 - Present",
      summary:
        "Import and logistics SaaS automating Brazilian customs, landed-cost pricing and shipment tracking.",
      bullets: [
        "Rebuilt the platform from scratch as version 2.0 and cut over with the business still running on the old one. Client-side fetching became Next.js Server Components with explicit revalidation in place of an SWR cache: pages arrive rendered, the initial JavaScript payload dropped, and a whole class of stale-UI bugs disappeared — operations went from a tool they worked around to one they work in.",
        "Replaced manual customs spreadsheets with an import tax engine accurate to the cent — CIF → II → IPI → PIS/COFINS → Siscomex → AFRMM → ICMS gross-up, computed in Decimal.js with ROUND_HALF_UP at each stage, as a pure module with zero database imports. The previous flat-rate ICMS estimate was off by thousands of reais per invoice line: the difference between quoting an import at a profit or at a loss.",
        "Automated the order lifecycle — payment reconciliation, customs progression, document generation — as 18 durable Inngest functions, serialised one-per-shipment through a concurrency key and made idempotent with guarded UPDATEs. A government API outage or a crash mid-process no longer leaves an order silently stuck waiting for someone to notice, and a shipment can never be processed twice.",
        "Isolated four personas in one product — importer, Chinese sourcing partner, customs broker and internal staff — over 55 tables, modelling tenancy as route groups whose layouts resolve the access gate before any child renders, backed by an HMAC-signed organization cookie with constant-time comparison. Access is decided before a page renders rather than hidden in the interface.",
        "Migrated every customer and order off the legacy system with no downtime and no data loss, as two versioned pipelines of idempotent phases with the old-to-new id map persisted in its own table — so a crash resumed where it stopped instead of restarting. The legacy 11-step order model collapsed to 7 in the process.",
        "Integrated Siscomex Portal Único (DUIMP, CATP, CADA, Carga), Asaas payments across two accounts, ZapSign e-signature and ShipsGo tracking — each inbound webhook verifying its signature and landing in a persisted event queue before any business logic runs. Status that used to be checked by hand across four sites now updates itself in one place.",
      ],
    },
    {
      role: "Front-End Engineer · Contract (PJ)",
      company: "Moovus — TerraLogs",
      mode: "Remote",
      period: "09/2025 - Present",
      summary:
        "Central de Inteligência, a geospatial intelligence platform over rural properties and mining processes, built in a two-engineer product team. Front-end only — and the architecture lives there.",
      bullets: [
        "Own the map layer engine the whole product is built on: 4.4k lines of framework-free TypeScript where layers are declared as data — click handlers included, as typed keys into a registry — and a factory resolves one of five rendering strategies behind a single interface. Adding a strategy is one subclass and one switch case, so analysts get new data on the map in hours instead of a release cycle.",
        "Kept the map trustworthy under fast filtering by revalidating each response against the current filters after the await, not just aborting on change — an aborted request still resolves — with the same guard mirrored on the error path so a stale 404 never surfaces over live data. Stale geometry showing as current is a bug that raises no error and quietly misleads whoever is reading the map.",
        "Built the GeoJSON pipeline around failures that surface no error: Google's Data layer fires no events on a GeometryCollection, so each one is expanded into standalone features carrying the parent's id and properties. Without it, clicks stop working on certain properties with nothing in the console to explain why.",
        "Isolated five interacting layer-selection rules into a pure function over a Set — single, special, drill-down, exclusive, default, in fixed precedence, including the inverted case where deactivating a parent activates its children — keeping behaviour testable instead of scattered through components.",
        "Kept thousands of features interactive on the main thread: freezing GeoJSON before it reaches reactive state so the framework never proxies it deeply, culling clusters to the viewport and re-rendering only on map idle, and yielding to the browser between teardown steps when switching visualization modes.",
      ],
    },
    {
      role: "Software Engineer · Contract (PJ)",
      company: "Corações Preciosos — Clubinho",
      mode: "Remote",
      period: "02/2026 - Present",
      summary:
        "Children's book subscription club with 12,000+ active subscribers. I own the subscriber-facing product and the retention platform behind it; the billing and fulfillment engine was built by other engineers on the team.",
      bullets: [
        "Own the React Native app end to end — 39 screens shipped through EAS to 12,000+ paying subscribers — alongside the backend modules behind it, integrating with a live billing system I could extend but never pause.",
        "Found that only 365 of 11,759 subscribers had ever logged in — the club was billing people who never opened what they paid for. Replaced bulk pre-provisioned accounts, which converted at 8%, with just-in-time provisioning at first access.",
        "Modelled the loyalty currency as a ledger of lots with their own lifecycle — pending, approved, reserved, debited, expired, voided — so expiring a reward or reversing a charge affects only the lot it came from instead of reconciling one mutable balance after the fact, and pushed double-redemption into the schema as a partial unique index on (client_id, product_id) WHERE status = 'pending', making a double tap a constraint violation rather than a race the API has to win from every route.",
      ],
    },
    {
      role: "Software Engineer · Founder",
      company: "Meunu",
      link: "https://meunu.com.br",
      mode: "Remote",
      period: "08/2023 - Present",
      summary:
        "Multi-tenant restaurant SaaS, built and operated solo: 360+ stores signed up, 2,500+ orders and 1,000+ diners served.",
      bullets: [
        "Converged five order channels — storefront, table QR, manual POS, payment webhook and WhatsApp — on a single creation path, drawing the transaction boundary around what must be true together and pushing printing, notifications and non-blocking stock past the commit in isolated handlers. Adding a channel takes no new order logic, and a failed print or notification can no longer destroy an order that already exists.",
        "Made stock enforcement a per-channel decision rather than one rule: customer channels decrement inside the transaction with UPDATE … WHERE stockQuantity >= qty, a compare-and-swap that makes negative stock unreachable without locking, while post-payment channels clamp instead of refusing — because rejecting a captured payment leaves a customer charged with no order.",
        "Wrote the subscription webhook to assume redelivery: effect and idempotency marker committed in one transaction, out-of-order events rejected by a watermark inside the WHERE clause rather than trusted timestamps, and permanently invalid events acknowledged so the provider stops retrying what can never succeed. Billing never double-charges, never downgrades an active plan by mistake and never needs manual reconciliation.",
        "Traced a cash-register shortfall to a single root cause — finishing a table nulls the foreign key that scopes its payment to the tenant, so the normal pay-then-close flow was the one that broke — and re-modelled payments to be created inside a shift instead of matched to one by time window. Registers have closed correctly since.",
      ],
    },
    {
      role: "Full Stack Developer · UI/UX",
      company: "Independent Practice",
      mode: "Remote",
      period: "03/2022 - Present",
      summary:
        "Direct client work — marketing sites, landing pages and product interfaces.",
      bullets: [
        "Built client sites in Next.js and TypeScript with Motion-driven interaction, treating animation as a way to direct attention through the page rather than decoration, to lift engagement and time on page.",
        "Grew Pesqueiro110 past 1,500 daily visits through SEO built on geographic targeting and content relevance rather than paid traffic — organic growth that kept working after the engagement ended.",
        "Added Sanity CMS-backed blogs so clients could publish without a developer, which is what kept the sites ranking over time.",
        "Translated business goals into interfaces directly with clients across several sectors, including StopByCafe (a café in central New York) and OABparaTodos (a campaign landing page for the Brazilian Bar Association, DF chapter).",
      ],
    },
  ],
  projects: [
    {
      name: "Clearframe",
      what:
        "Windows utility that restores windows apps hide on startup. Licensing bound to a hardware fingerprint signed with ECDSA, with a Stripe grace period so a failed renewal never locks a paying user out mid-session.",
    },
    {
      name: "BingX Robot",
      what:
        "Autonomous trading bot that separates the risk engine from the execution engine, so AI-driven portfolio decisions can never bypass the position guardrails.",
    },
  ],
  education: [
    {
      course: "Software Engineering",
      school: "Descomplica Faculdade",
      place: "Brasília, DF",
      period: "02/2023 - 06/2028",
    },
    {
      course: "English Proficiency",
      school: "Cultura Inglesa",
      place: "Brasília, DF",
      period: "06/2011 - 06/2017",
      note: "One of the largest English schools in Brazil",
    },
  ],
  ui: {
    metaTitle: "Pedro Lobato — CV",
    metaDescription:
      "Curriculum vitae of Pedro Lobato, software engineer working on import logistics, durable workflows and product interfaces.",
    downloadPdf: "Download PDF",
    backToWork: "← Back to work",
    skills: "Skills",
    experience: "Experience",
    projects: "Selected side projects",
    education: "Education",
    otherLocale: "Ver em português",
    otherLocaleHref: "/cv/pt",
  },
};
