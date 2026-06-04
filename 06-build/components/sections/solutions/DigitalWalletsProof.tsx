import { Section } from "@/components/sections/Section";
import { StatStrip } from "@/components/sections/ncore/StatStrip";

// ── Digital Wallets §6 — Platform Proof ──────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Platform
// Proof.
//
// The four metrics — 99.99% uptime · <2s processing · 1,000+ APIs · 135+
// currencies — as the dimensional glass stat cells (the shared nCore StatStrip,
// count-up on scroll). CrosshairRails as the signature mark on this light
// section, matching BaaSProof. This page's copy carries NO trust block, so —
// unlike BaaSProof — there is no PrincipalMemberTrustLine here. Light (soft).
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

export function DigitalWalletsProof() {
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
