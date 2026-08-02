"use client";
import { motion } from "framer-motion";
import { Frame, mono, monoLower, useTicker } from "./shared";

type Row = {
  label: string;
  formula: string;
  value: string;
  note?: string;
  kind?: "sum" | "accent";
};

const ROWS: Row[] = [
  {
    label: "CIF",
    formula: "fob + freight + insurance",
    value: "100.000,00",
    note: "capatazia / THC stay out of the base — Decree 11.090",
  },
  { label: "II · 16%", formula: "CIF × 16%", value: "16.000,00" },
  {
    label: "IPI · 9,75%",
    formula: "(CIF + II) × 9,75%",
    value: "11.310,00",
    note: "the IPI base already carries the II",
  },
  {
    label: "PIS · 2,10%",
    formula: "CIF × 2,10%",
    value: "2.100,00",
    note: "no ICMS in the base — STF, RE 559.937",
  },
  { label: "COFINS · 9,65%", formula: "CIF × 9,65%", value: "9.650,00" },
  {
    label: "Siscomex",
    formula: "per adição",
    value: "154,23",
    note: "grouped by NCM + manufacturer, not per line item",
  },
  { label: "AFRMM", formula: "ocean freight × 8%", value: "960,00" },
  {
    label: "ICMS base",
    formula: "sum of everything above",
    value: "140.174,23",
    kind: "sum",
  },
  {
    label: "ICMS · 18% por dentro",
    formula: "base ÷ (1 − 0,18) − base",
    value: "30.769,95",
    note: "the tax sits inside its own base — a gross-up, not a flat 18%",
    kind: "accent",
  },
  { label: "landed cost", formula: "base + ICMS", value: "170.944,18", kind: "sum" },
];

export default function SgTaxCascade() {
  const { ref, i } = useTicker(ROWS.length, 520);

  return (
    <Frame
      innerRef={ref}
      label="Import tax cascade — one line item"
      note={
        <>
          Every step in <span className="text-ink/68">Decimal.js</span> with{" "}
          <span className="text-ink/68">ROUND_HALF_UP</span> applied per stage. The
          engine imports no database code and is unit tested in isolation.
        </>
      }
    >
      <div className="flex flex-col">
        {ROWS.map((r, n) => {
          const on = i >= n;
          const accent = r.kind === "accent";
          const sum = r.kind === "sum";
          return (
            <motion.div
              key={r.label}
              animate={{ opacity: on ? 1 : 0.22 }}
              transition={{ duration: 0.3 }}
              className={`grid grid-cols-12 gap-x-2 items-baseline py-2 ${
                sum || accent ? "border-t border-ink/18 mt-1" : ""
              }`}
            >
              <p
                className={`${mono} col-span-6 sm:col-span-4 ${
                  accent ? "text-accent" : sum ? "text-ink/80" : "text-ink/72"
                }`}
              >
                {r.label}
              </p>
              <p className={`${monoLower} hidden sm:block sm:col-span-4 text-ink/42`}>
                {r.formula}
              </p>
              <p
                className={`${mono} col-span-6 sm:col-span-4 text-right tabular-nums ${
                  accent ? "text-accent" : "text-ink/90"
                }`}
              >
                {r.value}
              </p>
              {r.note && (
                <p
                  className={`${monoLower} col-span-12 text-ink/42 mt-0.5 sm:col-start-5 sm:col-span-8`}
                >
                  {r.note}
                </p>
              )}
            </motion.div>
          );
        })}

        <motion.div
          animate={{ opacity: i >= ROWS.length - 1 ? 1 : 0.22 }}
          transition={{ duration: 0.3 }}
          className="mt-4 border border-ink/12 rounded-md p-3 bg-surface"
        >
          <p className={`${monoLower} text-ink/58`}>
            A naive ICMS (base × 18%) returns{" "}
            <span className="text-ink/80 tabular-nums">25.231,36</span> — off by{" "}
            <span className="text-accent tabular-nums">5.538,59</span> on a single
            item, then multiplied across every line of every invoice.
          </p>
        </motion.div>
      </div>
    </Frame>
  );
}
