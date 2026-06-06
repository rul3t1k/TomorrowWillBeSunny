"use client";

import { useRef, useCallback } from "react";

export interface SubjectCardRow {
  label: string;
  value: string;
  valueClass?: string;
}

export interface SubjectCardProps {
  id: string;
  role: string;
  name: string;
  image: string;
  imageAlt: string;
  rows: SubjectCardRow[];
  overlayIcon: string;
  overlayText: string;
}

export default function SubjectCard({ id, role, name, image, imageAlt, rows, overlayIcon, overlayText }: SubjectCardProps) {
  const typewriterRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onEnter = useCallback(() => {
    const el = typewriterRef.current;
    if (!el) return;
    el.textContent = "";
    let index = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (index < overlayText.length) {
        el.textContent += overlayText.charAt(index);
        index++;
      } else {
        clearInterval(intervalRef.current!);
      }
    }, 25);
  }, [overlayText]);

  const onLeave = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (typewriterRef.current) typewriterRef.current.textContent = "";
  }, []);

  return (
    <div
      className="subject-card border border-accent-blue bg-bg-surface p-1 flex flex-col group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(76,214,251,0.2)] hover:border-[#4cd6fb] flex-initial w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="bg-accent-blue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider group-hover:bg-[#4cd6fb] group-hover:text-[#090d16] transition-colors">
        [{id}] PROFILE // {role}
      </div>
      <div className="relative h-96 border-b border-accent-blue/40 overflow-hidden bg-black/40">
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#4cd6fb]/40 z-10" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#4cd6fb]/40 z-10" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#4cd6fb]/40 z-10" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#4cd6fb]/40 z-10" />
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4 flex flex-col gap-2 relative min-h-[190px]">
        <div className="flex justify-between items-end border-b border-[#869398]/20 pb-1">
          <span className="text-[10px] text-[#869398] uppercase">NAME:</span>
          <h2 className="text-xl font-bold text-[#4cd6fb] uppercase leading-none">{name}</h2>
        </div>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between items-center py-1 text-xs${i < rows.length - 1 ? " border-b border-[#869398]/20" : ""}`}
          >
            <span className="text-[#869398]">{row.label}:</span>
            <span className={row.valueClass ?? "text-white"}>{row.value}</span>
          </div>
        ))}
        <div className="absolute inset-0 bg-[#090d16]/95 p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 border border-[#4cd6fb]">
          <span className="material-symbols-outlined text-[#4cd6fb] text-3xl mb-2">{overlayIcon}</span>
          <div
            ref={typewriterRef}
            className="typewriter-container text-[11px] text-[#4cd6fb] text-center leading-relaxed uppercase tracking-wide"
          />
        </div>
      </div>
    </div>
  );
}
