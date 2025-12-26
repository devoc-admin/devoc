"use client";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertAudit } from "../actions";

function useSearchForm() {
  const form = useForm({
    defaultValues: {
      checkAccessibility: true,
      checkPerformance: false,
      checkSecurity: false,
      search: "",
    },
    onSubmit: async (values) => {
      const { search } = values.value;
      if (!search) return "Veuillez saisir une URL valide";
      if (!isWebsite(search)) return "La saisie n'est pas une URL valide";
      console.log("will upsert!");
      await upsertAudit({ url: search });
      return;
    },
  });

  return form;
}
// --------------------------------------------

export function Searchbar() {
  const form = useSearchForm();
  return (
    <div className="rounded-md bg-sidebar p-8">
      <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-y-4">
        {/* 🆎 Title */}
        <h2 className="font-kanit text-4xl">Rechercher un site</h2>
        {/* 📝 Form */}
        <form
          className="flex w-full flex-col gap-y-2 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {/* 🔍 Search */}
          <form.Field
            name="search"
            validators={{
              onSubmit: ({ value: search }) => {
                if (!search) return "Veuillez saisir une URL";
                if (!isWebsite(search))
                  return "La saisie n'est pas une URL valide";
                return;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-y-1">
                <Input
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tester un site..."
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
          {/* ☑️ Checkboxes */}
          <div className="flex items-center justify-center gap-x-6">
            {/* 👁️ A11Y */}
            <form.Field name="checkAccessibility">
              {(field) => (
                <div className="flex gap-x-2">
                  <Checkbox
                    checked={field.state.value}
                    id="checkAccessibility"
                    name="checkAccessibility"
                    onCheckedChange={() =>
                      field.handleChange(!field.state.value)
                    }
                  />
                  <Label htmlFor="checkAccessibility">Accessibilité</Label>
                </div>
              )}
            </form.Field>
            {/* 🔒 Security */}
            <form.Field name="checkSecurity">
              {(field) => (
                <div className="flex gap-x-2">
                  <Checkbox
                    checked={field.state.value}
                    id="checkSecurity"
                    name="checkSecurity"
                    onCheckedChange={() =>
                      field.handleChange(!field.state.value)
                    }
                  />
                  <Label htmlFor="checkSecurity">Sécurité</Label>
                </div>
              )}
            </form.Field>
            {/* ⚡ Performance */}
            <form.Field name="checkPerformance">
              {(field) => (
                <div className="flex gap-x-2">
                  <Checkbox
                    checked={field.state.value}
                    id="checkPerformance"
                    name="checkPerformance"
                    onCheckedChange={() =>
                      field.handleChange(!field.state.value)
                    }
                  />
                  <Label htmlFor="checkPerformance">Performance</Label>
                </div>
              )}
            </form.Field>
          </div>
          {/* 🆕 Submit */}
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                disabled={isSubmitting}
                loading={isSubmitting}
                type="submit"
                variant="default"
              >
                Lancer un audit
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}

// --------------------------------------------
function isWebsite(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
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
