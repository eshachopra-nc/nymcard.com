"use client";

import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";
import {
  SubLabel,
  Stat,
  GlowNode,
  GlowCheck,
  PopIn,
  Arrow,
  Slab,
  Toggle,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Commercial Banking §3 — Financial OS pillar surfaces ─────────────────────
//
// Five DISTINCT bespoke product-UI surfaces, one per pillar, that drop into the
// labelled slot inside each FinancialOS pillar card. The pillar card already
// composes the canonical kit (IllustrationField + the luminous IllustrationCard);
// these surfaces are the literal UI that floats ON that card — built from the
// kit atoms (Slab, GlowNode, Toggle, PopIn, Stat, Arrow) so they share the lit,
// dimensional world and stay dark-mode safe by construction.
//
// One focal element each, mapped to the pillar copy (commercial-banking-copy
// -final.md §3). Tokens only; cool palette (navy + cyan); violet only as a card
// object finish. Mono labels use the SECONDARY text tokens. Neutral on-system
// values only — illustrative figures, no fabricated brands or merchant data.
//
//   Spend       — a corporate card object + spend-control toggles + an approval
//                 step; focal = the violet corporate card.
//   Pay         — a payment run: a domestic + a cross-border leg clearing, with
//                 a payroll batch row; focal = the run total Stat.
//   Get paid    — a receivables tracker: invoice rows reconciling to Paid, with
//                 an outstanding row; focal = the Collected Stat.
//   Borrow      — a working-capital facility: drawn/available bar + a draw;
//                 focal = the Available Stat.
//   Understand  — a real-time cash-flow dashboard: inflow/outflow bars + a net
//                 balance; focal = the Cash on hand Stat.
//
// Motion: static at rest; on scroll-into-view (replayed on hover) each surface's
// rows / toggles / bars build in one by one; reduced-motion renders the settled
// final state. Framer Motion via useSequentialReveal; no perpetual motion.

const HAIRLINE = (alpha = 0.1) => ({ borderColor: withAlpha(visual.primary, alpha) });

// Shared mini-label for a slab's value line.
function ValueLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">
      {children}
    </span>
  );
}

// ── 1 · Spend — corporate card + spend controls + approval ───────────────────
//
// A straight (never tilted) electric-violet corporate card beside live spend
// controls (a monthly limit + two policy toggles), then an approval step that
// seals in. Focal = the card object.

const SPEND_TOGGLES = ["Travel + entertainment", "Online purchases"] as const;

export function SpendSurface() {
  const { ref, n, bind } = useSequentialReveal(SPEND_TOGGLES.length, { start: 280, step: 200 });
  const approved = n >= SPEND_TOGGLES.length;

  const CARD_FACE =
    `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.6)}, transparent 56%),` +
    `linear-gradient(150deg, ${visual.purple}, ${tokens.color.brand.navy})`;
  const TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.75)} 50%, transparent)`;

  return (
    <div ref={ref} {...bind} className="flex h-full w-full flex-col justify-center gap-3">
      <div className="flex items-center gap-3.5">
        {/* The corporate card — straight, no wordmark. */}
        <div
          className="relative aspect-[1.586/1] w-[40%] max-w-[148px] shrink-0 overflow-hidden rounded-[12px] ring-1 ring-inset ring-white/15"
          style={{
            background: CARD_FACE,
            boxShadow: `0 20px 38px -12px ${withAlpha(visual.purple, 0.55)}, 0 0 26px ${withAlpha(visual.violet, 0.3)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
          }}
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: TOP_EDGE }} />
          <span
            aria-hidden="true"
            className="absolute left-2.5 top-2.5 h-[16px] w-[22px] rounded"
            style={{ background: withAlpha(visual.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.45)}` }}
          />
          <span className="absolute bottom-2.5 left-2.5 font-mono text-[8.5px] tracking-[0.16em] text-white/65">
            CORPORATE
          </span>
        </div>

        {/* Spend controls — a monthly limit + two policy toggles flipping on. */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Slab className="flex items-center justify-between px-3 py-1.5">
            <SubLabel>Monthly limit</SubLabel>
            <ValueLine>$25,000</ValueLine>
          </Slab>
          {SPEND_TOGGLES.map((label, i) => (
            <Slab key={label} className="flex items-center justify-between gap-2 px-3 py-1.5">
              <span className="truncate text-[11.5px] leading-tight text-text-secondary dark:text-text-dark-secondary">
                {label}
              </span>
              <Toggle on={n > i} />
            </Slab>
          ))}
        </div>
      </div>

      {/* Approval step — seals in once the policy is set. */}
      <div className="flex items-center gap-2.5 border-t pt-2.5" style={HAIRLINE()}>
        <PopIn show={approved}>
          <GlowCheck size={18} />
        </PopIn>
        <div className="min-w-0">
          <div className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
            Approved by finance
          </div>
          <SubLabel className="normal-case tracking-[0.1em]">Policy applied · card live</SubLabel>
        </div>
      </div>
    </div>
  );
}

// ── 2 · Pay — payment run (domestic + cross-border + payroll) ────────────────
//
// One payment run clearing: a domestic supplier leg, a cross-border supplier leg
// (with an FX corridor), and a payroll batch, each sealing in. Focal = the run
// total Stat.

const PAY_LEGS: { label: string; meta: string; amount: string }[] = [
  { label: "Supplier payment", meta: "Domestic · instant", amount: "$48,200" },
  { label: "Supplier payment", meta: "Cross-border · AED → USD", amount: "$31,640" },
  { label: "Payroll batch", meta: "142 employees", amount: "$214,900" },
];

export function PaySurface() {
  const { ref, n, bind } = useSequentialReveal(PAY_LEGS.length, { start: 260, step: 190 });

  return (
    <div className="flex h-full w-full flex-col justify-center gap-3">
      {/* Focal run total. */}
      <div className="flex items-end justify-between">
        <div>
          <Stat size={30}>$294,740</Stat>
          <div className="mt-1.5"><SubLabel>Payment run · 3 legs</SubLabel></div>
        </div>
        <span
          className="rounded-lg px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ background: withAlpha(visual.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.45)}`, color: visual.cyan }}
        >
          Cleared
        </span>
      </div>

      {/* Legs — seal in one by one. */}
      <div ref={ref} {...bind} className="flex flex-col gap-1.5">
        {PAY_LEGS.map((leg, i) => (
          <Slab key={leg.meta} className="flex items-center gap-2.5 px-3 py-1.5">
            <PopIn show={n > i}>
              <GlowCheck size={16} />
            </PopIn>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11.5px] font-medium leading-tight text-text-primary dark:text-text-dark-primary">
                {leg.label}
              </div>
              <SubLabel className="normal-case tracking-[0.1em]">{leg.meta}</SubLabel>
            </div>
            <ValueLine>{leg.amount}</ValueLine>
          </Slab>
        ))}
      </div>
    </div>
  );
}

// ── 3 · Get paid — receivables tracker ───────────────────────────────────────
//
// An invoices/receivables list reconciling: two invoices flip Paid as incoming
// payments match, one stays Outstanding (due soon). Focal = the Collected Stat.

const INVOICES: { id: string; amount: string; paid: boolean }[] = [
  { id: "Invoice · INV-204", amount: "$18,400", paid: true },
  { id: "Invoice · INV-205", amount: "$9,250", paid: true },
  { id: "Invoice · INV-206", amount: "$12,800", paid: false },
];

export function GetPaidSurface() {
  // Reveal the two paid matches in sequence (the outstanding row is static).
  const paidCount = INVOICES.filter((i) => i.paid).length;
  const { ref, n, bind } = useSequentialReveal(paidCount, { start: 280, step: 220 });

  return (
    <div className="flex h-full w-full flex-col justify-center gap-3">
      {/* Focal collected total. */}
      <div className="flex items-end justify-between">
        <div>
          <Stat size={30}>$27,650</Stat>
          <div className="mt-1.5"><SubLabel>Collected · 2 of 3 invoices</SubLabel></div>
        </div>
        <span className="font-mono text-[10px] tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
          $12,800 outstanding
        </span>
      </div>

      {/* Invoice rows — paid rows reconcile in; outstanding stays pending. */}
      <div ref={ref} {...bind} className="flex flex-col gap-1.5">
        {INVOICES.map((inv) => {
          // Index among the paid rows drives its reveal beat.
          const paidIndex = INVOICES.filter((x) => x.paid).indexOf(inv);
          const revealed = inv.paid && n > paidIndex;
          return (
            <Slab key={inv.id} className="flex items-center gap-2.5 px-3 py-1.5">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[11.5px] font-medium leading-tight text-text-primary dark:text-text-dark-primary">
                  {inv.id}
                </div>
                <SubLabel className="normal-case tracking-[0.1em]">{inv.amount}</SubLabel>
              </div>
              {inv.paid ? (
                <span
                  className={cn(
                    "shrink-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] transition-opacity duration-300",
                    revealed ? "opacity-100" : "opacity-0",
                  )}
                  style={{ color: visual.cyan }}
                >
                  Paid
                </span>
              ) : (
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]"
                  style={{ background: withAlpha(visual.indigo, 0.12), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.4)}`, color: visual.indigo }}
                >
                  Due soon
                </span>
              )}
              {inv.paid ? (
                <PopIn show={revealed}>
                  <GlowCheck size={16} />
                </PopIn>
              ) : (
                <span className="size-4 shrink-0 rounded-full" style={{ boxShadow: `inset 0 0 0 1.5px ${withAlpha(visual.indigo, 0.4)}` }} />
              )}
            </Slab>
          );
        })}
      </div>
    </div>
  );
}

// ── 4 · Borrow — working-capital facility (wide) ─────────────────────────────
//
// A business credit facility: a drawn/available capacity bar, a draw request
// sealing in, and the terms. Focal = the Available Stat. Wide layout (lg:col-3)
// so the facility bar and the draw sit side by side.

const DRAWN_PCT = 0.45; // $90k drawn of $200k

export function BorrowSurface() {
  const { ref, n, bind } = useSequentialReveal(1, { start: 300 });
  const drawn = n >= 1;

  return (
    <div ref={ref} {...bind} className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
      {/* Facility — capacity bar + focal Available. */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-end justify-between">
          <div>
            <Stat size={30}>$110,000</Stat>
            <div className="mt-1.5"><SubLabel>Available to draw</SubLabel></div>
          </div>
          <span className="font-mono text-[10px] tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
            of $200,000
          </span>
        </div>

        {/* Drawn / available capacity bar — the draw fills in on reveal. */}
        <div>
          <span className="relative block h-2.5 w-full overflow-hidden rounded-full" style={{ background: withAlpha(visual.primary, 0.1) }}>
            <span
              className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: drawn ? `${Math.round(DRAWN_PCT * 100)}%` : "0%",
                background: `linear-gradient(90deg, ${withAlpha(visual.primary, 0.85)}, ${visual.cyan})`,
              }}
            />
          </span>
          <div className="mt-1.5 flex items-center justify-between">
            <SubLabel>Drawn · $90,000</SubLabel>
            <SubLabel>Revolving · 55% headroom</SubLabel>
          </div>
        </div>
      </div>

      {/* Draw request + terms. */}
      <div className="flex flex-col gap-1.5">
        <Slab className="flex items-center gap-2.5 px-3 py-2">
          <PopIn show={drawn}>
            <GlowCheck size={18} />
          </PopIn>
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">Draw · $40,000</div>
            <SubLabel className="normal-case tracking-[0.1em]">Funded same day</SubLabel>
          </div>
        </Slab>
        <Slab className="flex items-center justify-between px-3 py-1.5">
          <SubLabel>Rate</SubLabel>
          <ValueLine>9.4% APR</ValueLine>
        </Slab>
      </div>
    </div>
  );
}

// ── 5 · Understand — real-time cash-flow dashboard (wide) ────────────────────
//
// A real-time cash position: a focal Cash-on-hand Stat, an inflow vs outflow
// mini-chart that grows in, and the net movement. Wide layout (lg:col-3).

// Six recent periods — inflow (cyan) over outflow (indigo). Illustrative.
const FLOW: { in: number; out: number }[] = [
  { in: 0.62, out: 0.40 },
  { in: 0.74, out: 0.52 },
  { in: 0.58, out: 0.61 },
  { in: 0.81, out: 0.48 },
  { in: 0.70, out: 0.55 },
  { in: 0.90, out: 0.50 },
];

export function UnderstandSurface() {
  const { ref, n, bind } = useSequentialReveal(FLOW.length, { start: 240, step: 110 });

  return (
    <div ref={ref} {...bind} className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-[0.8fr_1.2fr] sm:items-center">
      {/* Focal cash position. */}
      <div className="flex flex-col gap-2.5">
        <div>
          <Stat size={30}>$1.24M</Stat>
          <div className="mt-1.5"><SubLabel>Cash on hand · live</SubLabel></div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Slab className="flex items-center justify-between px-3 py-1.5">
            <span className="flex items-center gap-1.5 text-[11px] text-text-secondary dark:text-text-dark-secondary">
              <span className="size-2 rounded-full" style={{ background: visual.cyan, boxShadow: `0 0 8px ${withAlpha(visual.cyan, 0.6)}` }} />
              Inflow · 30d
            </span>
            <ValueLine>+$418K</ValueLine>
          </Slab>
          <Slab className="flex items-center justify-between px-3 py-1.5">
            <span className="flex items-center gap-1.5 text-[11px] text-text-secondary dark:text-text-dark-secondary">
              <span className="size-2 rounded-full" style={{ background: visual.indigo }} />
              Outflow · 30d
            </span>
            <ValueLine>−$306K</ValueLine>
          </Slab>
        </div>
      </div>

      {/* Inflow / outflow mini-chart — bars grow in one by one. */}
      <div>
        <div className="flex h-[96px] items-end justify-between gap-2 sm:gap-2.5">
          {FLOW.map((f, i) => (
            <div key={i} className="flex h-full flex-1 items-end justify-center gap-[3px]">
              <span
                className="w-full max-w-[10px] rounded-t-[3px] transition-[height] duration-500 ease-out"
                style={{
                  height: n > i ? `${Math.round(f.in * 100)}%` : "0%",
                  background: `linear-gradient(180deg, ${visual.cyan}, ${withAlpha(visual.primary, 0.85)})`,
                  boxShadow: `0 0 10px ${withAlpha(visual.cyan, 0.35)}`,
                }}
              />
              <span
                className="w-full max-w-[10px] rounded-t-[3px] transition-[height] duration-500 ease-out"
                style={{
                  height: n > i ? `${Math.round(f.out * 100)}%` : "0%",
                  background: withAlpha(visual.indigo, 0.55),
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between border-t pt-2" style={HAIRLINE()}>
          <SubLabel>Net · last 6 periods</SubLabel>
          <span className="flex items-center gap-1.5">
            <Arrow width={16} />
            <span className="font-mono text-[11px] font-semibold" style={{ color: visual.cyan }}>+$112K net</span>
          </span>
        </div>
      </div>
    </div>
  );
}
