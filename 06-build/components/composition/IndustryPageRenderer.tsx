import { IndustryPage, type IndustryPageProps } from "./IndustryPage";
import type { CrossSellItem } from "./CrossSellBanner";
import type { OutcomeChip } from "./OutcomeChips";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { iconByName } from "@/lib/sanity/icon-map";
import { fixVoice, fixDocHrefs } from "@/lib/sanity/voice-overrides";
import { industryRowVisual } from "@/components/sections/industry-uis";
import type { SanityIndustryPage } from "@/lib/sanity/types";

// ── IndustryPageRenderer ───────────────────────────────────────────────────
//
// Thin Sanity-side wrapper around the `IndustryPage` template. Transforms a
// SanityIndustryPage document into the IndustryPageProps shape (resolving
// icon-name strings into JSX) and renders.
//
// Server component — all child primitives carry their own client boundaries
// where needed.

type Props = { doc: SanityIndustryPage };

export function IndustryPageRenderer({ doc: rawDoc }: Props) {
  // Correct dead/legacy link destinations everywhere in the doc before render
  // (seed already fixed; covers live Sanity until the next reseed).
  const doc = fixDocHrefs(rawDoc);

  const outcomes = doc.outcomes.map((o) => ({
    icon: iconByName(o.iconName),
    label: o.label,
    body: fixVoice(o.body),
  })) as [OutcomeChip, OutcomeChip, OutcomeChip];

  const crossSell: [CrossSellItem, CrossSellItem] = [
    {
      leadIn: doc.crossSell[0].leadIn,
      body: doc.crossSell[0].body,
      link: doc.crossSell[0].link,
      icon: iconByName(doc.crossSell[0].iconName),
    },
    {
      leadIn: doc.crossSell[1].leadIn,
      body: doc.crossSell[1].body,
      link: doc.crossSell[1].link,
      icon: iconByName(doc.crossSell[1].iconName),
    },
  ];

  const props: IndustryPageProps = {
    hero: doc.hero,
    outcomes,
    challenge: doc.challenge,
    buildEyebrow: doc.build.eyebrow,
    // Inject each row's bespoke coded surface (keyed by slug + order); rows
    // without a registered surface fall back to the AmbientPlaceholder.
    buildRows: doc.build.rows.map((row, i) => ({
      ...row,
      visual: industryRowVisual(doc.slug, i),
    })),
    platform: doc.platform,
    developer: { ...doc.developer, body: fixVoice(doc.developer.body) },
    crossSell,
    faqHeadline: doc.faq.headline,
    faqItems: doc.faq.items.map((it) => ({ ...it, answer: fixVoice(it.answer) })),
    finalCta: { ...doc.finalCta, headline: fixVoice(doc.finalCta.headline) },
  };

  // BreadcrumbList (Home → Solutions → this page). FAQPage is emitted by the
  // <FAQ> component inside IndustryPage — do not duplicate it here. "Solutions"
  // has no index route, so it's a name-only breadcrumb level.
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions" },
    { name: doc.title, path: `/solutions/${doc.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <IndustryPage {...props} />
    </>
  );
}
