import React, { useState } from "react";

export default function HeroSection() {
  const [showPhoneticTooltip, setShowPhoneticTooltip] = useState(false);

  return (
    <section className="mb-24 relative">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 leading-tight">
          Rishwanth
        </h1>
        <div 
          className="flex items-center gap-3 text-neutral-400 font-mono text-sm relative"
          onMouseEnter={() => setShowPhoneticTooltip(true)}
          onMouseLeave={() => setShowPhoneticTooltip(false)}
        >
          <span className="cursor-help border-b border-dashed border-neutral-300 hover:border-neutral-500 transition-colors">
            /rɪʃ-wʌnθ/
          </span>
          
          {/* Phonetic tooltip */}
          <div
            className="absolute left-0 -top-8 bg-neutral-900 text-white text-[10px] font-mono px-2 py-1 rounded pointer-events-none whitespace-nowrap"
            style={{
              opacity: showPhoneticTooltip ? 1 : 0,
              transform: showPhoneticTooltip ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 200ms ease-out, transform 200ms ease-out",
            }}
          >
            Click to hear pronunciation
            <span className="absolute bottom-0 left-8 translate-y-1/2 rotate-45 w-1.5 h-1.5 bg-neutral-900" />
          </div>
          
          <span className="w-1 h-1 bg-neutral-300 rounded-full" />
          <span className="italic font-serif text-neutral-500">noun</span>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        <p className="text-xl md:text-2xl leading-relaxed font-medium text-neutral-800">
          A <strong>Senior Backend & AI Engineer</strong> building high-performance distributed systems and production-grade AI infrastructure.
        </p>
        <p className="text-xl md:text-2xl leading-relaxed font-medium text-neutral-500">
          I engineer the systems that make intelligence possible. From designing efficient databases to scaling AI inference, I build high-performance backends that run fast and stay up.
        </p>
      </div>
    </section>
  );
}
