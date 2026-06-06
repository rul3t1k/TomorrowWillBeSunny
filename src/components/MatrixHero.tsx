"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

export default function MatrixHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Col = { x: number; y: number; speed: number; resetChance: number };
    let columns: Col[] = [];
    const fontSize = 24;

    function initMatrix() {
      columns = [];
      let currentX = 0;
      const width = canvas!.width || window.innerWidth;
      while (currentX < width) {
        const ratio = currentX / width;
        const spacing = fontSize * 0.85 - ratio * 8;
        columns.push({
          x: currentX,
          y: Math.random() * -30,
          speed: 0.4 + Math.random() * 0.4 + ratio * 0.5,
          resetChance: 0.975 - ratio * 0.02,
        });
        currentX += spacing;
      }
    }

    function resizeCanvas() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height + 96;
      initMatrix();
    }

    function drawMatrix() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(5,7,11,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px monospace`;
      columns.forEach((col) => {
        const text = Math.random() > 0.5 ? "1" : "0";
        const ratio = col.x / canvas.width;
        const alpha = 0.05 + Math.pow(ratio, 2.5) * 0.9;
        ctx.fillStyle = `rgba(0,240,255,${alpha})`;
        if (ratio > 0.5) {
          ctx.shadowBlur = Math.floor((ratio - 0.5) * 60);
          ctx.shadowColor = "#00B4D8";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillText(text, col.x, col.y * fontSize);
        if (col.y * fontSize > canvas.height && Math.random() > col.resetChance) col.y = 0;
        col.y += col.speed;
      });
      ctx.shadowBlur = 0;
    }

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    window.addEventListener("resize", resizeCanvas);
    const interval = setInterval(drawMatrix, 60);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="bg-black relative hero-static-noise shadow-[0_25px_50px_rgba(0,0,0,0.8)] min-h-[460px]"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 right-0 -bottom-24 w-full opacity-90 matrix-mask pointer-events-none z-10 block"
      />
      <div className="hero-section-inner relative flex flex-col justify-between min-h-[460px] z-20 bg-black/40 py-8 px-0" style={{ backdropFilter: "blur(0.5px)" }}>
        <div className="flex justify-between w-full items-center border-b border-bg-surface/80 pb-4">
          <div className="font-tech text-xs text-muted-gray tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent-cyan rounded-full animate-ping" />
            &gt; INIT.EXE [P10: B492] // МАРШРУТНЫЙ МОДУЛЬ №7
          </div>
          <div className="font-tech text-[10px] text-accent-cyan tracking-widest bg-accent-cyan/10 border border-accent-cyan/30 px-2 py-0.5">
            ONLINE
          </div>
        </div>

        <div className="hero-title-block w-full my-10 space-y-5">
          <div className="inline-flex items-center space-x-2 border border-alert-red/40 bg-alert-red/10 px-3 py-1 text-xs text-alert-red uppercase tracking-[0.15em]">
            <span>⚠ DATA CORRUPTION DETECTED</span>
          </div>
          <h1
            className="hero-h1 glitch-text font-tech font-black tracking-tight text-accent-cyan uppercase crt-glow leading-[0.9] select-none"
            style={{ fontSize: "clamp(64px, 10vw, 120px)" }}
          >
            ЗАВТРА{" "}
            <span style={{ whiteSpace: "nowrap" }}>
              Б<span style={{ letterSpacing: "-0.08em", display: "inline-block", marginRight: "-0.02em" }}>У</span>ДЕТ
            </span>
            <br />СОЛНЕЧНО
          </h1>
          <p className="font-tech text-xs text-muted-gray tracking-[0.2em] uppercase">
            SUNPHASE: АПРЕЛЬ 2029 // УРОВЕНЬ СЧАСТЬЯ: 98,2%<span className="hero-cursor" />
          </p>
        </div>

        <div className="hero-btn-block w-full">
          <Link href="/initialize" className="block md:max-w-md w-full">
            <button className="glow-button relative group/btn overflow-hidden border-2 border-accent-cyan px-10 py-5 bg-transparent text-accent-cyan text-sm md:text-base uppercase tracking-[0.25em] font-bold w-full">
              <span className="relative z-10 transition-colors duration-200">ВОЙТИ В СИСТЕМУ ↓</span>
              <div className="absolute inset-0 w-0 bg-accent-cyan transition-all duration-200 group-hover/btn:w-full -z-0" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
