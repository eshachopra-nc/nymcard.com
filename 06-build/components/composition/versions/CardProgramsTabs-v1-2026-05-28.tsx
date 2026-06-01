"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CreditCard, Plus, RefreshCw } from "lucide-react";
import { PaymentCard } from "@/components/artifacts/PaymentCard";
import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── CardProgramsTabs — Card Issuing §3 ──────────────────────────────────────
//
// "Issue debit, prepaid, and credit cards." Vertical, stacked program tabs on
// the left (Debit / Prepaid / Credit); the active one expands to reveal its
// copy. The right column shows that program's card + UI snippet, swapping
// together. The card + dotted-connector + white violet-accented panel language
// comes from the card-issuing references.
//
// Copy mirrored verbatim from ../02-copy/card-issuing-copy.md §3.
// Accessible: real tablist / tab / tabpanel semantics, arrow-key navigation.
// Reduced-motion: instant swap, no slide/expand.

const COPY = {
  eyebrow: "Card programs",
  headline: "Issue debit, prepaid, and credit cards.",
  body: "One platform, one set of APIs, every card type your customers need — issued as physical, virtual, or tokenized.",
} as const;

const PANEL =
  "rounded-button border border-surface-border-subtle bg-white px-4 py-3.5 shadow-[0_18px_44px_-16px_rgba(14,26,51,0.3)]";

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-purple/[0.12] text-brand-purple">
      {children}
    </span>
  );
}

function Toggle() {
  return (
    <span className="relative inline-block h-4 w-7 shrink-0 rounded-full bg-brand-purple">
      <span className="absolute right-0.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow-sm" />
    </span>
  );
}

// ── Per-program UI snippets ─────────────────────────────────────────────────

function DebitPanel() {
  return (
    <div className={cn(PANEL, "w-full")}>
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconTile>
            <RefreshCw className="size-3.5" />
          </IconTile>
          <span className="font-display text-[13px] font-semibold text-text-primary">
            Auto-debit
          </span>
        </div>
        <Toggle />
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-body text-[12px] text-text-primary">Utility Bill</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
            Due May 28
          </span>
        </div>
        <span className="font-mono text-[13px] font-semibold tabular-nums text-text-primary">
          USD 120.00
        </span>
      </div>
    </div>
  );
}

function PrepaidPanel() {
  return (
    <div className={cn(PANEL, "w-full")}>
      <div className="mb-2.5 flex items-center gap-2">
        <IconTile>
          <Plus className="size-3.5" strokeWidth={2.5} />
        </IconTile>
        <span className="font-display text-[13px] font-semibold text-text-primary">Top up</span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">Amount</span>
      <div className="mb-2.5 font-display text-lg font-semibold tabular-nums text-text-primary">
        USD 150.00
      </div>
      <div className="mb-3 flex gap-1.5">
        {["50", "100", "150", "200"].map((v) => (
          <span
            key={v}
            className={cn(
              "flex-1 rounded-md py-1 text-center font-mono text-[10px] tabular-nums",
              v === "150"
                ? "bg-brand-purple/[0.12] text-brand-purple ring-1 ring-inset ring-brand-purple/30"
                : "bg-surface-soft text-text-secondary",
            )}
          >
            ${v}
          </span>
        ))}
      </div>
      <span className="flex items-center justify-center gap-1.5 rounded-button bg-brand-purple py-2 font-body text-[12px] font-semibold text-white">
        Top up
        <ArrowRight className="size-3.5" />
      </span>
    </div>
  );
}

function CreditPanel() {
  return (
    <div className={cn(PANEL, "w-full")}>
      <div className="mb-3 flex items-center gap-2">
        <IconTile>
          <CreditCard className="size-3.5" />
        </IconTile>
        <span className="font-display text-[13px] font-semibold text-text-primary">
          Credit limit
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[12px] tabular-nums text-text-primary">USD 7,400</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
          of 10,000
        </span>
      </div>
      <span className="mt-1.5 mb-3 block h-1.5 w-full overflow-hidden rounded-full bg-surface-soft">
        <span className="block h-full rounded-full bg-brand-purple" style={{ width: "74%" }} />
      </span>
      <div className="flex items-center justify-between">
        <span className="font-body text-[12px] text-text-secondary">Pay in 4</span>
        <span className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-5 rounded-full",
                i === 0 ? "bg-brand-purple" : "bg-surface-border-stronger",
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

// ── Program definitions ─────────────────────────────────────────────────────

type Program = {
  key: string;
  label: string;
  description: string;
  card: React.ReactNode;
  panel: React.ReactNode;
};

const PROGRAMS: Program[] = [
  {
    key: "debit",
    label: "Debit",
    description:
      "Cards linked to live accounts with real-time authorization across consumer and commercial programs.",
    card: <PaymentCard tone="dark" network="visa" label="debit" />,
    panel: <DebitPanel />,
  },
  {
    key: "prepaid",
    label: "Prepaid",
    description: "Reloadable, gift, and disbursement cards with per-card spend tracking.",
    card: <PaymentCard tone="dark" finish="electric" network="visa" label="prepaid" />,
    panel: <PrepaidPanel />,
  },
  {
    key: "credit",
    label: "Credit",
    description:
      "Run revolving credit, BNPL, and installment plans — configure limits, billing cycles, grace periods, and repayment through the API.",
    card: <PaymentCard tone="light" network="visa" label="credit" />,
    panel: <CreditPanel />,
  },
];

export function CardProgramsTabs() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const program = PROGRAMS[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i + 1) % PROGRAMS.length);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i - 1 + PROGRAMS.length) % PROGRAMS.length);
    }
  };

  return (
    <Section bg="white" ariaLabel="Card programs" className="dark:bg-surface-dark-base">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>{COPY.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.body}
        </p>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Left — vertical, stacked program tabs; the active one expands. */}
        <div
          role="tablist"
          aria-label="Card programs"
          aria-orientation="vertical"
          onKeyDown={onKey}
          className="flex flex-col lg:col-span-5"
        >
          {PROGRAMS.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.key}
                role="tab"
                type="button"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "relative border-l-2 py-5 pl-6 pr-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30",
                  isActive
                    ? "border-brand-purple"
                    : "border-surface-border-subtle hover:border-surface-border-stronger dark:border-surface-dark-border",
                )}
              >
                <span
                  className={cn(
                    "font-display text-lg font-semibold tracking-tight transition-colors",
                    isActive
                      ? "text-text-primary dark:text-text-on-brand"
                      : "text-text-muted dark:text-text-dark-secondary",
                  )}
                >
                  {p.label}
                </span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={reduced ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduced ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: dur.slow, ease: ease.out }}
                      className="mt-2 max-w-md overflow-hidden font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary"
                    >
                      {p.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Right — the active program's card + UI snippet, on a dotted connector. */}
        <div role="tabpanel" className="lg:col-span-7">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={program.key}
                className="absolute inset-0"
                initial={reduced ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: dur.slow, ease: ease.out }}
              >
                {/* Card — bottom-left, straight. */}
                <div className="absolute bottom-[4%] left-0 w-[62%]">{program.card}</div>

                {/* Dotted connector — vertical then horizontal, with a node. */}
                <span
                  aria-hidden="true"
                  className="absolute border-l border-dashed border-brand-purple/50"
                  style={{ left: "34%", top: "22%", height: "20%" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute border-t border-dashed border-brand-purple/50"
                  style={{ left: "34%", top: "22%", width: "24%" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-purple shadow-[0_4px_12px_rgba(14,26,51,0.18)] ring-1 ring-surface-border-subtle"
                  style={{ left: "34%", top: "22%" }}
                >
                  <Plus className="size-3" strokeWidth={2.5} />
                </span>

                {/* UI snippet — top-right. */}
                <div className="absolute right-0 top-0 w-[50%] max-w-[230px]">
                  {program.panel}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
