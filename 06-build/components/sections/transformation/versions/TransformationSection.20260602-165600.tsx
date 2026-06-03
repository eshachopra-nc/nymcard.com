"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FragmentedCanvas } from "./FragmentedCanvas";

// ── Transformation (Homepage §3) — "Legacy becomes nCore" ────────────────────
//
// One pinned, scroll-scrubbed section that moves through the states (owner
// direction, 2 June 2026). Layout: copy header on top, a clickable state tracker,
// then the full-width infrastructure canvas.
//
//   State 1 — Fragmented   (built)
//   State 2 — The scan     (built — cyan lidar beam + tiny in-wake changes)
//   State 3 — Transform    (queued)
//   State 4 — nCore        (queued)
//
// A single `scrollYProgress` drives BOTH the header copy crossfades and the
// canvas scan, so copy and visual never drift. The tracker dots are clickable to
// jump between states. Reduced-motion / small screens render State 1 statically
// (no pin, no scan, all copy in the DOM).
//
// Copy mirrored verbatim from 02-copy/Homepage.revised.md §3 (Gate 2 approved).

const COPY = {
  state1: {
    eyebrow: "The problem",
    headline: "Your core wasn't built for an always-on, AI-first economy.",
    support:
      "Cards, payments, lending, risk, and compliance each operate independently. The same customer exists multiple times. Data arrives late. Decisions happen in the dark.",
  },
  // State 2 (the scan) is where the whole transformation plays out — the records
  // converge, systems reconnect, conflicts disappear — ending on one customer.
  state2: { eyebrow: "Scan & transform", line: "What if every decision had the full picture?" },
  // State 3 — the nCore reveal (the payoff).
  state3: {
    eyebrow: "nCore",
    headline: "One source of truth for every payment decision.",
    support: "A unified infrastructure layer connecting data, decisions, and execution in real time.",
    cta: { label: "Explore nCore", href: "/platform/ncore" },
  },
} as const;

// Three states (owner direction): Fragmented → The Scan → nCore Revealed.
const STATE_COUNT = 3;
const STATE_AT = [0.05, 0.4, 0.85];

export function TransformationSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Active state (drives the tracker AND the header copy). Discrete switch with a
  // CSS fade — robust against scroll-measurement quirks, so the copy blocks never
  // both show at once. Thresholds align with the canvas scan/merge/core windows.
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.14 ? 0 : v < 0.66 ? 1 : 2);
  });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + STATE_AT[i] * scrollable, behavior: "smooth" });
  };

  if (reduced) return <StaticVersion />;

  return (
    <>
      {/* Small screens — no pin; the static State-1 composition. */}
      <div className="lg:hidden">
        <StaticVersion />
      </div>

      {/* lg+ — the pinned, scroll-scrubbed transformation. The sticky stage
          fits the viewport: header + tracker are fixed-height, the canvas fills
          the remaining height so the whole canvas (and its scan) is always in
          view while pinned. */}
      <div ref={ref} className="relative hidden h-[360vh] lg:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-surface-base pb-8 pt-24 dark:bg-surface-dark-base">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 lg:px-20">
            {/* ── Copy header — discrete crossfade across the four states ── */}
            <div className="relative min-h-[176px] shrink-0">
              {/* State 1 — the problem */}
              <CopyLayer show={active === 0}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
                  <div>
                    <Eyebrow>{COPY.state1.eyebrow}</Eyebrow>
                    <Headline>{COPY.state1.headline}</Headline>
                  </div>
                  <Support className="max-w-xl lg:mt-0">{COPY.state1.support}</Support>
                </div>
              </CopyLayer>

              {/* State 2 — the scan (the whole transformation) */}
              <CopyLayer show={active === 1}>
                <Eyebrow tone="cyan">{COPY.state2.eyebrow}</Eyebrow>
                <Headline>{COPY.state2.line}</Headline>
              </CopyLayer>

              {/* State 3 — nCore revealed */}
              <CopyLayer show={active === 2}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
                  <div>
                    <Eyebrow tone="cyan">{COPY.state3.eyebrow}</Eyebrow>
                    <Headline>{COPY.state3.headline}</Headline>
                  </div>
                  <div className="lg:pb-1">
                    <Support className="lg:mt-0">{COPY.state3.support}</Support>
                    <Link
                      href={COPY.state3.cta.href}
                      className="group mt-4 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand-primary transition-colors hover:text-brand-navy dark:text-accent-cyan dark:hover:text-accent-cyan/80"
                    >
                      {COPY.state3.cta.label}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </CopyLayer>
            </div>

            {/* ── State tracker — clickable dots, no labels ───────────── */}
            <div className="shrink-0">
              <StateTracker active={active} onJump={jumpTo} />
            </div>

            {/* ── Infrastructure canvas — fills remaining height ──────── */}
            <div className="mt-4 flex min-h-0 flex-1 items-center justify-center">
              <FragmentedCanvas
                className="aspect-[16/9] h-full max-h-[600px] w-auto max-w-full"
                progress={scrollYProgress}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── A crossfading copy layer (only the active state shows) ───────────────────
function CopyLayer({ show, children }: { show: boolean; children: React.ReactNode }) {
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

// ── State tracker ────────────────────────────────────────────────────────────
function StateTracker({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-2" role="tablist" aria-label="Transformation states">
      {Array.from({ length: STATE_COUNT }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to state ${i + 1}`}
            onClick={() => onJump(i)}
            className="group flex h-6 items-center"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                isActive
                  ? "w-10 bg-brand-primary dark:bg-accent-cyan"
                  : "w-6 bg-surface-border-strong group-hover:bg-text-muted dark:bg-surface-dark-border dark:group-hover:bg-text-dark-secondary",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

// ── Static / reduced-motion version (State 1 only) ───────────────────────────
function StaticVersion() {
  return (
    <section
      aria-label="Legacy becomes nCore"
      className="relative isolate overflow-hidden bg-surface-base py-20 sm:py-24 lg:py-28 dark:bg-surface-dark-base"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <Eyebrow>{COPY.state1.eyebrow}</Eyebrow>
            <Headline>{COPY.state1.headline}</Headline>
          </div>
          <Support className="max-w-xl lg:mt-0">{COPY.state1.support}</Support>
        </div>
        <div className="mt-12 lg:mt-16">
          <FragmentedCanvas className="mx-auto aspect-[4/3] w-full max-w-[1040px] sm:aspect-[16/9]" />
        </div>
      </div>
    </section>
  );
}

// ── Typographic atoms ────────────────────────────────────────────────────────
function Eyebrow({ children, tone }: { children: React.ReactNode; tone?: "cyan" }) {
  return (
    <p
      className={cn(
        "mb-4 font-mono text-[11px] uppercase tracking-[0.16em]",
        tone === "cyan" ? "text-accent-cyan" : "text-brand-primary dark:text-accent-cyan",
      )}
    >
      {children}
    </p>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-[2.6rem] dark:text-text-on-brand">
      {children}
    </h2>
  );
}

function Support({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mt-6 max-w-md font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}
