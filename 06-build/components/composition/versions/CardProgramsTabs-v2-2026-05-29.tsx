"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CreditCard, Plus, RefreshCw } from "lucide-react";
import { PaymentCard } from "@/components/artifacts/PaymentCard";
import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";
import { dur, ease, visual, withAlpha } from "@/components/visuals";

// ── CardProgramsTabs — Card Issuing §3 ──────────────────────────────────────
//
// "Issue debit, prepaid, and credit cards." Vertical, stacked program tabs on
// the left (Debit / Prepaid / Credit); the active one expands to reveal its
// copy. The right column is a single connected stage: the program's card (kept
// straight — never tilted — and vertical), a dotted connector, and the
// program's UI snippet, all swapping together.
//
// v2 (2026-05-28) rebuild for the product-page premium pass:
//   - No eyebrow. The headline leads (design-system.md §2 — the no-eyebrow rule
//     now extends to product pages; CLAUDE.md v1.5).
//   - The active-tab affordance is NO LONGER a coloured left border-stripe
//     (impeccable absolute ban + design-system.md §5 "single-sided borders are
//     bugs"). It is now a full-bleed tinted rounded PANEL behind the active row
//     plus a leading filled indicator and weight/colour contrast.
//   - The left tabs and the right card/snippet now read as ONE connected
//     composition: each side is a self-contained bordered stage of matched
//     height, the dead vertical space below the last tab and the empty mid-gap
//     are gone, and the dotted connector visibly ties card → snippet inside the
//     stage (referencing the owner's card-issuing reference).
//
// Copy mirrored verbatim from ../02-copy/card-issuing-copy.md §3.
// Accessible: real tablist / tab / tabpanel semantics, arrow-key navigation.
// Reduced-motion: instant swap, no slide/expand, no ambient drift.

const COPY = {
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
    card: <PaymentCard orientation="vertical" tone="dark" network="visa" label="debit" />,
    panel: <DebitPanel />,
  },
  {
    key: "prepaid",
    label: "Prepaid",
    description: "Reloadable, gift, and disbursement cards with per-card spend tracking.",
    card: (
      <PaymentCard orientation="vertical" tone="dark" finish="electric" network="visa" label="prepaid" />
    ),
    panel: <PrepaidPanel />,
  },
  {
    key: "credit",
    label: "Credit",
    description:
      "Run revolving credit, BNPL, and installment plans — configure limits, billing cycles, grace periods, and repayment through the API.",
    card: <PaymentCard orientation="vertical" tone="light" network="visa" label="credit" />,
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
        {/* No eyebrow — headline leads (CLAUDE.md v1.5 no-eyebrow rule). */}
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.body}
        </p>
      </div>

      {/* One connected composition: two matched-height stages. `items-stretch`
          + each stage filling its column closes the old mid-gap and the dead
          space below the last tab. */}
      <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Left — vertical, stacked program tabs inside one bordered stage. The
            active row is a tinted rounded PANEL (no left stripe). */}
        <div
          role="tablist"
          aria-label="Card programs"
          aria-orientation="vertical"
          onKeyDown={onKey}
          className={cn(
            "flex flex-col gap-1.5 rounded-2xl border p-2.5 lg:col-span-5",
            "border-surface-border-subtle bg-surface-soft/60",
            "dark:border-surface-dark-border dark:bg-surface-dark-elevated/40",
          )}
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
                  "group relative flex flex-1 flex-col rounded-xl px-5 py-5 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
                  isActive
                    ? "bg-white shadow-[0_14px_36px_-20px_rgba(14,26,51,0.28)] dark:bg-surface-dark-base/70"
                    : "hover:bg-white/60 dark:hover:bg-surface-dark-base/40",
                )}
              >
                <span className="flex items-center gap-3">
                  {/* Leading filled indicator — the active affordance, never a
                      side stripe. Filled violet dot in a ring when active. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full ring-1 transition-colors",
                      isActive
                        ? "ring-brand-purple/40"
                        : "ring-surface-border-stronger dark:ring-surface-dark-border-stronger",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full transition-colors",
                        isActive
                          ? "bg-brand-purple"
                          : "bg-text-muted/40 group-hover:bg-text-muted/70 dark:bg-white/25",
                      )}
                    />
                  </span>
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
                </span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={reduced ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduced ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: dur.slow, ease: ease.out }}
                      className="mt-2 max-w-md overflow-hidden pl-8 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary"
                    >
                      {p.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Right — the active program's card + UI snippet on one tonal stage,
            tied by a crisp dotted connector. Card is STRAIGHT (vertical),
            never tilted. */}
        <div role="tabpanel" className="lg:col-span-7">
          <div
            className="relative h-full min-h-[24rem] overflow-hidden rounded-2xl border border-surface-border-subtle dark:border-surface-dark-border"
            style={{
              background:
                `radial-gradient(120% 100% at 16% 8%, ${withAlpha(visual.purple, 0.09)}, transparent 60%),` +
                `radial-gradient(120% 110% at 96% 104%, ${withAlpha(visual.indigo, 0.08)}, transparent 64%)`,
            }}
          >
            {/* Dark stage — translucent light pane so the cool wash + card read
                on a calm ground while the page stays dark. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-surface-dark-elevated/40 dark:block"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={program.key}
                className="absolute inset-0 flex items-center justify-center p-7 sm:p-9"
                initial={reduced ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: dur.slow, ease: ease.out }}
              >
                {/* The composition: vertical card on the left, snippet on the
                    right, joined by an L-shaped dotted connector. Sized to a
                    fixed measure so the card stays straight and the connector
                    geometry is crisp at every breakpoint. */}
                <div className="relative flex w-full max-w-[420px] items-center gap-6 sm:gap-8">
                  {/* Card — straight, vertical, holds its footprint. */}
                  <div className="w-[40%] max-w-[168px] shrink-0">{program.card}</div>

                  {/* Dotted connector — a clean horizontal run from the card to
                      the snippet, with a node where it meets the snippet. */}
                  <span
                    aria-hidden="true"
                    className="relative flex h-px flex-1 items-center"
                  >
                    <span className="block h-px w-full border-t border-dashed border-brand-purple/55 dark:border-accent-cyan/45" />
                    <span className="absolute right-0 grid size-5 -translate-y-0 translate-x-1/2 place-items-center rounded-full bg-white text-brand-purple shadow-[0_4px_12px_rgba(14,26,51,0.18)] ring-1 ring-surface-border-subtle dark:bg-surface-dark-base dark:text-accent-cyan dark:ring-surface-dark-border">
                      <Plus className="size-3" strokeWidth={2.5} />
                    </span>
                  </span>

                  {/* UI snippet. */}
                  <div className="w-[46%] max-w-[212px] shrink-0">{program.panel}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
