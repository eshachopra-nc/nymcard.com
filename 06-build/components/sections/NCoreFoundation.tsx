import { Section } from "./Section";
import { SplitEditorial } from "@/components/composition/SplitEditorial";
import { NCoreStack } from "@/components/artifacts";

// nCore — The Foundation. Uses the SplitEditorial (hero) composition from the
// visual system with the NCoreStack artifact as the visual — the flat,
// precise systems diagram of the platform: engine at the base, six product
// layers stacked on it, cyan data spine through every layer.
// Copy mirrored verbatim from ../02-copy/Homepage.md §3.

const ITEMS = [
  "Data: one customer record across every product",
  "AI: decisioning, routing, and monitoring on every layer",
  "Deployment: cloud, on-soil, or on-premise",
];

export function NCoreFoundation() {
  return (
    <Section
      bg="soft"
      ariaLabel="nCore — the foundation"
      className="dark:bg-surface-dark-base"
    >
      <SplitEditorial
        scale="hero"
        eyebrow="nCore"
        eyebrowCaps={false}
        headline="One platform behind every product you run."
        body="Cards, lending, money movement, settlement, financial crime, and reconciliation — running on one platform, sharing one customer record, one ledger, and one audit trail. Most payment infrastructure is stitched together from separate vendors. nCore is built as a single system."
        items={ITEMS}
        cta={{ label: "Explore nCore", href: "#ncore" }}
        visual={<NCoreStack className="w-full max-w-[420px]" />}
      />
    </Section>
  );
}
