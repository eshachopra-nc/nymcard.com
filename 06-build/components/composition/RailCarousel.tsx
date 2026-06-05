"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { Eyebrow } from "./atoms";
import { UIPlaceholder } from "./UIPlaceholder";

// ── RailCarousel (design-system.md §8.18) ──────────────────────────────────
//
// The Stripe-style full-bleed horizontal rail — a props-driven primitive
// generalised from the homepage UseCases section. One composition, two
// card-density variants:
//
//   variant="rich"   — Section 5/homepage shape: UI placeholder + headline +
//                      body + a small list of bullets + an Explore link.
//                      Heavier card, fewer visible at once.
//   variant="sparse" — Section 7 (Industries) shape: an eyebrow + one line
//                      of copy + a link label. Lighter card, more visible.
//                      Per page-arc §7 — dark background, Apple-style horizontal
//                      carousel, each card = industry eyebrow + one line + link.
//
// What stays from the original UseCases section:
//
//   - Full-bleed rail with native scroll-snap; cards crop past the viewport
//     edge on the right.
//   - Desktop arrow controls; native touch scroll on mobile (controls hidden).
//   - `pl` and `scroll-pl` calculated to align card 1 with the page's left
//     rail at every breakpoint.
//   - Entrance fade-up gated on `useReducedMotion`.
//   - Smooth-scroll vs auto on the arrow controls, also gated on reduced motion.
//
// Surface variants:
//
//   background="light" — surface-soft section, white cards (the homepage default).
//   background="dark"  — surface-dark-base section, surface-dark-elevated cards.
//
// The card surface is the same on both, just themed — same border + cyan
// front-edge hairline vocabulary as the other composition primitives.
//
// Accessibility:
//   - Arrows are real buttons with aria-labels.
//   - The rail itself is `aria-label`'d by the consuming section.
//   - Cards are real anchor elements — keyboard reachable.
//   - Reduced motion: no entrance fade, arrow controls use behavior:auto.

export type RailCarouselVariant = "rich" | "sparse";

/**
 * Card content for variant="rich" — the dense homepage shape. Optional
 * `uiLabel` controls the UIPlaceholder caption inside the card.
 */
export type RailCarouselRichItem = {
  id: string;
  /** Card headline. */
  name: string;
  /** One- or two-line description. */
  description: string;
  /** A small list of feature lines — three is the rhythm. Optional: the
   *  industries rail leads with an icon + one line and carries no bullets. */
  bullets?: string[];
  /** Caption for the UI placeholder zone at the top of the card (fallback). */
  uiLabel?: string;
  /**
   * A real product-UI surface rendered in the card's visual zone. When
   * provided it replaces the neutral UIPlaceholder — the preferred state, so
   * the rail shows real product surfaces, not grey-skeleton chrome. Optional
   * so callers without a delivered visual still render an on-system stand-in.
   */
  visual?: ReactNode;
  /**
   * A branded icon for the card's visual zone — the industries-rail shape,
   * where each card represents an industry rather than a product UI. Rendered
   * as a centred icon tile when no `visual` is supplied (icon beats reusing a
   * product image, per the owner's direction).
   */
  icon?: ReactNode;
  /** A short chip beside the icon — the industry name, in industries mode. */
  tag?: string;
  /** Where the card links to. */
  href: string;
};

/**
 * Card content for variant="sparse" — the page-arc Section 7 industries shape.
 * Lighter card, narrower; more cards visible per viewport.
 */
export type RailCarouselSparseItem = {
  id: string;
  /** Industry eyebrow — runs uppercased through the Eyebrow atom. */
  eyebrow: string;
  /** One line of copy — what the industry uses this product for. */
  copy: string;
  /** Tertiary link to the industry page. */
  link: { label: string; href: string };
};

export type RailCarouselItem = RailCarouselRichItem | RailCarouselSparseItem;

/**
 * The carousel prop signature is a discriminated union on `variant`. Item
 * shape is enforced per variant — the copywriter writes against
 * RailCarouselSparseItem for industries, RailCarouselRichItem for the
 * homepage rail.
 */
export type RailCarouselProps =
  | {
      variant: "rich";
      items: RailCarouselRichItem[];
      /** Optional eyebrow. Omit it to lead with the headline (no-eyebrow rule). */
      eyebrow?: string;
      headline: string;
      background?: "light" | "dark";
      /** Opt-in cool atmosphere field behind the section (design-system.md §8.1). */
      atmosphere?: "top" | "bottom" | "split";
      /** Accessible label for the rail (e.g. "Use cases", "Industries"). */
      ariaLabel?: string;
      className?: string;
    }
  | {
      variant: "sparse";
      items: RailCarouselSparseItem[];
      /** Optional eyebrow. Omit it to lead with the headline (no-eyebrow rule). */
      eyebrow?: string;
      headline: string;
      background?: "light" | "dark";
      ariaLabel?: string;
      className?: string;
    };

// Premium ease — same curve as the original UseCases entrance.
const EASE = [0.16, 1, 0.3, 1] as const;

export function RailCarousel(props: RailCarouselProps) {
  const {
    variant,
    eyebrow,
    headline,
    background = variant === "sparse" ? "dark" : "light",
    ariaLabel,
    className,
  } = props;
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);
  const dark = background === "dark";
  const atmosphere = "atmosphere" in props ? props.atmosphere : undefined;

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-rail-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    rail.scrollBy({ left: step * dir, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      aria-label={ariaLabel ?? `${eyebrow ?? headline} carousel`}
      className={cn(
        "relative overflow-hidden py-20 sm:py-28 lg:py-32",
        dark
          ? // Forced-dark variant — always paint the dark surface AND force the
            // dark-theme tokens locally, so the section is dark even on a
            // page in light theme (page-arc Section 7 default).
            "dark bg-surface-dark-base"
          : // Theme-responsive variant — `surface-soft` on light theme,
            // `surface-dark-base` on dark theme. Matches the original UseCases
            // section's behaviour exactly.
            "bg-surface-soft dark:bg-surface-dark-base",
        className,
      )}
    >
      {atmosphere && <SectionAtmosphere anchor={atmosphere} />}

      {/* Section header — eyebrow + headline + arrows — lives inside the
          constrained content rail. The carousel rail beneath bleeds full-width. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-[720px]">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2
              className={cn(
                "font-display font-bold leading-[1.1] tracking-tight text-text-primary text-[28px] sm:text-[32px] lg:text-[40px] dark:text-text-on-brand",
                eyebrow && "mt-4",
              )}
            >
              {headline}
            </h2>
          </div>
          {/* Arrow controls — hidden on touch where the rail scrolls natively. */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className={cn(
                "flex size-10 items-center justify-center rounded-md transition-colors",
                "bg-brand-primary/[0.08] text-brand-primary hover:bg-brand-primary hover:text-white",
                "dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:hover:bg-accent-cyan dark:hover:text-brand-navy",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
              )}
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className={cn(
                "flex size-10 items-center justify-center rounded-md transition-colors",
                "bg-brand-primary/[0.08] text-brand-primary hover:bg-brand-primary hover:text-white",
                "dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:hover:bg-accent-cyan dark:hover:text-brand-navy",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
              )}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed rail. Lives OUTSIDE the max-w-7xl so the right side runs
          to the viewport edge. `pl` matches the section's content left rail at
          every breakpoint; `scroll-pl` mirrors `pl` so snap-scroll lands cleanly. */}
      <div
        ref={railRef}
        className={cn(
          "relative z-10 mt-10 sm:mt-12 lg:mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4",
          "pl-4 sm:pl-6 lg:pl-[max(80px,calc((100vw-1280px)/2+80px))] pr-4",
          "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(80px,calc((100vw-1280px)/2+80px))]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {variant === "rich"
          ? props.items.map((item, i) => (
              <RichCard key={item.id} item={item} index={i} reduced={!!reduced} />
            ))
          : props.items.map((item, i) => (
              <SparseCard key={item.id} item={item} index={i} reduced={!!reduced} />
            ))}
      </div>
    </section>
  );
}

// ── Rich card ──────────────────────────────────────────────────────────────
//
// The dense homepage-style card. UI placeholder + headline + body + bullets +
// "Explore" link. ~32% wide on lg+ so three cards live in view at once.

function RichCard({
  item,
  index,
  reduced,
}: {
  item: RailCarouselRichItem;
  index: number;
  reduced: boolean;
}) {
  // Reduced motion: `useReducedMotion()` is false on the SERVER, so a
  // `motion.a` that only toggles `initial`/`whileInView` on `reduced` would SSR
  // `opacity:0` and never animate back once the client reports reduced motion —
  // the card stays invisible. Render a PLAIN `<a>` when reduced (a different
  // element tree, so React replaces it on hydration and no hidden style
  // survives).
  // Reduced motion: keep the SAME `motion.a` element (so hydration doesn't
  // mismatch the host tag) but `animate` straight to the visible state. The
  // server renders the non-reduced branch (`useReducedMotion()` is false on the
  // server) and bakes `opacity:0`; under reduced motion Framer animates the
  // node to opacity:1 on mount, clearing it. A structural swap to a plain `<a>`
  // does NOT work — React leaves the SSR inline style unpatched ("won't be
  // patched up" hydration warning), so the card would stay invisible.
  const motionProps = reduced
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay: index * 0.05, ease: EASE },
      };
  return (
    <motion.a
      href={item.href}
      data-rail-card
      {...motionProps}
      className={cn(
        "nc-card-hover",
        "group relative flex shrink-0 snap-start flex-col gap-5 overflow-hidden rounded-2xl border p-7",
        // Light: a faint cool surface gradient + deeper, layered shadow so the
        // card reads dimensional on the soft section (it was flat before).
        "border-surface-border-subtle bg-gradient-to-b from-surface-white to-surface-soft/60",
        "shadow-[0_4px_14px_-4px_rgba(14,26,51,0.07),0_18px_40px_-16px_rgba(14,26,51,0.14)]",
        "dark:border-surface-dark-border dark:from-surface-dark-elevated dark:to-surface-dark-elevated dark:shadow-none dark:hover:border-surface-dark-border-stronger",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
        "w-[86%] sm:w-[60%] md:w-[44%] lg:w-[32%]",
      )}
    >
      {/* Cyan top-edge hairline — the system's front-edge cue (light only). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent dark:hidden"
      />
      {/* Crosshair signature — appears top-right on hover. */}
      <RailCrosshair />

      {item.icon ? (
        // Industries mode — a small icon + an industry-name chip, then the
        // headline + description. No oversized container for a small icon.
        <div className="flex items-center gap-3">
          {/* Vibrant brand-gradient icon box (white glyph), square-rounded —
              matches the Why NymCard advantage icons (design-system.md §3). */}
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-purple text-white shadow-[0_6px_16px_-6px_rgba(48,77,187,0.5)] transition-transform duration-300 group-hover:-translate-y-0.5">
            {item.icon}
          </span>
          {item.tag && (
            <span className="rounded-pill border border-surface-border-subtle bg-surface-soft px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-text-secondary dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-dark-secondary">
              {item.tag}
            </span>
          )}
        </div>
      ) : item.visual || item.uiLabel ? (
        // Product / use-case mode — a real product-UI surface (or a stand-in).
        <div className="h-[180px] overflow-hidden rounded-xl border border-surface-border-subtle/70 sm:h-[200px] dark:border-surface-dark-border/70">
          {item.visual ?? (
            <UIPlaceholder label={item.uiLabel ?? "product UI"} scale="compact" />
          )}
        </div>
      ) : null}

      <div>
        <h3 className="font-display font-semibold text-text-primary text-xl leading-snug dark:text-text-on-brand">
          {item.name}
        </h3>
        <p className="mt-2.5 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {item.description}
        </p>
      </div>

      {item.bullets && item.bullets.length > 0 && (
        <ul className="space-y-2.5">
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 font-body text-[13px] leading-relaxed text-text-primary dark:text-text-on-brand"
            >
              <Check
                aria-hidden="true"
                className="mt-[3px] size-3.5 shrink-0 text-accent-cyan"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-3">
        <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors group-hover:text-brand-primary-hover dark:text-accent-cyan dark:group-hover:text-accent-cyan/80">
          Explore
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.a>
  );
}

// ── Sparse card ────────────────────────────────────────────────────────────
//
// The page-arc Section 7 industries card. Eyebrow + one line + tertiary link.
// Narrower (~22% on lg+) so more cards live in view, matching the Apple-style
// rhythm described in the brief.

function SparseCard({
  item,
  index,
  reduced,
}: {
  item: RailCarouselSparseItem;
  index: number;
  reduced: boolean;
}) {
  // See RichCard — keep `motion.a` and `animate` straight to visible under
  // reduced motion so Framer clears the SSR-baked `opacity:0` on mount.
  const motionProps = reduced
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay: index * 0.05, ease: EASE },
      };
  return (
    <motion.a
      href={item.link.href}
      data-rail-card
      {...motionProps}
      className={cn(
        "nc-card-hover",
        "group relative flex shrink-0 snap-start flex-col gap-6 overflow-hidden rounded-2xl border p-7",
        "border-surface-border-subtle bg-surface-white",
        "shadow-[0_2px_8px_0_rgba(14,26,51,0.04),0_1px_2px_0_rgba(14,26,51,0.06)]",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
        "w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%]",
        "min-h-[220px]",
      )}
    >
      {/* Crosshair signature — the quiet recurrence of the page-rail mark on
          a rail card. Appears on hover, top-right. */}
      <RailCrosshair />
      <Eyebrow>{item.eyebrow}</Eyebrow>
      <p className="font-display text-lg font-medium leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
        {item.copy}
      </p>
      <div className="mt-auto pt-3">
        <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors group-hover:text-brand-primary-hover dark:text-accent-cyan dark:group-hover:text-accent-cyan/80">
          {item.link.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.a>
  );
}

// ── Rail crosshair ──────────────────────────────────────────────────────────
//
// The quiet recurrence of the page-rail crosshair mark on a rail card. Sits
// top-right; fades + slides in on parent hover (the parent is `group`-classed).
// Decorative — aria-hidden, pointer-events-none.

function RailCrosshair() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-3 z-10 -translate-x-1 text-brand-navy/[0.28] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-white/[0.32]"
    >
      <svg
        viewBox="0 0 12 12"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <line x1="6" y1="1" x2="6" y2="11" />
        <line x1="1" y1="6" x2="11" y2="6" />
      </svg>
    </span>
  );
}
