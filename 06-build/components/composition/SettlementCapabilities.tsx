"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  NavyTile,
  GlowNode,
  GlowCheck,
  PopIn,
  Arrow,
  Slab,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Settlement §3 — Run settlement end-to-end on one platform ────────────────
//
// Settlement's capability section, rendered as a dedicated CODED bento — the
// peer of FinancialCrimeControls (FC §3) and LendingCreditJourney (lending §4).
// It replaces the generic CapabilityCards → NamedSurface path for slug
// "settlement" only (light handoff SVGs / faint empty placeholders that washed
// out in dark). Wired in ProductPageRenderer's §3b dispatch.
//
// Six DISTINCT product surfaces, each composed ENTIRELY in code on the canonical
// product-illustration kit (design-system.md §8.1 — IllustrationField +
// IllustrationCard + atoms), so they share the hero's lit, dimensional world and
// are dark-mode safe by construction. Each illustrates its capability's words
// with exactly ONE focal element, and is distinct from the others AND from the
// homepage SettlementUI (the centred USD→USDC→USD flow):
//
//   1 Settlement execution  — a USD→stablecoin→USD settlement state machine that
//                             seals stage by stage; focal = the "Settled" verdict.
//   2 Multi-rail routing    — a rail comparison (stablecoin vs scheme) by cost /
//                             speed / corridor; focal = the chosen-rail node.
//   3 Stablecoin settlement — a fiat ↔ stablecoin bridge (USD↔USDC↔AED) with the
//                             stablecoin leg as the focal glowing node.
//   4 Embedded compliance   — AML / sanctions / reporting checks clearing inside
//                             the settlement path; focal = the "In-path" verdict.
//   5 24/7/365 operations   — an always-on settlement clock; focal = the 24/7/365
//                             Stat, with the weekday / weekend / holiday grid lit.
//   6 Liquidity & treasury  — a corridor liquidity dashboard (wide); focal = the
//                             pre-funded position Stat across three corridors.
//
// Copy verbatim from ../02-copy/settlement-copy.md / scripts/docs/settlement.ts
// §3. Tokens only; mono labels use the SECONDARY text tokens; valid settlement
// data only (USD / USDC / USDT / AED — never EUR as a settlement currency here);
// no fabricated brands. Motion: each surface reveals on scroll-into-view (once)
// and replays on hover; reduced-motion shows the end-state. Client component
// (the surfaces use timers + useInView).

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const HAIRLINE = (alpha = 0.1) => ({ borderColor: withAlpha(visual.primary, alpha) });

const COPY = {
  items: [
    {
      eyebrow: "Settlement execution",
      heading: "Settlement execution",
      description:
        "Run cross-border settlement in real time on stablecoin or scheme rails, with automated fiat bridges on entry and exit.",
    },
    {
      eyebrow: "Multi-rail routing",
      heading: "Multi-rail routing",
      description:
        "Route across stablecoin and traditional rails by cost, speed, and corridor availability.",
    },
    {
      eyebrow: "Stablecoin settlement",
      heading: "Stablecoin settlement",
      description:
        "Settle on USDC and USDT rails where applicable, with automated fiat-to-stablecoin bridges on either side.",
    },
    {
      eyebrow: "Embedded compliance",
      heading: "Embedded compliance",
      description:
        "AML, sanctions screening, and regulatory reporting run inside the settlement path.",
    },
    {
      eyebrow: "24/7/365 operations",
      heading: "24/7/365 operations",
      description:
        "Settle beyond banking hours, weekends, and holidays — no correspondent-banking window dependency.",
    },
    {
      eyebrow: "Liquidity & treasury",
      heading: "Liquidity and treasury",
      description:
        "Orchestrate corridor-aware liquidity with stablecoin pre-funding, reduce collateral lock-up, and give treasury flexibility across markets.",
    },
  ],
} as const;

// ── 1 · Settlement execution — the settlement state machine ──────────────────
//
// A cross-border settlement running through its state machine: fiat-in bridge →
// stablecoin leg → fiat-out bridge, each stage sealing in on the beat, ending in
// the "Settled" verdict (the single focal element). Distinct from the homepage
// SettlementUI's horizontal three-tile flow — this is a vertical state spine with
// per-stage status. Tall showpiece cell.

const EXEC_STAGES: { label: string; meta: string }[] = [
  { label: "Fiat-in bridge", meta: "USD · automated on entry" },
  { label: "Settlement leg", meta: "stablecoin rail · real-time" },
  { label: "Fiat-out bridge", meta: "AED · automated on exit" },
];

function SettlementExecutionUI() {
  const { ref, n, bind } = useSequentialReveal(EXEC_STAGES.length, { step: 240, start: 280, amount: 0.2 });
  const done = n >= EXEC_STAGES.length;

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Settlement run · cross-border</Eyebrow>
            <LiveTag>Real-time</LiveTag>
          </div>

          {/* State spine — each stage seals in on the beat. */}
          <div ref={ref} {...bind} className="mt-5 flex flex-1 flex-col justify-center">
            {EXEC_STAGES.map((s, i) => (
              <div key={s.label} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  <PopIn show={n > i}>
                    <GlowCheck size={20} />
                  </PopIn>
                  {i < EXEC_STAGES.length - 1 && (
                    <span
                      className="my-1 w-px flex-1 transition-opacity duration-500"
                      style={{ background: withAlpha(visual.cyan, 0.32), opacity: n > i ? 1 : 0.25 }}
                    />
                  )}
                </div>
                <div className="pb-5">
                  <div className="text-[13px] font-semibold text-text-primary dark:text-text-dark-primary">
                    {s.label}
                  </div>
                  <SubLabel className="normal-case tracking-[0.1em]">{s.meta}</SubLabel>
                </div>
              </div>
            ))}
          </div>

          {/* Focal verdict. */}
          <div className="mt-auto flex items-center gap-3 border-t pt-3.5" style={HAIRLINE()}>
            <GlowNode size={34}>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5 10 17.5 19 6.5" />
              </svg>
            </GlowNode>
            <div>
              <Stat size={24}>Settled</Stat>
              <div className="mt-1">
                <SubLabel>{done ? "Final · no correspondent chain" : "Settling…"}</SubLabel>
              </div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Multi-rail routing — rail comparison ─────────────────────────────────
//
// Two candidate rails (stablecoin vs scheme) compared by cost, speed, and
// corridor availability; the router selects the stablecoin rail. Focal = the
// selected-rail node. The losing rail dims; the chosen rail lifts on the beat.

type Rail = {
  name: string;
  sub: string;
  cost: string;
  speed: string;
  corridor: string;
  chosen: boolean;
};

const RAILS: Rail[] = [
  { name: "Stablecoin", sub: "USDC", cost: "Low", speed: "Real-time", corridor: "Available", chosen: true },
  { name: "Scheme", sub: "Card network", cost: "Higher", speed: "T+1", corridor: "Available", chosen: false },
];

function MultiRailRoutingUI() {
  const { ref, n, bind } = useSequentialReveal(1, { start: 320, amount: 0.3 });
  const selected = n >= 1;

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} {...bind} className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Routing · per corridor</Eyebrow>
            <LiveTag>Selecting</LiveTag>
          </div>

          {/* The two candidate rails. */}
          <div className="mt-3 flex flex-1 flex-col justify-center gap-2">
            {RAILS.map((r) => {
              const active = r.chosen && selected;
              return (
                <div
                  key={r.name}
                  className={cn("relative rounded-[12px] px-3.5 py-2.5 transition-all duration-500")}
                  style={
                    active
                      ? {
                          background: withAlpha(visual.cyan, 0.12),
                          boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.5)}, 0 14px 28px -16px ${withAlpha(visual.primary, 0.5)}`,
                        }
                      : {
                          background: withAlpha(visual.white, 0.42),
                          boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.55)}`,
                          opacity: selected && !r.chosen ? 0.55 : 1,
                        }
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <PopIn show={active}>
                        <GlowNode size={22}>
                          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.5 10 17.5 19 6.5" />
                          </svg>
                        </GlowNode>
                      </PopIn>
                      <div>
                        <div className="text-[13px] font-semibold text-text-primary dark:text-text-dark-primary">{r.name}</div>
                        <SubLabel className="normal-case tracking-[0.1em]">{r.sub}</SubLabel>
                      </div>
                    </div>
                    {active && (
                      <span
                        className="rounded-md px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]"
                        style={{ background: withAlpha(visual.cyan, 0.16), color: visual.cyan }}
                      >
                        Routed
                      </span>
                    )}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    {(
                      [
                        ["Cost", r.cost],
                        ["Speed", r.speed],
                        ["Corridor", r.corridor],
                      ] as [string, string][]
                    ).map(([k, v]) => (
                      <div key={k}>
                        <SubLabel className="text-[8px]">{k}</SubLabel>
                        <div className="text-[10.5px] font-medium text-text-primary dark:text-text-dark-primary">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t pt-2.5" style={HAIRLINE()}>
            <SubLabel>By cost · speed · availability</SubLabel>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 3 · Stablecoin settlement — fiat ↔ stablecoin bridge ─────────────────────
//
// The automated bridge on either side: fiat (USD) bridges into the stablecoin
// leg, which bridges out to fiat (AED). The stablecoin node is the single glowing
// focal element; the USDC / USDT rail is named. Distinct from the homepage
// SettlementUI (USD→USDC→USD, symmetric) — this is asymmetric USD→USDC→AED with
// explicit "bridge" labels under each arrow.

function StablecoinSettlementUI() {
  const { ref, n, bind } = useSequentialReveal(2, { step: 260, start: 300, amount: 0.3 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} {...bind} className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Fiat bridge · either side</Eyebrow>
            <span
              className="whitespace-nowrap rounded-md px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan"
              style={{ background: withAlpha(visual.primary, 0.1) }}
            >
              USDC · USDT
            </span>
          </div>

          {/* The bridge — USD → stablecoin → AED. */}
          <div className="mt-2 flex flex-1 flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2.5">
              <NavyTile glyph="$" label="USD" size={52} />
              <div className="flex flex-col items-center gap-1">
                <PopIn show={n > 0}>
                  <Arrow width={20} />
                </PopIn>
                <SubLabel className="text-[8px]">Bridge in</SubLabel>
              </div>
              <GlowNode size={62} round={false}>
                <span className="flex flex-col items-center gap-0.5">
                  <span className="font-mono text-[7px] tracking-[0.14em] text-white/85">STABLECOIN</span>
                  <span className="text-[15px] font-bold text-white">USDC</span>
                </span>
              </GlowNode>
              <div className="flex flex-col items-center gap-1">
                <PopIn show={n > 1}>
                  <Arrow width={20} />
                </PopIn>
                <SubLabel className="text-[8px]">Bridge out</SubLabel>
              </div>
              <NavyTile glyph="AED" label="AED" size={52} />
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t pt-3" style={HAIRLINE()}>
            <SubLabel>Auto fiat-to-stablecoin · both sides</SubLabel>
            <SubLabel>Where applicable</SubLabel>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 4 · Embedded compliance — checks inside the settlement path ──────────────
//
// AML, sanctions screening, and regulatory reporting clearing INSIDE the path,
// not as add-ons: a mini settlement path with the three checks docked on it,
// each clearing on the beat. Focal = the glowing "In-path" verdict node.

const COMPLIANCE_CHECKS: string[] = [
  "AML transaction monitoring",
  "Sanctions + PEP screening",
  "Regulatory reporting",
];

function EmbeddedComplianceUI() {
  const { ref, n, bind } = useSequentialReveal(COMPLIANCE_CHECKS.length, { step: 200, start: 280, amount: 0.2 });
  const done = n >= COMPLIANCE_CHECKS.length;

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>In the settlement path</Eyebrow>
            <LiveTag>Inline</LiveTag>
          </div>

          {/* Checks running inside the path — clear one by one. */}
          <div ref={ref} {...bind} className="mt-3 flex flex-1 flex-col justify-center gap-1.5">
            {COMPLIANCE_CHECKS.map((label, i) => (
              <Slab key={label} className="flex items-center gap-2.5 px-3 py-1.5">
                <PopIn show={n > i}>
                  <GlowCheck size={16} />
                </PopIn>
                <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                  {label}
                </span>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity duration-300",
                    n > i ? "opacity-100" : "opacity-0",
                  )}
                  style={{ color: visual.cyan }}
                >
                  Clear
                </span>
              </Slab>
            ))}
          </div>

          {/* Focal verdict. */}
          <div className="mt-3 flex items-center justify-between border-t pt-2.5" style={HAIRLINE()}>
            <SubLabel>{done ? "Not bolted on · part of the flow" : "Screening…"}</SubLabel>
            <span
              className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-opacity duration-500", done ? "opacity-100" : "opacity-40")}
              style={{ color: visual.cyan }}
            >
              In-path
            </span>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 5 · 24/7/365 operations — always-on indicator ────────────────────────────
//
// Settlement that never waits for a banking window: the focal "24/7/365" Stat
// with a weekday / weekend / holiday grid all lit green (no closed cells), and a
// live "Open now" indicator. No correspondent-banking window dependency.

const SLOTS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Hol"];

function AlwaysOnUI() {
  const { ref, n, bind } = useSequentialReveal(SLOTS.length, { step: 90, start: 240, amount: 0.25 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Settlement window</Eyebrow>
            <LiveTag>Open now</LiveTag>
          </div>

          {/* Focal stat. */}
          <div className="mt-3 flex flex-col items-center">
            <Stat size={38}>24/7/365</Stat>
          </div>

          {/* Always-on grid — every slot lights, none closed. */}
          <div ref={ref} {...bind} className="mt-auto grid grid-cols-4 gap-1.5 border-t pt-3" style={HAIRLINE()}>
            {SLOTS.map((s, i) => {
              const on = n > i;
              return (
                <div
                  key={s}
                  className="flex flex-col items-center gap-1 rounded-[9px] py-1.5 transition-all duration-300"
                  style={{
                    background: on ? withAlpha(visual.cyan, 0.12) : withAlpha(visual.white, 0.4),
                    boxShadow: on
                      ? `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}`
                      : `inset 0 0 0 1px ${withAlpha(visual.white, 0.5)}`,
                  }}
                >
                  <span
                    className="size-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: on ? visual.cyan : withAlpha(visual.primary, 0.2),
                      boxShadow: on ? `0 0 8px ${visual.cyan}` : "none",
                    }}
                  />
                  <SubLabel className="text-[8px]">{s}</SubLabel>
                </div>
              );
            })}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 6 · Liquidity & treasury — corridor liquidity dashboard (WIDE) ───────────
//
// The wide showpiece. A corridor-aware liquidity dashboard: three corridors each
// pre-funded with stablecoin, the aggregate pre-funded position as the single
// focal Stat, and a "collateral lock-up reduced" treasury readout. Designed for
// the wide cell — three corridor columns + a focal-stat rail, never a stretched
// narrow design.

type Corridor = { pair: string; rail: string; funded: number };

const CORRIDORS: Corridor[] = [
  { pair: "USD → AED", rail: "USDC", funded: 82 },
  { pair: "USD → USDC", rail: "USDC", funded: 64 },
  { pair: "AED → USD", rail: "USDT", funded: 73 },
];

function LiquidityTreasuryUI() {
  const { ref, n, bind } = useSequentialReveal(CORRIDORS.length, { step: 180, start: 280, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-6 py-4 sm:px-7">
          <div className="flex items-center justify-between">
            <Eyebrow>Corridor liquidity · treasury</Eyebrow>
            <LiveTag>Pre-funded</LiveTag>
          </div>

          <div className="mt-3.5 grid flex-1 grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.55fr_1fr]">
            {/* Corridor columns — each pre-funded position fills on the beat. */}
            <div ref={ref} {...bind} className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {CORRIDORS.map((c, i) => {
                const on = n > i;
                return (
                  <Slab key={c.pair} className="flex flex-col justify-between px-3.5 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">{c.pair}</span>
                      <span
                        className="rounded px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-primary dark:text-accent-cyan"
                        style={{ background: withAlpha(visual.primary, 0.1) }}
                      >
                        {c.rail}
                      </span>
                    </div>
                    <div className="mt-3">
                      <SubLabel className="text-[8.5px]">Pre-funded</SubLabel>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: withAlpha(visual.primary, 0.1) }}>
                        <span
                          className="block h-full rounded-full transition-[width] duration-700 ease-out"
                          style={{
                            width: on ? `${c.funded}%` : "0%",
                            background: `linear-gradient(90deg, ${withAlpha(visual.primary, 0.7)}, ${visual.cyan})`,
                          }}
                        />
                      </div>
                      <div className="mt-1.5 font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                        {c.funded}% funded
                      </div>
                    </div>
                  </Slab>
                );
              })}
            </div>

            {/* Focal stat + treasury readout. */}
            <div className="flex flex-col justify-between rounded-[14px] px-4 py-3.5" style={{ background: withAlpha(visual.cyan, 0.08), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}` }}>
              <div>
                <SubLabel>Pre-funded position</SubLabel>
                <div className="mt-2">
                  <Stat size={38}>3 corridors</Stat>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2.5 border-t pt-3" style={HAIRLINE(0.12)}>
                <GlowNode size={26}>
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5 10 17.5 19 6.5" />
                  </svg>
                </GlowNode>
                <SubLabel className="normal-case tracking-[0.08em]">Collateral lock-up reduced</SubLabel>
              </div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Cell shell ───────────────────────────────────────────────────────────────

function Cell({
  eyebrow,
  heading,
  description,
  className,
  children,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        // `group` so the kit surfaces' group-hover gestures fire on cell hover.
        "group flex flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-white",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      {/* Eyebrow → heading → description ABOVE the surface. */}
      <div className="px-5 pb-3 pt-5 sm:px-6">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan">
          {eyebrow}
        </p>
        <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {heading}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {description}
        </p>
      </div>

      {/* The product-illustration kit needs a positioned, sized ancestor. */}
      <div className="relative min-h-0 flex-1">{children}</div>
    </motion.article>
  );
}

export function SettlementCapabilities({
  headline,
  body,
}: {
  headline: string;
  body?: string;
}) {
  const [c1, c2, c3, c4, c5, c6] = COPY.items;

  return (
    <Section bg="white" ariaLabel="Settlement capabilities">
      <div className="mb-12 max-w-2xl sm:mb-14">
        {/* No eyebrow — headline leads (CLAUDE.md v1.5). */}
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {headline}
        </h2>
        {body && (
          <p className="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            {body}
          </p>
        )}
      </div>

      {/* Bento — six cells on a 6-col grid:
          • Settlement execution = a tall showpiece (cols 1-2, rows 1-2).
          • Multi-rail / Stablecoin / Compliance / 24-7 = four 1/3 cells.
          • Liquidity & treasury = the full-width wide cell (cols 1-6). */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[366px]">
        <Cell
          eyebrow={c1.eyebrow}
          heading={c1.heading}
          description={c1.description}
          className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
        >
          <SettlementExecutionUI />
        </Cell>

        <Cell
          eyebrow={c2.eyebrow}
          heading={c2.heading}
          description={c2.description}
          className="lg:col-span-2"
        >
          <MultiRailRoutingUI />
        </Cell>

        <Cell
          eyebrow={c3.eyebrow}
          heading={c3.heading}
          description={c3.description}
          className="lg:col-span-2"
        >
          <StablecoinSettlementUI />
        </Cell>

        <Cell
          eyebrow={c4.eyebrow}
          heading={c4.heading}
          description={c4.description}
          className="lg:col-span-2"
        >
          <EmbeddedComplianceUI />
        </Cell>

        <Cell
          eyebrow={c5.eyebrow}
          heading={c5.heading}
          description={c5.description}
          className="lg:col-span-2"
        >
          <AlwaysOnUI />
        </Cell>

        <Cell
          eyebrow={c6.eyebrow}
          heading={c6.heading}
          description={c6.description}
          className="sm:col-span-2 lg:col-span-6 lg:row-span-1"
        >
          <LiquidityTreasuryUI />
        </Cell>
      </div>
    </Section>
  );
}
