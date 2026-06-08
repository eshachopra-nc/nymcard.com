import { Section } from "@/components/sections/Section";
import { StatStrip } from "@/components/sections/ncore/StatStrip";

// ── Digital Banking §9 — Infrastructure A Bank Can Run On ─────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.revised.md
// §"Infrastructure A Bank Can Run On".
//
// The four figures — 99.99% Platform Uptime · <2s Transaction Processing ·
// 1,000+ APIs · 135+ Supported Currencies — as the dimensional glass stat cells
// (the shared nCore StatStrip, count-up on scroll), with the two principal-
// member lines as a quiet typographic close beneath. CrosshairRails as the
// signature mark on this light section. Placed right after deploy as the trust
// crescendo. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Stat order follows the copy file: 99.99%, <2s, 1,000+, 135+.

const COPY = {
  headline: "Infrastructure a bank can run on.",
  stats: [
    { value: "99.99%", label: "Platform Uptime" },
    { value: "<2s", label: "Transaction Processing" },
    { value: "1,000+", label: "APIs" },
    { value: "135+", label: "Supported Currencies" },
  ],
  principalLines: ["Principal Member Of Visa", "Principal Member Of Mastercard"],
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

      {/* The two principal-member lines — a quiet typographic close. */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-14">
        {COPY.principalLines.map((line, i) => (
          <span key={line} className="flex items-center gap-3">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-surface-border-stronger dark:bg-surface-dark-border sm:inline-block"
              />
            )}
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary sm:text-sm">
              {line}
            </span>
          </span>
        ))}
      </div>
    </Section>
  );
}
