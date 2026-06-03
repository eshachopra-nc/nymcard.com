import { Section } from "@/components/sections/Section";
import { NCoreOrbit } from "@/components/sections/product-uis/migration";

// ── Migration §7 — On-ramp to the full stack ────────────────────────────────
//
// The climactic full-stack tie-back: migration is the on-ramp, the platform is
// the payoff. This is where the page's narrative spine resolves — "everything
// runs on one core." The NCoreOrbit surface makes that felt: nCore as a glowing
// nucleus with the six products (Cards, Lending, Money movement, Settlement,
// Financial crime, Reconciliation) orbiting it, settling into the ring one by
// one on scroll-in and drifting ambiently. Floats in the canonical
// product-illustration treatment, dimensional in both themes. Asymmetric
// F-pattern: copy left, the orbit right. No section eyebrow (owner rule).
//
// Copy mirrored verbatim from 05-handoff/migration-copy-final.md §7.

const COPY = {
  headline:
    "Migration gets you onto the platform. The platform changes what you can build.",
  body: [
    "Most migrations end with a new processor.",
    "A migration to nCore puts cards, lending, money movement, settlement, financial crime, and reconciliation on one architecture, with one customer record, one data layer, and intelligence built directly into the core.",
  ],
  supportingLine:
    "Modernization doesn't end when the migration finishes. It starts there.",
} as const;

export function FullStackOnRamp() {
  return (
    <Section bg="white" ariaLabel="On-ramp to the full stack">
      <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        {/* Copy — F-pattern left. */}
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.headline}
          </h2>
          {COPY.body.map((p, i) => (
            <p
              key={i}
              className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary"
            >
              {p}
            </p>
          ))}
          <p className="mt-7 font-display text-lg font-medium leading-snug tracking-tight text-text-primary sm:text-xl dark:text-text-on-brand">
            {COPY.supportingLine}
          </p>
        </div>

        {/* The payoff — nCore as a glowing nucleus with the six products
            orbiting it: everything runs on one core (animates on scroll-in,
            drifts ambiently, reacts on hover). */}
        <NCoreOrbit className="min-h-[26rem]" />
      </div>
    </Section>
  );
}
