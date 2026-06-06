"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-15T12:00:00+03:00").getTime();
function pad(n: number) { return n < 10 ? "0" + n : String(n); }

export default function RealityCountdown() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [expired, setExpired] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    function tick() {
      const diff = TARGET - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTime({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSubmitted(true); setSending(false); }, 1300);
  }

  const timerCells = [
    { label: "TMR-01", sub: "ACK",  value: time.d, unit: "Дней",   pulse: false },
    { label: "TMR-02", sub: "SYNC", value: time.h, unit: "Часов",  pulse: false },
    { label: "TMR-03", sub: "RUN",  value: time.m, unit: "Минут",  pulse: false },
    { label: "TMR-04", sub: "LIVE", value: time.s, unit: "Секунд", pulse: true  },
  ];

  return (
    <section className="mx-[72px] mb-24">
      <div className="border border-bg-surface bg-gradient-to-b from-black to-bg-surface/30 p-8 md:p-10 text-center space-y-12 max-w-4xl mx-auto relative shadow-xl">
        <div className="absolute top-3 left-4 font-tech text-[9px] text-muted-gray tracking-widest uppercase">[CONSOLE_NODE_REG]</div>

        {!expired && (
          <div className="space-y-12">
            <div className="space-y-2">
              <h2 className="font-tech text-3xl md:text-4xl font-black uppercase tracking-widest text-white">Не пропустите релиз</h2>
              <p className="font-tech text-xs text-muted-gray uppercase tracking-[0.3em]">Антиутопия. Страна Советов. 2029 год.</p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto" id="timer-grid">
              {timerCells.map(({ label, sub, value, unit, pulse }) => (
                <div key={label} className="bg-black border border-[#1E293B] relative flex flex-col items-center justify-center pt-9 pb-6">
                  <div className="timer-top-label absolute top-0 inset-x-0 bg-[#0D1117] border-b border-[#1E293B] h-5 flex justify-between items-center px-2 font-tech text-[8px] text-muted-gray">
                    <span>{label}</span>
                    <span className={pulse ? "text-alert-red/50 animate-pulse" : "text-accent-cyan/40"}>● {sub}</span>
                  </div>
                  <div className="text-5xl font-black text-accent-cyan crt-glow leading-none tracking-tight font-tech">{value}</div>
                  <span className="timer-label font-tech text-xs text-slate-400 font-bold uppercase tracking-[0.3em] mt-4 border-t border-bg-surface pt-2 w-20 text-center">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`max-w-xl mx-auto flex flex-col pt-8 border-t border-bg-surface/80 transition-all duration-500${expired ? " !max-w-2xl" : ""}`}>
          {!submitted ? (
            <>
              <div className="font-tech text-xs text-accent-cyan uppercase tracking-[0.25em] font-bold crt-glow mb-8">
                {sending ? "[ ОТПРАВКА СИГНАЛА НА СЕРВЕР... ]" : "[ ПОДПИШИТЕСЬ НА НОВОСТИ ]"}
              </div>
              <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="> ВВЕДИТЕ АДРЕС ПОЧТОВОГО ЯЩИКА..."
                  className="flex-grow bg-bg-main border-2 border-bg-surface font-tech text-xs px-5 py-4 text-white focus:outline-none focus:border-accent-cyan transition-all uppercase tracking-wider placeholder:text-muted-gray"
                />
                <button
                  type="submit"
                  className="glow-button relative group/btn border-2 border-accent-cyan/40 px-8 py-4 bg-black text-accent-cyan font-tech text-xs uppercase tracking-widest font-bold overflow-hidden hover:border-accent-cyan"
                >
                  <span className="relative z-10 transition-colors duration-200">ПОДПИСАТЬСЯ</span>
                  <div className="absolute inset-0 w-0 bg-accent-cyan transition-all duration-200 group-hover/btn:w-full -z-0" />
                </button>
              </form>
            </>
          ) : (
            <div className="border-2 border-accent-cyan/30 bg-accent-cyan/5 p-5 text-left space-y-2">
              <div className="font-tech text-accent-cyan font-bold tracking-widest text-xs uppercase crt-glow">
                &gt; ПОДКЛЮЧЕНИЕ УСПЕШНО. КАНАЛ СИНХРОНИЗИРОВАН.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
