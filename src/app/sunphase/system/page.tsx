import type { Metadata } from "next";
import RealityBody from "@/components/RealityBody";
import RealityNavbar from "@/components/RealityNavbar";
import SystemContent from "@/components/SystemContent";

export const metadata: Metadata = { title: "Sunphase System" };

export default function SystemPage() {
  return (
    <>
      <RealityBody />
      <div className="real-scanlines-overlay" aria-hidden="true" />
      <RealityNavbar activeItem="/sunphase" />
      <SystemContent />
    </>
  );
}
