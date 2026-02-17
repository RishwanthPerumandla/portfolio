import React, { useState, useEffect, useCallback } from "react";

interface ActivityTickerProps {
  logs: string[];
  interval?: number;
  typingSpeed?: number;
  className?: string;
}

export default function ActivityTicker({
  logs,
  interval = 4000,
  typingSpeed = 50,
  className = "",
}: ActivityTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const typeText = useCallback((text: string) => {
    setIsTyping(true);
    setDisplayText("");
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [typingSpeed]);

  useEffect(() => {
    typeText(logs[0]);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % logs.length;
        typeText(logs[nextIndex]);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(logInterval);
  }, [logs, interval, typeText]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={`font-mono ${className}`}>
      <span className="text-neutral-400 mr-2">$</span>
      <span>{displayText}</span>
      <span 
        className={`inline-block w-2 h-4 bg-neutral-500 ml-0.5 align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  );
}
