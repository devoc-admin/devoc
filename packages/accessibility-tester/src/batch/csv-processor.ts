import type {
  AuditPriority,
  FullAuditResult,
  ProspectRow,
  RgaaStatus,
} from "../core/types";

// Parse CSV line handling quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Escape CSV field
function escapeCSVField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function readProspectsCSV(
  filePath: string
): Promise<ProspectRow[]> {
  // biome-ignore lint/correctness/noUndeclaredVariables: Bun is a global in Bun runtime
  const file = Bun.file(filePath);
  const content = await file.text();
  const lines = content.split("\n").filter((l) => l.trim());

  if (lines.length < 2) return [];

  const headerLine = lines[0];
  if (!headerLine) return [];

  const headers = parseCSVLine(headerLine);
  const prospects: ProspectRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      if (header) {
        row[header] = values[j] || "";
      }
    }
    prospects.push(row as unknown as ProspectRow);
  }

  return prospects;
}

export async function writeProspectsCSV(
  filePath: string,
  prospects: ProspectRow[]
): Promise<void> {
  if (prospects.length === 0) return;

  const firstProspect = prospects[0];
  if (!firstProspect) return;

  const headers = Object.keys(firstProspect);
  const lines: string[] = [headers.join(",")];

  for (const prospect of prospects) {
    const values = headers.map((h) =>
      escapeCSVField(String((prospect as Record<string, unknown>)[h] || ""))
    );
    lines.push(values.join(","));
  }

  // biome-ignore lint/correctness/noUndeclaredVariables: Bun is a global in Bun runtime
  await Bun.write(filePath, lines.join("\n"));
}

export function updateProspectWithAudit(
  prospect: ProspectRow,
  audit: FullAuditResult
): ProspectRow {
  return {
    ...prospect,
    Date_audit: new Date().toISOString().split("T")[0] ?? "",
    Priorite: String(audit.priority),
    Problemes_RGAA: audit.problems.rgaa.slice(0, 5).join("; "),
    Problemes_RGPD: audit.problems.rgpd.join("; "),
    Score_RGAA: String(audit.rgaa.score),
    Score_RGPD: String(
      Math.round(
        100 -
          audit.rgpd.cookiesDetected.length * 5 -
          audit.rgpd.trackersBeforeConsent.length * 15 -
          (audit.rgpd.consentBannerDetected ? 0 : 20) -
          (audit.rgpd.httpsSecure ? 0 : 30)
      )
    ),
    Statut_RGAA: audit.rgaa.status,
    Technologies: formatTechnologies(audit.technology),
  };
}

function formatTechnologies(tech: FullAuditResult["technology"]): string {
  const parts: string[] = [];

  if (tech.cms) {
    parts.push(tech.cmsVersion ? `${tech.cms} ${tech.cmsVersion}` : tech.cms);
  }
  if (tech.framework) parts.push(tech.framework);
  if (tech.consentManager) parts.push(tech.consentManager);
  if (tech.analytics.length > 0) parts.push(...tech.analytics);
  if (tech.plugins.length > 0) parts.push(...tech.plugins.slice(0, 3));

  return parts.join("; ");
}

export function filterProspectsForAudit(
  prospects: ProspectRow[],
  options: {
    skipAudited?: boolean;
    priorityFilter?: AuditPriority[];
    onlyWithUrl?: boolean;
  } = {}
): ProspectRow[] {
  return prospects.filter((p) => {
    // Must have URL
    if (options.onlyWithUrl !== false && (!p.Site_web || p.Site_web === "")) {
      return false;
    }

    // Skip already audited if requested
    if (
      options.skipAudited &&
      p.Statut_RGAA &&
      p.Statut_RGAA !== "non_audite"
    ) {
      return false;
    }

    // Filter by priority if specified
    if (options.priorityFilter && options.priorityFilter.length > 0) {
      const currentPriority = Number.parseInt(p.Priorite, 10) as AuditPriority;
      if (!options.priorityFilter.includes(currentPriority)) {
        return false;
      }
    }

    return true;
  });
}

export function getAuditStats(prospects: ProspectRow[]): {
  total: number;
  withUrl: number;
  audited: number;
  pending: number;
  byStatus: Record<RgaaStatus, number>;
  byPriority: Record<AuditPriority, number>;
} {
  const stats = {
    audited: 0,
    byPriority: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<
      AuditPriority,
      number
    >,
    byStatus: {
      conforme: 0,
      erreur_audit: 0,
      non_audite: 0,
      non_conforme: 0,
      partiel: 0,
    } as Record<RgaaStatus, number>,
    pending: 0,
    total: prospects.length,
    withUrl: 0,
  };

  for (const p of prospects) {
    if (p.Site_web && p.Site_web !== "") {
      stats.withUrl++;
    }

    if (p.Statut_RGAA && p.Statut_RGAA !== "non_audite") {
      stats.audited++;
    } else {
      stats.pending++;
    }

    if (
      p.Statut_RGAA &&
      stats.byStatus[p.Statut_RGAA as RgaaStatus] !== undefined
    ) {
      stats.byStatus[p.Statut_RGAA as RgaaStatus]++;
    }

    const priority = Number.parseInt(p.Priorite, 10) as AuditPriority;
    if (priority >= 1 && priority <= 5) {
      stats.byPriority[priority]++;
    }
  }

  return stats;
}
