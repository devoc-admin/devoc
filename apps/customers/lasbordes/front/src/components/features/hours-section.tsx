"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HoursSection() {
  // In production, this would come from CMS
  const openingHours = {
    friday: { close: "12:00", open: "09:00" },
    monday: { close: "12:00", open: "09:00" },
    thursday: { close: "17:00", open: "14:00" },
    tuesday: { close: "12:00", open: "09:00" },
  };

  const daysOfWeek = [
    { key: "monday" as const, label: "Lundi" },
    { key: "tuesday" as const, label: "Mardi" },
    { key: "wednesday" as const, label: "Mercredi" },
    { key: "thursday" as const, label: "Jeudi" },
    { key: "friday" as const, label: "Vendredi" },
    { key: "saturday" as const, label: "Samedi" },
    { key: "sunday" as const, label: "Dimanche" },
  ];

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock aria-hidden="true" className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                Horaires d'ouverture de la mairie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-3">
                {daysOfWeek.map((day) => {
                  const hours =
                    openingHours[day.key as keyof typeof openingHours];
                  return (
                    <div
                      className="flex items-center justify-between border-border border-b py-2 last:border-0"
                      key={day.key}
                    >
                      <span className="font-medium">{day.label}</span>
                      {hours ? (
                        <span className="text-muted-foreground">
                          {hours.open} - {hours.close}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Fermé</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="mb-3 text-muted-foreground text-sm">
                  Pour les démarches administratives, nous vous recommandons de
                  prendre rendez-vous.
                </p>
                <Button asChild className="w-full">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4" />
                    Prendre rendez-vous
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
