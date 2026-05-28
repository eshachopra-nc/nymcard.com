import { IndustryPage, type IndustryPageProps } from "./IndustryPage";
import type { CrossSellItem } from "./CrossSellBanner";
import type { OutcomeChip } from "./OutcomeChips";
import { iconByName } from "@/lib/sanity/icon-map";
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

export function IndustryPageRenderer({ doc }: Props) {
  const outcomes = doc.outcomes.map((o) => ({
    icon: iconByName(o.iconName),
    label: o.label,
    body: o.body,
  })) as [OutcomeChip, OutcomeChip, OutcomeChip];

  const payKit: CrossSellItem | undefined = doc.payKit
    ? {
        leadIn: doc.payKit.leadIn,
        body: doc.payKit.body,
        link: doc.payKit.link,
        icon: iconByName(doc.payKit.iconName),
      }
    : undefined;

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
    buildRows: doc.build.rows,
    payKit,
    platform: doc.platform,
    developer: doc.developer,
    crossSell,
    faqHeadline: doc.faq.headline,
    faqItems: doc.faq.items,
    finalCta: doc.finalCta,
  };

  return <IndustryPage {...props} />;
}
