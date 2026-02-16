import React, { useEffect, useRef, useState } from "react";

interface DecodeTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getRandomChar = (): string => CHARS[Math.floor(Math.random() * CHARS.length)];

export default function DecodeText({
  text,
  className = "",
  duration = 800,
  delay = 0,
}: DecodeTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) {
      setDisplayText(text.replace(/./g, "#"));
      return;
    }

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const revealedLength = Math.floor(easeOut * text.length);
      
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealedLength) {
          result += text[i];
        } else {
          result += getRandomChar();
        }
      }
      
      setDisplayText(result);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [started, text, duration]);

  return <span className={`font-mono ${className}`}>{displayText}</span>;
}
