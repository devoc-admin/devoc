import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  description: "Les associations et la vie culturelle de Lasbordes",
  title: "Vie culturelle et associative",
};

const associations = [
  {
    category: "Sport",
    name: "Club de pétanque Les Amis",
    president: "M. Martin",
  },
  { category: "Culture", name: "Chorale municipale", president: "Mme Dubois" },
  {
    category: "Social",
    name: "Association des parents d'élèves",
    president: "Mme Bernard",
  },
  { category: "Culture", name: "Comité des fêtes", president: "M. Laurent" },
];

export default function VieAssociativePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 font-bold text-4xl text-foreground">
          Vie culturelle et associative
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Découvrez les associations actives dans notre commune
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {associations.map((assoc) => (
            <Card key={assoc.name}>
              <CardHeader>
                <CardTitle>{assoc.name}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {assoc.category}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Président : {assoc.president}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
