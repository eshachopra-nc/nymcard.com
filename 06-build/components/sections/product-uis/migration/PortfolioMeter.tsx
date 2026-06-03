"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, ease } from "@/components/visuals/motion";
import { Crumb, MigrationIllustration, useScrollGate } from "./migration-kit";

// ── §5 — Portfolio meter (share on nCore climbing batch by batch) ─────────────
//
// Slot 9. Renders beneath the five-phase MigrationFlow. The share on nCore
// climbing batch by batch while legacy recedes — a single horizontal bar split
// into nCore (cyan, leading) and legacy (muted navy, receding), with batch
// ticks marking each step. Maps to §5 visual ("a portfolio meter runs beneath,
// the share on nCore climbing batch by batch while legacy recedes").
//
// Motion: on scroll-in the nCore share grows to its current level (legacy
// recedes to match); the batch ticks settle in. Reduced motion shows the final
// split. Flat surface (no atmosphere) to sit cleanly in the flow strip.

const ON_NCORE = 64; // current share on nCore (%)
const BATCHES = 9; // total batch ticks across the bar

export function PortfolioMeter({ className }: { className?: string }) {
  const { ref, active, reduced, bind } = useScrollGate({ amount: 0.5 });
  const fill = reduced || active ? ON_NCORE : 0;

  return (
    <div
      ref={ref}
      {...bind}
      className={cn("group h-full min-h-[9.5rem] w-full", className)}
    >
      <MigrationIllustration lift contentClassName="justify-center p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <Crumb>Portfolio meter · share on nCore</Crumb>
        <span className="inline-flex items-baseline gap-1.5 font-mono">
          <span className="text-[15px] font-semibold tabular-nums text-accent-teal dark:text-accent-cyan">
            {fill}%
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
            on nCore
          </span>
        </span>
      </div>

      {/* The split bar — nCore leading, legacy receding. */}
      <div className="h-7 w-full overflow-hidden rounded-md ring-1 ring-inset ring-white/45 dark:ring-white/10">
        {/* legacy ground (full width, muted) */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${withAlpha(visual.navy, 0.12)}, ${withAlpha(visual.navy, 0.06)})`,
          }}
        />
        {/* nCore share, climbing */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 left-0"
          style={{
            background: `linear-gradient(90deg, ${visual.primary}, ${visual.cyan})`,
            boxShadow: `0 0 22px ${withAlpha(visual.cyan, 0.4)}`,
          }}
          initial={false}
          animate={{ width: `${fill}%` }}
          transition={
            reduced || !active
              ? { duration: 0 }
              : { duration: dur.cinematic, ease: ease.out }
          }
        />
        {/* batch tick marks */}
        <span aria-hidden="true" className="absolute inset-0">
          {Array.from({ length: BATCHES - 1 }).map((_, i) => (
            <span
              key={i}
              className="absolute inset-y-1 w-px"
              style={{
                left: `${((i + 1) / BATCHES) * 100}%`,
                background: withAlpha(visual.white, 0.45),
              }}
            />
          ))}
        </span>
        {/* leading edge label */}
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white"
          initial={false}
          animate={{ left: `calc(${fill}% - 38px)` }}
          transition={
            reduced || !active
              ? { duration: 0 }
              : { duration: dur.cinematic, ease: ease.out }
          }
        >
          nCore
        </motion.span>
      </div>

      {/* legend */}
      <div className="mt-3 flex items-center gap-4">
        <Legend swatch={`linear-gradient(90deg, ${visual.primary}, ${visual.cyan})`} label="On nCore" />
        <Legend swatch={withAlpha(visual.navy, 0.18)} label="On legacy · receding" />
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
          batch by batch
        </span>
      </div>
      </MigrationIllustration>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="size-2.5 rounded-[3px]"
        style={{ background: swatch }}
      />
      <span className="font-mono text-[10px] text-text-secondary dark:text-text-dark-secondary">
        {label}
      </span>
    </span>
  );
}
