import { DeploymentSection } from "@/components/composition/LendingMotionSections";

// ── nCore §9 Deployment ─────────────────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §9.
//
// DeploymentSection (LendingMotionSections) renders the three dark deployment
// cards — Cloud / On-soil / On-premise (copy order) — exactly as on the lending
// page; it is owner-locked and NOT modified here. The supporting line from the
// copy ("Connects to your existing core banking platform. No replacement
// required.") is rendered beneath the cards within the same dark section.

const COPY = {
  heading: "Run nCore where your data has to live.",
  description:
    "Deploy the same platform in the model your regulator, your infrastructure, and your business require.",
  models: [
    { heading: "Cloud" },
    { heading: "On-soil" },
    { heading: "On-premise" },
  ],
  supportingLine:
    "Connects to your existing core banking platform. No replacement required.",
} as const;

export function NCoreDeployment() {
  return (
    <div className="dark relative bg-surface-dark-base">
      <DeploymentSection
        headline={COPY.heading}
        body={COPY.description}
        items={[...COPY.models]}
      />
      {/* Supporting line from the copy — pulled up out of DeploymentSection's
          deep bottom padding so it sits close to the cards (owner: too much gap). */}
      <div className="mx-auto -mt-16 w-full max-w-7xl px-4 pb-20 sm:-mt-20 sm:px-6 sm:pb-24 lg:-mt-24 lg:px-20 lg:pb-28">
        <p className="max-w-2xl font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
          {COPY.supportingLine}
        </p>
      </div>
    </div>
  );
}
