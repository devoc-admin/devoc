import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  description: "Les commerces et entreprises de Lasbordes",
  title: "Commerces",
};

const businesses = [
  {
    address: "1 Rue Principale",
    category: "Alimentation",
    name: "Boulangerie Pâtisserie",
  },
  {
    address: "3 Place de la Mairie",
    category: "Restauration",
    name: "Café du Commerce",
  },
  {
    address: "12 Route de Castelnaudary",
    category: "Services",
    name: "Garage Auto",
  },
  {
    address: "5 Rue de l'Église",
    category: "Services",
    name: "Coiffure Élégance",
  },
];

export default function CommercesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 font-bold text-4xl text-foreground">
          Commerces et entreprises
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Découvrez les commerces de proximité de Lasbordes
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {businesses.map((business) => (
            <Card key={business.name}>
              <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {business.category}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 text-muted-foreground"
                  />
                  <p className="text-muted-foreground text-sm">
                    {business.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
