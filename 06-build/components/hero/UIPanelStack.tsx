"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Real handoff SVGs from /05-handoff/home/, copied to /public/handoff/home/.
// The Onboarding card is the wide-banner redesign (720×180) — sits as the
// full-width banner at the top of the stack on desktop.
// Each SVG carries its own glass styling; the React wrapper handles only
// positioning + stagger animation.
type Panel = {
  id: string;
  label: string;          // for alt text
  src: string;
  mobileHidden?: boolean;
  desktop: string;        // lg+ grid placement (and sm+ overrides where needed)
};

// Desktop (lg+) layout — three rows with three distinct width signatures:
//
//   Row 1:                          [———— Onboarding banner (col 4-12, 9 cols, right-aligned) ————]
//   Row 2:  [— Controls (col 1-5) —][———————— Visa    (col 6-12, 7 cols) ————————]
//   Row 3:  [———————— Routing  (col 1-7, 7 cols) ————————][— Monitoring (col 8-12) —]
//
// Three layers of asymmetry:
//   1. Row 1's banner is partial (9 of 12 cols), right-aligned — leaves the
//      left 3 cols visually open so the ribbon shows through.
//   2. Row 2 vs Row 3 use opposite 5/7 splits — narrow on left then narrow on right.
//   3. The wider card flips sides between rows (Visa right in row 2, Routing
//      left in row 3).
const PANELS: Panel[] = [
  {
    id: "onboarding",
    label: "Digital Onboarding",
    src: "/handoff/home/home-card-onboarding-wide.svg",
    // sm+: span both columns of the 2-col tablet grid so the 4:1 aspect reads
    // naturally as a banner instead of being letterboxed in half-width.
    desktop: "sm:col-span-2 lg:col-start-4 lg:col-span-9 lg:row-start-1",
  },
  {
    id: "controls",
    label: "Card Controls",
    src: "/handoff/home/home-card-controls.svg",
    mobileHidden: true,
    desktop: "lg:col-start-1 lg:col-span-5 lg:row-start-2",
  },
  {
    id: "visa",
    label: "Card Visualisation",
    src: "/handoff/home/home-card-visa.svg",
    desktop: "lg:col-start-6 lg:col-span-7 lg:row-start-2",
  },
  {
    id: "routing",
    label: "Transaction Routing",
    src: "/handoff/home/home-card-routing.svg",
    desktop: "lg:col-start-1 lg:col-span-7 lg:row-start-3",
  },
  {
    id: "monitoring",
    label: "Transaction Monitoring",
    src: "/handoff/home/home-card-monitoring.svg",
    mobileHidden: true,
    desktop: "lg:col-start-8 lg:col-span-5 lg:row-start-3",
  },
];

export function UIPanelStack() {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        // Below lg: flat responsive grid.
        "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
        // lg+: 12-col asymmetric grid; row heights driven by each card's
        // aspect at its allotted column span.
        "lg:grid-cols-12 lg:gap-3 lg:items-start",
      )}
    >
      {PANELS.map((panel, i) => (
        <motion.div
          key={panel.id}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            reduced
              ? undefined
              : { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(
            "flex items-start",
            panel.mobileHidden && "hidden md:flex",
            panel.desktop,
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG; no Next/Image benefit */}
          <img
            src={panel.src}
            alt={panel.label}
            className="w-full h-auto block"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      ))}
    </div>
  );
}
