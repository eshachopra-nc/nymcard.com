import { CTASection } from "@/components/composition";
import { TopologyTraces } from "@/components/visuals";

// FinalCTA — the homepage closing call-to-action (CTASection §8.14). Uses the
// shared TopologyTraces backdrop so the homepage close matches every other page
// (About, Careers, industry, product) — one reusable closing component with the
// topology effect, not a bespoke ribbon overlay.
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §10.

export function FinalCTA() {
  return (
    <CTASection
      headline="Talk to our team."
      body="See how banks move off legacy and build their whole payments stack on nCore."
      primaryCta={{ label: "Talk to us", href: "/company/contact" }}
      secondaryCta={{ label: "Explore nCore", href: "/platform/ncore" }}
      backgrounds={<TopologyTraces density="medium" tone="cyan" />}
    />
  );
}
