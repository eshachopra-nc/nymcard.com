import { StatementBand } from "@/components/sections/archetypes";

// ── Fintechs §5.5 — Build once. Expand over time. ───────────────────────────
//
// The page's CONTRAST ANCHOR (variety recipe: add ONE StatementBand). A
// FULL-BLEED DARK band carrying one oversized editorial statement on a deep
// cool field — the considered dark beat that breaks the otherwise light scroll
// and reinforces the Build → Launch → Expand → Scale narrative the page sells.
// No cards, no items, no UI surface: one big idea on a dark ground. Renders
// edge-to-edge (no Section wrapper) so it genuinely bleeds.
//
// The statement is the variety recipe's specified anchor line; it restates the
// page's expansion thesis (Industry Fintechs-Copy.md §"Start With One Product.
// Add More Over Time.") in the band's own voice.

const COPY = {
  statement: "Build once. Expand over time.",
} as const;

export function BuildOnceExpand() {
  return <StatementBand statement={COPY.statement} tone="indigo" />;
}
