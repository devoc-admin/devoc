"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Palette, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    category: "loisirs_culture" as const,
    description:
      "Bibliothèque municipale, salle des fêtes, animations culturelles tout au long de l'année.",
    icon: Palette,
    id: "1",
    title: "Loisirs & Culture",
  },
  {
    category: "jeunesse" as const,
    description:
      "École primaire, garderie, centre de loisirs et activités pour les jeunes de la commune.",
    icon: Users,
    id: "2",
    title: "Jeunesse",
  },
  {
    category: "medical" as const,
    description:
      "Cabinet médical, pharmacie et services de santé accessibles à tous les habitants.",
    icon: Heart,
    id: "3",
    title: "Services médicaux",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-3xl text-foreground">
            Services municipaux
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Découvrez l'ensemble des services proposés par la commune de
            Lasbordes
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                key={service.id}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon
                        aria-hidden="true"
                        className="h-6 w-6 text-primary"
                      />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/services">
              Voir tous les services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
