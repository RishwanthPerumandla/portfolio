import React, { useState, useCallback } from "react";
import TerminalCursor from "./TerminalCursor";

interface TechItem {
  name: string;
  subtext: string;
  metric?: string;
}

interface StackCardProps {
  title: string;
  items: TechItem[];
  dotColor: string;
  variant?: "default" | "intelligence";
  index: number;
}

export default function StackCard({
  title,
  items,
  dotColor,
  variant = "default",
  index,
}: StackCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const baseClasses =
    variant === "intelligence"
      ? "p-6 border border-neutral-700 rounded-xl bg-neutral-900 text-white hover:border-neutral-600 transition-all duration-300 shadow-lg"
      : "p-6 border border-neutral-200 rounded-xl bg-white hover:border-neutral-400 transition-all duration-300";

  const titleColor = variant === "intelligence" ? "text-neutral-400" : "text-neutral-500";
  const nameColor = variant === "intelligence" ? "text-white" : "text-neutral-900";
  const subtextColor = variant === "intelligence" ? "text-neutral-500" : "text-neutral-400";
  const subtextHoverColor = variant === "intelligence" ? "text-neutral-400" : "text-neutral-600";
  const metricColor = variant === "intelligence" ? "text-green-400" : "text-green-600";

  return (
    <div
      className={baseClasses}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${dotColor} ${
            dotColor === "bg-green-400" ? "animate-breathe" : ""
          }`}
        />
        <h3 className={`font-mono text-xs font-bold uppercase tracking-widest ${titleColor}`}>
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.name}
            className="flex justify-between items-center group overflow-hidden"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className={`font-bold ${nameColor} flex items-center`}>
              {item.name}
              <TerminalCursor show={hoveredIndex === idx} className={variant === "intelligence" ? "bg-white" : "bg-neutral-900"} />
            </span>
            <div className="relative overflow-hidden">
              <span
                className={`text-xs font-mono ${subtextColor} group-hover:${subtextHoverColor} transition-all duration-300 block ${
                  hoveredIndex === idx && item.metric ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
                }`}
              >
                {item.subtext}
              </span>
              {item.metric && (
                <span
                  className={`absolute top-0 left-0 text-xs font-mono ${metricColor} whitespace-nowrap transition-all duration-300 ${
                    hoveredIndex === idx ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  }`}
                >
                  {item.metric}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
