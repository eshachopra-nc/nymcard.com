"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";

// ── CardsUI ────────────────────────────────────────────────────────────────
//
// Homepage Products card → Cards. ONE kinetic ribbon system flowing through
// the whole cell: wispy + low-opacity outside the card (the "bed"), full
// intensity inside the card. Both layers share the exact same Lissajous
// transform — they read as a single motion.
//
// The card itself is LIGHT (cool white→cyan→indigo tonal gradient), so the
// ribbon's colours sit against a pale surface rather than a dark one — the
// "light variant" Stripe uses for its card-issuing card. Navy chrome.
//
// The container is padded at the bottom so that — inside CardGrid's
// `with-UI` body (text block above, UI zone below) — the card sits
// visually centred relative to the whole square cell, not just its UI
// allocation.

const RIBBON_CUTOUT = "/handoff/home/home-hero-ribbon-cutout.png";
const VISA_LOGO = "/logos/visa-full.svg";

export function CardsUI() {
  const reduced = useReducedMotion();
  const t = useTime();

  // Shared kinetic transform — same parameters as homepage RibbonKinetic.
  const x = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 26000) * 2 * Math.PI) * 10,
  );
  const y = useTransform(t, (v) =>
    reduced ? 0 : Math.cos((v / 21000) * 2 * Math.PI) * 6,
  );
  const baseScale = 1.05;
  const scale = useTransform(t, (v) =>
    reduced ? baseScale : baseScale + Math.sin((v / 14000) * 2 * Math.PI) * 0.01,
  );
  const rotate = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 33000) * 2 * Math.PI) * 0.4,
  );
  const cardScale = useTransform(scale, (s) => s * 1.35);

  return (
    // pb pushes the flex centre upward to compensate for the heading + body
    // text block that sits above this UI zone — so the card reads as centred
    // in the WHOLE square cell, not just in the UI zone.
    <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden pb-10 lg:pb-14">
      {/* Bed ribbon — full cell, low opacity. */}
      <motion.img
        src={RIBBON_CUTOUT}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-30"
        style={{ x, y, scale, rotate, transformOrigin: "center" }}
        loading="eager"
        decoding="async"
      />

      {/* The card — light surface, navy chrome, hero scale. Pops up on
          parent-card hover. */}
      <div className="relative z-10 w-[82%] max-w-[360px] aspect-[1.586/1] transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-brand-navy/10 shadow-[0_24px_50px_-18px_rgba(14,26,51,0.18),0_8px_18px_-8px_rgba(14,26,51,0.10)]"
          style={{
            background:
              "radial-gradient(122% 116% at 16% -8%, rgba(34,211,238,0.18), transparent 60%)," +
              "radial-gradient(130% 122% at 96% 110%, rgba(91,109,216,0.14), transparent 64%)," +
              "linear-gradient(#FFFFFF, #FFFFFF)",
          }}
        >
          {/* Inside-card ribbon — same source as the bed, full opacity,
              shared kinetic transform. Slightly darkened via multiply so
              colours register against the white tonal field. */}
          <motion.img
            src={RIBBON_CUTOUT}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            style={{
              x,
              y,
              scale: cardScale,
              rotate,
              transformOrigin: "center",
              opacity: 0.92,
            }}
            loading="eager"
            decoding="async"
          />

          {/* Cyan top edge — the brand cue. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(34,211,238,0.55) 50%, transparent)",
            }}
          />

          {/* Subtle inner sheen — diagonal soft highlight. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(122deg, transparent 34%, rgba(34,211,238,0.10) 50%, transparent 66%)",
            }}
          />

          {/* Chip — top-left. Navy stroke against the light surface. */}
          <span
            aria-hidden="true"
            className="absolute left-5 top-5 z-10 block h-7 w-10"
          >
            <svg viewBox="0 0 44 32" className="size-full" fill="none">
              <rect
                x="0.6"
                y="0.6"
                width="42.8"
                height="30.8"
                rx="5"
                fill="rgba(91,109,216,0.10)"
                stroke="rgba(14,26,51,0.3)"
              />
              <path
                d="M0 12 H44 M0 21 H44 M16 0 V32 M28 0 V32"
                stroke="rgba(14,26,51,0.3)"
                strokeWidth="0.8"
                strokeOpacity="0.55"
              />
            </svg>
          </span>

          {/* Visa logo — bottom-left, navy. */}
          <span
            role="img"
            aria-label="Visa"
            className="absolute bottom-5 left-5 z-10 block h-[18px] w-14"
            style={{
              backgroundColor: "#0E1A33",
              WebkitMaskImage: `url('${VISA_LOGO}')`,
              maskImage: `url('${VISA_LOGO}')`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}
