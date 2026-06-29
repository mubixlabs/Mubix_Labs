"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  position,
  scale,
  speed,
  geometry,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  geometry: "icosahedron" | "octahedron" | "torus";
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.4;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.4;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[1, 0.35, 16, 32]} />}
      <meshStandardMaterial color="#f97316" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function Particles({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fb923c" size={0.045} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

export default function ThreeBackground({ mobile = false }: { mobile?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#f97316" />
      <Particles count={mobile ? 60 : 200} />
      {mobile ? (
        <FloatingShape position={[1.5, -3, -2]} scale={0.7} speed={0.5} geometry="icosahedron" />
      ) : (
        <>
          <FloatingShape position={[-3, 1.5, -2]} scale={0.9} speed={0.5} geometry="icosahedron" />
          <FloatingShape position={[3.5, -1, -3]} scale={1.2} speed={0.35} geometry="torus" />
          <FloatingShape position={[2, 2.2, -4]} scale={0.6} speed={0.6} geometry="octahedron" />
        </>
      )}
    </Canvas>
  );
}