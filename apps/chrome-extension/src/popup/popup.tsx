import { StrictMode, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";

type AuditIssue = {
  type: "error" | "warning" | "info";
  message: string;
  element?: string;
  wcag?: string;
};

type AuditResult = {
  url: string;
  timestamp: string;
  issues: AuditIssue[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
  };
};

// This function runs in the page context via chrome.scripting.executeScript
function runAccessibilityAuditInPage(): AuditResult {
  type Issue = {
    type: "error" | "warning" | "info";
    message: string;
    element?: string;
    wcag?: string;
  };

  function getSelector(el: Element): string {
    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : "";
    const cls = el.className
      ? `.${el.className.toString().split(" ").filter(Boolean).join(".")}`
      : "";
    return `<${tag}${id}${cls}>`;
  }

  function checkLang(): Issue[] {
    if (!document.documentElement.getAttribute("lang")) {
      return [
        {
          message: "Page is missing lang attribute on <html>",
          type: "error",
          wcag: "WCAG 3.1.1",
        },
      ];
    }
    return [];
  }

  function checkImages(): Issue[] {
    const result: Issue[] = [];
    for (const img of document.querySelectorAll("img")) {
      if (!img.hasAttribute("alt")) {
        result.push({
          element: getSelector(img),
          message: "Image missing alt attribute",
          type: "error",
          wcag: "WCAG 1.1.1",
        });
      } else if (
        img.alt === "" &&
        !img.getAttribute("role")?.includes("presentation")
      ) {
        result.push({
          element: getSelector(img),
          message: "Image has empty alt. Ensure it's decorative.",
          type: "warning",
          wcag: "WCAG 1.1.1",
        });
      }
    }
    return result;
  }

  function checkFormLabels(): Issue[] {
    const result: Issue[] = [];
    const selector =
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea';
    for (const input of document.querySelectorAll(selector)) {
      const id = input.id;
      const hasLabel =
        (id && document.querySelector(`label[for="${id}"]`)) ||
        input.closest("label") ||
        input.getAttribute("aria-label") ||
        input.getAttribute("aria-labelledby");
      if (!hasLabel) {
        result.push({
          element: getSelector(input),
          message: "Form input missing associated label",
          type: "error",
          wcag: "WCAG 1.3.1",
        });
      }
    }
    return result;
  }

  function checkHeadings(): Issue[] {
    const result: Issue[] = [];
    let lastLevel = 0;
    let h1Count = 0;
    for (const h of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
      const level = Number.parseInt(h.tagName[1], 10);
      if (level === 1) h1Count++;
      if (lastLevel > 0 && level > lastLevel + 1) {
        result.push({
          element: getSelector(h),
          message: `Heading level skipped (h${lastLevel} to h${level})`,
          type: "warning",
          wcag: "WCAG 1.3.1",
        });
      }
      if (!h.textContent?.trim()) {
        result.push({
          element: getSelector(h),
          message: "Empty heading element",
          type: "error",
          wcag: "WCAG 1.3.1",
        });
      }
      lastLevel = level;
    }
    if (h1Count === 0) {
      result.push({
        message: "Page is missing an h1 heading",
        type: "warning",
        wcag: "WCAG 1.3.1",
      });
    }
    return result;
  }

  function checkLinks(): Issue[] {
    const result: Issue[] = [];
    const genericTexts = ["click here", "read more", "here", "more"];
    for (const link of document.querySelectorAll("a")) {
      const text = link.textContent?.trim() || "";
      const hasAccessibleName =
        text ||
        link.getAttribute("aria-label") ||
        link.querySelector("img[alt]");
      if (!hasAccessibleName) {
        result.push({
          element: getSelector(link),
          message: "Link has no accessible text",
          type: "error",
          wcag: "WCAG 2.4.4",
        });
      }
      if (genericTexts.includes(text.toLowerCase())) {
        result.push({
          element: getSelector(link),
          message: `Link text "${text}" is not descriptive`,
          type: "warning",
          wcag: "WCAG 2.4.4",
        });
      }
    }
    return result;
  }

  function checkButtons(): Issue[] {
    const result: Issue[] = [];
    for (const btn of document.querySelectorAll('button, [role="button"]')) {
      const hasName =
        btn.textContent?.trim() ||
        btn.getAttribute("aria-label") ||
        btn.querySelector("img[alt]") ||
        btn.getAttribute("title");
      if (!hasName) {
        result.push({
          element: getSelector(btn),
          message: "Button has no accessible name",
          type: "error",
          wcag: "WCAG 4.1.2",
        });
      }
    }
    return result;
  }

  function checkLandmarks(): Issue[] {
    const hasMain =
      document.querySelector("main") || document.querySelector('[role="main"]');
    if (!hasMain) {
      return [
        {
          message: "Page is missing a <main> landmark",
          type: "warning",
          wcag: "WCAG 1.3.1",
        },
      ];
    }
    return [];
  }

  const issues: Issue[] = [
    ...checkLang(),
    ...checkImages(),
    ...checkFormLabels(),
    ...checkHeadings(),
    ...checkLinks(),
    ...checkButtons(),
    ...checkLandmarks(),
  ];

  return {
    issues,
    summary: {
      errors: issues.filter((i) => i.type === "error").length,
      info: issues.filter((i) => i.type === "info").length,
      warnings: issues.filter((i) => i.type === "warning").length,
    },
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };
}

function Popup() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = useCallback(async () => {
    setIsAuditing(true);
    setError(null);
    setResult(null);

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!(tab.id && tab.url)) {
        throw new Error("No active tab found");
      }

      // Check if we can run on this page
      if (
        tab.url.startsWith("chrome://") ||
        tab.url.startsWith("chrome-extension://") ||
        tab.url.startsWith("about:")
      ) {
        throw new Error("Cannot audit browser internal pages");
      }

      // Execute the audit directly in the page context
      const results = await chrome.scripting.executeScript({
        func: runAccessibilityAuditInPage,
        target: { tabId: tab.id },
      });

      if (results[0]?.result) {
        setResult(results[0].result);
      } else {
        throw new Error("No audit results returned");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to run audit";
      setError(message);
    } finally {
      setIsAuditing(false);
    }
  }, []);

  return (
    <div className="flex min-h-[400px] flex-col bg-zinc-900 p-4 text-white">
      <header className="mb-4 flex items-center gap-3 border-zinc-700 border-b pb-4">
        <Logo />
        <div>
          <h1 className="font-semibold text-lg">Accessibility Auditor</h1>
          <p className="text-xs text-zinc-400">by Dev-OC</p>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <button
          className="mb-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 font-medium text-white transition-all hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isAuditing}
          onClick={runAudit}
          type="button"
        >
          {isAuditing ? "Auditing..." : "Run Accessibility Audit"}
        </button>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/50 p-3 text-red-200 text-sm">
            {error}
          </div>
        )}

        {result && <AuditResults result={result} />}

        {!(result || error || isAuditing) && (
          <div className="flex flex-1 flex-col items-center justify-center text-center text-zinc-500">
            <p className="text-sm">
              Click the button above to scan the current page for accessibility
              issues.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-4 border-zinc-700 border-t pt-3 text-center text-xs text-zinc-500">
        Checks for WCAG 2.1 compliance
      </footer>
    </div>
  );
}

function AuditResults({ result }: { result: AuditResult }) {
  const { summary, issues } = result;

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden">
      <div className="grid grid-cols-3 gap-2">
        <SummaryCard count={summary.errors} label="Errors" variant="error" />
        <SummaryCard
          count={summary.warnings}
          label="Warnings"
          variant="warning"
        />
        <SummaryCard count={summary.info} label="Info" variant="info" />
      </div>

      <div className="flex-1 overflow-y-auto rounded-lg bg-zinc-800 p-2">
        {issues.length === 0 ? (
          <p className="py-4 text-center text-green-400 text-sm">
            No accessibility issues found!
          </p>
        ) : (
          <ul className="space-y-2">
            {issues.map((issue) => (
              <IssueItem
                issue={issue}
                key={`${issue.type}-${issue.message}-${issue.element ?? ""}`}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  count,
  label,
  variant,
}: {
  count: number;
  label: string;
  variant: "error" | "warning" | "info";
}) {
  const colors = {
    error: "bg-red-900/50 text-red-300",
    info: "bg-blue-900/50 text-blue-300",
    warning: "bg-yellow-900/50 text-yellow-300",
  };

  return (
    <div className={`rounded-lg p-2 text-center ${colors[variant]}`}>
      <div className="font-bold text-2xl">{count}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

function IssueItem({ issue }: { issue: AuditIssue }) {
  const colors = {
    error: "border-red-500 bg-red-900/20",
    info: "border-blue-500 bg-blue-900/20",
    warning: "border-yellow-500 bg-yellow-900/20",
  };

  const icons = {
    error: "⛔",
    info: "ℹ️",
    warning: "⚠️",
  };

  return (
    <li className={`rounded border-l-2 p-2 ${colors[issue.type]}`}>
      <div className="flex items-start gap-2">
        <span>{icons[issue.type]}</span>
        <div className="flex-1 text-sm">
          <p className="text-zinc-200">{issue.message}</p>
          {issue.element && (
            <code className="mt-1 block truncate text-xs text-zinc-400">
              {issue.element}
            </code>
          )}
          {issue.wcag && (
            <span className="mt-1 inline-block rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-300">
              {issue.wcag}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

function Logo() {
  return (
    <svg
      aria-labelledby="logo-title"
      fill="none"
      height="32"
      role="img"
      viewBox="0 0 659 628"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="logo-title">Dev-OC Logo</title>
      <path
        d="M4.83044e-06 313.356C65 194.356 193.5 154.5 317.5 279.356L317.5 353.856C192.502 486.356 62.002 415.856 4.83044e-06 313.356Z"
        fill="url(#paint0_linear_816_36)"
      />
      <path
        d="M298.658 317.5C144.658 465.5 257.825 586.167 333.658 628C510.058 513.598 433.492 373.333 373.158 317.5C505.658 192.502 435.158 62.002 332.658 0C213.658 65 174.158 215 298.658 317.5Z"
        fill="url(#paint1_linear_816_36)"
      />
      <path
        d="M658.5 316.356C593.5 197.356 443.5 157.856 341 282.356L330 317.5C449 513 596.498 418.857 658.5 316.356Z"
        fill="url(#paint2_linear_816_36)"
      />
      <path
        d="M332.757 0C435.257 62.002 505.757 192.502 373.257 317.5H329.998C291 256.5 281.5 249 229 217C229.062 217.222 229.124 217.444 229.187 217.666C204.525 133.812 248.903 45.8029 332.757 0ZM257.497 274.271C272.463 294.65 289.007 309.444 299.498 317.5H298.757C282.154 303.831 268.468 289.316 257.497 274.271Z"
        fill="url(#paint3_linear_816_36)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_816_36"
          x1="116"
          x2="264.5"
          y1="283.5"
          y2="395.999"
        >
          <stop stopColor="#FFC731" />
          <stop offset="1" stopColor="#FF7711" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_816_36"
          x1="414"
          x2="296.5"
          y1="77"
          y2="554"
        >
          <stop stopColor="#FF9718" />
          <stop offset="0.475962" stopColor="#FF5709" />
          <stop offset="1" stopColor="#FF9718" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_816_36"
          x1="607"
          x2="383.5"
          y1="254.499"
          y2="361.5"
        >
          <stop stopColor="#FFC731" />
          <stop offset="1" stopColor="#FF7711" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint3_linear_816_36"
          x1="271.499"
          x2="415.999"
          y1="51.5"
          y2="264.5"
        >
          <stop stopColor="#FFC731" />
          <stop offset="1" stopColor="#FF7711" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Popup />
    </StrictMode>
  );
}
