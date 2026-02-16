import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  label?: string;
  variant?: "default" | "terminal" | "creative";
}

export default function PageHeader({
  title,
  subtitle,
  description,
  label,
  variant = "default",
}: PageHeaderProps) {
  const baseClasses = "mb-12";
  
  if (variant === "terminal") {
    return (
      <div className={baseClasses}>
        {label && (
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              {label}
            </span>
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-mono text-sm text-neutral-500 mb-4">{subtitle}</p>
        )}
        {description && (
          <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }

  if (variant === "creative") {
    return (
      <div className={baseClasses}>
        {label && (
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">
            {label}
          </span>
        )}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-neutral-900 mb-4">
          <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        {subtitle && (
          <p className="text-xl text-neutral-500 italic mb-4">{subtitle}</p>
        )}
        {description && (
          <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      {label && (
        <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">
          {label}
        </span>
      )}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
        {title}
      </h1>
      {description && (
        <p 
          className="text-lg text-neutral-600 max-w-2xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
