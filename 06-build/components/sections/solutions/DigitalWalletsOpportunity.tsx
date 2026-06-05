import { Section } from "@/components/sections/Section";

// ── Digital Wallets §2 — The Opportunity ─────────────────────────────────────
//
// Copy mirrored from 02-copy/usecase-digital-wallets.md §The Opportunity.
//
// OWNER EDIT (page repetition): the four "What customers expect" cards (Store
// value · Move money · Spend anywhere · Access financial services) DUPLICATED
// the §3 capability list (Stored Value · Payments · Cards · Cash In/Out ·
// Rewards · Financial Services) — "Stored Value" appeared twice. Dropped the
// quartet; §2 is now a tight, centred opportunity STATEMENT (the "why"), and §3
// carries the "what" with the wallet mockup. Less text, no duplication. The
// page's product visual is now the §3 wallet UI. No eyebrow — the headline leads.

const COPY = {
  headline: "The wallet is becoming the primary financial relationship.",
  body: "For millions of customers, the wallet is where money arrives, where payments happen, and where financial services begin. Whether you're building a consumer wallet, a mobile money platform, or a digital government programme, the experience has become just as important as the infrastructure underneath it.",
} as const;

export function DigitalWalletsOpportunity() {
  return (
    <Section bg="soft">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.body}
        </p>
      </div>
    </Section>
  );
}
