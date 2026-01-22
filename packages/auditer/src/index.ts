/**
 * @dev-oc/auditer
 *
 * RGAA accessibility auditer for automated and semi-automated testing
 */

export { computeOverallStatus, RgaaAuditer } from "./core/auditer";

export type {
  AuditConfig,
  AuditedElement,
  CriterionResult,
  CriterionRunner,
  PageAuditResult,
  SerializedElement,
  Testability,
  TestResult,
  TestStatus,
  ThemeResult,
} from "./types";
