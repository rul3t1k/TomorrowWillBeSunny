"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
  const [currentIdx, setCurrentIdx]         = useState(-1);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [nowLabel, setNowLabel]             = useState("Готов к воспроизведению");
  const [timers, setTimers]                 = useState<string[]>(TRACKS.map(t => fmt(t.dur)));

  const meterLRef     = useRef<HTMLDivElement>(null);
  const meterRRef     = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (isPlaying) startVU();
    else           stopVU();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

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
    oscListRef.current.forEach(o => { try { o.stop((ctx?.currentTime ?? 0) + 0.5); } catch {} });
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
      const l = Math.sin(t * 2.3) * 12 + Math.sin(t * 5.1) * 6;
      const r = Math.sin(t * 1.9 + 1) * 10 + Math.sin(t * 4.7 + 0.5) * 8;
      if (meterLRef.current) meterLRef.current.style.transform = `rotate(${l.toFixed(1)}deg)`;
      if (meterRRef.current) meterRRef.current.style.transform = `rotate(${r.toFixed(1)}deg)`;
      vuRafRef.current = requestAnimationFrame(frame);
    }
    vuRafRef.current = requestAnimationFrame(frame);
  }

  function stopVU() {
    if (vuRafRef.current != null) { cancelAnimationFrame(vuRafRef.current); vuRafRef.current = null; }
    if (meterLRef.current) meterLRef.current.style.transform = "rotate(-15deg)";
    if (meterRRef.current) meterRRef.current.style.transform = "rotate(5deg)";
  }

  function startTimer() {
    if (timerIntRef.current) clearInterval(timerIntRef.current);
    timerIntRef.current = setInterval(() => {
      if (remainingRef.current > 0) {
        remainingRef.current--;
        const rem = remainingRef.current;
        const idx = currentIdxRef.current;
        setTimers(prev => prev.map((t, i) => i === idx ? fmt(rem) : t));
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
    setNowLabel(TRACKS[idx].title);
    setTimers(TRACKS.map((t, i) => i === idx ? fmt(t.dur) : fmt(t.dur)));
    setIsPlaying(true);

    const audio = new Audio(TRACKS[idx].src);
    audio.volume = 0.7;
    audio.play().catch(() => startOscillators(idx));
    audio.addEventListener("ended", () => advanceRef.current(1));
    audioElRef.current = audio;

    startTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleStop = useCallback(() => {
    if (timerIntRef.current) clearInterval(timerIntRef.current);
    audioElRef.current?.pause();
    stopOscillators();
    setIsPlaying(false);
    setNowLabel("Готов к воспроизведению");
    setCurrentIdx(-1);
    currentIdxRef.current = -1;
    setTimers(TRACKS.map(t => fmt(t.dur)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">

      {/* LEFT: TAPE PLAYER */}
      <div className={`lg:col-span-8 bg-surface-container-high border-2 border-outline-variant p-8 pt-12 relative shadow-[8px_8px_0px_#000]${isPlaying ? " is-playing" : ""}`}>
        <div className="absolute top-3 right-4 border border-outline px-2 py-0.5 flex items-center bg-surface-dim z-10">
          <span className="font-label text-[11px] text-outline uppercase tracking-[0.3em]">Модель Электроника-302</span>
        </div>

        {/* Cassette window */}
        <div className="cassette-window bg-surface-dim border-4 border-surface-container-lowest h-64 mb-8 flex items-center justify-center relative overflow-hidden scanlines p-4 mt-2">
          <div className="cassette-inner w-full max-w-md h-40 bg-inverse-surface rounded flex items-center justify-between px-8 relative shadow-inner">
            {/* Reel L */}
            <div className="reel w-20 h-20 rounded-full border-4 border-surface-container bg-surface-bright flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-surface-container-lowest" />
              <div className="w-full h-1 bg-surface-container-lowest absolute" />
              <div className="w-1 h-full bg-surface-container-lowest absolute" />
            </div>
            {/* Label */}
            <div className="cassette-label bg-surface-container-lowest px-4 py-2 text-center flex flex-col z-10">
              <span className="font-label text-[11px] text-secondary uppercase">Сторона А</span>
              <span className="font-label text-[10px] text-on-surface uppercase mt-1">{nowLabel}</span>
            </div>
            {/* Reel R */}
            <div className="reel w-20 h-20 rounded-full border-4 border-surface-container bg-surface-bright flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-surface-container-lowest" />
              <div className="w-full h-1 bg-surface-container-lowest absolute" />
              <div className="w-1 h-full bg-surface-container-lowest absolute" />
            </div>
            <div className="cassette-tape-bar absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 tape-gradient border-t border-surface-container-lowest" />
          </div>
        </div>

        {/* Controls row */}
        <div className="controls-row flex justify-between items-end border-t-2 border-outline-variant pt-6 gap-4 flex-wrap">
          {/* VU Meters */}
          <div className="player-vu flex space-x-4 bg-surface-container p-3 border border-outline">
            <div className="w-24 h-16 bg-[#e7e3d0] relative border border-surface-container-lowest overflow-hidden">
              <div className="absolute top-2 w-full flex justify-between px-2">
                <span className="font-label text-[8px] text-surface-container-lowest">-20</span>
                <span className="font-label text-[8px] text-error">0</span>
                <span className="font-label text-[8px] text-error">+3</span>
              </div>
              <div
                ref={meterLRef}
                className="w-1 h-16 bg-error absolute bottom-[-10px] left-1/2 meter-dial"
                style={{ transform: "rotate(-15deg)" }}
              />
            </div>
            <div className="w-24 h-16 bg-[#e7e3d0] relative border border-surface-container-lowest overflow-hidden">
              <div className="absolute top-2 w-full flex justify-between px-2">
                <span className="font-label text-[8px] text-surface-container-lowest">-20</span>
                <span className="font-label text-[8px] text-error">0</span>
                <span className="font-label text-[8px] text-error">+3</span>
              </div>
              <div
                ref={meterRRef}
                className="w-1 h-16 bg-error absolute bottom-[-10px] left-1/2 meter-dial"
                style={{ transform: "rotate(5deg)" }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="player-btns-row flex space-x-2">
            <button
              onClick={handleStop}
              className="player-btn w-20 h-14 bg-surface-variant border border-outline plastic-button flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-on-surface text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stop</span>
            </button>
            <button
              onClick={() => { if (currentIdxRef.current >= 0) advanceRef.current(-1); }}
              className="player-btn w-20 h-14 bg-surface-variant border border-outline plastic-button flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-on-surface text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>fast_rewind</span>
            </button>
            <button
              onClick={togglePlay}
              className="player-btn w-20 h-14 bg-primary-container border border-primary-container plastic-button flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              onClick={() => { if (currentIdxRef.current >= 0) advanceRef.current(1); }}
              className="player-btn w-20 h-14 bg-surface-variant border border-outline plastic-button flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-on-surface text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>fast_forward</span>
            </button>
            <button
              className="player-btn w-20 h-14 bg-surface-variant border border-outline plastic-button flex items-center justify-center cursor-pointer"
              aria-label="Запись"
            >
              <span className="material-symbols-outlined text-error text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_manual_record</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: TRACK LIST */}
      <div className="track-card lg:col-span-4 bg-[#e7e3d0] border border-outline-variant p-6 text-surface-container-lowest shadow-[10px_10px_0px_rgba(0,0,0,0.5)] relative transform rotate-1 flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHBhdGggZD0iTTAgMEg0VjRIMGoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')" }}
        />
        <div>
          <h3 className="font-h2 text-[38px] font-bold text-surface-container-lowest uppercase mb-5 border-b-2 border-surface-container-lowest pb-2 tracking-[-0.03em] leading-none">
            Список композиций
          </h3>
          <ul className="text-surface-container-lowest space-y-0.5">
            {TRACKS.map((track, i) => {
              const active = i === currentIdx;
              return (
                <li
                  key={i}
                  onClick={() => playTrack(i)}
                  className={`track-item group border-b border-surface-container-lowest border-dotted py-[8px] relative pl-7 pr-2 -mx-2 rounded-[2px] transition-all duration-150 hover:bg-[#d6cfbe]${active ? " track-active" : ""}`}
                >
                  <span
                    className="vol-icon absolute left-2 top-[12px] material-symbols-outlined text-[#b02d21]"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: "13px" }}
                  >volume_up</span>
                  <div className="flex justify-between items-baseline">
                    <span className="track-title font-body text-[14px] tracking-[1.4px] font-normal">
                      {String(i + 1).padStart(2, "0")}. {track.title}
                    </span>
                    <span className="track-timer font-label text-[14px] leading-[20px] tracking-[1.4px] text-[#1C1A12] font-normal ml-3 shrink-0">
                      {timers[i]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-6 border-t-2 border-surface-container-lowest pt-2 flex justify-between font-body text-[11px] tracking-[1.4px]">
          <span className="uppercase">ФОРМАТ: МАГНИТНАЯ ЛЕНТА</span>
          <span className="uppercase">ИНВ. № 847-Б</span>
        </div>
      </div>

    </div>
  );
}
