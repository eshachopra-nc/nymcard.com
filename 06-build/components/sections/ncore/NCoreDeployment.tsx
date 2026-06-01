import { DeploymentSection } from "@/components/composition/LendingMotionSections";
import { PrincipalMemberTrustLine } from "@/components/composition/TrustBar";

// ── nCore §5 Deployment ─────────────────────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → DEPLOYMENT.
//
// DeploymentSection (LendingMotionSections) renders the three dark deployment
// cards — Cloud / On-soil / On-premise — exactly as on the lending page; it is
// owner-locked and NOT modified here. The three models ARE the cards, so the
// separate "deployment chips" row from the copy is intentionally omitted (the
// cards carry it). Beneath the cards the canonical PrincipalMemberTrustLine
// renders the certifications line.
//
// PrincipalMemberTrustLine is composed in a matching dark band so the inline
// Visa/Mastercard logo lockups pick up their white-on-dark variants and read
// against the same surface as the cards.

const COPY = {
  heading: "Deploy nCore where your infrastructure needs it.",
  description:
    "nCore connects to your existing core banking system — no replacement required — and runs in the model your regulator and infrastructure call for.",
  models: [
    { heading: "Cloud" },
    { heading: "On-soil" },
    { heading: "On-premise" },
  ],
} as const;

export function NCoreDeployment() {
  return (
    <div className="dark relative bg-surface-dark-base">
      <DeploymentSection
        headline={COPY.heading}
        body={COPY.description}
        items={[...COPY.models]}
      />
      {/* Certifications line — PCI DSS Level 1 · ISO 27001 · Principal member
          of Visa · Principal member of Mastercard (rendered with inline logo
          lockups by PrincipalMemberTrustLine). Sits on the same dark band so
          the white-on-dark logo variants resolve. */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-20 lg:pb-28">
        <div className="border-t border-surface-dark-border pt-8 text-center font-body text-xs leading-relaxed tracking-wide text-text-dark-secondary sm:text-sm">
          <PrincipalMemberTrustLine />
        </div>
      </div>
    </div>
  );
}
