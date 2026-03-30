import { Canvas } from "@react-three/fiber";
import { clsx } from "clsx"; // ou remplace clsx par ton utilitaire cn
import { NoToneMapping } from "three";
import { SpecularBandsMesh } from "./specular-band-scene"; // le mesh interne — voir note ci-dessous

export default function SpecularBandsBackground({
  className = "",
  color = "#f48c06",
  backgroundColor = "#000000",
  speed = 1.0,
  distortion = 0.2,
  hueShift = 30.0,
  intensity = 1.0,
  ...rest
}) {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;

  return (
    <div
      className={clsx("relative h-full w-full overflow-hidden", className)}
      {...rest}
    >
      <div className="absolute inset-0 z-0">
        <Canvas dpr={dpr} gl={{ antialias: false, toneMapping: NoToneMapping }}>
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
