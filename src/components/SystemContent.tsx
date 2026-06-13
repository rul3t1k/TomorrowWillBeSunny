"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { track } from "@/lib/analytics";
import RealityFooter from "./RealityFooter";

interface LogEntry { text: string; cls: string; }

const INITIAL_LOGS: LogEntry[] = [
  { text: "> ЗАПРОС К СЕРВЕРУ ОТПРАВЛЕН:",       cls: "text-[#869398]/50" },
  { text: "> ОТВЕТ ПОЛУЧЕН (12ms)",               cls: "text-[#4cd6fb]/90" },
  { text: "> РАСШИФРОВКА ПОТОКА ДАННЫХ:",         cls: "text-[#869398]/50" },
  { text: "> ПОПЫТКА РУЧНОГО ПЕРЕКЛЮЧЕНИЯ...",    cls: "text-[#869398]/50" },
  { text: "> ПЕРЕКЛЮЧЕНИЕ ПРИНЯТО.",              cls: "text-[#4cd6fb]/90" },
];

const NOISE = ["@", "%", "&", "?", "1", "0", "$", "#", "!", "X", "Z", "§", "*", "W"];

export default function SystemContent() {
  const [popupDir, setPopupDir] = useState<string | null>(null);
  const [input, setInput]       = useState("");
  const [logs, setLogs]         = useState<LogEntry[]>(INITIAL_LOGS);
  const logsRef = useRef<HTMLDivElement>(null);
  const trackedSelectionRef = useRef(false);

  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    const handler = () => {
      const sel = window.getSelection();
      const txt = sel?.toString() ?? "";
      document.querySelectorAll<HTMLElement>(".secret-content").forEach((el) => {
        const orig = el.getAttribute("data-original") ?? "";
        if (txt && sel?.containsNode(el, true)) {
          // Трекаем первое выделение скрытого текста за сессию
          if (!trackedSelectionRef.current) {
            trackedSelectionRef.current = true;
            track("hidden_text_selected", { snippet: orig.slice(0, 30) });
          }
          let g = "";
          for (const ch of orig) g += ch === " " ? " " : NOISE[Math.floor(Math.random() * NOISE.length)];
          el.innerText = g;
        } else {
          if (el.innerText !== orig) el.innerText = orig;
        }
      });
    };
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, []);

  const sendCmd = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;
    setLogs((p) => [...p, { text: `> ${cmd.toUpperCase()}`, cls: "text-[#4cd6fb] font-bold mt-1" }]);
    setInput("");
  }, [input]);

  const purge = useCallback(() => {
    setLogs((p) => [
      ...p,
      { text: "> EXECUTE_PURGE COMMAND SENT...",          cls: "text-[#ffb4ab] font-bold mt-1" },
      { text: "> INITIALIZING HARD PURGE PROTOCOL",       cls: "text-[#4cd6fb]/70" },
      { text: "> ACCESS DENIED: OVERRIDE PROTECTION ACTIVE", cls: "text-[#ffb4ab] animate-pulse text-glow" },
    ]);
  }, []);

  return (
    <div style={{ paddingTop: "80px", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
      <main className="flex-1 flex flex-col md:flex-row three-col content-px pb-8 gap-4 z-30 relative pt-8 md:pt-10">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-full md:w-1/4 flex flex-col gap-4">
          <div className="panel-border p-4 h-full flex flex-col cyan-glow relative">
            <div className="absolute top-1 right-2 text-[8px] text-[#869398]/30 select-none">MODULE_01</div>
            <div className="text-[11px] text-[#4cd6fb]/60 mb-4 uppercase tracking-[0.15em] border-b border-[#3d494d]/30 pb-1 select-none">
              {"// СТРУКТУРА_ДАННЫХ"}
            </div>
            <ul className="flex flex-col gap-1 text-[12px]">
              <li
                onClick={() => setPopupDir("/ROOT")}
                className="list-row pb-1.5 pt-1 flex items-center gap-2 text-[#bcc9ce] hover:text-[#4cd6fb] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs text-[#869398]/60">folder</span>
                <span className="tracking-wide">/ROOT</span>
              </li>
              <li className="list-row pb-1.5 pt-1 flex items-center gap-2 text-[#4cd6fb] bg-[#4cd6fb]/5 pl-3 border-l border-[#4cd6fb]/30">
                <span className="material-symbols-outlined text-xs text-[#4cd6fb]">folder_open</span>
                <span className="font-bold tracking-wide text-glow">/SENSITIVE</span>
              </li>
              <li className="list-row pb-1.5 pt-1 flex items-center gap-2 text-[#4cd6fb]/90 pl-6 min-w-0">
                <span className="material-symbols-outlined text-xs text-[#4cd6fb]/90 shrink-0">description</span>
                <span className="tracking-wide truncate">BIOMETRICS.LOG</span>
              </li>
              <li
                onClick={() => setPopupDir("/PROJECT_ADELAIDE")}
                className="list-row pb-1.5 pt-1 flex items-center gap-2 text-[#bcc9ce] hover:text-[#4cd6fb] transition-colors pl-3 min-w-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs text-[#869398]/60 shrink-0">folder</span>
                <span className="tracking-wide truncate">/PROJECT_ADELAIDE</span>
              </li>
              <li
                onClick={() => setPopupDir("/LOGS")}
                className="list-row pb-1.5 pt-1 flex items-center gap-2 text-[#bcc9ce] hover:text-[#4cd6fb] transition-colors pl-6 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs text-[#869398]/60">folder</span>
                <span className="tracking-wide">/LOGS</span>
              </li>
            </ul>
            <div className="mt-auto pt-4 border-t border-[#3d494d]/30 text-[12px] flex flex-col gap-1 select-none">
              <div className="text-[#869398]/40 text-[10px] uppercase tracking-widest mb-1">--- STATUS_PANEL ---</div>
              <div className="flex justify-between">
                <span className="text-[#869398]/70">СОЕДИНЕНИЕ:</span>
                <span className="text-[#4cd6fb] text-glow">ESTABLISHED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#869398]/70">БЕЗОПАСНОСТЬ:</span>
                <span className="text-[#ffb4ab] font-bold">REDACTED</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── CENTER MANIFEST ── */}
        <section className="manifest-section w-full md:w-2/4 flex flex-col gap-4">
          <div className="panel-border p-6 h-full flex flex-col relative cyan-glow border-[#4cd6fb]/40 shadow-[0_0_20px_rgba(27,79,191,0.1)]">
            <div className="absolute top-0 left-0 bg-[#1B4FBF] text-[#0e1416] px-3 py-0.5 text-[9px] uppercase tracking-[0.2em] font-bold select-none">
              VIEWER_V1.4 // SECURE_TEXT
            </div>
            <div className="absolute top-0 right-2 text-[9px] text-[#869398]/30 select-none pt-0.5">ERR_774-B</div>

            <h1 className="glitch-text text-[24px] text-[#4cd6fb] mt-4 mb-4 border-b border-[#4cd6fb]/20 pb-2 w-full uppercase tracking-[0.08em] font-bold text-glow select-none">
              CORE_MANIFEST_RAW
            </h1>

            <div className="manifest-scroll text-[13px] text-[#bcc9ce] flex flex-col gap-4 leading-relaxed pr-2">
              <p className="secure-log-p">
                <span className="text-[#4cd6fb]/40 mr-1 select-none">[00:00:01]</span>
                <span>ПОСЛЕДОВАТЕЛЬНОСТЬ ЗАПУСКА ПОДТВЕРЖДЕНА. ОБНАРУЖЕНА КОТЛЕТА </span>
                <span className="secret-content" data-original="РАЗОГРЕТАЯ СОЛНЦЕМ">РАЗОГРЕТАЯ СОЛНЦЕМ</span>
                <span> НА БАРДАЧКЕ ТРАНСПОРТНОГО СРЕДСТВА.</span>
              </p>
              <p className="secure-log-p">
                <span className="text-[#4cd6fb]/40 mr-1 select-none">[00:00:15]</span>
                <span>СУБЪЕКТ </span>
                <span className="redacted-hint" data-hover="&gt; ЛИЗИКА">[ ЖЕНЩИНА С РУСЫМИ ВОЛОСАМИ ]</span>
                <span> ПРОЯВЛЯЕТ КРИТИЧЕСКУЮ АКТИВНОСТЬ В КОРИДОРЕ </span>
                <span className="secret-content" data-original="С ВЕДРОМ И РАСТВОРОМ">С ВЕДРОМ И РАСТВОРОМ</span>
                <span> КОММУНАЛЬНОЙ КВАРТИРЫ.</span>
              </p>
              <p className="secure-log-p">
                <span className="text-[#4cd6fb]/40 mr-1 select-none">[00:01:42]</span>
                <span className="text-[#ffb77d] select-none">ПРЕДУПРЕЖДЕНИЕ: </span>
                <span>НАРУШЕНИЕ ЦЕЛОСТНОСТИ ТРАНСПОРТНОГО МОДУЛЯ </span>
                <span className="secret-content" data-original="МАРШРУТКА №7 // АДЕЛАИДА">МАРШРУТКА №7 // АДЕЛАИДА</span>
                <span>. ПРОТОКОЛ «АСФАЛЬТОУКЛАДЧИК» АКТИВИРОВАН.</span>
              </p>

              <div className="mt-4 border border-[#ffb4ab]/20 bg-[#93000a]/[0.03] p-4 relative select-none">
                <div className="text-[#ffb4ab] text-[11px] mb-2 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#ffb77d] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21H23L12 2ZM12 6L19.53 19H4.47L12 6ZM11 10V14H13V10H11ZM11 16V18H13V16H11Z" />
                  </svg>
                  КРИТИЧЕСКАЯ ОШИБКА ОБНАРУЖЕНА
                </div>
                <p className="text-[#ffdad6] text-[12px] border-t border-[#ffb4ab]/10 pt-2">
                  ОБНАРУЖЕН НЕСАНКЦИОНИРОВАННЫЙ ДОСТУП К УСТРОЙСТВУ{" "}
                  <span className="redacted-hint" data-hover="&gt; УСТРОЙСТВО СЛЕЖЕНИЯ">[ ДАЛЬНОЗВОН ]</span>
                  . ТЕРМИНАЛ БУДЕТ ЗАБЛОКИРОВАН.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="w-full md:w-1/4 flex flex-col gap-4 select-none">
          {/* Stats */}
          <div className="panel-border p-4 flex flex-col relative cyan-glow">
            <div className="absolute top-0 left-0 bg-[#869398]/20 border-r border-b border-[#3d494d]/30 text-[#869398] px-2 py-0.5 text-[9px] uppercase tracking-wider">
              СТАТИСТИКА
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex flex-wrap justify-between items-center list-row pb-1 gap-x-2">
                <span className="text-[10px] text-[#869398]/60 uppercase tracking-wider shrink-0">СУБЪЕКТОВ В СЕКТОРЕ</span>
                <span className="stat-val text-[26px] text-[#4cd6fb] font-bold tracking-wide text-glow">011</span>
              </div>
              <div className="flex flex-wrap justify-between items-center list-row pb-1 gap-x-2">
                <span className="text-[10px] text-[#869398]/60 uppercase tracking-wider shrink-0">НЕЙРОСИНХРОНИЗАЦИЯ</span>
                <span className="stat-val text-[26px] text-[#ffb77d] font-bold tracking-wide">89.2%</span>
              </div>
              <div className="flex flex-wrap justify-between items-center list-row pb-1 gap-x-2">
                <span className="text-[10px] text-[#869398]/60 uppercase tracking-wider shrink-0">ЗАГРУЗКА СИСТЕМЫ</span>
                <span className="stat-val text-[26px] text-[#ffb4ab] font-bold tracking-wide animate-pulse">99.9%</span>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="panel-border p-4 flex-grow flex flex-col relative bg-[#090f11]/50 cyan-glow min-h-[260px]">
            <div className="absolute top-0 left-0 bg-[#1B4FBF] text-[#0e1416] px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold">
              ТЕРМИНАЛ
            </div>
            <div ref={logsRef} className="cyan-scroll mt-4 text-[12px] overflow-y-auto h-44 flex flex-col gap-1 leading-normal pr-1">
              {logs.map((l, i) => (
                <div key={i} className={l.cls}>{l.text}</div>
              ))}
              <div className="text-[#4cd6fb] text-glow font-bold">
                &gt; ОЖИДАНИЕ КОМАНДЫ. <span className="cursor-blink" />
              </div>
            </div>
            <div className="mt-auto pt-3 border-t border-[#3d494d]/30 flex flex-col gap-2">
              <div className="flex items-center text-[#4cd6fb] gap-1 bg-black/30 px-2 py-1.5 border border-[#3d494d]/30">
                <span className="text-[11px] select-none font-bold text-[#4cd6fb]/60">&gt;_</span>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="ENTER_CMD_"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendCmd()}
                  className="w-full bg-transparent border-none text-[#4cd6fb] focus:ring-0 focus:outline-none text-[12px] p-0 uppercase tracking-wider placeholder:text-[#4cd6fb]/20"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={sendCmd}
                  className="terminal-btn flex-1 text-[11px] py-2 border border-[#4cd6fb] bg-[#4cd6fb]/10 text-[#4cd6fb] hover:bg-[#4cd6fb] hover:text-[#0e1416] font-bold tracking-widest text-glow transition-all duration-150 shadow-[0_0_10px_rgba(76,214,251,0.15)] whitespace-nowrap"
                >
                  [ SEND_CMD ]
                </button>
                <button
                  onClick={purge}
                  className="terminal-btn flex-1 text-[11px] py-2 border border-[#ffb4ab]/40 bg-[#93000a]/[0.02] text-[#ffb4ab]/80 hover:border-[#ffb4ab] hover:bg-[#ffb4ab] hover:text-[#0e1416] font-bold tracking-widest transition-all duration-150 whitespace-nowrap"
                >
                  [ SYS_PURGE ]
                </button>
              </div>
            </div>
          </div>
        </aside>

      </main>

      <RealityFooter />

      {/* Popup */}
      {popupDir && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center select-none"
          onClick={() => setPopupDir(null)}
        >
          <div
            className="border-2 border-[#ffb4ab]/60 bg-[#070a0e] p-8 max-w-lg w-full mx-4 shadow-[0_0_40px_rgba(239,68,68,0.25)] flex flex-col gap-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 bg-[#ffb4ab] text-[#0e1416] px-3 py-0.5 text-[9px] font-bold tracking-widest uppercase">
              [ SECURITY_ALERT ]
            </div>
            <div className="text-[#ffb4ab] font-bold text-[15px] tracking-[0.18em] uppercase border-b border-[#ffb4ab]/20 pb-3 flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined text-lg">gpp_maybe</span>
              ДОСТУП ОГРАНИЧЕН // КОД_403
            </div>
            <p className="text-[13px] text-[#bcc9ce] leading-relaxed">
              Критическая ошибка ядра безопасности. Запрашиваемая директория{" "}
              <span className="text-[#ffb4ab] font-bold text-glow">{popupDir}</span>{" "}
              находится под строжайшим карантином протокола Adelaide.
            </p>
            <button
              onClick={() => setPopupDir(null)}
              className="mt-3 border border-[#ffb4ab] text-[#ffb4ab] text-[12px] py-2.5 uppercase tracking-widest font-bold bg-transparent hover:bg-[#ffb4ab] hover:text-[#0e1416] transition-colors duration-150"
            >
              [ ЗАКРЫТЬ_ПРОТОКОЛ ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
