import { Section } from "@/components/sections/Section";
import { StatStrip } from "@/components/sections/ncore/StatStrip";

// ── Banking-as-a-Service §6 — Why nCore ──────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"Why nCore".
//
// The four metrics — 99.99% Platform Uptime · <2s Transaction Processing ·
// 1,000+ APIs · 135+ Supported Currencies — as the dimensional glass stat
// cells (the shared nCore StatStrip, count-up on scroll). CrosshairRails as the
// signature mark on this light section. Simple metrics, no heavy copy (per the
// copy's Visual Direction). The principal-member trust line was removed here per
// owner (4 June) — it lives in the footer / nCore page.
//
// Stat order follows the copy file: 99.99%, <2s, 1,000+, 135+.

const COPY = {
  headline: "Infrastructure built to scale.",
  stats: [
    { value: "99.99%", label: "Platform Uptime" },
    { value: "<2s", label: "Transaction Processing" },
    { value: "1,000+", label: "APIs" },
    { value: "135+", label: "Supported Currencies" },
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
    </Section>
  );
}
