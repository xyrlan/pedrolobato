"use client";
import { motion } from "framer-motion";
import { Frame, mono, monoLower, useTicker } from "./shared";

const COLS = [
  {
    mode: "enforce · true",
    who: "storefront · table qr",
    reason: "the customer is still choosing — refusing is the honest answer",
    steps: [
      "runs inside the order transaction",
      "UPDATE … WHERE stockQuantity >= qty",
      "0 rows → shortage, collect and continue",
      "throws → order + items roll back together",
    ],
    note: "The WHERE clause is a compare-and-swap: no lock, and negative stock is unreachable even under concurrent orders. The loop keeps going to report every shortage at once instead of one per attempt.",
    accent: true,
  },
  {
    mode: "enforce · false",
    who: "manual pos · payment webhook",
    reason: "the money is already captured, or the owner is looking at the shelf",
    steps: [
      "runs after the commit, isolated",
      "clamp to 0 first, then decrement",
      "never throws, never refuses",
      "order survives regardless",
    ],
    note: "Order matters: decrementing first would let the clamp re-match the row it just reduced and zero it. Refusing here would leave a customer charged with no order — the worse failure.",
  },
];

export default function MnStock() {
  const { ref, i } = useTicker(6, 700);

  return (
    <Frame
      innerRef={ref}
      label="Refusing a sale is a business decision, not a technical one"
      note="Reversal idempotency is derived from the ledger rather than a flag: cancelling reads the SALE movements for that order and restores exactly what was recorded, then writes CANCEL_REVERSAL rows. Running it twice is a no-op because the second run sees the reversal already there."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {COLS.map((c, ci) => (
          <motion.div
            key={c.mode}
            animate={{ opacity: i >= ci ? 1 : 0.25 }}
            transition={{ duration: 0.3 }}
            className={`border rounded-md p-3 md:p-4 ${
              c.accent ? "border-accent/35" : "border-ink/12"
            }`}
          >
            <p className={`${mono} ${c.accent ? "text-accent" : "text-ink/85"}`}>
              {c.mode}
            </p>
            <p className={`${monoLower} text-ink/45 mt-0.5`}>{c.who}</p>
            <p className={`${monoLower} text-ink/62 mt-2`}>{c.reason}</p>

            <div className="mt-3 flex flex-col gap-1.5">
              {c.steps.map((s, si) => (
                <motion.div
                  key={s}
                  animate={{ opacity: i >= 2 + si ? 1 : 0.3 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-ink/28 text-[10px] shrink-0">▸</span>
                  <span className={`${monoLower} text-ink/80`}>{s}</span>
                </motion.div>
              ))}
            </div>

            <p
              className={`${monoLower} text-ink/42 mt-3 pt-3 border-t border-ink/12`}
            >
              {c.note}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 border border-ink/12 rounded-md p-3 bg-surface">
        <p className={`${monoLower} text-ink/62`}>
          Availability is derived, never a stored status:{" "}
          <span className="text-ink/85">
            status === true &amp;&amp; (stockQuantity == null || stockQuantity &gt; 0)
          </span>{" "}
          — so sold-out is reversible on restock and never gets confused with an item the
          owner deliberately disabled.
        </p>
      </div>
    </Frame>
  );
}
