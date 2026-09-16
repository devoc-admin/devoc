import FuzzyText from "@/components/react-bits/fuzzy-text";

export default function NotFoundPage() {
  return (
    <div className="grid h-screen place-items-center bg-black">
      <div className="space-y-2 text-center">
        <FuzzyText baseIntensity={0.15} enableHover hoverIntensity={0.3}>
          404
        </FuzzyText>
        <FuzzyText
          baseIntensity={0.15}
          enableHover
          fontSize={30}
          hoverIntensity={0.3}
        >
          Page non trouvée
        </FuzzyText>
      </div>
    </div>
  );
}
