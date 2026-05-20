// ── NymCard visual engine ──────────────────────────────────────────────────
//
// Reusable visual primitives + cinematic infrastructure systems. Composed into
// nCore, Products, Solutions, Identity, Fraud, Cross-Border and Lending — never
// the locked hero or navigation.
//
// Each primitive: cool-only palette (design-system.md §3), token-driven motion
// (§9), prefers-reduced-motion aware, light + dark by construction.
//
//   Background primitives (render absolute inset-0, drop into a Section's
//   `backgrounds` slot):
//     KineticRibbon      — §1 kinetic ribbon system
//     AmbientGlow        — §4 ambient glow system
//     InfraGrid          — §5 infrastructure grid system
//     TopologyTraces     — §7 topology trace system
//     BlueprintOverlay   — §9 blueprint-style atmospheric overlay
//
//   Surface / content primitives:
//     GlassPanel         — §3 glass morphism layer system
//     ScanSweep          — §2 scan / sweep effect system (overlay)
//     SpotlightCard      — §6 product card lighting behaviour
//     TranslucentStack   — §8 layered translucency system
//
//   Presets:
//     SectionAtmosphere  — pre-composed background bundles
//
//   Shared:
//     palette / motion   — token-resolved colour + motion constants

export { KineticRibbon } from "./KineticRibbon";
export { ScanSweep } from "./ScanSweep";
export { GlassPanel } from "./GlassPanel";
export { AmbientGlow } from "./AmbientGlow";
export { InfraGrid } from "./InfraGrid";
export { SpotlightCard } from "./SpotlightCard";
export { TopologyTraces } from "./TopologyTraces";
export { TranslucentStack } from "./TranslucentStack";
export { BlueprintOverlay } from "./BlueprintOverlay";
export { SectionAtmosphere, type AtmospherePreset } from "./SectionAtmosphere";

export { visual, withAlpha, toneHex, type VisualTone } from "./palette";
export { dur, ease, scanSpline } from "./motion";
