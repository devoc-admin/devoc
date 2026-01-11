"use client";
import { useForm } from "@tanstack/react-form";
import { PlusIcon, UserRoundPlusIcon } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { useEffect, useState } from "react";
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
    <Dialog open={isOpen}>
      <VisuallyHidden.Root>
        <DialogTitle>Ajouter un prospect</DialogTitle>
      </VisuallyHidden.Root>
      <form>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)} variant="default">
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
              <form.Field name="name">
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
              <form.Field name="website">
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
                  </div>
                )}
              </form.Field>
              {/* 📌 Location */}
              <form.Field name="location">
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
                  </div>
                )}
              </form.Field>
            </div>
            <Button
              className="mx-auto flex items-center gap-x-2"
              onClick={form.handleSubmit}
              size="lg"
            >
              <UserRoundPlusIcon className="shrink-0" size={22} />
              <span>Ajouter</span>
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

type Prospect = {
  location: string;
  name: string;
  type: ProspectType;
  website: string;
};

const defaultProspect: Prospect = {
  location: "",
  name: "",
  type: "city",
  website: "",
};

function useProspectForm() {
  const { addProspectMutate } = useProspectsContext();
  const form = useForm({
    defaultValues: defaultProspect,
    onSubmit: ({ value }) => {
      addProspectMutate(value);
    },
  });

  return form;
}

function CustomInput({ ...props }) {
  return <Input className="h-10" {...props} />;
}
