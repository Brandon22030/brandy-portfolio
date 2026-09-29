import * as THREE from "three";

type Radii = { tl: number; tr: number; br: number; bl: number };

/** Rounded rectangle centred on the origin, with an independent radius per corner. */
export function roundedRect(width: number, height: number, radius: number | Radii) {
  const r = typeof radius === "number" ? { tl: radius, tr: radius, br: radius, bl: radius } : radius;
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r.bl, y);
  shape.lineTo(x + width - r.br, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r.br);
  shape.lineTo(x + width, y + height - r.tr);
  shape.quadraticCurveTo(x + width, y + height, x + width - r.tr, y + height);
  shape.lineTo(x + r.tl, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r.tl);
  shape.lineTo(x, y + r.bl);
  shape.quadraticCurveTo(x, y, x + r.bl, y);
  return shape;
}

/** Flat rounded panel whose UVs span 0→1 across its bounds (so a texture maps edge to edge). */
export function roundedPanel(width: number, height: number, radius: number | Radii) {
  const geometry = new THREE.ShapeGeometry(roundedRect(width, height, radius), 24);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, (position.getX(i) + width / 2) / width, (position.getY(i) + height / 2) / height);
  }
  uv.needsUpdate = true;
  return geometry;
}

/** Rounded slab extruded along +z, bevelled so its edges catch the light. */
export function roundedSlab(width: number, height: number, depth: number, radius: number, bevel = 0.002) {
  const geometry = new THREE.ExtrudeGeometry(roundedRect(width - bevel * 2, height - bevel * 2, radius), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 24,
  });
  // centre the slab on z so callers can place its faces precisely
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}
