import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Об игре",
};

export default function About() {
  return (
    <>
      <Navbar activeItem="/about" />

      {/* ===== CONTENT WRAPPER ===== */}
      <div style={{ paddingTop: "80px", flex: "1 0 auto" }}>

        {/* ── Page title ── */}
        <div className="about-page-mx pt-12 pb-2 text-center">
          <div
            className="inline-block border border-sim-muted px-3 py-1 mb-4 font-tech uppercase stagger-up"
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "11px",
              lineHeight: "13.2px",
              letterSpacing: "2.2px",
              color: "rgb(122,106,82)",
              borderColor: "rgb(122,106,82)",
            }}
          >
            ДОСЬЕ: СИМУЛЯЦИЯ 04
          </div>
          <h1
            className="font-oswald text-sim-red uppercase stagger-up delay-100 text-center"
            style={{ fontSize: "140px", lineHeight: "0.9", letterSpacing: "-0.04em", marginBottom: "24px" }}
          >
            ОБ ИГРЕ
          </h1>
          <div className="sovetic-line stagger-up delay-200" />
        </div>

        {/* ── First text block ── */}
        <section className="about-page-mx py-10 stagger-up delay-300">
          <div className="columns-1 md:columns-2 gap-12">
            <p
              className="mb-0 drop-cap"
              style={{ fontFamily: "'PT Serif',serif", fontSize: "18px", lineHeight: "1.75", fontWeight: 400, color: "#F2EDDA" }}
            >
              Система «Утопия» задумывалась как триумф советской инженерии — мир, где показатели пятилетки сдаются досрочно, пешеходы замирают на перекрёстках идеальной шеренгой, а индекс всеобщего блага высчитывается с точностью до сотых долей процента. Наша задача в штабе была простой: запустить КПК, проверить протоколы Кремля и собрать дежурные отчёты. Здесь всё идёт по плану, и из кухонных радиоприёмников круглосуточно льются бодрые государственные марши. Ни у кого из местных жителей даже мысли не возникает остановиться посреди парка и спросить соседа: «А ты вообще счастлив?».
            </p>
          </div>
        </section>

        {/* ── Illustration 1 ── */}
        <section className="about-page-mx flex justify-center mt-12 mb-12 stagger-up delay-400">
          <div className="relative illus-card w-full max-w-[800px]" style={{ transform: "rotate(-1deg)" }}>
            <div className="tape" />
            <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
              <img
                src="/images/pic1.jpeg"
                alt="Иллюстрация №1: Структура архива"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="illus-label absolute bottom-4 right-6 font-tech text-stone-700 text-[11px] uppercase tracking-widest font-bold">
              ИЛЛЮСТРАЦИЯ №1: СТРУКТУРА АРХИВА
            </div>
          </div>
        </section>

        {/* ── Second text block ── */}
        <section className="about-page-mx py-10 stagger-up delay-400">
          <div className="columns-1 md:columns-2 gap-12">
            <p
              className="mb-0"
              style={{ fontFamily: "'PT Serif',serif", fontSize: "18px", lineHeight: "1.75", fontWeight: 400, color: "#F2EDDA" }}
            >
              Но отлаженный код дал сбой. Автоматика зафиксировала аномальное, немотивированное падение уровня счастья на самой окраине Кишинёва, в тихом районе Буюканы. Спустившись в сектор для ручной проверки, я сел в обычную ржавую маршрутку и столкнулся с ними — с живыми людьми, которые начали сомневаться. Оказалось, казённые лозунги плохо греют по ночам, а под слоем идеального бетона всё ещё бьётся что-то растерянное и очень хрупкое. Наш интерфейс не спасёт этот мир, в нём нет такой кнопки. Это не восстание против системы. Это просто разговор. Очень трудный, долгий и важный.
            </p>
          </div>
        </section>

        {/* ── Quote ── */}
        <section className="about-page-mx my-8 stagger-up delay-500">
          <div
            className="relative py-12 max-w-4xl mx-auto"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(192,57,43,0.4) 6px,transparent 4px),linear-gradient(to right,rgba(192,57,43,0.4) 6px,transparent 4px)",
              backgroundPosition: "center top,center bottom",
              backgroundSize: "10px 2px",
              backgroundRepeat: "repeat-x",
            }}
          >
            <div
              className="absolute font-oswald text-sim-red select-none"
              style={{ fontSize: "130px", lineHeight: "1", opacity: "0.12", top: "-2rem", left: "2rem" }}
            >
              &ldquo;
            </div>
            <blockquote
              className="font-cormorant italic text-sim-surface text-center leading-relaxed px-12"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "32px",
                lineHeight: "1.3",
              }}
            >
              Ты просто страхолюдина, которая абсолютно не сочетается со всем обществом, но так старается быть выдающейся личностью, что лучше сделает таким же непонятным, как и ты сама, весь народ, чем просто в первую очередь станет обычным человеком.
            </blockquote>
            <div
              className="text-center mt-8 font-tech uppercase tracking-[0.2em]"
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "11px",
                lineHeight: "13.2px",
                letterSpacing: "2.2px",
                color: "rgb(212,160,23)",
              }}
            >
              — ЛИЗИКА
            </div>
          </div>
        </section>

        {/* ── Illustration 2 ── */}
        <section className="about-page-mx flex justify-center mt-20 mb-12 stagger-up delay-600">
          <div className="relative illus-card w-full max-w-[800px]" style={{ transform: "rotate(1deg)" }}>
            <div className="tape" />
            <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
              <img
                src="/images/pic2.jpg"
                alt="Иллюстрация №2: Внутренний горизонт"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="illus-label absolute bottom-4 left-6 right-6 font-tech text-stone-700 text-[11px] uppercase tracking-widest flex justify-between font-bold">
              <span>ИЛЛЮСТРАЦИЯ №2: ВНУТРЕННИЙ ГОРИЗОНТ</span>
              <span className="text-sim-red font-black tracking-normal">ФАЙЛ ПОВРЕЖДЕН</span>
            </div>
          </div>
        </section>

        {/* ── CTA Button ── */}
        <section className="about-page-mx flex justify-center pb-20 mt-8 stagger-up delay-700">
          <Link
            href="/characters"
            className="cta-chars inline-block font-oswald uppercase tracking-wider transition-all duration-500 ease-out shadow-[4px_4px_0px_#000] hover:bg-[#E8890C] hover:text-[#1C1A12]"
            style={{
              fontFamily: "Oswald,sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "0.05em",
              border: "2px solid #E8890C",
              color: "#E8890C",
              padding: "14px 56px",
              background: "transparent",
            }}
          >
            ПОЗНАКОМИТЬСЯ С ПЕРСОНАЖАМИ
          </Link>
        </section>

      </div>{/* /content wrapper */}

      <Footer />

      {/* ===== MOBILE BOTTOM BAR ===== */}
      {/* Встроен в Navbar */}
    </>
  );
}
