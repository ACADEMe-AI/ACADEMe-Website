import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../../lib/scrollState";

const CARDS = [
  { subject: "Maths", chapter: "Chapter 3", title: ["Linear", "equations"], tint: "#E7E6FF", ox: 2.55, oy: 0.95, oz: 0.85 },
  { subject: "Science", chapter: "Chapter 9", title: ["Light and", "mirrors"], tint: "#FFE7A3", ox: 2.9, oy: 0.08, oz: 0.35 },
  { subject: "History", chapter: "Chapter 1", title: ["Nationalism", "in Europe"], tint: "#DCEBFF", ox: 2.45, oy: -0.8, oz: 1.05 },
  { subject: "English", chapter: "Chapter 1", title: ["A Letter", "to God"], tint: "#FFE0EC", ox: 3.15, oy: 0.48, oz: 0.15 },
];

type Card = (typeof CARDS)[number];

function round(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCard(canvas: HTMLCanvasElement, card: Card) {
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width;
  const h = canvas.height;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = card.tint;
  round(ctx, 30, 30, w - 60, 150, 22);
  ctx.fill();
  ctx.fillStyle = "#12141A";
  ctx.font = "700 40px Archivo, system-ui, sans-serif";
  ctx.fillText(card.subject, 56, 100);
  ctx.fillStyle = "#5C6578";
  ctx.font = "600 26px 'Noto Sans', system-ui, sans-serif";
  ctx.fillText(card.chapter, 56, 145);
  ctx.fillStyle = "#12141A";
  ctx.font = "800 44px 'Baloo 2', system-ui, sans-serif";
  card.title.forEach((line, i) => ctx.fillText(line, 40, 262 + i * 50));
  ctx.fillStyle = "#EEF0F5";
  round(ctx, 40, h - 92, w - 80, 16, 8);
  ctx.fill();
  ctx.fillStyle = "#564CF1";
  round(ctx, 40, h - 92, (w - 80) * 0.38, 16, 8);
  ctx.fill();
  ctx.fillStyle = "#5C6578";
  ctx.font = "600 24px 'Noto Sans', system-ui, sans-serif";
  ctx.fillText("Swipe lessons", 40, h - 36);
}

function makeCardTexture(card: Card) {
  const canvas = document.createElement("canvas");
  canvas.width = 360;
  canvas.height = 480;
  drawCard(canvas, card);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  document.fonts
    ?.load("800 44px 'Baloo 2'")
    .then(() => document.fonts.load("700 40px Archivo"))
    .then(() => document.fonts.load("600 26px 'Noto Sans'"))
    .then(() => {
      drawCard(canvas, card);
      texture.needsUpdate = true;
    })
    .catch(() => undefined);
  return texture;
}

export function FloatingCards() {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () => CARDS.map(() => ({ s: Math.random() * Math.PI * 2, f: 0.6 + Math.random() * 0.5 })),
    []
  );
  const textures = useMemo(
    () => CARDS.map(makeCardTexture),
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
      const d = CARDS[i];
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
      {CARDS.map((d, i) => (
        <group key={d.subject} position={[d.ox, d.oy, d.oz]} scale={0.001}>
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
