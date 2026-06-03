"use client";

import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  Slab,
  GlowCheck,
  ControlChip,
  Toggle,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Retail & Marketplaces — "What you can build" surfaces ────────────────────
//
// Four distinct bespoke product surfaces for /industries/retail-marketplaces §4,
// one per build row, each mapping to its copy and sharing nothing with the
// others, the product-page UIs, or the fintechs exemplar. All four are composed
// on the canonical product-illustration kit (design-system.md §8.1) —
// IllustrationField + IllustrationCard + atoms — so the literal surfaces share
// the hero's lit, dimensional world. Each keeps its distinct story; only the
// frame + atom vocabulary changed in the migration.
//
//   0. Co-branded loyalty card  — a co-branded card object over a points/rewards
//                                 ledger + tier progress ("Co-branded and loyalty
//                                 cards … with integrated points"). Focal = card.
//   1. Checkout BNPL schedule   — a POS checkout split with the installment
//                                 SCHEDULE laid out as a dated strip ("Embed
//                                 point-of-sale financing … with configurable
//                                 installments"). Focal = the "Approved" verdict.
//   2. Gift program manager     — physical + virtual gift card objects with a
//                                 closed/open-loop toggle and a denominations
//                                 grid ("Branded gift card programs, physical and
//                                 virtual, closed-loop and open-loop").
//   3. Seller payout run        — a disbursement run to marketplace recipients
//                                 with per-recipient spend controls + real-time
//                                 settlement ("Payout cards and accounts … with
//                                 real-time disbursement, spend controls"). Focal
//                                 = the settled run total Stat.
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. Items build in one-by-one via
// useSequentialReveal + PopIn; reduced-motion safe. Neutral data — no real
// third-party brands.

// ── 0 · Co-branded loyalty card + points ledger ──────────────────────────────
//
// Focal: the co-branded card object. The earn rows build in one by one beneath
// it, then the tier-progress slab resolves.

const CARD_FACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.6)}, transparent 56%),` +
  `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`;
const CARD_TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.75)} 50%, transparent)`;

const EARN: { at: string; pts: string; w: string }[] = [
  { at: "In-store purchase", pts: "+240", w: "100%" },
  { at: "Online order", pts: "+165", w: "70%" },
  { at: "App reorder", pts: "+90", w: "40%" },
];

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(EARN.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Loyalty program</Eyebrow>
            <LiveTag>Points linked</LiveTag>
          </div>

          {/* Co-branded card object — the focal. Straight, no brand wordmark. */}
          <div className="mt-2.5">
            <div
              className="relative aspect-[1.74/1] w-[50%] max-w-[12.5rem] overflow-hidden rounded-[13px] p-3 ring-1 ring-inset ring-white/15"
              style={{
                background: CARD_FACE,
                boxShadow: `0 22px 42px -12px ${withAlpha(visual.purple, 0.6)}, 0 0 30px ${withAlpha(visual.violet, 0.3)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: CARD_TOP_EDGE }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Co-branded</span>
                <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.16em] text-white/90">•••• 3160</div>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-display text-[11px] font-semibold tracking-tight text-white">REWARDS</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">8,420 pts</span>
              </div>
            </div>
          </div>

          {/* Points ledger — earn rows build in one by one; tier progress resolves. */}
          <div ref={ref} {...bind} className="mt-auto pt-3">
            <div className="mb-1.5">
              <SubLabel>Points earned</SubLabel>
            </div>
            <div className="flex flex-col gap-1.5">
              {EARN.map((e, i) => (
                <div
                  key={e.at}
                  className="flex items-center gap-2.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
                >
                  <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                    {e.at}
                  </span>
                  <span className="relative hidden h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-text-primary/10 sm:block dark:bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: e.w, background: `linear-gradient(90deg, ${visual.cyan}, ${visual.indigo})` }}
                    />
                  </span>
                  <span className="w-12 shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-accent-indigo dark:text-accent-cyan">
                    {e.pts}
                  </span>
                </div>
              ))}
            </div>

            <Slab className="mt-2.5 flex items-center justify-between px-3 py-2">
              <SubLabel className="normal-case tracking-[0.1em]">Tier · Gold → Platinum</SubLabel>
              <span className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                1,580 to go
              </span>
            </Slab>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 1 · Checkout BNPL installment schedule ───────────────────────────────────
//
// A POS checkout split with the installment SCHEDULE laid out as a dated strip.
// Focal: the "Plan approved" verdict. The four installment nodes land in
// sequence (each check pops in), then the verdict resolves.

const INSTALLMENTS: { amt: string; when: string; paid: boolean }[] = [
  { amt: "62.50", when: "Today", paid: true },
  { amt: "62.50", when: "In 2 wk", paid: false },
  { amt: "62.50", when: "In 4 wk", paid: false },
  { amt: "62.50", when: "In 6 wk", paid: false },
];

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(INSTALLMENTS.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-[18px] sm:px-[22px]">
          {/* Checkout header — order total split into a plan. */}
          <div
            className="flex items-center justify-between border-b pb-2.5"
            style={{ borderColor: withAlpha(visual.primary, 0.12) }}
          >
            <Eyebrow>Checkout · point of sale</Eyebrow>
            <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
              $250.00
            </span>
          </div>

          {/* Plan summary — configurable installments. */}
          <div className="mt-3.5 flex items-center gap-1.5">
            <span
              className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white"
              style={{ background: visual.purple }}
            >
              4 payments
            </span>
            <span className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-secondary ring-1 ring-inset ring-white/40 dark:text-text-dark-secondary dark:ring-white/10">
              Every 2 wk
            </span>
            <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-accent-teal dark:text-accent-cyan">
              0% interest
            </span>
          </div>

          {/* Installment schedule strip — rail + nodes land in sequence. */}
          <div ref={ref} {...bind} className="relative mt-4">
            <span
              aria-hidden
              className="absolute left-[7%] right-[7%] top-[0.5rem] h-px"
              style={{ background: `linear-gradient(to right, ${visual.cyan}, ${withAlpha(visual.indigo, 0.3)})` }}
            />
            <div className="relative grid grid-cols-4 gap-1.5">
              {INSTALLMENTS.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <PopIn show={n > i}>
                    {p.paid ? (
                      <GlowCheck size={18} />
                    ) : (
                      <span
                        className="grid size-[18px] place-items-center rounded-full bg-white/80 dark:bg-white/10"
                        style={{ boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.4)}` }}
                      >
                        <span className="size-1.5 rounded-full" style={{ background: visual.indigo }} />
                      </span>
                    )}
                  </PopIn>
                  <span className="mt-2 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                    ${p.amt}
                  </span>
                  <span className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                    {p.when}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict — the one focal element. */}
          <div className="mt-auto pt-4">
            <div
              className="flex items-center justify-between rounded-[11px] px-3 py-2.5"
              style={{
                background: `linear-gradient(90deg, ${withAlpha(visual.cyan, 0.12)}, ${withAlpha(visual.violet, 0.08)})`,
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}`,
              }}
            >
              <span className="inline-flex items-center gap-2.5">
                <GlowCheck size={22} />
                <Stat size={17}>Plan approved</Stat>
              </span>
              <SubLabel>$62.50 today</SubLabel>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Gift card program manager ────────────────────────────────────────────
//
// A program-manager surface: a physical + a virtual gift card object side by
// side over a closed/open-loop toggle and a denominations grid. Two formats
// shown together. The denomination slabs build in one by one; the loop toggle
// flips on hover.

const DENOMS = ["$25", "$50", "$100", "$250"] as const;

const PHYSICAL_FACE = `linear-gradient(150deg, ${visual.indigo}, ${visual.navy})`;
const VIRTUAL_FACE = `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.9)}, ${visual.indigo} 60%, ${visual.navy})`;

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(DENOMS.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Gift program</Eyebrow>
            <LiveTag>Your brand</LiveTag>
          </div>

          {/* Two formats — physical + virtual gift card objects (straight). */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              { fmt: "Physical", face: PHYSICAL_FACE },
              { fmt: "Virtual", face: VIRTUAL_FACE },
            ].map((g) => (
              <div
                key={g.fmt}
                className="relative aspect-[1.62/1] overflow-hidden rounded-[11px] p-2.5 ring-1 ring-inset ring-white/15"
                style={{
                  background: g.face,
                  boxShadow: `0 14px 28px -12px ${withAlpha(visual.navy, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
                }}
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: CARD_TOP_EDGE }} />
                <span className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-white/75">{g.fmt}</span>
                <div className="mt-auto pt-3 font-display text-[13px] font-semibold tracking-tight text-white">Gift</div>
              </div>
            ))}
          </div>

          {/* Loop type toggle + denominations — configure the program. */}
          <div className="mt-auto pt-3.5">
            <div className="mb-2 flex items-center justify-between">
              <SubLabel>Program type</SubLabel>
              <span className="inline-flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-primary dark:text-text-dark-primary">
                  Closed
                </span>
                <Toggle on={false} hover />
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                  Open-loop
                </span>
              </span>
            </div>
            <div ref={ref} {...bind} className="grid grid-cols-4 gap-1.5">
              {DENOMS.map((d, i) => (
                <Slab
                  key={d}
                  className="px-1 py-2 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
                >
                  <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                    {d}
                  </span>
                </Slab>
              ))}
            </div>
            <div className="mt-2.5">
              <SubLabel className="normal-case tracking-[0.1em]">Physical + virtual · issued under your brand</SubLabel>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 3 · Seller payout run ────────────────────────────────────────────────────
//
// A marketplace disbursement run: recipients (sellers / gig workers / vendors)
// paid out in real time, each with a spend-control chip + a settled status. The
// recipient rows settle in one by one (check pops in). Focal: the settled run
// total Stat.

const RECIPIENTS: { name: string; ctrl: string; amt: string }[] = [
  { name: "Seller · store #4192", ctrl: "Online only", amt: "1,284.00" },
  { name: "Gig worker · driver", ctrl: "Daily cap", amt: "318.50" },
  { name: "Vendor · supplier", ctrl: "MCC-locked", amt: "2,940.00" },
];

export function Row4() {
  const { ref, n, bind } = useSequentialReveal(RECIPIENTS.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-[18px] sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Payout run · recipients</Eyebrow>
            <LiveTag>Real-time</LiveTag>
          </div>

          {/* Recipient rows — settle in one by one, each with a spend control. */}
          <div ref={ref} {...bind} className="mt-3 flex flex-col gap-2">
            {RECIPIENTS.map((r, i) => (
              <Slab key={r.name} className="flex items-center gap-2.5 px-3 py-2">
                <PopIn show={n > i}>
                  <GlowCheck size={18} />
                </PopIn>
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                    {r.name}
                  </div>
                  <SubLabel className="normal-case tracking-[0.1em]">{r.ctrl}</SubLabel>
                </div>
                <span className="ml-auto font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  {r.amt}
                </span>
              </Slab>
            ))}
          </div>

          {/* Settled run total — the one focal element. */}
          <div
            className="mt-auto flex items-end justify-between border-t pt-3"
            style={{ borderColor: withAlpha(visual.primary, 0.1) }}
          >
            <div>
              <Stat size={26}>4,542.50</Stat>
              <div className="mt-1.5">
                <SubLabel>USD · 3 settled</SubLabel>
              </div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// Components are imported + arrayed by the server-side registry (./index.tsx).
// Do not export an array of elements/components for server indexing — see the
// RSC boundary note there.
