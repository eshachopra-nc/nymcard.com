import { DeploymentSection } from "@/components/composition/LendingMotionSections";

// ── Digital Banking §8 — Deploy Where Your Data Has To Live ───────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.revised.md
// §"Deploy Where Your Data Has To Live".
//
// DeploymentSection (LendingMotionSections) renders the three owner-locked DARK
// deployment cards — Cloud / On-Soil / On-Premise — exactly as on the nCore and
// lending pages; the copy headline + single-sentence body drive the opener and
// each model's verbatim one-liner is passed through. The verbatim trust band
// closes the section beneath the cards on the same dark ground. This is the
// page's contrast beat (with §2); the two never sit adjacent. No eyebrow — the
// headline leads (CLAUDE.md v1.5).

const COPY = {
  headline: "Deploy where your data has to live.",
  body: "Run nCore in the cloud, on-soil, or on-premise, connected to the systems your bank already operates, and meet residency wherever your regulator requires it.",
  models: [
    { heading: "Cloud", description: "Multi-region and fully managed by NymCard." },
    {
      heading: "On-Soil",
      description: "Hosted by NymCard inside your country to meet in-country residency.",
    },
    {
      heading: "On-Premise",
      description: "Run inside your own data centre, fully self-hosted.",
    },
  ],
  trustBand:
    "PCI DSS compliant. ISO 27001 certified. Principal member of Visa. Principal member of Mastercard.",
} as const;

export function BaaSDeployment() {
  return (
    <div className="dark relative bg-surface-dark-base">
      <DeploymentSection
        headline={COPY.headline}
        body={COPY.body}
        items={[...COPY.models]}
      />

      {/* Trust band — closes the dark deploy beat on the same ground. */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-20 lg:pb-32">
        <div className="border-t border-surface-dark-border pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-dark-secondary sm:text-sm">
            {COPY.trustBand}
          </p>
        </div>
      </div>
    </div>
  );
}
