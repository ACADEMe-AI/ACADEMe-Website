import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CubePieceMesh } from "./CubePieceMesh";
import {
  ASSEMBLY_SCALE,
  LAYER_TWISTS,
  PIECES,
  PITCH,
  type TransformPiece,
  type Vec3,
} from "./pieceMap";
import {
  bezier3,
  clamp01,
  easeInOutCubic,
  lerp3,
  pieceEase,
} from "./easing";
import { TIMING, TOTAL_FRAMES } from "./timing";

type LivePose = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

export type AnimatedCubeProps = {
  reducedMotion?: boolean;
  freeze?: boolean;
  assetsReady?: boolean;
  onComplete?: () => void;
  onLogoReady?: () => void;
};

function axisVec(axis: "x" | "y" | "z") {
  return axis === "x"
    ? new THREE.Vector3(1, 0, 0)
    : axis === "y"
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(0, 0, 1);
}

function applyLayerTwists(
  piece: TransformPiece,
  frame: number,
): { position: Vec3; rotation: Vec3 } {
  let gx = piece.grid[0];
  let gy = piece.grid[1];
  let gz = piece.grid[2];
  const orient = new THREE.Quaternion();

  let active: (typeof LAYER_TWISTS)[number] | null = null;
  let activeT = 0;

  for (const twist of LAYER_TWISTS) {
    if (frame < twist.start) break;

    if (frame >= twist.end) {
      const onLayer =
        (twist.axis === "x" && gx === twist.layer) ||
        (twist.axis === "y" && gy === twist.layer) ||
        (twist.axis === "z" && gz === twist.layer);
      if (!onLayer) continue;

      const q = new THREE.Quaternion().setFromAxisAngle(axisVec(twist.axis), twist.angle);
      const v = new THREE.Vector3(gx, gy, gz).applyQuaternion(q);
      gx = Math.round(v.x);
      gy = Math.round(v.y);
      gz = Math.round(v.z);
      orient.premultiply(q);
    } else {
      active = twist;
      activeT = easeInOutCubic(
        clamp01((frame - twist.start) / Math.max(0.001, twist.end - twist.start)),
      );
      break;
    }
  }

  const pos = new THREE.Vector3(gx * PITCH, gy * PITCH, gz * PITCH);
  const finalOrient = orient.clone();

  if (active) {
    const onLayer =
      (active.axis === "x" && gx === active.layer) ||
      (active.axis === "y" && gy === active.layer) ||
      (active.axis === "z" && gz === active.layer);
    if (onLayer) {
      const q = new THREE.Quaternion().setFromAxisAngle(
        axisVec(active.axis),
        active.angle * activeT,
      );
      pos.applyQuaternion(q);
      finalOrient.premultiply(q);
    }
  }

  const e = new THREE.Euler().setFromQuaternion(finalOrient);
  return { position: [pos.x, pos.y, pos.z], rotation: [e.x, e.y, e.z] };
}

function poseAtFrame(piece: TransformPiece, frame: number): LivePose {
  if (frame <= TIMING.cubeEnd) {
    const twisted = applyLayerTwists(piece, frame);
    const blendStart = TIMING.cubeEnd - 6;
    if (frame >= blendStart) {
      const u = easeInOutCubic(clamp01((frame - blendStart) / 6));
      return {
        position: lerp3(twisted.position, piece.start.position, u),
        rotation: lerp3(twisted.rotation, [0, 0, 0], u),
        scale: [1, 1, 1],
      };
    }
    return {
      position: twisted.position,
      rotation: twisted.rotation,
      scale: [1, 1, 1],
    };
  }

  if (frame <= TIMING.transformStart) {
    return {
      position: piece.start.position,
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
  }

  const from = piece.start.position;
  const to = piece.target.position;
  const localStart = TIMING.transformStart + piece.delay;
  const localEnd = localStart + piece.duration;

  if (frame < localStart) {
    return {
      position: from,
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
  }

  if (frame >= TIMING.transformEnd) {
    return {
      position: piece.target.position,
      rotation: piece.target.rotation,
      scale: piece.target.scale,
    };
  }

  const t = pieceEase(
    clamp01((frame - localStart) / Math.max(0.001, localEnd - localStart)),
  );
  const mid: Vec3 = [
    (from[0] + to[0]) / 2 + piece.midLift[0],
    (from[1] + to[1]) / 2 + piece.midLift[1],
    (from[2] + to[2]) / 2 + piece.midLift[2],
  ];
  const position = bezier3(from, mid, to, t);
  const rotation = lerp3([0, 0, 0], piece.target.rotation, t);
  const spin = (1 - t) * t * 0.12;
  rotation[1] += spin * (piece.grid[0] || 1);
  const scale = lerp3([1, 1, 1], piece.target.scale, t);
  return { position, rotation, scale };
}

const ORTHO_SIZE = 1.9;

export function AnimatedCube({
  reducedMotion,
  freeze,
  assetsReady = true,
  onComplete,
  onLogoReady,
}: AnimatedCubeProps) {
  const group = useRef<THREE.Group>(null);
  const frameRef = useRef(0);
  const done = useRef(false);
  const logoReady = useRef(false);
  const freezeRef = useRef(!!freeze);
  const assetsReadyRef = useRef(!!assetsReady);
    const releasedRef = useRef(!!assetsReady);
  const { camera, size } = useThree();
  const pieces = useMemo(() => PIECES, []);
  const poses = useRef<LivePose[]>(
    pieces.map((p) => ({
      position: [...p.start.position] as Vec3,
      rotation: [...p.start.rotation] as Vec3,
      scale: [...p.start.scale] as Vec3,
    })),
  );
  const [, setTick] = useState(0);

  useEffect(() => {
    assetsReadyRef.current = !!assetsReady;
    if (assetsReady) releasedRef.current = true;
  }, [assetsReady]);

  useEffect(() => {
    freezeRef.current = !!freeze;
    if (freeze) {
      const f = TIMING.settleEnd;
      frameRef.current = f;
      for (let i = 0; i < pieces.length; i++) {
        poses.current[i] = poseAtFrame(pieces[i], f);
      }
      setTick((n) => n + 1);
    }
  }, [freeze, pieces]);

  useEffect(() => {
    if (!reducedMotion) return;
    poses.current = pieces.map((p) => ({
      position: [...p.target.position] as Vec3,
      rotation: [...p.target.rotation] as Vec3,
      scale: [...p.target.scale] as Vec3,
    }));
    setTick((n) => n + 1);
    onLogoReady?.();
    const t = window.setTimeout(() => onComplete?.(), 400);
    return () => window.clearTimeout(t);
  }, [reducedMotion, pieces, onComplete, onLogoReady]);

  useFrame((_, dt) => {
    if (reducedMotion) return;

    if (freezeRef.current || done.current) return;

    const step = Math.min(dt, 0.05) * 60;
    let f = frameRef.current + step;

    if (!releasedRef.current) {
      if (f >= TIMING.cubeEnd) {
        f = f % TIMING.cubeEnd; // seamless loop of cube motion
      }
      frameRef.current = f;
    } else if (frameRef.current < TIMING.cubeEnd && f >= TIMING.cubeEnd) {
      frameRef.current = Math.min(TOTAL_FRAMES + 0.5, f);
    } else {
      frameRef.current = Math.min(TOTAL_FRAMES + 0.5, f);
    }

    f = frameRef.current;

    for (let i = 0; i < pieces.length; i++) {
      poses.current[i] = poseAtFrame(pieces[i], f);
    }

    if (camera instanceof THREE.OrthographicCamera) {
      const aspect = size.width / Math.max(1, size.height);
      const h = ORTHO_SIZE;
      const w = h * aspect;
      camera.left = -w;
      camera.right = w;
      camera.top = h;
      camera.bottom = -h;
      camera.updateProjectionMatrix();
    }

    if (group.current) {
      group.current.scale.setScalar(ASSEMBLY_SCALE);
    }

    if (releasedRef.current && f >= TIMING.settleEnd && !logoReady.current) {
      logoReady.current = true;
      freezeRef.current = true;
      onLogoReady?.();
    }

    setTick((n) => n + 1);

    if (releasedRef.current && f >= TOTAL_FRAMES && !done.current) {
      done.current = true;
      onComplete?.();
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {pieces.map((piece, i) => {
        const pose = poses.current[i];
        if (pose.scale[0] < 0.02) return null;
        return (
          <CubePieceMesh
            key={piece.id}
            piece={piece}
            position={pose.position}
            rotation={pose.rotation}
            scale={pose.scale}
          />
        );
      })}
    </group>
  );
}

