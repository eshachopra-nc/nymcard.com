"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { GlassBed, GlassSurface, type GlassTone } from "./glass";
import { cn } from "@/lib/utils";

// ── HandoffVisual (design-system.md §8.8) ──────────────────────────────────
//
// A product-UI surface that frames a hand-crafted Claude Design SVG as a
// dimensional glass "screen". It composes the CANONICAL GLASS KIT (§8.1) — the
// same one the homepage bento and the hero use — so it never reads flat:
//
//   1. GlassBed   — the rich, theme-aware cool field (`GlassAtmosphere`). The
//                   frost has something to refract (the v5 flatness bug was a
//                   faint ~8% wash; this is the real field §8.1 requires).
//   2. GlassSurface — the frosted glass panel (white/70 + blur in light,
//                   surface-dark-glass in dark, cyan top hairline, lit corner).
//   3. Handoff SVG — the hand-crafted asset, loaded via <img> objectFit:contain
//                   INSIDE the glass panel, with one ambient translateY drift
//                   (±4px, 8s sine, suppressed under prefers-reduced-motion).
//
// On dark the GlassSurface flips to a translucent light pane (via its own
// dark-mode rules) so the light-themed SVG reads on its native ground while the
// page stays dark — exactly the hero-carousel trick.
//
// NOTE (§8.8 v6): the homepage bento and the distinct product-page surfaces are
// now bespoke CODED UIs, not reused SVGs. HandoffVisual remains for the inner
// pages whose UI zones still load a hand-crafted full-bleed asset — and it now
// renders them on the kit so they match the standard.

export type BedTone = GlassTone; // slate | porcelain | cyan | indigo | violet | mist

type Pad = "tight" | "default" | "loose";

// Outer breathing room between the cell edge and the glass panel, so the
// atmosphere field reads AROUND the panel (the dimensional cue). The SVG gets
// its own inner padding inside the panel.
const PAD: Record<Pad, string> = {
  tight: "p-3 sm:p-4",
  default: "p-4 sm:p-6",
  loose: "p-5 sm:p-8",
};

export function HandoffVisual({
  slug,
  tone,
  pad = "default",
  className,
}: {
  /** The handoff asset filename (without extension) under /public/handoff/. */
  slug: string;
  tone: BedTone;
  pad?: Pad;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const t = useTime();
  // Single ambient drift — translateY ±4px on an 8s sine. The one motion per
  // cell; the SVG's own detail carries everything else.
  const y = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 8000) * 2 * Math.PI) * 4,
  );

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-xl",
        className,
      )}
    >
      {/* The rich cool field — the canonical GlassAtmosphere (§8.1). */}
      <GlassBed tone={tone}>
        {/* The glass panel, inset so the field reads around its edges. */}
        <div className={cn("absolute inset-0", PAD[pad])}>
          <GlassSurface className="h-full w-full">
            <motion.div
              className="grid h-full w-full place-items-center p-3 sm:p-4"
              style={{ y }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG asset */}
              <img
                src={`/handoff/${slug}.svg`}
                alt=""
                aria-hidden="true"
                className="block h-full w-full"
                style={{ objectFit: "contain" }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </GlassSurface>
        </div>
      </GlassBed>
    </div>
  );
}
