import { DeploymentSection } from "@/components/composition/LendingMotionSections";

// ── Banking-as-a-Service §7 — Deploy Where Your Data Has To Live ──────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"Deploy Where Your Data Has To Live".
//
// DeploymentSection (LendingMotionSections) renders the three owner-locked DARK
// deployment cards — Cloud / On-Soil / On-Premise — exactly as on the nCore and
// lending pages; it is NOT modified here (the copy's Visual Direction: "keep the
// current deployment section", dark background works well). The copy headline
// drives the section opener and the single-sentence body is passed VERBATIM.
// This is the page's only dark section (§6 and §8 stay light).

const COPY = {
  headline: "Choose the deployment model that fits your requirements.",
  body: "Run nCore in the cloud, on-soil, or on-premise while connecting to the banking infrastructure you already operate.",
  models: [{ heading: "Cloud" }, { heading: "On-Soil" }, { heading: "On-Premise" }],
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
