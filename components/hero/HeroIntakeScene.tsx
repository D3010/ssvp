"use client";

import { useEffect, useRef } from "react";
import { IntakeEngine } from "./engine/particles";
import { Noise2D } from "./engine/noise";

/**
 * Mounts the Canvas-2D Intake engine behind the hero. Inits after first paint
 * (requestIdleCallback), measures the DOM window's dot-slots for pixel-perfect
 * alignment, pauses off-screen / on hidden tabs, and cleans up fully.
 *
 * TIER 0 (reduced-motion / no WebGL-class device) never inits — the static
 * IntakeWindow (server HTML) is the whole hero, which is intentional.
 */

const COLORS = { ambient: "#3f6f95", stream: "#5ac8fa", landed: "#8fc7ef" };

export function HeroIntakeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const section = canvas.closest("section");
    const win = section?.querySelector<HTMLElement>("[data-intake-window]");
    if (!section || !win) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // TIER 0

    // ── tier ────────────────────────────────────────────────────────
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    const small = window.innerWidth < 768;
    const mobile = coarse && small;
    const tier1 = coarse || cores <= 4 || mem <= 4;
    const ambientCount = mobile ? 60 : tier1 ? 90 : 170;
    const streamConcurrent = mobile ? 3 : tier1 ? 4 : 6;
    const dprCap = tier1 ? 1.5 : 2;

    const debug = new URLSearchParams(window.location.search).get("debug") === "motion";

    let engine: IntakeEngine | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let inView = true;
    let readTimers: ReturnType<typeof setTimeout>[] = [];
    let dbgEl: HTMLDivElement | null = null;
    let dbgRaf = 0;
    let idleId = 0;

    const measure = () => {
      if (!engine) return;
      const crect = canvas.getBoundingClientRect();
      const rows: { x: number; y: number }[][] = [];
      win.querySelectorAll<HTMLElement>("[data-intake-row]").forEach((rowEl) => {
        const slots: { x: number; y: number }[] = [];
        rowEl.querySelectorAll<HTMLElement>("[data-dot]").forEach((d) => {
          const r = d.getBoundingClientRect();
          slots.push({ x: r.left + r.width / 2 - crect.left, y: r.top + r.height / 2 - crect.top });
        });
        if (slots.length) rows.push(slots);
      });
      engine.setSlots(rows);
    };

    const applySize = () => {
      if (!engine) return;
      const r = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      engine.resize(r.width, r.height, dpr);
      measure();
    };

    const onRow = (row: number) => {
      const el = win.querySelectorAll<HTMLElement>("[data-intake-row]")[row];
      if (!el) return;
      el.classList.add("is-read");
      readTimers.push(setTimeout(() => el.classList.remove("is-read"), 700));
    };
    const onAll = () => win.classList.add("intake-verified");
    const onDissolve = () => win.classList.remove("intake-verified");

    const init = () => {
      engine = new IntakeEngine(canvas, new Noise2D((Math.random() * 1e9) | 0), {
        ambientCount,
        streamConcurrent,
        reducedRadius: tier1,
        colors: COLORS,
        onRowComplete: onRow,
        onAllComplete: onAll,
        onDissolve,
      });
      applySize();
      win.classList.add("intake-live");
      engine.start();

      ro = new ResizeObserver(() => applySize());
      ro.observe(section);

      io = new IntersectionObserver(
        (entries) => {
          inView = entries[0].intersectionRatio >= 0.15;
          if (!engine) return;
          if (inView && document.visibilityState === "visible") engine.start();
          else engine.stop();
        },
        { threshold: [0, 0.15, 0.5] },
      );
      io.observe(section);

      if (mobile) {
        // no pointer effects on touch — a slow auto drift keeps it alive
        win.style.transition = "transform 8s ease-in-out";
      }

      if (debug) {
        dbgEl = document.createElement("div");
        dbgEl.style.cssText =
          "position:fixed;top:8px;left:8px;z-index:9999;font:11px monospace;background:#000a;color:#5ac8fa;padding:4px 8px;border-radius:4px;pointer-events:none";
        document.body.appendChild(dbgEl);
        let frames = 0;
        let t0 = performance.now();
        const sample = () => {
          frames++;
          const now = performance.now();
          if (now - t0 >= 500) {
            const fps = Math.round((frames * 1000) / (now - t0));
            if (dbgEl) dbgEl.textContent = `intake · ${fps}fps · tier ${mobile ? "M" : tier1 ? 1 : 2} · ${ambientCount} dots`;
            frames = 0;
            t0 = now;
          }
          dbgRaf = requestAnimationFrame(sample);
        };
        dbgRaf = requestAnimationFrame(sample);
      }
    };

    // pointer (fine only)
    const onPointer = (e: PointerEvent) => {
      if (!engine || coarse) return;
      const r = canvas.getBoundingClientRect();
      engine.setPointer(e.clientX - r.left, e.clientY - r.top);
      // window perspective tilt
      const rx = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const ry = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      win.style.transform = `perspective(1200px) rotateX(${(-rx * 2.5).toFixed(2)}deg) rotateY(${(ry * 2.5).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      engine?.setPointer(null, null);
      win.style.transform = "";
    };
    const onScroll = () => {
      if (!engine) return;
      const r = section.getBoundingClientRect();
      engine.setScroll(r.height ? -r.top / r.height : 0);
    };
    const onVis = () => {
      if (!engine) return;
      if (document.visibilityState === "visible" && inView) engine.start();
      else engine.stop();
    };

    // init after first paint
    type RIC = (cb: () => void, opts?: { timeout: number }) => number;
    const ric: RIC | undefined = (window as unknown as { requestIdleCallback?: RIC }).requestIdleCallback;
    if (ric) idleId = ric(init, { timeout: 800 });
    else idleId = window.setTimeout(init, 200) as unknown as number;

    if (!coarse) {
      section.addEventListener("pointermove", onPointer, { passive: true });
      section.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (ric && cic) cic(idleId);
      else clearTimeout(idleId);
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      ro?.disconnect();
      io?.disconnect();
      readTimers.forEach(clearTimeout);
      readTimers = [];
      if (dbgRaf) cancelAnimationFrame(dbgRaf);
      dbgEl?.remove();
      win.classList.remove("intake-live", "intake-verified");
      win.style.transform = "";
      engine?.destroy();
      engine = null;
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
