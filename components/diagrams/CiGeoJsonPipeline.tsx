"use client";
import { motion } from "framer-motion";
import { Frame, mono, monoLower, useTicker } from "./shared";

const STEPS: { step: string; detail: string; why?: string; accent?: boolean }[] = [
  {
    step: "raw response",
    detail: "three shapes from the same API",
    why: "feature vs features · features:[[…]] double-nested · paginated",
  },
  {
    step: "normalize + accumulate",
    detail: "page 1 reveals totalPages, the rest fetched in parallel",
    why: "callers never learn the endpoint was paginated",
  },
  {
    step: "Object.freeze(geojson)",
    detail: "before it ever reaches reactive state",
    why: "stops Vue building deep proxies over thousands of features",
    accent: true,
  },
  {
    step: "expand GeometryCollection",
    detail: "each inner geometry becomes its own Feature, keeping parent id + properties",
    why: "google.maps.Data fires no events on a GeometryCollection — clicks would die silently",
    accent: true,
  },
  {
    step: "local filters",
    detail: "supply chain · titular · fase do processo",
    why: "accent-folded, and digs through three possible property shapes",
  },
  {
    step: "dejitter collocated points",
    detail: "bucket by 6-decimal key, spiral the rest onto 8-slot rings at ~9 m",
    why: "stable across reloads by id sort — pins stop hiding under each other",
  },
  {
    step: "style closure per feature",
    detail: "selection highlight · point vs polygon · opportunity icon swap",
    why: "updateSelectedId() repaints without re-adding a single feature",
  },
  {
    step: "google.maps.Data",
    detail: "hit-testing gated to Point / MultiPoint on territory layers",
    why: "otherwise the polygon fill swallows every pin click inside it",
    accent: true,
  },
];

export default function CiGeoJsonPipeline() {
  const { ref, i } = useTicker(STEPS.length, 620);

  return (
    <Frame
      innerRef={ref}
      label="Raw response → clickable map layer"
      note="Every stage exists because something failed without it. The three highlighted ones are the non-obvious ones — they look like they should not be necessary until the map goes quiet or the tab freezes."
    >
      <div className="flex flex-col">
        {STEPS.map((s, n) => {
          const on = i >= n;
          return (
            <motion.div
              key={s.step}
              animate={{ opacity: on ? 1 : 0.22 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-x-3 py-2.5 border-t border-ink/12 first:border-t-0"
            >
              <div className="col-span-12 sm:col-span-4 flex items-baseline gap-2">
                <span
                  className={`${monoLower} ${
                    s.accent ? "text-accent/70" : "text-ink/28"
                  } shrink-0`}
                >
                  {String(n + 1).padStart(2, "0")}
                </span>
                <p className={`${mono} ${s.accent ? "text-accent" : "text-ink/85"}`}>
                  {s.step}
                </p>
              </div>
              <div className="col-span-12 sm:col-span-8 mt-1 sm:mt-0">
                <p className={`${monoLower} text-ink/72`}>{s.detail}</p>
                {s.why && (
                  <p className={`${monoLower} text-ink/42 mt-0.5`}>{s.why}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Frame>
  );
}
