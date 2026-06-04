import { DeploymentSection } from "@/components/composition/LendingMotionSections";

// ── Banking as a Service §7 — Deployment ─────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §Deployment.
//
// DeploymentSection (LendingMotionSections) renders the three owner-locked DARK
// deployment cards — Cloud / On-soil / On-premise — exactly as on the nCore and
// lending pages; it is NOT modified here. The copy headline drives the section
// opener and the single-sentence body is passed VERBATIM (one sentence — not
// split across surfaces, so the copy reads exactly as written).

const COPY = {
  headline: "Deploy where your data has to live.",
  body: "Run on nCore in the cloud, on-soil, or on-premise, while connecting to the core banking platform you already operate.",
  models: [{ heading: "Cloud" }, { heading: "On-soil" }, { heading: "On-premise" }],
} as const;

export function BaaSDeployment() {
  return (
    <div className="dark relative bg-surface-dark-base">
      <DeploymentSection
        headline={COPY.headline}
        body={COPY.body}
        items={[...COPY.models]}
      />
    </div>
  );
}
