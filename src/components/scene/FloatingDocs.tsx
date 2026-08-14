import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../../lib/scrollState";

/** Spawn on the RIGHT → fly into phone. Depth stagger so cards read 3D. */
const DOCS = [
  { label: "PDF", color: "#5B6CFF", ox: 2.55, oy: 0.95, oz: 0.85 },
  { label: "Notes", color: "#0D9F6E", ox: 2.9, oy: 0.08, oz: 0.35 },
  { label: "Slides", color: "#C98A12", ox: 2.45, oy: -0.8, oz: 1.05 },
  { label: "Lec", color: "#E03E4D", ox: 3.15, oy: 0.48, oz: 0.15 },
];

/** Canvas label texture so we avoid drei Text font loading failures. */
function makeLabelTexture(label: string, accent: string) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 320;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 256, 320);
  ctx.fillStyle = accent;
  round(ctx, 28, 28, 200, 36, 10);
  ctx.fill();
  ctx.fillStyle = "#12141A";
  ctx.font = "700 42px Archivo, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, 128, 160);
  ctx.fillStyle = "#5C6578";
  ctx.font = "500 22px Archivo, system-ui, sans-serif";
  ctx.fillText("Study material", 128, 200);
  // Fake lines
  ctx.fillStyle = "#E4E7F0";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(36, 230 + i * 14, 180 - i * 12, 6);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function round(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** 3D study materials that float then absorb into the phone. */
export function FloatingDocs() {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () => DOCS.map(() => ({ s: Math.random() * Math.PI * 2, f: 0.6 + Math.random() * 0.5 })),
    []
  );
  const textures = useMemo(
    () => DOCS.map((d) => makeLabelTexture(d.label, d.color)),
    []
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const vis = scrollState.docs.visible;
    const absorb = scrollState.docs.absorb;
    const phone = scrollState.phone;
    const t = state.clock.elapsedTime;
    const k = scrollState.reducedMotion ? 1 : 1 - Math.pow(0.001, dt);

    g.children.forEach((child, i) => {
      const d = DOCS[i];
      const seed = seeds[i];
      const floatY = scrollState.reducedMotion ? 0 : Math.sin(t * seed.f + seed.s) * 0.08;
      const floatX = scrollState.reducedMotion ? 0 : Math.cos(t * seed.f * 0.7 + seed.s) * 0.05;

      const targetX = THREE.MathUtils.lerp(d.ox + floatX, phone.x, absorb);
      const targetY = THREE.MathUtils.lerp(d.oy + floatY, phone.y, absorb);
      const targetZ = THREE.MathUtils.lerp(d.oz, phone.z + 0.12, absorb);
      const targetScale = THREE.MathUtils.lerp(vis, 0, absorb * 0.95);

      child.position.x = THREE.MathUtils.lerp(child.position.x, targetX, k);
      child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, k);
      child.position.z = THREE.MathUtils.lerp(child.position.z, targetZ, k);
      const s = THREE.MathUtils.lerp(child.scale.x, Math.max(targetScale, 0.001), k);
      child.scale.setScalar(s);
      child.rotation.z = THREE.MathUtils.lerp(
        child.rotation.z,
        (i - 1.5) * 0.18 * (1 - absorb),
        k
      );
      child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, 0.28 * (1 - absorb), k);
      child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, 0.12 * (1 - absorb), k);
      child.visible = s > 0.02;
    });
  });

  return (
    <group ref={group}>
      {DOCS.map((d, i) => (
        <group key={d.label} position={[d.ox, d.oy, d.oz]} scale={0.001}>
          <RoundedBox args={[0.78, 1.02, 0.036]} radius={0.035} smoothness={4} castShadow receiveShadow>
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.42}
              metalness={0}
              envMapIntensity={0.35}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.02]} castShadow>
            <planeGeometry args={[0.72, 0.96]} />
            <meshBasicMaterial map={textures[i]} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
