"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-15T12:00:00+03:00").getTime();

function pad(n: number) {
  return n < 10 ? "0" + n : String(n);
}

export default function Countdown() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    function tick() {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setExpired(true);
        return;
      }
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

  if (expired) return null;

  return (
    <div id="release-info-wrapper">
      <h2
        className="font-oswald text-sim-red uppercase tracking-wider mb-2"
        style={{ fontSize: "64px", letterSpacing: "-0.03em" }}
      >
        НЕ ПРОПУСТИТЕ Р<span style={{ letterSpacing: "0em" }}>Е</span>ЛИЗ
      </h2>
      <p
        className="font-cormorant italic text-xl text-sim-muted mb-10"
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "22px",
          lineHeight: "30.8px",
          color: "rgb(242,237,218)",
          fontWeight: 300,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Антиутопия. Страна Советов. 2029 год.
      </p>

      <div className="flex justify-center gap-4 md:gap-8 mb-16">
        {[
          { label: "01-ДНИ", value: time.d, unit: "Дней" },
          { label: "02-ЧАСЫ", value: time.h, unit: "Часов" },
          { label: "03-МИНУТЫ", value: time.m, unit: "Минут" },
          { label: "04-СЕКУНДЫ", value: time.s, unit: "Секунд" },
        ].map(({ label, value, unit }) => (
          <div
            key={label}
            className="bg-[#25231a] border border-[#3a3628] w-28 md:w-36 h-28 md:h-32 flex flex-col items-center justify-center relative shadow-[4px_4px_0px_#000]"
          >
            <span className="absolute top-1 left-2 font-tech text-[10px] text-sim-muted uppercase">
              {label}
            </span>
            <span className="font-oswald text-4xl md:text-5xl text-sim-gold mt-2">{value}</span>
            <span className="font-tech text-xs text-sim-muted tracking-widest uppercase mt-4">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
