"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  CreditCard,
  ArrowLeftRight,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
} from "@/components/visuals/product-illustration";

// ── BaaSBundleVisual (Banking as a Service §4 — What It Includes) ────────────
//
// The §4 left column already lists the four layers AS cards with copy, so this
// supporting surface tells the OTHER half of the story: those four layers are
// not four vendors — they run as ONE platform on a single core. The surface is
// a 2×2 ring of compact layer modules (Cards · Money Movement · Settlement ·
// Financial Crime) wired into a single glowing nCore node at the centre. The
// core node is the ONE focal element; the four modules are peers around it.
//
// Distinct from every existing product UI: the homepage surfaces each show a
// single flow; the nCore convergence visual is a ×3→×1 dedup. This is a hub-and-
// spoke "four layers, one core" topology — its own composition.
//
// Maps to copy: "Everything you need to launch and operate a bank." — the four
// bundled layers operating as one platform.
//
// Composed on the canonical product-illustration kit (§8.1 v-illus):
// IllustrationCard floating in the lit IllustrationField, same treatment as the
// homepage Products surfaces. Chips deliberately avoid echoing the left-column
// descriptions (no "issue cards", no "stablecoin") — they carry a system status
// instead.
//
// Motion (static at rest, prefers-reduced-motion safe):
//   • scroll-in — the four modules pop in one-by-one, the connectors draw toward
//     the core, then the core node settles and the verdict commits.
//   • hover (group) — the core glows brighter, the connectors brighten, and a
//     single cyan pulse travels each spoke into the core (the "one platform"
//     beat). Reduced motion shows the final lit state immediately.

type Layer = {
  name: string;
  status: string;
  icon: LucideIcon;
  // grid placement around the central core
  pos: "tl" | "tr" | "bl" | "br";
};

const LAYERS: Layer[] = [
  { name: "Cards", status: "Issuing", icon: CreditCard, pos: "tl" },
  { name: "Money Movement", status: "Routing", icon: ArrowLeftRight, pos: "tr" },
  { name: "Settlement", status: "Clearing", icon: Landmark, pos: "bl" },
  { name: "Financial Crime", status: "Screening", icon: ShieldCheck, pos: "br" },
];

// Spoke endpoints in the 100×100 connector viewBox — each module's inner corner
// reaching toward the core at centre (50,50).
const SPOKES: Record<Layer["pos"], { x1: number; y1: number }> = {
  tl: { x1: 27, y1: 27 },
  tr: { x1: 73, y1: 27 },
  bl: { x1: 27, y1: 73 },
  br: { x1: 73, y1: 73 },
};

export function BaaSBundleVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  };
  const module: Variants = {
    hidden: { opacity: 0, scale: 0.82 },
    show: { opacity: 1, scale: 1, transition: { duration: dur.base, ease: ease.spring } },
  };
  const core: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1, transition: { duration: dur.slow, ease: ease.spring, delay: 0.85 } },
  };

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} className="group/sys flex h-full flex-col p-4 sm:p-5">
          {/* Header — the platform identity. */}
          <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
            <Eyebrow>BaaS bundle</Eyebrow>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.13em] text-accent-teal dark:text-accent-cyan"
              style={{
                background: withAlpha(visual.cyan, 0.12),
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}`,
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: visual.cyan, boxShadow: `0 0 8px ${visual.cyan}` }}
              />
              One core
            </span>
          </div>

          {/* Topology — four layer modules wired into a single core node. */}
          <div className="relative my-auto py-4">
            {/* Connectors — drawn toward the core on scroll-in; a pulse rides
                each spoke into the core on hover. */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="baas-spoke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={withAlpha(visual.primary, 0.35)} />
                  <stop offset="100%" stopColor={withAlpha(visual.cyan, 0.85)} />
                </linearGradient>
              </defs>
              {LAYERS.map((l) => {
                const s = SPOKES[l.pos];
                return (
                  <g key={l.name}>
                    <motion.line
                      x1={s.x1}
                      y1={s.y1}
                      x2={50}
                      y2={50}
                      stroke="url(#baas-spoke)"
                      strokeWidth={1}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      className="opacity-70 transition-opacity duration-500 group-hover/sys:opacity-100"
                      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                      animate={
                        inView ? (reduced ? undefined : { pathLength: 1, opacity: 0.7 }) : undefined
                      }
                      transition={
                        reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.55 }
                      }
                    />
                    {/* Cyan pulse travelling the spoke into the core on hover. */}
                    {!reduced && (
                      <motion.circle
                        r={1.6}
                        fill={visual.cyan}
                        className="opacity-0 group-hover/sys:opacity-100"
                        initial={false}
                        animate={{ cx: [s.x1, 50], cy: [s.y1, 50] }}
                        transition={{
                          duration: dur.deliberate,
                          ease: ease.inOut,
                          repeat: Infinity,
                          repeatDelay: 0.4,
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Module ring + core — a 3×3 grid, core in the centre cell. */}
            <motion.div
              className="relative z-10 grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] items-center gap-x-2 gap-y-3"
              variants={reduced ? undefined : grid}
              initial={reduced ? false : "hidden"}
              animate={inView ? (reduced ? undefined : "show") : undefined}
            >
              <Module layer={LAYERS[0]} variants={reduced ? undefined : module} className="col-start-1 row-start-1" />
              <Module layer={LAYERS[1]} variants={reduced ? undefined : module} className="col-start-3 row-start-1" />

              {/* Core node — the ONE focal element. */}
              <motion.div
                className="col-start-2 row-start-2 mx-auto"
                variants={reduced ? undefined : core}
              >
                <CoreNode />
              </motion.div>

              <Module layer={LAYERS[2]} variants={reduced ? undefined : module} className="col-start-1 row-start-3" />
              <Module layer={LAYERS[3]} variants={reduced ? undefined : module} className="col-start-3 row-start-3" />
            </motion.div>
          </div>

          {/* Verdict — the four layers run as one. */}
          <motion.div
            className="flex items-center justify-between gap-3 border-t border-surface-border-subtle pt-2.5 dark:border-white/10"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
            transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 1.15 }}
          >
            <SubLabel>4 layers · 1 platform</SubLabel>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
              No vendor stack
            </span>
          </motion.div>
        </div>
      </IllustrationCard>
    </>
  );
}

// A bundled layer module — a compact tile with a gradient icon chip, the layer
// name, and a one-word system status (never echoing the left-column copy).
function Module({
  layer,
  variants,
  className,
}: {
  layer: Layer;
  variants?: Variants;
  className?: string;
}) {
  const Icon = layer.icon;
  return (
    <motion.div
      variants={variants}
      className={
        "flex items-center gap-2 rounded-[11px] bg-white/55 px-2.5 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_4px_10px_-6px_rgba(14,26,51,0.18)] transition-shadow duration-500 dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] " +
        (className ?? "")
      }
    >
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-md text-white shadow-[0_3px_8px_-3px_rgba(48,77,187,0.5)]"
        style={{
          background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(visual.cyan, 0.92)})`,
        }}
      >
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <div className="truncate font-body text-[11.5px] font-semibold leading-tight text-text-primary dark:text-text-on-brand">
          {layer.name}
        </div>
        <div className="truncate font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
          {layer.status}
        </div>
      </div>
    </motion.div>
  );
}

// The central nCore platform node — the single core every layer runs on. A
// glowing cyan→primary disk that brightens on hover; the surface's ONE focal
// element.
function CoreNode() {
  return (
    <span
      className="relative grid size-[68px] place-items-center rounded-2xl transition-shadow duration-500 group-hover/sys:shadow-[0_0_46px_rgba(34,211,238,0.7),0_18px_34px_-10px_rgba(48,77,187,0.6),inset_0_0_0_1px_rgba(255,255,255,0.6)]"
      style={{
        background: `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.95)}, ${withAlpha(visual.primary, 0.95)})`,
        boxShadow: `0 0 32px ${withAlpha(visual.cyan, 0.55)}, 0 16px 30px -10px ${withAlpha(visual.primary, 0.55)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.55)}`,
      }}
    >
      <span className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-[7px] tracking-[0.16em] text-white/80">PLATFORM</span>
        <span className="font-display text-[17px] font-bold leading-none text-white">nCore</span>
      </span>
    </span>
  );
}
