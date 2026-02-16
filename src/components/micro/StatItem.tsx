import React from "react";

interface StatItemProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatItem({ value, label, delay = 0 }: StatItemProps) {
  return (
    <div className="text-center sm:text-left">
      <div className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">
        {value}
      </div>
      <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
