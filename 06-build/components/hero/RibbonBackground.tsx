"use client";

import { useReducedMotion } from "framer-motion";

// Hero ribbon — locked artefact from /05-handoff/home/home-hero-ribbon.svg
// rendered as two stacked layers:
//
//   1. STATIC BASE — same ribbon image, no filter. Masked so it only appears
//      in the bottom ~15% of the hero. This keeps the bottom edge of the
//      hero a fixed, straight line (no ripple distortion at the boundary).
//   2. RIPPLED OVERLAY — same ribbon image with the SVG displacement filter
//      applied. Masked so it fades out before reaching the bottom, leaving
//      the static base to handle that area cleanly.
//
// The two masks cross-fade through a narrow band (75-90%) so the join between
// rippled and static reads as continuous ribbon content rather than a cut.
//
// Inside the filter: feTurbulence → feOffset (animated to make the noise
// pattern travel) → feDisplacementMap. The travelling noise makes the ripple
// hotspot drift along the ribbon over time instead of sitting in one corner.
//
// prefers-reduced-motion drops the SMIL animations — filter holds its starting
// frame, ribbon is effectively static.
export function RibbonBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden bg-surface-soft"
    >
      {/* Off-DOM SVG providing the displacement filter referenced via CSS */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id="ribbon-ripple"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.011"
              numOctaves="2"
              seed="4"
              result="noise"
            >
              {!reduced && (
                <animate
                  attributeName="baseFrequency"
                  values="0.006 0.011; 0.010 0.007; 0.007 0.013; 0.009 0.009; 0.006 0.011"
                  dur="30s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                />
              )}
            </feTurbulence>
            <feOffset in="noise" result="travelling-noise" dx="0" dy="0">
              {!reduced && (
                <>
                  <animate
                    attributeName="dx"
                    values="0; 40; -25; 30; 0"
                    dur="36s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                  />
                  <animate
                    attributeName="dy"
                    values="0; -30; 35; -15; 0"
                    dur="36s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                  />
                </>
              )}
            </feOffset>
            <feDisplacementMap
              in="SourceGraphic"
              in2="travelling-noise"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Static base — handles the bottom edge with a fixed, straight line */}
      {/* eslint-disable-next-line @next/next/no-img-element -- locked raster artefact */}
      <img
        src="/handoff/home/home-hero-ribbon.svg"
        alt=""
        className="absolute inset-0 size-full object-cover"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 75%, black 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 75%, black 90%)",
        }}
        loading="eager"
        decoding="async"
      />

      {/* Rippled overlay — fades out before reaching the bottom */}
      {/* eslint-disable-next-line @next/next/no-img-element -- locked raster artefact */}
      <img
        src="/handoff/home/home-hero-ribbon.svg"
        alt=""
        className="absolute inset-0 size-full object-cover"
        style={{
          filter: "url(#ribbon-ripple)",
          maskImage: "linear-gradient(to bottom, black 75%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 90%)",
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
