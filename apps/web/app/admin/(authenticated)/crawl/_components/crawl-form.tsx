"use client";
import { useForm } from "@tanstack/react-form";
import { ChevronDownIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isValidWebsite } from "@/actions/validation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { updateProspectWebsite } from "../../prospects/prospects-actions";
import { useCrawlContext } from "../crawl-context";
import { useUncrawledProspects } from "../crawl-queries";
import { DeleteCrawlsButton } from "./delete-crawls-button";

type SelectedProspect = {
  id: number;
  originalWebsite: string;
} | null;

const MAX_PAGES_CRAWLED = 500;
const DEFAULT_PAGES_CRAWLED = 100;

const MAX_DEPTH = 10;
const DEFAULT_DEPTH = 3;

const MAX_CONCURRENCY = 15;
const DEFAULT_CONCURRENCY = 10;

export function CrawlForm() {
  const [selectedProspect, setSelectedProspect] =
    useState<SelectedProspect>(null);
  const [prospectSearchQuery, setProspectSearchQuery] = useState("");
  const crawlForm = useCrawlForm({ selectedProspect, setSelectedProspect });
  const { crawlId } = useCrawlContext();
  const { prospects, prospectsAreLoading } = useUncrawledProspects();

  const currentCrawlRunning = crawlId !== undefined && crawlId !== null;

  const filteredProspects = prospects?.filter((prospect) =>
    prospect.name.toLowerCase().includes(prospectSearchQuery.toLowerCase())
  );

  function handleProspectSelect(prospectId: string) {
    // Handle deselection
    if (prospectId === "") {
      setSelectedProspect(null);
      crawlForm.setFieldValue("search", "");
      return;
    }

    const prospect = prospects?.find((p) => p.id.toString() === prospectId);
    if (prospect?.website) {
      crawlForm.setFieldValue("search", prospect.website);
      setSelectedProspect({
        id: prospect.id,
        originalWebsite: prospect.website,
      });
    }
  }

  function handleDropdownOpenChange(open: boolean) {
    if (!open) {
      setProspectSearchQuery("");
    }
  }

  return (
    <div className="rounded-md bg-sidebar p-6">
      {/* 📝 Form */}
      <form
        className="mx-auto flex h-full max-w-75 flex-col items-center justify-center gap-y-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          crawlForm.handleSubmit();
        }}
      >
        {/* 🏢 Prospect selector */}
        <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <div className="flex w-full flex-col gap-y-1">
              <Label className="font-kanit text-lg">
                Sélectionner un prospect
              </Label>
              <DropdownMenu onOpenChange={handleDropdownOpenChange}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2",
                      "text-sm ring-offset-background",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      !selectedProspect && "text-muted-foreground"
                    )}
                    disabled={
                      currentCrawlRunning ||
                      isSubmitting ||
                      prospectsAreLoading ||
                      !prospects?.length
                    }
                    type="button"
                  >
                    <span className="truncate">
                      {selectedProspect
                        ? prospects?.find((p) => p.id === selectedProspect.id)
                            ?.name
                        : getProspectPlaceholder(
                            prospectsAreLoading,
                            prospects?.length ?? 0
                          )}
                    </span>
                    <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-(--radix-dropdown-menu-trigger-width)"
                >
                  <div className="p-2">
                    <div className="relative">
                      <SearchIcon
                        className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
                        size={14}
                      />
                      <input
                        className={cn(
                          "h-8 w-full rounded-md border border-input bg-background pr-2 pl-7",
                          "text-sm placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-1 focus:ring-ring"
                        )}
                        onChange={(e) => setProspectSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        placeholder="Rechercher un prospect..."
                        type="text"
                        value={prospectSearchQuery}
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    <DropdownMenuRadioGroup
                      onValueChange={handleProspectSelect}
                      value={selectedProspect?.id.toString() ?? ""}
                    >
                      <DropdownMenuRadioItem value="">
                        <span className="text-muted-foreground">
                          — Aucun prospect —
                        </span>
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
            </div>
          )}
        </crawlForm.Subscribe>
        {/* 🔍 Search */}
        <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <crawlForm.Field
              name="search"
              validators={{
                onSubmit: ({ value: search }) => {
                  if (!search) return "Veuillez saisir une URL";
                  if (!isWebsiteUrl(search))
                    return "La saisie n'est pas une URL valide";
                  return;
                },
                onSubmitAsync: async ({ value: search }) => {
                  const result = await isValidWebsite(search);
                  if (!result) return "Ce site web n'existe pas";
                },
              }}
            >
              {(field) => (
                <div className="flex w-full flex-col gap-y-1">
                  <Label className="font-kanit text-lg">URL du site</Label>
                  <Input
                    className="h-10"
                    disabled={currentCrawlRunning || isSubmitting}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Explorer un site..."
                    value={field.state.value}
                  />
                  {!field.state.meta.isValid && (
                    <ErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </ErrorMessage>
                  )}
                </div>
              )}
            </crawlForm.Field>
          )}
        </crawlForm.Subscribe>
        {/* 🔢 Sliders */}
        <div className="flex w-full max-w-100 flex-col gap-y-4">
          {/* 🔢 Nb. max de résultats */}
          <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <crawlForm.Field name="maxPages">
                {(field) => (
                  <div>
                    <Label className="font-kanit text-lg">Max. pages</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        disabled={currentCrawlRunning || isSubmitting}
                        max={MAX_PAGES_CRAWLED}
                        min={1}
                        name="maxPages"
                        onValueChange={(values) =>
                          field.handleChange(values[0])
                        }
                        step={1}
                        value={[field.state.value]}
                      />
                      <span>{field.state.value}</span>
                    </div>
                  </div>
                )}
              </crawlForm.Field>
            )}
          </crawlForm.Subscribe>
          {/* 🔢 Max. profondeur. */}
          <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <crawlForm.Field name="maxDepth">
                {(field) => (
                  <div>
                    <Label className="font-kanit text-lg">
                      Max. profondeur
                    </Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        disabled={currentCrawlRunning || isSubmitting}
                        max={MAX_DEPTH}
                        min={1}
                        name="maxDepth"
                        onValueChange={(values) =>
                          field.handleChange(values[0])
                        }
                        step={1}
                        value={[field.state.value]}
                      />
                      <span>{field.state.value}</span>
                    </div>
                  </div>
                )}
              </crawlForm.Field>
            )}
          </crawlForm.Subscribe>
          {/* 🔀 Concurrency */}
          <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <crawlForm.Field name="concurrency">
                {(field) => (
                  <div>
                    <Label className="font-kanit text-lg">Max. crawlers</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        disabled={currentCrawlRunning || isSubmitting}
                        max={MAX_CONCURRENCY}
                        min={1}
                        name="concurrency"
                        onValueChange={(values) =>
                          field.handleChange(values[0])
                        }
                        step={1}
                        value={[field.state.value]}
                      />
                      <span>{field.state.value}</span>
                    </div>
                  </div>
                )}
              </crawlForm.Field>
            )}
          </crawlForm.Subscribe>
          {/* 💾 Use local screenshots */}
          <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <crawlForm.Field name="useLocalScreenshots">
                {(field) => (
                  <CustomCheckbox
                    checked={field.state.value}
                    disabled={currentCrawlRunning || isSubmitting}
                    handleChange={(checked) =>
                      field.handleChange(checked === true)
                    }
                    name="useLocalScreenshots"
                  >
                    Stocker les captures écran localement
                  </CustomCheckbox>
                )}
              </crawlForm.Field>
            )}
          </crawlForm.Subscribe>
        </div>
        {/* ☑️ Checkboxes */}
        {/*<div className="flex items-center justify-center gap-x-6">*/}
        {/* 👁️ A11Y */}
        {/*<form.Field name="checkAccessibility">
              {(field) => (
                <CustomCheckbox
                  checked={field.state.value}
                  handleChange={field.handleChange}
                  name="checkAccessibility"
                >
                  Accessibilité
                </CustomCheckbox>
              )}
            </form.Field>*/}
        {/* 🔒 Security */}
        {/*<form.Field name="checkSecurity">
              {(field) => (
                <CustomCheckbox
                  checked={field.state.value}
                  disabled
                  handleChange={field.handleChange}
                  name="checkSecurity"
                >
                  Sécurité
                </CustomCheckbox>
              )}
            </form.Field>*/}
        {/* ⚡ Performance */}
        {/*<form.Field name="checkPerformance">
              {(field) => (
                <CustomCheckbox
                  checked={field.state.value}
                  disabled
                  handleChange={field.handleChange}
                  name="checkPerformance"
                >
                  Performance
                </CustomCheckbox>
              )}
            </form.Field>
          </div>*/}
        <div className="mt-auto space-y-4">
          {/* 🆕 Submit */}
          <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className="w-full font-semibold"
                disabled={isSubmitting || currentCrawlRunning}
                loading={isSubmitting}
                size="lg"
                type="submit"
                variant="default"
              >
                {currentCrawlRunning
                  ? "Exploration en cours..."
                  : "Lancer une exploration"}
              </Button>
            )}
          </crawlForm.Subscribe>
          {/* 🗑️ Delete all crawls */}
          <DeleteCrawlsButton />
        </div>
      </form>
    </div>
  );
}

// --------------------------------------------
function useCrawlForm({
  selectedProspect,
  setSelectedProspect,
}: {
  selectedProspect: SelectedProspect;
  setSelectedProspect: (prospect: SelectedProspect) => void;
}) {
  const {
    upsertCrawlMutate,
    upsertCrawlIsError,
    upsertCrawlError,
    upsertCrawlIsSuccess,
  } = useCrawlContext();

  const form = useForm({
    defaultValues: {
      checkAccessibility: true,
      checkPerformance: false,
      checkSecurity: false,
      concurrency: DEFAULT_CONCURRENCY,
      maxDepth: DEFAULT_DEPTH,
      maxPages: DEFAULT_PAGES_CRAWLED,
      search: "",
      useLocalScreenshots: true,
    },
    onSubmit: async ({
      value: { search, maxDepth, maxPages, useLocalScreenshots, concurrency },
    }) => {
      // Update prospect website if URL was modified
      if (selectedProspect && search !== selectedProspect.originalWebsite) {
        const result = await updateProspectWebsite({
          prospectId: selectedProspect.id,
          website: search,
        });
        if (!result.success) {
          toast("Impossible de mettre à jour le site du prospect", {
            description: result.error,
            icon: "⚠️",
            position: "bottom-right",
          });
        }
      }

      upsertCrawlMutate({
        concurrency,
        maxDepth,
        maxPages,
        prospectId: selectedProspect?.id,
        url: search,
        useLocalScreenshots,
      });
    },
  });

  // ✅🍞 Toast success
  useEffect(() => {
    if (upsertCrawlIsSuccess) {
      form.setFieldValue("search", "");
      setSelectedProspect(null);
      toast("Demande de crawl envoyée !", {
        icon: "✅",
        position: "bottom-right",
      });
    }
  }, [upsertCrawlIsSuccess, form, setSelectedProspect]);

  // ⛔🍞 Toast error
  useEffect(() => {
    if (upsertCrawlIsError) {
      console.error(upsertCrawlError);
      toast("Une erreur est survenue lors du crawl du site", {
        description: upsertCrawlError,
        icon: "❌",
        position: "bottom-right",
      });
    }
  }, [upsertCrawlIsError, upsertCrawlError]);

  return form;
}

// --------------------------------------------
function isWebsiteUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// --------------------------------------------
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

// --------------------------------------------
function CustomCheckbox({
  checked,
  handleChange,
  name,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  checked: boolean;
  handleChange: (value: boolean) => void;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-x-2">
      <Checkbox
        checked={checked}
        className="cursor-pointer"
        id={name}
        name={name}
        onCheckedChange={() => handleChange(!checked)}
        {...props}
      />
      <Label className="mb-0 cursor-pointer" htmlFor={name}>
        {children}
      </Label>
    </div>
  );
}

// --------------------------------------------
function getProspectPlaceholder(isLoading: boolean, count: number): string {
  if (isLoading) return "Chargement...";
  if (count > 0) return "Choisir un prospect...";
  return "Aucun prospect disponible";
}
