import type { ReactNode } from "react";
import { Section } from "@/components/sections/Section";
import { SectionReveal } from "@/components/visuals";
import {
  IdentityCapability,
  FraudCapability,
  RiskCapability,
  AmlCapability,
  ThreeDSecureCapability,
} from "@/components/sections/product-uis/FinancialCrimeCapabilities";
import { TextImageRow } from "./TextImageRow";

// ── Financial Crime §3 — Risk controls ──────────────────────────────────────
//
// "One layer, one customer record." Five distinct capability sections rendered
// as alternating editorial rows (TextImageRow, design-system §8.20) — Identity,
// Fraud monitoring, Risk management, AML & sanctions, 3D Secure. Each row's
// visual is a bespoke CODED surface built on the canonical product-illustration
// kit (design-system.md §8.1 — IllustrationField + IllustrationCard + atoms),
// in components/sections/product-uis/FinancialCrimeCapabilities.tsx. These
// replace the earlier light-themed handoff SVGs (HandoffScanVisual, archived to
// versions/), which read poorly in dark mode; the coded surfaces are dark-mode
// safe by construction and each illustrates its own capability copy. The console
// below (§4, FinancialCrimeConsole) is unaffected.
//
// The lead-in keeps the "one layer / one customer record / one pipeline" thread
// so the five read as faces of a single layer, NOT five products (fact-file
// guardrail). Copy baked in (mirrors CardProgramsBento / LendingCreditJourney)
// and verbatim from ../02-copy/financial-crime-copy.md §3. Each row reveals on
// scroll-in via SectionReveal. Server component.

const COPY = {
  leadIn: {
    headline: "One layer, one customer record.",
    body: "Identity, fraud, risk, AML, and 3D Secure are capabilities of a single layer — every event flows through the same pipeline and is decided against the same model of who your customer is.",
  },
  sections: [
    {
      key: "identity",
      heading: "Identity",
      body: "KYC, KYB, and identity verification at onboarding, with ongoing monitoring and periodic reviews — on the same customer record the rest of the layer reads from.",
      Visual: IdentityCapability,
    },
    {
      key: "fraud",
      heading: "Fraud monitoring",
      body: "Real-time fraud decisioning on every authorization — approve, challenge, or block across card-present, card-not-present, account-takeover, and app-based fraud, with SHAP attribution behind every score.",
      Visual: FraudCapability,
    },
    {
      key: "risk",
      heading: "Risk management",
      body: "A live Customer Risk Rating, from low to very high, sets the alert thresholds, review frequency, and monitoring intensity for each customer — across one case system spanning fraud, AML, and compliance.",
      Visual: RiskCapability,
    },
    {
      key: "aml",
      heading: "AML & sanctions",
      body: "AML transaction monitoring against configurable typologies, plus sanctions and PEP screening on every transaction, beneficiary, and onboarding — with STR/SAR generation and filing under maker-checker.",
      Visual: AmlCapability,
    },
    {
      key: "threeds",
      heading: "3D Secure",
      body: "Issuer-side ACS step-up authentication for card-not-present payments, with challenge decisions driven by the same enriched signals as fraud scoring.",
      Visual: ThreeDSecureCapability,
    },
  ] as { key: string; heading: string; body: string; Visual: () => ReactNode }[],
} as const;

export function FinancialCrimeControls() {
  return (
    <Section bg="white" reveal={false} ariaLabel="Risk controls">
      <div className="mb-14 max-w-2xl">
        {/* No eyebrow — headline leads (CLAUDE.md v1.5). */}
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.leadIn.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.leadIn.body}
        </p>
      </div>

      <div className="flex flex-col gap-20 lg:gap-28">
        {COPY.sections.map((s, i) => {
          const Visual = s.Visual;
          return (
            <SectionReveal key={s.key}>
              <TextImageRow
                headline={s.heading}
                body={s.body}
                orientation={i % 2 === 0 ? "text-left" : "text-right"}
                visual={
                  <div className="group relative aspect-[4/3] w-full">
                    <Visual />
                  </div>
                }
                className="px-0 sm:px-0 lg:px-0"
              />
            </SectionReveal>
          );
        })}
      </div>
    </Section>
  );
}
