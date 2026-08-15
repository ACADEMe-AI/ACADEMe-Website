
export function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

export function smoothstep(t: number) {
  t = clamp01(t);
  return t * t * (3 - 2 * t);
}

export function easeOutQuint(t: number) {
  t = clamp01(t);
  return 1 - (1 - t) ** 5;
}

export function easeInOutCubic(t: number) {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function easeOutBackSoft(t: number, overshoot = 1.12) {
  t = clamp01(t);
  const c1 = overshoot;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

export function pieceTravel(t: number) {
  t = clamp01(t);
  const base = easeInOutCubic(t);
  if (t < 0.85) return base;
  const local = (t - 0.85) / 0.15;
  const over = easeOutBackSoft(local, 1.08);
  return base * 0.92 + over * 0.08 + (base - 0.92) * (1 - 0.08);
}

export function pieceEase(t: number) {
  t = clamp01(t);
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
