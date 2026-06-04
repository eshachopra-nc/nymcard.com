import { Section } from "@/components/sections/Section";
import { StatStrip } from "@/components/sections/ncore/StatStrip";
import { PrincipalMemberTrustLine } from "@/components/composition/TrustBar";

// ── Banking as a Service §6 — Platform Proof ─────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md §Platform
// Proof.
//
// The four metrics — 99.99% uptime · <2s processing · 1,000+ APIs · 135+
// currencies — as the dimensional glass stat cells (the shared nCore StatStrip,
// count-up on scroll), followed by the canonical logo-backed trust line: the
// verbatim "Principal Member of Visa · Mastercard · PCI DSS Level 1 · ISO 27001"
// rendered via PrincipalMemberTrustLine (real Visa / Mastercard / PCI / ISO
// marks). CrosshairRails as the signature mark on this light section.
//
// Stat order follows the copy file: 99.99%, <2s, 1,000+, 135+.

const COPY = {
  headline: "Infrastructure a bank can build on.",
  stats: [
    { value: "99.99%", label: "Platform uptime" },
    { value: "<2s", label: "Transaction processing time" },
    { value: "1,000+", label: "APIs available" },
    { value: "135+", label: "Currencies supported" },
  ],
} as const;

export function BaaSProof() {
  return (
    <Section bg="soft" rails>
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <StatStrip stats={[...COPY.stats]} />

      {/* Trust line — the canonical logo-backed principal-member + cert line. */}
      <div className="mt-10 flex justify-center font-body text-sm text-text-secondary dark:text-text-dark-secondary sm:mt-12">
        <PrincipalMemberTrustLine />
      </div>
    </Section>
  );
}
