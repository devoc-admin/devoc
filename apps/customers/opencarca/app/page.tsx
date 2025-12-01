"use client";

import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react";
import Image from "next/image";
import { BubbleCluster } from "@/components/bubble-cluster";
import { CircleStandards } from "@/components/circle-standards";
import { DevOc } from "@/components/devoc";
import { FranceMapGauge } from "@/components/france-map-gauge";
import { GapTriangle } from "@/components/gap-triangle";
import { Gauge } from "@/components/gauge";
import { OccitanieMapGauge } from "@/components/occitanie-map-gauge";
import { PieDonut } from "@/components/pie-donut";
import { Shapes } from "@/components/shapes-bg";

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
        {/* Slide 1: Hero centré (haut) + bulles/gauge (haut milieu) */}
        <SwiperSlide className="slide-ambient relative flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
          <Shapes />
          <div className="interactive-layer relative mx-auto flex flex-col items-center">
            {/* Haut: DevOc + Keywords, centrés */}
            <div className="flex flex-col items-center justify-center">
              <DevOc />
              {/* <KeywordsRotating /> */}
            </div>
            {/* Haut milieu: gauche bulles, droite carte France */}
            <div className="grid w-full grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-2">
              <div className="mx-auto flex w-full items-center justify-center">
                <BubbleCluster />
              </div>
              <div className="mx-auto flex w-full items-center justify-center">
                <FranceMapGauge percent={80} />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Occitanie 75% + Triangle GAP (dark) */}
        <SwiperSlide>
          <section className="slide-ambient dark flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <OccitanieMapGauge percent={75} />
              </div>
              <div className="flex items-center justify-center">
                <GapTriangle />
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 3: Gouvernance — 70% rouge (light) */}
        <SwiperSlide>
          <section className="slide-ambient flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center">
              <Gauge
                color="#dc2626"
                label="Dépendance cloud non-UE (hyp.)"
                value={70}
              />
              <div className="text-muted-foreground">
                Réorientation vers des solutions 🇪🇺 lorsque pertinent
              </div>
              <div className="text-muted-foreground text-xs">
                Source:{" "}
                <a
                  className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  href="https://siecledigital.fr/2022/10/03/pres-de-3-4-des-depenses-cloud-en-europe-sont-destinees-a-amazon-google-ou-microsoft/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  EU Digital Strategy
                </a>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 4: Accompagnement — RGAA / RGPD / RGS (dark) */}
        <SwiperSlide>
          <section className="slide-ambient dark flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
              <CircleStandards />
              <div className="text-muted-foreground text-xs">
                Lien RGAA:{" "}
                <a
                  className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  href="https://www.numerique.gouv.fr/publications/rgaa-version-4-1/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  accessibilite.numerique.gouv.fr
                </a>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 5: Protection — Anneau 80% (light) */}
        <SwiperSlide>
          <section className="slide-ambient flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center">
              <PieDonut label="Maturité cyber (objectif)" value={80} />
              <div className="text-muted-foreground text-xs">
                Source:{" "}
                <a
                  className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  href="https://www.lopinion.fr/economie/tpe-pme-une-maturite-cyber-encore-bien-faible"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ANSSI
                </a>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 6: Conclusion / CTA (dark) */}
        <SwiperSlide>
          <section className="slide-ambient dark flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
              <div className="shimmer-text font-bold font-kanit text-6xl">
                Choisissez
              </div>
              <motion.div
                className="neon-glow"
                initial={{ opacity: 0, scale: 0.95 }}
                style={{ background: "gray" }}
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
