"use client";

import { useEffect, useRef, useState } from "react";

export default function DownloadSection() {
  const [loaded, setLoaded] = useState(false);
  const [terminalFading, setTerminalFading] = useState(false);
  const [cardVisible, setCardVisible] = useState([false, false, false]);

  const counterRef = useRef<HTMLSpanElement>(null);
  const cubesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let current = 0;

    function step() {
      if (current > 100) return;

      if (counterRef.current) counterRef.current.textContent = current + "%";

      const activeCubes = Math.floor(current / 10);
      for (let i = 0; i < activeCubes; i++) {
        const cube = cubesRef.current[i];
        if (cube && !cube.dataset.lit) {
          cube.dataset.lit = "1";
          cube.classList.remove("bg-transparent");
          cube.classList.add("bg-brand-terminal", "bar-glow");
        }
      }

      if (current === 100) {
        setTimeout(() => {
          setTerminalFading(true);
          setTimeout(() => {
            setLoaded(true);
            [0, 1, 2].forEach((i) => {
              setTimeout(() => {
                setCardVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 100);
            });
          }, 500);
        }, 400);
        return;
      }

      current++;
      let delay = 25;
      if (current > 35 && current < 45) delay = 90;
      if (current > 82 && current < 88) delay = 140;
      if (current > 95) delay = 70;
      setTimeout(step, delay);
    }

    setTimeout(step, 400);
  }, []);

  return (
    <>
      {/* Terminal loading block */}
      {!loaded && (
        <div
          className={`w-full bg-[#15130D] p-5 border border-sim-dark-border relative max-w-4xl mb-10 transition-all duration-700 origin-center ${
            terminalFading ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-sim-muted/60" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-sim-muted/60" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-sim-muted/60" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-sim-muted/60" />

          <div className="bg-[#0A0906] border border-sim-dark-border/50 p-8 h-44 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
            <div className="font-mono text-brand-terminal terminal-glow text-2xl md:text-3xl mb-5 z-20 uppercase tracking-widest font-medium">
              ЗАГРУЗКА СРЕДЫ . . . <span ref={counterRef}>0%</span>
            </div>
            <div className="w-full max-w-2xl h-7 border border-sim-dark-border grid grid-cols-10 p-[3px] gap-[3px] z-20 bg-black/40">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { cubesRef.current[i] = el; }}
                  className="h-full bg-transparent transition-all duration-300"
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center px-1 font-mono text-[11px] tracking-widest text-sim-muted">
            <span>SYS_ID: 0X8F92A</span>
            <span className="border border-sim-dark-border/60 px-2 py-0.5 text-sim-gold/90 text-[10px]">
              SEC_LEVEL: ALPHA
            </span>
          </div>
        </div>
      )}

      {/* Download cards + system requirements */}
      <div
        className={`w-full flex flex-col items-center justify-center transition-all duration-700 ${
          loaded ? "scale-100 opacity-100" : "scale-95 opacity-80"
        }`}
      >
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 justify-center justify-items-center">

          {/* Windows */}
          <a href="/downloads/game-windows-x64.exe" download className="dl-link">
            <div
              className={`download-card bg-soviet-red text-paper border border-sim-dark-border p-7 flex flex-col items-center justify-center relative min-h-[170px] w-full shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                cardVisible[0] ? "scale-100 opacity-100" : "scale-90 opacity-70"
              }`}
            >
              <span className="absolute top-3 left-4 font-mono text-[10px] tracking-widest opacity-60">#01</span>
              <span className="absolute top-3 right-4 font-mono text-[9px] border border-paper/30 px-1 py-px rounded-sm bg-black/10">EXE</span>
              <svg className="w-10 h-10 mb-3 fill-current" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.101zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
              </svg>
              <span className="font-display text-2xl font-bold uppercase tracking-wider">WINDOWS</span>
              <span className="font-mono text-[11px] tracking-wider opacity-70 mt-1">64-BIT / V 2.1.4</span>
            </div>
          </a>

          {/* macOS */}
          <a href="/downloads/game-macos-universal.dmg" download className="dl-link">
            <div
              className={`download-card bg-[#15130D] text-paper border border-sim-dark-border p-7 flex flex-col items-center justify-center relative min-h-[170px] w-full cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-sim-gold/40 ${
                cardVisible[1] ? "scale-100 opacity-100" : "scale-90 opacity-70"
              }`}
            >
              <span className="absolute top-3 left-4 font-mono text-[10px] tracking-widest text-sim-muted">#02</span>
              <span className="absolute top-3 right-4 font-mono text-[9px] border border-sim-dark-border text-sim-gold/80 px-1 py-px rounded-sm bg-black/20">DMG</span>
              <svg className="w-10 h-10 mb-3 fill-current text-sim-gold" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94 1.07.08 2.16-.52 2.82-1.33z" />
              </svg>
              <span className="font-display text-2xl font-bold uppercase tracking-wider text-sim-gold">MACOS</span>
              <span className="font-mono text-[11px] tracking-wider text-sim-muted mt-1">UNIVERSAL / V 2.1.4</span>
            </div>
          </a>

          {/* Linux */}
          <a href="/downloads/game-linux-x86_64.AppImage" download className="dl-link">
            <div
              className={`download-card bg-[#15130D] text-paper border border-sim-dark-border p-7 flex flex-col items-center justify-center relative min-h-[170px] w-full cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-sim-gold/40 ${
                cardVisible[2] ? "scale-100 opacity-100" : "scale-90 opacity-70"
              }`}
            >
              <span className="absolute top-3 left-4 font-mono text-[10px] tracking-widest text-sim-muted">#03</span>
              <span className="absolute top-3 right-4 font-mono text-[8px] border border-sim-dark-border text-sim-gold/80 px-1 py-px rounded-sm bg-black/20">APPIMAGE</span>
              <svg className="w-10 h-10 mb-3 fill-current text-sim-gold" viewBox="0 0 24 24">
                <path d="M2 3h20v18H2V3zm2 2v14h16V5H4zm3 3h2v2H7V8zm3 3h2v2h-2v-2zm3 3h4v2h-4v-2z" />
              </svg>
              <span className="font-display text-2xl font-bold uppercase tracking-wider text-sim-gold">LINUX</span>
              <span className="font-mono text-[11px] tracking-wider text-sim-muted mt-1">X86_64 / V 2.1.4</span>
            </div>
          </a>

        </div>

        {/* System requirements */}
        <div className="w-full max-w-3xl border border-sim-dark-border bg-[#15130D]/60 p-6 md:p-8 relative">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full border border-paper flex items-center justify-center font-mono text-xs text-paper font-bold mt-1">
              i
            </div>
            <div className="flex-grow">
              <h4 className="font-cormorant font-light text-2xl tracking-wide text-paper mb-3 border-b border-sim-dark-border pb-1.5 inline-block pr-6">
                Системные Требования
              </h4>
              <p className="font-serif font-normal text-base leading-relaxed text-paper">
                Для стабильной работы симуляции требуется не менее 8GB оперативной памяти и видеокарта с поддержкой аппаратного ускорения. Убедитесь, что ваши драйверы обновлены до последней версии во избежание системных сбоев во время рендеринга среды.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
