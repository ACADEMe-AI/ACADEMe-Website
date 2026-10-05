import type { ScreenState, ChapterId } from "./scrollState";

export type Waypoint = {
  t: number;
  label: ChapterId;
  screen: ScreenState;
  phone: {
    x: number;
    y: number;
    z: number;
    rotX: number;
    rotY: number;
    rotZ: number;
    scale: number;
  };
  camera: {
    x: number;
    y: number;
    z: number;
    lookX: number;
    lookY: number;
    lookZ: number;
    fov: number;
  };
  docs: number;
  absorb: number;
  mee: number;
};

const PI = Math.PI;
const TAU = PI * 2;

function wp(
  t: number,
  label: ChapterId,
  screen: ScreenState,
  phone: Waypoint["phone"],
  camera: Partial<Waypoint["camera"]> & Pick<Waypoint["camera"], "z" | "fov">,
  extras: Partial<Pick<Waypoint, "docs" | "absorb" | "mee">> = {}
): Waypoint {
  return {
    t,
    label,
    screen,
    phone,
    camera: {
      x: camera.x ?? phone.x * 0.08,
      y: camera.y ?? phone.y * 0.12,
      z: camera.z,
      lookX: camera.lookX ?? phone.x * 0.52,
      lookY: camera.lookY ?? phone.y * 0.28,
      lookZ: camera.lookZ ?? phone.z * 0.12,
      fov: camera.fov,
    },
    docs: extras.docs ?? 0,
    absorb: extras.absorb ?? 0,
    mee: extras.mee ?? 0,
  };
}

export const DESKTOP_WAYPOINTS: Waypoint[] = [
  wp(
    0,
    "hero",
    "home",
    { x: 2.3, y: -0.62, z: -0.52, rotX: -0.3, rotY: -0.74, rotZ: -0.12, scale: 1.22 },
    { x: -0.28, y: 0.4, z: 7.2, lookX: 0.9, lookY: -0.24, lookZ: 0.02, fov: 27 }
  ),
  wp(
    0.1,
    "hero",
    "home",
    { x: 2.15, y: -0.5, z: -0.4, rotX: -0.22, rotY: -0.9, rotZ: -0.1, scale: 1.14 },
    { x: -0.22, y: 0.32, z: 6.9, lookX: 0.92, lookY: -0.18, lookZ: 0.02, fov: 27.5 },
    { docs: 0.22 }
  ),

  wp(
    0.16,
    "upload",
    "upload",
    { x: 1.15, y: -0.08, z: 0.2, rotX: 0.04, rotY: -0.55, rotZ: -0.06, scale: 1.05 },
    { x: 0.2, y: 0.0, z: 5.55, lookX: 0.88, lookY: -0.04, lookZ: 0.08, fov: 27.5 },
    { docs: 0.55, absorb: 0.02 }
  ),
  wp(
    0.28,
    "upload",
    "upload",
    { x: 1.1, y: -0.06, z: 0.22, rotX: 0.05, rotY: -0.48, rotZ: -0.05, scale: 1.06 },
    { x: 0.18, y: 0.0, z: 5.5, lookX: 0.85, lookY: -0.03, lookZ: 0.08, fov: 27.5 },
    { docs: 0.75, absorb: 0.08 }
  ),
  wp(
    0.36,
    "upload",
    "upload",
    { x: 1.05, y: -0.02, z: 0.24, rotX: 0.12, rotY: -PI + 0.48, rotZ: 0.14, scale: 1.06 },
    { x: 0.24, y: 0.02, z: 5.35, lookX: 0.85, lookY: 0, lookZ: 0.1, fov: 27.5 },
    { docs: 0.95, absorb: 0.2 }
  ),
  wp(
    0.42,
    "upload",
    "processing",
    { x: 0.95, y: 0.04, z: 0.18, rotX: 0.08, rotY: -PI - PI / 2 + 0.4, rotZ: 0.06, scale: 1.0 },
    { x: 0.22, y: 0.04, z: 5.4, lookX: 0.8, lookY: 0.02, lookZ: 0.08, fov: 28 },
    { docs: 0.35, absorb: 0.75 }
  ),
  wp(
    0.46,
    "upload",
    "processing",
    { x: 1.0, y: -0.02, z: 0.26, rotX: 0.05, rotY: -TAU - 0.38, rotZ: -0.08, scale: 0.98 },
    { x: 0.22, y: 0.0, z: 5.3, lookX: 0.78, lookY: -0.02, lookZ: 0.1, fov: 27.5 },
    { docs: 0.0, absorb: 1 }
  ),
  wp(
    0.5,
    "upload",
    "processing",
    { x: 0.15, y: -0.02, z: 0.18, rotX: 0.04, rotY: -TAU - 0.1, rotZ: 0, scale: 0.88 },
    { x: 0, y: 0, z: 5.45, lookX: 0.1, lookY: -0.02, lookZ: 0.08, fov: 27 },
    { absorb: 1 }
  ),

  wp(
    0.54,
    "chat",
    "chat",
    { x: -1.55, y: -0.02, z: 0.2, rotX: 0.04, rotY: -TAU + 0.4, rotZ: 0.06, scale: 0.9 },
    { x: -0.28, y: 0.0, z: 5.4, lookX: -1.1, lookY: -0.02, lookZ: 0.1, fov: 27 },
    { absorb: 1 }
  ),
  wp(
    0.6,
    "chat",
    "chat",
    { x: -1.48, y: -0.04, z: 0.22, rotX: 0.03, rotY: -TAU + 0.36, rotZ: 0.05, scale: 0.92 },
    { x: -0.26, y: -0.02, z: 5.3, lookX: -1.05, lookY: -0.04, lookZ: 0.1, fov: 26.5 },
    { absorb: 1 }
  ),

  wp(
    0.66,
    "practice",
    "cards",
    { x: 0.38, y: -0.06, z: 0.22, rotX: 0.04, rotY: -TAU - 0.16, rotZ: -0.04, scale: 0.96 },
    { x: 0.06, y: -0.02, z: 5.3, lookX: 0.28, lookY: -0.04, lookZ: 0.08, fov: 27 },
    { absorb: 1 }
  ),
  wp(
    0.71,
    "practice",
    "quiz",
    { x: 0.35, y: -0.08, z: 0.24, rotX: 0.03, rotY: -TAU - 0.12, rotZ: -0.03, scale: 0.98 },
    { x: 0.05, y: -0.03, z: 5.2, lookX: 0.26, lookY: -0.05, lookZ: 0.1, fov: 26.5 },
    { absorb: 1 }
  ),
  wp(
    0.75,
    "practice",
    "quiz",
    { x: 0.05, y: -0.04, z: 0.18, rotX: 0.03, rotY: -TAU - 0.05, rotZ: 0, scale: 0.9 },
    { x: 0, y: -0.02, z: 5.35, lookX: 0.05, lookY: -0.03, lookZ: 0.08, fov: 27 },
    { absorb: 1 }
  ),

  wp(
    0.79,
    "adaptive",
    "practice",
    { x: -0.72, y: -0.02, z: 0.28, rotX: 0.02, rotY: -TAU * 2 + 0.22, rotZ: 0.03, scale: 0.94 },
    { x: -0.08, y: 0.0, z: 5.25, lookX: -0.48, lookY: -0.02, lookZ: 0.1, fov: 26.5 },
    { absorb: 1 }
  ),
  wp(
    0.84,
    "adaptive",
    "practice",
    { x: -0.68, y: -0.04, z: 0.3, rotX: 0.02, rotY: -TAU * 2 + 0.18, rotZ: 0.02, scale: 0.96 },
    { x: -0.06, y: -0.02, z: 5.15, lookX: -0.44, lookY: -0.03, lookZ: 0.1, fov: 26.2 },
    { absorb: 1 }
  ),

  wp(
    0.9,
    "mastery",
    "mastery",
    { x: 0.78, y: -0.1, z: 0.26, rotX: 0.04, rotY: -TAU * 2 - 0.22, rotZ: -0.06, scale: 0.96 },
    { x: 0.14, y: -0.02, z: 5.5, lookX: 0.52, lookY: -0.05, lookZ: 0.08, fov: 26.8 },
    { absorb: 1 }
  ),
  wp(
    0.93,
    "mastery",
    "mastery",
    {
      x: 0.28,
      y: 0.0,
      z: 0.4,
      rotX: -0.2,
      rotY: -12.62,
      rotZ: 0.85,
      scale: 0.92,
    },
    { x: 0.06, y: 0.0, z: 5.6, lookX: 0.14, lookY: -0.02, lookZ: 0.05, fov: 26.9 },
    { absorb: 1 }
  ),

  wp(
    0.96,
    "cta",
    "waitlist",
    {
      x: 0,
      y: 0.08,
      z: 0.42,
      rotX: -0.38,
      rotY: -12.62,
      rotZ: 1.57,
      scale: 0.82,
    },
    { x: 0, y: 0.02, z: 5.75, lookX: 0, lookY: -0.02, lookZ: 0.05, fov: 26.5 },
    { absorb: 1 }
  ),
  wp(
    1,
    "cta",
    "waitlist",
    {
      x: 0,
      y: 0.08,
      z: 0.42,
      rotX: -0.38,
      rotY: -12.62,
      rotZ: 1.57,
      scale: 0.82,
    },
    { x: 0, y: 0.02, z: 5.75, lookX: 0, lookY: -0.02, lookZ: 0.05, fov: 26.5 },
    { absorb: 1 }
  ),
];

export const MOBILE_WAYPOINTS: Waypoint[] = [
  wp(
    0,
    "hero",
    "home",
    { x: 0.02, y: 0.38, z: 0.1, rotX: -0.1, rotY: -0.42, rotZ: 0.06, scale: 0.62 },
    { x: 0, y: 0.2, z: 6.55, lookX: 0.01, lookY: 0.16, lookZ: 0.05, fov: 30 }
  ),
  wp(
    0.1,
    "hero",
    "home",
    { x: 0.02, y: 0.36, z: 0.1, rotX: -0.08, rotY: -0.48, rotZ: 0.05, scale: 0.6 },
    { x: 0, y: 0.2, z: 6.55, lookX: 0.01, lookY: 0.16, lookZ: 0.05, fov: 30 },
    { docs: 0.15 }
  ),
  wp(
    0.16,
    "upload",
    "upload",
    { x: 0.02, y: 0.34, z: 0.12, rotX: 0.02, rotY: -0.32, rotZ: 0.02, scale: 0.64 },
    { x: 0, y: 0.18, z: 6.5, lookX: 0.01, lookY: 0.14, lookZ: 0.05, fov: 30 },
    { docs: 0.4, absorb: 0.05 }
  ),
  wp(
    0.28,
    "upload",
    "upload",
    { x: 0.02, y: 0.34, z: 0.12, rotX: 0.02, rotY: -0.28, rotZ: 0.02, scale: 0.66 },
    { x: 0, y: 0.18, z: 6.45, lookX: 0.01, lookY: 0.14, lookZ: 0.05, fov: 30 },
    { docs: 0.7, absorb: 0.1 }
  ),
  wp(
    0.36,
    "upload",
    "upload",
    { x: 0.02, y: 0.36, z: 0.1, rotX: 0.04, rotY: -PI + 0.28, rotZ: 0.04, scale: 0.6 },
    { x: 0, y: 0.2, z: 6.55, lookX: 0.01, lookY: 0.16, lookZ: 0.05, fov: 30.5 },
    { docs: 0.9, absorb: 0.2 }
  ),
  wp(
    0.42,
    "upload",
    "processing",
    { x: 0.02, y: 0.36, z: 0.1, rotX: 0.03, rotY: -PI - PI / 2 + 0.2, rotZ: 0.02, scale: 0.58 },
    { x: 0, y: 0.2, z: 6.55, lookX: 0.01, lookY: 0.16, lookZ: 0.05, fov: 30.5 },
    { docs: 0.35, absorb: 0.65 }
  ),
  wp(
    0.48,
    "upload",
    "processing",
    { x: 0.02, y: 0.34, z: 0.12, rotX: 0.02, rotY: -TAU - 0.28, rotZ: -0.02, scale: 0.6 },
    { x: 0, y: 0.18, z: 6.5, lookX: 0.01, lookY: 0.14, lookZ: 0.05, fov: 30 },
    { docs: 0, absorb: 1 }
  ),
  wp(
    0.54,
    "chat",
    "chat",
    { x: 0, y: 0.32, z: 0.14, rotX: 0.02, rotY: -TAU + 0.28, rotZ: 0.03, scale: 0.62 },
    { x: 0, y: 0.16, z: 6.45, lookX: 0, lookY: 0.12, lookZ: 0.06, fov: 29.5 },
    { absorb: 1 }
  ),
  wp(
    0.6,
    "chat",
    "chat",
    { x: 0, y: 0.32, z: 0.14, rotX: 0.02, rotY: -TAU + 0.24, rotZ: 0.02, scale: 0.64 },
    { x: 0, y: 0.16, z: 6.4, lookX: 0, lookY: 0.12, lookZ: 0.06, fov: 29.5 },
    { absorb: 1 }
  ),
  wp(
    0.66,
    "practice",
    "cards",
    { x: 0, y: 0.3, z: 0.16, rotX: 0.02, rotY: -TAU - 0.06, rotZ: 0, scale: 0.66 },
    { x: 0, y: 0.14, z: 6.25, lookX: 0, lookY: 0.11, lookZ: 0.07, fov: 29 },
    { absorb: 1 }
  ),
  wp(
    0.72,
    "practice",
    "quiz",
    { x: 0, y: 0.28, z: 0.18, rotX: 0.02, rotY: -TAU - 0.04, rotZ: 0, scale: 0.68 },
    { x: 0, y: 0.12, z: 6.1, lookX: 0, lookY: 0.1, lookZ: 0.08, fov: 28.5 },
    { absorb: 1 }
  ),
  wp(
    0.78,
    "adaptive",
    "practice",
    { x: 0, y: 0.32, z: 0.14, rotX: 0.02, rotY: -TAU * 2 + 0.28, rotZ: 0.03, scale: 0.62 },
    { x: 0, y: 0.16, z: 6.45, lookX: 0, lookY: 0.12, lookZ: 0.06, fov: 29.5 },
    { absorb: 1 }
  ),
  wp(
    0.84,
    "adaptive",
    "practice",
    { x: 0, y: 0.32, z: 0.14, rotX: 0.02, rotY: -TAU * 2 + 0.24, rotZ: 0.02, scale: 0.64 },
    { x: 0, y: 0.16, z: 6.4, lookX: 0, lookY: 0.12, lookZ: 0.06, fov: 29.5 },
    { absorb: 1 }
  ),
  wp(
    0.9,
    "mastery",
    "mastery",
    { x: 0, y: 0.3, z: 0.12, rotX: 0.04, rotY: -TAU * 2 - 0.22, rotZ: -0.02, scale: 0.66 },
    { x: 0, y: 0.14, z: 6.35, lookX: 0, lookY: 0.12, lookZ: 0.06, fov: 29.5 },
    { absorb: 1 }
  ),
  wp(
    0.96,
    "cta",
    "waitlist",
    {
      x: 0,
      y: 0.28,
      z: 0.18,
      rotX: -0.12,
      rotY: -12.62,
      rotZ: 1.57,
      scale: 0.72,
    },
    { x: 0, y: 0.1, z: 6.5, lookX: 0, lookY: 0.08, lookZ: 0.05, fov: 29.5 },
    { absorb: 1 }
  ),
  wp(
    1,
    "cta",
    "waitlist",
    {
      x: 0,
      y: 0.28,
      z: 0.18,
      rotX: -0.12,
      rotY: -12.62,
      rotZ: 1.57,
      scale: 0.72,
    },
    { x: 0, y: 0.1, z: 6.5, lookX: 0, lookY: 0.08, lookZ: 0.05, fov: 29.5 },
    { absorb: 1 }
  ),
];
