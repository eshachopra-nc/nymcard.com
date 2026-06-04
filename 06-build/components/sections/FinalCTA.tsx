import { CTASection } from "@/components/composition";
import { TopologyTraces } from "@/components/visuals";

// FinalCTA — the shared closing call-to-action (CTASection §8.14) with the
// TopologyTraces backdrop, so every page closes the same way (homepage, About,
// Careers, industry, product, use-case). Reusable: the props default to the
// homepage copy (mirrored from ../02-copy/Homepage.revised.md §10), so existing
// `<FinalCTA />` usages are unchanged; pass overrides for a page's own close.

type CTA = { label: string; href: string };

type FinalCTAProps = {
  headline?: string;
  body?: string;
  primaryCta?: CTA;
  /** Pass `null` to render a single-CTA close. */
  secondaryCta?: CTA | null;
};

export function FinalCTA({
  headline = "Talk to our team.",
  body = "See how banks move off legacy and build their whole payments stack on nCore.",
  primaryCta = { label: "Talk to us", href: "/company/contact" },
  secondaryCta = { label: "Explore nCore", href: "/platform/ncore" },
}: FinalCTAProps = {}) {
  return (
    <CTASection
      headline={headline}
      body={body}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta ?? undefined}
      backgrounds={<TopologyTraces density="medium" tone="cyan" />}
    />
  );
}
