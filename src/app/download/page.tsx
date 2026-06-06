import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadSection from "@/components/DownloadSection";

export const metadata: Metadata = {
  title: "Скачать",
};

export default function Download() {
  return (
    <>
      <Navbar activeItem="/download" />

      <div style={{ paddingTop: "80px", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
        <main
          className="download-main flex-1 max-w-5xl w-full mx-auto px-6 py-8 flex flex-col items-center justify-center relative"
          style={{ zIndex: 60 }}
        >

          <header className="text-center w-full mb-8">
            <h1 className="font-display font-bold text-7xl md:text-8xl leading-none text-soviet-red tracking-tight mb-5 uppercase stagger-up">
              ИНИЦИАЛИЗАЦИЯ
            </h1>
            <p className="font-body italic text-xl md:text-2xl text-white/70 max-w-2xl mx-auto stagger-up delay-100">
              Подготовка системных файлов для симуляции. Пожалуйста, выберите целевую платформу.
            </p>
          </header>

          <div className="w-full flex flex-col gap-1 mb-10 stagger-up delay-200">
            <div className="w-full h-[2px] bg-sim-gold" />
            <div className="w-full h-[1px] bg-sim-gold/60" />
          </div>

          <DownloadSection />

        </main>

        <Footer />
      </div>
    </>
  );
}
