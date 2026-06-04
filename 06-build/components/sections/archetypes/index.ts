// ── Section-archetype variety kit (design-system.md §8.26) ──────────────────
//
// A set of genuinely DISTINCT, reusable section-LAYOUT archetypes so content
// pages can be composed with variety instead of resolving every section to the
// same luminous glass-card grid. These are STRUCTURAL alternatives — not
// recoloured cards — so no two sections of a page need share a treatment.
//
// All archetypes: tokens only, cool palette (navy + cyan lead; violet is an
// object accent only, never a field/CTA), light-first restraint, light AND
// dark, motion = static at rest + reveal-on-scroll (StaggerList, whileInView
// once) + restrained CSS hover, reduced-motion safe. Server components except
// where an ambient field needs the client (BridgeBand composes one).
//
// The luminous product-illustration card (components/visuals/product-
// illustration) stays in the toolbox for the ONE marquee product-UI slot per
// page (e.g. AlternatingRows' per-row visual). Most sections use the NON-card
// archetypes below.
//
//   EditorialSplit      — headline + lede (sticky left) ↔ a vertical
//                         hairline-separated list (right). For "Why choose X"
//                         5-item sections. No cards.
//   ProcessRail         — numbered vertical steps threaded on a single spine;
//                         optional left header column. For "how it works" /
//                         delivery / launch sequences.
//   FeatureMatrix       — compact label + one-liner rows on a hairline grid
//                         (1 or 2 columns). The reference-table treatment.
//   StatBand            — a horizontal row of 3–4 gradient figures separated by
//                         vertical hairlines. The light proof-of-scale beat.
//   BridgeBand          — the designed "Explore nCore" hand-off: a contained
//                         panel on the cool atmosphere field, headline + link +
//                         a quiet inline node row of the layers it bridges to.
//                         NO heavy platform diagram.
//   BorderedListField   — a bordered list on a blueprint field with crosshair
//                         corners. The "specification sheet" treatment.
//   AlternatingRows     — full-width copy ↔ visual rows that alternate side;
//                         wraps TextImageRow. The ONE per-row home for a
//                         luminous product-illustration card.
//
// CONTRAST devices (added 2026-06-04 — the kit was missing high-contrast
// archetypes, so content pages read as one uniform light scroll of card grids;
// owner verdict on /solutions/embedded-finance: "the same treatment in every
// section, just a bunch of cards"). These exist to break that:
//
//   StatementBand           — the EDITORIAL-BAND family head: ONE oversized
//                             statement (display scale) + a CLEAN supporting
//                             treatment, never a card grid. surface="dark" is
//                             the FULL-BLEED always-dark contrast anchor;
//                             surface="light" is a light editorial band on the
//                             section surface. THREE supporting shapes via
//                             `support`: items-row (optional links), numbered
//                             (no spine), two-col (statement+body ↔ list). A
//                             whole page can compose from it with varied
//                             surface + shape and still read as one family.
//   BigFigureRow            — OVERSIZED numeric proof figures (display scale),
//                             hairline-separated, airy; light OR dark ground.
//                             The scale-up of StatBand.
//   OversizedEditorialSplit — a DISPLAY-scale headline on the wide side ↔ a
//                             tight hairline list on the narrow side. The
//                             scale-contrast sibling of EditorialSplit.
//   HorizontalRow           — a horizontal scroll/rail of typographic panels —
//                             the explicit alternative to a card grid for a set
//                             of peers (industries / use-cases). Reads sideways.
//
// SCROLLYTELLING (added 2026-06-04 — the flagship "how it works" beat):
//
//   StickyScroll            — a PINNED visual column ↔ a copy column that scrolls
//                             through N steps; the pinned visual cross-fades to
//                             the active step (IntersectionObserver, no scroll
//                             hijacking). prefers-reduced-motion / no-JS / mobile
//                             → a plain stacked list (each step + its own visual
//                             inline). The page's signature multi-step moment.
//                             First applied: /platform/ncore §4–6 foundation.
//
// Shared motion primitive: StaggerList (Reveal.tsx) — every archetype's list
// reveals through it, so the kit shares one restrained beat. (StickyScroll owns
// its own observer-driven cross-fade — it is the one scrollytelling exception.)

export { StaggerList } from "./Reveal";
export { EditorialSplit, type EditorialSplitItem } from "./EditorialSplit";
export { ProcessRail, type ProcessStep } from "./ProcessRail";
export { FeatureMatrix, type FeatureMatrixRow } from "./FeatureMatrix";
export { StatBand, type Stat } from "./StatBand";
export { BridgeBand } from "./BridgeBand";
export { BorderedListField, type BorderedListItem } from "./BorderedListField";
export { AlternatingRows, type AlternatingRow } from "./AlternatingRows";
export { StatementBand, type StatementItem } from "./StatementBand";
export { BigFigureRow, type BigFigure } from "./BigFigureRow";
export {
  OversizedEditorialSplit,
  type OversizedSplitItem,
} from "./OversizedEditorialSplit";
export { HorizontalRow, type HorizontalItem } from "./HorizontalRow";
export { StickyScroll, type StickyScrollStep } from "./StickyScroll";
