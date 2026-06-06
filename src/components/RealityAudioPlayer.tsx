"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import RealityFooter from "./RealityFooter";

const TRACKS = [
  { title: "ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ",      dur: 252, src: "audio/track-01.mp3" },
  { title: "ПУСТЫЕ КОРИДОРЫ НИИ",        dur: 390, src: "audio/track-02.mp3" },
  { title: "ГУЛ ВЫЧИСЛИТЕЛЬНОЙ МАШИНЫ",  dur: 165, src: "audio/track-03.mp3" },
  { title: "СБОЙ АЛГОРИТМА",             dur: 355, src: "audio/track-04.mp3" },
  { title: "ТРЕВОЖНАЯ КНОПКА (КРАСНАЯ)", dur: 200, src: "audio/track-05.mp3" },
  { title: "ФИНАЛЬНЫЙ ОТЧЕТ",            dur: 490, src: "audio/track-06.mp3" },
];

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const [currentIdx, setCurrentIdx]     = useState(-1);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [timerDisplay, setTimerDisplay] = useState("");
  const [barWidth, setBarWidth]         = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const vuLRef = useRef<HTMLDivElement>(null);
  const vuRRef = useRef<HTMLDivElement>(null);

  const audioElRef    = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef   = useRef<AudioContext | null>(null);
  const oscListRef    = useRef<OscillatorNode[]>([]);
  const gainRef       = useRef<GainNode | null>(null);
  const timerIntRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const vuRafRef      = useRef<number | null>(null);
  const remainingRef  = useRef(0);
  const currentIdxRef = useRef(-1);
  const isPlayingRef  = useRef(false);
  const advanceRef    = useRef<(dir: number) => void>(() => {});

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  /* Pause SVG on mount */
  useEffect(() => { svgRef.current?.pauseAnimations(); }, []);

  /* Toggle SVG + VU when playing state changes */
  useEffect(() => {
    if (isPlaying) { svgRef.current?.unpauseAnimations(); startVU(); }
    else           { svgRef.current?.pauseAnimations();   stopVU();  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  /* Cleanup */
  useEffect(() => () => {
    if (timerIntRef.current) clearInterval(timerIntRef.current);
    if (vuRafRef.current != null) cancelAnimationFrame(vuRafRef.current);
    audioElRef.current?.pause();
    stopOscillators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCtx(): AudioContext {
    if (!audioCtxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioCtxRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current!;
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function stopOscillators() {
    const ctx = audioCtxRef.current;
    if (gainRef.current && ctx) {
      try { gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); } catch {}
    }
    oscListRef.current.forEach(o => {
      try { o.stop((ctx?.currentTime ?? 0) + 0.5); } catch {}
    });
    oscListRef.current = [];
    gainRef.current = null;
  }

  function startOscillators(idx: number) {
    stopOscillators();
    const ctx = getCtx();
    const gn  = ctx.createGain();
    gn.gain.setValueAtTime(0, ctx.currentTime);
    gn.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.8);
    gn.connect(ctx.destination);
    gainRef.current = gn;
    const bases = [110, 98, 130, 105, 120, 92];
    const base  = bases[idx % bases.length];
    [1, 2.007, 3.014, 0.502].forEach(m => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = base * m;
      o.connect(gn);
      o.start();
      oscListRef.current.push(o);
    });
  }

  function startVU() {
    function frame() {
      const t = Date.now() / 1000;
      const l = Math.sin(t * 2.3) * 20 + 12;
      const r = Math.sin(t * 1.9 + 1) * 18 + 28;
      if (vuLRef.current) vuLRef.current.style.transform = `rotate(${l.toFixed(1)}deg)`;
      if (vuRRef.current) vuRRef.current.style.transform = `rotate(${r.toFixed(1)}deg)`;
      vuRafRef.current = requestAnimationFrame(frame);
    }
    vuRafRef.current = requestAnimationFrame(frame);
  }

  function stopVU() {
    if (vuRafRef.current != null) { cancelAnimationFrame(vuRafRef.current); vuRafRef.current = null; }
    if (vuLRef.current) vuLRef.current.style.transform = "rotate(12deg)";
    if (vuRRef.current) vuRRef.current.style.transform = "rotate(28deg)";
  }

  function startTimer() {
    if (timerIntRef.current) clearInterval(timerIntRef.current);
    timerIntRef.current = setInterval(() => {
      if (remainingRef.current > 0) {
        remainingRef.current--;
        const rem = remainingRef.current;
        const dur = TRACKS[currentIdxRef.current]?.dur ?? 0;
        setTimerDisplay(fmt(rem));
        setBarWidth(dur > 0 ? ((dur - rem) / dur) * 100 : 0);
      } else {
        clearInterval(timerIntRef.current!);
        advanceRef.current(1);
      }
    }, 1000);
  }

  const playTrack = useCallback((idx: number) => {
    if (timerIntRef.current) clearInterval(timerIntRef.current);
    audioElRef.current?.pause();
    stopOscillators();

    remainingRef.current  = TRACKS[idx].dur;
    currentIdxRef.current = idx;
    setCurrentIdx(idx);
    setTimerDisplay(fmt(TRACKS[idx].dur));
    setBarWidth(0);
    setIsPlaying(true);

    const audio = new Audio(TRACKS[idx].src);
    audio.volume = 0.7;
    audio.play().catch(() => startOscillators(idx));
    audio.addEventListener("ended", () => advanceRef.current(1));
    audioElRef.current = audio;

    startTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keep advanceRef current — called by timer and audio.ended */
  advanceRef.current = (dir: number) => {
    playTrack((currentIdxRef.current + dir + TRACKS.length) % TRACKS.length);
  };

  const togglePlay = useCallback(() => {
    if (currentIdxRef.current < 0) { playTrack(0); return; }
    if (isPlayingRef.current) {
      audioElRef.current?.pause();
      stopOscillators();
      if (timerIntRef.current) clearInterval(timerIntRef.current);
      setIsPlaying(false);
    } else {
      const audio = audioElRef.current;
      if (audio?.src) {
        audio.play().catch(() => startOscillators(currentIdxRef.current));
      } else {
        startOscillators(currentIdxRef.current);
      }
      startTimer();
      setIsPlaying(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playTrack]);

  return (
    <div style={{ paddingTop: "80px", flex: "1 0 auto" }}>
      <main className="flex-grow w-full content-px pb-8 flex flex-col gap-8 pt-8 md:pt-10">

        {/* ── Header ── */}
        <div className="w-full flex flex-col gap-2 border-b border-[#1b3a4b] pb-4">
          <h1 className="glitch-text text-2xl md:text-4xl text-[#4cd6fb] font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(76,214,251,0.6)]">
            АУДИОАРХИВ [РЕЖИМ: Системный лог]
          </h1>
          <div className="text-xs text-[#869398] tracking-widest uppercase flex items-center gap-2">
            <span>⊙ КАТАЛОГ // ИСТОЧНИК: НЕ ИДЕНТИФИЦИРОВАН</span>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">

          {/* LEFT: OSCILLOSCOPE PLAYER (8/12) */}
          <div className="lg:col-span-8 bg-[#0d1216] border border-[#1b3a4b] p-6 flex flex-col gap-6 relative shadow-[0_0_15px_rgba(27,58,75,0.5)]">
            <div className="absolute top-0 left-0 bg-[#00677d] text-[#05070B] font-bold text-[10px] px-3 py-1 uppercase tracking-wider">
              ОСЦИЛЛОГРАФ МОД. С1-65А // СТАТУС: АКТИВЕН
            </div>

            {/* Waveform canvas */}
            <div className="bg-[#04080b] border border-[#4cd6fb]/30 h-72 mt-4 relative flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(#4cd6fb 1px, transparent 1px), linear-gradient(90deg, #4cd6fb 1px, transparent 1px)",
                  backgroundSize: "25px 25px",
                }}
              />
              <svg ref={svgRef} className="w-full h-full relative z-10" viewBox="0 0 800 200">
                <path
                  className="drop-shadow-[0_0_6px_#4cd6fb]"
                  d="M 0 100 Q 50 30, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100"
                  fill="none" stroke="#4cd6fb" strokeWidth="2.5"
                >
                  <animate
                    attributeName="d" dur="2.5s" repeatCount="indefinite"
                    values="M 0 100 Q 50 30, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100;M 0 100 Q 50 170, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100;M 0 100 Q 50 30, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100"
                  />
                </path>
                <path
                  d="M 0 100 Q 25 60, 50 100 T 100 100 T 150 100 T 200 100 T 250 100 T 300 100 T 350 100 T 400 100 T 450 100 T 500 100 T 550 100 T 600 100 T 650 100 T 700 100 T 750 100 T 800 100"
                  fill="none" opacity="0.3" stroke="#00b4d8" strokeWidth="1.5"
                >
                  <animate
                    attributeName="d" dur="1.8s" repeatCount="indefinite"
                    values="M 0 100 Q 25 60, 50 100 T 100 100 T 150 100 T 200 100 T 250 100 T 300 100 T 350 100 T 400 100 T 450 100 T 500 100 T 550 100 T 600 100 T 650 100 T 700 100 T 750 100 T 800 100;M 0 100 Q 25 140, 50 100 T 100 100 T 150 100 T 200 100 T 250 100 T 300 100 T 350 100 T 400 100 T 450 100 T 500 100 T 550 100 T 600 100 T 650 100 T 700 100 T 750 100 T 800 100;M 0 100 Q 25 60, 50 100 T 100 100 T 150 100 T 200 100 T 250 100 T 300 100 T 350 100 T 400 100 T 450 100 T 500 100 T 550 100 T 600 100 T 650 100 T 700 100 T 750 100 T 800 100"
                  />
                </path>
              </svg>
              <div className="absolute bottom-2 right-4 text-[9px] text-[#4cd6fb]/40 tracking-widest">
                SYNC: INTERNAL
              </div>
            </div>

            {/* Controls row */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 mt-2">

              {/* VU Meters */}
              <div className="flex gap-3 border border-[#1b3a4b] p-2 bg-[#090f11]">
                {/* L */}
                <div className="w-20 h-14 border border-[#1b3a4b] relative overflow-hidden bg-[#05070B] flex flex-col justify-end p-1">
                  <span className="text-[8px] text-[#869398] absolute top-1 left-1 font-bold">L</span>
                  <div
                    ref={vuLRef}
                    className="w-[1px] h-10 bg-[#ffb4ab] absolute bottom-0 left-[35%] origin-bottom shadow-[0_0_4px_#ffb4ab]"
                    style={{ transform: "rotate(12deg)" }}
                  />
                  <div className="flex justify-between text-[7px] text-[#869398] border-t border-[#1b3a4b]/50 pt-0.5">
                    <span>-20</span><span>0</span><span className="text-[#ffb4ab]">+3</span>
                  </div>
                </div>
                {/* R */}
                <div className="w-20 h-14 border border-[#1b3a4b] relative overflow-hidden bg-[#05070B] flex flex-col justify-end p-1">
                  <span className="text-[8px] text-[#869398] absolute top-1 left-1 font-bold">R</span>
                  <div
                    ref={vuRRef}
                    className="w-[1px] h-10 bg-[#ffb4ab] absolute bottom-0 left-[55%] origin-bottom shadow-[0_0_4px_#ffb4ab]"
                    style={{ transform: "rotate(28deg)" }}
                  />
                  <div className="flex justify-between text-[7px] text-[#869398] border-t border-[#1b3a4b]/50 pt-0.5">
                    <span>-20</span><span>0</span><span className="text-[#ffb4ab]">+3</span>
                  </div>
                </div>
              </div>

              {/* Knobs + Play */}
              <div className="flex items-center gap-5 bg-[#05070B] p-3.5 border border-[#1b3a4b]">
                <div className="flex gap-5">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 border-2 border-[#1b3a4b] bg-[#0d1216] relative flex items-center justify-center cursor-pointer hover:border-[#4cd6fb] transition-colors">
                      <div className="w-0.5 h-6 bg-[#4cd6fb] absolute top-0 origin-bottom -rotate-45" />
                    </div>
                    <span className="text-[9px] text-[#869398] tracking-wider uppercase font-bold">УСИЛЕНИЕ</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 border-2 border-[#1b3a4b] bg-[#0d1216] relative flex items-center justify-center cursor-pointer hover:border-[#4cd6fb] transition-colors">
                      <div className="w-0.5 h-6 bg-[#4cd6fb] absolute top-0 origin-bottom rotate-45" />
                    </div>
                    <span className="text-[9px] text-[#869398] tracking-wider uppercase font-bold">РАЗВЕРТКА</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 px-3 border-l border-[#1b3a4b]/50">
                  <div className="w-7 h-10 bg-[#0d1216] border border-[#1b3a4b] relative flex justify-center items-center cursor-pointer">
                    <div className="w-4 h-4 bg-[#4cd6fb] shadow-[0_0_6px_#4cd6fb] -translate-y-2 transition-transform" />
                  </div>
                  <span className="text-[9px] text-[#869398] tracking-wider uppercase font-bold">СЕТЬ</span>
                </div>

                <div className="flex gap-2 ml-2">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 border border-[#4cd6fb] text-[#4cd6fb] hover:bg-[#4cd6fb]/10 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      {isPlaying
                        ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        : <path d="M8 5v14l11-7z" />}
                    </svg>
                  </button>
                  <button
                    disabled
                    className="w-10 h-10 border border-[#869398] text-[#869398] opacity-40 cursor-not-allowed flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6 6h12v12H6z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: TRACK LIST (4/12) */}
          <div className="lg:col-span-4 bg-[#0d1216] border border-[#1b3a4b] p-6 flex flex-col gap-5 shadow-[0_0_15px_rgba(27,58,75,0.5)]">
            <h2 className="text-2xl font-bold text-[#4cd6fb] uppercase tracking-wider border-b border-[#4cd6fb] pb-3 whitespace-nowrap">
              СПИСОК КОМПОЗИЦИЙ
            </h2>

            <div className="flex flex-col gap-4">
              {TRACKS.map((track, i) => {
                const active = i === currentIdx;
                return (
                  <div
                    key={i}
                    onClick={() => playTrack(i)}
                    className="flex flex-col gap-1.5 pb-2 relative cursor-pointer"
                  >
                    <div className="flex justify-between items-start text-xs font-bold tracking-wide">
                      <span className={active ? "text-[#4cd6fb]" : "text-[#bcc9ce]"}>
                        {active ? "⊚ " : ""}{String(i + 1).padStart(2, "0")}. {track.title}
                      </span>
                      <span className={`ml-2 shrink-0 ${active ? "text-[#4cd6fb]" : "text-[#bcc9ce]"}`}>
                        {active ? timerDisplay : fmt(track.dur)}
                      </span>
                    </div>
                    {active && (
                      <div className="w-full h-[2px] bg-[#4cd6fb]/20 mt-1">
                        <div
                          className="h-full bg-[#4cd6fb] shadow-[0_0_6px_#4cd6fb]"
                          style={{ width: `${barWidth}%`, transition: "width 0.5s linear" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-[#1b3a4b]/60 flex justify-between text-[10px] text-[#869398] font-bold tracking-widest">
              <span>ФОРМАТ: ЦИФРОВОЙ ЛОГ</span>
              <span>ИНВ. № 847-Б</span>
            </div>
          </div>

        </div>
      </main>

      <RealityFooter />
    </div>
  );
}
