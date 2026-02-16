import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1000);
    const t3 = setTimeout(() => setStage(3), 1400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  if (stage === 3) return null;

  const fullName = "Rishwanth Perumandla";
  const ripeIndices = new Set([0, 1, 10, 11]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#fafafa] flex items-center justify-center transition-opacity duration-300 ${stage === 3 ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* SVG Filter for noise texture */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0"/>
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
            <feBlend in="SourceGraphic" in2="monoNoise" mode="overlay"/>
          </filter>
        </defs>
      </svg>

      <div className="relative flex items-center justify-center w-full max-w-4xl h-32">
        <AnimatePresence mode="sync">
          
          {/* Full Name */}
          {stage < 2 && (
            <motion.div
              key="fullname"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 0 ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-3xl md:text-5xl font-bold tracking-tight whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {fullName.split('').map((char, idx) => (
                  <span key={idx} className={ripeIndices.has(idx) ? 'text-neutral-900' : 'text-neutral-300'}>
                    {char}
                  </span>
                ))}
              </span>
            </motion.div>
          )}

          {/* RIPE Logo - Textured, No Shadows */}
          {stage >= 1 && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6"
            >
              {/* Left Star */}
              <span className="text-3xl md:text-5xl text-neutral-900">&#10022;</span>
              
              {/* RIPE - Textured Gradient */}
              <span 
                className="text-8xl md:text-9xl font-bold tracking-tighter"
                style={{
                  fontFamily: "'Kenia', cursive",
                  backgroundImage: 'linear-gradient(90deg, #C33764, #1D2671, #C33764)',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'url(#noiseFilter)',
                  animation: 'ripeShine 3s linear infinite'
                }}
              >
                RIPE
              </span>
              
              {/* Right Star */}
              <span className="text-3xl md:text-5xl text-neutral-900">&#10022;</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] origin-left"
        style={{ 
          background: 'linear-gradient(90deg, #C33764, #1D2671)',
          width: '100%' 
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: stage === 0 ? 0.3 : stage === 1 ? 0.7 : 1 }}
        transition={{ duration: 0.3 }}
      />

      <style>{`
        @keyframes ripeShine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}