"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InfraIcon, type IconName, AmbientGlow } from "@/components/visuals";

// ── NCoreStack (v3 — translucent + engine-glow wave) ───────────────────────
//
// Option A rebuild (owner-approved 2026-05-26). The platform reads as a
// stack of translucent product layers floating above a cyan engine, with
// a soft cyan glow ascending one layer per beat-step (engine → cards),
// illuminating each layer's icon as it passes. The previous two cyan
// data lines are retired — the engine glow IS the new aliveness cue.
//
// Composition:
//   • AmbientGlow behind the whole stack — the halo it sits in.
//   • Engine at the base — translucent navy with an inner cyan bloom
//     that breathes on the 8s beat.
//   • Six product layers, translucent (white/55 backdrop-blur-md on
//     light, white/[0.04] backdrop-blur-md on dark), each holding an
//     icon and a label.
//   • A light-wave that climbs the stack on the 8s beat (1 layer step
//     per ~1.1s), lighting up the layer it currently sits behind.
//   • On scroll-in: stack assembles bottom-to-top (engine first, then
//     layers stagger up, then the first light-wave fires).

const PRODUCTS: { name: string; icon: IconName }[] = [
  { name: "Cards", icon: "cards" },
  { name: "Lending", icon: "lending" },
  { name: "Money Movement", icon: "money-movement" },
  { name: "Financial Crime", icon: "fraud" },
  { name: "Stablecoin Settlement", icon: "settlement" },
  { name: "Reconciliation", icon: "reconciliation" },
];

// Layer index conventions:
//   0 = engine
//   1..6 = product layers (1 = bottom = Reconciliation; 6 = top = Cards)
// PRODUCTS is rendered top-to-bottom in markup (Cards first), so layer
// index in the wave maps as (PRODUCTS.length - markup_index) for products.

const EASE = [0.22, 1, 0.36, 1] as const;

const LAYER_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export function NCoreStack({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  // The "lit layer" index. 0 = engine, 1..6 = products. Steps up one
  // layer per ~1.1s on the 8s beat (6 product layers + engine bloom +
  // ~1s rest = ~8s loop).
  const [litLayer, setLitLayer] = useState<number>(0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    // Initial wait so the assembly animation completes before the wave
    // starts climbing.
    let timer: number = window.setTimeout(function tick() {
      i = i >= 7 ? 0 : i + 1; // wrap engine→6→0
      setLitLayer(i);
      // Hold longer on engine (the bloom moment); shorter per layer.
      const dwell = i === 0 ? 1400 : 1000;
      timer = window.setTimeout(tick, dwell);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <motion.div
      role="img"
      aria-label="The nCore platform — six products (Cards, Lending, Money Movement, Financial Crime, Stablecoin Settlement, Reconciliation) on the nCore engine, with a cyan light wave rising from the engine up through every layer."
      className={cn("relative mx-auto w-full max-w-[420px]", className)}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "shown"}
    >
      {/* Halo behind the whole composition. */}
      <AmbientGlow placement="center" tone="cyan" size="lg" intensity="subtle" />

      <div className="relative">
        {/* Ascending engine-glow column. A soft cyan column behind the
            stack, with a glowing band that slides up from the engine
            position to the currently-lit layer. The band's offset is
            keyed to litLayer so it visually "passes through" each layer. */}
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2"
            style={{
              width: "78%",
              top: 0,
              bottom: 0,
            }}
          >
            {/* The travelling bloom — a soft cyan radial that moves up
                the column based on litLayer. */}
            <motion.span
              className="absolute left-0 right-0 h-24"
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 50%, rgba(34,211,238,0.40), transparent 70%)",
                filter: "blur(6px)",
              }}
              animate={{
                // litLayer 0 = engine (bottom), 6 = top. Map to top% so
                // higher litLayer → lower top%.
                top: `${100 - (litLayer / 6) * 92 - 6}%`,
                opacity: litLayer === 0 ? 0.85 : 0.6,
              }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </motion.span>
        )}

        {/* The layered stack — translucent layers on top of the column. */}
        <motion.div
          className="relative z-10 flex flex-col gap-2"
          variants={{
            hidden: {},
            shown: {
              transition: { staggerChildren: 0.075, staggerDirection: -1 },
            },
          }}
        >
          {/* Product layers (Cards first = top of stack). */}
          {PRODUCTS.map((p, markupIndex) => {
            // markup index 0 = Cards = top = layer 6
            // markup index 5 = Reconciliation = bottom = layer 1
            const layerIndex = PRODUCTS.length - markupIndex;
            const isLit = litLayer === layerIndex;
            return (
              <ProductLayer
                key={p.name}
                name={p.name}
                icon={p.icon}
                isLit={isLit}
                reduced={!!reduced}
              />
            );
          })}

          {/* nCore engine — the foundation, with the inner cyan bloom. */}
          <Engine bloom={litLayer === 0} reduced={!!reduced} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── ProductLayer ───────────────────────────────────────────────────────────
// A translucent product layer. Light: white/55 backdrop-blur-md. Dark:
// white/[0.04] backdrop-blur-md. Icon and label glow cyan briefly when
// the wave passes (isLit true).

function ProductLayer({
  name,
  icon,
  isLit,
  reduced,
}: {
  name: string;
  icon: IconName;
  isLit: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      variants={LAYER_VARIANTS}
      className={cn(
        "relative flex items-center gap-3.5 overflow-hidden rounded-[10px] px-3.5 py-2.5",
        "border border-white/40 bg-white/55 backdrop-blur-md",
        "dark:border-white/10 dark:bg-white/[0.04]",
        "transition-shadow duration-500",
        isLit
          ? "shadow-[0_0_22px_-4px_rgba(34,211,238,0.55)] ring-1 ring-inset ring-accent-cyan/45"
          : "shadow-[0_2px_8px_-4px_rgba(14,26,51,0.08)] ring-1 ring-inset ring-transparent",
      )}
    >
      {/* Cyan glow strip that washes the layer when lit. */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.18) 50%, transparent)",
          }}
          animate={{ opacity: isLit ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      )}

      <motion.span
        className="relative z-10"
        animate={{
          // Icon tone: subtle cyan flash when lit. We rely on color-shift via
          // a wrapper since InfraIcon is monochromatic.
          filter: isLit
            ? "drop-shadow(0 0 8px rgba(34,211,238,0.85)) brightness(1.15)"
            : "drop-shadow(0 0 0 rgba(34,211,238,0))",
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <InfraIcon name={icon} size="sm" />
      </motion.span>

      <motion.span
        className="relative z-10 font-display text-[15px] font-semibold tracking-tight"
        animate={{
          color: isLit
            ? "rgb(34 211 238)" // accent-cyan
            : "var(--label-color, currentColor)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="text-text-primary dark:text-text-on-brand">
          <span className={cn(isLit && "text-accent-cyan")}>{name}</span>
        </span>
      </motion.span>
    </motion.div>
  );
}

// ── Engine ─────────────────────────────────────────────────────────────────
// The nCore engine — translucent navy, cyan interface edge at the top
// (where it meets the layers), and an inner cyan bloom that flares when
// the wave is at the engine position.

function Engine({ bloom, reduced }: { bloom: boolean; reduced: boolean }) {
  return (
    <motion.div
      variants={LAYER_VARIANTS}
      className="relative mt-1 overflow-hidden rounded-[10px] bg-brand-navy/95 px-5 py-4 ring-1 ring-inset ring-accent-cyan/20 backdrop-blur-md dark:bg-brand-navy"
    >
      {/* Cyan interface edge — top hairline. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-accent-cyan/65"
      />

      {/* Inner cyan bloom — breathes on the 8s beat, flares when the
          wave reaches the engine position. */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 110% at 50% 100%, rgba(34,211,238,0.32), transparent 70%)",
          }}
          animate={{ opacity: bloom ? 0.95 : [0.38, 0.55, 0.38] }}
          transition={
            bloom
              ? { duration: 0.6, ease: EASE }
              : { duration: 8, ease: "easeInOut", repeat: Infinity }
          }
        />
      )}

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative grid size-1.5 place-items-center">
            <span className="absolute inset-0 rounded-full bg-accent-cyan/55 motion-safe:animate-ping" />
            <span className="relative size-1.5 rounded-full bg-accent-cyan" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-text-on-brand">
            nCore
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
          programmable core
        </span>
      </div>
    </motion.div>
  );
}
