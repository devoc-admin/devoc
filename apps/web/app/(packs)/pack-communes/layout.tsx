import { pageMetadata } from "@/lib/metadata";

// The page is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  description:
    "RGPD, accessibilité RGAA, cybersécurité : Dev'Oc sécurise votre commune et la met en conformité, avec formation et suivi de vos agents dans l'Aude.",
  path: "/pack-communes",
  title: "Pack Communes : RGPD, accessibilité et cybersécurité",
});

export default function PackCommunesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
