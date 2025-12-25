"use client";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function Searchbar() {
  const form = useSearchForm();
  return (
    <div className="rounded-md bg-sidebar p-8">
      <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-y-4">
        <h2 className="font-kanit text-4xl">Rechercher un site</h2>
        <form
          className="flex w-full flex-col gap-y-2 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="search"
            validators={{
              onSubmit: ({ value: search }) => {
                if (!search) return "Veuillez saisir une URL";
                if (!isWebsite(search))
                  return "La saisie n'est pas une URL valide";
                console.log("is ok!", search);
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
                  <div
                    className="flex items-center gap-x-0.5 font-normal text-red-500 text-sm"
                    role="alert"
                  >
                    <XIcon size={16} />
                    {field.state.meta.errors.join(", ")}
                  </div>
                )}
              </div>
            )}
          </form.Field>
          <Button type="submit" variant="default">
            Lancer un audit
          </Button>
        </form>
      </div>
    </div>
  );
}

// --------------------------------------------
function useSearchForm() {
  const form = useForm({
    defaultValues: {
      search: "",
    },
    onSubmit: async (values) => {
      const { search } = values.value;
      if (!search) return "Veuillez saisir une URL";
      if (!isWebsite(search)) return "La saisie n'est pas une URL valide";
      console.log("is ok!", search);
    },
  });

  return form;
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
