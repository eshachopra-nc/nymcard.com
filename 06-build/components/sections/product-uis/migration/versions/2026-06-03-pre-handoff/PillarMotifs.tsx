"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, ease } from "@/components/visuals/motion";
import {
  Crumb,
  LiveDot,
  Meter,
  StatusChip,
  CheckGlyph,
  useScrollGate,
  useSteps,
} from "./migration-kit";

// ── §3 pillar motifs — quiet supporting UI inside the GlassPanels ─────────────
//
// These two motifs sit INSIDE the canonical GlassPanel-over-GlassAtmosphere
// pillars (WhyNymCardPillars), so they stay quiet and legible over the rich
// field — no heavy chrome of their own, just the load-bearing idea.
//
//  Slot 3 — ParallelRunMeter: portfolio shadowing the live processor, the share
//           climbing while legacy holds. Two tracks (legacy live / nCore shadow)
//           with a reconciliation tick.
//  Slot 4 — AgentActivityFeed: three agents (mapping, testing, reconciling)
//           streaming a compact decision line each, newest on top.
//
// Cool palette only. Reduced-motion safe. Illustrative on-system data.

// ── Slot 3 — Parallel-run meter ──────────────────────────────────────────────

const SHADOW_PCT = 72; // share of the portfolio nCore is shadowing

export function ParallelRunMeter({ className }: { className?: string }) {
  const { ref, active, reduced, bind } = useScrollGate({ amount: 0.5 });
  return (
    <div ref={ref} {...bind} className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-between">
        <Crumb>Parallel run</Crumb>
        <LiveDot label="shadowing" />
      </div>

      {/* Two stacked tracks — the live processor and nCore shadowing it. */}
      <div className="space-y-3">
        <Track
          label="Legacy processor"
          sub="live"
          pct={100}
          active={active}
          reduced={reduced}
          tone="muted"
        />
        <Track
          label="nCore shadow"
          sub="reconciling"
          pct={SHADOW_PCT}
          active={active}
          reduced={reduced}
          tone="cyan"
        />
      </div>

      {/* Reconciliation tick — the cue the two are matching. */}
      <div className="mt-3.5 flex items-center justify-between rounded-md border border-surface-border-subtle bg-surface-white/55 px-2.5 py-2 dark:border-white/10 dark:bg-white/[0.05]">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
          Balances reconciled
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tabular-nums text-accent-teal dark:text-accent-cyan">
          <span className="inline-flex">
            <CheckGlyph size={13} />
          </span>
          in step
        </span>
      </div>
    </div>
  );
}

function Track({
  label,
  sub,
  pct,
  active,
  reduced,
  tone,
}: {
  label: string;
  sub: string;
  pct: number;
  active: boolean;
  reduced: boolean;
  tone: "cyan" | "muted";
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-[11px] text-text-primary dark:text-text-on-brand">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
          {sub}
        </span>
      </div>
      {tone === "muted" ? (
        <div className="h-[6px] w-full overflow-hidden rounded-full bg-surface-border-subtle/60 dark:bg-white/10">
          <div
            className="h-full rounded-full"
            style={{
              width: "100%",
              background: `linear-gradient(to right, ${withAlpha(visual.navy, 0.35)}, ${withAlpha(visual.navy, 0.5)})`,
            }}
          />
        </div>
      ) : (
        <Meter pct={pct} active={active} reduced={reduced} tone="cyan" />
      )}
    </div>
  );
}

// ── Slot 4 — Agent activity feed ─────────────────────────────────────────────

type FeedItem = {
  agent: string;
  tone: "cyan" | "indigo" | "teal";
  verb: string;
  detail: string;
};

// Three agents, one decision line each — the load-bearing idea (mapping,
// testing, reconciling) without a fabricated "live" stream. They reveal one by
// one on scroll-in and latch; hover replays. No perpetual ticker.
const FEED: FeedItem[] = [
  { agent: "map", tone: "cyan", verb: "mapped", detail: "bin_range → nCore.bin" },
  { agent: "test", tone: "indigo", verb: "generated", detail: "auth suite · 240 cases" },
  { agent: "recon", tone: "teal", verb: "matched", detail: "ledger balances · in step" },
];

export function AgentActivityFeed({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.5 });
  const shown = useSteps(FEED.length, active, reduced, replay, {
    start: 240,
    step: 300,
  });

  return (
    <div ref={ref} {...bind} className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-between">
        <Crumb>Agent activity</Crumb>
        <LiveDot />
      </div>

      <ol className="relative space-y-2">
        {FEED.map((row, i) => {
          const on = reduced || shown > i;
          return (
            <motion.li
              key={row.agent + row.detail}
              initial={false}
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: on ? 1 : 0,
                      y: on ? 0 : -8,
                      transition: { duration: dur.base, ease: ease.out },
                    }
              }
              className="flex items-center gap-2.5 rounded-md border border-surface-border-subtle bg-surface-white/55 px-2.5 py-2 dark:border-white/10 dark:bg-white/[0.05]"
            >
              <StatusChip tone={row.tone}>{row.agent}</StatusChip>
              <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
                <span className="text-text-primary dark:text-text-on-brand">
                  {row.verb}
                </span>{" "}
                {row.detail}
              </span>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
