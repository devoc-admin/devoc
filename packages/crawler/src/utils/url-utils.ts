import type { CrawlConfig } from "../types";

export function shouldCrawlUrl({
  url,
  config,
}: {
  url: string;
  config: CrawlConfig;
}): boolean {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();

    // Extensions to skip (static resources)
    const skipExtensions = [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".svg",
      ".webp",
      ".css",
      ".js",
      ".woff",
      ".woff2",
      ".ttf",
      ".eot",
      ".zip",
      ".rar",
      ".tar",
      ".gz",
      ".mp3",
      ".mp4",
      ".avi",
      ".mov",
      ".webm",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
    ];

    if (skipExtensions.some((ext) => path.endsWith(ext))) {
      return false;
    }

    // Check excluded paths
    if (
      config.excludePaths?.some((pattern) =>
        path.includes(pattern.toLowerCase())
      )
    ) {
      return false;
    }

    // Check included paths (if specified)
    if (config.includePaths?.length) {
      return config.includePaths.some((pattern) =>
        path.includes(pattern.toLowerCase())
      );
    }

    return true;
  } catch {
    return false;
  }
}
