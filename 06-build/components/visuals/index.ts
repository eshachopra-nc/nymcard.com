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
//     KineticRibbon      — kinetic ribbon atmosphere (the ribbon's influence)
//     TonalDepth         — tonal atmospheric depth system
//     AmbientGlow        — ambient glow system
//     InfraGrid          — infrastructure grid system
//     TopologyTraces     — topology trace system
//     BlueprintOverlay   — blueprint-style atmospheric overlay
//
//   Full-width layout primitive:
//     RibbonStreak       — a thin, low-density diagonal slice of the hero
//                          ribbon, the kinetic accent for PageHero (§8.12)
//
//   Surface / content primitives:
//     GlassPanel         — §3 glass morphism layer system
//     ScanSweep          — §2 scan / sweep effect system (overlay)
//     SpotlightCard     — §6 product card lighting behaviour
//
//   Page-rail signature:
//     CrosshairRails     — the four corner crosshair-marker glyphs that frame
//                          a section's content rectangle (the locked page-rail
//                          signature; gradient-bridge variants rejected)
//
//   Motion:
//     SectionReveal      — editorial section-entrance motion
//
//   Icons:
//     InfraIcon          — atmospheric infrastructure icon system (11 icons)
//
//   Presets:
//     SectionAtmosphere  — pre-composed background bundles
//
//   Shared:
//     palette / motion   — token-resolved colour + motion constants

export { KineticRibbon } from "./KineticRibbon";
export { CrosshairRails } from "./CrosshairRails";
export { RibbonStreak } from "./RibbonStreak";
export { ProductHeroRibbon } from "./ProductHeroRibbon";
export { ScanSweep } from "./ScanSweep";
export { GlassPanel } from "./GlassPanel";
export { AmbientGlow } from "./AmbientGlow";
export { InfraGrid } from "./InfraGrid";
export { SpotlightCard } from "./SpotlightCard";
export { TopologyTraces } from "./TopologyTraces";
export { TonalDepth } from "./TonalDepth";
export { BlueprintOverlay } from "./BlueprintOverlay";
export { SectionReveal } from "./SectionReveal";
export {
  InfraIcon,
  iconNames,
  iconLabels,
  type IconName,
} from "./InfraIcon";
export { SectionAtmosphere, type AtmospherePreset } from "./SectionAtmosphere";
export { RibbonField, type RibbonFieldVariant } from "./RibbonField";
export {
  CardTreatment,
  CARD_TREATMENTS,
  type CardTreatmentName,
} from "./CardTreatment";
export { MigrationFlow } from "./MigrationFlow";
export {
  MigrationConsole,
  type MigrationActivity,
  type MigrationAgent,
  type MigrationCounter,
  type MigrationTrack,
} from "./MigrationConsole";

export { visual, withAlpha, toneHex, type VisualTone } from "./palette";
export { dur, ease, scanSpline } from "./motion";
