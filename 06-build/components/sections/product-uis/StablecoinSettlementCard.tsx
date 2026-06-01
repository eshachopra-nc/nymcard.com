"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { GlassBed, GlassSurface } from "./glass";

// ── StablecoinSettlementCard ─────────────────────────────────────────────────
//
// Recreates the locked handoff `05-handoff/home/stablecoin-settlement-card.svg`
// (Claude Design "stablecoin-clock-v1", final iteration — clock + product title
// stripped; the settled figure leads). A self-contained stablecoin-settlement
// snippet for the Stablecoin Settlement surface: the 24h settled volume as the
// hero, a full-width USD → USDC → USD settlement path beneath, and the always-on
// SETTLED / 24-7-365 status framing.
//
// All data values are mirrored verbatim from the handoff SVG (CLAUDE.md Rule 1
// — numbers live in the design, never invented).
//
// Composed on the canonical glass kit (§8.1): GlassSurface on the rich indigo
// GlassBed field — theme-aware (navy field reads in dark, soft cool in light),
// so it is NOT a hardcoded dark panel. Maps to copy: "Real-time, multi-currency,
// and stablecoin settlement on one platform."
//
// Motion (static at rest): on scroll-in — the settled amount counts up, the path
// draws left→right and a value token travels USD→USDC→USD once. On hover — the
// path + USDC node brighten. Reduced-motion safe: everything renders in its final
// state, no travel/count.

const SETTLED_TARGET = 284.2; // USD millions — from the handoff ($284.2M · 24h)

type NodeKind = "fiat" | "rail";
const PATH: { id: string; top: string; bottom: string; kind: NodeKind; at: string }[] = [
  { id: "in", top: "USD", bottom: "FIAT", kind: "fiat", at: "6%" },
  { id: "rail", top: "USDC", bottom: "STABLECOIN RAIL", kind: "rail", at: "50%" },
  { id: "out", top: "USD", bottom: "FIAT", kind: "fiat", at: "94%" },
];

export function StablecoinSettlementCard() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [amount, setAmount] = useState(reduced ? SETTLED_TARGET : 0);

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, SETTLED_TARGET, {
      duration: dur.deliberate,
      ease: ease.out,
      delay: 0.3,
      onUpdate: (v) => setAmount(v),
    });
    return () => controls.stop();
  }, [inView, reduced]);

  return (
    <GlassBed tone="indigo">
      <div ref={ref} className="relative flex h-full w-full flex-col justify-center p-6 sm:p-7">
        <GlassSurface className="group p-5 sm:p-6">
          {/* Header — SETTLED · 24H label + the always-on 24/7/365 status. */}
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-muted">
              Settled · 24h
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-semantic-success/[0.12] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-semantic-success ring-1 ring-inset ring-semantic-success/35">
              <span className="size-1.5 rounded-full bg-semantic-success" />
              24/7/365
            </span>
          </div>

          {/* Hero — settled volume counts up on scroll-in. */}
          <div className="mt-3">
            <span className="font-display text-[clamp(2.25rem,7vw,3.5rem)] font-bold leading-none tracking-tight tabular-nums text-text-primary dark:text-text-on-brand">
              ${amount.toFixed(1)}M
            </span>
            <p className="mt-2 font-mono text-[12px]">
              <span className="text-accent-cyan">+9.2%</span>
              <span className="text-text-muted dark:text-text-dark-muted"> · 1,204 settlements</span>
            </p>
          </div>

          <div className="mt-5 h-px w-full bg-surface-border-subtle dark:bg-white/10" />

          {/* Settlement path label. */}
          <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-muted">
            Settlement path
          </span>

          {/* USD → USDC → USD path — draws in, a value token travels it once.
              Fixed-height region; nodes are absolutely centred on the line at
              6% / 50% / 94%, labels float above/below so the line stays dot-centred. */}
          <div className="relative mt-8 mb-8 h-5">
            {/* baseline — drawn left→right; brightens on hover. */}
            <div className="absolute inset-x-[6%] top-1/2 h-px -translate-y-1/2">
              <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <motion.line
                  x1="0" y1="1" x2="100" y2="1"
                  className="stroke-accent-indigo/40 transition-colors duration-300 group-hover:stroke-accent-cyan/70"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={inView ? (reduced ? undefined : { pathLength: 1 }) : undefined}
                  transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.35 }}
                />
              </svg>
            </div>

            {PATH.map((n) => {
              const rail = n.kind === "rail";
              return (
                <div
                  key={n.id}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: n.at }}
                >
                  <span
                    className={[
                      "pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[12px] font-medium tracking-tight",
                      rail ? "text-accent-cyan" : "text-text-primary dark:text-text-on-brand",
                    ].join(" ")}
                  >
                    {n.top}
                  </span>
                  {rail ? (
                    <span className="grid size-5 place-items-center rounded-full bg-accent-cyan/[0.16] ring-2 ring-accent-cyan transition-transform duration-300 group-hover:scale-110">
                      <span className="size-1.5 rounded-full bg-accent-cyan" />
                    </span>
                  ) : (
                    <span className="block size-3.5 rounded-full bg-surface-white ring-2 ring-accent-indigo dark:bg-surface-dark-base" />
                  )}
                  <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                    {n.bottom}
                  </span>
                </div>
              );
            })}

            {/* value token — travels USD→USDC→USD once on scroll-in. */}
            {!reduced && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 z-10 size-2.5 -translate-y-1/2 rounded-full bg-accent-cyan"
                style={{ left: "6%", marginLeft: "-5px", boxShadow: `0 0 10px ${withAlpha(visual.cyan, 0.9)}` }}
                initial={{ left: "6%", opacity: 0 }}
                animate={inView ? { left: ["6%", "50%", "94%"], opacity: [0, 1, 1, 0] } : undefined}
                transition={{ duration: 1.2, ease: ease.inOut, delay: 0.6, times: [0, 0.5, 1] }}
              />
            )}
          </div>

          {/* Status row — SETTLED + the settlement timestamp (verbatim from handoff). */}
          <div className="mt-5 flex items-center justify-between border-t border-surface-border-subtle pt-3 dark:border-white/10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-semantic-success/[0.12] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-semantic-success ring-1 ring-inset ring-semantic-success/30">
              <span className="size-1.5 rounded-full bg-semantic-success" />
              Settled
            </span>
            <span className="font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">
              14:32:08 UTC
            </span>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
