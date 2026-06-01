"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Banknote, Car, Coffee, ShoppingBag } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";

// ── CardProgramsBento — Card Issuing §3 ─────────────────────────────────────
//
// "Issue debit, prepaid, and credit cards." The asymmetric bento from the
// Claude Design handoff ("Card Programs Section.html"): Debit + Prepaid on row
// one (half-width each), Credit & installments as a full-width, two-row tall
// showpiece beneath. Each tile carries a live-feeling UI snippet as its primary
// visual — the UIs do the work, no atmospheric background.
//
// Rebuild of the v2 tabbed CardProgramsTabs (archived 2026-05-29) against the
// handoff bento. Faithful to the design's layout and content, adapted to the
// NymCard system:
//   - NO section eyebrow — the headline leads (CLAUDE.md v1.5 no-eyebrow rule).
//     Per-tile kind labels (Debit / Prepaid / Credit) stay — real content.
//   - NO fake live tickers / perpetual auto-cycling (CLAUDE.md §guardrails 3 —
//     "no fake live tickers"). The prototype's timer-driven feed / top-up / EMI
//     loops become: feed + EMI + meter reveal ONCE on entrance, and the top-up
//     and the installments toggle are GENUINE user interactions. Static at rest.
//   - Tokens only, light + dark by construction, prefers-reduced-motion safe.
//
// Marketing copy mirrored verbatim from ../02-copy/card-issuing-copy.md §3.
// EXCEPTION (approved by owner 2026-05-29, FLAGGED for backfill): the three
// per-tile `title` strings come from the handoff and are NOT yet in
// card-issuing-copy.md §3 — add them there so copy stays single-source.
//
// Snippet figures (balances, merchants, EMI schedule, statement) are
// illustrative UI mock data from the handoff, not marketing copy.

const COPY = {
  headline: "Issue debit, credit, and prepaid cards.",
  body: "One platform, one set of APIs, every card type your customers need — issued as physical, virtual, or tokenized.",
  debit: {
    kind: "Debit",
    // FLAGGED: title not yet in ../02-copy/card-issuing-copy.md §3.
    title: "Account-linked debit",
    desc: "Cards linked to live accounts with real-time authorization across consumer and commercial programs.",
  },
  prepaid: {
    kind: "Prepaid",
    // FLAGGED: title not yet in ../02-copy/card-issuing-copy.md §3.
    title: "Reloadable prepaid",
    desc: "Reloadable, gift, and disbursement cards with per-card spend tracking.",
  },
  credit: {
    kind: "Credit and installments",
    // FLAGGED: title not yet in ../02-copy/card-issuing-copy.md §3.
    title: "Revolving credit, with installments built in.",
    desc: "Run revolving credit, BNPL, and installment plans — configure limits, billing cycles, grace periods, and repayment through the API.",
  },
} as const;

// ── shared atoms ────────────────────────────────────────────────────────────

const subLabel =
  "font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted";
const innerPanel =
  "rounded-lg border border-surface-border-subtle bg-surface-white dark:border-surface-dark-border dark:bg-surface-dark-elevated";
const snippetShell =
  "mx-6 mb-6 mt-5 flex flex-1 flex-col rounded-lg border border-surface-border-subtle bg-surface-soft p-[18px] dark:border-surface-dark-border dark:bg-surface-dark-base/50";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function TileShell({
  kind,
  kindClass,
  title,
  desc,
  children,
  className,
}: {
  kind: string;
  kindClass: string;
  title: string;
  desc: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-card shadow-sm",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      <div className="px-8 pt-8 pb-2">
        <p className={cn("mb-2.5 font-mono text-[11px] uppercase tracking-[0.12em]", kindClass)}>
          {kind}
        </p>
        <h3 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.01em] text-text-primary dark:text-text-on-brand">
          {title}
        </h3>
        <p className="mt-2 max-w-[44ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
          {desc}
        </p>
      </div>
      {children}
    </article>
  );
}

// ── Debit: activity feed (one-time staggered reveal, static at rest) ─────────

type Txn = {
  icon: React.ReactNode;
  merchant: string;
  meta: string;
  amount: string;
  positive?: boolean;
};

const TXNS: Txn[] = [
  {
    icon: <Banknote className="size-[15px]" />,
    merchant: "Salary · DEWA",
    meta: "Deposit · MCC 6011",
    amount: "+ $3,200.00",
    positive: true,
  },
  {
    icon: <ShoppingBag className="size-[15px]" />,
    merchant: "Carrefour",
    meta: "Groceries · MCC 5411",
    amount: "− $24.00",
  },
  {
    icon: <Car className="size-[15px]" />,
    merchant: "Careem",
    meta: "Ride-hail · MCC 4121",
    amount: "− $18.50",
  },
  {
    icon: <Coffee className="size-[15px]" />,
    merchant: "Starbucks",
    meta: "Dining · MCC 5814",
    amount: "− $6.25",
  },
];

function DebitSnippet() {
  const reduced = useReducedMotion();
  const rowMotion = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.12 + i * 0.09, duration: dur.slow, ease: ease.out },
        };
  return (
    <div className={snippetShell}>
      <div className="mb-3.5 flex flex-col gap-0.5">
        <span className={subLabel}>Available balance</span>
        <span className="font-mono text-[26px] font-semibold tracking-[-0.5px] tabular-nums text-text-primary dark:text-text-on-brand">
          $4,182.50
        </span>
      </div>
      <div className="flex flex-col">
        {TXNS.map((t, i) => (
          <motion.div
            key={t.merchant}
            {...rowMotion(i)}
            className="grid grid-cols-[28px_1fr_auto] items-center gap-2.5 border-b border-surface-border-subtle py-2.5 last:border-b-0 dark:border-surface-dark-border"
          >
            <span className="grid size-7 place-items-center rounded-md border border-surface-border-subtle bg-surface-white text-text-secondary dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-dark-secondary">
              {t.icon}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-body text-[13px] font-medium text-text-primary dark:text-text-on-brand">
                {t.merchant}
              </span>
              <span className="truncate font-mono text-[11px] text-text-muted dark:text-text-dark-muted">
                {t.meta}
              </span>
            </span>
            <span
              className={cn(
                "font-mono text-[13px] font-semibold tabular-nums",
                t.positive
                  ? "text-semantic-success"
                  : "text-text-primary dark:text-text-on-brand",
              )}
            >
              {t.amount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Prepaid: interactive top-up ──────────────────────────────────────────────

const PREPAID_AMOUNTS = [50, 100, 200] as const;

type Load = { id: number; amount: number; when: string; fresh?: boolean };

function PrepaidSnippet() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(100);
  const [balance, setBalance] = useState(327.41);
  const [display, setDisplay] = useState(327.41);
  const [loads, setLoads] = useState<Load[]>([
    { id: 1, amount: 300, when: "04 Nov" },
    { id: 2, amount: 150, when: "18 Nov" },
  ]);
  const rafRef = useRef<number | null>(null);
  const nextId = useRef(3);

  const animateTo = useCallback(
    (from: number, to: number) => {
      if (reduced) {
        setDisplay(to);
        return;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const duration = dur.deliberate * 1000;
      const step = (now: number) => {
        const k = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - k, 3);
        setDisplay(from + (to - from) * eased);
        if (k < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [reduced],
  );

  const topUp = useCallback(() => {
    const next = balance + selected;
    animateTo(balance, next);
    setBalance(next);
    setLoads((prev) =>
      [
        { id: nextId.current++, amount: selected, when: "Today", fresh: true },
        ...prev.map((l) => ({ ...l, fresh: false })),
      ].slice(0, 3),
    );
  }, [animateTo, balance, selected]);

  return (
    <div className={snippetShell}>
      <div className="mb-3.5 flex flex-col gap-0.5">
        <span className={subLabel}>Card balance</span>
        <span className="font-mono text-[26px] font-semibold tracking-[-0.5px] tabular-nums text-text-primary dark:text-text-on-brand">
          {usd(display)}
        </span>
      </div>

      <div className="mb-3.5 flex gap-2">
        {PREPAID_AMOUNTS.map((v) => {
          const active = v === selected;
          return (
            <button
              key={v}
              type="button"
              onClick={() => setSelected(v)}
              aria-pressed={active}
              className={cn(
                "flex-1 rounded-md border py-2.5 text-center font-mono text-[13px] font-medium tabular-nums transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40",
                active
                  ? "border-brand-purple bg-brand-purple/[0.08] text-brand-purple shadow-[0_0_0_3px_rgba(91,79,217,0.12)] dark:bg-brand-purple/20 dark:text-text-on-brand"
                  : "border-surface-border-subtle bg-surface-white text-text-secondary hover:border-surface-border-stronger dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-dark-secondary",
              )}
            >
              ${v}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={topUp}
        className="mb-3.5 w-full rounded-md bg-brand-purple py-2.5 font-body text-[13px] font-semibold text-white transition-colors hover:bg-brand-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
      >
        Top up
      </button>

      <span className={cn(subLabel, "mb-1.5")}>Recent loads</span>
      <div className="flex flex-col">
        <AnimatePresence initial={false}>
          {loads.map((l) => (
            <motion.div
              key={l.id}
              layout={!reduced}
              initial={reduced || !l.fresh ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: dur.slow, ease: ease.out }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between border-t border-surface-border-subtle py-2 text-[12px] first:border-t-0 dark:border-surface-dark-border">
                <span className="font-mono font-semibold text-semantic-success">
                  + {usd(l.amount)}
                </span>
                <span className="font-mono text-text-muted dark:text-text-dark-muted">
                  {l.when}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Credit: showpiece (credit line + installments + statement) ───────────────

const EMI = [
  { n: "1 / 4", amount: "$300.00", status: "Paid", paid: true },
  { n: "2 / 4", amount: "$300.00", status: "Due 12 Jan", paid: false },
  { n: "3 / 4", amount: "$300.00", status: "Scheduled", paid: false },
  { n: "4 / 4", amount: "$300.00", status: "Scheduled", paid: false },
] as const;

function CreditSnippet() {
  const reduced = useReducedMotion();
  const [installments, setInstallments] = useState(true);

  return (
    <div className={cn(snippetShell, "block")}>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_1fr]">
        {/* credit line */}
        <div className={cn(innerPanel, "p-[18px]")}>
          <span className={subLabel}>Available credit</span>
          <div className="mt-1 font-mono text-[30px] font-semibold tracking-[-0.5px] tabular-nums text-text-primary dark:text-text-on-brand">
            $18,420
          </div>
          <div className="font-mono text-[11px] text-text-muted dark:text-text-dark-muted">
            of $25,000 limit
          </div>
          <div className="my-3.5 h-2 overflow-hidden rounded-pill bg-surface-soft dark:bg-surface-dark-base">
            <motion.span
              className="block h-full rounded-pill bg-gradient-to-r from-brand-primary to-accent-cyan"
              style={reduced ? { width: "26%" } : undefined}
              {...(reduced
                ? {}
                : {
                    initial: { width: 0 },
                    animate: { width: "26%" },
                    transition: { delay: 0.2, duration: dur.cinematic, ease: ease.out },
                  })}
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-text-muted dark:text-text-dark-muted">
            <span>26% utilised</span>
            <span>APR 19.4%</span>
          </div>
        </div>

        {/* installments */}
        <div className={cn(innerPanel, "p-[18px]")}>
          <div className="mb-2 flex items-center justify-between">
            <span className={subLabel}>Installments</span>
            <button
              type="button"
              role="switch"
              aria-checked={installments}
              aria-label="Convert to installments"
              onClick={() => setInstallments((v) => !v)}
              className="inline-flex items-center gap-2 font-body text-[12px] text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:text-text-dark-secondary"
            >
              Convert
              <span
                className={cn(
                  "relative inline-block h-[19px] w-[34px] shrink-0 rounded-full transition-colors duration-300",
                  installments
                    ? "bg-brand-primary"
                    : "bg-surface-border-stronger dark:bg-surface-dark-border-stronger",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-[15px] rounded-full bg-white shadow-sm transition-[left] duration-300",
                    installments ? "left-[17px]" : "left-0.5",
                  )}
                  style={{ transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }}
                />
              </span>
            </button>
          </div>
          <div className="mb-2 font-body text-[12px] text-text-secondary dark:text-text-dark-secondary">
            Noon.com · <span className="font-mono tabular-nums">$1,200.00</span>
          </div>

          {installments ? (
            <div className="flex flex-col">
              {EMI.map((r, i) => (
                <motion.div
                  key={r.n}
                  initial={reduced ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduced
                      ? undefined
                      : { delay: 0.1 + i * 0.08, duration: dur.slow, ease: ease.out }
                  }
                  className="flex items-center justify-between border-t border-surface-border-subtle py-2 text-[12px] first:border-t-0 dark:border-surface-dark-border"
                >
                  <span className="text-text-muted dark:text-text-dark-muted">{r.n}</span>
                  <span className="font-mono font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                    {r.amount}{" "}
                    <span
                      className={cn(
                        "font-normal",
                        r.paid
                          ? "text-semantic-success"
                          : "text-text-muted dark:text-text-dark-muted",
                      )}
                    >
                      · {r.status}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between border-t border-surface-border-subtle py-2 text-[12px] dark:border-surface-dark-border">
              <span className="text-text-muted dark:text-text-dark-muted">Charged in full</span>
              <span className="font-mono font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                $1,200.00
              </span>
            </div>
          )}
        </div>

        {/* statement */}
        <div className={cn(innerPanel, "p-[18px]")}>
          <span className={subLabel}>Statement</span>
          <div className="my-2">
            <div className="font-mono text-[20px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
              $1,840.00
            </div>
            <div className="font-mono text-[11px] text-text-muted dark:text-text-dark-muted">
              current balance
            </div>
          </div>
          {[
            ["Minimum due", "$250.00"],
            ["Cycle closes", "22 Dec"],
            ["Grace period", "21 days"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border-t border-surface-border-subtle py-[7px] text-[12px] first:border-t-0 dark:border-surface-dark-border"
            >
              <span className="text-text-muted dark:text-text-dark-muted">{label}</span>
              <span className="font-mono tabular-nums text-text-primary dark:text-text-on-brand">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function CardProgramsBento() {
  return (
    <Section bg="white" ariaLabel="Card programs">
      {/* No eyebrow — headline leads (CLAUDE.md v1.5). Asymmetric end-aligned
          header: headline left, body right (handoff .head 1.1fr / 0.9fr). */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[16ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[42ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.body}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TileShell
          kind={COPY.debit.kind}
          kindClass="text-accent-teal dark:text-accent-cyan"
          title={COPY.debit.title}
          desc={COPY.debit.desc}
        >
          <DebitSnippet />
        </TileShell>

        <TileShell
          kind={COPY.prepaid.kind}
          kindClass="text-brand-purple dark:text-accent-indigo"
          title={COPY.prepaid.title}
          desc={COPY.prepaid.desc}
        >
          <PrepaidSnippet />
        </TileShell>

        <TileShell
          kind={COPY.credit.kind}
          kindClass="text-brand-primary dark:text-text-dark-link"
          title={COPY.credit.title}
          desc={COPY.credit.desc}
          className="lg:col-span-2"
        >
          <CreditSnippet />
        </TileShell>
      </div>
    </Section>
  );
}
