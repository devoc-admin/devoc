"use client";
import { isValidMapsUrl, isValidUrlFormat } from "@dev-oc/utils/url";
import { useForm } from "@tanstack/react-form";
import { LoaderIcon, PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { useEffect, useState } from "react";
import { isValidWebsite } from "@/actions/validation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../prospects-context";
import { EditorCombobox } from "../editor-combobox";
import { PROSPECT_TYPES, ProspectTypeBadge } from "./prospect-type-button";

export function EditProspectButton({ prospect }: { prospect: Prospect }) {
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
                      field.handleChange(newValue as Prospect["type"])
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent align="start" className="max-h-64">
                      <SelectGroup>
                        {(
                          Object.keys(PROSPECT_TYPES) as Prospect["type"][]
                        ).map((type) => (
                          <SelectItem key={type} value={type}>
                            <ProspectTypeBadge type={type} />
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
            {/* 📅 Date de mise en ligne du site (tous types) */}
            <form.Field name="siteLaunchedAt">
              {(field) => (
                <div className="col-span-2">
                  <Label>Date de mise en ligne du site (optionnel)</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    type="date"
                    value={field.state.value}
                  />
                </div>
              )}
            </form.Field>
            {/* 🛠️ Éditeur du site (combobox liste + saisie libre) */}
            <form.Field name="siteEditor">
              {(field) => (
                <div>
                  <Label>Éditeur du site (optionnel)</Label>
                  <EditorCombobox
                    onCommit={(next) => field.handleChange(next)}
                    value={field.state.value}
                  />
                </div>
              )}
            </form.Field>
            {/* 🔗 URL de l'éditeur */}
            <form.Field
              name="siteEditorUrl"
              validators={{
                onSubmit: ({ value }) => {
                  if (value.trim() && !isValidUrlFormat(value))
                    return "L'URL n'est pas valide";
                },
              }}
            >
              {(field) => (
                <div>
                  <Label>URL de l'éditeur (optionnel)</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="https://…"
                    type="url"
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
            {/* ♿ Paramètres d'accessibilité */}
            <form.Field name="hasAccessibilitySettings">
              {(field) => (
                <div>
                  <Label>Paramètres d'accessibilité</Label>
                  <Select
                    onValueChange={(newValue) =>
                      field.handleChange(newValue as "unknown" | "yes" | "no")
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Non renseigné" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectGroup>
                        <SelectItem value="unknown">Non renseigné</SelectItem>
                        <SelectItem value="yes">Oui</SelectItem>
                        <SelectItem value="no">Non</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
            {/* 👥 Nombre d'habitants (uniquement pour les communes) */}
            <form.Subscribe selector={(state) => state.values.type}>
              {(currentType) =>
                currentType === "city" ? (
                  <form.Field
                    name="inhabitants"
                    validators={{
                      onSubmit: ({ value }) => {
                        const normalized = value.replace(/\s+/g, "");
                        if (!normalized) return;
                        const num = Number.parseInt(normalized, 10);
                        if (
                          !Number.isInteger(num) ||
                          num < 0 ||
                          String(num) !== normalized
                        )
                          return "Nombre d'habitants invalide";
                      },
                    }}
                  >
                    {(field) => (
                      <div className="col-span-2">
                        <Label>Nombre d'habitants (optionnel)</Label>
                        <Input
                          className="h-10"
                          inputMode="numeric"
                          name={field.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            field.handleChange(e.target.value)
                          }
                          placeholder="ex : 12450"
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
                ) : null
              }
            </form.Subscribe>
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
      hasAccessibilitySettings: hasAccessibilityToFormValue(
        prospect.hasAccessibilitySettings
      ),
      inhabitants: prospect.inhabitants?.toString() ?? "",
      latitude: prospect.latitude ?? "",
      location: prospect.location ?? "",
      longitude: prospect.longitude ?? "",
      name: prospect.name ?? "",
      siteEditor: prospect.siteEditor ?? "",
      siteEditorUrl: prospect.siteEditorUrl ?? "",
      siteLaunchedAt: prospect.siteLaunchedAt ?? "",
      type: prospect.type as Prospect["type"],
      website: prospect.website ?? "",
    },
    onSubmit: ({ value }) => {
      const inhabitantsRaw = value.inhabitants.replace(/\s+/g, "");
      let inhabitants: number | null = null;
      if (value.type === "city" && inhabitantsRaw) {
        inhabitants = Number.parseInt(inhabitantsRaw, 10);
      }
      const siteLaunchedAt = value.siteLaunchedAt.trim() || null;
      const siteEditor = value.siteEditor.trim() || null;
      const siteEditorUrl = value.siteEditorUrl.trim() || null;
      let hasAccessibilitySettings: boolean | null = null;
      if (value.hasAccessibilitySettings === "yes") {
        hasAccessibilitySettings = true;
      } else if (value.hasAccessibilitySettings === "no") {
        hasAccessibilitySettings = false;
      }
      editProspectMutate({
        hasAccessibilitySettings,
        id: prospect.id,
        inhabitants,
        latitude: value.latitude || undefined,
        location: value.location,
        longitude: value.longitude || undefined,
        name: value.name,
        siteEditor,
        siteEditorUrl,
        siteLaunchedAt,
        type: value.type,
        website: value.website,
      });
    },
  });

  return form;
}

function hasAccessibilityToFormValue(
  value: boolean | null
): "unknown" | "yes" | "no" {
  if (value === true) return "yes";
  if (value === false) return "no";
  return "unknown";
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
