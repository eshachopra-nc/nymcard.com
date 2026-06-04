import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/sections/Section";

// ── Telecommunications §7 — Explore nCore (bridge band) ──────────────────────
//
// A simple bridge linking telecommunications to nCore. No platform diagrams, no
// repeated architecture visuals (copy visual direction) — a quiet text band with
// one link. Deliberately NOT the homepage nCore visual.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). The link label drops
// the source copy's trailing arrow glyph (the ArrowRight icon carries it) per the
// build spec.
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §7.

const COPY = {
  headline: "Everything running on one architecture.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating through a shared infrastructure layer.",
  link: { label: "Explore nCore", href: "/platform/ncore" },
} as const;

export function ExploreNCoreBridge() {
  return (
    <Section bg="soft" ariaLabel="Explore nCore">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.headline}
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            {COPY.description}
          </p>
        </div>

        <Link
          href={COPY.link.href}
          className={cnLink}
        >
          {COPY.link.label}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  );
}

const cnLink =
  "group inline-flex items-center gap-2 font-body text-base font-semibold " +
  "text-brand-primary hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-text-dark-link-hover " +
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 lg:justify-self-end";
