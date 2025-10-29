import { Facebook, Instagram, Rss, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
};

export function Footer() {
  // In production, this would come from CMS
  const footer = {
    links: [
      { href: "/", label: "Accueil" },
      { href: "/actualites", label: "Actualités" },
      { href: "/mairie", label: "Mairie" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
    socials: [
      { platform: "facebook" as const, url: "https://facebook.com" },
      { platform: "twitter" as const, url: "https://twitter.com" },
    ],
  };

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    {
      href: "/politique-de-confidentialite",
      label: "Politique de confidentialité",
    },
    { href: "/accessibilite", label: "Accessibilité" },
  ];

  const emergency = {
    email: "urgences@lasbordes11400.fr",
    phone: "112",
  };

  return (
    <footer className="mt-auto border-border border-t bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h2 className="mb-4 font-semibold text-lg">Commune de Lasbordes</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              Place de la Mairie
              <br />
              11400 Lasbordes
              <br />
              France
            </p>
            <p className="text-muted-foreground text-sm">
              Population : 600 habitants
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="mb-4 font-semibold text-lg">Navigation</h2>
            <ul className="space-y-2">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    className="rounded-sm text-muted-foreground text-sm transition-colors hover:text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h2 className="mb-4 font-semibold text-lg">Urgences</h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <span className="font-medium">Numéro d'urgence :</span>
                <br />
                <Link
                  className="rounded-sm text-destructive hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  href={`tel:${emergency.phone}`}
                >
                  {emergency.phone}
                </Link>
              </li>
              <li>
                <span className="font-medium">Police municipale :</span>
                <br />
                <Link
                  className="rounded-sm hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  href="tel:17"
                >
                  17
                </Link>
              </li>
              <li>
                <span className="font-medium">Pompiers :</span>
                <br />
                <Link
                  className="rounded-sm hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  href="tel:18"
                >
                  18
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & RSS */}
          <div>
            <h2 className="mb-4 font-semibold text-lg">Suivez-nous</h2>
            <div className="mb-6 flex gap-4">
              {footer.socials.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <Link
                    aria-label={`Suivez-nous sur ${social.platform}`}
                    className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    href={social.url}
                    key={social.platform}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </Link>
                );
              })}
              <Link
                aria-label="Flux RSS des actualités"
                className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                href="/rss.xml"
              >
                <Rss aria-hidden="true" className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Abonnez-vous à notre flux RSS pour recevoir les dernières
              actualités.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-border border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Commune de Lasbordes. Tous droits
              réservés.
            </p>
            <ul className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="rounded-sm text-muted-foreground text-sm transition-colors hover:text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-center text-muted-foreground text-xs">
            Source : Site officiel Lasbordes 11400 —
            https://www.lasbordes11400.fr/
          </p>
        </div>
      </div>
    </footer>
  );
}
