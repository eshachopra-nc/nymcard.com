"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { PopIn } from "@/components/visuals/product-illustration";

// ── Commercial Payments §3 · Payroll & Workforce Payments — illustration ──────
//
// Concept (owner-picked): "run payroll (batch cascade)". A frosted pay-run panel
// is the whole hero — no beside-snippets, so its layout stays distinct. On
// scroll the run fires: a wave of "✓ Paid" sweeps DOWN the recipient list
// (employees + contractors) while "X of 248 paid" counts up, the progress bar
// fills, and the Run button goes Run → Running → Paid. USD throughout.
//
// Motion (§9): static at rest; the cascade plays once on scroll-into-view and
// replays on hover. prefers-reduced-motion → settled (all paid). Institution
// POV: the bank's payroll product running its business customer's monthly run.

const PRIMARY = visual.primary;
const SUCCESS = tokens.color.semantic.success;

type Recipient = { initials: string; name: string; role: "Employee" | "Contractor"; amount: string };
const ROWS: Recipient[] = [
  { initials: "AO", name: "Amara Okoro", role: "Employee", amount: "$4,200" },
  { initials: "PN", name: "Priya Nair", role: "Employee", amount: "$3,800" },
  { initials: "MR", name: "Marco Rossi", role: "Contractor", amount: "$2,100" },
  { initials: "LF", name: "Lena Fischer", role: "Employee", amount: "$4,050" },
  { initials: "DC", name: "David Chen", role: "Contractor", amount: "$1,650" },
  { initials: "SM", name: "Sofia Marin", role: "Employee", amount: "$3,900" },
];
const N = ROWS.length;
const TOTAL_PEOPLE = 248;

export function PayrollUI() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion();

  const [paid, setPaid] = useState(0); // how many rows have been paid (0..N)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced) {
      setPaid(N);
      return;
    }
    setPaid(0);
    for (let i = 1; i <= N; i++) {
      timers.current.push(setTimeout(() => setPaid(i), 520 + i * 175));
    }
  }, [reduced]);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const done = paid >= N;
  const peoplePaid = Math.round((paid / N) * TOTAL_PEOPLE);

  return (
    <div ref={ref} onMouseEnter={() => !reduced && run()} className="relative flex h-full w-full min-h-[24rem] items-center justify-center">
      <div
        className={cn(
          "relative w-full max-w-[440px] overflow-hidden rounded-xl border px-4 py-3.5 sm:px-5",
          "border-white/70 bg-white/85 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_30px_66px_-26px_rgba(14,26,51,0.42)]",
          "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_60px_-24px_rgba(0,0,0,0.6)]",
        )}
      >
        {/* cyan top hairline */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.5)} 30%, transparent 86%)` }} />

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="leading-tight">
            <h3 className="font-display text-[15px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">June payroll</h3>
            <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
              Monthly run · {TOTAL_PEOPLE} people
            </p>
          </div>
          <RunButton paid={paid} done={done} />
        </div>

        {/* Summary + progress */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="leading-none">
            <div className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-text-secondary/80 dark:text-text-dark-secondary/70">Total</div>
            <div className="mt-1 text-[18px] font-bold tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">$642,000</div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
              <span className="tabular-nums" style={{ color: done ? SUCCESS : undefined }}>
                {peoplePaid} of {TOTAL_PEOPLE} paid
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: withAlpha(visual.primary, 0.12) }}>
              <div
                className="h-full rounded-full transition-[width] duration-300 ease-out"
                style={{ width: `${(paid / N) * 100}%`, background: `linear-gradient(90deg, ${visual.primary}, ${visual.cyan})` }}
              />
            </div>
          </div>
        </div>

        {/* Recipient list — the cascade */}
        <div className="mt-3 border-t border-black/[0.06] pt-1 dark:border-white/[0.06]">
          <div className="grid grid-cols-[1.7fr_0.9fr_0.8fr_0.8fr] gap-2 py-1.5 font-mono text-[7.5px] uppercase tracking-[0.12em] text-text-secondary/70 dark:text-text-dark-secondary/60">
            <span>Recipient</span>
            <span>Type</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Status</span>
          </div>
          <div className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
            {ROWS.map((r, i) => (
              <Row key={r.name} r={r} paid={paid > i} />
            ))}
          </div>
        </div>

        {/* Completion line */}
        <div className="mt-2.5 flex h-4 items-center gap-1.5">
          <PopIn show={done}>
            <span className="grid size-3.5 place-items-center rounded-full text-white" style={{ background: SUCCESS }}>
              <Check className="size-2.5" strokeWidth={3.5} />
            </span>
          </PopIn>
          {done && (
            <span className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: SUCCESS }}>
              Payroll complete · {TOTAL_PEOPLE} paid · $642,000
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ r, paid }: { r: Recipient; paid: boolean }) {
  return (
    <div
      className="grid grid-cols-[1.7fr_0.9fr_0.8fr_0.8fr] items-center gap-2 rounded-md px-1 py-1.5 transition-colors duration-300"
      style={{ background: paid ? withAlpha(SUCCESS, 0.07) : undefined }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-black/[0.06] text-[8px] font-semibold text-text-secondary dark:bg-white/[0.08] dark:text-text-dark-secondary">
          {r.initials}
        </span>
        <span className="truncate text-[11px] font-medium text-text-primary dark:text-text-dark-primary">{r.name}</span>
      </div>
      <RoleChip role={r.role} />
      <span className="text-right text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">{r.amount}</span>
      <div className="flex justify-end">
        <StatusPill paid={paid} />
      </div>
    </div>
  );
}

function RoleChip({ role }: { role: Recipient["role"] }) {
  const color = role === "Employee" ? PRIMARY : visual.indigo;
  return (
    <span
      className="inline-flex w-fit items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-medium"
      style={{ background: withAlpha(color, 0.12), color }}
    >
      {role}
    </span>
  );
}

function StatusPill({ paid }: { paid: boolean }) {
  if (!paid) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-medium text-text-secondary/70 dark:text-text-dark-secondary/60" style={{ background: withAlpha(visual.navy, 0.06) }}>
        <span className="size-1 rounded-full bg-current opacity-60" />
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-semibold" style={{ background: withAlpha(SUCCESS, 0.14), color: SUCCESS }}>
      <PopIn show>
        <Check className="size-2.5" strokeWidth={3.5} />
      </PopIn>
      Paid
    </span>
  );
}

function RunButton({ paid, done }: { paid: number; done: boolean }) {
  const running = paid > 0 && !done;
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold text-white"
      style={{
        background: done ? SUCCESS : `linear-gradient(135deg, ${visual.primary}, ${visual.cyan})`,
        boxShadow: `0 8px 18px -8px ${withAlpha(done ? SUCCESS : visual.cyan, 0.6)}`,
      }}
    >
      {done ? (
        <>
          <Check className="size-3" strokeWidth={3} />
          Paid
        </>
      ) : running ? (
        "Running…"
      ) : (
        <>
          Run payroll
          <ArrowRight className="size-3" strokeWidth={2.5} />
        </>
      )}
    </span>
  );
}
