"use client";
import { motion } from "framer-motion";
import { Frame, mono, monoLower, useTicker } from "./shared";

const GUARDS = [
  {
    guard: "signature + replay window",
    detail: "constructEvent with a 300s tolerance",
    why: "an old captured body cannot be replayed later",
  },
  {
    guard: "effect and marker share one transaction",
    detail: "$transaction([...ops, processedWebhookEvent.create()])",
    why: "applying the effect then failing to record it would let a retry duplicate it",
    accent: true,
  },
  {
    guard: "P2002 on the marker is benign",
    detail: "another worker already applied it — log a warning, return null",
    why: "a concurrent duplicate is not an error worth failing the request over",
  },
  {
    guard: "watermark for out-of-order events",
    detail: "updateMany WHERE stripeSubscriptionUpdatedAt < eventDate",
    why: "Stripe does not guarantee ordering — the WHERE clause is the atomic barrier",
    accent: true,
  },
  {
    guard: "post-transaction race detection",
    detail: "count === 0 without the pre-check firing → tagged post-tx-race",
    why: "separates a real lost race from an expected skip, instead of silently swallowing both",
  },
  {
    guard: "permanent vs transient errors",
    detail: "Stripe 4xx → mark processed, return 200",
    why: "retrying a permanently invalid event forever buys nothing; everything else returns 500",
  },
];

export default function MnStripe() {
  const { ref, i } = useTicker(GUARDS.length, 640);

  return (
    <Frame
      innerRef={ref}
      label="Subscription webhook — six guards"
      note="Recovery from past_due is driven by invoice.payment_succeeded rather than subscription.updated, because subscription.updated fires on any change and could restore access without the debt actually being paid. On failure the paid period end is preserved, so gating comes from a separate flag instead of destroying the date the UI needs."
    >
      <div className="flex flex-col">
        {GUARDS.map((g, n) => {
          const on = i >= n;
          return (
            <motion.div
              key={g.guard}
              animate={{ opacity: on ? 1 : 0.22 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-x-3 py-2.5 border-t border-ink/12 first:border-t-0"
            >
              <div className="col-span-12 sm:col-span-5 flex items-baseline gap-2">
                <span
                  className={`${monoLower} ${
                    g.accent ? "text-accent/70" : "text-ink/28"
                  } shrink-0`}
                >
                  {String(n + 1).padStart(2, "0")}
                </span>
                <p className={`${mono} ${g.accent ? "text-accent" : "text-ink/85"}`}>
                  {g.guard}
                </p>
              </div>
              <div className="col-span-12 sm:col-span-7 mt-1 sm:mt-0">
                <p className={`${monoLower} text-ink/72`}>{g.detail}</p>
                <p className={`${monoLower} text-ink/42 mt-0.5`}>{g.why}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Frame>
  );
}
