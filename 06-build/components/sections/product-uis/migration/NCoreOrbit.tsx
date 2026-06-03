"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  TrendingUp,
  ArrowLeftRight,
  Layers,
  ShieldAlert,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, ease } from "@/components/visuals/motion";
import { Crumb, MigrationIllustration, useScrollGate, useSteps } from "./migration-kit";

// ── §7 on-ramp — nCore orbit (everything runs on one core) ────────────────────
//
// Slot 14, replacing the before/after stack. The payoff visual for "Migration
// gets you onto the platform. The platform changes what you can build": nCore as
// a glowing central nucleus with the six products orbiting it — Cards, Lending,
// Money movement, Settlement, Financial crime, Reconciliation — each a node with
// its established lucide icon + a text label. One focal element: the nCore
// nucleus. Floats in the canonical product-illustration treatment (luminous field
// + glowing glass card), dimensional in BOTH light and dark — never flat.
//
// Motion:
//   • scroll-in — the nucleus lights, then the six nodes settle into the ring one
//     by one (`useSteps`), each connector to the core drawing as it lands.
//   • ambient — a slow orbital drift (the ring rotates; each node counter-rotates
//     so its icon + label stay upright). Hero-consistent ambient, paused under
//     reduced motion (the ring holds at its settled angle).
//   • hover — the cell lifts; under direct node hover the node brightens and its
//     connector strengthens (pure CSS group hover).
// Reduced motion lands on the fully-settled ring with no drift. Tokens only.

const PRODUCTS: { icon: LucideIcon; label: string }[] = [
  { icon: CreditCard, label: "Cards" },
  { icon: TrendingUp, label: "Lending" },
  { icon: ArrowLeftRight, label: "Money movement" },
  { icon: Layers, label: "Settlement" },
  { icon: ShieldAlert, label: "Financial crime" },
  { icon: FileCheck2, label: "Reconciliation" },
];

const RADIUS = 116; // node ring radius (px from centre)

export function NCoreOrbit({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.3 });
  // The six nodes settle into the ring one by one after the nucleus lights.
  const settled = useSteps(PRODUCTS.length, active, reduced, replay, {
    start: 520,
    step: 200,
  });
  const coreLit = reduced || active;
  // Ambient drift only once settled (and never under reduced motion).
  const drifting = !reduced && active;

  return (
    <div ref={ref} {...bind} className={cn("group h-full w-full", className)}>
      <MigrationIllustration lift contentClassName="justify-center p-5 sm:p-6">
        <div className="mb-1 flex items-center justify-between">
          <Crumb>nCore · one core</Crumb>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-teal dark:text-accent-cyan">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent-cyan"
              style={{ boxShadow: `0 0 8px ${withAlpha(visual.cyan, 0.7)}` }}
            />
            six products · one record
          </span>
        </div>

        {/* The orbit stage — square, centred. */}
        <div className="relative mx-auto grid aspect-square w-full max-w-[340px] place-items-center">
          {/* orbit guide ring */}
          <span
            aria-hidden="true"
            className="absolute rounded-full border transition-opacity duration-700"
            style={{
              width: RADIUS * 2,
              height: RADIUS * 2,
              borderColor: withAlpha(visual.cyan, 0.22),
              opacity: coreLit ? 1 : 0,
            }}
          />

          {/* The drifting ring — connectors + nodes rotate rigidly together so
              they stay aligned; each node counter-rotates so its icon + label
              stay upright. */}
          <motion.div
            aria-hidden={false}
            className="absolute inset-0"
            animate={drifting ? { rotate: 360 } : { rotate: 0 }}
            transition={
              drifting
                ? { duration: 90, ease: "linear", repeat: Infinity }
                : { duration: 0 }
            }
          >
            {/* connectors core → node, drawn on settle */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full overflow-visible"
              viewBox="-170 -170 340 340"
            >
              {PRODUCTS.map((p, i) => {
                const angle = (i / PRODUCTS.length) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * (RADIUS - 26);
                const y = Math.sin(angle) * (RADIUS - 26);
                const on = reduced || settled > i;
                return (
                  <motion.line
                    key={p.label}
                    x1={0}
                    y1={0}
                    x2={x}
                    y2={y}
                    stroke={withAlpha(visual.cyan, 0.5)}
                    strokeWidth={1.2}
                    initial={false}
                    animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                    transition={
                      reduced || !active
                        ? { duration: 0 }
                        : { duration: dur.deliberate, ease: ease.out }
                    }
                  />
                );
              })}
            </svg>
            {PRODUCTS.map((p, i) => {
              const angle = (i / PRODUCTS.length) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const on = reduced || settled > i;
              return (
                <div
                  key={p.label}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                >
                  {/* counter-rotate the node so it stays upright during drift */}
                  <motion.div
                    animate={drifting ? { rotate: -360 } : { rotate: 0 }}
                    transition={
                      drifting
                        ? { duration: 90, ease: "linear", repeat: Infinity }
                        : { duration: 0 }
                    }
                  >
                    <ProductNode icon={p.icon} label={p.label} on={on} />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* The nucleus — the one focal element. */}
          <div
            className={cn(
              "relative z-10 grid size-[88px] place-items-center rounded-full transition-all duration-700 sm:size-[96px]",
              coreLit ? "scale-100 opacity-100" : "scale-90 opacity-60",
            )}
          >
            {/* outer bloom */}
            <span
              aria-hidden="true"
              className="absolute inset-[-22px] rounded-full"
              style={{
                background: `radial-gradient(circle, ${withAlpha(visual.cyan, coreLit ? 0.34 : 0.12)}, transparent 70%)`,
                transition: "background 700ms",
              }}
            />
            <span
              className="relative grid size-full place-items-center rounded-full"
              style={{
                background: `linear-gradient(150deg, ${withAlpha(visual.navy, 0.96)}, ${visual.navy})`,
                boxShadow: `0 0 38px ${withAlpha(visual.cyan, 0.5)}, 0 18px 36px -14px ${withAlpha(visual.navy, 0.7)}, inset 0 1px 0 ${withAlpha(visual.white, 0.14)}`,
              }}
            >
              <span className="flex flex-col items-center gap-1">
                <Layers className="size-5 text-accent-cyan" strokeWidth={1.7} />
                <span className="font-display text-[12px] font-semibold tracking-[0.08em] text-white">
                  nCore
                </span>
              </span>
            </span>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
            one architecture · one data layer
          </span>
        </div>
      </MigrationIllustration>
    </div>
  );
}

function ProductNode({
  icon: Icon,
  label,
  on,
}: {
  icon: LucideIcon;
  label: string;
  on: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-[88px] flex-col items-center gap-1.5 transition-all duration-300",
        on ? "scale-100 opacity-100" : "scale-75 opacity-0",
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl border transition-all duration-300",
          "border-white/60 bg-white/55 text-brand-primary",
          "shadow-[0_8px_18px_-8px_rgba(14,26,51,0.35),inset_0_1px_0_rgba(255,255,255,0.7)]",
          "group-hover:border-accent-cyan/60 group-hover:bg-accent-cyan/[0.12]",
          "dark:border-white/15 dark:bg-white/[0.07] dark:text-accent-cyan dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
          "dark:group-hover:border-accent-cyan/50",
        )}
      >
        <Icon className="size-[18px]" strokeWidth={1.7} />
      </span>
      <span className="text-center font-mono text-[9.5px] uppercase leading-tight tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
        {label}
      </span>
    </div>
  );
}
