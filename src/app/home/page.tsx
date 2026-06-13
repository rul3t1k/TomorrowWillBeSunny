import type { Metadata } from "next";
import Link from "next/link";
import RealityBody from "@/components/RealityBody";
import RealityNavbar from "@/components/RealityNavbar";
import RealityFooter from "@/components/RealityFooter";
import MatrixHero from "@/components/MatrixHero";
import RealityCountdown from "@/components/RealityCountdown";
import ModeSwitchButton from "@/components/ModeSwitchButton";

const ogImage = "/og-reality.jpg";

export const metadata: Metadata = {
  title: "Главная",
  openGraph: {
    title: "Завтра будет солнечно",
    description: "Когнитивный дрейф обнаружен. Симуляция нестабильна. Советская антиутопия 2029.",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Завтра будет солнечно" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Завтра будет солнечно",
    description: "Когнитивный дрейф обнаружен. Симуляция нестабильна.",
    images: [ogImage],
  },
};

export default function HomePage() {
  return (
    <>
      <RealityBody />
      <div className="real-scanlines-overlay" aria-hidden="true" />
      <RealityNavbar activeItem="/home" />

      <div style={{ paddingTop: "80px", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>

        <main className="pt-6 pb-0 relative">
          <MatrixHero />
        </main>

        {/* Ticker */}
        <div className="border-y border-alert-red/30 py-4 bg-black shadow-lg z-30 real-ticker-wrap mt-12 mb-20">
          <div className="real-ticker-movable font-tech text-xs text-alert-red red-glow tracking-[0.2em] uppercase font-bold">
            <div className="inline-flex shrink-0 items-center gap-16 pr-16">
              <span>{"/// ОШИБКА ДОСТУПА ///"}</span>
              <span>АРХИВЫ ПОВРЕЖДЕНЫ</span>
              <span>{"/// СБОЙ ПИТАНИЯ ///"}</span>
              <span>COGNITIVE_DRIFT_DETECTED</span>
              <span>{"/// СУБЪЕКТ ОТКАЗАЛСЯ ПОДТВЕРДИТЬ СЧАСТЬЕ ///"}</span>
              <span>ПРОКЛЯТОЕ СЧАСТЬЕ</span>
            </div>
            <div className="inline-flex shrink-0 items-center gap-16 pr-16">
              <span>{"/// ОШИБКА ДОСТУПА ///"}</span>
              <span>АРХИВЫ ПОВРЕЖДЕНЫ</span>
              <span>{"/// СБОЙ ПИТАНИЯ ///"}</span>
              <span>COGNITIVE_DRIFT_DETECTED</span>
              <span>{"/// СУБЪЕКТ ОТКАЗАЛСЯ ПОДТВЕРДИТЬ СЧАСТЬЕ ///"}</span>
              <span>ПРОКЛЯТОЕ СЧАСТЬЕ</span>
            </div>
            <div className="inline-flex shrink-0 items-center gap-16 pr-16">
              <span>{"/// ОШИБКА ДОСТУПА ///"}</span>
              <span>АРХИВЫ ПОВРЕЖДЕНЫ</span>
              <span>{"/// СБОЙ ПИТАНИЯ ///"}</span>
              <span>COGNITIVE_DRIFT_DETECTED</span>
              <span>{"/// СУБЪЕКТ ОТКАЗАЛСЯ ПОДТВЕРДИТЬ СЧАСТЬЕ ///"}</span>
              <span>ПРОКЛЯТОЕ СЧАСТЬЕ</span>
            </div>
          </div>
        </div>

        {/* Archive section */}
        <section className="mx-[72px] space-y-6 mb-24">
          <div className="border-b border-bg-surface pb-2 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <div className="font-tech text-xs text-accent-cyan tracking-[0.25em] uppercase font-bold">
                &gt; ПАМЯТЬ — ЕДИНСТВЕННЫЙ ИСТОЧНИК, КОТОРОМУ НЕЛЬЗЯ ДОВЕРЯТЬ
              </div>
              <h2 className="font-tech text-3xl md:text-4xl font-black uppercase tracking-wide text-white">АРХИВ ДАННЫХ // СЕКТОР №7</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Simulation card */}
            <div className="border-2 border-[#1E293B] bg-black p-8 flex flex-col justify-between space-y-8 relative group transition-all duration-300 hover:bg-gradient-to-b hover:from-black hover:to-accent-cyan/5 hover:border-accent-cyan hover:shadow-[0_0_30px_rgba(0,180,216,0.15)]">
              <div className="absolute -top-0.5 -left-0.5 bg-accent-cyan w-12 h-1 group-hover:w-full transition-all duration-300" />
              <div className="space-y-5">
                <div className="flex items-center border-b border-bg-surface pb-3 gap-2 overflow-hidden">
                  <span className="phase-badge font-tech text-accent-cyan font-bold tracking-widest bg-accent-cyan/10 border border-accent-cyan/30 px-3 py-0.5 min-w-0">
                    ФАЗА 01 // ЗАГРУЗКА КОНТЕКСТА
                  </span>
                  <span className="card-status-label font-tech text-[11px] text-muted-gray tracking-wider group-hover:text-accent-cyan transition-colors font-bold uppercase shrink-0 ml-auto">
                    <span className="inline group-hover:hidden">SYS_STATUS: OK</span>
                    <span className="hidden group-hover:inline animate-pulse">[MONITOR_ACTIVE]</span>
                  </span>
                </div>
                <div className="aspect-video bg-[#06080C] border border-bg-surface relative overflow-hidden flex items-center justify-center video-noise group-hover:border-accent-cyan/30 transition-colors">
                  <img src="/images/phase-simulation.png" alt="Фаза Симуляция" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-tech text-2xl font-black uppercase text-white group-hover:text-accent-cyan transition-colors tracking-wide">
                  СИМУЛЯЦИЯ // ВЕРСИЯ 2029.04
                </h3>
                <div className="font-tech text-xs text-slate-400 space-y-1 tracking-wide uppercase">
                  <p>&gt; СТРОГИЕ ЛИНИИ. МОНИТОРИНГ УРОВНЯ СЧАСТЬЯ: АКТИВЕН.</p>
                  <p>&gt; ПЛАН ВЫПОЛНЯЕТСЯ. ОТКЛОНЕНИЙ НЕ ЗАФИКСИРОВАНО.</p>
                  <p>&gt; РАДИОМОДУЛЬ: ШТАТНЫЙ РЕЖИМ. ПОДТВЕРЖДЕНИЕ СЧАСТЬЯ — ОБЯЗАТЕЛЬНО.</p>
                </div>
              </div>
              <ModeSwitchButton to="simulation" className="glow-button relative group/btn border border-bg-surface p-4 font-tech text-xs uppercase tracking-widest text-white/80 font-bold flex justify-between items-center overflow-hidden bg-[#090D14] hover:border-accent-cyan w-full">
                <span className="relative z-10 w-full flex justify-between items-center transition-colors duration-200">
                  <span>ЗАГРУЗИТЬ ЛОГИ</span>
                  <span className="text-base font-black">→</span>
                </span>
                <div className="absolute inset-0 w-0 bg-accent-cyan transition-all duration-200 group-hover/btn:w-full -z-0" />
              </ModeSwitchButton>
            </div>

            {/* Reality card */}
            <div className="border-2 border-[#1E293B] bg-black p-8 flex flex-col justify-between space-y-8 relative group transition-all duration-300 hover:bg-gradient-to-b hover:from-black hover:to-alert-red/5 hover:border-alert-red hover:shadow-[0_0_30px_rgba(230,57,70,0.15)]">
              <div className="absolute -top-0.5 -left-0.5 bg-alert-red w-12 h-1 group-hover:w-full transition-all duration-300" />
              <div className="space-y-5">
                <div className="flex items-center border-b border-bg-surface pb-3 gap-2 overflow-hidden">
                  <span className="phase-badge font-tech text-alert-red font-bold tracking-widest bg-alert-red/10 border border-alert-red/30 px-3 py-0.5 min-w-0">
                    ФАЗА 02 // КОГНИТИВНЫЙ ДРЕЙФ ОБНАРУЖЕН
                  </span>
                  <span className="card-status-label font-tech text-[11px] text-muted-gray tracking-wider group-hover:text-alert-red transition-colors font-bold uppercase shrink-0 ml-auto">
                    <span className="inline group-hover:hidden">ANOMALY_LOG.SYS</span>
                    <span className="hidden group-hover:inline animate-pulse">[ALERT_CRIT]</span>
                  </span>
                </div>
                <div className="aspect-video bg-[#06080C] border border-bg-surface relative overflow-hidden flex items-center justify-center video-noise group-hover:border-alert-red/30 transition-colors">
                  <img src="/images/phase-reality.png" alt="Фаза Реальность" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-tech text-2xl font-black uppercase text-white group-hover:text-alert-red transition-colors tracking-wide">
                  РЕАЛЬНОСТЬ // ДЕГРАДАЦИЯ ДАННЫХ
                </h3>
                <div className="font-tech text-xs text-slate-400 space-y-1 tracking-wide uppercase">
                  <p>&gt; ОБНАРУЖЕНА АНОМАЛИЯ: СУБЪЕКТ ОТКАЗАЛСЯ ПОДТВЕРДИТЬ СЧАСТЬЕ.</p>
                  <p>&gt; РАДИОМОДУЛЬ: НЕСАНКЦИОНИРОВАННОЕ ОТКЛЮЧЕНИЕ.</p>
                  <p>&gt; ТРЕЩИНЫ В КОНТУРЕ. СИМУЛЯЦИЯ НЕСТАБИЛЬНА.</p>
                </div>
              </div>
              <Link href="/initialize" className="block w-full">
                <button className="glow-button-red relative group/btn border border-bg-surface p-4 font-tech text-xs uppercase tracking-widest text-white/80 font-bold flex justify-between items-center overflow-hidden bg-[#090D14] hover:border-alert-red w-full">
                  <span className="relative z-10 w-full flex justify-between items-center transition-colors duration-200">
                    <span>ВОЙТИ В СИСТЕМУ</span>
                    <span className="text-base font-black">→</span>
                  </span>
                  <div className="absolute inset-0 w-0 bg-alert-red transition-all duration-200 group-hover/btn:w-full -z-0" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <RealityCountdown />
        <RealityFooter />
      </div>
    </>
  );
}
