import { Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  description: "Toutes les actualités de la commune de Lasbordes",
  title: "Actualités",
};

// Mock data - in production this would come from CMS
const allNews = [
  {
    createdAt: new Date("2024-10-20"),
    description:
      "La commune de Lasbordes est fière d'annoncer l'inauguration de sa nouvelle salle polyvalente le 15 novembre 2024. Cet équipement moderne permettra d'accueillir de nombreuses manifestations culturelles et sportives.",
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
      "Réservez votre samedi 14 décembre pour le traditionnel marché de Noël de Lasbordes. Artisans locaux, produits du terroir et animations pour les enfants au programme.",
    eventDate: new Date("2024-12-14"),
    id: "3",
    location: "Place de la Mairie",
    slug: "marche-noel-2024",
    status: "published" as const,
    title: "Marché de Noël 2024",
  },
  {
    createdAt: new Date("2024-10-08"),
    description:
      "Des travaux de réfection de la chaussée auront lieu du 4 au 18 novembre sur la rue principale. Une déviation sera mise en place.",
    id: "4",
    slug: "travaux-voirie-rue-principale",
    status: "published" as const,
    title: "Travaux de voirie rue principale",
  },
];

export default function ActualitesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 font-bold text-4xl text-foreground">Actualités</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Restez informés des dernières nouvelles et événements de la commune
        </p>

        <div className="space-y-6">
          {allNews.map((news) => (
            <Link href={`/actualites/${news.slug}`} key={news.id}>
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar aria-hidden="true" className="h-4 w-4" />
                    <time dateTime={news.createdAt.toISOString()}>
                      {formatDate(news.createdAt)}
                    </time>
                  </div>
                  <CardTitle className="text-2xl">{news.title}</CardTitle>
                  {news.location && (
                    <div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                      <span>{news.location}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{news.description}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}
