"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ContactLink } from "./components/contact-link";
import { Copyright } from "./components/copyright";
import { GradientLine } from "./components/gradient-line";
import { Logo } from "./components/logo";
import { OrangeDecorativeStone } from "./components/orange-decorative-stone";

export function Footer() {
  useFooterAnimation();
  return (
    <footer
      className={cn(
        "sticky",
        "z-0",
        "bottom-0",
        "overflow-hidden",
        "bg-surface-dark"
      )}
    >
      <div
        className={cn(
          "rounded-t-4xl",
          "border-t border-t-zinc-600/10",
          "bg-linear-to-br from-primary/5 via-transparent to-primary/5",
          "px-4 xs:px-6 sm:px-8 md:px-10",
          "py-12 xl:py-24"
        )}
      >
        <div
          className={cn(
            "footer-content",
            "relative mx-auto max-w-300 space-y-8"
          )}
        >
          {/* 🪨 */}
          <OrangeDecorativeStone />
          {/* 1️⃣ Row */}
          <div
            className={cn(
              "relative space-y-8",
              "lg:mx-auto lg:grid lg:grid-cols-5"
            )}
          >
            {/* 🐲🔤 */}
            <div className="col-span-2 flex flex-col gap-5">
              {/* 🐲 */}
              <Logo />
              {/* 🔤 */}
              <div className="max-w-175 text-muted-foreground text-sm">
                Entreprises, artisans, collectivités : nous accompagnons votre
                transformation numérique en Occitanie.
              </div>
              <ContactLinks />
            </div>
          </div>

          {/* 2️⃣ 📧 */}
          {/* <Newsletter /> */}

          {/* 3️⃣ 📝🔗 */}
          <div
            className={cn(
              "relative",
              "flex flex-col items-center gap-y-4",
              "sm:flex-row sm:justify-between sm:gap-y-0"
            )}
          >
            {/* 📝 */}
            <Copyright />
            {/* 🔗 */}
            <LegalLinks />
          </div>
        </div>
      </div>
      <GradientLine />
    </footer>
  );
}

export default Footer;

// ------------------------
// ✨ Scroll animation
gsap.registerPlugin(ScrollTrigger);
function useFooterAnimation() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        end: () => ScrollTrigger.maxScroll(window),
        invalidateOnRefresh: true,
        scrub: 1.5,
        start: () => ScrollTrigger.maxScroll(window) - 500,
        trigger: document.body,
      },
    });

    tl.from(".footer-content", {
      ease: "power4.in",
      opacity: 0,
    });
  });
}

// ------------------------------------------------------------------------------------------------
// 📞📩📍
type ContactLinkType = {
  href: string;
  icon: React.ReactNode;
  label: string;
  id: string;
  newPage?: boolean;
};

const contactLinks: ContactLinkType[] = [
  {
    href: "mailto:contact@dev-oc.fr",
    icon: <MailIcon size={16} />,
    id: "email",
    label: "contact@dev-oc.fr",
    newPage: false,
  },
  {
    href: "tel:+33620239838",
    icon: <PhoneIcon size={16} />,
    id: "phone1",
    label: "+33 6 20 23 98 38",
    newPage: false,
  },
  {
    href: "tel:+33658889701",
    icon: <PhoneIcon size={16} />,
    id: "phone2",
    label: "+33 6 58 88 97 01",
  },
  {
    href: "https://maps.app.goo.gl/u8M4QDvL5pA4o4Xt6",
    icon: <MapPinIcon size={16} />,
    id: "address",
    label: "Carcassonne, France",
    newPage: true,
  },
];

function ContactLinks() {
  return (
    <div className="flex flex-col gap-2 font-regular text-muted-foreground">
      {contactLinks.map((link) => (
        <ContactLink key={link.id} {...link} />
      ))}
    </div>
  );
}

// ------------------------------------------------------------------------------------------------
type LegalLinkType = {
  href: string;
  name: string;
};

const legalLinks: LegalLinkType[] = [
  {
    href: "/mentions-legales",
    name: "Mentions légales",
  },
  {
    href: "/politique-de-confidentialite",
    name: "Politique de confidentialité",
  },
];

function LegalLinks() {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        "text-muted-foreground text-sm",
        "flex-col",
        "sm:flex-row"
      )}
    >
      {legalLinks.map((link) => (
        <Link
          className="transition-colors hover:text-primary"
          href={link.href}
          key={link.name}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
