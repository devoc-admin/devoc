"use client";
import { useForm } from "@tanstack/react-form";
import { PlusIcon, UserRoundPlusIcon, XIcon } from "lucide-react";
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
import { isValidMapsUrl, isValidUrlFormat } from "@/utils/valid-url-format";
import { useProspectsContext } from "../prospects-context";
import { PROSPECT_TYPES, type ProspectType } from "../prospects-types";

export function ProspectAdd() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useProspectForm();
  const { isAddedProspect } = useProspectsContext();

  useEffect(() => {
    if (isAddedProspect) {
      setIsOpen(false);
    }
  }, [isAddedProspect]);

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
                          {Object.entries(PROSPECT_TYPES).map(
                            ([type, label]) => (
                              <SelectItem key={type} value={type}>
                                {label}
                              </SelectItem>
                            )
                          )}
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
                    if (!isValidUrlFormat(value))
                      return "L'URL n'est pas valide";
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
              {/* 📌 Location */}
              <form.Field
                name="location"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value.trim()) return "La localisation est requise";
                    if (!isValidUrlFormat(value))
                      return "L'URL n'est pas valide";
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
                        <CustomInput
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
                        <CustomInput
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
  type: ProspectType;
  website: string;
  latitude: string;
  longitude: string;
};

const defaultProspect: ProspectFormData = {
  latitude: "",
  location: "",
  longitude: "",
  name: "",
  type: "city",
  website: "",
};

function useProspectForm() {
  const { addProspectMutate } = useProspectsContext();
  const form = useForm({
    defaultValues: defaultProspect,
    onSubmit: ({ value }) => {
      addProspectMutate({
        ...value,
        latitude: value.latitude || undefined,
        longitude: value.longitude || undefined,
      });
    },
  });

  return form;
}

function CustomInput({ ...props }) {
  return <Input className="h-10" {...props} />;
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
