"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { dur, ease, visual, withAlpha } from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── IndustryCarousel (design-system.md §8.18) ──────────────────────────────
//
// The props-driven horizontal carousel for the product-page Section 7
// (Industries). Apple-style focal card on a dark section, side arrows, dot
// indicator, drag-to-advance, auto-rotate with manual-pause.
//
// Interaction model is reused from components/hero/ProductCarousel.tsx — that
// stays hero-locked (hardcoded products, light glass-on-glass material, hero
// positioning). This one generalises only the interaction: items come in as
// props, the card material is the system's own dark-surface treatment, and
// the carousel reads as an industries section in a product page rather than a
// hero artefact.
//
// Card material: a dark elevated surface with a thin cyan top hairline and a
// soft corner glow — the same vocabulary as FloatingOperationalPanel and the
// embedded UI zones, on the dark theme. Cool palette only (§3).
//
// Accessibility:
//   - Arrows are real buttons with aria-labels.
//   - The dot strip is a tablist; the active dot is aria-selected.
//   - The focal card is announced via aria-live="polite" so it changes for
//     screen readers without stealing focus.
//   - Reduced motion: the carousel collapses to a single static representative
//     card with no controls — no rotation, no drag, no transitions.
//
// Drag: pointer drag advances on a ±50px threshold (same as ProductCarousel).
// Auto-rotate: 15s default, paused under hover or after any manual interaction
// for MANUAL_PAUSE_MS, and disabled under prefers-reduced-motion.

export type IndustryCarouselItem = {
  /** The industry name — runs as the eyebrow on the card (e.g. "Banks"). */
  eyebrow: string;
  /** One line of copy — what the industry uses NymCard for. */
  copy: string;
  /** The link to the industry's page — tertiary CTA on the card. */
  link: { label: string; href: string };
};

export type IndustryCarouselProps = {
  items: IndustryCarouselItem[];
  /** Auto-rotate interval in ms. Defaults to 15s per the page-arc brief. */
  autoRotateMs?: number;
  /**
   * Background tone for the section the carousel renders into. The carousel
   * sits in a dark section by default (per the page-arc); pass `light` if it
   * ever needs to render against a light surface.
   */
  background?: "dark" | "light";
  className?: string;
};

// Threshold (px) for drag-to-advance. Mirrors ProductCarousel.
const DRAG_THRESHOLD = 50;
// Pause auto-rotate this long after the user manually interacts. Lets the
// user drive the carousel without being yanked forward by the timer.
const MANUAL_PAUSE_MS = 15000;

export function IndustryCarousel({
  items,
  autoRotateMs = 15000,
  background = "dark",
  className,
}: IndustryCarouselProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const manualPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const len = items.length;

  // ── Manual-pause handling ────────────────────────────────────────────────
  const markManualInteraction = useCallback(() => {
    setManualPaused(true);
    if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current);
    manualPauseTimer.current = setTimeout(
      () => setManualPaused(false),
      MANUAL_PAUSE_MS,
    );
  }, []);

  useEffect(
    () => () => {
      if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current);
    },
    [],
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  const goTo = useCallback(
    (target: number) => {
      setDirection(target > index ? 1 : -1);
      setIndex(target);
    },
    [index],
  );

  // ── Auto-rotate ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (reduced || paused || manualPaused || len < 2) return;
    const id = setInterval(next, autoRotateMs);
    return () => clearInterval(id);
  }, [reduced, paused, manualPaused, next, autoRotateMs, len]);

  if (len === 0) return null;

  // Resolve the surface theming. The carousel sits inside a section; this
  // primitive doesn't paint the section background itself (the page is
  // responsible for that), but it does pick the card material that reads
  // correctly against it.
  const dark = background === "dark";

  // ── Reduced-motion fallback ──────────────────────────────────────────────
  //
  // No auto-rotate, no drag, no controls — just a single representative card.
  // Matches the spec: "under reduced motion, show a static representative
  // card and no controls."
  if (reduced) {
    return (
      <div
        className={cn(
          "mx-auto w-full max-w-xl",
          dark && "dark",
          className,
        )}
      >
        <IndustryCard item={items[0]} />
      </div>
    );
  }

  const current = items[index];

  return (
    <div
      className={cn(
        "relative w-full",
        dark && "dark",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Focal-card row — arrow · card · arrow · centred on the section. */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <ArrowButton
          direction="prev"
          onClick={() => {
            markManualInteraction();
            prev();
          }}
        />

        {/* Card viewport — fixed aspect, overflow-hidden so the slide-in card
            never bleeds outside the focal area. */}
        <div
          className="relative w-full max-w-xl overflow-hidden rounded-2xl"
          style={{ aspectRatio: "5 / 4" }}
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current.eyebrow}
              custom={direction}
              initial={{ x: direction * 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 80, opacity: 0 }}
              transition={{ duration: dur.slow, ease: ease.out }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -DRAG_THRESHOLD) {
                  markManualInteraction();
                  next();
                } else if (info.offset.x > DRAG_THRESHOLD) {
                  markManualInteraction();
                  prev();
                }
              }}
              className="absolute inset-0"
            >
              <IndustryCard item={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        <ArrowButton
          direction="next"
          onClick={() => {
            markManualInteraction();
            next();
          }}
        />
      </div>

      {/* Dot indicator — same pattern as ProductCarousel; active dot widens
          and locks to the brand accent. The dot strip is a tablist for
          assistive tech. */}
      <div
        className="mt-7 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Select industry"
      >
        {items.map((item, i) => (
          <button
            key={item.eyebrow}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to ${item.eyebrow}`}
            onClick={() => {
              markManualInteraction();
              goTo(i);
            }}
            className={cn(
              "h-1.5 rounded-pill transition-all",
              i === index
                ? "w-6 bg-brand-primary dark:bg-accent-cyan"
                : "w-1.5 bg-text-muted/30 hover:bg-text-muted/55 dark:bg-white/20 dark:hover:bg-white/35",
            )}
            style={{ transitionDuration: `${dur.base * 1000}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Card surface ───────────────────────────────────────────────────────────
//
// Dark-context card material — the system's own dark-surface treatment, not
// the hero's glass-on-glass. A bordered elevated surface, a cyan top hairline
// (the lit front face common to embedded UI surfaces), and a soft corner
// glow. Light parity preserved for the `background="light"` case so the
// primitive isn't dark-only.

function IndustryCard({ item }: { item: IndustryCarouselItem }) {
  return (
    <article
      className={cn(
        "relative isolate flex h-full w-full flex-col overflow-hidden rounded-2xl border p-7 sm:p-9",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        "shadow-[0_18px_42px_-22px_rgba(14,26,51,0.22)] dark:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.6)]",
      )}
    >
      {/* Cyan front-edge — the lit face. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.55,
          )} 38%, transparent 88%)`,
        }}
      />
      {/* Soft corner glow — the same cool wash used across the composition
          primitives. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            `radial-gradient(72% 56% at 92% 4%, ${withAlpha(visual.cyan, 0.1)}, transparent 74%),` +
            `radial-gradient(74% 56% at 4% 100%, ${withAlpha(visual.indigo, 0.08)}, transparent 76%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <Eyebrow>{item.eyebrow}</Eyebrow>
        <p className="mt-5 max-w-sm font-display text-lg font-medium leading-snug tracking-tight text-text-primary dark:text-text-on-brand sm:text-xl">
          {item.copy}
        </p>
        <a
          href={item.link.href}
          className="group mt-auto inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80"
          // The link is keyboard-focusable; the underlying card is a div, not
          // a link, so a screen reader hears the eyebrow + copy + then the
          // explicit "Explore X" link rather than one giant link blob.
        >
          {item.link.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>
    </article>
  );
}

// ── Arrow button ───────────────────────────────────────────────────────────
//
// A neutral system control — not glass, not navy fill. A bordered circular
// button that reads the same in dark and light. Distinctly a control, not
// another card surface, so it doesn't compete with the focal card visually.

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous industry" : "Next industry"}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition",
        "border-surface-border-stronger bg-surface-white text-text-primary hover:bg-surface-soft",
        "dark:border-surface-dark-border-stronger dark:bg-surface-dark-elevated dark:text-text-on-brand dark:hover:bg-surface-dark-base",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20",
      )}
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}
