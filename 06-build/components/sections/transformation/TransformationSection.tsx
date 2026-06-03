"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useReducedMotion,
  animate,
  cubicBezier,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, Boxes, Layers, Check } from "lucide-react";
import { ease } from "@/components/visuals/motion";
import { visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";
import { FragmentedCanvas } from "./FragmentedCanvas";
import { NCoreStack } from "@/components/artifacts/NCoreStack";

const NYM = visual.primary;
const CYAN = "#22D3EE";
const TEAL = "#0E9F8E";

// The four value callouts — a checklist beside the platform (full-stack state).
const CALLOUTS = [
  { title: "One customer", line: "A single view across every interaction." },
  { title: "Real-time data", line: "Decisions based on what's happening now." },
  { title: "AI-native", line: "Intelligence built into the core." },
  { title: "One platform", line: "Cards, lending and money movement on shared infrastructure." },
];

// ── Transformation (Homepage §3) — Legacy ↔ Full-stack ───────────────────────
//
// Owner direction (2 June 2026): TWO states, a toggle — Legacy (the problem) and
// Full-stack (the answer). A one-shot cyan scan-morph plays the transformation
// between them. Full-width showcase: tabs + copy header on top, the morphing
// canvas full-width below (so the fragmented estate has room to read, and the
// nCore architecture has room to resolve).
//
// The morph is driven by an animated `t` MotionValue (0 = legacy, 1 = full-
// stack) handed to FragmentedCanvas — a controlled animation, NOT a scroll
// scrub, so it's smooth and reliable. Reduced-motion snaps between states.

const COPY = {
  legacy: {
    tab: "Legacy",
    headline: "Your core wasn't built for an always-on, AI-first economy.",
    body: "Cards, payments, lending, risk, and compliance operate independently. The same customer exists multiple times, data arrives late, and every change introduces complexity.",
  },
  fullstack: {
    tab: "Full-stack",
    headline: "One platform. Every payment flow.",
    body: "A unified infrastructure layer bringing cards, money movement, lending, identity, risk, and operations onto a single core with real-time data and AI built in.",
    cta: { label: "Explore nCore", href: "/platform/ncore" },
  },
} as const;

const cine = cubicBezier(...ease.cinematic);

export function TransformationSection() {
  const reduced = useReducedMotion();
  const [tab, setTab] = useState<"legacy" | "fullstack">("legacy");
  const fs = tab === "fullstack";

  // The scan-morph: `reveal` sweeps 0→1 on toggle; a cyan scan crosses and, in
  // its wake (left of it), Full-stack is revealed while Legacy is clipped away —
  // one eased timeline, smooth by construction.
  const reveal = useMotionValue(0);
  useEffect(() => {
    const target = fs ? 1 : 0;
    if (reduced) {
      reveal.set(target);
      return;
    }
    const controls = animate(reveal, target, { duration: 1.6, ease: cine });
    return () => controls.stop();
  }, [fs, reduced, reveal]);

  const sweep = useTransform(reveal, [0, 1], [0, 100]); // scan x, %
  const legacyClip = useMotionTemplate`inset(0 0 0 ${sweep}%)`; // keep right of scan
  const fullInset = useTransform(reveal, [0, 1], [100, 0]);
  const fullClip = useMotionTemplate`inset(0 ${fullInset}% 0 0)`; // reveal left of scan
  const beamLeft = useMotionTemplate`${sweep}%`;
  const beamOpacity = useTransform(reveal, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section
      aria-label="Legacy to full-stack"
      className="relative isolate overflow-hidden bg-surface-base py-20 sm:py-24 lg:py-28 dark:bg-surface-dark-base"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-20">
        {/* Legacy | Full-stack toggle — the primary control; deliberately
            prominent. Active pill = a translucent brand→cyan gradient. */}
        <div
          role="tablist"
          aria-label="Legacy or full-stack"
          className="mb-8 inline-flex rounded-full border border-brand-primary/15 bg-surface-white/70 p-1 shadow-[0_10px_30px_-14px_rgba(48,77,187,0.4)] backdrop-blur-md dark:border-white/12 dark:bg-surface-dark-elevated/60"
        >
          {(["legacy", "fullstack"] as const).map((k) => {
            const Icon = k === "legacy" ? Boxes : Layers;
            const active = tab === k;
            return (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(k)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-display text-[15px] font-bold tracking-tight backdrop-blur-sm transition-colors duration-300",
                  active
                    ? "text-white shadow-[0_6px_18px_-8px_rgba(48,77,187,0.55)]"
                    : "text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-on-brand",
                )}
                style={active ? { background: `linear-gradient(135deg, ${withAlpha(NYM, 0.92)}, ${withAlpha(CYAN, 0.82)})` } : undefined}
              >
                <Icon className="size-4 shrink-0" strokeWidth={2.2} />
                {COPY[k].tab}
              </button>
            );
          })}
        </div>

        {/* Copy + callouts (left) · platform / canvas (right) — 50/50. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — copy; full-stack adds the value callouts as a checklist. */}
          <div>
            <div className="relative min-h-[380px]">
              <CopyBlock show={!fs}>
                <Headline>{COPY.legacy.headline}</Headline>
                <Body>{COPY.legacy.body}</Body>
              </CopyBlock>

              <CopyBlock show={fs}>
                <Headline>{COPY.fullstack.headline}</Headline>
                <Body>{COPY.fullstack.body}</Body>
                <ul className="mt-7 space-y-3.5">
                  {CALLOUTS.map((c) => (
                    <li key={c.title} className="flex gap-2.5">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full" style={{ background: withAlpha(CYAN, 0.16), color: TEAL }}>
                        <Check className="size-2.5" strokeWidth={3.2} />
                      </span>
                      <span className="leading-snug">
                        <span className="font-display text-[14px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">{c.title}</span>
                        <span className="ml-1.5 font-body text-[13px] text-text-secondary dark:text-text-dark-secondary">{c.line}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={COPY.fullstack.cta.href}
                  className="group mt-7 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand-primary transition-colors hover:text-brand-navy dark:text-accent-cyan dark:hover:text-accent-cyan/80"
                >
                  {COPY.fullstack.cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </CopyBlock>
            </div>
          </div>

          {/* Right — the scan-morph: scan sweeps, Full-stack revealed in its wake. */}
          <div>
            <div className="relative aspect-square w-full overflow-hidden">
              {/* Legacy — kept to the RIGHT of the scan (clipped away as it passes). */}
              <motion.div className="absolute inset-0" style={reduced ? { clipPath: fs ? "inset(0 0 0 100%)" : "inset(0 0 0 0)" } : { clipPath: legacyClip }}>
                <FragmentedCanvas className="h-full w-full" />
              </motion.div>
              {/* Full-stack — the canonical NCoreStack, revealed to the LEFT of
                  the scan. (Same artifact used on /visual-system, the nCore page
                  and homepage §4 — one nCore visual language site-wide.) */}
              <motion.div className="absolute inset-0 flex items-center justify-center px-4" style={reduced ? { clipPath: fs ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" } : { clipPath: fullClip }}>
                <NCoreStack className="w-full max-w-[380px]" />
              </motion.div>
              {/* The cyan scan beam riding the sweep. */}
              {!reduced && (
                <motion.div className="pointer-events-none absolute inset-y-0 z-30 w-[5%] -translate-x-1/2" style={{ left: beamLeft, opacity: beamOpacity }}>
                  <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(CYAN, 0.18)} 50%, transparent)` }} />
                  <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 blur-[1px]" style={{ background: `linear-gradient(to bottom, transparent, ${withAlpha(CYAN, 0.85)}, transparent)`, boxShadow: `0 0 18px 2px ${withAlpha(CYAN, 0.45)}` }} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── A crossfading copy block (only the active tab shows) ─────────────────────
function CopyBlock({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 transition-opacity duration-500",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {children}
    </div>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-[2.1rem] dark:text-text-on-brand">
      {children}
    </h2>
  );
}

function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}
