import * as THREE from "three";
import type { ScreenState } from "./scrollState";

const SCREEN_URLS: Record<ScreenState, string> = {
  home: "/screens/home.png",
  upload: "/screens/upload.png",
  processing: "/screens/processing.png",
  chat: "/screens/chat.png",
  cards: "/screens/cards.png",
  quiz: "/screens/quiz.png",
  practice: "/screens/practice.png",
  mastery: "/screens/mastery.png",
  waitlist: "/screens/waitlist.png",
};

/**
 * Preload baked product UI screens and bind them to a single canvas-compatible
 * texture slot the phone screen mesh consumes.
 */
export function createScreenTexture() {
  const loader = new THREE.TextureLoader();
  const cache = new Map<ScreenState, THREE.Texture>();
  let current: ScreenState | null = null;
  let active: THREE.Texture | null = null;
  let loading = new Set<string>();

  // Shared placeholder until first texture loads
  const placeholder = makePlaceholder();

  function ensure(state: ScreenState): THREE.Texture {
    const hit = cache.get(state);
    if (hit) return hit;

    if (!loading.has(state)) {
      loading.add(state);
      loader.load(
        SCREEN_URLS[state],
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          tex.flipY = true;
          tex.needsUpdate = true;
          cache.set(state, tex);
          loading.delete(state);
          // If this is the current screen, hot-swap
          if (current === state && active && onSwap) {
            onSwap(tex);
          }
        },
        undefined,
        () => {
          loading.delete(state);
          console.warn("[screenTexture] failed to load", SCREEN_URLS[state]);
        }
      );
    }
    return placeholder;
  }

  let onSwap: ((tex: THREE.Texture) => void) | null = null;

  function paint(state: ScreenState) {
    if (state === current && cache.has(state)) return cache.get(state)!;
    current = state;
    const tex = cache.get(state) ?? ensure(state);
    active = tex;
    return tex;
  }

  function setOnSwap(cb: (tex: THREE.Texture) => void) {
    onSwap = cb;
  }

  // Kick preload of all states
  (Object.keys(SCREEN_URLS) as ScreenState[]).forEach((s) => ensure(s));
  paint("home");

  return {
    get texture() {
      return active ?? placeholder;
    },
    paint,
    setOnSwap,
    dispose() {
      placeholder.dispose();
      cache.forEach((t) => t.dispose());
      cache.clear();
    },
  };
}

function makePlaceholder() {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 4;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#F6F7FA";
  ctx.fillRect(0, 0, 4, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export type ScreenTextureApi = ReturnType<typeof createScreenTexture>;
