"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals/palette";

// Amber — the ONLY warm accent permitted on these surfaces, reserved for the
// review-queue / unresolved / risk status the Migration copy calls for. Resolved
// from the warning token, never a raw hex.
export const AMBER = tokens.color.semantic.warning; // #F59E0B

// ── Migration product-UI kit ─────────────────────────────────────────────────
//
// The shared atoms behind the 14 bespoke migration surfaces on /platform/migration
// so they read as ONE family (a "migration command system") while each slot stays
// distinct. Same voice as the wider product-UI library (CorridorRoutingConsole /
// MigrationConsole): mono crumbs, status chips, a thin cyan top-rim on framed
// surfaces, the navy node geometry, tokenised motion.
//
// Cool palette only (design-system.md §3); amber is permitted ONLY as the
// review-queue / unresolved status accent the Migration §4 copy calls for. All
// values are illustrative on-system placeholders — no customer data, no invented
// third-party brands. Tokens only. Every motion is reduced-motion safe and gated
// on scroll-into-view via `useScrollGate`.

// ── Scroll gate ────────────────────────────────────────────────────────────
//
// One hook for the whole family: returns `active` (true once the surface has
// scrolled into view, or immediately under reduced motion) plus a `replay` token
// that bumps on hover so a sequence can re-run. Pure state + the consumer drives
// timers/CSS off it — no perpetual motion, offscreen surfaces never animate.

export function useScrollGate({ amount = 0.4 }: { amount?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once: true });
  const reduced = useReducedMotion() ?? false;
  const [replay, setReplay] = useState(0);
  const active = reduced || inView;
  const bind = {
    onMouseEnter: () => {
      if (!reduced) setReplay((c) => c + 1);
    },
  };
  return { ref, active, reduced, replay, bind };
}

// ── Step counter ─────────────────────────────────────────────────────────────
//
// Drives a stepped reveal (rows drawing, lines resolving, a batch advancing).
// Returns how many steps are "on". Runs once the gate is active and re-runs on
// each `replay` bump. Reduced motion lands on the final step immediately.

export function useSteps(
  count: number,
  active: boolean,
  reduced: boolean,
  replay: number,
  { start = 240, step = 360 }: { start?: number; step?: number } = {},
) {
  // Only the animated sequence is held in state. The settled states (reduced →
  // all on; inactive → none on) are DERIVED, so the effect never sets state
  // synchronously (avoids cascading renders) and offscreen surfaces never run.
  const [seq, setSeq] = useState(0);
  useEffect(() => {
    if (reduced || !active) return;
    // Reset + each step land via timers (never a synchronous set in the effect
    // body), so a replay restarts the sequence without cascading renders.
    const timers = [
      setTimeout(() => setSeq(0), 0),
      ...Array.from({ length: count }, (_, i) =>
        setTimeout(() => setSeq(i + 1), start + i * step),
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, reduced, replay, count, start, step]);
  if (reduced) return count;
  if (!active) return 0;
  return seq;
}

// ── Frame ──────────────────────────────────────────────────────────────────
//
// The flat framed surface the bento (§4) snippets float in — a real product
// window with a thin lit cyan top-rim and faint cool corner reflections, NO
// atmosphere behind it (the §4 tiles are explicitly flat). Fills its container
// edge-to-edge (no inner radius gap). `tone="bare"` drops the chrome entirely
// for the quiet §6 assurance details.

export function MigrationFrame({
  children,
  className,
  contentClassName,
  rim = true,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** The lit cyan top-rim + cool corner glow. On for §4 snippets. */
  rim?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex h-full w-full flex-col overflow-hidden rounded-lg border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-base",
        className,
      )}
    >
      {rim && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${withAlpha(
                visual.cyan,
                0.5,
              )} 34%, transparent 84%)`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                `radial-gradient(60% 50% at 94% 2%, ${withAlpha(visual.cyan, 0.06)}, transparent 72%),` +
                `radial-gradient(70% 58% at 6% 104%, ${withAlpha(visual.indigo, 0.06)}, transparent 72%)`,
            }}
          />
        </>
      )}
      <div className={cn("relative z-10 flex h-full flex-col", contentClassName)}>
        {children}
      </div>
    </div>
  );
}

// ── Type atoms ───────────────────────────────────────────────────────────────

/** Mono crumb — a system caption (never data). */
export function Crumb({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * A live indicator — a cyan dot + label. Static (no perpetual pulse): a pulsing
 * "live" dot is an AI-slop tell (design-system.md §0 / CLAUDE.md motion model),
 * so the dot holds steady with a soft cyan glow instead. The `pulse` prop is
 * accepted for call-site compatibility but no longer animates.
 */
export function LiveDot({
  label = "live",
}: {
  label?: string;
  /** Deprecated — retained for call-site compatibility; never animates. */
  pulse?: boolean;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-teal dark:text-accent-cyan">
      <span
        className="inline-flex size-1.5 rounded-full bg-accent-cyan"
        style={{ boxShadow: `0 0 8px ${withAlpha(visual.cyan, 0.7)}` }}
      />
      {label}
    </span>
  );
}

// ── State + status vocabulary ─────────────────────────────────────────────────
//
// The portfolio moves through five migration states, used consistently across
// the hero strip, the control console and the portfolio meter. Cyan-led; amber
// is reserved for the review queue (a different axis — unresolved, not a state).

export type MigrationState =
  | "mapped"
  | "shadowed"
  | "reconciled"
  | "scheduled"
  | "cutover";

export const STATE_LABEL: Record<MigrationState, string> = {
  mapped: "Mapped",
  shadowed: "Shadowed",
  reconciled: "Reconciled",
  scheduled: "Scheduled",
  cutover: "Cut over",
};

// Resolved hex per state for SVG / inline use (cool ramp from primary → cyan).
export const STATE_HEX: Record<MigrationState, string> = {
  mapped: visual.indigo,
  shadowed: visual.primary,
  reconciled: visual.teal,
  scheduled: visual.purple,
  cutover: visual.cyan,
};

type ChipTone = "cyan" | "indigo" | "teal" | "amber" | "muted" | "success";

const CHIP: Record<ChipTone, string> = {
  cyan: "bg-accent-cyan/[0.14] text-accent-teal dark:text-accent-cyan",
  indigo: "bg-accent-indigo/[0.14] text-accent-indigo",
  teal: "bg-accent-teal/[0.12] text-accent-teal dark:text-accent-cyan",
  amber: "bg-semantic-warning/[0.16] text-semantic-warning",
  muted: "bg-text-muted/[0.12] text-text-secondary dark:bg-white/[0.07] dark:text-text-dark-secondary",
  success: "bg-semantic-success/[0.14] text-semantic-success",
};

export function StatusChip({
  tone,
  dot = false,
  children,
  className,
}: {
  tone: ChipTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.04em]",
        CHIP[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

// ── Object atoms ──────────────────────────────────────────────────────────────

/** A deep-navy data node (a legacy block, a token store, a core) with a glyph. */
export function NavyNode({
  children,
  size = 44,
  className,
  glow = false,
}: {
  children: ReactNode;
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[12px] text-center font-mono text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(150deg, ${withAlpha(visual.navy, 0.94)}, ${visual.navy})`,
        boxShadow: glow
          ? `0 0 26px ${withAlpha(visual.cyan, 0.45)}, inset 0 1px 0 ${withAlpha(visual.white, 0.12)}`
          : `0 14px 26px -12px ${withAlpha(visual.navy, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.1)}`,
      }}
    >
      {children}
    </span>
  );
}

/** A small framed "record / field" pill row — the schema atoms. */
export function FieldPill({
  children,
  tone = "neutral",
  className,
  style,
}: {
  children: ReactNode;
  tone?: "neutral" | "active" | "amber";
  className?: string;
  style?: CSSProperties;
}) {
  const toneCls =
    tone === "active"
      ? "border-accent-cyan/45 bg-accent-cyan/[0.07] text-text-primary dark:text-text-on-brand"
      : tone === "amber"
        ? "border-semantic-warning/45 bg-semantic-warning/[0.08] text-text-primary dark:text-text-on-brand"
        : "border-surface-border-subtle bg-surface-soft text-text-secondary dark:border-surface-dark-border dark:bg-white/[0.04] dark:text-text-dark-secondary";
  return (
    <span
      className={cn(
        "flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[11px] leading-none",
        toneCls,
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}

/** A thin progress meter (the parallel-run / portfolio share). */
export function Meter({
  pct,
  active,
  reduced,
  tone = "cyan",
  className,
}: {
  pct: number;
  active: boolean;
  reduced: boolean;
  tone?: "cyan" | "indigo";
  className?: string;
}) {
  const fill =
    tone === "cyan"
      ? `linear-gradient(to right, ${visual.primary}, ${visual.cyan})`
      : `linear-gradient(to right, ${visual.indigo}, ${visual.cyan})`;
  return (
    <div
      className={cn(
        "h-[6px] w-full overflow-hidden rounded-full bg-surface-border-subtle/60 dark:bg-white/10",
        className,
      )}
    >
      <div
        className="h-full rounded-full transition-[width] duration-[1400ms] ease-out"
        style={{
          width: reduced ? `${pct}%` : active ? `${pct}%` : "0%",
          background: fill,
        }}
      />
    </div>
  );
}

/** The check glyph used for resolved / matched rows. */
export function CheckGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5 10 17.5 19 6.5" />
    </svg>
  );
}
