import { Eyebrow } from "./atoms";
import { CardGrid, type CardGridLayout, type CardGridCardType } from "./CardGrid";
import { CodeArtifact } from "./CodeArtifact";
import { CrossSellBanner, type CrossSellItem } from "./CrossSellBanner";
import { CTASection } from "./CTASection";
import { FAQ } from "./FAQ";
import { FeatureShowcase } from "./FeatureShowcase";
import { PageHero } from "./PageHero";
import { RailCarousel } from "./RailCarousel";
import { UIPlaceholder } from "./UIPlaceholder";
import { Footer } from "@/components/sections/Footer";
import { Section } from "@/components/sections/Section";
import { TrustBar, PrincipalMemberTrustLine } from "./TrustBar";
import { MigrationConsole, TopologyTraces } from "@/components/visuals";
import { iconByName } from "@/lib/sanity/icon-map";
import type {
  SanityProductPage,
  SanityCapabilitySection,
} from "@/lib/sanity/types";

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
      {/* §1 Hero */}
      <PageHero
        topLine={doc.hero.topLine}
        headline={doc.hero.headline}
        body={doc.hero.body}
        primaryCta={doc.hero.primaryCta}
        secondaryCta={doc.hero.secondaryCta}
        visualLabel={doc.hero.visualLabel}
      />

      {/* §2 Trust band — real network/certification line (no placeholder
          marquee until real partner logos land) + optional CMS trust line. */}
      <TrustBar logos={[]} trustLine={<PrincipalMemberTrustLine />} />
      {doc.trustLine && (
        <div className="bg-surface-white py-4 text-center dark:bg-surface-dark-base">
          <p className="mx-auto max-w-3xl px-4 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {doc.trustLine}
          </p>
        </div>
      )}

      {/* §3a Why tiles (optional — Lending uses this) */}
      {doc.whyTiles && <CapabilitySectionBlock data={doc.whyTiles} bg="soft" />}

      {/* §3b Main capabilities bento */}
      {doc.capabilities && (
        <CapabilitySectionBlock data={doc.capabilities} bg="white" />
      )}

      {/* §4 FeatureShowcase (optional) */}
      {doc.featureShowcase && (
        <FeatureShowcase
          eyebrow={doc.featureShowcase.eyebrow}
          headline={doc.featureShowcase.headline}
          body={doc.featureShowcase.body}
          uiLabel={doc.featureShowcase.uiLabel}
        />
      )}

      {/* §5 Configuration — CodeArtifact on dark */}
      {doc.configuration && (
        <section className="dark relative isolate overflow-hidden bg-surface-dark-base">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-[96px] sm:px-6 lg:px-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col lg:col-span-5">
                {doc.configuration.eyebrow && (
                  <Eyebrow>{doc.configuration.eyebrow}</Eyebrow>
                )}
                <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-on-brand sm:text-4xl">
                  {doc.configuration.headline}
                </h2>
                <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
                  {doc.configuration.body}
                </p>
                {doc.configuration.docsLink && (
                  <a
                    href={doc.configuration.docsLink.href}
                    className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-accent-cyan transition-colors hover:text-accent-cyan/80"
                  >
                    {doc.configuration.docsLink.label} →
                  </a>
                )}
              </div>
              <div className="lg:col-span-7">
                <CodeArtifact
                  tabs={doc.configuration.tabs}
                  companion={
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

      {/* §6 Industries — RailCarousel sparse, light */}
      {doc.industries && (
        <RailCarousel
          variant="sparse"
          background="light"
          eyebrow={doc.industries.eyebrow ?? "Industries"}
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

      {/* §7 Deployment — three equal cards on dark */}
      {doc.deployment && (
        <section className="dark relative bg-surface-dark-base py-20 sm:py-28 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
            <div className="mb-12 max-w-2xl">
              {doc.deployment.eyebrow && (
                <Eyebrow>{doc.deployment.eyebrow}</Eyebrow>
              )}
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-on-brand sm:text-4xl">
                {doc.deployment.headline}
              </h2>
              {doc.deployment.body && (
                <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
                  {doc.deployment.body}
                </p>
              )}
            </div>
            <CardGrid
              layout="cols-3"
              card="no-UI"
              surface="treatment"
              items={doc.deployment.items.map((item) => ({
                eyebrow: item.eyebrow,
                heading: item.heading,
                description: item.description,
              }))}
            />
          </div>
        </section>
      )}

      {/* §8 Migration — Command Center (optional) */}
      {doc.migration && (
        <Section bg="soft">
          <div className="mb-12 max-w-2xl">
            {doc.migration.eyebrow && (
              <Eyebrow>{doc.migration.eyebrow}</Eyebrow>
            )}
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
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
      )}

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
      <section className="bg-surface-soft pb-[96px] dark:bg-surface-dark-base">
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

function CapabilitySectionBlock({
  data,
  bg,
}: {
  data: SanityCapabilitySection;
  bg: "white" | "soft";
}) {
  const layout = (data.layout ?? "bento") as CardGridLayout;
  const cardMode = (data.cardMode ?? "with-UI") as CardGridCardType;
  return (
    <Section bg={bg}>
      <div className="mb-12 max-w-2xl">
        {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
        <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
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
        surface="treatment"
        items={data.items.map((item) => ({
          eyebrow: item.eyebrow,
          heading: item.heading,
          description: item.description,
          span: item.span,
          tall: item.tall,
          ui:
            cardMode === "with-UI" ? (
              <UIPlaceholder
                label={item.uiLabel ?? "product UI"}
                scale={item.tall ? "wide" : "compact"}
              />
            ) : undefined,
        }))}
      />
    </Section>
  );
}
