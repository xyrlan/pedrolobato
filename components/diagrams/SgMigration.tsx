"use client";
import { motion } from "framer-motion";
import { Frame, mono, monoLower, useTicker } from "./shared";

const LEGACY = [
  "01-foundation",
  "02-auth-orgs",
  "03-products",
  "04-logistics",
  "05-quotes",
  "06-shipments",
  "07-financial",
  "08-system",
];

const V2 = [
  "01-foundation",
  "02-auth-orgs",
  "03-suppliers",
  "04-shipments",
  "05-documents",
  "06-financial",
];

function Track({
  title,
  phases,
  upto,
  offset,
}: {
  title: string;
  phases: string[];
  upto: number;
  offset: number;
}) {
  return (
    <div>
      <p className={`${mono} text-ink/46 mb-2`}>{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {phases.map((p, n) => {
          const on = upto >= n + offset;
          return (
            <motion.span
              key={p}
              animate={{
                borderColor: on ? "rgba(52,211,153,.5)" : "rgba(255,255,255,0.16)",
                color: on ? "rgba(52,211,153,1)" : "rgba(255,255,255,0.36)",
                backgroundColor: on ? "rgba(255,255,255,.06)" : "rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.3 }}
              className={`${monoLower} border rounded px-2 py-1 whitespace-nowrap`}
            >
              {p}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

const TOTAL = LEGACY.length + V2.length;

export default function SgMigration() {
  const { ref, i } = useTicker(TOTAL, 380);

  return (
    <Frame
      innerRef={ref}
      label="Legacy migration as a re-runnable pipeline"
      note={
        <>
          Two versioned pipelines, not one throwaway script. Each phase is idempotent, so
          a crash halfway through is fixed by running it again — the id map is already in
          the database.
        </>
      }
    >
      <div className="space-y-4">
        <Track title="migrate-legacy · 8 phases" phases={LEGACY} upto={i} offset={0} />
        <Track title="migrate-v2 · 6 phases" phases={V2} upto={i} offset={LEGACY.length} />

        {/* id map rail */}
        <div className="border border-ink/12 rounded-md p-3 bg-surface">
          <p className={`${mono} text-ink/72 mb-2`}>_migration_id_mapping</p>
          <div className="grid grid-cols-12 gap-2 items-center">
            <p className={`${monoLower} col-span-5 text-ink/52`}>legacy id</p>
            <p className="col-span-2 text-center text-ink/30 text-[10px]">→</p>
            <p className={`${monoLower} col-span-5 text-ink/52 text-right`}>new uuid</p>
          </div>
          <p className={`${monoLower} text-ink/42 mt-2`}>
            primary key (entity_type, old_id) — a real table, not an in-memory Map, so the
            mapping survives a crash and a restart resumes where it stopped
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["idempotent", "re-runnable", "crash-safe", "repair scripts"].map((b) => (
            <span
              key={b}
              className={`${mono} border border-ink/12 rounded px-2 py-1 text-ink/52`}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
