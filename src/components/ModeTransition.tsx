"use client";

import { useMode } from "@/contexts/ModeContext";

/**
 * Полноэкранный оверлей перехода между режимами.
 *  • Симуляция → Реальность: глитч-вспышка + фраза «don't forget who you are».
 *  • Реальность → Симуляция: мягкое растворение.
 * Тайминги и навигация управляются из ModeContext.
 */
export default function ModeTransition() {
  const { transition } = useMode();
  if (transition === "idle") return null;

  return (
    <div className={`mode-transition mode-transition--${transition}`} aria-hidden="true">
      {transition === "to-reality" && (
        <span className="mode-transition__phrase" data-text="don't forget who you are">
          don&apos;t forget who you are
        </span>
      )}
    </div>
  );
}
