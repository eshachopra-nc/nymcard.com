// The payments lifecycle as the bank runs it today — each stage a SEPARATE
// legacy system. Mirrors 02-copy/Homepage.revised.md §3 / §4 and the on-page
// FragmentationWeb + NCoreStack taxonomy (Cards → Lending → Money Movement →
// Settlement → Financial Crime → Reconciliation).
//
// COUNT-AGNOSTIC: the composition derives every panel, seam, scatter position
// and resolved stack layer from this array. Add or remove a system and the
// fragmentation field, the tangle and the converge all recompute.

export type LegacySystem = {
  /** Product layer name — the resolved nCore label. */
  name: string;
  /** The mismatched legacy-vendor label for the fragmented phase. */
  vendor: string;
  /** Mismatched version/era chip — reinforces "separate, dated systems". */
  tag: string;
  /** SVG path data for a simple glyph (24x24 viewBox), stroke-drawn. */
  glyph: string;
};

export const SYSTEMS: LegacySystem[] = [
  {
    name: "Cards",
    vendor: "Card processor",
    tag: "v3.1",
    // card outline + stripe
    glyph: "M3 6h18v12H3z M3 10h18",
  },
  {
    name: "Lending",
    vendor: "Loan servicer",
    tag: "legacy",
    // stacked coins / ledger lines
    glyph: "M4 7h16 M4 12h16 M4 17h10",
  },
  {
    name: "Money Movement",
    vendor: "Cross-border",
    tag: "vendor B",
    // arrows crossing
    glyph: "M3 9h14l-3-3 M21 15H7l3 3",
  },
  {
    name: "Settlement",
    vendor: "Settlement ledger",
    tag: "batch",
    // balance / scale
    glyph: "M12 4v15 M5 19h14 M6 9l-3 5h6z M18 9l-3 5h6z",
  },
  {
    name: "Financial Crime",
    vendor: "Fraud + AML",
    tag: "3rd party",
    // shield
    glyph: "M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z",
  },
  {
    name: "Reconciliation",
    vendor: "Recon engine",
    tag: "nightly",
    // two columns matched by a tick
    glyph: "M5 5v14 M19 5v14 M8 12l2 2 4-4",
  },
];
