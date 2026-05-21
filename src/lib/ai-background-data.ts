/** Deterministic layout — stable across SSR and hydration */

export type NeuralNode = { id: number; x: number; y: number };

/** Sparse mesh — reads as neural net without visual noise */
export const NEURAL_NODES: NeuralNode[] = [
  { id: 0, x: 10, y: 14 },
  { id: 1, x: 28, y: 10 },
  { id: 2, x: 48, y: 12 },
  { id: 3, x: 68, y: 16 },
  { id: 4, x: 88, y: 22 },
  { id: 5, x: 14, y: 36 },
  { id: 6, x: 36, y: 32 },
  { id: 7, x: 54, y: 28 },
  { id: 8, x: 74, y: 38 },
  { id: 9, x: 8, y: 58 },
  { id: 10, x: 30, y: 54 },
  { id: 11, x: 52, y: 50 },
  { id: 12, x: 72, y: 58 },
  { id: 13, x: 90, y: 68 },
  { id: 14, x: 22, y: 78 },
  { id: 15, x: 48, y: 74 },
  { id: 16, x: 68, y: 82 },
];

export const NEURAL_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [1, 6], [2, 7], [3, 8], [4, 8],
  [5, 6], [6, 7], [7, 8], [5, 9], [6, 10], [7, 11], [8, 12],
  [9, 10], [10, 11], [11, 12], [12, 13],
  [9, 14], [10, 15], [11, 15], [12, 16], [14, 15], [15, 16],
];

export type ParticleSpec = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

/** Vertical bands × columns — structured drift, not random scatter */
const PARTICLE_COLUMNS = [14, 32, 50, 68, 86] as const;
const PARTICLE_ROWS = [12, 28, 44, 60, 76] as const;

function buildStructuredParticles(): ParticleSpec[] {
  const out: ParticleSpec[] = [];
  let id = 0;
  for (const col of PARTICLE_COLUMNS) {
    for (const row of PARTICLE_ROWS) {
      const jitterX = ((id * 5) % 7) - 3;
      const jitterY = ((id * 11) % 9) - 4;
      out.push({
        id: id++,
        left: col + jitterX * 0.35,
        top: row + jitterY * 0.35,
        size: 1 + (id % 2) * 0.5,
        delay: (id % 8) * 0.65,
        duration: 10 + (id % 5) * 1.2,
      });
    }
  }
  return out;
}

export const FLOATING_PARTICLES: ParticleSpec[] = buildStructuredParticles();

export const MOBILE_PARTICLE_LIMIT = 10;
