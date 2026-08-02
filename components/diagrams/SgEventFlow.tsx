"use client";
import { motion } from "framer-motion";
import { Chip, Frame, Link, Node, mono, monoLower, useTicker } from "./shared";

const SOURCES = ["zapsign", "asaas", "shipsgo"];

const STEPS = [
  "payment",
  "shipping prep",
  "documents",
  "customs",
  "completion",
];

// 0 webhook · 1 verify · 2 send · 3 evaluator · 4 commit + notify
const STAGES = 5;

export default function SgEventFlow() {
  const { ref, i } = useTicker(STAGES, 950);
  const on = (n: number) => i >= n;
  const cycle = i < 0 ? 0 : i % SOURCES.length;

  return (
    <Frame
      innerRef={ref}
      label="Inbound webhook → durable workflow"
      note={
        <>
          Webhook routes are excluded from the auth proxy matcher — they carry no user
          session and verify themselves. Every side effect lives inside a{" "}
          <span className="text-ink/68">step.run()</span>, so a retry replays only the
          step that failed.
        </>
      }
    >
      <div className="flex flex-col items-center">
        {/* sources */}
        <Node active={on(0)} title="webhook">
          <div className="flex flex-wrap gap-1.5 mt-2">
            {SOURCES.map((s, n) => (
              <Chip key={s} active={on(0) && cycle === n}>
                {s}
              </Chip>
            ))}
          </div>
        </Node>

        <Link active={i === 1} label="hmac-sha256 · timingSafeEqual" />

        <Node active={on(1)} title="verify + look up local row" />

        <Link active={i === 2} label="thin handler, no business logic" />

        <Node active={on(2)} title="inngest.send(event)" />

        <Link active={i === 3} />

        <Node active={on(3)} title="shipment-step-evaluator" accent>
          <div className={`${monoLower} text-ink/58 mt-2 space-y-0.5`}>
            <p>concurrency: {"{"} key: shipmentId, limit: 1 {"}"}</p>
            <p>retries: 3 · idempotent guarded UPDATE</p>
            <p>step.sleepUntil(eta) — no cron polling</p>
          </div>
        </Node>

        <Link active={i === 4} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
          <Node active={on(4)} title="postgres tx" />
          <Node active={on(4)} title="in-app notify" />
          <Node active={on(4)} title="whatsapp" />
        </div>

        {/* shipment step machine */}
        <div className="w-full mt-6 pt-5 border-t border-ink/12">
          <p className={`${mono} text-ink/46 mb-3`}>shipment state machine</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {STEPS.map((s, n) => {
              const lit = on(3) && n <= cycle;
              return (
                <div key={s} className="flex items-center gap-2">
                  <motion.span
                    animate={{
                      color: lit ? "rgba(52,211,153,1)" : "rgba(255,255,255,0.36)",
                      borderColor: lit ? "rgba(52,211,153,.5)" : "rgba(255,255,255,0.16)",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`${mono} border rounded px-2 py-1`}
                  >
                    {s}
                  </motion.span>
                  {n < STEPS.length - 1 && (
                    <span className="text-ink/30 text-[10px]">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Frame>
  );
}
