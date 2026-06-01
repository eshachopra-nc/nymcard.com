import { Section } from "@/components/sections/Section";
import { StatStrip } from "./StatStrip";

// ── nCore §3 Stats ──────────────────────────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → STATS.
// Values owner-confirmed (1 June 2026): 1,000+ APIs · 99.99% uptime ·
// <2s processing · 135+ currencies.
//
// CrosshairRails as the signature mark on this light section.

const COPY = {
  frame: "What runs on one platform looks like this.",
  stats: [
    { value: "1,000+", label: "APIs available" },
    { value: "99.99%", label: "Platform uptime" },
    { value: "<2s", label: "Transaction processing time" },
    { value: "135+", label: "Currencies supported" },
  ],
} as const;

export function NCoreStats() {
  return (
    <Section bg="soft" rails>
      <StatStrip frame={COPY.frame} stats={[...COPY.stats]} />
    </Section>
  );
}
