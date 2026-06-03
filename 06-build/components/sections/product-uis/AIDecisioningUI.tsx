"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { IllustrationField, IllustrationCard } from "@/components/visuals/product-illustration";

// ── AIDecisioningUI (nCore Capabilities — AI vertical) ──────────────────────
//
// AI is a CROSS-CUTTING vertical, not a peer product tile, so this surface
// reads as one agentic model ACTING across the layers — a decision travelling a
// vertical spine through the four AI functions the copy names: decisioning,
// routing, underwriting, monitoring. Each function is tagged with the layer it
// touches (Cards, Money Movement, Lending, Financial Crime), making the
// "across every layer" claim literal. It is deliberately NOT a dashboard — the
// Insights surface beside it owns the dashboard read.
//
// Maps to copy: "Agentic, domain-trained models woven into decisioning,
// routing, underwriting, and monitoring across every layer."
//
// Composed on the canonical product-illustration kit (§8.1 v-illus):
// IllustrationCard floating in the lit IllustrationField — the same treatment as
// the six homepage surfaces and the Insights surface beside it.
//
// Motion (static at rest): on scroll-in the spine draws top→bottom and the
// agent node travels it, lighting each step in sequence; the verdict commits
// last. The cell carries the hover lift. Reduced-motion safe.

const STEPS = [
  { fn: "Decisioning", layer: "Cards", detail: "Authorize · score in-path" },
  { fn: "Routing", layer: "Money Movement", detail: "Least-cost rail selected" },
  { fn: "Underwriting", layer: "Lending", detail: "Limit set from behaviour" },
  { fn: "Monitoring", layer: "Financial Crime", detail: "Drift watched, always-on" },
] as const;

export function AIDecisioningUI() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
  };
  const step: Variants = {
    hidden: { opacity: 0, x: -6 },
    show: { opacity: 1, x: 0, transition: { duration: dur.base, ease: ease.out } },
  };
  const node: Variants = {
    hidden: { scale: 0.3, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: dur.base, ease: ease.spring } },
  };

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} className="flex h-full flex-col justify-center gap-2.5 p-4 sm:p-5">
              {/* Agent header — a domain-trained model, the inbound signal. */}
              <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2 dark:border-white/10">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-accent-indigo to-brand-purple text-white shadow-[0_4px_12px_-4px_rgba(91,79,217,0.6)]">
                    <Sparkles aria-hidden className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-body text-[13px] font-medium text-text-primary dark:text-text-on-brand">
                      nCore agent
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
                      Domain-trained · in the flow
                    </div>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-accent-indigo/[0.12] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-accent-indigo ring-1 ring-inset ring-accent-indigo/35 dark:bg-accent-indigo/[0.18] dark:ring-accent-indigo/45">
                  Live
                </span>
              </div>

              {/* The decision path — a spine the agent travels, lighting each
                  function in sequence. */}
              <div className="relative">
                {/* Spine — drawn top→bottom on scroll-in. */}
                <svg
                  aria-hidden="true"
                  className="absolute left-[7px] top-1 h-[calc(100%-0.5rem)] w-px overflow-visible"
                  viewBox="0 0 1 100"
                  preserveAspectRatio="none"
                >
                  <line x1="0.5" y1="0" x2="0.5" y2="100" stroke={withAlpha(visual.indigo, 0.2)} strokeWidth="1" />
                  <motion.line
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="100"
                    stroke={withAlpha(visual.cyan, 0.85)}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={inView ? (reduced ? undefined : { pathLength: 1 }) : undefined}
                    transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.2 }}
                  />
                </svg>

                <motion.ul
                  className="flex flex-col gap-2"
                  variants={reduced ? undefined : list}
                  initial={reduced ? false : "hidden"}
                  animate={inView ? (reduced ? undefined : "show") : undefined}
                >
                  {STEPS.map((s) => (
                    <motion.li
                      key={s.fn}
                      variants={reduced ? undefined : step}
                      className="relative flex items-center gap-3 pl-[26px]"
                    >
                      {/* Node on the spine. */}
                      <motion.span
                        variants={reduced ? undefined : node}
                        className="absolute left-0 grid size-[15px] place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/55 dark:bg-accent-cyan/[0.16]"
                      >
                        <span className="size-1.5 rounded-full bg-accent-cyan" />
                      </motion.span>
                      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-body text-[12.5px] font-medium leading-tight text-text-primary dark:text-text-on-brand">
                            {s.fn}
                          </div>
                          <div className="truncate font-mono text-[9.5px] text-text-secondary dark:text-text-dark-secondary">
                            {s.detail}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-md bg-brand-primary/[0.08] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-brand-primary ring-1 ring-inset ring-brand-primary/20 dark:bg-white/[0.06] dark:text-text-dark-secondary dark:ring-white/10">
                          {s.layer}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Agentic verdict — the path commits to an action. */}
              <motion.div
                className="group/v flex items-center justify-between gap-3 rounded-lg border border-accent-indigo/35 bg-gradient-to-r from-accent-cyan/[0.1] to-brand-purple/[0.08] px-3 py-2 dark:border-accent-indigo/45"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
                transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 1 }}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="grid size-4 place-items-center rounded-full bg-gradient-to-br from-accent-indigo to-brand-purple">
                    <Sparkles aria-hidden className="size-2 text-white" strokeWidth={2.5} />
                  </span>
                  <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
                    Action taken
                  </span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                  Confidence 0.97 · 60 ms
                </span>
              </motion.div>
        </div>
      </IllustrationCard>
    </>
  );
}
