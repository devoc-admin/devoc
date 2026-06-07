import { MailIcon, MessageCircle } from "lucide-react";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { MAIL_DEVOC, TEL_THIBAUT, TEL_THIBAUT_FORMATTED } from "@/constants";
import { cn } from "@/lib/utils";
import { AppelerMaintenant, ReserverUnRendezVous } from "./buttons";
import { ContactCardBackground } from "./contact-card-background";
import { ContactItem } from "./contact-item";
import s from "./style.module.css";

export function ContactCard() {
  return (
    <div
      className={cn(
        "rounded-3xl",
        "bg-white",
        "relative",
        "overflow-hidden",
        // ↔️
        "space-y-8 px-8 py-10",
        "xs:space-y-8 xs:px-8 xs:py-10",
        "sm:scroll-mt-42 sm:space-y-8 sm:px-18 sm:py-22",
        "md:scroll-mt-42 md:space-y-8 md:px-18 md:py-22",
        "lg:scroll-mt-42 lg:space-y-8 lg:px-18 lg:py-22",
        "xl:scroll-mt-42 xl:space-y-8 xl:px-18 xl:py-22",
        "2xl:scroll-mt-42 2xl:space-y-8 2xl:px-18 2xl:py-22",
        s.card
      )}
      id="contact"
    >
      {/* ――― Stroke */}
      <svg aria-hidden="true" className={s.cardLine} preserveAspectRatio="none">
        <rect pathLength="1" rx="24" ry="24" />
      </svg>
      {/* 🔙 */}
      <ContactCardBackground />
      {/* 1️⃣ */}
      <ContactCardFirstRow>
        {/* 1️⃣⬅️ */}
        <ContactCardLeft>
          <SupSection number={7} variant="light">
            Contact
          </SupSection>
          <SectionCatchline
            className={cn(
              // ↔️
              "font-medium! text-5xl!",
              "xs:font-medium! xs:text-5xl!",
              "xl:font-normal! xl:text-8xl!",
              "2xl:font-normal! 2xl:text-8xl!",
              "leading-[0.9]!"
            )}
          >
            Une heure pour cerner vos{" "}
            <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent">
              besoins
            </span>
          </SectionCatchline>
          <ContactP>
            <span>
              Réservez un temps d'échange gratuit, sur site ou en visio.
            </span>
            <span className="hidden sm:inline">
              Nous évaluons ensemble l'opportunité, l'ampleur des gains et le
              pack qui correspond à votre situation. Sans engagement, sans
              jargon.
            </span>
          </ContactP>
          <div
            className={cn(
              // ↔️
              "block",
              "xs:block",
              "xl:hidden",
              "2xl:hidden"
            )}
          >
            <ContactItem
              href={`tel:${TEL_THIBAUT}`}
              Icon={MessageCircle}
              subtitle="Appel ou SMS — Réponse rapide"
              suptitle="téléphone"
            >
              {TEL_THIBAUT_FORMATTED}
            </ContactItem>
            <ContactItem
              href={`mailto:${MAIL_DEVOC}`}
              Icon={MailIcon}
              subtitle="Réponse sous 24h ouvrées"
              suptitle="Email"
            >
              {MAIL_DEVOC}
            </ContactItem>
          </div>
        </ContactCardLeft>

        {/* 2️⃣➡️ */}
        <ContactCardRight>
          <ContactItem
            href={`tel:${TEL_THIBAUT}`}
            Icon={MessageCircle}
            subtitle="Appel ou SMS — Réponse rapide"
            suptitle="téléphone"
          >
            {TEL_THIBAUT_FORMATTED}
          </ContactItem>
          <ContactItem
            href={`mailto:${MAIL_DEVOC}`}
            Icon={MailIcon}
            subtitle="Réponse sous 24h ouvrées"
            suptitle="Email"
          >
            {MAIL_DEVOC}
          </ContactItem>
        </ContactCardRight>
      </ContactCardFirstRow>
      {/* 2️⃣ */}
      <ContactCardSecondRow>
        <div
          className={cn(
            "flex items-center",
            // ↔️
            "flex-col gap-4",
            "xs:flex-col xs:gap-4",
            "xl:flex-row xl:gap-4",
            "2xl:flex-row 2xl:gap-4"
          )}
        >
          <ReserverUnRendezVous />
          <AppelerMaintenant />
        </div>
      </ContactCardSecondRow>
    </div>
  );
}

function ContactCardFirstRow({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex justify-between gap-x-12", "relative")}>
      {children}
    </div>
  );
}

function ContactCardSecondRow({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function ContactCardLeft({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-[55ch]">
      <div
        className={cn(
          // ↔️
          "space-y-5",
          "2xl:space-y-10"
        )}
      >
        {children}
      </div>
    </div>
  );
}
function ContactCardRight({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative grow",
        // ↔️
        "hidden",
        "xs:hidden",
        "xl:block",
        "2xl:block"
      )}
    >
      {children}
    </div>
  );
}

function ContactP({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "text-foreground/60",
        "font-medium",
        // ↔️
        "text-md",
        "xs:text-md",
        "xl:text-lg",
        "2xl:text-lg"
      )}
    >
      {children}
    </p>
  );
}
