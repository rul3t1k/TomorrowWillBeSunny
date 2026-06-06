"use client";

import type { ReactNode } from "react";
import { useMode, type Mode } from "@/contexts/ModeContext";

/**
 * Кнопка-переключатель режима с анимированным переходом (см. ModeContext).
 * Используется в карточках «Симуляция / Реальность» вместо обычной ссылки,
 * чтобы клик запускал глитч-вспышку или мягкое «снятие фильтра».
 */
export default function ModeSwitchButton({
  to,
  className,
  children,
}: {
  to: Mode;
  className?: string;
  children: ReactNode;
}) {
  const { switchMode } = useMode();
  return (
    <button type="button" className={className} onClick={() => switchMode(to)}>
      {children}
    </button>
  );
}
