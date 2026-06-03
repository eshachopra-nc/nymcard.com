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
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";
import { Reveal } from "./_shell";

// ── Telecommunications — "What you can build" surfaces ───────────────────────
//
// Four distinct bespoke product surfaces for /industries/telecommunications §4,
// one per build row, each mapping to its copy and sharing nothing with the
// others, the product-page UIs, or the other verticals (no go-live timeline,
// no corridor table, no generic "pay in 4" widget):
//
//   0. Branded cards    — a co-branded telco card object + a subscriber-linked
//                         issuance split (physical / virtual across the base).
//   1. Wallets          — a subscriber wallet surface topped up from the telco
//                         account, sending domestic & cross-border (no bank acct).
//   2. Device financing — a handset upgrade checkout with an installment plan
//                         embedded + an instant credit decision verdict.
//   3. Consumer lending — a revolving credit line in the telco app channel,
//                         utilization arc + an installment / revolving toggle.
//
// All four are composed on the canonical product-illustration kit
// (design-system.md §8.1) — IllustrationField + IllustrationCard + atoms — so the
// literal surfaces share the hero's lit, dimensional world. Each keeps its
// distinct story/data EXACTLY; only the frame + atom vocabulary changed in the
// migration. ONE focal element each; mono labels use the secondary tokens.
// Static at rest; natural one-by-one beats sequence in on scroll-in and replay
// on hover; reduced-motion shows the final state. Neutral data — no real
// third-party brands.

// ── 0 · Branded prepaid + co-branded cards ───────────────────────────────────
//
// Focal: the co-branded card object (telco wordmark cue, never tilted). The
// subscriber-linked issuance split (physical / virtual) assembles in one by one.

const ISSUE_SPLIT = [
  { kind: "Physical", note: "Co-branded · shipped", pct: 64, w: "64%" },
  { kind: "Virtual", note: "Instant · tokenized", pct: 36, w: "36%" },
] as const;

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(ISSUE_SPLIT.length, { step: 200, start: 320 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Card program</Eyebrow>
            <LiveTag>CRM-linked</LiveTag>
          </div>

          {/* Co-branded card object — the focal element, never tilted. */}
          <Reveal className="mt-3.5">
            <div
              className="relative aspect-[1.74/1] w-[58%] max-w-[15rem] overflow-hidden rounded-[10px] p-3.5"
              style={{
                background: `linear-gradient(150deg, ${visual.purple}, ${visual.navy} 60%, ${visual.navy})`,
                boxShadow: `0 18px 34px -14px ${withAlpha(visual.purple, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: withAlpha(visual.cyan, 0.45) }} />
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/75">
                  <span className="size-1.5 rounded-full" style={{ background: visual.cyan, boxShadow: `0 0 8px ${visual.cyan}` }} />
                  Telco
                </span>
                <span
                  className="size-4 rounded-[3px]"
                  style={{ background: `linear-gradient(150deg, ${withAlpha(visual.white, 0.8)}, ${withAlpha(visual.white, 0.3)})`, boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.3)}` }}
                />
              </div>
              <div className="mt-5 font-mono text-[12px] tracking-[0.12em] text-white/95">•••• •••• •••• 6310</div>
              <div className="mt-1.5 flex items-end justify-between">
                <span className="font-display text-[11px] font-semibold tracking-tight text-white">PREPAID</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">co-branded</span>
              </div>
            </div>
          </Reveal>

          {/* Subscriber-linked issuance split — bars assemble in one by one. */}
          <div className="mt-auto pt-3.5">
            <div className="mb-2.5">
              <SubLabel>Issued to subscriber base</SubLabel>
            </div>
            <div ref={ref} {...bind} className="flex flex-col gap-2.5">
              {ISSUE_SPLIT.map((s, i) => (
                <div
                  key={s.kind}
                  className="flex items-center gap-2.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
                >
                  <span className="w-14 shrink-0 text-[11px] font-semibold text-text-primary dark:text-text-dark-primary">
                    {s.kind}
                  </span>
                  <span
                    className="relative h-1.5 flex-1 overflow-hidden rounded-full"
                    style={{ background: withAlpha(visual.primary, 0.1) }}
                  >
                    <span
                      className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
                      style={{ width: n > i ? s.w : "0%", background: `linear-gradient(90deg, ${visual.cyan}, ${visual.indigo})` }}
                    />
                  </span>
                  <span className="hidden w-[6.75rem] shrink-0 text-right font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-secondary sm:block dark:text-text-dark-secondary">
                    {s.note}
                  </span>
                  <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                    {s.pct}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <SubLabel>Rewards + spend controls per program</SubLabel>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 1 · Subscriber wallet — domestic + cross-border ──────────────────────────
//
// A subscriber wallet (no bank account) funded from the telco account and
// sending on two legs. Focal: the wallet balance Stat. The top-up source and the
// two send legs (domestic / cross-border) assemble in one by one.

const WALLET_SENDS = [
  { to: "Send · domestic", rail: "Instant · local rail", amt: "120.00" },
  { to: "Send · cross-border", rail: "AED → PKR corridor", amt: "300.00" },
] as const;

export function Row2() {
  // Three beats: top-up, then the two send legs.
  const { ref, n, bind } = useSequentialReveal(1 + WALLET_SENDS.length, { step: 180, start: 320 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* Wallet header — balance Stat (focal) + no-bank-account cue. */}
          <div className="flex items-center justify-between">
            <Eyebrow>Subscriber wallet</Eyebrow>
            <LiveTag>No bank account</LiveTag>
          </div>
          <div className="mt-3">
            <SubLabel>AED balance</SubLabel>
            <div className="mt-1.5">
              <Stat size={30}>1,460.00</Stat>
            </div>
          </div>

          <div ref={ref} {...bind} className="mt-3.5 flex flex-col gap-1.5">
            {/* Top-up source — funded from the telco account. */}
            <Slab
              className="flex items-center justify-between px-3 py-2 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ opacity: n > 0 ? 1 : 0, transform: n > 0 ? "translateX(0)" : "translateX(-6px)" }}
            >
              <SubLabel className="normal-case tracking-[0.08em]">Top up · from telco account</SubLabel>
              <span className="font-mono text-[10px] font-semibold tabular-nums" style={{ color: visual.cyan }}>
                + 500.00
              </span>
            </Slab>

            {/* Two send legs — domestic + cross-border. */}
            {WALLET_SENDS.map((s, i) => (
              <Slab
                key={s.to}
                className="flex items-center gap-2.5 px-3 py-2 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ opacity: n > i + 1 ? 1 : 0, transform: n > i + 1 ? "translateX(0)" : "translateX(-6px)" }}
              >
                <PopIn show={n > i + 1}>
                  <GlowCheck size={16} />
                </PopIn>
                <div className="min-w-0">
                  <div className="truncate text-[11.5px] font-medium text-text-primary dark:text-text-dark-primary">
                    {s.to}
                  </div>
                  <SubLabel className="normal-case tracking-[0.06em]">{s.rail}</SubLabel>
                </div>
                <span className="ml-auto shrink-0 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
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

// ── 2 · Device financing — installments in the upgrade flow ──────────────────
//
// A handset upgrade checkout with an installment plan embedded directly in the
// purchase flow + an instant credit decision. Focal: the glowing "Credit
// approved" verdict. The 12-month plan schedule fills in one by one.

const PLAN_MONTHS = [
  { m: "Today", amt: "108.25" },
  { m: "Mo 1", amt: "108.25" },
  { m: "Mo 2", amt: "108.25" },
  { m: "Mo 3", amt: "108.25" },
] as const;

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(PLAN_MONTHS.length, { step: 130, start: 280 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* Upgrade flow chrome — device + price. */}
          <div className="flex items-center justify-between">
            <Eyebrow>Device upgrade</Eyebrow>
            <span className="font-mono text-[13px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
              AED 1,299
            </span>
          </div>
          <div className="mt-1">
            <SubLabel>Handset · 128 GB</SubLabel>
          </div>

          {/* Embedded installment plan — schedule fills in. */}
          <div
            className="mt-3.5 rounded-[12px] p-3"
            style={{ background: withAlpha(visual.indigo, 0.06), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.3)}` }}
          >
            <div className="flex items-center justify-between">
              <span
                className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white"
                style={{ background: visual.indigo }}
              >
                12-month plan
              </span>
              <SubLabel>on bill cycle</SubLabel>
            </div>
            <div ref={ref} {...bind} className="mt-3 grid grid-cols-4 gap-1.5">
              {PLAN_MONTHS.map((p, i) => (
                <Slab
                  key={p.m}
                  className="px-1 py-1.5 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
                >
                  <div className="font-mono text-[9.5px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                    {p.amt}
                  </div>
                  <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.06em] text-text-secondary dark:text-text-dark-secondary">
                    {p.m}
                  </div>
                </Slab>
              ))}
            </div>
          </div>

          {/* Instant credit decision — the focal verdict. */}
          <Reveal delay={0.7} className="mt-3.5">
            <div className="flex items-center gap-2.5 border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
              <GlowCheck size={24} />
              <div>
                <div className="text-[13px] font-semibold text-text-primary dark:text-text-dark-primary">Credit approved</div>
                <SubLabel>240 ms · in checkout</SubLabel>
              </div>
            </div>
          </Reveal>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 3 · Consumer lending — revolving line in the telco app ───────────────────
//
// A credit line launched inside the telco's own digital channel: a utilization
// arc + the available-credit Stat (focal). An installment / revolving mode pair
// assembles in below. Distinct from the BNPL widget — data-led, in-app credit.

const LIMIT = 5000;
const USED = 1850;
const UTIL = Math.round((USED / LIMIT) * 100); // 37

const MODES = [
  { name: "Installments", note: "Fixed term · 3–12 mo", on: true },
  { name: "Revolving", note: "Open line · drawn at will", on: false },
] as const;

export function Row4() {
  const { ref, n, bind } = useSequentialReveal(MODES.length, { step: 160, start: 360 });
  const R = 30;
  const CIRC = 2 * Math.PI * R;
  const filled = CIRC * (UTIL / 100);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center px-5 py-4 sm:px-[22px]">
          {/* Channel chrome — launched in the telco app. */}
          <div className="flex items-center justify-between">
            <Eyebrow>In your app · credit</Eyebrow>
            <LiveTag>Subscriber app</LiveTag>
          </div>

          <div className="mt-3.5 flex items-center gap-4">
            {/* Utilization arc — sweeps in on view. */}
            <Reveal className="relative shrink-0">
              <svg viewBox="0 0 72 72" className="size-[4.75rem] -rotate-90">
                <circle cx="36" cy="36" r={R} fill="none" strokeWidth="6.5" style={{ stroke: withAlpha(visual.primary, 0.12) }} />
                <circle
                  cx="36"
                  cy="36"
                  r={R}
                  fill="none"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  style={{ stroke: visual.cyan, strokeDasharray: CIRC, strokeDashoffset: CIRC - filled }}
                />
              </svg>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[16px] font-semibold tabular-nums leading-none text-text-primary dark:text-text-dark-primary">
                  {UTIL}%
                </span>
                <span className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                  used
                </span>
              </span>
            </Reveal>

            {/* Available credit — the focal Stat. */}
            <div className="min-w-0 flex-1">
              <SubLabel>Available to spend</SubLabel>
              <div className="mt-1">
                <Stat size={26}>AED 3,150</Stat>
              </div>
              <div className="mt-1.5 font-mono text-[9px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                of AED 5,000 limit · AED 1,850 drawn
              </div>
            </div>
          </div>

          {/* Two lending modes — installment / revolving, assemble in. */}
          <div ref={ref} {...bind} className="mt-auto grid grid-cols-2 gap-2 pt-3.5">
            {MODES.map((mode, i) => (
              <div
                key={mode.name}
                className="rounded-[10px] px-3 py-2.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  opacity: n > i ? 1 : 0,
                  transform: n > i ? "translateY(0)" : "translateY(6px)",
                  background: mode.on ? withAlpha(visual.indigo, 0.06) : withAlpha(visual.primary, 0.04),
                  boxShadow: `inset 0 0 0 1px ${withAlpha(mode.on ? visual.indigo : visual.primary, mode.on ? 0.3 : 0.12)}`,
                }}
              >
                <div className="text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">{mode.name}</div>
                <div className="mt-0.5">
                  <SubLabel className="normal-case tracking-[0.06em]">{mode.note}</SubLabel>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
