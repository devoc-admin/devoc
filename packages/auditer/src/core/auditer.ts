import type { Page } from "playwright";
import {
  runCriterion1_1,
  runCriterion1_2,
  runCriterion1_3,
  runCriterion1_4,
  runCriterion1_5,
  runCriterion1_6,
  runCriterion1_7,
  runCriterion1_8,
  runCriterion1_9,
} from "../criteria/images";
import type {
  AuditConfig,
  CriterionResult,
  CriterionRunner,
  PageAuditResult,
  TestStatus,
  ThemeResult,
} from "../types";

// Theme definitions with their criterion runners
const THEME_RUNNERS: Record<
  number,
  {
    name: string;
    criteria: Record<string, CriterionRunner>;
  }
> = {
  1: {
    criteria: {
      "1.1": runCriterion1_1,
      "1.2": runCriterion1_2,
      "1.3": runCriterion1_3,
      "1.4": runCriterion1_4,
      "1.5": runCriterion1_5,
      "1.6": runCriterion1_6,
      "1.7": runCriterion1_7,
      "1.8": runCriterion1_8,
      "1.9": runCriterion1_9,
    },
    name: "Images",
  },
};

const DEFAULT_CONFIG: AuditConfig = {
  criteria: undefined,
  includeManualTests: true,
  maxElementsPerTest: 100,
  themes: [1],
  timeout: 30_000,
};

/**
 * Main RGAA Auditer class
 * Runs accessibility audits following RGAA methodology
 */
export class RgaaAuditer {
  private readonly config: AuditConfig;

  constructor(config: Partial<AuditConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Run accessibility audit on a page
   */
  async audit(page: Page): Promise<PageAuditResult> {
    const url = page.url();
    const auditedAt = new Date().toISOString();
    const themes: ThemeResult[] = [];

    // Get themes to audit
    const themesToAudit = this.config.themes ?? [1];

    for (const themeNumber of themesToAudit) {
      const themeConfig = THEME_RUNNERS[themeNumber];
      if (!themeConfig) {
        console.warn(`Theme ${themeNumber} not implemented, skipping`);
        continue;
      }

      const themeResult = await this.auditTheme({
        config: this.config,
        page,
        themeName: themeConfig.name,
        themeNumber,
        themeRunners: themeConfig.criteria,
      });

      themes.push(themeResult);
    }

    // Aggregate results
    const totalCriteria = themes.reduce((sum, t) => sum + t.totalCriteria, 0);
    const passedCriteria = themes.reduce((sum, t) => sum + t.passedCriteria, 0);
    const failedCriteria = themes.reduce((sum, t) => sum + t.failedCriteria, 0);
    const reviewCriteria = themes.reduce((sum, t) => sum + t.reviewCriteria, 0);
    const notApplicableCriteria = themes.reduce(
      (sum, t) => sum + t.notApplicableCriteria,
      0
    );

    // Calculate automatic score (only for criteria that are fully testable)
    const applicableCriteria = passedCriteria + failedCriteria;
    const automaticScore =
      applicableCriteria > 0
        ? Math.round((passedCriteria / applicableCriteria) * 100)
        : null;

    return {
      auditedAt,
      automaticScore,
      failedCriteria,
      notApplicableCriteria,
      passedCriteria,
      reviewCriteria,
      themes,
      totalCriteria,
      url,
    };
  }

  /**
   * Audit a single theme
   */
  private async auditTheme({
    page,
    themeNumber,
    themeName,
    themeRunners,
    config,
  }: {
    page: Page;
    themeNumber: number;
    themeName: string;
    themeRunners: Record<string, CriterionRunner>;
    config: AuditConfig;
  }): Promise<ThemeResult> {
    const criteria: CriterionResult[] = [];

    // Get criteria to run (filter if specific criteria requested)
    const criteriaToRun = Object.entries(themeRunners).filter(([number]) => {
      if (!config.criteria || config.criteria.length === 0) {
        return true;
      }
      return config.criteria.includes(number);
    });

    // Run each criterion
    for (const [, runner] of criteriaToRun) {
      try {
        const result = await runner({ config, page });

        // Skip manual tests if configured
        if (result.testability === "manual" && !config.includeManualTests) {
          continue;
        }

        criteria.push(result);
      } catch (error) {
        console.error("Error running criterion:", error);
      }
    }

    // Aggregate theme results
    const totalCriteria = criteria.length;
    const passedCriteria = criteria.filter(
      (c) => c.overallStatus === "passed"
    ).length;
    const failedCriteria = criteria.filter(
      (c) => c.overallStatus === "failed"
    ).length;
    const reviewCriteria = criteria.filter(
      (c) => c.overallStatus === "needs_review"
    ).length;
    const notApplicableCriteria = criteria.filter(
      (c) => c.overallStatus === "not_applicable"
    ).length;

    return {
      criteria,
      failedCriteria,
      notApplicableCriteria,
      passedCriteria,
      reviewCriteria,
      themeName,
      themeNumber,
      totalCriteria,
    };
  }
}

/**
 * Compute overall status from a list of test statuses
 * Rules:
 * - If any test failed → failed
 * - If any test needs_review → needs_review
 * - If all tests passed → passed
 * - If all tests not_applicable → not_applicable
 * - If any test has error → error
 */
export function computeOverallStatus(statuses: TestStatus[]): TestStatus {
  if (statuses.length === 0) {
    return "not_applicable";
  }

  if (statuses.some((s) => s === "error")) {
    return "error";
  }

  if (statuses.some((s) => s === "failed")) {
    return "failed";
  }

  if (statuses.some((s) => s === "needs_review")) {
    return "needs_review";
  }

  if (statuses.every((s) => s === "not_applicable")) {
    return "not_applicable";
  }

  if (statuses.every((s) => s === "passed" || s === "not_applicable")) {
    return "passed";
  }

  return "needs_review";
}
