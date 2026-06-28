"use client";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  CircleDotIcon,
  ClockIcon,
  ExternalLinkIcon,
  Loader2Icon,
  TrashIcon,
  XCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { AuditResult } from "../../audits-actions";
import { useAuditsContext } from "../../audits-context";

export function AuditCard(audit: AuditResult) {
  const { deleteAuditMutate, deletingAuditId, lockActions } =
    useAuditsContext();
  const isDeleting = deletingAuditId === audit.id;

  return (
    <li className="flex max-w-100 flex-col gap-y-4 self-start rounded-md border border-border bg-sidebar-strong p-4">
      {/* ⬆️ Header */}
      <div>
        <div className="flex items-center gap-x-2">
          <h3 className="max-w-full truncate font-kanit text-xl">
            {audit.name || new URL(audit.url).hostname}
          </h3>
          <AuditTypeBadge type={audit.type} />
        </div>
        {/* 🌐 URL */}
        <a
          className="flex items-center gap-x-2 text-muted-foreground hover:underline"
          href={audit.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="truncate">{audit.url}</span>
          <ExternalLinkIcon className="shrink-0" size={16} />
        </a>
      </div>

      {/* 📊 Status & Stats */}
      <div className="flex items-center gap-x-4">
        <AuditStatusBadge status={audit.status} />
        {audit.status === "completed" && audit.complianceRate !== null && (
          <ComplianceRate rate={audit.complianceRate} />
        )}
      </div>

      {/* 📈 Criteria breakdown (only if completed) */}
      {audit.status === "completed" && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-x-1.5">
            <CheckCircle2Icon className="text-green-500" size={14} />
            <span>Conformes: {audit.compliantCount}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <XCircleIcon className="text-red-500" size={14} />
            <span>Non conformes: {audit.nonCompliantCount}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <CircleDotIcon className="text-gray-400" size={14} />
            <span>N/A: {audit.notApplicableCount}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <ClockIcon className="text-yellow-500" size={14} />
            <span>Non testés: {audit.notTestedCount}</span>
          </div>
        </div>
      )}

      {/* ⚠️ Error message */}
      {audit.status === "failed" && audit.errorMessage && (
        <div className="flex items-start gap-x-2 rounded-md bg-red-500/10 p-2 text-red-500 text-sm">
          <AlertCircleIcon className="mt-0.5 shrink-0" size={14} />
          <span>{audit.errorMessage}</span>
        </div>
      )}

      {/* 📅 Dates */}
      <div className="text-muted-foreground text-xs">
        <p>Créé le {new Date(audit.createdAt).toLocaleDateString("fr-FR")}</p>
        {audit.completedAt && (
          <p>
            Terminé le {new Date(audit.completedAt).toLocaleDateString("fr-FR")}
          </p>
        )}
      </div>

      {/* 🆕 Action buttons */}
      <div className="flex gap-x-2">
        <Button
          className="flex-1"
          disabled={lockActions}
          onClick={() => deleteAuditMutate(audit.id)}
          size="sm"
          variant="destructive"
        >
          {isDeleting ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <TrashIcon size={16} />
          )}
          <span>Supprimer</span>
        </Button>
      </div>
    </li>
  );
}

// -------------------------------------------------
// 💀 Skeleton
export function AuditCardSkeleton() {
  return <Skeleton className="h-64 w-full max-w-100 rounded-md" />;
}

// -------------------------------------------------
// 🏷️ Audit type badge
function AuditTypeBadge({ type }: { type: "rgaa" | "wcag" }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5",
        "font-medium text-xs uppercase",
        type === "rgaa"
          ? "bg-blue-500/20 text-blue-400"
          : "bg-purple-500/20 text-purple-400"
      )}
    >
      {type}
    </span>
  );
}

// -------------------------------------------------
// 🔄 Audit status badge
function AuditStatusBadge({
  status,
}: {
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
}) {
  const config = {
    cancelled: {
      bgColor: "bg-gray-500/20",
      icon: <XCircleIcon size={14} />,
      label: "Annulé",
      textColor: "text-gray-400",
    },
    completed: {
      bgColor: "bg-green-500/20",
      icon: <CheckCircle2Icon size={14} />,
      label: "Terminé",
      textColor: "text-green-400",
    },
    failed: {
      bgColor: "bg-red-500/20",
      icon: <AlertCircleIcon size={14} />,
      label: "Échoué",
      textColor: "text-red-400",
    },
    pending: {
      bgColor: "bg-yellow-500/20",
      icon: <ClockIcon size={14} />,
      label: "En attente",
      textColor: "text-yellow-400",
    },
    running: {
      bgColor: "bg-blue-500/20",
      icon: <Loader2Icon className="animate-spin" size={14} />,
      label: "En cours",
      textColor: "text-blue-400",
    },
  };

  const { bgColor, textColor, icon, label } = config[status];

  return (
    <span
      className={cn(
        "flex items-center gap-x-1.5 rounded-full px-2 py-0.5",
        "font-medium text-xs",
        bgColor,
        textColor
      )}
    >
      {icon}
      {label}
    </span>
  );
}

// -------------------------------------------------
// 📊 Compliance rate
function ComplianceRate({ rate }: { rate: number }) {
  function getColor() {
    if (rate >= 75) return "text-green-400";
    if (rate >= 50) return "text-yellow-400";
    return "text-red-400";
  }

  return (
    <span className={cn("font-kanit font-semibold text-lg", getColor())}>
      {rate}%
    </span>
  );
}
