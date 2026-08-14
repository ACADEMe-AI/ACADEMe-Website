/** Premium motion curves — no pure linear for piece travel */

export function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

/** Smoothstep */
export function smoothstep(t: number) {
  t = clamp01(t);
  return t * t * (3 - 2 * t);
}

/** Quintic ease out — soft landing */
export function easeOutQuint(t: number) {
  t = clamp01(t);
  return 1 - (1 - t) ** 5;
}

/** Cubic ease in-out */
export function easeInOutCubic(t: number) {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Spring-like overshoot (very subtle) then settle.
 * overshoot ~1.02 peak, then rest at 1.
 */
export function easeOutBackSoft(t: number, overshoot = 1.12) {
  t = clamp01(t);
  const c1 = overshoot;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

/** Piece travel: accelerate → cruise → soft overshoot settle */
export function pieceTravel(t: number) {
  t = clamp01(t);
  // blend ease-in-out with tiny overshoot at end
  const base = easeInOutCubic(t);
  if (t < 0.85) return base;
  const local = (t - 0.85) / 0.15;
  const over = easeOutBackSoft(local, 1.08);
  return base * 0.92 + over * 0.08 + (base - 0.92) * (1 - 0.08);
  // simpler reliable curve:
}

/** Cleaner piece curve used by the scene */
export function pieceEase(t: number) {
  t = clamp01(t);
  // mostly easeInOutCubic with micro overshoot via back
  if (t < 0.9) return easeInOutCubic(t / 0.9) * 0.97;
  const u = (t - 0.9) / 0.1;
  return 0.97 + 0.03 * easeOutBackSoft(u, 1.15);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Quadratic bezier for slight 3D arc paths */
export function bezier3(
  a: [number, number, number],
  c: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  const u = 1 - t;
  return [
    u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
    u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
    u * u * a[2] + 2 * u * t * c[2] + t * t * b[2],
  ];
}
