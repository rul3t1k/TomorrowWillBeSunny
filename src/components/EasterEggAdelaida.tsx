"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/contexts/ModeContext";
import { usePathname, useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

const TARGET = "АДЕЛАИДА";
// Сколько остаёмся на странице симуляции до автовозврата
const STAY_MS = 2000;

/**
 * Пасхалка: набери «АДЕЛАИДА» на странице реальности (без фокуса на поле) —
 * dissolve-переход уносит на главную симуляции, через 2 секунды тот же переход
 * возвращает обратно на страницу реальности.
 */
export default function EasterEggAdelaida() {
  const { mode, switchMode } = useMode();
  const pathname = usePathname();
  const router = useRouter();

  // Путь для возврата и флаг активной пасхалки — refs, не state, чтобы
  // не вызывать лишних re-render и не ломать замыкания в useEffect-ах.
  const returnPath = useRef<string>("");
  const isActive = useRef(false);

  // Когда мы оказались в симуляции через пасхалку — запускаем таймер возврата
  useEffect(() => {
    if (!isActive.current || mode !== "simulation") return;

    const path = returnPath.current;
    const timer = setTimeout(() => {
      isActive.current = false;
      returnPath.current = "";
      // Возвращаемся на страницу реальности через тот же dissolve-переход
      switchMode("reality");
      // switchMode("reality") ведёт на /home, но нам нужна исходная страница.
      // Поэтому сразу после reset-а ModeContext перекидываем на нужный путь.
      setTimeout(() => router.replace(path), 950);
    }, STAY_MS);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Слушаем набор слова — только на страницах реальности
  useEffect(() => {
    let buffer = "";

    function onKeyDown(e: KeyboardEvent) {
      if (mode !== "reality" || isActive.current) { buffer = ""; return; }

      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable) return;

      if (e.key.length === 1) {
        buffer = (buffer + e.key.toUpperCase()).slice(-TARGET.length);
        if (buffer === TARGET) {
          buffer = "";
          isActive.current = true;
          returnPath.current = pathname;
          track("easter_egg_adelaida", { from_page: pathname });
          // Запускаем настоящий dissolve-переход + навигацию на симуляцию
          switchMode("simulation");
        }
      } else {
        buffer = "";
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mode, pathname, switchMode]);

  return null;
}
