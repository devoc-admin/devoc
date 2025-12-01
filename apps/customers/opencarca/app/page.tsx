"use client";

import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react";
import Image from "next/image";
import { AuroraText } from "@/components/aurora-text";
import { BarCompare } from "@/components/bar-compare";
// import { MapPlaceholder } from "@/components/map-placeholder"; // remplacé par FranceMapGauge
import { FranceMapGauge } from "@/components/france-map-gauge";
import { Gauge } from "@/components/gauge";
import { KpiCard } from "@/components/kpi-card";
import { LineTrend } from "@/components/line-trend";
import { OccitanieMapSimple } from "@/components/occitanie-map";
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
        {/* Slide 1: Introduction & Slogan (light) */}
        <SwiperSlide>
          <section className="slide-ambient flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto max-w-6xl text-center">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <DevOcTitle />
              </motion.div>
              <motion.p
                animate={{ opacity: 1 }}
                className="shimmer-text mt-8 text-2xl text-muted-foreground"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Le Collectif Numérique, Made in Occitanie.
              </motion.p>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 2: Problème — Vulnérabilité & Risque (dark) */}
        <SwiperSlide>
          <section className="slide-ambient dark flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <PieDonut color="#dc2626" label="Part WordPress" value={43} />
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center gap-3 text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="shimmer-text float-slow font-bold font-kanit text-7xl">
                  90%
                </div>
                <div className="text-muted-foreground">
                  Failles via plugins tiers
                </div>
                <div className="text-muted-foreground/70 text-xs">
                  Sources: W3Techs, Sucuri
                </div>
              </motion.div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 3: Problème — Concentration & Coût (light) */}
        <SwiperSlide>
          <section className="slide-ambient flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <FranceMapGauge percent={75} />
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center gap-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <LineTrend points={[100, 90, 84, 76, 68]} />
                <div className="neon-glow float-slow font-bold font-kanit text-5xl">
                  +32%
                </div>
                <div className="text-muted-foreground">
                  Taux de rebond après 3s
                </div>
                <div className="text-muted-foreground/70 text-xs">
                  Sources: INSEE/Observatoires, Google (Core Web Vitals)
                </div>
              </motion.div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 4: Solution — Les 3 Piliers (dark) */}
        <SwiperSlide>
          <section className="slide-ambient dark flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
              <motion.div
                className="grid grid-cols-3 gap-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <KpiCard title="Performance" value="⚡" />
                <KpiCard title="Souveraineté" value="🛡️" />
                <KpiCard title="Proximité" value="🤝" />
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center gap-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Gauge label="Cloud US (Europe)" value={70} />
                <Gauge label="Souveraineté Dev'OC (OVHcloud)" value={100} />
                <div className="text-muted-foreground/70 text-xs">
                  Sources: ARCEP / Études sectorielles, Interne
                </div>
              </motion.div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 5: Marché Local & Pertinence (light) */}
        <SwiperSlide>
          <section className="slide-ambient flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="relative mx-auto w-full max-w-6xl">
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
              >
                <OccitanieMapSimple />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <div className="shimmer-text float-slow font-bold font-kanit text-7xl">
                  40 000
                </div>
                <div className="text-muted-foreground">
                  Entreprises / établissements (Aude)
                </div>
                <div className="neon-glow font-bold font-kanit text-5xl">
                  3 400
                </div>
                <div className="text-muted-foreground">
                  Communes en Occitanie
                </div>
                <div className="mt-2 text-muted-foreground/70 text-xs">
                  Sources: INSEE, CCI de l'Aude
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 6: Impact & Valeur (dark) */}
        <SwiperSlide>
          <section className="slide-ambient dark flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
              <BarCompare
                baseline={100}
                improved={55}
                labelBaseline="TCO actuel"
                labelImproved="TCO Dev'OC"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <div className="shimmer-text font-bold font-kanit text-6xl">
                  7 jours ouvrés
                </div>
                <div className="text-muted-foreground">
                  Déploiement (automatisation Pulumi)
                </div>
                <div className="mt-2 text-muted-foreground/70 text-xs">
                  Source: Interne
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 7: Appel à l'Action (light) */}
        <SwiperSlide>
          <section className="slide-ambient flex h-screen w-full items-center justify-center bg-background px-8 text-foreground">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
              <div className="shimmer-text font-bold font-kanit text-5xl">
                Investir Localement, Agir Globalement
              </div>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="neon-glow float-slow"
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  alt="Calendly QR"
                  className="h-56 w-56 rounded-xl border border-border"
                  height={224}
                  priority
                  src="/qrcode.png"
                  width={224}
                />
              </motion.div>
              <div className="text-muted-foreground">
                Le Futur du Numérique de Proximité.
              </div>
              <div className="text-muted-foreground/70 text-xs">
                Merci — scannez et planifions le prochain échange
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}

function DevOcTitle() {
  return (
    <h1 className="relative flex select-none items-center justify-center px-6 text-6xl xs:text-7xl sm:text-8xl md:text-9xl">
      <div className="pt-2 font-style-script">Dev'</div>
      <AuroraText className="font-extrabold tracking-tighter">Oc</AuroraText>
    </h1>
  );
}
