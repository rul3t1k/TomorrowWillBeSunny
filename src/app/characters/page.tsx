import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CharactersGrid from "@/components/CharactersGrid";

export const metadata: Metadata = {
  title: "Персонажи",
};

const CHARACTERS = [
  {
    id: "igolocka",
    name: "иголочка",
    role: "Генеральный секретарь по Счастью",
    stamp: "СОВ.\nСЕКРЕТНО",
    quote: "Женщина, которая разучилась спать до рассвета. И разучилась верить, что счастье может быть чужим.",
    detail: "Она не злодейка и не святая. Она просто слишком сильно любит страну. Иногда это страшнее ненависти. Система держится на ней. Но кто держит её?",
    rotate: "rotate(1.2deg)",
    tapePos: "-top-4 left-1/4 w-24 h-8",
    tapeRot: "rotate(-2deg)",
    stampRot: "rotate-12",
  },
  {
    id: "golovnya",
    name: "Головня",
    role: "Главнокомандующий",
    stamp: "АРХИВ\nКГБ",
    quote: "Тот, кто смотрит на карту мира и видит не границы, а точки напряжения. У него болят руки и голова. Но он никогда не жалуется. Только молчит и подписывает бумаги.",
    detail: "Он кажется холодным. Но за этой холодностью — усталость человека, который слишком долго нёс чужую тяжесть. И который однажды чуть не рухнул под её весом.",
    rotate: "rotate(-1.8deg) translateY(20px)",
    tapePos: "-top-3 right-1/4 w-20 h-8",
    tapeRot: "rotate(3deg)",
    stampRot: "-rotate-6",
  },
  {
    id: "tarakan",
    name: "таракан",
    role: "Пресс-секретарь",
    stamp: "СОВ.\nСЕКРЕТНО",
    quote: "Рыжий, громкий, несгибаемый. Тот, кто умеет превратить любую встречу в цирк, а любой конфликт — в фарс.",
    detail: "Но за маской клоуна скрывается тот, кто предан до конца. И кто готов разбить стул о голову любого, кто посмеет обидеть его команду.",
    rotate: "rotate(0.7deg)",
    tapePos: "-top-4 left-1/3 w-28 h-8",
    tapeRot: "rotate(-1deg)",
    stampRot: "rotate-6",
  },
  {
    id: "almaz",
    name: "алмаз",
    role: "Премьер-министр",
    stamp: "АРХИВ\nКГБ",
    quote: "Тихий, задумчивый, с вечно растрёпанными тёмными волосами. Он чаще других говорит о том, чтобы уйти. Но остаётся.",
    detail: "Его грусть — не слабость. Это цена, которую он платит за то, чтобы видеть мир без розовых очков. Даже когда очень хочется их надеть.",
    rotate: "rotate(-1.4deg) translateY(-10px)",
    tapePos: "-top-4 left-1/4 w-24 h-8",
    tapeRot: "rotate(-3deg)",
    stampRot: "rotate-12",
  },
  {
    id: "ion",
    name: "ион",
    role: "Водитель маршрутки №7",
    stamp: "СОВ.\nСЕКРЕТНО",
    quote: "Тот, кто выключил радио. Не потому, что хотел славы. А потому, что устал улыбаться по команде.",
    detail: "Он не планировал бунт. Он просто однажды вышел на крышу. И сказал то, о чём молчали другие. Система запомнила его. Но не простила.",
    rotate: "rotate(1.9deg)",
    tapePos: "-top-3 left-1/2 w-24 h-8",
    tapeRot: "rotate(2deg)",
    stampRot: "-rotate-12",
  },
  {
    id: "lizika",
    name: "лизика",
    role: "Та, кто всегда рядом",
    stamp: "АРХИВ\nКГБ",
    quote: "У неё самые светлые волосы в этой истории. И самая тяжёлая тайна.",
    detail: "Она любит. Она врёт. Она вытирает пол в чужой комнате и смотрит на звёзды. Но однажды звёзды оказались просто огнями города. А правда — слишком тяжёлой.",
    rotate: "rotate(-0.3deg) translateY(15px)",
    tapePos: "-top-4 right-1/3 w-20 h-8",
    tapeRot: "rotate(-1.5deg)",
    stampRot: "rotate-[5deg]",
  },
  {
    id: "vio",
    name: "вио",
    role: "Тот, кто всё начал",
    stamp: "СОВ.\nСЕКРЕТНО",
    quote: "Работник мэрии, мужчина с кепкой задом наперёд и с видом человека, который всегда знает чуть больше, чем говорит.",
    detail: "Он собрал команду. Он рискнул. А потом исчез из логов — или система стёрла его следы. До сих пор неизвестно.",
    rotate: "rotate(1.1deg)",
    tapePos: "-top-4 left-1/2 -translate-x-1/2 w-24 h-8",
    tapeRot: "rotate(-1deg)",
    stampRot: "rotate-[18deg]",
  },
  {
    id: "ileana",
    name: "илеана",
    role: 'Голос "Молдовской лозы"',
    stamp: "АРХИВ\nКГБ",
    quote: "Резкая, яркая, с длинными тёмными волосами и привычкой говорить правду в лицо. Даже если эта правда режет без ножа.",
    detail: "Она не умеет молчать. Даже когда молчать безопаснее. За это её боятся. И за это же — уважают.",
    rotate: "rotate(-1.6deg) translateY(-5px)",
    tapePos: "-top-4 left-1/2 -translate-x-1/2 w-24 h-8",
    tapeRot: "rotate(2deg)",
    stampRot: "-rotate-[10deg]",
  },
  {
    id: "andre",
    name: "андре",
    role: "Тихая сила",
    stamp: "СОВ.\nСЕКРЕТНО",
    quote: "Огромный, спокойный, работающий на винодельне. Он говорит мало, но когда говорит — все слушают.",
    detail: "Он не стремится быть лидером. Он просто делает своё дело. И прикрывает спины тех, кто идёт впереди.",
    rotate: "rotate(0.5deg)",
    tapePos: "-top-3 left-1/3 w-24 h-8",
    tapeRot: "rotate(3deg)",
    stampRot: "rotate-[4deg]",
  },
  {
    id: "aleksandru",
    name: "александру",
    role: "Шахматист и стратег",
    stamp: "АРХИВ\nКГБ",
    quote: "Тот, кто просчитывает партии на десять ходов вперёд. Но жизнь — не шахматы. И он это знает лучше других.",
    detail: "Его глаза потускнели. Его рубашка выцвела. Но его ум по-прежнему опасен для системы. Даже когда он молчит.",
    rotate: "rotate(-1.2deg) translateY(10px)",
    tapePos: "-top-4 left-1/4 w-20 h-8",
    tapeRot: "rotate(-1deg)",
    stampRot: "rotate-[15deg]",
  },
  {
    id: "tsurkan",
    name: "цуркану",
    role: "Начальник автопарка",
    stamp: "АРХИВ\nЦК",
    quote: "Вечно недовольный, вечно на взводе. Тот, кто грозится отправить подчинённых на асфальтоукладчик, но никогда этого не делает.",
    detail: "Он — часть системы. Её голос в маршрутке. Её напоминание о том, что даже здесь есть начальник. И план нужно выполнять.",
    rotate: "rotate(1.7deg) translateY(-5px)",
    tapePos: "-top-4 left-1/2 w-24 h-8",
    tapeRot: "rotate(-1.5deg)",
    stampRot: "-rotate-[5deg]",
  },
];

export default function Characters() {
  return (
    <>
      <Navbar activeItem="/characters" />

      <div style={{ paddingTop: "80px", flex: "1 0 auto" }}>
        <main className="mx-[72px] pt-8 pb-24 relative z-10">

          <header className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8">
            <div>
              <h1 className="font-display text-7xl md:text-8xl font-bold text-soviet-red tracking-tight leading-none mb-4 uppercase stagger-up">
                Персонажи
              </h1>
              <p className="font-body italic text-xl md:text-2xl text-white/70 max-w-none stagger-up delay-100">
                Случайные попутчики одной маршрутки, за которыми молча наблюдает система.
              </p>
            </div>
            <div className="mt-6 md:mt-0 font-mono text-xs text-soviet-gold tracking-[0.2em] border border-soviet-gold/30 px-4 py-2 uppercase bg-black/30 stagger-up delay-200">
              ИНДЕКС СЧАСТЬЯ: 98,2%
            </div>
          </header>

          <div className="w-full flex flex-col gap-1 mb-8 stagger-up delay-300">
            <div className="w-full h-[2px] bg-[#D4A017]" />
            <div className="w-full h-[0.5px] bg-[#D4A017]" />
          </div>

          <CharactersGrid>
            <section
              aria-label="Character Dossiers"
              className="characters-grid grid grid-cols-6 gap-x-6 gap-y-24"
            >
              {CHARACTERS.map((char, i) => (
                <article
                  key={char.id}
                  className={`card-container relative group col-span-6 md:col-span-3 lg:col-span-2${i === 9 ? " lg:col-start-2" : ""}`}
                  style={{ transform: char.rotate }}
                >
                  <div
                    className={`absolute ${char.tapePos} z-20`}
                    style={{
                      transform: char.tapeRot,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      backdropFilter: "blur(2px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />

                  <div className="bg-paper p-6 pb-8 shadow-card border border-white/10 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                    {/* Фото */}
                    <div className="w-full aspect-[4/3] bg-paper-dark mb-6 relative">
                      <img
                        src={`/images/chars/${char.id}.jpg`}
                        alt={char.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute -top-3 -right-3 bg-white border border-soviet-red text-soviet-red font-mono text-[10px] tracking-widest px-2 py-1 z-10 shadow-sm">
                        {char.role}
                      </div>
                      {/* Стемп — скрываем на мобилке: выходит за границу блока и создаёт ложную тень */}
                      <div className={`stamp hidden md:inline-flex absolute -bottom-8 -right-4 w-24 h-24 text-sm transform ${char.stampRot} z-20 whitespace-pre-line`}>
                        {char.stamp}
                      </div>
                    </div>

                    {/* Имя */}
                    <h2 className="font-display text-5xl font-bold text-soviet-red mb-6 uppercase heading-underline">
                      {char.name}
                    </h2>

                    {/* Цитата */}
                    <div className="quote-box bg-[#E1DDC9] p-4 border border-[#D5D0B9]">
                      <p className="quote-content font-body italic text-xl text-paper-dark leading-snug">
                        &ldquo;{char.quote}&rdquo;
                      </p>
                    </div>

                    {/* Раскрывающийся текст при hover */}
                    <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4 border-t border-black/10 pt-4">
                      <p className="font-mono text-xs group-hover:text-sm text-soviet-red/80 tracking-tighter transition-all duration-300">
                        {char.detail}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </CharactersGrid>

        </main>

        <Footer />
      </div>
    </>
  );
}
