"use client";

import type { Ref } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import Keyboard from "./Keyboard";
import { roundedPanel, roundedSlab } from "./shapes";

export const MAC = {
  width: 1.3,
  depth: 0.9,
  baseHeight: 0.032,
  lidHeight: 0.86,
  lidThickness: 0.014,
  screenWidth: 1.22,
  screenHeight: 0.762,
  screenCenterY: 0.445,
  lidClosed: Math.PI / 2,
  lidOpen: -0.24,
};

/** World position of the hinge (lid pivot). */
export const HINGE = new THREE.Vector3(0, MAC.baseHeight, -MAC.depth / 2 + 0.01);

const ALUMINIUM = { color: "#d7d9dd", metalness: 0.6, roughness: 0.32 } as const;

const LID_RADIUS = 0.042;
const GEOMETRY = {
  base: roundedSlab(MAC.width, MAC.depth, MAC.baseHeight - 0.004, 0.05),
  lid: roundedSlab(MAC.width, MAC.lidHeight, MAC.lidThickness - 0.004, LID_RADIUS),
  bezel: roundedPanel(MAC.width - 0.012, MAC.lidHeight - 0.012, LID_RADIUS - 0.005),
  display: roundedPanel(MAC.screenWidth, MAC.screenHeight, { tl: 0.024, tr: 0.024, br: 0.007, bl: 0.007 }),
  notch: roundedPanel(0.11, 0.022, { tl: 0, tr: 0, br: 0.008, bl: 0.008 }),
  trackpadRim: roundedPanel(0.53, 0.31, 0.022),
  trackpad: roundedPanel(0.52, 0.3, 0.018),
};

export default function MacBook({
  lidRef,
  screenTexture,
  interactive,
  onActivate,
}: {
  lidRef: Ref<THREE.Group>;
  screenTexture: THREE.Texture;
  interactive: boolean;
  onActivate: () => void;
}) {
  const sticker = useTexture("/images/brandon-sticker.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    if (interactive) onActivate();
  }

  function setCursor(value: string) {
    if (interactive) document.body.style.cursor = value;
  }

  return (
    <group
      onClick={handleClick}
      onPointerOver={() => setCursor("pointer")}
      onPointerOut={() => setCursor("")}
    >
      {/* base */}
      <mesh geometry={GEOMETRY.base} position={[0, MAC.baseHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...ALUMINIUM} />
      </mesh>
      <Keyboard surfaceY={MAC.baseHeight} centerZ={-0.2} />
      {/* trackpad: thin darker rim + glassy surface */}
      <mesh geometry={GEOMETRY.trackpadRim} position={[0, MAC.baseHeight + 0.0004, 0.23]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#a9acb1" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh geometry={GEOMETRY.trackpad} position={[0, MAC.baseHeight + 0.0007, 0.23]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#c3c6ca" metalness={0.35} roughness={0.18} />
      </mesh>
      {/* front thumb notch */}
      <mesh position={[0, MAC.baseHeight - 0.004, MAC.depth / 2 + 0.0005]}>
        <planeGeometry args={[0.16, 0.008]} />
        <meshStandardMaterial color="#9da0a5" />
      </mesh>

      {/* lid, pivoting on the hinge */}
      <group ref={lidRef} position={HINGE} rotation={[MAC.lidClosed, 0, 0]}>
        <mesh geometry={GEOMETRY.lid} position={[0, MAC.lidHeight / 2, -MAC.lidThickness / 2]} castShadow receiveShadow>
          <meshStandardMaterial {...ALUMINIUM} />
        </mesh>
        {/* black bezel, display with rounded top corners, camera notch */}
        <mesh geometry={GEOMETRY.bezel} position={[0, MAC.lidHeight / 2, 0.0004]}>
          <meshStandardMaterial color="#060607" roughness={0.25} metalness={0.2} />
        </mesh>
        <mesh geometry={GEOMETRY.display} position={[0, MAC.screenCenterY, 0.0008]}>
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>
        <mesh geometry={GEOMETRY.notch} position={[0, MAC.screenCenterY + MAC.screenHeight / 2 - 0.011, 0.0011]}>
          <meshBasicMaterial color="#060607" />
        </mesh>
        {/* sticker on the back of the lid */}
        <mesh position={[0, MAC.lidHeight / 2, -MAC.lidThickness - 0.0006]} rotation={[0, Math.PI, Math.PI + 0.1]}>
          <planeGeometry args={[0.3, 0.51]} />
          <meshStandardMaterial map={sticker} transparent alphaTest={0.4} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
