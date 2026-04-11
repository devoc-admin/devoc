"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
// biome-ignore lint/performance/noNamespaceImport: exception
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type FresnelConfig = {
  /**
   * Base body color for each cubelet.
   * @default "#111113"
   */
  color?: THREE.ColorRepresentation;
  /**
   * Accent color applied by the Fresnel rim.
   * @default "#FF6900"
   */
  rimColor?: THREE.ColorRepresentation;
  /**
   * Intensity multiplier for the Fresnel rim color.
   * @default 1.5
   */
  rimIntensity?: number;
  /**
   * Controls how tight the Fresnel rim hug is.
   * Higher values yield a thinner outline.
   * @default 6
   */
  rimPower?: number;
};

type RubiksCubeSceneProps = {
  duration?: number;
  fresnelConfig?: FresnelConfig;
  gap?: number;
  radius?: number;
  size?: number;
};

type Move = {
  axis: "x" | "y" | "z";
  direction: 1 | -1;
  layer: -1 | 0 | 1;
  rotationAngle?: number;
};

type Cube = {
  id: string;
  originalCoords: { x: number; y: number; z: number };
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
};

const POSSIBLE_MOVES: Move[] = (() => {
  const moves: Move[] = [];
  for (const axis of ["x", "y", "z"] as const) {
    for (const layer of [-1, 0, 1] as const) {
      for (const direction of [1, -1] as const) {
        moves.push({ axis, direction, layer });
      }
    }
  }
  return moves;
})();

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

const initializeCubes = (): Cube[] => {
  const newCubes: Cube[] = [];
  const coords = [-1, 0, 1];
  for (const x of coords) {
    for (const y of coords) {
      for (const z of coords) {
        newCubes.push({
          id: `cube-${x}-${y}-${z}`,
          originalCoords: { x, y, z },
          position: new THREE.Vector3(x, y, z),
          quaternion: new THREE.Quaternion(),
        });
      }
    }
  }
  return newCubes;
};

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform vec3 rimColor;
  uniform float rimPower;
  uniform float rimIntensity;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    float rim = 1.0 - max(0.0, dot(normal, viewDir));
    rim = pow(rim, rimPower) * rimIntensity;

    vec3 finalColor = color + rimColor * rim;

    gl_FragColor = vec4(finalColor, 1.0);
    #include <colorspace_fragment>
  }
`;

const DEFAULT_FRESNEL: Required<FresnelConfig> = {
  color: "#111113",
  rimColor: "#FF6900",
  rimIntensity: 1.5,
  rimPower: 6,
};

export function RubiksCubeScene({
  size = 1,
  duration = 1.5,
  gap = 0.015,
  radius = 0.125,
  fresnelConfig = {},
}: RubiksCubeSceneProps) {
  const mainGroupRef = useRef<THREE.Group>(null);
  const layerGroupRef = useRef<THREE.Group>(null);

  const stateRef = useRef({
    cubes: initializeCubes(),
    currentMove: null as Move | null,
    currentRotationProgress: 0,
    isAnimating: false,
    lastMoveAxis: null as Move["axis"] | null,
    timeSinceLastMove: 0,
  });

  const geometry = useMemo(
    () => new RoundedBoxGeometry(size, size, size, 20, radius),
    [size, radius]
  );

  const material = useMemo(() => {
    const config = { ...DEFAULT_FRESNEL, ...fresnelConfig };
    return new THREE.ShaderMaterial({
      fragmentShader,
      uniforms: {
        color: { value: new THREE.Color(config.color) },
        rimColor: { value: new THREE.Color(config.rimColor) },
        rimIntensity: { value: config.rimIntensity },
        rimPower: { value: config.rimPower },
      },
      vertexShader,
    });
  }, [fresnelConfig]);

  const reusableVec3 = useMemo(() => new THREE.Vector3(), []);
  const reusableMatrix4 = useMemo(() => new THREE.Matrix4(), []);
  const reusableQuaternion = useMemo(() => new THREE.Quaternion(), []);

  const createRotationMatrix = useCallback(
    (axis: Move["axis"], angle: number) => {
      reusableMatrix4.identity();
      reusableQuaternion.identity();
      reusableVec3.set(0, 0, 0);
      reusableVec3[axis] = 1;
      reusableQuaternion.setFromAxisAngle(reusableVec3, angle);
      return reusableMatrix4.makeRotationFromQuaternion(reusableQuaternion);
    },
    [reusableMatrix4, reusableQuaternion, reusableVec3]
  );

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Rubik's cube move commit logic
  const commitMove = useCallback(() => {
    const s = stateRef.current;
    if (!s.currentMove) return;

    const move = s.currentMove;
    const angle = (move.rotationAngle || Math.PI / 2) * move.direction;
    const rotMatrix = createRotationMatrix(move.axis, angle);

    for (const cube of s.cubes) {
      if (Math.round(cube.position[move.axis]) === move.layer) {
        cube.position.applyMatrix4(rotMatrix);
        const axisVec = reusableVec3.set(
          move.axis === "x" ? 1 : 0,
          move.axis === "y" ? 1 : 0,
          move.axis === "z" ? 1 : 0
        );
        const deltaQ = new THREE.Quaternion().setFromAxisAngle(axisVec, angle);
        cube.quaternion.premultiply(deltaQ).normalize();
        cube.position.set(
          Math.round(cube.position.x),
          Math.round(cube.position.y),
          Math.round(cube.position.z)
        );
      }
    }

    const layerGroup = layerGroupRef.current;
    if (layerGroup) layerGroup.rotation.set(0, 0, 0);

    s.isAnimating = false;
    s.currentRotationProgress = 0;
    s.currentMove = null;
    s.timeSinceLastMove = 0;
  }, [createRotationMatrix, reusableVec3]);

  const beginMove = useCallback((move: Move) => {
    const s = stateRef.current;
    if (s.isAnimating) return;
    s.currentMove = { ...move, rotationAngle: Math.PI / 2 };
    const layerGroup = layerGroupRef.current;
    if (layerGroup) layerGroup.rotation.set(0, 0, 0);
    s.isAnimating = true;
    s.currentRotationProgress = 0;
    s.lastMoveAxis = move.axis;
  }, []);

  const selectNextMove = useCallback(() => {
    const s = stateRef.current;
    const moves = POSSIBLE_MOVES.filter((m) => m.axis !== s.lastMoveAxis);
    if (moves.length === 0) return;
    const move = moves[Math.floor(Math.random() * moves.length)];
    beginMove(move);
  }, [beginMove]);

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: animation frame loop
  useFrame((_, delta) => {
    const s = stateRef.current;
    const mainGroup = mainGroupRef.current;
    const layerGroup = layerGroupRef.current;

    if (mainGroup) {
      mainGroup.rotation.x += delta * 0.3;
      mainGroup.rotation.y += delta * 0.5;
      mainGroup.rotation.z += delta * 0.2;
    }

    if (s.isAnimating && s.currentMove && layerGroup) {
      const move = s.currentMove;
      const progressInc = delta / duration;
      s.currentRotationProgress = Math.min(
        s.currentRotationProgress + progressInc,
        1
      );

      const eased = easeInOutCubic(s.currentRotationProgress);
      const angle =
        eased * (move.rotationAngle || Math.PI / 2) * move.direction;

      if (move.axis === "x") layerGroup.rotation.x = angle;
      else if (move.axis === "y") layerGroup.rotation.y = angle;
      else if (move.axis === "z") layerGroup.rotation.z = angle;

      if (s.currentRotationProgress >= 1) {
        commitMove();
      }
    } else {
      s.timeSinceLastMove += delta;
      if (s.timeSinceLastMove > 0.4) {
        selectNextMove();
      }
    }

    // Update mesh positions and quaternions from mutable state
    const { cubes, currentMove } = s;
    const activeIds = new Set<string>();

    if (currentMove) {
      for (const c of cubes) {
        if (Math.round(c.position[currentMove.axis]) === currentMove.layer) {
          activeIds.add(c.id);
        }
      }
    }

    // Update static meshes
    let staticIdx = 0;
    let activeIdx = 0;
    for (const cube of cubes) {
      const isActive = activeIds.has(cube.id);
      const group = isActive ? layerGroup : mainGroup;
      if (!group) continue;

      const idx = isActive ? activeIdx : staticIdx;
      const mesh = group.children[idx] as THREE.Mesh | undefined;
      if (mesh) {
        mesh.position.set(
          cube.position.x * (size + gap),
          cube.position.y * (size + gap),
          cube.position.z * (size + gap)
        );
        mesh.quaternion.copy(cube.quaternion);
        mesh.visible = true;
      }

      if (isActive) activeIdx++;
      else staticIdx++;
    }

    // Hide excess meshes
    if (mainGroup) {
      for (let i = staticIdx; i < mainGroup.children.length; i++) {
        const child = mainGroup.children[i];
        if (child !== layerGroup) {
          child.visible = false;
        }
      }
    }
    if (layerGroup) {
      for (let i = activeIdx; i < layerGroup.children.length; i++) {
        layerGroup.children[i].visible = false;
      }
    }
  });

  // Pre-create 27 mesh slots: some in mainGroup (static), some in layerGroup (active)
  // Since the split changes dynamically, we put all 27 in mainGroup and 27 in layerGroup,
  // and control visibility in useFrame
  const meshSlots = useMemo(() => Array.from({ length: 27 }, (_, i) => i), []);

  return (
    <>
      <OrbitControls enableDamping enableZoom={false} target={[0, 0, 0]} />

      <group ref={mainGroupRef}>
        {meshSlots.map((i) => (
          <mesh geometry={geometry} key={`static-${i}`} material={material} />
        ))}
        <group ref={layerGroupRef}>
          {meshSlots.map((i) => (
            <mesh geometry={geometry} key={`active-${i}`} material={material} />
          ))}
        </group>
      </group>
    </>
  );
}
