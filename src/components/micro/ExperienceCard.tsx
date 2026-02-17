import React, { useState } from "react";

interface ExperienceCardProps {
  dates: string;
  role: string;
  company: string;
  description: string;
  logo: string;
  index: number;
}

export default function ExperienceCard({
  dates,
  role,
  company,
  description,
  logo,
  index,
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative pl-8 pb-10 last:pb-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200 group-last:bg-gradient-to-b group-last:from-neutral-200 group-last:to-transparent" />
      
      {/* Timeline dot */}
      <div 
        className={`absolute left-0 top-0 w-2 h-2 -translate-x-1/2 rounded-full border-2 border-neutral-300 bg-white transition-all duration-300 ${
          isHovered ? "border-neutral-900 scale-125" : ""
        }`} 
      />

      {/* Logo */}
      <div className="absolute -left-5 top-6 w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm">
        <img src={logo} alt={company} className="w-6 h-6 object-contain" />
      </div>

      {/* Content */}
      <div className="pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            {dates}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-neutral-600 transition-colors">
          {role}
        </h3>
        
        <p className="text-sm font-medium text-neutral-500 mb-3">
          {company}
        </p>
        
        <p className="text-sm text-neutral-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
