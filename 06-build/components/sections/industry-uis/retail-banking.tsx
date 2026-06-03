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
  Toggle,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";
import { Reveal } from "./_shell";

// ── Retail Banking — "What you can build" surfaces ──────────────────────────
//
// Three distinct bespoke product surfaces for /industries/retail-banking §4,
// one per build row, each mapping to its copy and sharing no layout archetype
// with the others, with the neobanks / commercial-banking siblings, or with the
// product-page UIs. Vertical context: established consumer banks modernising —
// the issued, in-use account+card+wallet a retail bank ships to a customer
// (not neobanks' from-scratch catalogue or checkout selector).
//
// All three are composed on the canonical product-illustration kit
// (design-system.md §8.1) — IllustrationField + IllustrationCard + atoms — so
// the literal surfaces share the hero's lit, dimensional world. Each keeps its
// distinct story EXACTLY; only the frame + atom vocabulary changed in the
// migration off ProductUIFrame / GlassBed / GlassSurface.
//
//   0. Debit program     — an ACCOUNT view: a linked deposit account header
//                          (focal available-balance Stat), the straight linked
//                          debit card object, and live spend-control toggles
//                          (freeze / ATM / online) that flip in one by one.
//   1. Credit & BNPL     — a STATEMENT: a revolving balance over a configurable
//                          billing cycle (focal balance Stat) with a utilisation
//                          bar, a BNPL pay-in-4 split that builds in, and a
//                          rewards line.
//   2. Digital wallet    — a BRANDED WALLET app screen: the focal wallet-balance
//                          Stat, a domestic / cross-border send pair, and a
//                          short in/out movement ledger that assembles in.
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. Neutral data — no real third-party brands;
// third-person voice.

// ── 0 · Debit program — account + linked card + spend controls ──────────────
//
// Focal: the linked account's available-balance Stat. The three spend-control
// toggles flip ON/settle in one by one on scroll-in / hover.

const CONTROLS = [
  { label: "Freeze card", state: "Off", on: false },
  { label: "ATM withdrawals", state: "Enabled", on: true },
  { label: "Online payments", state: "Enabled", on: true },
] as const;

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(CONTROLS.length, { step: 160, start: 260 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* Linked deposit account header — the focal available balance. */}
          <div className="flex items-center justify-between">
            <Eyebrow>Account · debit</Eyebrow>
            <LiveTag>Linked</LiveTag>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <SubLabel>Everyday account · available</SubLabel>
              <div className="mt-1.5">
                <Stat size={28}>$4,820.50</Stat>
              </div>
            </div>
            {/* Straight linked debit card object — electric-violet face, never tilted. */}
            <div
              className="relative aspect-[1.6/1] w-[6.4rem] shrink-0 overflow-hidden rounded-[10px] p-2.5"
              style={{
                background: `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`,
                boxShadow: `0 14px 30px -12px ${withAlpha(visual.purple, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: withAlpha(visual.cyan, 0.45)}} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/70">Debit</span>
                <span
                  className="size-3 rounded-[3px]"
                  style={{ background: withAlpha(visual.cyan, 0.2), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.5)}` }}
                />
              </div>
              <div className="mt-3 font-mono text-[8.5px] tracking-[0.12em] text-white/95">•••• 6610</div>
            </div>
          </div>

          {/* Real-time spend controls — toggles flip in one by one. */}
          <div className="mt-3.5 border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
            <div className="mb-2 flex items-center justify-between">
              <SubLabel>Spend controls</SubLabel>
              <SubLabel className="text-accent-teal dark:text-accent-cyan">Real-time</SubLabel>
            </div>
            <div ref={ref} {...bind} className="flex flex-col gap-1.5">
              {CONTROLS.map((c, i) => {
                // Settle to the control's final state once revealed; before that,
                // hold OFF so the enabled toggles visibly flip in.
                const settled = n > i;
                return (
                  <Slab key={c.label} className="flex items-center gap-2.5 px-3 py-2">
                    <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                      {c.label}
                    </span>
                    <span className="ml-auto">
                      <SubLabel>{settled ? c.state : "—"}</SubLabel>
                    </span>
                    <Toggle on={settled && c.on} />
                  </Slab>
                );
              })}
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 1 · Credit & BNPL — statement over a configurable billing cycle ─────────
//
// Focal: the revolving-balance Stat. The utilisation bar fills, then the four
// pay-in-4 installments build in one by one; a rewards line seals it.

const INSTALLMENTS: [string, string][] = [
  ["$300", "TODAY"],
  ["$300", "WK 2"],
  ["$300", "WK 4"],
  ["$300", "WK 6"],
];

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(INSTALLMENTS.length, { step: 130, start: 320 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* Statement chrome — configurable billing cycle. */}
          <div className="flex items-center justify-between">
            <Eyebrow>Credit statement · cycle 1–30</Eyebrow>
            <span
              className="whitespace-nowrap rounded-lg px-2 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-brand-purple dark:text-accent-violet"
              style={{ background: withAlpha(visual.purple, 0.12), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.purple, 0.3)}` }}
            >
              Revolving
            </span>
          </div>

          {/* Revolving balance — the one focal Stat — + utilisation bar. */}
          <Reveal delay={0.12}>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <Stat size={28}>$1,840</Stat>
                <div className="mt-1.5"><SubLabel>Balance · of $6,000 limit</SubLabel></div>
              </div>
              <span className="font-mono text-[10px] tabular-nums text-accent-teal dark:text-accent-cyan">31% used</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ background: withAlpha(visual.primary, 0.1) }}>
              <span
                className="block h-full rounded-full"
                style={{ width: "31%", background: `linear-gradient(90deg, ${visual.cyan}, ${visual.primary})` }}
              />
            </div>
          </Reveal>

          {/* BNPL pay-in-4 split — installments build in one by one. */}
          <div className="mt-3.5 rounded-[11px] p-3" style={{ background: withAlpha(visual.purple, 0.05), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.purple, 0.22)}` }}>
            <div className="flex items-center gap-2">
              <span
                className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white"
                style={{ background: visual.purple }}
              >
                Pay in 4
              </span>
              <SubLabel>$1,200 purchase</SubLabel>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em] text-accent-teal dark:text-accent-cyan">0% APR</span>
            </div>
            <div ref={ref} {...bind} className="mt-2.5 grid grid-cols-4 gap-1.5">
              {INSTALLMENTS.map(([amt, when], i) => (
                <Slab
                  key={when}
                  className="py-1.5 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
                >
                  <div className="font-mono text-[10.5px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">{amt}</div>
                  <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">{when}</div>
                </Slab>
              ))}
            </div>
          </div>

          {/* Rewards line. */}
          <Reveal delay={0.55}>
            <Slab className="mt-3 flex items-center gap-2.5 px-3 py-2">
              <PopIn show>
                <GlowCheck size={16} />
              </PopIn>
              <span className="text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">Rewards earned</span>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                2,480 pts · this cycle
              </span>
            </Slab>
          </Reveal>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Digital wallet — branded wallet app screen ──────────────────────────
//
// Focal: the wallet-balance Stat. A domestic / cross-border send pair, then a
// short in/out movement ledger that assembles in one by one.

const MOVEMENTS: { dir: "in" | "out"; label: string; meta: string; amount: string }[] = [
  { dir: "in", label: "Salary deposit", meta: "Local · AED", amount: "+12,000.00" },
  { dir: "out", label: "Sent · cross-border", meta: "USD route", amount: "−480.00" },
  { dir: "in", label: "Refund", meta: "Local · AED", amount: "+64.20" },
];

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(MOVEMENTS.length, { step: 150, start: 360 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* Branded wallet chrome — "deployable under your brand". */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <span
                className="grid size-5 place-items-center rounded-md"
                style={{ background: `linear-gradient(150deg, ${visual.indigo}, ${visual.navy})` }}
              >
                <span className="size-2 rounded-[2px]" style={{ background: `linear-gradient(150deg, ${visual.cyan}, ${visual.primary})` }} />
              </span>
              <Eyebrow>Your wallet</Eyebrow>
            </span>
            <LiveTag>White-label</LiveTag>
          </div>

          {/* Wallet balance — the one focal Stat. */}
          <div className="mt-2.5">
            <SubLabel>Wallet balance</SubLabel>
            <div className="mt-1">
              <Stat size={27}>AED 31,540.20</Stat>
            </div>
          </div>

          {/* Send action — domestic / cross-border capability pair. */}
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <div
              className="flex items-center justify-center rounded-[10px] py-2 text-[11px] font-semibold text-white"
              style={{ background: `linear-gradient(150deg, ${visual.indigo}, ${visual.navy})` }}
            >
              Send local
            </div>
            <Slab className="flex items-center justify-center py-2 text-[11px] font-semibold text-accent-teal dark:text-accent-cyan">
              Cross-border
            </Slab>
          </div>

          {/* Recent movement ledger — rows assemble in one by one. */}
          <div className="mt-3 border-t pt-2.5" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
            <div className="mb-1.5"><SubLabel>Recent activity</SubLabel></div>
            <div ref={ref} {...bind} className="flex flex-col gap-1.5">
              {MOVEMENTS.map((m, i) => {
                const inbound = m.dir === "in";
                return (
                  <Slab
                    key={m.label}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
                  >
                    <span
                      className="grid size-5 shrink-0 place-items-center rounded-full"
                      style={{
                        background: inbound ? withAlpha(visual.cyan, 0.16) : withAlpha(visual.indigo, 0.16),
                        color: inbound ? visual.cyan : visual.indigo,
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {inbound ? <path d="M17 7 7 17M7 7v10h10" /> : <path d="M7 17 17 7M17 17V7H7" />}
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[11.5px] font-medium text-text-primary dark:text-text-dark-primary">{m.label}</div>
                      <SubLabel className="normal-case tracking-[0.1em]">{m.meta}</SubLabel>
                    </div>
                    {inbound ? (
                      <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums" style={{ color: visual.cyan }}>
                        {m.amount}
                      </span>
                    ) : (
                      <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                        {m.amount}
                      </span>
                    )}
                  </Slab>
                );
              })}
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
