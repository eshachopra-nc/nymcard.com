"use client";

import { motion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
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
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";
import { useReveal } from "./_shell";

// ── Commercial Banking — "What you can build" surfaces ──────────────────────
//
// Four distinct bespoke product surfaces for /industries/commercial-banking §4,
// one per build row, each mapping to its copy and sharing no layout archetype
// with the others, with the fintechs exemplar, or with the product-page UIs.
// Vertical context: corporate / B2B banking — treasury + spend management.
// All four are composed on the canonical product-illustration kit
// (design-system.md §8.1) — IllustrationField + IllustrationCard + atoms — so
// the literal surfaces share the hero's lit, dimensional world. Each keeps its
// distinct story EXACTLY; only the frame + atom vocabulary changed.
//
//   0. Corporate cards     — a corporate card object (focal) + a spend-control
//                            panel (per card / team / category limits + usage).
//   1. Cross-border        — a supplier payment composer: source → FX → payout,
//                            domestic + international rails on one platform.
//   2. Embedded credit     — a working-capital credit-line gauge (focal) + draws.
//   3. Reporting / recon   — an auto-reconciliation match table across the
//                            program (cards · payments · credit).
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. Neutral data — no real third-party brands.

// ── 0 · Corporate cards — spend-control panel ───────────────────────────────
//
// Focal: the corporate card object (straight, no wordmark). The spend-control
// rows build in one by one; each utilisation bar fills once on scroll-in.

const CARD_FACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.6)}, transparent 56%),` +
  `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`;
const CARD_TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.75)} 50%, transparent)`;

const CONTROLS = [
  { scope: "Per card", limit: "$5,000", used: 62, type: "Physical" },
  { scope: "Marketing team", limit: "$40,000", used: 48, type: "Virtual" },
  { scope: "Travel category", limit: "$12,000", used: 81, type: "Tokenized" },
] as const;

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(CONTROLS.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Spend controls</Eyebrow>
            <LiveTag>Real-time</LiveTag>
          </div>

          {/* The corporate card object — straight, no brand wordmark (focal). */}
          <div className="mt-3">
            <div
              className="relative aspect-[1.74/1] w-[52%] max-w-[13rem] overflow-hidden rounded-[13px] p-3 ring-1 ring-inset ring-white/15"
              style={{
                background: CARD_FACE,
                boxShadow: `0 22px 42px -12px ${withAlpha(visual.purple, 0.6)}, 0 0 30px ${withAlpha(visual.violet, 0.3)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: CARD_TOP_EDGE }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Corporate</span>
                <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.16em] text-white/90">•••• 2048</div>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-display text-[11px] font-semibold tracking-tight text-white">TREASURY</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">virtual</span>
              </div>
            </div>
          </div>

          {/* Spend-control rows — limit + live utilisation bar per scope. */}
          <div ref={ref} {...bind} className="mt-auto pt-3">
            <div className="mb-2">
              <SubLabel>Active limits</SubLabel>
            </div>
            <div className="flex flex-col gap-2.5">
              {CONTROLS.map((c, i) => (
                <div
                  key={c.scope}
                  className="flex flex-col gap-1 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{c.scope}</span>
                    <span className="rounded-md px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-secondary ring-1 ring-inset ring-white/40 dark:text-text-dark-secondary dark:ring-white/10">
                      {c.type}
                    </span>
                    <span className="ml-auto font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                      {c.limit}
                    </span>
                  </div>
                  <BarMeter pct={c.used} on={n > i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

/** Utilisation bar — fills when its row reveals. Cyan field, no warm tones. */
function BarMeter({ pct, on }: { pct: number; on: boolean }) {
  const reduced = useReveal();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${visual.cyan}, ${visual.primary})`, ...(reduced ? { width: `${pct}%` } : {}) }}
        initial={reduced ? false : { width: 0 }}
        animate={reduced ? undefined : { width: on ? `${pct}%` : 0 }}
        transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out }}
      />
    </div>
  );
}

// ── 1 · Cross-border — supplier payment composer ────────────────────────────
//
// Focal: the glowing "Routed" verdict. Source → FX → recipient legs build in
// one by one on a vertical payment rail (USD operating account → AED supplier).

export function Row2() {
  // 3 legs (From · FX bridge · To) + the verdict stamp = 4 beats.
  const { ref, n, bind } = useSequentialReveal(4);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Supplier payout</Eyebrow>
            <LiveTag>FX built in</LiveTag>
          </div>

          {/* Source → FX → recipient — a vertical payment rail. */}
          <div ref={ref} {...bind} className="mt-3.5 flex flex-col">
            <PayLeg role="From" title="Operating account" meta="USD · domestic ledger" amount="$48,000.00" show={n > 0} />
            <FxBridge rate="3.6725" pair="USD → AED" show={n > 1} />
            <PayLeg role="To" title="Supplier · Gulf Mfg" meta="AED · international rail" amount="176,280.00" accent show={n > 2} />
          </div>

          {/* Settlement verdict — the one focal element. */}
          <div
            className="mt-auto flex items-center justify-between rounded-[11px] px-3 py-2.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              opacity: n > 3 ? 1 : 0,
              transform: n > 3 ? "translateY(0)" : "translateY(6px)",
              background: `linear-gradient(90deg, ${withAlpha(visual.cyan, 0.12)}, ${withAlpha(visual.indigo, 0.08)})`,
              boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}`,
            }}
          >
            <span className="inline-flex items-center gap-2.5">
              <GlowCheck size={22} />
              <Stat size={17}>Routed</Stat>
            </span>
            <SubLabel>One platform · no stitching</SubLabel>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

function PayLeg({
  role,
  title,
  meta,
  amount,
  accent,
  show,
}: {
  role: string;
  title: string;
  meta: string;
  amount: string;
  accent?: boolean;
  show: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-[11px] px-3 py-2 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(6px)",
        ...(accent
          ? { background: withAlpha(visual.cyan, 0.07), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.32)}` }
          : { background: withAlpha(visual.white, 0.55), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.6)}` }),
      }}
    >
      <span className="w-7 shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
        {role}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{title}</div>
        <SubLabel className="normal-case tracking-[0.08em]">{meta}</SubLabel>
      </div>
      <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
        {amount}
      </span>
    </div>
  );
}

function FxBridge({ rate, pair, show }: { rate: string; pair: string; show: boolean }) {
  return (
    <div
      className="flex items-center gap-2 py-1.5 pl-9 transition-opacity duration-300"
      style={{ opacity: show ? 1 : 0 }}
    >
      <span className="h-4 w-px" style={{ background: withAlpha(visual.cyan, 0.4) }} aria-hidden />
      <Slab className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em]">
        <span className="text-accent-teal dark:text-accent-cyan">{pair}</span>
        <span className="size-1 rounded-full bg-text-muted/40" aria-hidden />
        <span className="tabular-nums text-text-primary dark:text-text-dark-primary">{rate}</span>
      </Slab>
    </div>
  );
}

// ── 2 · Embedded credit — working-capital credit-line gauge ─────────────────
//
// Focal: the radial utilisation gauge (75% drawn of a $1.0M facility). The draw
// ledger (installments · revolving · working capital) builds in one by one.

const DRAWS = [
  { label: "Installment plan", term: "12 mo", amount: "$120,000" },
  { label: "Revolving line", term: "Open", amount: "$60,000" },
  { label: "Working capital", term: "90 days", amount: "$70,000" },
] as const;

export function Row3() {
  const reduced = useReveal();
  const { ref, n, bind } = useSequentialReveal(DRAWS.length, { start: 520, step: 160 });
  // 75% drawn of a $1.0M facility — gauge arc fills once on scroll-in.
  const drawn = 0.75;
  const dash = 2 * Math.PI * 34; // r = 34

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <Eyebrow>Credit facility</Eyebrow>

          <div className="mt-3 flex items-center gap-4">
            {/* Radial utilisation gauge — the focal element. */}
            <div className="relative shrink-0">
              <svg viewBox="0 0 80 80" className="size-[5.25rem] -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" strokeWidth="7" className="stroke-text-primary/10 dark:stroke-white/10" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  strokeWidth="7"
                  strokeLinecap="round"
                  stroke={visual.cyan}
                  strokeDasharray={dash}
                  initial={reduced ? false : { strokeDashoffset: dash }}
                  whileInView={reduced ? undefined : { strokeDashoffset: dash * (1 - drawn) }}
                  viewport={{ once: true }}
                  transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.2 }}
                  style={reduced ? { strokeDashoffset: dash * (1 - drawn) } : undefined}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[16px] font-bold tabular-nums text-text-primary dark:text-text-dark-primary">75%</span>
                <SubLabel className="text-[7.5px]">drawn</SubLabel>
              </div>
            </div>

            {/* Facility summary. */}
            <div className="min-w-0 flex-1">
              <SubLabel>Business facility</SubLabel>
              <div className="mt-1 font-display text-[20px] font-bold tabular-nums text-text-primary dark:text-text-dark-primary">
                $1.0M
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-mono text-[10px] tabular-nums text-accent-teal dark:text-accent-cyan">$250K available</span>
                <span className="size-1 rounded-full bg-text-muted/40" aria-hidden />
                <span className="font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">14.2% APR</span>
              </div>
            </div>
          </div>

          {/* Draw ledger — credit lines, installments, working capital. */}
          <div ref={ref} {...bind} className="mt-auto pt-3">
            <div className="mb-2">
              <SubLabel>Drawn against facility</SubLabel>
            </div>
            <div className="flex flex-col gap-1.5">
              {DRAWS.map((d, i) => (
                <Slab
                  key={d.label}
                  className="flex items-center gap-2 px-3 py-1.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ background: visual.cyan, boxShadow: `0 0 7px ${visual.cyan}` }}
                    aria-hidden
                  />
                  <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{d.label}</span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                    {d.term}
                  </span>
                  <span className="w-[4.5rem] text-right font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                    {d.amount}
                  </span>
                </Slab>
              ))}
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 3 · Reporting / reconciliation — auto-match table ───────────────────────
//
// Focal: the program match-rate Stat. Each ledger row reconciles in one by one
// (matched rows pop a glowing check; the exception row pops a review marker).

const RECON = [
  { src: "Card · auth", ref: "TXN-40921", amount: "$5,240.00", matched: true },
  { src: "Supplier · payout", ref: "PAY-10238", amount: "$48,000.00", matched: true },
  { src: "Credit · draw", ref: "CR-00471", amount: "$70,000.00", matched: true },
  { src: "Card · refund", ref: "TXN-40930", amount: "−$320.00", matched: false },
] as const;

export function Row4() {
  const { ref, n, bind } = useSequentialReveal(RECON.length, { start: 520, step: 160 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          {/* Header — program scope + the focal match-rate Stat. */}
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>Program ledger</Eyebrow>
              <div className="mt-2">
                <Stat size={28}>98.6%</Stat>
                <div className="mt-1.5">
                  <SubLabel>auto-matched · cards · payments · credit</SubLabel>
                </div>
              </div>
            </div>
            <LiveTag>Reconciled</LiveTag>
          </div>

          {/* Match table — each row reconciles in on the beat. */}
          <div ref={ref} {...bind} className="mt-auto flex flex-col gap-1.5 pt-3.5">
            {RECON.map((r, i) => (
              <Slab
                key={r.ref}
                className="flex items-center gap-2.5 px-2.5 py-2 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
              >
                <PopIn show={n > i}>
                  {r.matched ? (
                    <GlowCheck size={18} />
                  ) : (
                    <span
                      className="grid size-[18px] shrink-0 place-items-center rounded-full font-mono text-[9px] font-bold"
                      style={{
                        background: withAlpha(visual.indigo, 0.16),
                        boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.5)}`,
                        color: visual.indigo,
                      }}
                    >
                      !
                    </span>
                  )}
                </PopIn>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11.5px] font-medium text-text-primary dark:text-text-dark-primary">{r.src}</div>
                  <SubLabel className="normal-case tracking-[0.08em]">{r.ref}</SubLabel>
                </div>
                <span className="font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  {r.amount}
                </span>
                <span
                  className={
                    r.matched
                      ? "shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-accent-teal dark:text-accent-cyan"
                      : "shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]"
                  }
                  style={
                    r.matched
                      ? { background: withAlpha(visual.cyan, 0.12), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.3)}` }
                      : { background: withAlpha(visual.indigo, 0.1), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.4)}`, color: visual.indigo }
                  }
                >
                  {r.matched ? "Matched" : "Review"}
                </span>
              </Slab>
            ))}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
