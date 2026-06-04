"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Apple-style hero carousel — single focal card + brand-primary next arrow
// + dot indicator. Curated to 4 strongest products (the visual hierarchy
// for the hero; the full 8-product list lives in the Products section
// below). Auto-rotates every 12s; auto-rotate pauses for 15s after any
// manual interaction (next arrow click or dot click) so the user can
// drive the carousel without being yanked forward by the timer.
//
// Glass spec on cards matches the hero text scrim on the left for
// material parity. Arrow is brand-primary (not glass) so it stands as a
// primary control rather than another piece of glass.
//
// Mobile fallback: a single static card below the CTAs (no rotation,
// no controls) carries some visual energy down to mobile users.

type Slot = { slug: string; name: string };

// Curated to 4 (was 8). Full product set surfaces in the Products bento
// below the hero — the carousel is for headline visual rhythm, not
// exhaustive coverage.
const PRODUCTS: Slot[] = [
  { slug: "cards",                 name: "Cards" },
  { slug: "money-movement",        name: "Money Movement" },
  { slug: "embedded-lending",      name: "Lending" },
  { slug: "identity",              name: "Identity" },
  { slug: "fraud-monitoring",      name: "Fraud Monitoring" },
  { slug: "risk-management",       name: "Risk Management" },
  { slug: "acs-3ds",               name: "3D Secure" },
  { slug: "stablecoin-settlement", name: "Stablecoin Settlement" },
  { slug: "reconciliation",        name: "Reconciliation" },
];

const CARD_WIDTH = 400;
const CARD_HEIGHT = 480; // 5:6 portrait
const CARD_GAP = 20;     // distance between card and arrow
const BUTTON_SIZE = 48;
const AUTOROTATE_MS = 12000;          // slowed from 8s — less ambient noise
const MANUAL_PAUSE_MS = 15000;        // pause auto-rotate this long after manual click
const SLIDE_DURATION = 0.45;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const GLASS_STYLE: React.CSSProperties = {
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
};

export function ProductCarousel() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const manualPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const len = PRODUCTS.length;

  // Pause auto-rotate for MANUAL_PAUSE_MS after the user clicks anything.
  const markManualInteraction = useCallback(() => {
    setManualPaused(true);
    if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current);
    manualPauseTimer.current = setTimeout(() => setManualPaused(false), MANUAL_PAUSE_MS);
  }, []);

  useEffect(() => () => {
    if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  const goTo = useCallback((target: number) => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  }, [index]);

  // Auto-rotate. Suspended by hover, by prefers-reduced-motion, or by a
  // recent manual click.
  useEffect(() => {
    if (reduced || paused || manualPaused) return;
    const id = setInterval(next, AUTOROTATE_MS);
    return () => clearInterval(id);
  }, [reduced, paused, manualPaused, next]);

  const current = PRODUCTS[index];

  return (
    <>
      {/* Desktop / tablet — flex row: card-viewport · gap · arrow. mx-auto
          on tablet so the carousel centres in the single-column flow;
          left-aligned in the right column on lg. */}
      <div
        className="relative mx-auto hidden w-fit sm:flex sm:flex-col sm:items-center lg:ml-auto lg:mr-0 lg:items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex items-center gap-5">
          {/* Previous arrow — glass-morph, mirrors the card surface (same
              blur + saturate + tint) so both arrows read as part of the
              same glass material as the carousel cards. Navy chevron for
              contrast against the light glass. */}
          <button
            type="button"
            onClick={() => { markManualInteraction(); prev(); }}
            aria-label="Previous product"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/40 text-brand-navy transition hover:bg-white/60 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:border-white/20 dark:bg-white/10 dark:text-text-on-brand dark:hover:bg-white/20"
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
            }}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>

          {/* Card viewport — rounded + shadow live here (not on the inner
              cards), so the rectangular viewport corners never show grey
              behind the rounded card. Box-shadow on the viewport extends
              naturally outside its bounds since it's not subject to
              overflow-hidden clipping. */}
          <div
            className="relative overflow-hidden rounded-[24px]"
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current.slug}
                custom={direction}
                initial={{
                  x: reduced ? 0 : direction * CARD_WIDTH,
                  opacity: reduced ? 0 : 1,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: reduced ? 0 : -direction * CARD_WIDTH,
                  opacity: reduced ? 0 : 1,
                }}
                transition={{
                  duration: reduced ? 0.2 : SLIDE_DURATION,
                  ease: EASE_OUT,
                }}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) { markManualInteraction(); next(); }
                  else if (info.offset.x > 50) { markManualInteraction(); prev(); }
                }}
                className="absolute inset-0"
              >
                <CarouselCard name={current.name} slug={current.slug} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow — same glass-morph treatment as the previous arrow
              and the carousel card. Locked to the page's glass material;
              don't introduce a solid colour fill here. */}
          <button
            type="button"
            onClick={() => { markManualInteraction(); next(); }}
            aria-label="Next product"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/40 text-brand-navy transition hover:bg-white/60 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:border-white/20 dark:bg-white/10 dark:text-text-on-brand dark:hover:bg-white/20"
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
            }}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>

        {/* Position indicator — N dots, centred under the card. With arrows
            on both sides of the card, the carousel row is symmetric so
            `items-center` from the parent flex centres the dots naturally
            (no `self-start` override needed). Active dot uses brand-navy
            to match the chevron colour of the glass arrows. */}
        <div
          className="mt-5 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Select product"
        >
          {PRODUCTS.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${p.name}`}
              onClick={() => { markManualInteraction(); goTo(i); }}
              className={cn(
                // Active dot matches the glass-arrow chevron (navy) on light;
                // on the dark hero field both navy and text-muted vanish, so
                // the dots flip to white (active) / translucent white (rest).
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-brand-navy dark:bg-white"
                  : "w-1.5 bg-text-muted/30 hover:bg-text-muted/60 dark:bg-white/30 dark:hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>

      {/* Mobile (< sm) — static representative card below the CTAs. No
          rotation, no controls; just visual energy for content-first
          mobile users. */}
      <div className="block sm:hidden mt-8">
        <div
          className="relative mx-auto w-full max-w-[340px] rounded-[24px] border border-white/50 bg-white/40 dark:border-white/[0.12] dark:bg-surface-dark-glass"
          style={{
            aspectRatio: "5 / 6",
            ...GLASS_STYLE,
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div className="flex h-full flex-col p-7">
            <h3 className="font-display text-xl font-semibold text-text-primary dark:text-text-on-brand">
              {PRODUCTS[0].name}
            </h3>
            <div className="flex flex-1 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG */}
              <img
                src={`/handoff/${PRODUCTS[0].slug}.svg`}
                alt=""
                className="block h-full w-full dark:hidden"
                style={{ objectFit: "contain" }}
                loading="lazy"
                decoding="async"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG (dark) */}
              <img
                src={`/handoff/${PRODUCTS[0].slug}-dark.svg`}
                alt=""
                className="hidden h-full w-full dark:block"
                style={{ objectFit: "contain" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Slugs that have a delivered SVG in /public/handoff/{slug}.svg. Flip the
// rest to `true` as their UIs land. Cards not in this set fall back to a
// labelled placeholder so it's obvious which UIs are still outstanding.
const SVGS_LIVE = new Set<string>(["cards", "embedded-lending", "money-movement", "identity", "fraud-monitoring", "risk-management", "acs-3ds", "stablecoin-settlement", "reconciliation"]);

// Slugs that ship a dedicated dark-mode SVG (/handoff/{slug}-dark.svg). The
// handoff illustrations carry navy text + deep-navy shapes (#0E1A33 / #7A88AC
// muted labels) that vanish on the dark glass card, so each gets a recoloured
// dark variant (the navies lifted to readable light slates; cyan/white/violet
// kept). Identity is excluded — it's a layered photo composition (IdentityVisual).
const HAS_DARK_SVG = new Set<string>([
  "money-movement",
  "cards",
  "embedded-lending",
  "fraud-monitoring",
  "risk-management",
  "acs-3ds",
  "stablecoin-settlement",
  "reconciliation",
]);

// Identity is rendered as a layered composition rather than a single SVG:
// the avatar photo sits behind a transparent "viewfinder" SVG that supplies
// the scan rings, biometric dots, brackets and verification chips. The
// wrapper is locked to the SVG's 336:360 viewBox aspect ratio so the photo
// disk aligns with the disk reticle in the SVG (centred, 42% of wrapper
// width — matches r=71 within a 336-wide viewBox).
//
// Photo source: /public/identity-avatar.png (copied from
// /03-references/identity-avatar.png). The dark navy fallback fill is
// visible if the file is missing so the card never shows a broken-image
// icon.
function IdentityVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative h-full" style={{ aspectRatio: "336 / 360" }}>
        <div
          className="absolute overflow-hidden rounded-full bg-[#0E1A33]"
          style={{
            left: "50%",
            top: "36.1%",
            transform: "translate(-50%, -50%)",
            width: "47.6%",
            aspectRatio: "1 / 1",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- handoff portrait */}
          <img
            src="/identity-avatar.png"
            alt=""
            className="block h-full w-full object-cover"
            style={{
              filter: "invert(1) sepia(1) saturate(7) hue-rotate(160deg) brightness(0.78)",
            }}
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG */}
        <img
          src="/handoff/identity.svg"
          alt=""
          className="absolute inset-0 block h-full w-full"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function CarouselCard({ name, slug }: { name: string; slug: string }) {
  const hasSvg = SVGS_LIVE.has(slug);

  return (
    <div
      // Theme-aware frosted-glass card. Light: a near-white frosted pane. Dark:
      // the canonical dark glass (surface-dark-glass + hairline white border),
      // matching every other surface on the page — the cyan/white handoff
      // illustrations read cleanly on it, so the hero no longer breaks dark-mode
      // cohesion with a stray light card.
      className="relative h-full w-full rounded-[24px] border border-white/50 bg-white/40 dark:border-white/[0.12] dark:bg-surface-dark-glass"
      style={GLASS_STYLE}
    >
      <div className="flex h-full flex-col p-8">
        <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {name}
        </h3>
        <div className="relative mt-4 flex flex-1 items-center justify-center">
          {hasSvg ? (
            slug === "identity" ? (
              <IdentityVisual />
            ) : HAS_DARK_SVG.has(slug) ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG */}
                <img
                  src={`/handoff/${slug}.svg`}
                  alt=""
                  className="block h-full w-full dark:hidden"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  decoding="async"
                />
                {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG (dark) */}
                <img
                  src={`/handoff/${slug}-dark.svg`}
                  alt=""
                  className="hidden h-full w-full dark:block"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  decoding="async"
                />
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- handoff SVG
              <img
                src={`/handoff/${slug}.svg`}
                alt=""
                className="block h-full w-full"
                style={{ objectFit: "contain" }}
                loading="lazy"
                decoding="async"
              />
            )
          ) : (
            <span className="font-body text-[13px] text-text-secondary dark:text-text-dark-secondary">
              [UI from Claude Design — {slug}.svg]
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
