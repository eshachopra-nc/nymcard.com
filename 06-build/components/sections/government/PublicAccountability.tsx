import { Section } from "@/components/sections/Section";
import {
  OversizedEditorialSplit,
  type OversizedSplitItem,
} from "@/components/sections/archetypes";

// ── Government §5 — Built for public accountability ─────────────────────────
//
// REWORKED off the icon-card feature grid (owner: stop repeating glass cards)
// onto the OversizedEditorialSplit archetype — a display-scale headline holding
// the wide column while the five reasons run as a tight hairline list on the
// narrow side. The page's scale-contrast beat so it isn't all body-scale
// sections; reads administrative and operational, not consumer. No cards. No
// eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored from 02-copy/Industry Government-Copy.md §"Built For Public
// Accountability", US-English humanized (utilisation→utilization).

const COPY = {
  headline: "Visibility built into every program.",
} as const;

const ITEMS: OversizedSplitItem[] = [
  {
    title: "Spend controls",
    body: "Configure how, where, and when funds can be used.",
  },
  {
    title: "Real-time oversight",
    body: "Monitor utilization and program performance as funds are distributed.",
  },
  {
    title: "Full auditability",
    body: "Track program activity through detailed reporting and audit trails.",
  },
  {
    title: "Multi-program management",
    body: "Operate multiple programs from the same infrastructure.",
  },
  {
    title: "Deploy your way",
    body: "Cloud, on-soil, and on-premise deployment models available on the same platform.",
  },
];

export function PublicAccountability() {
  return (
    <Section bg="white" ariaLabel="Built for public accountability">
      <OversizedEditorialSplit headline={COPY.headline} items={ITEMS} />
    </Section>
  );
}
