import type { AuditPriority, RgaaStatus, RgaaViolation } from "../core/types";

// RGAA 4.1 has 106 criteria total
const TOTAL_RGAA_CRITERIA = 106;

// Impact weights for score calculation
const IMPACT_WEIGHTS: Record<string, number> = {
  critical: 4,
  minor: 1,
  moderate: 2,
  serious: 3,
};

// RGAA topics and criteria counts
const _RGAA_TOPICS = [
  { criteria: 9, name: "Images", number: 1 },
  { criteria: 2, name: "Cadres", number: 2 },
  { criteria: 3, name: "Couleurs", number: 3 },
  { criteria: 13, name: "Multimedia", number: 4 },
  { criteria: 8, name: "Tableaux", number: 5 },
  { criteria: 2, name: "Liens", number: 6 },
  { criteria: 5, name: "Scripts", number: 7 },
  { criteria: 10, name: "Elements obligatoires", number: 8 },
  { criteria: 4, name: "Structuration information", number: 9 },
  { criteria: 14, name: "Presentation information", number: 10 },
  { criteria: 13, name: "Formulaires", number: 11 },
  { criteria: 11, name: "Navigation", number: 12 },
  { criteria: 12, name: "Consultation", number: 13 },
];

export function calculateRgaaScore(violations: RgaaViolation[]): {
  score: number;
  status: RgaaStatus;
  failedCriteria: number;
  passedCriteria: number;
  impactBreakdown: Record<string, number>;
} {
  if (violations.length === 0) {
    return {
      failedCriteria: 0,
      impactBreakdown: { critical: 0, minor: 0, moderate: 0, serious: 0 },
      passedCriteria: TOTAL_RGAA_CRITERIA,
      score: 100,
      status: "conforme",
    };
  }

  // Count unique failed criteria
  const failedCriteriaIds = new Set(violations.map((v) => v.criterionId));
  const failedCriteria = failedCriteriaIds.size;

  // Calculate weighted penalty
  let totalPenalty = 0;
  const impactBreakdown: Record<string, number> = {
    critical: 0,
    minor: 0,
    moderate: 0,
    serious: 0,
  };

  for (const violation of violations) {
    const weight = IMPACT_WEIGHTS[violation.impact] || 1;
    totalPenalty += weight;
    impactBreakdown[violation.impact] =
      (impactBreakdown[violation.impact] || 0) + 1;
  }

  // Normalize penalty (max penalty = all criteria with critical impact)
  const maxPenalty = TOTAL_RGAA_CRITERIA * (IMPACT_WEIGHTS.critical ?? 4);
  const normalizedPenalty = Math.min(totalPenalty / maxPenalty, 1);

  // Calculate score (0-100)
  const score = Math.max(0, Math.round((1 - normalizedPenalty) * 100));

  // Determine status
  let status: RgaaStatus;
  if (score >= 100) {
    status = "conforme";
  } else if (score >= 75) {
    status = "partiel";
  } else {
    status = "non_conforme";
  }

  return {
    failedCriteria,
    impactBreakdown,
    passedCriteria: TOTAL_RGAA_CRITERIA - failedCriteria,
    score,
    status,
  };
}

export function calculateRgpdScore(
  cookiesBeforeConsent: number,
  trackersBeforeConsent: number,
  bannerDetected: boolean,
  httpsSecure: boolean
): number {
  let score = 100;

  // HTTPS is mandatory (-30 if missing)
  if (!httpsSecure) score -= 30;

  // Cookies before consent
  if (cookiesBeforeConsent > 0) {
    score -= Math.min(cookiesBeforeConsent * 5, 25);
  }

  // Trackers before consent (severe)
  if (trackersBeforeConsent > 0) {
    score -= Math.min(trackersBeforeConsent * 15, 45);
  }

  // No consent banner
  if (!bannerDetected) score -= 20;

  return Math.max(0, score);
}

export function calculatePriority(
  rgaaScore: number,
  rgpdScore: number,
  population: number,
  hasViolationsCnil: boolean
): AuditPriority {
  // Priority 5: Critical CNIL violations or very low scores
  if (hasViolationsCnil || rgpdScore < 20 || rgaaScore < 20) {
    return 5;
  }

  // Priority 4: High potential (low scores + significant population)
  if ((rgaaScore < 40 || rgpdScore < 40) && population > 5000) {
    return 4;
  }

  // Priority 3: Medium potential
  if (rgaaScore < 60 || rgpdScore < 60) {
    return 3;
  }

  // Priority 2: Some issues but less urgent
  if (rgaaScore < 80 || rgpdScore < 80) {
    return 2;
  }

  // Priority 1: Low priority (mostly compliant)
  return 1;
}

export function generateScoreSummary(
  rgaaScore: number,
  rgpdScore: number,
  status: RgaaStatus,
  impactBreakdown: Record<string, number>
): string {
  const lines: string[] = [];

  // RGAA Summary
  lines.push(`Score RGAA: ${rgaaScore}% (${status})`);
  lines.push(`  - Critiques: ${impactBreakdown.critical || 0}`);
  lines.push(`  - Serieuses: ${impactBreakdown.serious || 0}`);
  lines.push(`  - Moderees: ${impactBreakdown.moderate || 0}`);
  lines.push(`  - Mineures: ${impactBreakdown.minor || 0}`);

  // RGPD Summary
  lines.push(`Score RGPD: ${rgpdScore}%`);

  // Risk assessment
  if (rgpdScore < 30) {
    lines.push("  ALERTE: Risque CNIL eleve");
  }

  return lines.join("\n");
}

export function getRgaaStatusLabel(status: RgaaStatus): string {
  const labels: Record<RgaaStatus, string> = {
    conforme: "Conforme",
    erreur_audit: "Erreur lors de l'audit",
    non_audite: "Non audite",
    non_conforme: "Non conforme",
    partiel: "Partiellement conforme",
  };
  return labels[status];
}
