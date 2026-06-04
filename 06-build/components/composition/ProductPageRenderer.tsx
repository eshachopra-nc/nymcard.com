import { CardGrid, type CardGridLayout, type CardGridCardType } from "./CardGrid";
import { CardProgramsBento } from "./CardProgramsBento";
import { FinancialCrimeControls } from "./FinancialCrimeControls";
import { CodeArtifact } from "./CodeArtifact";
import { CrossSellBanner, type CrossSellItem } from "./CrossSellBanner";
import { CTASection } from "./CTASection";
import { FAQ } from "./FAQ";
import { FeatureShowcase } from "./FeatureShowcase";
import { CapabilityCards } from "./CapabilityCards";
import { LendingCreditJourney } from "./LendingCreditJourney";
import { SettlementCapabilities } from "./SettlementCapabilities";
import { ReconciliationCapabilities } from "./ReconciliationCapabilities";
import { LendingWhyEmbed, LendingDecisioningViz } from "./LendingSections";
import { DeploymentSection, MigrationFlow } from "./LendingMotionSections";
import { PageHero } from "./PageHero";
import { RailCarousel } from "./RailCarousel";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/sections/Footer";
import { Section } from "@/components/sections/Section";
import {
  CardControlsDashboard,
  FinancialCrimeConsole,
  CorridorRoutingConsole,
  HandoffVisual,
  NamedSurface,
  type BedTone,
} from "@/components/sections/product-uis";

// Handoff filename for a named UI slot: `{product}-{kebab(label)}` so the owner
// can drop /public/handoff/home/{name}.svg per slot and it fills in.
const handoffName = (slug: string, label: string) =>
  `${slug}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
import { MigrationConsole, TopologyTraces } from "@/components/visuals";
import { iconByName } from "@/lib/sanity/icon-map";
import {
  Waypoints,
  Link2,
  ArrowLeftRight,
  ShieldCheck,
  Power,
  Coins,
} from "lucide-react";

// Per-card icons for the Money Movement capabilities — drives the clean glass
// cards (icon chip + heading + text, no UI placeholder). Keyed by heading.
const MONEY_MOVEMENT_ICONS = {
  "Payment orchestration": Waypoints,
  Connectivity: Link2,
  "Settlement and reconciliation": ArrowLeftRight,
  "Compliance-aware routing": ShieldCheck,
  "Corridor activation": Power,
  "FX and treasury": Coins,
};
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav } from "@/components/dev/SectionNav";
import { fixDocHrefs } from "@/lib/sanity/voice-overrides";
import { heroVisualFor } from "@/lib/sanity/hero-visual-map";
import { capabilityVisual } from "@/lib/sanity/capability-visual-map";
import { featureVisualFor } from "@/lib/sanity/feature-visual-map";
import type {
  SanityProductPage,
  SanityCapabilitySection,
} from "@/lib/sanity/types";

// ASSUMPTION: every product page is passed to ProductPageRenderer with its
// `slug` available on the doc; the capability/feature → handoff-SVG map keys off
// it. All six seed docs set slug, so this holds today.

// ── ProductPageRenderer ────────────────────────────────────────────────────
//
// The single page-rendering component every Sanity-driven product page uses.
// Each route file becomes a ~15-line async wrapper that fetches its document
// and hands it to this renderer.
//
// All sections render conditionally (optional chaining on the doc), so the
// same component works whether a page has migration / featureShowcase / etc.
// or skips them. Mirrors the layout pattern Card Issuing established.

type Props = { doc: SanityProductPage };

// Products whose §6 "Industries" grid is dropped — they sell mainly into banks,
// so a broad industries rail isn't relevant (owner direction, Jun 2026).
const NO_INDUSTRIES_GRID = new Set(["financial-crime", "settlement", "reconciliation"]);

// The 11 real /solutions/* pages. The Industries grid only renders tiles that
// point at one of these, so an orphan segment tile (e.g. "NBFIs & PSPs" with no
// page) is dropped rather than rendered as a 404.
const REAL_INDUSTRY_HREFS = new Set([
  "/solutions/commercial-banking",
  "/solutions/retail-banking",
  "/solutions/exchange-houses",
  "/solutions/fintechs",
  "/solutions/telecommunications",
  "/solutions/retail-marketplaces",
  "/solutions/healthcare",
  "/solutions/government",
]);

export function ProductPageRenderer({ doc: rawDoc }: Props) {
  // Correct dead/legacy link destinations everywhere in the doc (e.g. "/docs",
  // wrong industry slugs) before rendering. Seed docs are already fixed; this
  // covers the live Sanity copy until the next reseed.
  const doc = fixDocHrefs(rawDoc);

  const [csA, csB] = doc.crossSell;
  const crossSell: [CrossSellItem, CrossSellItem] = [
    {
      leadIn: csA.leadIn,
      body: csA.body,
      link: csA.link,
      icon: iconByName(csA.iconName),
    },
    {
      leadIn: csB.leadIn,
      body: csB.body,
      link: csB.link,
      icon: iconByName(csB.iconName),
    },
  ];

  // BreadcrumbList (Home → Products → this page). FAQPage is emitted by the
  // <FAQ> component itself (one source of truth — do not duplicate it here).
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products" }, // no /products index route — name-only level
    { name: doc.title, path: `/products/${doc.slug}` },
  ]);

  // §6 Industries cards — only the tiles that point at a real /solutions/ page
  // (orphan segments dropped). Computed up here so the section can be skipped
  // entirely when nothing survives the filter (otherwise the rail renders as a
  // lone headline + dead arrows — the empty-rail bug).
  const industryItems = (doc.industries?.items ?? [])
    .filter((item) => REAL_INDUSTRY_HREFS.has(item.link.href))
    .map((item, i) => ({
      id: `${item.eyebrow
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}-${i}`,
      eyebrow: item.eyebrow,
      copy: item.copy,
      link: item.link,
    }));

  return (
    <main>
      <JsonLd data={breadcrumbs} />

      {/* TEMP — section navigator for design review (auto-discovers every
          top-level <section> at runtime; no per-section wiring). Dev-only;
          remove with SectionNav. */}
      <SectionNav title={doc.title} />

      {/* §1 Hero — the right-column visual is resolved from a slug → component
          registry (heroVisualFor). Pages with a registered illustration render
          it; every other page falls back to PageHero's UIPlaceholder. */}
      <PageHero
        topLine={doc.hero.topLine}
        headline={doc.hero.headline}
        body={doc.hero.body}
        primaryCta={doc.hero.primaryCta}
        secondaryCta={doc.hero.secondaryCta}
        visualLabel={doc.hero.visualLabel}
        visual={heroVisualFor(doc.slug)}
        // Text-forward F-pattern across all product heroes: there's no real
        // hero image yet, so the copy leads at ~70% width rather than sitting
        // beside an empty placeholder. Re-enable a 2-col visual per page by
        // dropping `textOnly` once a real hero illustration lands.
        textOnly
      />

      {/* §2 Trust band removed from all product pages (owner direction,
          1 Jun 2026) — neither the network/cert marquee nor the trustLine text
          renders on any product page. */}

      {/* §3a Why tiles (optional — Lending uses this). Lending renders the
          approved clean modular cards (Lending.html §3); other pages keep the
          generic capability grid. */}
      {doc.whyTiles &&
        (doc.slug === "lending" ? (
          <LendingWhyEmbed
            headline={doc.whyTiles.headline}
            body={doc.whyTiles.body}
            items={doc.whyTiles.items}
          />
        ) : (
          <CapabilitySectionBlock data={doc.whyTiles} bg="soft" slug={doc.slug} />
        ))}

      {/* §3b Card programs — Card Issuing uses the asymmetric bento showcase
          (Debit + Prepaid half-tiles, Credit & installments full-width
          showpiece, each with a live-feeling UI snippet). Other pages render
          the capabilities bento.
          TODO: drive this choice from Sanity (e.g. capabilities.layout). */}
      {doc.slug === "card-issuing" ? (
        <CardProgramsBento />
      ) : doc.slug === "financial-crime" ? (
        // §3 Risk controls — five distinct capability sections as alternating
        // editorial rows (Identity, Fraud, Risk, AML & sanctions, 3D Secure),
        // each with its own coded visual. Copy baked in; not the capability bento.
        <FinancialCrimeControls />
      ) : doc.slug === "lending" && doc.capabilities ? (
        // §4 Credit journey — the approved Lending.html bento of six
        // self-contained product-UI tiles (handoff v1.0), not the generic
        // capability card grid.
        <LendingCreditJourney
          headline={doc.capabilities.headline}
          body={doc.capabilities.body}
        />
      ) : doc.slug === "settlement" && doc.capabilities ? (
        // §3 Settlement capabilities — six distinct CODED product surfaces on the
        // canonical product-illustration kit (a bento of five 1/3 cells + one
        // wide), replacing the generic CapabilityCards → NamedSurface path for
        // settlement only (light handoff SVGs / faint placeholders that washed
        // out in dark). Peer of CardProgramsBento / FinancialCrimeControls /
        // LendingCreditJourney. Copy verbatim from doc.capabilities.
        <SettlementCapabilities
          headline={doc.capabilities.headline}
          body={doc.capabilities.body}
        />
      ) : doc.slug === "reconciliation" && doc.capabilities ? (
        // §3 Reconciliation capabilities — two coded surfaces (unified cross-
        // product ledger + external two-column match), replacing the generic
        // CapabilityCards → NamedSurface path whose handoff SVGs 404'd (empty
        // "drop to fill" placeholders, found in the full-site QA). Copy verbatim.
        <ReconciliationCapabilities
          headline={doc.capabilities.headline}
          body={doc.capabilities.body}
        />
      ) : (
        doc.capabilities && (
          // Generalized capability cards — consistent with lending §4 /
          // card-issuing: eyebrow → headline → description above a NamedSurface
          // UI zone (fills on handoff). Replaces the colour-gradient card grid.
          <CapabilityCards
            slug={doc.slug}
            headline={doc.capabilities.headline}
            body={doc.capabilities.body}
            items={doc.capabilities.items}
            // Money Movement: clean glass cards with brand-gradient icon chips
            // (no UI placeholder). Other pages keep the default UI-zone cards.
            icons={
              doc.slug === "money-movement" ? MONEY_MOVEMENT_ICONS : undefined
            }
          />
        )
      )}

      {/* §4 FeatureShowcase (optional). Card Issuing carries the live,
          coded Program-Management dashboard (CardControlsDashboard — "Control
          every card and every transaction."); Financial Crime carries the live
          fraud decisioning console (FinancialCrimeConsole — "See why every
          decision was made."); every other page loads its real handoff surface
          (HandoffVisual). No eyebrow: the headline leads. */}
      {doc.featureShowcase &&
        (() => {
          const fv = featureVisualFor(doc.slug);
          return (
            <FeatureShowcase
              headline={doc.featureShowcase.headline}
              body={doc.featureShowcase.body}
              uiLabel={doc.featureShowcase.uiLabel}
              ui={
                doc.slug === "card-issuing" ? (
                  <CardControlsDashboard />
                ) : doc.slug === "financial-crime" ? (
                  <FinancialCrimeConsole />
                ) : doc.slug === "money-movement" ? (
                  <CorridorRoutingConsole />
                ) : (
                  <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
                    <NamedSurface
                      name={handoffName(doc.slug, "feature")}
                      label={doc.featureShowcase.uiLabel}
                      tone={fv.tone}
                    />
                  </div>
                )
              }
            />
          );
        })()}

      {/* §5 Configuration — CodeArtifact on dark */}
      {doc.configuration && (
        <section className="dark relative isolate overflow-hidden bg-surface-dark-base">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-[96px] sm:px-6 lg:px-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col lg:col-span-5">
                {/* No eyebrow — headline leads (CLAUDE.md v1.5 no-eyebrow rule). */}
                <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-on-brand sm:text-4xl">
                  {doc.configuration.headline}
                </h2>
                <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
                  {doc.configuration.body}
                </p>
                {doc.configuration.docsLink && (
                  <a
                    href={doc.configuration.docsLink.href}
                    {...(/^https?:\/\//i.test(doc.configuration.docsLink.href)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-accent-cyan transition-colors hover:text-accent-cyan/80"
                  >
                    {doc.configuration.docsLink.label} →
                  </a>
                )}
              </div>
              <div className="lg:col-span-7">
                <CodeArtifact
                  tabs={doc.configuration.tabs}
                  viz={doc.slug === "lending" ? <LendingDecisioningViz /> : undefined}
                  companion={
                    // Lending drops the in-panel companion block (the
                    // "Decisioning you can defend" copy lives in the left
                    // column); Financial Crime drops it too (owner direction,
                    // 1 Jun 2026 — the "Versioned, auditable…" block is removed).
                    !["lending", "financial-crime"].includes(doc.slug) &&
                    doc.configuration.companion
                      ? {
                          heading: doc.configuration.companion.heading,
                          body: doc.configuration.companion.body,
                          link: doc.configuration.companion.link
                            ? {
                                label: doc.configuration.companion.link.label,
                                href: doc.configuration.companion.link.href,
                              }
                            : undefined,
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* §6 Industries — RailCarousel sparse, light. Dropped for the
          bank-focused products (NO_INDUSTRIES_GRID); elsewhere only tiles that
          point at a real industry page render (orphan segments filtered out). */}
      {doc.industries && !NO_INDUSTRIES_GRID.has(doc.slug) && industryItems.length > 0 && (
        <RailCarousel
          variant="sparse"
          background="light"
          // No section eyebrow — headline leads (CLAUDE.md v1.5). Per-card
          // industry labels stay: they're real content, not a scaffolding label.
          headline={doc.industries.headline}
          items={industryItems}
          ariaLabel="Industries"
        />
      )}

      {/* §7 Deployment — three dark cards with the approved line-art diagrams
          (Lending.html §7). The single reusable treatment used on every product
          page that carries a deployment section. */}
      {doc.deployment && (
        <DeploymentSection
          headline={doc.deployment.headline}
          body={doc.deployment.body}
          items={doc.deployment.items}
        />
      )}

      {/* §8 Migration — the agentic-AI 5-stage flow with the left→right
          scanner (Lending.html §8). Used on lending + card-issuing; other
          pages keep the MigrationConsole. */}
      {doc.migration && (doc.slug === "lending" || doc.slug === "card-issuing") ? (
        <MigrationFlow
          headline={doc.migration.headline}
          body={doc.migration.body}
        />
      ) : doc.migration ? (
        <Section bg="soft">
          <div className="mb-12 max-w-2xl">
            {/* No eyebrow — headline leads (CLAUDE.md v1.5 no-eyebrow rule). */}
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
              {doc.migration.headline}
            </h2>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
              {doc.migration.body}
            </p>
          </div>
          <MigrationConsole
            fromSystem={doc.migration.fromSystem}
            toSystem={doc.migration.toSystem}
            agents={doc.migration.agents}
            activity={doc.migration.activity}
            counters={doc.migration.counters}
            tracks={doc.migration.tracks}
            throughput={doc.migration.throughput}
            eta={doc.migration.eta}
            drift={doc.migration.drift}
          />
          {doc.migration.statusLine && (
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
              {doc.migration.statusLine}
            </p>
          )}
        </Section>
      ) : null}

      {/* §9 FAQ */}
      {doc.faq && (
        <FAQ
          headline={doc.faq.headline}
          items={doc.faq.items}
          background="white"
        />
      )}

      {/* §10 Final CTA + cross-sell */}
      <CTASection
        headline={doc.finalCta.headline}
        body={doc.finalCta.body}
        primaryCta={doc.finalCta.primaryCta}
        secondaryCta={doc.finalCta.secondaryCta}
        backgrounds={<TopologyTraces density="medium" tone="cyan" />}
      />
      {/* Cross-sell — clearly separated from the closing CTA above it: a top
          hairline + generous top padding + a quiet label, so it reads as its
          own "keep exploring" band rather than being attached to the CTA. */}
      <section data-nav-label="Keep exploring" className="border-t border-surface-border-subtle bg-surface-soft pb-[96px] pt-16 lg:pt-24 dark:border-surface-dark-border dark:bg-surface-dark-base">
        <p className="mx-auto mb-6 w-full max-w-[1200px] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted sm:px-6 lg:px-20 dark:text-text-dark-muted">
          Keep exploring
        </p>
        <CrossSellBanner items={crossSell} />
      </section>

      <Footer />
    </main>
  );
}

// ── CapabilitySectionBlock ─────────────────────────────────────────────────
// Renders one capabilities-style block. Handles the layout + cardMode
// variants (bento+with-UI is the default; Lending uses cols-2+no-UI for its
// Why tiles; Reconciliation uses cols-2+with-UI for its scope tiles).
//
// `with-UI` cells now load a real Claude Design handoff surface (HandoffVisual)
// mapped per cell by capability-visual-map — never the grey UIPlaceholder
// skeleton the homepage already eliminated (CLAUDE.md v1.4 rule 2). No section
// eyebrow: the headline leads (CLAUDE.md v1.5). Per-cell `eyebrow` labels stay
// — they're the capability name (real content), not a scaffolding label.

function CapabilitySectionBlock({
  data,
  bg,
  slug,
}: {
  data: SanityCapabilitySection;
  bg: "white" | "soft";
  slug: string;
}) {
  const layout = (data.layout ?? "bento") as CardGridLayout;
  const cardMode = (data.cardMode ?? "with-UI") as CardGridCardType;
  const isCardIssuing = slug === "card-issuing";

  // Pre-resolve each cell's handoff surface + tonal bed, threading the previous
  // cell's tone so the §8.8 "never two adjacent on the same bed" rule holds.
  let prevTone: BedTone | undefined;
  const visuals = data.items.map((item, i) => {
    const v = capabilityVisual(
      slug,
      i,
      { eyebrow: item.eyebrow, heading: item.heading, uiLabel: item.uiLabel },
      prevTone,
    );
    prevTone = v.tone;
    return v;
  });

  return (
    <Section bg={bg}>
      <div className="mb-12 max-w-2xl">
        {/* No eyebrow — headline leads (CLAUDE.md v1.5 no-eyebrow rule). */}
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {data.headline}
        </h2>
        {data.body && (
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            {data.body}
          </p>
        )}
      </div>
      <CardGrid
        layout={layout}
        card={cardMode}
        // The `treatment` surface — colour-cycled cool-gradient cells — keeps
        // this section visually DISTINCT from the glass bento / glass moments
        // elsewhere (variety of treatment, one voice), and avoids the
        // ProductCard ScanSweep ("awful scanner"). Same for Card Issuing.
        surface="treatment"
        items={data.items.map((item, i) => ({
          eyebrow: item.eyebrow,
          heading: item.heading,
          description: item.description,
          span: item.span,
          tall: item.tall,
          // Cool-gradient hues only — exclude the "ribbon" treatment so the
          // kinetic ribbon stays the hero's signature and isn't repeated across
          // every fourth capability cell ("ribbon throughout").
          treatment: (["cyan", "indigo", "violet"] as const)[i % 3],
          ui:
            cardMode !== "with-UI"
              ? undefined
              : isCardIssuing ? (
                  <HandoffVisual
                    slug={visuals[i].slug}
                    tone={visuals[i].tone}
                    pad="default"
                    className="h-full w-full"
                  />
                ) : (
                  <NamedSurface
                    name={handoffName(slug, item.eyebrow ?? item.heading)}
                    label={item.eyebrow ?? item.heading}
                    framed={false}
                  />
                ),
        }))}
      />
    </Section>
  );
}
