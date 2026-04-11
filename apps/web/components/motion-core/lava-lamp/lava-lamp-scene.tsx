import { OrthographicCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
// biome-ignore lint/performance/noNamespaceImport: exception
import * as THREE from "three";

type LavaLampSceneProps = {
  color?: string;
  fresnelColor?: string;
  fresnelPower?: number;
  radius?: number;
  smoothness?: number;
  speed?: number;
};

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec4 uResolution;

  void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec4 uResolution;
  uniform vec3 uColor;
  uniform vec3 uFresnelColor;
  uniform float uFresnelPower;
  uniform float uRadius;
  uniform float uSmoothness;

  float PI = 3.141592653589793238;

  mat4 rotationMatrix(vec3 axis, float angle) {
      axis = normalize(axis);
      float s = sin(angle);
      float c = cos(angle);
      float oc = 1.0 - c;
      return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                  0.0,                                0.0,                                0.0,                                1.0);
  }

  vec3 rotate(vec3 v, vec3 axis, float angle) {
      mat4 m = rotationMatrix(axis, angle);
      return (m * vec4(v, 1.0)).xyz;
  }

  float smin( float a, float b, float k ) {
      k *= 6.0;
      float h = max( k-abs(a-b), 0.0 )/k;
      return min(a,b) - h*h*h*k*(1.0/6.0);
  }

  float sphereSDF(vec3 p, float r) {
      return length(p) - r;
  }

  float sdf(vec3 p) {
      vec3 p1 = rotate(p, vec3(0.0, 0.0, 1.0), uTime/5.0);
      vec3 p2 = rotate(p, vec3(1.), -uTime/5.0);
      vec3 p3 = rotate(p, vec3(1., 1., 0.), -uTime/4.5);
      vec3 p4 = rotate(p, vec3(0., 1., 0.), -uTime/4.0);

      float r = uRadius;

      float final = sphereSDF(p1 - vec3(-0.5, 0.0, 0.0), 0.35 * r);
      float nextSphere = sphereSDF(p2 - vec3(0.55, 0.0, 0.0), 0.3 * r);
      final = smin(final, nextSphere, uSmoothness);
      nextSphere = sphereSDF(p2 - vec3(-0.8, 0.0, 0.0), 0.2 * r);
      final = smin(final, nextSphere, uSmoothness);
      nextSphere = sphereSDF(p3 - vec3(1.0, 0.0, 0.0), 0.15 * r);
      final = smin(final, nextSphere, uSmoothness);
      nextSphere = sphereSDF(p4 - vec3(0.45, -0.45, 0.0), 0.15 * r);
      final = smin(final, nextSphere, uSmoothness);

      return final;
  }

  vec3 getNormal(vec3 p) {
      float d = 0.001;
      return normalize(vec3(
          sdf(p + vec3(d, 0.0, 0.0)) - sdf(p - vec3(d, 0.0, 0.0)),
          sdf(p + vec3(0.0, d, 0.0)) - sdf(p - vec3(0.0, d, 0.0)),
          sdf(p + vec3(0.0, 0.0, d)) - sdf(p - vec3(0.0, 0.0, d))
      ));
  }

  float rayMarch(vec3 rayOrigin, vec3 ray) {
      float t = 0.0;
      for (int i = 0; i < 100; i++) {
          vec3 p = rayOrigin + ray * t;
          float d = sdf(p);
          if (d < 0.001) return t;
          t += d;
          if (t > 100.0) break;
      }
      return -1.0;
  }

  void main() {
      vec2 newUV = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);
      vec3 cameraPos = vec3(0.0, 0.0, 5.0);
      vec3 ray = normalize(vec3((vUv - vec2(0.5)) * uResolution.zw, -1));

      float t = rayMarch(cameraPos, ray);
      if (t > 0.0) {
          vec3 p = cameraPos + ray * t;
          vec3 normal = getNormal(p);
          float fresnel = pow(1.0 + dot(ray, normal), uFresnelPower);

          vec3 color = mix(uColor, uFresnelColor, fresnel);

          gl_FragColor = vec4(color, 1.0);
      } else {
           gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      }
      #include <colorspace_fragment>
  }
`;

export function LavaLampMesh({
  color = "#18181b",
  fresnelColor = "#ff6900",
  speed = 1.0,
  fresnelPower = 3.0,
  radius = 1,
  smoothness = 0.1,
}: LavaLampSceneProps) {
  // biome-ignore lint/suspicious/noExplicitAny: unavailable type
  const materialRef = useRef<any>(null);
  const timeRef = useRef(0);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uFresnelColor: { value: new THREE.Color(fresnelColor) },
      uFresnelPower: { value: fresnelPower },
      uRadius: { value: radius },
      uResolution: {
        value: new THREE.Vector4(size.width, size.height, 1, 1),
      },
      uSmoothness: { value: smoothness },
      uTime: { value: 0.0 },
    }),
    []
  );

  useFrame((_, delta) => {
    const m = materialRef.current;
    if (!m) return;

    timeRef.current += delta * speed;
    m.uniforms.uTime.value = timeRef.current;

    const width = size.width;
    const height = size.height;
    const imageAspect = 1;
    let a1: number;
    let a2: number;

    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = height / width / imageAspect;
    }

    m.uniforms.uResolution.value.set(width, height, a1, a2);
    m.uniforms.uColor.value.set(color);
    m.uniforms.uFresnelColor.value.set(fresnelColor);
    m.uniforms.uFresnelPower.value = fresnelPower;
    m.uniforms.uRadius.value = radius;
    m.uniforms.uSmoothness.value = smoothness;
  });

  return (
    <>
      <OrthographicCamera
        bottom={-0.5}
        far={1000}
        left={-0.5}
        makeDefault
        near={-1000}
        position={[0, 0, 2]}
        right={0.5}
        top={0.5}
      />
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          depthTest={false}
          depthWrite={false}
          fragmentShader={fragmentShader}
          ref={materialRef}
          transparent
          uniforms={uniforms}
          vertexShader={vertexShader}
        />
      </mesh>
    </>
  );
}
