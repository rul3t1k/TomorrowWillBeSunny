import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ModeProvider } from "@/contexts/ModeContext";
import CustomCursor from "@/components/CustomCursor";
import ModeTransition from "@/components/ModeTransition";
import EasterEggAdelaida from "@/components/EasterEggAdelaida";
import FontTransitionWrapper from "@/components/FontTransitionWrapper";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomorrowwillbesunny.com";
const OG_DEFAULT = `${SITE_URL}/og-simulation.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Завтра будет солнечно",
    template: "%s - Завтра будет солнечно",
  },
  description:
    "«Завтра будет солнечно» — инди-игра, советская антиутопия 2029 года. Симуляция запущена. Ты уже внутри.",
  keywords: ["инди игра", "советская антиутопия", "завтра будет солнечно", "indie game", "dystopia", "2029"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Завтра будет солнечно",
    title: "Завтра будет солнечно",
    description: "Симуляция запущена. Ты уже внутри. Советская антиутопия 2029 года.",
    images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: "Завтра будет солнечно" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Завтра будет солнечно",
    description: "Симуляция запущена. Ты уже внутри.",
    images: [OG_DEFAULT],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1c1a12",
};

/** Schema.org VideoGame structured data */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Завтра будет солнечно",
  alternateName: "Tomorrow Will Be Sunny",
  description:
    "Инди-игра в жанре советской антиутопии. 2029 год. Симуляция запущена.",
  genre: ["Indie", "Adventure", "Dystopia", "Narrative"],
  gamePlatform: ["PC"],
  applicationCategory: "Game",
  operatingSystem: "Windows",
  inLanguage: "ru",
  author: {
    "@type": "Person",
    name: "rul3t1k",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    price: "0",
    priceCurrency: "RUB",
  },
  url: SITE_URL,
  image: OG_DEFAULT,
};

/**
 * Google Fonts URL — used twice: once as preload (as="style"), once as stylesheet.
 * This makes the browser start fetching the CSS earlier without blocking render.
 */
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Oswald:wght@700&family=PT+Serif:wght@400;700&family=Share+Tech+Mono&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Font preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Preload the font CSS so it starts downloading before the parser hits the stylesheet link */}
        <link rel="preload" as="style" href={FONTS_URL} />
        {/* Actual stylesheet (display=swap is already in the URL) */}
        <link rel="stylesheet" href={FONTS_URL} />

        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* data-mode управляется через Navbar (симуляция-CSS-оверрайд)
          и ModeContext (сохранение режима в localStorage). */}
      <body className="antialiased" suppressHydrationWarning>
        <ModeProvider>
          <CustomCursor />
          <FontTransitionWrapper>{children}</FontTransitionWrapper>
          <ModeTransition />
          <EasterEggAdelaida />
        </ModeProvider>
      </body>
    </html>
  );
}
