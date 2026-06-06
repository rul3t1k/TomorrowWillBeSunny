/**
 * Платформонезависимая аналитика.
 *
 * Все события диспатчатся как браузерный CustomEvent «analytics» на window.
 * Чтобы подключить сервис (PostHog, GA4, Plausible, etc.) — достаточно
 * одной подписки в одном месте:
 *
 *   window.addEventListener('analytics', (e) => {
 *     const { name, ...props } = (e as CustomEvent).detail;
 *     myAnalyticsSdk.track(name, props);
 *   });
 *
 * % пользователей, переключившихся в реальность:
 *   Делитель  — все уникальные сессии (tracked via session_start event).
 *   Числитель — события mode_switch { to:"reality", first_time_reality:true }.
 */

export type Mode = "simulation" | "reality";

export interface AnalyticsEvents {
  /** Запуск приложения (срабатывает один раз при первом рендере). */
  session_start: { referrer: string };

  /** Переключение режима (запускает МodeContext.switchMode). */
  mode_switch: {
    from: Mode;
    to: Mode;
    /** true только при первом переключении в реальность за всё время. */
    first_time_reality?: true;
  };

  /** Время в режиме — пишется при переключении и при закрытии вкладки. */
  mode_time: { mode: Mode; seconds: number };

  /** Пасхалка: слово «АДЕЛАИДА» набрано на странице реальности. */
  easter_egg_adelaida: { from_page: string };

  /** Пользователь выделил скрытый текст на /sunphase/system. */
  hidden_text_selected: { snippet: string };
}

export function track<K extends keyof AnalyticsEvents>(
  name: K,
  props: AnalyticsEvents[K],
): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("analytics", { detail: { name, ...props } }),
  );

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(
      "%c[analytics]%c " + name,
      "color:#4cd6fb;font-weight:bold",
      "color:inherit",
      props,
    );
  }
}

/**
 * Подписаться на все аналитические события (удобно для подключения SDK).
 * Возвращает функцию отписки.
 */
export function onAnalytics(
  handler: (payload: { name: keyof AnalyticsEvents } & Record<string, unknown>) => void,
): () => void {
  const listener = (e: Event) => handler((e as CustomEvent).detail);
  window.addEventListener("analytics", listener);
  return () => window.removeEventListener("analytics", listener);
}
