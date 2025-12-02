"use client";

import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react";
import Image from "next/image";
import MeetIcon from "@/assets/illustration/meet.avif";
import { BubbleCluster } from "@/components/bubble-cluster";
import { CircleStandards } from "@/components/circle-standards";
import { DarkAccents } from "@/components/dark-accents";
import { DevOc } from "@/components/devoc";
import { FranceMapGauge } from "@/components/france-map-gauge";
import { GapTriangle } from "@/components/gap-triangle";
import { Gauge } from "@/components/gauge";
import { LightGrid } from "@/components/light-grid";
import { OccitanieMapGauge } from "@/components/occitanie-map-gauge";
import { PieDonut } from "@/components/pie-donut";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Swiper
        className="h-screen w-full"
        direction="vertical"
        keyboard={{ enabled: true }}
        modules={[Mousewheel, Keyboard, Pagination]}
        mousewheel={{ forceToAxis: true }}
        pagination={{ clickable: true }}
      >
        {/* Slide 1: Deux composants: gauche/droite, gaps uniformes */}
        <SwiperSlide className="slide-ambient dark relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <DarkAccents />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center pt-12 md:pt-28 lg:pt-32">
            <div className="grid w-full max-w-6xl grid-cols-1 place-items-center gap-4 md:grid-cols-2">
              <motion.div
                className="mx-auto flex w-full items-center justify-center"
                style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))" }}
                transition={{ damping: 20, stiffness: 200, type: "spring" }}
                whileHover={{ scale: 1.02 }}
              >
                <BubbleCluster className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl" />
              </motion.div>
              <motion.div
                className="mx-auto flex w-full items-center justify-center"
                style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))" }}
                transition={{ damping: 20, stiffness: 200, type: "spring" }}
                whileHover={{ scale: 1.02 }}
              >
                <FranceMapGauge
                  className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl"
                  percent={80}
                />
              </motion.div>
            </div>
            <div className="pointer-events-auto absolute right-8 bottom-6 text-right text-muted-foreground text-xs">
              <div>Concentration de l'expertise numérique</div>
              <div>
                Source:{" "}
                <a
                  className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  href="https://www.insee.fr/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  INSEE
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Deux composants: gauche/droite, gaps uniformes (light) */}
        <SwiperSlide className="slide-ambient relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <LightGrid />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative flex h-full w-full flex-col items-center justify-center pt-12 md:pt-28 lg:pt-32">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 place-items-center gap-4 md:grid-cols-2 md:gap-8">
              <motion.div
                className="flex w-full items-center justify-center"
                style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))" }}
                transition={{ damping: 20, stiffness: 200, type: "spring" }}
                whileHover={{ scale: 1.02 }}
              >
                <OccitanieMapGauge
                  className="w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-xl"
                  percent={75}
                />
              </motion.div>
              <motion.div
                className="flex w-full items-center justify-center"
                style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))" }}
                transition={{ damping: 20, stiffness: 200, type: "spring" }}
                whileHover={{ scale: 1.02 }}
              >
                <GapTriangle className="w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-xl" />
              </motion.div>
            </div>
            <div className="pointer-events-auto absolute right-6 bottom-4 text-right text-muted-foreground text-xs">
              <div>Entreprises / établissements (Aude)</div>
              <div>
                Source:{" "}
                <a
                  className="underline"
                  href="https://www.insee.fr/fr/statistiques/4179701"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  INSEE
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Un composant centré (dark) */}
        <SwiperSlide className="slide-ambient dark relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <DarkAccents />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative flex h-full w-full items-center justify-center pt-12 md:pt-28 lg:pt-32">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3 text-center">
              <Gauge
                className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl"
                color="#dc2626"
                label="Dépendance cloud non-UE (hyp.)"
                value={70}
              />
              <div className="text-muted-foreground">
                Réorientation vers des solutions 🇪🇺 lorsque pertinent
              </div>
            </div>
            <div className="pointer-events-auto absolute right-8 bottom-6 text-right text-muted-foreground text-xs">
              Source:{" "}
              <a
                className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                href="https://siecledigital.fr/2022/10/03/pres-de-3-4-des-depenses-cloud-en-europe-sont-destinees-a-amazon-google-ou-microsoft/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Siecle Digital
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4: Deux composants gauche/droite (light) */}
        <SwiperSlide className="slide-ambient relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <LightGrid />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 pt-12 md:pt-28 lg:pt-32">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-4 md:grid-cols-2">
              <div className="flex w-full items-center justify-center">
                <CircleStandards className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl" />
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[20rem] sm:max-w-lg md:max-w-xl">
                  <motion.div
                    animate={{ y: [-20, 20, -20] }}
                    className="-inset-3 -z-10 absolute rounded-xl"
                    style={{
                      background:
                        "repeating-linear-gradient(180deg, var(--accent) 0px, var(--accent) 8px, transparent 8px, transparent 20px)",
                      opacity: 0.25,
                    }}
                    transition={{
                      duration: 6,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <Image
                    alt="Illustration de réunion"
                    className="h-auto w-full rounded-xl border border-border"
                    height={256}
                    priority
                    src={MeetIcon}
                    width={256}
                  />
                </div>
              </div>
              <div className="pointer-events-auto absolute right-8 bottom-6 text-right text-muted-foreground text-xs">
                Lien RGAA:{" "}
                <a
                  className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  href="https://www.numerique.gouv.fr/publications/rgaa-version-4-1/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  numerique.gouv.fr
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5: Un composant centré (dark) */}
        <SwiperSlide className="slide-ambient dark relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <DarkAccents />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative flex h-full w-full items-center justify-center pt-12 md:pt-28 lg:pt-32">
            <div className="mx-auto grid w-full max-w-4xl grid-cols-1 place-items-center gap-4 text-center">
              <PieDonut
                className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl"
                label="TPE/PME mal accompagnées en cybersécurité"
                value={80}
              />
            </div>
            <div className="pointer-events-auto absolute right-8 bottom-6 text-right text-muted-foreground text-xs">
              Source:{" "}
              <a
                className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                href="https://www.lopinion.fr/economie/tpe-pme-une-maturite-cyber-encore-bien-faible"
                rel="noopener noreferrer"
                target="_blank"
              >
                L'Opinion
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 6: Conclusion / CTA (light) */}
        <SwiperSlide>
          <section className="slide-ambient relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <LightGrid />
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
              <div className="shimmer-text font-bold font-kanit text-6xl">
                Choisissez
              </div>
              <motion.div
                className="neon-glow"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <Image
                  alt="QR vers prise de rendez-vous"
                  className="rounded-xl border border-border"
                  height={224}
                  priority
                  src="/qrcode.png"
                  width={224}
                />
              </motion.div>
              <DevOc />
              <div className="text-muted-foreground">
                Démo preview disponible:
              </div>
              <a
                className="rounded-lg border border-border bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/60"
                href="https://www.devoc.fr"
                rel="noopener noreferrer"
                target="_blank"
              >
                Voir la démo
              </a>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
