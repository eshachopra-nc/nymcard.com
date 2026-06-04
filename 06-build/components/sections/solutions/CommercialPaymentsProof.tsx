import { Section } from "@/components/sections/Section";
import { StatStrip } from "@/components/sections/ncore/StatStrip";

// ── Commercial Payments §7 — Platform Proof ──────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Platform
// Proof.
//
// The four metrics — 99.99% uptime · <2s processing · 1,000+ APIs · 135+
// currencies — as the dimensional glass stat cells (the shared nCore StatStrip,
// count-up on scroll). The principal-member trust line was REMOVED here (4 June)
// per owner — the "Principal Member of…" line is being dropped from use-case
// pages (matching BaaSProof / EmbeddedFinanceProof); it lives in the footer /
// nCore page. Headline + StatStrip only. CrosshairRails as the signature mark on
// this light section. White, after the §6 soft glass beat and before the soft
// CTA.
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

export function CommercialPaymentsProof() {
  return (
    <Section bg="white" rails>
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <StatStrip stats={[...COPY.stats]} />
    </Section>
  );
}
