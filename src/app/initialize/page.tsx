import type { Metadata } from "next";
import RealityBody from "@/components/RealityBody";
import RealityNavbar from "@/components/RealityNavbar";
import InitializeContent from "@/components/InitializeContent";

export const metadata: Metadata = { title: "Скачать — Реальность" };

export default function InitializePage() {
  return (
    <>
      <RealityBody />
      <div className="real-scanlines-overlay" aria-hidden="true" />
      <RealityNavbar activeItem="/initialize" />
      <InitializeContent />
    </>
  );
}
