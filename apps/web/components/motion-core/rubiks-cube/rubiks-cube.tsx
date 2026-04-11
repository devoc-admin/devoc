"use client";

import { Canvas } from "@react-three/fiber";
import type { ComponentProps } from "react";
import { NoToneMapping } from "three";
import { cn } from "@/lib/utils";
import { RubiksCubeScene } from "./rubiks-cube-scene";

type SceneProps = ComponentProps<typeof RubiksCubeScene>;

type RubiksCubeProps = {
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
  /**
   * Duration of the rotation animation in seconds.
   * @default 1.5
   */
  duration?: SceneProps["duration"];
  /**
   * Configuration for the Fresnel shader uniforms.
   */
  fresnelConfig?: SceneProps["fresnelConfig"];
  /**
   * Gap between the cubelets.
   * @default 0.015
   */
  gap?: SceneProps["gap"];
  /**
   * Corner radius of the cubelets.
   * @default 0.125
   */
  radius?: SceneProps["radius"];
  /**
   * The size of the individual cubelets.
   * @default 1
   */
  size?: SceneProps["size"];
} & Omit<React.ComponentProps<"div">, "className">;

export default function RubiksCube({
  className = "",
  size = 1,
  duration = 1.5,
  gap = 0.015,
  radius = 0.125,
  fresnelConfig,
  ...rest
}: RubiksCubeProps) {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...rest}
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10] }}
          dpr={dpr}
          gl={{ toneMapping: NoToneMapping }}
        >
          <RubiksCubeScene
            duration={duration}
            fresnelConfig={fresnelConfig}
            gap={gap}
            radius={radius}
            size={size}
          />
        </Canvas>
      </div>
    </div>
  );
}
