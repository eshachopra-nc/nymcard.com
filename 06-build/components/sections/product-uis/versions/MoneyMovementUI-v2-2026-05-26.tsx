"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductUISurface } from "./ProductUISurface";

// ── MoneyMovementUI ────────────────────────────────────────────────────────
//
// Homepage Products card → Money Movement. A *corridor orchestration*
// instrument: a single corridor in flight, three rail options scored, one
// selected. The kinetic story (group-hover, 600–900ms) is the selection
// shifting from Visa Direct to the stablecoin rail and back — the "pick
// the right rail" capability rendered, not described.
//
// Faithful to the Money Movement reference: orchestration + FX + corridor
// routing, partner-controlled. Rails named per architecture facts. The
// corridor field is the abstract placeholder `Corridor · USD → EUR` per
// §8.8 (placeholder data only).

type Rail = { name: string; est: string; score: number };

const RAILS: Rail[] = [
  { name: "Visa Direct",   est: "12s",       score: 92 },
  { name: "Mastercard XB", est: "18s",       score: 87 },
  { name: "Stablecoin",    est: "Real-time", score: 96 },
];

// Sequenced "selected" pointer — at rest the Visa rail is selected; on
// hover the engine re-scores and the Stablecoin rail wins. Picked indices
// match the RAILS array order.
const REST_SELECTED = 0;
const HOVER_SELECTED = 2;

export function MoneyMovementUI() {
  const reduced = useReducedMotion();

  return (
    <ProductUISurface label="Corridor routing" live>
      <div className="flex flex-1 flex-col gap-3">
        {/* Header row — corridor + amount. Placeholder corridor per §8.8. */}
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="font-display text-[13px] font-medium text-text-primary dark:text-text-on-brand">
              Corridor
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
              USD
              <ArrowRight aria-hidden="true" className="size-2.5" />
              EUR
            </span>
          </div>
          <span className="shrink-0 font-mono text-[15px] font-semibold tracking-tight tabular-nums text-text-primary dark:text-text-on-brand">
            $24,000
          </span>
        </div>

        {/* FX strip — single line, monospace, divider above & below. */}
        <div className="flex items-center gap-2 border-y border-surface-border-subtle py-1.5 dark:border-surface-dark-border">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            FX
          </span>
          <span className="font-mono text-[11px] tabular-nums text-text-primary dark:text-text-on-brand">
            1.0823
          </span>
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            Real-time
          </span>
        </div>

        {/* Three rail options, scored. The selected ring shifts from the
            first to the third on parent-card hover; the rails subtly
            reorder by score on hover, demonstrating the engine re-evaluating
            the corridor. */}
        <div className="flex flex-col gap-1.5">
          {RAILS.map((rail, i) => (
            <RailRow
              key={rail.name}
              rail={rail}
              selectedAtRest={i === REST_SELECTED}
              selectedOnHover={i === HOVER_SELECTED}
              reduced={!!reduced}
            />
          ))}
        </div>

        {/* Footer caption — keeps the orchestration story explicit without
            a feature claim. */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            Pick the right rail
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            3 candidates
          </span>
        </div>
      </div>
    </ProductUISurface>
  );
}

// ── RailRow ────────────────────────────────────────────────────────────────
// A single candidate rail. The "selected" treatment is a cyan inset ring +
// cyan-tinted background + a small selected dot in the trailing slot. At
// rest one row is selected; on hover (via the CardGrid cell `group`) the
// selected treatment moves to a different row.

function RailRow({
  rail,
  selectedAtRest,
  selectedOnHover,
  reduced,
}: {
  rail: Rail;
  selectedAtRest: boolean;
  selectedOnHover: boolean;
  reduced: boolean;
}) {
  // When the cell is NOT hovered, the rest treatment shows. When it IS
  // hovered, the row that is selectedOnHover takes over. Tailwind's
  // `group-hover:` variants drive the swap purely via CSS — no JS state.
  const restTone = selectedAtRest
    ? "bg-accent-cyan/[0.12] ring-accent-cyan/55"
    : "bg-surface-soft/55 ring-surface-border-subtle dark:bg-surface-dark-base/45 dark:ring-surface-dark-border";

  // Hover overrides — only the two affected rows need an override.
  const hoverTone = selectedAtRest
    ? // was selected, now becomes inactive
      "group-hover:bg-surface-soft/55 group-hover:ring-surface-border-subtle dark:group-hover:bg-surface-dark-base/45 dark:group-hover:ring-surface-dark-border"
    : selectedOnHover
      ? // was inactive, now becomes selected
        "group-hover:bg-accent-cyan/[0.14] group-hover:ring-accent-cyan/60"
      : "";

  return (
    <motion.div
      layout={!reduced}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className={[
        "grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md px-2.5 py-1.5 ring-1 ring-inset",
        "transition-[background-color,box-shadow] duration-500 ease-out",
        restTone,
        hoverTone,
      ].join(" ")}
    >
      {/* Rail name. */}
      <span className="font-display text-[12px] font-medium text-text-primary dark:text-text-on-brand">
        {rail.name}
      </span>

      {/* ETA. */}
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
        {rail.est}
      </span>

      {/* Score + selected dot. Score is the abstract placeholder per §8.8 —
          a 0–100 confidence value, no feature claim. */}
      <span className="flex items-center gap-2">
        <span
          className={[
            "font-mono text-[10px] tabular-nums",
            selectedAtRest ? "text-accent-cyan" : "text-text-secondary dark:text-text-dark-secondary",
            // Hover overrides
            selectedAtRest ? "group-hover:text-text-secondary dark:group-hover:text-text-dark-secondary" : "",
            selectedOnHover ? "group-hover:text-accent-cyan" : "",
            "transition-colors duration-500 ease-out",
          ].join(" ")}
        >
          {rail.score}
        </span>
        <span
          aria-hidden="true"
          className={[
            "size-1.5 rounded-full transition-opacity duration-500 ease-out",
            selectedAtRest ? "bg-accent-cyan opacity-100" : "bg-accent-cyan opacity-0",
            // Hover overrides
            selectedAtRest ? "group-hover:opacity-0" : "",
            selectedOnHover ? "group-hover:opacity-100" : "",
          ].join(" ")}
        />
      </span>
    </motion.div>
  );
}
