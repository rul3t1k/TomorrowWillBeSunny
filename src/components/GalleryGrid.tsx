"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  gridSpan: number;
  rotate: string;
  tape: { cls: string; rot: string } | null;
  aspectRatio: string;
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".gallery-card-container");
    const isMobile = () => window.innerWidth <= 1024;

    cards.forEach((card) => {
      const orig = card.style.transform || "";
      card.dataset.origTransform = orig;
      card.style.opacity = "0";
      if (!isMobile()) card.style.transform = "translateY(30px) " + orig;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const i = Array.from(cards).indexOf(card);
          setTimeout(() => {
            card.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
            card.style.opacity = "1";
            card.style.transform = isMobile() ? "" : card.dataset.origTransform || "";
          }, i * 70);
          observer.unobserve(card);
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((i: number) => {
    setCurrentIdx(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback(
    (dir: number) => {
      setImgOpacity(0);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + dir + items.length) % items.length);
        setImgOpacity(1);
      }, 180);
    },
    [items.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightboxOpen, navigate, closeLightbox]);

  return (
    <>
      <section aria-label="Архив изображений" className="collage-section">
        {items.map((item, i) => (
          <article
            key={item.id}
            className="gallery-card-container relative group"
            style={{ gridColumn: `span ${item.gridSpan}`, transform: item.rotate }}
            onClick={() => openLightbox(i)}
          >
            {item.tape && (
              <div
                className={`tape-strip absolute ${item.tape.cls} z-20`}
                style={{ transform: item.tape.rot }}
              />
            )}
            <div className="gallery-card-inner bg-paper p-3 pb-8 shadow-card border border-white/10 relative z-10">
              <div
                className="w-full bg-paper-dark relative overflow-hidden"
                style={{ aspectRatio: item.aspectRatio }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="card-caption">{item.caption}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Lightbox — через Portal в document.body, иначе z-index main перекрывает navbar */}
      {mounted && createPortal(
        <div
          className={`lightbox-overlay${lightboxOpen ? " open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Закрыть">
            ✕
          </button>
          <button className="lightbox-prev" onClick={() => navigate(-1)} aria-label="Предыдущее">
            ‹
          </button>
          <button className="lightbox-next" onClick={() => navigate(1)} aria-label="Следующее">
            ›
          </button>
          <div className="lightbox-content">
            <div className="lightbox-img-wrap">
              <img
                className="lightbox-main-img"
                src={items[currentIdx]?.src || ""}
                alt={items[currentIdx]?.alt || ""}
                style={{ opacity: imgOpacity }}
              />
              <p className="lightbox-caption">{items[currentIdx]?.alt || ""}</p>
            </div>
          </div>
          <div className="lightbox-counter">
            {currentIdx + 1} / {items.length}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
