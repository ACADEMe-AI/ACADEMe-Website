/**
 * Cube ↔ ACADEMe logo map.
 * Visibility of logo cubies is controlled by logoVisibility.ts → HIDDEN_BOXES
 *
 * World axes (camera on +X+Y+Z diagonal, orthographic):
 *   +Y = top (blue)
 *   −X ≈ left face of mark
 *   +Z ≈ right face of mark
 */

import { boxId, isBoxHidden, HIDDEN_BOXES } from "./logoVisibility";

export type Vec3 = [number, number, number];

export type PiecePose = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

export type TransformPiece = {
  id: string;
  grid: Vec3;
  role: "blue" | "light";
  start: PiecePose;
  target: PiecePose;
  midLift: Vec3;
  delay: number;
  duration: number;
  inLogo: boolean;
};

export const COLORS = {
  blue: "#4B57F5",
  blueDeep: "#3A46E0",
  light: "#F2F3F7",
  plastic: "#050508",
} as const;

export const PITCH = 0.36;
export const CUBIE = 0.3;
export const ASSEMBLY_SCALE = 1;

const G = [-1, 0, 1] as const;

function gridPos(x: number, y: number, z: number): Vec3 {
  return [x * PITCH, y * PITCH, z * PITCH];
}

export function isInLogo(
  x: number,
  y: number,
  z: number,
  hidden: string[] = HIDDEN_BOXES,
): boolean {
  return !isBoxHidden(boxId(x, y, z), hidden);
}

function roleFor(_x: number, y: number, _z: number): TransformPiece["role"] {
  return y === 1 ? "blue" : "light";
}

function logoTarget(x: number, y: number, z: number, inLogo: boolean): PiecePose {
  const pos = gridPos(x, y, z);

  if (!inLogo) {
    return {
      position: [x * PITCH * 0.08, y * PITCH * 0.08, z * PITCH * 0.08],
      rotation: [0, 0, 0],
      scale: [0.001, 0.001, 0.001],
    };
  }

  return {
    position: pos,
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  };
}

function delayFor(x: number, y: number, z: number, inLogo: boolean): number {
  if (y === 1) return (x + 1) * 1.4 + (z + 1) * 1.0;
  if (!inLogo) return 3 + Math.abs(x) * 2 + Math.abs(z) * 2;
  if (y === 0) return 9 + (x + 1) * 1.6 + Math.abs(z);
  return 13 + (x + 1) * 1.3 + (z + 1);
}

function midLift(x: number, y: number, z: number, inLogo: boolean): Vec3 {
  if (!inLogo) return [x * 0.1, 0.18, z * 0.1];
  return [x * 0.07, 0.14 + y * 0.02, z * 0.07];
}

export function buildPieces(hidden: string[] = HIDDEN_BOXES): TransformPiece[] {
  const pieces: TransformPiece[] = [];
  for (const x of G) {
    for (const y of G) {
      for (const z of G) {
        if (x === 0 && y === 0 && z === 0) continue;
        const id = boxId(x, y, z);
        const inLogo = isInLogo(x, y, z, hidden);
        pieces.push({
          id,
          grid: [x, y, z],
          role: roleFor(x, y, z),
          start: {
            position: gridPos(x, y, z),
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
          },
          target: logoTarget(x, y, z, inLogo),
          midLift: midLift(x, y, z, inLogo),
          delay: delayFor(x, y, z, inLogo),
          duration: inLogo ? 34 + Math.abs(y) * 2 : 26,
          inLogo,
        });
      }
    }
  }
  return pieces;
}

export const PIECES = buildPieces();

export type LayerTwist = {
  start: number;
  end: number;
  axis: "x" | "y" | "z";
  layer: -1 | 0 | 1;
  angle: number;
};

/** Longer, slower scramble → solve cycle (looped while assets load). Fits TIMING.cubeEnd. */
export const LAYER_TWISTS: LayerTwist[] = [
  { start: 0, end: 14, axis: "y", layer: 1, angle: Math.PI / 2 },
  { start: 12, end: 26, axis: "x", layer: -1, angle: -Math.PI / 2 },
  { start: 24, end: 38, axis: "z", layer: 1, angle: Math.PI / 2 },
  { start: 36, end: 50, axis: "y", layer: -1, angle: Math.PI / 2 },
  { start: 48, end: 62, axis: "x", layer: 1, angle: Math.PI / 2 },
  { start: 60, end: 74, axis: "z", layer: -1, angle: -Math.PI / 2 },
  { start: 72, end: 86, axis: "y", layer: 0, angle: Math.PI / 2 },
  // reverse / solve
  { start: 84, end: 96, axis: "y", layer: 0, angle: -Math.PI / 2 },
  { start: 94, end: 106, axis: "z", layer: -1, angle: Math.PI / 2 },
  { start: 104, end: 116, axis: "x", layer: 1, angle: -Math.PI / 2 },
  { start: 114, end: 126, axis: "y", layer: -1, angle: -Math.PI / 2 },
  { start: 124, end: 134, axis: "z", layer: 1, angle: -Math.PI / 2 },
  { start: 132, end: 140, axis: "x", layer: -1, angle: Math.PI / 2 },
  { start: 138, end: 144, axis: "y", layer: 1, angle: -Math.PI / 2 },
];
