import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ModeSwitchButton from "@/components/ModeSwitchButton";
import Footer from "@/components/Footer";
import Countdown from "@/components/Countdown";
import NewsletterForm from "@/components/NewsletterForm";

const REALITY_UTM_KEYWORDS = ["reality", "real", "dark", "izn", "система"];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const utm = String(searchParams?.utm_source ?? "").toLowerCase();
  const forceReality = REALITY_UTM_KEYWORDS.some((kw) => utm.includes(kw));
  // A/B: utm определяет вариант; без utm — 50/50 рандом на каждый запрос
  const variant = forceReality || Math.random() < 0.5 ? "reality" : "simulation";

  const ogImage = `/og-${variant}.jpg`;
  const title = "Завтра будет солнечно";
  const description =
    variant === "reality"
      ? "Когнитивный дрейф обнаружен. Симуляция нестабильна. Советская антиутопия 2029."
      : "Симуляция запущена. Ты уже внутри. Советская антиутопия 2029 года.";

  return {
    title,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <>
      <Navbar activeItem="/" />

      {/* ===== CONTENT WRAPPER ===== */}
      <div style={{ paddingTop: "112px", flex: "1 0 auto" }}>

        {/* ===== HERO ===== */}
        <main className="mx-[72px] py-8 grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 min-h-[60vh] gap-6">
          <div className="w-full lg:col-span-7">
            <div
              className="inline-block border border-sim-muted px-3 py-1 mb-6 font-tech text-xs text-sim-muted tracking-widest uppercase stagger-up"
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "11px",
                lineHeight: "13.2px",
                letterSpacing: "2.2px",
                color: "rgb(122,106,82)",
                borderColor: "rgb(122,106,82)",
                textTransform: "uppercase",
              }}
            >
              <span>СИМУЛЯЦИЯ ЗАПУЩЕНА. ТЫ УЖЕ ВНУТРИ.</span>
            </div>
            <h1
              className="font-oswald text-7xl lg:text-8xl text-sim-red leading-[0.9] uppercase tracking-wide mb-8 stagger-up delay-100"
              style={{ fontSize: "118px", lineHeight: "124px", letterSpacing: "-0.03em" }}
            >
              ЗАВ<span style={{ letterSpacing: "-0.02em" }}>Т</span>РА Б
              <span style={{ letterSpacing: "-0.09em" }}>У</span>Д
              <span style={{ letterSpacing: "0.01em" }}>Е</span>Т СОЛНЕЧНО
            </h1>
            <p
              className="font-cormorant italic text-sim-surface mb-10 leading-relaxed stagger-up delay-200 border-l-4 border-sim-red pl-6 max-w-none font-light"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "24px",
                color: "rgb(242,237,218)",
              }}
            >
              Мы строили светлое будущее.&nbsp;&nbsp;<br />
              Потом забыли спросить: «А вы вообще счастливы?»
            </p>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 stagger-up delay-300">
              <Link href="/download" className="block">
                <button
                  className="w-full lg:w-auto bg-sim-red text-sim-surface font-oswald text-xl uppercase px-8 h-[60px] tracking-wider hover:bg-sim-red-hover transition-all duration-500 ease-out shadow-[4px_4px_0px_#000]"
                  style={{ fontFamily: "Oswald,sans-serif", fontWeight: 600, fontSize: "18px", lineHeight: "28px" }}
                >
                  Играть сейчас
                </button>
              </Link>
              <Link href="/about" className="block">
                <button
                  className="w-full lg:w-auto border-2 border-sim-muted text-sim-muted font-oswald text-xl uppercase px-[30px] h-[60px] tracking-wider transition-all duration-500 ease-out shadow-[4px_4px_0px_#000] hover:bg-[#E8890C] hover:text-[#1C1A12] hover:border-[#E8890C]"
                  style={{ fontFamily: "Oswald,sans-serif", fontWeight: 600, fontSize: "18px", lineHeight: "28px" }}
                >
                  Узнать больше
                </button>
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] w-full stagger-up delay-400 lg:col-span-5">
            <div
              className="absolute right-0 top-10 h-[450px] polaroid z-10 w-full max-w-2xl"
              style={{ transform: "rotate(3deg)" }}
            >
              <div className="bg-[#dcd6c1] w-full h-[380px] shadow-inner relative overflow-hidden flex items-center justify-center border border-black/10">
                {/* Hero image — above fold, fetchPriority=high for LCP */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-polaroid.png"
                  alt="Завтра будет солнечно"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute bottom-[-15px] right-[-15px] bg-[#2a271c] border border-sim-gold px-3 py-1 font-tech text-[10px] text-sim-gold tracking-[0.2em]">
                ИНВЕНТАРНЫЙ № 774-Б
              </div>
            </div>
          </div>
        </main>

        {/* ===== TICKER ===== */}
        <div className="ticker-wrap relative z-10 my-16 py-3">
          <div className="ticker-movable font-tech text-sm text-sim-gold tracking-widest uppercase items-center">
            <div className="flex shrink-0 items-center gap-16 pr-16">
              <span>{"/// Счастье — 98,2% ///"}</span>
              <span>Ион выключил радио</span>
              <span>{"/// Лизика мыла пол ///"}</span>
              <span>Аделаида завелась с пол-оборота</span>
              <span>{"/// Цуркану снова орёт ///"}</span>
              <span>Завтра будет солнечно</span>
              <span>{"/// А сегодня — симуляция ///"}</span>
            </div>
            <div className="flex shrink-0 items-center gap-16 pr-16">
              <span>{"/// Счастье — 98,2% ///"}</span>
              <span>Ион выключил радио</span>
              <span>{"/// Лизика мыла пол ///"}</span>
              <span>Аделаида завелась с пол-оборота</span>
              <span>{"/// Цуркану снова орёт ///"}</span>
              <span>Завтра будет солнечно</span>
              <span>{"/// А сегодня — симуляция ///"}</span>
            </div>
            <div className="flex shrink-0 items-center gap-16 pr-16">
              <span>{"/// Счастье — 98,2% ///"}</span>
              <span>Ион выключил радио</span>
              <span>{"/// Лизика мыла пол ///"}</span>
              <span>Аделаида завелась с пол-оборота</span>
              <span>{"/// Цуркану снова орёт ///"}</span>
              <span>Завтра будет солнечно</span>
              <span>{"/// А сегодня — симуляция ///"}</span>
            </div>
          </div>
        </div>

        {/* ===== АРХИВ ДАННЫХ ===== */}
        <section className="relative z-10 pb-20 pt-8">
          <div className="mx-[72px]">
            <div className="relative mb-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between pb-4">
                <div>
                  <h2 className="font-oswald text-6xl text-sim-red uppercase tracking-tight font-bold">
                    АРХИВ ДАННЫХ
                  </h2>
                  <p
                    className="font-cormorant italic font-light mt-6"
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "22px",
                      lineHeight: "30.8px",
                      color: "rgb(242,237,218)",
                    }}
                  >
                    Здесь записан каждый раз, когда чайник остывал до того, как к нему успевали прикоснуться.
                    <br />Зачем-то система хранит и это.
                  </p>
                </div>
              </div>
              <div className="sovetic-line mb-12" />
              <div className="absolute bottom-8 right-0 flex flex-col items-end gap-1">
                <div className="h-1 bg-[#C0392B] w-8" />
                <div className="h-1 bg-[#C0392B] w-16" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

              {/* Карточка «Симуляция» */}
              <article
                className="bg-sim-surface text-[#1a1811] p-8 relative group hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col"
                style={{ boxShadow: "10px 10px 0px rgba(0,0,0,0.5)" }}
              >
                <div className="absolute top-0 right-0 bg-[#e0d6b8] px-3 py-1 font-tech text-xs text-sim-muted tracking-widest border-l border-b border-[#c2b99d]">
                  ФАЗА 01
                </div>
                <div className="w-full h-64 border-2 border-[#1a1811] mb-6 overflow-hidden bg-[#eae4cf]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/phase-simulation.png"
                    alt="Фаза Симуляция"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3
                  className="font-oswald text-4xl uppercase mb-4 tracking-wide text-[#1a1811]"
                  style={{
                    fontFamily: "Oswald,sans-serif",
                    fontWeight: 600,
                    fontSize: "40px",
                    lineHeight: "40px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  СИМУЛЯЦИЯ
                </h3>
                <hr className="border-[#1a1811] mb-4" />
                <p
                  className="font-ptserif text-lg leading-relaxed pb-8"
                  style={{
                    fontFamily: "'PT Serif',serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "28px",
                  }}
                >
                  Радио играет Суручану. Пассажиры подпевают. Все счастливы. Даже те, кто не хочет. Здесь всё правильно.
                  Проспекты ровные, план выполнен, уровень счастья растёт. Ион молчит. Аделаида едет по расписанию.
                  Никто не спорит. Никто не выключает радио.
                </p>
                <div className="mt-auto pt-4">
                  <Link
                    href="/about"
                    className="flex items-center justify-between gap-2 border border-[#1a1811] px-4 font-tech text-sm uppercase tracking-widest hover:bg-[#1a1811] hover:text-sim-surface transition-colors duration-500 ease-out w-full h-[41.6px]"
                  >
                    <span>ИЗУЧИТЬ ДОКУМЕНТАЦИЮ</span><span>→</span>
                  </Link>
                </div>
              </article>

              {/* Карточка «Реальность» */}
              <article className="bg-[#25231a] text-sim-surface border border-[#3a3628] p-8 relative group hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col"
                style={{ boxShadow: "10px 10px 0px rgba(0,0,0,0.5)" }}
              >
                <div className="absolute top-0 right-0 bg-[#3a3628] px-3 py-1 font-tech text-xs text-sim-muted tracking-widest">
                  ФАЗА 02
                </div>
                <div className="w-full h-64 border border-[#3a3628] mb-6 overflow-hidden bg-[#1c1a12]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/phase-reality.png"
                    alt="Фаза Реальность"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3
                  className="font-oswald text-4xl uppercase mb-4 tracking-wide"
                  style={{
                    fontFamily: "Oswald,sans-serif",
                    fontWeight: 600,
                    fontSize: "40px",
                    lineHeight: "40px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  РЕАЛЬНОСТЬ
                </h3>
                <hr className="border-[#F2EDDA] opacity-20 mb-4" />
                <p
                  className="font-ptserif text-lg leading-relaxed pb-8 text-[#dcd6c1]"
                  style={{
                    fontFamily: "'PT Serif',serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "28px",
                  }}
                >
                  Там, где кончается асфальт, начинается правда. И она не в новостях. Кто-то стоит на крыше маршрутки.
                  Кто-то плачет на вымытом полу. Кто-то не спит третью ночь подряд, потому что боится закрыть глаза.
                  Кнопка «выкл» не работает. Или работает, но никто не нажимает.
                </p>
                <div className="mt-auto pt-4">
                  <ModeSwitchButton
                    to="reality"
                    className="flex items-center justify-between gap-2 border border-[#7a241b] text-[#c94a3d] px-4 py-2 font-tech text-sm uppercase tracking-widest hover:bg-[#7a241b] hover:text-white transition-colors duration-500 ease-out w-full"
                  >
                    ДОСТУП К ИЗНАНКЕ{" "}
                    <span className="material-symbols-outlined text-sm">warning</span>
                  </ModeSwitchButton>
                </div>
              </article>

            </div>
          </div>
        </section>

        <div className="mx-[72px]">
          <div className="sovetic-line" />
        </div>

        {/* ===== ОБРАТНЫЙ ОТСЧЁТ + ПОДПИСКА ===== */}
        <section className="text-center relative z-10 pt-10">
          <div className="mx-[72px]">

            <Countdown />

            <div className="max-w-xl mx-auto relative pb-16">
              <h3
                id="subscribe-title"
                className="font-oswald text-2xl text-sim-red uppercase tracking-wider mb-6"
              >
                ПОДПИШИТЕСЬ НА НОВОСТИ
              </h3>
              <NewsletterForm />
              <div className="w-full flex justify-center text-center mt-8">
                <p className="font-cormorant italic font-light text-[22px] text-sim-muted block mx-auto">
                  Мы не рассылаем счастье. Только напоминания о том, что завтра всё равно наступит.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>{/* /content wrapper */}

      <Footer />
    </>
  );
}
