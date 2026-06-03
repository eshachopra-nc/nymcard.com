import { Section } from "@/components/sections/Section";
import { PrincipalMemberTrustLine } from "@/components/composition/TrustBar";

// ── Network & proof (Homepage §7) — NEW ─────────────────────────────────────
//
// A slim de-risking band — the network credibility a bank needs to switch off
// legacy. Calm/soft treatment, ~one screen: NO heavy glass, NO kinetic ribbon —
// it pairs with Deployment (§8) as the "bank de-risk cluster", so both read as
// related, quiet, factual sections.
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §7.
//
// ONE treatment only (owner direction, 2026-06): the prior render showed BOTH
// the inline Visa/Mastercard/PCI/ISO logo line AND a duplicate row of pill chips
// with the same content. The duplicate chip row is REMOVED. The single proof
// treatment is the logo-backed `PrincipalMemberTrustLine` (real Visa /
// Mastercard / PCI DSS / ISO 27001 marks inline) followed by the one §7 proof
// point that has no logo mark — "Built-in scheme and network connectivity" —
// rendered on the same line so the complete §7 set is present exactly once.

const COPY = {
  headline: "The network credibility a bank can build on.",
  body: "Certified rails and scheme connectivity, built in, so you launch on infrastructure that's already trusted.",
  connectivity: "Built-in scheme and network connectivity",
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

      {/* The single proof treatment — the logo-backed credibility line (real
          Visa / Mastercard / PCI DSS / ISO 27001 marks), with the no-logo
          connectivity proof point appended on the same line. No second row. */}
      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        <PrincipalMemberTrustLine />
        <span aria-hidden="true" className="text-text-muted/60 dark:text-text-dark-secondary/50">
          ·
        </span>
        <span>{COPY.connectivity}</span>
      </div>
    </Section>
  );
}
