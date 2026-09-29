"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { bodyFont, createCanvasTexture, repaint } from "./textures";

/*
 * French (AZERTY) MacBook keyboard. Every row adds up to 15 key units;
 * the function row is half height. Keycaps and their printed legends are
 * generated from the same layout so they always line up.
 */

type Key = { label: string; w: number; small?: boolean; half?: "top" | "bottom" };

const ROWS: { height: number; keys: Key[] }[] = [
  {
    height: 0.55,
    keys: [
      { label: "esc", w: 1.5, small: true },
      ...Array.from({ length: 12 }, (_, i) => ({ label: `F${i + 1}`, w: 13 / 12, small: true })),
      { label: "", w: 0.5 },
    ],
  },
  {
    height: 1,
    keys: [
      ...["@", "&", "é", "\"", "'", "(", "§", "è", "!", "ç", "à", ")", "-"].map((label) => ({ label, w: 1 })),
      { label: "delete", w: 2, small: true },
    ],
  },
  {
    height: 1,
    keys: [
      { label: "tab", w: 1.5, small: true },
      ...["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P", "^", "$"].map((label) => ({ label, w: 1 })),
      { label: "↩", w: 1.5 },
    ],
  },
  {
    height: 1,
    keys: [
      { label: "caps lock", w: 1.75, small: true },
      ...["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M", "ù", "`"].map((label) => ({ label, w: 1 })),
      { label: "", w: 1.25 },
    ],
  },
  {
    height: 1,
    keys: [
      { label: "shift", w: 1.25, small: true },
      ...["<", "W", "X", "C", "V", "B", "N", ",", ";", ":", "="].map((label) => ({ label, w: 1 })),
      { label: "shift", w: 2.75, small: true },
    ],
  },
  {
    height: 1,
    keys: [
      { label: "fn", w: 1, small: true },
      { label: "control", w: 1, small: true },
      { label: "option", w: 1, small: true },
      { label: "command", w: 1.25, small: true },
      { label: "", w: 5.5 },
      { label: "command", w: 1.25, small: true },
      { label: "option", w: 1, small: true },
      { label: "◀", w: 1, half: "bottom" },
      { label: "▲", w: 1, half: "top" },
      { label: "▶", w: 1, half: "bottom" },
    ],
  },
];

const UNITS = 15;
const DEPTH_UNITS = ROWS.reduce((sum, row) => sum + row.height, 0);

export const KEYBOARD = {
  width: 1.02,
  get unit() {
    return this.width / UNITS;
  },
  get depth() {
    return DEPTH_UNITS * this.unit;
  },
};

type Cap = { x: number; z: number; w: number; d: number; label: string; small?: boolean };

function buildCaps(): Cap[] {
  const u = KEYBOARD.unit;
  const gap = u * 0.13;
  const caps: Cap[] = [];
  let z = -KEYBOARD.depth / 2;
  for (const row of ROWS) {
    let x = -KEYBOARD.width / 2;
    const rowDepth = row.height * u;
    for (const key of row.keys) {
      const w = key.w * u;
      if (key.half) {
        const d = rowDepth / 2;
        const zCenter = key.half === "top" ? z + d / 2 : z + rowDepth - d / 2;
        caps.push({ x: x + w / 2, z: zCenter, w: w - gap, d: d - gap / 2, label: key.label, small: true });
        // the down arrow shares the up arrow's column
        if (key.label === "▲") caps.push({ x: x + w / 2, z: z + rowDepth - d / 2, w: w - gap, d: d - gap / 2, label: "▼", small: true });
      } else if (!(key.label === "" && key.w < 1)) {
        caps.push({ x: x + w / 2, z: z + rowDepth / 2, w: w - gap, d: rowDepth - gap, label: key.label, small: key.small });
      } else {
        // Touch ID: round-ish key at the end of the function row
        caps.push({ x: x + w / 2 + gap / 4, z: z + rowDepth / 2, w: w - gap / 2, d: rowDepth - gap, label: "" });
      }
      x += w;
    }
    z += rowDepth;
  }
  return caps;
}

const CAP_HEIGHT = 0.0032;
const CAPS = buildCaps();

export default function Keyboard({ surfaceY, centerZ }: { surfaceY: number; centerZ: number }) {
  const caps = CAPS;
  const capsRef = useRef<THREE.InstancedMesh>(null);

  const legendsWidth = 2048;
  const legendsHeight = Math.round((legendsWidth * KEYBOARD.depth) / KEYBOARD.width);
  const legends = useMemo(() => createCanvasTexture(legendsWidth, legendsHeight), [legendsHeight]);

  useLayoutEffect(() => {
    const mesh = capsRef.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    caps.forEach((cap, i) => {
      position.set(cap.x, 0, cap.z);
      scale.set(cap.w, CAP_HEIGHT, cap.d);
      mesh.setMatrixAt(i, matrix.compose(position, rotation, scale));
    });
    mesh.instanceMatrix.needsUpdate = true;

    const px = legendsWidth / KEYBOARD.width;
    repaint(legends, (ctx) => {
      ctx.clearRect(0, 0, legendsWidth, legendsHeight);
      ctx.fillStyle = "rgba(255,255,255,0.86)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const cap of caps) {
        if (!cap.label) continue;
        const cx = (cap.x + KEYBOARD.width / 2) * px;
        const cy = (cap.z + KEYBOARD.depth / 2) * px;
        const small = cap.small && cap.label.length > 1;
        ctx.font = small ? `500 ${Math.round(px * 0.0105)}px ${bodyFont()}` : `400 ${Math.round(px * 0.022)}px ${bodyFont()}`;
        if (small && cap.label.length > 3) {
          // modifier words sit in the bottom corner, like on a real Mac
          ctx.textAlign = cap.x < 0 ? "left" : "right";
          const edge = cap.x < 0 ? cx - (cap.w * px) / 2 + px * 0.006 : cx + (cap.w * px) / 2 - px * 0.006;
          ctx.fillText(cap.label, edge, cy + (cap.d * px) / 2 - px * 0.009);
          ctx.textAlign = "center";
        } else {
          ctx.fillText(cap.label, cx, cy);
        }
      }
    });
  }, [caps, legends, legendsHeight]);

  const wellPadding = KEYBOARD.unit * 0.25;

  return (
    <group position={[0, surfaceY, centerZ]}>
      {/* recessed keyboard well */}
      <mesh position={[0, 0.0002, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[KEYBOARD.width + wellPadding, KEYBOARD.depth + wellPadding]} />
        <meshStandardMaterial color="#1c1d20" roughness={0.7} metalness={0.2} />
      </mesh>
      <instancedMesh ref={capsRef} args={[undefined, undefined, caps.length]} position={[0, 0.0004 + CAP_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0f0f11" roughness={0.42} metalness={0.05} />
      </instancedMesh>
      <mesh position={[0, 0.0004 + CAP_HEIGHT + 0.0002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[KEYBOARD.width, KEYBOARD.depth]} />
        <meshBasicMaterial map={legends.texture} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <SpeakerGrille x={-(KEYBOARD.width / 2 + 0.07)} />
      <SpeakerGrille x={KEYBOARD.width / 2 + 0.07} />
    </group>
  );
}

function SpeakerGrille({ x }: { x: number }) {
  const texture = useMemo(() => {
    const target = createCanvasTexture(128, 512);
    repaint(target, (ctx) => {
      ctx.clearRect(0, 0, 128, 512);
      ctx.fillStyle = "rgba(20,20,22,0.55)";
      for (let y = 8; y < 512; y += 12) {
        for (let xx = 8 + ((y / 12) % 2) * 6; xx < 128; xx += 12) {
          ctx.beginPath();
          ctx.arc(xx, y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    return target.texture;
  }, []);
  return (
    <mesh position={[x, 0.0003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.07, KEYBOARD.depth]} />
      <meshStandardMaterial map={texture} transparent roughness={0.5} depthWrite={false} />
    </mesh>
  );
}
