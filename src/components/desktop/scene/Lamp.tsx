"use client";

import { useMemo, useRef, useState, type Ref } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";

/*
 * Pendant lamp: matte black egg-shaped dome with a copper inside, hanging
 * from a cord that leaves the top of the frame. It swings like a damped
 * pendulum when hovered or clicked.
 */

const CEILING_Y = 3.8;
const SHADE_BOTTOM_Y = 1.1;
const SHADE_HEIGHT = 0.36;
const SHADE_RADIUS = 0.21;
const CORD_LENGTH = CEILING_Y - (SHADE_BOTTOM_Y + SHADE_HEIGHT);

// Right of the laptop on wide screens; centred above it in portrait, where the side is off-frame.
// Both stay clear of the lid's opening sweep (lid tip reaches 0.86 from the hinge).
export const LAMP_ANCHOR = new THREE.Vector3(1.0, CEILING_Y, 0);
export const LAMP_ANCHOR_PORTRAIT = new THREE.Vector3(0, CEILING_Y, 0);

// egg dome profile, rim → crown (lathe normals face outward when the profile runs bottom → top)
const DOME_PROFILE = Array.from({ length: 25 }, (_, i) => {
  const t = i / 24;
  const radius = SHADE_RADIUS * Math.pow(1 - Math.pow(t, 2.4), 0.5);
  return new THREE.Vector2(Math.max(radius, 0.018), t * SHADE_HEIGHT);
});

const GRAVITY_OVER_LENGTH = 9.8 / (CEILING_Y - SHADE_BOTTOM_Y);
const DAMPING = 0.7;

export default function Lamp({
  anchor = LAMP_ANCHOR,
  bulbRef,
  innerRef,
  spotRef,
  glowRef,
  onToggle,
  onHover,
}: {
  anchor?: THREE.Vector3;
  bulbRef: Ref<THREE.MeshStandardMaterial>;
  innerRef: Ref<THREE.MeshStandardMaterial>;
  spotRef: Ref<THREE.SpotLight>;
  glowRef: Ref<THREE.PointLight>;
  onToggle: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const dome = useMemo(() => new THREE.LatheGeometry(DOME_PROFILE, 64), []);
  const pivot = useRef<THREE.Group>(null);
  const swing = useRef({ angle: 0, velocity: 0 });
  const [target] = useState(() => {
    const object = new THREE.Object3D();
    object.position.set(-0.12, -2, 0.25);
    return object;
  });

  function push(strength: number) {
    swing.current.velocity += strength;
  }

  useFrame((_, delta) => {
    const s = swing.current;
    const dt = Math.min(delta, 1 / 30);
    s.velocity += (-GRAVITY_OVER_LENGTH * s.angle - DAMPING * s.velocity) * dt;
    s.angle += s.velocity * dt;
    if (pivot.current) pivot.current.rotation.z = s.angle;
  });

  const shadeY = -CORD_LENGTH - SHADE_HEIGHT;

  return (
    <group ref={pivot} position={anchor}>
      <mesh position={[0, -CORD_LENGTH / 2, 0]}>
        <cylinderGeometry args={[0.004, 0.004, CORD_LENGTH, 8]} />
        <meshStandardMaterial color="#111" roughness={0.6} />
      </mesh>

      <group
        position={[0, shadeY, 0]}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          push(0.28);
          onToggle();
        }}
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
          push(0.08);
          onHover(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
          onHover(false);
        }}
      >
        {/* cap where the cord enters the dome */}
        <mesh position={[0, SHADE_HEIGHT + 0.012, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.036, 0.05, 32]} />
          <meshStandardMaterial color="#121212" roughness={0.45} metalness={0.4} />
        </mesh>
        <mesh geometry={dome} castShadow>
          <meshStandardMaterial color="#141414" roughness={0.55} metalness={0.35} side={THREE.FrontSide} />
        </mesh>
        <mesh geometry={dome}>
          <meshStandardMaterial
            ref={innerRef}
            color="#c9874a"
            emissive="#ffb35c"
            emissiveIntensity={0}
            metalness={0.9}
            roughness={0.28}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[SHADE_RADIUS, 0.004, 8, 96]} />
          <meshStandardMaterial color="#b9773f" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <sphereGeometry args={[0.05, 24, 24]} />
          <meshStandardMaterial ref={bulbRef} color="#fff6e6" emissive="#ffc27a" emissiveIntensity={0} roughness={0.2} />
        </mesh>

        {/* night light: its shadow camera starts past the dome so the shade doesn't block its own bulb */}
        <primitive object={target} />
        <spotLight
          ref={spotRef}
          position={[0, 0.06, 0]}
          target={target}
          color="#ffb56b"
          intensity={0}
          angle={0.78}
          penumbra={0.75}
          distance={4}
          decay={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.35}
          shadow-bias={-0.0006}
        />
        <pointLight ref={glowRef} position={[0, 0.1, 0]} color="#ffc27a" intensity={0} distance={0.6} decay={2} />

        <mesh position={[0, SHADE_HEIGHT / 2, 0]} visible={false}>
          <sphereGeometry args={[SHADE_RADIUS * 1.25, 12, 12]} />
        </mesh>
      </group>
    </group>
  );
}
