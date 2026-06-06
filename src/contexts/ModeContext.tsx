"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

export type Mode = "simulation" | "reality";
/** Состояние анимации перехода между режимами. */
export type Transition = "idle" | "to-reality" | "to-simulation";

const STORAGE_KEY = "sim-mode";

/** Маршруты режима «Реальность». Всё остальное считается «Симуляцией». */
const REALITY_ROUTES = [
  "/home",
  "/subjects",
  "/sunphase",
  "/manifesto",
  "/audio",
  "/initialize",
];
const REALITY_HOME = "/home";
const SIMULATION_HOME = "/";

/* Тайминги переходов (мс).
   Симуляция → Реальность: глитч-вспышка + фраза «don't forget who you are».
   Реальность → Симуляция: мягкое растворение.                                */
const TO_REALITY_DURATION = 1500;
const TO_REALITY_NAVIGATE = 900;
const TO_SIMULATION_DURATION = 1400;
const TO_SIMULATION_NAVIGATE = 900;

function modeFromPath(pathname: string | null): Mode {
  if (!pathname) return "simulation";
  return REALITY_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))
    ? "reality"
    : "simulation";
}

interface ModeContextValue {
  /** Текущий режим — выводится из маршрута. */
  mode: Mode;
  /** Активная анимация перехода. */
  transition: Transition;
  /** Признак того, что клиент гидратирован (для аккуратного старта анимаций). */
  hydrated: boolean;
  /** Запускает анимированный переход и навигацию. Без аргумента — переключает. */
  switchMode: (target?: Mode) => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const mode = modeFromPath(pathname);

  const [transition, setTransition] = useState<Transition>("idle");
  const [hydrated, setHydrated] = useState(false);

  // Ref-зеркало transition — чтобы guard в switchMode не зависел от замыкания.
  const transitionRef = useRef<Transition>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Аналитика: время в режиме
  const modeStartRef = useRef(Date.now());
  const modeRef = useRef<Mode>(mode); // актуальное значение для beforeunload

  useEffect(() => {
    setHydrated(true);
    // Фиксируем старт сессии один раз
    track("session_start", { referrer: document.referrer });
  }, []);

  // Обновляем ref при каждой смене режима (для beforeunload closure)
  useEffect(() => { modeRef.current = mode; }, [mode]);

  // Время в режиме при закрытии вкладки
  useEffect(() => {
    const onUnload = () => {
      const seconds = Math.round((Date.now() - modeStartRef.current) / 1000);
      track("mode_time", { mode: modeRef.current, seconds });
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  // Синхронизируем data-mode на <body> и сохраняем выбранный режим.
  useEffect(() => {
    document.body.dataset.mode = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* localStorage может быть недоступен — это не критично */
    }
  }, [mode]);

  // Заранее подгружаем маршрут противоположного режима, чтобы навигация
  // была мгновенной и успевала за анимацией перехода (кнопки, в отличие
  // от <Link>, сами не префетчат).
  useEffect(() => {
    router.prefetch(mode === "simulation" ? REALITY_HOME : SIMULATION_HOME);
  }, [mode, router]);

  // Подчищаем таймеры и блокировку скролла при размонтировании.
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    },
    [],
  );

  const switchMode = useCallback(
    (target?: Mode) => {
      const next: Mode =
        target ?? (mode === "simulation" ? "reality" : "simulation");

      // Уже в нужном режиме или идёт переход — игнорируем.
      if (next === mode || transitionRef.current !== "idle") return;

      const state: Transition = next === "reality" ? "to-reality" : "to-simulation";
      const navDelay = next === "reality" ? TO_REALITY_NAVIGATE : TO_SIMULATION_NAVIGATE;
      const totalDelay = next === "reality" ? TO_REALITY_DURATION : TO_SIMULATION_DURATION;
      const dest = next === "reality" ? REALITY_HOME : SIMULATION_HOME;

      // Аналитика: время в текущем режиме + переключение
      const elapsed = Math.round((Date.now() - modeStartRef.current) / 1000);
      track("mode_time", { mode, seconds: elapsed });

      const FIRST_REALITY_KEY = "analytics_first_reality";
      const firstTimeReality =
        next === "reality" && !localStorage.getItem(FIRST_REALITY_KEY);
      if (firstTimeReality) localStorage.setItem(FIRST_REALITY_KEY, "1");
      track("mode_switch", {
        from: mode,
        to: next,
        ...(firstTimeReality ? { first_time_reality: true as const } : {}),
      });

      modeStartRef.current = Date.now();

      transitionRef.current = state;
      setTransition(state);
      document.body.style.overflow = "hidden";

      timers.current.forEach(clearTimeout);
      timers.current = [
        setTimeout(() => router.push(dest), navDelay),
        setTimeout(() => {
          document.body.style.overflow = "";
          transitionRef.current = "idle";
          setTransition("idle");
        }, totalDelay),
      ];
    },
    [mode, router],
  );

  return (
    <ModeContext.Provider value={{ mode, transition, hydrated, switchMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error("useMode должен использоваться внутри <ModeProvider>");
  }
  return ctx;
}
