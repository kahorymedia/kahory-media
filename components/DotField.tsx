// @ts-nocheck
/* eslint-disable */
"use client";
import { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 16,     // Slightly spaced out for a cleaner look
  cursorRadius = 250,  // Reduced from 500 so the hover effect is more localized and precise
  cursorForce = 0.15,
  bulgeStrength = 40,
  centerColor = '#ff3333', // UPDATED: Increased intensity to Pure Bright Red
  edgeColor = '#111111',   // Fades to almost black at the edges
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    let resizeTimer: any;

    function doResize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { w, h, offsetX: rect.left + window.scrollX, offsetY: rect.top + window.scrollY };
      buildDots(w, h);
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function buildDots(w: number, h: number) {
      const step = dotRadius + dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.offsetX;
      mouseRef.current.y = e.pageY - s.offsetY;
    }

    let lastTime = performance.now();

    function tick(time: number) {
      const dt = time - lastTime;
      lastTime = time;

      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const len = dots.length;

      // Calculate mouse speed natively in the render loop (much more efficient than setInterval)
      const dxMouse = m.prevX - m.x;
      const dyMouse = m.prevY - m.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      m.speed += (distMouse - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;

      const targetEngagement = Math.min(m.speed / 5, 1);
      let eng = targetEngagement;

      ctx!.clearRect(0, 0, w, h);

      // RADIAL GRADIENT: Maroon in the center, dark at the edges!
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.max(cx, cy);
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, maxDist);
      grad.addColorStop(0, centerColor);
      grad.addColorStop(1, edgeColor);
      ctx!.fillStyle = grad;

      const cr = cursorRadius;
      const crSq = cr * cr;
      const rad = dotRadius / 2;

      ctx!.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        // Repel Physics
        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          const move = (cr / dist) * (m.speed * cursorForce);
          d.vx += Math.cos(angle) * -move;
          d.vy += Math.sin(angle) * -move;
        } 

        // Spring back to original position
        d.vx *= 0.85; // Friction
        d.vy *= 0.85;
        d.x = d.ax + d.vx;
        d.y = d.ay + d.vy;
        d.sx += (d.x - d.sx) * 0.15; // Ease back to center
        d.sy += (d.y - d.sy) * 0.15;

        // Draw dot
        ctx!.moveTo(d.sx + rad, d.sy);
        ctx!.arc(d.sx, d.sy, rad, 0, TWO_PI);
      }

      ctx!.fill();
      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeStrength, centerColor, edgeColor]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
});

DotField.displayName = 'DotField';
export default DotField;