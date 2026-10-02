"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useMinute } from "../hooks";
import { COLORS, createCanvasTexture, drawDigits, drawPoster, noteTexture, receiptTexture, repaint, spineTexture } from "./textures";

export const WALL_Z = -1.2;

const CLAY = { roughness: 0.62, metalness: 0 } as const;

/* ------------------------------------------------------------------ */

export function Room() {
  return (
    <group>
      {/* desk top */}
      <mesh position={[0, -0.05, 2.2]} receiveShadow>
        <boxGeometry args={[12, 0.1, 6.8]} />
        <meshStandardMaterial color="#f2f1ed" roughness={0.9} />
      </mesh>
      {/* wall */}
      <mesh position={[0, 3, WALL_Z]} receiveShadow>
        <planeGeometry args={[16, 6]} />
        <meshStandardMaterial color="#efede8" roughness={1} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */

const BOOKS = [
  { label: "React", bg: COLORS.orange, fg: "#ffffff", w: 0.085, h: 0.5 },
  { label: "Next.js", bg: "#efe6d2", fg: "#222222", w: 0.07, h: 0.45 },
  { label: "Python", bg: COLORS.paper, fg: "#222222", w: 0.068, h: 0.55 },
  { label: "AWS · CI/CD", bg: COLORS.lime, fg: "#1c1c1c", w: 0.09, h: 0.53 },
  { label: "2023 - 2026", bg: COLORS.yellow, fg: "#1c1c1c", w: 0.075, h: 0.47 },
];

export function Books({ position }: { position: [number, number, number] }) {
  const books = useMemo(() => {
    return BOOKS.map((book, index) => {
      const x = BOOKS.slice(0, index).reduce((sum, b) => sum + b.w + 0.004, 0);
      const spine = spineTexture(book.label, book.bg, book.fg);
      const side = new THREE.MeshStandardMaterial({ color: book.bg, ...CLAY });
      const pages = new THREE.MeshStandardMaterial({ color: "#f4f1ea", ...CLAY });
      const front = new THREE.MeshStandardMaterial({ map: spine, ...CLAY });
      // box faces: +x, -x, +y, -y, +z (spine, facing camera), -z
      const materials = [side, side, pages, pages, front, pages];
      return { ...book, x: x + book.w / 2, materials };
    });
  }, []);

  return (
    <group position={position}>
      {books.map((book) => (
        <mesh key={book.label} position={[book.x, book.h / 2, 0]} material={book.materials} castShadow receiveShadow>
          <boxGeometry args={[book.w, book.h, 0.34]} />
        </mesh>
      ))}
    </group>
  );
}

export function Disc({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* jewel case */}
      <RoundedBox args={[0.3, 0.018, 0.28]} radius={0.004} position={[0, 0.009, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#dfe3e8" roughness={0.08} transmission={0.85} thickness={0.03} ior={1.45} />
      </RoundedBox>
      <mesh position={[0.05, 0.021, -0.02]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.003, 64]} />
        <meshPhysicalMaterial color="#f1f2f5" metalness={0.55} roughness={0.18} iridescence={1} iridescenceIOR={1.8} iridescenceThicknessRange={[250, 900]} clearcoat={1} />
      </mesh>
      <mesh position={[0.05, 0.0235, -0.02]}>
        <cylinderGeometry args={[0.02, 0.02, 0.002, 32]} />
        <meshStandardMaterial color="#cfd1d4" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Poster({ position }: { position: [number, number, number] }) {
  const minute = useMinute();
  const target = useMemo(() => createCanvasTexture(1000, 1100), []);

  useEffect(() => {
    const now = minute ? new Date(minute * 60_000) : new Date();
    const day = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(now);
    const date = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}`;
    repaint(target, (ctx) => drawPoster(ctx, day, date));
  }, [minute, target]);

  return (
    <mesh position={position} receiveShadow castShadow>
      <boxGeometry args={[0.95, 1.045, 0.004]} />
      <meshStandardMaterial map={target.texture} roughness={0.85} />
    </mesh>
  );
}

export function Receipt({ position }: { position: [number, number, number] }) {
  const texture = useMemo(() => receiptTexture(), []);
  return (
    <mesh position={position} rotation={[0, 0, -0.06]} receiveShadow castShadow>
      <boxGeometry args={[0.3, 0.43, 0.003]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
}

export function PencilCup({ position }: { position: [number, number, number] }) {
  const glass = (
    <meshPhysicalMaterial color="#b9ee2b" roughness={0.18} transmission={0.55} thickness={0.12} ior={1.4} />
  );
  return (
    <group position={position}>
      {[0.035, 0.095, 0.155, 0.215].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.068, 0.032, 24, 48]} />
          {glass}
        </mesh>
      ))}
      <mesh position={[-0.02, 0.33, 0]} rotation={[0.1, 0, 0.22]} castShadow>
        <cylinderGeometry args={[0.011, 0.011, 0.34, 16]} />
        <meshStandardMaterial color="#e5c7ea" roughness={0.5} />
      </mesh>
      <mesh position={[0.025, 0.35, 0.01]} rotation={[-0.08, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.38, 16]} />
        <meshStandardMaterial color="#f5a3a9" roughness={0.5} />
      </mesh>
      <mesh position={[0.044, 0.545, 0.025]} rotation={[-0.08, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.03, 16]} />
        <meshStandardMaterial color="#fbfaf7" roughness={0.5} />
      </mesh>
    </group>
  );
}

function ClockFlap({ value, x }: { value: string; x: number }) {
  const target = useMemo(() => createCanvasTexture(256, 224), []);
  useEffect(() => repaint(target, (ctx) => drawDigits(ctx, value)), [value, target]);

  return (
    <group position={[x, 0.18, 0.152]}>
      <RoundedBox args={[0.24, 0.21, 0.03]} radius={0.012} castShadow>
        <meshStandardMaterial color="#141414" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0155]}>
        <planeGeometry args={[0.22, 0.19]} />
        <meshStandardMaterial map={target.texture} roughness={0.45} />
      </mesh>
    </group>
  );
}

export function FlipClock({ position }: { position: [number, number, number] }) {
  const minute = useMinute();
  const now = minute ? new Date(minute * 60_000) : null;
  const hours = now ? String(now.getHours()).padStart(2, "0") : "--";
  const minutes = now ? String(now.getMinutes()).padStart(2, "0") : "--";

  return (
    <group position={position} rotation={[0, -0.28, 0]}>
      <RoundedBox args={[0.64, 0.33, 0.3]} radius={0.06} smoothness={6} position={[0, 0.165, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#f4f1eb" roughness={0.5} />
      </RoundedBox>
      {[-0.17, 0.17].map((x) => (
        <RoundedBox key={x} args={[0.13, 0.05, 0.1]} radius={0.015} position={[x, 0.335, -0.02]} castShadow>
          <meshStandardMaterial color={COLORS.orange} roughness={0.4} />
        </RoundedBox>
      ))}
      <ClockFlap value={hours} x={-0.135} />
      <ClockFlap value={minutes} x={0.135} />
    </group>
  );
}

export function Mouse({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, -0.25, 0]} scale={[0.072, 0.036, 0.122]} castShadow receiveShadow>
      <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#fbfbfa" roughness={0.28} />
    </mesh>
  );
}

export function DeskNote({
  position,
  interactive,
  onActivate,
}: {
  position: [number, number, number];
  interactive: boolean;
  onActivate: () => void;
}) {
  const texture = useMemo(() => noteTexture(), []);
  return (
    <group
      position={position}
      rotation={[0, -0.18, 0]}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (interactive) onActivate();
      }}
      onPointerOver={() => interactive && (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      {/* folded tent card: printed front leaning back, plain back leaning forward */}
      <group position={[0, 0, 0.045]} rotation={[-0.26, 0, 0]}>
        <mesh position={[0, 0.095, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.19, 0.003]} />
          <meshStandardMaterial color="#fbfaf7" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.095, 0.0018]}>
          <planeGeometry args={[0.6, 0.19]} />
          <meshStandardMaterial map={texture} roughness={0.9} />
        </mesh>
      </group>
      <mesh position={[0, 0.095, -0.045]} rotation={[0.26, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.19, 0.003]} />
        <meshStandardMaterial color="#f2f0ea" roughness={0.9} />
      </mesh>
    </group>
  );
}
