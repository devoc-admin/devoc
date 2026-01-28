"use client";
import {
  BarChart3Icon,
  CodeIcon,
  CookieIcon,
  LayoutTemplateIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useCrawlCardContext } from "../../crawl-card-context";

export function TechnologiesSection() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  const hasTech =
    crawl.primaryCms ||
    crawl.primaryFramework ||
    crawl.hostingProvider ||
    crawl.consentManager ||
    crawl.accessibilityTool ||
    crawl.usesDsfr ||
    (crawl.analyticsTools && crawl.analyticsTools.length > 0);

  if (!hasTech) return null;

  return (
    <div className="space-y-2 border-border border-t pt-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Technologies détectées ({crawl.detectedTechCount ?? 0})
      </h4>
      <div className="space-y-1">
        {/* 🖥️ CMS */}
        <TechItem
          icon={LayoutTemplateIcon}
          label="CMS"
          value={crawl.primaryCms ?? "—"}
        />
        {/* 🧩 Framework */}
        <TechItem
          icon={CodeIcon}
          label="Framework"
          value={crawl.primaryFramework ?? "—"}
        />
        {/* 🏢 Hébergeur */}
        <TechItem
          icon={ServerIcon}
          label="Hébergeur"
          value={crawl.hostingProvider ?? "—"}
        />
        {/* 🍪 Gestionnaire de consentement */}
        <TechItem
          icon={CookieIcon}
          label="Consentement"
          value={crawl.consentManager ?? "—"}
        />
        {/* ♿ Outil d'accessibilité */}
        <TechItem
          icon={ShieldCheckIcon}
          label="Accessibilité"
          value={crawl.accessibilityTool ?? "—"}
        />
        {/* 📊 Analytics */}
        <TechItem
          icon={BarChart3Icon}
          label="Analytics"
          value={
            crawl.analyticsTools && crawl.analyticsTools.length > 0
              ? crawl.analyticsTools.join(", ")
              : "—"
          }
        />
        {/* 🇫🇷 DSFR */}
        <TechItem
          icon={ShieldCheckIcon}
          label="DSFR"
          value={crawl.usesDsfr ? "Oui" : "Non"}
        />
      </div>
    </div>
  );
}

function TechItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-x-2 text-sm">
      <Icon className="shrink-0 text-muted-foreground" size={14} />
      <span className="text-muted-foreground">{label}:</span>
      <span className="truncate">{value}</span>
    </div>
  );
}
