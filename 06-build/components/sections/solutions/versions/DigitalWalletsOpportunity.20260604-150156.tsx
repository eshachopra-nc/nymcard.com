import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Digital Wallets §2 — The Opportunity ─────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §The
// Opportunity.
//
// OPPORTUNITY-LED, not pain-led — positive framing throughout. A balanced
// 50:50 row: headline + body on the left with the four "What Customers Expect"
// items as a 2×2 sub-grid beneath the copy, opposite a labelled UIPlaceholder
// (the wallet experience surface) on the right. The columns stretch to equal
// height so the copy and the visual read as a matched pair. No eyebrow — the
// headline leads. Light, on a contained SectionAtmosphere wash so the section
// reads dimensional.

const COPY = {
  headline: "The wallet is becoming the primary financial relationship.",
  body: "For millions of customers, the wallet is where money arrives, where payments happen, and where financial services begin. Whether you're building a consumer wallet, a mobile money platform, or a digital government programme, the experience has become just as important as the infrastructure underneath it.",
  expectations: [
    {
      title: "Store value",
      body: "Hold balances securely and access funds instantly.",
    },
    {
      title: "Move money",
      body: "Transfer funds between customers, accounts, cards, wallets, and cash networks.",
    },
    {
      title: "Spend anywhere",
      body: "Use wallet balances for payments, purchases, and everyday transactions.",
    },
    {
      title: "Access financial services",
      body: "Connect customers to cards, rewards, lending, and additional services from the same experience.",
    },
  ],
} as const;

export function DigitalWalletsOpportunity() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — headline + body, then the four expectations as a 2×2 sub-grid. */}
        <div className="flex flex-col">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.body}
          </p>

          {/* "What Customers Expect" — 2×2 sub-grid. A quieter, bordered card
              treatment so it reads as supporting detail, not the §3 capability
              cards. */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {COPY.expectations.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-lg border border-surface-border-subtle bg-surface-white p-5 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-6"
              >
                <p className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {item.title}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — the wallet experience surface: a branded mobile wallet where
            money is received, stored as one balance, moved and spent — the
            receive → store → move → spend loop in one experience. A labelled
            UIPlaceholder slot for the ui-ux-designer to fill. */}
        <div className="group relative min-h-[26rem] w-full self-stretch lg:min-h-0">
          <UIPlaceholder
            scale="wide"
            label="Digital wallet — receive, store, move, spend in one experience"
          />
        </div>
      </div>
    </Section>
  );
}
