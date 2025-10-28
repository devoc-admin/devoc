"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

// Mock data - in production this would come from CMS
const mockNews = [
  {
    createdAt: new Date("2024-10-20"),
    description:
      "La commune de Lasbordes est fière d'annoncer l'inauguration de sa nouvelle salle polyvalente le 15 novembre 2024.",
    eventDate: new Date("2024-11-15"),
    id: "1",
    location: "Centre-ville de Lasbordes",
    slug: "inauguration-salle-polyvalente",
    status: "published" as const,
    title: "Inauguration de la nouvelle salle polyvalente",
  },
  {
    createdAt: new Date("2024-10-15"),
    description:
      "La prochaine collecte des déchets verts aura lieu le samedi 2 novembre. Pensez à sortir vos bacs la veille au soir.",
    id: "2",
    slug: "collecte-dechets-verts",
    status: "published" as const,
    title: "Collecte des déchets verts",
  },
  {
    createdAt: new Date("2024-10-10"),
    description:
      "Réservez votre samedi 14 décembre pour le traditionnel marché de Noël de Lasbordes. Artisans locaux, produits du terroir et animations pour les enfants.",
    eventDate: new Date("2024-12-14"),
    id: "3",
    location: "Place de la Mairie",
    slug: "marche-noel-2024",
    status: "published" as const,
    title: "Marché de Noël 2024",
  },
];

export function NewsSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 font-bold text-3xl text-foreground">
              Actualités
            </h2>
            <p className="text-muted-foreground">
              Restez informés des dernières nouvelles de la commune
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/actualites">
              Toutes les actualités
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockNews.map((news, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              key={news.id}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link href={`/actualites/${news.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar aria-hidden="true" className="h-4 w-4" />
                      <time dateTime={news.createdAt.toISOString()}>
                        {formatDate(news.createdAt)}
                      </time>
                    </div>
                    <CardTitle className="text-xl">{news.title}</CardTitle>
                    {news.location && (
                      <div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin aria-hidden="true" className="h-4 w-4" />
                        <span>{news.location}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {news.description}
                    </CardDescription>
                    {news.eventDate && (
                      <div className="mt-4 rounded-md bg-primary/10 p-3">
                        <p className="font-medium text-primary text-sm">
                          Événement le {formatDate(news.eventDate)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
