/**
 * Compact 2D simplex noise — dependency-free (~70 lines).
 * Adapted from Stefan Gustavson's public-domain reference. Deterministic given
 * a seed so the ambient drift field is stable per mount but varies per reload.
 */

const GRAD = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [1, 0], [-1, 0],
  [0, 1], [0, -1], [0, 1], [0, -1],
];

const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

export class Noise2D {
  private perm = new Uint8Array(512);

  constructor(seed = 1) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    // deterministic shuffle (mulberry32)
    let s = seed >>> 0;
    const rand = () => {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  /** Noise value in roughly [-1, 1]. */
  eval(xin: number, yin: number): number {
    const perm = this.perm;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);

    let i1: number, j1: number;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const ii = i & 255;
    const jj = j & 255;

    const n = (gi: number, x: number, y: number) => {
      let t2 = 0.5 - x * x - y * y;
      if (t2 < 0) return 0;
      t2 *= t2;
      const g = GRAD[gi % 12];
      return t2 * t2 * (g[0] * x + g[1] * y);
    };

    const n0 = n(perm[ii + perm[jj]], x0, y0);
    const n1 = n(perm[ii + i1 + perm[jj + j1]], x1, y1);
    const n2 = n(perm[ii + 1 + perm[jj + 1]], x2, y2);
    return 70 * (n0 + n1 + n2);
  }
}
