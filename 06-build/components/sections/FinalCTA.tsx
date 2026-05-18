"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Tag } from "lucide-react";
import { Section } from "./Section";

// Right-side cells — Stripe-style "See what you'll pay / Start building" pair.
// Homepage.md does not provide copy for these supporting cells, so they are
// marked [Placeholder] and listed in the report.
const RIGHT_CELLS = [
  {
    Icon: Tag,
    title: "[Placeholder pricing title]",
    body: "[Placeholder body — homepage.md does not include a pricing-cell description.]",
    linkText: "Pricing details",
    href: "#pricing",
  },
  {
    Icon: Code2,
    title: "[Placeholder integration title]",
    body: "[Placeholder body — homepage.md does not include an integration-cell description.]",
    linkText: "Integration options",
    href: "#docs",
  },
];

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <Section
      bg="soft"
      ariaLabel="Ready to launch"
      backgrounds={
        // Two corner ambient orbs — brand-purple top-left, accent-cyan bottom-right.
        // Same compositional pattern used in nCore and Solutions for cross-section
        // continuity. Echo of the hero ribbon's colour palette.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "radial-gradient(620px circle at 8% 12%, rgba(91, 79, 217, 0.10), transparent 70%)",
              "radial-gradient(560px circle at 92% 88%, rgba(34, 211, 238, 0.08), transparent 70%)",
            ].join(","),
          }}
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: main CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduced ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <h2 className="font-display font-bold text-text-primary leading-tight tracking-tight text-3xl sm:text-4xl lg:text-[48px]">
            Ready to launch?
          </h2>
          <p className="mt-6 font-body text-base sm:text-lg text-text-secondary leading-relaxed max-w-[480px]">
            Talk to the NymCard team about your product roadmap, regulatory requirements, and deployment model.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-brand-navy text-text-on-brand rounded-button px-7 py-2.5 font-body font-semibold text-base hover:opacity-90 transition-opacity"
            >
              Talk to sales
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href="#contact-secondary"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-surface-white border border-surface-border-subtle text-brand-navy rounded-button px-7 py-2.5 font-body font-semibold text-base hover:bg-surface-soft transition-colors"
            >
              Contact sales
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </motion.div>

        {/* Right: 2 cells side by side per stripe-cta.png; collapse on mobile. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
          {RIGHT_CELLS.map((cell, i) => (
            <motion.div
              key={cell.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={
                reduced
                  ? undefined
                  : { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <div className="inline-flex items-center justify-center size-10 rounded-md border border-surface-border-subtle bg-surface-white">
                <cell.Icon
                  aria-hidden="true"
                  className="size-5 text-brand-primary"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-4 font-display font-semibold text-text-primary text-lg">
                {cell.title}
              </h3>
              <p className="mt-2 font-body text-sm text-text-secondary leading-relaxed">
                {cell.body}
              </p>
              <a
                href={cell.href}
                className="mt-4 inline-flex items-center gap-1 font-body font-medium text-sm text-brand-primary hover:text-brand-primary-hover transition-colors"
              >
                {cell.linkText}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
