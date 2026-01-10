"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Prospect } from "@/lib/db/schema";

export function ProspectsList({ prospects }: { prospects: Prospect[] }) {
  const table = useProspectsList({ prospects });
  return (
    <div className="space-y-8 rounded-md bg-sidebar p-8">
      <h2 className="font-kanit font-semibold text-3xl">Prospects</h2>
      <div>
        {prospects?.length > 0 ? (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>Aucun prospect enregistré.</div>
        )}
      </div>
    </div>
  );
}

function useProspectsList({ prospects }: { prospects: Prospect[] }) {
  const columnHelper = createColumnHelper<Prospect>();

  const defaultColumns = [
    columnHelper.accessor("name", {
      cell: ({ getValue }) => getValue(),
      header: "Nom",
    }),
    columnHelper.accessor("type", {
      cell: ({ getValue }) => <TypeBadge type={getValue()} />,
      header: "Type",
    }),
    columnHelper.accessor("website", {
      cell: ({ getValue }) => {
        const url = getValue();
        if (!url) return <span className="text-muted-foreground">-</span>;
        return (
          <a
            className="cursor-pointer text-blue-500 underline"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Voir le site
          </a>
        );
      },
      header: "Site web",
    }),
    columnHelper.accessor("location", {
      cell: ({ getValue }) => {
        const url = getValue();
        if (!url) return <span className="text-muted-foreground">-</span>;
        return (
          <a
            className="cursor-pointer text-blue-500 underline"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Voir
          </a>
        );
      },
      header: "Localisation",
    }),
    columnHelper.accessor("createdAt", {
      cell: ({ getValue }) => formatDate(getValue()),
      header: "Ajouté le",
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: prospects,
    getCoreRowModel: getCoreRowModel(),
  });
  return table;
}

function TypeBadge({ type }: { type: Prospect["type"] }) {
  const labels: Record<Prospect["type"], string> = {
    administration: "Administration",
    city: "Ville",
    epci: "EPCI",
    other: "Autre",
  };

  const colors: Record<Prospect["type"], string> = {
    administration: "bg-purple-500/20 text-purple-400",
    city: "bg-blue-500/20 text-blue-400",
    epci: "bg-green-500/20 text-green-400",
    other: "bg-zinc-500/20 text-zinc-400",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 font-medium text-xs ${colors[type]}`}
    >
      {labels[type]}
    </span>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}
