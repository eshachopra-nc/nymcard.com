"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { visual, withAlpha } from "./palette";
import { cn } from "@/lib/utils";

// ── GlassAtmosphere ─────────────────────────────────────────────────────────
//
// The cool field that glass floats on at CARD scale — the missing piece that
// lets the canonical `GlassPanel` read as glass outside the hero.
//
// design-system.md §8.1: glass must NEVER sit on a solid/near-plain colour — it
// reads over imagery or a gradient (the hero pairs it with the kinetic ribbon).
// The bento broke this with ~8% washes, so the frost collapsed to flat panels.
//
// RESTRAINT (owner: "don't go too colourful"): this is theme-aware and
// light-first, exactly like the hero. In LIGHT mode it's a SOFT cool pastel
// field (a light surface with gentle violet/cyan pooling — like the hero's
// pastel ribbon), never a saturated block dropped on a light page. In DARK
// mode it deepens to a navy/indigo field. Either way it's rich enough to give
// the frost something to refract, but tasteful — not a rainbow. The colour is
// CONTAINED to the card's field, never a full-section wash. Cool-only,
// token-driven. Six tones keep cards differentiated. Optional gentle drift.

export type AtmosphereTone =
  | "violet"
  | "cyan"
  | "indigo"
  | "azure"
  | "orchid"
  | "teal";

type Field = { base: string; layers: string };

// Light = soft pastel pooling on a near-white cool ground (light-first,
// restrained). Dark = a deeper cool field. Alphas are deliberately low so the
// field reads as premium atmosphere, not saturated colour.
const FIELD: Record<AtmosphereTone, { light: Field; dark: Field }> = {
  violet: {
    light: {
      base: `linear-gradient(155deg, ${withAlpha(visual.violet, 0.06)}, ${withAlpha(visual.indigo, 0.04)})`,
      layers:
        `radial-gradient(70% 80% at 16% 6%, ${withAlpha(visual.purple, 0.16)}, transparent 60%),` +
        `radial-gradient(60% 70% at 96% 18%, ${withAlpha(visual.cyan, 0.1)}, transparent 60%),` +
        `radial-gradient(80% 85% at 70% 110%, ${withAlpha(visual.indigo, 0.12)}, transparent 64%)`,
    },
    dark: {
      base: `linear-gradient(155deg, ${visual.violet}, ${visual.navy})`,
      layers:
        `radial-gradient(70% 80% at 16% 6%, ${withAlpha(visual.purple, 0.4)}, transparent 62%),` +
        `radial-gradient(60% 70% at 96% 18%, ${withAlpha(visual.cyan, 0.22)}, transparent 60%),` +
        `radial-gradient(82% 88% at 70% 112%, ${withAlpha(visual.indigo, 0.32)}, transparent 66%)`,
    },
  },
  cyan: {
    light: {
      base: `linear-gradient(155deg, ${withAlpha(visual.cyan, 0.06)}, ${withAlpha(visual.primary, 0.03)})`,
      layers:
        `radial-gradient(70% 80% at 14% 6%, ${withAlpha(visual.cyan, 0.16)}, transparent 60%),` +
        `radial-gradient(60% 70% at 96% 20%, ${withAlpha(visual.indigo, 0.1)}, transparent 60%),` +
        `radial-gradient(80% 85% at 66% 110%, ${withAlpha(visual.primary, 0.1)}, transparent 64%)`,
    },
    dark: {
      base: `linear-gradient(155deg, ${visual.teal}, ${visual.navy})`,
      layers:
        `radial-gradient(70% 80% at 14% 6%, ${withAlpha(visual.cyan, 0.36)}, transparent 62%),` +
        `radial-gradient(60% 70% at 96% 20%, ${withAlpha(visual.indigo, 0.26)}, transparent 60%),` +
        `radial-gradient(82% 88% at 66% 112%, ${withAlpha(visual.primary, 0.3)}, transparent 66%)`,
    },
  },
  indigo: {
    light: {
      base: `linear-gradient(155deg, ${withAlpha(visual.indigo, 0.06)}, ${withAlpha(visual.primary, 0.03)})`,
      layers:
        `radial-gradient(70% 80% at 16% 6%, ${withAlpha(visual.primary, 0.14)}, transparent 60%),` +
        `radial-gradient(60% 70% at 95% 20%, ${withAlpha(visual.cyan, 0.1)}, transparent 60%),` +
        `radial-gradient(80% 85% at 68% 110%, ${withAlpha(visual.violet, 0.12)}, transparent 64%)`,
    },
    dark: {
      base: `linear-gradient(155deg, ${visual.indigo}, ${visual.navy})`,
      layers:
        `radial-gradient(70% 80% at 16% 6%, ${withAlpha(visual.primary, 0.36)}, transparent 62%),` +
        `radial-gradient(60% 70% at 95% 20%, ${withAlpha(visual.cyan, 0.24)}, transparent 60%),` +
        `radial-gradient(82% 88% at 68% 112%, ${withAlpha(visual.violet, 0.3)}, transparent 66%)`,
    },
  },
  azure: {
    light: {
      base: `linear-gradient(155deg, ${withAlpha(visual.primary, 0.05)}, ${withAlpha(visual.cyan, 0.04)})`,
      layers:
        `radial-gradient(70% 80% at 12% 8%, ${withAlpha(visual.cyan, 0.15)}, transparent 60%),` +
        `radial-gradient(60% 70% at 96% 16%, ${withAlpha(visual.violet, 0.09)}, transparent 60%),` +
        `radial-gradient(80% 85% at 66% 110%, ${withAlpha(visual.indigo, 0.12)}, transparent 64%)`,
    },
    dark: {
      base: `linear-gradient(155deg, ${visual.primary}, ${visual.navy})`,
      layers:
        `radial-gradient(70% 78% at 12% 8%, ${withAlpha(visual.cyan, 0.34)}, transparent 62%),` +
        `radial-gradient(60% 70% at 96% 16%, ${withAlpha(visual.violet, 0.24)}, transparent 60%),` +
        `radial-gradient(82% 88% at 66% 112%, ${withAlpha(visual.indigo, 0.32)}, transparent 66%)`,
    },
  },
  orchid: {
    light: {
      base: `linear-gradient(155deg, ${withAlpha(visual.purple, 0.06)}, ${withAlpha(visual.indigo, 0.03)})`,
      layers:
        `radial-gradient(70% 80% at 18% 6%, ${withAlpha(visual.violet, 0.16)}, transparent 60%),` +
        `radial-gradient(58% 70% at 95% 22%, ${withAlpha(visual.cyan, 0.09)}, transparent 60%),` +
        `radial-gradient(82% 85% at 70% 110%, ${withAlpha(visual.primary, 0.1)}, transparent 64%)`,
    },
    dark: {
      base: `linear-gradient(155deg, ${visual.purple}, ${visual.navy})`,
      layers:
        `radial-gradient(70% 80% at 18% 6%, ${withAlpha(visual.violet, 0.4)}, transparent 62%),` +
        `radial-gradient(58% 70% at 95% 22%, ${withAlpha(visual.cyan, 0.22)}, transparent 60%),` +
        `radial-gradient(82% 88% at 70% 112%, ${withAlpha(visual.primary, 0.3)}, transparent 66%)`,
    },
  },
  teal: {
    light: {
      base: `linear-gradient(155deg, ${withAlpha(visual.teal, 0.06)}, ${withAlpha(visual.indigo, 0.03)})`,
      layers:
        `radial-gradient(70% 80% at 14% 8%, ${withAlpha(visual.cyan, 0.14)}, transparent 60%),` +
        `radial-gradient(58% 70% at 95% 18%, ${withAlpha(visual.teal, 0.11)}, transparent 60%),` +
        `radial-gradient(82% 85% at 66% 110%, ${withAlpha(visual.primary, 0.09)}, transparent 64%)`,
    },
    dark: {
      base: `linear-gradient(155deg, ${visual.teal}, ${visual.indigo})`,
      layers:
        `radial-gradient(70% 80% at 14% 8%, ${withAlpha(visual.cyan, 0.32)}, transparent 62%),` +
        `radial-gradient(58% 70% at 95% 18%, ${withAlpha(visual.teal, 0.26)}, transparent 60%),` +
        `radial-gradient(82% 88% at 66% 112%, ${withAlpha(visual.primary, 0.26)}, transparent 66%)`,
    },
  },
};

export function GlassAtmosphere({
  tone = "violet",
  animated = false,
  className,
}: {
  tone?: AtmosphereTone;
  /** Slow ambient drift on the light pooling. Off by default; reduced-motion safe. */
  animated?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const t = useTime();
  const drift = useTransform(t, (v) =>
    !animated || reduced ? 0 : Math.sin((v / 17000) * 2 * Math.PI) * 9,
  );
  const driftY = useTransform(t, (v) =>
    !animated || reduced ? 0 : Math.cos((v / 22000) * 2 * Math.PI) * 7,
  );
  const f = FIELD[tone];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-surface-white dark:bg-surface-dark-base",
        className,
      )}
    >
      {/* light field — soft pastel pooling, light-first */}
      <span className="absolute inset-0 dark:hidden" style={{ background: f.light.base }} />
      <motion.span
        className="absolute inset-[-12%] dark:hidden"
        style={{ background: f.light.layers, x: drift, y: driftY }}
      />
      {/* dark field — deeper cool */}
      <span className="absolute inset-0 hidden dark:block" style={{ background: f.dark.base }} />
      <motion.span
        className="absolute inset-[-12%] hidden dark:block"
        style={{ background: f.dark.layers, x: drift, y: driftY }}
      />
      {/* soft light orbs for dimensionality (subtle in both themes) */}
      <span
        className="absolute -left-[8%] -top-[12%] h-[55%] w-[45%] rounded-full blur-2xl"
        style={{ background: withAlpha(visual.white, 0.14) }}
      />
      <span
        className="absolute -bottom-[16%] right-[6%] h-[50%] w-[42%] rounded-full blur-2xl"
        style={{ background: withAlpha(visual.cyan, 0.12) }}
      />
      {/* top-left lit edge of the field */}
      <span
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 18% -6%, ${withAlpha(visual.white, 0.14)}, transparent 56%)`,
        }}
      />
    </div>
  );
}
