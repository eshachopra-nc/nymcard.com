"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

// Section header (eyebrow + headline + sub-paragraph) sits above the
// asymmetric bento grid. The header copy is PLACEHOLDER — homepage.md
// does not provide an eyebrow, headline, or sub-paragraph for the
// Products section. Replace with locked Notion copy when available.
//
// Bento composition (row-major):
//   Row 1 — Card Issuing · Money Movement · Commercial Payments  (4/4/4) → real handoff SVGs
//   Row 2 — Embedded Lending                                     (12, full-width) → placeholder
//   Row 3 — Identity · Financial Crime                           (6/6)  → placeholder
//   Row 4 — Settlement · Reconciliation                          (6/6)  → placeholder
//
// Row-1 cards render the handoff SVG full-bleed (the SVG carries its own
// glass shell, headline, and inner product visual — no extra wrapper
// styling needed). Other rows stay as title + description placeholders
// until their SVGs land.
//
// Stripe-style motion on every card:
//   • lift y -6px + tiny scale (1.005) on hover, ease-out spring
//   • shadow expansion on hover
//   • a soft diagonal sheen sweeps across the card surface on hover
//   • whileInView stagger on entry (i * 0.06s delay)

type Product = {
  id: string;
  title: string;
  description: string;
  src?: string;            // when present, render the SVG full-bleed (Row 1 only for now)
  desktop: string;
  isWide?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "card-issuing",
    title: "Card Issuing",
    description:
      "Launch virtual and physical card programmes with native processing and real-time controls.",
    src: "/handoff/home/products-card-issuing.svg",
    desktop: "lg:col-span-4 lg:row-start-1",
  },
  {
    id: "money-movement",
    title: "Money Movement",
    description:
      "Move funds across borders and rails with integrated FX and real-time settlement.",
    src: "/handoff/home/products-oney-movement.svg",
    desktop: "lg:col-span-4 lg:row-start-1",
  },
  {
    id: "commercial-payments",
    title: "Commercial Payments",
    description:
      "Corporate cards, accounts, and spend controls on a single programmable platform.",
    src: "/handoff/home/products-commercial-payments.svg",
    desktop: "lg:col-span-4 lg:row-start-1",
  },
  {
    id: "embedded-lending",
    title: "Embedded Lending",
    description:
      "Deploy BNPL, revolving credit, and instalments directly into your user journey.",
    desktop: "lg:col-span-12 lg:row-start-2",
    isWide: true,
  },
  {
    id: "identity",
    title: "Identity",
    description:
      "Run KYC, KYB, and biometric verification natively in the onboarding flow.",
    desktop: "lg:col-span-6 lg:row-start-3",
  },
  {
    id: "financial-crime",
    title: "Financial Crime",
    description:
      "Automate fraud prevention, AML, and sanctions screening at the transaction level.",
    desktop: "lg:col-span-6 lg:row-start-3",
  },
  {
    id: "settlement",
    title: "Settlement",
    description:
      "Multi-currency liquidity and stablecoin payouts with millisecond finality.",
    desktop: "lg:col-span-6 lg:row-start-4",
  },
  {
    id: "reconciliation",
    title: "Reconciliation",
    description:
      "Automated matching across products, rails, and currencies, with exceptions flagged in real time.",
    desktop: "lg:col-span-6 lg:row-start-4",
  },
];

export function Products() {
  const reduced = useReducedMotion();

  return (
    <Section bg="white" ariaLabel="Products">
      {/* Section header */}
      <div className="max-w-[720px]">
        <p className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-brand-primary">
          Our products
        </p>
        <h2 className="mt-4 font-display font-bold text-text-primary leading-tight tracking-tight text-[clamp(2rem,4.5vw,3rem)]">
          {/* [Placeholder section headline — homepage.md does not provide one for the Products section.] */}
          One platform. Every payment product you ship.
        </h2>
        <p className="mt-5 font-body text-base sm:text-lg text-text-secondary leading-relaxed">
          {/* [Placeholder section sub-paragraph — homepage.md does not provide one for the Products section.] */}
          Card issuing, lending, money movement, settlement, identity, and reconciliation on a single programmable core.
        </p>
      </div>

      {/* Asymmetric bento grid */}
      <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 lg:items-start">
        {PRODUCTS.map((product, i) => {
          // SVG-driven cards are self-contained — no wrapper border/padding.
          // Placeholder cards still use the standard surface.
          const isSvg = Boolean(product.src);

          return (
            <motion.article
              key={product.id}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : "rest"}
              whileHover={reduced ? undefined : "hover"}
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                rest: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  boxShadow:
                    "0 1px 2px 0 rgba(14,26,51,0.04), 0 4px 12px -2px rgba(14,26,51,0.05)",
                  transition: { duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
                },
                hover: {
                  y: -6,
                  scale: 1.005,
                  boxShadow:
                    "0 8px 16px -4px rgba(14,26,51,0.06), 0 24px 48px -12px rgba(48,77,187,0.16)",
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={cn(
                "relative overflow-hidden rounded-[24px]",
                !isSvg && [
                  "bg-white border border-surface-border-subtle",
                  "p-8 lg:p-10",
                  "min-h-[280px] lg:min-h-[340px]",
                  product.isWide && "lg:min-h-[300px]",
                ],
                product.desktop,
              )}
            >
              {isSvg ? (
                <>
                  {/* <object> instead of <img>: SVG renders interactively, so
                      CSS :hover inside the SVG fires (icon hover state, etc).
                      Aspect-ratio wrapper preserves the 400×620 footprint
                      since <object> has no intrinsic dimensions. */}
                  <div className="block w-full" style={{ aspectRatio: "400 / 620" }}>
                    <object
                      type="image/svg+xml"
                      data={product.src}
                      aria-label={product.title}
                      className="block h-full w-full"
                    />
                  </div>
                  {/* Sheen sweep — soft diagonal highlight pass on hover */}
                  {!reduced && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[24px]"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.10) 55%, transparent 100%)",
                        mixBlendMode: "screen",
                      }}
                      variants={{
                        rest: { x: "-100%", opacity: 0 },
                        hover: { x: "150%", opacity: [0, 1, 1, 0] },
                      }}
                      transition={{ duration: 1.1, ease: "easeOut", times: [0, 0.15, 0.85, 1] }}
                    />
                  )}
                </>
              ) : (
                <>
                  <h3
                    className={cn(
                      "font-display font-semibold text-text-primary leading-snug",
                      product.isWide ? "text-2xl lg:text-[28px]" : "text-xl lg:text-2xl",
                    )}
                  >
                    {product.title}
                  </h3>
                  <p className="mt-3 font-body text-sm sm:text-base text-text-secondary leading-relaxed max-w-[520px]">
                    {product.description}
                  </p>
                </>
              )}
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
