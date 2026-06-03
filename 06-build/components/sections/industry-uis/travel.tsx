"use client";

import { Plane, Hotel, Car, Lock, Send, Plus } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  GlowNode,
  GlowCheck,
  Arrow,
  Slab,
  Toggle,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";
import { Reveal, RevealList } from "./_shell";

// ── Travel — "What you can build" surfaces ──────────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/travel §4, one per
// build row, each mapping to its copy and sharing nothing with each other, the
// fintechs surfaces, or the other verticals. All four are composed on the
// canonical product-illustration kit (design-system.md §8.1) — IllustrationField
// + IllustrationCard + atoms — so the literal surfaces share the hero's lit,
// dimensional world. Each keeps its distinct story; only the frame + atom
// vocabulary changed in the migration.
//
//   1. Multi-currency travel cards — a card object + a live cross-currency
//      authorization (tap abroad in JPY, settled from the AED wallet on ONE
//      card). Focal = the glowing approved verdict.
//   2. Corporate & expense cards   — a per-card / team / route spend-control
//      panel: travel category caps (airfare / hotel / ground) as live policy.
//      Focal = the real toggles flipping on.
//   3. Travel wallets              — a traveller wallet app: multi-currency
//      balances + a cross-border send, no bank account. Focal = the Stat total.
//   4. Agent & staff disbursements — a disbursement run funding a roster of
//      agent payout cards, with real-time spend drawn per card. Focal = the
//      run total Stat.
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. Neutral data — no real third-party brands.

// ── Row 1 · Multi-currency travel cards ─────────────────────────────────────
//
// One card spending across currencies: the card object, then a live cross-
// currency authorization where a JPY purchase abroad is settled from the AED
// wallet. The two legs build in, then the approved verdict lands — the focal.

const AUTH_LEGS = 2;

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(AUTH_LEGS, { step: 200, start: 280, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Travel card · cross-currency</Eyebrow>
            <LiveTag>One card</LiveTag>
          </div>

          {/* Card object — neutral, no brand wordmark. Straight, not tilted. */}
          <Reveal className="mt-3">
            <div
              className="relative aspect-[1.74/1] w-[48%] max-w-[12.5rem] overflow-hidden rounded-[10px] p-3"
              style={{
                background: `linear-gradient(135deg, ${visual.violet}, ${visual.navy} 60%, ${visual.navy})`,
                boxShadow: `0 16px 32px -14px ${withAlpha(visual.violet, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.25)}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/75">
                  Travel
                </span>
                <span className="size-3.5 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.12em] text-white/95">
                •••• •••• •••• 5180
              </div>
              <div className="mt-1.5 flex items-end justify-between">
                <span className="font-display text-[10px] font-semibold tracking-tight text-white">
                  DEBIT
                </span>
                <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/55">
                  physical + virtual
                </span>
              </div>
            </div>
          </Reveal>

          {/* Live cross-currency authorization — abroad spend, home settlement. */}
          <div ref={ref} {...bind} className="mt-auto pt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <SubLabel>Authorization · abroad</SubLabel>
              <SubLabel>FX retained</SubLabel>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Spend leg — local currency at the terminal. */}
              <Slab className="flex items-center gap-2.5 px-3 py-1.5">
                <PopIn show={n > 0}>
                  <GlowNode size={22} round={false}>
                    <Plane aria-hidden className="size-3 text-white" strokeWidth={2.25} />
                  </GlowNode>
                </PopIn>
                <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                  Spend in JPY
                </span>
                <span className="ml-auto font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  ¥18,400
                </span>
              </Slab>

              {/* Conversion leg — settled from the home wallet. */}
              <Slab className="flex items-center gap-2.5 px-3 py-1.5">
                <PopIn show={n > 1}>
                  <span
                    className="grid size-[22px] shrink-0 place-items-center rounded-[7px]"
                    style={{ background: withAlpha(visual.violet, 0.16), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.violet, 0.4)}` }}
                  >
                    <span style={{ transform: "scale(0.82)" }}>
                      <Arrow width={12} />
                    </span>
                  </span>
                </PopIn>
                <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                  Settled from AED
                </span>
                <span className="ml-auto font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  449.20
                </span>
              </Slab>
            </div>

            {/* Verdict — the focal element. */}
            <div className="mt-2.5 flex items-center gap-2.5 border-t pt-2.5" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
              <GlowCheck size={22} />
              <Stat size={18}>Approved</Stat>
              <SubLabel className="ml-auto">FX 0.02441 · consumer + corporate</SubLabel>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row 2 · Corporate & expense cards ───────────────────────────────────────
//
// A spend-control panel for a corporate travel program — controls scoped per
// card / team / route, expressed as travel-category policy (airfare / hotel /
// ground) with live caps. Focal: the real policy toggles flipping on one by
// one (and Cash/ATM staying blocked).

const POLICY = [
  { Icon: Plane, label: "Airfare", scope: "Per route", cap: "5,000", on: true },
  { Icon: Hotel, label: "Lodging", scope: "Per night", cap: "420", on: true },
  { Icon: Car, label: "Ground", scope: "Per trip", cap: "150", on: true },
  { Icon: Lock, label: "Cash / ATM", scope: "Blocked", cap: "—", on: false },
] as const;

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(POLICY.length, { step: 180, start: 260, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Field team · travel · 18 cards</Eyebrow>
            <LiveTag>Real-time</LiveTag>
          </div>

          {/* Travel-category policy — each control resolves on one by one. */}
          <div ref={ref} {...bind} className="mt-3 flex flex-col gap-2">
            {POLICY.map((p, i) => {
              const lit = p.on && n > i;
              return (
                <Slab key={p.label} className="flex items-center gap-2.5 px-3 py-2">
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-[7px] transition-colors duration-300"
                    style={
                      lit
                        ? { background: withAlpha(visual.cyan, 0.16), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}` }
                        : { background: withAlpha(visual.navy, 0.06), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.navy, 0.12)}` }
                    }
                  >
                    <p.Icon
                      aria-hidden
                      className={lit ? "size-3 text-accent-teal dark:text-accent-cyan" : "size-3 text-text-secondary dark:text-text-dark-secondary"}
                      strokeWidth={2.25}
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                      {p.label}
                    </div>
                    <SubLabel className="normal-case tracking-[0.1em]">{p.scope}</SubLabel>
                  </div>

                  <span className="ml-auto font-mono text-[11px] tabular-nums text-text-primary dark:text-text-dark-primary">
                    {p.cap}
                  </span>

                  {/* Policy toggle — flips on as the control resolves. */}
                  <Toggle on={p.on ? n > i : false} />
                </Slab>
              );
            })}
          </div>

          <div className="mt-auto pt-3">
            <SubLabel>Per card · per team · per route</SubLabel>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row 3 · Travel wallets ──────────────────────────────────────────────────
//
// A traveller's wallet app: multi-currency balances and a cross-border send,
// issued directly — no bank account. Focal: the available-balance Stat. The
// per-currency balances assemble in one by one, then the send capability lands.

const WALLET = [
  { code: "USD", bal: "1,240.50", w: "100%" },
  { code: "EUR", bal: "865.20", w: "70%" },
  { code: "THB", bal: "4,300.00", w: "44%" },
] as const;

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(WALLET.length, { step: 170, start: 300, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Traveller wallet</Eyebrow>
            <LiveTag>No bank account</LiveTag>
          </div>

          {/* Available balance — the focal Stat. */}
          <div className="mt-3.5">
            <SubLabel>Available</SubLabel>
            <div className="mt-1.5"><Stat size={30}>$2,114.70</Stat></div>
          </div>

          {/* Per-currency balances — assemble on view. */}
          <div ref={ref} {...bind} className="mt-3.5 flex flex-col gap-2">
            {WALLET.map((c, i) => (
              <div
                key={c.code}
                className="flex items-center gap-2.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
              >
                <span className="w-8 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-text-primary dark:text-text-dark-primary">
                  {c.code}
                </span>
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: withAlpha(visual.navy, 0.1) }}>
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: c.w, background: `linear-gradient(90deg, ${visual.cyan}, ${visual.indigo})` }}
                  />
                </span>
                <span className="w-[4.5rem] shrink-0 text-right font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                  {c.bal}
                </span>
              </div>
            ))}
          </div>

          {/* Cross-border send — the wallet's payment capability. */}
          <Reveal delay={0.55} className="mt-auto pt-3.5">
            <Slab className="flex items-center justify-between px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <GlowNode size={20}>
                  <Send aria-hidden className="size-2.5 text-white" strokeWidth={2.5} />
                </GlowNode>
                <span className="text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">
                  Send abroad
                </span>
              </span>
              <SubLabel>Cross-border · instant</SubLabel>
            </Slab>
          </Reveal>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row 4 · Agent & staff disbursements ─────────────────────────────────────
//
// A disbursement run funding a roster of agent / ground-staff payout cards,
// with real-time spend drawn against each. Focal: the run total Stat. Each
// payout card funds in one by one (check pops on), then the total resolves.

const ROSTER = [
  { ref: "AGT-2041", role: "Travel agent", funded: "2,000.00", spend: "62%" },
  { ref: "GRD-5518", role: "Ground staff", funded: "1,200.00", spend: "38%" },
  { ref: "CON-7730", role: "Contractor", funded: "3,500.00", spend: "81%" },
] as const;

export function Row4() {
  const { ref, n, bind } = useSequentialReveal(ROSTER.length, { step: 190, start: 260, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Disbursement run · 142 payout cards</Eyebrow>
            <span
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan"
              style={{ background: withAlpha(visual.indigo, 0.12) }}
            >
              <Plus aria-hidden className="size-2.5" strokeWidth={3} /> Top up
            </span>
          </div>

          {/* Roster — each payout card funds in, with live spend drawn. */}
          <div ref={ref} {...bind} className="mt-3 flex flex-col gap-2">
            {ROSTER.map((r, i) => (
              <Slab key={r.ref} className="flex items-center gap-2.5 px-3 py-2">
                <PopIn show={n > i}>
                  <GlowCheck size={18} />
                </PopIn>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] tabular-nums text-text-primary dark:text-text-dark-primary">
                    {r.ref}
                  </div>
                  <SubLabel className="normal-case tracking-[0.1em]">{r.role}</SubLabel>
                </div>

                {/* Real-time spend meter against the funded amount. */}
                <span className="ml-auto hidden h-1.5 w-14 overflow-hidden rounded-full sm:block" style={{ background: withAlpha(visual.navy, 0.1) }}>
                  <span
                    className="block h-full rounded-full"
                    style={{ width: r.spend, background: `linear-gradient(90deg, ${visual.cyan}, ${visual.indigo})` }}
                  />
                </span>

                <span className="w-[4.75rem] shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  {r.funded}
                </span>
              </Slab>
            ))}
          </div>

          {/* Run total — the focal element. */}
          <div className="mt-auto flex items-end justify-between border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
            <div>
              <Stat size={26}>$6,700.00</Stat>
              <div className="mt-1.5"><SubLabel>Funded instantly · real-time spend</SubLabel></div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
