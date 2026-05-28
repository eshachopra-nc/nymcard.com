import { CTASection } from "@/components/composition";
import { TopologyTraces } from "@/components/visuals";

// FinalCTA — the homepage closing call-to-action. Uses the design-system
// CTASection primitive (§8.14) so the homepage and every page section page
// share one canonical CTA pattern. The backgrounds slot carries topology
// traces beneath the ambient glow — without them the centred CTA falls flat.
//
// Copy mirrored verbatim from ../02-copy/Homepage.md §6.

export function FinalCTA() {
  return (
    <CTASection
      headline="Ready to launch?"
      body="Launch on infrastructure built to scale."
      primaryCta={{ label: "Talk to us", href: "#contact" }}
      backgrounds={<TopologyTraces density="medium" tone="cyan" />}
    />
  );
}
