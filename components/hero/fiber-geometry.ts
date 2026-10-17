/**
 * Shared geometry for the hero "network of light": fibers fan out from the
 * RCN core (HQ) to the homes it serves. Used by both the WebGL scene and the
 * SVG poster so the two render the same composition and can cross-fade.
 *
 * Coordinates are scene units (camera at z≈7, fov 40 → roughly ±2.5 visible).
 */

export type Vec3 = [number, number, number];

export type Strand = {
  /** Cubic Bézier control points, from the core to a home. */
  points: [Vec3, Vec3, Vec3, Vec3];
  /** Pulse speed (cycles per second) and phase. */
  speed: number;
  offset: number;
  /** Foreground strands carry pulses; background ones add depth. */
  layer: "front" | "back";
};

export const CORE: Vec3 = [1.25, 1.35, 0];

// Deterministic pseudo-random so server and client agree.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function strand(i: number, n: number, layer: Strand["layer"]): Strand {
  const t = n === 1 ? 0.5 : i / (n - 1);
  const back = layer === "back";
  const seed = back ? i + 100 : i;
  const [x0, x1] = back ? [-2.6, 2.3] : [-2.35, 2.05];
  const x = x0 + (x1 - x0) * t;
  const y =
    (back ? -1.05 : -1.65) -
    Math.sin(t * Math.PI) * (back ? 0.35 : 0.45) +
    (rand(seed + 7) - 0.5) * 0.18;
  const z = back ? -1.6 - rand(seed + 3) * 1.4 : (rand(seed + 11) - 0.5) * 1.6;
  const end: Vec3 = [x, y, z];
  const p1: Vec3 = [CORE[0] - 1.1 - t * 0.6, CORE[1] + 0.05, CORE[2] + z * 0.15];
  const p2: Vec3 = [x + (CORE[0] - x) * 0.12, y + 1.55 + rand(seed + 5) * 0.4, z];
  return {
    points: [CORE, p1, p2, end],
    speed: 0.16 + rand(seed + 19) * 0.12,
    offset: rand(seed + 23),
    layer,
  };
}

export const FRONT_COUNT = 11;
export const BACK_COUNT = 8;

export const STRANDS: Strand[] = [
  ...Array.from({ length: BACK_COUNT }, (_, i) => strand(i, BACK_COUNT, "back")),
  ...Array.from({ length: FRONT_COUNT }, (_, i) =>
    strand(i, FRONT_COUNT, "front"),
  ),
];

/** Simple perspective projection into the SVG poster's 600×600 viewBox. */
export function project([x, y, z]: Vec3): [number, number] {
  const camZ = 7;
  const fov = (40 * Math.PI) / 180;
  const scale = 300 / Math.tan(fov / 2);
  const depth = camZ - z;
  return [300 + (x * scale) / depth, 300 - (y * scale) / depth];
}
