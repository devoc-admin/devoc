"use client";

import { Canvas } from "@react-three/fiber";
import { clsx } from "clsx"; // ou remplace clsx par ton utilitaire cn
import { useInView } from "motion/react";
import { useRef } from "react";
import { NoToneMapping } from "three";
import "../silence-three-clock-deprecation";
import { SpecularBandsMesh } from "./specular-band-scene"; // le mesh interne — voir note ci-dessous

// 📐 Soft gradients don't need full retina resolution: cap the pixel ratio
// to keep the fragment shader cheap on high-DPR phones (≈4× fewer pixels at 3×)
const DPR_RANGE: [number, number] = [1, 1.5];

export default function SpecularBandsBackground({
  className = "",
  color = "#f48c06",
  backgroundColor = "#000000",
  speed = 1.0,
  distortion = 0.2,
  hueShift = 1.0,
  intensity = 4.0,
  ...rest
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // ⏸️ Stop the render loop while the background is off-screen
  const isInView = useInView(containerRef);

  return (
    <div
      className={clsx("relative h-full w-full overflow-hidden", className)}
      ref={containerRef}
      {...rest}
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={DPR_RANGE}
          frameloop={isInView ? "always" : "never"}
          gl={{ antialias: false, toneMapping: NoToneMapping }}
        >
          <SpecularBandsMesh
            backgroundColor={backgroundColor}
            color={color}
            distortion={distortion}
            hueShift={hueShift}
            intensity={intensity}
            speed={speed}
          />
        </Canvas>
      </div>
    </div>
  );
}
