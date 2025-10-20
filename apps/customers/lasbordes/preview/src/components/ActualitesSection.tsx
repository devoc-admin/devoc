import { ArrowRight, Calendar, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActualitesSection = () => {
  const actualites = [
    {
      category: "Services",
      date: "2025-01-15",
      excerpt:
        "À partir du 16 janvier 2025, la bibliothèque sera ouverte les mardis et jeudis de 16h à 18h30.",
      id: 1,
      title: "Nouveaux horaires de la bibliothèque",
      urgent: true,
    },
    {
      category: "Événements",
      date: "2024-12-20",
      excerpt:
        "Venez échanger avec vos élus autour d'un café et de croissants frais. Prochaine rencontre le 25 janvier.",
      id: 2,
      title: "Rencontres café-croissants 2024",
      urgent: false,
    },
    {
      category: "Travaux",
      date: "2024-12-18",
      excerpt:
        "Des travaux de réfection de la chaussée auront lieu du 22 au 26 janvier. Circulation alternée.",
      id: 3,
      title: "Travaux de voirie rue de la République",
      urgent: true,
    },
    {
      category: "Transport",
      date: "2024-12-15",
      excerpt:
        'Modification des horaires de la ligne 403. Consultez les nouveaux horaires dans la rubrique "Mairie".',
      id: 4,
      title: "Horaires Bus LIO ligne 403",
      urgent: false,
    },
    {
      category: "Solidarité",
      date: "2024-12-10",
      excerpt:
        "Balade solidaire organisée par l'association dimanche 14 septembre 2025.",
      id: 5,
      title: "Ensemble pour vaincre les maladies rares",
      urgent: false,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Services: "bg-primary/10 text-primary",
      Solidarité: "bg-primary/15 text-primary",
      Transport: "bg-secondary/50 text-secondary-foreground",
      Travaux: "bg-destructive/10 text-destructive",
      Événements: "bg-accent/10 text-accent",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-muted text-muted-foreground"
    );
  };

  return (
    <section className="bg-background py-20" id="actualites">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-foreground">
            Actualités de Lasbordes
          </h2>
          <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
            Restez informé de la vie municipale, des événements et des services
            de votre commune
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Article principal */}
          <div className="lg:col-span-2">
            <Card className="card-hover card-gradient h-full border-0 shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge className={getCategoryColor(actualites[0].category)}>
                    {actualites[0].category}
                  </Badge>
                  {actualites[0].urgent && (
                    <Badge variant="destructive">Urgent</Badge>
                  )}
                </div>
                <CardTitle className="font-bold text-2xl leading-tight">
                  {actualites[0].title}
                </CardTitle>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(actualites[0].date)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-foreground text-lg leading-relaxed">
                  {actualites[0].excerpt}
                </p>
                <Button className="w-full sm:w-auto">
                  Lire la suite
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Liste des autres actualités */}
          <div className="space-y-6">
            <h3 className="font-semibold text-foreground text-xl">
              Autres actualités
            </h3>

            {actualites.slice(1).map((actu) => (
              <Card
                className="card-hover card-gradient border-0 shadow-md"
                key={actu.id}
              >
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      className={getCategoryColor(actu.category)}
                      variant="secondary"
                    >
                      {actu.category}
                    </Badge>
                    {actu.urgent && (
                      <Badge className="text-xs" variant="destructive">
                        Urgent
                      </Badge>
                    )}
                  </div>

                  <h4 className="mb-2 line-clamp-2 font-semibold text-foreground">
                    {actu.title}
                  </h4>

                  <p className="mb-3 line-clamp-2 text-muted-foreground text-sm">
                    {actu.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDate(actu.date)}
                    </div>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button className="w-full" variant="outline">
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActualitesSection;
