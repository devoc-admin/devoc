import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
// biome-ignore lint/performance/noNamespaceImport: exception
import * as THREE from "three";

// ─── Vertex & Fragment shaders (identiques à l'original) ────────────────────

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform vec3 uBackgroundColor;
  uniform float uSpeed;
  uniform float uDistortion;
  uniform float uHueShift;
  uniform float uIntensity;

  mat3 hueRot(float a) {
    float c = cos(a), s = sin(a), t = 1.0 - c;
    return mat3(
      t*.333+c,     t*.333-s*.577, t*.333+s*.577,
      t*.333+s*.577, t*.333+c,    t*.333-s*.577,
      t*.333-s*.577, t*.333+s*.577, t*.333+c
    );
  }

  float colorLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  vec3 hueFromColor(vec3 c, vec3 fallback) {
    float m = max(max(c.r, c.g), c.b);
    if (m < 1e-5) return fallback;
    return clamp(c / m, 0.0, 1.0);
  }

  vec3 blendAdaptive(vec3 bg, vec3 effect, float softness) {
    float bgLum = colorLuma(bg);
    float lightBg = smoothstep(0.45, 0.95, bgLum);
    float edge = clamp(softness, 0.0, 1.0);

    vec3 additive = bg + effect;
    vec3 effectHue = hueFromColor(effect, vec3(1.0));
    vec3 tintTarget = mix(bg, effectHue, 0.9);
    vec3 tint = mix(bg, tintTarget, edge);

    return mix(additive, tint, lightBg);
  }

  void mainImage(out vec4 o, vec2 uv) {
    vec2 u = (uv * 2.0 - 1.0);
    u.x *= uResolution.x / uResolution.y;

    float time = uTime * uSpeed;

    u /= 0.5 + uDistortion * dot(u, u);
    u += 0.2 * cos(time) - 7.56;

    vec3 baseColor = uColor;

    vec3 palette[3];
    palette[0] = baseColor;
    palette[1] = hueRot(radians(uHueShift)) * baseColor;
    palette[2] = hueRot(radians(-uHueShift)) * baseColor;

    vec3 col = vec3(0.0);
    float edgeField = 0.0;
    for (int i = 0; i < 3; i++) {
      vec2 uv_loop = sin(1.5 * u.yx + 2.0 * cos(u -= 0.01));
      float val = 1.0 - exp(-6.0 / exp(6.0 * length(uv_loop + sin(5.0 * uv_loop.y - 3.0 * time) / 4.0)));
      val = pow(clamp(val, 0.0, 1.0), 1.4);
      edgeField += val;
      col += val * palette[i];
    }

    vec3 bands = col * uIntensity;
    float softMask = 1.0 - exp(-0.85 * edgeField * uIntensity);
    vec3 rgb = blendAdaptive(uBackgroundColor, bands, softMask);
    o = vec4(rgb, 1.0);
  }

  void main() {
    vec4 fragColor;
    mainImage(fragColor, vUv);
    gl_FragColor = fragColor;
    #include <colorspace_fragment>
  }
`;

// ─── Mesh interne (accède au contexte R3F) ───────────────────────────────────

export function SpecularBandsMesh({
  color = "#FF6900",
  backgroundColor = "#000000",
  speed = 1.0,
  distortion = 0.2,
  hueShift = 30.0,
  intensity = 1.0,
}) {
  // biome-ignore lint/suspicious/noExplicitAny: unavailable type
  const materialRef = useRef<any>(null);
  const { size } = useThree();

  // Uniforms stables — on les met à jour manuellement pour éviter les re-créations
  const uniforms = useMemo(
    () => ({
      uBackgroundColor: { value: new THREE.Color(backgroundColor) },
      uColor: { value: new THREE.Color(color) },
      uDistortion: { value: distortion },
      uHueShift: { value: hueShift },
      uIntensity: { value: intensity },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uSpeed: { value: speed },
      uTime: { value: 0.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // créés une seule fois
  );

  // Mise à jour réactive des uniforms scalaires/couleurs
  useFrame((_, delta) => {
    const m = materialRef.current;
    if (!m) return;

    m.uniforms.uTime.value += delta;
    m.uniforms.uResolution.value.set(size.width, size.height);
    m.uniforms.uColor.value.set(color);
    m.uniforms.uBackgroundColor.value.set(backgroundColor);
    m.uniforms.uSpeed.value = speed;
    m.uniforms.uDistortion.value = distortion;
    m.uniforms.uHueShift.value = hueShift;
    m.uniforms.uIntensity.value = intensity;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        depthTest={false}
        depthWrite={false}
        fragmentShader={fragmentShader}
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

export default function SpecularBands({
  color = "#FF6900",
  backgroundColor = "#000000",
  speed = 1.0,
  distortion = 0.2,
  hueShift = 30.0,
  intensity = 1.0,
  style = {},
  className = "",
}) {
  return (
    <div
      className={className}
      style={{ height: "100%", width: "100%", ...style }}
    >
      <Canvas
        camera={{ far: 10, near: 0.1 }}
        gl={{ antialias: false }}
        style={{ display: "block", height: "100%", width: "100%" }}
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
  );
}
