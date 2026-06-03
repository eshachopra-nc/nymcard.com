"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CrosshairRails, GlassAtmosphere } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";
import { TransformScene } from "./TransformScene";

// ── Transformation (Homepage §3) — "Legacy becomes nCore" ────────────────────
//
// The signature moment of the homepage. Merges the former §3 (legacy problem)
// and §4 (nCore) into ONE scroll-driven transformation (owner direction, 2 June
// 2026). Copy left, a cinematic infrastructure visualization right; as the user
// scrolls, the section pins and the visual is scrubbed through four states while
// the copy advances with it.
//
// Copy mirrored verbatim from 02-copy/Homepage.revised.md §3 (Gate 2 approved).
//
// SCROLL MODEL (lg+): a tall scroll container with a sticky 100vh stage. One
// `scrollYProgress` (0 → 1) drives BOTH the left step-copy crossfades and the
// right TransformScene — a single source of truth so copy and visual never
// drift. The sequence ends mostly-revealed (nucleus settled) to pull the eye
// into Products below.
//
// REDUCED MOTION / SMALL SCREENS (Rule 6): no pin, no scroll-jacking. The
// section renders in normal flow with the full copy stacked and the scene held
// at its resolved state (progress = 1) — zero motion, all copy in the DOM.

const COPY = {
  state1: {
    eyebrow: "The problem",
    headline: "Your core wasn't built for an always-on, AI-first economy.",
    support:
      "Cards, payments, lending, risk, and compliance each live in their own system. The same customer sits in all of them, recorded a different way each time. No single source of truth.",
  },
  state2: { line: "One layer that reads every system at once." },
  state3: {
    line: "Duplicates merge. Batches turn live. The systems finally agree.",
    support: "One customer record. One ledger. One audit trail.",
  },
  state4: {
    eyebrow: "nCore",
    headline: "Replace legacy with one platform you own.",
    support:
      "Cards, lending, money movement, settlement, financial crime, and reconciliation, on a single core that NymCard owns underneath.",
    cta: { label: "Explore nCore", href: "/platform/ncore" },
  },
} as const;

export function TransformationSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) return <StaticVersion />;

  return (
    <>
      {/* Small screens — no pin; the static, resolved composition. */}
      <div className="lg:hidden">
        <StaticVersion />
      </div>

      {/* lg+ — the pinned, scroll-scrubbed transformation. */}
      <div ref={ref} className="relative hidden h-[400vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-surface-soft dark:bg-surface-dark-base">
          {/* Contained cool field — the stage reads as a deep estate, never a
              flat band. Restrained, theme-aware. */}
          <GlassAtmosphere tone="indigo" depth="deep" animated />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-12 px-6 lg:px-20">
            {/* Left — step-synced copy. */}
            <div className="col-span-5">
              <div className="relative min-h-[300px]">
                <StepBlock progress={scrollYProgress} window={[0, 0, 0.2, 0.26]}>
                  <Eyebrow>{COPY.state1.eyebrow}</Eyebrow>
                  <Headline>{COPY.state1.headline}</Headline>
                  <Support>{COPY.state1.support}</Support>
                </StepBlock>

                <StepBlock progress={scrollYProgress} window={[0.24, 0.29, 0.43, 0.48]}>
                  <BigLine>{COPY.state2.line}</BigLine>
                </StepBlock>

                <StepBlock progress={scrollYProgress} window={[0.46, 0.51, 0.62, 0.67]}>
                  <BigLine>{COPY.state3.line}</BigLine>
                  <Support className="mt-4">{COPY.state3.support}</Support>
                </StepBlock>

                <StepBlock progress={scrollYProgress} window={[0.66, 0.73, 1, 1]} hold>
                  <Eyebrow tone="cyan">{COPY.state4.eyebrow}</Eyebrow>
                  <Headline>{COPY.state4.headline}</Headline>
                  <Support>{COPY.state4.support}</Support>
                  <Link
                    href={COPY.state4.cta.href}
                    className="group mt-7 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand-primary transition-colors hover:text-brand-navy dark:text-accent-cyan dark:hover:text-accent-cyan/80"
                  >
                    {COPY.state4.cta.label}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </StepBlock>
              </div>

              {/* Progress rail — a quiet 4-segment cue so the pin reads as a
                  deliberate sequence, not a stuck page. */}
              <ProgressRail progress={scrollYProgress} />
            </div>

            {/* Right — the cinematic visualization. */}
            <div className="col-span-7">
              <div className="relative mx-auto max-w-[560px]">
                <CrosshairRails className="-inset-4 lg:-inset-6" />
                <TransformScene progress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Static / reduced-motion version ──────────────────────────────────────────
function StaticVersion() {
  const resolved = useMotionValue(1);
  return (
    <section
      aria-label="Legacy becomes nCore"
      className="relative isolate overflow-hidden bg-surface-soft py-20 sm:py-24 lg:py-28 dark:bg-surface-dark-base"
    >
      <GlassAtmosphere tone="indigo" depth="deep" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-20">
        <div>
          <Eyebrow>{COPY.state1.eyebrow}</Eyebrow>
          <Headline>{COPY.state1.headline}</Headline>
          <Support>{COPY.state1.support}</Support>

          <div className="mt-8 border-t border-surface-border-subtle pt-8 dark:border-surface-dark-border">
            <Eyebrow tone="cyan">{COPY.state4.eyebrow}</Eyebrow>
            <Headline>{COPY.state4.headline}</Headline>
            <Support>{COPY.state4.support}</Support>
            <Link
              href={COPY.state4.cta.href}
              className="group mt-7 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-brand-primary transition-colors hover:text-brand-navy dark:text-accent-cyan dark:hover:text-accent-cyan/80"
            >
              {COPY.state4.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px]">
          <TransformScene progress={resolved} />
        </div>
      </div>
    </section>
  );
}

// ── Step-synced copy block ───────────────────────────────────────────────────
// Crossfades in/out over a 4-point window [fadeInStart, fullIn, fullOutStart,
// fadeOut] of scroll progress. `hold` keeps it at full past the window end.
function StepBlock({
  progress,
  window,
  hold = false,
  children,
}: {
  progress: MotionValue<number>;
  window: [number, number, number, number];
  hold?: boolean;
  children: React.ReactNode;
}) {
  const [a, b, c, d] = window;
  const opacity = useTransform(progress, [a, b, c, d], hold ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [16, 0, 0, hold ? 0 : -10]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      {children}
    </motion.div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  // Unrolled (no hooks in a loop): four fixed segments fill in sequence.
  const f0 = useTransform(progress, [0, 0.25], ["0%", "100%"]);
  const f1 = useTransform(progress, [0.25, 0.5], ["0%", "100%"]);
  const f2 = useTransform(progress, [0.5, 0.75], ["0%", "100%"]);
  const f3 = useTransform(progress, [0.75, 1], ["0%", "100%"]);
  return (
    <div className="mt-10 flex items-center gap-2" aria-hidden="true">
      {[f0, f1, f2, f3].map((fill, i) => (
        <span
          key={i}
          className="relative h-0.5 w-10 overflow-hidden rounded-full bg-surface-border-subtle dark:bg-surface-dark-border"
        >
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-brand-primary dark:bg-accent-cyan"
            style={{ width: fill }}
          />
        </span>
      ))}
    </div>
  );
}

// ── Typographic atoms (shared by both paths) ─────────────────────────────────
function Eyebrow({ children, tone }: { children: React.ReactNode; tone?: "cyan" }) {
  return (
    <p
      className={cn(
        "mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em]",
        tone === "cyan"
          ? "text-brand-primary dark:text-accent-cyan"
          : "text-text-muted dark:text-text-dark-secondary",
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

function BigLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-text-primary sm:text-3xl lg:text-[2rem] dark:text-text-on-brand">
      {children}
    </p>
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
