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
//                   of Visa and Mastercard · PCI DSS compliant · ISO 27001".
//   - `background`— surface variant — `white` (default), `soft` for rhythm,
//                   `dark` for end-of-page composition.
//
// Behaviour preserved from the v1 sections/TrustBar:
//   - 45s linear loop, two copies of the list translate -50% for seamless
//     repeat (design-system.md §9.4 logo-marquee row).
//   - prefers-reduced-motion → first 6 logos centred static.
//   - Edge fade gradients so the marquee dissolves into the surface.

// `boxed` flags square / emblem logos (icon-shaped rather than a wide wordmark):
// they render a little taller so their mark matches the visual weight of the
// wide wordmark logos.
export type ClientLogo = { src: string; name: string; boxed?: boolean };

// The live client logo wall (assets in /public/clients/) — banks first, then the
// other clients (owner direction). Rendered as a uniform monochrome silhouette
// (see LogoMark) so the mix of B&W SVGs and transparent colour PNGs reads as one
// calm band. EasyPaisa is awaiting a logo asset, so it's not yet in the list.
// Banks, in the owner's order. The colour-tile logos (Mawarid, NBB, easypaisa,
// IBL) are pre-processed into transparent art — backgrounds keyed out / padding
// trimmed — so they monochrome cleanly like the B&W set; Neo sits next to the
// banks. Still excluded: INC — its mark is white on a purple tile, so removing
// the tile leaves an invisible white logo; it needs a dark-on-transparent asset
// (and it's the "neo" brand, already shown via Neo).
const BANK_LOGOS: ClientLogo[] = [
  { src: "/clients/Mawarid.png", name: "Mawarid" },
  { src: "/clients/EDB.png", name: "EDB Bank" },
  { src: "/clients/Byblos.svg", name: "Byblos Bank" },
  { src: "/clients/FaisalIslamicBank.svg", name: "Faisal Islamic Bank" },
  { src: "/clients/Nasswallet.svg", name: "Nass Wallet" },
  { src: "/clients/SAB.svg", name: "SAB" },
  { src: "/clients/SNB.svg", name: "SNB" },
  { src: "/clients/IBL.png", name: "IBL Bank", boxed: true },
  { src: "/clients/HugoBank.svg", name: "HugoBank" },
  { src: "/clients/easypaisa.png", name: "EasyPaisa", boxed: true },
  { src: "/clients/IandC.svg", name: "I&C" },
  { src: "/clients/NBB.png", name: "NBB", boxed: true },
  { src: "/clients/Neo.svg", name: "Neo" },
];

const OTHER_LOGOS: ClientLogo[] = [
  { src: "/clients/Alaan.svg", name: "Alaan" },
  { src: "/clients/Pemo.svg", name: "Pemo" },
  { src: "/clients/Qashio.svg", name: "Qashio" },
  { src: "/clients/Xpence.svg", name: "Xpence" },
  { src: "/clients/Pluto.svg", name: "Pluto" },
  { src: "/clients/Chargeup.svg", name: "ChargeUp" },
  { src: "/clients/Sav.svg", name: "Sav" },
  { src: "/clients/Edfundo.svg", name: "Edfundo" },
  { src: "/clients/Zywa.svg", name: "Zywa" },
  { src: "/clients/Paytabs.svg", name: "PayTabs" },
  { src: "/clients/Negabty.svg", name: "Negabty" },
  { src: "/clients/Rise.svg", name: "Rise" },
];

const DEFAULT_LOGOS: ClientLogo[] = [...BANK_LOGOS, ...OTHER_LOGOS];

type TrustBarBackground = "white" | "soft" | "dark" | "transparent";

export type TrustBarProps = {
  /** The client logos to render. Defaults to the live 12-logo client wall. */
  logos?: ClientLogo[];
  /**
   * Optional single-line trust statement under the marquee. Accepts a string
   * (the legacy callsite pattern — plain copy with middot separators) or a
   * `ReactNode` so callers can compose the canonical phrase with inline SVG
   * logos via the `PrincipalMemberTrustLine` companion exported below.
   */
  trustLine?: string | ReactNode;
  /** Surface variant. Default `white`. */
  background?: TrustBarBackground;
  /**
   * Optional mask-image utility classes applied to the scrolling marquee only,
   * and only when motion is allowed. Used by the hero to occlude logos where the
   * kinetic ribbon is. Skipped under prefers-reduced-motion so the static
   * fallback logos are never masked away.
   */
  marqueeMask?: string;
  className?: string;
};

// A single client logo, rendered as a uniform monochrome silhouette so the mix
// of B&W SVGs and transparent colour PNGs reads as one calm band: dark grey on
// the light bar (`brightness(0)` collapses any source to black, softened by
// opacity), light grey on the dark bar (`brightness(0) invert` to white,
// softened). One fixed height + auto width gives every logo the same visual
// size. Hover lifts to full.
function LogoMark({ logo }: { logo: ClientLogo }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- client logo, sized inline
    <img
      src={logo.src}
      alt={logo.name}
      className={cn(
        "w-auto shrink-0 select-none object-contain transition-opacity duration-200",
        // Square / emblem logos render taller so their mark matches the visual
        // weight of the wide wordmark logos.
        logo.boxed ? "h-12" : "h-9",
        "opacity-70 [filter:brightness(0)] hover:opacity-100",
        "dark:opacity-65 dark:[filter:brightness(0)_invert(1)] dark:hover:opacity-100",
      )}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

// Surface tokens per variant — kept here so the marquee and trust line stay
// visually consistent. Edge fades derive from the `from-…` token of each.
// `white` and `soft` are theme-aware — they follow the page theme so the bar
// is never a bright band stranded in a dark page (the homepage/product/industry
// bug). `dark` is the forced-dark variant for end-of-page composition (it also
// adds `.dark` locally, so the `dark:` tokens below resolve there too).
const SURFACE: Record<
  TrustBarBackground,
  { bg: string; from: string; border: string }
> = {
  white: {
    bg: "bg-surface-white dark:bg-surface-dark-base",
    from: "from-surface-white dark:from-surface-dark-base",
    border: "border-surface-border-subtle/40 dark:border-surface-dark-border",
  },
  soft: {
    bg: "bg-surface-soft dark:bg-surface-dark-base",
    from: "from-surface-soft dark:from-surface-dark-base",
    border: "border-surface-border-subtle/40 dark:border-surface-dark-border",
  },
  dark: {
    bg: "bg-surface-dark-base",
    from: "from-surface-dark-base",
    border: "border-surface-dark-border",
  },
  // Embedded variant — no surface, no border. Used inside the hero so the
  // marquee floats directly on the kinetic-ribbon background. Edge fades are
  // disabled (from-transparent); the caller supplies a mask via className so
  // the logos read only where the ribbon is not.
  transparent: {
    bg: "",
    from: "from-transparent",
    border: "border-transparent",
  },
};

export function TrustBar({
  logos = DEFAULT_LOGOS,
  trustLine,
  background = "white",
  marqueeMask,
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
        // overflow-hidden clips the marquee to the viewport — without it the
        // duplicated logo row (wider than a phone) forces horizontal page
        // overflow on narrow screens.
        "relative overflow-hidden border-y",
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

          <div
            className={cn(
              "flex items-center",
              trustLine ? "h-12 lg:h-14" : "h-full",
              // Ribbon-occlusion mask — marquee only, motion only (so the
              // reduced-motion static logos are never masked out).
              !reduced && marqueeMask,
            )}
          >
            {reduced ? (
              // Reduced motion: first 6 logos, static, centred.
              <div className="flex h-full w-full items-center justify-center gap-x-12">
                {logos.slice(0, 6).map((logo) => (
                  <LogoMark key={logo.name} logo={logo} />
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
                  <LogoMark key={`${logo.name}-${i}`} logo={logo} />
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
            // Theme-aware, matching the now-theme-aware surface.
            "text-text-muted dark:text-text-dark-secondary",
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
// The canonical phrase with real logo marks inline:
//   "Principal member of [Visa] and [Mastercard] · [PCI DSS] · [ISO/IEC 27001]"
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
//   • PCI DSS (public/pcidss.png, real brand mark) and ISO/IEC 27001:2022
//     (public/logos/iso-27001.svg, a generic blue seal) are wrapped in white
//     chips so they read on both the light and dark surfaces.

export function PrincipalMemberTrustLine() {
  // Logo classes — inline, baseline-aligned (`align-middle`), small enough to
  // sit inside the body-sm line height without pushing the line apart. The
  // Visa wordmark is broader than the others so it gets a slightly larger
  // height to read at the same visual weight.
  const visaCls = "h-[14px] w-auto align-middle";
  const mastercardCls = "inline-block h-[18px] w-auto align-middle";
  // The cert marks sit in white chips so they read on both the light and the
  // dark navy surface (the boxed treatment matches the original design intent):
  //   • PCI DSS — the real brand mark (public/pcidss.png), full-colour on white.
  //   • ISO/IEC 27001:2022 — a generic blue certification seal in ISO blue
  //     (#0054A8), authored as a vector at public/logos/iso-27001.svg to read as
  //     a sibling to the existing ISO 9001 seal style. NOTE: the legitimate mark
  //     is the issuing certification body's logo (BSI/TÜV/etc., in the cert
  //     pack) — swap this generic seal for that asset when available.
  const badgeChipCls =
    "inline-flex items-center rounded-md border border-surface-border-subtle bg-surface-white px-1.5 py-[3px] align-middle";

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <span>Principal member of</span>
      {/* Visa is theme-reactive — navy wordmark on light, white on dark. */}
      <img src="/logos/visa-full.svg" alt="Visa" className={cn(visaCls, "inline-block dark:hidden")} loading="lazy" decoding="async" />
      <img src="/logos/visa-white.svg" alt="" aria-hidden="true" className={cn(visaCls, "hidden dark:inline-block")} loading="lazy" decoding="async" />
      <span>and</span>
      <img
        src="/logos/mastercard.svg"
        alt="Mastercard"
        className={mastercardCls}
        loading="lazy"
        decoding="async"
      />
      <span aria-hidden="true">·</span>
      <span className={badgeChipCls}>
        <img
          src="/pcidss.png"
          alt="PCI DSS compliant"
          className="h-4 w-auto"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span aria-hidden="true">·</span>
      <span className={badgeChipCls}>
        <img
          src="/logos/iso-27001.svg"
          alt="ISO/IEC 27001:2022 certified"
          className="h-[18px] w-[18px]"
          loading="lazy"
          decoding="async"
        />
      </span>
    </span>
  );
}
