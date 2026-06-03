"use client";

import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  GlowCheck,
  PopIn,
  Slab,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";
import { Reveal } from "./_shell";

// ── Government — "What you can build" surfaces ──────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/government §4, one per
// build row, each mapping to its copy and sharing nothing with the others, with
// the fintechs / neobanks / healthcare surfaces, or with the product-page UIs.
//
// All four are composed on the canonical product-illustration kit
// (design-system.md §8.1) — IllustrationField + IllustrationCard + atoms — so
// the literal surfaces share the hero's lit, dimensional world. Each keeps its
// distinct story EXACTLY; only the frame + atom vocabulary changed in the
// migration.
//
//   0. Disbursement cards  — a branded prepaid aid card object + category
//      spend-control panel; focal = the card object.
//   1. Payroll cards       — a disbursement run, per-tier with reconciliation
//      status + audit trail; focal = the run total Stat.
//   2. SME programs        — a fund-flow waterfall (allocated → disbursed →
//      drawn) under a policy-enforced gate; focal = the waterfall itself.
//   3. Youth & inclusion   — an inclusion prepaid card object + no-bank-account
//      badge + stipend schedule; focal = the card object.
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. One-by-one beats via useSequentialReveal +
// PopIn; reduced-motion shows the final state. Neutral on-system data — no real
// third-party brands, cool only.

// ── 0 · Disbursement cards — aid card object + spend controls ───────────────
//
// Focal: the branded prepaid disbursement card object. The four spend-control
// chips toggle in one by one (each check pops on) under it.

const SPEND_CONTROLS: { label: string; on: boolean }[] = [
  { label: "Groceries · pharmacy", on: true },
  { label: "Utilities · transit", on: true },
  { label: "ATM withdrawal", on: false },
  { label: "Cross-border", on: false },
];

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(SPEND_CONTROLS.length, { step: 150, start: 300 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Disbursement · aid program</Eyebrow>
            <LiveTag>At authorization</LiveTag>
          </div>

          {/* Branded prepaid disbursement card — the focal object, straight. */}
          <Reveal className="mt-3.5">
            <div
              className="relative aspect-[1.74/1] w-[58%] max-w-[15rem] overflow-hidden rounded-button p-3.5"
              style={{
                background: `linear-gradient(150deg, ${visual.navy}, ${visual.navy} 40%, ${visual.indigo})`,
                boxShadow: `0 18px 34px -14px ${withAlpha(visual.navy, 0.65)}, inset 0 1px 0 ${withAlpha(visual.white, 0.12)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: withAlpha(visual.cyan, 0.5) }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Subsidy</span>
                <span
                  className="size-4 rounded-[3px]"
                  style={{ background: `linear-gradient(140deg, ${withAlpha(visual.white, 0.8)}, ${withAlpha(visual.white, 0.3)})`, boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.3)}` }}
                />
              </div>
              <div className="mt-5 font-mono text-[12px] tracking-[0.12em] text-white/95">•••• •••• •••• 0317</div>
              <div className="mt-1.5 flex items-end justify-between">
                <span className="font-display text-[11px] font-semibold tracking-tight text-white">PREPAID</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-accent-cyan/90">aid program</span>
              </div>
            </div>
          </Reveal>

          {/* Spend-control panel — category restrictions tick in one by one. */}
          <div className="mt-auto pt-3.5">
            <div className="mb-2">
              <SubLabel>Spend controls</SubLabel>
            </div>
            <div ref={ref} {...bind} className="grid grid-cols-2 gap-1.5">
              {SPEND_CONTROLS.map((c, i) => (
                <Slab key={c.label} className="flex items-center gap-2 px-2.5 py-2">
                  <PopIn show={n > i}>
                    {c.on ? (
                      <GlowCheck size={15} />
                    ) : (
                      <span
                        className="grid size-[15px] shrink-0 place-items-center rounded-full font-mono text-[8px] font-bold"
                        style={{
                          background: withAlpha(visual.primary, 0.08),
                          boxShadow: `inset 0 0 0 1px ${withAlpha(visual.primary, 0.3)}`,
                          color: visual.primary,
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </PopIn>
                  <span className="truncate text-[10.5px] font-medium text-text-primary dark:text-text-dark-primary">{c.label}</span>
                </Slab>
              ))}
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 1 · Payroll cards — disbursement run + reconciliation ───────────────────
//
// Focal: the payroll run total Stat. Each tier settles in one by one (check
// pops on / pending dot for reconciling), then the audited total resolves.

const PAYROLL_RUN: { tier: string; count: string; status: "Settled" | "Reconciling" }[] = [
  { tier: "Civil service", count: "1,284", status: "Settled" },
  { tier: "Contractors", count: "612", status: "Settled" },
  { tier: "Public works", count: "938", status: "Reconciling" },
];

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(PAYROLL_RUN.length, { step: 200, start: 240 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Payroll run · cycle 06</Eyebrow>
            <LiveTag>Audit logged</LiveTag>
          </div>

          {/* Per-tier disbursement rows with reconciliation status. */}
          <div ref={ref} {...bind} className="mt-3 flex flex-col gap-2">
            {PAYROLL_RUN.map((r, i) => {
              const settled = r.status === "Settled";
              return (
                <Slab key={r.tier} className="flex items-center gap-2.5 px-3 py-2">
                  <PopIn show={n > i}>
                    {settled ? (
                      <GlowCheck size={18} />
                    ) : (
                      <span
                        className="grid size-[18px] shrink-0 place-items-center rounded-full"
                        style={{ background: withAlpha(visual.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.45)}` }}
                      >
                        <span className="size-1.5 rounded-full" style={{ background: visual.cyan, boxShadow: `0 0 8px ${visual.cyan}` }} />
                      </span>
                    )}
                  </PopIn>
                  <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{r.tier}</span>
                  <span className="ml-auto font-mono text-[11px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                    {r.count}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-md px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]",
                      settled
                        ? "text-brand-primary dark:text-text-dark-secondary"
                        : "text-accent-teal dark:text-accent-cyan",
                    )}
                    style={{
                      background: withAlpha(settled ? visual.primary : visual.cyan, 0.12),
                      boxShadow: `inset 0 0 0 1px ${withAlpha(settled ? visual.primary : visual.cyan, 0.3)}`,
                    }}
                  >
                    {r.status}
                  </span>
                </Slab>
              );
            })}
          </div>

          {/* Run total — the focal element, audit trail per disbursement. */}
          <div
            className="mt-auto flex items-end justify-between border-t pt-3"
            style={{ borderColor: withAlpha(visual.primary, 0.1) }}
          >
            <div>
              <Stat size={26}>2,834</Stat>
              <div className="mt-1.5">
                <SubLabel>Recipients · audit per disbursement</SubLabel>
              </div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · SME programs — fund-flow waterfall + policy enforcement ─────────────
//
// Focal: the fund-flow waterfall under a policy-enforced gate. Allocated →
// disbursed → drawn, each stage a smaller share of the budget; bar widths
// encode the share and grow in one by one. Values neutral, on-system,
// internally consistent — no fabricated totals.

const FUND_FLOW: { stage: string; note: string; pct: number; tone: string }[] = [
  { stage: "Allocated", note: "Program budget", pct: 100, tone: visual.navy },
  { stage: "Disbursed", note: "Policy approved", pct: 72, tone: visual.indigo },
  { stage: "Drawn", note: "Utilized by SMEs", pct: 48, tone: visual.cyan },
];

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(FUND_FLOW.length, { step: 220, start: 280 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>SME program · fund flow</Eyebrow>
            <LiveTag>Policy enforced</LiveTag>
          </div>

          {/* Waterfall — the focal element; each stage's bar grows in one by one. */}
          <div ref={ref} {...bind} className="mt-auto flex flex-col gap-4 pt-3">
            {FUND_FLOW.map((f, i) => (
              <div key={f.stage}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">{f.stage}</span>
                  <SubLabel className="normal-case tracking-[0.1em]">{f.note}</SubLabel>
                </div>
                <div
                  className="relative h-2 overflow-hidden rounded-full"
                  style={{ background: withAlpha(visual.primary, 0.07) }}
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
                    style={{
                      width: n > i ? `${f.pct}%` : "0%",
                      background: `linear-gradient(90deg, ${withAlpha(f.tone, 0.85)}, ${f.tone})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 3 · Youth & inclusion cards — inclusion card + stipend schedule ─────────
//
// Focal: the branded youth-program inclusion card object. A no-bank-account
// badge + the two-term stipend schedule build in one by one beneath it.

const STIPEND_SCHEDULE: { when: string; state: "Loaded" | "Scheduled" }[] = [
  { when: "This term", state: "Loaded" },
  { when: "Next term", state: "Scheduled" },
];

export function Row4() {
  // 1 badge + 2 schedule rows = 3 sequential beats.
  const { ref, n, bind } = useSequentialReveal(STIPEND_SCHEDULE.length + 1, { step: 170, start: 300 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Inclusion · youth program</Eyebrow>
            <LiveTag>Per program</LiveTag>
          </div>

          {/* Inclusion prepaid card object — the focal object, straight. */}
          <Reveal className="mt-3.5">
            <div
              className="relative aspect-[1.74/1] w-[60%] max-w-[14.5rem] overflow-hidden rounded-button p-3.5"
              style={{
                background: `linear-gradient(150deg, ${visual.indigo}, ${visual.navy} 55%, ${visual.navy})`,
                boxShadow: `0 18px 34px -14px ${withAlpha(visual.indigo, 0.55)}, inset 0 1px 0 ${withAlpha(visual.white, 0.12)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: withAlpha(visual.cyan, 0.5) }} />
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap aria-hidden className="size-3 text-white/80" strokeWidth={2} />
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/70">Stipend</span>
                </span>
                <span
                  className="size-4 rounded-[3px]"
                  style={{ background: `linear-gradient(140deg, ${withAlpha(visual.white, 0.8)}, ${withAlpha(visual.white, 0.3)})`, boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.3)}` }}
                />
              </div>
              <div className="mt-4 font-mono text-[11px] tracking-[0.12em] text-white/95">•••• •••• •••• 5240</div>
              <div className="mt-1.5 flex items-end justify-between">
                <span className="font-display text-[10.5px] font-semibold tracking-tight text-white">PREPAID</span>
                <span className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-accent-cyan/90">youth program</span>
              </div>
            </div>
          </Reveal>

          {/* No-bank-account badge + stipend schedule — build in one by one. */}
          <div ref={ref} {...bind} className="mt-auto flex flex-col gap-1.5 pt-3.5">
            <Slab className="flex items-center gap-2.5 px-3 py-1.5">
              <PopIn show={n > 0}>
                <GlowCheck size={16} />
              </PopIn>
              <span className="text-[11.5px] font-medium text-text-primary dark:text-text-dark-primary">
                No bank account required
              </span>
            </Slab>
            {STIPEND_SCHEDULE.map((s, i) => {
              const loaded = s.state === "Loaded";
              return (
                <Slab
                  key={s.when}
                  className="flex items-center gap-2.5 px-3 py-1.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i + 1 ? 1 : 0, transform: n > i + 1 ? "translateY(0)" : "translateY(6px)" }}
                >
                  <span className="text-[11.5px] font-medium text-text-primary dark:text-text-dark-primary">{s.when}</span>
                  <span
                    className={cn(
                      "ml-auto rounded-md px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]",
                      loaded
                        ? "text-accent-teal dark:text-accent-cyan"
                        : "text-brand-primary dark:text-text-dark-secondary",
                    )}
                    style={{
                      background: withAlpha(loaded ? visual.cyan : visual.primary, loaded ? 0.12 : 0.08),
                      boxShadow: `inset 0 0 0 1px ${withAlpha(loaded ? visual.cyan : visual.primary, loaded ? 0.3 : 0.22)}`,
                    }}
                  >
                    {s.state}
                  </span>
                </Slab>
              );
            })}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
