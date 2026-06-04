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

  const Container = as;
  const Item = isList ? "li" : "div";

  if (reduced) {
    return (
      <Container className={className}>
        {items.map((child, i) => (
          <Item key={i} className={itemClassName}>
            {child}
          </Item>
        ))}
      </Container>
    );
  }

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

  return (
    <MotionContainer
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: step, delayChildren: 0.04 } },
      }}
    >
      {items.map((child, i) => (
        <MotionItem key={i} className={itemClassName} variants={itemVariant}>
          {child}
        </MotionItem>
      ))}
    </MotionContainer>
  );
}
