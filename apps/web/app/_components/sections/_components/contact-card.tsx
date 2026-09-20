"use client";
import {
  MapPin as LocalisationIcon,
  Mail as MailIcon,
  Smartphone as PhoneIcon,
} from "lucide-react";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { ContactCardItem } from "./contact-card-item";

export function ContactCard() {
  return (
    <FadeUp className="w-full" disableOnMobile>
      <Card>
        {/* 🔙 */}
        <Background />
        {/* 1️⃣⬅️ */}
        <Left>
          <SupSection number={5}>Contact</SupSection>
          <ParlonsProjet />
          <Description />
        </Left>
        {/* 2️⃣➡️ */}
        <div className={cn("relative", "w-full", "md:min-w-80 md:max-w-130")}>
          {itemContacts.map(({ id, ...props }) => (
            <ContactCardItem {...props} key={id} />
          ))}
        </div>
      </Card>
    </FadeUp>
  );
}

// 📦
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex items-start",
        "scroll-mt-12",
        "relative",
        "rounded-3xl",
        "border border-foreground-dark/10",
        "bg-surface-dark",
        "overflow-hidden",
        // ↔️
        "justify-between md:items-end",
        "gap-x-12 lg:gap-x-20 xl:gap-x-24",
        "gap-y-12",
        "flex-col md:flex-row",
        "px-7 md:px-8 2xl:px-22",
        "py-7 2xl:py-32"
      )}
      id="contact"
    >
      {children}
    </div>
  );
}

// 📦
function Left({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative max-w-[55ch]",
        // ↔️
        "space-y-8",
        "2xl:space-y-10"
      )}
    >
      {children}
    </div>
  );
}

//🔙
function Background() {
  return (
    <div className="absolute inset-0 size-full opacity-30">
      {/* 🟡 */}
      <div
        className={cn(
          "absolute bottom-0 left-0",
          "aspect-square h-[80%]",
          "rounded-full",
          "-translate-x-1/2 translate-y-1/2",
          "bg-radial from-primary-lighter to-80% to-transparent",
          "blur-2xl"
        )}
      />
      {/* 🟠 */}
      <div
        className={cn(
          "absolute top-0 right-0",
          "aspect-square h-full",
          "translate-x-1/4 -translate-y-1/4",
          "rounded-full",
          "bg-radial from-orange-red to-80% to-transparent",
          "blur-2xl"
        )}
      />
    </div>
  );
}

// 🆎
function ParlonsProjet() {
  return (
    <SectionCatchline
      className={cn(
        // ↔️
        "leading-[0.9]!",
        "font-medium text-5xl",
        "xs:font-medium xs:text-5xl",
        "sm:font-light sm:text-5xl",
        "md:font-light md:text-5xl",
        "lg:font-light lg:text-5xl",
        "xl:font-light xl:text-6xl",
        "2xl:font-normal 2xl:text-8xl"
      )}
    >
      {" "}
      Parlons de votre{" "}
      <span className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text text-transparent">
        projet
      </span>
      .{" "}
    </SectionCatchline>
  );
}

// 🔠
function Description() {
  return (
    <p className={cn("text-foreground-dark/60", "text-lg 2xl:text-xl")}>
      Décrivez-nous votre besoin en quelques lignes. Nous vous répondons sous
      24h ouvrées avec une première grille de lecture. Sans engagement, sans
      jargon.
    </p>
  );
}

const itemContacts = [
  {
    href: "mailto:contact@dev-oc.fr",
    Icon: MailIcon,
    id: "email",
    label: "Email",
    value: "contact@dev-oc.fr",
  },
  {
    href: "tel:+33620239838",
    Icon: PhoneIcon,
    id: "tel-1",
    label: "Téléphone — Thibaut",
    value: "+33 6 20 23 98 38",
  },
  {
    href: "tel:+6258889701",
    Icon: PhoneIcon,
    id: "tel-2",
    label: "Téléphone — Clément",
    value: "+33 6 58 88 97 01",
  },
  {
    href: "",
    Icon: LocalisationIcon,
    id: "localisation",
    label: "Localisation",
    value: "Carcassonne, France",
  },
];
