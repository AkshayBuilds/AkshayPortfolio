import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function WireOrb() {
  const meshRef = useRef(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.22;
    meshRef.current.rotation.x += delta * 0.08;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.35} floatIntensity={0.35}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.15, 2]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.22} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const pointsRef = useRef(null);

  const { positions } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return { positions: pos };
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.06;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        color="#00f0ff"
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.25, 8.4], fov: 48 }}
    >
      <color attach="background" args={["#080808"]} />
      <ambientLight intensity={0.9} />
      <Particles />
      <WireOrb />
    </Canvas>
  );
}

