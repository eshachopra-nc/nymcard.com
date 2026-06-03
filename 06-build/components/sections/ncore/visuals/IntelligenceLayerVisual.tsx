"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BrainCircuit,
  Gavel,
  ShieldAlert,
  Fingerprint,
  Route,
  Activity,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { GlassPanel, GlassAtmosphere, visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── §6 — The AI Intelligence Layer running across the platform ──────────────
//
// A sibling of the homepage NCoreFullStack diagram, deliberately DISTINCT from
// the §5 Data Layer visual: where §5 is a foundation PLANE at the bottom that
// products feed DOWN into, §6 is an intelligence BAND running ACROSS the TOP
// that reaches DOWN into the six decision points. The cyan AI band spans the
// full width (the intelligence spanning everything); a single travelling pulse
// runs along it and lights each decision node it reaches.
//
// Built for a LIGHT section — GlassPanel over GlassAtmosphere so the frost
// reads (§8.1). Legible in dark by construction.
//
// Motion (prefers-reduced-motion safe):
//   • reveal-on-scroll — the intelligence band sweeps in, then the decision
//     nodes stagger up.
//   • hover (group) — the band brightens and the reach-down feeds light cyan.
//   • ambient — one cyan pulse travels the band (the NCoreFullStack beat),
//     lighting each decision node in turn.

const CYAN = "#22D3EE";
const NYM = visual.primary;

// The six intelligence applications (the section's chips) as decision nodes.
const NODES: { label: string; icon: LucideIcon }[] = [
  { label: "Decisioning", icon: Gavel },
  { label: "Risk", icon: ShieldAlert },
  { label: "Fraud", icon: Fingerprint },
  { label: "Routing", icon: Route },
  { label: "Monitoring", icon: Activity },
  { label: "Automation", icon: Workflow },
];

export function IntelligenceLayerVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(-1);

  // A single pulse travelling the band, lighting each decision node in turn.
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % (NODES.length + 2);
      setLit(i < NODES.length ? i : -1);
    }, 600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
  };
  const node: Variants = {
    hidden: reduced ? {} : { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
  const band: Variants = {
    hidden: reduced ? {} : { opacity: 0, y: -16 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
  };

  return (
    <motion.div
      className={cn("group relative isolate w-full overflow-hidden rounded-3xl p-2.5", className)}
      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassAtmosphere tone="cyan" animated />

      <GlassPanel padded className="relative w-full">
        <div
          role="img"
          aria-label="An AI intelligence layer runs across the whole platform and reaches into six decision points — Decisioning, Risk, Fraud, Routing, Monitoring and Automation — each reading the same customer, transaction and operational context."
          className="relative flex min-h-[19rem] flex-col justify-between"
        >
          {/* ── The intelligence band — running ACROSS the top ───────────── */}
          <motion.div
            variants={band}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
            className="relative z-10"
          >
            <div
              className={cn(
                "relative isolate overflow-hidden rounded-xl border px-4 py-3.5 transition-all duration-500",
                "border-accent-cyan/40 bg-white/85 dark:bg-[#0e1830]/85",
                "shadow-[0_20px_46px_-20px_rgba(14,26,51,0.45)] group-hover:border-accent-cyan/65 group-hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.45)]",
              )}
              style={{ background: `linear-gradient(180deg, ${withAlpha(CYAN, 0.05)}, transparent)` }}
            >
              {/* lit bottom hairline — the band's reach-down edge */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.7)} 20%, ${withAlpha(CYAN, 0.7)} 80%, transparent)` }}
              />
              {/* a single cyan pulse travelling the band L→R */}
              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 w-1/3"
                  style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(CYAN, 0.14)} 50%, transparent)` }}
                  animate={{ left: ["-33%", "100%"] }}
                  transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_3px_8px_-3px_rgba(48,77,187,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_8px_-3px_rgba(0,0,0,0.5)]"
                  style={{ borderColor: withAlpha(CYAN, 0.45), background: `linear-gradient(135deg, ${withAlpha(visual.white, 0.9)}, ${withAlpha(CYAN, 0.18)})` }}
                >
                  <BrainCircuit className="size-5" strokeWidth={1.9} style={{ color: CYAN }} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                    AI Intelligence Layer
                  </p>
                  <p className="font-body text-[10.5px] leading-snug text-text-secondary dark:text-text-dark-secondary">
                    One context across every model and decision
                  </p>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 sm:flex" style={{ borderColor: withAlpha(CYAN, 0.4) }}>
                  <span className="size-1.5 rounded-full" style={{ background: CYAN, boxShadow: `0 0 6px ${withAlpha(CYAN, 0.8)}` }} />
                  <span className="font-mono text-[8.5px] font-semibold uppercase tracking-wide" style={{ color: CYAN }}>
                    Across the platform
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Reach-down feeds — band into each decision node ──────────── */}
          <div className="relative z-0 my-2 h-12" aria-hidden="true">
            <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {NODES.map((_, i) => {
                const x = 50 + i * 100;
                const isLit = !reduced && i === lit;
                return (
                  <g key={i}>
                    <motion.path
                      d={`M 300 2 L ${x} 16 L ${x} 60`}
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
                    <circle cx={x} cy={58} r={2} fill={withAlpha(CYAN, isLit ? 0.95 : 0.55)} className="transition-[fill] duration-500" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── The six decision nodes (the section's chips) ─────────────── */}
          <motion.div
            className="relative z-10 grid grid-cols-3 gap-2.5 sm:grid-cols-6"
            variants={container}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
          >
            {NODES.map((n, i) => {
              const Icon = n.icon;
              const isLit = !reduced && i === lit;
              return (
                <motion.div
                  key={n.label}
                  variants={node}
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
                  <span className="font-display text-[9.5px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                    {n.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
