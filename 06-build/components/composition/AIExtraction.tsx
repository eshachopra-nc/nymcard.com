"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassPanel, ScanSweep, visual, withAlpha } from "@/components/visuals";

// ── AI Extraction (design-system.md §9.5.1) ────────────────────────────────
//
// The AI-native data-extraction composition as a reusable primitive. Codifies
// the choreographed loop §9.5.1 specifies — surface materialisation, scan
// ripple, contextual chip reveal — into one composition so product pages
// stop hand-rolling it.
//
// Two variants:
//   linear  — document / panel / ledger surfaces with a reading direction;
//             scan sweeps top to bottom, chips emerge on extraction.
//   radial  — biometric / face / point-of-focus surfaces with no reading
//             direction; concentric scan rings replace the linear sweep.
//
// Both share the §9.5.1 contract:
//   • Surface materialises (scale-up 0.85→1, drift down, blur 3→0) on view-in.
//   • Status label flickers softly during the scan phase.
//   • Scan runs via ScanSweep (the §9.5.1 implementation overlay).
//   • Extracted chips reveal with scale-up + ≥300ms stagger between siblings.
//   • Parallax-by-scale-delta — foreground chip scales 0.88→1.0, background
//     chips scale 0.90→1.0, so the depth hierarchy reads as 3D.
//   • prefers-reduced-motion settles everything to a calm static end state.
//
// Phase 1.5 ships this as a styleguide demo (both variants in /visual-system).
// Wiring into marketing pages comes in Phase 2 once product UIs land.

export type AIExtractionChip = {
  /** Optional small mono label sitting above the value (e.g. "Vendor"). */
  label?: string;
  /** The extracted value (e.g. "Acme Logistics" or "AED 12,480.00"). */
  value: string;
  /**
   * Depth — `foreground` chips scale 0.88→1, `background` chips scale 0.90→1.
   * The differential creates §9.5.1's "floating forward in 3D" feel.
   */
  depth?: "foreground" | "background";
};

type AIExtractionProps = {
  /**
   * The surface being analysed. Default — a document skeleton for linear,
   * a face viewport for radial. Pass a custom surface to demo a different
   * extraction target (e.g. a ledger row, a transaction).
   */
  surface?: ReactNode;
  /** Linear (document) or radial (biometric / face). */
  variant?: "linear" | "radial";
  /** The status label that flickers during the scan phase. */
  statusLabel?: string;
  /** The extracted chips that reveal after the scan. 1–4 chips supported. */
  chips: AIExtractionChip[];
  className?: string;
};

// The premium ease curve from §9.3 — the workhorse `ease-out` spline.
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function AIExtraction({
  surface,
  variant = "linear",
  statusLabel,
  chips,
  className,
}: AIExtractionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  // Fallback: if the user has been on the page for >800ms and the element
  // still hasn't been observed in view, settle to the end state. Catches the
  // styleguide rendering at the top of the page and keeps static screenshots
  // legible (per the verify-with-screenshots discipline).
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 1200);
    return () => clearTimeout(t);
  }, []);
  const active = inView || settled;

  const defaultStatus =
    statusLabel ?? (variant === "linear" ? "SCAN IN PROCESS…" : "ANALYSING…");

  return (
    <div ref={ref} className={cn("relative isolate", className)}>
      {/* Status label — flickers softly during the scan phase. */}
      <div className="mb-3 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-accent-cyan"
        />
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-cyan"
          initial={reduced ? false : { opacity: 0.45 }}
          animate={
            reduced
              ? undefined
              : inView
                ? { opacity: [0.45, 0.95, 0.45, 0.95, 0.55] }
                : { opacity: 0.55 }
          }
          transition={{ duration: 1.8, times: [0, 0.3, 0.55, 0.8, 1] }}
        >
          {defaultStatus}
        </motion.span>
      </div>

      {/* Surface materialisation — scale 0.85→1, drift y -12→0, opacity 0→1.
          All three on the same ease curve so the surface arrives weightlessly,
          not as a pop-in (§9.5.1 surface-materialisation contract). */}
      <motion.div
        className="relative"
        initial={reduced ? false : { opacity: 0, y: -12, scale: 0.85 }}
        animate={
          reduced
            ? undefined
            : active
              ? { opacity: 1, y: 0, scale: 1 }
              : undefined
        }
        transition={{ duration: 0.45, ease: EASE_OUT }}
        style={{ transformOrigin: "center" }}
      >
        <div className="relative overflow-hidden rounded-2xl">
          <GlassPanel padded={false} className="overflow-hidden">
            {surface ?? <DefaultSurface variant={variant} />}
          </GlassPanel>
          {/* The scan overlay — cyan ripple sweep (§9.5.1). */}
          <ScanSweep
            variant={variant}
            brackets
            intensity="standard"
            running={active}
          />
        </div>
      </motion.div>

      {/* Extracted chip column — sits to the right of the surface on lg+,
          beneath on smaller widths. Each chip reveals after the scan phase
          with the §9.5.1 parallax-by-scale-delta hierarchy. */}
      <div className="mt-5 grid gap-2 lg:absolute lg:-right-2 lg:top-12 lg:mt-0 lg:w-[14rem] lg:translate-x-full lg:gap-3 lg:pl-8">
        {chips.map((chip, i) => (
          <ExtractedChip
            key={chip.value}
            chip={chip}
            index={i}
            inView={active}
            reduced={Boolean(reduced)}
          />
        ))}
      </div>
    </div>
  );
}

// ── A single revealed chip ──────────────────────────────────────────────────

function ExtractedChip({
  chip,
  index,
  inView,
  reduced,
}: {
  chip: AIExtractionChip;
  index: number;
  inView: boolean;
  reduced: boolean;
}) {
  // §9.5.1: foreground chips scale 0.88→1, background chips 0.90→1. Stagger
  // ≥300ms between chips (per §9.5.1 — never simultaneous reveals).
  const fromScale = chip.depth === "background" ? 0.9 : 0.88;
  const startDelay = 1.8 + index * 0.32; // 1.8s scan + 320ms between chips
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: fromScale }}
      animate={
        reduced
          ? undefined
          : inView
            ? { opacity: 1, scale: 1 }
            : undefined
      }
      transition={{ duration: 0.4, delay: startDelay, ease: EASE_OUT }}
      className={cn(
        "relative overflow-hidden rounded-lg border bg-surface-white/90 p-3 backdrop-blur-sm dark:bg-surface-dark-elevated/85",
        "border-surface-border-subtle dark:border-surface-dark-border",
      )}
      style={{
        boxShadow: `0 6px 14px -4px ${withAlpha(visual.navy, 0.12)}, 0 0 0 1px ${withAlpha(visual.cyan, 0.18)} inset`,
      }}
    >
      {chip.label ? (
        <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
          {chip.label}
        </span>
      ) : null}
      <span
        className={cn(
          "block font-display text-sm font-semibold text-text-primary dark:text-text-on-brand",
          chip.label && "mt-1",
        )}
      >
        {chip.value}
      </span>
      {/* Cyan corner glint — the chip carries the same scan vocabulary as the
          surface. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-2 size-1 rounded-full bg-accent-cyan"
      />
    </motion.div>
  );
}

// ── Default surfaces — abstract, never fake data ────────────────────────────
//
// The default surface skeleton — abstract forms only, on-system, no fake
// dashboard or invented numbers. Linear is a document skeleton; radial is a
// soft face-shaped vignette.

function DefaultSurface({ variant }: { variant: "linear" | "radial" }) {
  if (variant === "radial") {
    return (
      <div className="relative aspect-square w-full overflow-hidden">
        {/* Biometric viewport — soft cyan glow at centre, abstract face vignette. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(58% 58% at 50% 48%, ${withAlpha(
              visual.cyan,
              0.18,
            )}, transparent 70%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] size-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/30"
        />
        <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
          biometric viewport
        </span>
      </div>
    );
  }
  // linear — document skeleton, abstract forms only.
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden p-5">
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-accent-cyan" />
        <span className="h-2 w-24 rounded-full bg-text-primary/15 dark:bg-white/15" />
      </div>
      <div className="mt-4 space-y-2">
        <span className="block h-2 w-full rounded-full bg-text-primary/10 dark:bg-white/10" />
        <span className="block h-2 w-11/12 rounded-full bg-text-primary/10 dark:bg-white/10" />
        <span className="block h-2 w-8/12 rounded-full bg-text-primary/10 dark:bg-white/10" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="h-12 rounded-md border border-surface-border-subtle bg-surface-white/70 dark:border-surface-dark-border dark:bg-surface-dark-elevated/60" />
        <div className="h-12 rounded-md border border-surface-border-subtle bg-surface-white/70 dark:border-surface-dark-border dark:bg-surface-dark-elevated/60" />
      </div>
      <span className="absolute bottom-3 left-5 font-mono text-[9px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
        document surface
      </span>
    </div>
  );
}
