import { useMemo } from "react";
import * as THREE from "three";
import type { TransformPiece } from "./pieceMap";
import { COLORS, CUBIE } from "./pieceMap";

type Props = {
  piece: TransformPiece;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

export function CubePieceMesh({ piece, position, rotation, scale }: Props) {
  const materials = useMemo(() => {
    const plastic = new THREE.MeshStandardMaterial({
      color: COLORS.plastic,
      roughness: 0.62,
      metalness: 0.04,
    });
    const blue = new THREE.MeshStandardMaterial({
      color: COLORS.blue,
      roughness: 0.32,
      metalness: 0.08,
      emissive: COLORS.blueDeep,
      emissiveIntensity: 0.08,
    });
    const light = new THREE.MeshStandardMaterial({
      color: COLORS.light,
      roughness: 0.4,
      metalness: 0.04,
    });
    return { plastic, blue, light };
  }, []);

  const [gx, gy, gz] = piece.grid;
  const sticker = CUBIE * 0.9;
  const thick = 0.018;
  const half = CUBIE / 2 + 0.001;

  type Face = {
    pos: [number, number, number];
    rot: [number, number, number];
    mat: THREE.Material;
  };
  const faces: Face[] = [];

  if (gy === 1) faces.push({ pos: [0, half, 0], rot: [-Math.PI / 2, 0, 0], mat: materials.blue });
  if (gy === -1) faces.push({ pos: [0, -half, 0], rot: [Math.PI / 2, 0, 0], mat: materials.light });
  if (gx === 1) faces.push({ pos: [half, 0, 0], rot: [0, Math.PI / 2, 0], mat: materials.light });
  if (gx === -1) faces.push({ pos: [-half, 0, 0], rot: [0, -Math.PI / 2, 0], mat: materials.light });
  if (gz === 1) faces.push({ pos: [0, 0, half], rot: [0, 0, 0], mat: materials.light });
  if (gz === -1) faces.push({ pos: [0, 0, -half], rot: [0, Math.PI, 0], mat: materials.light });

  if (piece.role === "blue" && gy === 1 && !faces.some((f) => f.mat === materials.blue)) {
    faces.push({ pos: [0, half, 0], rot: [-Math.PI / 2, 0, 0], mat: materials.blue });
  }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow material={materials.plastic}>
        <boxGeometry args={[CUBIE, CUBIE, CUBIE]} />
      </mesh>
      {faces.map((f, i) => (
        <mesh key={i} position={f.pos} rotation={f.rot} material={f.mat}>
          <boxGeometry args={[sticker, sticker, thick]} />
        </mesh>
      ))}
    </group>
  );
}
