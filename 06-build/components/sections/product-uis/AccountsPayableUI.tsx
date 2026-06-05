"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { PopIn } from "@/components/visuals/product-illustration";
import { ScanBeam, ScanBrackets } from "./scan";

// ── Commercial Payments §3 · Accounts Payable — product illustration ──────────
//
// Reference: 03-references/brex.png. Brief (owner): the supplier invoice is
// SCANNED (USD), THEN a snippet pops in on the right showing the balance due,
// THEN a second snippet pops in showing the two approvers — Line Manager and
// Finance Manager.
//
// Composition: a realistic invoice document on the left, framed by the shared
// cyan scanner brackets ("SCAN IN PROCESS") with the lidar beam sweeping down it;
// two frosted snippets float on the right and reveal in sequence. Translucent
// against the section field (consistent with the Spend Management surface — no
// confining card), but distinct: a document + floating snippets, not a dashboard.
//
// Motion (§9): static at rest; ONE motivated sequence — scan (on scroll + hover)
// → balance-due snippet → approvers snippet. prefers-reduced-motion → the settled
// end state (both snippets shown, no beam). Institution POV: the bank's payables
// product processing its business customer's supplier invoice.

const SUCCESS = tokens.color.semantic.success; // #10B981
const WARNING = tokens.color.semantic.warning; // #F59E0B
const SCAN_MS = 2000;

const LINE_ITEMS: { desc: string; amount: string; faded?: boolean }[] = [
  { desc: "Workstation hardware ×12", amount: "$16,800.00" },
  { desc: "Onsite setup & support", amount: "$2,400.00" },
  { desc: "Extended warranty", amount: "$890.00", faded: true },
];

const APPROVERS: { initials: string; name: string; role: string; approved: boolean }[] = [
  { initials: "OW", name: "Olivia Wilson", role: "Line Manager", approved: true },
  { initials: "DO", name: "Daniel Okafor", role: "Finance Manager", approved: false },
];

export function AccountsPayableUI() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion();

  // step 0 = scanning · 1 = balance-due shown · 2 = approvers shown.
  const [step, setStep] = useState(0);
  const [scanKey, setScanKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced) {
      setStep(2);
      return;
    }
    setStep(0);
    setScanKey((k) => k + 1);
    timers.current.push(setTimeout(() => setStep(1), SCAN_MS + 200));
    timers.current.push(setTimeout(() => setStep(2), SCAN_MS + 850));
  }, [reduced]);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => !reduced && run()}
      className="relative h-full w-full min-h-[24rem]"
    >
      {/* The invoice — centred and slightly enlarged, the scanned document. */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[228px] -translate-x-1/2 -translate-y-1/2 sm:w-[252px]">
        <ScanBrackets key={`b${scanKey}`} inView={inView} reduced={!!reduced} label="Scan in process" />
        <Invoice scanKey={scanKey} inView={inView} reduced={!!reduced} />
      </div>

      {/* Snippet 1 — balance due, RIGHT, slightly overlaying the invoice. */}
      <PopIn show={step >= 1} className="absolute right-0 top-[14%] z-50 w-[176px] sm:right-1 sm:w-[196px]">
        <BalanceDue />
      </PopIn>

      {/* Snippet 2 — approvers, LEFT, slightly overlaying the invoice. */}
      <PopIn show={step >= 2} className="absolute bottom-[10%] left-0 z-50 w-[190px] sm:left-1 sm:w-[210px]">
        <Approvers />
      </PopIn>
    </div>
  );
}

// ── The invoice document ─────────────────────────────────────────────────────
function Invoice({ scanKey, inView, reduced }: { scanKey: number; inView: boolean; reduced: boolean }) {
  const ink = visual.navy;
  const inkSoft = withAlpha(visual.navy, 0.58);
  const rule = withAlpha(visual.navy, 0.1);

  return (
    <div className="relative overflow-hidden rounded-[7px] bg-white shadow-[0_34px_64px_-16px_rgba(14,26,51,0.6),0_10px_24px_-8px_rgba(14,26,51,0.3),0_0_0_1px_rgba(14,26,51,0.04)]">
      <div className="px-4 py-3.5" style={{ color: ink }}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="grid size-5 place-items-center rounded-[4px] text-[8px] font-bold text-white"
              style={{ background: `linear-gradient(150deg, ${visual.navy}, ${visual.primary})` }}
            >
              D
            </span>
            <div className="leading-tight">
              <div className="text-[9px] font-bold">Dell Technologies</div>
              <div className="font-mono text-[6.5px] uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
                Supplier
              </div>
            </div>
          </div>
          <div className="text-right leading-tight">
            <div className="text-[13px] font-bold tracking-tight">Invoice</div>
            <div className="font-mono text-[7px] tracking-[0.1em]" style={{ color: inkSoft }}>
              #INV-6305
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-2.5 grid grid-cols-2 gap-1 font-mono text-[6.5px] uppercase tracking-[0.1em]" style={{ color: inkSoft }}>
          <span>Issued 05 Jun 2026</span>
          <span className="text-right">Due 30 Jun 2026</span>
          <span>Bill to · Meridian Studio</span>
          <span className="text-right">Net 30</span>
        </div>

        <div className="my-2.5 h-px w-full" style={{ background: rule }} />

        {/* Line items */}
        <div className="flex items-center justify-between font-mono text-[6.5px] uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
          <span>Description</span>
          <span>Amount</span>
        </div>
        <div className="mt-1.5 space-y-1.5">
          {LINE_ITEMS.map((it) => (
            <div key={it.desc} className="flex items-center justify-between text-[8px]" style={{ opacity: it.faded ? 0.5 : 1 }}>
              <span style={{ color: ink }}>{it.desc}</span>
              <span className="tabular-nums" style={{ color: ink }}>{it.amount}</span>
            </div>
          ))}
        </div>

        <div className="my-2.5 h-px w-full" style={{ background: rule }} />

        {/* Totals */}
        <div className="space-y-1 text-[7.5px]" style={{ color: inkSoft }}>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="tabular-nums" style={{ color: ink }}>$20,090.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="tabular-nums" style={{ color: ink }}>$422.86</span>
          </div>
        </div>

        {/* Balance due — the highlighted line the snippet mirrors. */}
        <div
          className="mt-2 flex items-baseline justify-between rounded-[5px] px-2 py-1.5"
          style={{ background: withAlpha(visual.cyan, 0.1), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}` }}
        >
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.12em]" style={{ color: ink }}>
            Balance due
          </span>
          <span className="text-[12px] font-bold tabular-nums" style={{ color: ink }}>$20,512.86</span>
        </div>

        <div className="mt-2.5 text-center font-mono text-[6.5px] uppercase tracking-[0.16em]" style={{ color: inkSoft }}>
          Thank you for your business
        </div>
      </div>

      <ScanBeam key={`s${scanKey}`} inView={inView} reduced={reduced} durationMs={SCAN_MS} />
    </div>
  );
}

// ── Snippet: balance due ─────────────────────────────────────────────────────
function BalanceDue() {
  return (
    <Snippet>
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full" style={{ background: visual.cyan, boxShadow: `0 0 8px ${visual.cyan}` }} />
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
          Balance due
        </span>
      </div>
      <div className="mt-1.5 text-[20px] font-bold tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
        $20,512.86
      </div>
      <div className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-secondary/80 dark:text-text-dark-secondary/70">
        USD · Net 30 · Due 30 Jun
      </div>
    </Snippet>
  );
}

// ── Snippet: approvers ───────────────────────────────────────────────────────
function Approvers() {
  return (
    <Snippet>
      <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
        Approvers
      </span>
      <div className="mt-2 space-y-2">
        {APPROVERS.map((a) => (
          <div key={a.name} className="flex items-center gap-2">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-black/[0.06] text-[8px] font-semibold text-text-secondary dark:bg-white/[0.08] dark:text-text-dark-secondary">
              {a.initials}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[10px] font-semibold text-text-primary dark:text-text-dark-primary">{a.name}</div>
              <div className="truncate font-mono text-[7px] uppercase tracking-[0.1em] text-text-secondary/80 dark:text-text-dark-secondary/70">
                {a.role}
              </div>
            </div>
            <StatusDot approved={a.approved} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-black/[0.06] pt-2 text-text-secondary/70 dark:border-white/[0.07] dark:text-text-dark-secondary/60">
        <Plus className="size-2.5" strokeWidth={2.5} />
        <span className="text-[8.5px]">Add approver</span>
      </div>
    </Snippet>
  );
}

function StatusDot({ approved }: { approved: boolean }) {
  const color = approved ? SUCCESS : WARNING;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7.5px] font-semibold"
      style={{ background: withAlpha(color, 0.14), color }}
    >
      {approved ? <Check className="size-2.5" strokeWidth={3} /> : <Clock className="size-2.5" strokeWidth={2.5} />}
      {approved ? "Approved" : "Pending"}
    </span>
  );
}

// A frosted snippet card — floats above the field, reads in front of the invoice.
function Snippet({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border px-3 py-2.5",
        "border-white/70 bg-white/85 backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_24px_48px_-18px_rgba(14,26,51,0.5),0_6px_16px_-8px_rgba(14,26,51,0.22)]",
        "dark:border-white/[0.12] dark:bg-surface-dark-elevated/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_50px_-20px_rgba(0,0,0,0.6)]",
      )}
    >
      {/* cyan top hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.5)} 30%, transparent 86%)` }}
      />
      {children}
    </div>
  );
}
