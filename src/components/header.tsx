import React, { useState, useEffect, useRef } from "react";
import { Menu, Pause, Play, Volume2, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Posts", href: "/posts" },
];

export default function Header() {
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [needsUnmute, setNeedsUnmute] = useState(false);
  const [volume, setVolume] = useState(0.28);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedVolume = window.localStorage.getItem("lofi-volume");
    if (!savedVolume) return;
    const parsed = Number(savedVolume);
    if (!Number.isNaN(parsed)) {
      setVolume(parsed);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    window.localStorage.setItem("lofi-volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const tryAutoplay = async () => {
      try {
        audio.muted = false;
        audio.volume = volume;
        await audio.play();
        if (!cancelled) {
          setIsPlaying(true);
          setAutoplayBlocked(false);
          setNeedsUnmute(false);
        }
      } catch {
        try {
          audio.muted = true;
          await audio.play();
          if (!cancelled) {
            setIsPlaying(true);
            setAutoplayBlocked(false);
            setNeedsUnmute(true);
          }
        } catch {
          if (!cancelled) {
            setAutoplayBlocked(true);
            setNeedsUnmute(false);
          }
        }
      }
    };

    tryAutoplay();

    const unlockAudio = async () => {
      try {
        audio.muted = false;
        audio.volume = volume;
        if (audio.paused) {
          await audio.play();
        }
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setNeedsUnmute(false);
      } catch {
        // Browser still blocked playback.
      }
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [volume]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (needsUnmute) {
      try {
        audio.muted = false;
        audio.volume = volume;
        if (audio.paused) {
          await audio.play();
        }
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setNeedsUnmute(false);
      } catch {
        setAutoplayBlocked(true);
      }
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      audio.muted = false;
      audio.volume = volume;
      await audio.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
      setNeedsUnmute(false);
    } catch {
      setAutoplayBlocked(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Large RIPE with shimmer effect */}
            <a href="/" className="group flex items-center gap-3">
              <span className="text-2xl">&#10022;</span>
              <span className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                RIPE
              </span>
              <span className="text-2xl">&#10022;</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-3 rounded-full border border-neutral-200/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-xl">
                <button
                  onClick={toggleAudio}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isPlaying ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"
                  }`}
                  aria-label={needsUnmute ? "Unmute lofi music" : isPlaying ? "Pause lofi music" : "Play lofi music"}
                >
                  {needsUnmute ? <Volume2 size={14} /> : isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>

                <div className="flex items-center gap-2">
                  <Volume2 size={13} className="text-neutral-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    className="h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-neutral-200"
                    style={{
                      background: `linear-gradient(to right, #171717 ${volume * 100}%, #e5e5e5 ${volume * 100}%)`,
                    }}
                    aria-label="Lofi volume"
                  />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-500">
                  {needsUnmute ? "Tap to unmute" : autoplayBlocked && !isPlaying ? "Tap to start" : "Lofi"}
                </span>
              </div>

              <nav className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 group-hover:w-full transition-all duration-300" />
                </a>
              ))}

                {/* Time Display */}
                <div className="flex items-center gap-2 pl-6 border-l border-neutral-200">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm text-neutral-600">{time}</span>
                </div>
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-neutral-100 p-6">
            <nav className="flex flex-col gap-2">
              <button
                onClick={toggleAudio}
                className="mb-3 flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700"
              >
                <span className="flex items-center gap-3">
                  {needsUnmute ? <Volume2 size={18} /> : isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  <span className="text-sm font-medium">
                    {needsUnmute ? "Tap to unmute lofi" : autoplayBlocked && !isPlaying ? "Tap to start lofi" : "Lofi music"}
                  </span>
                </span>
                <span className="text-xs font-mono text-neutral-400">{Math.round(volume * 100)}%</span>
              </button>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-lg text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <audio ref={audioRef} loop preload="auto" autoPlay playsInline>
        <source src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
