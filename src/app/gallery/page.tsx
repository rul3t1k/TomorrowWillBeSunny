import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Галерея",
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "doc-1271870382",
    src: "/images/archive/doc-1271870382.jpg",
    alt: "Документ #1271870382",
    caption: "Документ #1271870382",
    gridSpan: 5,
    rotate: "rotate(-1.5deg) translateY(10px)",
    tape: { cls: "-top-3 left-10 w-24 h-7", rot: "rotate(-2deg)" },
    aspectRatio: "4/3",
  },
  {
    id: "doc-22052029",
    src: "/images/archive/doc-22052029.jpg",
    alt: "22.05.2029",
    caption: "22.05.2029",
    gridSpan: 3,
    rotate: "rotate(1.2deg) translateY(-14px)",
    tape: null,
    aspectRatio: "3/4",
  },
  {
    id: "doc-719261b",
    src: "/images/archive/doc-719261b.jpg",
    alt: "Документ #719261-B",
    caption: "Документ #719261-B",
    gridSpan: 4,
    rotate: "rotate(-0.6deg) translateY(22px)",
    tape: { cls: "-top-3 right-10 w-20 h-7", rot: "rotate(3deg)" },
    aspectRatio: "3/2",
  },
  {
    id: "doc-14072029",
    src: "/images/archive/doc-14072029.jpg",
    alt: "14.07.2029",
    caption: "14.07.2029",
    gridSpan: 3,
    rotate: "rotate(2deg) translateY(8px)",
    tape: { cls: "-top-3 left-8 w-24 h-7", rot: "rotate(6deg)" },
    aspectRatio: "3/2",
  },
  {
    id: "doc-990214",
    src: "/images/archive/doc-990214.jpg",
    alt: "Документ #990214",
    caption: "Документ #990214",
    gridSpan: 5,
    rotate: "rotate(-1deg) translateY(-18px)",
    tape: null,
    aspectRatio: "4/3",
  },
  {
    id: "doc-02102029",
    src: "/images/archive/doc-02102029.jpg",
    alt: "02.10.2029",
    caption: "02.10.2029",
    gridSpan: 4,
    rotate: "rotate(0.7deg) translateY(14px)",
    tape: { cls: "-top-3 left-12 w-24 h-7", rot: "rotate(-12deg)" },
    aspectRatio: "1",
  },
];

export default function Gallery() {
  return (
    <>
      <Navbar activeItem="/gallery" />

      <div style={{ paddingTop: "80px", flex: "1 0 auto" }}>
        <main className="mx-[72px] py-8 relative z-10">

          <header className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8">
            <div>
              <h1 className="font-display text-7xl md:text-8xl font-bold text-soviet-red tracking-tight leading-none mb-4 uppercase stagger-up">
                Архив изображений
              </h1>
              <p className="font-body italic text-xl md:text-2xl text-white/70 stagger-up delay-100">
                Изображения, которые собирали по крупицам. Некоторые — чёткие.<br />
                Некоторые — будто сквозь дымку. Как воспоминания.
              </p>
            </div>
            <div className="mt-6 md:mt-0 font-mono text-xs text-soviet-gold tracking-[0.2em] border border-soviet-gold/30 px-4 py-2 uppercase bg-black/30 stagger-up delay-200">
              2029 год
            </div>
          </header>

          <div className="w-full flex flex-col gap-1 mb-12 stagger-up delay-300">
            <div className="w-full h-[2px] bg-[#D4A017]" />
            <div className="w-full h-[0.5px] bg-[#D4A017]" />
          </div>

          <GalleryGrid items={GALLERY_ITEMS} />

        </main>

        <Footer />
      </div>
    </>
  );
}
