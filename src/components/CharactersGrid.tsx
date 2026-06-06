"use client";

import { useEffect, type ReactNode } from "react";

export default function CharactersGrid({ children }: { children: ReactNode }) {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".card-container");
    const isMobile = () => window.innerWidth <= 768;

    cards.forEach((card) => {
      const orig = card.style.transform || "";
      card.dataset.origTransform = orig;
      card.style.opacity = "0";
      if (!isMobile()) {
        card.style.transform = "translateY(30px) " + orig;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const i = Array.from(cards).indexOf(card);
          setTimeout(() => {
            card.style.transition = "opacity 0.35s ease-out, transform 0.35s ease-out";
            card.style.opacity = "1";
            card.style.transform = isMobile() ? "" : card.dataset.origTransform || "";
          }, i * 35);
          observer.unobserve(card);
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
