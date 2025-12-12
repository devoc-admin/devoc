"use client";

import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react";
import Image from "next/image";
import { BubbleCluster } from "@/components/bubble-cluster";
import { CircleStandards } from "@/components/circle-standards";
import { DarkAccents } from "@/components/dark-accents";
import { DevOc } from "@/components/devoc";
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
        {/* Slide 1: Chiffre choc Accessibilité */}
        <SwiperSlide className="slide-ambient dark relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <DarkAccents />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center pt-12 md:pt-28 lg:pt-32">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3 text-center">
              <Gauge
                className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl"
                color="#dc2626"
                label="Des administrations publiques non conformes au RGAA"
                value={99}
              />
            </div>
            <div className="pointer-events-auto absolute right-8 bottom-6 text-right text-muted-foreground text-xs">
              <div>
                Source:{" "}
                <a
                  className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  href="https://labo.societenumerique.gouv.fr/fr/articles/accessibilit%C3%A9-des-sites-web-publics-face-aux-obligations-de-la-loi-handicap-l%C3%A9mergence-de-multiples-observatoires/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Labo Société Numérique
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Chiffre choc Cybersécurité */}
        <SwiperSlide className="slide-ambient relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <LightGrid />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative flex h-full w-full flex-col items-center justify-center pt-12 md:pt-28 lg:pt-32">
            <div className="mx-auto grid w-full max-w-4xl grid-cols-1 place-items-center gap-4 text-center">
              <PieDonut
                className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl"
                label="Des Administrations publiques victimes de cyberattaques en 2020"
                value={85}
              />
            </div>
          </div>
          <div className="pointer-events-auto absolute right-8 bottom-6 text-right text-muted-foreground text-xs">
            Source:{" "}
            <a
              className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
              href="https://www.groupeonepoint.com/fr/publications/le-secteur-public-face-aux-defis-de-la-cybersecurite/#:~:text=Les%20organisations%20publiques%20ont%20subi,une%20cyberattaque%20en%202020%5B2%5D"
              rel="noopener noreferrer"
              target="_blank"
            >
              OnePoint
            </a>
          </div>
        </SwiperSlide>

        {/* Slide 3: Dev'Oc */}
        <SwiperSlide className="slide-ambient dark relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <DarkAccents />
          <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
            <DevOc />
          </div>
          <div className="relative flex h-full w-full items-center justify-center pt-12 md:pt-28 lg:pt-32">
            <motion.div
              className="flex w-full items-center justify-center"
              style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))" }}
              transition={{ damping: 20, stiffness: 200, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <OccitanieMapGauge
                className="w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-xl"
                percent={77}
              />
            </motion.div>
            <motion.div
              className="mx-auto flex w-full items-center justify-center"
              style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))" }}
              transition={{ damping: 20, stiffness: 200, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <BubbleCluster className="w-full max-w-[20rem] sm:max-w-lg md:max-w-xl" />
            </motion.div>
            <div className="pointer-events-auto absolute right-8 bottom-6 text-right text-muted-foreground text-xs">
              Source:{" "}
              <a
                className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                href="https://www.insee.fr/fr/statistiques/8582392"
                rel="noopener noreferrer"
                target="_blank"
              >
                INSEE
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4: Package Offre Dev'Oc */}
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
                    className="flex w-full items-center justify-center"
                    style={{
                      filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))",
                    }}
                    transition={{ damping: 20, stiffness: 200, type: "spring" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <GapTriangle className="w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-xl" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5: Notre Méthode */}
        <SwiperSlide>
          <div className="slide-ambient dark relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <DarkAccents />
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
          </div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
