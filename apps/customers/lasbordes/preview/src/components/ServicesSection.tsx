import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  FileText,
  Heart,
  MapPin,
  Phone,
  TreePine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      color: "bg-primary/10 text-primary",
      description: "Services administratifs, état civil, urbanisme",
      icon: Building2,
      items: ["Notre maire", "Conseil municipal", "Personnel municipal"],
      title: "Mairie",
    },
    {
      color: "bg-accent/10 text-accent",
      description: "Toutes vos démarches en ligne ou sur rendez-vous",
      icon: FileText,
      items: ["État civil", "Urbanisme", "Élections"],
      title: "Démarches administratives",
    },
    {
      color: "bg-secondary/30 text-secondary-foreground",
      description: "Suivez la vie démocratique de votre commune",
      icon: Calendar,
      items: ["Conseils municipaux", "Délibérations", "Bulletins d'info"],
      title: "Vie municipale",
    },
    {
      color: "bg-destructive/10 text-destructive",
      description: "Accompagnement et services à la population",
      icon: Heart,
      items: ["CCAS", "Services médicaux", "Aide sociale"],
      title: "Services sociaux",
    },
    {
      color: "bg-primary/15 text-primary",
      description: "Préservation et amélioration du cadre de vie",
      icon: TreePine,
      items: ["Espaces verts", "Gestion des déchets", "Développement durable"],
      title: "Environnement",
    },
    {
      color: "bg-accent/15 text-accent",
      description: "Soutien aux entreprises et artisans locaux",
      icon: Briefcase,
      items: ["Commerce local", "Artisanat", "Agriculture"],
      title: "Économie locale",
    },
  ];

  const horaires = [
    { horaire: "8h30 - 12h30", jour: "Lundi" },
    { horaire: "Fermé", jour: "Mardi" },
    { horaire: "8h30 - 12h30 | 13h30 - 17h", jour: "Mercredi" },
    { horaire: "8h30 - 12h30", jour: "Jeudi" },
    { horaire: "8h30 - 12h30 | 13h30 - 16h30", jour: "Vendredi" },
  ];

  return (
    <section className="bg-muted/30 py-20" id="mairie">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-foreground">
            Services municipaux
          </h2>
          <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
            La mairie de Lasbordes vous accompagne dans toutes vos démarches et
            met à votre disposition une gamme complète de services
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              className="card-hover card-gradient border-0 shadow-lg"
              key={service.title}
            >
              <CardHeader className="pb-4">
                <div
                  className={`h-12 w-12 rounded-lg ${service.color} mb-4 flex items-center justify-center`}
                >
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-semibold text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li
                      className="flex items-center text-foreground text-sm"
                      key={item}
                    >
                      <div className="mr-3 h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Infos pratiques */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Horaires */}
          <Card className="card-gradient border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                Horaires d'ouverture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {horaires.map((item) => (
                  <div
                    className="flex items-center justify-between border-border/50 border-b py-2 last:border-0"
                    key={item.jour}
                  >
                    <span className="font-medium">{item.jour}</span>
                    <span className="text-muted-foreground">
                      {item.horaire}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="card-gradient border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>04 68 94 31 48</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>04 68 94 35 49 (Fax)</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p>Mairie de Lasbordes</p>
                  <p className="text-muted-foreground">2 Place de la Mairie</p>
                  <p className="text-muted-foreground">11400 Lasbordes</p>
                </div>
              </div>
              <Button className="mt-4 w-full">Prendre rendez-vous</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
