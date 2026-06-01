import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CardsUI } from "@/components/sections/product-uis/CardsUI";
import { LendingUI } from "@/components/sections/product-uis/LendingUI";
import { MoneyMovementUI } from "@/components/sections/product-uis/MoneyMovementUI";
import { SettlementUI } from "@/components/sections/product-uis/SettlementUI";
import { StablecoinSettlementCard } from "@/components/sections/product-uis/StablecoinSettlementCard";
import { FinancialCrimeUI } from "@/components/sections/product-uis/FinancialCrimeUI";
import { ReconciliationUI } from "@/components/sections/product-uis/ReconciliationUI";
import {
  CardLinkedCreditUI,
  OriginationUI,
  DecisioningUI,
  DisbursementUI,
  CollectionsUI,
  RepaymentStructuresUI,
} from "@/components/sections/product-uis/lending";

// ── /visual-system/products — Product Illustration Gallery (dev only) ────────
//
// The artifact for the "prove the illustration capability is real" review.
// Every NymCard product surface, rendered LARGE in BOTH light and dark, side by
// side as one coherent range. Each block shows the product name, a one-line
// "what it shows" caption that demonstrates product understanding, and the
// distinct coded illustration — each composed on the canonical glass kit
// (GlassSurface floating on GlassAtmosphere, design-system.md §8.1), each
// depicting a SPECIFIC thing that product does, each animating on scroll-in +
// hover, reduced-motion safe.
//
// This is a Server Component so it can mark itself noindex; it composes the
// client surface components. Not a marketing page — a dev styleguide route.

export const metadata: Metadata = {
  title: "Product Illustrations — dev",
  robots: { index: false, follow: false },
};

// A side-by-side light/dark pair for one surface. `aspect` keeps wide vs.
// narrow surfaces at their intended proportions. The forced-dark frame mirrors
// the main styleguide's pattern (`dark bg-surface-dark-base`).
function Pair({
  aspect = "aspect-[16/10]",
  children,
}: {
  aspect?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Frame mode="light" aspect={aspect}>
        {children}
      </Frame>
      <Frame mode="dark" aspect={aspect}>
        {children}
      </Frame>
    </div>
  );
}

function Frame({
  mode,
  aspect,
  children,
}: {
  mode: "light" | "dark";
  aspect: string;
  children: ReactNode;
}) {
  const dark = mode === "dark";
  return (
    <div
      className={[
        "group relative w-full overflow-hidden rounded-2xl ring-1",
        aspect,
        dark
          ? "dark bg-surface-dark-base ring-white/[0.08]"
          : "bg-surface-white ring-brand-navy/[0.06]",
      ].join(" ")}
    >
      {children}
      <span
        className={[
          "pointer-events-none absolute right-3 top-3 z-30 rounded-md px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]",
          dark ? "bg-white/10 text-white/70" : "bg-brand-navy/[0.05] text-text-muted",
        ].join(" ")}
      >
        {mode}
      </span>
    </div>
  );
}

function ProductBlock({
  name,
  caption,
  status,
  aspect,
  children,
}: {
  name: string;
  caption: string;
  status: "Redesigned" | "Refined" | "Gold standard";
  aspect?: string;
  children: ReactNode;
}) {
  const statusClass =
    status === "Redesigned"
      ? "bg-accent-cyan/[0.12] text-accent-cyan ring-accent-cyan/35 dark:bg-accent-cyan/[0.16] dark:ring-accent-cyan/45"
      : status === "Gold standard"
        ? "bg-accent-indigo/[0.12] text-accent-indigo ring-accent-indigo/35 dark:bg-accent-indigo/[0.18] dark:ring-accent-indigo/45"
        : "bg-brand-navy/[0.05] text-text-muted ring-brand-navy/10 dark:bg-white/[0.06] dark:text-text-dark-muted dark:ring-white/10";

  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
          {name}
        </h2>
        <span
          className={[
            "rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ring-1 ring-inset",
            statusClass,
          ].join(" ")}
        >
          {status}
        </span>
      </div>
      <p className="mt-2 max-w-2xl font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {caption}
      </p>
      <div className="mt-6">
        <Pair aspect={aspect}>{children}</Pair>
      </div>
    </section>
  );
}

export default function ProductIllustrationsPage() {
  return (
    <main className="bg-surface-white dark:bg-surface-dark-base">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 lg:px-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            Product illustration gallery · dev
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-text-primary dark:text-text-on-brand">
            One illustration per product. Each one true to what it does.
          </h1>
          <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            Every NymCard product surface, rendered large in light and dark as a single
            coherent range. Each is a distinct coded illustration composed on the canonical
            glass kit (frosted glass floating on a rich, theme-aware cool field, design-system.md
            §8.1), depicting a specific thing the product does. Hover any surface to see it react;
            all motion is reduced-motion safe.
          </p>
        </header>

        {/* Cards */}
        <ProductBlock
          name="Cards"
          status="Refined"
          caption="A live card program: a straight, electric-violet card object in front of a frosted control console — program type (debit · credit · prepaid), spend limit, and real-time toggles. Hover flips ATM withdrawals on and ticks the limit up, proving native processing with real-time controls."
        >
          <CardsUI />
        </ProductBlock>

        {/* Lending — homepage flagship */}
        <ProductBlock
          name="Lending"
          status="Gold standard"
          aspect="aspect-[4/5] sm:aspect-[5/6]"
          caption="A Pay-in-4 instalment schedule on glass: amount, a progress meter, four dated instalments, and an approved / 0% APR footer. Hover advances the schedule one step — the next instalment flips Due → Paid — proving live BNPL and installment programs."
        >
          <LendingUI />
        </ProductBlock>

        {/* Money Movement */}
        <ProductBlock
          name="Money Movement"
          status="Refined"
          caption="The hero's wireframe globe, reused exactly — money moving across borders, rails and currencies, with the corridor arcs and a currency pill drifting on the cool field. Matches the homepage hero's craft rather than reinventing a lesser version. Proves moving funds across borders and rails with integrated FX and settlement."
        >
          <MoneyMovementUI />
        </ProductBlock>

        {/* Settlement */}
        <ProductBlock
          name="Settlement"
          status="Refined"
          caption="Framed from the bank treasury's side — no product jargon on screen: USD 2.4M settled and available now at T+0, over a USD → USDC → USD instant rail and a Mon–Sun week with the weekends lit, no SWIFT. The value travels and settles on scroll-in. Proves real-time, multi-currency and stablecoin settlement."
        >
          <SettlementUI />
        </ProductBlock>

        {/* Stablecoin Settlement — recreated from the stablecoin-clock-v1 handoff */}
        <ProductBlock
          name="Stablecoin Settlement"
          status="Redesigned"
          aspect="aspect-[3/2]"
          caption="Recreated from the locked handoff: the 24h settled volume ($284.2M, +9.2% over 1,204 settlements) leads as the hero, with a full-width USD → USDC → USD settlement path beneath and the always-on SETTLED / 24-7-365 framing. The amount counts up, the path draws in and a value token travels it once on scroll-in; hover brightens the rail. Proves near real-time, 24/7 stablecoin settlement."
        >
          <StablecoinSettlementCard />
        </ProductBlock>

        {/* Financial Crime */}
        <ProductBlock
          name="Financial Crime"
          status="Redesigned"
          caption="A live authorization being decisioned inside the transaction: the risk score resolves low (4/100), the top contributing signals clear, the screen lands Approved, and the KYC · AML · 3DS · Sanctions checks tick. Cool-only — no warm risk colours. Proves fraud, risk, 3D Secure, AML, sanctions and identity running inside every transaction."
        >
          <FinancialCrimeUI />
        </ProductBlock>

        {/* Reconciliation */}
        <ProductBlock
          name="Reconciliation"
          status="Refined"
          caption="Auto-matching, led by a climbing ticker of transactions auto-matched today over a Ledger ↔ Bank statement auto-map. One exception sits in cool indigo and resolves on hover — its connector solidifies, its marker flips to a check, the pill reads Resolved. Proves automated matching with exceptions flagged in real time."
        >
          <ReconciliationUI />
        </ProductBlock>

        {/* Lending — the full credit-journey range (existing surfaces) */}
        <section className="mt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            Range depth · Lending credit journey
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
            Six distinct surfaces for one product.
          </h2>
          <p className="mt-2 max-w-2xl font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            The Lending product page configures every stage of credit with its own surface —
            the bar this gallery holds every product to. Shown light here; each animates on
            scroll-in and hover.
          </p>

          <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2">
            <JourneyCell name="Card-linked credit" caption="Credit line, revolving meter, repayment options.">
              <CardLinkedCreditUI />
            </JourneyCell>
            <JourneyCell name="Origination" caption="API onboarding stepper — KYC, income, approved.">
              <OriginationUI />
            </JourneyCell>
            <JourneyCell name="Decisioning" caption="Bureau / open-banking / model feed a score gauge.">
              <DecisioningUI />
            </JourneyCell>
            <JourneyCell name="Disbursement" caption="Funds-out selector — card · account · wallet.">
              <DisbursementUI />
            </JourneyCell>
            <JourneyCell name="Collections" caption="Billing-cycle track with auto-dunning status.">
              <CollectionsUI />
            </JourneyCell>
            <JourneyCell name="Repayment structures" caption="Three pricing-logic curves compared.">
              <RepaymentStructuresUI />
            </JourneyCell>
          </div>
        </section>
      </div>
    </main>
  );
}

function JourneyCell({
  name,
  caption,
  children,
}: {
  name: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="group relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-surface-white ring-1 ring-brand-navy/[0.06]">
        {children}
      </div>
      <div className="mt-3">
        <h3 className="font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
          {name}
        </h3>
        <p className="mt-0.5 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {caption}
        </p>
      </div>
    </div>
  );
}
