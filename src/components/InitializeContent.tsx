"use client";

import { useEffect, useRef } from "react";
import RealityFooter from "./RealityFooter";

export default function InitializeContent() {
  const counterRef      = useRef<HTMLSpanElement>(null);
  const terminalRef     = useRef<HTMLDivElement>(null);
  const cellsRef        = useRef<HTMLDivElement[]>([]);
  const cardsRef        = useRef<(HTMLButtonElement | null)[]>([null, null, null]);

  useEffect(() => {
    let progress = 0;
    let tid: ReturnType<typeof setTimeout>;

    function updateLoading() {
      if (counterRef.current) counterRef.current.textContent = `${progress}%`;

      const activeCells = Math.floor((progress / 100) * cellsRef.current.length);
      for (let i = 0; i < activeCells; i++) {
        const cell = cellsRef.current[i];
        if (cell && !cell.classList.contains("filled")) {
          cell.classList.add("filled");
        }
      }

      if (progress === 100) {
        tid = setTimeout(() => {
          const block = terminalRef.current;
          if (block) {
            block.style.transform = "scale(0.95)";
            block.style.opacity = "0";
            tid = setTimeout(() => {
              block.style.display = "none";
              cardsRef.current.forEach((card, i) => {
                setTimeout(() => {
                  if (card) card.classList.add("active");
                }, i * 100);
              });
            }, 500);
          }
        }, 300);
        return;
      }

      progress++;
      let delay = 25;
      if (progress > 35 && progress < 45) delay = 90;
      if (progress > 82 && progress < 88) delay = 140;
      if (progress > 95) delay = 70;
      tid = setTimeout(updateLoading, delay);
    }

    tid = setTimeout(updateLoading, 400);
    return () => clearTimeout(tid);
  }, []);

  return (
    <div style={{ paddingTop: "80px", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
      <main className="initialize-main relative z-20 flex-grow w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center">

        {/* Header */}
        <div className="text-center mb-10 max-w-3xl">
          <h1
            className="glitch-text text-5xl md:text-6xl font-bold tracking-[0.2em] text-[#4cd6fb] uppercase mb-4"
            style={{ textShadow: "0 0 10px #4cd6fb, 0 0 20px rgba(76,214,251,0.5)" }}
          >
            ИНИЦИАЛИЗАЦИЯ
          </h1>
          <p className="text-xs md:text-sm text-[#869398] tracking-wider leading-relaxed">
            Подготовка системных файлов для симуляции. Пожалуйста, выберите целевую платформу.
          </p>
        </div>

        {/* Terminal loading block */}
        <div
          ref={terminalRef}
          className="w-full bg-[#0a0e14] border border-[#222d38] p-6 md:p-8 relative mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500"
        >
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#869398]/40" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#869398]/40" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#869398]/40" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#869398]/40" />

          <div className="border border-[#222d38]/60 p-6 md:p-10 bg-[#04070a] relative">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xl md:text-3xl font-bold tracking-[0.15em] text-[#4cd6fb] mb-8">
              <span>ЗАГРУЗКА СРЕДЫ... <span ref={counterRef}>0%</span></span>
              <span className="blink-square" />
            </div>

            <div className="flex gap-1.5 h-6 w-full max-w-2xl mx-auto border border-[#222d38] p-1 bg-[#090e14]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { if (el) cellsRef.current[i] = el; }}
                  className="progress-cell h-full flex-1 border border-[#222d38]/40 border-dashed"
                />
              ))}
            </div>

            <div className="mt-8 text-xs tracking-widest text-[#869398] flex justify-between border-t border-[#222d38]/60 pt-3">
              <span>SYS_ID: 0X8F92A</span>
              <span className="border border-[#222d38]/80 px-2 py-0.5 bg-[#0a0e14]">SEC_LEVEL: ALPHA</span>
            </div>
          </div>
        </div>

        {/* Final content */}
        <div className="w-full flex flex-col items-center justify-center">

          {/* Download cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {/* WINDOWS */}
            <a href="/downloads/game-windows-x64.exe" download className="block w-full no-underline text-inherit">
              <button
                ref={(el) => { cardsRef.current[0] = el; }}
                className="init-dl-card w-full bg-[#04070a] border border-[#4cd6fb] flex flex-col items-center justify-center pt-10 pb-8 px-6 group relative shadow-[0_0_15px_rgba(76,214,251,0.15)] hover:bg-[#0c141c]"
              >
                <div className="absolute top-3 left-4 text-xs text-[#4cd6fb]/60 font-mono">[001]</div>
                <div className="absolute top-3 right-4 text-xs text-[#4cd6fb]/60 border border-[#4cd6fb]/40 px-1.5 py-0.5 font-mono">EXE</div>
                <svg className="w-10 h-10 mb-4 fill-current text-[#4cd6fb]" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.101zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z"/>
                </svg>
                <h3 className="text-sm tracking-[0.25em] font-bold text-white mb-2 uppercase group-hover:text-[#4cd6fb] transition-colors">WINDOWS</h3>
                <p className="text-xs tracking-widest text-[#4cd6fb]/80">64-BIT / V 2.1.4</p>
              </button>
            </a>

            {/* MACOS */}
            <a href="/downloads/game-macos-universal.dmg" download className="block w-full no-underline text-inherit">
              <button
                ref={(el) => { cardsRef.current[1] = el; }}
                className="init-dl-card w-full bg-[#04070a] border border-[#222d38] flex flex-col items-center justify-center pt-10 pb-8 px-6 group relative hover:bg-[#0c141c] hover:border-[#4cd6fb]"
              >
                <div className="absolute top-3 left-4 text-xs text-[#869398]/60 font-mono">[002]</div>
                <div className="absolute top-3 right-4 text-xs text-[#869398]/60 border border-[#222d38]/60 px-1.5 py-0.5 font-mono">DMG</div>
                <svg className="w-10 h-10 mb-4 fill-current text-[#4cd6fb]/80 group-hover:text-[#4cd6fb] transition-colors" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94 1.07.08 2.16-.52 2.82-1.33z"/>
                </svg>
                <h3 className="text-sm tracking-[0.25em] font-bold text-white mb-2 uppercase group-hover:text-[#4cd6fb] transition-colors">MACOS</h3>
                <p className="text-xs tracking-widest text-[#869398]/70 group-hover:text-[#4cd6fb]/60 transition-colors">UNIVERSAL / V 2.1.4</p>
              </button>
            </a>

            {/* LINUX */}
            <a href="/downloads/game-linux-x86_64.AppImage" download className="block w-full no-underline text-inherit">
              <button
                ref={(el) => { cardsRef.current[2] = el; }}
                className="init-dl-card w-full bg-[#04070a] border border-[#222d38] flex flex-col items-center justify-center pt-10 pb-8 px-6 group relative hover:bg-[#0c141c] hover:border-[#4cd6fb]"
              >
                <div className="absolute top-3 left-4 text-xs text-[#869398]/60 font-mono">[003]</div>
                <div className="absolute top-3 right-4 text-xs text-[#869398]/60 border border-[#222d38]/60 px-1.5 py-0.5 font-mono">APPIMAGE</div>
                <svg className="w-10 h-10 mb-4 fill-current text-[#4cd6fb]/80 group-hover:text-[#4cd6fb] transition-colors" viewBox="0 0 24 24">
                  <path d="M2 3h20v18H2V3zm2 2v14h16V5H4zm3 3h2v2H7V8zm3 3h2v2h-2v-2zm3 3h4v2h-4v-2z"/>
                </svg>
                <h3 className="text-sm tracking-[0.25em] font-bold text-white mb-2 uppercase group-hover:text-[#4cd6fb] transition-colors">LINUX</h3>
                <p className="text-xs tracking-widest text-[#869398]/70 group-hover:text-[#4cd6fb]/60 transition-colors">X86_64 / V 2.1.4</p>
              </button>
            </a>

          </div>

          {/* System requirements */}
          <div className="w-full max-w-3xl bg-[#04070a] border border-[#222d38] p-6 md:p-8">
            <div className="flex items-start gap-6">
              <div className="text-sm font-bold text-[#869398] border border-[#222d38] px-2.5 py-0.5 bg-black/20 select-none flex-shrink-0">i</div>
              <div className="w-full">
                <h4 className="text-sm md:text-base font-bold text-white tracking-[0.2em] uppercase mb-3">
                  СИСТЕМНЫЕ ТРЕБОВАНИЯ
                </h4>
                <p className="text-sm text-[#869398] tracking-wide leading-relaxed text-justify md:pr-4">
                  Для стабильной работы симуляции требуется не менее 8GB оперативной памяти и видеокарта с поддержкой аппаратного ускорения. Убедитесь, что ваши драйверы обновлены до последней версии во избежание системных сбоев во время рендеринга среды.
                </p>
              </div>
            </div>
          </div>

        </div>

      </main>

      <RealityFooter />
    </div>
  );
}
