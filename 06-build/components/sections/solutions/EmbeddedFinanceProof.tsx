import { Section } from "@/components/sections/Section";
import { StatStrip } from "@/components/sections/ncore/StatStrip";

// ── Embedded Finance §7 — Platform Proof ─────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §Platform
// Proof.
//
// The four metrics — 99.99% uptime · <2s processing · 1,000+ APIs · 135+
// currencies — as the dimensional glass stat cells (the shared nCore StatStrip,
// count-up on scroll). CrosshairRails as the signature mark on this light
// section. The principal-member trust line was removed here per owner (4 June)
// — it lives in the footer / nCore page (matching BaaSProof).
//
// Stat order follows the copy file: 99.99%, <2s, 1,000+, 135+.

const COPY = {
  headline: "Infrastructure designed for scale.",
  stats: [
    { value: "99.99%", label: "Platform uptime" },
    { value: "<2s", label: "Transaction processing time" },
    { value: "1,000+", label: "APIs available" },
    { value: "135+", label: "Currencies supported" },
  ],
} as const;

export function EmbeddedFinanceProof() {
  return (
    <Section bg="soft" rails>
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <StatStrip stats={[...COPY.stats]} />
    </Section>
  );
}
