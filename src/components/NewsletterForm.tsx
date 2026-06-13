"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSubmitted(true); setSending(false); }, 1300);
  }

  return (
    <div id="newsletter-box" className="bg-[#1a1811] px-6 py-10 border border-[#3a3628] shadow-[6px_6px_0px_#000]">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {!submitted ? (
          <>
            {sending && (
              <div className="flex items-center justify-center gap-3 py-2">
                <span className="material-symbols-outlined text-sim-gold text-xl animate-spin">autorenew</span>
                <span className="font-tech text-xs text-sim-muted tracking-[0.2em] uppercase animate-pulse">
                  Отправка данных в систему...
                </span>
              </div>
            )}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-300 overflow-hidden items-center${sending ? " opacity-40 pointer-events-none" : ""}`}
              id="form-inputs-wrapper"
            >
              <input
                className="flex-grow bg-[#25231a] border border-[#3a3628] px-4 py-3 font-tech text-lg text-sim-surface focus:outline-none focus:border-sim-gold focus:ring-0 placeholder:text-sim-muted/60 placeholder:tracking-widest"
                placeholder="ВАШ E-MAIL"
                required
                type="email"
              />
              <button
                className="bg-sim-red text-sim-surface font-oswald uppercase px-8 py-3 tracking-wider hover:bg-sim-red-hover transition-colors whitespace-nowrap self-center"
                style={{
                  fontFamily: "Oswald,sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "28px",
                }}
                type="submit"
              >
                ПОДПИСАТЬСЯ
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-4" id="success-message">
            <span className="material-symbols-outlined text-sim-gold text-4xl mb-2">check_circle</span>
            <p className="font-oswald text-sim-gold text-xl tracking-widest">СПАСИБО ЗА ПОДПИСКУ!</p>
            <p className="font-tech text-xs text-sim-muted tracking-[0.2em] mt-1">ВАШ ДОСТУП ПОДТВЕРЖДЕН.</p>
          </div>
        )}
      </form>
    </div>
  );
}
