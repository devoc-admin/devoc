"use client";
import { isValidUrlFormat } from "@dev-oc/utils/url";
import { useForm } from "@tanstack/react-form";
import { PlusIcon, UserRoundPlusIcon, XIcon } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { useCallback, useEffect, useState } from "react";
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
import type { Prospect } from "@/lib/db/schema";
import { useProspectsContext } from "../../prospects-context";
import { PROSPECT_TYPES } from "../buttons/prospect-type-button";
import { DpoCombobox } from "../combobox/dpo/dpo-combobox";
import { EditorCombobox } from "../combobox/editor/editor-combobox";
import {
  type PlaceResult,
  PlacesAutocomplete,
} from "../map/places-autocomplete";

// Infer prospect type from Google Places types
function inferProspectType(
  placeTypes: string[],
  placeName: string
): Prospect["type"] {
  const name = placeName.toLowerCase();

  // Check for EPCI keywords in name
  if (
    name.includes("communauté") ||
    name.includes("métropole") ||
    name.includes("agglomération") ||
    name.includes("intercommunal")
  ) {
    return "epci";
  }

  // Check for territorial collectivity keywords (région, département)
  if (
    name.includes("conseil départemental") ||
    name.includes("conseil régional") ||
    name.includes("conseil général") ||
    name.includes("région ") ||
    name.includes("département ")
  ) {
    return "territorial_collectivity";
  }

  // Check for administration types
  const adminTypes = [
    "local_government_office",
    "city_hall",
    "courthouse",
    "government",
    "town_hall",
  ];
  if (placeTypes.some((t) => adminTypes.includes(t))) {
    return "administration";
  }

  // Check for administration keywords in name
  if (
    name.includes("mairie") ||
    name.includes("hôtel de ville") ||
    name.includes("préfecture") ||
    name.includes("sous-préfecture")
  ) {
    return "administration";
  }

  // Check for city/locality types
  const cityTypes = [
    "locality",
    "sublocality",
    "administrative_area_level_2",
    "postal_town",
  ];
  if (placeTypes.some((t) => cityTypes.includes(t))) {
    return "city";
  }

  return "other";
}

export function ProspectAddDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const form = useProspectForm();
  const { isAddedProspect } = useProspectsContext();

  useEffect(() => {
    if (isAddedProspect) {
      setIsOpen(false);
      form.reset();
      setFormKey((prev) => prev + 1);
    }
  }, [isAddedProspect, form]);

  const handlePlaceSelect = useCallback(
    (place: PlaceResult) => {
      // Auto-fill all fields from place selection
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
    <Dialog onOpenChange={(newOpen) => setIsOpen(newOpen)} open={isOpen}>
      <VisuallyHidden.Root>
        <DialogTitle>Ajouter un prospect</DialogTitle>
      </VisuallyHidden.Root>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">
            <PlusIcon size={18} />
            <span>Ajouter un prospect</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="space-y-4">
            <h3 className="text-center font-bold font-kanit text-3xl">
              Ajouter un prospect
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-4">
              {/* 📌 Location with Google Places Autocomplete - PRIMARY FIELD */}
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
                      <ErrorMessage>
                        {field.state.meta.errors.join(", ")}
                      </ErrorMessage>
                    )}
                  </div>
                )}
              </form.Field>
              {/* 🔠 Name (auto-filled, editable) */}
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
                    <CustomInput
                      name={field.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      placeholder="Auto-rempli"
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
              {/* 🟡 Type (auto-inferred, editable) */}
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
                          {(
                            Object.keys(PROSPECT_TYPES) as Prospect["type"][]
                          ).map((type) => (
                            <SelectItem key={type} value={type}>
                              {PROSPECT_TYPES[type]}
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
                    <CustomInput
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
                    <CustomInput
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
                          <CustomInput
                            inputMode="numeric"
                            name={field.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => field.handleChange(e.target.value)}
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
                    <CustomInput
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
                            <CustomInput
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
                  <UserRoundPlusIcon className="shrink-0" size={22} />
                  <span>Ajouter</span>
                </Button>
              )}
            </form.Subscribe>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

type ProspectFormData = {
  location: string;
  name: string;
  type: Prospect["type"];
  website: string;
  latitude: string;
  longitude: string;
  inhabitants: string;
  distanceFrom: string;
  siteLaunchYear: string;
  siteEditor: string;
  hasAccessibilitySettings: "unknown" | "yes" | "no";
  usesPanneauPocket: "unknown" | "yes" | "no";
  hasDpo: "unknown" | "yes" | "no";
  dpoName: string;
  dpoUrl: string;
};

const defaultProspect: ProspectFormData = {
  distanceFrom: "",
  dpoName: "",
  dpoUrl: "",
  hasAccessibilitySettings: "unknown",
  hasDpo: "unknown",
  inhabitants: "",
  latitude: "",
  location: "",
  longitude: "",
  name: "",
  siteEditor: "",
  siteLaunchYear: "",
  type: "city",
  usesPanneauPocket: "unknown",
  website: "",
};

function useProspectForm() {
  const { addProspectMutate } = useProspectsContext();
  const form = useForm({
    defaultValues: defaultProspect,
    onSubmit: ({ value }) => {
      const hasWebsite = value.website.trim() !== "";
      const inhabitantsRaw = value.inhabitants.replace(/\s+/g, "");
      const inhabitants =
        value.type === "city" && inhabitantsRaw
          ? Number.parseInt(inhabitantsRaw, 10)
          : undefined;
      const siteLaunchYearRaw = value.siteLaunchYear.replace(/\s+/g, "");
      const siteLaunchYear = siteLaunchYearRaw
        ? Number.parseInt(siteLaunchYearRaw, 10)
        : null;
      const siteEditor = value.siteEditor.trim() || null;
      const distanceFromRaw = value.distanceFrom.replace(/\s+/g, "");
      const distanceFrom = distanceFromRaw
        ? Number.parseInt(distanceFromRaw, 10)
        : undefined;
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
      addProspectMutate({
        ...value,
        distanceFrom,
        dpoName,
        dpoUrl,
        hasAccessibilitySettings,
        hasDpo,
        inhabitants,
        latitude: value.latitude || undefined,
        longitude: value.longitude || undefined,
        siteEditor,
        siteLaunchYear,
        usesPanneauPocket,
        // Si pas de site web, hasSite = false et estimatedOpportunity = "strong"
        ...(hasWebsite
          ? {}
          : { estimatedOpportunity: "strong", hasSite: false }),
      });
    },
  });

  return form;
}

function CustomInput({ ...props }) {
  return <Input className="h-10" {...props} />;
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
