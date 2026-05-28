"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";

// ── Ribbon field ───────────────────────────────────────────────────────────
//
// A reusable card-background treatment derived from the homepage hero ribbon —
// the "ribbon stroke" family of the card treatment system. Renders absolute
// inset-0; drop it into a `relative` zone. Carries the hero's gentle Lissajous
// drift, frozen under prefers-reduced-motion.
//
//   trace — the ribbon held in the bottom-right corner, a little reaching
//           top-left; lightly blurred so the strands blend as atmosphere
//   crest — the ribbon's vivid region cropped (not zoomed, so the colour
//           stays) and anchored bottom-right; a hair of blur softens the crop
//   veil  — the ribbon blurred into a soft, diffused veil

const SRC = "/handoff/home/home-hero-ribbon-cutout.png";
// A straight crop of the ribbon's vivid streaky region — placed in a corner
// at a natural size, so the colour is retained (no zoom magnification).
const CREST_SRC = "/handoff/home/home-hero-ribbon-crest.png";

export type RibbonFieldVariant = "trace" | "crest" | "veil";

// The bottom-right-corner ribbon treatment used by trace.
const CORNER_DESIGN = {
  opacity: 0.7,
  objectPosition: "64% 80%",
  scaleBase: 1.6,
  blur: 1.1,
  mask:
    "radial-gradient(140% 135% at 100% 100%, #000 0%, #000 52%, transparent 90%)," +
    " radial-gradient(44% 46% at 0% 0%, #000 0%, transparent 76%)",
} as const;

const CONFIG: Record<
  RibbonFieldVariant,
  { opacity: number; objectPosition: string; scaleBase: number; blur: number; mask?: string }
> = {
  trace: CORNER_DESIGN,
  // crest is rendered by its own branch below.
  crest: { opacity: 0.92, objectPosition: "50% 50%", scaleBase: 1, blur: 0.55 },
  veil: { opacity: 0.42, objectPosition: "50% 50%", scaleBase: 1.6, blur: 13 },
};

// crest — fades the vivid crop out toward the top-left so it sits in the corner.
const CREST_BR_MASK = "linear-gradient(to top left, #000 48%, transparent 96%)";

export function RibbonField({ variant }: { variant: RibbonFieldVariant }) {
  const reduced = useReducedMotion();
  const t = useTime();
  const c = CONFIG[variant];

  const x = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 26000) * 2 * Math.PI) * 9,
  );
  const y = useTransform(t, (v) =>
    reduced ? 0 : Math.cos((v / 21000) * 2 * Math.PI) * 6,
  );
  const scale = useTransform(t, (v) =>
    reduced
      ? c.scaleBase
      : c.scaleBase + Math.sin((v / 15000) * 2 * Math.PI) * 0.012,
  );

  // crest — the vivid ribbon crop, anchored in the bottom-right corner.
  if (variant === "crest") {
    return (
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <motion.img
          src={CREST_SRC}
          alt=""
          className="absolute"
          style={{
            x,
            y,
            scale,
            width: "140%",
            right: "-15%",
            bottom: "-10%",
            opacity: c.opacity,
            filter: c.blur ? `blur(${c.blur}px)` : undefined,
            WebkitMaskImage: CREST_BR_MASK,
            maskImage: CREST_BR_MASK,
            transformOrigin: "bottom right",
          }}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // trace, veil — the full ribbon, object-cover, masked.
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <motion.img
        src={SRC}
        alt=""
        className="absolute inset-0 size-full object-cover"
        style={{
          x,
          y,
          scale,
          objectPosition: c.objectPosition,
          opacity: c.opacity,
          filter: c.blur ? `blur(${c.blur}px)` : undefined,
          WebkitMaskImage: c.mask,
          maskImage: c.mask,
          transformOrigin: "center",
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
