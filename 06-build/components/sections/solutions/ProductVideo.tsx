"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Bump whenever a clip is re-rendered so browsers fetch the new bytes instead of
// a stale cached version (same filename, different content).
const ASSET_VERSION = "10";

// ── ProductVideo — a pre-rendered Remotion product clip, floating ─────────────
//
// Plays a pre-rendered Remotion sequence (public/<name>.{webm,mp4}) with a
// TRANSPARENT (alpha) background, so the UI floats directly on the page section —
// no card / frame (owner direction 2026-06-08). The alpha webm is listed first;
// the mp4 is an opaque fallback for the rare browser without webm-alpha. Autoplay
// is decided client-side in an effect so SSR markup is identical (no hydration
// mismatch) and prefers-reduced-motion users only ever see the (transparent PNG)
// poster (Rule 6).

export function ProductVideo({
  name,
  label,
  aspectClass = "aspect-[16/9]",
  sizeClass = "w-full",
  className,
}: {
  /** Base filename in /public (without extension): <name>.webm/.mp4/-poster.png */
  name: string;
  label: string;
  /** Aspect of the composition (e.g. "aspect-[1/2]" for a portrait phone clip). */
  aspectClass?: string;
  /** Sizing — defaults to full width (16:9 rows); portrait clips set a width. */
  sizeClass?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      return;
    }
    // Restart from the first frame each time the clip scrolls into view, so the
    // viewer always sees the sequence from the START (not whatever frame the loop
    // happened to be on). Belt-and-braces with the autoPlay attribute below.
    const play = () => {
      try {
        v.currentTime = 0;
      } catch {
        /* not ready yet — autoPlay handles it */
      }
      v.play().catch(() => {});
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={`/${name}-poster.png?v=${ASSET_VERSION}`}
      aria-label={label}
      className={`block object-contain ${sizeClass} ${aspectClass} ${className ?? ""}`}
    >
      <source src={`/${name}.webm?v=${ASSET_VERSION}`} type="video/webm" />
      <source src={`/${name}.mp4?v=${ASSET_VERSION}`} type="video/mp4" />
    </video>
  );
}
