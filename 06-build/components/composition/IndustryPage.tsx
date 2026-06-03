import type { ReactNode } from "react";
import {
  CTASection,
  CrossSellBanner,
  type CrossSellItem,
  DeveloperBlock,
  Eyebrow,
  FAQ,
  type FAQItem,
  OutcomeChips,
  type OutcomeChip,
  PageHero,
  PlatformChecklist,
  TextImageRow,
} from ".";
import { Footer } from "@/components/sections/Footer";
import { TopologyTraces } from "@/components/visuals";

// ── IndustryPage ───────────────────────────────────────────────────────────
//
// The page-level template every /solutions/* route renders. Composes the
// shared section primitives (PageHero, OutcomeChips, TextImageRow, PlatformChecklist,
// DeveloperBlock, CrossSellBanner, FAQ, CTASection) in the locked industry
// page-arc order. Per-industry pages become data files that pass their copy
// through — no layout duplication across 11 routes.
//
// Section rhythm (light theme; dark theme collapses all surface tones onto
// `surface-dark-base` per the project's dark token system):
//
//   1.  PageHero               — light surface (PageHero is light-only)
//   2.  OutcomeChips           — white      (just under hero, attached feel)
//   4.  Challenge / Solution   — soft       (rhythm break)
//   5.  What you can build     — white      (4 alternating TextImage rows)
//   6.  PayKit callout (opt)   — soft       (single CrossSellBanner)
//   7.  Platform               — soft       (checklist on dense surface)
//   8.  Developer              — white      (slim editorial)
//   9.  Cross-sells            — soft       (two banners)
//   10. FAQ                    — white      (divider accordion)
//   11. CTASection             — soft       (with topology backdrop)
//
// Every primitive in this composition is already audited for responsive +
// dark-mode compatibility, so the assembled page inherits that by default.
//
// Server component — no client interaction at this layer; nested primitives
// (CrossSellBanner, FAQ, MigrationConsole, etc.) carry their own client
// boundaries.

type CTA = { label: string; href: string };

/** One row in §4 "What you can build". Orientation is set by the template
 *  (alternating per index), so the call site only supplies copy + visual. */
export type IndustryBuildRow = {
  eyebrow?: string;
  headline: string;
  body: string;
  link?: { label: string; href: string };
  visualLabel?: string;
  visual?: ReactNode;
};

export type IndustryPageProps = {
  hero: {
    topLine?: string;
    headline: string;
    body: string;
    primaryCta: CTA;
    secondaryCta?: CTA;
    visualLabel?: string;
    visual?: ReactNode;
  };
  /** Exactly 3 outcome chips, just under the hero. */
  outcomes: readonly [OutcomeChip, OutcomeChip, OutcomeChip];
  challenge: { challenge: string; solution: string };
  /** §4 eyebrow — defaults to "What you can build". */
  buildEyebrow?: string;
  /** §4 alternating rows — typically 3 or 4 per page. */
  buildRows: readonly IndustryBuildRow[];
  platform: {
    eyebrow?: string;
    headline: string;
    body?: string;
    items: readonly string[];
    chips?: readonly string[];
  };
  developer: {
    eyebrow?: string;
    headline: string;
    body: string;
    link: { label: string; href: string };
  };
  /** §8 two-up cross-sells to NymCard products. */
  crossSell: readonly [CrossSellItem, CrossSellItem];
  faqHeadline?: string;
  faqItems: readonly FAQItem[];
  finalCta: {
    headline: string;
    body: string;
    primaryCta: CTA;
    secondaryCta?: CTA;
  };
};

export function IndustryPage(props: IndustryPageProps) {
  const {
    hero,
    outcomes,
    challenge,
    buildEyebrow = "What you can build",
    buildRows,
    platform,
    developer,
    crossSell,
    faqHeadline,
    faqItems,
    finalCta,
  } = props;

  return (
    <main>
      {/* §1 Hero — text-forward when no approved visual is wired (matches
          product pages); flips to a 2-column hero the moment a `hero.visual`
          is provided. */}
      <PageHero
        topLine={hero.topLine}
        headline={hero.headline}
        body={hero.body}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        visualLabel={hero.visualLabel}
        visual={hero.visual}
        textOnly={!hero.visual}
      />

      {/* §2 Outcome chips — sits close under the hero. (The trust band that
          previously sat here was removed from every Solutions page per owner,
          2026-06-03.) */}
      <div className="bg-surface-white py-16 dark:bg-surface-dark-base sm:py-20 lg:py-24">
        <OutcomeChips items={[...outcomes] as [OutcomeChip, OutcomeChip, OutcomeChip]} />
      </div>

      {/* §3 Challenge / Solution — two short paragraphs, no section headline. */}
      <section className="bg-surface-soft py-20 dark:bg-surface-dark-base sm:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-20">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted dark:text-text-dark-secondary">
              The challenge
            </span>
            <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-text-primary dark:text-text-on-brand sm:text-xl">
              {challenge.challenge}
            </p>
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-cyan">
              The solution
            </span>
            <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-text-primary dark:text-text-on-brand sm:text-xl">
              {challenge.solution}
            </p>
          </div>
        </div>
      </section>

      {/* §4 What you can build — eyebrow + alternating TextImage rows. */}
      <section className="bg-surface-white py-20 dark:bg-surface-dark-base sm:py-24 lg:py-28">
        <div className="mx-auto mb-14 w-full max-w-[1200px] px-4 sm:mb-16 sm:px-6 lg:px-20">
          <Eyebrow>{buildEyebrow}</Eyebrow>
        </div>
        <div className="flex flex-col gap-20 sm:gap-24 lg:gap-28">
          {buildRows.map((row, i) => (
            <TextImageRow
              key={row.headline}
              eyebrow={row.eyebrow}
              headline={row.headline}
              body={row.body}
              link={row.link}
              visualLabel={row.visualLabel}
              visual={row.visual}
              orientation={i % 2 === 0 ? "text-left" : "text-right"}
            />
          ))}
        </div>
      </section>

      {/* §6 Platform — heading + body + 4–6 checklist items. */}
      <section className="bg-surface-soft py-20 dark:bg-surface-dark-base sm:py-24 lg:py-28">
        <PlatformChecklist
          eyebrow={platform.eyebrow ?? "Platform"}
          headline={platform.headline}
          body={platform.body}
          items={[...platform.items]}
          chips={platform.chips ? [...platform.chips] : undefined}
        />
      </section>

      {/* §7 Developer — slim editorial call, never competes with the final CTA. */}
      <DeveloperBlock
        eyebrow={developer.eyebrow ?? "Developer"}
        headline={developer.headline}
        body={developer.body}
        link={developer.link}
        background="white"
      />

      {/* §8 Cross-sells — two-up banners to NymCard products. */}
      <section className="bg-surface-soft py-12 dark:bg-surface-dark-base sm:py-16">
        <CrossSellBanner items={[...crossSell] as [CrossSellItem, CrossSellItem]} />
      </section>

      {/* §9 FAQ — emits FAQPage JSON-LD for AEO citation. */}
      <FAQ
        headline={faqHeadline ?? "Common questions."}
        items={[...faqItems]}
        background="white"
      />

      {/* §10 Final CTA — centred closing, topology backdrop. */}
      <CTASection
        headline={finalCta.headline}
        body={finalCta.body}
        primaryCta={finalCta.primaryCta}
        secondaryCta={finalCta.secondaryCta}
        backgrounds={<TopologyTraces density="medium" tone="cyan" />}
      />

      <Footer />
    </main>
  );
}
