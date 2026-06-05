"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { PopIn } from "@/components/visuals/product-illustration";

// ── Commercial Payments §3 · Accounts Receivable — product illustration ───────
//
// The mirror of Accounts Payable: instead of scanning an inbound supplier
// invoice, the business ISSUES an invoice and gets PAID. Concept (owner-picked):
// "invoice gets paid". The sequence —
//   1  a "Payment received · Visa ****" toast lands (lower-left),
//   2  a rotated PAID stamp slams onto the invoice (status Sent → Paid),
//   3  a "Cash collected this month" snippet counts up (upper-right).
// Deliberately NO scanner (that's AP / Spend) so the §3 row reads distinct.
//
// Layout language matches AP for cohesion: a centred document with two frosted
// snippets slightly overlaying it on either side; squared (rounded-lg) radii.
// USD throughout. Translucent against the section field (no confining card).
//
// Motion (§9): static at rest; one motivated sequence on scroll-into-view + hover.
// prefers-reduced-motion → the settled end state (Paid, both snippets shown, no
// count-up). Institution POV: the bank's receivables product collecting on its
// business customer's invoice.

const SUCCESS = tokens.color.semantic.success; // #10B981
const WARNING = tokens.color.semantic.warning; // #F59E0B

// Reporting figures for the receivables snippet (paid vs outstanding).
const PAID = 312480;
const OUTSTANDING = 84300;
const PAID_PCT = (PAID / (PAID + OUTSTANDING)) * 100; // ~78.7%

export function AccountsReceivableUI() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion();

  // step 0 = sent · 1 = payment toast · 2 = paid stamp · 3 = cash collected.
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced) {
      setStep(3);
      return;
    }
    setStep(0);
    timers.current.push(setTimeout(() => setStep(1), 700));
    timers.current.push(setTimeout(() => setStep(2), 1400));
    timers.current.push(setTimeout(() => setStep(3), 2100));
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
      {/* The outbound invoice — centred, matched to the AP invoice size. */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[228px] -translate-x-1/2 -translate-y-1/2 sm:w-[252px]">
        <Invoice paid={step >= 2} reduced={!!reduced} />
      </div>

      {/* Snippet 1 — payment received toast, LEFT, slightly overlaying. */}
      <PopIn show={step >= 1} className="absolute bottom-[12%] left-0 z-50 w-[180px] sm:left-1 sm:w-[200px]">
        <PaymentToast />
      </PopIn>

      {/* Snippet 2 — receivables report (paid vs outstanding), RIGHT. */}
      <PopIn show={step >= 3} className="absolute right-0 top-[11%] z-50 w-[182px] sm:right-1 sm:w-[202px]">
        <ReceivablesReport active={step >= 3} reduced={!!reduced} />
      </PopIn>
    </div>
  );
}

// ── The outbound invoice (+ the PAID stamp) ──────────────────────────────────
function Invoice({ paid, reduced }: { paid: boolean; reduced: boolean }) {
  const ink = visual.navy;
  const inkSoft = withAlpha(visual.navy, 0.58);
  const rule = withAlpha(visual.navy, 0.1);

  return (
    <div className="relative overflow-hidden rounded-[7px] bg-white shadow-[0_34px_64px_-16px_rgba(14,26,51,0.6),0_10px_24px_-8px_rgba(14,26,51,0.3),0_0_0_1px_rgba(14,26,51,0.04)]">
      <div className="px-4 py-3.5" style={{ color: ink }}>
        {/* Header — issuer + invoice no. + status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="grid size-5 place-items-center rounded-[4px] text-[8px] font-bold text-white"
              style={{ background: `linear-gradient(150deg, ${visual.cyan}, ${visual.primary})` }}
            >
              M
            </span>
            <div className="leading-tight">
              <div className="text-[9px] font-bold">Meridian Studio</div>
              <div className="font-mono text-[6.5px] uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
                Issuer
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[13px] font-bold leading-none tracking-tight">Invoice</div>
            <div className="font-mono text-[7px] tracking-[0.1em]" style={{ color: inkSoft }}>
              #1043
            </div>
            <InvoiceStatus paid={paid} />
          </div>
        </div>

        {/* Meta */}
        <div className="mt-2.5 grid grid-cols-2 gap-1 font-mono text-[6.5px] uppercase tracking-[0.1em]" style={{ color: inkSoft }}>
          <span>Issued 05 Jun 2026</span>
          <span className="text-right">Due 20 Jun 2026</span>
          <span>Bill to · Globex Ltd</span>
          <span className="text-right">Net 15</span>
        </div>

        <div className="my-2.5 h-px w-full" style={{ background: rule }} />

        {/* Line items */}
        <div className="flex items-center justify-between font-mono text-[6.5px] uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
          <span>Description</span>
          <span>Amount</span>
        </div>
        <div className="mt-1.5 space-y-1.5 text-[8px]">
          <div className="flex items-center justify-between">
            <span style={{ color: ink }}>Design retainer · Jun</span>
            <span className="tabular-nums" style={{ color: ink }}>$36,000.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: ink }}>Hosting &amp; infrastructure</span>
            <span className="tabular-nums" style={{ color: ink }}>$7,200.00</span>
          </div>
          <div className="flex items-center justify-between" style={{ opacity: 0.5 }}>
            <span style={{ color: ink }}>Support &amp; maintenance</span>
            <span className="tabular-nums" style={{ color: ink }}>$1,800.00</span>
          </div>
        </div>

        <div className="my-2.5 h-px w-full" style={{ background: rule }} />

        {/* Subtotal + tax */}
        <div className="space-y-1 text-[7.5px]" style={{ color: inkSoft }}>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="tabular-nums" style={{ color: ink }}>$45,000.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (VAT)</span>
            <span className="tabular-nums" style={{ color: ink }}>$3,250.00</span>
          </div>
        </div>

        {/* Total due */}
        <div
          className="mt-2 flex items-baseline justify-between rounded-[5px] px-2 py-1.5"
          style={{ background: withAlpha(visual.cyan, 0.1), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}` }}
        >
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.12em]" style={{ color: ink }}>
            Total due
          </span>
          <span className="text-[12px] font-bold tabular-nums" style={{ color: ink }}>$48,250.00</span>
        </div>

        <div className="mt-2.5 text-center font-mono text-[6.5px] uppercase tracking-[0.16em]" style={{ color: inkSoft }}>
          Payable to Meridian Studio · USD
        </div>
      </div>

      {/* PAID stamp — slams on when paid. */}
      <PaidStamp paid={paid} reduced={reduced} />
    </div>
  );
}

function InvoiceStatus({ paid }: { paid: boolean }) {
  const color = paid ? SUCCESS : WARNING;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[6.5px] font-bold uppercase tracking-[0.1em]"
      style={{ background: withAlpha(color, 0.16), color }}
    >
      <span className="size-1 rounded-full" style={{ background: color }} />
      {paid ? "Paid" : "Sent"}
    </span>
  );
}

// A rotated ink stamp that slams onto the invoice.
function PaidStamp({ paid, reduced }: { paid: boolean; reduced: boolean }) {
  const green = SUCCESS;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[28%] z-30 grid place-items-center"
      initial={reduced ? false : { opacity: 0, scale: 1.7, rotate: -2 }}
      animate={
        reduced
          ? { opacity: paid ? 1 : 0 }
          : paid
            ? { opacity: 1, scale: 1, rotate: -13 }
            : { opacity: 0, scale: 1.7, rotate: -2 }
      }
      transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1.05] }}
    >
      <div
        className="rounded-[7px] px-3 py-1 text-center"
        style={{
          color: green,
          border: `2.5px solid ${green}`,
          boxShadow: `inset 0 0 0 1.5px ${withAlpha(green, 0.35)}`,
          background: withAlpha(green, 0.08),
        }}
      >
        <div className="font-display text-[19px] font-black leading-none tracking-[0.08em]">PAID</div>
        <div className="mt-0.5 font-mono text-[6px] font-bold uppercase tracking-[0.16em]" style={{ color: withAlpha(green, 0.85) }}>
          05 Jun 2026
        </div>
      </div>
    </motion.div>
  );
}

// ── Snippet: payment received ────────────────────────────────────────────────
function PaymentToast() {
  return (
    <Snippet>
      <div className="flex items-center gap-2">
        <span
          className="grid size-6 shrink-0 place-items-center rounded-full text-white"
          style={{ background: `linear-gradient(150deg, ${SUCCESS}, ${withAlpha(SUCCESS, 0.7)})`, boxShadow: `0 0 14px ${withAlpha(SUCCESS, 0.5)}` }}
        >
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-[10px] font-semibold text-text-primary dark:text-text-dark-primary">Payment received</div>
          <div className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-secondary/80 dark:text-text-dark-secondary/70">
            $48,250.00 · Visa ****4821
          </div>
        </div>
      </div>
    </Snippet>
  );
}

// ── Snippet: receivables report (paid vs outstanding) ────────────────────────
// A small reporting card: a stacked bar of paid vs outstanding receivables, with
// the paid segment growing in when the snippet appears. Reduced motion → settled.
function ReceivablesReport({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <Snippet>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
          Receivables · Jun
        </span>
        <span className="inline-flex items-center gap-0.5 font-mono text-[8px] font-semibold" style={{ color: SUCCESS }}>
          <TrendingUp className="size-2.5" strokeWidth={2.5} />
          18%
        </span>
      </div>

      {/* Stacked bar: the amber track is "outstanding"; the cyan fill is "paid". */}
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full"
        style={{ background: withAlpha(WARNING, 0.22) }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${visual.primary}, ${visual.cyan})` }}
          initial={reduced ? false : { width: 0 }}
          animate={{ width: `${active || reduced ? PAID_PCT : 0}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Legend + figures */}
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <Figure dot={visual.cyan} label="Paid" value="$312,480" count="24 invoices" />
        <Figure dot={WARNING} label="Outstanding" value="$84,300" count="6 invoices" />
      </div>
    </Snippet>
  );
}

function Figure({ dot, label, value, count }: { dot: string; label: string; value: string; count: string }) {
  return (
    <div>
      <div className="flex items-center gap-1">
        <span className="size-1.5 rounded-full" style={{ background: dot }} />
        <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
          {label}
        </span>
      </div>
      <div className="mt-0.5 text-[13px] font-bold tabular-nums leading-none tracking-tight text-text-primary dark:text-text-on-brand">
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-text-secondary/70 dark:text-text-dark-secondary/60">
        {count}
      </div>
    </div>
  );
}

// A frosted snippet card (squared radius, matching Accounts Payable).
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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.5)} 30%, transparent 86%)` }}
      />
      {children}
    </div>
  );
}
