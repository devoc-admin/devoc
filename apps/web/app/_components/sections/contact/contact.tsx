"use client";
import LaserFlow from "@/components/react-bits/laser-flow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Section from "../_components/section";
import SectionTitle from "../_components/section-title";
import ContactForm from "./components/contact-form";
import { type ContactItem, contactItems } from "./contact-data";

export default function Contact() {
  return (
    <Section
      className={cn(
        // Margin top for separator
        "-mt-8",
        "sm:-mt-16",
        "md:-mt-22",
        "lg:-mt-38",
        "xl:-mt-48",
        // Gap 🕳️
        "gap-y-8",
        "xs:gap-y-14",
        "lg:gap-y-36",
        // Padding ↕️
        "lg:pb-48",
        "2xl:pb-60"
      )}
      id="contact"
      theme="dark"
    >
      {/* 🆎 Title */}
      <SectionTitle
        className="z-10"
        description="Prêt à démarrer votre projet ? Contactez notre équipe pour discuter de vos besoins et obtenir un devis personnalisé."
        title="Contact"
      />
      {/* 📱🟢 Contact and guaranteed response */}
      <div
        className={cn(
          "z-1",
          "w-full max-w-350",
          "flex flex-col justify-center gap-6",
          "md:flex-row md:items-start"
        )}
      >
        {/* 🃏🃏🃏 Cards */}
        <div className={cn("flex flex-col gap-6", "order-2", "md:order-1")}>
          {/* 🃏 Card */}
          {contactItems.map((item) => (
            <InfoContact key={item.id} {...item} />
          ))}
          {/* 🟢 Response guaranteed */}
          <ResponseGuaranteed />
        </div>

        {/* 📝 Contact form */}
        <Card
          animation={false}
          className={cn(
            "relative",
            "grow",
            "order-1",
            "md:order-2",
            "overflow-visible",
            "bg-linear-to-br from-zinc-950 to-zinc-900"
          )}
        >
          {/* ⚡ Laser */}
          <div
            className={cn(
              "absolute top-0 left-0 -translate-y-[50%]",
              "mask-t-from-50% mask-t-to-90%",
              "cursor-auto",
              "w-full",
              "h-160",
              "hidden",
              "lg:block"
            )}
          >
            <LaserFlow
              color="#f59e0b"
              fogIntensity={0.1}
              horizontalSizing={2}
            />
          </div>
          {/* 📝 Contact form */}

          <CardContent className={cn("z-10", "max-xs:p-3")}>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

// ----------------------------------
// 🟢 Response guaranteed
function ResponseGuaranteed() {
  return (
    <Card
      animation={false}
      className="gap-y-2 border-primary/30 bg-primary/5 md:max-w-100"
    >
      <CardHeader>
        <CardTitle className="text-wrap font-kanit font-semibold text-2xl">
          Réponse rapide garantie
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        Nous nous engageons à répondre à tous les messages dans les 24 heures
        ouvrées.
      </CardContent>
      <CardFooter className="font-bold text-primary text-sm">
        {/* 🟢 Équipe disponible */}
        <div className="mr-2 size-2 rounded-full bg-green-500" />
        <span>Équipe disponible</span>
      </CardFooter>
    </Card>
  );
}

// ----------------------------------
// 📱 Contact card
function InfoContact({ icon, content, title, href }: ContactItem) {
  return (
    <Card className="hidden bg-linear-to-br from-zinc-950 to-zinc-900 p-0 pr-14 md:block">
      <a className="flex items-start gap-6 p-6" href={href}>
        <div
          className={cn(
            "mt-1",
            "grid w-fit items-center rounded-lg p-2.5 text-primary",
            "bg-primary/15",
            "group-hover:bg-primary/20"
          )}
        >
          {icon}
        </div>
        <CardContent className="m-0 p-0">
          <CardTitle className="font-kanit font-semibold">{title}</CardTitle>
          <div>{content}</div>
        </CardContent>
      </a>
    </Card>
  );
}
