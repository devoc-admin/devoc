import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import { cn } from "@/lib/utils";
import { LavaLampMesh } from "./lava-lamp-scene";

type LavaLampProps = {
  className?: string;
  color?: string;
  fresnelColor?: string;
  fresnelPower?: number;
  radius?: number;
  smoothness?: number;
  speed?: number;
  [key: string]: unknown;
};

export default function LavaLamp({
  className = "",
  color = "#18181b",
  fresnelColor = "#ff6900",
  speed = 1.0,
  fresnelPower = 3.0,
  radius = 1,
  smoothness = 0.1,
  ...rest
}: LavaLampProps) {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...rest}
    >
      <div className="absolute inset-0 z-0">
        <Canvas dpr={dpr} gl={{ antialias: false, toneMapping: NoToneMapping }}>
          <LavaLampMesh
            color={color}
            fresnelColor={fresnelColor}
            fresnelPower={fresnelPower}
            radius={radius}
            smoothness={smoothness}
            speed={speed}
          />
        </Canvas>
      </div>
    </div>
  );
}
