/**
 * LOGO BOX VISIBILITY
 * Hidden cubies for the brand mark (edit HIDDEN_BOXES)
 *
 * Hidden numbers: 12, 25
 *   #12  1,0,-1   RIGHT · MID · BACK
 *   #25  0,-1,1   MID · BOTTOM · FRONT
 */

export const HIDDEN_BOXES: string[] = [
  "1,0,-1", // #12
  "0,-1,1", // #25
];

export function boxId(x: number, y: number, z: number) {
  return `${x},${y},${z}`;
}

export function isBoxHidden(id: string, hidden: string[] = HIDDEN_BOXES) {
  return hidden.includes(id);
}

/** All 26 outer cubie ids (no core) */
export function allBoxIds(): string[] {
  const ids: string[] = [];
  for (const x of [-1, 0, 1]) {
    for (const y of [-1, 0, 1]) {
      for (const z of [-1, 0, 1]) {
        if (x === 0 && y === 0 && z === 0) continue;
        ids.push(boxId(x, y, z));
      }
    }
  }
  return ids;
}

export function describeBox(id: string): string {
  const [xs, ys, zs] = id.split(",");
  const x = Number(xs);
  const y = Number(ys);
  const z = Number(zs);
  const parts: string[] = [];
  if (y === 1) parts.push("TOP blue");
  if (y === -1) parts.push("BOTTOM");
  if (y === 0) parts.push("MID");
  if (x === -1) parts.push("LEFT");
  if (x === 1) parts.push("RIGHT");
  if (z === 1) parts.push("FRONT");
  if (z === -1) parts.push("BACK");
  return parts.join(" · ") || id;
}
