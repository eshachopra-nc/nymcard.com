"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dur, ease } from "@/components/visuals";

// ── Archetype reveal helper ─────────────────────────────────────────────────
//
// A list-scoped staggered entrance for the section-archetype kit. Mirrors the
// SectionReveal motion language (a short editorial rise on a cinematic ease,
// reveals once, holds), but resolves each child on its own beat so a list /
// rail / row assembles row-by-row rather than as one block. Used by the
// archetypes for their item lists. prefers-reduced-motion renders everything
// static.
//
// This is the kit's ONLY motion primitive — every archetype reveals through
// it, so the whole kit shares one restrained beat. Hover signatures are pure
// CSS on the items themselves (group-hover), so they stay server-friendly.
//
// `as` sets the container tag; each child is wrapped in the matching item tag
// (`ul`/`ol` → `li`, `div` → `div`) so list semantics stay correct.

const TRAVEL = 16;

type StaggerListProps = {
  children: ReactNode;
  /** Element tag for the list container. */
  as?: "ul" | "ol" | "div";
  /** Seconds between each child resolving. */
  step?: number;
  className?: string;
  /** Class applied to each item wrapper. */
  itemClassName?: string;
};

export function StaggerList({
  children,
  as = "ul",
  step = 0.1,
  className,
  itemClassName,
}: StaggerListProps) {
  const reduced = useReducedMotion();
  const items = Children.toArray(children);
  const isList = as === "ul" || as === "ol";

  const MotionContainer =
    as === "ol" ? motion.ol : as === "div" ? motion.div : motion.ul;
  const MotionItem = isList ? motion.li : motion.div;

  const itemVariant = {
    hidden: { opacity: 0, y: TRAVEL },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: dur.deliberate, ease: ease.cinematic },
    },
  };

  // Reduced motion MUST render every item settled. `useReducedMotion()` is
  // false on the SERVER, so the SSR bakes `opacity:0` on the items. Swapping to
  // plain elements on the client does NOT clear it (React leaves the mismatched
  // SSR inline style unpatched). Keep the SAME `motion.*` elements and `animate`
  // straight to the shown state under reduced motion.
  const containerProps = reduced
    ? { initial: false as const, animate: "shown" as const }
    : {
        initial: "hidden" as const,
        whileInView: "shown" as const,
        viewport: { once: true, margin: "-10% 0px" } as const,
      };

  return (
    <MotionContainer
      className={className}
      {...containerProps}
      variants={{
        hidden: {},
        shown: reduced
          ? {}
          : { transition: { staggerChildren: step, delayChildren: 0.04 } },
      }}
    >
      {items.map((child, i) => (
        <MotionItem
          key={i}
          className={itemClassName}
          {...(reduced ? { initial: false as const, animate: "shown" as const } : {})}
          variants={itemVariant}
        >
          {child}
        </MotionItem>
      ))}
    </MotionContainer>
  );
}
