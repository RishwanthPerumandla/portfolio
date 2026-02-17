import React from "react";

interface TerminalCursorProps {
  show: boolean;
  className?: string;
}

export default function TerminalCursor({ show, className = "" }: TerminalCursorProps) {
  if (!show) return null;
  
  return (
    <span 
      className={`inline-block w-[0.6em] h-[1em] bg-neutral-900 ml-0.5 animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}
