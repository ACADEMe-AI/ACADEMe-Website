import * as THREE from "three";

/** Rounded-rect plane geometry that matches a modern phone display corner radius. */
export function createRoundedPlaneGeometry(
  width: number,
  height: number,
  radius: number,
  curveSegments = 12
): THREE.ShapeGeometry {
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2, h / 2);
  const x = -w / 2;
  const y = -h / 2;

  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geo = new THREE.ShapeGeometry(shape, curveSegments);
  // UVs: map shape bounds 0–1 so full texture covers the display
  const pos = geo.attributes.position;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    uvs[i * 2] = (px - x) / w;
    uvs[i * 2 + 1] = (py - y) / h;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geo.computeVertexNormals();
  return geo;
}
