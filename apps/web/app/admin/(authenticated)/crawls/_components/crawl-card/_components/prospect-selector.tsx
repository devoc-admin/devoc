"use client";
import { useForm } from "@tanstack/react-form";
import {
  BuildingIcon,
  ChevronDownIcon,
  LoaderIcon,
  PlusIcon,
  SearchIcon,
  UserRoundPlusIcon,
  XIcon,
} from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { useCallback, useEffect, useState } from "react";
import { ProspectTypeBadge } from "@/app/admin/(authenticated)/prospects/_components/buttons/prospect-type-button";
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
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { PROSPECT_TYPES } from "../../../../prospects/_components/buttons/prospect-type-button";
import {
  type PlaceResult,
  PlacesAutocomplete,
} from "../../../../prospects/_components/map/places-autocomplete";
import { inferProspectType } from "../../../../prospects/prospects-utils";
import { useCrawlCardContext } from "../crawl-card-context";
import {
  useAddProspectForCrawl,
  useAssignProspectToCrawl,
} from "../crawl-card-mutations";
import { useAvailableProspectsForCrawl } from "../crawl-card-queries";

export function ProspectSelector() {
  const { crawl } = useCrawlCardContext();

  const { availableProspects, availableProspectsAreLoading } =
    useAvailableProspectsForCrawl(crawl?.id ?? "");
  const { mutate: assignProspect, isPending } = useAssignProspectToCrawl();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!crawl) return null;
  const currentProspectId = crawl.prospectId?.toString() ?? "";

  const filteredProspects = availableProspects?.filter((prospect) =>
    prospect.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleChange(value: string) {
    const prospectId = value === "" ? null : Number.parseInt(value, 10);
    assignProspect({ crawlId: crawl?.id ?? "", prospectId });
  }

  function handleOpenChange(open: boolean) {
    setDropdownOpen(open);
    if (!open) {
      setSearchQuery("");
    }
  }

  function handleProspectAdded() {
    setDropdownOpen(false);
  }

  return (
    <div className="mt-2 flex items-center gap-x-2">
      <BuildingIcon className="shrink-0 text-muted-foreground" size={14} />
      <DropdownMenu onOpenChange={handleOpenChange} open={dropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex cursor-pointer items-center gap-x-1 rounded-md px-2 py-1",
              "bg-muted/50 text-sm",
              "hover:bg-muted",
              "transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={isPending || availableProspectsAreLoading}
            type="button"
          >
            {isPending ? <LoaderIcon className="size-3 animate-spin" /> : null}
            <span className="max-w-40 truncate">
              {crawl.prospectName ?? "Sélectionner un prospect"}
            </span>
            <ChevronDownIcon className="shrink-0" size={14} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <div className="space-y-2 p-2">
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
                size={14}
              />
              <input
                autoFocus
                className={cn(
                  "h-8 w-full rounded-md border border-input bg-background pr-2 pl-7",
                  "text-sm placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-1 focus:ring-ring"
                )}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Rechercher..."
                type="text"
                value={searchQuery}
              />
            </div>
            <AddProspectForCrawlButton
              crawlId={crawl.id}
              crawlUrl={crawl.url}
              onSuccess={handleProspectAdded}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            <DropdownMenuRadioGroup
              onValueChange={handleChange}
              value={currentProspectId}
            >
              <DropdownMenuRadioItem value="">
                <span className="text-muted-foreground">Aucun prospect</span>
              </DropdownMenuRadioItem>
              {filteredProspects?.map((prospect) => (
                <DropdownMenuRadioItem
                  key={prospect.id}
                  value={prospect.id.toString()}
                >
                  {prospect.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {crawl.prospectType && <ProspectTypeBadge type={crawl.prospectType} />}
    </div>
  );
}

// ------------------------------------------------------------
// ➕ Add Prospect For Crawl Button & Dialog
function AddProspectForCrawlButton({
  crawlId,
  crawlUrl,
  onSuccess,
}: {
  crawlId: string;
  crawlUrl: string;
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const {
    mutate: addProspect,
    isPending,
    isSuccess,
  } = useAddProspectForCrawl();

  const form = useForm({
    defaultValues: {
      latitude: "",
      location: "",
      longitude: "",
      name: "",
      type: "city" as Prospect["type"],
    },
    onSubmit: ({ value }) => {
      addProspect({
        crawlId,
        latitude: value.latitude || undefined,
        location: value.location,
        longitude: value.longitude || undefined,
        name: value.name,
        type: value.type,
        website: crawlUrl,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      form.reset();
      setFormKey((prev) => prev + 1);
      onSuccess();
    }
  }, [isSuccess, form, onSuccess]);

  const handlePlaceSelect = useCallback(
    (place: PlaceResult) => {
      form.setFieldValue("name", place.name);
      form.setFieldValue(
        "type",
        inferProspectType(place.placeTypes, place.name)
      );
      form.setFieldValue("location", place.placeUrl);
      form.setFieldValue("latitude", place.latitude.toString());
      form.setFieldValue("longitude", place.longitude.toString());
    },
    [form]
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <VisuallyHidden.Root>
        <DialogTitle>Ajouter un prospect</DialogTitle>
      </VisuallyHidden.Root>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          onClick={(e) => e.stopPropagation()}
          size="sm"
          type="button"
          variant="default"
        >
          <PlusIcon size={16} />
          <span>Ajouter un prospect</span>
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <div className="space-y-4">
          <h3 className="text-center font-bold font-kanit text-3xl">
            Ajouter un prospect
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-4">
            {/* 📌 Location with Google Places Autocomplete */}
            <form.Field
              name="location"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "La localisation est requise";
                },
              }}
            >
              {(field) => (
                <div className="col-span-2">
                  <Label>Rechercher un lieu</Label>
                  <PlacesAutocomplete
                    key={formKey}
                    onPlaceSelect={handlePlaceSelect}
                    placeholder="Mairie, ville, administration..."
                  />
                  {!field.state.meta.isValid && (
                    <FormErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </FormErrorMessage>
                  )}
                </div>
              )}
            </form.Field>
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
                    placeholder="Auto-rempli"
                    value={field.state.value}
                  />
                  {!field.state.meta.isValid && (
                    <FormErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </FormErrorMessage>
                  )}
                </div>
              )}
            </form.Field>
            {/* 🟡 Prospect type */}
            <form.Field name="type">
              {(field) => (
                <div>
                  <Label>Type</Label>
                  <Select
                    onValueChange={(newValue) =>
                      field.handleChange(newValue as Prospect["type"])
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Auto-détecté" />
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
          </div>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className="mx-auto flex items-center gap-x-2"
                disabled={isSubmitting || isPending}
                loading={isSubmitting || isPending}
                onClick={form.handleSubmit}
                size="lg"
              >
                <UserRoundPlusIcon className="shrink-0" size={22} />
                <span>Ajouter</span>
              </Button>
            )}
          </form.Subscribe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// -------------------------------------
// 🚫 Error
function FormErrorMessage({ children }: { children: string }) {
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
