import { Section } from "@/components/sections/Section";
import { SectionReveal } from "@/components/visuals";
import { GlassBed, GlassSurface, type GlassTone } from "@/components/sections/product-uis/glass";
import { TextImageRow } from "./TextImageRow";

// One renderer for all five capability visuals. The handoff SVGs are portrait
// (336×360); rendering them via HandoffVisual's `h-full` + objectFit-contain was
// unreliable in this context (the height chain through GlassSurface doesn't
// resolve — the asset either overflowed and clipped, or collapsed to zero). So
// we size deterministically instead: an EXPLICIT-height box locked to the SVG's
// 336/360 aspect, with the asset absolutely filling it — the full design always
// shows, never clipped. Composes the canonical glass kit (GlassBed atmosphere +
// frosted GlassSurface) so all five read as one material family. STATIC — no
// drift, so the data holds still (no shake). Identity layers the avatar photo
// behind the transparent `identity.svg` viewfinder so the scanner has a subject.
function HandoffScanVisual({
  tone,
  slug,
  withAvatar = false,
}: {
  tone: GlassTone;
  slug: string;
  withAvatar?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <GlassBed tone={tone}>
        <div className="absolute inset-0 p-4 sm:p-6">
          <GlassSurface className="h-full w-full">
            <div className="grid h-full w-full place-items-center p-2 sm:p-3">
              {/* Explicit height + the asset's own 336/360 aspect → the SVG fills
                  this box exactly (no contain letterbox, no clip). Identity keeps
                  its approved larger size; the data-dense assets sit a touch
                  smaller so the full design clears the panel. */}
              <div
                className={
                  withAvatar
                    ? "relative h-[260px] max-h-full sm:h-[320px]"
                    : "relative h-[265px] max-h-full sm:h-[330px]"
                }
                style={{ aspectRatio: "336 / 360" }}
              >
                {withAvatar && (
                  <div
                    className="absolute overflow-hidden rounded-full bg-brand-navy"
                    style={{ left: "50%", top: "36.1%", transform: "translate(-50%, -50%)", width: "47.6%", aspectRatio: "1 / 1" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- handoff portrait */}
                    <img
                      src="/identity-avatar.png"
                      alt=""
                      className="block h-full w-full object-cover"
                      style={{ filter: "invert(1) sepia(1) saturate(7) hue-rotate(160deg) brightness(0.78)" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG */}
                <img src={`/handoff/${slug}.svg`} alt="" className="absolute inset-0 block h-full w-full" loading="lazy" decoding="async" />
              </div>
            </div>
          </GlassSurface>
        </div>
      </GlassBed>
    </div>
  );
}

// ── Financial Crime §3 — Risk controls ──────────────────────────────────────
//
// "One layer, one customer record." Five distinct capability sections rendered
// as alternating editorial rows (TextImageRow, design-system §8.20) — Identity,
// Fraud monitoring, Risk management, AML & sanctions, 3D Secure. Each row's
// visual reuses the homepage hero-carousel handoff surface for that capability
// (owner direction — those are the canonical UIs), rendered on the glass kit via
// HandoffVisual. Identity / Fraud / Risk / 3D Secure map to the carousel slugs
// directly; AML & sanctions has no carousel card, so it uses the
// `financial-crime` handoff asset.
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
      slug: "identity",
      tone: "indigo" as GlassTone,
    },
    {
      key: "fraud",
      heading: "Fraud monitoring",
      body: "Real-time fraud decisioning on every authorization — approve, challenge, or block across card-present, card-not-present, account-takeover, and app-based fraud, with SHAP attribution behind every score.",
      slug: "fraud-monitoring",
      tone: "cyan" as GlassTone,
    },
    {
      key: "risk",
      heading: "Risk management",
      body: "A live Customer Risk Rating, low to very high, drives thresholds, review cadence, and monitoring intensity per customer — with one case system across fraud, AML, and compliance.",
      slug: "risk-management",
      tone: "slate" as GlassTone,
    },
    {
      key: "aml",
      heading: "AML & sanctions",
      body: "AML transaction monitoring against configurable typologies, plus sanctions and PEP screening on every transaction, beneficiary, and onboarding — with STR/SAR generation and filing under maker-checker.",
      slug: "financial-crime",
      tone: "violet" as GlassTone,
    },
    {
      key: "threeds",
      heading: "3D Secure",
      body: "Issuer-side ACS step-up authentication for card-not-present payments, with challenge decisions driven by the same enriched signals as fraud scoring.",
      slug: "acs-3ds",
      tone: "mist" as GlassTone,
    },
  ],
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
        {COPY.sections.map((s, i) => (
          <SectionReveal key={s.key}>
            <TextImageRow
              headline={s.heading}
              body={s.body}
              orientation={i % 2 === 0 ? "text-left" : "text-right"}
              visual={
                <div className="aspect-[4/3] w-full">
                  <HandoffScanVisual
                    tone={s.tone}
                    slug={s.slug}
                    withAvatar={s.key === "identity"}
                  />
                </div>
              }
              className="px-0 sm:px-0 lg:px-0"
            />
          </SectionReveal>
        ))}
      </div>
    </Section>
  );
}
