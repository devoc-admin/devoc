<script lang="ts">
import type { ComponentProps } from "svelte";
import type Scene from "./RubiksCubeScene.svelte";

type SceneProps = ComponentProps<typeof Scene>;

interface Props {
  /**
   * Additional CSS classes for the container.
   */
  class?: string;
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

  [key: string]: unknown;
}

let {
  class: className = "",
  size = 1,
  duration = 1.5,
  gap = 0.015,
  radius = 0.125,
  fresnelConfig,
  ...rest
}: Props = $props();

const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;
</script>

<div class={cn("relative h-full w-full overflow-hidden", className)} {...rest}>
	<div class="absolute inset-0 z-0">
		<Canvas {dpr} toneMapping={NoToneMapping}>
			<Scene {size} {duration} {gap} {radius} {fresnelConfig} />
		</Canvas>
	</div>
</div>
