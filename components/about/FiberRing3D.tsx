"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

function rand01(seed: number) {
  let t = seed >>> 0;
  t = Math.imul(t ^ (t >>> 16), 0x7feb352d);
  t = Math.imul(t ^ (t >>> 15), 0x846ca68b);
  t = (t ^ (t >>> 16)) >>> 0;
  return t / 4294967296;
}

function FiberRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2.2, 0.35, 32, 120]} />
      <meshStandardMaterial
        color={new THREE.Color("#00e5ff")}
        emissive={new THREE.Color("#00b4d8")}
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.12}
      />
    </mesh>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.0, 64, 64]} />
      <MeshDistortMaterial
        color={new THREE.Color("#7c3aed")}
        emissive={new THREE.Color("#4c1d95")}
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.12}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}

type NodeDef = {
  angle: number;
  radius: number;
  size: number;
  speed: number;
  color: string;
};

function OrbitingNodes() {
  const nodes = useMemo<NodeDef[]>(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        radius: 3.0,
        size: 0.08 + rand01(i * 2 + 1) * 0.1,
        speed: 0.3 + rand01(i * 2 + 2) * 0.4,
        color: i % 2 === 0 ? "#00e5ff" : "#a78bfa",
      })),
    [],
  );

  const refs = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    nodes.forEach((node, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const t = state.clock.elapsedTime * node.speed + node.angle;
      mesh.position.x = Math.cos(t) * node.radius;
      mesh.position.z = Math.sin(t) * node.radius;
      mesh.position.y = Math.sin(t * 0.5) * 0.8;
    });
  });

  return (
    <>
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshStandardMaterial
            color={new THREE.Color(node.color)}
            emissive={new THREE.Color(node.color)}
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}
    </>
  );
}

function ConnectionRings() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.0, 0.008, 8, 80]} />
      <meshStandardMaterial
        color={new THREE.Color("#6366f1")}
        emissive={new THREE.Color("#4338ca")}
        emissiveIntensity={0.45}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00e5ff" />
      <pointLight position={[-5, -5, -5]} intensity={1.4} color="#7c3aed" />
      <pointLight position={[0, 5, -5]} intensity={0.9} color="#ffffff" />

      <Stars radius={30} depth={20} count={600} factor={2} fade speed={0.5} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <FiberRing />
        <CoreSphere />
      </Float>
      <OrbitingNodes />
      <ConnectionRings />
    </>
  );
}

export function FiberRing3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}>
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
