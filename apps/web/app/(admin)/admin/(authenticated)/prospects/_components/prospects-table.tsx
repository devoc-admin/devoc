"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ExternalLinkIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProspectResult } from "../prospects-actions";
import { useProspectsContext } from "../prospects-context";
import { DeleteProspectButton } from "./buttons/delete-prospect-button";
import { EditProspectButton } from "./buttons/edit-prospect-button";
import { GoCrawlDetailsPageButton } from "./buttons/go-crawl-details-page";
import { LaunchCrawlButton } from "./buttons/launch-crawl-button";
import { ProspectTypeBadge } from "./buttons/prospect-type-button";
import { CrawlStatusCell } from "./cells/crawl-status-cell";
import { HasAccessibilitySettingsCell } from "./cells/has-accessibility-settings-cell";
import { SiteEditorCell } from "./cells/site-editor-cell";
import { EstimatedOpportunitySelect } from "./selects/estimated-opportunity-select";

export function ProspectsTable() {
  const { prospects } = useProspectsContext();
  const table = useProspectsTable();
  if (!prospects) return null;

  return prospects?.length > 0 ? (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div>Aucun prospect enregistré.</div>
  );
}

function useProspectsTable() {
  const { prospects } = useProspectsContext();
  const columnHelper = createColumnHelper<ProspectResult>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const defaultColumns = [
    //🔠 Name (clickable to website if available)
    columnHelper.accessor("name", {
      cell: ({ getValue, row }) => {
        const name = getValue();
        const website = row.original.website;
        if (website) {
          return (
            <a
              className="flex items-center gap-x-1.5 text-blue-500 hover:underline"
              href={website}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{name}</span>
              <ExternalLinkIcon className="shrink-0" size={14} />
            </a>
          );
        }
        return <span>{name}</span>;
      },
      header: ({ column }) => <SortableHeader column={column} label="Nom" />,
    }),
    // 🟡 Type
    columnHelper.accessor("type", {
      cell: ({ getValue }) => <ProspectTypeBadge type={getValue()} />,
      header: ({ column }) => <SortableHeader column={column} label="Type" />,
    }),
    // 👥 Nombre d'habitants (uniquement pour les communes)
    columnHelper.accessor("inhabitants", {
      cell: ({ getValue, row }) => {
        if (row.original.type !== "city") return null;
        const value = getValue();
        if (value === null || value === undefined) {
          return <span className="text-muted-foreground">—</span>;
        }
        return <span>{value.toLocaleString("fr-FR")}</span>;
      },
      header: ({ column }) => (
        <SortableHeader column={column} label="Habitants" />
      ),
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.inhabitants ?? -1;
        const b = rowB.original.inhabitants ?? -1;
        return a - b;
      },
    }),
    // 📏 Distance depuis mon adresse (km)
    columnHelper.accessor("distanceFrom", {
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === null || value === undefined) {
          return <span className="text-muted-foreground">—</span>;
        }
        return <span>{value.toLocaleString("fr-FR")} km</span>;
      },
      header: ({ column }) => (
        <SortableHeader column={column} label="Distance" />
      ),
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.distanceFrom ?? Number.POSITIVE_INFINITY;
        const b = rowB.original.distanceFrom ?? Number.POSITIVE_INFINITY;
        return a - b;
      },
    }),
    // 📅 Année de mise en ligne du site (read-only)
    columnHelper.accessor("siteLaunchYear", {
      cell: ({ getValue }) => {
        const value = getValue();
        if (value === null || value === undefined) {
          return <span className="text-muted-foreground">—</span>;
        }
        return <span>{value}</span>;
      },
      header: ({ column }) => (
        <SortableHeader column={column} label="Mise en ligne" />
      ),
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.siteLaunchYear ?? Number.POSITIVE_INFINITY;
        const b = rowB.original.siteLaunchYear ?? Number.POSITIVE_INFINITY;
        return a - b;
      },
    }),
    // 🛠️ Éditeur du site (inline editable, combobox)
    columnHelper.accessor("siteEditor", {
      cell: ({ getValue, row }) => (
        <SiteEditorCell
          prospectId={row.original.id}
          url={row.original.siteEditorUrl}
          value={getValue()}
        />
      ),
      header: ({ column }) => (
        <SortableHeader column={column} label="Éditeur" />
      ),
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.siteEditor ?? "";
        const b = rowB.original.siteEditor ?? "";
        if (a === b) return 0;
        if (!a) return 1;
        if (!b) return -1;
        return a.localeCompare(b, "fr");
      },
    }),
    // ♿ Paramètres d'accessibilité (inline editable)
    columnHelper.accessor("hasAccessibilitySettings", {
      cell: ({ getValue, row }) => (
        <HasAccessibilitySettingsCell
          prospectId={row.original.id}
          value={getValue()}
        />
      ),
      header: ({ column }) => (
        <SortableHeader column={column} label="Accessibilité" />
      ),
      sortingFn: (rowA, rowB) => {
        const order = { false: 1, null: 2, true: 0 };
        const a = String(rowA.original.hasAccessibilitySettings) as
          | "true"
          | "false"
          | "null";
        const b = String(rowB.original.hasAccessibilitySettings) as
          | "true"
          | "false"
          | "null";
        return order[a] - order[b];
      },
    }),
    // 📱 PanneauPocket (uniquement pour les communes, lecture seule)
    columnHelper.accessor("usesPanneauPocket", {
      cell: ({ getValue, row }) => {
        if (row.original.type !== "city") return null;
        const value = getValue();
        if (value === true) {
          return <CheckIcon className="text-green-500" size={18} />;
        }
        if (value === false) {
          return <XIcon className="text-red-500" size={18} />;
        }
        return <span className="text-muted-foreground">—</span>;
      },
      header: ({ column }) => (
        <SortableHeader column={column} label="PanneauPocket" />
      ),
      sortingFn: (rowA, rowB) => {
        const order = { false: 1, null: 2, true: 0 };
        const a = String(rowA.original.usesPanneauPocket) as
          | "true"
          | "false"
          | "null";
        const b = String(rowB.original.usesPanneauPocket) as
          | "true"
          | "false"
          | "null";
        return order[a] - order[b];
      },
    }),
    // 🛡️ DPO (lecture seule, édition via le dialog)
    columnHelper.accessor("hasDpo", {
      cell: ({ getValue }) => {
        const v = getValue();
        if (v === true) {
          return <CheckIcon className="text-green-500" size={18} />;
        }
        if (v === false) {
          return <XIcon className="text-red-500" size={18} />;
        }
        return (
          <span className="rounded-full bg-zinc-500/10 px-2 py-0.5 text-xs text-zinc-400">
            Non renseigné
          </span>
        );
      },
      header: ({ column }) => <SortableHeader column={column} label="DPO" />,
      sortingFn: (rowA, rowB) => {
        const order = { false: 1, null: 2, true: 0 };
        const a = String(rowA.original.hasDpo) as "true" | "false" | "null";
        const b = String(rowB.original.hasDpo) as "true" | "false" | "null";
        return order[a] - order[b];
      },
    }),
    // 🎯 Estimated opportunity (Urgence)
    columnHelper.accessor("estimatedOpportunity", {
      cell: ({ getValue, row }) => (
        <EstimatedOpportunitySelect
          prospectId={row.original.id}
          value={getValue() ?? "medium"}
        />
      ),
      header: ({ column }) => (
        <SortableHeader column={column} label="Urgence" />
      ),
      sortingFn: (rowA, rowB) => {
        const order = { medium: 1, strong: 0, weak: 2 };
        const a = rowA.original.estimatedOpportunity ?? "medium";
        const b = rowB.original.estimatedOpportunity ?? "medium";
        return order[a] - order[b];
      },
    }),
    // 🟡🕷️ Crawl status
    columnHelper.accessor("crawlStatus", {
      cell: ({ getValue, row }) => (
        <CrawlStatusCell
          crawlStatus={getValue()}
          website={row.original.website}
        />
      ),
      header: ({ column }) => (
        <SortableHeader column={column} label="Exploration" />
      ),
      sortingFn: (rowA, rowB) => {
        const order = {
          cancelled: 4,
          completed: 2,
          failed: 3,
          pending: 1,
          running: 0,
        };
        const a = rowA.original.crawlStatus;
        const b = rowB.original.crawlStatus;
        const aOrder = a ? order[a] : 5;
        const bOrder = b ? order[b] : 5;
        return aOrder - bOrder;
      },
    }),
    // ✏️↩️➡️🗑️ Actions
    columnHelper.display({
      cell: ({ row }) => (
        <div className="flex items-center">
          <EditProspectButton prospect={row.original} />
          <LaunchCrawlButton
            crawlId={row.original.crawlId}
            crawlStatus={row.original.crawlStatus}
            prospectId={row.original.id}
            website={row.original.website}
          />
          <GoCrawlDetailsPageButton crawlId={row.original.crawlId} />
          <DeleteProspectButton prospectId={row.original.id} />
        </div>
      ),
      header: "Actions",
      id: "actions",
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: prospects ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });
  return table;
}

// -------------------------------------------
// 🔃 Sortable header
function SortableHeader({
  column,
  label,
}: {
  column: {
    toggleSorting: () => void;
    getIsSorted: () => false | "asc" | "desc";
  };
  label: string;
}) {
  return (
    <button
      className="flex cursor-pointer items-center gap-x-1 hover:text-foreground"
      onClick={() => column.toggleSorting()}
      type="button"
    >
      {label}
      <SortingIcon direction={column.getIsSorted()} />
    </button>
  );
}

function SortingIcon({ direction }: { direction: false | "asc" | "desc" }) {
  if (direction === "asc") {
    return <ArrowUpIcon size={14} />;
  }
  if (direction === "desc") {
    return <ArrowDownIcon size={14} />;
  }
  return null;
}
