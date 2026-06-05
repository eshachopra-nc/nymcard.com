"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { DashboardWindow } from "./dashboard-chrome";

// ── Commercial Payments §3 · Real-Time Insights — product illustration ────────
//
// Concept (owner-picked): "live insights dashboard". A financial-overview panel:
// a hero Net cash flow figure that counts up, an AREA chart that DRAWS ON left
// to right (a visual used nowhere else in the set), and a KPI row covering the
// four copy dimensions — Spend · Cash in · Liabilities · Net margin. USD.
//
// Motion (§9): ONE-SHOT on scroll-into-view (and on hover) — the chart reveals,
// the figure counts up, the KPIs stagger in. NO perpetual pulsing / fake ticker
// (design rules): the "Live" tag is static. prefers-reduced-motion → settled.
// Institution POV: the bank's analytics product giving its business customer
// real-time financial visibility.

const SUCCESS = tokens.color.semantic.success;
const NET = 1240500;

// Cash-flow trend (normalised 0–100), generally rising.
const PTS = [40, 37, 45, 42, 52, 49, 58, 55, 63, 70, 66, 75, 82, 90];
const VW = 300;
const VH = 80;
const px = (i: number) => (i / (PTS.length - 1)) * VW;
const py = (v: number) => VH - 5 - (v / 100) * (VH - 12);
const LINE = "M " + PTS.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" L ");
const AREA = `${LINE} L ${VW},${VH} L 0,${VH} Z`;

type Kpi = { label: string; value: string; delta: string; up: boolean; good: boolean };
const KPIS: Kpi[] = [
  { label: "Spend", value: "$642k", delta: "4%", up: false, good: false },
  { label: "Cash in", value: "$1.9M", delta: "12%", up: true, good: true },
  { label: "Liabilities", value: "$312k", delta: "6%", up: false, good: true },
  { label: "Net margin", value: "18.2%", delta: "2.1pt", up: true, good: true },
];

export function RealTimeInsightsUI() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion();
  const [runKey, setRunKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    if (reduced) return;
    setRunKey((k) => k + 1);
  }, [reduced]);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const t = useProgress(inView, !!reduced, runKey);
  const netShown = Math.round(NET * t);
  const kpisShown = reduced || t >= 0.5;

  return (
    <div ref={ref} onMouseEnter={() => !reduced && run()} className="relative h-full w-full min-h-[24rem]">
      {/* The shared dashboard window + sidebar, active: Insights. */}
      <DashboardWindow active="Insights">
        <div className="flex min-w-0 flex-1 flex-col px-3.5 py-3 sm:px-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="leading-tight">
            <h3 className="font-display text-[15px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">Financial overview</h3>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">Last 30 days</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold text-accent-teal dark:text-accent-cyan" style={{ background: withAlpha(visual.cyan, 0.14) }}>
            <span className="size-1.5 rounded-full" style={{ background: visual.cyan, boxShadow: `0 0 6px ${visual.cyan}` }} />
            Live
          </span>
        </div>

        {/* Hero metric */}
        <div className="mt-3 flex items-end gap-2.5">
          <div className="leading-none">
            <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-text-secondary dark:text-text-dark-secondary">Net cash flow</div>
            <div className="mt-1.5 text-[26px] font-bold tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
              ${netShown.toLocaleString("en-US")}
            </div>
          </div>
          <span
            className="mb-0.5 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold transition-opacity duration-300"
            style={{ background: withAlpha(SUCCESS, 0.14), color: SUCCESS, opacity: t > 0.25 ? 1 : 0 }}
          >
            <ArrowUpRight className="size-3" strokeWidth={2.5} />
            12.4%
          </span>
        </div>

        {/* Area chart — draws on left → right, fills the panel height */}
        <div className="mt-3 min-h-[80px] flex-1">
          <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="rti-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={visual.cyan} stopOpacity="0.34" />
                <stop offset="1" stopColor={visual.cyan} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rti-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor={visual.primary} />
                <stop offset="1" stopColor={visual.cyan} />
              </linearGradient>
              <clipPath id="rti-reveal">
                <rect x="0" y="0" width={VW * t} height={VH} />
              </clipPath>
            </defs>
            <g clipPath="url(#rti-reveal)">
              <path d={AREA} fill="url(#rti-area)" />
              <path d={LINE} fill="none" stroke="url(#rti-line)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </div>

        {/* KPI row — pinned to the foot of the panel */}
        <div className="mt-3 grid grid-cols-4 gap-2 border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
          {KPIS.map((k, i) => (
            <div
              key={k.label}
              className="transition-[opacity,transform] duration-300"
              style={{
                opacity: kpisShown ? 1 : 0,
                transform: kpisShown ? "translateY(0)" : "translateY(6px)",
                transitionDelay: reduced ? "0ms" : `${i * 70}ms`,
              }}
            >
              <div className="truncate font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-secondary/80 dark:text-text-dark-secondary/70">{k.label}</div>
              <div className="mt-0.5 text-[13px] font-bold tabular-nums leading-none text-text-primary dark:text-text-on-brand">{k.value}</div>
              <span
                className={cn(
                  "mt-1 inline-flex items-center gap-0.5 text-[8px] font-semibold",
                  !k.good && "text-text-secondary dark:text-text-dark-secondary",
                )}
                style={k.good ? { color: SUCCESS } : undefined}
              >
                {k.up ? <ArrowUpRight className="size-2.5" strokeWidth={2.5} /> : <ArrowDownRight className="size-2.5" strokeWidth={2.5} />}
                {k.delta}
              </span>
            </div>
          ))}
        </div>
        </div>
      </DashboardWindow>
    </div>
  );
}

// Animate a 0→1 progress on scroll/hover (rAF, browser-only). Reduced → 1.
function useProgress(active: boolean, reduced: boolean, runKey: number, durationMs = 1150) {
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
