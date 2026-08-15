
import { scrollState } from "../lib/scrollState";

export type PocketRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const MIN_POCKET = 20;

let pocketEl: HTMLElement | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function registerPocket(el: HTMLElement | null) {
  pocketEl = el;
  notify();
}

export function onPocketChange(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getPocketEl() {
  return pocketEl;
}

function resolvePocketEl(): HTMLElement | null {
  if (pocketEl && document.contains(pocketEl)) return pocketEl;
  return document.querySelector("[data-pocket-logo]") as HTMLElement | null;
}

export function measurePocket(): PocketRect | null {
  const el = resolvePocketEl();
  if (!el) return null;

  void el.offsetWidth;

  const r = el.getBoundingClientRect();
  if (!Number.isFinite(r.width) || !Number.isFinite(r.height)) return null;
  if (r.width < MIN_POCKET || r.height < MIN_POCKET) return null;
  if (r.bottom < -20 || r.top > window.innerHeight + 20) return null;
  if (r.right < -20 || r.left > window.innerWidth + 20) return null;

  return {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
  };
}

export async function waitForPocket(
  attempts = 12,
  delayMs = 40,
): Promise<PocketRect | null> {
  for (let i = 0; i < attempts; i++) {
    const r = measurePocket();
    if (r) return r;
    await new Promise((res) => setTimeout(res, delayMs));
  }
  return measurePocket();
}

export function measureHeroOpacity(): number {
  const v = scrollState.overlays.hero;
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 1;
}

export { MIN_POCKET };
