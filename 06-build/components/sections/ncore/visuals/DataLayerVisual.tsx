"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  CreditCard,
  CircleDollarSign,
  ArrowLeftRight,
  Clock,
  Shield,
  FileText,
  Database,
  type LucideIcon,
} from "lucide-react";
import { GlassPanel, GlassAtmosphere, visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── §5 — One shared data layer powering every product ───────────────────────
//
// A sibling of the homepage NCoreFullStack diagram (same glass-on-atmosphere
// material, same boxed gradient icon chips, same connector + single-pulse
// vocabulary), but here the focus is the DATA LAYER as the FOUNDATION. The six
// products sit in a row up top; each drops a connector DOWN into one shared
// data-layer plane (the single source of truth). A single restrained cyan
// pulse travels along the foundation, lighting each feed in turn.
//
// Built for a LIGHT section — composes GlassPanel over GlassAtmosphere so the
// frost reads (§8.1). Legible in dark by construction.
//
// Motion (prefers-reduced-motion safe):
//   • reveal-on-scroll — products stagger in, then the data plane rises.
//   • hover (group) — the data plane brightens and the feeds light cyan.
//   • ambient — one cyan pulse sweeps the foundation (the NCoreFullStack beat).

const CYAN = "#22D3EE";
const NYM = visual.primary;

const PRODUCTS: { name: string; short: string; icon: LucideIcon }[] = [
  { name: "Cards", short: "Cards", icon: CreditCard },
  { name: "Lending", short: "Lending", icon: CircleDollarSign },
  { name: "Money Movement", short: "Money", icon: ArrowLeftRight },
  { name: "Settlement", short: "Settle", icon: Clock },
  { name: "Financial Crime", short: "Crime", icon: Shield },
  { name: "Reconciliation", short: "Recon", icon: FileText },
];

export function DataLayerVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(-1);

  // A single pulse sweeping the foundation, lighting each feed in turn.
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % (PRODUCTS.length + 2);
      setLit(i < PRODUCTS.length ? i : -1);
    }, 620);
    return () => window.clearInterval(id);
  }, [reduced]);

  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
  };
  const chip: Variants = {
    hidden: reduced ? {} : { opacity: 0, y: -14 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
  const plane: Variants = {
    hidden: reduced ? {} : { opacity: 0, y: 18 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 } },
  };

  return (
    <motion.div
      className={cn("group relative isolate w-full overflow-hidden rounded-3xl p-2.5", className)}
      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassAtmosphere tone="indigo" animated />

      <GlassPanel padded className="relative w-full">
        <div
          role="img"
          aria-label="Six products — Cards, Lending, Money Movement, Settlement, Financial Crime and Reconciliation — all read from and feed one shared data layer, the platform's single source of truth."
          className="relative flex min-h-[19rem] flex-col justify-between"
        >
          {/* ── Products row — boxed gradient chips (NCoreFullStack chip) ─── */}
          <motion.div
            className="relative z-10 grid grid-cols-3 gap-2.5 sm:grid-cols-6"
            variants={container}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
          >
            {PRODUCTS.map((p, i) => {
              const Icon = p.icon;
              const isLit = !reduced && i === lit;
              return (
                <motion.div
                  key={p.name}
                  variants={chip}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border px-1.5 py-2.5 text-center transition-all duration-500",
                    "border-black/[0.07] bg-white/85 dark:bg-[#0e1830]/80",
                    isLit
                      ? "border-accent-cyan/55 shadow-[0_0_22px_-6px_rgba(34,211,238,0.5)]"
                      : "dark:border-white/[0.1]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-[9px] border bg-gradient-to-br transition-all duration-500",
                      "border-[#304DBB]/25 from-white/90 to-[#304DBB]/15 text-[#304DBB] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_3px_8px_-3px_rgba(48,77,187,0.35)]",
                      "dark:border-[#6E96FF]/35 dark:from-[#3A57C8]/45 dark:to-[#16224a]/55 dark:text-[#96B4FF] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_8px_-3px_rgba(0,0,0,0.5)]",
                      isLit && "border-accent-cyan/50 text-accent-cyan",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.9} />
                  </span>
                  <span className="font-display text-[10px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                    {p.short}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Feeds — connectors dropping from each product into the plane ─ */}
          <div className="relative z-0 my-2 h-12" aria-hidden="true">
            <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {PRODUCTS.map((_, i) => {
                const x = 50 + i * 100;
                const isLit = !reduced && i === lit;
                return (
                  <g key={i}>
                    <motion.path
                      d={`M ${x} 0 L ${x} 44 L 300 58`}
                      fill="none"
                      stroke={withAlpha(CYAN, isLit ? 0.85 : 0.45)}
                      strokeWidth={1.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="3 3"
                      vectorEffect="non-scaling-stroke"
                      className="transition-[stroke] duration-500"
                      animate={reduced ? undefined : { strokeDashoffset: [0, -12] }}
                      transition={reduced ? undefined : { duration: 2.4 + i * 0.2, ease: "linear", repeat: Infinity }}
                    />
                    <circle cx={x} cy={2} r={2} fill={withAlpha(CYAN, isLit ? 0.95 : 0.55)} className="transition-[fill] duration-500" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── The shared data layer — the foundation plane ─────────────── */}
          <motion.div
            variants={plane}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
            className="relative z-10"
          >
            <div
              className={cn(
                "relative isolate overflow-hidden rounded-xl border px-4 py-3.5 transition-all duration-500",
                "border-accent-cyan/35 bg-white/85 dark:bg-[#0e1830]/85",
                "shadow-[0_20px_46px_-20px_rgba(14,26,51,0.45)] group-hover:border-accent-cyan/60 group-hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.45)]",
              )}
            >
              {/* lit top hairline — the top surface of the foundation */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.7)} 20%, ${withAlpha(CYAN, 0.7)} 80%, transparent)` }}
              />
              {/* a single cyan pulse sweeping the foundation L→R */}
              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 w-1/3"
                  style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(CYAN, 0.12)} 50%, transparent)` }}
                  animate={{ left: ["-33%", "100%"] }}
                  transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border bg-gradient-to-br text-[#304DBB] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_3px_8px_-3px_rgba(48,77,187,0.35)] dark:text-[#96B4FF] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_8px_-3px_rgba(0,0,0,0.5)]"
                  style={{ borderColor: withAlpha(CYAN, 0.4), background: `linear-gradient(135deg, ${withAlpha(visual.white, 0.9)}, ${withAlpha(CYAN, 0.16)})` }}
                >
                  <Database className="size-5" strokeWidth={1.9} style={{ color: CYAN }} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                    Unified Data Layer
                  </p>
                  <p className="font-body text-[10.5px] leading-snug text-text-secondary dark:text-text-dark-secondary">
                    One customer · one ledger · one operational record
                  </p>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 sm:flex" style={{ borderColor: withAlpha(CYAN, 0.4) }}>
                  <span className="size-1.5 rounded-full" style={{ background: CYAN, boxShadow: `0 0 6px ${withAlpha(CYAN, 0.8)}` }} />
                  <span className="font-mono text-[8.5px] font-semibold uppercase tracking-wide" style={{ color: CYAN }}>
                    Source of truth
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
