import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPayloadClient } from "@/lib/payload";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/payload-types";
import { NewsletterForm } from "./newsletter-form";

export async function Footer() {
  // 🌐
  const t = await getTranslations("footer");

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
      <div className={cn("mx-auto", "max-w-7xl", "py-12", "px-4", "sm:px-6")}>
        <div
          className={cn(
            "grid gap-10",
            "grid-cols-1",
            "sm:grid-cols-2",
            "lg:grid-cols-[1fr_1fr_1fr_auto]"
          )}
        >
          <Brand social={social} />
          <QuickLinks />
          <ContactInfo contact={contact} />
          <OpeningHoursSection hours={hours} />
        </div>
      </div>

      {/* ⚖️ */}
      <BottomBar />
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

const quickLinks = [
  { href: "/boutique" as const, tKey: "shop" as const },
  { href: "/a-propos" as const, tKey: "about" as const },
  { href: "/blog" as const, tKey: "blog" as const },
  { href: "/avis" as const, tKey: "reviews" as const },
  { href: "/faq" as const, tKey: "faq" as const },
  { href: "/contact" as const, tKey: "contact" as const },
];
async function QuickLinks() {
  const t = await getTranslations("nav");

  return (
    <div>
      <SectionTitle>Navigation</SectionTitle>
      <nav className={cn("flex flex-col gap-2.5", "mt-4")}>
        {quickLinks.map(({ href, tKey }) => (
          <Link
            className={cn(
              "text-sm",
              "transition-colors",
              "text-muted-foreground",
              "hover:text-primary"
            )}
            href={href}
            key={href}
          >
            {t(tKey)}
          </Link>
        ))}
      </nav>
    </div>
  );
}

// ==============================================
// 📞
function ContactInfo({
  contact: { email, phone, address },
}: {
  contact: SiteConfig["contactInfo"];
}) {
  return (
    <div>
      <SectionTitle>Contact</SectionTitle>
      {/*📍📱📨*/}
      <div className="mt-4 flex flex-col gap-3 text-muted-foreground text-sm">
        <div className="flex items-start gap-2">
          <MapPin
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-accent"
          />
          <a
            className="transition-colors hover:text-primary"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {address}
          </a>
        </div>
        {/* 📱 */}
        <div className="flex items-center gap-2">
          <Phone aria-hidden="true" className="size-4 shrink-0 text-accent" />
          <a
            className="transition-colors hover:text-primary"
            href={`tel:${phone}`}
          >
            {phone}
          </a>
        </div>
        {/* 📨 */}
        <div className="flex items-center gap-2">
          <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
          <a
            className="transition-colors hover:text-primary"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// 🕐
async function OpeningHoursSection({
  hours,
}: {
  hours: SiteConfig["openingHours"];
}) {
  const t = await getTranslations("footer");
  const locale = await getLocale();

  return (
    <div>
      <SectionTitle>
        <Clock
          aria-hidden="true"
          className={cn("inline", "size-4", "-mt-0.5 mr-1.5")}
        />
        {t("openingHours")}
      </SectionTitle>
      {/* 📅🕰️ */}
      {hours && hours.length > 0 ? (
        <dl className="mt-4 flex flex-col gap-1.5 text-muted-foreground text-sm">
          {hours.map((hour) => (
            <div className="flex justify-between gap-x-5" key={hour.id}>
              {/* 📅 */}
              <dt className="capitalize">{hour.day}</dt>
              {/* 🕰️ */}
              <dd>{formatOpeningHours({ hour, locale })}</dd>
            </div>
          ))}
        </dl>
      ) : (
        //❓❓❓
        <UnknownHour />
      )}
    </div>
  );
}

//❓❓❓
function UnknownHour() {
  return <p className="mt-4 text-muted-foreground text-sm">—</p>;
}

function formatTime(time: string, locale: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(2000, 0, 1, hours, minutes);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

async function formatOpeningHours({
  hour,
  locale,
}: {
  hour: NonNullable<SiteConfig["openingHours"]>[0];
  locale: string;
}) {
  const t = await getTranslations("footer");

  if (hour.closed) return t("closed");

  const fmt = (t: string | null | undefined) =>
    t ? formatTime(t, locale) : "";

  return `${fmt(hour.openMorning)}–${fmt(hour.closeMorning)} / ${fmt(hour.openAfternoon)}–${fmt(hour.closeAfternoon)}`;
}

// ==============================================
// ⚖️ ⚖️ ⚖️
async function BottomBar() {
  const t = await getTranslations("footer");
  return (
    <div className="border-border/50 border-t">
      <div
        className={cn(
          "flex items-center justify-between gap-2",
          "flex-col sm:flex-row",
          "max-w-6xl",
          "mx-auto",
          "px-4 sm:px-6",
          "py-4",
          "text-muted-foreground text-xs"
        )}
      >
        <p>
          &copy; {new Date().getFullYear()} Saveurs d&apos;Aude.{" "}
          {t("allRightsReserved")}.
        </p>
        <div className="flex gap-4">
          <FooterLink href="/mentions-legales" tKey="legalNotice" />
          <FooterLink href="/politique-confidentialite" tKey="privacyPolicy" />
          <FooterLink href="/cgv" tKey="cgv" />
        </div>
      </div>
    </div>
  );
}

async function FooterLink({ href, tKey }: { href: string; tKey: string }) {
  const t = await getTranslations("footer");
  return (
    <Link
      className={cn("transition-colors", "hover:text-primary hover:underline")}
      // biome-ignore lint/suspicious/noExplicitAny: exception
      href={href as any}
    >
      {t(tKey)}
    </Link>
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
