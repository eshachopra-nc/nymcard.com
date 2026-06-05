"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { PopIn } from "@/components/visuals/product-illustration";

// ── Commercial Payments §3 · Working Capital & Financing — illustration ───────
//
// Concept (owner-picked): "credit line + gauge". A credit-line panel with a
// radial utilization GAUGE (a visual we use nowhere else). On scroll the gauge
// fills to the available level, the available figure counts up, and a "Draw
// funds → Funds ready" beat lands. USD. Covers credit lines, invoice financing,
// and business lending (the sublabel nods to the breadth).
//
// Motion (§9): static at rest; the gauge fill + count-up play once on scroll and
// replay on hover. prefers-reduced-motion → settled. Institution POV: the bank's
// financing product extending a credit line to its business customer.

const SUCCESS = tokens.color.semantic.success;

const LIMIT = 250000;
const AVAILABLE = 170000; // 68% of the limit
const DRAWN = 80000;
const AVAIL_FRAC = AVAILABLE / LIMIT; // 0.68

const R = 42;
const C = 2 * Math.PI * R;

export function WorkingCapitalUI() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion();

  const [runKey, setRunKey] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced) {
      setDrawn(true);
      return;
    }
    setDrawn(false);
    setRunKey((k) => k + 1);
    timers.current.push(setTimeout(() => setDrawn(true), 1350));
  }, [reduced]);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const t = useProgress(inView, !!reduced, runKey);
  const pct = AVAIL_FRAC * t; // 0 → 0.68
  const availableShown = Math.round(AVAILABLE * t);

  return (
    <div ref={ref} onMouseEnter={() => !reduced && run()} className="relative flex h-full w-full min-h-[24rem] items-center justify-center">
      <div
        className={cn(
          "relative w-full max-w-[420px] overflow-hidden rounded-xl border px-5 py-4",
          "border-white/70 bg-white/85 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_30px_66px_-26px_rgba(14,26,51,0.42)]",
          "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_60px_-24px_rgba(0,0,0,0.6)]",
        )}
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.5)} 30%, transparent 86%)` }} />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="leading-tight">
            <h3 className="font-display text-[15px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">Credit line</h3>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
              Revolving · Invoice financing
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: withAlpha(SUCCESS, 0.14), color: SUCCESS }}>
            <span className="size-1.5 rounded-full" style={{ background: SUCCESS, boxShadow: `0 0 6px ${SUCCESS}` }} />
            Active
          </span>
        </div>

        {/* Gauge + figures */}
        <div className="mt-4 flex items-center gap-5">
          <Gauge pct={pct} centerPct={Math.round(pct * 100)} />
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-text-secondary dark:text-text-dark-secondary">Available</div>
            <div className="mt-1 text-[26px] font-bold leading-none tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
              ${availableShown.toLocaleString("en-US")}
            </div>
            <div className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-secondary/80 dark:text-text-dark-secondary/70">
              of ${LIMIT.toLocaleString("en-US")} limit
            </div>
            <div className="mt-3 flex items-center gap-3 border-t border-black/[0.06] pt-2.5 dark:border-white/[0.06]">
              <Stat label="Drawn" value={`$${DRAWN.toLocaleString("en-US")}`} />
              <span className="h-7 w-px bg-black/[0.08] dark:bg-white/[0.1]" />
              <Stat label="APR" value="12.5%" />
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${visual.primary}, ${visual.cyan})`, boxShadow: `0 8px 18px -8px ${withAlpha(visual.cyan, 0.6)}` }}
          >
            Draw funds
            <ArrowRight className="size-3" strokeWidth={2.5} />
          </span>
          <PopIn show={drawn}>
            <span className="inline-flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: SUCCESS }}>
              <span className="grid size-3.5 place-items-center rounded-full text-white" style={{ background: SUCCESS }}>
                <Check className="size-2.5" strokeWidth={3.5} />
              </span>
              Funds ready · in your account
            </span>
          </PopIn>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="leading-tight">
      <div className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-text-secondary/80 dark:text-text-dark-secondary/70">{label}</div>
      <div className="mt-0.5 text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">{value}</div>
    </div>
  );
}

// The radial utilization gauge — a ring that fills to the available level.
function Gauge({ pct, centerPct }: { pct: number; centerPct: number }) {
  const offset = C * (1 - pct);
  return (
    <div className="relative grid size-24 shrink-0 place-items-center">
      <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
        <defs>
          <linearGradient id="wc-gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={visual.primary} />
            <stop offset="1" stopColor={visual.cyan} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={R} fill="none" strokeWidth="9" className="stroke-black/10 dark:stroke-white/15" />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          stroke="url(#wc-gauge)"
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-[18px] font-bold tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">{centerPct}%</span>
        <span className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">available</span>
      </div>
    </div>
  );
}

// Animate a 0→1 progress on scroll/hover (rAF, browser-only). Reduced → 1.
function useProgress(active: boolean, reduced: boolean, runKey: number, durationMs = 1050) {
  const [t, setT] = useState(reduced ? 1 : 0);
  useEffect(() => {
    if (reduced) {
      setT(1);
      return;
    }
    if (!active) {
      setT(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      setT(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, runKey, durationMs]);
  return t;
}
