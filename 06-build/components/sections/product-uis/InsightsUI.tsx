"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { CreditCard, Landmark, ArrowLeftRight, Wallet, ShieldAlert, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { IllustrationField, IllustrationCard } from "@/components/visuals/product-illustration";

// ── InsightsUI (nCore Capabilities — Insights vertical) ─────────────────────
//
// Insights is a CROSS-CUTTING vertical. Per owner feedback this surface now
// reads as ONE Insights dashboard currently VIEWING the Cards product — a left
// product-nav sidebar lists every product (Cards selected; Lending, Money
// Movement, Settlement, Financial Crime, Reconciliation referenced), and the
// main panel is a focused, legible Cards analytics view: a headline metric, a
// single approval-rate trend, and two supporting tiles. The sidebar is what
// makes the "analytics across every product, one place" claim literal — you can
// see the other products are switchable; Cards is just the one in view.
//
// Maps to copy: "Dashboards and analytics across every product, so you see the
// whole program in one place."
//
// DISTINCT by construction:
//   · vs AIDecisioningUI (beside it) — that's a vertical agentic decision spine;
//     this is a dashboard-with-sidebar.
//   · vs CardControlsDashboard (the Cards LAYER tile) — that's a navy app shell
//     whose sidebar cycles CONTROL MODES (freeze/spend/MCC/KYC). This sidebar
//     lists PRODUCTS, the chrome is glass (not navy), and the body is analytics
//     (a trend + KPIs), not card-control panes.
//
// Composed on the canonical product-illustration kit (§8.1 v-illus):
// IllustrationCard floating in the lit IllustrationField — the same treatment as
// the AI surface beside it and the six homepage surfaces.
//
// Neutral on-system program values only — no fabricated third-party brands or
// merchant data. Cool palette only.
//
// Motion (static at rest): on scroll-in the sidebar rows stagger in, the
// headline figure counts up, the trend line draws, the supporting tiles fade up.
// The cell carries the hover lift. Reduced-motion → full end-state, no animation.

type ProductNav = { key: string; label: string; icon: LucideIcon };

// The product nav — Cards is the active view; the rest reference the other
// products Insights can switch to. Order mirrors the six capability tiles.
const PRODUCTS: ProductNav[] = [
  { key: "cards", label: "Cards", icon: CreditCard },
  { key: "lending", label: "Lending", icon: Landmark },
  { key: "money", label: "Money Movement", icon: ArrowLeftRight },
  { key: "settlement", label: "Settlement", icon: Wallet },
  { key: "crime", label: "Financial Crime", icon: ShieldAlert },
  { key: "recon", label: "Reconciliation", icon: Scale },
];

const ACTIVE_KEY = "cards";

// Headline metric for the Cards view — authorization approval rate. On-system,
// not a real total.
const APPROVAL_TARGET = 96.4; // %

// A single trend: approval rate across a trailing window (12 points), gently
// rising. Values are fractions 0–1 of the chart height (already normalised to a
// tight, believable 92–97% band so the line reads as a real KPI trend).
const TREND = [0.34, 0.4, 0.37, 0.46, 0.52, 0.49, 0.58, 0.64, 0.61, 0.72, 0.8, 0.88];

// Two supporting tiles — neutral on-system program figures.
const TILES: { label: string; value: string }[] = [
  { label: "Active cards", value: "1.84M" },
  { label: "Auth volume · 24h", value: "12.6M" },
];

function ApprovalFigure({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const [val, setVal] = useState(reduced ? APPROVAL_TARGET : 0);
  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, APPROVAL_TARGET, {
      duration: dur.deliberate,
      ease: ease.out,
      delay: 0.25,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, reduced]);
  return (
    <span className="font-display text-[27px] font-bold leading-none tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
      {val.toFixed(1)}
      <span className="ml-0.5 text-[17px] font-semibold text-text-secondary dark:text-text-dark-secondary">%</span>
    </span>
  );
}

// Build a smooth-ish polyline path + the matching closed area path from the
// trend fractions, mapped into the chart viewBox.
function useTrendPaths(w: number, h: number, pad: number) {
  return useMemo(() => {
    const innerW = w - pad * 2;
    const innerH = h - pad * 2;
    const pts = TREND.map((f, i) => {
      const x = pad + (i / (TREND.length - 1)) * innerW;
      const y = pad + (1 - f) * innerH;
      return [x, y] as const;
    });
    const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
    const last = pts[pts.length - 1];
    const first = pts[0];
    const area = `${line} L${last[0].toFixed(2)},${(h - pad).toFixed(2)} L${first[0].toFixed(2)},${(h - pad).toFixed(2)} Z`;
    return { line, area, last };
  }, [w, h, pad]);
}

export function InsightsUI() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const CHART_W = 240;
  const CHART_H = 64;
  const PAD = 6;
  const { line, area, last } = useTrendPaths(CHART_W, CHART_H, PAD);

  const navList: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  };
  const navRow: Variants = {
    hidden: { opacity: 0, x: -5 },
    show: { opacity: 1, x: 0, transition: { duration: dur.base, ease: ease.out } },
  };

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} className="grid h-full grid-cols-[96px_1fr] items-center sm:grid-cols-[112px_1fr]">
              {/* ── Product nav sidebar — every product; Cards active. ────── */}
              <motion.nav
                aria-label="Insights — product"
                className="flex flex-col gap-0.5 border-r border-surface-border-subtle p-2.5 dark:border-white/10"
                variants={reduced ? undefined : navList}
                initial={reduced ? false : "hidden"}
                animate={inView ? (reduced ? undefined : "show") : undefined}
              >
                <span className="mb-1.5 px-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
                  Products
                </span>
                {PRODUCTS.map((p) => {
                  const on = p.key === ACTIVE_KEY;
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.key} variants={reduced ? undefined : navRow}>
                      <button
                        type="button"
                        aria-current={on ? "page" : undefined}
                        className={
                          "flex w-full items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent-cyan/50 " +
                          (on
                            ? "bg-accent-cyan/[0.14] ring-1 ring-inset ring-accent-cyan/30 dark:bg-accent-cyan/[0.16]"
                            : "hover:bg-accent-cyan/[0.06] dark:hover:bg-white/[0.05]")
                        }
                      >
                        <Icon
                          aria-hidden
                          strokeWidth={2}
                          className={
                            "size-3.5 shrink-0 " +
                            (on
                              ? "text-accent-cyan"
                              : "text-text-secondary dark:text-text-dark-secondary")
                          }
                        />
                        <span
                          className={
                            "truncate font-body text-[10.5px] font-medium leading-tight " +
                            (on
                              ? "text-text-primary dark:text-text-on-brand"
                              : "text-text-secondary dark:text-text-dark-secondary")
                          }
                        >
                          {p.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* ── Main panel — the Cards analytics view. ───────────────── */}
              <div className="flex min-w-0 flex-col gap-3 p-4 sm:p-[18px]">
                {/* Header — what we're looking at + the headline KPI. */}
                <div className="flex items-end justify-between gap-3 border-b border-surface-border-subtle pb-3 dark:border-white/10">
                  <div className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.13em] text-accent-cyan">
                      Cards · approval rate
                    </span>
                    <span className="mt-1.5 block">
                      <ApprovalFigure inView={inView} reduced={reduced} />
                    </span>
                  </div>
                  <motion.span
                    className="shrink-0 rounded-md bg-accent-cyan/[0.12] px-2 py-1 font-mono text-[10.5px] font-semibold tabular-nums tracking-tight text-accent-cyan ring-1 ring-inset ring-accent-cyan/40 dark:bg-accent-cyan/[0.16]"
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.55 }}
                  >
                    +2.3 pts
                  </motion.span>
                </div>

                {/* Single trend — approval rate over a trailing window. */}
                <div className="relative">
                  <svg
                    viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                    className="h-[56px] w-full sm:h-[60px]"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Cards approval rate trend, trailing window"
                  >
                    <defs>
                      <linearGradient id="insights-trend-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={withAlpha(visual.cyan, 0.26)} />
                        <stop offset="100%" stopColor={withAlpha(visual.cyan, 0)} />
                      </linearGradient>
                    </defs>
                    {/* baseline */}
                    <line
                      x1={PAD}
                      y1={CHART_H - PAD}
                      x2={CHART_W - PAD}
                      y2={CHART_H - PAD}
                      stroke={withAlpha(visual.primary, 0.18)}
                      strokeWidth="1"
                    />
                    {/* area fill — fades in after the line draws */}
                    <motion.path
                      d={area}
                      fill="url(#insights-trend-fill)"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={inView ? (reduced ? undefined : { opacity: 1 }) : undefined}
                      transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.7 }}
                    />
                    {/* the trend line — draws left→right on scroll-in */}
                    <motion.path
                      d={line}
                      fill="none"
                      stroke={visual.cyan}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      initial={reduced ? false : { pathLength: 0 }}
                      animate={inView ? (reduced ? undefined : { pathLength: 1 }) : undefined}
                      transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.3 }}
                    />
                    {/* leading-edge marker */}
                    <motion.circle
                      cx={last[0]}
                      cy={last[1]}
                      r="3"
                      fill={visual.cyan}
                      stroke={visual.white}
                      strokeWidth="1.5"
                      initial={reduced ? false : { scale: 0, opacity: 0 }}
                      animate={inView ? (reduced ? undefined : { scale: 1, opacity: 1 }) : undefined}
                      transition={reduced ? undefined : { duration: dur.base, ease: ease.spring, delay: 0.95 }}
                      style={{ transformOrigin: `${last[0]}px ${last[1]}px` }}
                    />
                  </svg>
                </div>

                {/* Two supporting tiles. */}
                <div className="grid grid-cols-2 gap-2.5 border-t border-surface-border-subtle pt-3 dark:border-white/10">
                  {TILES.map((t, i) => (
                    <motion.div
                      key={t.label}
                      className="rounded-md border border-surface-border-subtle bg-surface-soft/60 px-2.5 py-2 dark:border-white/10 dark:bg-white/[0.04]"
                      initial={reduced ? false : { opacity: 0, y: 6 }}
                      animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
                      transition={
                        reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.8 + i * 0.1 }
                      }
                    >
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                        {t.label}
                      </div>
                      <div className="mt-1 font-display text-[16px] font-semibold tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
                        {t.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
        </div>
      </IllustrationCard>
    </>
  );
}
