"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Frame, mono, monoLower, useTicker } from "./shared";

const PERSONAS = [
  {
    group: "(admin)",
    who: "platform staff",
    gate: ["systemRole = SUPER_ADMIN", "| SUPER_ADMIN_EMPLOYEE"],
    sees: "every organization, rate tables, audit logs",
  },
  {
    group: "(dashboard)",
    who: "importer",
    gate: ["signed org cookie", "+ membership row"],
    sees: "own quotes, shipments, invoices and documents",
  },
  {
    group: "(china)",
    who: "sourcing partner",
    gate: ["…all of the above", "+ isChinaPartner"],
    sees: "only sourcing requests assigned to that partner",
  },
  {
    group: "(broker)",
    who: "customs broker",
    gate: ["…all of the above", "+ broker org"],
    sees: "shipments where it is the customs broker, at customs stage",
  },
];

export default function SgTenancy() {
  const { ref, i } = useTicker(PERSONAS.length, 1100);
  const [hover, setHover] = useState<number | null>(null);
  const focus = hover ?? (i >= PERSONAS.length ? null : i);

  return (
    <Frame
      innerRef={ref}
      label="Four personas, one database"
      note={
        <>
          The gate lives in each route group&apos;s{" "}
          <span className="text-ink/68">layout.tsx</span> as an async Server Component —
          it resolves before any child renders, so an unauthorised page never reaches the
          client. Services re-check ownership on every call.
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PERSONAS.map((p, n) => {
          const on = focus === n;
          return (
            <motion.div
              key={p.group}
              onHoverStart={() => setHover(n)}
              onHoverEnd={() => setHover(null)}
              animate={{
                borderColor: on ? "rgba(163,230,53,.5)" : "rgba(255,255,255,0.16)",
                backgroundColor: on ? "rgba(255,255,255,.06)" : "rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.3 }}
              className="border rounded-md p-3 md:p-4 cursor-default"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className={`${mono} ${on ? "text-accent" : "text-ink/80"}`}>
                  {p.group}
                </p>
                <p className={`${monoLower} text-ink/42`}>{p.who}</p>
              </div>
              <div className={`${monoLower} text-ink/52 mt-2`}>
                {p.gate.map((g) => (
                  <p key={g}>{g}</p>
                ))}
              </div>
              <motion.p
                animate={{ opacity: on ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className={`${monoLower} text-ink/68 mt-2 pt-2 border-t border-ink/[.07]`}
              >
                {p.sees}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* org resolution */}
      <div className="mt-4 border border-ink/12 rounded-md p-3">
        <p className={`${mono} text-ink/46 mb-2`}>active org resolution</p>
        <div className={`${monoLower} text-ink/62 space-y-0.5`}>
          <p>cookie active_organization_id</p>
          <p>+ active_organization_sig — hmac-sha256, constant-time compare</p>
          <p className="text-ink/42">tampered or stale → redirect /api/clear-org</p>
        </div>
      </div>

      {/* one table, three roles */}
      <div className="mt-2 border border-ink/12 rounded-md p-3">
        <p className={`${mono} text-ink/46 mb-3`}>
          one shipments row, three organization roles
        </p>
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-12 sm:col-span-4">
            <div className="border border-ink/18 rounded px-2 py-1.5 bg-surface">
              <p className={`${mono} text-ink/80`}>shipments</p>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-8 space-y-1">
            {["asSeller", "asClient", "asCustomsBroker"].map((rel) => (
              <div key={rel} className="flex items-center gap-2">
                <span className="text-ink/30 text-[10px]">→</span>
                <span className={`${monoLower} text-ink/58 w-[8.5em]`}>{rel}</span>
                <span className={`${mono} text-ink/46`}>organizations</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
