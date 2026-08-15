
import {
  measureHeroOpacity,
  measurePocket,
  type PocketRect,
  MIN_POCKET,
} from "./pocketRegistry";

export const FLY_PX = 360;
export const FALLBACK_POCKET_PX = 140;

export function fallbackPocketSize(): number {
  if (typeof window === "undefined") return FALLBACK_POCKET_PX;
  const w = window.innerWidth;
  if (w <= 768) return Math.round(Math.min(56, Math.max(40, w * 0.11)));
  return FALLBACK_POCKET_PX;
}
export const HERO_HIDE_OPACITY = 0.02;
export const FLY_DURATION = 0.95;
export const FLY_DURATION_MOBILE = 0.72;
export const LOGO_HOLD_MS = 400;
export const LOGO_HOLD_MS_MOBILE = 220;
export const LOGO_HOLD_REDUCED_MS = 50;

export function isPhoneViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(
    "(max-width: 768px), (max-height: 500px) and (pointer: coarse)",
  ).matches;
}

export function flyDurationSec(): number {
  return isPhoneViewport() ? FLY_DURATION_MOBILE : FLY_DURATION;
}

export function logoHoldMs(reduced: boolean): number {
  if (reduced) return LOGO_HOLD_REDUCED_MS;
  return isPhoneViewport() ? LOGO_HOLD_MS_MOBILE : LOGO_HOLD_MS;
}

export type PinState = {
  lockedSize: number;
  lockedScale: number;
  lastL: number;
  lastT: number;
  frozen: boolean;
};

export function createPinState(): PinState {
  return {
    lockedSize: 0,
    lockedScale: 0,
    lastL: 0,
    lastT: 0,
    frozen: false,
  };
}

export function freezeFromRect(state: PinState, rect: PocketRect, force = false) {
  if (state.frozen && !force) return;
  const size = Math.round(Math.min(rect.width, rect.height));
  state.lockedSize = Math.max(MIN_POCKET, size);
  state.lockedScale = state.lockedSize / FLY_PX;
  state.frozen = true;
}

export function ensureFrozen(state: PinState) {
  if (state.frozen) return;
  const size = fallbackPocketSize();
  state.lockedSize = size;
  state.lockedScale = size / FLY_PX;
  state.frozen = true;
}

export function applyParkedPose(
  outer: HTMLElement,
  scaleEl: HTMLElement,
  state: PinState,
  left: number,
  top: number,
  opacity: number,
) {
  if (!state.frozen) return;

  if (
    (left < 4 && top < 4) ||
    !Number.isFinite(left) ||
    !Number.isFinite(top) ||
    state.lockedSize < 16
  ) {
    outer.style.cssText = [
      "position:fixed",
      "left:0",
      "top:0",
      "width:1px",
      "height:1px",
      "opacity:0",
      "visibility:hidden",
      "pointer-events:none",
      "z-index:0",
    ].join(";");
    return;
  }

  const l = Math.round(left);
  const t = Math.round(top);
  const size = Math.round(state.lockedSize);

  outer.style.cssText = [
    "position:fixed",
    `left:${l}px`,
    `top:${t}px`,
    `width:${size}px`,
    `height:${size}px`,
    "margin:0",
    "overflow:hidden",
    "transform:none",
    `opacity:${opacity}`,
    "visibility:visible",
        "z-index:7",
    "pointer-events:none",
  ].join(";");

  scaleEl.style.cssText = [
    "position:absolute",
    "left:0",
    "top:0",
    `width:${FLY_PX}px`,
    `height:${FLY_PX}px`,
    "transform-origin:0 0",
    `transform:scale(${state.lockedScale})`,
    "pointer-events:none",
  ].join(";");
}

export function syncParkedPosition(
  outer: HTMLElement,
  state: PinState,
): void {
  const op = measureHeroOpacity();
  if (op < HERO_HIDE_OPACITY) {
    if (outer.style.opacity !== "0") outer.style.opacity = "0";
    return;
  }

  const r = measurePocket();
  if (!r) {
    outer.style.opacity = String(op);
    return;
  }

  const l = Math.round(r.left);
  const t = Math.round(r.top);
  if (
    l === Math.round(state.lastL) &&
    t === Math.round(state.lastT) &&
    outer.style.opacity === String(op)
  ) {
    return;
  }

  state.lastL = r.left;
  state.lastT = r.top;
  outer.style.left = `${l}px`;
  outer.style.top = `${t}px`;
  outer.style.opacity = String(op);
}

export { measurePocket, measureHeroOpacity, waitForPocket } from "./pocketRegistry";
