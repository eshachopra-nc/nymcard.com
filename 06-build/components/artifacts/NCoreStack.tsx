"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InfraIcon, type IconName, AmbientGlow } from "@/components/visuals";

// ── NCoreStack (v4 — restraint matched to the new product cards) ───────────
//
// Owner-locked direction 2026-05-26: the locked composition holds —
// translucent product layers floating above the nCore engine, cyan light
// rising through them on the 8s beat — but the chrome system is retired
// to match the restraint in the new product cards. No mono "programmable
// core" caption inside the engine, no crosshair corners, no LIVE marker.
//
// What stays:
//   • Six translucent layers, each with an InfraIcon and a label.
//   • Engine at the base with a cyan interface edge + inner bloom.
//   • Ascending engine-glow that climbs the stack on the 8s beat,
//     illuminating each layer as it passes.
//
// What's softened:
//   • Engine no longer carries a mono caption ("programmable core") —
//     just the brand mark.
//   • Soft tonal halo behind the whole stack, integrated rather than a
//     stark ambient orb.
//   • Layer surfaces are slightly more glassy / less panel-like.

// Canonical six layers + order, from 02-copy/nCore-copy.revised.md §"the six":
// Cards · Lending · Money Movement · Settlement · Financial Crime ·
// Reconciliation. "Settlement" folds in stablecoin settlement and sits before
// Financial Crime.
const PRODUCTS: { name: string; icon: IconName }[] = [
  { name: "Cards", icon: "cards" },
  { name: "Lending", icon: "lending" },
  { name: "Money Movement", icon: "money-movement" },
  { name: "Settlement", icon: "settlement" },
  { name: "Financial Crime", icon: "fraud" },
  { name: "Reconciliation", icon: "reconciliation" },
];

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
  // layer per ~1.1s on the 8s beat.
  const [litLayer, setLitLayer] = useState<number>(0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let timer: number = window.setTimeout(function tick() {
      i = i >= 7 ? 0 : i + 1;
      setLitLayer(i);
      const dwell = i === 0 ? 1400 : 1000;
      timer = window.setTimeout(tick, dwell);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <motion.div
      role="img"
      aria-label="The nCore platform — six products (Cards, Lending, Money Movement, Settlement, Financial Crime, Reconciliation) on the nCore engine, with a cyan light wave rising from the engine up through every layer."
      className={cn("relative mx-auto w-full max-w-[420px]", className)}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "shown"}
    >
      {/* Soft tonal halo behind the stack — replaces the v3 hard ambient
          orb. Reads as the platform "sitting in" the page rather than
          floating on top. */}
      <AmbientGlow placement="center" tone="cyan" size="lg" intensity="standard" />

      <div className="relative">
        {/* Ascending engine-glow column. A soft cyan column behind the
            stack with a glowing band that slides up from the engine
            position to the currently-lit layer. */}
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2"
            style={{ width: "78%", top: 0, bottom: 0 }}
          >
            <motion.span
              className="absolute left-0 right-0 h-24"
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 50%, rgba(34,211,238,0.40), transparent 70%)",
                filter: "blur(6px)",
              }}
              animate={{
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

          {/* nCore engine — the foundation. Restraint-matched: no mono
              caption, just the brand mark + the cyan signal dot. */}
          <Engine bloom={litLayer === 0} reduced={!!reduced} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── ProductLayer ───────────────────────────────────────────────────────────
// A translucent product layer. Glassy white on light; faint white wash on
// dark. Icon and label glow cyan briefly when the wave passes.

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
        // Glassy (transparent) like the hero/bento glass, so the cool field
        // behind the stack refracts through and the layers read dimensional —
        // not the opaque white pills they were.
        "border border-white/70 bg-white/50 backdrop-blur-xl backdrop-saturate-[160%]",
        "dark:border-white/[0.12] dark:bg-white/[0.05]",
        "transition-shadow duration-500",
        isLit
          ? "shadow-[0_0_24px_-4px_rgba(34,211,238,0.55)] ring-1 ring-inset ring-accent-cyan/45"
          : "shadow-[0_12px_30px_-14px_rgba(14,26,51,0.22)] ring-1 ring-inset ring-white/40 dark:shadow-[0_14px_32px_-16px_rgba(0,0,0,0.5)] dark:ring-transparent",
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
          filter: isLit
            ? "drop-shadow(0 0 8px rgba(34,211,238,0.85)) brightness(1.15)"
            : "drop-shadow(0 0 0 rgba(34,211,238,0))",
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <InfraIcon name={icon} size="sm" />
      </motion.span>

      <span className="relative z-10 font-display text-[15px] font-semibold tracking-tight">
        <span className={cn(isLit ? "text-accent-cyan" : "text-text-primary dark:text-text-on-brand")}>
          {name}
        </span>
      </span>
    </motion.div>
  );
}

// ── Engine ─────────────────────────────────────────────────────────────────
// The nCore engine — translucent navy, cyan interface edge at the top
// (where it meets the layers), inner cyan bloom that flares when the wave
// is at the engine. Restraint-matched: no mono caption inside the engine.

function Engine({ bloom, reduced }: { bloom: boolean; reduced: boolean }) {
  return (
    <motion.div
      variants={LAYER_VARIANTS}
      className="relative mt-1 overflow-hidden rounded-[10px] bg-brand-navy/95 px-5 py-4 ring-1 ring-inset ring-accent-cyan/20 backdrop-blur-md dark:bg-brand-navy"
    >
      {/* Cyan interface edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-accent-cyan/65"
      />

      {/* Inner cyan bloom. */}
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

      <div className="relative z-10 flex items-center justify-center gap-2.5">
        {/* The engine signal — a steady cyan node that brightens when the
            ascending wave reaches the engine. No ping/pulse loop (the rising
            wave carries the "alive" reading; a pulsing dot would be an AI-slop
            tell layered on top of motion that already lives). */}
        <motion.span
          aria-hidden="true"
          className="relative size-1.5 rounded-full bg-accent-cyan"
          animate={
            reduced ? undefined : { opacity: bloom ? 1 : 0.55, scale: bloom ? 1.25 : 1 }
          }
          transition={reduced ? undefined : { duration: 0.6, ease: EASE }}
        />
        <span className="font-display text-xl font-bold tracking-tight text-text-on-brand">
          nCore
        </span>
      </div>
    </motion.div>
  );
}
