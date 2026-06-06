import type { Metadata } from "next";
import RealityBody from "@/components/RealityBody";
import RealityNavbar from "@/components/RealityNavbar";
import RealityFooter from "@/components/RealityFooter";
import SubjectCard, { type SubjectCardProps } from "@/components/SubjectCard";

export const metadata: Metadata = { title: "Субъекты — Реальность" };

const SUBJECTS: SubjectCardProps[] = [
  {
    id: "001", role: "СЕКРЕТАРЬ ПО СЧАСТЬЮ",
    name: "Субъект_Иголочка",
    image: "/images/chars/igolocka.jpg", imageAlt: "Субъект Иголочка",
    rows: [
      { label: "LOCATION", value: "ВНЕШНЕЕ КОЛЬЦО" },
      { label: "AGE",      value: "31 ЦИКЛ" },
      { label: "STATUS",   value: "АКТИВЕН // ПЕРЕГРУЗКА: 83%",          valueClass: "text-[#4cd6fb] font-bold text-glow" },
      { label: "FEATURES", value: "ДЛИТЕЛЬНЫЕ ПЕРИОДЫ БЕЗ СНА",           valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "sentiment_satisfied",
    overlayText: "СУБЪЕКТ КУРИРУЕТ МОДУЛЬ СЧАСТЬЯ. ЗАФИКСИРОВАНА ПОВЫШЕННАЯ НАГРУЗКА. ЭФФЕКТИВНОСТЬ: В ПРЕДЕЛАХ НОРМЫ.",
  },
  {
    id: "002", role: "ГЛАВНОКОМАНДУЮЩИЙ",
    name: "Субъект_Головня",
    image: "/images/chars/golovnya.jpg", imageAlt: "Субъект Головня",
    rows: [
      { label: "LOCATION", value: "ЦЕНТРАЛЬНОЕ ЯДРО" },
      { label: "AGE",      value: "НЕИЗВЕСТЕН" },
      { label: "STATUS",   value: "СТАБИЛЬНОСТЬ ПОД ВОПРОСОМ",            valueClass: "text-[#eb8f3b] font-bold text-glow-orange" },
      { label: "FEATURES", value: "РАБОТА БЕЗ РЕСТАРТА",                   valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "memory",
    overlayText: "СУБЪЕКТ ОТВЕЧАЕТ ЗА СТАБИЛЬНОСТЬ СИСТЕМЫ. ЗАФИКСИРОВАНЫ ДЛИТЕЛЬНЫЕ ПЕРИОДЫ БЕЗ ОСТАНОВКИ. АВТОНОМНЫЕ ФУНКЦИИ ОСЛАБЛЕНЫ.",
  },
  {
    id: "003", role: "ПРЕСС-СЕКРЕТАРЬ",
    name: "Субъект_Таракан",
    image: "/images/chars/tarakan.jpg", imageAlt: "Субъект Таракан",
    rows: [
      { label: "LOCATION", value: "ЦЕНТРАЛЬНОЕ ЯДРО" },
      { label: "AGE",      value: "48 ЦИКЛОВ" },
      { label: "STATUS",   value: "НЕСТАБИЛЕН // ПЕРЕОДИЧЕСКИЕ СБОИ",     valueClass: "text-[#ffb4ab] font-bold text-glow-red" },
      { label: "FEATURES", value: "НАРУШЕНИЕ ПРОТОКОЛОВ ОБЩЕНИЯ",          valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "campaign",
    overlayText: "СУБЪЕКТ ОТВЕЧАЕТ ЗА ВНЕШНИЕ КОММУНИКАЦИИ. ЗАФИКСИРОВАНЫ ЭПИЗОДЫ НЕСАНКЦИОНИРОВАННОЙ ДРАЧЛИВОСТИ. НАБЛЮДЕНИЕ УСИЛЕНО.",
  },
  {
    id: "004", role: "ПРЕМЬЕР-МИНИСТР",
    name: "Субъект_Алмаз",
    image: "/images/chars/almaz.jpg", imageAlt: "Субъект Алмаз",
    rows: [
      { label: "LOCATION", value: "ЦЕНТРАЛЬНОЕ ЯДРО" },
      { label: "AGE",      value: "47 ЦИКЛОВ" },
      { label: "STATUS",   value: "СТАБИЛЕН // ПЕРИОДИЧЕСКАЯ ДЕПРЕССИЯ",  valueClass: "text-[#eb8f3b] font-bold text-glow-orange" },
      { label: "FEATURES", value: "ЧАСТЫЕ СМЕНЫ НАСТРОЕНИЯ",               valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "gavel",
    overlayText: "СУБЪЕКТ УЧАСТВУЕТ В УПРАВЛЕНИИ СИСТЕМОЙ. ЗАФИКСИРОВАНА ПЕРИОДИЧЕСКАЯ ЭМОЦИОНАЛЬНАЯ НЕСТАБИЛЬНОСТЬ. В ОСТАЛЬНОМ — В ПРЕДЕЛАХ НОРМЫ.",
  },
  {
    id: "005", role: "ВОДИТЕЛЬ",
    name: "Субъект_Ион_Бойко",
    image: "/images/chars/ion.jpg", imageAlt: "Субъект Ион Бойко",
    rows: [
      { label: "LOCATION", value: "ТРАНСПОРТНЫЙ МОДУЛЬ №7" },
      { label: "AGE",      value: "25 ЦИКЛОВ" },
      { label: "STATUS",   value: "КОГНИТИВНЫЙ ДРЕЙФ // ОТКАЗ ОТ ПОДТВЕРЖДЕНИЯ", valueClass: "text-[#eb8f3b] font-bold text-glow-orange" },
      { label: "FEATURES", value: "БЕЗ АУДИОМОДУЛЯ",                       valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "directions_car",
    overlayText: "СУБЪЕКТ ОБНАРУЖЕН В СЕКТОРЕ №7. ПРОЯВЛЯЕТ ПОВЫШЕННУЮ АКТИВНОСТЬ ПРИ КОНТАКТЕ С ВНЕШНИМИ ИСТОЧНИКАМИ ИНФОРМАЦИИ. НАБЛЮДЕНИЕ ПРОДОЛЖАЕТСЯ.",
  },
  {
    id: "006", role: "АГЕНТ",
    name: "Субъект_Элизабет_Сайкс",
    image: "/images/chars/lizika.jpg", imageAlt: "Субъект Элизабет Сайкс",
    rows: [
      { label: "LOCATION", value: "СЕКТОР 76 (ВРЕМЕННО)" },
      { label: "AGE",      value: "24 ЦИКЛА" },
      { label: "STATUS",   value: "ДВОЙНОЙ ПРОТОКОЛ // НЕСТАБИЛЬНА",      valueClass: "text-[#ffb4ab] font-bold text-glow-red" },
      { label: "FEATURES", value: "ПРОТИВОРЕЧИВЫЕ ДАННЫЕ",                  valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "support_agent",
    overlayText: "ДАННЫЕ СУБЪЕКТА РАССОГЛАСОВАНЫ. ОБНАРУЖЕНЫ ДВА ПАРАЛЛЕЛЬНЫХ ПРОТОКОЛА ПОВЕДЕНИЯ. РЕКОМЕНДУЕТСЯ УСИЛЕННОЕ НАБЛЮДЕНИЕ.",
  },
  {
    id: "007", role: "КОМАНДИР ЛОЗЫ",
    name: "Субъект_Виорел",
    image: "/images/chars/vio.jpg", imageAlt: "Субъект Виорел",
    rows: [
      { label: "LOCATION", value: "СЕКТОР 7 (СКРЫТА)" },
      { label: "AGE",      value: "26 ЦИКЛОВ" },
      { label: "STATUS",   value: "ОРГАНИЗАТОР // НЕСАНКЦИОНИРОВАННАЯ АКТИВНОСТЬ", valueClass: "text-[#eb8f3b] font-bold text-glow-orange" },
      { label: "FEATURES", value: "КЕПКА ЗАДОМ НАПЕРЁД",                   valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "account_tree",
    overlayText: "СУБЪЕКТ ЯВЛЯЕТСЯ ИНИЦИАТОРОМ НЕСАНКЦИОНИРОВАННОГО ОБЪЕДИНЕНИЯ. КООРДИНИРУЕТ ДЕЙСТВИЯ ДРУГИХ СУБЪЕКТОВ. СТАТУС: НАБЛЮДАЕТСЯ.",
  },
  {
    id: "008", role: "АГИТАТОР",
    name: "Субъект_Илеана",
    image: "/images/chars/ileana.jpg", imageAlt: "Субъект Илеана",
    rows: [
      { label: "LOCATION", value: "СЕКТОР 7" },
      { label: "AGE",      value: "24 ЦИКЛА" },
      { label: "STATUS",   value: "АКТИВЕН // АГРЕССИВНАЯ РИТОРИКА",       valueClass: "text-[#ffb4ab] font-bold text-glow-red" },
      { label: "FEATURES", value: "ЯРКИЙ ВНЕШНИЙ ВИД",                     valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "spatial_audio",
    overlayText: "СУБЪЕКТ ОТВЕЧАЕТ ЗА РАСПРОСТРАНЕНИЕ НЕСАНКЦИОНИРОВАННОГО КОНТЕНТА. ПРОЯВЛЯЕТ ПОВЫШЕННУЮ ЭМОЦИОНАЛЬНОСТЬ. НАБЛЮДЕНИЕ АКТИВНО.",
  },
  {
    id: "009", role: "СИЛА",
    name: "Субъект_Андре",
    image: "/images/chars/andre.jpg", imageAlt: "Субъект Андре",
    rows: [
      { label: "LOCATION", value: "СЕЛЬХОЗ МОДУЛЬ 7" },
      { label: "AGE",      value: "27 ЦИКЛОВ" },
      { label: "STATUS",   value: "СТАБИЛЕН // ФИЗИЧЕСКАЯ ПЕРЕГРУЗКА",     valueClass: "text-[#4cd6fb] font-bold text-glow" },
      { label: "FEATURES", value: "КРУПНЫЕ ГАБАРИТЫ",                       valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "fitness_center",
    overlayText: "СУБЪЕКТ ЗАНИМАЕТСЯ ФИЗИЧЕСКИМ ТРУДОМ. НЕ ПРОЯВЛЯЕТ АКТИВНОЙ УЧАСТИЯ В КОНФЛИКТАХ. СТАТУС: НАБЛЮДАЕТСЯ.",
  },
  {
    id: "010", role: "СТРАТЕГ",
    name: "Субъект_Александру",
    image: "/images/chars/aleksandru.jpg", imageAlt: "Субъект Александру",
    rows: [
      { label: "LOCATION", value: "СЕКТОР 7" },
      { label: "AGE",      value: "28 ЦИКЛОВ" },
      { label: "STATUS",   value: "СТАБИЛЕН // ИНТЕЛЛЕКТУАЛЬНАЯ ПЕРЕГРУЗКА", valueClass: "text-[#4cd6fb] font-bold text-glow" },
      { label: "FEATURES", value: "ВЫЦВЕТШИЕ ВОЛОСЫ // ШАХМАТИСТ",          valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "insights",
    overlayText: "СУБЪЕКТ ОТВЕЧАЕТ ЗА СТРАТЕГИЧЕСКОЕ ПЛАНИРОВАНИЕ. ПРОЯВЛЯЕТ ПОВЫШЕННУЮ АНАЛИТИЧЕСКУЮ АКТИВНОСТЬ. СТАТУС: НАБЛЮДАЕТСЯ.",
  },
  {
    id: "011", role: "НАЧАЛЬНИК",
    name: "Субъект_Цуркану",
    image: "/images/chars/tsurkan.jpg", imageAlt: "Субъект Цуркану",
    rows: [
      { label: "LOCATION", value: "АДМИНИСТРАЦИЯ №7" },
      { label: "AGE",      value: "52 ЦИКЛА" },
      { label: "STATUS",   value: "АКТИВЕН // ПОСТОЯННАЯ РАЗДРАЖЁННОСТЬ",  valueClass: "text-[#ffb4ab] font-bold text-glow-red" },
      { label: "PROTOCOL", value: "«АСФАЛЬТОУКЛАДЧИК»",                    valueClass: "text-[#4cd6fb] text-right text-[11px] truncate max-w-[180px]" },
    ],
    overlayIcon: "engineering",
    overlayText: "СУБЪЕКТ ОТВЕЧАЕТ ЗА ТРАНСПОРТНЫЙ МОДУЛЬ №7. ЗАФИКСИРОВАНА ПОВЫШЕННАЯ КОНФЛИКТНОСТЬ. В ОСТАЛЬНОМ — ДЕЙСТВУЕТ В РАМКАХ СИСТЕМЫ.",
  },
];

export default function SubjectsPage() {
  return (
    <>
      <RealityBody />
      <div className="real-scanlines-overlay" aria-hidden="true" />
      <RealityNavbar activeItem="/subjects" />

      <div style={{ paddingTop: "80px", flex: "1 0 auto" }}>
        <main className="flex-grow flex flex-col w-full px-4 md:px-[72px] py-8 md:py-12 z-20">

          {/* SYS_LOG */}
          <div className="w-full border border-accent-blue bg-bg-surface p-4 relative shadow-[0_0_8px_rgba(76,214,251,0.1)] mb-10">
            <div className="absolute top-0 left-0 bg-accent-blue px-2 py-0.5">
              <span className="text-[10px] text-[#090C12] uppercase font-bold tracking-wider">SYS_LOG</span>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <p className="text-[11px] text-[#bcc9ce]">
                <span className="text-[#3d494d]">[001]</span> &gt; INIT_DOSSIER_FETCH...
              </p>
              <p className="text-[11px] text-[#4cd6fb]">
                <span className="text-[#3d494d]">[002]</span> &gt; CONNECTION ESTABLISHED. 11 SUBJECTS ACTIVE IN GRID.
              </p>
              <p className="text-[11px] text-[#ffb4ab]">
                <span className="text-[#3d494d]">[003]</span> &gt; WARNING: COGNITIVE DRIFT ISOLATED IN SECTOR 7.
              </p>
              <h1
                className="glitch-text text-4xl md:text-5xl crt-glow mt-4 uppercase font-bold tracking-widest"
                style={{ color: "#00B4D8" }}
              >
                БАЗА_СУБЪЕКТОВ
              </h1>
            </div>
          </div>

          {/* Cards grid */}
          <div className="flex flex-wrap justify-center gap-6 w-full mb-12">
            {SUBJECTS.map((s) => (
              <SubjectCard key={s.id} {...s} />
            ))}
          </div>

        </main>

        <RealityFooter />
      </div>
    </>
  );
}
