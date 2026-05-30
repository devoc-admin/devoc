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
    <div className={s.scrollContainer}>
      <div className={s.stickyContainer}>
        <div
          className={cn(
            "scroll-mt-12",
            "rounded-3xl",
            "bg-white",
            "relative",
            "overflow-hidden",
            "space-y-8",
            "px-18 py-22",
            s.card
          )}
          id="contact"
        >
          {/* ――― Stroke */}
          <svg
            aria-hidden="true"
            className={s.cardLine}
            preserveAspectRatio="none"
          >
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
                  "font-normal!",
                  "text-8xl!",
                  "leading-[0.9]!"
                )}
              >
                Une heure pour cerner vos{" "}
                <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent">
                  besoins
                </span>
              </SectionCatchline>
              <ContactP>
                Réservez un temps d'échange gratuit, sur site ou en visio. Nous
                évaluons ensemble l'opportunité, l'ampleur des gains et le pack
                qui correspond à votre situation. Sans engagement, sans jargon.
              </ContactP>
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
            <div className="flex items-center gap-x-4">
              <ReserverUnRendezVous />
              <AppelerMaintenant />
            </div>
          </ContactCardSecondRow>
        </div>
      </div>
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
  return <div className="relative grow">{children}</div>;
}

function ContactP({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "text-foreground/60",
        "font-medium",
        // ↔️
        "text-md",
        "xl:text-lg"
      )}
    >
      {children}
    </p>
  );
}
