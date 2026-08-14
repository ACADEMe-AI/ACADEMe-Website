/**
 * Build a premium smartphone GLB (ACADEMe-owned asset).
 * Real mesh + PBR materials, exported for useGLTF at runtime.
 *
 * Usage: node scripts/build-phone-glb.mjs
 */
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Blob as NodeBlob } from "node:buffer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/models/phone.glb");

// Browser APIs needed by GLTFExporter in Node
if (!globalThis.Blob) globalThis.Blob = NodeBlob;
if (!globalThis.FileReader) {
  globalThis.FileReader = class FileReader {
    constructor() {
      this.result = null;
      this.onload = null;
      this.onerror = null;
      this.onloadend = null;
    }
    readAsArrayBuffer(blob) {
      Promise.resolve()
        .then(async () => {
          if (blob.arrayBuffer) this.result = await blob.arrayBuffer();
          else throw new Error("Unsupported blob");
          this.onload?.({ target: this });
          this.onloadend?.({ target: this });
        })
        .catch((e) => {
          this.onerror?.(e);
          this.onloadend?.({ target: this });
        });
    }
  };
}

function roundedBox(w, h, d, r, seg = 6) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  const rr = Math.min(r, w / 2, h / 2);
  shape.moveTo(x + rr, y);
  shape.lineTo(x + w - rr, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + rr);
  shape.lineTo(x + w, y + h - rr);
  shape.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  shape.lineTo(x + rr, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - rr);
  shape.lineTo(x, y + rr);
  shape.quadraticCurveTo(x, y, x + rr, y);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: d,
    bevelEnabled: true,
    bevelThickness: r * 0.35,
    bevelSize: r * 0.28,
    bevelSegments: seg,
    curveSegments: 12,
  });
  geo.center();
  return geo;
}

function buildPhone() {
  const root = new THREE.Group();
  root.name = "ACADEMePhone";

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#1a1c22"),
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.8,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.4,
    name: "Chassis",
  });
  const metalMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#a0a6b4"),
    metalness: 1,
    roughness: 0.16,
    envMapIntensity: 1.7,
    name: "Metal",
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#050507"),
    roughness: 0.5,
    metalness: 0.45,
    name: "Bezel",
  });
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0a0c18"),
    metalness: 0.98,
    roughness: 0.1,
    name: "Lens",
  });
  const screenMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#f6f7fa"),
    roughness: 0.12,
    metalness: 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    emissive: new THREE.Color("#ffffff"),
    emissiveIntensity: 0.15,
    name: "Screen",
    toneMapped: false,
  });

  // Thin body so live screen plane at z≈0.10 sits cleanly in front
  const body = new THREE.Mesh(roundedBox(1.12, 2.28, 0.08, 0.1, 6), bodyMat);
  body.name = "Chassis";
  body.castShadow = true;
  body.receiveShadow = true;
  root.add(body);

  const rim = new THREE.Mesh(roundedBox(1.125, 2.285, 0.03, 0.1, 5), metalMat);
  rim.name = "Rim";
  rim.position.z = 0.01;
  root.add(rim);

  const bezel = new THREE.Mesh(roundedBox(1.02, 2.14, 0.012, 0.075, 4), blackMat);
  bezel.name = "Bezel";
  bezel.position.set(0, 0.01, 0.04);
  root.add(bezel);

  // Placeholder screen (runtime hides and replaces with live UI plane)
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 2.02), screenMat);
  screen.name = "Screen";
  screen.position.set(0, 0.02, 0.1);
  root.add(screen);

  const glassMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.04,
    name: "Glass",
  });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 2.02), glassMat);
  glass.name = "Glass";
  glass.position.set(0, 0.02, 0.103);
  root.add(glass);

  const island = new THREE.Mesh(new THREE.CapsuleGeometry(0.032, 0.14, 6, 16), blackMat);
  island.name = "Island";
  island.rotation.z = Math.PI / 2;
  island.position.set(0, 0.9, 0.106);
  root.add(island);

  const bump = new THREE.Group();
  bump.name = "CameraBump";
  bump.position.set(-0.3, 0.82, -0.072);
  bump.add(new THREE.Mesh(roundedBox(0.4, 0.4, 0.05, 0.07, 4), bodyMat));
  [
    [0.09, 0.09],
    [-0.09, 0.09],
    [0.09, -0.09],
  ].forEach(([x, y], i) => {
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.058, 32), lensMat);
    lens.position.set(x, y, 0.032);
    lens.name = `Lens${i}`;
    bump.add(lens);
  });
  root.add(bump);

  for (const [px, py, sy] of [
    [0.575, 0.32, 0.24],
    [-0.575, 0.48, 0.12],
    [-0.575, 0.28, 0.16],
    [-0.575, 0.08, 0.1],
  ]) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.018, sy, 0.055), metalMat);
    b.position.set(px, py, 0);
    root.add(b);
  }

  return root;
}

async function main() {
  mkdirSync(path.dirname(OUT), { recursive: true });
  const phone = buildPhone();
  const exporter = new GLTFExporter();
  const result = await new Promise((resolve, reject) => {
    exporter.parse(phone, resolve, reject, { binary: true });
  });
  const buf = Buffer.from(result);
  writeFileSync(OUT, buf);
  console.log("Wrote", OUT, `(${(buf.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
