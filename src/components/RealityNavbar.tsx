"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useMode } from "@/contexts/ModeContext";

const REAL_NAV_LINKS = [
  { href: "/home",       label: "Главная"   },
  { href: "/subjects",   label: "Субъекты"  },
  { href: "/sunphase",   label: "Sunphase"  },
  { href: "/manifesto",  label: "Манифест"  },
  { href: "/audio",      label: "Саундтрек" },
  { href: "/initialize", label: "Скачать"   },
];

interface Props { activeItem?: string; }

export default function RealityNavbar({ activeItem = "/home" }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { switchMode } = useMode();

  const handleToSimulation = useCallback(() => {
    document.body.style.overflow = "";
    setMenuOpen(false);
    switchMode("simulation");
  }, [switchMode]);

  const handleHamburger = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <nav className="real-navbar">
        <Link href="/home" className="real-nav-logo">Tomorrow Will Be Sunny</Link>

        <div className="real-nav-menu">
          {REAL_NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={`real-nav-item${activeItem === href ? " active" : ""}`}>
              {label}
            </Link>
          ))}
        </div>

        <button type="button" onClick={handleToSimulation} className="real-mode-toggle real-mode-toggle-desktop">[ SIM / REAL ]</button>

        <button
          className={`real-hamburger-btn${menuOpen ? " active" : ""}`}
          onClick={handleHamburger}
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          aria-controls="realMobileOverlay"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div
        className={`real-mobile-overlay${menuOpen ? " open" : ""}`}
        id="realMobileOverlay"
        role="dialog"
        aria-modal="true"
        aria-label="Навигация"
      >
        <span className="real-overlay-label">{"// NAVIGATION //"}</span>
        {REAL_NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`real-overlay-nav-item${activeItem === href ? " active" : ""}`}
            onClick={closeMenu}
          >
            {label}
          </Link>
        ))}
        <div className="real-overlay-cyan-line" />
      </div>

      <div className="real-mobile-bottom-bar">
        <button type="button" onClick={handleToSimulation} className="real-mode-toggle" style={{ fontSize: "13px" }}>[ SIM / REAL ]</button>
        <Link href="/initialize">
          <button className="real-cta-btn">Скачать</button>
        </Link>
      </div>
    </>
  );
}
