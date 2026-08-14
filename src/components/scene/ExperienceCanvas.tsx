import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import { PhoneMesh } from "./PhoneMesh";
import { FloatingDocs } from "./FloatingDocs";
import { MeeSprite } from "./MeeSprite";
import { CameraRig } from "./CameraRig";
import { scrollState } from "../../lib/scrollState";

function SceneContents() {
  return (
    <>
      {/* Transparent clear so CSS stage glow shows through (frame-00 purple) */}
      <fog attach="fog" args={["#050508", 11, 22]} />

      <ambientLight intensity={0.22} />
      {/* Soft blue-violet key — product film stage */}
      <directionalLight
        castShadow
        position={[4, 3, 2]}
        intensity={1.05}
        color="#d0c8f0"
        shadow-mapSize={[1024, 1024]}
      />
      {/* Rim — cool aluminum highlights for back/edge shots */}
      <directionalLight position={[-4.5, 1.8, -2.2]} intensity={1.15} color="#d0d4e8" />
      <directionalLight position={[2.5, 2.5, -3.5]} intensity={0.95} color="#b8b8d8" />
      <directionalLight position={[1.5, -2.5, -3]} intensity={0.55} color="#9890c0" />
      <pointLight position={[1.4, 0.4, -1.4]} intensity={1.45} color="#a8a0d8" distance={9} />
      <pointLight position={[1.2, 1.2, -0.8]} intensity={0.9} color="#e0e4f0" distance={7} />
      <pointLight position={[3, 0.5, 1.2]} intensity={1.55} color="#7a68c8" distance={14} />
      <pointLight position={[2.2, -0.2, 1.8]} intensity={0.9} color="#6050b0" distance={10} />
      <pointLight position={[3.4, 1.2, 0.5]} intensity={1.15} color="#8a78d8" distance={12} />
      <pointLight position={[-1.5, 0.8, 3.5]} intensity={0.45} color="#a8b0d8" distance={12} />
      <spotLight
        position={[3.4, 2, 1.5]}
        angle={0.55}
        penumbra={0.85}
        intensity={1.2}
        color="#8a78d0"
      />

      <Environment resolution={256}>
        <Lightformer intensity={1.35} position={[3.5, 2.5, 1]} scale={[7, 4, 1]} color="#b8b0e8" />
        <Lightformer intensity={0.7} position={[4, 0.5, 0]} scale={[3, 6, 1]} color="#6a58b0" />
        <Lightformer intensity={0.75} position={[-3.5, 1.2, -2]} scale={[5, 5, 1]} color="#8070c8" />
        <Lightformer intensity={0.55} position={[0, 3, -2]} scale={[6, 2, 1]} color="#d0d0e8" />
        <Lightformer intensity={0.35} position={[-2, 1, -1]} scale={[4, 4, 1]} color="#302850" />
        <Lightformer intensity={0.22} position={[0, -2, 2]} scale={[8, 2, 1]} color="#181230" />
      </Environment>

      <CameraRig />
      <Suspense fallback={null}>
        <PhoneMesh />
      </Suspense>
      <FloatingDocs />
      <Suspense fallback={null}>
        <MeeSprite />
      </Suspense>
    </>
  );
}

export function ExperienceCanvas() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.75]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (max-height: 500px) and (pointer: coarse)");
    const apply = () => {
      scrollState.isMobile = mq.matches;
      setDpr(mq.matches ? [1, 1.25] : [1, 1.75]);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="webgl-layer" aria-hidden>
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        shadows
        camera={{ position: [0.28, -0.1, 5.6], fov: 27, near: 0.1, far: 40 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 1.22;
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
