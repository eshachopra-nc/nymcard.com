// ── Lending product-page surfaces ──────────────────────────────────────────
//
// Bespoke, distinct, tokenized React + SVG surfaces for the Lending product
// page (/products/lending). Six §4 credit-journey surfaces (one per stage) plus
// the §5 decisioning visualization. Each is mapped to its locked copy and is
// visually distinct — no shared template, no repeated motif.
//
// Wiring is done by the orchestrator (ProductPageRenderer + capability-visual-
// map); these files only define the surfaces. See the wiring map in the
// delivery report.

export { CardLinkedCreditUI } from "./CardLinkedCreditUI";
export { OriginationUI } from "./OriginationUI";
export { DecisioningUI } from "./DecisioningUI";
export { DisbursementUI } from "./DisbursementUI";
export { CollectionsUI } from "./CollectionsUI";
export { RepaymentStructuresUI } from "./RepaymentStructuresUI";
export { DecisioningVisualization } from "./DecisioningVisualization";
