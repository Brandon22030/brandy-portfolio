"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  count?: number;
  radius?: number;
  linkDistance?: number;
  reducedMotion?: boolean;
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function DataNetworkScene({
  count = 900,
  radius = 7,
  linkDistance = 1.7,
  reducedMotion = false,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const rand = seededRandom(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = radius * Math.cbrt(rand());
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.8;
    }
    return arr;
  }, [count, radius]);

  const linePositions = useMemo(() => {
    const pts: number[] = [];
    const maxLinks = 2600;
    for (let i = 0; i < count && pts.length / 6 < maxLinks; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const dx = positions[ix] - positions[jx];
        const dy = positions[ix + 1] - positions[jx + 1];
        const dz = positions[ix + 2] - positions[jx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < linkDistance) {
          pts.push(
            positions[ix],
            positions[ix + 1],
            positions[ix + 2],
            positions[jx],
            positions[jx + 1],
            positions[jx + 2],
          );
        }
      }
    }
    return new Float32Array(pts);
  }, [positions, count, linkDistance]);

  useEffect(() => {
    if (reducedMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || reducedMotion) return;
    group.rotation.y += delta * 0.035;
    const targetX = pointer.current.y * 0.15;
    const targetZ = pointer.current.x * 0.05;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.03);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetZ, 0.03);
  });

  return (
    <group ref={groupRef} rotation={[0.15, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          sizeAttenuation
          color="#22d3ee"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a78bfa" transparent opacity={0.14} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
