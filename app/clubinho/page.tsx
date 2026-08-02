import ProjectPage from "@/components/ProjectPage";

export default function Clubinho() {
  const data = {
    title: "Clubinho — Corações Preciosos",
    description:
      "The mobile product and loyalty platform for a Brazilian children's book subscription club with over 12,000 active subscribers.",
    articleImage: "/clubinho/clubinhocover.png",
    content:
      "Corações Preciosos ships monthly boxes of children's books to more than 12,000 paying families. I own the subscriber-facing half: the React Native app they use every month, and the retention platform behind it — a points currency, a redemption store, a referral program, push infrastructure and a community support network. The billing and fulfillment engine was already running and built by other engineers; my work had to integrate with it in production, never pause it.",
    role: ["Mobile Engineer", "Full Stack", "Product"],
    tools: [
      "React Native",
      "Expo SDK 54",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "EAS",
    ],
    integrations: ["Expo Push", "AppMax (existing)", "Discord", "Panel ACL"],
    duration: "2026 - Present",
    features: [
      {
        title: "What I built, and what I built it on",
        description:
          "A shared NestJS API and one Postgres database, where the modules I own sit next to a billing and fulfillment engine written by others. The map marks the boundary — tap any node to open it.",
        visual: "cb-system-map" as const,
      },
      {
        title: "Points as a ledger of lots, not a number on a row",
        description:
          "Clubzz points move through a per-lot lifecycle — pendente → aprovada → reservada → debitada, plus expirada and anulada — so expiring a reward or reversing a charge touches only the lot it came from, instead of reconciling a single mutable balance after the fact.",
      },
      {
        title: "Double-click protection pushed into the schema",
        description:
          "Redemption is guarded by a partial unique index on (client_id, product_id) WHERE status = 'pending'. A second tap becomes a database constraint violation rather than a race the API layer has to win — and it holds no matter which route or job reaches the table.",
      },
      {
        title: "Privacy as the constraint that shaped the module",
        description:
          "Rede de Apoio carries prayer requests, some describing real crises. Request text never enters a push payload or a log line; automatic risk triage blocks publication and routes to CVV 188, SAMU 192 and 180; consent is versioned, retention is 90 days, and no AI-generated text is ever shown to a subscriber.",
      },
      {
        title: "Signed media the native player can actually use",
        description:
          "The offline audio player streams from URLs signed with HMAC-SHA256 over trackId:exp and compared with timingSafeEqual, on a 6-hour TTL — self-contained because a native player cannot attach a custom auth header. Expiry is validated with Number.isInteger rather than isNaN, which would coerce a raw string and reopen the bypass.",
      },
      {
        title: "Push that survives its own scale",
        description:
          "Expo Push delivery batched 100 tokens at a time, pruning devices Expo reports as DeviceNotRegistered so dead tokens never accumulate, with digest and urgency sweeps on separate cadences to keep notification pressure off the same people.",
      },
    ],
  };
  return <ProjectPage data={data} />;
}
