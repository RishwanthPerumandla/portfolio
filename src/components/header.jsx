import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Globe, CheckCircle } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    // Updated: More transparent, no border, closer blurring
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-[#fafafa]/60 backdrop-blur-md transition-all duration-300">
      
      {/* LEFT: RIPE LOGO */}
      <a href="/" className="group relative z-30 flex items-center space-x-2 text-neutral-900 font-semibold">
        <span className="text-lg -translate-y-0.5 group-hover:-rotate-12 transition-transform duration-300">✦</span>
        <span className="ripe ripe-shimmer text-xl md:text-2xl tracking-tight">RIPE</span>
        <span className="text-lg -translate-y-0.5 group-hover:rotate-12 transition-transform duration-300">✦</span>
      </a>

      {/* RIGHT: REAL METRICS */}
      <div className="flex items-center gap-6">
        
        {/* Lofi Player */}
        <div className="hidden md:flex items-center gap-3 pr-6 border-r border-neutral-200/50">
          <button onClick={toggleAudio} className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-500 hover:text-black transition-colors uppercase">
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "PAUSE LOFI" : "PLAY LOFI"}</span>
          </button>
          <audio ref={audioRef} loop>
            <source src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" type="audio/mpeg" />
          </audio>
        </div>

        {/* Static Reliability Stats */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-neutral-500 tracking-wider">
            <div className="flex items-center gap-1.5" title="System Status">
                <CheckCircle size={12} className="text-green-500" />
                <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-1.5" title="Server Region">
                <Globe size={12} className="text-neutral-400" />
                <span>US-CENTRAL1</span>
            </div>
        </div>

        {/* Time */}
        <div className="font-mono text-xs font-bold text-neutral-900 min-w-[60px] text-right">
            {time}
        </div>

      </div>
    </header>
  );
}