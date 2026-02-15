import React from "react";

export default function GithubActivity() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl border border-neutral-200 p-8 shadow-sm">
      <div className="w-full overflow-x-auto scrollbar-hide flex justify-center">
        {/* Changed color from 171717 to 216e39 (GitHub Green) */}
        <img 
          src="https://ghchart.rshah.org/216e39/RishwanthPerumandla" 
          alt="GitHub Contribution Graph"
          className="min-w-[700px] w-full opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>
      <div className="flex items-center gap-2 mt-6">
        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
        <p className="text-xs font-mono text-neutral-400">
            "Consistency is the only algorithm that matters."
        </p>
      </div>
    </div>
  );
}