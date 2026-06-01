import { CardGrid, type CardGridLayout, type CardGridCardType } from "./CardGrid";
import { CardProgramsBento } from "./CardProgramsBento";
import { CodeArtifact } from "./CodeArtifact";
import { CrossSellBanner, type CrossSellItem } from "./CrossSellBanner";
import { CTASection } from "./CTASection";
import { FAQ } from "./FAQ";
import { FeatureShowcase } from "./FeatureShowcase";
import { CapabilityCards } from "./CapabilityCards";
import { LendingCreditJourney } from "./LendingCreditJourney";
import { LendingWhyEmbed, LendingDecisioningViz } from "./LendingSections";
import { DeploymentSection, MigrationFlow } from "./LendingMotionSections";
import { PageHero } from "./PageHero";
import { RailCarousel } from "./RailCarousel";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/sections/Footer";
import { Section } from "@/components/sections/Section";
import { TrustBar, PrincipalMemberTrustLine } from "./TrustBar";
import {
  CardControlsDashboard,
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
import { fixHref } from "@/lib/sanity/voice-overrides";
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

export function ProductPageRenderer({ doc }: Props) {
  // Repoint the legacy "/docs" CTA href to the real developer docs host (the
  // seed is already updated; this covers the live Sanity copy pre-reseed).
  const fixCta = <T extends { href: string } | undefined>(c: T): T =>
    c ? ({ ...c, href: fixHref(c.href) } as T) : c;

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

  return (
    <main>
      {/* §1 Hero — the right-column visual is resolved from a slug → component
          registry (heroVisualFor). Pages with a registered illustration render
          it; every other page falls back to PageHero's UIPlaceholder. */}
      <PageHero
        topLine={doc.hero.topLine}
        headline={doc.hero.headline}
        body={doc.hero.body}
        primaryCta={doc.hero.primaryCta}
        secondaryCta={fixCta(doc.hero.secondaryCta)}
        visualLabel={doc.hero.visualLabel}
        visual={heroVisualFor(doc.slug)}
        // Text-forward F-pattern across all product heroes: there's no real
        // hero image yet, so the copy leads at ~70% width rather than sitting
        // beside an empty placeholder. Re-enable a 2-col visual per page by
        // dropping `textOnly` once a real hero illustration lands.
        textOnly
      />

      {/* §2 Trust band — the network/certification line on the SAME soft
          surface as the hero, so it reads as a quiet continuation, not a stray
          white stripe between sections. */}
      <TrustBar logos={[]} trustLine={<PrincipalMemberTrustLine />} background="soft" />
      {doc.trustLine && (
        <div className="bg-surface-white py-4 text-center dark:bg-surface-dark-base">
          <p className="mx-auto max-w-3xl px-4 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {doc.trustLine}
          </p>
        </div>
      )}

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
      ) : doc.slug === "lending" && doc.capabilities ? (
        // §4 Credit journey — the approved Lending.html bento of six
        // self-contained product-UI tiles (handoff v1.0), not the generic
        // capability card grid.
        <LendingCreditJourney
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
          />
        )
      )}

      {/* §4 FeatureShowcase (optional). Card Issuing carries the live,
          coded Program-Management dashboard (CardControlsDashboard — "Control
          every card and every transaction."); every other page loads its real
          handoff surface (HandoffVisual). No eyebrow: the headline leads. */}
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
                    href={fixHref(doc.configuration.docsLink.href)}
                    {...(/^https?:\/\//i.test(fixHref(doc.configuration.docsLink.href))
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
                    // "Decisioning you can defend" copy lives in the left column).
                    doc.slug !== "lending" && doc.configuration.companion
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

      {/* §6 Industries — RailCarousel sparse, light */}
      {doc.industries && (
        <RailCarousel
          variant="sparse"
          background="light"
          // No section eyebrow — headline leads (CLAUDE.md v1.5). Per-card
          // industry labels stay: they're real content, not a scaffolding label.
          headline={doc.industries.headline}
          items={doc.industries.items.map((item, i) => ({
            id: `${item.eyebrow
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}-${i}`,
            eyebrow: item.eyebrow,
            copy: item.copy,
            link: item.link,
          }))}
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
        secondaryCta={fixCta(doc.finalCta.secondaryCta)}
        backgrounds={<TopologyTraces density="medium" tone="cyan" />}
      />
      {/* Cross-sell — clearly separated from the closing CTA above it: a top
          hairline + generous top padding + a quiet label, so it reads as its
          own "keep exploring" band rather than being attached to the CTA. */}
      <section className="border-t border-surface-border-subtle bg-surface-soft pb-[96px] pt-16 lg:pt-24 dark:border-surface-dark-border dark:bg-surface-dark-base">
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
