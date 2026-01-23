"use client";
import { isValidMapsUrl, isValidUrlFormat } from "@dev-oc/utils/url";
import { useForm } from "@tanstack/react-form";
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
  ChevronDownIcon,
  ExternalLinkIcon,
  LoaderIcon,
  PencilIcon,
  SaveIcon,
  SearchIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { useEffect, useMemo, useState } from "react";
import { isValidWebsite } from "@/actions/validation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../prospects-context";
import {
  ESTIMATED_OPPORTUNITY,
  type EstimatedOpportunity,
  PROSPECT_TYPES,
  type ProspectType,
} from "../prospects-types";
import { ProspectAdd } from "./prospect-add";
import { ProspectsMap } from "./prospects-map";
import { ViewToggle } from "./view-toggle";

export function ProspectsList() {
  const { prospects, viewMode } = useProspectsContext();
  const table = useProspectsList();
  if (!prospects) return null;

  const ProspectsTable = () =>
    prospects?.length > 0 ? (
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

  return (
    <div className="flex min-h-full flex-col gap-y-8 rounded-md bg-sidebar p-8">
      <div className="flex items-center gap-x-8">
        <h2 className="font-kanit font-semibold text-3xl">Prospects</h2>
      </div>
      <div className="flex items-center gap-x-6">
        <SearchProspects />
        <ProspectAdd />
      </div>
      <div className="w-fit">
        <ViewToggle />
      </div>
      {viewMode === "map" ? <ProspectsMap /> : <ProspectsTable />}
    </div>
  );
}

function useProspectsList() {
  const { prospects, searchQuery } = useProspectsContext();
  const columnHelper = createColumnHelper<Prospect>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredProspects = useMemo(() => {
    if (!(prospects && searchQuery.trim())) return prospects ?? [];

    const query = searchQuery.toLowerCase().trim();
    return prospects.filter((prospect) => {
      const name = prospect.name?.toLowerCase() ?? "";
      const type = prospect.type?.toLowerCase() ?? "";
      const website = prospect.website?.toLowerCase() ?? "";

      return (
        name.includes(query) || type.includes(query) || website.includes(query)
      );
    });
  }, [prospects, searchQuery]);

  const defaultColumns = [
    //🔠 Name
    columnHelper.accessor("name", {
      cell: ({ getValue }) => getValue(),
      header: "Nom",
    }),
    // 🟡 Type
    columnHelper.accessor("type", {
      cell: ({ getValue }) => <TypeBadge type={getValue()} />,
      header: "Type",
    }),
    // 🌐 Website
    columnHelper.accessor("website", {
      cell: ({ getValue }) => {
        const url = getValue();
        if (!url) return <span className="text-muted-foreground">-</span>;
        return (
          <a
            className="flex cursor-pointer items-center gap-x-2 text-blue-500 underline"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Voir le site</span>
            <ExternalLinkIcon size={16} />
          </a>
        );
      },
      header: "Site web",
    }),
    // 📌 Location
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
    //🗓️ Created at
    columnHelper.accessor("createdAt", {
      cell: ({ getValue }) => formatDate(getValue()),
      header: "Ajouté le",
    }),
    // 🎯 Estimated opportunity (Urgence)
    columnHelper.accessor("estimatedOpportunity", {
      cell: ({ getValue, row }) => (
        <EstimatedOpportunityDropdown
          prospectId={row.original.id}
          value={getValue() ?? "medium"}
        />
      ),
      header: ({ column }) => (
        <button
          className="flex items-center gap-x-1 hover:text-foreground"
          onClick={() => column.toggleSorting()}
          type="button"
        >
          Urgence
          <SortingIcon direction={column.getIsSorted()} />
        </button>
      ),
      sortingFn: (rowA, rowB) => {
        const order = { medium: 1, strong: 0, weak: 2 };
        const a = rowA.original.estimatedOpportunity ?? "medium";
        const b = rowB.original.estimatedOpportunity ?? "medium";
        return order[a] - order[b];
      },
    }),
    // ✏️🗑️ Actions
    columnHelper.display({
      cell: ({ row }) => (
        <div className="flex items-center gap-x-1">
          <EditProspectButton prospect={row.original} />
          <DeleteProspectButton prospectId={row.original.id} />
        </div>
      ),
      header: "",
      id: "actions",
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: filteredProspects,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });
  return table;
}
// -------------------------------------------
//🔍 Search bar
function SearchProspects() {
  const { searchQuery, setSearchQuery } = useProspectsContext();

  return (
    <div className="relative w-125">
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <input
        className="h-10 w-full rounded-md border border-input bg-sidebar-strong pr-10 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher par nom, type ou site web..."
        type="text"
        value={searchQuery}
      />
      {searchQuery && (
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setSearchQuery("")}
          type="button"
        >
          <XIcon size={18} />
        </button>
      )}
    </div>
  );
}

// -------------------------------------------
// 🟡 Type badge (city, EPCI, administration)

function TypeBadge({ type }: { type: Prospect["type"] }) {
  const labels: Record<Prospect["type"], string> = {
    administration: "Administration",
    city: "Ville",
    epci: "EPCI",
    other: "Autre",
    territorial_collectivity: "Collectivité territoriale",
  };

  const colors: Record<Prospect["type"], string> = {
    administration: "bg-purple-500/20 text-purple-400",
    city: "bg-blue-500/20 text-blue-400",
    epci: "bg-green-500/20 text-green-400",
    other: "bg-zinc-500/20 text-zinc-400",
    territorial_collectivity: "bg-orange-500/20 text-orange-400",
  };

  return (
    <span
      className={cn(
        "rounded-full",
        "px-3 py-1",
        "font-medium text-xs",
        colors[type]
      )}
    >
      {labels[type]}
    </span>
  );
}

// ------------------------------------
// 🗓️ Format date

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

// -------------------------------------------
// 🗑️ Delete prospect button

function DeleteProspectButton({ prospectId }: { prospectId: number }) {
  const { deleteProspectMutate, deletingProspectId, isDeletingProspect } =
    useProspectsContext();
  const [open, setOpen] = useState(false);

  const isPending = isDeletingProspect && deletingProspectId === prospectId;

  return (
    <AlertDialog open={open}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <button
              className={cn(
                "rounded-full p-2 transition-colors",
                "cursor-pointer text-red-500",
                "hover:bg-red-500/10",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              disabled={isPending}
              onClick={() => setOpen(true)}
              type="button"
            >
              {isPending ? (
                <LoaderIcon
                  className="animate-spin"
                  size={22}
                  strokeWidth={2}
                />
              ) : (
                <Trash2Icon size={16} strokeWidth={2} />
              )}
            </button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Supprimer ce prospect</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer ce prospect ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le prospect sera supprimé
            définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              deleteProspectMutate(prospectId);
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// -------------------------------------------
// ✏️ Edit prospect button

function EditProspectButton({ prospect }: { prospect: Prospect }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isEditedProspect, editingProspectId, isEditingProspect } =
    useProspectsContext();
  const form = useEditProspectForm(prospect);

  const isPending = isEditingProspect && editingProspectId === prospect.id;

  useEffect(() => {
    if (isEditedProspect && editingProspectId === prospect.id) {
      setIsOpen(false);
    }
  }, [isEditedProspect, editingProspectId, prospect.id]);

  return (
    <Dialog onOpenChange={(newOpen) => setIsOpen(newOpen)} open={isOpen}>
      <VisuallyHidden.Root>
        <DialogTitle>Modifier le prospect</DialogTitle>
      </VisuallyHidden.Root>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <button
              className={cn(
                "rounded-full p-2 transition-colors",
                "cursor-pointer text-blue-500",
                "hover:bg-blue-500/10",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              disabled={isPending}
              type="button"
            >
              {isPending ? (
                <LoaderIcon
                  className="animate-spin"
                  size={16}
                  strokeWidth={2}
                />
              ) : (
                <PencilIcon size={16} strokeWidth={2} />
              )}
            </button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Modifier ce prospect</TooltipContent>
      </Tooltip>
      <DialogContent>
        <div className="space-y-4">
          <h3 className="text-center font-bold font-kanit text-3xl">
            Modifier le prospect
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-4">
            {/* 🔠 Name */}
            <form.Field
              name="name"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "Le nom est requis";
                },
              }}
            >
              {(field) => (
                <div>
                  <Label>Nom</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    value={field.state.value}
                  />
                  {!field.state.meta.isValid && (
                    <ErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </ErrorMessage>
                  )}
                </div>
              )}
            </form.Field>
            {/* 🟡 Type */}
            <form.Field name="type">
              {(field) => (
                <div>
                  <Label>Type</Label>
                  <Select
                    onValueChange={(newValue) =>
                      field.handleChange(newValue as ProspectType)
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent align="start" className="max-h-64">
                      <SelectGroup>
                        {Object.entries(PROSPECT_TYPES).map(([type, label]) => (
                          <SelectItem key={type} value={type}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
            {/* 🌐 Website */}
            <form.Field
              name="website"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "Le site web est requis";
                  if (!isValidUrlFormat(value)) return "L'URL n'est pas valide";
                },
                onSubmitAsync: async ({ value }) => {
                  if (!value) return;
                  const result = await isValidWebsite(value);
                  if (!result) return "Ce site web n'existe pas";
                },
              }}
            >
              {(field) => (
                <div className="col-span-2">
                  <Label>Site web</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    value={field.state.value}
                  />
                  {!field.state.meta.isValid && (
                    <ErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </ErrorMessage>
                  )}
                </div>
              )}
            </form.Field>
            {/* 📌 Location */}
            <form.Field
              name="location"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "La localisation est requise";
                  if (!isValidUrlFormat(value)) return "L'URL n'est pas valide";
                  if (!isValidMapsUrl(value))
                    return "L'URL doit être un lien Google Maps ou Apple Maps vers un lieu précis";
                },
                onSubmitAsync: async ({ value }) => {
                  if (!value) return;
                  const result = await isValidWebsite(value);
                  if (!result) return "Cette URL n'existe pas";
                },
              }}
            >
              {(field) => (
                <div className="col-span-2">
                  <Label>Localisation</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    value={field.state.value}
                  />
                  {!field.state.meta.isValid && (
                    <ErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </ErrorMessage>
                  )}
                </div>
              )}
            </form.Field>
            {/* 🗺️ Coordinates (optional) */}
            <div className="col-span-2">
              <Label className="text-muted-foreground text-sm">
                Coordonnées (optionnel - pour la vue carte)
              </Label>
              <div className="mt-1 grid grid-cols-2 gap-x-4">
                <form.Field
                  name="latitude"
                  validators={{
                    onSubmit: ({ value }) => {
                      if (!value) return;
                      const num = Number.parseFloat(value);
                      if (Number.isNaN(num) || num < -90 || num > 90)
                        return "Latitude invalide (-90 à 90)";
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Input
                        className="h-10"
                        name={field.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="Latitude (ex: 48.8566)"
                        value={field.state.value}
                      />
                      {!field.state.meta.isValid && (
                        <ErrorMessage>
                          {field.state.meta.errors.join(", ")}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                </form.Field>
                <form.Field
                  name="longitude"
                  validators={{
                    onSubmit: ({ value }) => {
                      if (!value) return;
                      const num = Number.parseFloat(value);
                      if (Number.isNaN(num) || num < -180 || num > 180)
                        return "Longitude invalide (-180 à 180)";
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Input
                        className="h-10"
                        name={field.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="Longitude (ex: 2.3522)"
                        value={field.state.value}
                      />
                      {!field.state.meta.isValid && (
                        <ErrorMessage>
                          {field.state.meta.errors.join(", ")}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>
            </div>
          </div>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className="mx-auto flex items-center gap-x-2"
                disabled={isSubmitting}
                loading={isSubmitting}
                onClick={form.handleSubmit}
                size="lg"
              >
                <SaveIcon className="shrink-0" size={22} />
                <span>Enregistrer</span>
              </Button>
            )}
          </form.Subscribe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function useEditProspectForm(prospect: Prospect) {
  const { editProspectMutate } = useProspectsContext();
  const form = useForm({
    defaultValues: {
      latitude: prospect.latitude ?? "",
      location: prospect.location ?? "",
      longitude: prospect.longitude ?? "",
      name: prospect.name ?? "",
      type: prospect.type as ProspectType,
      website: prospect.website ?? "",
    },
    onSubmit: ({ value }) => {
      editProspectMutate({
        id: prospect.id,
        latitude: value.latitude || undefined,
        location: value.location,
        longitude: value.longitude || undefined,
        name: value.name,
        type: value.type,
        website: value.website,
      });
    },
  });

  return form;
}

function ErrorMessage({ children }: { children: string }) {
  return (
    <div
      className="flex items-center gap-x-0.5 font-normal text-red-500 text-sm"
      role="alert"
    >
      <XIcon size={16} />
      {children}
    </div>
  );
}

// -------------------------------------------
// 🔃 Sorting icon

function SortingIcon({ direction }: { direction: false | "asc" | "desc" }) {
  if (direction === "asc") {
    return <ArrowUpIcon size={14} />;
  }
  if (direction === "desc") {
    return <ArrowDownIcon size={14} />;
  }
  return null;
}

// -------------------------------------------
// 🎯 Estimated opportunity dropdown

const OPPORTUNITY_COLORS: Record<EstimatedOpportunity, string> = {
  medium: "bg-yellow-500/10 text-yellow-500",
  strong: "bg-red-500/10 text-red-500",
  weak: "bg-green-500/10 text-green-500",
};

function EstimatedOpportunityDropdown({
  prospectId,
  value,
}: {
  prospectId: number;
  value: EstimatedOpportunity;
}) {
  const {
    updateEstimatedOpportunityMutate,
    updatingEstimatedOpportunityProspectId,
    isUpdatingEstimatedOpportunity,
  } = useProspectsContext();

  const isPending =
    isUpdatingEstimatedOpportunity &&
    updatingEstimatedOpportunityProspectId === prospectId;

  function handleChange(newValue: string) {
    updateEstimatedOpportunityMutate({
      estimatedOpportunity: newValue as EstimatedOpportunity,
      prospectId,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-22.5",
            "flex cursor-pointer items-center gap-x-1 rounded-full px-3 py-1 font-medium text-xs transition-colors",
            OPPORTUNITY_COLORS[value],
            "hover:opacity-80"
          )}
          disabled={isPending}
          type="button"
        >
          {isPending && <LoaderIcon className="size-3 animate-spin" />}
          <span>{ESTIMATED_OPPORTUNITY[value]}</span>
          <ChevronDownIcon className="ml-auto" size={12} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup onValueChange={handleChange} value={value}>
          {(Object.keys(ESTIMATED_OPPORTUNITY) as EstimatedOpportunity[]).map(
            (opportunity) => (
              <DropdownMenuRadioItem key={opportunity} value={opportunity}>
                {ESTIMATED_OPPORTUNITY[opportunity]}
              </DropdownMenuRadioItem>
            )
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
