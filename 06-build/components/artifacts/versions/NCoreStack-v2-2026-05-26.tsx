"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InfraIcon, type IconName } from "@/components/visuals";

// ── nCore stack ────────────────────────────────────────────────────────────
//
// The nCore platform as a flat, precise systems diagram — six products as
// crisp stacked layers, the nCore engine as the solid foundation at the base.
//
// Two cyan data lines run vertically behind the stack, rooted in the core.
// The layer cards are opaque, so the lines are masked behind them and show
// only in the separators between layers. A glowing signal pulse travels
// continuously up each line — the live AI + data fabric — blooming through
// each separator as it passes, flowing from the core up into every product.

const PRODUCTS: { name: string; icon: IconName }[] = [
  { name: "Cards", icon: "cards" },
  { name: "Lending", icon: "lending" },
  { name: "Money Movement", icon: "money-movement" },
  { name: "Financial Crime", icon: "fraud" },
  { name: "Stablecoin Settlement", icon: "settlement" },
  { name: "Reconciliation", icon: "reconciliation" },
];

// The two data lines, by horizontal position across the stack.
const LINES = ["30%", "70%"];

const EASE = [0.22, 1, 0.36, 1] as const;

const LAYER = {
  hidden: { opacity: 0, y: 14 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export function NCoreStack({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      role="img"
      aria-label="The nCore platform — six products (Cards, Lending, Money Movement, Financial Crime, Stablecoin Settlement, Reconciliation) layered on the nCore engine, with two data lines carrying a live signal up through the stack from the core."
      className={cn("mx-auto w-full max-w-[400px]", className)}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "shown"}
    >
      <div className="relative">
        {/* two data lines — behind the cards, kinetic, shown only in the gaps */}
        {LINES.map((left, i) => (
          <div
            key={left}
            aria-hidden="true"
            className="absolute inset-y-0 w-14 -translate-x-1/2 overflow-hidden"
            style={{ left }}
          >
            {/* faint base line */}
            <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-accent-cyan/35 dark:bg-accent-cyan/30" />
            {/* kinetic signal pulse — a glowing comet travelling up, out of the core */}
            {!reduced && (
              <motion.span
                className="absolute left-1/2 h-24 w-[2px] -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_16px_6px] shadow-accent-cyan"
                initial={{ top: "100%" }}
                animate={{ top: ["100%", "-26%"] }}
                transition={{
                  duration: 3.8,
                  ease: "linear",
                  repeat: Infinity,
                  delay: i * 1.9,
                }}
              />
            )}
          </div>
        ))}

        {/* the layered stack — opaque cards mask the lines */}
        <motion.div
          className="relative z-10 flex flex-col gap-2"
          variants={{
            hidden: {},
            shown: {
              transition: { staggerChildren: 0.065, staggerDirection: -1 },
            },
          }}
        >
          {/* product layers */}
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.name}
              variants={LAYER}
              className="flex items-center gap-3.5 rounded-[10px] border border-surface-border-subtle bg-surface-white px-3.5 py-2.5 transition-colors duration-200 hover:border-surface-border-stronger dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger"
            >
              <InfraIcon name={p.icon} size="sm" />
              <span className="font-display text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                {p.name}
              </span>
            </motion.div>
          ))}

          {/* nCore foundation — the engine the products are built on */}
          <motion.div
            variants={LAYER}
            className="relative mt-1 overflow-hidden rounded-[10px] bg-brand-navy px-5 py-4 ring-1 ring-inset ring-white/[0.07] dark:ring-accent-cyan/20"
          >
            {/* cyan interface edge — where the core meets the layers */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-accent-cyan/60"
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-accent-cyan" />
                <span className="font-display text-lg font-bold tracking-tight text-text-on-brand">
                  nCore
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                programmable core
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
