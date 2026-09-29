"use client";

import { Suspense, use, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useTexture } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import MacBook, { HINGE, MAC } from "./MacBook";
import { Books, DeskNote, Disc, FlipClock, Mouse, Mug, PencilCup, Poster, Receipt, Room, WALL_Z } from "./Props";
import Lamp, { LAMP_AIM_WORLD, LAMP_BULB_WORLD } from "./Lamp";
import { SCREEN_H, SCREEN_W, createCanvasTexture, drawScreen, loadSceneFonts, repaint, type ScreenMode } from "./textures";
import { Tween } from "./tween";

export type Stage = "arriving" | "idle" | "booting" | "zooming";

const FOV = 26;
const TAN = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
const LOOK = new THREE.Vector3(0, 0.5, 0);
const ELEVATION = THREE.MathUtils.degToRad(8.5);
const SCREEN_CENTER = new THREE.Vector3(0, HINGE.y + MAC.screenCenterY, HINGE.z + 0.001);


const DAY = { background: new THREE.Color("#e9e7e2"), sky: new THREE.Color("#ffffff"), key: new THREE.Color("#ffffff") };
const NIGHT = { background: new THREE.Color("#15171d"), sky: new THREE.Color("#5b6b9c"), key: new THREE.Color("#8ea4e0") };

function basePose(aspect: number) {
  const distance = aspect >= 1 ? Math.max(3.5 / (2 * TAN * aspect), 4.1) : 1.75 / (2 * TAN * aspect);
  const position = LOOK.clone().add(new THREE.Vector3(0, Math.sin(ELEVATION), Math.cos(ELEVATION)).multiplyScalar(distance));
  return { position, look: LOOK };
}

function bootPose(aspect: number) {
  const distance = Math.max(MAC.lidHeight / 0.62 / 2 / TAN, 1.5 / (2 * TAN * aspect));
  return { position: SCREEN_CENTER.clone().add(new THREE.Vector3(0, 0.1, distance)), look: SCREEN_CENTER };
}

function zoomPose(aspect: number) {
  const distance = Math.min(MAC.screenHeight / 2 / TAN, MAC.screenWidth / 2 / (TAN * aspect)) * 0.96;
  return { position: SCREEN_CENTER.clone().add(new THREE.Vector3(0, 0, distance)), look: SCREEN_CENTER };
}

function Experience({
  stage,
  night,
  onStage,
  onEnter,
  onToggleNight,
}: {
  stage: Stage;
  night: boolean;
  onStage: (stage: Stage) => void;
  onEnter: () => void;
  onToggleNight: () => void;
}) {
  use(loadSceneFonts());
  const reduceMotion = useReducedMotion();
  const k = reduceMotion ? 0.01 : 1;

  const clock = useThree((s) => s.clock);
  const lidRef = useRef<THREE.Group>(null);
  const lid = useRef(new Tween(MAC.lidClosed));
  const bootCam = useRef(new Tween(0));
  const boot = useRef(new Tween(0));
  const zoom = useRef(new Tween(0));
  const started = useRef(false);
  const handledStage = useRef<Stage>("arriving");
  const parallax = useRef(new THREE.Vector2());
  const lastDraw = useRef("");
  const look = useRef(LOOK.clone());

  const nightMix = useRef(new Tween(night ? 1 : 0));
  const handledNight = useRef(night);
  const lampHovered = useRef(false);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);
  const screenGlowRef = useRef<THREE.PointLight>(null);
  const bulbGlowRef = useRef<THREE.PointLight>(null);
  const bulbRef = useRef<THREE.MeshStandardMaterial>(null);
  const shadeInnerRef = useRef<THREE.MeshStandardMaterial>(null);
  const [spotTarget] = useState(() => {
    const target = new THREE.Object3D();
    target.position.copy(LAMP_AIM_WORLD);
    return target;
  });

  const screen = useMemo(() => createCanvasTexture(SCREEN_W, SCREEN_H), []);
  const mascot = useTexture("/images/brandon-sticker.png").image as HTMLImageElement;

  useEffect(() => {
    if (handledStage.current === stage) return;
    handledStage.current = stage;
    const now = clock.elapsedTime;
    if (stage === "booting") {
      lid.current.set(0, now, 0.9 * k);
      bootCam.current.set(1, now, 1.4 * k);
      boot.current.set(1, now, 1.7 * k, 0.5 * k, () => onStage("zooming"));
    } else if (stage === "zooming") {
      zoom.current.set(1, now, 1.25 * k, 0, onEnter);
    }
  }, [stage, clock, k, onStage, onEnter]);

  useEffect(() => {
    if (handledNight.current === night) return;
    handledNight.current = night;
    nightMix.current.set(night ? 1 : 0, clock.elapsedTime, 0.9 * k);
  }, [night, clock, k]);

  useFrame((state) => {
    const now = state.clock.elapsedTime;
    if (!started.current) {
      started.current = true;
      lid.current.set(MAC.lidOpen, now, 1.9 * k, 0.6 * k, () => onStage("idle"));
    }

    const angle = lid.current.update(now);
    if (lidRef.current) lidRef.current.rotation.x = angle;
    const bootProgress = boot.current.update(now);
    const camBlend = bootCam.current.update(now);
    const zoomBlend = zoom.current.update(now);

    // day ↔ night: window light fades to moonlight, the desk lamp takes over
    const n = nightMix.current.update(now);
    const scene = state.scene;
    if (scene.background instanceof THREE.Color) scene.background.lerpColors(DAY.background, NIGHT.background, n);
    scene.environmentIntensity = THREE.MathUtils.lerp(1, 0.1, n);
    if (hemiRef.current) {
      hemiRef.current.intensity = THREE.MathUtils.lerp(1.15, 0.12, n);
      hemiRef.current.color.lerpColors(DAY.sky, NIGHT.sky, n);
    }
    if (keyRef.current) {
      keyRef.current.intensity = THREE.MathUtils.lerp(2.3, 0.28, n);
      keyRef.current.color.lerpColors(DAY.key, NIGHT.key, n);
    }
    if (fillRef.current) fillRef.current.intensity = THREE.MathUtils.lerp(0.45, 0, n);
    if (spotRef.current) spotRef.current.intensity = 12 * n;
    if (screenGlowRef.current) screenGlowRef.current.intensity = 1.2 * n;
    if (bulbGlowRef.current) bulbGlowRef.current.intensity = 0.7 * n;
    const hoverGlow = lampHovered.current ? 0.8 : 0;
    if (bulbRef.current) bulbRef.current.emissiveIntensity = 7 * n + hoverGlow;
    if (shadeInnerRef.current) shadeInnerRef.current.emissiveIntensity = 1.4 * n + hoverGlow * 0.4;

    // screen
    const mode: ScreenMode = stage === "booting" ? "boot" : stage === "zooming" ? "preview" : "title";
    const openFraction = (MAC.lidClosed - angle) / (MAC.lidClosed - MAC.lidOpen);
    const brightness = mode === "title" ? THREE.MathUtils.clamp((openFraction - 0.55) / 0.45, 0, 1) : 1;
    const key = `${mode}:${Math.round(bootProgress * 120)}:${Math.round(brightness * 40)}`;
    if (key !== lastDraw.current) {
      lastDraw.current = key;
      repaint(screen, (ctx) => drawScreen(ctx, mode, bootProgress, brightness, mascot));
    }

    // camera: base (+ pointer parallax) → in front of the laptop → into the screen
    const aspect = state.size.width / state.size.height;
    const free = stage === "arriving" || stage === "idle";
    parallax.current.lerp(free ? state.pointer : new THREE.Vector2(), 0.04);
    const base = basePose(aspect);
    base.position.add(new THREE.Vector3(parallax.current.x * 0.4, parallax.current.y * 0.18, 0));
    const front = bootPose(aspect);
    const dive = zoomPose(aspect);

    const position = base.position.lerp(front.position, camBlend).lerp(dive.position, zoomBlend);
    const target = LOOK.clone().lerp(front.look, camBlend).lerp(dive.look, zoomBlend);
    state.camera.position.copy(position);
    look.current.copy(target);
    state.camera.lookAt(look.current);
  });

  const interactive = stage === "arriving" || stage === "idle";
  const activate = () => onStage("booting");
  const portrait = useThree((s) => s.size.width < s.size.height);

  return (
    <>
      <color attach="background" args={[night ? "#15171d" : "#e9e7e2"]} />
      <hemisphereLight ref={hemiRef} args={["#ffffff", "#d9d3c9", 1.15]} />
      <directionalLight
        ref={keyRef}
        position={[-2.6, 4.2, 3.2]}
        intensity={2.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-2.5}
        shadow-camera-near={0.5}
        shadow-camera-far={14}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-radius={5}
      />
      <directionalLight ref={fillRef} position={[3, 2.2, 2.5]} intensity={0.45} />
      <primitive object={spotTarget} />
      <spotLight
        ref={spotRef}
        position={LAMP_BULB_WORLD}
        target={spotTarget}
        color="#ffb56b"
        intensity={0}
        angle={0.72}
        penumbra={0.7}
        distance={4}
        decay={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
      />
      <pointLight ref={bulbGlowRef} position={LAMP_BULB_WORLD} color="#ffc27a" intensity={0} distance={0.7} decay={2} />
      {/* soft light spilling from the screen onto the keyboard at night */}
      <pointLight ref={screenGlowRef} position={[0, 0.45, -0.1]} color="#ffcf9e" intensity={0} distance={1.6} decay={2} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 1]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-4, 1.5, 2]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[4, 1.5, 2]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#ffd9b8" position={[0, 1, 5]} scale={[6, 2, 1]} />
      </Environment>

      <Room />
      <ContactShadows position={[0, 0.0008, 0.4]} scale={[8, 3]} resolution={1024} far={0.9} blur={2.6} opacity={0.55} color="#3b3226" />

      <MacBook lidRef={lidRef} screenTexture={screen.texture} interactive={interactive} onActivate={activate} />

      <Poster position={[-1.08, 1.05, WALL_Z + 0.004]} />
      <Receipt position={[1.42, 1.18, WALL_Z + 0.003]} />
      <Books position={[-1.95, 0, -0.62]} />
      <Lamp
        bulbRef={bulbRef}
        innerRef={shadeInnerRef}
        onToggle={onToggleNight}
        onHover={(hovered) => (lampHovered.current = hovered)}
      />
      <Mug position={[-0.98, 0, 0.5]} />
      <Disc position={[-1.45, 0, 0.72]} />
      <PencilCup position={[1.02, 0, -0.35]} />
      <FlipClock position={[1.55, 0, -0.45]} />
      <Mouse position={[1.05, 0, 0.5]} />
      <DeskNote position={portrait ? [0.05, 0, 1.0] : [0.62, 0, 0.98]} interactive={interactive} onActivate={activate} />
    </>
  );
}

const NIGHT_KEY = "brandy-os:night";

function readNight() {
  try {
    return window.localStorage.getItem(NIGHT_KEY) === "1";
  } catch {
    return false;
  }
}

export default function DeskScene({ onEnter }: { onEnter: () => void }) {
  const [stage, setStage] = useState<Stage>("arriving");
  // Mounted only after hydration (see DesktopExperience), so reading storage here is safe.
  const [night, setNight] = useState(readNight);
  const interactive = stage === "arriving" || stage === "idle";

  function toggleNight() {
    const next = !night;
    setNight(next);
    try {
      window.localStorage.setItem(NIGHT_KEY, next ? "1" : "0");
    } catch {
      // storage unavailable — the choice just won't be remembered
    }
  }

  useEffect(() => () => void (document.body.style.cursor = ""), []);

  return (
    <div className={`relative h-full w-full overflow-hidden transition-colors duration-700 ${night ? "bg-[#15171d]" : "bg-[#e9e7e2]"}`}>
      <Canvas
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ fov: FOV, near: 0.05, far: 40, position: [0, 1.4, 5.5] }}
        gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping }}
        fallback={
          <div className="flex h-full items-center justify-center">
            <button type="button" onClick={onEnter} className="rounded-full bg-[#141416] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white">
              Entrer dans Brandy OS
            </button>
          </div>
        }
      >
        <Suspense fallback={null}>
          <Experience stage={stage} night={night} onStage={setStage} onEnter={onEnter} onToggleNight={toggleNight} />
        </Suspense>
      </Canvas>

      <header
        className={`pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors duration-700 sm:px-10 ${
          night ? "text-os-cream/70" : "text-[#555]"
        }`}
      >
        <span>Brandy The Dev</span>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleNight}
            aria-label={night ? "Passer en mode jour" : "Passer en mode nuit (ou cliquer sur la lampe)"}
            title={night ? "Mode jour" : "Mode nuit — ou clique sur la lampe"}
            className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-colors max-md:h-11 max-md:w-11 ${
              night
                ? "border-white/15 bg-white/10 text-os-yellow hover:bg-white/20"
                : "border-black/15 bg-white/60 text-[#555] hover:bg-[#141416] hover:text-white"
            }`}
          >
            {night ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            type="button"
            onClick={onEnter}
            className={`rounded-full border px-4 py-2 tracking-[0.2em] backdrop-blur transition-colors max-md:py-3.5 ${
              night
                ? "border-white/15 bg-white/10 hover:bg-os-cream hover:text-[#141416]"
                : "border-black/15 bg-white/60 hover:bg-[#141416] hover:text-white"
            }`}
          >
            Passer l&apos;intro →
          </button>
        </div>
      </header>

      <button
        type="button"
        disabled={!interactive}
        onClick={() => setStage("booting")}
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-6 focus:left-1/2 focus:-translate-x-1/2 focus:rounded-full focus:bg-[#141416] focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:text-white"
      >
        Allumer le Mac
      </button>
    </div>
  );
}
