import React, { useEffect, useRef, useState, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "hover" | "mount";
  duration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getRandomChar = (): string => CHARS[Math.floor(Math.random() * CHARS.length)];

export default function TextScramble({
  text,
  className = "",
  trigger = "hover",
  duration = 800,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - (startTimeRef.current ?? 0);
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const revealedLength = Math.floor(easeOut * text.length);
      
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < revealedLength) {
          result += text[i];
        } else {
          // Random character that isn't the target
          let randomChar = getRandomChar();
          while (randomChar === text[i]) {
            randomChar = getRandomChar();
          }
          result += randomChar;
        }
      }
      
      setDisplayText(result);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [text, duration, isScrambling]);

  useEffect(() => {
    if (trigger === "mount") {
      scramble();
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [trigger, scramble]);

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
    >
      {displayText}
    </span>
  );
}
