import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../../lib/scrollState";

/**
 * Load mascot with black-plate knockout.
 * Mee only appears in dedicated empty space (never under type, never on the phone face).
 */
function useKnockoutTexture(src: string) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, c.width, c.height);
      const d = data.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        if (r < 18 && g < 18 && b < 18) d[i + 3] = 0;
        else if (r < 40 && g < 40 && b < 40) {
          d[i + 3] = Math.min(d[i + 3], Math.floor(((r + g + b) / 3) * 4));
        }
      }
      // Hard wipe bottom-right watermark zone
      const wipeW = Math.floor(c.width * 0.28);
      const wipeH = Math.floor(c.height * 0.12);
      for (let y = c.height - wipeH; y < c.height; y++) {
        for (let x = c.width - wipeW; x < c.width; x++) {
          d[(y * c.width + x) * 4 + 3] = 0;
        }
      }
      ctx.putImageData(data, 0, 0);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
      setTex(t);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => () => tex?.dispose(), [tex]);
  return tex;
}

/** Compact Mee billboard — only when scrollState.mee.visible is high. */
export function MeeSprite() {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useKnockoutTexture("/mascot/hero.png");
  const mat = useMemo(() => {
    if (!tex) return null;
    return new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: false,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
  }, [tex]);

  useFrame((state, dt) => {
    const m = ref.current;
    if (!m || !mat) return;
    const mee = scrollState.mee;
    const k = scrollState.reducedMotion ? 1 : 1 - Math.pow(0.001, dt);
    const bob = scrollState.reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.5) * 0.04;

    // Absolute lane position (not offset from phone — avoids stacking on device)
    const tx = mee.x;
    const ty = mee.y + bob;
    const tz = mee.z;

    m.position.x = THREE.MathUtils.lerp(m.position.x, tx, k);
    m.position.y = THREE.MathUtils.lerp(m.position.y, ty, k);
    m.position.z = THREE.MathUtils.lerp(m.position.z, tz, k);

    // Compact companion — readable, secondary to product
    const targetScale = Math.max(mee.visible * 0.52, 0.001);
    const s = THREE.MathUtils.lerp(m.scale.x, targetScale, k);
    m.scale.set(s, s * 1.06, s);
    m.visible = s > 0.04 && !!tex && mee.visible > 0.15;

    m.quaternion.copy(state.camera.quaternion);
  });

  if (!mat) return null;

  return (
    <mesh ref={ref} position={[-2, 0.8, 0.15]} scale={0.001} renderOrder={2} material={mat}>
      <planeGeometry args={[0.95, 1.05]} />
    </mesh>
  );
}
