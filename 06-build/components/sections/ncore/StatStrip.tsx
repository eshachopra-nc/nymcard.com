"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";

// ── StatStrip (net-new — nCore Stats) ───────────────────────────────────────
//
// A horizontal strip of four headline stats with a framing line above. Each
// stat counts up the numeric portion of its value on first scroll into view,
// holding any prefix ("<") and suffix ("+", "%", "s") steady so the unit reads
// from the first frame. The CountUp is the LendingCreditJourney pattern: a
// single rAF loop with a cubic ease-out, `useInView({ once: true })`, and
// `useReducedMotion()` → jump straight to the final value.
//
// Token type + vertical dividers between columns (§7). Cool palette only;
// scroll-in reveal; reduced-motion safe.
//
// Follow-up: register into /visual-system (ui-ux-designer).

export type Stat = {
  /** The full displayed value, e.g. "1,000+", "99.99%", "<2s", "135+". */
  value: string;
  /** The label beneath the value. */
  label: string;
};

type StatStripProps = {
  /** A framing line above the stats. */
  frame: string;
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

export function StatStrip({ frame, stats, className }: StatStripProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced ? undefined : inView ? { opacity: 1, y: 0 } : undefined}
        transition={reduced ? undefined : { duration: dur.slow, ease: ease.out }}
        className="max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg"
      >
        {frame}
      </motion.p>

      <div className="mt-10 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col px-0 lg:px-7",
              // Vertical dividers between columns (§7) — only between, never
              // on the leading edge. Two-up on mobile, four-up on desktop.
              i % 2 !== 0 && "border-l border-surface-border-subtle pl-6 lg:border-l-0 lg:pl-7",
              i > 0 && "lg:border-l lg:border-surface-border-subtle dark:lg:border-surface-dark-border",
              i % 2 !== 0 && "dark:border-surface-dark-border",
            )}
          >
            <StatValue value={stat.value} inView={inView} reduced={!!reduced} />
            <span className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatValue({
  value,
  inView,
  reduced,
}: {
  value: string;
  inView: boolean;
  reduced: boolean;
}) {
  const { prefix, numeric, suffix } = splitValue(value);

  // Parse the numeric core: target number, decimal places, and whether it
  // uses thousands grouping — so the count-up renders the same shape as the
  // final value.
  const hasGrouping = numeric.includes(",");
  const decimals = numeric.includes(".")
    ? numeric.split(".")[1].length
    : 0;
  const target = Number(numeric.replace(/,/g, ""));

  // Reduced motion → hold the final value from the first render; no animation
  // effect runs, so there's no synchronous setState in an effect.
  const [n, setN] = useState(reduced ? target : 0);

  useEffect(() => {
    // Reduced motion has nothing to animate — the initial state is already the
    // target value. Only the animated path runs the rAF count-up.
    if (reduced || !inView) return;
    let raf = 0;
    const t0 = performance.now();
    const DURATION = 1200;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / DURATION);
      // Cubic ease-out — matches the LendingCreditJourney CountUp curve.
      setN(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
      else setN(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);

  const formatted = Number.isFinite(target)
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: hasGrouping,
      })
    : numeric;

  return (
    <span className="font-display text-4xl font-bold leading-none tracking-tight tabular-nums text-text-primary dark:text-text-on-brand sm:text-5xl">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
