"use client";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import LaserFlow from "@/components/react-bits/laser-flow";
import Threads from "@/components/react-bits/threads";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionTitle from "../_components/section-title";
import ContactForm from "./components/contact-form";
import { type ContactItem, contactItems } from "./contact-data";

export default function Contact() {
  const { ref: sectionRef } = useNavTheme({
    sectionName: "contact",
    theme: "dark",
  });

  return (
    <>
      <div
        style={{
          height: "min(50vw, 800px)",
          position: "relative",
          width: "100vw",
        }}
      >
        <Threads
          amplitude={1}
          color={[0.96, 0.56, 0.04]}
          distance={0}
          enableMouseInteraction={false}
        />
      </div>
      <div
        className={cn(
          "relative",
          "flex flex-col items-center gap-24",
          "w-full",
          "overflow-hidden",
          "bg-linear-to-br bg-zinc-950",
          "px-6",
          "pb-24",
          "lg:pb-48",
          "2xl:pb-60"
        )}
        id="contact"
        ref={sectionRef}
      >
        {/* 🆎 Title */}
        <SectionTitle
          className="z-10"
          description="Prêt à démarrer votre projet ? Contactez notre équipe pour discuter de vos besoins et obtenir un devis personnalisé."
          title="Contactez-nous"
        />
        {/* 🃏 Cards */}
        <div
          className={cn(
            "z-1 flex w-full max-w-350 justify-center gap-6",
            "flex-col",
            "md:flex-row md:items-start"
          )}
        >
          <div className={cn("flex flex-col gap-6", "order-2", "md:order-1")}>
            {contactItems.map((item) => (
              <ContactCard key={item.id} {...item} />
            ))}
            {/* 📧 Response rapide garantie */}
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
                Nous nous engageons à répondre à tous les messages dans les 24
                heures ouvrées.
              </CardContent>
              <CardFooter className="font-bold text-primary text-sm">
                {/* 🟢 Équipe disponible */}
                <div className="mr-2 size-2 rounded-full bg-green-500" />
                <span>Équipe disponible</span>
              </CardFooter>
            </Card>
          </div>

          {/* 📝 Contact form */}
          <Card
            animation={false}
            className="relative order-1 grow overflow-visible bg-linear-to-br from-zinc-950 to-zinc-900 md:order-2"
          >
            <div className="mask-t-from-70% absolute top-0 left-0 hidden h-160 -translate-y-[50%] md:block">
              <LaserFlow
                color="#f59e0b"
                fogIntensity={0}
                horizontalSizing={2}
              />
            </div>
            <CardHeader>
              <CardTitle className={cn("text-center text-2xl", "xs:text-left")}>
                Démarrons votre projet
              </CardTitle>
            </CardHeader>
            <CardContent className={cn("z-10", "max-xs:p-3")}>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// ----------------------------------
function ContactCard({ icon, content, title, href }: ContactItem) {
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
