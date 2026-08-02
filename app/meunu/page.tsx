import ProjectPage from "@/components/ProjectPage";

export default function Meunu() {
  const data = {
    title: "Meunu",
    description:
      "A multi-tenant restaurant SaaS I built and still run alone — 364 stores signed up, 1,085 diners served, 2,531 orders processed.",
    articleImage: "/meunu/meunuvideo.mp4",
    content:
      "Meunu is a digital menu, order board, table system, cash register and inventory for Brazilian restaurants — merchant dashboard on one side, a public per-subdomain storefront on the other. 364 stores have signed up, 74 of them in the last 30 days, and 33 are running orders through it; 1,085 distinct diners have ordered, across 2,531 orders since April 2024 — roughly a fifth of them in the last month. Solo across three years and 971 commits: the product decisions, the schema, the money handling and the on-call are all mine. That constraint shaped the architecture more than any preference did.",
    role: ["Founder", "Software Engineer", "Full Stack"],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "SWR",
      "TailwindCSS",
      "Playwright",
    ],
    integrations: ["Stripe", "Mercado Pago", "WhatsApp Cloud API", "Sentry", "Vercel"],
    duration: "2023 - Present",
    links: [
      {
        name: "meunu.com.br",
        url: "https://meunu.com.br",
        icon: "🌐",
      },
    ],
    features: [
      {
        title: "Five ways to place an order, one transaction boundary",
        description:
          "Storefront, table QR, manual POS, payment webhook and WhatsApp all converge on a single function. What belongs in the transaction is what must be true together; the printer, the notifications and the non-blocking stock path run after the commit, each isolated — because a failure there must never destroy an order that already exists.",
        visual: "mn-system-map" as const,
      },
      {
        title: "Whether to refuse a sale depends on the channel",
        description:
          "Out of stock is not one rule. On the storefront the customer is still choosing, so the decrement runs inside the transaction as UPDATE … WHERE stockQuantity >= qty — a compare-and-swap that makes negative stock unreachable without any lock. On a webhook the money is already captured, so the same code clamps to zero instead of failing, because refusing there would leave someone charged with no order.",
        visual: "mn-stock" as const,
      },
      {
        title: "Realtime without a websocket",
        description:
          "Supabase Realtime was removed on purpose. What replaced it is a polling protocol: one tab wins a Web Locks lease and becomes the only poller, the server short-circuits on MAX(updatedAt) before running any snapshot query, and the delta fans out to the other tabs over BroadcastChannel. Moving the interval from 3s to 5s cut about 40% of the platform's request volume for two seconds of latency.",
        visual: "mn-realtime" as const,
      },
      {
        title: "A subscription webhook that assumes it will be retried",
        description:
          "The effect and its idempotency marker are written in the same transaction, because applying one without recording the other is what turns a retry into a double grant. Out-of-order delivery is handled by a watermark in the WHERE clause rather than by trusting timestamps, and permanent failures are marked processed and answered 200 so Stripe stops retrying something that can never succeed.",
        visual: "mn-stripe" as const,
      },
      {
        title: "Diagnosing before fixing",
        description:
          "The cash register under-counted, and the write-up traced it to one cause: paying a table then finishing it nulls Payment.tableId, which is the only thing scoping that payment to a tenant — so the normal flow was precisely the one that broke. The same root cause explained two other symptoms, and the fix is a shiftId that makes a payment born inside a shift instead of being scraped into it by a time window.",
      },
      {
        title: "A scalability plan that argued with itself",
        description:
          "The performance write-up ran a review against its own first draft and published the corrections: the endpoint assumed to be expensive was round-trip bound rather than scan bound, and the obvious composite index was dropped once the predicate turned out to be a negation a b-tree cannot use. Cache targets were walked back after noticing hit rate falls as a store gets busier — tag invalidation means caching helps the idle store most.",
      },
    ],
  };

  return <ProjectPage data={data} />;
}
