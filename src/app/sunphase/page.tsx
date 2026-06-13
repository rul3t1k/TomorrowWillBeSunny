import type { Metadata } from "next";
import Link from "next/link";
import RealityBody from "@/components/RealityBody";
import RealityNavbar from "@/components/RealityNavbar";
import RealityFooter from "@/components/RealityFooter";

export const metadata: Metadata = { title: "Sunphase OS" };

export default function SunphasePage() {
  return (
    <>
      <RealityBody />
      <div className="real-scanlines-overlay" aria-hidden="true" />
      <RealityNavbar activeItem="/sunphase" />

      <div style={{ paddingTop: "80px", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
        <main className="flex-1 w-full px-4 md:px-[72px] py-8 md:py-12">
          <section className="flex flex-col items-center w-full max-w-4xl mx-auto">

            {/* Title */}
            <div className="w-full mb-10 text-center relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#869398]/30 tracking-[0.3em] whitespace-nowrap">
                CRITICAL_INTERFACE_CONNECTED
              </div>
              <h2 className="glitch-text text-[54px] md:text-[76px] text-[#4cd6fb] uppercase tracking-[0.12em] font-bold text-glow opacity-95 leading-none">
                SUNPHASE_OS
              </h2>
              <p className="text-[12px] text-[#bcc9ce]/70 uppercase tracking-[0.25em] mt-4">
                СИСТЕМА УПРАВЛЕНИЯ РЕАЛЬНОСТЬЮ // АРХИВ_404
              </p>
            </div>

            {/* Terminal panel */}
            <div className="w-full border border-accent-blue panel-bg p-6 cyan-glow flex flex-col gap-2 text-[13px] text-[#4cd6fb] overflow-hidden min-h-[450px] relative">
              <div className="absolute top-2 left-2 text-[9px] text-[#869398]/40 select-none">SYS_FLOW // 0x77FF</div>
              <div className="absolute top-2 right-2 text-[9px] text-[#869398]/40 select-none">MODE: SIMULATION</div>
              <div className="absolute bottom-2 right-2 text-[9px] text-[#869398]/20 select-none">BUREAUCRACY_CORE_v2</div>

              <div className="flex flex-col gap-0.5 mt-2 text-[#869398]/90">
                <p>&gt; ЗАПУСК СИМУЛЯЦИИ... [<span className="text-[#4cd6fb] text-glow font-bold">OK</span>]</p>
                <p>&gt; ЗАГРУЗКА МОДУЛЯ СЧАСТЬЯ... [<span className="text-[#4cd6fb] text-glow font-bold">OK</span>]</p>
                <p>&gt; ПОДКЛЮЧЕНИЕ К АРХИВУ 404... <span className="text-[#ffb77d] font-bold">УСПЕШНО</span></p>
              </div>

              <div className="mt-4 p-4 bg-[#4cd6fb]/[0.03] border border-[#4cd6fb]/20 relative">
                <div className="absolute top-0 right-0 bg-[#4cd6fb]/10 px-2 py-0.5 text-[9px] text-[#4cd6fb]/60 tracking-widest">
                  LIVE_CORE
                </div>
                <p className="text-[#4cd6fb] font-bold text-[15px] tracking-wide text-glow mb-2">ЗАВТРА БУДЕТ СОЛНЕЧНО</p>
                <div className="flex flex-col gap-1 text-[12px] text-[#bcc9ce]/90 border-t border-[#4cd6fb]/10 pt-2">
                  <p className="flex items-center gap-1">
                    &gt; ПОИСК СУБЪЕКТА: <span className="text-[#4cd6fb] font-bold">ИДЕНТИФИЦИРОВАН</span>
                  </p>
                  <p className="flex items-center gap-1">
                    &gt; СТАТУС: <span className="text-[#ffb77d] animate-pulse font-bold">ОЖИДАНИЕ ВВОДА</span>
                  </p>
                  <p className="flex items-center gap-1">
                    &gt; ЛОКАЦИЯ: <span className="text-[#dee3e6] font-bold">МАРШРУТНЫЙ МОДУЛЬ №7</span>
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-[#869398]/20 select-none tracking-[0.3em] text-center my-1">
                --- ERROR_LOG_STREAM ---
              </div>

              <div className="border border-[#ffb4ab]/15 bg-[#93000a]/[0.02] p-3 flex flex-col gap-1 text-[#869398]/80 text-[12px]">
                <p className="text-[#ffb4ab]/80 flex items-center gap-1">&gt; LOG [12:08:01]: ОШИБКА ДОСТУПА К ПАМЯТИ</p>
                <p className="text-[#ffb4ab]/80 flex items-center gap-1">&gt; LOG [12:08:05]: ОШИБКА ВАЛИДАЦИИ СЧАСТЬЯ</p>
                <p className="text-[#ffb77d]/90 flex items-center gap-1">&gt; LOG [12:08:12]: НЕСАНКЦИОНИРОВАННОЕ ОТКЛЮЧЕНИЕ РАДИО</p>
                <p className="text-[#ffb4ab] flex items-center gap-1 animate-pulse font-bold tracking-wide mt-1">
                  &gt; LOG [12:08:18]: ОБНАРУЖЕНА КРИТИЧЕСКАЯ АНОМАЛИЯ // СИМУЛЯЦИЯ НЕСТАБИЛЬНА
                </p>
              </div>

              <div className="mt-auto pt-6 flex justify-start">
                <Link href="/sunphase/system">
                  <button className="relative group overflow-hidden border border-accent-blue px-8 py-3 bg-transparent text-[#4cd6fb] text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:text-[#0e1416] hover:bg-[#4cd6fb] hover:shadow-[0_0_20px_rgba(76,214,251,0.6)]">
                    <span className="relative z-10">ВОЙТИ В СИСТЕМУ</span>
                    <div className="absolute inset-0 w-0 bg-[#4cd6fb] transition-all duration-200 group-hover:w-full -z-0" />
                  </button>
                </Link>
              </div>
            </div>

          </section>
        </main>

        <RealityFooter />
      </div>
    </>
  );
}
