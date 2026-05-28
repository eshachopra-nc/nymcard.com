"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "./palette";
import { dur, ease } from "./motion";

// ── MigrationConsole ───────────────────────────────────────────────────────
//
// The substantial product-grade UI for the Migration section — a live
// "command-centre" view of multiple specialised AI agents working in parallel
// to handle a real card or lending migration: schema reasoning, record
// migration, tokenization rebuild, compliance translation, parallel-run
// validation. The composition reads as the *agents doing this work*; the
// chrome (system banner, agent strip, ticker) is supporting context.
//
// Left column is structured as:
//
//   1. CURRENT FOCUS card  — the freshest agent decision in larger type,
//                            with the agent's specialised glyph and a hot
//                            cyan rim. Updates every MESSAGE_INTERVAL.
//   2. DECISION LOG        — the 6 prior decisions in compact mono. Each
//                            new focus message slides into the log; the
//                            oldest slides out.
//
// Each agent is identified by a distinct glyph (mapping arrows, record-flow
// stack, key, shield-check, parallel paths, sliders, calendar, person) so
// the strip reads as a roster of specialists, not five copies of one icon.
//
// Cool palette only (§3). Respects `prefers-reduced-motion` (snapshot view,
// no streaming, no counters ticking, no progress fill). All numbers are
// illustrative placeholder data — there is no customer data here.

// ── Agent glyph registry ───────────────────────────────────────────────────
//
// Eight distinct glyphs covering the agent specialties used across product
// migration consoles. Pages declare the glyph per agent (`glyph: "mapping"`
// etc) so the strip reads as a roster of specialists.

type GlyphProps = { className?: string };

const AGENT_GLYPHS: Record<string, (props: GlyphProps) => ReactElement> = {
  // Mapping — two nodes with arrows between them (semantic translation).
  mapping: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="4.5" cy="6" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="6" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <path d="M6.5 6 L17 6 M14 3 L17 6 L14 9" strokeOpacity="0.8" />
      <path d="M6.5 18 L17 18 M14 15 L17 18 L14 21" strokeOpacity="0.8" />
    </svg>
  ),
  // Flow — three horizontal record bars with an arrow (bulk migration).
  flow: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="13" height="3" rx="0.6" strokeOpacity="0.5" />
      <rect x="3" y="10.5" width="13" height="3" rx="0.6" strokeOpacity="0.75" />
      <rect x="3" y="16.5" width="13" height="3" rx="0.6" />
      <path d="M18 12 L21.5 12 M18.5 9 L21.5 12 L18.5 15" />
    </svg>
  ),
  // Key — token / HSM.
  key: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12 L20 12 M17 12 V15 M20 12 V9" />
    </svg>
  ),
  // Shield — compliance / AML / sanctions.
  shield: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 L19 6 V13 C19 17 16 19.5 12 21 C8 19.5 5 17 5 13 V6 Z" />
      <path d="M9 12 L11 14 L15 10" />
    </svg>
  ),
  // Mirror — two parallel paths with arrows (parallel-run validation).
  mirror: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8 L19 8" />
      <path d="M3 16 L19 16" />
      <path d="M16 5 L19 8 L16 11" />
      <path d="M16 13 L19 16 L16 19" />
    </svg>
  ),
  // Sliders — decisioning / underwriting rules.
  sliders: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" strokeOpacity="0.45" />
      <line x1="3" y1="12" x2="21" y2="12" strokeOpacity="0.45" />
      <line x1="3" y1="18" x2="21" y2="18" strokeOpacity="0.45" />
      <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="11" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Calendar — schedule / amortisation / billing cycle.
  calendar: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5.5" width="18" height="15.5" rx="2" />
      <path d="M3 10.5 H21" />
      <path d="M8 3.5 V7 M16 3.5 V7" />
      <circle cx="12" cy="15.5" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Person — borrower / identity / KYC.
  person: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20 C5 16 8 14 12 14 C16 14 19 16 19 20" />
    </svg>
  ),
};

export type AgentGlyphName = keyof typeof AGENT_GLYPHS;

// Activity log entry — what one agent decided at one moment.
export type MigrationActivity = {
  /** Must match an agent `id`. Renders prefixed in cyan. */
  agent: string;
  /** Plain-language reasoning. Keep tight; the log is dense. */
  message: string;
  kind?: "info" | "decision" | "anomaly" | "success";
};

// One of the specialised agents working on the migration.
export type MigrationAgent = {
  id: string;
  role: string;
  /** Specialty glyph for the agent strip — defaults to `shield`. */
  glyph?: AgentGlyphName;
};

// A running counter on the right state panel.
export type MigrationCounter = {
  label: string;
  value: number;
  suffix?: string;
};

// One of the parallel migration tracks (Schema / Records / Tokens / …).
export type MigrationTrack = {
  label: string;
  pct: number; // 0–100
};

type MigrationConsoleProps = {
  /** Legacy system name shown in the banner (e.g. "Legacy processor"). */
  fromSystem: string;
  /** Destination — defaults to "NymCard nCore". */
  toSystem?: string;
  /** The specialised agents working the migration (4–6 recommended). */
  agents: readonly MigrationAgent[];
  /** The pool of agent-decision messages cycled through the activity stream. */
  activity: readonly MigrationActivity[];
  /** Aggregate counters shown in the state panel. */
  counters: readonly MigrationCounter[];
  /** Parallel progress tracks shown beneath the counters. */
  tracks: readonly MigrationTrack[];
  /** Throughput label in the footer ticker (e.g. "1.24M cards/hr"). */
  throughput: string;
  /** ETA label (e.g. "~47min remaining"). */
  eta: string;
  /** Drift label (e.g. "drift <0.01%"). */
  drift: string;
  className?: string;
};

const HISTORY_WINDOW = 6; // log rows beneath the focus card
const MESSAGE_INTERVAL = 1500; // ms — slightly slower so the focus card reads

export function MigrationConsole({
  fromSystem,
  toSystem = "NymCard nCore",
  agents,
  activity,
  counters,
  tracks,
  throughput,
  eta,
  drift,
  className,
}: MigrationConsoleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  // Cursor starts at HISTORY_WINDOW so we have a full backlog visible from
  // first render — no awkward "log filling up" moment. Advances on each tick.
  const [cursor, setCursor] = useState(HISTORY_WINDOW);

  useEffect(() => {
    if (!inView || reduced) return;
    const interval = setInterval(
      () => setCursor((c) => c + 1),
      MESSAGE_INTERVAL,
    );
    return () => clearInterval(interval);
  }, [inView, reduced]);

  const idx = (n: number) =>
    ((n % activity.length) + activity.length) % activity.length;

  const focusActivity = reduced
    ? { ...activity[0], _key: 0 }
    : { ...activity[idx(cursor)], _key: cursor };

  const focusAgent = agents.find((a) => a.id === focusActivity.agent);

  const visibleHistory = reduced
    ? activity.slice(1, HISTORY_WINDOW + 1).map((a, i) => ({ ...a, _key: i + 1 }))
    : Array.from({ length: HISTORY_WINDOW }, (_, i) => {
        const offset = cursor - HISTORY_WINDOW + i;
        return { ...activity[idx(offset)], _key: offset };
      });

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <article
        className={cn(
          "relative isolate overflow-hidden rounded-2xl border",
          "border-surface-border-subtle bg-surface-white",
          "shadow-[0_30px_70px_-28px_rgba(14,26,51,0.22),0_10px_22px_-10px_rgba(14,26,51,0.1)]",
          "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${withAlpha(
              visual.cyan,
              0.55,
            )} 38%, transparent 88%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              `radial-gradient(70% 50% at 96% 0%, ${withAlpha(visual.cyan, 0.08)}, transparent 72%),` +
              `radial-gradient(70% 56% at 4% 100%, ${withAlpha(visual.indigo, 0.07)}, transparent 74%)`,
          }}
        />

        <SystemBanner from={fromSystem} to={toSystem} />
        <AgentStrip
          agents={agents}
          latestAgentId={focusActivity.agent}
          reduced={!!reduced}
        />

        <div className="relative z-10 grid lg:grid-cols-[1.45fr_1fr] lg:divide-x lg:divide-surface-border-subtle dark:divide-surface-dark-border">
          <ActivityColumn
            focus={focusActivity}
            focusGlyph={focusAgent?.glyph}
            history={visibleHistory}
            reduced={!!reduced}
          />
          <StatePanel
            counters={counters}
            tracks={tracks}
            inView={inView}
            reduced={!!reduced}
          />
        </div>

        <StatusTicker
          agentsActive={agents.length}
          throughput={throughput}
          eta={eta}
          drift={drift}
        />
      </article>
    </div>
  );
}

// ── System banner ──────────────────────────────────────────────────────────

function SystemBanner({ from, to }: { from: string; to: string }) {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-surface-border-subtle bg-surface-soft/45 px-5 py-3 sm:px-7 dark:border-surface-dark-border dark:bg-surface-dark-base/40">
      <div className="flex items-center gap-3 font-mono text-[11px] leading-none">
        <span className="rounded-sm bg-brand-primary/[0.08] px-2 py-1 uppercase tracking-[0.16em] text-brand-primary dark:bg-accent-cyan/[0.14] dark:text-accent-cyan">
          Migrating
        </span>
        <span className="text-text-primary dark:text-text-on-brand">{from}</span>
        <ArrowRightIcon />
        <span className="text-text-primary dark:text-text-on-brand">{to}</span>
      </div>
      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
        <span className="inline-flex items-center gap-1.5">
          <LockIcon /> TLS 1.3 · isolated tunnel
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent-cyan animate-pulse" />
          live
        </span>
      </div>
    </div>
  );
}

// ── Agent strip — five specialists in a row, each with a distinct glyph ────

function AgentStrip({
  agents,
  latestAgentId,
  reduced,
}: {
  agents: readonly MigrationAgent[];
  latestAgentId?: string;
  reduced: boolean;
}) {
  return (
    <div className="relative z-10 grid border-b border-surface-border-subtle bg-surface-white/60 dark:border-surface-dark-border dark:bg-surface-dark-elevated/60 sm:grid-cols-2 lg:grid-cols-5">
      {agents.map((agent) => {
        const isHot = !reduced && latestAgentId === agent.id;
        return (
          <div
            key={agent.id}
            className="relative flex items-center gap-3 border-surface-border-subtle px-4 py-3 sm:px-5 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(n+3)]:border-t lg:border-r lg:[&:last-child]:border-r-0 lg:[&:nth-child(n+3)]:border-t-0 dark:border-surface-dark-border"
          >
            <AgentGlyphChip glyph={agent.glyph} hot={isHot} />
            <div className="min-w-0">
              <p className="truncate font-mono text-[11px] leading-snug text-text-primary dark:text-text-on-brand">
                {agent.id}
              </p>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
                {agent.role}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AgentGlyphChip({
  glyph,
  hot,
  size = "default",
}: {
  glyph?: AgentGlyphName;
  hot: boolean;
  size?: "default" | "large";
}) {
  const Glyph = glyph ? AGENT_GLYPHS[glyph] : AGENT_GLYPHS.shield;
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center rounded-md bg-brand-primary/[0.08] text-brand-primary ring-1 ring-brand-primary/15 dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:ring-accent-cyan/25",
        size === "large" ? "size-9" : "size-7",
      )}
    >
      <Glyph className={size === "large" ? "size-4" : "size-3.5"} />
      {hot ? (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.18, 1] }}
          transition={{ duration: 1.4, ease: ease.inOut, repeat: 2 }}
          className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-accent-cyan"
        />
      ) : null}
    </span>
  );
}

// ── Activity column — focus card on top, decision log beneath ──────────────

const KIND_DOT: Record<NonNullable<MigrationActivity["kind"]>, string> = {
  info: "bg-text-muted/55 dark:bg-text-dark-secondary/55",
  decision: "bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.65)]",
  anomaly: "bg-brand-purple shadow-[0_0_8px_rgba(91,79,217,0.6)]",
  success: "bg-accent-teal",
};

const KIND_LABEL_CLS: Record<NonNullable<MigrationActivity["kind"]>, string> = {
  info: "text-text-muted dark:text-text-dark-secondary",
  decision: "text-accent-cyan",
  anomaly: "text-brand-purple",
  success: "text-accent-teal",
};

const KIND_LABEL: Record<NonNullable<MigrationActivity["kind"]>, string> = {
  info: "info",
  decision: "decision",
  anomaly: "anomaly",
  success: "success",
};

function ActivityColumn({
  focus,
  focusGlyph,
  history,
  reduced,
}: {
  focus: MigrationActivity & { _key: number };
  focusGlyph?: AgentGlyphName;
  history: (MigrationActivity & { _key: number })[];
  reduced: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col px-5 py-5 sm:px-7 sm:py-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted dark:text-text-dark-secondary">
          Agent reasoning trace
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent-cyan" />
          </span>
          live
        </span>
      </div>

      <FocusCard focus={focus} glyph={focusGlyph} reduced={reduced} />

      <div className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted dark:text-text-dark-secondary">
        Decision log
      </div>

      <ol className="relative flex flex-1 flex-col gap-2">
        <AnimatePresence initial={false}>
          {history.map((item) => {
            const kind = item.kind ?? "info";
            return (
              <motion.li
                key={item._key}
                initial={reduced ? false : { opacity: 0, y: 8, height: 0 }}
                animate={
                  reduced
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        height: "auto",
                        transition: { duration: dur.base, ease: ease.out },
                      }
                }
                exit={
                  reduced
                    ? undefined
                    : {
                        opacity: 0,
                        y: -8,
                        height: 0,
                        transition: { duration: dur.fast, ease: ease.out },
                      }
                }
                className="overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1.5 size-1.5 shrink-0 rounded-full",
                      KIND_DOT[kind],
                    )}
                  />
                  <p className="min-w-0 font-mono text-[11.5px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    <span className="text-accent-cyan">{item.agent}</span>
                    <span className="mx-1.5 text-text-muted/60 dark:text-text-dark-secondary/60">
                      ·
                    </span>
                    <span
                      className={cn(
                        "mr-1.5 uppercase tracking-[0.14em] text-[10px]",
                        KIND_LABEL_CLS[kind],
                      )}
                    >
                      {KIND_LABEL[kind]}
                    </span>
                    <span className="text-text-primary dark:text-text-on-brand">
                      {item.message}
                    </span>
                  </p>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </div>
  );
}

function FocusCard({
  focus,
  glyph,
  reduced,
}: {
  focus: MigrationActivity & { _key: number };
  glyph?: AgentGlyphName;
  reduced: boolean;
}) {
  const kind = focus.kind ?? "info";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border",
        "border-accent-cyan/30 bg-accent-cyan/[0.04]",
        "dark:border-accent-cyan/35 dark:bg-accent-cyan/[0.06]",
      )}
    >
      {/* Soft cyan glow background — adds depth to the focus state. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(80% 60% at 20% 0%, ${withAlpha(
            visual.cyan,
            0.12,
          )}, transparent 70%)`,
        }}
      />
      {/* Cyan left rim — the focus is anchored on the active edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px bg-accent-cyan/60"
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={focus._key}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={
            reduced
              ? undefined
              : { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.out } }
          }
          exit={
            reduced
              ? undefined
              : { opacity: 0, y: -4, transition: { duration: dur.fast, ease: ease.out } }
          }
          className="relative flex items-start gap-4 px-4 py-4 sm:px-5"
        >
          <AgentGlyphChip glyph={glyph} hot={!reduced} size="large" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted dark:text-text-dark-secondary">
                Current focus
              </span>
              <span className="font-mono text-[11.5px] text-accent-cyan">
                {focus.agent}
              </span>
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.14em]",
                  KIND_LABEL_CLS[kind],
                )}
              >
                {KIND_LABEL[kind]}
              </span>
            </div>
            <p className="mt-1.5 font-body text-[13px] leading-snug text-text-primary dark:text-text-on-brand sm:text-[13.5px]">
              {focus.message}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── State panel — counters + parallel tracks ───────────────────────────────

function StatePanel({
  counters,
  tracks,
  inView,
  reduced,
}: {
  counters: readonly MigrationCounter[];
  tracks: readonly MigrationTrack[];
  inView: boolean;
  reduced: boolean;
}) {
  return (
    <div className="relative z-10 flex flex-col gap-6 bg-surface-soft/35 px-5 py-5 sm:px-7 sm:py-6 dark:bg-surface-dark-base/35">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted dark:text-text-dark-secondary">
          Migration state
        </span>
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
          {counters.map((c) => (
            <Counter
              key={c.label}
              label={c.label}
              value={c.value}
              suffix={c.suffix}
              inView={inView}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted dark:text-text-dark-secondary">
          Parallel tracks
        </span>
        <ul className="mt-4 flex flex-col gap-3">
          {tracks.map((t) => (
            <Track
              key={t.label}
              label={t.label}
              pct={t.pct}
              inView={inView}
              reduced={reduced}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Counter({
  label,
  value,
  suffix,
  inView,
  reduced,
}: {
  label: string;
  value: number;
  suffix?: string;
  inView: boolean;
  reduced: boolean;
}) {
  const [v, setV] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setV(value);
      return;
    }
    const DURATION = 3800;
    let start: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, inView, reduced]);

  return (
    <div className="min-w-0">
      <p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
        {label}
      </p>
      <p className="mt-1 font-display text-[20px] font-semibold leading-tight tabular-nums text-text-primary dark:text-text-on-brand sm:text-[22px]">
        {v.toLocaleString()}
        {suffix ? (
          <span className="ml-1 font-mono text-[12px] font-normal text-text-secondary dark:text-text-dark-secondary">
            {suffix}
          </span>
        ) : null}
      </p>
    </div>
  );
}

function Track({
  label,
  pct,
  inView,
  reduced,
}: {
  label: string;
  pct: number;
  inView: boolean;
  reduced: boolean;
}) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[11px] text-text-primary dark:text-text-on-brand">
          {label}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
          {pct}%
        </span>
      </div>
      <div className="mt-1.5 h-[5px] w-full overflow-hidden rounded-full bg-surface-border-subtle/55 dark:bg-surface-dark-border/70">
        <motion.div
          className="h-full rounded-full"
          initial={reduced ? { width: `${pct}%` } : { width: "0%" }}
          animate={inView ? { width: `${pct}%` } : { width: "0%" }}
          transition={
            reduced ? undefined : { duration: 1.8, ease: ease.out, delay: 0.2 }
          }
          style={{
            background: `linear-gradient(to right, ${visual.cyan}, ${visual.indigo})`,
          }}
        />
      </div>
    </li>
  );
}

// ── Status ticker — operational SLA row at the foot ────────────────────────

function StatusTicker({
  agentsActive,
  throughput,
  eta,
  drift,
}: {
  agentsActive: number;
  throughput: string;
  eta: string;
  drift: string;
}) {
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-surface-border-subtle bg-surface-white/85 px-5 py-3 sm:px-7 dark:border-surface-dark-border dark:bg-surface-dark-elevated/85">
      <TickerItem label="agents" value={`${agentsActive} active`} />
      <TickerItem label="throughput" value={throughput} />
      <TickerItem label="eta" value={eta} />
      <TickerItem label="drift" value={drift} accent />
    </div>
  );
}

function TickerItem({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5 font-mono text-[11px] leading-snug">
      <span className="uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
        {label}
      </span>
      <span
        className={cn(
          "tabular-nums",
          accent
            ? "text-accent-cyan"
            : "text-text-primary dark:text-text-on-brand",
        )}
      >
        {value}
      </span>
    </span>
  );
}

// ── Small inline icons ─────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5 text-accent-cyan"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12 H19" />
      <path d="M13 6 L19 12 L13 18" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3 text-text-muted dark:text-text-dark-secondary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11 V7 a4 4 0 0 1 8 0 V11" />
    </svg>
  );
}
