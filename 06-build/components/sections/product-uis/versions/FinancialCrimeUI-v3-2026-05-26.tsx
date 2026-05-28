"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { ProductUISurface } from "./ProductUISurface";
import { ScanSweep } from "@/components/visuals";

// ── FinancialCrimeUI (v3) ──────────────────────────────────────────────────
//
// Reframed (2026-05-26) → AI extraction at small scale. Borrows the
// §9.5.1 / §8.27 vocabulary (linear cyan scan → chips emerge → decision)
// but compressed into a product-card sized surface. The SHAP divider
// from v2 is retired — the chips ARE the explainability surface.
//
// Sequence (≈10s loop at rest, ≈1.2s on hover):
//   1. Transaction row visible.
//   2. Cyan scan band travels top→bottom over the row.
//   3. Three attribution chips emerge with a stagger.
//   4. Decision row pulses cyan once.
//   5. Brief hold, then chips fade and the loop repeats.
//
// On parent-card hover the loop fast-forwards (shorter durations) and
// kicks off immediately rather than waiting for the next rest cycle.
//
// Placeholder data only — Netflix · $14.99 · Card-not-present, abstract
// attribution chips with no SHAP scores or feature names.

const ATTRIBUTION = [
  { label: "Device",   value: "Trusted"  },
  { label: "Velocity", value: "Normal"   },
  { label: "Geo",      value: "Expected" },
];

type Phase = "idle" | "scanning" | "chips" | "decision";

export function FinancialCrimeUI() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [hovered, setHovered] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Manual hover tracking on the inner wrapper — CardGrid's outer `.group`
  // class controls the lift, but we also want this UI to "feel hovered"
  // when you mouse over the card itself.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // The outer .group is the parent card — walk up to find it.
    let parent: HTMLElement | null = el.parentElement;
    while (parent && !parent.classList.contains("group")) {
      parent = parent.parentElement;
    }
    const target = parent ?? el;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("mouseleave", onLeave);
    return () => {
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Phase loop. Fast on hover, slow at rest.
  useEffect(() => {
    if (reduced) {
      setPhase("decision"); // settled end-state
      return;
    }
    let timer: number | undefined;
    let cancelled = false;
    const t = (ms: number, next: () => void) => {
      timer = window.setTimeout(() => {
        if (!cancelled) next();
      }, ms);
    };
    const speed = hovered ? 0.55 : 1;
    const run = () => {
      setPhase("scanning");
      t(1800 * speed, () => {
        setPhase("chips");
        t(900 * speed, () => {
          setPhase("decision");
          t(hovered ? 1400 : 2800, () => {
            setPhase("idle");
            t(hovered ? 200 : 1000, run);
          });
        });
      });
    };
    run();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [reduced, hovered]);

  const chipsVisible = phase === "chips" || phase === "decision";
  const decisionLit = phase === "decision";
  const scanning = phase === "scanning";

  return (
    <ProductUISurface label="Decisioning" live>
      <div ref={wrapRef} className="flex flex-1 flex-col gap-3">
        {/* Transaction row with the scan overlay. */}
        <div className="relative isolate overflow-hidden rounded-md bg-surface-soft/55 px-3 py-2 ring-1 ring-inset ring-surface-border-subtle dark:bg-surface-dark-base/45 dark:ring-surface-dark-border">
          <div className="relative z-10 flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="font-display text-[13px] font-medium text-text-primary dark:text-text-on-brand">
                Netflix
              </span>
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
                Card-not-present
              </span>
            </div>
            <span className="font-mono text-[14px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
              $14.99
            </span>
          </div>

          {/* Scan band — driven by phase. Subtle at rest, standard while
              the loop is actively scanning the row. */}
          <span className="pointer-events-none absolute inset-0 z-0">
            <ScanSweep
              variant="linear"
              intensity={hovered ? "standard" : "subtle"}
              running={scanning}
              sweepSeconds={hovered ? 1.0 : 1.7}
              restSeconds={0.4}
            />
          </span>
        </div>

        {/* Attribution chips — the explainability surface. Three small
            mono chips, staggered reveal once `phase` reaches `chips`. */}
        <div className="grid grid-cols-3 gap-1.5">
          {ATTRIBUTION.map((chip, i) => (
            <AttributionChip
              key={chip.label}
              chip={chip}
              index={i}
              visible={chipsVisible}
              fast={hovered}
            />
          ))}
        </div>

        {/* Decision row — pulses cyan once chips have emerged. */}
        <div
          className={[
            "mt-auto flex items-center justify-between rounded-md px-3 py-2 ring-1 ring-inset",
            "transition-all duration-500 ease-out",
            decisionLit
              ? "bg-accent-cyan/[0.14] ring-accent-cyan/60 shadow-[0_0_22px_-4px_rgba(34,211,238,0.6)]"
              : "bg-surface-soft/40 ring-surface-border-subtle dark:bg-surface-dark-base/35 dark:ring-surface-dark-border",
          ].join(" ")}
        >
          <span className="inline-flex items-center gap-1.5">
            <span
              className={[
                "grid size-4 place-items-center rounded-full ring-1 transition-all duration-500",
                decisionLit
                  ? "bg-accent-cyan/25 ring-accent-cyan/60"
                  : "bg-surface-soft/80 ring-surface-border-subtle dark:bg-surface-dark-base/55 dark:ring-surface-dark-border",
              ].join(" ")}
            >
              <Check
                aria-hidden="true"
                className={[
                  "size-2.5 transition-colors duration-500",
                  decisionLit
                    ? "text-accent-cyan"
                    : "text-text-secondary dark:text-text-dark-secondary",
                ].join(" ")}
                strokeWidth={3}
              />
            </span>
            <span
              className={[
                "font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500",
                decisionLit
                  ? "text-accent-cyan"
                  : "text-text-primary dark:text-text-on-brand",
              ].join(" ")}
            >
              Cleared
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            12 signals
          </span>
        </div>
      </div>
    </ProductUISurface>
  );
}

// ── AttributionChip ────────────────────────────────────────────────────────
// A small mono chip — abstract attribution label + cyan check + value.
// Reveals with staggered scale + opacity once `visible` flips true.

function AttributionChip({
  chip,
  index,
  visible,
  fast,
}: {
  chip: { label: string; value: string };
  index: number;
  visible: boolean;
  fast: boolean;
}) {
  const stagger = fast ? 0.18 : 0.32;
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 6,
        scale: visible ? 1 : 0.9,
      }}
      transition={{
        duration: fast ? 0.32 : 0.42,
        delay: visible ? index * stagger : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={[
        "flex flex-col gap-0.5 rounded-md bg-surface-white/85 px-2 py-1.5 ring-1 ring-inset ring-accent-cyan/30",
        "dark:bg-surface-dark-elevated/85 dark:ring-accent-cyan/35",
        "shadow-[0_0_0_1px_rgba(34,211,238,0.10)_inset]",
      ].join(" ")}
    >
      <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
        {chip.label}
      </span>
      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium tracking-[0.04em] text-accent-cyan">
        <Check aria-hidden="true" className="size-2" strokeWidth={3} />
        {chip.value}
      </span>
    </motion.div>
  );
}
