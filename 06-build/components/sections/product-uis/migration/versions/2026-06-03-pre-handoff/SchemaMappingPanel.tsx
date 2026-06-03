"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, scanSpline } from "@/components/visuals/motion";
import {
  AMBER,
  Crumb,
  LiveDot,
  MigrationFrame,
  StatusChip,
  CheckGlyph,
  useScrollGate,
  useSteps,
} from "./migration-kit";

// ── §4 bento (large) — Schema-mapping panel ───────────────────────────────────
//
// Slot 5. Legacy schema on the left, nCore fields on the right, lines drawing
// between them as the agent resolves each field; anything it can't resolve
// surfaces in an amber review queue for a human to confirm. Maps to §4 (Large)
// "Automated mapping". Flat surface (no atmosphere) filling the bento tile.
//
// Motion: on scroll-in the connector lines draw one by one and each nCore field
// lights as it resolves; the unresolved field stays muted and its review-queue
// row carries the lone amber accent. Reduced motion shows everything resolved
// (except the genuinely unresolved field, which is the point). Tokens only.

// Legacy field → nCore field. `resolved: false` is the one the agent holds for
// review (amber). Illustrative on-system schema names, no customer data.
const MAP: { from: string; to: string; resolved: boolean }[] = [
  { from: "CARDHOLDER_ID", to: "customer.id", resolved: true },
  { from: "PAN_TOKEN", to: "token.ref", resolved: true },
  { from: "BIN_LOW / BIN_HIGH", to: "bin_range", resolved: true },
  { from: "ACCT_STATUS_CD", to: "card.status", resolved: false },
];

export function SchemaMappingPanel({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.4 });
  const resolvedRows = MAP.filter((m) => m.resolved).length;
  const drawn = useSteps(MAP.length, active, reduced, replay, {
    start: 280,
    step: 380,
  });

  return (
    <div ref={ref} {...bind} className={cn("h-full w-full", className)}>
      <MigrationFrame contentClassName="p-4 sm:p-5">
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
          <Crumb>Schema mapping · legacy → nCore</Crumb>
          <LiveDot />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-1.5 sm:gap-2">
          {/* Legacy column. */}
          <Column title="Legacy schema">
            {MAP.map((m) => (
              <Field key={m.from} side="left">
                {m.from}
              </Field>
            ))}
          </Column>

          {/* Connector lines. */}
          <div className="relative w-9 sm:w-12">
            <svg
              viewBox="0 0 48 200"
              className="absolute inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {MAP.map((m, i) => {
                const y = 25 + i * 50;
                const on = reduced || drawn > i;
                const color = m.resolved
                  ? withAlpha(visual.cyan, 0.85)
                  : withAlpha(AMBER, 0.85);
                return (
                  <motion.path
                    key={m.from}
                    d={`M0 ${y} C 18 ${y}, 30 ${y}, 48 ${y}`}
                    stroke={color}
                    strokeWidth={1.4}
                    strokeDasharray={m.resolved ? undefined : "3 3"}
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0.12 }}
                    transition={
                      reduced || !active
                        ? { duration: 0 }
                        : { duration: dur.deliberate, ease: scanSpline }
                    }
                  />
                );
              })}
            </svg>
          </div>

          {/* nCore column. */}
          <Column title="nCore fields" lit>
            {MAP.map((m, i) => {
              const on = reduced ? m.resolved : m.resolved && drawn > i;
              return (
                <Field
                  key={m.to}
                  side="right"
                  tone={m.resolved ? (on ? "resolved" : "pending") : "amber"}
                >
                  <span className="truncate">{m.to}</span>
                  {m.resolved ? (
                    <span
                      className={cn(
                        "ml-auto inline-flex text-accent-teal transition-opacity duration-300 dark:text-accent-cyan",
                        on ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <CheckGlyph size={12} />
                    </span>
                  ) : (
                    <span className="ml-auto font-mono text-[9px] font-bold text-semantic-warning">
                      ?
                    </span>
                  )}
                </Field>
              );
            })}
          </Column>
        </div>

        {/* Review queue — the lone amber accent. */}
        <div className="mt-3.5 flex items-center justify-between gap-3 rounded-md border border-semantic-warning/40 bg-semantic-warning/[0.07] px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <StatusChip tone="amber" dot>
              Review queue
            </StatusChip>
            <span className="truncate font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
              ACCT_STATUS_CD · unmapped value
            </span>
          </div>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-semantic-warning">
            1 to confirm
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-surface-dark-border">
          <Crumb>Resolved by agent</Crumb>
          <span className="font-mono text-[11px] tabular-nums text-text-primary dark:text-text-on-brand">
            {reduced ? resolvedRows : Math.min(drawn, resolvedRows)}/{MAP.length} fields
          </span>
        </div>
      </MigrationFrame>
    </div>
  );
}

function Column({
  title,
  lit = false,
  children,
}: {
  title: string;
  lit?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2 rounded-md border p-2",
        lit
          ? "border-accent-cyan/25 bg-accent-cyan/[0.03] dark:border-accent-cyan/20"
          : "border-surface-border-subtle bg-surface-soft/50 dark:border-surface-dark-border dark:bg-white/[0.02]",
      )}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
        {title}
      </span>
      {children}
    </div>
  );
}

function Field({
  side,
  tone = "neutral",
  children,
}: {
  side: "left" | "right";
  tone?: "neutral" | "resolved" | "pending" | "amber";
  children: React.ReactNode;
}) {
  const toneCls =
    tone === "resolved"
      ? "border-accent-cyan/45 bg-accent-cyan/[0.08] text-text-primary dark:text-text-on-brand"
      : tone === "amber"
        ? "border-semantic-warning/50 bg-semantic-warning/[0.1] text-text-primary dark:text-text-on-brand"
        : tone === "pending"
          ? "border-surface-border-subtle bg-surface-white/50 text-text-muted dark:border-surface-dark-border dark:bg-white/[0.03] dark:text-text-dark-muted"
          : "border-surface-border-subtle bg-surface-white/70 text-text-secondary dark:border-surface-dark-border dark:bg-white/[0.04] dark:text-text-dark-secondary";
  return (
    <span
      className={cn(
        "flex h-[34px] items-center gap-1.5 rounded-[5px] border px-2 font-mono text-[10.5px] leading-none transition-colors duration-300",
        side === "left" ? "justify-start" : "justify-start",
        toneCls,
      )}
    >
      {children}
    </span>
  );
}
