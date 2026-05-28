"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "./motion";
import { visual, withAlpha } from "./palette";

// ── Environmental atmosphere ───────────────────────────────────────────────
//
// The environmental effect CAUSED BY the ribbon — never the ribbon itself.
// There is no ribbon anatomy here: no strands, streaks, wave forms or
// silhouettes. It is the lighting, directional energy and atmospheric
// diffusion the ribbon casts into a section — the way a Stripe card inherits
// a system's lighting without containing its hero motifs.
//
// Layers, all soft fields — never objects:
//   • base wash         — the themed environmental field (white haze + pale
//                         blue on light; midnight navy + blue-black haze on dark)
//   • directional       — a broad diagonal pressure haze; invisible energy
//     pressure            moving through the space, emanating from `focus`
//   • energy pockets    — faint, asymmetric cyan / indigo / violet density
//                         zones, heavily diffused so they read as denser
//                         atmosphere, never as blobs
//   • bloom             — a soft volumetric glow, lit from within, drifting
//   • grain             — material, for cinematic depth
//
// `intensity` is not just brightness — each is its own state. `calm` is a
// settled, recessive environment: its energy runs cool and deep (indigo /
// navy-blue), fully dissolved into the field, with no focal bloom and motion
// slowed almost to stillness. `ambient` is present and gently alive, cyan-led
// with a legible bloom. `peak` is the energised moment.
// `focus` repositions the directional pressure, the pockets and the bloom, so
// different sections read as different environmental states. Cool only; dark
// mode stays deep and restrained, never neon. prefers-reduced-motion freezes
// drift.

type Intensity = "calm" | "ambient" | "peak";
type Focus = "top-right" | "left" | "bottom-right";

// Each intensity is a distinct state, not a single dimmer. `opacity` is the
// energy level; `blur` scales the diffusion; `drift` scales the motion period
// (higher = slower); `amp` scales the motion amplitude (lower = stiller);
// `bloom` multiplies the focal bloom (0 removes it); `spread` enlarges the
// energy pockets so they dissolve into the field; `deep` swaps the energy from
// cyan-led to indigo / navy-led — a cooler, more recessive temperature.
//
// v2 reset (Phase 1.5): every intensity is pulled further apart so the three
// states read as three states, not a gradient. `calm` is closer to silence,
// `ambient` is the new default speaking volume (quieter than v1), and `peak`
// holds the energised moment.
const INTENSITY: Record<
  Intensity,
  {
    opacity: number;
    blur: number;
    drift: number;
    amp: number;
    bloom: number;
    spread: number;
    deep: boolean;
  }
> = {
  // calm — near-silence: deeply dissolved, indigo-led, motion almost frozen.
  // Reads as a quiet, recessive field; never the focal moment of a section.
  calm: { opacity: 0.4, blur: 1.9, drift: 3.0, amp: 0.26, bloom: 0, spread: 1.55, deep: true },
  // ambient — the new default speaking volume. The opacity stays close to v1
  // so the cyan/indigo pockets carry through, but the bloom is dialled back
  // so the focal pool no longer shouts under copy.
  ambient: { opacity: 0.95, blur: 1.05, drift: 1.15, amp: 0.85, bloom: 0.5, spread: 1.05, deep: false },
  // peak — the energised moment. Brighter than ambient ever was, so the step
  // up from ambient → peak reads as a deliberate climb.
  peak: { opacity: 1.65, blur: 0.92, drift: 0.92, amp: 1, bloom: 1.45, spread: 1, deep: false },
};

const clamp = (v: number) => Math.min(v, 0.92);

type FocusConfig = {
  origin: string; // directional pressure origin
  cyan: string; // cyan energy pocket
  indigo: string; // indigo depth zone
  violet: string; // violet diffusion zone
  bloom: { left: string; top: string };
};

// Three environmental states — each an asymmetric arrangement of the energy.
const FOCUS: Record<Focus, FocusConfig> = {
  "top-right": {
    origin: "90% -14%",
    cyan: "84% 12%",
    indigo: "12% 86%",
    violet: "54% 52%",
    bloom: { left: "48%", top: "2%" },
  },
  left: {
    origin: "-12% 36%",
    cyan: "8% 34%",
    indigo: "86% 80%",
    violet: "58% 16%",
    bloom: { left: "0%", top: "38%" },
  },
  "bottom-right": {
    origin: "100% 112%",
    cyan: "82% 86%",
    indigo: "16% 14%",
    violet: "44% 58%",
    bloom: { left: "56%", top: "60%" },
  },
};

export function KineticRibbon({
  intensity = "ambient",
  focus = "top-right",
  className,
}: {
  intensity?: Intensity;
  focus?: Focus;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const cfg = INTENSITY[intensity];
  const f = FOCUS[focus];
  const washOpacity = Math.min(cfg.opacity, 1);

  // Motion amplitude — `amp` stills calm almost to a freeze; ambient / peak
  // keep the full drift.
  const driftKeys = (pcts: number[]) =>
    pcts.map((v) => `${(v * cfg.amp).toFixed(2)}%`);
  const scaleKeys = (deltas: number[]) => deltas.map((d) => 1 + d * cfg.amp);

  // Base environmental field — themed, asymmetric.
  const lightWash =
    `radial-gradient(130% 82% at 80% 2%, ${withAlpha(visual.cyan, 0.07)}, transparent 56%),` +
    `radial-gradient(120% 84% at 12% 98%, ${withAlpha(visual.primary, 0.05)}, transparent 60%),` +
    `radial-gradient(120% 56% at 46% -10%, ${withAlpha(visual.white, 0.36)}, transparent 60%)`;
  const darkWash =
    `radial-gradient(130% 86% at 80% 2%, ${withAlpha(visual.primary, 0.26)}, transparent 60%),` +
    `radial-gradient(120% 88% at 12% 98%, ${withAlpha(visual.indigo, 0.17)}, transparent 64%),` +
    `radial-gradient(120% 70% at 44% 116%, ${withAlpha(visual.navy, 0.45)}, transparent 60%)`;

  // Energy temperature — calm runs cool and deep (indigo / navy-led); ambient
  // and peak run cyan-led. Every tone here is from the cool-only palette.
  const energy = cfg.deep
    ? { lead: visual.indigo, mid: visual.primary, trail: visual.indigo }
    : { lead: visual.cyan, mid: visual.indigo, trail: visual.purple };

  // Directional pressure — a broad diagonal haze from the focus origin.
  // Alpha scales with intensity so calm whispers, ambient speaks, peak carries.
  const intAlpha = Math.min(1.2, cfg.opacity);
  const directional = `radial-gradient(135% 120% at ${f.origin}, ${withAlpha(
    energy.lead,
    0.24 * intAlpha,
  )}, ${withAlpha(energy.mid, 0.12 * intAlpha)} 38%, transparent 70%)`;

  // Localised energy pockets — faint, asymmetric tonal density zones. `spread`
  // enlarges them for calm so they dissolve into the field rather than reading
  // as legible zones.
  const sp = cfg.spread;
  const pockets =
    `radial-gradient(${46 * sp}% ${56 * sp}% at ${f.cyan}, ${withAlpha(energy.lead, 0.22 * intAlpha)}, transparent 70%),` +
    `radial-gradient(${52 * sp}% ${60 * sp}% at ${f.indigo}, ${withAlpha(energy.mid, 0.18 * intAlpha)} , transparent 72%),` +
    `radial-gradient(${40 * sp}% ${48 * sp}% at ${f.violet}, ${withAlpha(energy.trail, 0.14 * intAlpha)}, transparent 74%)`;

  const bloom = `radial-gradient(circle, ${withAlpha(
    visual.cyan,
    0.4,
  )} 0%, ${withAlpha(visual.cyan, 0.12)} 36%, transparent 72%)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {/* Base environmental field — themed. */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{ background: lightWash, opacity: washOpacity }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ background: darkWash, opacity: washOpacity }}
      />

      {/* Directional pressure haze — invisible energy moving through the space. */}
      <motion.div
        className="absolute -inset-[28%] mix-blend-normal dark:mix-blend-screen"
        style={{
          background: directional,
          filter: `blur(${58 * cfg.blur}px)`,
          opacity: clamp(0.55 * cfg.opacity),
        }}
        animate={
          reduced
            ? undefined
            : {
                x: driftKeys([0, 4, 0, -3, 0]),
                y: driftKeys([0, -3, 0, 4, 0]),
                scale: scaleKeys([0, 0.05, 0.02, 0.06, 0]),
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 52 * cfg.drift, ease: ease.inOut, repeat: Infinity }
        }
      />

      {/* Localised energy pockets — diffuse tonal density, never blobs. */}
      <div
        className="absolute -inset-[12%] mix-blend-normal dark:mix-blend-screen"
        style={{
          background: pockets,
          filter: `blur(${46 * cfg.blur}px)`,
          opacity: clamp(0.6 * cfg.opacity),
        }}
      />

      {/* Volumetric bloom — lit from within, slowly drifting. Calm has none:
          its energy stays dissolved, with no legible focal point. */}
      {cfg.bloom > 0 && (
        <motion.div
          className="absolute h-[56%] w-[56%] mix-blend-normal dark:mix-blend-screen"
          style={{
            left: f.bloom.left,
            top: f.bloom.top,
            background: bloom,
            filter: `blur(${62 * cfg.blur}px)`,
            opacity: clamp(0.16 * cfg.opacity * cfg.bloom),
          }}
          animate={
            reduced
              ? undefined
              : { x: ["0%", "11%", "-5%", "0%"], y: ["0%", "-8%", "7%", "0%"] }
          }
          transition={
            reduced
              ? undefined
              : { duration: 38 * cfg.drift, ease: ease.inOut, repeat: Infinity }
          }
        />
      )}

    </div>
  );
}
