import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";

export const metadata: Metadata = {
  title: "Саундтрек",
};

export default function Soundtrack() {
  return (
    <>
      <Navbar activeItem="/soundtrack" />

      <div style={{ paddingTop: "80px", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
        <main className="flex-1 mx-[72px] py-8 relative z-10">

          <header className="mb-8">
            <h1 className="soundtrack-h1 font-display text-7xl md:text-8xl font-bold text-soviet-red tracking-tight leading-none mb-4 uppercase stagger-up">
              АУДИОАРХИВ
            </h1>
            <div className="sovetic-line mb-4 stagger-up delay-100" />
            <p className="font-body italic text-xl md:text-2xl text-white/70 stagger-up delay-200 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}
              >
                album
              </span>
              КАТАЛОГ СИМУЛЯЦИИ / ФОНОГРАММЫ
            </p>
          </header>

          <div className="stagger-up delay-300">
            <AudioPlayer />
          </div>

        </main>

        <Footer />
      </div>
    </>
  );
}
