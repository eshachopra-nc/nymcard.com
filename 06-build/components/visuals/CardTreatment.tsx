import { visual, withAlpha } from "./palette";
import { RibbonField } from "./RibbonField";

// ── Card treatment ─────────────────────────────────────────────────────────
//
// The card-background treatment for the bento systems. v2 reset (Phase 1.5):
// each treatment carries its OWN chromatic identity — a static cool-gradient
// field tuned per cell — rather than the same KineticRibbon at different
// intensities. The four treatments are four distinct cells.
//
//   cyan      — cyan-led, corner-lit. The system signal / scanner mood.
//   indigo    — indigo-led, mid-wash anchor. The bridge cell.
//   violet    — violet-led, the deep-end gradient anchor. Used sparingly so
//               the row keeps a single rich moment rather than competing
//               violet zones.
//   ribbon    — the crest ribbon crop — the only treatment carrying the
//               signature ribbon artwork. One per row maximum.
//
// Renders absolute inset-0 — it fills the WHOLE card as one unified surface,
// the way the Light Glass material does. The grid cycles the library so no
// two adjacent cards read alike. Cool only — no warm tones; no rainbow.
//
// The legacy names `calm` / `ambient` / `trace` / `crest` are kept as aliases
// so the existing CARD_TREATMENTS rotation continues to work; they now map
// to the v2 chromatic palette.
//
// Server component — no motion in the chromatic variants. The `ribbon` variant
// delegates to the client-side RibbonField for its Lissajous drift.

export type CardTreatmentName =
  | "cyan"
  | "indigo"
  | "violet"
  | "ribbon"
  // legacy aliases — see ALIAS mapping below.
  | "calm"
  | "ambient"
  | "trace"
  | "crest";

// The auto-cycled rotation a grid steps through. v2 picks a deliberate sequence
// so adjacent cells differ by hue, not by intensity.
export const CARD_TREATMENTS: CardTreatmentName[] = [
  "cyan",
  "indigo",
  "violet",
  "ribbon",
];

// Legacy → v2 hue mapping. CARD_TREATMENTS used to be ["calm","trace","ambient","crest"]
// — those calls keep working, mapped to the new chromatic identities.
const ALIAS: Partial<Record<CardTreatmentName, CardTreatmentName>> = {
  calm: "cyan",
  ambient: "indigo",
  trace: "violet",
  crest: "ribbon",
};

type ChromaticName = "cyan" | "indigo" | "violet";

// Per-hue field — a static gradient composition, asymmetric, never a flat
// wash. Each composes a focal pool (the lit corner), a counter-tonal
// undercurrent (the recessive mid), and a soft white haze for material parity.
const FIELD: Record<ChromaticName, string> = {
  cyan:
    `radial-gradient(118% 88% at 90% 4%, ${withAlpha(visual.cyan, 0.32)}, transparent 64%),` +
    `radial-gradient(116% 92% at 4% 100%, ${withAlpha(visual.indigo, 0.18)}, transparent 70%),` +
    `radial-gradient(140% 70% at 50% -20%, ${withAlpha(visual.white, 0.5)}, transparent 70%)`,
  indigo:
    `radial-gradient(124% 96% at 6% 6%, ${withAlpha(visual.indigo, 0.3)}, transparent 64%),` +
    `radial-gradient(120% 92% at 96% 96%, ${withAlpha(visual.cyan, 0.16)}, transparent 70%),` +
    `radial-gradient(140% 70% at 50% -20%, ${withAlpha(visual.white, 0.45)}, transparent 70%)`,
  violet:
    `radial-gradient(122% 94% at 100% 100%, ${withAlpha(visual.violet, 0.34)}, transparent 66%),` +
    `radial-gradient(118% 92% at 0% 0%, ${withAlpha(visual.cyan, 0.14)}, transparent 70%),` +
    `radial-gradient(140% 70% at 50% -20%, ${withAlpha(visual.white, 0.42)}, transparent 70%)`,
};

const FIELD_DARK: Record<ChromaticName, string> = {
  cyan:
    `radial-gradient(118% 88% at 90% 4%, ${withAlpha(visual.cyan, 0.22)}, transparent 64%),` +
    `radial-gradient(116% 92% at 4% 100%, ${withAlpha(visual.indigo, 0.26)}, transparent 70%),` +
    `radial-gradient(140% 70% at 50% 120%, ${withAlpha(visual.navy, 0.5)}, transparent 70%)`,
  indigo:
    `radial-gradient(124% 96% at 6% 6%, ${withAlpha(visual.indigo, 0.36)}, transparent 64%),` +
    `radial-gradient(120% 92% at 96% 96%, ${withAlpha(visual.cyan, 0.14)}, transparent 70%),` +
    `radial-gradient(140% 70% at 50% 120%, ${withAlpha(visual.navy, 0.45)}, transparent 70%)`,
  violet:
    `radial-gradient(122% 94% at 100% 100%, ${withAlpha(visual.violet, 0.4)}, transparent 64%),` +
    `radial-gradient(118% 92% at 0% 0%, ${withAlpha(visual.cyan, 0.12)}, transparent 70%),` +
    `radial-gradient(140% 70% at 50% 120%, ${withAlpha(visual.navy, 0.5)}, transparent 70%)`,
};

function ChromaticField({ name }: { name: ChromaticName }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 dark:hidden"
        style={{ background: FIELD[name] }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ background: FIELD_DARK[name] }}
      />
    </div>
  );
}

export function CardTreatment({ name }: { name: CardTreatmentName }) {
  // Resolve legacy aliases so the existing rotation keeps working.
  const resolved = (ALIAS[name] ?? name) as ChromaticName | "ribbon";

  if (resolved === "ribbon") {
    return <RibbonField variant="crest" />;
  }
  return <ChromaticField name={resolved} />;
}
