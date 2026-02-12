"use client";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import Threads from "@/components/react-bits/threads";

export default function ThreadsSeparator() {
  const { ref: separatorRef } = useNavTheme({
    sectionName: "contact",
    theme: "dark",
  });
  return (
    <div
      className="relative bg-zinc-950"
      ref={separatorRef}
      style={{
        height: "min(50vw, 700px)",
      }}
    >
      <Threads
        amplitude={1.5}
        color={[0.96, 0.56, 0.04]}
        distance={0}
        enableMouseInteraction={false}
      />
    </div>
  );
}
