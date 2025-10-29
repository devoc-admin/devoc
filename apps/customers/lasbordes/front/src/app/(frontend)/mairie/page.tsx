import { Download, FileText } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  description:
    "Équipe municipale et comptes rendus du conseil municipal de Lasbordes",
  title: "Mairie",
};

const team = [
  { email: "maire@lasbordes11400.fr", name: "Jean DUPONT", role: "Maire" },
  { email: null, name: "Marie MARTIN", role: "1ère Adjointe" },
  { email: null, name: "Pierre BERNARD", role: "2ème Adjoint" },
  { email: null, name: "Sophie LAURENT", role: "Conseillère municipale" },
  { email: null, name: "Michel DUBOIS", role: "Conseiller municipal" },
];

const councilMinutes = [
  {
    date: "2024-10-15",
    id: "1",
    title: "Compte rendu du conseil municipal - Octobre 2024",
  },
  {
    date: "2024-09-20",
    id: "2",
    title: "Compte rendu du conseil municipal - Septembre 2024",
  },
  {
    date: "2024-06-18",
    id: "3",
    title: "Compte rendu du conseil municipal - Juin 2024",
  },
];

export default function MairiePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 font-bold text-4xl text-foreground">La Mairie</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Découvrez votre équipe municipale et consultez les comptes rendus des
          conseils
        </p>

        {/* Municipal Team */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold text-3xl text-foreground">
            Équipe municipale
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </CardHeader>
                {member.email && (
                  <CardContent>
                    <a
                      className="text-primary text-sm hover:underline"
                      href={`mailto:${member.email}`}
                    >
                      {member.email}
                    </a>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Council Minutes */}
        <section>
          <h2 className="mb-6 font-bold text-3xl text-foreground">
            Comptes rendus
          </h2>
          <div className="space-y-4">
            {councilMinutes.map((minute) => (
              <Card key={minute.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileText
                        aria-hidden="true"
                        className="mt-1 h-5 w-5 text-primary"
                      />
                      <div>
                        <CardTitle className="text-lg">
                          {minute.title}
                        </CardTitle>
                        <p className="mt-1 text-muted-foreground text-sm">
                          Date:{" "}
                          {new Date(minute.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                      Télécharger
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
