import { Section } from "@/components/sections/Section";
import { StatStrip } from "./StatStrip";

// ── nCore §2 Platform Proof ──────────────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §2.
// Stats: 1,000+ APIs · 99.99% uptime · <2s processing · 135+ currencies.
// Supporting line: "Principal Member of Visa · Principal Member of Mastercard"
// — rendered with the theme-reactive Visa wordmark (visa-full.svg on light /
// visa-white.svg on dark) and the Mastercard symbol mark (mastercard-symbol.svg)
// inline, the same treatment used elsewhere on the site. The verbatim words are
// preserved as the visible text; the logos sit alongside each scheme name.
//
// CrosshairRails as the signature mark on this light section.

const COPY = {
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
      <StatStrip stats={[...COPY.stats]} />

      {/* Supporting line — "Principal Member of Visa · Principal Member of
          Mastercard", with the theme-reactive Visa wordmark + Mastercard
          symbol inline. */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-body text-sm text-text-secondary sm:mt-12 dark:text-text-dark-secondary">
        <span className="inline-flex items-center gap-2">
          Principal Member of
          {/* Visa — navy wordmark on light, white on dark. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- brand logo SVG */}
          <img
            src="/logos/visa-full.svg"
            alt="Visa"
            className="inline-block h-[18px] w-auto align-middle dark:hidden"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- brand logo SVG */}
          <img
            src="/logos/visa-white.svg"
            alt=""
            aria-hidden="true"
            className="hidden h-[18px] w-auto align-middle dark:inline-block"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span aria-hidden="true" className="text-text-muted dark:text-text-dark-muted">
          ·
        </span>
        <span className="inline-flex items-center gap-2">
          Principal Member of
          {/* Mastercard — symbol-only mark (the full lockup blurs at this size). */}
          {/* eslint-disable-next-line @next/next/no-img-element -- brand logo SVG */}
          <img
            src="/logos/mastercard-symbol.svg"
            alt="Mastercard"
            className="inline-block h-6 w-auto align-middle"
            loading="lazy"
            decoding="async"
          />
        </span>
      </div>
    </Section>
  );
}
