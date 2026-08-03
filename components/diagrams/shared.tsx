"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const mono = "font-mono text-[11px] uppercase tracking-[.08em] leading-[1.6]";
export const monoLower = "font-mono text-[11px] tracking-[.02em] leading-[1.7]";

/**
 * Drives a progressive reveal. Returns -1 before the diagram enters the
 * viewport, then walks 0..count-1, rests one beat at `count`, and loops.
 * Reduced motion pins it to the final state.
 */
export function useTicker(count: number, ms = 900) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [i, setI] = useState(-1);

  useEffect(() => {
    if (reduced) {
      setI(count);
      return;
    }
    if (!inView) return;
    const id = setInterval(() => setI((p) => (p + 1) % (count + 1)), ms);
    return () => clearInterval(id);
  }, [inView, reduced, count, ms]);

  return { ref, i, reduced: !!reduced };
}

export function Frame({
  label,
  note,
  children,
  innerRef,
}: {
  label: string;
  note?: React.ReactNode;
  children: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className="border border-ink/12 bg-ink/[.02] rounded-md p-4 md:p-6 overflow-hidden"
    >
      <p className={`${mono} text-ink/46 mb-4 md:mb-5`}>{label}</p>
      {children}
      {note && (
        <div className={`${monoLower} text-ink/46 mt-5 pt-4 border-t border-ink/12`}>
          {note}
        </div>
      )}
    </div>
  );
}

export function Node({
  active,
  title,
  children,
  accent,
}: {
  active: boolean;
  title: string;
  children?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <motion.div
      animate={{
        borderColor: active
          ? accent
            ? "rgba(163,230,53,.55)"
            : "rgba(255,255,255,0.51)"
          : "rgba(255,255,255,0.16)",
        backgroundColor: active ? "rgba(255,255,255,.06)" : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.35 }}
      className="border rounded-md px-3 py-2.5 md:px-4 md:py-3 w-full"
    >
      <p
        className={`${mono} ${
          active ? (accent ? "text-accent" : "text-ink/90") : "text-ink/52"
        } transition-colors duration-300`}
      >
        {title}
      </p>
      {children}
    </motion.div>
  );
}

/** Vertical connector with a dot that travels down when `active` flips on. */
export function Link({ active, label }: { active: boolean; label?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative h-9 md:h-11 w-full flex justify-center">
      <div className="w-px h-full bg-ink/10" />
      {!reduced && (
        <motion.div
          key={active ? "on" : "off"}
          className="absolute left-1/2 -ml-[3px] w-[6px] h-[6px] rounded-full bg-accent"
          initial={{ y: 0, opacity: 0 }}
          animate={active ? { y: [0, 34], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
      {label && (
        <span
          className={`${monoLower} hidden sm:block absolute left-[calc(50%+14px)] top-1/2 -translate-y-1/2 text-ink/42 whitespace-nowrap`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export function Chip({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <motion.span
      animate={{
        borderColor: active ? "rgba(255,255,255,0.46)" : "rgba(255,255,255,0.16)",
        color: active ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.41)",
      }}
      transition={{ duration: 0.3 }}
      className={`${mono} border rounded px-2 py-1 whitespace-nowrap`}
    >
      {children}
    </motion.span>
  );
}
