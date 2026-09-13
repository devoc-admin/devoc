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
import type { ProspectResult } from "../../prospects-actions";
import { useProspectsContext } from "../../prospects-context";
import { isValidEmailFormat, normalizeReferent } from "../../referent-utils";
import { DpoCombobox } from "../combobox/dpo/dpo-combobox";
import { EditorCombobox } from "../combobox/editor/editor-combobox";
import { PROSPECT_TYPES, ProspectTypeBadge } from "./prospect-type-button";

export function EditProspectButton({ prospect }: { prospect: ProspectResult }) {
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
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 sm:max-w-xl">
        <h3 className="shrink-0 text-center font-bold font-kanit text-3xl">
          Modifier le prospect
        </h3>
        <div className="flex-1 space-y-6 overflow-y-auto py-4 pr-1">
          <FormSection title="Identité">
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
            {/* 🌐 Website (optionnel) */}
            <form.Field
              name="website"
              validators={{
                onSubmit: ({ value }) => {
                  if (value.trim() && !isValidUrlFormat(value))
                    return "L'URL n'est pas valide";
                },
                onSubmitAsync: async ({ value }) => {
                  if (!value.trim()) return;
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
          </FormSection>
          <FormSection title="Site internet">
            {/* 📅 Année de mise en ligne du site (tous types) */}
            <form.Field
              name="siteLaunchYear"
              validators={{
                onSubmit: ({ value }) => {
                  const normalized = value.replace(/\s+/g, "");
                  if (!normalized) return;
                  const num = Number.parseInt(normalized, 10);
                  if (
                    !Number.isInteger(num) ||
                    num < 1900 ||
                    num > 2100 ||
                    String(num) !== normalized
                  )
                    return "Année invalide";
                },
              }}
            >
              {(field) => (
                <div className="col-span-2">
                  <Label>Année de mise en ligne du site</Label>
                  <Input
                    className="h-10"
                    inputMode="numeric"
                    max={2100}
                    min={1900}
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="ex : 2018"
                    type="number"
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
            {/* 🛠️ Éditeur du site (combobox liste + saisie libre) */}
            <form.Field name="siteEditor">
              {(field) => (
                <div>
                  <Label>Éditeur du site</Label>
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
                  <Label>URL de l'éditeur</Label>
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
                      <SelectValue placeholder="N.r." />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectGroup>
                        <SelectItem value="unknown">N.r.</SelectItem>
                        <SelectItem value="yes">Oui</SelectItem>
                        <SelectItem value="no">Non</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </FormSection>
          <FormSection title="Localisation & population">
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
                      <div>
                        <Label>Nombre d'habitants</Label>
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
            {/* 📏 Distance depuis mon adresse */}
            <form.Field
              name="distanceFrom"
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
                    return "Distance invalide";
                },
              }}
            >
              {(field) => (
                <div>
                  <Label>Distance depuis mon adresse</Label>
                  <Input
                    className="h-10"
                    inputMode="numeric"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="ex : 42"
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
            {/* 📱 PanneauPocket (uniquement pour les communes) */}
            <form.Subscribe selector={(state) => state.values.type}>
              {(currentType) =>
                currentType === "city" ? (
                  <form.Field name="usesPanneauPocket">
                    {(field) => (
                      <div>
                        <Label>PanneauPocket</Label>
                        <Select
                          onValueChange={(newValue) =>
                            field.handleChange(
                              newValue as "unknown" | "yes" | "no"
                            )
                          }
                          value={field.state.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="N.r." />
                          </SelectTrigger>
                          <SelectContent align="start">
                            <SelectGroup>
                              <SelectItem value="unknown">N.r.</SelectItem>
                              <SelectItem value="yes">Oui</SelectItem>
                              <SelectItem value="no">Non</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </form.Field>
                ) : null
              }
            </form.Subscribe>
          </FormSection>
          <FormSection title="Conformité RGPD">
            {/* 🛡️ DPO (tristate + combobox + URL si Oui) */}
            <form.Field name="hasDpo">
              {(field) => (
                <div className="col-span-2">
                  <Label>DPO</Label>
                  <Select
                    onValueChange={(newValue) =>
                      field.handleChange(newValue as "unknown" | "yes" | "no")
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="N.r." />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectGroup>
                        <SelectItem value="unknown">N.r.</SelectItem>
                        <SelectItem value="yes">Oui</SelectItem>
                        <SelectItem value="no">Non</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
            <form.Subscribe selector={(state) => state.values.hasDpo}>
              {(currentHasDpo) =>
                currentHasDpo === "yes" ? (
                  <>
                    <form.Field name="dpoName">
                      {(field) => (
                        <div>
                          <Label>Nom du DPO</Label>
                          <DpoCombobox
                            onCommit={(next) => field.handleChange(next)}
                            value={field.state.value}
                          />
                        </div>
                      )}
                    </form.Field>
                    <form.Field
                      name="dpoUrl"
                      validators={{
                        onSubmit: ({ value }) => {
                          if (value.trim() && !isValidUrlFormat(value))
                            return "L'URL n'est pas valide";
                        },
                      }}
                    >
                      {(field) => (
                        <div>
                          <Label>URL du DPO</Label>
                          <Input
                            className="h-10"
                            name={field.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => field.handleChange(e.target.value)}
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
                  </>
                ) : null
              }
            </form.Subscribe>
          </FormSection>
          <FormSection title="Référent">
            {/* 🧑‍💼 Référent (nom + contacts optionnels) */}
            <form.Field name="referentName">
              {(field) => (
                <div className="col-span-2">
                  <Label>Ref.</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Nom du référent"
                    value={field.state.value}
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="referentEmail"
              validators={{
                onSubmit: ({ value }) => {
                  if (value.trim() && !isValidEmailFormat(value))
                    return "L'email n'est pas valide";
                },
              }}
            >
              {(field) => (
                <div>
                  <Label>Email du référent</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="referent@exemple.fr"
                    type="email"
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
            <form.Field name="referentPhone">
              {(field) => (
                <div>
                  <Label>Téléphone du référent</Label>
                  <Input
                    className="h-10"
                    inputMode="tel"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="06 12 34 56 78"
                    type="tel"
                    value={field.state.value}
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="referentLinkedin"
              validators={{
                onSubmit: ({ value }) => {
                  if (value.trim() && !isValidUrlFormat(value))
                    return "L'URL n'est pas valide";
                },
              }}
            >
              {(field) => (
                <div className="col-span-2">
                  <Label>LinkedIn du référent</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="https://www.linkedin.com/in/…"
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
          </FormSection>
          {/* 🗺️ Coordinates (optional) */}
          <FormSection title="Coordonnées">
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
                  <Label>Latitude</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="ex : 48.8566"
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
                  <Label>Longitude</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="ex : 2.3522"
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
          </FormSection>
        </div>
        <div className="shrink-0 border-border border-t pt-4">
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

function useEditProspectForm(prospect: ProspectResult) {
  const { editProspectMutate } = useProspectsContext();
  const form = useForm({
    defaultValues: {
      distanceFrom: prospect.distanceFrom?.toString() ?? "",
      dpoName: prospect.dpoName ?? "",
      dpoUrl: prospect.dpoUrl ?? "",
      hasAccessibilitySettings: hasAccessibilityToFormValue(
        prospect.hasAccessibilitySettings
      ),
      hasDpo: panneauPocketToFormValue(prospect.hasDpo),
      inhabitants: prospect.inhabitants?.toString() ?? "",
      latitude: prospect.latitude ?? "",
      location: prospect.location ?? "",
      longitude: prospect.longitude ?? "",
      name: prospect.name ?? "",
      referentEmail: prospect.referentEmail ?? "",
      referentLinkedin: prospect.referentLinkedin ?? "",
      referentName: prospect.referentName ?? "",
      referentPhone: prospect.referentPhone ?? "",
      siteEditor: prospect.siteEditor ?? "",
      siteEditorUrl: prospect.siteEditorUrl ?? "",
      siteLaunchYear: prospect.siteLaunchYear?.toString() ?? "",
      type: prospect.type as Prospect["type"],
      usesPanneauPocket: panneauPocketToFormValue(prospect.usesPanneauPocket),
      website: prospect.website ?? "",
    },
    onSubmit: ({ value }) => {
      const inhabitantsRaw = value.inhabitants.replace(/\s+/g, "");
      let inhabitants: number | null = null;
      if (value.type === "city" && inhabitantsRaw) {
        inhabitants = Number.parseInt(inhabitantsRaw, 10);
      }
      const siteLaunchYearRaw = value.siteLaunchYear.replace(/\s+/g, "");
      const siteLaunchYear = siteLaunchYearRaw
        ? Number.parseInt(siteLaunchYearRaw, 10)
        : null;
      const siteEditor = value.siteEditor.trim() || null;
      const siteEditorUrl = value.siteEditorUrl.trim() || null;
      const distanceFromRaw = value.distanceFrom.replace(/\s+/g, "");
      const distanceFrom = distanceFromRaw
        ? Number.parseInt(distanceFromRaw, 10)
        : null;
      const hasAccessibilitySettings = formTristateToBoolean(
        value.hasAccessibilitySettings
      );
      const usesPanneauPocket =
        value.type === "city"
          ? formTristateToBoolean(value.usesPanneauPocket)
          : null;
      const hasDpo = formTristateToBoolean(value.hasDpo);
      const dpoName = hasDpo === true ? value.dpoName.trim() || null : null;
      const dpoUrl = hasDpo === true ? value.dpoUrl.trim() || null : null;
      editProspectMutate({
        ...normalizeReferent(value),
        distanceFrom,
        dpoName,
        dpoUrl,
        hasAccessibilitySettings,
        hasDpo,
        id: prospect.id,
        inhabitants,
        latitude: value.latitude || undefined,
        location: value.location,
        longitude: value.longitude || undefined,
        name: value.name,
        siteEditor,
        siteEditorUrl,
        siteLaunchYear,
        type: value.type,
        usesPanneauPocket,
        website: value.website,
      });
    },
  });

  return form;
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h4 className="font-kanit font-semibold text-foreground text-sm uppercase tracking-wide">
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">{children}</div>
    </section>
  );
}

function hasAccessibilityToFormValue(
  value: boolean | null
): "unknown" | "yes" | "no" {
  if (value === true) return "yes";
  if (value === false) return "no";
  return "unknown";
}

function panneauPocketToFormValue(
  value: boolean | null
): "unknown" | "yes" | "no" {
  if (value === true) return "yes";
  if (value === false) return "no";
  return "unknown";
}

function formTristateToBoolean(
  value: "unknown" | "yes" | "no"
): boolean | null {
  if (value === "yes") return true;
  if (value === "no") return false;
  return null;
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
