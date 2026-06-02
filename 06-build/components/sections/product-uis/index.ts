export { HandoffVisual, type BedTone } from "./HandoffVisual";
export { NamedSurface } from "./NamedSurface";
export { CardControlsDashboard } from "./CardControlsDashboard";
export { FinancialCrimeConsole } from "./FinancialCrimeConsole";
export { CorridorRoutingConsole } from "./CorridorRoutingConsole";
export { CardsUI } from "./CardsUI";
export { LendingUI } from "./LendingUI";
export { MoneyMovementUI } from "./MoneyMovementUI";
export { SettlementUI } from "./SettlementUI";
export { StablecoinSettlementCard } from "./StablecoinSettlementCard";
export { FinancialCrimeUI } from "./FinancialCrimeUI";
export { ReconciliationUI } from "./ReconciliationUI";
// nCore Capabilities — the two cross-cutting verticals (AI + Insights).
export { AIDecisioningUI } from "./AIDecisioningUI";
export { InsightsUI } from "./InsightsUI";

// ── Lending product-page surfaces (/products/lending §4 + §5) ───────────────
// Six distinct §4 credit-journey surfaces + the §5 decisioning visualization.
export {
  CardLinkedCreditUI,
  OriginationUI,
  DecisioningUI,
  DisbursementUI,
  CollectionsUI,
  RepaymentStructuresUI,
  DecisioningVisualization,
} from "./lending";
