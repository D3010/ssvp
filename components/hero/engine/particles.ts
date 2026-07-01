/**
 * The Intake engine — dependency-free Canvas 2D particle system.
 * "Chaos in, structure out": ambient dots drift in the dark, stream toward the
 * PrimeRx wireframe rows, and snap into ordered slots at typing cadence.
 *
 * Pre-allocated pool (no per-frame GC), fixed-timestep update + rAF render,
 * DPR-aware. Owns its own loop; the mount controls start()/stop().
 */

const STATE = { AMBIENT: 0, STREAMING: 1, LANDED: 2, DISSOLVING: 3 } as const;

interface Slot {
  x: number;
  y: number;
  row: number;
}

interface P {
  state: number;
  x: number;
  y: number;
  band: number; // 0 far, 1 mid, 2 near
  r: number;
  baseR: number;
  op: number;
  baseOp: number;
  twPhase: number;
  twSpeed: number;
  twAmp: number;
  glow: number;
  // streaming bezier
  p0x: number; p0y: number; p1x: number; p1y: number;
  t: number;
  dur: number;
  jitter: number;
  jseed: number;
  row: number;
  lx: number; ly: number;
  // dissolving
  dl: number;
  // data-mote streak
  mote: number;
}

export interface EngineOptions {
  ambientCount: number;
  streamConcurrent: number;
  reducedRadius?: boolean;
  colors: { ambient: string; stream: string; landed: string };
  onRowComplete: (row: number) => void;
  onAllComplete: () => void;
  onDissolve?: () => void;
}

type Timer = { delay: number; fn: () => void };

export class IntakeEngine {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private opts: EngineOptions;
  private pool: P[] = [];
  private w = 0;
  private h = 0;
  private dpr = 1;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private readonly step = 1 / 60;
  private time = 0;
  private running = false;

  private noiseA: import("./noise").Noise2D | null = null;

  private slots: Slot[] = [];
  private rowSlots: Slot[][] = [];
  private active = false; // slots measured → loop can run

  // pointer
  private px = -9999;
  private py = -9999;
  private tpx = -9999;
  private tpy = -9999;
  private scroll = 0;

  // coordinator
  private phase: "drift" | "fill" | "rowpause" | "hold" | "dissolve" = "drift";
  private curRow = 0;
  private spawnCursor = 0; // slot index within current row spawned
  private cadence = 0;
  private landedInRow = 0;
  private backspaced = false;
  private phaseTimer = 0;
  private timers: Timer[] = [];
  private streaming = 0;
  private moteTimer = 0;

  constructor(canvas: HTMLCanvasElement, noise: import("./noise").Noise2D, opts: EngineOptions) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("no 2d ctx");
    this.ctx = ctx;
    this.noiseA = noise;
    this.opts = opts;
    for (let i = 0; i < opts.ambientCount; i++) this.pool.push(this.newAmbient());
  }

  private rand(): number {
    return Math.random();
  }

  private newAmbient(p?: P): P {
    const band = this.rand() < 0.4 ? 0 : this.rand() < 0.66 ? 1 : 2;
    const scale = band === 0 ? 0.6 : band === 1 ? 1 : 1.4;
    const baseR = (this.opts.reducedRadius ? 1.6 : 2) * scale;
    const baseOp =
      band === 0 ? 0.25 + this.rand() * 0.1 : band === 1 ? 0.4 + this.rand() * 0.15 : 0.55 + this.rand() * 0.15;
    const o: P = p ?? ({} as P);
    o.state = STATE.AMBIENT;
    o.x = this.rand() * this.w;
    o.y = this.rand() * this.h;
    o.band = band;
    o.baseR = baseR;
    o.r = baseR;
    o.baseOp = baseOp;
    o.op = baseOp;
    o.twPhase = this.rand() * Math.PI * 2;
    o.twSpeed = (this.rand() * 0.28 + 0.14); // 3–7s period
    o.twAmp = 0.15;
    o.glow = 0;
    o.t = 0;
    o.dur = 0;
    o.jitter = 0;
    o.jseed = this.rand() * 1000;
    o.row = -1;
    o.lx = 0;
    o.ly = 0;
    o.dl = 0;
    o.mote = 0;
    return o;
  }

  resize(cssW: number, cssH: number, dpr: number) {
    this.w = cssW;
    this.h = cssH;
    this.dpr = dpr;
    this.canvas.width = Math.round(cssW * dpr);
    this.canvas.height = Math.round(cssH * dpr);
    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;
    // reseat ambient particles that are out of bounds
    for (const p of this.pool) {
      if (p.state === STATE.AMBIENT) {
        if (p.x > cssW) p.x = this.rand() * cssW;
        if (p.y > cssH) p.y = this.rand() * cssH;
      }
    }
  }

  setSlots(rows: { x: number; y: number }[][]) {
    this.rowSlots = rows.map((row, ri) => row.map((s) => ({ x: s.x, y: s.y, row: ri })));
    this.slots = this.rowSlots.flat();
    this.active = this.slots.length > 0;
    if (this.active && this.phase === "drift") this.beginFill();
  }

  setPointer(x: number | null, y: number | null) {
    if (x === null || y === null) {
      this.tpx = -9999;
      this.tpy = -9999;
    } else {
      this.tpx = x;
      this.tpy = y;
    }
  }

  setScroll(progress: number) {
    this.scroll = Math.max(0, Math.min(1, progress));
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  destroy() {
    this.stop();
    this.pool.length = 0;
    this.slots.length = 0;
    this.timers.length = 0;
  }

  // ── coordinator ──────────────────────────────────────────────────────
  private beginFill() {
    this.phase = "fill";
    this.curRow = 0;
    this.spawnCursor = 0;
    this.landedInRow = 0;
    this.backspaced = false;
    this.cadence = 0;
  }

  private takeAmbient(): P | null {
    // reuse an ambient particle near the left/bottom as an intake dot
    let best: P | null = null;
    for (const p of this.pool) {
      if (p.state !== STATE.AMBIENT) continue;
      if (!best || p.x < best.x) best = p;
      if (p.x < this.w * 0.25) return p;
    }
    return best;
  }

  private spawnTo(slot: Slot) {
    const p = this.takeAmbient();
    if (!p) return;
    p.state = STATE.STREAMING;
    // spawn from left / bottom-left edge
    p.p0x = -20 - this.rand() * 60;
    p.p0y = this.h * (0.35 + this.rand() * 0.6);
    p.p1x = this.w * (0.2 + this.rand() * 0.4);
    p.p1y = slot.y + (this.rand() - 0.5) * this.h * 0.3;
    p.x = p.p0x;
    p.y = p.p0y;
    p.lx = slot.x;
    p.ly = slot.y;
    p.row = slot.row;
    p.t = 0;
    p.dur = 1.2 + this.rand() * 1.0;
    p.jitter = 8 + this.rand() * 4;
    p.baseR = (this.opts.reducedRadius ? 1.9 : 2.3);
    p.r = p.baseR;
    this.streaming++;
  }

  private updateCoordinator(dt: number) {
    // pending timers
    for (let i = this.timers.length - 1; i >= 0; i--) {
      const tm = this.timers[i];
      tm.delay -= dt;
      if (tm.delay <= 0) {
        tm.fn();
        this.timers.splice(i, 1);
      }
    }

    if (!this.active) return;

    if (this.phase === "fill") {
      const row = this.rowSlots[this.curRow];
      if (!row) return;
      // spawn at typing cadence, up to concurrency, until row is fully spawned
      this.cadence -= dt;
      if (
        this.cadence <= 0 &&
        this.spawnCursor < row.length &&
        this.streaming < this.opts.streamConcurrent
      ) {
        this.spawnTo(row[this.spawnCursor]);
        this.spawnCursor++;
        this.cadence = 0.07 + this.rand() * 0.04; // 70–110ms
      }
      // row fully landed?
      if (this.landedInRow >= row.length) {
        // 8% backspace glitch (once per row)
        if (!this.backspaced && this.rand() < 0.08) {
          this.backspaced = true;
          const victim = this.lastLandedInRow(this.curRow);
          if (victim) {
            victim.state = STATE.DISSOLVING;
            victim.dl = 1;
            this.landedInRow--;
            const slot = { x: victim.lx, y: victim.ly, row: this.curRow };
            this.timers.push({ delay: 0.25, fn: () => this.spawnTo(slot) });
            return;
          }
        }
        this.phase = "rowpause";
        this.phaseTimer = 0.25;
        this.opts.onRowComplete(this.curRow);
      }
    } else if (this.phase === "rowpause") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        this.curRow++;
        this.landedInRow = 0;
        this.spawnCursor = 0;
        this.backspaced = false;
        if (this.curRow >= this.rowSlots.length) {
          this.phase = "hold";
          this.phaseTimer = 3.4; // 0.4 beat + 3.0 hold
          this.opts.onAllComplete();
        } else {
          this.phase = "fill";
        }
      }
    } else if (this.phase === "hold") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        this.phase = "dissolve";
        this.opts.onDissolve?.();
        for (const p of this.pool) {
          if (p.state === STATE.LANDED) {
            p.state = STATE.DISSOLVING;
            p.dl = 1;
          }
        }
        this.phaseTimer = 0.9;
      }
    } else if (this.phase === "dissolve") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) this.beginFill();
    }
  }

  private lastLandedInRow(row: number): P | null {
    let best: P | null = null;
    for (const p of this.pool) {
      if (p.state === STATE.LANDED && p.row === row) {
        if (!best || p.lx > best.lx) best = p;
      }
    }
    return best;
  }

  // ── per-particle update ──────────────────────────────────────────────
  private update(dt: number) {
    this.time += dt;
    // ease pointer
    if (this.tpx > -9998) {
      this.px += (this.tpx - this.px) * 0.08;
      this.py += (this.tpy - this.py) * 0.08;
    }
    const noise = this.noiseA!;
    const w = this.w;
    const h = this.h;

    // data mote every 6–10s
    this.moteTimer -= dt;
    if (this.moteTimer <= 0) {
      this.moteTimer = 6 + this.rand() * 4;
      for (const p of this.pool) {
        if (p.state === STATE.AMBIENT && p.band === 2) {
          p.mote = 1;
          break;
        }
      }
    }

    for (const p of this.pool) {
      if (p.state === STATE.AMBIENT) {
        const ang = noise.eval(p.x * 0.0016 + this.time * 0.03, p.y * 0.0016) * Math.PI * 2;
        const spd = 4 + p.band * 3 + (p.mote > 0 ? 90 * p.mote : 0);
        p.x += Math.cos(ang) * spd * dt;
        p.y += Math.sin(ang) * spd * dt;
        if (p.mote > 0) p.mote = Math.max(0, p.mote - dt * 0.8);
        // wrap
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
        // twinkle
        p.twPhase += p.twSpeed * dt * Math.PI;
        const tw = 1 + Math.sin(p.twPhase) * p.twAmp;
        // proximity glow
        const dx = p.x - this.px;
        const dy = p.y - this.py;
        const near = dx * dx + dy * dy < 120 * 120;
        p.glow += ((near ? 1 : 0) - p.glow) * Math.min(1, dt * 6);
        p.op = p.baseOp * tw + p.glow * 0.3;
        p.r = p.baseR + p.glow * 0.5;
      } else if (p.state === STATE.STREAMING) {
        p.t += dt / p.dur;
        if (p.t >= 1) {
          p.state = STATE.LANDED;
          p.x = p.lx;
          p.y = p.ly;
          p.op = 1;
          p.r = p.baseR;
          if (p.row === this.curRow) this.landedInRow++;
          this.streaming = Math.max(0, this.streaming - 1);
        } else {
          const t = p.t;
          const it = 1 - t;
          // quadratic bezier p0→p1→(lx,ly)
          const bx = it * it * p.p0x + 2 * it * t * p.p1x + t * t * p.lx;
          const by = it * it * p.p0y + 2 * it * t * p.p1y + t * t * p.ly;
          // perpendicular jitter decaying as (1-t)^2
          const j = noise.eval(p.jseed + this.time * 1.5, p.t * 4) * p.jitter * it * it;
          p.x = bx;
          p.y = by - j;
          p.op = 0.85;
          p.r = p.baseR;
        }
      } else if (p.state === STATE.LANDED) {
        p.op = 0.9;
      } else if (p.state === STATE.DISSOLVING) {
        p.dl -= dt / 0.8;
        if (p.dl <= 0) {
          this.newAmbient(p);
        } else {
          p.op = p.op * 0.92;
          p.r = p.baseR * (0.6 + p.dl * 0.4);
          // drift toward a random ambient direction
          p.x += (this.rand() - 0.5) * 30 * dt;
          p.y -= 12 * dt;
        }
      }
    }

    this.updateCoordinator(dt);
  }

  // ── render ───────────────────────────────────────────────────────────
  private render() {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);

    const scrollFade = 1 - this.scroll * 0.85;
    const scrollRise = this.scroll * 40;
    // pointer parallax offsets per band
    const parX = this.px > -9998 ? (this.px - this.w / 2) / (this.w / 2) : 0;
    const parY = this.py > -9998 ? (this.py - this.h / 2) / (this.h / 2) : 0;

    // pass 1 — ambient + streaming (additive glow)
    ctx.globalCompositeOperation = "lighter";
    for (const p of this.pool) {
      if (p.state !== STATE.AMBIENT && p.state !== STATE.STREAMING) continue;
      const shift = p.state === STATE.AMBIENT ? (p.band === 0 ? 6 : p.band === 1 ? 12 : 20) : 0;
      const ox = -parX * shift;
      const oy = -parY * shift - scrollRise * (p.state === STATE.STREAMING ? 1.4 : 0.4);
      ctx.globalAlpha = Math.max(0, p.op * scrollFade);
      ctx.fillStyle = p.state === STATE.STREAMING ? this.opts.colors.stream : this.opts.colors.ambient;
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // pass 2 — landed + dissolving
    ctx.globalCompositeOperation = "source-over";
    for (const p of this.pool) {
      if (p.state !== STATE.LANDED && p.state !== STATE.DISSOLVING) continue;
      ctx.globalAlpha = Math.max(0, p.op * scrollFade);
      ctx.fillStyle = this.opts.colors.landed;
      ctx.beginPath();
      ctx.arc(p.x, p.y - scrollRise, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  private loop = (now: number) => {
    if (!this.running) return;
    let frame = (now - this.last) / 1000;
    this.last = now;
    if (frame > 0.1) frame = 0.1; // clamp after tab-switch
    this.acc += frame;
    while (this.acc >= this.step) {
      this.update(this.step);
      this.acc -= this.step;
    }
    this.render();
    this.raf = requestAnimationFrame(this.loop);
  };
}
