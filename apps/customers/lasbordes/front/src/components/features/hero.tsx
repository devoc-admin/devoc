"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  // In production, this would come from CMS
  const hero = {
    image: {
      alt: "Vue de la commune de Lasbordes",
      url: "/images/hero-lasbordes.jpg",
    },
    subtitle:
      "Une commune dynamique au cœur de l'Aude, où il fait bon vivre. Découvrez nos services, nos actualités et toutes les informations pratiques.",
    title: "Bienvenue à Lasbordes",
  };

  const keyFacts = [
    { icon: Users, label: "600 habitants", value: "Population" },
    { icon: MapPin, label: "11400", value: "Code postal" },
    { icon: Calendar, label: "Fondée en 1200", value: "Histoire" },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 font-bold text-4xl text-foreground md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {hero.subtitle}
            </p>

            {/* Quick actions */}
            <div className="mb-12 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/actualites">
                  Actualités
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-3 gap-6">
              {keyFacts.map((fact, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  key={fact.label}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <fact.icon
                    aria-hidden="true"
                    className="mx-auto mb-2 h-8 w-8 text-primary"
                  />
                  <p className="font-medium text-muted-foreground text-sm">
                    {fact.value}
                  </p>
                  <p className="font-semibold text-foreground text-lg">
                    {fact.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex aspect-4/3 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 shadow-xl">
              <p className="px-4 text-center text-muted-foreground">
                Image de la commune
                <br />
                <span className="text-sm">
                  (À remplacer par une vraie photo)
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
