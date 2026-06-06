import type { Metadata } from "next";
import RealityBody from "@/components/RealityBody";
import RealityNavbar from "@/components/RealityNavbar";
import ManifestoContent from "@/components/ManifestoContent";

export const metadata: Metadata = { title: "Манифест — Реальность" };

export default function ManifestoPage() {
  return (
    <>
      <RealityBody />
      <div className="real-scanlines-overlay" aria-hidden="true" />
      <RealityNavbar activeItem="/manifesto" />
      <ManifestoContent />
    </>
  );
}
