"use client";

import { Fuel, Wrench, Receipt } from "lucide-react";
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
  Toggle,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Mobility — "What you can build" surfaces ────────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/mobility §4, one per
// build row, each mapping tightly to its copy and sharing nothing with the
// others, with the fintechs surfaces, or with the product-page UIs. All four
// are composed on the canonical product-illustration kit (design-system.md
// §8.1) — IllustrationField + IllustrationCard + atoms — so the literal
// surfaces share the hero's lit, dimensional world. Each keeps its distinct
// story; only the frame + atom vocabulary changed in the migration.
//
//   Row1. Driver payouts    — a live payout ledger: trips/shifts complete →
//          instant disbursement to each driver's card. Focal = the run total.
//   Row2. Fleet cards       — an electric-violet fleet card object + per-
//          category spend controls (fuel / maintenance / ops). Focal = card.
//   Row3. Auto financing    — a dealer-linked lease schedule with an
//          amortization stat + repayment rows. Focal = principal repaid Stat.
//   Row4. Customer programs — a branded prepaid wallet object + rewards
//          balance. Focal = the prepaid card object.
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. Neutral data — generic "Driver" / "Fleet
// ops", no real brands. Reveals one-by-one via useSequentialReveal + PopIn;
// reduced-motion safe.

// Electric-violet card finish — the standout object material (straight, no
// real wordmark). Shared by the fleet card (Row2) and the prepaid card (Row4).
const CARD_FACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.65)}, transparent 56%),` +
  `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`;
const CARD_TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.75)} 50%, transparent)`;

// ── Row1 · Driver and contractor payouts ────────────────────────────────────
//
// A live instant-disbursement feed: each trip/shift clears to the driver's
// card (a GlowCheck pops in one by one), then the run total resolves as the
// single focal element.

const PAYOUTS: { id: string; trip: string; amt: string }[] = [
  { id: "Driver · 8841", trip: "Trip complete", amt: "$24.60" },
  { id: "Courier · 2207", trip: "Shift settled", amt: "$118.40" },
  { id: "Driver · 5193", trip: "Trip complete", amt: "$17.85" },
  { id: "Contractor · 6620", trip: "Batch settled", amt: "$342.00" },
];

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(PAYOUTS.length, { amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Instant disbursement</Eyebrow>
            <LiveTag>Real-time</LiveTag>
          </div>

          {/* Payout feed — each clears to the driver's card (check pops in).
              Single-line rows keep all four payouts AND the focal total in frame. */}
          <div ref={ref} {...bind} className="mt-3 flex flex-col gap-1.5">
            {PAYOUTS.map((p, i) => (
              <Slab key={p.id} className="flex items-center gap-2.5 px-3 py-1.5">
                <PopIn show={n > i}>
                  <GlowCheck size={16} />
                </PopIn>
                <span className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                  {p.id}
                </span>
                <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-secondary sm:inline dark:text-text-dark-secondary">
                  {p.trip}
                </span>
                <span className="ml-auto font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  {p.amt}
                </span>
              </Slab>
            ))}
          </div>

          {/* Run total — the focal element. */}
          <div
            className="mt-auto flex items-end justify-between border-t pt-2.5"
            style={{ borderColor: withAlpha(visual.primary, 0.1) }}
          >
            <div>
              <Stat size={24}>$502.85</Stat>
              <div className="mt-1.5"><SubLabel>4 payouts · settled ~2 sec</SubLabel></div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row2 · Fleet and expense cards ──────────────────────────────────────────
//
// Focal: the electric-violet fleet card object. The per-category spend
// controls settle in one by one beneath it — each OFF toggle flips ON on the
// beat, the last category held off to show a configurable control.

const FLEET_CONTROLS: { icon: typeof Fuel; label: string; limit: string; on: boolean }[] = [
  { icon: Fuel, label: "Fuel", limit: "$600 / wk", on: true },
  { icon: Wrench, label: "Maintenance", limit: "$1,200 / mo", on: true },
  { icon: Receipt, label: "Operational", limit: "$300 / wk", on: false },
];

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(FLEET_CONTROLS.length, { step: 180, start: 320, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Fleet card · per vehicle</Eyebrow>
            <LiveTag>Controls live</LiveTag>
          </div>

          {/* Fleet card object — straight, electric finish, no real wordmark (focal). */}
          <div className="mt-2.5">
            <div
              className="relative aspect-[1.74/1] w-[47%] max-w-[11.5rem] overflow-hidden rounded-[12px] p-2.5 ring-1 ring-inset ring-white/15"
              style={{
                background: CARD_FACE,
                boxShadow: `0 22px 42px -12px ${withAlpha(visual.purple, 0.6)}, 0 0 30px ${withAlpha(visual.violet, 0.32)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: CARD_TOP_EDGE }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Fleet ops</span>
                <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
              </div>
              <div className="mt-2.5 font-mono text-[10px] tracking-[0.16em] text-white/90">•••• 7042</div>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-display text-[10px] font-semibold tracking-tight text-white">VEHICLE 12</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">active</span>
              </div>
            </div>
          </div>

          {/* Per-category spend controls — each toggle flips on, one by one. */}
          <div ref={ref} {...bind} className="mt-auto flex flex-col gap-1.5 pt-2.5">
            <div className="mb-0.5">
              <SubLabel>Category controls</SubLabel>
            </div>
            {FLEET_CONTROLS.map((c, i) => {
              const Icon = c.icon;
              // The two "on" categories flip on as their beat lands; the third
              // stays off to show a configurable, per-category control.
              const settled = c.on && n > i;
              return (
                <Slab key={c.label} className="flex items-center gap-2.5 px-3 py-1.5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-navy/[0.06] dark:bg-white/10">
                    <Icon aria-hidden className="size-3 text-brand-navy dark:text-accent-cyan" strokeWidth={2} />
                  </span>
                  <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{c.label}</span>
                  <span className="ml-auto font-mono text-[9px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                    {c.limit}
                  </span>
                  <Toggle on={settled} />
                </Slab>
              );
            })}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row3 · Auto and vehicle financing ───────────────────────────────────────
//
// A dealer-linked lease schedule. Focal: the principal-repaid Stat. The
// amortization bar fills, then the repayment rows tick in one by one (each
// paid installment's check pops on; the upcoming ones hold as ControlChip-less
// dotted markers).

const SCHEDULE: { n: string; due: string; amt: string; done: boolean }[] = [
  { n: "01", due: "Paid", amt: "$840.00", done: true },
  { n: "02", due: "Paid", amt: "$840.00", done: true },
  { n: "03", due: "Due Jun", amt: "$840.00", done: false },
  { n: "04", due: "Sep", amt: "$840.00", done: false },
];

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(SCHEDULE.length, { step: 170, start: 360, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-start justify-between gap-3">
            <Eyebrow>Vehicle acquisition · 36-mo lease</Eyebrow>
            <span
              className="shrink-0 whitespace-nowrap rounded-lg px-2 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan"
              style={{ background: withAlpha(visual.primary, 0.1) }}
            >
              Installments
            </span>
          </div>

          {/* Principal repaid — the focal element + amortization bar. */}
          <div className="mt-3.5">
            <div className="flex items-end justify-between">
              <Stat size={26}>$10,080</Stat>
              <span className="mb-1 font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                of $30,240
              </span>
            </div>
            <div className="mt-2"><SubLabel>Principal repaid · dealer-linked</SubLabel></div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-navy/[0.08] dark:bg-white/10">
              <span
                className="block h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width: n > 0 ? "33%" : "0%",
                  background: `linear-gradient(90deg, ${visual.primary}, ${visual.cyan})`,
                }}
              />
            </div>
          </div>

          {/* Repayment schedule — each row reveals, paid checks pop in. */}
          <div ref={ref} {...bind} className="mt-auto flex flex-col gap-1.5 pt-3.5">
            {SCHEDULE.map((s, i) => (
              <Slab
                key={s.n}
                className="flex items-center gap-2.5 px-3 py-1.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
              >
                <span className="font-mono text-[9px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                  {s.n}
                </span>
                {s.done ? (
                  <PopIn show={n > i}>
                    <GlowCheck size={16} />
                  </PopIn>
                ) : (
                  <span
                    className="size-4 shrink-0 rounded-full"
                    style={{ boxShadow: `inset 0 0 0 1px ${withAlpha(visual.primary, 0.4)}` }}
                  />
                )}
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                  {s.due}
                </span>
                <span className="ml-auto font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  {s.amt}
                </span>
              </Slab>
            ))}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row4 · Customer payment programs ────────────────────────────────────────
//
// Focal: the branded prepaid card object. A balance reads beside it, and the
// rewards tiles accrue in one by one beneath (each pops in on the beat).

const REWARDS: { label: string; amt: string }[] = [
  { label: "Ride", amt: "+$6" },
  { label: "Refer", amt: "+$4" },
  { label: "Top-up", amt: "+$2" },
];

export function Row4() {
  const { ref, n, bind } = useSequentialReveal(REWARDS.length, { step: 160, start: 360, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Wallet · prepaid</Eyebrow>
            <LiveTag>Branded</LiveTag>
          </div>

          {/* Balance + branded prepaid card object (the focal). */}
          <div className="mt-3.5 flex items-center gap-3.5">
            <div className="min-w-0">
              <SubLabel>Available balance</SubLabel>
              <div className="mt-1 font-display text-[22px] font-semibold tabular-nums leading-none text-text-primary dark:text-text-dark-primary">
                $248.50
              </div>
            </div>
            <div
              className="relative ml-auto aspect-[1.74/1] w-[8.5rem] shrink-0 overflow-hidden rounded-[12px] p-2.5 ring-1 ring-inset ring-white/15"
              style={{
                background: CARD_FACE,
                boxShadow: `0 22px 42px -12px ${withAlpha(visual.purple, 0.6)}, 0 0 30px ${withAlpha(visual.violet, 0.32)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: CARD_TOP_EDGE }} />
              <span className="size-3.5 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
              <div className="mt-3.5 font-mono text-[9px] tracking-[0.14em] text-white/90">•••• 3318</div>
              <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/55">prepaid</div>
            </div>
          </div>

          {/* Rewards strip — earned balance accrues, tiles pop in one by one. */}
          <div ref={ref} {...bind} className="mt-auto pt-3.5">
            <Slab className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                  Rewards earned
                </span>
                <span className="font-mono text-[12px] font-semibold tabular-nums text-accent-teal dark:text-accent-cyan">
                  +$12.40
                </span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {REWARDS.map((r, i) => (
                  <div
                    key={r.label}
                    className="rounded-md px-1 py-1.5 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      opacity: n > i ? 1 : 0,
                      transform: n > i ? "translateY(0)" : "translateY(6px)",
                      background: withAlpha(visual.cyan, 0.08),
                      boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.22)}`,
                    }}
                  >
                    <div className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                      {r.label}
                    </div>
                    <div className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                      {r.amt}
                    </div>
                  </div>
                ))}
              </div>
            </Slab>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
