import React, { useRef, useState } from "react";

export default function HeroSection() {
  const [showPhoneticTooltip, setShowPhoneticTooltip] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakPronunciation = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance("Rishwanth");
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="mb-24 relative">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-5xl leading-tight tracking-tighter text-neutral-900 md:text-7xl font-bold">
          I&apos;m Rishwanth
        </h1>

        <div
          className="relative flex flex-wrap items-center gap-3 text-sm font-mono text-neutral-400"
          onMouseEnter={() => setShowPhoneticTooltip(true)}
          onMouseLeave={() => setShowPhoneticTooltip(false)}
        >
          <button
            type="button"
            onClick={speakPronunciation}
            className={`border-b border-dashed bg-transparent transition-colors ${
              isSpeaking
                ? "border-neutral-700 text-neutral-700"
                : "border-neutral-300 hover:border-neutral-500"
            }`}
            aria-label="Hear pronunciation of Rishwanth"
          >
            /rish-wunth/
          </button>

          <div
            className="pointer-events-none absolute left-0 -top-8 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-[10px] text-white"
            style={{
              opacity: showPhoneticTooltip ? 1 : 0,
              transform: showPhoneticTooltip ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 200ms ease-out, transform 200ms ease-out",
            }}
          >
            Click to hear pronunciation
            <span className="absolute bottom-0 left-8 h-1.5 w-1.5 translate-y-1/2 rotate-45 bg-neutral-900" />
          </div>

          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <span className="italic font-serif text-neutral-500">noun</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Hiring
          </span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-500">Dallas, TX</span>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        <p className="text-xl font-medium leading-relaxed text-neutral-800 md:text-2xl">
          A <strong>Backend & AI Engineer</strong> building high-performance distributed systems and production-grade AI systems.
        </p>
        <p className="text-xl font-medium leading-relaxed text-neutral-500 md:text-2xl">
          I engineer the systems that make intelligence possible. From designing efficient databases to scaling AI inference, I build high-performance backends that run fast and stay up.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="mailto:rishwanthperumandla28@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Contact Me
            <span className="text-base leading-none">↗</span>
          </a>

          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
