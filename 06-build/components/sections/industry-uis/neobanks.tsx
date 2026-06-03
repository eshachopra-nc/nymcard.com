"use client";

import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  GlowCheck,
  Slab,
  ControlChip,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";
import { Reveal } from "./_shell";

// ── Neobanks — "What you can build" surfaces ─────────────────────────────────
//
// Three distinct bespoke product surfaces for /industries/neobanks §4, one per
// build row. Each maps to its copy and shares nothing with the others, the
// product-page UIs, the fintechs exemplar (no go-live timeline, no embedded-
// checkout widget, no corridor table), or exchange-houses (no card+ledger):
//
//   0. Card product lineup   — debit / prepaid / credit, each with its form
//                              factor + lifecycle state ("Launch a full card
//                              program"). A multi-card-type catalogue, NOT a
//                              go-live timeline or a single hero card.
//   1. Embedded lending      — a card payment splitting into an installment
//                              plan, alongside a revolving line ("Add BNPL and
//                              embedded lending"). A schedule + line view, NOT
//                              fintechs' pay-in-4 checkout selector.
//   2. Multi-currency app    — the neobank's own account screen: per-wallet
//                              balances with a domestic vs. cross-border send
//                              ("Go multi-currency from the start"). A consumer
//                              app account view, NOT a balance bar ledger.
//
// Composed on the product-illustration kit (design-system.md §8.1): each surface
// is <IllustrationField/> + <IllustrationCard/> with content built from the kit
// atoms. ONE focal element each. Static at rest; the natural one-by-one beats
// (lifecycle steps, installments, wallets) sequence in on scroll-into-view and
// replay on hover via useSequentialReveal; reduced-motion shows the final state.
// Neutral data — no real third-party brands.

// ── 0 · Card product lineup ──────────────────────────────────────────────────
//
// A catalogue of the three card products a neobank ships at once — each row is
// a distinct product (debit / prepaid / credit) carrying its form factor
// (physical / virtual / tokenized) and a lifecycle chip, so the surface reads
// as "a full card program", not a single card. The Debit/Active row carries the
// one focal verdict (a glowing check); the lifecycle track assembles in.

const CARD_PRODUCTS = [
  { type: "Debit", form: "Physical", state: "Active", face: visual.navy },
  { type: "Prepaid", form: "Virtual", state: "Issued", face: visual.indigo },
  { type: "Credit", form: "Tokenized", state: "Provisioned", face: visual.purple },
] as const;

const LIFECYCLE = ["Issue", "Activate", "Freeze", "Replace", "Close"] as const;

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(LIFECYCLE.length, { step: 130 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Card products</Eyebrow>
            <LiveTag>3 live</LiveTag>
          </div>

          {/* The three card products — distinct product per row. */}
          <div className="mt-3.5 flex flex-col gap-1.5">
            {CARD_PRODUCTS.map((c) => (
              <Slab key={c.type} className="flex items-center gap-3 px-3 py-2">
                {/* Mini card chip — the form-factor cue (object accent). */}
                <span
                  className="relative grid h-7 w-10 shrink-0 place-items-end overflow-hidden rounded-[5px] p-1"
                  style={{
                    background: `linear-gradient(150deg, ${c.face}, ${visual.navy})`,
                    boxShadow: `0 6px 14px -6px ${withAlpha(c.face, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.14)}`,
                  }}
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: withAlpha(visual.cyan, 0.4) }} />
                  <span
                    className="size-2 rounded-[2px]"
                    style={{ background: withAlpha(visual.cyan, 0.18), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.45)}` }}
                  />
                </span>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold leading-tight text-text-primary dark:text-text-dark-primary">
                    {c.type}
                  </div>
                  <SubLabel>{c.form}</SubLabel>
                </div>
                {c.state === "Active" ? (
                  <span className="ml-auto flex items-center gap-1.5">
                    <GlowCheck size={16} />
                    <SubLabel>{c.state}</SubLabel>
                  </span>
                ) : (
                  <span className="ml-auto">
                    <SubLabel>{c.state}</SubLabel>
                  </span>
                )}
              </Slab>
            ))}
          </div>

          {/* Lifecycle track — the "full lifecycle management" claim, assembles in. */}
          <div className="mt-3.5 border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
            <div className="mb-2">
              <SubLabel>Lifecycle</SubLabel>
            </div>
            <div ref={ref} {...bind} className="flex items-center gap-1">
              {LIFECYCLE.map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-1">
                  <span
                    className="flex-1 rounded-[7px] py-1 text-center font-mono text-[8px] uppercase tracking-[0.06em] text-text-secondary transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] dark:text-text-dark-secondary"
                    style={{
                      background: withAlpha(visual.primary, 0.05),
                      boxShadow: `inset 0 0 0 1px ${withAlpha(visual.primary, 0.12)}`,
                      opacity: n > i ? 1 : 0,
                      transform: n > i ? "translateY(0)" : "translateY(4px)",
                    }}
                  >
                    {s}
                  </span>
                  {i < LIFECYCLE.length - 1 && (
                    <span aria-hidden className="h-px w-1.5 shrink-0" style={{ background: withAlpha(visual.primary, 0.2) }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 1 · Embedded BNPL + revolving line ───────────────────────────────────────
//
// A card payment splitting into an installment schedule, embedded directly in
// the flow, alongside the customer's revolving credit line. Different angle
// from fintechs' pay-in-4 checkout SELECTOR: this shows the resulting SCHEDULE
// (paid + upcoming installments) plus the standing revolving line utilization.
// The first (paid) installment is the one focal glowing chip; the upcoming
// three slide in one by one.

const PAID_CHIP = `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.95)}, ${withAlpha(visual.primary, 0.92)})`;

const UPCOMING: [string, string][] = [
  ["150.00", "Month 2"],
  ["150.00", "Month 3"],
  ["150.00", "Month 4"],
];

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(UPCOMING.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* Purchase header — a card payment becoming a plan. */}
          <div className="flex items-center justify-between">
            <Eyebrow>Installments · 4 × monthly</Eyebrow>
            <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
              600.00
            </span>
          </div>

          {/* Installment schedule — first chip Paid + glowing, the rest build in. */}
          <div ref={ref} {...bind} className="mt-3.5 flex gap-1.5">
            <div
              className="flex-1 rounded-[11px] py-2.5 text-center"
              style={{ background: PAID_CHIP, boxShadow: `0 0 22px ${withAlpha(visual.cyan, 0.5)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.5)}` }}
            >
              <div className="text-[12px] font-bold tabular-nums text-white">150.00</div>
              <div className="mt-0.5 font-mono text-[7.5px] tracking-[0.1em] text-white/90">TODAY</div>
            </div>
            {UPCOMING.map(([amt, label], i) => (
              <Slab
                key={label}
                className="flex-1 py-2.5 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
              >
                <div className="text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">{amt}</div>
                <div className="mt-0.5 font-mono text-[7.5px] tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                  {label.toUpperCase()}
                </div>
              </Slab>
            ))}
          </div>

          {/* Revolving line — the second lending product, embedded alongside. */}
          <Reveal delay={0.5}>
            <Slab className="mt-3.5 p-3">
              <div className="flex items-center justify-between">
                <SubLabel>Revolving line</SubLabel>
                <span className="font-mono text-[9px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                  1,800 / 5,000
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: withAlpha(visual.primary, 0.1) }}>
                <span
                  className="block h-full rounded-full"
                  style={{ width: "36%", background: `linear-gradient(90deg, ${visual.indigo}, ${visual.purple})` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                <span>36% utilized</span>
                <span style={{ color: visual.cyan }}>3,200 available</span>
              </div>
            </Slab>
          </Reveal>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Multi-currency app account ───────────────────────────────────────────
//
// The neobank's own consumer app account screen: per-currency wallet cards with
// a primary balance, then a send action offering a domestic vs. cross-border
// route. Different archetype from exchange-houses' balance-bar ledger and from
// any corridor table — this is the in-app account experience the neobank ships.
// The primary AED balance is the one focal Stat; the wallets assemble in.

const WALLETS = [
  { code: "AED", bal: "8,420.50", primary: true },
  { code: "USD", bal: "2,290.00", primary: false },
  { code: "EUR", bal: "1,140.75", primary: false },
] as const;

const SECONDARY_WALLETS = WALLETS.filter((w) => !w.primary);

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(SECONDARY_WALLETS.length, { step: 150 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* App chrome — a consumer account header. */}
          <div className="flex items-center justify-between">
            <Eyebrow>Accounts</Eyebrow>
            <SubLabel>3 wallets</SubLabel>
          </div>

          {/* Primary wallet — the one focal balance. */}
          <div
            className="mt-3 rounded-[12px] px-3.5 py-2.5"
            style={{
              background: `linear-gradient(120deg, ${withAlpha(visual.cyan, 0.12)}, ${withAlpha(visual.indigo, 0.08)})`,
              boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.3)}`,
            }}
          >
            <div className="flex items-center justify-between">
              <SubLabel>AED wallet</SubLabel>
              <LiveTag>Primary</LiveTag>
            </div>
            <div className="mt-1.5">
              <Stat size={28}>8,420.50</Stat>
            </div>
          </div>

          {/* Secondary wallets — per-currency balances, assemble in. */}
          <div ref={ref} {...bind} className="mt-2 flex flex-col gap-1.5">
            {SECONDARY_WALLETS.map((w, i) => (
              <Slab
                key={w.code}
                className="flex items-center gap-2.5 px-3 py-2 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
              >
                <span
                  className="grid size-6 shrink-0 place-items-center rounded-full font-mono text-[8px] font-semibold uppercase tracking-[0.04em] text-white"
                  style={{ background: `linear-gradient(150deg, ${visual.indigo}, ${visual.navy})` }}
                >
                  {w.code}
                </span>
                <SubLabel>{w.code} wallet</SubLabel>
                <span className="ml-auto font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  {w.bal}
                </span>
              </Slab>
            ))}
          </div>

          {/* Send action — domestic vs. cross-border route. */}
          <Reveal delay={0.5}>
            <div className="mt-3.5 border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
              <div className="mb-2 flex items-center justify-between">
                <SubLabel>Send</SubLabel>
                <span className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  500.00
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <Slab className="px-2.5 py-1.5">
                  <div className="text-[10px] font-semibold text-text-primary dark:text-text-dark-primary">Domestic</div>
                  <div className="font-mono text-[7.5px] uppercase tracking-[0.06em]" style={{ color: visual.cyan }}>
                    instant
                  </div>
                </Slab>
                <Slab className="px-2.5 py-1.5">
                  <div className="text-[10px] font-semibold text-text-primary dark:text-text-dark-primary">Cross-border</div>
                  <div className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-text-secondary dark:text-text-dark-secondary">
                    your FX
                  </div>
                </Slab>
              </div>
            </div>
          </Reveal>
        </div>
      </IllustrationCard>
    </>
  );
}
