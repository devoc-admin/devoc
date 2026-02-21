import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPayloadClient } from "@/lib/payload";

type OpeningHoursSlot = {
  id: string;
  day: string;
  openMorning?: string | null;
  closeMorning?: string | null;
  openAfternoon?: string | null;
  closeAfternoon?: string | null;
  closed?: boolean | null;
};

const quickLinks = [
  { href: "/boutique" as const, tKey: "shop" as const },
  { href: "/a-propos" as const, tKey: "about" as const },
  { href: "/blog" as const, tKey: "blog" as const },
  { href: "/avis" as const, tKey: "reviews" as const },
  { href: "/faq" as const, tKey: "faq" as const },
  { href: "/contact" as const, tKey: "contact" as const },
];

export async function Footer() {
  const [t, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);

  const payload = await getPayloadClient();
  const siteConfig = await payload.findGlobal({ slug: "site-config" });

  const contact = siteConfig.contactInfo;
  const social = siteConfig.socialLinks;
  const hours = siteConfig.openingHours;

  return (
    <footer className="border-border/50 border-t bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-primary text-xl">
              Saveurs d&apos;Aude
            </h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Épicerie fine de spécialités artisanales du Sud de la France, au
              cœur de Carcassonne.
            </p>
            {(social?.instagram || social?.facebook) && (
              <div className="mt-4 flex gap-3">
                {social.instagram && (
                  <a
                    aria-label="Instagram"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    href={social.instagram}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Instagram className="size-5" />
                  </a>
                )}
                {social.facebook && (
                  <a
                    aria-label="Facebook"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    href={social.facebook}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Facebook className="size-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map(({ href, tKey }) => (
                <Link
                  className="text-muted-foreground text-sm transition-colors hover:text-primary"
                  href={href}
                  key={href}
                >
                  {tNav(tKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="mt-4 flex flex-col gap-3 text-muted-foreground text-sm">
              {contact?.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{contact.address}</span>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-accent" />
                  <a
                    className="transition-colors hover:text-primary"
                    href={`tel:${contact.phone}`}
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0 text-accent" />
                  <a
                    className="transition-colors hover:text-primary"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Opening hours */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider">
              <Clock className="-mt-0.5 mr-1.5 inline size-4" />
              {t("openingHours")}
            </h4>
            {hours && hours.length > 0 ? (
              <dl className="mt-4 flex flex-col gap-1.5 text-muted-foreground text-sm">
                {hours.map((slot: OpeningHoursSlot) => (
                  <div className="flex justify-between gap-2" key={slot.id}>
                    <dt className="capitalize">{slot.day}</dt>
                    <dd>
                      {slot.closed
                        ? "Fermé"
                        : `${slot.openMorning ?? ""}–${slot.closeMorning ?? ""} / ${slot.openAfternoon ?? ""}–${slot.closeAfternoon ?? ""}`}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-muted-foreground text-sm">—</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-border/50 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-muted-foreground text-xs sm:flex-row sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} Saveurs d&apos;Aude.{" "}
            {t("allRightsReserved")}.
          </p>
          <div className="flex gap-4">
            <Link
              className="transition-colors hover:text-primary"
              href="/mentions-legales"
            >
              {t("legalNotice")}
            </Link>
            <Link
              className="transition-colors hover:text-primary"
              href="/politique-confidentialite"
            >
              {t("privacyPolicy")}
            </Link>
            <Link className="transition-colors hover:text-primary" href="/cgv">
              {t("cgv")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
