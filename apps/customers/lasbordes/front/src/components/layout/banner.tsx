import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function Banner() {
  // In production, this would come from CMS
  const banner = {
    enabled: true,
    message:
      "Information : La mairie sera exceptionnellement fermée le vendredi 15 novembre 2024.",
    severity: "info" as const,
  };

  if (!banner.enabled) {
    return null;
  }

  const severityStyles = {
    alert: "bg-red-50 text-red-900 border-red-200",
    info: "bg-blue-50 text-blue-900 border-blue-200",
    warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
  };

  const SeverityIcon = {
    alert: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }[banner.severity];

  return (
    <div
      aria-live="polite"
      className={cn("border-b px-4 py-3", severityStyles[banner.severity])}
      role="alert"
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-3">
          <SeverityIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium text-sm">{banner.message}</p>
        </div>
      </div>
    </div>
  );
}
