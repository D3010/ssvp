"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { EffectComposer, Bloom as BloomEffect } from "@react-three/postprocessing";
import * as THREE from "three";
import { useSceneTier } from "@/lib/useSceneTier";

/**
 * Home CH1 — "The Glass." A ghosted PrimeRx wireframe window; a pane of emerald
 * glass in front; streams of glyph-particles flow through and snap into neat
 * field rows (chaos in, structure out). One field completes → a gold ✓ pulses.
 * Mouse parallax ±2°. Bloom on TIER 2 only.
 */

const MINT = "#5ac8fa";
const MINT_DIM = "#5e90bd";
const GOLD = "#e5b34e";

// Field-row y positions inside the window (height ~2.8).
const ROWS = [1.0, 0.55, 0.1, -0.35, -0.8, -1.2];

function RectOutline({ w, h, color, opacity = 0.6, ...props }: { w: number; h: number; color: string; opacity?: number } & ThreeElements["lineSegments"]) {
  const geo = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, h)), [w, h]);
  return (
    <lineSegments geometry={geo} {...props}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

function Window() {
  return (
    <group position={[0, 0, 0]}>
      {/* frame */}
      <RectOutline w={4.2} h={3.1} color={MINT_DIM} opacity={0.7} />
      {/* title bar */}
      <RectOutline w={4.2} h={0.42} color={MINT_DIM} opacity={0.5} position={[0, 1.34, 0]} />
      {/* field slots */}
      {ROWS.map((y, i) => (
        <RectOutline key={i} w={3.4} h={0.24} color={MINT_DIM} opacity={0.4} position={[-0.2, y, 0]} />
      ))}
    </group>
  );
}

interface P {
  x: number;
  y: number;
  z: number;
  vy: number;
  row: number;
  speed: number;
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const parts = useRef<P[]>([]);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const list: P[] = [];
    for (let i = 0; i < count; i++) {
      const p: P = {
        x: -3 - Math.random() * 4,
        y: (Math.random() - 0.5) * 3.4,
        z: (Math.random() - 0.5) * 0.4 + 0.4,
        vy: 0,
        row: ROWS[Math.floor(Math.random() * ROWS.length)],
        speed: 0.5 + Math.random() * 0.9,
      };
      list.push(p);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    }
    parts.current = list;
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const list = parts.current;
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      p.x += p.speed * dt * 1.6;
      // once past the glass (x>0), ease y toward the assigned row: structure out
      if (p.x > 0) {
        p.y += (p.row - p.y) * Math.min(1, dt * 4);
        p.z += (0 - p.z) * Math.min(1, dt * 4);
      } else {
        // chaotic drift before the glass
        p.y += Math.sin((p.x + i) * 1.5) * dt * 0.25;
      }
      // respawn once off the right edge
      if (p.x > 2.4) {
        p.x = -3 - Math.random() * 4;
        p.y = (Math.random() - 0.5) * 3.4;
        p.z = (Math.random() - 0.5) * 0.4 + 0.4;
        p.row = ROWS[Math.floor(Math.random() * ROWS.length)];
        p.speed = 0.5 + Math.random() * 0.9;
      }
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={MINT} size={0.055} sizeAttenuation transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function GlassPane() {
  return (
    <group position={[0, 0, 0.55]}>
      <mesh>
        <planeGeometry args={[4.6, 3.4]} />
        <meshBasicMaterial color={"#16273f"} transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <RectOutline w={4.6} h={3.4} color={MINT} opacity={0.28} />
    </group>
  );
}

function GoldCheckMark() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 2.2) * 0.12;
    g.scale.setScalar(pulse);
  });
  // sits at the end of the first completed field row
  return (
    <group ref={ref} position={[1.5, ROWS[0], 0.05]}>
      <mesh>
        <torusGeometry args={[0.14, 0.014, 12, 32]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-0.06, -0.01, 0, -0.01, -0.06, 0, -0.01, -0.06, 0, 0.07, 0.06, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={GOLD} />
      </lineSegments>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // continuous slow drift + mouse parallax → feels alive even without a mouse
    const targetY = state.pointer.x * 0.14 + Math.sin(t * 0.28) * 0.1;
    const targetX = -state.pointer.y * 0.09 + Math.cos(t * 0.22) * 0.05;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    g.position.y = Math.sin(t * 0.4) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export default function GlassScene() {
  const tier = useSceneTier();
  const count = tier === 2 ? 620 : 360;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, tier === 2 ? 2 : 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <Rig>
        <Window />
        <Particles count={count} />
        <GlassPane />
        <GoldCheckMark />
      </Rig>
      {tier === 2 && (
        <EffectComposer>
          <BloomEffect intensity={0.7} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}
