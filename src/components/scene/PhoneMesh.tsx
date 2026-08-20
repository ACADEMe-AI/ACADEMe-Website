import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../../lib/scrollState";
import { createScreenTexture } from "../../lib/screenTexture";
import { createRoundedPlaneGeometry } from "../../lib/roundedPlane";

const MODEL_URL = "/models/Iphone.glb";
const TARGET_HEIGHT = 2.28;
const SCREEN_CORNER = 0.11;

useGLTF.preload(MODEL_URL);

type Fit = {
  root: THREE.Group;
  screenLocal: THREE.Vector3;
  screenW: number;
  screenH: number;
  screenRadius: number;
};

function preparePhone(source: THREE.Object3D): Fit {
  const root = new THREE.Group();
  root.name = "SketchfabPhoneRoot";

  const model = source.clone(true);
  model.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const scale = TARGET_HEIGHT / Math.max(size.y, 0.001);

  const pivot = new THREE.Group();
  pivot.name = "PhonePivot";
  model.position.sub(center);
  pivot.scale.setScalar(scale);
  pivot.add(model);
  pivot.updateMatrixWorld(true);

  let faceMesh: THREE.Mesh | undefined;
  let faceArea = 0;

  pivot.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return;
    const mesh = obj as THREE.Mesh;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const names = mats.map((m) => (m ? m.name : "") || "");

    mats.forEach((m) => {
      if (!m) return;
      if ((m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
        const sm = m as THREE.MeshStandardMaterial;
        if (sm.name === "PhoneCase_Mat") {
          sm.color.set("#0a0a0c");
          sm.metalness = 0.65;
          sm.roughness = 0.38;
          sm.envMapIntensity = 0.85;
        } else if (sm.name === "PhoneButton_Mat") {
          sm.color.set("#121216");
          sm.metalness = 0.7;
          sm.roughness = 0.35;
          sm.envMapIntensity = 0.8;
        } else if (sm.name === "Material.001") {
          sm.color.set("#050506");
          sm.metalness = 0.78;
          sm.roughness = 0.3;
          sm.envMapIntensity = 0.9;
        } else if (sm.name?.startsWith("Camera_Light")) {
          sm.color.set("#cfd3dd");
          sm.metalness = 0.45;
          sm.roughness = 0.35;
          sm.emissive = new THREE.Color("#8a90a8");
          sm.emissiveIntensity = 0.12;
        } else if (sm.metalness !== undefined) {
          sm.metalness = Math.max(sm.metalness, 0.4);
          sm.roughness = Math.max(sm.roughness, 0.35);
          sm.envMapIntensity = Math.min(sm.envMapIntensity ?? 1, 1.0);
        }
        sm.needsUpdate = true;
      }
    });

    const isFace =
      names.includes("PhoneFace_Mat") ||
      mesh.name === "Object_32" ||
      (mesh.name || "").toLowerCase().includes("screen") ||
      (mesh.parent?.name?.toLowerCase().includes("screen") ?? false);

    if (isFace) {
      const mb = new THREE.Box3().setFromObject(mesh);
      const ms = new THREE.Vector3();
      mb.getSize(ms);
      const area = ms.x * ms.y;
      if (area > faceArea && ms.x > 0.5) {
        faceArea = area;
        faceMesh = mesh;
      }
    }
  });

  if (faceMesh) faceMesh.visible = false;

  root.add(pivot);
  root.updateMatrixWorld(true);

  let screenLocal = new THREE.Vector3(0, 0, 0.1);
  let screenW = 1.0;
  let screenH = 2.08;
  let screenRadius = SCREEN_CORNER;

  if (faceMesh) {
    const mb = new THREE.Box3().setFromObject(faceMesh);
    const ms = new THREE.Vector3();
    const mc = new THREE.Vector3();
    mb.getSize(ms);
    mb.getCenter(mc);
    screenLocal = new THREE.Vector3(mc.x, mc.y, mc.z);
    const inset = 0.975;
    screenW = ms.x * inset;
    screenH = ms.y * inset;
    screenLocal.z += Math.max(ms.z * 0.45, 0.008);
    screenRadius = Math.min(screenW, screenH) * 0.12;
  }

  return { root, screenLocal, screenW, screenH, screenRadius };
}

export function PhoneMesh() {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const caseMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const { scene } = useGLTF(MODEL_URL);
  const screenApi = useMemo(() => createScreenTexture(), []);

  const fit = useMemo(() => preparePhone(scene), [scene]);

  useEffect(() => {
    const mats: THREE.MeshStandardMaterial[] = [];
    fit.root.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of list) {
        if (m && (m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const sm = m as THREE.MeshStandardMaterial;
          if (sm.name === "ScreenLive") continue;
          mats.push(sm);
        }
      }
    });
    caseMats.current = mats;
  }, [fit]);

  const screenGeo = useMemo(
    () => createRoundedPlaneGeometry(fit.screenW, fit.screenH, fit.screenRadius, 14),
    [fit.screenW, fit.screenH, fit.screenRadius]
  );

  const screenMat = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      map: screenApi.texture,
      roughness: 0.14,
      metalness: 0.0,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      emissive: new THREE.Color("#ffffff"),
      emissiveMap: screenApi.texture,
      emissiveIntensity: 0.55,
      toneMapped: false,
      side: THREE.FrontSide,
      transparent: true,
      opacity: 1,
      name: "ScreenLive",
    });
    matRef.current = mat;
    return mat;
  }, [screenApi]);

  useEffect(() => {
    screenApi.setOnSwap((tex) => {
      const mat = matRef.current;
      if (!mat) return;
      mat.map = tex;
      mat.emissiveMap = tex;
      mat.needsUpdate = true;
    });
    return () => {
      screenApi.dispose();
      screenMat.dispose();
      screenGeo.dispose();
    };
  }, [screenApi, screenMat, screenGeo]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = scrollState.phone;

    if (g.rotation.order !== "YXZ") g.rotation.order = "YXZ";

    const t = state.clock.elapsedTime;
    const onHero =
      scrollState.overlays.hero > 0.55 &&
      !scrollState.reducedMotion &&
      !scrollState.isMobile;
    const bobY = onHero ? Math.sin(t * 1.05) * 0.032 : 0;
    const bobTilt = onHero ? Math.sin(t * 0.85) * 0.004 : 0;

    const kDir =
      scrollState.reducedMotion ? 1 : 1 - Math.pow(0.00005, dt);

    g.position.x = THREE.MathUtils.lerp(g.position.x, p.x, kDir);
    g.position.y = THREE.MathUtils.lerp(g.position.y, p.y + bobY, kDir);
    g.position.z = THREE.MathUtils.lerp(g.position.z, p.z, kDir);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, p.rotX + bobTilt, kDir);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, p.rotY, kDir);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, p.rotZ + bobTilt * 0.5, kDir);
    const s = THREE.MathUtils.lerp(g.scale.x, p.scale, kDir);
    g.scale.setScalar(s);

    const tex = screenApi.paint(scrollState.screen);
    const mat = matRef.current;
    if (mat && mat.map !== tex) {
      mat.map = tex;
      mat.emissiveMap = tex;
      mat.needsUpdate = true;
    }

    const face = Math.cos(g.rotation.y);
    const show = THREE.MathUtils.smoothstep(face, 0.05, 0.42);
    if (mat) {
      mat.opacity = show;
      mat.emissiveIntensity = 0.55 * show;
      mat.transparent = true;
      mat.depthWrite = show > 0.45;
    }
    if (screenRef.current) screenRef.current.visible = show > 0.02;
    if (glassRef.current) {
      glassRef.current.visible = show > 0.02;
      const gm = glassRef.current.material as THREE.MeshBasicMaterial;
      gm.opacity = 0.055 * show;
    }

    const backBoost = THREE.MathUtils.smoothstep(-face, 0.0, 0.7);
    for (const sm of caseMats.current) {
      if (!sm.emissive) sm.emissive = new THREE.Color("#000000");
      sm.emissive.setRGB(
        0.02 * backBoost + 0.006,
        0.022 * backBoost + 0.007,
        0.03 * backBoost + 0.01
      );
      sm.emissiveIntensity = 0.05 + backBoost * 0.15;
      sm.envMapIntensity = 0.8 + backBoost * 0.25;
    }
  });

  const { root, screenLocal } = fit;

  return (
    <group ref={group} position={[1.08, -0.45, 0.12]} rotation={[-0.18, -0.48, -0.18]}>
      <primitive object={root} />

      {}
      <mesh
        ref={screenRef}
        position={[screenLocal.x, screenLocal.y, screenLocal.z]}
        geometry={screenGeo}
        material={screenMat}
        renderOrder={1}
      />
      <mesh
        ref={glassRef}
        position={[screenLocal.x, screenLocal.y, screenLocal.z + 0.0025]}
        geometry={screenGeo}
        renderOrder={2}
      >
        <meshBasicMaterial color="#ffffff" transparent opacity={0.045} depthWrite={false} />
      </mesh>
      {}
    </group>
  );
}
