"use client";

import { cn } from "@/lib/utils";

// Reusable expand affordance for product cards.
//
// Lives as a React overlay positioned over the card's static SVG rather than
// embedded inside each SVG file. That keeps:
//   • the icon design consistent across cards (single source of truth)
//   • the hover state (rect → brand-primary, arrow → white) working in any
//     SVG rendering mode — even `<img>`, which doesn't fire :hover inside
//
// Positioning is percentage-based, anchored top-right of the card area,
// matching the prior in-SVG icon position (translate(324, 26) inside a
// 400×620 viewBox → 4.2% top, 10% right, 9% width).
export function CardExpandChip({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Expand card"
      className={cn(
        "group absolute z-10 inline-flex items-center justify-center",
        "rounded-[9px] border border-[#E5E5F0] bg-[#F4F4FB]",
        "transition-colors duration-150",
        "hover:border-brand-primary hover:bg-brand-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
        className,
      )}
      style={{ top: "4.2%", right: "10%", width: "9%", aspectRatio: "1" }}
    >
      <svg
        viewBox="-10 -10 20 20"
        aria-hidden="true"
        className="size-[60%] text-brand-primary transition-colors duration-150 group-hover:text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="-6" y1="6" x2="6" y2="-6" />
        <polyline points="2,-6 6,-6 6,-2" />
      </svg>
    </button>
  );
}
