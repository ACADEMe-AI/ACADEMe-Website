export type ScreenState =
  | "home"
  | "lesson"
  | "courses"
  | "askme"
  | "scan"
  | "check"
  | "revision"
  | "folder"
  | "landscape";

export type ChapterId =
  | "hero"
  | "lessons"
  | "pebby"
  | "scan"
  | "revision"
  | "plan"
  | "cta";

export const scrollState = {
  progress: 0,
  chapter: "hero" as ChapterId,
  screen: "home" as ScreenState,
  reducedMotion: false,
  isMobile: false,

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


  overlays: {
    hero: 1,
    lessons: 0,
    pebby: 0,
    scan: 0,
    revision: 0,
    plan: 0,
    cta: 0,
  },
};

export type ScrollState = typeof scrollState;
