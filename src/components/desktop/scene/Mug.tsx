"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Billboard, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { COLORS } from "./textures";

/*
 * Ceramic coffee mug: one lathe profile for the whole body (foot, outer
 * wall, rounded lip, inner wall, bottom), a tube handle, coffee inside,
 * the mascot as a sticker wrapped on the wall, and looping steam wisps.
 */

// (radius, height) — bottom → outer wall → lip → inner wall → inner floor
const BODY_PROFILE = [
  [0.001, 0.002],
  [0.066, 0.0],
  [0.075, 0.004],
  [0.08, 0.014],
  [0.083, 0.04],
  [0.087, 0.1],
  [0.09, 0.16],
  [0.091, 0.186],
  [0.0895, 0.193],
  [0.0855, 0.193],
  [0.0835, 0.185],
  [0.082, 0.1],
  [0.077, 0.03],
  [0.068, 0.02],
  [0.001, 0.019],
].map(([r, y]) => new THREE.Vector2(r, y));

const COFFEE_Y = 0.162;

// sticker wrapped on the wall: a slice of a (slightly tapered) cylinder just outside the glaze
const STICKER = { height: 0.128, width: 0.076, centerY: 0.097, radiusTop: 0.0912, radiusBottom: 0.0856 };

const STEAM = 3;

function steamTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  for (let i = 0; i < 26; i++) {
    const t = i / 25;
    const x = 64 + Math.sin(t * Math.PI * 2.2) * 22;
    const y = 240 - t * 220;
    const r = 18 + t * 26;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const alpha = 0.3 * Math.sin(Math.PI * t);
    g.addColorStop(0, `rgba(255,255,255,${alpha})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function Mug({
  position,
  rotationY = 0,
  scale = 1,
}: {
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
}) {
  const body = useMemo(() => new THREE.LatheGeometry(BODY_PROFILE, 72), []);
  const handle = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.084, 0.158, 0),
      new THREE.Vector3(0.125, 0.162, 0),
      new THREE.Vector3(0.148, 0.12, 0),
      new THREE.Vector3(0.138, 0.07, 0),
      new THREE.Vector3(0.1, 0.05, 0),
      new THREE.Vector3(0.082, 0.052, 0),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.0115, 16, false);
  }, []);
  const sticker = useMemo(() => {
    const averageRadius = (STICKER.radiusTop + STICKER.radiusBottom) / 2;
    const arc = STICKER.width / averageRadius;
    return new THREE.CylinderGeometry(STICKER.radiusTop, STICKER.radiusBottom, STICKER.height, 32, 1, true, -arc / 2, arc);
  }, []);
  const mascot = useTexture("/images/brandon-sticker.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  });
  const steam = useMemo(() => steamTexture(), []);
  const wisps = useRef<(THREE.Group | null)[]>([]);
  const wispMaterials = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    for (let i = 0; i < STEAM; i++) {
      const group = wisps.current[i];
      const material = wispMaterials.current[i];
      if (!group || !material) continue;
      const t = (time * 0.28 + i / STEAM) % 1;
      group.position.set(Math.sin(time * 1.1 + i * 2.1) * 0.012 * t, COFFEE_Y + 0.07 + t * 0.2, 0);
      group.scale.setScalar(0.7 + t * 0.9);
      material.opacity = Math.sin(Math.PI * t) * 0.9;
    }
  });

  const glaze = <meshPhysicalMaterial color="#f5f1ea" roughness={0.22} clearcoat={0.8} clearcoatRoughness={0.15} side={THREE.DoubleSide} />;

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh geometry={body} castShadow receiveShadow>
        {glaze}
      </mesh>
      {/* orange glaze band on the lip */}
      <mesh position={[0, 0.187, 0]} castShadow>
        <cylinderGeometry args={[0.0915, 0.0912, 0.012, 72, 1, true]} />
        <meshPhysicalMaterial color={COLORS.orange} roughness={0.25} clearcoat={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={handle} rotation={[0, 0.5, 0]} castShadow>
        <meshPhysicalMaterial color={COLORS.orange} roughness={0.25} clearcoat={0.8} />
      </mesh>

      {/* coffee */}
      <mesh position={[0, COFFEE_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.0822, 48]} />
        <meshPhysicalMaterial color="#3a2015" roughness={0.12} clearcoat={1} />
      </mesh>
      <mesh position={[0.012, COFFEE_Y + 0.0004, -0.01]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.035, 0.06, 48]} />
        <meshStandardMaterial color="#9a6a45" roughness={0.6} transparent opacity={0.55} />
      </mesh>

      <mesh geometry={sticker} position={[0, STICKER.centerY, 0]}>
        <meshStandardMaterial map={mascot} transparent alphaTest={0.35} roughness={0.5} side={THREE.FrontSide} />
      </mesh>

      {Array.from({ length: STEAM }, (_, i) => (
        <group key={i} ref={(el) => void (wisps.current[i] = el)}>
          <Billboard>
            <mesh>
              <planeGeometry args={[0.1, 0.2]} />
              <meshBasicMaterial
                ref={(el) => void (wispMaterials.current[i] = el)}
                map={steam}
                transparent
                opacity={0}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          </Billboard>
        </group>
      ))}
    </group>
  );
}
