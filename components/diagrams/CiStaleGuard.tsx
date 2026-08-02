"use client";
import { motion } from "framer-motion";
import { Frame, mono, monoLower, useTicker } from "./shared";

type Row = {
  actor: "user" | "code";
  label: string;
  detail: string;
  kind?: "discard" | "guard";
};

const ROWS: Row[] = [
  {
    actor: "user",
    label: "picks município A",
    detail: "UrlResolver produces url A · fetch starts",
  },
  {
    actor: "user",
    label: "changes to município B",
    detail: "300 ms later — the A request is still in flight",
  },
  {
    actor: "code",
    label: "url changed → abort",
    detail: "and resetLayers() runs immediately, before the async abort handler",
    kind: "guard",
  },
  {
    actor: "code",
    label: "fetch A resolves anyway",
    detail: "abort is not instantaneous — the response still arrives",
  },
  {
    actor: "code",
    label: "re-resolve url against current filters",
    detail: "A ≠ B → discard the payload, never paint it",
    kind: "discard",
  },
  {
    actor: "code",
    label: "same guard on the error path",
    detail: "a stale 404 for A never raises a toast while you are looking at B",
    kind: "guard",
  },
  {
    actor: "code",
    label: "cleanup only if still current",
    detail: "the finally block compares controller identity before clearing the map entry",
    kind: "guard",
  },
];

export default function CiStaleGuard() {
  const { ref, i } = useTicker(ROWS.length, 780);

  return (
    <Frame
      innerRef={ref}
      label="Why the map never paints a filter you already left"
      note="Aborting is not enough on its own: the response can still land, and the naive cleanup can clobber a newer request. The identity being compared is the resolved URL, which is also what the cache is keyed on."
    >
      <div className="flex flex-col">
        {ROWS.map((r, n) => {
          const on = i >= n;
          const discard = r.kind === "discard";
          const guard = r.kind === "guard";
          return (
            <motion.div
              key={r.label}
              animate={{ opacity: on ? 1 : 0.2 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-x-3 py-2.5 border-t border-ink/12 first:border-t-0"
            >
              <p
                className={`${monoLower} col-span-3 sm:col-span-2 ${
                  r.actor === "user" ? "text-ink/42" : "text-ink/28"
                }`}
              >
                {r.actor}
              </p>
              <div className="col-span-9 sm:col-span-10">
                <p
                  className={`${mono} ${
                    discard ? "text-accent" : guard ? "text-ink/85" : "text-ink/72"
                  }`}
                >
                  {r.label}
                </p>
                <p className={`${monoLower} text-ink/45 mt-0.5`}>{r.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Frame>
  );
}
