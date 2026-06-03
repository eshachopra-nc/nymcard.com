"use client";

import { withAlpha, visual } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  Slab,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── DecisioningUI ───────────────────────────────────────────────────────────
//
// Lending /products/lending §4 — the Decisioning cell. Maps to the seed copy:
//   "Score against bureaus, open banking, or your own model in real time."
//   UI snippet: a decisioning rules panel with score thresholds and approval
//   logic.
//
// MIGRATED onto the canonical product-illustration kit (design-system.md §8.1).
// The DISTINCT story is unchanged: three data sources feed a score evaluated
// against the configured approval threshold. The computed score (742) sits above
// the threshold (720) as the ONE focal Stat, with a cyan "Approve" verdict — the
// approval logic made legible. Distinct from the §5 DecisioningVisualization,
// which shows the rules APPLYING to applicants; this cell shows the rules being
// CONFIGURED.
//
// Motion: the three source chips reveal one-by-one on scroll-in / hover
// (useSequentialReveal); the score + threshold render at rest. Reduced-motion
// safe. Threshold 720 mirrors the §5 underwriting config — on-system.

const SOURCES = ["Bureau", "Open banking", "Scoring model"];

const SCORE = 742;
const THRESHOLD = 720;
const MIN = 600;
const MAX = 760;
const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

export function DecisioningUI() {
  const { ref, n, bind } = useSequentialReveal(SOURCES.length, { step: 140, start: 220, amount: 0.3 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Decision rules</Eyebrow>
          <LiveTag>Real-time</LiveTag>
        </div>

        {/* Data sources feeding the model — reveal one-by-one. */}
        <div ref={ref} {...bind} className="mt-3.5 flex flex-wrap gap-1.5">
          {SOURCES.map((s, i) => (
            <span
              key={s}
              className="rounded-md bg-white/55 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-text-secondary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] dark:bg-white/[0.05] dark:text-text-dark-secondary dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Score track with the configured threshold marked. */}
        <Slab className="mt-3.5 px-3.5 py-3">
          <div className="relative h-2 w-full rounded-full bg-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] dark:bg-white/[0.08] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
            {/* approve zone — threshold → max */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 rounded-r-full"
              style={{ left: `${pct(THRESHOLD)}%`, right: 0, background: withAlpha(visual.cyan, 0.28) }}
            />
            {/* threshold tick */}
            <span
              aria-hidden="true"
              className="absolute -top-1 bottom-[-4px] w-px"
              style={{ left: `${pct(THRESHOLD)}%`, background: visual.indigo }}
            />
            {/* score marker */}
            <span
              aria-hidden="true"
              className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white transition-transform duration-300 group-hover:-translate-y-[60%] dark:ring-surface-dark-elevated"
              style={{ left: `${pct(SCORE)}%`, background: visual.cyan, boxShadow: `0 0 12px ${withAlpha(visual.cyan, 0.7)}` }}
            />
          </div>
          <div className="mt-2.5 flex items-end justify-between">
            <div>
              <Stat size={26}>{SCORE}</Stat>
              <div className="mt-1.5"><SubLabel>Score · threshold {THRESHOLD}</SubLabel></div>
            </div>
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-accent-teal dark:text-accent-cyan"
              style={{ background: withAlpha(visual.cyan, 0.16), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.45)}` }}
            >
              Approve
            </span>
          </div>
        </Slab>
      </IllustrationCard>
    </>
  );
}
