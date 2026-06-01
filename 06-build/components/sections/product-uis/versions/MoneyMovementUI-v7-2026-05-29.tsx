"use client";

import { motion, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── MoneyMovementUI ────────────────────────────────────────────────────────
//
// Homepage Products bento → Money Movement (narrow cell). A bespoke, full-bleed
// corridor-routing surface — fills the cell's visual zone edge-to-edge. Maps to
// copy: "Move funds across borders and rails with integrated FX and settlement."
//
// Composition (a horizontal corridor — deliberately NOT the hero's wireframe
// globe):
//   · A source node → an FX exchange node → a destination node, joined by a
//     rail line. A signal travels source→destination along the line (one
//     purposeful ambient gesture; not a decorative traveling-dot loop — a
//     single energy run on a long, slow cycle, suppressed under reduced-motion).
//   · A row of three rail chips beneath, one selected.
//
// Currencies are generic ISO codes (USD/EUR) — no fabricated merchant data.

const LIGHT_BED =
  `radial-gradient(120% 100% at 8% 0%, ${withAlpha(visual.cyan, 0.06)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.primary, 0.06)}, transparent 64%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(120% 100% at 8% 0%, ${withAlpha(visual.cyan, 0.16)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.primary, 0.14)}, transparent 64%)`;

const RAILS = [
  { name: "Visa Direct", selected: true },
  { name: "Mastercard XB", selected: false },
  { name: "Stablecoin", selected: false },
];

export function MoneyMovementUI() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-5 p-6 sm:p-7">
        {/* Corridor — source → FX → destination on a rail line. */}
        <div className="relative">
          {/* rail line + traveling signal (SVG so the path + dash align) */}
          <svg
            viewBox="0 0 300 12"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-1/2 h-3 w-full -translate-y-1/2"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="294" y2="6" stroke={withAlpha(visual.indigo, 0.35)} strokeWidth="1.4" strokeDasharray="2 4" strokeLinecap="round" />
            {!reduced && (
              <motion.circle
                cx="6"
                cy="6"
                r="3"
                fill={visual.cyan}
                initial={{ cx: 6, opacity: 0 }}
                animate={{ cx: [6, 294], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.2, ease: ease.inOut, repeat: Infinity, repeatDelay: 1.6 }}
              />
            )}
          </svg>

          <div className="relative flex items-center justify-between">
            <CorridorNode label="USD" sub="Source" tone="primary" />
            <FxNode />
            <CorridorNode label="EUR" sub="Settled" tone="cyan" />
          </div>
        </div>

        {/* Rail chips — one selected. */}
        <div className="grid grid-cols-3 gap-1.5">
          {RAILS.map((rail) => (
            <div
              key={rail.name}
              className={
                rail.selected
                  ? "rounded-md bg-accent-cyan/[0.14] px-2 py-1.5 text-center ring-1 ring-inset ring-accent-cyan/55 dark:bg-accent-cyan/[0.18] dark:ring-accent-cyan/60"
                  : "rounded-md bg-surface-soft/70 px-2 py-1.5 text-center ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.03] dark:ring-white/10"
              }
            >
              <span className="block font-mono text-[10px] font-semibold leading-tight text-text-primary dark:text-text-on-brand">
                {rail.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CorridorNode({ label, sub, tone }: { label: string; sub: string; tone: "primary" | "cyan" }) {
  const ring = tone === "cyan" ? "ring-accent-cyan/45 dark:ring-accent-cyan/55" : "ring-brand-primary/35 dark:ring-white/15";
  const dot = tone === "cyan" ? "bg-accent-cyan" : "bg-brand-primary dark:bg-accent-cyan";
  return (
    <div className="relative z-10 flex flex-col items-center gap-1.5">
      <span className={`grid size-11 place-items-center rounded-full bg-surface-white ring-1 ${ring} shadow-[0_6px_16px_-8px_rgba(14,26,51,0.18)] dark:bg-surface-dark-elevated`}>
        <span className="font-mono text-[11px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
          {label}
        </span>
      </span>
      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
        <span className={`size-1 rounded-full ${dot}`} />
        {sub}
      </span>
    </div>
  );
}

function FxNode() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-1.5">
      <span className="grid size-9 place-items-center rounded-full bg-brand-navy ring-1 ring-inset ring-white/15 shadow-[0_8px_18px_-8px_rgba(14,26,51,0.4)]">
        {/* exchange glyph */}
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke={visual.cyan} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 8h13l-3-3M20 16H7l3 3" />
        </svg>
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">FX</span>
    </div>
  );
}
