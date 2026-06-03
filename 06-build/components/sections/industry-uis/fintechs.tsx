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
  Arrow,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Fintechs — "What you can build" surfaces ────────────────────────────────
//
// Three distinct bespoke product surfaces for /industries/fintechs §4, one per
// build row, each mapping to its copy and sharing nothing with the others or
// with the product-page UIs. Composed on the canonical product-illustration kit
// (IllustrationField + IllustrationCard + atoms — design-system.md §8.1):
//
//   0. Card program go-live  — issuance timeline + a virtual card object
//                              ("Launch a card program in weeks").
//   1. Embedded credit       — in-app checkout with a credit widget
//                              ("Embed lending into your product").
//   2. Corridor router       — cross-border routing table
//                              ("Go cross-border without new integrations").
//
// Tokens only; THEME-AWARE; static at rest → milestones/checks/routes reveal one
// by one on scroll-in (replayed on hover) via useSequentialReveal; reduced-motion
// safe. Neutral data — no real third-party brands. One focal element per surface.

// ── 0 · Card program go-live ────────────────────────────────────────────────
//
// Focal: the electric-violet virtual card object. The go-live milestones tick
// in one by one (each a GlowCheck popping in) beneath it.

const CARD_FACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.65)}, transparent 56%),` +
  `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`;
const CARD_TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.75)} 50%, transparent)`;

const GO_LIVE = [
  { wk: "Wk 1", label: "Integrate APIs" },
  { wk: "Wk 2", label: "KYC + program approved" },
  { wk: "Wk 4", label: "Cards minted + tokenized" },
  { wk: "Wk 6", label: "Live in production" },
] as const;

export function CardProgramUI() {
  const { ref, n, bind } = useSequentialReveal(GO_LIVE.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Card program</Eyebrow>
            <LiveTag>6 weeks</LiveTag>
          </div>

          {/* The virtual card object — straight, no brand wordmark (the focal). */}
          <div className="mt-3">
            <div
              className="relative aspect-[1.74/1] w-[52%] max-w-[13rem] overflow-hidden rounded-[13px] p-3 ring-1 ring-inset ring-white/15"
              style={{
                background: CARD_FACE,
                boxShadow: `0 22px 42px -12px ${withAlpha(visual.purple, 0.6)}, 0 0 30px ${withAlpha(visual.violet, 0.32)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: CARD_TOP_EDGE }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Virtual</span>
                <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.16em] text-white/90">•••• 4921</div>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-display text-[11px] font-semibold tracking-tight text-white">CREDIT</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">tokenized</span>
              </div>
            </div>
          </div>

          {/* Go-live timeline — each milestone's check pops in on the beat. */}
          <div ref={ref} {...bind} className="mt-auto pt-3">
            <div className="mb-2">
              <SubLabel>Program go-live</SubLabel>
            </div>
            <div className="flex flex-col gap-[7px]">
              {GO_LIVE.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span
                    className={
                      "inline-flex transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] " +
                      (n > i ? "scale-100 opacity-100" : "scale-50 opacity-0")
                    }
                  >
                    <GlowCheck size={16} />
                  </span>
                  <span className="font-mono text-[9px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                    {s.wk}
                  </span>
                  <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 1 · Embedded credit checkout ─────────────────────────────────────────────
//
// An in-app checkout with an embedded credit widget. Focal: the "Approved"
// verdict (a glowing check + gradient stamp). The four installment slabs build
// in one by one on the beat.

const INSTALLMENTS: [string, string][] = [
  ["$300", "today"],
  ["$300", "wk 2"],
  ["$300", "wk 4"],
  ["$300", "wk 6"],
];

export function EmbeddedCreditUI() {
  const { ref, n, bind } = useSequentialReveal(INSTALLMENTS.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-[18px] sm:px-[22px]">
          {/* Host-app checkout chrome cue. */}
          <div
            className="flex items-center justify-between border-b pb-2.5"
            style={{ borderColor: withAlpha(visual.primary, 0.12) }}
          >
            <Eyebrow>Your app · checkout</Eyebrow>
            <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
              $1,200
            </span>
          </div>

          {/* Embedded plan selector + installment schedule. */}
          <div className="mt-3.5">
            <div className="flex items-center gap-1.5">
              <span
                className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white"
                style={{ background: visual.purple }}
              >
                Pay in 4
              </span>
              <span className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-secondary ring-1 ring-inset ring-white/40 dark:text-text-dark-secondary dark:ring-white/10">
                Revolving
              </span>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-accent-teal dark:text-accent-cyan">
                0% APR
              </span>
            </div>

            <div ref={ref} {...bind} className="mt-3 grid grid-cols-4 gap-1.5">
              {INSTALLMENTS.map(([amt, when], i) => (
                <Slab
                  key={i}
                  className="px-1 py-2 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
                >
                  <div className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                    {amt}
                  </div>
                  <div className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                    {when}
                  </div>
                </Slab>
              ))}
            </div>
          </div>

          {/* Decision verdict — the one focal element. */}
          <div className="mt-auto pt-3.5">
            <div
              className="flex items-center justify-between rounded-[11px] px-3 py-2.5"
              style={{
                background: `linear-gradient(90deg, ${withAlpha(visual.cyan, 0.12)}, ${withAlpha(visual.violet, 0.08)})`,
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}`,
              }}
            >
              <span className="inline-flex items-center gap-2.5">
                <GlowCheck size={22} />
                <Stat size={17}>Approved</Stat>
              </span>
              <SubLabel>280 ms · $2,500 limit</SubLabel>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Cross-border corridor router ─────────────────────────────────────────
//
// An active-routes table. Focal: the live corridor count Stat. Each route slides
// in one by one on the beat; a cyan node + arrow carries the AED → currency flow.

const CORRIDORS = [
  { from: "AED", to: "USD", rail: "Visa Direct", time: "~12 sec" },
  { from: "AED", to: "EUR", rail: "SEPA Instant", time: "~1 min" },
  { from: "AED", to: "PKR", rail: "Local rail", time: "instant" },
  { from: "AED", to: "INR", rail: "UPI", time: "instant" },
] as const;

export function CorridorRouterUI() {
  const { ref, n, bind } = useSequentialReveal(CORRIDORS.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-[18px] sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Active corridors</Eyebrow>
            <LiveTag>Live</LiveTag>
          </div>

          {/* Focal — live corridor count. */}
          <div className="mt-3 flex items-end gap-2.5">
            <Stat size={34}>4</Stat>
            <span className="mb-1">
              <SubLabel>routes · one integration</SubLabel>
            </span>
          </div>

          {/* Routes assemble one by one. */}
          <div ref={ref} {...bind} className="mt-auto flex flex-col gap-1.5 pt-3.5">
            {CORRIDORS.map((c, i) => (
              <Slab
                key={c.to}
                className="flex items-center gap-2 px-3 py-2 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
              >
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">
                  {c.from}
                  <Arrow width={16} />
                  {c.to}
                </span>
                <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.08em] text-text-secondary sm:inline dark:text-text-dark-secondary">
                  {c.rail}
                </span>
                <span className="font-mono text-[9px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                  {c.time}
                </span>
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: visual.cyan, boxShadow: `0 0 7px ${visual.cyan}` }}
                  title="live"
                />
              </Slab>
            ))}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// Components are imported + arrayed by the server-side registry (./index.tsx).
// Do not export an array of elements/components for server indexing — see the
// RSC boundary note there.
