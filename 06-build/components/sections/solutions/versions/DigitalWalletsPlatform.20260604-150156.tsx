import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Digital Wallets §5 — Powered by nCore ────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Powered by
// nCore.
//
// APPROVED ADJUSTMENT: a balanced 50:50 — headline + body + the four benefits
// (as a tight bordered 2×2) on the left, opposite a wide labelled
// UIPlaceholder on the right (the "one customer record across every wallet
// interaction" surface). The columns stretch to equal height. Kept LIGHT
// (white) — NOT dark — so it does not stack against the dark §7 deployment
// beat. No eyebrow — the headline leads. On a contained SectionAtmosphere wash.

const COPY = {
  headline: "One platform behind every wallet experience.",
  body: "Digital wallets are built on the same nCore architecture that powers cards, money movement, settlement, financial crime, and reconciliation. One customer record, one data layer, and one audit trail support every interaction.",
  benefits: [
    {
      title: "One customer record",
      body: "A complete view of every customer across every wallet interaction.",
    },
    {
      title: "Real-time processing",
      body: "Balances, transfers, and payments update instantly.",
    },
    {
      title: "Financial crime controls",
      body: "Identity, fraud, AML, and sanctions integrated directly into the flow.",
    },
    {
      title: "Built to scale",
      body: "Launch new capabilities, markets, and customer experiences on the same platform.",
    },
  ],
} as const;

export function DigitalWalletsPlatform() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — headline + body, then the four benefits as a tight 2×2. */}
        <div className="flex flex-col">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.body}
          </p>

          {/* Benefits — a tight bordered 2×2 list, hairline-divided. */}
          <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-border-subtle dark:border-surface-dark-border dark:bg-surface-dark-border sm:grid-cols-2">
            {COPY.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col bg-surface-white p-5 dark:bg-surface-dark-elevated sm:p-6"
              >
                <p className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {benefit.title}
                </p>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — the nCore one-record surface: a single customer record at the
            source, every wallet interaction (balance, transfer, payment, card)
            reading from it in real time. A labelled UIPlaceholder slot for the
            ui-ux-designer to fill. */}
        <div className="group relative min-h-[26rem] w-full self-stretch lg:min-h-0">
          <UIPlaceholder
            scale="wide"
            label="Powered by nCore — one customer record across every wallet interaction"
          />
        </div>
      </div>
    </Section>
  );
}
