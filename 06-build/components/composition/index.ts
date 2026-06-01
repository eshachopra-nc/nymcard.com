// ── NymCard composition systems ────────────────────────────────────────────
//
// The bridge between the atmosphere engine (components/visuals/*) and the real
// website UI: how layouts, cards and product sections are composed. Each
// primitive carries editorial spacing and integrated atmosphere, takes its
// copy as props, and is reusable across the NymCard site. One coherent
// system — no parallel versions of similar cards.
//
//   Grid:
//     CardGrid                 — the single card-grid for the whole site
//                                (layout × card-type × surface). Replaces the
//                                six overlapping grids that grew here.
//
//   Layout systems:
//     FeatureCard              — large asymmetric bento card / hero spotlight
//     ProductSpotlight         — text block + embedded UI zone
//     InfraDiagramFrame        — infrastructure storytelling container (nCore)
//     SplitEditorial           — text-left / visual-right editorial layout
//     UIContainer              — embedded product-UI container (depth / dissolve)
//
//   Section templates (design-system.md §8.12–8.22 — the shared page sections):
//     PageHero                 — §8.12 the restrained product/solution hero
//     FeatureShowcase          — §8.13 two-column header over one large UI
//     CTASection               — §8.14 the centred closing call-to-action
//     FAQ                      — §8.15 divider accordion + FAQPage JSON-LD
//     CrossSellBanner          — §8.16 wide 2-up cross-link banners
//     CodeArtifact             — §8.17 on-system code / JSON / config artifact
//                                (page-arc Section 6 — API / configuration).
//                                Language tabs, line numbers, restrained syntax
//                                highlight, optional companion (heading + body
//                                + tertiary link). Dark default; light variant.
//     RailCarousel             — §8.18 props-driven full-bleed snap-scroll rail
//                                (page-arc Section 7 — Industries; also the
//                                generalised home of the homepage UseCases rail).
//                                Two card-density variants: `rich` (UI + heading
//                                + body + bullets + link) and `sparse` (eyebrow
//                                + one line + link). Light and dark surfaces.
//     OutcomeChips             — §8.19 the row of 3 outcome chips beneath an
//                                industry-page hero (icon + bold label + one
//                                sentence). Buyer-side outcomes, not capabilities.
//     TextImageRow             — §8.20 the lighter copy ↔ visual row used in
//                                the industry-page "What you can build" section;
//                                alternates text-left / text-right per row.
//     PlatformChecklist        — §8.21 the "Built for X" Platform section —
//                                heading + body + 4–6 bullet checklist + optional
//                                trust-chip strip.
//     DeveloperBlock           — §8.22 the slim mid-page developer call —
//                                heading + one-sentence body + tertiary
//                                "Read the docs →" link. Smaller than §8.14.
//     ScaleStatsRibbon         — §8.23 the proof-of-scale dark moment — count-up
//                                stats over the kinetic ribbon idling at ambient.
//                                Always dark; the second visible home for the
//                                signature ribbon outside the hero.
//     IntegrationsDiagram      — §8.24 the Stripe-architecture moment — a
//                                central nCore hub with radial integration
//                                nodes connected by lines that carry data-flow
//                                pulses.
//     TrustBar                 — §8.25 the marquee strip of client / network /
//                                certification logos with an optional trust-line.
//                                Promoted from sections/ to a composition
//                                primitive in Phase 1.
//     UIPlaceholder            — neutral on-system stand-in for a real UI
//
//   Card systems (the surfaces CardGrid composes):
//     ProductCard              — product card: heading / copy / animated UI
//     DenseCapabilityCard      — dense enterprise capability card
//     FloatingOperationalPanel — elevated glass operational surface
//
// Archived (kept on disk, no longer exported) — the v1.7 visual-system
// consolidation collapsed five grids into CardGrid and retired EnterpriseGrid:
// ProductGrid, BentoGrid, SymmetricBentoGrid, GlassProductGrid,
// SymmetricProductGrid, EnterpriseGrid.

export {
  CardGrid,
  type CardGridItem,
  type CardGridLayout,
  type CardGridCardType,
  type CardGridSurface,
} from "./CardGrid";
export { SplitEditorial } from "./SplitEditorial";
export { UIContainer } from "./UIContainer";
export { ProductCard } from "./ProductCard";
export { FloatingOperationalPanel } from "./FloatingOperationalPanel";
export { AbstractMark, Eyebrow } from "./atoms";

export { UIPlaceholder } from "./UIPlaceholder";
export { PageHero } from "./PageHero";
export { FeatureShowcase } from "./FeatureShowcase";
export { CTASection } from "./CTASection";
// Editorial body renderer for Sanity PortableText (blog + newsroom).
export { PortableTextBody } from "./PortableTextBody";
// Editorial article-header (blog + newsroom). Two modes — type-led (no
// image) and image+text — that activate by the presence of `heroImage`.
// `KindChip` is the shared mono uppercase chip reused by listing cards.
export { ArticleCover, KindChip } from "./ArticleCover";
export { FAQ, type FAQItem } from "./FAQ";
export { CrossSellBanner, type CrossSellItem } from "./CrossSellBanner";
export {
  CodeArtifact,
  type CodeArtifactProps,
  type CodeArtifactLanguage,
  type CodeArtifactTab,
  type CodeArtifactCompanion,
} from "./CodeArtifact";
export {
  RailCarousel,
  type RailCarouselProps,
  type RailCarouselItem,
  type RailCarouselRichItem,
  type RailCarouselSparseItem,
  type RailCarouselVariant,
} from "./RailCarousel";
export { OutcomeChips, type OutcomeChip } from "./OutcomeChips";
export { TextImageRow } from "./TextImageRow";
export { PlatformChecklist } from "./PlatformChecklist";
export { DeveloperBlock } from "./DeveloperBlock";
export {
  IndustryPage,
  type IndustryPageProps,
  type IndustryBuildRow,
} from "./IndustryPage";
export { ProductPageRenderer } from "./ProductPageRenderer";
export { IndustryPageRenderer } from "./IndustryPageRenderer";

export {
  TrustBar,
  PrincipalMemberTrustLine,
  type TrustBarProps,
} from "./TrustBar";
