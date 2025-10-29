import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarExportButton } from "@/components/CalendarExportButton";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

// Constants
const DESCRIPTION_PREVIEW_LENGTH = 160;

// Mock data - in production this would come from CMS
const newsData = {
  "collecte-dechets-verts": {
    // Optional fields for consistency
    calendarExport: false,
    createdAt: new Date("2024-10-15"),
    description:
      "La prochaine collecte des déchets verts aura lieu le samedi 2 novembre 2024.\n\nMerci de sortir vos bacs la veille au soir avant 20h. Les bacs doivent être disposés sur le trottoir, roues côté maison.\n\nRappel : sont acceptés les déchets de jardin (tontes, feuilles, petites branches), mais pas les déchets de cuisine ni les terres et cailloux.\n\nPour toute question, contactez le service technique au 04 68 XX XX XX.",
    eventDate: undefined,
    eventTime: undefined,
    id: "2",
    location: undefined,
    slug: "collecte-dechets-verts",
    status: "published" as const,
    title: "Collecte des déchets verts",
  },
  "inauguration-salle-polyvalente": {
    calendarExport: true,
    createdAt: new Date("2024-10-20"),
    description:
      "La commune de Lasbordes est fière d'annoncer l'inauguration de sa nouvelle salle polyvalente le 15 novembre 2024. Cet équipement moderne de 300m² permettra d'accueillir de nombreuses manifestations culturelles, sportives et associatives.\n\nDotée d'un équipement audio-visuel de dernière génération, la salle pourra accueillir jusqu'à 200 personnes. Elle dispose également d'une cuisine professionnelle et de vestiaires.\n\nL'inauguration officielle aura lieu à 10h en présence de Monsieur le Maire et des élus municipaux. Une visite guidée sera proposée à l'ensemble des habitants, suivie d'un vin d'honneur.\n\nCet investissement majeur pour notre commune témoigne de notre volonté de dynamiser la vie locale et de fournir des infrastructures modernes à nos concitoyens.",
    eventDate: new Date("2024-11-15"),
    eventTime: "10:00",
    id: "1",
    location: "Centre-ville de Lasbordes",
    slug: "inauguration-salle-polyvalente",
    status: "published" as const,
    title: "Inauguration de la nouvelle salle polyvalente",
  },
  "marche-noel-2024": {
    calendarExport: true,
    createdAt: new Date("2024-10-10"),
    description:
      "Réservez votre samedi 14 décembre pour le traditionnel marché de Noël de Lasbordes !\n\nAu programme :\n- 30 exposants : artisans locaux, produits du terroir, créations artisanales\n- Animations pour les enfants : maquillage, atelier de décoration de biscuits, visite du Père Noël\n- Restauration sur place : vin chaud, crêpes, châtaignes grillées\n- Concert de chants de Noël à 16h par la chorale municipale\n\nEntrée gratuite. Le marché sera ouvert de 10h à 18h, Place de la Mairie.\n\nVenez nombreux partager ce moment convivial et découvrir les talents de nos artisans !",
    eventDate: new Date("2024-12-14"),
    eventEndTime: "18:00",
    eventTime: "10:00",
    id: "3",
    location: "Place de la Mairie",
    slug: "marche-noel-2024",
    status: "published" as const,
    title: "Marché de Noël 2024",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return Promise.resolve(params).then((resolvedParams) => {
    const news = newsData[resolvedParams.slug as keyof typeof newsData];

    if (!news) {
      return {
        title: "Actualité non trouvée",
      };
    }

    return {
      description: news.description.slice(0, DESCRIPTION_PREVIEW_LENGTH),
      title: news.title,
    };
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const news = newsData[resolvedParams.slug as keyof typeof newsData];

  if (!news) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Button asChild className="mb-6" variant="ghost">
          <Link href="/actualites">
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar aria-hidden="true" className="h-4 w-4" />
              <time dateTime={news.createdAt.toISOString()}>
                Publié le {formatDate(news.createdAt)}
              </time>
            </div>

            <h1 className="mb-4 font-bold text-4xl text-foreground">
              {news.title}
            </h1>

            {news.location && (
              <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                <MapPin aria-hidden="true" className="h-5 w-5" />
                <span>{news.location}</span>
              </div>
            )}

            {news.eventDate && (
              <div className="mb-6 rounded-lg border border-primary/20 bg-primary/10 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 font-semibold text-primary">Événement</p>
                    <p className="text-foreground text-sm">
                      {formatDate(news.eventDate)}
                      {news.eventTime && ` à ${news.eventTime}`}
                    </p>
                  </div>
                  {news.calendarExport && <CalendarExportButton news={news} />}
                </div>
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {news.description.split("\n\n").map((paragraph, index) => (
              <p
                className="mb-4 text-foreground"
                key={`paragraph-${news.slug}-${index}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(newsData).map((slug) => ({
    slug,
  }));
}
