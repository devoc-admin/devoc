"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ExternalLinkIcon } from "lucide-react";
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
