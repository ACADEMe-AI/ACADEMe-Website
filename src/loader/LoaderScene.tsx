import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AnimatedCube } from "./AnimatedCube";
import type { Vec3 } from "./pieceMap";

type SceneProps = {
  reducedMotion?: boolean;
  freeze?: boolean;
  transparentClear?: boolean;
  assetsReady?: boolean;
  fixedCssPx?: number | null;
  onComplete?: () => void;
  onLogoReady?: () => void;
};

const ISO_DIR = new THREE.Vector3(1, 1, 1).normalize();
const CAM_DIST = 6.2;
const ORTHO_SIZE = 1.9;

function IsoCamera() {
  const { camera, size } = useThree();
  const ortho = camera as THREE.OrthographicCamera;

  useEffect(() => {
    const pos = ISO_DIR.clone().multiplyScalar(CAM_DIST);
    ortho.position.copy(pos);
    ortho.up.set(0, 1, 0);
    ortho.lookAt(0, 0, 0);
    const aspect = size.width / Math.max(1, size.height);
    const h = ORTHO_SIZE;
    const w = h * aspect;
    ortho.left = -w;
    ortho.right = w;
    ortho.top = h;
    ortho.bottom = -h;
    ortho.near = 0.1;
    ortho.far = 40;
    ortho.updateProjectionMatrix();
  }, [ortho, size.width, size.height]);

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={0.55} />
      <directionalLight position={[-3, 2, 4]} intensity={0.4} />
      <directionalLight position={[2, -1, -2]} intensity={0.2} />
    </>
  );
}

function ClearMode({ transparent }: { transparent?: boolean }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, transparent ? 0 : 1);
  }, [gl, transparent]);
  return null;
}

export function LoaderScene({
  reducedMotion,
  freeze,
  transparentClear = true,
  assetsReady = true,
  fixedCssPx = null,
  onComplete,
  onLogoReady,
}: SceneProps) {
  const locked = fixedCssPx != null && fixedCssPx > 0;

  const phone =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px), (max-height: 500px) and (pointer: coarse)")
      .matches;
  const dpr: [number, number] | number = phone ? [1, 1.5] : 2;

  return (
    <Canvas
      className="brand-loader-canvas"
      dpr={dpr}
      orthographic
      style={
        locked
          ? { width: fixedCssPx, height: fixedCssPx, display: "block" }
          : { width: "100%", height: "100%", display: "block" }
      }
      camera={{
        position: ISO_DIR.clone().multiplyScalar(CAM_DIST).toArray() as Vec3,
        zoom: 1,
        near: 0.1,
        far: 40,
      }}
      gl={{
        antialias: !phone,
        alpha: true,
        powerPreference: phone ? "default" : "high-performance",
        premultipliedAlpha: false,
      }}
      onCreated={({ gl, camera, setSize }) => {
        gl.setClearColor(0x000000, transparentClear ? 0 : 1);
        if (locked && fixedCssPx) {
          setSize(fixedCssPx, fixedCssPx, false);
          gl.setPixelRatio(phone ? Math.min(1.5, window.devicePixelRatio || 1) : 2);
        }
        camera.position.copy(ISO_DIR.clone().multiplyScalar(CAM_DIST));
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }}
    >
      <ClearMode transparent={transparentClear} />
      <IsoCamera />
      <Lights />
      {locked && fixedCssPx ? <LockLoaderSize px={fixedCssPx} /> : null}
      <AnimatedCube
        reducedMotion={reducedMotion}
        freeze={freeze}
        assetsReady={assetsReady}
        onComplete={onComplete}
        onLogoReady={onLogoReady}
      />
    </Canvas>
  );
}

function LockLoaderSize({ px }: { px: number }) {
  const { setSize, size, gl } = useThree();

  const enforce = () => {
    const el = gl.domElement;
    const phone =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px), (max-height: 500px) and (pointer: coarse)")
        .matches;
    const dpr = phone ? Math.min(1.5, window.devicePixelRatio || 1) : 2;
    const buf = Math.round(px * dpr);
    if (el.width !== buf || el.height !== buf || Math.round(size.width) !== px) {
      setSize(px, px, false);
      gl.setPixelRatio(dpr);
    }
    if (el.style.width !== `${px}px` || el.style.height !== `${px}px`) {
      el.style.width = `${px}px`;
      el.style.height = `${px}px`;
    }
  };

  useEffect(() => {
    enforce();
    window.addEventListener("resize", enforce);
    return () => window.removeEventListener("resize", enforce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [px, setSize, gl]);

  useEffect(() => {
    if (Math.round(size.width) !== px || Math.round(size.height) !== px) {
      enforce();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height, px]);

  return null;
}
