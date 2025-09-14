"use client";
import {
  ArrowRightIcon,
  ChevronsLeftRightIcon,
  type LucideProps,
  UsersRoundIcon,
  ZapIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Subtitle from "../components/subtitle";
import SudWeb from "../components/sud-web";

function Item({
  title,
  subtitle,
  Icon,
}: {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<LucideProps>;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <h3 className="text-3xl font-bold flex items-center gap-2">
        <Icon size={34} className="text-purple-600" strokeWidth={2} />
        <span className="font-black">{title}</span>
      </h3>
      <div className="text-base text-gray-500">{subtitle}</div>
    </div>
  );
}

export default function Main() {
  return (
    <div className="flex h-screen w-full flex-col justify-center items-center gap-2">
      <SudWeb />
      <Subtitle>
        Nous créons des sites web et applications sur mesure pour propulser
        votre organisation vers le succès digital. Expertise technique, design
        moderne, résultats garantis.
      </Subtitle>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 flex gap-4"
      >
        <Button className="rounded-full hover:bg-purple-600/90 hover:cursor-pointer hover:scale-103 bg-gradient-to-r from-purple-600 to-purple-400 px-8 py-5.5 text-lg font-bold">
          <div className="flex gap-3 items-center">
            <span>Démarrer un projet</span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </Button>
        <Button className="rounded-full bg-black border-2 hover:cursor-pointer border-purple-600 px-8 py-5.5 text-lg font-bold">
          <div className="flex gap-3 items-center">
            <span>Voir nos réalisations</span>
          </div>
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.7,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="flex gap-12 mt-6"
      >
        <Item
          title="100+"
          subtitle="Projets réalisés"
          Icon={ChevronsLeftRightIcon}
        />
        <Item title="50+" subtitle="Clients satisfaits" Icon={UsersRoundIcon} />
        <Item title="10+" subtitle="Années d'expérience" Icon={ZapIcon} />
      </motion.div>
    </div>
  );
}
