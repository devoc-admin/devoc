// Core Types for Accessibility Tester

export type RgaaStatus =
  | "conforme"
  | "partiel"
  | "non_conforme"
  | "non_audite"
  | "erreur_audit";

export type AuditPriority = 1 | 2 | 3 | 4 | 5;

export type ProspectStatus =
  | "A contacter"
  | "A rechercher"
  | "Contacte"
  | "RDV"
  | "Devis"
  | "Client";

export type CookieInfo = {
  name: string;
  domain: string;
  secure: boolean;
  httpOnly?: boolean;
  sameSite?: string;
};

export type StorageItem = {
  key: string;
  value?: string;
};

export type RgpdResult = {
  cookiesDetected: CookieInfo[];
  localStorageDetected: StorageItem[];
  sessionStorageDetected: StorageItem[];
  consentBannerDetected: boolean;
  consentBannerType: string | null;
  httpsSecure: boolean;
  trackersBeforeConsent: TrackerInfo[];
};

export type TrackerInfo = {
  name: string;
  type: "analytics" | "advertising" | "social" | "font" | "other";
  domain: string;
  violation: boolean;
};

export type TechnologyInfo = {
  cms: string | null;
  cmsVersion: string | null;
  framework: string | null;
  consentManager: string | null;
  analytics: string[];
  plugins: string[];
};

export type LighthouseScores = {
  accessibility: number | null;
  bestPractices: number | null;
  performance: number | null;
  seo: number | null;
};

export type RgaaViolation = {
  criterionId: string;
  criterionTitle: string;
  axeRuleId: string;
  impact: "minor" | "moderate" | "serious" | "critical";
  description: string;
  help: string;
  helpUrl: string;
  nodes: number;
  wcagTags: string[];
};

export type RgaaAuditResult = {
  url: string;
  score: number;
  status: RgaaStatus;
  totalCriteria: number;
  passedCriteria: number;
  failedCriteria: number;
  violations: RgaaViolation[];
  timestamp: string;
};

export type FullAuditResult = {
  url: string;
  timestamp: string;
  lighthouse: LighthouseScores;
  rgaa: RgaaAuditResult;
  rgpd: RgpdResult;
  technology: TechnologyInfo;
  priority: AuditPriority;
  problems: {
    rgaa: string[];
    rgpd: string[];
  };
  reportPath: string;
};

export type ProspectRow = {
  Nom: string;
  Type: string;
  Localisation: string;
  Code_postal: string;
  Nb_communes: string;
  Population: string;
  Site_web: string;
  Statut_RGAA: RgaaStatus;
  Score_RGAA: string;
  Score_RGPD: string;
  Priorite: string;
  Problemes_RGAA: string;
  Problemes_RGPD: string;
  Technologies: string;
  Email: string;
  Telephone: string;
  President_Maire: string;
  Adresse: string;
  Contact_DSI_DPO: string;
  Statut_prospection: ProspectStatus;
  Date_audit: string;
  Notes: string;
};

export type BatchAuditOptions = {
  csvPath: string;
  outputDir: string;
  concurrency: number;
  updateCsv: boolean;
  generateReports: boolean;
  skipAudited: boolean;
  priorityFilter?: AuditPriority[];
};

// RGAA Data Types
export type RgaaCriterion = {
  number: number;
  title: string;
  tests: Record<string, string[]>;
  references?: { wcag?: string[] }[];
};

export type RgaaTopic = {
  topic: string;
  number: number;
  criteria: { criterium: RgaaCriterion }[];
};

export type RgaaData = {
  topics: RgaaTopic[];
};
