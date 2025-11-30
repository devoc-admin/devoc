"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { createContext, useContext, useState } from "react";
import { Safari } from "@/components/magicui/safari";
import { WordRotate } from "@/components/magicui/word-rotate";
import { RatingBadge } from "@/components/untitledui/rating-badge";
import { achievements } from "./achievements";

type AchievementContext = {
  changeAchievementIndex: (delta: number) => void;
  currentIndex: number;
};

const defaultAchievementContext: AchievementContext = {
  // biome-ignore lint/suspicious/noEmptyBlockStatements: exception
  changeAchievementIndex: () => {},
  currentIndex: 0,
};

const AchievementsContext = createContext<AchievementContext>(
  defaultAchievementContext
);

export function AchievementsDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const changeAchievementIndex = (delta: number) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = (prevIndex + delta) % achievements.length;
      if (newIndex < 0) newIndex = achievements.length - 1;
      return newIndex;
    });
  };
  return (
    <AchievementsContext
      value={{
        changeAchievementIndex,
        currentIndex,
      }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] gap-x-12">
        <AchievementsPanel />
        <AchievementsPreview />
      </div>
    </AchievementsContext>
  );
}

function AchievementsPanel() {
  const { currentIndex } = useContext(AchievementsContext);
  const currentAchievement = achievements[currentIndex];
  const { accomplishments } = currentAchievement;
  return (
    <div className="perspective-midrange flex flex-col gap-y-2">
      {/* 📝 Description */}
      <div className="flex h-[430px] max-w-[550px] rotate-y-8 flex-col justify-between gap-y-6 rounded-xl p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-y-4">
          <h3 className="text-center font-bold font-kanit text-5xl text-white">
            {currentAchievement.title}
          </h3>
          <p className="text-lg text-white leading-tight">
            {currentAchievement.description}
          </p>
        </div>
        <a
          className="flex justify-center"
          href={currentAchievement.companyLink}
          target="_blank"
        >
          {currentAchievement.companyLogo}
        </a>
        {/* 👑 */}
        {accomplishments && (
          <AchievementWithWreaths accomplishments={accomplishments} />
        )}
      </div>
      <div />
      {/* ⬅️➡️ Buttons */}
      <div className="flex rotate-y-8 justify-center gap-x-12">
        <AchievementButton delta={-1}>
          <ArrowLeftIcon size={37} />
        </AchievementButton>
        <AchievementButton delta={1}>
          <ArrowRightIcon size={37} />
        </AchievementButton>
      </div>
    </div>
  );
}

function AchievementWithWreaths({
  accomplishments,
}: {
  accomplishments: string[];
}) {
  return (
    <RatingBadge className="mx-auto text-yellow-400">
      <WordRotate
        className="flex max-w-[200px] text-center font-bold text-base leading-none"
        duration={5000}
        words={accomplishments}
      />
    </RatingBadge>
  );
}

function AchievementButton({
  delta,
  children,
}: {
  delta: number;
  children: React.ReactNode;
}) {
  const { changeAchievementIndex } = useContext(AchievementsContext);
  return (
    <button
      className="cursor-pointer rounded-full bg-zinc-900/20 p-5 text-white backdrop-blur-xl"
      onClick={() => changeAchievementIndex(delta)}
      type="button"
    >
      {children}
    </button>
  );
}

function AchievementsPreview() {
  return (
    <div className="perspective-midrange w-[40vw] max-w-[700px] grow px-12">
      {achievements.map(({ id }, index) => (
        <Rotate3dAndFloat index={index} key={id}>
          <MoveAnimation index={index}>
            <AchievementPreview index={index} />
          </MoveAnimation>
        </Rotate3dAndFloat>
      ))}
    </div>
  );
}

const rotateY = -15;
const amplitude = -15;

function Rotate3dAndFloat({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const randomDelay = Math.random() * 2;
  return (
    <motion.div
      animate={{
        transition: {
          delay: randomDelay,
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY, // Repeat the animation indefinitely
          repeatType: "loop", // Loop the animation
        },
        y: [0, amplitude, 0], // Move ⬆️ and ⬇️
      }}
      className="transform-3d absolute! pointer-events-none top-0 left-0 aspect-auto h-auto w-full"
      initial={{
        rotateY,
        y: 0,
      }}
      style={{
        zIndex: achievements.length - index,
      }}
    >
      {children}
    </motion.div>
  );
}

const depth = 40;

function MoveAnimation({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const { currentIndex } = useContext(AchievementsContext);
  const positionInStack = index - currentIndex;
  const maskIt = positionInStack < 0 || positionInStack > 1;

  const position = {
    translateX: depth * positionInStack,
    translateY: -depth * positionInStack,
    translateZ: -depth * positionInStack,
  };

  // const initialPosition = {
  //   translateX: position.translateX + depth,
  //   translateY: position.translateY - depth,
  //   translateZ: -(position.translateZ + depth),
  // };
  return (
    <motion.div
      animate={{
        opacity: maskIt ? 0 : 1,
        transition: {
          duration: 1,
        },
        ...position,
      }}
      initial={{
        opacity: 0,
        ...position,
      }}
    >
      {children}
    </motion.div>
  );
}

function AchievementPreview({ index }: { index: number }) {
  const currentAchievement = achievements[index];
  const image = currentAchievement.snapshots[0];
  const url = currentAchievement.companyLink;

  const { currentIndex } = useContext(AchievementsContext);
  const positionInStack = index - currentIndex;
  const isInvisible = positionInStack > 0;

  return <Safari image={image} invisibleMode={isInvisible} url={url} />;
}
