"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Crawl } from "@/lib/db/schema";

export function SitesList({ sites }: { sites: Crawl[] }) {
  const table = useSitesList({ sites });
  return (
    <div className="space-y-8 rounded-md bg-sidebar p-8">
      <h2 className="font-kanit font-semibold text-3xl">
        Sites déjà référencés
      </h2>
      <div>
        {sites?.length > 0 ? (
          <Table>
            {/* 0️⃣ Header */}
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
            {/* 1️⃣ Body */}
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} role="button" tabIndex={0}>
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
          <div>
            Pas de site analysé, passez par{" "}
            <Link className="text-blue-500 underline" href="/admin/crawl">
              la page d'analyse
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------
function useSitesList({ sites }: { sites: Crawl[] }) {
  const columnHelper = createColumnHelper<Crawl>();

  const defaultColumns = [
    columnHelper.accessor("url", {
      cell: ({ getValue }) => (
        <a
          className="cursor-pointer underline"
          href={getValue()}
          target="_blank"
        >
          {getValue()}
        </a>
      ),
      header: "🔗 Lien",
    }),
    columnHelper.accessor("createdAt", {
      cell: ({ getValue }) => formatDate(getValue()),
      header: "🗓️ Ajouté le",
    }),
    columnHelper.accessor("id", {
      cell: ({ getValue }) => (
        <Link
          className="text-blue-500 underline"
          href={`/admin/sites/${getValue()}`}
        >
          Voir plus
        </Link>
      ),
      header: "Crawl",
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: sites,
    getCoreRowModel: getCoreRowModel(),
  });
  return table;
}

// --------------------------------------------
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}
