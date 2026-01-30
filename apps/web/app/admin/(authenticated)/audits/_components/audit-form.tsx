"use client";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { isValidWebsite } from "@/actions/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useAuditsContext } from "../audits-context";

export function AuditForm() {
  const {
    createAuditMutate,
    createAuditIsPending,
    createAuditIsSuccess,
    lockActions,
  } = useAuditsContext();

  const form = useForm({
    defaultValues: {
      name: "",
      type: "rgaa" as "rgaa" | "wcag",
      url: "",
    },
    onSubmit: ({ value: { url, name, type } }) => {
      createAuditMutate({
        name: name || undefined,
        type,
        url,
      });
    },
  });

  // ✅ Reset form on success
  useEffect(() => {
    if (createAuditIsSuccess) {
      form.reset();
    }
  }, [createAuditIsSuccess, form]);

  return (
    <div className="rounded-md bg-sidebar p-6">
      <form
        className="mx-auto flex h-full max-w-75 flex-col items-center justify-center gap-y-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* 🌐 URL */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <form.Field
              name="url"
              validators={{
                onSubmit: ({ value: url }) => {
                  if (!url) return "Veuillez saisir une URL";
                  if (!isWebsiteUrl(url))
                    return "La saisie n'est pas une URL valide";
                  return;
                },
                onSubmitAsync: async ({ value: url }) => {
                  const result = await isValidWebsite(url);
                  if (!result) return "Ce site web n'existe pas";
                },
              }}
            >
              {(field) => (
                <div className="flex w-full flex-col gap-y-1">
                  <Label className="font-kanit text-lg">URL du site *</Label>
                  <Input
                    className="h-10"
                    disabled={isSubmitting || lockActions}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com"
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
          )}
        </form.Subscribe>

        {/* 📝 Name (optional) */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <form.Field name="name">
              {(field) => (
                <div className="flex w-full flex-col gap-y-1">
                  <Label className="font-kanit text-lg">
                    Nom de l'audit (optionnel)
                  </Label>
                  <Input
                    className="h-10"
                    disabled={isSubmitting || lockActions}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Mon audit..."
                    value={field.state.value}
                  />
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>

        {/* 🏷️ Type (RGAA / WCAG) */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <form.Field name="type">
              {(field) => (
                <div className="flex w-full flex-col gap-y-2">
                  <Label className="font-kanit text-lg">
                    Type de référentiel *
                  </Label>
                  <RadioGroup
                    className="flex gap-x-4"
                    disabled={isSubmitting || lockActions}
                    onValueChange={(value) =>
                      field.handleChange(value as "rgaa" | "wcag")
                    }
                    value={field.state.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="rgaa" value="rgaa" />
                      <Label
                        className={cn(
                          "cursor-pointer",
                          field.state.value === "rgaa" && "text-blue-400"
                        )}
                        htmlFor="rgaa"
                      >
                        RGAA
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="wcag" value="wcag" />
                      <Label
                        className={cn(
                          "cursor-pointer",
                          field.state.value === "wcag" && "text-purple-400"
                        )}
                        htmlFor="wcag"
                      >
                        WCAG
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>

        {/* 🆕 Submit */}
        <div className="mt-auto w-full pt-4">
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className="w-full font-semibold"
                disabled={isSubmitting || lockActions}
                loading={createAuditIsPending}
                size="lg"
                type="submit"
                variant="default"
              >
                Créer un audit
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
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
