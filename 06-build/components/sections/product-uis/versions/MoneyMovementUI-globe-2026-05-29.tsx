"use client";

import { motion, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { GlassBed, GlassSurface } from "./glass";

// ── MoneyMovementUI ────────────────────────────────────────────────────────
//
// Homepage Products bento → Money Movement (narrow cell). Glassmorphic and
// OBJECT-LED: a wireframe globe floating inside a frosted glass surface on a
// `porcelain` cool bed. Maps to copy: "Move funds across borders and rails with
// integrated FX and settlement."
//
// The globe vocabulary is the hero carousel's (concentric meridian ellipses,
// cool brand arcs) but drawn here in tokenized SVG so motion is FULLY under our
// control — STATIC at rest, no perpetual spin (the prior 16s self-rotating SMIL
// asset is retired per the owner's "no perpetual motion" rule). Distinct from
// the hero (the hero auto-rotates its carousel; this is a single static globe).
//
// Motion (STATIC at rest):
//   · Scroll-in (whileInView, once) — the globe fades+scales in and turns ONCE
//     (a single eased ±sweep, not a loop), and the A→B route arc draws.
//   · Hover (group-hover) — the route arc brightens/pulses once and the globe
//     gives one gentle turn (CSS group-hover rotate).
//   Reduced-motion safe: no turn, no draw, no hover transform.

const ARC_GLOW = withAlpha(visual.cyan, 0.9);

export function MoneyMovementUI() {
  const reduced = useReducedMotion();

  return (
    <GlassBed tone="porcelain">
      <div className="relative flex h-full w-full items-center justify-center p-5 sm:p-6">
        <GlassSurface className="flex h-full w-full items-center justify-center p-4">
          {/* Globe turns once on scroll-in, one gentle turn on hover. */}
          <motion.div
            aria-hidden="true"
            className="relative aspect-square w-full max-w-[200px] transition-transform duration-700 ease-out will-change-transform group-hover:rotate-[8deg]"
            initial={reduced ? false : { opacity: 0, scale: 0.92, rotate: -8 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.cinematic }}
          >
            <svg viewBox="0 0 200 200" className="size-full" fill="none">
              <defs>
                <linearGradient id="mmArc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={visual.cyan} />
                  <stop offset="100%" stopColor={visual.purple} />
                </linearGradient>
                <radialGradient id="mmGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={withAlpha(visual.cyan, 0.16)} />
                  <stop offset="100%" stopColor={withAlpha(visual.cyan, 0)} />
                </radialGradient>
              </defs>

              <circle cx="100" cy="100" r="84" fill="url(#mmGlow)" />

              {/* outer sphere */}
              <circle cx="100" cy="100" r="72" stroke={withAlpha(visual.primary, 0.35)} strokeWidth="1" />
              {/* meridians (vertical ellipses) */}
              <ellipse cx="100" cy="100" rx="24" ry="72" stroke={withAlpha(visual.indigo, 0.3)} strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="50" ry="72" stroke={withAlpha(visual.indigo, 0.22)} strokeWidth="1" />
              {/* latitudes (horizontal ellipses) */}
              <ellipse cx="100" cy="100" rx="72" ry="24" stroke={withAlpha(visual.indigo, 0.3)} strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="72" ry="50" stroke={withAlpha(visual.indigo, 0.22)} strokeWidth="1" />
              <line x1="28" y1="100" x2="172" y2="100" stroke={withAlpha(visual.indigo, 0.3)} strokeWidth="1" />

              {/* A→B route arc — draws on scroll-in, brightens/pulses on hover. */}
              <motion.path
                d="M 52 132 Q 100 28 150 88"
                stroke="url(#mmArc)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                style={{ filter: `drop-shadow(0 0 3px ${withAlpha(visual.cyan, 0.5)})` }}
                className="transition-[stroke-width] duration-300 group-hover:[stroke-width:2.6]"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.45 }}
              />

              {/* endpoints A and B */}
              <g>
                <circle cx="52" cy="132" r="4" fill={visual.cyan} stroke={visual.white} strokeWidth="1.4" />
                <circle cx="150" cy="88" r="4" fill={visual.purple} stroke={visual.white} strokeWidth="1.4" />
              </g>
            </svg>
          </motion.div>

          {/* corridor caption — two real endpoints, no fabricated brand. */}
          <span className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full" style={{ background: visual.cyan }} />
              AED
            </span>
            <span style={{ color: ARC_GLOW }} className="transition-opacity duration-300 group-hover:opacity-100">
              FX · settle
            </span>
            <span className="inline-flex items-center gap-1.5">
              GBP
              <span className="size-1.5 rounded-full" style={{ background: visual.purple }} />
            </span>
          </span>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
