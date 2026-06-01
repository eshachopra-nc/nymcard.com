import type { BedTone } from "@/components/sections/product-uis";

// ── capability-visual-map ──────────────────────────────────────────────────
//
// Maps a product-page capability / feature cell to a real Claude Design handoff
// SVG (the product surface) + a cool tonal bed, so CapabilitySectionBlock and
// FeatureShowcase render `HandoffVisual` instead of the grey `UIPlaceholder`
// skeleton (the homewpage already eliminated those — CLAUDE.md v1.4 rule 2).
//
// The map is keyword-driven: each cell's eyebrow / heading / uiLabel is matched
// against an ordered rule list, first hit wins. A per-cell index then picks the
// tonal bed from a cool rotation, and an adjacency guard rotates the bed one
// step whenever two consecutive cells would land on the same tone (the §8.8
// "never two adjacent on the same tonal bed" rule).
//
// Hard constraints:
//   - Cool-palette SVGs only. `commercial-payments.svg` is NEVER referenced
//     (it carries a warm Amazon logo + invoice — palette violation).
//   - When no keyword matches, we fall back to a sensible per-product default
//     rather than a grey placeholder.
//
// Available cool handoff SVGs (under /public/handoff/):
//   acs-3ds, card-issuing, cards, embedded-lending, financial-crime,
//   fraud-monitoring, identity, money-movement, reconciliation,
//   risk-management, stablecoin-settlement.

// The cool tonal rotation (HandoffVisual BedTone). Ordered so a straight walk
// alternates warm-free hues with good contrast between neighbours.
const TONE_ROTATION: BedTone[] = [
  "slate",
  "cyan",
  "indigo",
  "violet",
  "porcelain",
  "mist",
];

type Rule = { test: RegExp; slug: string };

// Ordered keyword → handoff-slug rules. Earlier rules win. Phrasing drawn from
// the actual seed copy (scripts/docs/*.ts) so each cell lands on the surface
// that depicts it.
const RULES: Rule[] = [
  // Fraud / risk / crime
  { test: /\bfraud\b/i, slug: "fraud-monitoring" },
  { test: /\brisk\b/i, slug: "risk-management" },
  { test: /\b(3d\s*secure|3ds|acs|step-?up|authentication)\b/i, slug: "acs-3ds" },
  { test: /\b(identity|kyc|kyb|onboard)/i, slug: "identity" },
  { test: /\b(signal engines?|nine engines?|aml|sanctions|typolog|screening|monitoring)\b/i, slug: "financial-crime" },
  // Lending / credit
  { test: /\b(card-linked credit|revolving|bnpl|installment|repayment|collections|decisioning|origination|disbursement|underwriting|credit)\b/i, slug: "embedded-lending" },
  // Settlement / stablecoin
  { test: /\b(stablecoin|settle|settlement|corridor liquidity|treasury|liquidity|24\/7|always-?on)\b/i, slug: "stablecoin-settlement" },
  // Money movement / routing / FX / rails
  { test: /\b(routing|route|rail|corridor|fx|cross-?border|orchestrat|connectivity|networks?|payment)\b/i, slug: "money-movement" },
  // Reconciliation / matching / ledger
  { test: /\b(reconcil|matching|match|ledger|exception)\b/i, slug: "reconciliation" },
  // Cards / programs
  { test: /\b(debit|prepaid|card program|cards?|controls?|limits?|freeze)\b/i, slug: "cards" },
  { test: /\b(configure|program)\b/i, slug: "card-issuing" },
];

// Per-product default surface when no keyword rule matches the cell text.
const PRODUCT_DEFAULT: Record<string, string> = {
  "card-issuing": "card-issuing",
  cards: "cards",
  lending: "embedded-lending",
  settlement: "stablecoin-settlement",
  "money-movement": "money-movement",
  "financial-crime": "financial-crime",
  reconciliation: "reconciliation",
};

function slugFor(text: string, productSlug: string): string {
  for (const rule of RULES) {
    if (rule.test.test(text)) return rule.slug;
  }
  return PRODUCT_DEFAULT[productSlug] ?? "cards";
}

export type CapabilityVisual = { slug: string; tone: BedTone };

/**
 * Resolve a handoff SVG + tonal bed for one capability/feature cell.
 *
 * @param productSlug the product page slug (drives the no-match fallback)
 * @param index       the cell's position in its section (drives the tone)
 * @param parts       the cell's text fields (eyebrow / heading / uiLabel)
 * @param prevTone    the tone assigned to the previous cell — used to enforce
 *                    the "never two adjacent on the same bed" rule.
 */
export function capabilityVisual(
  productSlug: string,
  index: number,
  parts: { eyebrow?: string; heading?: string; uiLabel?: string },
  prevTone?: BedTone,
): CapabilityVisual {
  const text = [parts.eyebrow, parts.heading, parts.uiLabel]
    .filter(Boolean)
    .join(" ");
  const slug = slugFor(text, productSlug);

  let tone = TONE_ROTATION[index % TONE_ROTATION.length];
  if (prevTone && tone === prevTone) {
    tone = TONE_ROTATION[(index + 1) % TONE_ROTATION.length];
  }
  return { slug, tone };
}
