import type { ReactNode } from "react";
import { AmbientGlow } from "./AmbientGlow";
import { BlueprintOverlay } from "./BlueprintOverlay";
import { KineticRibbon } from "./KineticRibbon";
import { TopologyTraces } from "./TopologyTraces";

// ── Atmosphere presets ─────────────────────────────────────────────────────
//
// Pre-composed background bundles. Drop one into a Section's `backgrounds`
// slot:
//
//   <Section backgrounds={<SectionAtmosphere preset="technical" />}>
//
// v2 reset (Phase 1.5): each preset is paired with the new KineticRibbon
// intensities (`calm` near-silence, `ambient` quieter default, `peak`
// energised). The presets carry the same five identities, but the
// composition between intensity, glow placement and tone makes each read
// as its own state — never a single dimmer.
//
//   calm       — a single quiet cyan moment over near-silent atmosphere.
//                Background sections, supporting copy. The recessive default.
//   technical  — an indigo depth zone on the calm field + a blueprint frame.
//                For documentation / API surfaces; reads architectural.
//   signal     — cyan + violet poles on ambient atmosphere + a topology
//                undercurrent. The "system is alive" middle state.
//   kinetic    — a single stronger cyan moment over ambient atmosphere.
//                Products / Solutions energy — present without competing.
//   peak       — a cyan core + a violet counterweight over peak atmosphere.
//                The richest event; one per page maximum.
//
// Cool only — cyan, indigo, restrained violet. No warm tones, no rainbow. The
// colour moments are static zones; the atmosphere variant carries the motion.

export type AtmospherePreset =
  | "calm"
  | "technical"
  | "signal"
  | "kinetic"
  | "peak";

const PRESETS: Record<AtmospherePreset, ReactNode> = {
  calm: (
    <>
      <KineticRibbon intensity="calm" />
      <AmbientGlow
        placement="top-right"
        tone="cyan"
        size="md"
        intensity="subtle"
        drift={false}
      />
    </>
  ),
  technical: (
    <>
      <KineticRibbon intensity="calm" />
      <AmbientGlow
        placement="bottom-left"
        tone="indigo"
        size="lg"
        intensity="subtle"
        drift={false}
      />
      <BlueprintOverlay corners ticks />
    </>
  ),
  signal: (
    <>
      <KineticRibbon intensity="ambient" />
      <AmbientGlow
        placement="top-right"
        tone="cyan"
        size="md"
        intensity="subtle"
        drift={false}
      />
      <AmbientGlow
        placement="bottom-left"
        tone="violet"
        size="md"
        intensity="subtle"
        drift={false}
      />
      <TopologyTraces density="medium" />
    </>
  ),
  kinetic: (
    <>
      <KineticRibbon intensity="ambient" />
      <AmbientGlow
        placement="top-right"
        tone="cyan"
        size="lg"
        intensity="standard"
        drift={false}
      />
    </>
  ),
  peak: (
    <>
      <KineticRibbon intensity="peak" />
      <AmbientGlow
        placement="center"
        tone="cyan"
        size="lg"
        intensity="standard"
        drift={false}
      />
      <AmbientGlow
        placement="bottom-left"
        tone="violet"
        size="md"
        intensity="subtle"
        drift={false}
      />
    </>
  ),
};

export function SectionAtmosphere({
  preset,
  className,
}: {
  preset: AtmospherePreset;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {PRESETS[preset]}
    </div>
  );
}
