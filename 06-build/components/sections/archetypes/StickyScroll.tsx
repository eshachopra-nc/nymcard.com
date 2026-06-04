"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";

// ── Archetype · Sticky-scroll "how it works" ────────────────────────────────
//
// The premium walkthrough treatment: a visual column that STAYS PINNED on one
// side while the copy column scrolls through N steps. As each copy step enters
// view the pinned visual CROSS-FADES to that step's visual — so one surface
// carries the whole narrative instead of N repeated rows. The Stripe / Linear
// "scrollytelling" pattern, kept on-system: tokens only, cool palette, light +
// dark, the kit's one restrained reveal beat.
//
// How it works (large viewports):
//   - The visual column is `position: sticky` (CSS pin — NO scroll hijacking,
//     the page scrolls natively). It holds ONE shared visual frame that swaps
//     its content per active step via AnimatePresence cross-fade.
//   - Each copy step is a tall panel. An IntersectionObserver watches the panels
//     and sets the active index to whichever panel is crossing the viewport
//     centre — that drives the pinned visual + the step's own active state.
//   - The non-active steps dim back (still fully readable) so the active step
//     leads the eye; a hairline spine + index marker thread the sequence.
//
// Reduced motion / no-JS / small viewports:
//   - `prefers-reduced-motion` OR narrow screens render a PLAIN STACKED LIST:
//     each step shows its title, body and its OWN visual inline, in order. No
//     pin, no cross-fade, no observer-driven dimming, no scroll-jacking. The
//     sticky/IO layer is purely an enhancement layered on top of that.
//
// Layout: headline + lede sit above (full-measure, like the page's other
// openers — no eyebrow), then the pinned-visual ↔ stepping-copy split. Server-
// rendered content is passed in as `steps[].visual` (any ReactNode — e.g. a
// labelled UIPlaceholder); this client component only owns the pin + observer.

export type StickyScrollStep = {
  /** Step title — leads the panel. */
  title: string;
  /** Step body — string or rich nodes (e.g. supporting chips). */
  body: ReactNode;
  /** The visual shown pinned while this step is active. */
  visual: ReactNode;
};

type StickyScrollProps = {
  /** Optional umbrella headline above the steps. Omit to let the steps lead. */
  headline?: string;
  /** Optional lede beneath the headline. */
  lede?: ReactNode;
  steps: StickyScrollStep[];
  /** Pin the visual on the left instead of the right. Default right. */
  visualSide?: "left" | "right";
  /** Number the steps (01, 02 …) instead of the default dash marker. */
  numbered?: boolean;
  className?: string;
};

export function StickyScroll({
  headline,
  lede,
  steps,
  visualSide = "right",
  numbered = false,
  className,
}: StickyScrollProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  // Only enable the pinned/observer enhancement after mount — SSR and the
  // reduced-motion path both render the plain stacked list, so there's no
  // hydration flash and no-JS users get the full content.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    // Skip the enhancement on narrow viewports — the stacked list is the right
    // form there (no room to pin a visual beside the copy).
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The panel whose centre is nearest the viewport centre wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const idx = panelRefs.current.indexOf(visible[0].target as HTMLElement);
        if (idx !== -1) setActive(idx);
      },
      {
        // A band centred on the viewport — a panel is "active" while its body
        // crosses the middle third, so the visual swaps as you read into it.
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const nodes = panelRefs.current.filter(Boolean) as HTMLElement[];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [mounted, reduced, steps.length]);

  // The pinned-enhancement layout runs only client-side, with motion, on lg+.
  const enhanced = mounted && !reduced;

  const visualFirst = visualSide === "left";
  // Only reserve top space below the opener when there IS an opener.
  const hasOpener = Boolean(headline || lede);
  const stackedTop = hasOpener ? "mt-12 sm:mt-16" : "mt-0";
  const splitTop = hasOpener ? "mt-16" : "mt-0";

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Opener — optional headline + lede, full measure. No eyebrow. Omitted
          when the steps themselves lead (no invented umbrella copy). */}
      {(headline || lede) && (
        <div className="max-w-3xl">
          {headline && (
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
              {headline}
            </h2>
          )}
          {lede && (
            <div className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
              {lede}
            </div>
          )}
        </div>
      )}

      {/* ── Plain stacked list (reduced-motion / SSR / mobile baseline) ────── */}
      {!enhanced && (
        <ol className={cn("flex flex-col gap-14", stackedTop)}>
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="grid items-start gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-16"
            >
              <StepCopy step={step} index={i} numbered={numbered} active />
              <div className="lg:row-start-1">{step.visual}</div>
            </li>
          ))}
        </ol>
      )}

      {/* ── Enhanced: pinned visual + scrolling steps (lg+, motion-safe) ───── */}
      {enhanced && (
        <>
          {/* Mobile keeps the stacked list even when enhanced (no room to pin). */}
          <ol className={cn("flex flex-col gap-14 lg:hidden", stackedTop)}>
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-8">
                <StepCopy step={step} index={i} numbered={numbered} active />
                <div>{step.visual}</div>
              </li>
            ))}
          </ol>

          {/* lg+ — the split. DOM order (not CSS order) sets the side, so the
              grid tracks stay deterministic: the copy track is the wider one. */}
          <div
            className={cn(
              "hidden gap-16 lg:grid",
              visualFirst ? "lg:grid-cols-[1.04fr_1fr]" : "lg:grid-cols-[1fr_1.04fr]",
              splitTop,
            )}
          >
            {visualFirst ? (
              <>
                <PinnedVisual active={active} steps={steps} />
                <CopyColumn
                  steps={steps}
                  active={active}
                  numbered={numbered}
                  panelRefs={panelRefs}
                />
              </>
            ) : (
              <>
                <CopyColumn
                  steps={steps}
                  active={active}
                  numbered={numbered}
                  panelRefs={panelRefs}
                />
                <PinnedVisual active={active} steps={steps} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// The pinned visual column — sticky on tall viewports; cross-fades to the active
// step's visual via AnimatePresence.
function PinnedVisual({
  active,
  steps,
}: {
  active: number;
  steps: StickyScrollStep[];
}) {
  return (
    <div className="lg:row-start-1">
      <div className="sticky top-28">
        <div className="relative min-h-[26rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: dur.slow, ease: ease.out }}
              className="h-full"
            >
              {steps[active]?.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// The scrolling copy column — tall panels threaded on a spine; the observer
// targets each <li>.
function CopyColumn({
  steps,
  active,
  numbered,
  panelRefs,
}: {
  steps: StickyScrollStep[];
  active: number;
  numbered: boolean;
  panelRefs: { current: (HTMLElement | null)[] };
}) {
  return (
    <ol className="relative lg:row-start-1">
      {/* The spine — a faint hairline the index markers sit on. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 bottom-2 w-px bg-surface-border-subtle dark:bg-surface-dark-border"
      />
      {steps.map((step, i) => (
        <li
          key={step.title}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          // Tall panels so each gets its own scroll dwell — this is what gives
          // the pinned visual room to hold per step.
          className="flex min-h-[78vh] items-center pl-8"
        >
          <StepCopy
            step={step}
            index={i}
            numbered={numbered}
            active={i === active}
            onSpine
          />
        </li>
      ))}
    </ol>
  );
}

// A single step's copy block — title + body + index marker. `active` lifts it
// to full presence; inactive steps dim back but stay readable. `onSpine`
// renders the marker as a node sitting on the threaded hairline.
function StepCopy({
  step,
  index,
  numbered,
  active,
  onSpine = false,
}: {
  step: StickyScrollStep;
  index: number;
  numbered: boolean;
  active: boolean;
  onSpine?: boolean;
}) {
  const marker = numbered ? String(index + 1).padStart(2, "0") : "—";
  return (
    <div
      className={cn(
        "transition-opacity duration-500",
        active ? "opacity-100" : "opacity-45",
      )}
    >
      <div className="flex items-center gap-3">
        {onSpine ? (
          // A node on the spine: filled + ringed when active, hollow when not.
          <span
            aria-hidden="true"
            className={cn(
              "relative -ml-[2.0625rem] grid size-[1.125rem] shrink-0 place-items-center rounded-full transition-colors duration-500",
              active
                ? "bg-accent-teal ring-4 ring-accent-teal/15 dark:bg-accent-cyan dark:ring-accent-cyan/20"
                : "bg-surface-white ring-1 ring-surface-border-subtle dark:bg-surface-dark-base dark:ring-surface-dark-border",
            )}
          />
        ) : null}
        <span
          aria-hidden="true"
          className="select-none font-mono text-[13px] font-semibold leading-none tracking-tight tabular-nums text-accent-teal dark:text-accent-cyan"
        >
          {marker}
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold leading-[1.14] tracking-tight text-text-primary sm:text-[1.75rem] dark:text-text-on-brand">
        {step.title}
      </h3>
      <div className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {step.body}
      </div>
    </div>
  );
}
