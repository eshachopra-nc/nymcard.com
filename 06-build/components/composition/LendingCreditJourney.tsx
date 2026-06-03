"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section } from "@/components/sections/Section";
import {
  CardLinkedCreditUI,
  OriginationUI,
  DecisioningUI,
  DisbursementUI,
  CollectionsUI,
  RepaymentStructuresUI,
} from "@/components/sections/product-uis/lending";
import "./lending-credit-journey.css";

// ── Lending §4 — Credit journey ─────────────────────────────────────────────
//
// "Text + UI inside a card" treatment (the homepage ProductsBento pattern): a
// bordered, theme-aware card with the product-UI zone on top and the heading +
// description below. Six interactive surfaces — card-linked credit, origination,
// decisioning, disbursement, collections, repayment structures.
//
// MIGRATION (2026-06-02): each UI zone now hosts a surface composed on the
// canonical product-illustration kit (IllustrationField + IllustrationCard +
// atoms — design-system.md §8.1), so the literal surfaces share the hero's lit,
// dimensional world instead of the prior flat tonal dashboards. The six surfaces
// live in components/sections/product-uis/lending/*; each keeps its DISTINCT
// credit-lifecycle story (only the frame + atom vocabulary changed) and carries
// its own entrance + hover motion (reduced-motion safe). The card heading
// carries the stage title above; the surface fills the UI zone below.

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function useTileInView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return { ref, inView };
}

function Cell({
  eyebrow,
  heading,
  desc,
  children,
}: {
  eyebrow: string;
  heading: string;
  desc: string;
  children: ReactNode;
}) {
  const { ref, inView } = useTileInView();
  return (
    <motion.div
      ref={ref}
      className="cell"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* `group` so the kit surfaces' group-hover gestures fire on cell hover. */}
      <div className={cn("card group", inView && "in")}>
        {/* Eyebrow + headline + description ABOVE the UI. */}
        <div className="card-head">
          <p className="eyebrow">{eyebrow}</p>
          <h3>{heading}</h3>
          <p>{desc}</p>
        </div>
        {/* The product-illustration kit needs a positioned, sized ancestor; the
            `.ui` host provides it (relative, flex:1) and the kit fills it. */}
        <div className="ui ui--illus">{children}</div>
      </div>
    </motion.div>
  );
}

export function LendingCreditJourney({
  headline,
  body,
}: {
  headline: string;
  body?: string;
}) {
  return (
    <Section bg="white" reveal={false} ariaLabel="Credit journey">
      <div className="lcj">
        <div className="mb-12 max-w-[760px] sm:mb-14">
          {/* No eyebrow — headline leads (CLAUDE.md v1.5). */}
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {headline}
          </h2>
          {body && (
            <p className="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
              {body}
            </p>
          )}
        </div>

        <div className="bento">
          <Cell
            eyebrow="Revolving"
            heading="Card-linked credit"
            desc="Embed a revolving line in the card itself — draw, spend, and repay in one flow."
          >
            <CardLinkedCreditUI />
          </Cell>
          <Cell
            eyebrow="Onboarding"
            heading="Origination"
            desc="KYC, KYB, and digital onboarding, handled through one API."
          >
            <OriginationUI />
          </Cell>
          <Cell
            eyebrow="Underwriting"
            heading="Decisioning"
            desc="Score against bureaus, open banking, or your own model in real time."
          >
            <DecisioningUI />
          </Cell>
          <Cell
            eyebrow="Payout"
            heading="Disbursement"
            desc="Pay out to a card, account, or wallet in the same session."
          >
            <DisbursementUI />
          </Cell>
          <Cell
            eyebrow="Servicing"
            heading="Collections"
            desc="Automate billing cycles, repayments, and early delinquency intervention."
          >
            <CollectionsUI />
          </Cell>
          <Cell
            eyebrow="Structures"
            heading="Repayment structures"
            desc="Conventional interest, flat fee, or reducing balance — priced per program."
          >
            <RepaymentStructuresUI />
          </Cell>
        </div>
      </div>
    </Section>
  );
}
