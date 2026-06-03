// ── Migration product-UI surfaces (/platform/migration) ──────────────────────
//
// The 14 bespoke, on-system surfaces that fill the migration page's UIPlaceholder
// slots. All composed from the shared `migration-kit` so they read as one family
// while each slot stays distinct. Cool palette, tokens only, reduced-motion safe.

export { MigrationHeroStrip } from "./MigrationHeroStrip"; // §1 slot 1
export { LegacyCostTimeline } from "./LegacyCostTimeline"; // §2 slot 2
export { ParallelRunMeter, AgentActivityFeed } from "./PillarMotifs"; // §3 slots 3–4
export { SchemaMappingPanel } from "./SchemaMappingPanel"; // §4 slot 5
export { ShadowProcessingView } from "./ShadowProcessingView"; // §4 slot 6
export { BatchSequencingBoard } from "./BatchSequencingBoard"; // §4 slot 7
export { MigrationControlConsole } from "./MigrationControlConsole"; // §4 slot 8
export { PortfolioMeter } from "./PortfolioMeter"; // §5 slot 9
export {
  RollbackDetail,
  BalanceMatchDetail,
  ApproveHoldDetail,
  AuditTrailDetail,
} from "./AssuranceDetails"; // §6 slots 10–13
export { NCoreOrbit } from "./NCoreOrbit"; // §7 slot 14 — the orbit payoff
export { StackBeforeAfter } from "./StackBeforeAfter"; // retired §7 before/after
