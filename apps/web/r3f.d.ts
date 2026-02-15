import "react";
import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  // biome-ignore lint/style/noNamespace: required for JSX module augmentation
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

declare module "react/jsx-runtime" {
  // biome-ignore lint/style/noNamespace: required for JSX module augmentation
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
