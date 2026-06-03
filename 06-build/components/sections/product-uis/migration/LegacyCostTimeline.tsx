"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, ease } from "@/components/visuals/motion";
import {
  AMBER,
  Crumb,
  MigrationIllustration,
  useScrollGate,
  useSteps,
} from "./migration-kit";

// ── §2 Status quo — Anatomy of a legacy migration (cost-centre timeline) ──────
//
// Slot 2. An uncomfortably long horizontal timeline with stacked cost centres
// (Schema mapping, Test authoring, Reconciliation, Cutover weekend, SI fees).
// No numbers — the LENGTH and density carry the weight. A deliberately heavier,
// muted palette (slate/navy, no cyan glow, the lone amber "risk" marker on the
// cutover weekend) so the sections that follow read as relief. Maps to §2.
//
// Motion: on scroll-in the bars extend left → right one after another (the
// program dragging on); the muted tone makes it feel like a burden, not a win.
// Reduced motion shows the full bars. Tokens only.

// Each cost centre: its label, where it starts on the timeline (0–1), how far it
// runs (width fraction), and whether it is the lone "risk" beat (the cutover
// weekend). Deliberately overlapping + long; no quantified values.
const BANDS: {
  label: string;
  start: number;
  width: number;
  risk?: boolean;
}[] = [
  { label: "Schema mapping", start: 0.0, width: 0.34 },
  { label: "Test authoring", start: 0.22, width: 0.32 },
  { label: "Reconciliation", start: 0.46, width: 0.34 },
  { label: "Cutover weekend", start: 0.82, width: 0.1, risk: true },
  { label: "SI fees", start: 0.0, width: 0.96 },
];

const PHASES = ["Plan", "Build", "Test", "Reconcile", "Cut over"];

export function LegacyCostTimeline({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.35 });
  const grown = useSteps(BANDS.length, active, reduced, replay, {
    start: 200,
    step: 280,
  });

  return (
    <div ref={ref} {...bind} className={cn("group h-full w-full", className)}>
      <MigrationIllustration lift contentClassName="justify-center p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <Crumb>Legacy migration · projected program</Crumb>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
          duration: open-ended
        </span>
      </div>

      {/* The timeline rows. */}
      <div className="space-y-2.5">
        {BANDS.map((band, i) => {
          const on = reduced || grown > i;
          return (
            <div key={band.label} className="flex items-center gap-3">
              <span className="w-[104px] shrink-0 truncate font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary sm:w-[120px]">
                {band.label}
              </span>
              <div className="relative h-5 flex-1 overflow-hidden rounded-[5px] bg-surface-white/60 ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.03] dark:ring-surface-dark-border">
                {/* faint tick grid so the length reads as a calendar. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent calc(20% - 1px), ${withAlpha(
                      visual.navy,
                      0.07,
                    )} calc(20% - 1px), ${withAlpha(visual.navy, 0.07)} 20%)`,
                  }}
                />
                <motion.span
                  className="absolute inset-y-[3px] rounded-[3px]"
                  style={{
                    left: `${band.start * 100}%`,
                    background: band.risk
                      ? `linear-gradient(90deg, ${withAlpha(visual.navy, 0.5)}, ${withAlpha(AMBER, 0.82)})`
                      : `linear-gradient(90deg, ${withAlpha(visual.navy, 0.62)}, ${withAlpha(visual.primary, 0.5)})`,
                    boxShadow: band.risk ? `0 0 14px ${withAlpha(AMBER, 0.35)}` : undefined,
                  }}
                  initial={false}
                  animate={{ width: on ? `${band.width * 100}%` : "0%" }}
                  transition={
                    reduced || !active
                      ? { duration: 0 }
                      : { duration: dur.deliberate, ease: ease.out }
                  }
                />
                {band.risk && (
                  <span
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-semantic-warning"
                    style={{ opacity: on ? 1 : 0, transition: "opacity 400ms" }}
                  >
                    high risk
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase axis — left to right, stretched, "ongoing" at the end. */}
      <div className="mt-5 flex items-center justify-between border-t border-white/40 pl-[116px] pt-3 dark:border-white/10 sm:pl-[132px]">
        {PHASES.map((p) => (
          <span
            key={p}
            className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary"
          >
            {p}
          </span>
        ))}
      </div>
      </MigrationIllustration>
    </div>
  );
}
