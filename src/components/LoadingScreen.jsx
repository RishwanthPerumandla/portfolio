import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fast timeline: 0ms -> 400ms -> 800ms -> 1200ms
    const t1 = setTimeout(() => setPhase(1), 400);  // Isolate RIPE
    const t2 = setTimeout(() => setPhase(2), 800);  // Collapse to brand
    const t3 = setTimeout(() => setPhase(3), 1200); // Exit
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#fafafa] z-[100]" />;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#fafafa] flex items-center justify-center transition-opacity duration-300 ease-out will-change-[opacity] ${
        phase === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center h-16 w-full max-w-2xl px-8">
        
        {/* Layer 1: Full Name - Snappy fade out */}
        <div 
          className={`absolute inset-0 flex items-center justify-center gap-[0.05em] transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-[transform,opacity] ${
            phase >= 1 ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {"Rishwanth Perumandla".split('').map((char, i) => {
            const isRipe = ['R','i','P','e'].includes(char) && (i === 0 || i === 9 || i === 10 || i === 19);
            const isSpace = char === ' ';
            return (
              <span
                key={i}
                className={`inline-block text-2xl md:text-4xl font-bold tracking-tight transition-transform duration-300 ${
                  isRipe ? 'text-neutral-900' : 'text-neutral-300'
                }`}
                style={{
                  transform: phase >= 1 && !isRipe ? 'translateY(10px)' : 'translateY(0)',
                  opacity: phase >= 1 && !isRipe ? 0 : 1,
                  transitionDelay: isSpace ? '0ms' : `${i * 15}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          })}
        </div>

        {/* Layer 2: RIPE Logo - Hard cut with elastic scale */}
        <div 
          className={`flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-[transform,opacity] ${
            phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
          }`}
        >
          <span className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient will-change-transform">
            RIPE
          </span>
        </div>

        {/* Progress bar - Fast sweep */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 w-full origin-left will-change-transform"
          style={{
            transform: `scaleX(${phase === 0 ? 0 : phase === 1 ? 0.5 : phase === 2 ? 1 : 1})`,
            transition: 'transform 400ms cubic-bezier(0.25,0.46,0.45,0.94)'
          }}
        />
      </div>
    </div>
  );
}