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
        "Rebuilt the platform from scratch as version 2.0 and took it live with the business running on the old one: pages now arrive already rendered from the server instead of loading data from the browser, screens no longer show outdated information after an action, and the operations team went from a tool they worked around to one they work in.",
        "Replaced manual customs spreadsheets with an import tax engine that computes the full Brazilian chain — II, IPI, PIS/COFINS, Siscomex, AFRMM and the ICMS gross-up — to the cent. The previous flat-rate estimate was off by thousands of reais per invoice line, which is the difference between quoting an import at a profit or at a loss.",
        "Automated the order lifecycle — payment reconciliation, customs progression, document generation — as background work that retries itself and resumes where it stopped. A government API going down or a crash mid-process no longer leaves an order silently stuck waiting for someone to notice; it also guarantees a shipment is never processed twice.",
        "Isolated four kinds of user in one product — importer, Chinese sourcing partner, customs broker and internal staff — so each one only ever reaches its own data, with access decided before a page renders rather than hidden in the interface.",
        "Moved every customer and order out of the legacy system into the new data model with no downtime and no data loss, simplifying the order flow from 11 steps to 7 along the way. The migration could stop and resume at any point, so a failure cost minutes instead of a full restart.",
        "Connected the platform to the systems importers depend on — the Brazilian federal customs portal (Siscomex), payments, e-signature and international shipment tracking — so status that used to be checked by hand across four sites updates itself in one place.",
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
        "Own the map engine the whole product is built on — 4.4k lines of TypeScript where a new map layer is added by describing it, not by writing rendering code. Analysts get new data on the map in hours instead of a release cycle.",
        "Kept the map trustworthy under fast filtering: results that arrive after the user has already changed the filters are discarded instead of painted, so what's on screen always matches what was asked — a class of bug that shows no error and quietly misleads whoever is reading the map.",
        "Fixed clicks that silently stopped working on certain properties: Google Maps emits no event for one geometry type, so the pipeline now splits those into individually selectable areas, keeping every property on the map inspectable.",
        "Turned five interacting layer-selection rules — including the inverted case where turning a parent off turns its children on — into one predictable, testable decision instead of behaviour scattered across the interface.",
        "Kept thousands of properties smooth and clickable in the browser: rendering only what's in view, redrawing only when the map settles, and keeping the interface responsive while heavy layers load or tear down.",
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
        "Own the subscriber app end to end — 39 screens, shipped to 12,000+ paying subscribers — plus the backend behind it, built on top of a billing system that was processing real charges the entire time and could never be paused.",
        "Found that only 365 of 11,759 subscribers had ever logged in — the club was billing people who never opened what they paid for. Rebuilt onboarding so an account is created the moment the subscriber first arrives, instead of being pre-created in bulk and waiting for a login that never came.",
        "Built the loyalty program that turns the subscription into a reason to come back: points that earn, expire and can be reversed individually, so a refunded order or an expired reward corrects itself without an operator recalculating balances — and a subscriber can't redeem the same reward twice by tapping twice.",
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
        "Gave each restaurant five ways to receive an order — online storefront, QR code at the table, counter POS, payment link and WhatsApp — all landing in the same kitchen queue. Adding a channel takes no new order logic, and a failure while printing a ticket or sending a notification can no longer lose an order the customer already placed. Restaurants sell where the customer already is instead of forcing everyone through one door.",
        "Made overselling impossible where it matters and harmless where it doesn't: an item that runs out during checkout stops being sold instantly, but an order already paid for is always accepted — refusing it would leave a customer charged with no order.",
        "Made subscription billing self-correcting: a payment confirmation arriving twice, late or out of order never charges a store twice, never downgrades an active plan by mistake, and never needs manual reconciliation — so revenue collection runs without me watching it.",
        "Tracked down cash-register totals that didn't match the day's sales: closing a table detached its payment from the shift, so the most common way of paying was the one that broke. Rewrote how payments attach to a shift, and the registers have closed correctly since.",
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
