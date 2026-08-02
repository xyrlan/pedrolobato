export const cv = {
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
        "Led a full rewrite from a client-fetching React monolith to Next.js Server Components, moving data loading to the server and replacing an SWR cache with explicit revalidation — which cut the initial JavaScript payload and removed a whole class of stale-UI bugs.",
        "Replaced hand-rolled state machines and cron polling with 18 durable Inngest functions, serialised one-per-shipment through a concurrency key and made idempotent with guarded UPDATEs, so payment reconciliation and customs progression survive crashes, retries and third-party outages instead of stalling silently.",
        "Built the import tax engine as a pure module with zero database imports — CIF → II → IPI → PIS/COFINS → Siscomex → AFRMM → ICMS gross-up — computed in Decimal.js with ROUND_HALF_UP at each stage, because a naive flat-rate ICMS was off by thousands of reais per invoice line.",
        "Modelled multi-tenancy as route groups whose layouts resolve the access gate before any child renders, backed by an HMAC-signed organization cookie with constant-time comparison, isolating four personas — importer, Chinese sourcing partner, customs broker and platform staff — over 55 tables.",
        "Migrated live production data as two versioned pipelines of idempotent phases with the old-to-new id map persisted in its own table, so a crash mid-migration resumed where it stopped instead of restarting; the legacy 11-step order model collapsed to 7 steps in the process.",
        "Integrated Siscomex Portal Único (DUIMP, CATP, CADA, Carga), Asaas payments across two accounts, ZapSign e-signature and ShipsGo tracking — each inbound webhook verifying its signature and landing in a persisted event queue before any business logic runs.",
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
        "Own the map layer engine: 4.4k lines of framework-free TypeScript where layers are declared as data — click handlers included, as typed keys into a registry — and a factory resolves one of five rendering strategies behind a single interface, so adding a strategy is one subclass and one switch case rather than edits across the calling code.",
        "Built the GeoJSON pipeline around failures that surface no error: Google's Data layer fires no events on a GeometryCollection, so each one is expanded into standalone features carrying the parent's id and properties — without it, clicks stop working silently.",
        "Stopped stale geometry from ever painting by revalidating each response against the current filters after the await, not just aborting on change — because an aborted request still resolves — with the same guard mirrored on the error path so a stale 404 never surfaces over live data.",
        "Isolated five interacting layer-selection rules into a pure function over a Set — single, special, drill-down, exclusive, default, in fixed precedence — keeping behaviour testable instead of scattered through components, including the inverted case where deactivating a parent activates its children.",
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
        "Re-architected onboarding after measuring that only 365 of 11,759 subscribers had ever logged in: replaced bulk pre-provisioned accounts, which converted at 8%, with just-in-time provisioning at first access.",
        "Modelled the loyalty currency as a ledger of lots with their own lifecycle — pending, approved, reserved, debited, expired, voided — so expiring a reward or reversing a charge affects only the lot it came from, instead of reconciling one mutable balance after the fact.",
        "Moved double-click protection on reward redemption into the schema as a partial unique index on (client_id, product_id) WHERE status = 'pending', making a duplicate a database constraint violation rather than a race the API layer has to win from every route and job.",
        "Designed a community support module around its privacy constraints: request text never enters a push payload or a log line, automatic risk triage blocks publication and routes to emergency services, consent is versioned, and no AI-generated text is ever shown to a subscriber.",
        "Built an offline audio player served over HMAC-SHA256 signed URLs with constant-time comparison and a 6-hour TTL — self-contained because native players cannot attach auth headers — validating expiry with Number.isInteger to close a string-coercion bypass.",
      ],
    },
    {
      role: "Software Engineer · Founder",
      company: "Meunu",
      link: "https://meunu.com.br",
      mode: "Remote",
      period: "08/2023 - Present",
      summary:
        "Multi-tenant restaurant SaaS, built and operated solo across 971 commits: 364 stores signed up — 74 in the last 30 days — serving 1,085 diners across 2,531 orders, roughly a fifth of them in the last month.",
      bullets: [
        "Converged five order channels — storefront, table QR, manual POS, payment webhook and WhatsApp — on a single creation path, drawing the transaction boundary around what must be true together and pushing printing, notifications and non-blocking stock past the commit in isolated handlers, so none of them can destroy an order that already exists.",
        "Made stock enforcement a per-channel decision rather than one rule: customer channels decrement inside the transaction with UPDATE … WHERE stockQuantity >= qty, a compare-and-swap that makes negative stock unreachable without locking, while post-payment channels clamp instead of refusing — because rejecting a captured payment leaves a customer charged with no order.",
        "Replaced a realtime subscription service with a polling protocol that elects a single tab through the Web Locks API, short-circuits on MAX(updatedAt) before touching the snapshot query, and fans the delta out over BroadcastChannel — then cut ~40% of platform request volume by trading two seconds of latency.",
        "Wrote the subscription webhook to assume redelivery: effect and idempotency marker committed in one transaction, out-of-order events rejected by a watermark inside the WHERE clause rather than trusted timestamps, and permanently invalid events acknowledged so the provider stops retrying what can never succeed.",
        "Traced a cash-register shortfall to a single root cause — finishing a table nulls the foreign key that scopes its payment to the tenant, so the normal pay-then-close flow was the one that broke — and re-modelled payments to be created inside a shift instead of matched to one by time window.",
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
};
