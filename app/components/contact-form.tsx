/** biome-ignore-all lint/correctness/noChildrenProp: tanstack form requires this pattern */
"use client";

import { useForm } from "@tanstack/react-form";
import { SendIcon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const labelClass = cn("text-base", "xs:text-lg");

const inputClass = cn(
  "text-base!",
  "bg-zinc-950 text-primary-foreground sm:text-lg!"
);

function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.name) {
          return "Merci de renseigner un nom";
        }

        if (!value.email) {
          return "Merci de renseigner un email";
        }

        if (!value.message || value.message.length < 10) {
          return "Merci d'expliquer brièvement votre projet pour que nous puissions vous aider au mieux 🤝";
        }

        return false;
      },
    },
  });
  return (
    <form
      className="@container grid grid-cols-2 gap-x-4 gap-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* 🧑 Nom */}
      <form.Field
        children={(field) => (
          <div className={cn("col-span-2", "@md:col-span-1")}>
            <Label className={labelClass} htmlFor="name">
              Nom *
            </Label>
            <Input
              className={cn("col-span-1", inputClass)}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Nom"
              type="text"
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="name"
      />

      {/* 📧 Email */}
      <form.Field
        children={(field) => (
          <div className={cn("col-span-2", "@md:col-span-1")}>
            <Label className={labelClass} htmlFor="email">
              Email *
            </Label>
            <Input
              className={cn("col-span-1", inputClass)}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Email"
              type="email"
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="email"
      />

      {/* 🏢 Entreprise */}
      <form.Field
        children={(field) => (
          <div className="col-span-2">
            <Label className={labelClass} htmlFor="email">
              Organisation
            </Label>
            <Input
              className={cn("col-span-2", inputClass)}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Nom de votre organisation"
              type="text"
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="company"
      />

      {/* 📝 Message */}
      <form.Field
        children={(field) => (
          <div className="col-span-2">
            <Label className={labelClass} htmlFor="message">
              Message *
            </Label>
            <Textarea
              className={cn("h-36", inputClass)}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Décrivez votre projet, vos besoins, vos objectifs etc."
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="message"
      />
      {/* ❌ Erreur */}
      <form.Subscribe
        children={(state) =>
          state.errors.length > 0 && (
            <div className="col-span-2 flex items-center gap-2 text-primary">
              <TriangleAlertIcon size={20} />
              <span>{state.errors[0]}</span>
            </div>
          )
        }
        selector={(state) => state}
      />

      {/* 🔔 Envoi du message */}
      <Button
        className={cn(
          "col-span-2 cursor-pointer gap-3 rounded-md bg-primary/90 py-6 font-semibold transition-colors hover:bg-primary",
          "text-base",
          "sm:text-lg"
        )}
        type="submit"
      >
        <SendIcon size={20} />
        <span>Envoyer le message</span>
      </Button>
    </form>
  );
}

export default ContactForm;
