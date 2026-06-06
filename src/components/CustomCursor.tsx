"use client";

import { useEffect } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, label, .mode-container, .polaroid';

export default function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const arrow = document.createElement("div");
    arrow.className = "cursor-arrow";
    arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 14 20">
      <polygon points="2,1 2,17 5.5,13 8,19.5 10,18.5 7.5,12 12,12"
               stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`;
    document.body.appendChild(arrow);

    const onMove = (e: MouseEvent) => {
      arrow.style.left = e.clientX + "px";
      arrow.style.top = e.clientY + "px";
    };
    const onDown = () => document.body.classList.add("cursor-active");
    const onUp = () => document.body.classList.remove("cursor-active");
    const onLeave = () => { arrow.style.opacity = "0"; };
    const onEnter = () => { arrow.style.opacity = "1"; };

    // Наведение определяем делегированием (mouseover/mouseout всплывают),
    // поэтому работает и для динамически добавленных элементов — без
    // навешивания слушателей на каждый узел и без MutationObserver.
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.(HOVER_SELECTOR)) {
        document.body.classList.add("cursor-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const related = e.relatedTarget as Element | null;
      // снимаем подсветку, только если действительно ушли с hover-цели
      if (target?.closest?.(HOVER_SELECTOR) && !related?.closest?.(HOVER_SELECTOR)) {
        document.body.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      arrow.remove();
    };
  }, []);

  return null;
}
