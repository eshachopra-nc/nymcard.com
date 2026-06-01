import type { BedTone } from "@/components/sections/product-uis";

// ── feature-visual-map ─────────────────────────────────────────────────────
//
// Maps a product page (by slug) to the handoff SVG + tonal bed for its
// FeatureShowcase UI zone, so the showcase loads a real product surface
// instead of the grey UIPlaceholder skeleton (CLAUDE.md v1.4 rule 2).
//
// Only three pages carry a FeatureShowcase (card-issuing, money-movement,
// financial-crime per the seed docs). Cool-palette SVGs only — never
// commercial-payments.svg.

type FeatureVisual = { slug: string; tone: BedTone };

const FEATURE_VISUALS: Record<string, FeatureVisual> = {
  // "Control every card and every transaction." → the card-issuing controls
  // surface on a slate bed.
  "card-issuing": { slug: "card-issuing", tone: "slate" },
  // "Route every corridor in real time." → the corridor / money-movement
  // surface on a porcelain bed.
  "money-movement": { slug: "money-movement", tone: "porcelain" },
  // "See why every decision was made." → the financial-crime decisioning
  // surface on a violet bed.
  "financial-crime": { slug: "financial-crime", tone: "violet" },
};

const FALLBACK: FeatureVisual = { slug: "cards", tone: "slate" };

/** Resolve the FeatureShowcase visual for a product page by slug. */
export function featureVisualFor(slug: string | undefined): FeatureVisual {
  if (!slug) return FALLBACK;
  return FEATURE_VISUALS[slug] ?? FALLBACK;
}
