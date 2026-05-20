"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { KineticRibbon } from "../visuals/KineticRibbon";

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <Section
      bg="white"
      ariaLabel="Ready to launch"
      backgrounds={<KineticRibbon intensity="peak" />}
    >
      <motion.div
        className="mx-auto max-w-[760px] text-center"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={reduced ? undefined : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display font-bold text-text-primary leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-[56px] dark:text-text-on-brand">
          Ready to launch?
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] font-body text-base sm:text-lg leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          Talk to the NymCard team about your product roadmap, regulatory requirements, and deployment model.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-button bg-brand-navy px-7 py-3 font-body font-semibold text-base text-text-on-brand hover:opacity-90 transition-opacity dark:bg-accent-cyan dark:text-brand-navy"
          >
            Talk to sales
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
