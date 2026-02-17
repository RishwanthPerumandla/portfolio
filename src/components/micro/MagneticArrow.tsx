import React, { useRef, useState, useCallback } from "react";

interface MagneticArrowProps {
  className?: string;
  size?: number;
}

export default function MagneticArrow({ 
  className = "", 
  size = 16 
}: MagneticArrowProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    
    const maxDistance = 30; // 30px magnetic radius
    
    if (distance < maxDistance) {
      const strength = 1 - distance / maxDistance;
      setTransform({
        x: distX * strength * 0.5,
        y: distY * strength * 0.5,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-150 ease-out ${className}`}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 7L15 15M15 15V7M15 15H7" />
      </svg>
    </span>
  );
}
