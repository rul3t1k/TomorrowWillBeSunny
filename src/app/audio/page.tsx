import type { Metadata } from "next";
import RealityBody from "@/components/RealityBody";
import RealityNavbar from "@/components/RealityNavbar";
import RealityAudioPlayer from "@/components/RealityAudioPlayer";

export const metadata: Metadata = { title: "Саундтрек — Реальность" };

export default function AudioPage() {
  return (
    <>
      <RealityBody />
      <div className="real-scanlines-overlay" aria-hidden="true" />
      <RealityNavbar activeItem="/audio" />
      <RealityAudioPlayer />
    </>
  );
}
