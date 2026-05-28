"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Trust bar — §8.25 ──────────────────────────────────────────────────────
//
// The thin marquee strip of client / network / certification logos that sits
// directly under the hero on the homepage and every product / industry page.
// Says "this is who NymCard already runs" without saying it in words.
//
// Promoted to a composition primitive in Phase 1 so the page-arc can compose
// it explicitly with prop-controlled copy:
//   - `logos`     — the marquee items. Defaults to the homepage placeholder
//                   set (12 entries) until the real grayscale logos land.
//   - `trustLine` — an optional single-line trust statement directly under the
//                   marquee. Used by the industry-page arc — "Principal member
//                   of Visa and Mastercard · PCI DSS Level 1 · ISO 27001".
//   - `background`— surface variant — `white` (default), `soft` for rhythm,
//                   `dark` for end-of-page composition.
//
// Behaviour preserved from the v1 sections/TrustBar:
//   - 45s linear loop, two copies of the list translate -50% for seamless
//     repeat (design-system.md §9.4 logo-marquee row).
//   - prefers-reduced-motion → first 6 logos centred static.
//   - Edge fade gradients so the marquee dissolves into the surface.

const DEFAULT_LOGOS = Array.from({ length: 12 }, (_, i) => `Logo ${i + 1}`);

type TrustBarBackground = "white" | "soft" | "dark";

export type TrustBarProps = {
  /** The logos to render. Defaults to the homepage 12-entry placeholder set. */
  logos?: string[];
  /**
   * Optional single-line trust statement under the marquee. Accepts a string
   * (the legacy callsite pattern — plain copy with middot separators) or a
   * `ReactNode` so callers can compose the canonical phrase with inline SVG
   * logos via the `PrincipalMemberTrustLine` companion exported below.
   */
  trustLine?: string | ReactNode;
  /** Surface variant. Default `white`. */
  background?: TrustBarBackground;
  className?: string;
};

function LogoMark({
  label,
  tone,
}: {
  label: string;
  tone: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "select-none whitespace-nowrap font-mono text-xs uppercase tracking-wider sm:text-sm",
        // `tone` is explicit per-instance so the logos read correctly whether
        // a light TrustBar is embedded in a dark page or vice versa. (Using
        // `dark:` here would key off the page's theme, not the bar's surface,
        // and white logos on a white bar disappear.)
        tone === "dark"
          ? "text-text-dark-secondary/70"
          : "text-text-muted/80",
      )}
    >
      [{label}]
    </span>
  );
}

// Surface tokens per variant — kept here so the marquee and trust line stay
// visually consistent. Edge fades derive from the `from-…` token of each.
const SURFACE: Record<
  TrustBarBackground,
  { bg: string; from: string; border: string }
> = {
  white: {
    bg: "bg-surface-white",
    from: "from-surface-white",
    border: "border-surface-border-subtle/40",
  },
  soft: {
    bg: "bg-surface-soft",
    from: "from-surface-soft",
    border: "border-surface-border-subtle/40",
  },
  dark: {
    bg: "bg-surface-dark-base",
    from: "from-surface-dark-base",
    border: "border-surface-dark-border",
  },
};

export function TrustBar({
  logos = DEFAULT_LOGOS,
  trustLine,
  background = "white",
  className,
}: TrustBarProps) {
  const reduced = useReducedMotion();
  const surf = SURFACE[background];
  // Pass `logos={[]}` to suppress the marquee entirely and render a
  // trust-line-only band — the right shape when there are no real partner
  // logos yet but a genuine certification/network line (e.g. the homepage
  // PrincipalMemberTrustLine) should carry the authority instead of
  // placeholder text.
  const showMarquee = logos.length > 0;

  return (
    <section
      aria-label="Trusted clients and certifications"
      className={cn(
        "relative border-y",
        surf.bg,
        surf.border,
        // The dark variant also forces .dark locally so any child text picks
        // up the dark-theme text tokens.
        background === "dark" && "dark",
        // Without a trust line the bar is a fixed-height strip (same as v1).
        // With one, it grows to accommodate the second row.
        trustLine ? "py-6" : "h-20 lg:h-24",
        className,
      )}
    >
      {showMarquee && (
        <div className={cn("relative", trustLine ? "" : "h-full")}>
          {/* Edge fade gradients — the marquee dissolves into the surface so
              the ends never read as cropped. */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r to-transparent",
              surf.from,
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l to-transparent",
              surf.from,
            )}
          />

          <div className={cn("flex items-center", trustLine ? "h-12 lg:h-14" : "h-full")}>
            {reduced ? (
              // Reduced motion: first 6 logos, static, centred.
              <div className="flex h-full w-full items-center justify-center gap-x-12">
                {logos.slice(0, 6).map((logo) => (
                  <LogoMark
                    key={logo}
                    label={logo}
                    tone={background === "dark" ? "dark" : "light"}
                  />
                ))}
              </div>
            ) : (
              // Marquee: duplicate the list and translate by -50% for seamless
              // loop. 45s linear cycle (§9.4 row "logo marquee").
              <motion.div
                className="flex shrink-0 items-center gap-x-12 px-6 sm:gap-x-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 45,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                {[...logos, ...logos].map((logo, i) => (
                  <LogoMark
                    key={`${logo}-${i}`}
                    label={logo}
                    tone={background === "dark" ? "dark" : "light"}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {trustLine && (
        <div
          className={cn(
            "px-6 text-center font-body text-xs leading-relaxed tracking-wide sm:text-sm",
            showMarquee && "mt-4",
            // Same explicit-tone pattern as LogoMark — keys off the bar's own
            // surface, not the page theme, so a light bar embedded in a dark
            // page (or vice versa) reads correctly.
            background === "dark" ? "text-text-dark-secondary" : "text-text-muted",
          )}
        >
          {trustLine}
        </div>
      )}
    </section>
  );
}

// ── PrincipalMemberTrustLine — canonical trust-line with inline logos ─────
//
// The canonical phrase with real SVG logo marks inline:
//   "Principal member of [Visa] and [Mastercard] · [PCI DSS Level 1] · [ISO 27001]"
//
// Used as the `trustLine` prop on TrustBar (industry-page arc, scale rhythm
// breaks). Composes the logo SVGs from `/public/logos/` at a small
// baseline-aligned inline size. Surface tone is explicit (`light` | `dark`)
// because TrustBar can't pass surface context to children via React context
// without coupling — callers pick the variant matching the bar's `background`.
//
// Asset notes:
//   • Visa is a coloured wordmark — two variants exist (`visa-full.svg` is
//     the navy original for light surfaces; `visa-white.svg` is the white
//     variant for dark surfaces).
//   • Mastercard uses the brand interlocking-circles mark — a single SVG
//     that reads correctly on both surfaces (the red/yellow/orange palette
//     is high-contrast against both white and navy).
//   • PCI DSS and ISO 27001 are pill-shaped wordmark badges authored as
//     `currentColor` SVGs so they inherit text tone — single asset, both
//     surfaces.

export function PrincipalMemberTrustLine({
  tone = "light",
}: {
  /** Surface tone — match the parent TrustBar's `background`. */
  tone?: "light" | "dark";
}) {
  // Visa needs the surface-specific variant; Mastercard, PCI DSS and ISO
  // 27001 are single-asset and work on both surfaces.
  const visaSrc = tone === "dark" ? "/logos/visa-white.svg" : "/logos/visa-full.svg";
  // Logo classes — inline, baseline-aligned (`align-middle`), small enough to
  // sit inside the body-sm line height without pushing the line apart. The
  // Visa wordmark is broader than the others so it gets a slightly larger
  // height to read at the same visual weight.
  const visaCls = "inline-block h-[14px] w-auto align-middle";
  const mastercardCls = "inline-block h-[18px] w-auto align-middle";
  // PCI / ISO badges inherit text colour via `currentColor` in the SVGs.
  const badgeCls = "inline-block h-[16px] w-auto align-middle";

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <span>Principal member of</span>
      <img src={visaSrc} alt="Visa" className={visaCls} loading="lazy" decoding="async" />
      <span>and</span>
      <img
        src="/logos/mastercard.svg"
        alt="Mastercard"
        className={mastercardCls}
        loading="lazy"
        decoding="async"
      />
      <span aria-hidden="true">·</span>
      <img
        src="/logos/pci-dss.svg"
        alt="PCI DSS Level 1"
        className={badgeCls}
        loading="lazy"
        decoding="async"
      />
      <span aria-hidden="true">·</span>
      <img
        src="/logos/iso-27001.svg"
        alt="ISO 27001 certified"
        className={badgeCls}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
