import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus"); // 'focus' or 'break'

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white border border-neutral-200 rounded-2xl shadow-sm">
      <div className="flex flex-col items-center text-center">
        
        <h3 className="text-sm font-mono tracking-widest text-neutral-400 uppercase mb-6">
          Productivity Engine
        </h3>

        {/* Timer Display */}
        <div className="text-7xl md:text-8xl font-bold text-neutral-900 font-mono tracking-tighter mb-8">
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex bg-neutral-100 p-1 rounded-full">
            <button
              onClick={() => switchMode("focus")}
              className={`px-4 py-1 text-xs font-bold rounded-full transition-all ${
                mode === "focus" ? "bg-white shadow text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              25m Focus
            </button>
            <button
              onClick={() => switchMode("break")}
              className={`px-4 py-1 text-xs font-bold rounded-full transition-all ${
                mode === "break" ? "bg-white shadow text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              5m Break
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className="flex items-center justify-center w-16 h-16 bg-neutral-900 text-white rounded-full hover:scale-105 transition-transform"
          >
            {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center justify-center w-16 h-16 border border-neutral-200 text-neutral-600 rounded-full hover:bg-neutral-50 transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <p className="mt-8 text-neutral-400 text-sm italic">
          "Before you vanish into the digital void, focus on one thing."
        </p>

      </div>
    </div>
  );
}