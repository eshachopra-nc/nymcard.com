"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "./UIPlaceholder";

// ── Lending §7 + §8 (Lending.html handoff v1.0) ─────────────────────────────
//
// §7 Deployment — three dark cards, each with a bespoke line-art diagram
// (cloud / on-soil / on-premise), matching the reference exactly.
//
// §8 Migration — the five-stage agent flow (Discovery → Cutover): avatars with
// connector lines that fill and check badges that pop in sequence on scroll-in.
// Replaces the generic MigrationConsole on lending. Reduced-motion safe.

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── §7 Deployment ───────────────────────────────────────────────────────────
const DEPLOY_ART: ReactNode[] = [
  // Cloud — stacked layers with feed lines
  <svg key="cloud" viewBox="0 0 280 160" fill="none" className="h-full w-full" aria-hidden="true">
    <rect x="60" y="30" width="160" height="32" rx="6" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
    <rect x="40" y="74" width="200" height="32" rx="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <rect x="20" y="118" width="240" height="32" rx="6" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
    <circle cx="140" cy="46" r="4" fill="#22D3EE" />
    <circle cx="80" cy="90" r="3" fill="rgba(255,255,255,0.4)" />
    <circle cx="200" cy="90" r="3" fill="rgba(255,255,255,0.4)" />
    <line x1="140" y1="62" x2="140" y2="74" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="80" y1="106" x2="80" y2="118" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="200" y1="106" x2="200" y2="118" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>,
  // On-soil — nested territory with a centre node
  <svg key="onsoil" viewBox="0 0 280 160" fill="none" className="h-full w-full" aria-hidden="true">
    <path d="M140 20 Q220 20 240 80 Q260 140 140 150 Q20 140 40 80 Q60 20 140 20 Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <path d="M140 44 Q194 44 208 80 Q222 116 140 122 Q58 116 72 80 Q86 44 140 44 Z" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
    <circle cx="140" cy="83" r="14" fill="#22D3EE" fillOpacity="0.18" stroke="#22D3EE" strokeWidth="1.5" />
    <circle cx="140" cy="83" r="4" fill="#22D3EE" />
  </svg>,
  // On-premise — owned stack with a lit middle tier
  <svg key="onprem" viewBox="0 0 280 160" fill="none" className="h-full w-full" aria-hidden="true">
    <rect x="70" y="110" width="140" height="34" rx="5" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
    <rect x="60" y="74" width="160" height="34" rx="5" fill="#22D3EE" fillOpacity="0.08" stroke="#22D3EE" strokeWidth="1.5" />
    <rect x="70" y="38" width="140" height="34" rx="5" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
    <circle cx="140" cy="91" r="6" fill="#22D3EE" />
    <line x1="140" y1="72" x2="140" y2="38" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="140" y1="108" x2="140" y2="144" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>,
];

export function DeploymentSection({
  headline,
  body,
  items,
}: {
  headline: string;
  body?: string;
  items: { heading: string; description?: string }[];
}) {
  // useReducedMotion() is false on the server; gate the reduced branch behind
  // `mounted` so the first client paint matches SSR (both render the y:16
  // reveal `initial`) — no hydration mismatch. After mount the real value wins.
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduced = mounted ? prefersReduced : false;
  return (
    <section className="dark relative overflow-hidden bg-surface-dark-base py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-on-brand sm:text-4xl">
            {headline}
          </h2>
          {body && (
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
              {body}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {items.slice(0, 3).map((it, i) => (
            <motion.div
              key={it.heading}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? { opacity: 1, y: 0 } : undefined}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduced ? { duration: 0 } : { duration: 0.56, ease: EASE, delay: i * 0.08 }}
              className="nc-card-hover rounded-2xl border border-surface-dark-border bg-surface-dark-elevated/50 p-8"
            >
              <div className="mb-6 grid h-40 place-items-center">{DEPLOY_ART[i]}</div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-text-on-brand">{it.heading}</h3>
              {it.description && (
                <p className="mt-2.5 font-body text-sm leading-relaxed text-text-dark-secondary">{it.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── §8 Migration ──────────────────────────────────────────────────────────
const STAGES = [
  {
    label: "Discovery",
    sub: "Inventory",
    icon: (
      <>
        <circle cx="20" cy="20" r="13" stroke="#304DBB" strokeWidth="1.8" />
        <path d="M14 20h12M20 14v12" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Mapping",
    sub: "Field by field",
    icon: (
      <>
        <rect x="8" y="8" width="24" height="24" rx="5" stroke="#304DBB" strokeWidth="1.8" />
        <path d="M14 16h12M14 24h8" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Configuration",
    sub: "Rules & limits",
    icon: (
      <>
        <path d="M20 8 14 14h4v4l6-6z" stroke="#304DBB" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="20" cy="25" r="7" stroke="#304DBB" strokeWidth="1.8" />
        <circle cx="20" cy="25" r="2.5" fill="#22D3EE" />
      </>
    ),
  },
  {
    label: "Parallel run",
    sub: "Dual validation",
    icon: (
      <>
        <rect x="8" y="14" width="10" height="16" rx="2" stroke="#304DBB" strokeWidth="1.8" />
        <rect x="22" y="10" width="10" height="20" rx="2" stroke="#22D3EE" strokeWidth="1.8" />
        <path d="M18 22h4" stroke="#304DBB" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" />
      </>
    ),
  },
  {
    label: "Cutover",
    sub: "Live on nCore",
    icon: (
      <>
        <path d="M12 20 20 10l8 10-8 4z" stroke="#304DBB" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 24v6" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
];

// A migration phase as rendered in the flow row. Callers may pass a custom set
// (e.g. the Migration page's five copy-driven phases). When omitted the default
// `STAGES` set is used, so the existing lending / nCore callsites render
// unchanged. Each phase reuses the built-in geometric agent avatars by index;
// `label` and `sub` carry the copy.
export type MigrationPhase = { label: string; sub?: string };

export function MigrationFlow({
  headline,
  body,
  eyebrow,
  cta,
  atmosphere,
  phases,
  portfolioMeter = false,
  portfolioMeterLabel = "Portfolio meter — share on nCore",
  portfolioMeterVisual,
  programLive = false,
  programLiveLabel = "Program live",
}: {
  headline: string;
  body?: string;
  /** Optional eyebrow above the headline (homepage §7 uses "Migration"). */
  eyebrow?: string;
  /** Optional trailing CTA beneath the flow (tertiary text link + arrow). */
  cta?: { label: string; href: string };
  /**
   * Opt-in cool atmosphere field behind the section (design-system.md §8.1 —
   * the page is glassy/atmospheric, never flat). Off by default so the
   * product-page callsites are unchanged; the homepage opts in.
   */
  atmosphere?: "top" | "bottom" | "split";
  /**
   * Optional custom phases. Backwards-compatible: when omitted, the built-in
   * `STAGES` set renders exactly as before (lending / nCore unchanged). The
   * geometric agent avatar for each phase is reused from `STAGES` by index.
   */
  phases?: MigrationPhase[];
  /**
   * Optional portfolio-meter strip beneath the flow — the share climbing onto
   * nCore batch by batch. The meter VISUAL itself is a labelled UIPlaceholder
   * for the ui-ux-designer; this flag only opts the strip in. Additive.
   */
  portfolioMeter?: boolean;
  /** Mono label on the portfolio-meter placeholder (fallback only). */
  portfolioMeterLabel?: string;
  /**
   * A custom portfolio-meter surface for the strip. When provided it replaces
   * the labelled UIPlaceholder fallback. Additive / backwards-compatible.
   */
  portfolioMeterVisual?: ReactNode;
  /**
   * Optional persistent "Program live" indicator rendered with the meter strip.
   * Additive — off by default so existing callsites are unchanged.
   */
  programLive?: boolean;
  /** Copy for the program-live indicator. */
  programLiveLabel?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  // Custom phases reuse the built-in agent avatars by index; never overflow the
  // icon set.
  const items = (phases ?? STAGES).slice(0, STAGES.length);
  const [done, setDone] = useState<number>(reduced ? items.length : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const timers = items.map((_, i) =>
      setTimeout(() => setDone((d) => Math.max(d, i + 1)), 350 + i * 480),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, items.length]);

  return (
    <section className="relative overflow-hidden bg-surface-soft py-20 sm:py-24 lg:py-28 dark:bg-surface-dark-base">
      {atmosphere && <SectionAtmosphere anchor={atmosphere} />}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="mb-12 max-w-2xl sm:mb-14">
          {eyebrow && (
            <p className="mb-3 font-display text-sm font-semibold tracking-tight text-brand-primary dark:text-accent-cyan">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {headline}
          </h2>
          {body && (
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
              {body}
            </p>
          )}
        </div>

        <div ref={ref} className="relative">
          {/* Timeline spine + agentic-AI scanner pulse running left → right.
              The continuous sweep signals the agents working across the whole
              migration; the per-stage checks land in sequence behind it.
              Reduced-motion: spine stays, the pulse is removed. */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[38px] z-0 hidden h-0.5 overflow-hidden rounded-full bg-surface-border-subtle lg:block dark:bg-surface-dark-border">
            {!reduced && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="absolute top-1/2 h-3 w-[16%] -translate-y-1/2 rounded-full opacity-70 blur-[3px]"
                  style={{ background: "linear-gradient(90deg, transparent, #22D3EE, transparent)" }}
                  initial={{ x: "-130%" }}
                  animate={{ x: "760%" }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute top-0 h-full w-[16%] rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, #22D3EE 50%, transparent)" }}
                  initial={{ x: "-130%" }}
                  animate={{ x: "760%" }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {items.map((stage, i) => {
              const isDone = i < done;
              const icon = STAGES[i].icon;
              return (
                <div key={stage.label} className="relative text-center">
                  <div
                    className={cn(
                      "relative z-10 mx-auto mb-4 grid size-[76px] place-items-center rounded-[18px] border bg-surface-white transition-all duration-300 dark:bg-surface-dark-elevated",
                      isDone
                        ? "border-accent-cyan/50 shadow-[0_8px_24px_-10px_rgba(48,77,187,0.4)]"
                        : "border-surface-border-subtle dark:border-surface-dark-border",
                    )}
                  >
                    <svg viewBox="0 0 40 40" fill="none" className="size-10">
                      {icon}
                    </svg>
                    <span
                      className={cn(
                        "absolute -right-1.5 -top-1.5 grid size-[22px] place-items-center rounded-full bg-success transition-all duration-300",
                        isDone ? "scale-100 opacity-100" : "scale-50 opacity-0",
                      )}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                  </div>
                  <h4 className="font-display text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                    {stage.label}
                  </h4>
                  {stage.sub && (
                    <p className="mt-1.5 font-mono text-[12px] text-text-muted dark:text-text-dark-muted">{stage.sub}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio-meter strip — additive. The share on nCore climbing batch
            by batch beneath the flow. The meter visual itself is a labelled
            UIPlaceholder for the ui-ux-designer; the "Program live" indicator
            sits alongside as a persistent state, copy-driven. */}
        {portfolioMeter && (
          <div className="mt-12 sm:mt-14">
            <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto]">
              {portfolioMeterVisual ?? (
                <UIPlaceholder label={portfolioMeterLabel} scale="wide" className="min-h-[8rem]" />
              )}
              {programLive && (
                <div className="flex items-center justify-center rounded-lg border border-surface-border-subtle bg-surface-white px-6 py-4 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:flex-col sm:items-start sm:justify-center sm:gap-1.5">
                  <span className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-text-primary dark:text-text-on-brand">
                    <span aria-hidden="true" className="size-2 rounded-full bg-success" />
                    {programLiveLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {cta && (
          <div className="mt-10 sm:mt-12">
            <Button href={cta.href} variant="tertiary">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
