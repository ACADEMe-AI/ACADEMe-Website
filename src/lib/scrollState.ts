/**
 * Shared mutable state: GSAP writes, R3F useFrame reads.
 * Avoids React re-renders every scroll frame.
 */

export type ScreenState =
  | "home"
  | "upload"
  | "processing"
  | "chat"
  | "cards"
  | "quiz"
  | "practice"
  | "mastery"
  | "waitlist";

export type ChapterId =
  | "hero"
  | "upload"
  | "chat"
  | "practice"
  | "adaptive"
  | "mastery"
  | "cta";

export const scrollState = {
  progress: 0,
  chapter: "hero" as ChapterId,
  screen: "home" as ScreenState,
  reducedMotion: false,
  isMobile: false,

  /**
   * When true, GSAP scroll stops overwriting phone/camera.
   * Used by the PoseDebug panel so you can dial exact numbers live.
   */
  poseLock: false,

  phone: {
    x: 2.3,
    y: -0.62,
    z: -0.52,
    rotX: -0.3,
    rotY: -0.74,
    rotZ: -0.12,
    scale: 1.22,
  },

  camera: {
    x: -0.28,
    y: 0.4,
    z: 7.2,
    lookX: 0.9,
    lookY: -0.24,
    lookZ: 0.02,
    fov: 27,
  },

  docs: {
    visible: 0,
    absorb: 0,
  },

  mee: {
    visible: 0,
    x: -1.6,
    y: 0.4,
    z: 0.2,
  },

  /** HTML overlay opacities driven by timeline */
  overlays: {
    hero: 1,
    upload: 0,
    chat: 0,
    practice: 0,
    adaptive: 0,
    mastery: 0,
    cta: 0,
  },
};

export type ScrollState = typeof scrollState;
