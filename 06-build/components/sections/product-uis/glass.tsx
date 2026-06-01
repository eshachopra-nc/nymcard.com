"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { visual, withAlpha, GlassAtmosphere, type AtmosphereTone } from "@/components/visuals";

// ── Glass snippet system (homepage Products bento) ───────────────────────────
//
// The "Wio Bank UAE glass card" vocabulary, shared across the six in-card
// product UIs so they read as one dimensional material family — NOT six flat
// panels. It reuses the system's existing light-glass rules (design-system.md
// §8.1, mirrored from components/visuals/GlassPanel.tsx): white/70 + blur(20px)
// saturate(180%), a critical cyan top-edge hairline, a soft diffuse float
// shadow, radius-xl. Dark mode swaps to surface-dark-glass + blur(24px).
//
// What's shared:                          What VARIES per card (the brief's
//   · the glass material + hairline          "don't make them identical"):
//   · the soft float shadow                   · the cool gradient BED tone
//   · radius-xl                               · object-led vs. data-led layout
//                                             · density (one panel vs. a console)
//
// Two primitives:
//   · GlassBed   — the per-card cool gradient bed the glass floats on. Six
//     cool tones (slate / cyan / indigo / violet / mist / porcelain). Light by
//     default; in dark mode a faint cool wash sits over the dark page.
//   · GlassSurface — a frosted, dimensional glass panel. The brief allows the
//     KEY surface to bleed slightly off the card edge for depth (the Stripe
//     technique) — pass `bleed` to drop the panel a touch past the bed.
//
// All colour resolves from tokens via `visual` + `withAlpha`; no raw hex.

export type GlassTone =
  | "slate"
  | "cyan"
  | "indigo"
  | "violet"
  | "mist"
  | "porcelain";

// The bento bed is now the canonical `GlassAtmosphere` (the rich, theme-aware
// cool field §8.1 requires) — NOT the old faint ~8% wash that made the frost
// read flat. Map each legacy bento tone to an atmosphere tone, leading with
// navy/cyan/indigo/teal and steering violet → navy-indigo so the bento never
// reads purple-led (Paymentology). Purple stays as an accent on the card
// objects themselves, not the field.
const TONE_TO_ATMOSPHERE: Record<GlassTone, AtmosphereTone> = {
  slate: "azure",
  cyan: "cyan",
  indigo: "indigo",
  violet: "indigo",
  mist: "teal",
  porcelain: "azure",
};

/**
 * The per-card field the glass floats on — the canonical `GlassAtmosphere`
 * (design-system.md §8.1: glass never sits on a solid/near-plain bed).
 * Theme-aware + restrained (soft pastel in light, deep cool in dark), navy/cyan
 * led. Children render above the field.
 */
export function GlassBed({
  tone,
  className,
  children,
  style,
}: {
  tone: GlassTone;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} style={style}>
      <GlassAtmosphere tone={TONE_TO_ATMOSPHERE[tone]} animated />
      {/* A restrained diagonal cool sweep — a hint of the hero's kinetic ribbon
          — so the (now transparent) glass surfaces above have a richer field to
          refract and read dimensional, not flat. Cool/contained, never garish. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(118deg, transparent 26%, ${withAlpha(
            visual.cyan,
            0.12,
          )} 50%, ${withAlpha(visual.indigo, 0.1)} 66%, transparent 90%)`,
        }}
      />
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}

// The frosted glass material — reuses §8.1 / GlassPanel rules. The cyan top
// hairline is the brand cue and is "critical" per §8.1.
// Mirrors the HERO card material (components/hero/ProductCarousel.tsx): a
// genuinely transparent frosted glass (not an opaque white box) with a bright
// lit edge + a deep float shadow, so it floats on the rich field and refracts
// it the way the hero glass does. Kept legible enough for data content.
const GLASS_MATERIAL =
  "relative isolate overflow-hidden rounded-xl border " +
  "border-white/70 bg-white/55 backdrop-blur-[26px] backdrop-saturate-[180%] " +
  "dark:border-white/[0.12] dark:bg-surface-dark-glass dark:backdrop-blur-[26px] dark:backdrop-saturate-[160%] " +
  "shadow-[0_24px_56px_-22px_rgba(14,26,51,0.5),0_6px_16px_-8px_rgba(14,26,51,0.18)] " +
  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_28px_60px_-20px_rgba(0,0,0,0.65)]";

const HAIRLINE = (peak: number, mid: number) =>
  `linear-gradient(to right, transparent 0%, ${withAlpha(visual.cyan, peak)} 24%, ${withAlpha(
    visual.cyan,
    mid,
  )} 62%, transparent 94%)`;

/**
 * A dimensional frosted-glass panel. The key surface in a card can pass
 * `bleed` to drop slightly off the bed edge (the Stripe depth technique).
 */
export function GlassSurface({
  className,
  children,
  bleed = false,
  style,
}: {
  className?: string;
  children: ReactNode;
  /** Let the key surface bleed a touch off the card edge for depth. */
  bleed?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className={cn(GLASS_MATERIAL, bleed && "rounded-b-none", className)} style={style}>
      {/* cyan top-edge hairline — the brand cue (§8.1: critical) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px dark:hidden"
        style={{ background: HAIRLINE(0.55, 0.3) }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-px dark:block"
        style={{ background: HAIRLINE(0.48, 0.24) }}
      />
      {/* top-left directional bloom — the lit-material cue from GlassPanel */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(120% 96% at 20% -8%, ${withAlpha(visual.white, 0.4)}, ${withAlpha(
            visual.white,
            0.06,
          )} 32%, transparent 64%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
