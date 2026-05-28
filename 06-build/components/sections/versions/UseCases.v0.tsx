"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow, UIPlaceholder } from "@/components/composition";

// UseCases — homepage "Use Cases" section, Stripe-style horizontal carousel.
// Seven outcome-led cards in a full-bleed horizontal rail. Each card carries
// a UI placeholder at the top, headline, body, a 3-bullet feature list, and
// an "Explore" link. No icon — Stripe's use-case cards don't carry one and
// the chip was crowding the headline.
//
// The rail lives OUTSIDE the section's `max-w-7xl` container so the right
// side bleeds to the viewport edge with the next card cropping past it
// (Stripe-style). `pl` is calculated to align card 1 with the section's left
// rail at every breakpoint.
//
// Copy below is a polished draft from the project's copywriter agent.
// TODO: copy from ../02-copy/Homepage.md §5 — back-fill into the copy file.

type UseCase = {
  id: string;
  name: string;
  description: string;
  bullets: string[];
  uiLabel: string;
  href: string;
};

const USE_CASES: UseCase[] = [
  {
    id: "commercial-payments",
    name: "Run a commercial card program",
    description:
      "Issue SME and corporate cards on nCore, delivered with Visa.",
    bullets: [
      "Multi-entity cards, accounts, and spend controls",
      "Limits by merchant category, amount, and time of day",
      "Real-time reconciliation across cards, accounts, and rails",
    ],
    uiLabel: "commercial console",
    href: "/solutions/commercial-payments",
  },
  {
    id: "launch-a-bank",
    name: "Launch a bank",
    description:
      "Run a complete banking stack under your brand on a single programmable platform.",
    bullets: [
      "Accounts, cards, payments, and ledger in one platform",
      "One customer record and audit trail across every product",
      "Open APIs for your own product surfaces",
    ],
    uiLabel: "core banking",
    href: "/solutions/launch-a-bank",
  },
  {
    id: "embedded-finance",
    name: "Embed financial products",
    description:
      "Add cards, payments, and credit to the platform your customers already use.",
    bullets: [
      "Cards, accounts, and payouts via API and SDKs",
      "White-labeled — your brand, your UX, your data",
      "One contract across the financial stack",
    ],
    uiLabel: "API console",
    href: "/solutions/embedded-finance",
  },
  {
    id: "buy-now-pay-later",
    name: "Offer buy now, pay later",
    description:
      "Decision, originate, service, and collect — built into your checkout.",
    bullets: [
      "Real-time decisioning at the point of sale",
      "Servicing, collections, and reporting end to end",
      "Fraud and risk monitoring on every loan",
    ],
    uiLabel: "checkout flow",
    href: "/solutions/buy-now-pay-later",
  },
  {
    id: "disbursements",
    name: "Disburse at scale",
    description:
      "Move funds to suppliers, gig workers, payroll, and claimants across rails.",
    bullets: [
      "One API across cards, accounts, and wallets",
      "Routing, retries, and reconciliation built in",
      "Sanctions and AML screening on every payout",
    ],
    uiLabel: "payouts console",
    href: "/solutions/disbursements",
  },
  {
    id: "remittances",
    name: "Power remittances",
    description:
      "Cross-border send and receive for exchange houses, banks, and corridor-led products.",
    bullets: [
      "Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram",
      "FX, settlement, and reconciliation on one platform",
      "AML and sanctions screening built in",
    ],
    uiLabel: "remittance flow",
    href: "/solutions/remittances",
  },
  {
    id: "mobile-wallet",
    name: "Launch a mobile wallet",
    description:
      "Run a consumer or agent wallet on nCore, with cash-in, cash-out, and P2P in one ledger.",
    bullets: [
      "Wallet ledger with cash-in, cash-out, and P2P",
      "Card issuance, bill pay, and remittance inflows",
      "Domestic rails and cross-border on one platform",
    ],
    uiLabel: "wallet app",
    href: "/solutions/mobile-wallet",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function UseCases() {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-use-case-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    rail.scrollBy({ left: step * dir, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      aria-label="Use cases"
      className="relative bg-surface-soft py-20 sm:py-28 lg:py-32 overflow-hidden dark:bg-surface-dark-base"
    >
      {/* Header — constrained to the section content rail. */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-[720px]">
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-text-primary leading-[1.1] tracking-tight text-[28px] sm:text-[32px] lg:text-[40px] dark:text-text-on-brand">
              Multiple ways to grow with NymCard
            </h2>
          </div>
          {/* Arrow controls — hidden on touch where the rail scrolls natively. */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous use case"
              className="flex size-10 items-center justify-center rounded-md bg-brand-primary/[0.08] text-brand-primary transition-colors hover:bg-brand-primary hover:text-white dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:hover:bg-accent-cyan dark:hover:text-brand-navy"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next use case"
              className="flex size-10 items-center justify-center rounded-md bg-brand-primary/[0.08] text-brand-primary transition-colors hover:bg-brand-primary hover:text-white dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:hover:bg-accent-cyan dark:hover:text-brand-navy"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed horizontal rail. Lives OUTSIDE the max-w-7xl container so
          the right side runs to the viewport edge and off-screen cards crop
          past it. `pl` matches the section's content left rail at every
          breakpoint; `scroll-pl` mirrors `pl` so snap-scroll lands cleanly. */}
      <div
        ref={railRef}
        className={cn(
          "mt-10 sm:mt-12 lg:mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4",
          "pl-4 sm:pl-6 lg:pl-[max(80px,calc((100vw-1280px)/2+80px))] pr-4",
          "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(80px,calc((100vw-1280px)/2+80px))]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {USE_CASES.map((useCase, i) => (
          <UseCaseCard key={useCase.id} useCase={useCase} index={i} />
        ))}
      </div>
    </section>
  );
}

function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={useCase.href}
      data-use-case-card
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduced
          ? undefined
          : { duration: 0.6, delay: index * 0.05, ease: EASE }
      }
      className={cn(
        "group relative flex shrink-0 snap-start flex-col gap-5 overflow-hidden rounded-2xl border bg-surface-white p-7 transition-shadow duration-300",
        "border-surface-border-subtle shadow-[0_2px_8px_0_rgba(14,26,51,0.04),0_1px_2px_0_rgba(14,26,51,0.06)]",
        "hover:shadow-[0_18px_44px_-10px_rgba(14,26,51,0.16),0_6px_16px_-4px_rgba(14,26,51,0.08)]",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger",
        "w-[86%] sm:w-[60%] md:w-[44%] lg:w-[32%]",
      )}
    >
      {/* UI placeholder — neutral on-system stand-in until the real product
          UI is produced per use case. */}
      <div className="h-[180px] sm:h-[200px]">
        <UIPlaceholder label={useCase.uiLabel} scale="compact" />
      </div>

      <div>
        <h3 className="font-display font-semibold text-text-primary text-xl leading-snug dark:text-text-on-brand">
          {useCase.name}
        </h3>
        <p className="mt-2.5 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {useCase.description}
        </p>
      </div>

      <ul className="space-y-2.5">
        {useCase.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 font-body text-[13px] leading-relaxed text-text-primary dark:text-text-on-brand"
          >
            <Check
              aria-hidden="true"
              className="mt-[3px] size-3.5 shrink-0 text-accent-cyan"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3">
        <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors group-hover:text-brand-primary-hover dark:text-accent-cyan dark:group-hover:text-accent-cyan/80">
          Explore
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.a>
  );
}
