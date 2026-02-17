import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, CheckCircle, GitBranch, Volume2 } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [gitPulse, setGitPulse] = useState(true);
  const [volume, setVolume] = useState(() => {
    // Load saved volume or default 0.5
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lofi-volume');
      return saved ? parseFloat(saved) : 0.5;
    }
    return 0.5;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const audioRef = useRef(null);

  // Clock update
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

  // Git pulse
  useEffect(() => {
    const pulse = setInterval(() => setGitPulse(prev => !prev), 3000);
    return () => clearInterval(pulse);
  }, []);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = volume;
      audio.play().then(() => setIsPlaying(true));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('lofi-volume', newVolume.toString());
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const commitWeek = [2, 4, 1, 3, 4, 2, 3];
  const todayCommits = 12;

  const ledVariants = {
    api: { animate: { opacity: [0.4, 1, 0.4] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }},
    db: { animate: { opacity: [0.3, 0.9, 0.3] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }},
    ai: { animate: { opacity: [0.2, 1, 0.2] }, transition: { duration: 0.8, repeat: Infinity, ease: "steps(2)", delay: 0.2 }}
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-12 md:py-4 bg-[#fafafa]/70 backdrop-blur-md transition-all duration-300">
      
      {/* LEFT: Logo */}
      <a href="/" className="group relative z-30 flex items-center space-x-2 text-neutral-900 font-semibold flex-shrink-0">
        <motion.span 
          animate={{ rotate: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-base md:text-lg -translate-y-0.5"
        >
          ✦
        </motion.span>
        <span className="text-lg md:text-2xl tracking-tight font-bold" style={{ fontFamily: "'Kenia', cursive", background: 'linear-gradient(90deg, #C33764, #1D2671, #C33764)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          RIPE
        </span>
        <motion.span 
          animate={{ rotate: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="text-base md:text-lg -translate-y-0.5"
        >
          ✦
        </motion.span>
      </a>

      {/* CENTER: Lofi Player - Fixed Animation */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        
        {/* Desktop Lofi - Smooth expand */}
        <div 
          className="hidden md:flex items-center bg-white rounded-full border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Play Button - Always visible, fixed width */}
          <button 
            onClick={toggleAudio} 
            className="flex items-center justify-center gap-2 pl-5 pr-4 py-2.5 text-[11px] font-mono tracking-widest text-neutral-800 hover:text-black transition-colors uppercase font-semibold flex-shrink-0"
          >
            <motion.div
              animate={isPlaying ? { scale: [1, 1.15, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
            </motion.div>
            <span className="whitespace-nowrap">{isPlaying ? "PLAYING" : "PLAY"}</span>
          </button>

          {/* Volume Section - Smooth width transition using layout */}
          <motion.div
            initial={false}
            animate={{ 
              width: isHovered ? 140 : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
            className="flex items-center gap-3 overflow-hidden flex-shrink-0"
          >
            <div className="w-px h-4 bg-neutral-200 flex-shrink-0" />
            <Volume2 size={12} className="text-neutral-400 flex-shrink-0" />
            <div className="relative flex-shrink-0">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-neutral-200 rounded-full appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #171717 ${volume * 100}%, #e5e5e5 ${volume * 100}%)` 
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-neutral-500 w-6 pr-5">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>

          <audio ref={audioRef} loop preload="metadata">
            <source src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" type="audio/mpeg" />
          </audio>
        </div>

        {/* Mobile Lofi */}
        <div className="flex md:hidden items-center gap-2 relative">
          <button 
            onClick={() => {
              toggleAudio();
              setShowMobileControls(!showMobileControls);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isPlaying ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-200'}`}
          >
            <motion.div
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </motion.div>
            <span className="text-[10px] font-mono uppercase font-medium">{isPlaying ? "ON" : "LOFI"}</span>
          </button>

          <AnimatePresence>
            {showMobileControls && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg p-4 z-50 w-44"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Volume</span>
                  <span className="text-[10px] font-mono text-neutral-900 font-bold">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none mb-3"
                  style={{ background: `linear-gradient(to right, #171717 ${volume * 100}%, #e5e5e5 ${volume * 100}%)` }}
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAudio();
                  }}
                  className="w-full py-2 text-[10px] font-mono uppercase bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-700 font-semibold"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <audio ref={audioRef} loop preload="metadata">
            <source src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>

      {/* RIGHT: System Metrics + Time */}
      <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
        
        {/* Git Pulse */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-neutral-100/50 rounded-full border border-neutral-200/50 group cursor-pointer hover:bg-neutral-100 transition-colors relative">
          <div className="flex items-center gap-1">
            {commitWeek.map((commits, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.05, type: "spring" }}
                className={`w-1 rounded-full ${i === 6 ? 'bg-rose-500' : 'bg-neutral-400'}`}
                style={{ height: `${4 + commits * 2}px`, opacity: i === 6 && gitPulse ? 1 : 0.6 + (commits * 0.1) }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-600">
            <GitBranch size={10} className="text-neutral-400" />
            <span className="text-neutral-900 font-bold">{todayCommits}</span>
            <motion.span 
              animate={gitPulse ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="w-1 h-1 rounded-full bg-green-500"
            />
          </div>
        </div>

        {/* Status LEDs */}
        <div className="hidden lg:flex items-center gap-2 px-2 py-1.5 bg-neutral-100/30 rounded-lg border border-neutral-200/30">
          <motion.div variants={ledVariants.api} animate="animate" className="w-1 h-4 rounded-full bg-green-500" title="API" />
          <motion.div variants={ledVariants.db} animate="animate" className="w-1 h-4 rounded-full bg-blue-500" title="DB" />
          <motion.div variants={ledVariants.ai} animate="animate" className="w-1 h-4 rounded-full bg-purple-500" title="AI" />
        </div>

        {/* Operational Badge */}
        <div className="hidden sm:flex lg:hidden items-center gap-1.5 px-2 py-1.5 bg-neutral-100/30 rounded-lg border border-neutral-200/30">
          <CheckCircle size={10} className="text-green-500" />
          <span className="text-[9px] font-mono text-neutral-500 uppercase">Live</span>
        </div>

        {/* Time */}
        <div className="font-mono text-xs font-bold text-neutral-900 min-w-[45px] text-right tabular-nums bg-white/50 md:bg-transparent px-2 py-1 md:p-0 rounded md:rounded-none border md:border-0 border-neutral-200/50">
            {time}
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #171717;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #171717;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      `}</style>
    </header>
  );
}