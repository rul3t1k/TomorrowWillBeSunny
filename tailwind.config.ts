import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Режим «Симуляция»
        "sim-bg": "#1C1A12",
        "sim-surface": "#F2EDDA",
        "sim-red": "#C0392B",
        "sim-red-hover": "#a12d22",
        "sim-gold": "#D4A017",
        "sim-amber": "#E8890C",
        "sim-muted": "#7A6A52",
        "sim-dark-surface": "#25231a",
        "sim-dark-border": "#3a3628",

        // Алиасы для index4.html (Персонажи) — те же цвета, другие имена
        "paper": "#F2EDDA",
        "paper-dark": "#25231a",
        "soviet-red": "#C0392B",
        "soviet-gold": "#D4A017",
        "soviet-bg": "#1C1A12",
        "soviet-text": "#F2EDDA",

        // Режим «Реальность»
        "bg-main": "#05070B",
        "bg-surface": "#0D1117",
        "accent-cyan": "#00B4D8",
        "accent-blue": "#1B4FBF",
        "alert-red": "#E63946",
        "muted-gray": "#4A5568",

        // Саундтрек — Material Design palette плеера
        "on-surface": "#e7e3d0",
        "surface-container": "#212014",
        "surface-bright": "#3b392c",
        "inverse-surface": "#e7e3d0",
        "surface-container-highest": "#373528",
        "on-surface-variant": "#e1bfb9",
        "surface-container-high": "#2c2a1e",
        "surface-dim": "#151409",
        "surface-container-lowest": "#100e05",
        "primary-container": "#c0392b",
        "outline-variant": "#59413d",
        "outline": "#a88a85",
        "surface-variant": "#373528",
        "error": "#ffb4ab",
        "secondary": "#f6be39",
        "brand-terminal": "#32F166",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        ptserif: ["PT Serif", "serif"],
        tech: ["Share Tech Mono", "monospace"],
        space: ["Space Mono", "monospace"],
        mono: ["Share Tech Mono", "monospace"],
        // Алиасы для index4.html
        display: ["Oswald", "sans-serif"],
        body: ["Cormorant Garamond", "serif"],
        // Алиасы для index7.html (саундтрек)
        label: ["Share Tech Mono", "monospace"],
        h2: ["Oswald", "sans-serif"],
        subheader: ["Cormorant Garamond", "serif"],
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.3)",
      },
      backgroundImage: {
        noise:
          "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};
export default config;
