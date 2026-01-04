"use client";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCrawlContext } from "../crawl-context";
import { isValidWebsite } from "../crawl-utils";

const MAX_PAGES_CRAWLED = 100;
const DEFAULT_PAGES_CRAWLED = 50;

const MAX_DEPTH = 10;
const DEFAULT_DEPTH = 3;

export function CrawlForm() {
  const crawlForm = useCrawlForm();
  const { crawlJobId } = useCrawlContext();

  const currentJobRunning = crawlJobId !== undefined && crawlJobId !== null;

  return (
    <div className="rounded-md bg-sidebar p-8">
      <div className="mx-auto flex max-w-150 flex-col items-center justify-center gap-y-4">
        {/* 🆎 Title */}
        <h2 className="font-kanit font-semibold text-4xl">Crawler un site</h2>
        {/* 📝 Form */}
        <form
          className="flex w-full flex-col items-center justify-center gap-y-2 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            crawlForm.handleSubmit();
          }}
        >
          {/* 🔍 Search */}
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
                <Input
                  disabled={currentJobRunning || field.form.state.isSubmitting}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Crawler un site..."
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
          {/* 🔢 Sliders */}
          <div className="flex w-full max-w-[400px] flex-col gap-y-4">
            {/* 🔢 Nb. max de résultats */}
            <crawlForm.Field name="maxPages">
              {(field) => (
                <div>
                  <Label className="font-kanit text-lg">Pages à crawler</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      disabled={
                        currentJobRunning || field.form.state.isSubmitting
                      }
                      max={MAX_PAGES_CRAWLED}
                      min={1}
                      name="maxPages"
                      onValueChange={(values) => field.handleChange(values[0])}
                      step={1}
                      value={[field.state.value]}
                    />
                    <span>{field.state.value}</span>
                  </div>
                </div>
              )}
            </crawlForm.Field>
            {/* 🔢 Profondeur max. */}
            <crawlForm.Field name="maxDepth">
              {(field) => (
                <div>
                  <Label className="font-kanit text-lg">Profondeur max.</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      disabled={
                        currentJobRunning || field.form.state.isSubmitting
                      }
                      max={MAX_DEPTH}
                      min={1}
                      name="maxDepth"
                      onValueChange={(values) => field.handleChange(values[0])}
                      step={1}
                      value={[field.state.value]}
                    />
                    <span>{field.state.value}</span>
                  </div>
                </div>
              )}
            </crawlForm.Field>
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
          {/* 🆕 Submit */}
          <crawlForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                disabled={isSubmitting || currentJobRunning}
                loading={isSubmitting}
                type="submit"
                variant="default"
              >
                {currentJobRunning ? "Crawl en cours..." : "Lancer un crawl"}
              </Button>
            )}
          </crawlForm.Subscribe>
        </form>
      </div>
    </div>
  );
}

// --------------------------------------------
function useCrawlForm() {
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
      maxDepth: DEFAULT_DEPTH,
      maxPages: DEFAULT_PAGES_CRAWLED,
      search: "",
    },
    onSubmit: ({ value: { search, maxDepth, maxPages } }) => {
      upsertCrawlMutate({
        maxDepth,
        maxPages,
        url: search,
      });
    },
  });

  // ✅🍞 Toast success
  useEffect(() => {
    if (upsertCrawlIsSuccess) {
      toast("Demande de crawl envoyée !", {
        icon: "✅",
        position: "bottom-right",
      });
    }
  }, [upsertCrawlIsSuccess]);

  // ⛔🍞 Toast error
  useEffect(() => {
    if (upsertCrawlIsError) {
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
// function CustomCheckbox({
//   checked,
//   handleChange,
//   name,
//   children,
//   ...props
// }: React.ComponentProps<"button"> & {
//   checked: boolean;
//   handleChange: (value: boolean) => void;
//   name: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex gap-x-2">
//       <Checkbox
//         checked={checked}
//         className="cursor-pointer"
//         id={name}
//         name={name}
//         onCheckedChange={() => handleChange(!checked)}
//         {...props}
//       />
//       <Label className="cursor-pointer" htmlFor={name}>
//         {children}
//       </Label>
//     </div>
//   );
// }
