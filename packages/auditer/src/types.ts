import type { Page } from "playwright";

export type TestStatus =
  | "passed"
  | "failed"
  | "needs_review"
  | "not_applicable"
  | "error";

export type Testability = "automatic" | "semi_automatic" | "manual";

export type AuditedElement = {
  tagName: string;
  selector: string;
  outerHtml: string;
  attributes: Record<string, string | null>;
  textContent: string | null;
  src?: string;
  alt?: string | null;
  ariaLabel?: string | null;
  ariaLabelledby?: string | null;
  ariaDescribedby?: string | null;
  ariaHidden?: boolean;
  role?: string | null;
  title?: string | null;
  figcaptionText?: string | null;
  isInFigure?: boolean;
};

export type TestResult = {
  testNumber: string;
  testDescription: string;
  status: TestStatus;
  testability: Testability;
  passedElements: AuditedElement[];
  failedElements: AuditedElement[];
  reviewElements: AuditedElement[];
  totalElements: number;
  passedCount: number;
  failedCount: number;
  reviewCount: number;
  message?: string;
  error?: string;
};

export type CriterionResult = {
  criterionNumber: string;
  criterionTitle: string;
  wcagCriteria: string | null;
  wcagLevel: "A" | "AA" | "AAA" | null;
  testability: Testability;
  tests: TestResult[];
  overallStatus: TestStatus;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  reviewTests: number;
  notApplicableTests: number;
};

export type ThemeResult = {
  themeNumber: number;
  themeName: string;
  criteria: CriterionResult[];
  totalCriteria: number;
  passedCriteria: number;
  failedCriteria: number;
  reviewCriteria: number;
  notApplicableCriteria: number;
};

export type PageAuditResult = {
  url: string;
  auditedAt: string;
  themes: ThemeResult[];
  totalCriteria: number;
  passedCriteria: number;
  failedCriteria: number;
  reviewCriteria: number;
  notApplicableCriteria: number;
  automaticScore: number | null;
};

export type AuditConfig = {
  themes?: number[];
  criteria?: string[];
  includeManualTests?: boolean;
  maxElementsPerTest?: number;
  timeout?: number;
};

export type CriterionRunner = (params: {
  page: Page;
  config: AuditConfig;
}) => Promise<CriterionResult>;

// Serializable element type for page.evaluate (without browser-specific types)
export type SerializedElement = {
  tagName: string;
  selector: string;
  outerHtml: string;
  attributes: Record<string, string | null>;
  textContent: string | null;
  src?: string;
  alt?: string | null;
  ariaLabel?: string | null;
  ariaLabelledby?: string | null;
  ariaDescribedby?: string | null;
  ariaHidden?: boolean;
  role?: string | null;
  title?: string | null;
  figcaptionText?: string | null;
  isInFigure?: boolean;
};
