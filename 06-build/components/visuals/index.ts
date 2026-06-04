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
//   Hero product illustrations (right-column PageHero visuals):
//     RotatingCard       — the Card Issuing §1 hero: a 3D payment card
//                          rotating on its vertical axis, surfacing live
//                          activity and morphing debit → credit → prepaid
//
//   Page-rail signature:
//     CrosshairRails     — the four corner crosshair-marker glyphs that frame
//                          a section's content rectangle (the locked page-rail
//                          signature; gradient-bridge variants rejected)
//
//   Motion:
//     SectionReveal      — editorial section-entrance motion
//     ConnectedStepper   — §8.10 vertical gradient-node flow on a connecting
//                          spine; the canonical "what changes / sequence" beat
//                          (replaces flat bordered 3-up rows), reveal + hover
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
export { DiagonalRibbon } from "./DiagonalRibbon";
export { CrosshairRails } from "./CrosshairRails";
export { RibbonStreak } from "./RibbonStreak";
export { ProductHeroRibbon } from "./ProductHeroRibbon";
export { ScanSweep } from "./ScanSweep";
export { GlassPanel } from "./GlassPanel";
export { GlassAtmosphere, type AtmosphereTone } from "./GlassAtmosphere";
export { AmbientGlow } from "./AmbientGlow";
export { InfraGrid } from "./InfraGrid";
export { TopologyTraces } from "./TopologyTraces";
export { BlueprintOverlay } from "./BlueprintOverlay";
export { SectionReveal } from "./SectionReveal";
export { ConnectedStepper, type StepperStep } from "./ConnectedStepper";
export {
  InfraIcon,
  iconNames,
  iconLabels,
  type IconName,
} from "./InfraIcon";
export { RibbonField, type RibbonFieldVariant } from "./RibbonField";
export {
  CardTreatment,
  CARD_TREATMENTS,
  type CardTreatmentName,
} from "./CardTreatment";
export { RotatingCard } from "./RotatingCard";
export {
  MigrationConsole,
  type MigrationActivity,
  type MigrationAgent,
  type MigrationCounter,
  type MigrationTrack,
} from "./MigrationConsole";

export { visual, withAlpha, toneHex, illus, type VisualTone } from "./palette";
export { dur, ease, scanSpline } from "./motion";
