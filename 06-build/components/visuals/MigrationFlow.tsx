"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "./palette";
import { dur, ease } from "./motion";

// ── MigrationFlow ──────────────────────────────────────────────────────────
//
// The agentic-AI migration storyteller — a horizontal sequence of stages
// where each stage carries an abstract geometric "agent" glyph above its
// label, lights up in turn as the section enters the viewport, and a thin
// cyan→indigo gradient trail draws across the row from the first stage to
// the last. The choreography turns five static boxes into a 1.5s sequence
// that reads as "the agents are doing this work, in order, fast."
//
// Linear-style throughout: no anthropomorphic avatars; the glyphs are pure
// geometric vocabulary (concentric arcs, nodes + connectors, sliders, paired
// arrows, target). Cool palette only — cyan + indigo via the visual engine
// palette. Respects `prefers-reduced-motion` (renders the completed state
// statically — no draw, no stagger). Five stages is the canonical set; the
// component supports up to five; extra glyphs cycle modulo if more are passed.

type MigrationFlowProps = {
  /** Stage labels, in order. Up to five is the design intent. */
  stages: readonly string[];
  /** Optional mono status line beneath the row. */
  statusLine?: string;
  className?: string;
};

// Gap between each stage activating (seconds). Times stages.length controls
// how long the connector trail takes to draw across the row.
const STAGE_GAP = 0.34;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGE_GAP, delayChildren: 0.15 },
  },
};

const stageVariants: Variants = {
  hidden: { opacity: 0.35, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, ease: ease.out },
  },
};

const chipVariants: Variants = {
  hidden: { scale: 0.94 },
  visible: {
    scale: 1,
    transition: { duration: dur.slow, ease: ease.spring },
  },
};

const checkVariants: Variants = {
  hidden: { opacity: 0, y: 3 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, delay: 0.18, ease: ease.out },
  },
};

export function MigrationFlow({
  stages,
  statusLine,
  className,
}: MigrationFlowProps) {
  const reduced = useReducedMotion();

  // The connector trail takes the full reveal duration so its leading edge
  // tracks the activating stage — by the time the last stage reveals, the
  // gradient has reached the far chip.
  const trailDuration = stages.length * STAGE_GAP + dur.base;

  return (
    <div className={cn("w-full", className)}>
      <motion.ol
        initial={reduced ? "visible" : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className={cn(
          "relative flex flex-col gap-6",
          // Horizontal row on lg+; stacked vertically on smaller viewports
          // so the labels and glyphs always have room to breathe.
          "lg:flex-row lg:items-start lg:gap-0",
        )}
      >
        {/* Horizontal connector — lives behind the chips on lg+. The left and
            right offsets equal half the chip width (size-12 → 1.5rem) so the
            line's endpoints land on chip centres. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 right-6 top-6 z-0 hidden lg:block"
        >
          <div className="relative h-px w-full overflow-hidden">
            {/* Faint base track — visible across the full width. */}
            <div className="absolute inset-0 bg-surface-border-subtle dark:bg-surface-dark-border" />
            {/* Animated cyan → indigo trail that draws from left to right. */}
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left"
              initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={reduced ? undefined : { scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                reduced
                  ? undefined
                  : { duration: trailDuration, delay: 0.15, ease: ease.out }
              }
              style={{
                background: `linear-gradient(to right, ${withAlpha(
                  visual.cyan,
                  0.7,
                )}, ${withAlpha(visual.indigo, 0.55)})`,
              }}
            />
          </div>
        </div>

        {stages.map((stage, i) => (
          <Stage key={stage} stage={stage} index={i} />
        ))}
      </motion.ol>

      {statusLine ? (
        <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
          {statusLine}
        </p>
      ) : null}
    </div>
  );
}

// ── A single stage ─────────────────────────────────────────────────────────

function Stage({ stage, index }: { stage: string; index: number }) {
  const Glyph = STAGE_GLYPHS[index % STAGE_GLYPHS.length];
  return (
    <motion.li
      variants={stageVariants}
      className={cn(
        "relative z-10 flex items-start gap-4",
        // Vertical layout per stage on lg+ — chip above, label below.
        "lg:flex-1 lg:flex-col lg:items-start lg:gap-3",
      )}
    >
      <motion.div
        variants={chipVariants}
        className={cn(
          "relative grid size-12 shrink-0 place-items-center rounded-lg",
          "bg-surface-white text-brand-primary ring-1 ring-accent-cyan/40",
          "shadow-[0_6px_18px_-8px_rgba(34,211,238,0.4)]",
          "dark:bg-surface-dark-elevated dark:text-accent-cyan",
        )}
      >
        {/* Soft halo behind the chip — gives the agent a lit, dimensional feel. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-lg blur-md"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${withAlpha(
              visual.cyan,
              0.34,
            )}, transparent 75%)`,
          }}
        />
        {/* Cyan front-edge — the lit face of the chip. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-1.5 top-0 h-px rounded-full"
          style={{
            background: `linear-gradient(to right, transparent, ${withAlpha(
              visual.cyan,
              0.7,
            )}, transparent)`,
          }}
        />
        <Glyph className="size-5" />
      </motion.div>

      <div className="min-w-0 flex-1 lg:flex-initial">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted dark:text-text-dark-secondary">
          Stage {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 block font-display text-base font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand lg:text-[15px]">
          {stage}
        </span>
        <motion.span
          variants={checkVariants}
          className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan"
        >
          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
          Complete
        </motion.span>
      </div>
    </motion.li>
  );
}

// ── Stage glyphs ───────────────────────────────────────────────────────────
//
// Five abstract geometric "agent" glyphs, one per migration phase. Stroke-only,
// `currentColor`, sized to a 24×24 viewbox so they read at the chip's 20px
// (size-5). The mapping by index:
//
//   0 — Discovery       concentric scan rings
//   1 — Mapping         nodes + connectors
//   2 — Configuration   stacked sliders
//   3 — Parallel run    paired arrowed paths
//   4 — Cutover         arrow into target

type GlyphProps = { className?: string };

const STAGE_GLYPHS: Array<(props: GlyphProps) => ReactElement> = [
  function DiscoveryGlyph({ className }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="12" cy="12" r="7" strokeOpacity="0.55" />
        <circle cx="12" cy="12" r="10.5" strokeOpacity="0.3" />
      </svg>
    );
  },
  function MappingGlyph({ className }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className={className}
        aria-hidden="true"
      >
        <circle cx="5" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="5" cy="18" r="2" fill="currentColor" stroke="none" />
        <path d="M7 6.6 L17 11.4 M7 17.4 L17 12.6" strokeOpacity="0.7" />
      </svg>
    );
  },
  function ConfigurationGlyph({ className }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className={className}
        aria-hidden="true"
      >
        <line x1="3" y1="7" x2="21" y2="7" strokeOpacity="0.5" />
        <line x1="3" y1="12" x2="21" y2="12" strokeOpacity="0.5" />
        <line x1="3" y1="17" x2="21" y2="17" strokeOpacity="0.5" />
        <circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="11" cy="17" r="2" fill="currentColor" stroke="none" />
      </svg>
    );
  },
  function ParallelGlyph({ className }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M3 8 L19 8" />
        <path d="M3 16 L19 16" />
        <path d="M16 5 L19 8 L16 11" />
        <path d="M16 13 L19 16 L16 19" />
      </svg>
    );
  },
  function CutoverGlyph({ className }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="17" cy="12" r="4" />
        <path d="M3 12 L13 12" />
        <path d="M10 9 L13 12 L10 15" />
      </svg>
    );
  },
];
