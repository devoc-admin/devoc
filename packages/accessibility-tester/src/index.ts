// biome-ignore-all lint/performance/noBarrelFile: intentional package exports
// Main exports for accessibility-tester

// Auditors
export { detectTechnology, runRgpdAudit } from "./auditors/rgpd";
// Batch
export {
  auditSingleUrl,
  batchAudit,
} from "./batch/batch-auditor";
export {
  filterProspectsForAudit,
  getAuditStats,
  readProspectsCSV,
  updateProspectWithAudit,
  writeProspectsCSV,
} from "./batch/csv-processor";
// Core
export { browserManager, withPage } from "./core/browser";
export * from "./core/types";
// Scoring
export {
  calculatePriority,
  calculateRgaaScore,
  calculateRgpdScore,
  generateScoreSummary,
  getRgaaStatusLabel,
} from "./scoring/rgaa-score";
