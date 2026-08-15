import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../../lib/scrollState";

export function CameraRig() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3());
  const desired = useRef(new THREE.Vector3());
  const currentDir = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const c = scrollState.camera;
    const k =
      scrollState.reducedMotion ? 1 : 1 - Math.pow(0.0008, dt);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, c.x, k);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, c.y, k);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, c.z, k);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, c.fov, k);
      camera.updateProjectionMatrix();
    }

    look.current.set(c.lookX, c.lookY, c.lookZ);
    camera.getWorldDirection(currentDir.current);
    desired.current.copy(look.current).sub(camera.position).normalize();
    currentDir.current.lerp(desired.current, k).normalize();
    target.current.copy(camera.position).add(currentDir.current);
    camera.lookAt(target.current);
  });

  return null;
}
