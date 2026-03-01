import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPayloadClient } from "@/lib/payload";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/payload-types";
import { NewsletterForm } from "./NewsletterForm";

const quickLinks = [
  { href: "/boutique" as const, tKey: "shop" as const },
  { href: "/a-propos" as const, tKey: "about" as const },
  { href: "/blog" as const, tKey: "blog" as const },
  { href: "/avis" as const, tKey: "reviews" as const },
  { href: "/faq" as const, tKey: "faq" as const },
  { href: "/contact" as const, tKey: "contact" as const },
];

export async function Footer() {
  // 🌐
  const [t, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);

  // 📦
  const payload = await getPayloadClient();
  const siteConfig = await payload.findGlobal({ slug: "site-config" });

  const contact = siteConfig.contactInfo;
  const social = siteConfig.socialLinks;
  const hours = siteConfig.openingHours;

  return (
    <footer className="border-border/50 border-t bg-secondary/50">
      {/* 📬 */}
      <NewsletterBanner t={t} />

      {/* 📋 */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Brand social={social} />
          <QuickLinks tNav={tNav} />
          <ContactInfo contact={contact} />
          <OpeningHoursSection hours={hours} t={t} />
        </div>
      </div>

      {/* ⚖️ */}
      <BottomBar t={t} />
    </footer>
  );
}

// ==============================================
// 📬
function NewsletterBanner({
  t,
}: {
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <div className="border-border/50 border-b">
      <div
        className={cn(
          "mx-auto max-w-6xl",
          "flex flex-col items-center gap-4",
          "px-4 py-8 sm:px-6",
          "text-center"
        )}
      >
        <h3 className="font-heading text-foreground text-lg">
          {t("newsletter")}
        </h3>
        <div className="w-full max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}

// ==============================================
// 🏷️
function Brand({ social }: { social: SiteConfig["socialLinks"] }) {
  return (
    <div>
      <h3 className="font-heading text-primary text-xl">Saveurs d&apos;Aude</h3>
      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
        Épicerie fine de spécialités artisanales du Sud de la France, au cœur de
        Carcassonne.
      </p>
      <SocialLinks social={social} />
    </div>
  );
}

function SocialLinks({ social }: { social: SiteConfig["socialLinks"] }) {
  if (!(social?.instagram || social?.facebook)) return null;

  return (
    <div className="mt-4 flex gap-3">
      {social.instagram && (
        <SocialLink href={social.instagram} label="Instagram">
          <Instagram className="size-5" />
        </SocialLink>
      )}
      {social.facebook && (
        <SocialLink href={social.facebook} label="Facebook">
          <Facebook className="size-5" />
        </SocialLink>
      )}
    </div>
  );
}

function SocialLink({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      aria-label={label}
      className="text-muted-foreground transition-colors hover:text-primary"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

// ==============================================
// 🧭
function QuickLinks({
  tNav,
}: {
  tNav: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <div>
      <SectionTitle>Navigation</SectionTitle>
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
  );
}

// ==============================================
// 📞
function ContactInfo({ contact }: { contact: SiteConfig["contactInfo"] }) {
  return (
    <div>
      <SectionTitle>Contact</SectionTitle>
      <div className="mt-4 flex flex-col gap-3 text-muted-foreground text-sm">
        {contact?.address && (
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
            <a
              className="transition-colors hover:text-primary"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {contact.address}
            </a>
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
  );
}

// ==============================================
// 🕐
function OpeningHoursSection({
  hours,
  t,
}: {
  hours: SiteConfig["openingHours"];
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <div>
      <h4
        className={cn(
          "font-heading font-semibold",
          "text-foreground text-sm",
          "uppercase tracking-wider"
        )}
      >
        <Clock className="-mt-0.5 mr-1.5 inline size-4" />
        {t("openingHours")}
      </h4>
      {hours && hours.length > 0 ? (
        <dl className="mt-4 flex flex-col gap-1.5 text-muted-foreground text-sm">
          {hours.map((slot) => (
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
  );
}

// ==============================================
// ⚖️
function BottomBar({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="border-border/50 border-t">
      <div
        className={cn(
          "mx-auto max-w-6xl",
          "flex flex-col items-center justify-between gap-2 sm:flex-row",
          "px-4 py-4 sm:px-6",
          "text-muted-foreground text-xs"
        )}
      >
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
  );
}

// ==============================================
// 🔤
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className={cn(
        "font-heading font-semibold",
        "text-foreground text-sm",
        "uppercase tracking-wider"
      )}
    >
      {children}
    </h4>
  );
}
