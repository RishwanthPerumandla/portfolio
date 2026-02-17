import React, { useRef, useState, useCallback } from "react";

interface ProjectRowProps {
  id: string;
  name: string;
  role: string;
  desc: string;
  link: string;
  index: number;
}

export default function ProjectRow({
  id,
  name,
  role,
  desc,
  link,
  index,
}: ProjectRowProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [arrowTransform, setArrowTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });

    // Magnetic arrow effect
    if (arrowRef.current) {
      const arrowRect = arrowRef.current.getBoundingClientRect();
      const arrowCenterX = arrowRect.left + arrowRect.width / 2;
      const arrowCenterY = arrowRect.top + arrowRect.height / 2;

      const distX = e.clientX - arrowCenterX;
      const distY = e.clientY - arrowCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDistance = 30;

      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        setArrowTransform({
          x: distX * strength * 0.4,
          y: distY * strength * 0.4,
        });
      }
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setArrowTransform({ x: 0, y: 0 });
  }, []);

  return (
    <a
      ref={ref}
      href={link}
      className="group relative block py-6 border-b border-dashed border-neutral-200 transition-all duration-300"
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0,0,0,0.02), transparent 50%)`
          : "transparent",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight border effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0,0,0,0.08) 0%, transparent 40%)`,
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div className="flex items-baseline gap-4 md:w-1/3">
          <span className="font-mono text-xs text-neutral-400">#{id}</span>
          <span className="font-bold text-lg text-neutral-900 decoration-1 underline-offset-4 group-hover:underline transition-all">
            {name}
          </span>
        </div>
        <div className="md:w-1/4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
            {role}
          </span>
        </div>
        <div className="md:w-1/3">
          <span className="text-sm text-neutral-600">{desc}</span>
        </div>
        <div className="hidden md:block text-neutral-300 group-hover:text-neutral-900 transition-colors duration-300">
          <span
            ref={arrowRef}
            className="inline-block transition-transform duration-150 ease-out will-change-transform"
            style={{
              transform: `translate(${arrowTransform.x}px, ${arrowTransform.y}px)`,
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
