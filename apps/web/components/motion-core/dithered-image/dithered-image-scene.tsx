import { useEffect, useMemo, useRef } from "react";
// biome-ignore lint/performance/noNamespaceImport: exception
import * as THREE from "three";

type DitherMap = "bayer4x4" | "bayer8x8" | "halftone" | "voidAndCluster";

interface DitherImageProps {
  /**
   * Background color.
   * @default "#111113"
   */
  backgroundColor?: string;
  /** Optional class name for the canvas wrapper. */
  className?: string;
  /**
   * Foreground color (dots).
   * @default "#ff6900"
   */
  color?: string;
  /**
   * Type of dithering map to use.
   * @default "bayer4x4"
   */
  ditherMap?: DitherMap;
  /** The image source URL. */
  image: string;
  /**
   * Pixel size of the dithering effect.
   * @default 1
   */
  pixelSize?: number;
  /**
   * Threshold for the dithering effect.
   * @default 0.0
   */
  threshold?: number;
}

const THRESHOLD_MAPS: Record<DitherMap, number[]> = {
  bayer4x4: [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
  bayer8x8: [
    0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
    14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55,
    23, 61, 29, 53, 21,
  ],
  halftone: [
    24, 10, 12, 26, 35, 47, 49, 37, 8, 0, 2, 14, 45, 59, 61, 51, 22, 6, 4, 16,
    43, 57, 63, 53, 30, 20, 18, 28, 33, 41, 55, 39, 34, 46, 48, 36, 25, 11, 13,
    27, 44, 58, 60, 50, 9, 1, 3, 15, 42, 56, 62, 52, 23, 7, 5, 17, 32, 40, 54,
    38, 31, 21, 19, 29,
  ],
  voidAndCluster: [
    131, 187, 8, 78, 50, 18, 134, 89, 155, 102, 29, 95, 184, 73, 22, 86, 113,
    171, 142, 105, 34, 166, 9, 60, 151, 128, 40, 110, 168, 137, 45, 28, 64, 188,
    82, 54, 124, 189, 80, 13, 156, 56, 7, 61, 186, 121, 154, 6, 108, 177, 24,
    100, 38, 176, 93, 123, 83, 148, 96, 17, 88, 133, 44, 145, 69, 161, 139, 72,
    30, 181, 115, 27, 163, 47, 178, 65, 164, 14, 120, 48, 5, 127, 153, 52, 190,
    58, 126, 81, 116, 21, 106, 77, 173, 92, 191, 63, 99, 12, 76, 144, 4, 185,
    37, 149, 192, 39, 135, 23, 117, 31, 170, 132, 35, 172, 103, 66, 129, 79, 3,
    97, 57, 159, 70, 141, 53, 94, 114, 20, 49, 158, 19, 146, 169, 122, 183, 11,
    104, 180, 2, 165, 152, 87, 182, 118, 91, 42, 67, 25, 84, 147, 43, 85, 125,
    68, 16, 136, 71, 10, 193, 112, 160, 138, 51, 111, 162, 26, 194, 46, 174,
    107, 41, 143, 33, 74, 1, 101, 195, 15, 75, 140, 109, 90, 32, 62, 157, 98,
    167, 119, 179, 59, 36, 130, 175, 55, 0, 150,
  ],
};

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  uniform sampler2D uThresholdMap;
  uniform vec2 uResolution;
  uniform vec2 uMapSize;
  uniform vec2 uCoverScale;
  uniform vec2 uCoverOffset;
  uniform float uPixelSize;
  uniform float uThreshold;
  uniform vec3 uColor;
  uniform vec3 uBackgroundColor;

  varying vec2 vUv;

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  void main() {
    vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize);

    vec2 centerPixel = pixelCoord * uPixelSize + (uPixelSize * 0.5);
    vec2 centerUv = centerPixel / uResolution;

    vec2 coverScale = max(uCoverScale, vec2(0.00001));
    vec2 imageUv = coverScale * centerUv + uCoverOffset;

    vec4 texColor = texture2D(uTexture, imageUv);

    vec2 mapUv = mod(pixelCoord, uMapSize) / uMapSize;
    mapUv += (0.5 / uMapSize);

    float thresholdValue = texture2D(uThresholdMap, mapUv).r;

    float lum = getLuminance(texColor.rgb);

    float dither = step(thresholdValue + uThreshold, lum);

    vec3 ditheredColor = mix(uBackgroundColor, uColor, dither);

    gl_FragColor = vec4(ditheredColor, 1.0);
    #include <colorspace_fragment>
  }
`;

export default function DitherImage({
  image,
  ditherMap = "bayer4x4",
  pixelSize = 1,
  color = "#ff6900",
  backgroundColor = "#111113",
  threshold = 0.0,
  className,
}: DitherImageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animFrameRef = useRef<number>(0);

  // Build threshold texture whenever ditherMap changes
  const thresholdTexture = useMemo(() => {
    const data = THRESHOLD_MAPS[ditherMap] ?? THRESHOLD_MAPS.bayer4x4;
    const size = Math.sqrt(data.length);
    const floatData = new Float32Array(data.length);
    for (let i = 0; i < data.length; i++) {
      floatData[i] = data[i] / data.length;
    }
    const tex = new THREE.DataTexture(
      floatData,
      size,
      size,
      THREE.RedFormat,
      THREE.FloatType
    );
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
  }, [ditherMap]);

  // Initialize Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const dpr = window.devicePixelRatio;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const material = new THREE.ShaderMaterial({
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uBackgroundColor: { value: new THREE.Color() },
        uColor: { value: new THREE.Color() },
        uCoverOffset: { value: new THREE.Vector2(0, 0) },
        uCoverScale: { value: new THREE.Vector2(1, 1) },
        uMapSize: { value: new THREE.Vector2(4, 4) },
        uPixelSize: { value: 1 },
        uResolution: { value: new THREE.Vector2(w * dpr, h * dpr) },
        uTexture: { value: null },
        uThreshold: { value: 0.0 },
        uThresholdMap: { value: null },
      },
      vertexShader: VERTEX_SHADER,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!(container && renderer)) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      renderer.setSize(newW, newH);

      const dpr = window.devicePixelRatio;
      material.uniforms.uResolution.value.set(newW * dpr, newH * dpr);

      // Recompute cover uniforms if texture already loaded
      const tex = material.uniforms.uTexture.value as THREE.Texture | null;
      if (tex?.image) {
        updateCoverUniforms(
          material,
          newW,
          newH,
          // @ts-expect-error
          tex.image.width,
          // @ts-expect-error
          tex.image.height
        );
      }
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load image texture
  useEffect(() => {
    const material = materialRef.current;
    const container = mountRef.current;
    if (!(material && container)) return;

    const loader = new THREE.TextureLoader();
    loader.load(image, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      material.uniforms.uTexture.value = tex;
      updateCoverUniforms(
        material,
        container.clientWidth,
        container.clientHeight,
        tex.image.width,
        tex.image.height
      );
    });
  }, [image]);

  // Sync threshold texture
  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    const mapSize = Math.sqrt(
      (THRESHOLD_MAPS[ditherMap] ?? THRESHOLD_MAPS.bayer4x4).length
    );
    material.uniforms.uThresholdMap.value = thresholdTexture;
    material.uniforms.uMapSize.value.set(mapSize, mapSize);
  }, [thresholdTexture, ditherMap]);

  // Sync scalar/color uniforms
  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uPixelSize.value = pixelSize;
  }, [pixelSize]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uThreshold.value = threshold;
  }, [threshold]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    (material.uniforms.uColor.value as THREE.Color).set(color);
  }, [color]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    (material.uniforms.uBackgroundColor.value as THREE.Color).set(
      backgroundColor
    );
  }, [backgroundColor]);

  return (
    <div
      className={className}
      ref={mountRef}
      style={{ height: "100%", width: "100%" }}
    />
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function updateCoverUniforms(
  material: THREE.ShaderMaterial,
  screenW: number,
  screenH: number,
  imageW: number,
  imageH: number
) {
  const screenAspect = screenW / screenH;
  const imageAspect = imageW / imageH;

  let scaleX = 1;
  let scaleY = 1;
  let offsetX = 0;
  let offsetY = 0;

  if (screenAspect > imageAspect) {
    scaleY = imageAspect / screenAspect;
    offsetY = (1 - scaleY) * 0.5;
  } else {
    scaleX = screenAspect / imageAspect;
    offsetX = (1 - scaleX) * 0.5;
  }

  material.uniforms.uCoverScale.value.set(scaleX, scaleY);
  material.uniforms.uCoverOffset.value.set(offsetX, offsetY);
}
