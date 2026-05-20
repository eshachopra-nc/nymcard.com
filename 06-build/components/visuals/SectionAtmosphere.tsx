import type { ReactNode } from "react";
import { AmbientGlow } from "./AmbientGlow";
import { BlueprintOverlay } from "./BlueprintOverlay";
import { InfraGrid } from "./InfraGrid";
import { KineticRibbon } from "./KineticRibbon";
import { TopologyTraces } from "./TopologyTraces";

// ── Atmosphere presets ─────────────────────────────────────────────────────
//
// Opinionated, pre-composed background bundles built from the low-level
// visual primitives. Drop one straight into a Section's `backgrounds` slot:
//
//   <Section backgrounds={<SectionAtmosphere preset="technical" />}>
//
// Each preset is tuned to a section's job in the homepage progression
// (design-system.md §9.8 motion budget) and stays inside the restraint rules
// — at most three layers, at most one kinetic/ambient motion per preset:
//
//   calm       — dotted grid + one drifting glow. Quiet mid-page sections.
//   technical  — line grid + blueprint frame + glow. nCore / architecture.
//   signal     — dotted grid + topology pulses + glow. Orchestration moments.
//   kinetic    — kinetic ribbon + glow. Products / Solutions energy.
//   peak       — peak ribbon + bright glow. Final CTA, hero-adjacent moments.
//
// For full control, compose the primitives directly instead of using a preset.

export type AtmospherePreset =
  | "calm"
  | "technical"
  | "signal"
  | "kinetic"
  | "peak";

const PRESETS: Record<AtmospherePreset, ReactNode> = {
  calm: (
    <>
      <InfraGrid variant="dots" fade="radial" />
      <AmbientGlow placement="top-right" tone="cyan" size="lg" intensity="subtle" />
    </>
  ),
  technical: (
    <>
      <InfraGrid variant="lines" fade="top" />
      <BlueprintOverlay corners ticks />
      <AmbientGlow
        placement="bottom-left"
        tone="indigo"
        size="md"
        intensity="subtle"
        drift={false}
      />
    </>
  ),
  signal: (
    <>
      <InfraGrid variant="dots" fade="radial" />
      <TopologyTraces density="medium" />
      <AmbientGlow
        placement="center"
        tone="cyan"
        size="lg"
        intensity="subtle"
        drift={false}
      />
    </>
  ),
  kinetic: (
    <>
      <KineticRibbon intensity="ambient" />
      <AmbientGlow
        placement="top-right"
        tone="purple"
        size="md"
        intensity="subtle"
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
