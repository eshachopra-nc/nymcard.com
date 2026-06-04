import { BigFigureRow } from "@/components/sections/archetypes";

// ── Embedded Finance §7 — Platform Proof ─────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §Platform
// Proof.
//
// REBUILT (2026-06-04). Was centred glass StatStrip cells; now a BigFigureRow at
// DARK tone — the four metrics at DISPLAY scale on a deep cool field, hairline-
// separated and airy, the numbers themselves the design. This is the page's
// SECOND dark beat; it sits two sections after §4's dark StatementBand (§5 and
// §6 are light between them), so no two dark beats are adjacent. Full-bleed dark
// (no light Section wrapper) so it reads as the platform's proof-of-scale
// moment. The principal-member trust line stays removed here per owner (4 June)
// — it lives in the footer / nCore page.
//
// Figures follow the copy-file order: 99.99%, <2s, 1,000+, 135+. Real,
// defensible values only.

const COPY = {
  headline: "Infrastructure designed for scale.",
  figures: [
    { value: "99.99%", label: "Platform uptime" },
    { value: "<2s", label: "Transaction processing time" },
    { value: "1,000+", label: "APIs available" },
    { value: "135+", label: "Currencies supported" },
  ],
} as const;

export function EmbeddedFinanceProof() {
  return (
    <BigFigureRow
      tone="dark"
      figures={[...COPY.figures]}
      heading={
        // One line on desktop — no width clamp (owner, 4 June).
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      }
    />
  );
}
