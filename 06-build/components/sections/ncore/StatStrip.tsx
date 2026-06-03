"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { dur, ease, visual, withAlpha } from "@/components/visuals";

// ── StatStrip (nCore Stats) ─────────────────────────────────────────────────
//
// A horizontal strip of four headline stats. Each stat counts up the numeric
// portion of its value on first scroll into view, holding any prefix ("<") and
// suffix ("+", "%", "s") steady so the unit reads from the first frame.
//
// The count-up is driven by Framer Motion (not a raw rAF loop): a
// `useMotionValue` animated by `animate()` with the visual-engine "out" easing
// over the cinematic duration; `useTransform` formats the live value into the
// final shape ("1,000", "99.99", etc.). The four stats reveal with a tasteful
// stagger via `useInView({ once: true })`, and the count-up kicks off in sync
// with each stat's own reveal. Under `prefers-reduced-motion` the final values
// show immediately with no animation.
//
// Each stat sits in its OWN dimensional cell — a tokenized surface with a
// hairline border, a soft float shadow, and a whisper of cool atmosphere (a
// faint cyan/indigo pooling top-left + a thin cyan top-edge hairline, the
// system's brand cue from the glass kit §8.1). This replaces the old flat
// number-row (owner: "looks flat") with a designed, premium grid that reads
// dimensional in BOTH themes — light: white card on the soft field; dark: a
// deep elevated surface with a low-saturation cool pooling. Restrained,
// navy/cyan-led, never a saturated wash. Cool palette only; reduced-motion
// safe. No frame line above (the copy file carries none).

export type Stat = {
  /** The full displayed value, e.g. "1,000+", "99.99%", "<2s", "135+". */
  value: string;
  /** The label beneath the value. */
  label: string;
};

type StatStripProps = {
  /** Exactly four stats render across the strip. */
  stats: Stat[];
  className?: string;
};

// Split a display value into a leading non-numeric prefix (e.g. "<"), the
// numeric core (which animates), and a trailing non-numeric suffix
// (e.g. "+", "%", "s"). The numeric core preserves its own grouping/decimals
// so "1,000" and "99.99" count up to the right shape.
function splitValue(value: string): {
  prefix: string;
  numeric: string;
  suffix: string;
} {
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return { prefix: "", numeric: "", suffix: value };
  return { prefix: match[1], numeric: match[2], suffix: match[3] };
}

// Per-stat reveal stagger (seconds). The count-up animates in sync with each
// stat's own reveal, so the four numbers cascade rather than firing together.
const STAGGER = 0.1;

export function StatStrip({ stats, className }: StatStripProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, i) => {
        const delay = i * STAGGER;
        return (
          <motion.div
            key={stat.label}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={
              reduced ? undefined : inView ? { opacity: 1, y: 0 } : undefined
            }
            transition={
              reduced ? undefined : { duration: dur.slow, ease: ease.out, delay }
            }
            className={cn(
              // The dimensional cell — a tokenized surface (white on the soft
              // field in light; deep elevated in dark) with a hairline border
              // and a soft float shadow. radius-xl matches the glass kit.
              "group relative flex flex-col overflow-hidden rounded-xl p-5 sm:p-6 lg:p-7",
              "border border-surface-border-subtle bg-surface-card",
              "shadow-[0_14px_36px_-22px_rgba(14,26,51,0.28),0_2px_6px_-3px_rgba(14,26,51,0.08)]",
              "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
              "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_18px_40px_-24px_rgba(0,0,0,0.6)]",
            )}
          >
            {/* whisper of cool atmosphere — faint cyan/indigo pooling top-left,
                contained to the cell, restrained in both themes. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  `radial-gradient(120% 90% at 6% -10%, ${withAlpha(visual.cyan, 0.07)}, transparent 56%),` +
                  `radial-gradient(110% 100% at 104% 120%, ${withAlpha(visual.indigo, 0.05)}, transparent 60%)`,
              }}
            />
            {/* cyan top-edge hairline — the glass-kit brand cue (§8.1). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(to right, transparent 0%, ${withAlpha(
                  visual.cyan,
                  0.45,
                )} 26%, ${withAlpha(visual.cyan, 0.22)} 64%, transparent 96%)`,
              }}
            />
            <div className="relative z-10 flex flex-col">
              <StatValue
                value={stat.value}
                inView={inView}
                reduced={!!reduced}
                delay={delay}
              />
              <span className="mt-2.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {stat.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function StatValue({
  value,
  inView,
  reduced,
  delay,
}: {
  value: string;
  inView: boolean;
  reduced: boolean;
  delay: number;
}) {
  const { prefix, numeric, suffix } = splitValue(value);

  // Parse the numeric core: target number, decimal places, and whether it
  // uses thousands grouping — so the count-up renders the same shape as the
  // final value.
  const hasGrouping = numeric.includes(",");
  const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
  const target = Number(numeric.replace(/,/g, ""));
  const isNumeric = Number.isFinite(target);

  // Framer Motion drives the count: a motion value animated by `animate()`,
  // formatted live by `useTransform` into the final value's shape.
  const count = useMotionValue(reduced || !isNumeric ? target : 0);
  const display = useTransform(count, (v) =>
    isNumeric
      ? v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          useGrouping: hasGrouping,
        })
      : numeric,
  );

  // Mirror the motion value into React state for text rendering.
  const [text, setText] = useState<string>(display.get());
  useEffect(() => display.on("change", setText), [display]);

  useEffect(() => {
    // Reduced motion / non-numeric → nothing to animate; the value is already
    // at target. Only the animated path runs the count-up, in sync with this
    // stat's staggered reveal.
    if (reduced || !inView || !isNumeric) return;
    const controls = animate(count, target, {
      duration: dur.cinematic,
      ease: ease.out,
      delay,
    });
    return () => controls.stop();
  }, [inView, target, reduced, isNumeric, count, delay]);

  return (
    <span className="font-display text-4xl font-bold leading-none tracking-tight tabular-nums text-text-primary dark:text-text-on-brand sm:text-5xl">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
