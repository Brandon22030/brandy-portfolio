"use client";

import { useMemo, type Ref } from "react";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { COLORS } from "./textures";

/*
 * Articulated architect desk lamp. Built in its own local frame (arm reaching
 * along +x), then placed and turned on the desk. The joint positions below
 * also drive where the night-time spot light sits and aims.
 */

const BASE_HINGE = new THREE.Vector3(0, 0.08, 0);
const ELBOW = new THREE.Vector3(0.1, 0.5, 0);
const HEAD = new THREE.Vector3(0.46, 0.6, 0);
const SHADE_TILT = 0.3;
const SHADE_DIRECTION = new THREE.Vector3(Math.sin(SHADE_TILT), -Math.cos(SHADE_TILT), 0);
const BULB_LOCAL = HEAD.clone().addScaledVector(SHADE_DIRECTION, 0.11);
const AIM_LOCAL = BULB_LOCAL.clone().addScaledVector(SHADE_DIRECTION, BULB_LOCAL.y / Math.cos(SHADE_TILT));

export const LAMP = {
  position: new THREE.Vector3(-1.32, 0, -0.14),
  rotationY: -0.16,
  scale: 1.22,
};

function toWorld(local: THREE.Vector3) {
  return local
    .clone()
    .multiplyScalar(LAMP.scale)
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), LAMP.rotationY)
    .add(LAMP.position);
}

export const LAMP_BULB_WORLD = toWorld(BULB_LOCAL);
export const LAMP_AIM_WORLD = toWorld(AIM_LOCAL);

const CREAM = "#f4f1ea";

function Rod({ from, to, radius = 0.0075, offsetZ = 0 }: { from: THREE.Vector3; to: THREE.Vector3; radius?: number; offsetZ?: number }) {
  const { position, quaternion, length } = useMemo(() => {
    const direction = to.clone().sub(from);
    return {
      length: direction.length(),
      position: from.clone().add(to).multiplyScalar(0.5).add(new THREE.Vector3(0, 0, offsetZ)),
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize()),
    };
  }, [from, to, offsetZ]);
  return (
    <mesh position={position} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial color={CREAM} roughness={0.35} metalness={0.3} />
    </mesh>
  );
}

function Joint({ at, radius = 0.024 }: { at: THREE.Vector3; radius?: number }) {
  return (
    <mesh position={at} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[radius, radius, 0.068, 24]} />
      <meshStandardMaterial color={COLORS.orange} roughness={0.35} />
    </mesh>
  );
}

function Spring() {
  const geometry = useMemo(() => {
    const start = BASE_HINGE.clone().add(new THREE.Vector3(-0.028, 0.06, 0));
    const end = ELBOW.clone().add(new THREE.Vector3(-0.028, -0.1, 0));
    const axis = end.clone().sub(start);
    const side = new THREE.Vector3(0, 0, 1);
    const normal = new THREE.Vector3().crossVectors(axis, side).normalize();
    const points: THREE.Vector3[] = [];
    const turns = 16;
    for (let i = 0; i <= turns * 12; i++) {
      const t = i / (turns * 12);
      const angle = t * turns * Math.PI * 2;
      points.push(
        start
          .clone()
          .addScaledVector(axis, t)
          .addScaledVector(normal, Math.cos(angle) * 0.01)
          .addScaledVector(side, Math.sin(angle) * 0.01),
      );
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), turns * 24, 0.0022, 6);
  }, []);
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color="#8d9096" metalness={0.8} roughness={0.3} />
    </mesh>
  );
}

const SHADE_PROFILE = [
  [0.026, 0.004],
  [0.034, -0.012],
  [0.05, -0.04],
  [0.075, -0.08],
  [0.103, -0.13],
  [0.128, -0.178],
  [0.132, -0.186],
]
  // lathe normals face outward when the profile runs bottom → top
  .reverse()
  .map(([r, y]) => new THREE.Vector2(r, y));

export default function Lamp({
  bulbRef,
  innerRef,
  onToggle,
  onHover,
}: {
  bulbRef: Ref<THREE.MeshStandardMaterial>;
  innerRef: Ref<THREE.MeshStandardMaterial>;
  onToggle: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const shade = useMemo(() => new THREE.LatheGeometry(SHADE_PROFILE, 48), []);

  return (
    <group
      position={LAMP.position}
      rotation={[0, LAMP.rotationY, 0]}
      scale={LAMP.scale}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        onToggle();
      }}
      onPointerOver={(event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
        onHover(false);
      }}
    >
      {/* weighted base */}
      <mesh position={[0, 0.018, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.118, 0.13, 0.036, 48]} />
        <meshStandardMaterial color={COLORS.orange} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.05, 0.03, 32]} />
        <meshStandardMaterial color={CREAM} roughness={0.35} metalness={0.3} />
      </mesh>

      {/* double arms, joints and spring */}
      {[-0.022, 0.022].map((z) => (
        <group key={z}>
          <Rod from={BASE_HINGE} to={ELBOW} offsetZ={z} />
          <Rod from={ELBOW} to={HEAD} offsetZ={z} />
        </group>
      ))}
      <Joint at={BASE_HINGE} />
      <Joint at={ELBOW} />
      <Joint at={HEAD} radius={0.02} />
      <Spring />

      {/* conical shade, cream inside so it glows when the lamp is on */}
      <group position={HEAD} rotation={[0, 0, SHADE_TILT]}>
        <mesh position={[0, 0.012, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 24]} />
          <meshStandardMaterial color={COLORS.orange} roughness={0.35} />
        </mesh>
        <mesh geometry={shade}>
          <meshStandardMaterial color={COLORS.orange} roughness={0.32} side={THREE.FrontSide} />
        </mesh>
        <mesh geometry={shade}>
          <meshStandardMaterial ref={innerRef} color="#fbf3e2" emissive="#ffb35c" emissiveIntensity={0} roughness={0.6} side={THREE.BackSide} />
        </mesh>
        <mesh position={[0, -0.186, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.132, 0.004, 8, 64]} />
          <meshStandardMaterial color={CREAM} roughness={0.35} metalness={0.3} />
        </mesh>
        <mesh position={[0, -0.11, 0]}>
          <sphereGeometry args={[0.038, 24, 24]} />
          <meshStandardMaterial ref={bulbRef} color="#fff6e6" emissive="#ffc27a" emissiveIntensity={0} roughness={0.2} />
        </mesh>
      </group>

      {/* generous invisible hit area so the whole lamp is easy to click */}
      <mesh position={[0.24, 0.34, 0]} visible={false}>
        <boxGeometry args={[0.72, 0.72, 0.28]} />
      </mesh>
    </group>
  );
}
