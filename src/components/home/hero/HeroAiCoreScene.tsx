"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

const BRAND_RED = "#E32A39";
const BRAND_CREAM = "#FBFBEF";

type NeuralCoreProps = {
  active: boolean;
};

function NeuralCore({ active }: NeuralCoreProps) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!active || !group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        {/* Outer wireframe shell */}
        <mesh>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshBasicMaterial
            color={BRAND_RED}
            wireframe
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>

        {/* Mid holographic shell */}
        <mesh>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshPhysicalMaterial
            color="#0a0a0a"
            emissive={BRAND_RED}
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.85}
            transparent
            opacity={0.72}
            depthWrite={false}
          />
        </mesh>

        {/* Inner glow core */}
        <mesh>
          <sphereGeometry args={[0.42, 20, 20]} />
          <meshBasicMaterial color={BRAND_CREAM} transparent opacity={0.92} />
        </mesh>

        {/* Core pulse */}
        <mesh scale={0.55}>
          <sphereGeometry args={[0.5, 12, 12]} />
          <meshBasicMaterial
            color={BRAND_RED}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>

        <pointLight color={BRAND_RED} intensity={1.8} distance={5} decay={2} />
        <pointLight color={BRAND_CREAM} intensity={0.4} distance={3} decay={2} />
      </Float>
    </group>
  );
}

type HeroAiCoreSceneProps = {
  active: boolean;
  onUnavailable?: () => void;
};

export function HeroAiCoreScene({ active, onUnavailable }: HeroAiCoreSceneProps) {
  const reported = useRef(false);

  return (
    <Canvas
      className="hero-ai-canvas"
      dpr={[1, 1.25]}
      performance={{ min: 0.5, debounce: 200 }}
      frameloop={active ? "always" : "demand"}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      camera={{ position: [0, 0, 4.2], fov: 42, near: 0.1, far: 20 }}
      onCreated={({ gl }) => {
        try {
          gl.setClearColor(0x000000, 0);
        } catch {
          if (!reported.current) {
            reported.current = true;
            onUnavailable?.();
          }
        }
      }}
      onError={() => {
        if (!reported.current) {
          reported.current = true;
          onUnavailable?.();
        }
      }}
    >
      <ambientLight intensity={0.15} />
      <NeuralCore active={active} />
    </Canvas>
  );
}
