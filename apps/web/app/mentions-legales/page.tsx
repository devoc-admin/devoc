import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/footer";
import Header from "@/app/header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  description: "Mentions légales du site Dev'Oc",
  title: "Mentions légales | Dev'Oc",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <div
        className={cn(
          "mx-auto max-w-200",
          "px-6 py-24",
          "text-muted-foreground text-sm leading-relaxed",
          "md:py-32"
        )}
      >
        <h1 className="mb-12 font-kanit text-4xl text-foreground">
          Mentions légales
        </h1>

        <Section title="Éditeur du site">
          <p>Raison sociale : Dev'Oc</p>
          <p>Forme juridique : Association de fait</p>
          <p>Téléphone : +33 6 20 23 98 38</p>
          <p>
            Email :{" "}
            <a
              className="text-primary underline"
              href="mailto:contact@dev-oc.fr"
            >
              contact@dev-oc.fr
            </a>
          </p>
        </Section>

        <Section title="Directeur de la publication">
          <p>Nom : Thibaut Izard</p>
          <p>Qualité : Fondateur</p>
        </Section>

        <Section title="Hébergement">
          <p>Hébergeur : Vercel Inc.</p>
          <p>
            Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          </p>
          <p>
            Site web :{" "}
            <a
              className="text-primary underline"
              href="https://vercel.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              vercel.com
            </a>
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos,
            icônes, sons, logiciels, etc.) est la propriété exclusive de Dev'Oc
            ou de ses partenaires et est protégé par les lois françaises et
            internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
            préalable de Dev'Oc.
          </p>
        </Section>

        <Section title="Limitation de responsabilité">
          <p>
            Dev'Oc s'efforce d'assurer l'exactitude et la mise à jour des
            informations diffusées sur ce site. Toutefois, Dev'Oc ne peut
            garantir l'exactitude, la précision ou l'exhaustivité des
            informations mises à disposition sur ce site.
          </p>
          <p>
            Dev'Oc décline toute responsabilité pour toute imprécision,
            inexactitude ou omission portant sur des informations disponibles
            sur ce site.
          </p>
        </Section>

        <Section title="Liens hypertextes">
          <p>
            Le site peut contenir des liens hypertextes vers d'autres sites.
            Dev'Oc n'exerce aucun contrôle sur ces sites et décline toute
            responsabilité quant à leur contenu.
          </p>
        </Section>

        <Section title="Droit applicable">
          <p>
            Les présentes mentions légales sont régies par le droit français.
            Tout litige relatif à l'utilisation du site sera soumis à la
            compétence exclusive des tribunaux français.
          </p>
        </Section>

        <div className="mt-12 border-border border-t pt-8">
          <Link
            className="text-primary underline transition-colors hover:text-primary/80"
            href="/politique-de-confidentialite"
          >
            Voir notre politique de confidentialité
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ------------------------------------------------------------------------------------------------
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-kanit text-foreground text-xl">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
