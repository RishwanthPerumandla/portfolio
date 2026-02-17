"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const quotes = {
  focus: [
    "Before you vanish into the digital void, focus on one thing.",
    "Deep work is the superpower of the 21st century.",
    "The ability to concentrate is the key to success.",
    "One task at a time. That's all.",
  ],
  break: [
    "Rest is not idleness. It's preparation.",
    "Step away. Breathe. Return stronger.",
    "The pause is part of the music.",
    "Recharge your mind.",
  ],
};

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const totalTime = mode === "focus" ? FOCUS_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "focus" ? FOCUS_TIME : BREAK_TIME);
    setQuoteIndex(Math.floor(Math.random() * quotes[newMode].length));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className="relative p-10 bg-white border border-neutral-200 rounded-3xl shadow-sm overflow-hidden"
        animate={{
          background: isActive
            ? mode === "focus"
              ? "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,240,245,0.5) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,248,255,0.5) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
        }}
        transition={{ duration: 1 }}
      >
        {/* Background Pulse when Active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  mode === "focus"
                    ? "radial-gradient(circle at center, rgba(244,63,94,0.1) 0%, transparent 70%)"
                    : "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase mb-8">
            Productivity Engine
          </h3>

          {/* Timer with Circular Progress */}
          <div className="relative mb-10">
            {/* SVG Ring */}
            <svg
              className="transform -rotate-90"
              width="280"
              height="280"
              viewBox="0 0 280 280"
            >
              {/* Background Ring */}
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="#f5f5f5"
                strokeWidth="8"
              />
              {/* Progress Ring with Gradient */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-6xl md:text-7xl font-bold text-neutral-900 font-mono tracking-tighter"
                key={timeLeft}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {formatTime(timeLeft)}
              </motion.span>
            </div>
          </div>

          {/* Mode Toggle with Sliding Pill */}
          <div className="relative flex bg-neutral-100 p-1.5 rounded-full mb-8">
            {/* Sliding Background Pill */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm"
              style={{ width: "calc(50% - 6px)" }}
              animate={{
                x: mode === "focus" ? 0 : "100%",
                xOffset: mode === "focus" ? 0 : 6,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            <button
              onClick={() => switchMode("focus")}
              className={`relative z-10 px-6 py-2 text-xs font-bold rounded-full transition-colors ${
                mode === "focus" ? "text-neutral-900" : "text-neutral-500"
              }`}
            >
              Focus
            </button>
            <button
              onClick={() => switchMode("break")}
              className={`relative z-10 px-6 py-2 text-xs font-bold rounded-full transition-colors ${
                mode === "break" ? "text-neutral-900" : "text-neutral-500"
              }`}
            >
              Break
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Play/Pause Button with Icon Morph */}
            <motion.button
              onClick={toggleTimer}
              className="flex items-center justify-center w-16 h-16 bg-neutral-900 text-white rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.svg
                    key="pause"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="play"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-1"
                  >
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Reset Button with 90deg Rotation on Hover */}
            <motion.button
              onClick={resetTimer}
              className="flex items-center justify-center w-16 h-16 border border-neutral-200 text-neutral-600 rounded-full"
              whileHover={{ rotate: 90, backgroundColor: "#fafafa" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </motion.button>
          </div>

          {/* Quote */}
          <motion.p
            className="mt-8 text-neutral-400 text-sm italic max-w-sm"
            key={mode + quoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            "{quotes[mode][quoteIndex]}"
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
