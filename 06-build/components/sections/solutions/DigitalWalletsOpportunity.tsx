"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Wallet,
  ArrowLeftRight,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { GlassPanel } from "@/components/visuals/GlassPanel";
import { GlassAtmosphere } from "@/components/visuals/GlassAtmosphere";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── Digital Wallets §2 — The Opportunity ─────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §The
// Opportunity.
//
// OPPORTUNITY-LED, not pain-led — positive framing throughout. REWORKED (owner
// disliked the prior 50:50 + placeholder + flat 2×2 sub-grid): now a confident
// CENTRED editorial intro (headline + body), then the four "What Customers
// Expect" rendered as GLASS cards floating on a contained GlassAtmosphere field
// (design-system.md §8.1 — glass only over a rich field), each with a navy→cyan
// gradient icon chip. The placeholder is dropped — no illustration needed; the
// glass-on-atmosphere quartet is the premium moment. The cards reveal in
// sequence on scroll-into-view and lift on hover. No eyebrow — the headline
// leads. Light.
//
// THIS IS THE PAGE'S SINGLE LUMINOUS-GLASS CARD SECTION (the marquee). Every
// other section uses a NON-card archetype: §3 FeatureMatrix, §4 HorizontalRow,
// §5 EditorialSplit, §6 StatBand, §7 the owner-locked dark deployment. The
// centred glass quartet is therefore the one card moment, not a repeated motif.

const COPY = {
  headline: "The wallet is becoming the primary financial relationship.",
  body: "For millions of customers, the wallet is where money arrives, where payments happen, and where financial services begin. Whether you're building a consumer wallet, a mobile money platform, or a digital government programme, the experience has become just as important as the infrastructure underneath it.",
  expectations: [
    {
      title: "Store value",
      body: "Hold balances securely and access funds instantly.",
      icon: Wallet,
    },
    {
      title: "Move money",
      body: "Transfer funds between customers, accounts, cards, wallets, and cash networks.",
      icon: ArrowLeftRight,
    },
    {
      title: "Spend anywhere",
      body: "Use wallet balances for payments, purchases, and everyday transactions.",
      icon: ShoppingBag,
    },
    {
      title: "Access financial services",
      body: "Connect customers to cards, rewards, lending, and additional services from the same experience.",
      icon: Sparkles,
    },
  ] satisfies { title: string; body: string; icon: LucideIcon }[],
} as const;

export function DigitalWalletsOpportunity() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();

  const chipGradient = `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
    visual.cyan,
    0.92,
  )})`;

  return (
    <Section bg="soft">
      {/* Confident centred editorial intro — the headline leads. */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.body}
        </p>
      </div>

      {/* "What Customers Expect" — glass cards floating on a contained
          GlassAtmosphere field (§8.1: glass only over a rich field). Each card
          reveals in sequence and lifts on hover. */}
      <div ref={ref} className="relative mt-12 sm:mt-14">
        {/* The rich field the glass floats on — contained to this rounded
            container, never a full-section wash (light-first, restrained). */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <GlassAtmosphere tone="azure" animated />
        </div>

        <div className="relative grid gap-4 p-4 sm:gap-5 sm:p-6 lg:grid-cols-4">
          {COPY.expectations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={
                reduced
                  ? undefined
                  : inView
                    ? { opacity: 1, y: 0 }
                    : undefined
              }
              transition={
                reduced
                  ? undefined
                  : {
                      duration: dur.slow,
                      ease: ease.out,
                      delay: 0.12 + i * 0.1,
                    }
              }
              className="group"
            >
              <GlassPanel
                padded={false}
                className="h-full p-6 transition-transform duration-200 ease-out group-hover:-translate-y-1 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 items-center justify-center rounded-md text-white shadow-[0_6px_18px_-6px_rgba(14,26,51,0.35)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 dark:shadow-[0_8px_22px_-8px_rgba(0,0,0,0.6)]"
                  style={{ background: chipGradient }}
                >
                  <item.icon className="size-5" strokeWidth={1.75} />
                </span>
                <p className="mt-5 font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {item.title}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {item.body}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
