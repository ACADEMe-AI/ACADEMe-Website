import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../../lib/scrollState";
import { createScreenTexture } from "../../lib/screenTexture";
import { createRoundedPlaneGeometry } from "../../lib/roundedPlane";

/**
 * Sketchfab phone (ｍｆｋ)
 * https://sketchfab.com/3d-models/phone-ca572a15f7074ea3890772139769f2b2
 */
const MODEL_URL = "/models/Iphone.glb";
const TARGET_HEIGHT = 2.28;
/** Match iPhone-class continuous corner radius on the display */
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
        // Aluminum-class case — back views must read metal, not black void
        if (sm.name === "PhoneCase_Mat") {
          sm.color.set("#2c3140");
          sm.metalness = 0.94;
          sm.roughness = 0.22;
          sm.envMapIntensity = 2.1;
        } else if (sm.name === "PhoneButton_Mat") {
          sm.color.set("#3a4050");
          sm.metalness = 0.95;
          sm.roughness = 0.18;
          sm.envMapIntensity = 1.8;
        } else if (sm.name === "Material.001") {
          sm.color.set("#222836");
          sm.metalness = 0.97;
          sm.roughness = 0.14;
          sm.envMapIntensity = 1.9;
        } else if (sm.name?.startsWith("Camera_Light")) {
          sm.color.set("#d8dce6");
          sm.metalness = 0.5;
          sm.roughness = 0.28;
          sm.emissive = new THREE.Color("#a8b0c8");
          sm.emissiveIntensity = 0.2;
        } else if (sm.metalness !== undefined) {
          sm.metalness = Math.max(sm.metalness, 0.55);
          sm.roughness = Math.min(sm.roughness, 0.38);
          sm.envMapIntensity = Math.max(sm.envMapIntensity ?? 1, 1.5);
        }
        sm.needsUpdate = true;
      }
    });

    const isFace =
      names.includes("PhoneFace_Mat") ||
      mesh.name === "Object_32" ||
      (mesh.parent?.name?.includes("PhoneFace") ?? false);

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
    // Nearly full display — equal inset all sides so UI almost touches corners
    const inset = 0.975;
    screenW = ms.x * inset;
    screenH = ms.y * inset;
    screenLocal.z += Math.max(ms.z * 0.45, 0.008);
    // Match continuous glass corner of the Sketchfab chassis
    screenRadius = Math.min(screenW, screenH) * 0.12;
  }

  return { root, screenLocal, screenW, screenH, screenRadius };
}

/**
 * Sketchfab chassis + rounded live UI plane.
 * Scroll drives continuous 360° Y rotation via scrollState.phone.rotY.
 */
export function PhoneMesh() {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const caseMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const { scene } = useGLTF(MODEL_URL);
  const screenApi = useMemo(() => createScreenTexture(), []);

  const fit = useMemo(() => preparePhone(scene), [scene]);

  // Collect chassis materials for dynamic rim when screen faces away
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

    // YXZ = yaw (3/4) → pitch (recline) → roll (top tips right) — matches product framing
    if (g.rotation.order !== "YXZ") g.rotation.order = "YXZ";

    // Gentle vertical bob — hero only (other chapters stay locked to path)
    const t = state.clock.elapsedTime;
    const onHero =
      scrollState.overlays.hero > 0.55 &&
      !scrollState.poseLock &&
      !scrollState.reducedMotion;
    const bobY = onHero ? Math.sin(t * 1.05) * 0.032 : 0;
    const bobTilt = onHero ? Math.sin(t * 0.85) * 0.004 : 0;

    // Snap hard to targets (direction must match frames, not lag)
    // poseLock = slider debug — instant response
    const kDir =
      scrollState.poseLock || scrollState.reducedMotion ? 1 : 1 - Math.pow(0.00005, dt);

    g.position.x = THREE.MathUtils.lerp(g.position.x, p.x, kDir);
    g.position.y = THREE.MathUtils.lerp(g.position.y, p.y + bobY, kDir);
    g.position.z = THREE.MathUtils.lerp(g.position.z, p.z, kDir);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, p.rotX + bobTilt, kDir);
    // rotY monotonic for continuous spin — never wrap
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

    // Show UI when display faces camera (multi-turn rotY via cos)
    // Soften threshold so near-face poses always read as product, not black glass
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

    // Chassis rim when face is away — cool aluminum, not purple plastic
    const backBoost = THREE.MathUtils.smoothstep(-face, 0.0, 0.7);
    for (const sm of caseMats.current) {
      if (!sm.emissive) sm.emissive = new THREE.Color("#000000");
      sm.emissive.setRGB(
        0.05 * backBoost + 0.012,
        0.055 * backBoost + 0.014,
        0.08 * backBoost + 0.02
      );
      sm.emissiveIntensity = 0.1 + backBoost * 0.35;
      sm.envMapIntensity = 1.7 + backBoost * 0.7;
    }
  });

  const { root, screenLocal } = fit;

  return (
    <group ref={group} position={[1.08, -0.45, 0.12]} rotation={[-0.18, -0.48, -0.18]}>
      <primitive object={root} />

      {/* Rounded live UI — matches phone glass corners */}
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
      {/* No ground blob — Flowty stage has no dark disc under phone */}
    </group>
  );
}
