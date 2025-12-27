"use client";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidWebsite, upsertAudit } from "../actions";

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
      const result = await upsertAudit({ url: search });

      if (result.success) {
        toast("Le site a bien été ajouté !", {
          icon: "✅",
          position: "bottom-right",
        });
        form.reset();
      }
      return;
    },
  });

  return form;
}
// --------------------------------------------

export function SearchForm() {
  const form = useSearchForm();
  return (
    <div className="rounded-md bg-sidebar p-8">
      <div className="mx-auto flex max-w-150 flex-col items-center justify-center gap-y-4">
        {/* 🆎 Title */}
        <h2 className="font-kanit font-semibold text-4xl">Analyser un site</h2>
        {/* 📝 Form */}
        <form
          className="flex w-full flex-col gap-y-2 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* 🔍 Search */}
          <form.Field
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
                <CustomCheckbox
                  checked={field.state.value}
                  handleChange={field.handleChange}
                  name="checkAccessibility"
                >
                  Accessibilité
                </CustomCheckbox>
              )}
            </form.Field>
            {/* 🔒 Security */}
            <form.Field name="checkSecurity">
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
            </form.Field>
            {/* ⚡ Performance */}
            <form.Field name="checkPerformance">
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
    <div className="flex gap-x-2">
      <Checkbox
        checked={checked}
        className="cursor-pointer"
        id={name}
        name={name}
        onCheckedChange={() => handleChange(!checked)}
        {...props}
      />
      <Label className="cursor-pointer" htmlFor={name}>
        {children}
      </Label>
    </div>
  );
}
