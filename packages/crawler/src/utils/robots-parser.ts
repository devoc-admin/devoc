/**
 * Simple robots.txt parser
 * Parses and checks if URLs are allowed for crawling
 */

type RobotsRule = {
  path: string;
  allow: boolean;
};

export type RobotsRules = {
  rules: RobotsRule[];
  crawlDelay?: number;
  sitemaps: string[];
};

/**
 * Parse robots.txt content
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complex parsing logic
export function parseRobotsTxt(content: string): RobotsRules {
  const lines = content.split("\n").map((line) => line.trim());
  const rules: RobotsRule[] = [];
  const sitemaps: string[] = [];
  let crawlDelay: number | undefined;
  let currentUserAgent = "";
  let isRelevantSection = false;

  for (const line of lines) {
    // Skip empty lines and comments
    if (!line || line.startsWith("#")) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const directive = line.slice(0, colonIndex).trim().toLowerCase();
    const value = line.slice(colonIndex + 1).trim();

    if (directive === "user-agent") {
      currentUserAgent = value.toLowerCase();
      // Match our crawler or wildcard
      isRelevantSection =
        currentUserAgent === "*" ||
        currentUserAgent.includes("rgaa") ||
        currentUserAgent.includes("audit");
    } else if (isRelevantSection) {
      if (directive === "disallow" && value) {
        rules.push({ allow: false, path: value });
      } else if (directive === "allow" && value) {
        rules.push({ allow: true, path: value });
      } else if (directive === "crawl-delay") {
        const delay = Number.parseFloat(value);
        if (!Number.isNaN(delay)) {
          crawlDelay = delay * 1000; // Convert to milliseconds
        }
      }
    }

    // Sitemaps are global
    if (directive === "sitemap") {
      sitemaps.push(value);
    }
  }

  return { crawlDelay, rules, sitemaps };
}

/**
 * Check if a URL path is allowed by robots.txt rules
 * Rules are checked in order, with more specific rules taking precedence
 */
export function isPathAllowed(path: string, rules: RobotsRule[]): boolean {
  // No rules means everything is allowed
  if (rules.length === 0) return true;

  // Sort rules by specificity (longer paths first)
  const sortedRules = [...rules].sort((a, b) => b.path.length - a.path.length);

  // Find the first matching rule
  for (const rule of sortedRules) {
    if (pathMatches(path, rule.path)) {
      return rule.allow;
    }
  }

  // Default: allowed if no rule matches
  return true;
}

/**
 * Check if a path matches a robots.txt pattern
 * Supports * (wildcard) and $ (end anchor)
 */
function pathMatches(path: string, pattern: string): boolean {
  // Handle end anchor
  const hasEndAnchor = pattern.endsWith("$");
  const cleanPattern = hasEndAnchor ? pattern.slice(0, -1) : pattern;

  // Convert pattern to regex
  const regexPattern = cleanPattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&") // Escape special chars except *
    .replace(/\*/g, ".*"); // Convert * to .*

  const regex = new RegExp(`^${regexPattern}${hasEndAnchor ? "$" : ""}`, "i");

  return regex.test(path);
}

/**
 * Fetch and parse robots.txt for a given origin
 */
export async function fetchRobotsTxt(
  origin: string
): Promise<RobotsRules | null> {
  try {
    const robotsUrl = `${origin}/robots.txt`;
    const response = await fetch(robotsUrl, {
      headers: {
        "User-Agent": "RGAA-Audit-Crawler/1.0 (Accessibility Audit Tool)",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      // No robots.txt or error - allow everything
      return null;
    }

    const content = await response.text();
    return parseRobotsTxt(content);
  } catch {
    // Network error or timeout - allow everything
    return null;
  }
}
