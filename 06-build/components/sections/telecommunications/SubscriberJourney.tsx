import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Telecommunications §3 — From subscriber to customer (CENTERPIECE) ─────────
//
// The page's defining beat: customer EVOLUTION, not product selection. A single
// subscriber-journey visual (Subscriber → Wallet → Payments → Card → Credit →
// Loyalty, each capability activating around one customer profile) carried as
// ONE labelled UIPlaceholder — the bespoke animated surface is filled by a
// later product-ui-designer pass (scaffold only). The placeholder floats on the
// canonical luminous kit (IllustrationField surround + IllustrationCard glass)
// so it reads dimensional in BOTH light and dark, never a flat panel
// (design-system.md §8.1, CLAUDE.md guardrails). The five capabilities and their
// copy sit as supporting text around the journey.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Scroll reveal comes
// from Section/SectionReveal; the capability list is static at rest.
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §3.

const COPY = {
  headline:
    "Build financial relationships on top of existing customer relationships.",
  description:
    "Telecommunications providers already manage identity, billing, recurring payments, and customer engagement. Financial services become a natural extension of that relationship.",
  capabilities: [
    {
      name: "Store value",
      body: "Launch digital wallets that allow subscribers to receive, store, and spend funds.",
    },
    {
      name: "Move value",
      body: "Enable domestic payments, transfers, remittances, and everyday transactions.",
    },
    {
      name: "Access credit",
      body: "Offer device financing, installment plans, and consumer lending products.",
    },
    {
      name: "Spend digitally",
      body: "Issue branded cards linked to wallets and customer accounts.",
    },
    {
      name: "Engage customers",
      body: "Create loyalty, rewards, and financial experiences that increase customer retention.",
    },
  ],
} as const;

export function SubscriberJourney() {
  return (
    <Section bg="white" ariaLabel="From subscriber to customer">
      {/* Headline + description — left, F-pattern. No eyebrow. */}
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Journey visual (left, dominant) + the five capabilities as supporting
          text (right). The visual is one labelled placeholder floating on the
          luminous kit; the capabilities read as the evolution around it. */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* The subscriber-journey surface — one labelled placeholder, on the kit. */}
        <div className="relative isolate min-h-[26rem] overflow-hidden rounded-[20px] lg:min-h-[32rem]">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <div className="flex h-full flex-col p-3 sm:p-4">
              <UIPlaceholder
                label="Subscriber journey — Subscriber → Wallet → Payments → Card → Credit → Loyalty, each activating around one customer profile"
                scale="wide"
              />
            </div>
          </IllustrationCard>
        </div>

        {/* The five capabilities — supporting text around the journey. The
            customer evolves through them; they are not a product menu. */}
        <ul className="flex flex-col justify-center divide-y divide-surface-border-subtle dark:divide-surface-dark-border">
          {COPY.capabilities.map((cap) => (
            <li key={cap.name} className="py-4 first:pt-0 last:pb-0">
              <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                {cap.name}
              </h3>
              <p className="mt-1.5 max-w-[40ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                {cap.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
