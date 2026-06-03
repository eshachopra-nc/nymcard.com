"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  ShieldAlert,
  BookOpen,
  Globe,
  Banknote,
  Landmark,
  Scale,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, scanSpline } from "@/components/visuals/motion";
import {
  Crumb,
  NavyNode,
  CheckGlyph,
  useScrollGate,
  useSteps,
} from "./migration-kit";

// ── §7 on-ramp — Before and after (fragmented stack → six nCore layers) ───────
//
// Slot 14. Left: the bank's legacy reality — a card processor + a separate fraud
// vendor + a separate ledger + cross-border via someone else, drawn as
// DISCONNECTED blocks with mismatched audit trails. Right: the same capabilities
// resolved into SIX nCore layers around one core, with one shared customer
// record / ledger / audit trail threading through all of them. Migration agents
// sit at the seam. Maps to §7. Wide surface for the FeatureShowcase zone.
//
// Motion: on scroll-in the left blocks sit scattered/disconnected; the seam
// agents draw the migration line across; the right layers light up around the
// core one by one (the consolidation). Reduced motion shows the resolved state.
// Cool palette; the lone amber marks the legacy "mismatched audit" friction.

// Left — four disconnected legacy blocks, each its own vendor + its own trail.
const LEGACY = [
  { icon: CreditCard, label: "Card processor", trail: "audit log A" },
  { icon: ShieldAlert, label: "Fraud vendor", trail: "audit log B" },
  { icon: BookOpen, label: "Ledger system", trail: "audit log C" },
  { icon: Globe, label: "Cross-border", trail: "audit log D" },
];

// Right — six nCore layers around the core. Cool ramp; one shared record/trail.
const LAYERS = [
  { icon: CreditCard, label: "Cards" },
  { icon: Banknote, label: "Money movement" },
  { icon: Landmark, label: "Settlement" },
  { icon: Scale, label: "Reconciliation" },
  { icon: BookOpen, label: "Lending" },
  { icon: ShieldAlert, label: "Financial crime" },
];

export function StackBeforeAfter({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.3 });
  const lit = useSteps(LAYERS.length, active, reduced, replay, {
    start: 500,
    step: 200,
  });
  const seamDrawn = reduced || active;

  return (
    <div
      ref={ref}
      {...bind}
      className={cn(
        "relative isolate w-full overflow-hidden rounded-xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-base",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.5)} 34%, transparent 84%)`,
        }}
      />

      <div className="relative z-10 grid items-stretch gap-0 lg:grid-cols-[1fr_auto_1.15fr]">
        {/* ── BEFORE — disconnected legacy blocks ── */}
        <div className="flex flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <Crumb>Before · your legacy stack</Crumb>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-semantic-warning">
              4 vendors · 4 trails
            </span>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2.5">
            {LEGACY.map((b, i) => {
              const Icon = b.icon;
              // Deliberate slight scatter so the blocks read disconnected.
              const offset = [0, 10, 8, 0][i];
              return (
                <div
                  key={b.label}
                  className="flex flex-col gap-2 rounded-lg border border-dashed border-surface-border-subtle bg-surface-soft/50 p-3 dark:border-surface-dark-border dark:bg-white/[0.03]"
                  style={{ marginTop: reduced ? 0 : offset }}
                >
                  <span className="grid size-7 place-items-center rounded-md bg-text-muted/10 text-text-secondary dark:bg-white/[0.06] dark:text-text-dark-secondary">
                    <Icon className="size-3.5" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[10.5px] leading-tight text-text-primary dark:text-text-on-brand">
                    {b.label}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.08em] text-semantic-warning">
                    <span className="size-1 rounded-full bg-semantic-warning" />
                    {b.trail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SEAM — the migration agents draw the bridge ── */}
        <div className="relative flex items-center justify-center px-2 py-4 lg:w-24 lg:flex-col">
          {/* the connecting line, drawn by the agents */}
          <svg
            viewBox="0 0 96 40"
            className="absolute inset-0 hidden size-full lg:block"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M0 20 H96"
              stroke={withAlpha(visual.cyan, 0.7)}
              strokeWidth={1.4}
              strokeDasharray="4 4"
              initial={false}
              animate={{ pathLength: seamDrawn ? 1 : 0, opacity: seamDrawn ? 1 : 0.1 }}
              transition={reduced ? { duration: 0 } : { duration: dur.deliberate, ease: scanSpline }}
            />
          </svg>
          <div className="flex flex-col items-center gap-1.5">
            <NavyNode size={34} glow className="text-[8px]">
              <AgentMark />
            </NavyNode>
            <span className="text-center font-mono text-[8.5px] uppercase leading-tight tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
              migration
              <br />
              agents
            </span>
          </div>
        </div>

        {/* ── AFTER — six layers around one core ── */}
        <div className="flex flex-col border-t border-surface-border-subtle p-5 sm:p-6 lg:border-l lg:border-t-0 dark:border-surface-dark-border">
          <div className="mb-4 flex items-center justify-between">
            <Crumb>After · nCore</Crumb>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-teal dark:text-accent-cyan">
              <CheckGlyph size={12} /> one record · one trail
            </span>
          </div>

          <div className="relative flex flex-1 items-center justify-center py-2">
            {/* the core */}
            <div className="relative grid size-[68px] place-items-center sm:size-[76px]">
              <span
                aria-hidden="true"
                className="absolute inset-[-10px] rounded-full"
                style={{
                  background: `radial-gradient(circle, ${withAlpha(visual.cyan, 0.18)}, transparent 70%)`,
                }}
              />
              <NavyNode size={68} glow className="text-[10px] font-semibold">
                <span className="flex flex-col items-center gap-0.5">
                  <Layers className="size-4 text-accent-cyan" strokeWidth={1.6} />
                  <span className="text-[9px] tracking-[0.1em] text-white/85">
                    nCore
                  </span>
                </span>
              </NavyNode>

              {/* six layers in a ring */}
              {LAYERS.map((l, i) => {
                const Icon = l.icon;
                const angle = (i / LAYERS.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 86;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const on = reduced || lit > i;
                return (
                  <div
                    key={l.label}
                    className="absolute left-1/2 top-1/2 flex flex-col items-center gap-1 transition-all duration-300"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      opacity: on ? 1 : 0.2,
                    }}
                  >
                    {/* spoke */}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-px origin-left"
                      style={{
                        width: radius - 36,
                        transform: `rotate(${(angle + Math.PI) * (180 / Math.PI)}deg)`,
                        background: on
                          ? `linear-gradient(90deg, ${withAlpha(visual.cyan, 0.5)}, transparent)`
                          : "transparent",
                      }}
                    />
                    <span
                      className={cn(
                        "relative z-10 grid size-7 place-items-center rounded-md border transition-colors duration-300",
                        on
                          ? "border-accent-cyan/45 bg-accent-cyan/[0.08] text-accent-teal dark:text-accent-cyan"
                          : "border-surface-border-subtle bg-surface-soft text-text-muted dark:border-surface-dark-border dark:bg-white/[0.04] dark:text-text-dark-muted",
                      )}
                    >
                      <Icon className="size-3.5" strokeWidth={1.6} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* layer legend so the labels stay legible (the ring is tight) */}
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {LAYERS.map((l, i) => (
              <span
                key={l.label}
                className="font-mono text-[9.5px] text-text-secondary transition-opacity duration-300 dark:text-text-dark-secondary"
                style={{ opacity: reduced || lit > i ? 1 : 0.3 }}
              >
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 text-accent-cyan"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="17" r="1.5" fill="currentColor" stroke="none" />
      <path d="M7.4 11.4 16.6 7.6 M7.4 12.6 16.6 16.4" strokeOpacity="0.85" />
    </svg>
  );
}
