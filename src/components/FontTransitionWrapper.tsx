"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMode } from "@/contexts/ModeContext";

/**
 * Обёртка контента страницы.
 * При смене режима: opacity 0 → смена font-family (через data-reality CSS) → opacity 1.
 * Длительность 400ms. Оверлеи (ModeTransition, CustomCursor) — сиблинги,
 * не дети, поэтому на них эффект не распространяется.
 */
export default function FontTransitionWrapper({ children }: { children: ReactNode }) {
  const { mode, hydrated } = useMode();
  const wrapRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (!hydrated) return;
    // Пропускаем первый рендер — анимация нужна только при переключении.
    if (isFirst.current) { isFirst.current = false; return; }

    const el = wrapRef.current;
    if (!el) return;
    el.classList.add("font-entry");
    const t = setTimeout(() => el.classList.remove("font-entry"), 400);
    return () => {
      clearTimeout(t);
      el.classList.remove("font-entry");
    };
  }, [mode, hydrated]);

  return (
    <div ref={wrapRef} className="font-entry-wrapper">
      {children}
    </div>
  );
}
