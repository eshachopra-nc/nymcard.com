import { Section } from "@/components/sections/Section";
import { StatBand, type Stat } from "@/components/sections/archetypes";

// ── Digital Wallets §6 — Platform Proof ──────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Platform
// Proof.
//
// REBUILT (2026-06-04). Was the shared glass StatStrip cells — reading card-ish,
// and the sibling Embedded Finance page already carries a dark BigFigureRow for
// the same four metrics. This page uses the LIGHT StatBand instead: the four
// figures as gradient-anchored numbers separated by vertical hairlines, airy and
// non-card — the quiet light proof-of-scale beat (distinct from the sibling's
// full-bleed dark figures). CrosshairRails as the signature mark. This page's
// copy carries NO trust block, so there is no PrincipalMemberTrustLine. Soft.
//
// Figures follow the copy file order: 99.99%, <2s, 1,000+, 135+. Real,
// defensible values only.

const COPY = {
  headline: "Infrastructure designed for scale.",
  stats: [
    { value: "99.99%", label: "Platform uptime" },
    { value: "<2s", label: "Transaction processing time" },
    { value: "1,000+", label: "APIs available" },
    { value: "135+", label: "Currencies supported" },
  ] satisfies Stat[],
} as const;

export function DigitalWalletsProof() {
  return (
    <Section bg="soft" rails>
      <div className="mb-12 max-w-2xl sm:mb-14">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <StatBand stats={[...COPY.stats]} />
    </Section>
  );
}
