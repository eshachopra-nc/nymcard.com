import { Section } from "@/components/sections/Section";
import { PrincipalMemberTrustLine } from "@/components/composition/TrustBar";

// ── Network & proof (Homepage §7) — NEW ─────────────────────────────────────
//
// A slim de-risking band — the network credibility a bank needs to switch off
// legacy. Promotes the chips formerly buried in the nCore card to their own
// beat. Calm/soft treatment, ~one screen: NO heavy glass, NO kinetic ribbon —
// it pairs with Deployment (§8) as the "bank de-risk cluster", so both read as
// related, quiet, factual sections.
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §7.
//
// The proof row reuses the canonical `PrincipalMemberTrustLine` (real Visa /
// Mastercard / PCI DSS / ISO 27001 logo marks inline) for the logo-backed
// credibility line, then lists the five verbatim proof chips beneath it so the
// full §7 set — including "Built-in scheme and network connectivity", which has
// no logo — is present and explicit.

const COPY = {
  headline: "The network credibility a bank can build on.",
  body: "Certified rails and scheme connectivity, built in — so you launch on infrastructure that's already trusted.",
  chips: [
    "Principal member of Visa",
    "Principal member of Mastercard",
    "PCI DSS Level 1 certified",
    "ISO 27001 certified",
    "Built-in scheme and network connectivity",
  ],
} as const;

export function NetworkProof() {
  return (
    <Section bg="soft" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.body}
        </p>
      </div>

      {/* Logo-backed credibility line — the canonical trust line with inline
          Visa / Mastercard / PCI DSS / ISO 27001 marks. */}
      <div className="mt-10 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        <PrincipalMemberTrustLine />
      </div>

      {/* The five verbatim proof chips — the complete §7 set, including the
          connectivity point that has no logo mark. */}
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {COPY.chips.map((chip) => (
          <li
            key={chip}
            className="rounded-pill border border-surface-border-subtle bg-surface-white/70 px-4 py-1.5 font-body text-[13px] text-text-primary backdrop-blur-sm dark:border-surface-dark-border dark:bg-surface-dark-elevated/60 dark:text-text-dark-secondary"
          >
            {chip}
          </li>
        ))}
      </ul>
    </Section>
  );
}
