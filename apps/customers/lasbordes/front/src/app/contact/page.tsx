"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      name: formData.get("name") as string,
      subject: formData.get("subject") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-4xl text-foreground">
            Nous contacter
          </h1>
          <p className="text-lg text-muted-foreground">
            Une question ? Une demande ? N'hésitez pas à nous contacter
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
                <CardDescription>
                  Vous pouvez nous joindre par ces moyens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-primary"
                  />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      className="text-muted-foreground hover:text-primary"
                      href="mailto:mairie@lasbordes11400.fr"
                    >
                      mairie@lasbordes11400.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-primary"
                  />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a
                      className="text-muted-foreground hover:text-primary"
                      href="tel:0468XXXXXX"
                    >
                      04 68 XX XX XX
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-primary"
                  />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">
                      Place de la Mairie
                      <br />
                      11400 Lasbordes
                      <br />
                      France
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horaires d'ouverture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Lundi</span>
                  <span className="text-muted-foreground">09:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Mardi</span>
                  <span className="text-muted-foreground">09:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Mercredi</span>
                  <span className="text-muted-foreground">Fermé</span>
                </div>
                <div className="flex justify-between">
                  <span>Jeudi</span>
                  <span className="text-muted-foreground">14:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Vendredi</span>
                  <span className="text-muted-foreground">09:00 - 12:00</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Formulaire de contact</CardTitle>
              <CardDescription>Envoyez-nous un message</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Honeypot field */}
                <div aria-hidden="true" className="hidden">
                  <input
                    autoComplete="off"
                    name="website"
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    type="text"
                    value={honeypot}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nom complet <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    aria-required="true"
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    aria-required="true"
                    id="email"
                    name="email"
                    placeholder="votre@email.fr"
                    required
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Sujet <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    aria-required="true"
                    id="subject"
                    name="subject"
                    placeholder="L'objet de votre message"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    aria-required="true"
                    id="message"
                    name="message"
                    placeholder="Votre message..."
                    required
                    rows={6}
                  />
                </div>

                {submitStatus === "success" && (
                  <div
                    className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-900"
                    role="alert"
                  >
                    Votre message a été envoyé avec succès ! Nous vous
                    répondrons dans les plus brefs délais.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-900"
                    role="alert"
                  >
                    Une erreur s'est produite. Veuillez réessayer plus tard.
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
