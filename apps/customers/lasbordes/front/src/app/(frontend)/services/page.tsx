import {
  Activity,
  BookOpen,
  Building,
  Heart,
  Palette,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  description: "Tous les services proposés par la commune de Lasbordes",
  title: "Services municipaux",
};

const services = [
  {
    category: "Loisirs & Culture",
    icon: Palette,
    items: [
      "Bibliothèque municipale",
      "Salle des fêtes",
      "Animations culturelles",
      "Expositions",
    ],
  },
  {
    category: "Jeunesse",
    icon: Users,
    items: [
      "École primaire",
      "Garderie périscolaire",
      "Centre de loisirs",
      "Aires de jeux",
    ],
  },
  {
    category: "Services médicaux",
    icon: Heart,
    items: [
      "Cabinet médical",
      "Pharmacie",
      "Infirmières libérales",
      "Services à domicile",
    ],
  },
  {
    category: "Services administratifs",
    icon: Building,
    items: ["État civil", "Urbanisme", "Élections", "Cimetière"],
  },
  {
    category: "Éducation",
    icon: BookOpen,
    items: [
      "École maternelle",
      "École primaire",
      "Cantine scolaire",
      "Transport scolaire",
    ],
  },
  {
    category: "Sports",
    icon: Activity,
    items: [
      "Terrain de football",
      "Terrain de tennis",
      "Salle de sport",
      "Parcours santé",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 font-bold text-4xl text-foreground">
          Services municipaux
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Découvrez l'ensemble des services proposés par la commune
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.category}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 text-primary"
                      />
                    </div>
                    <CardTitle>{service.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li
                        className="flex items-center gap-2 text-muted-foreground"
                        key={item}
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
