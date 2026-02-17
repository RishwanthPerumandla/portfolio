import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [shouldShow, setShouldShow] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setShouldShow(true);
      sessionStorage.setItem('hasVisited', 'true');
      
      const t1 = setTimeout(() => setStage(1), 600);
      const t2 = setTimeout(() => setStage(2), 900);
      const t3 = setTimeout(() => setStage(3), 1600);
      
      return () => [t1, t2, t3].forEach(clearTimeout);
    }
  }, []);

  if (!shouldShow || stage === 3) return null;

  const fullName = "Rishwanth Perumandla";
  const ripeIndices = new Set([0, 1, 10, 11]);

  const starVariants = {
    left: {
      initial: { x: -200, opacity: 0, rotate: -180 },
      animate: { 
        x: 0, 
        opacity: 1, 
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 12,
          mass: 0.8
        }
      }
    },
    right: {
      initial: { x: 200, opacity: 0, rotate: 180 },
      animate: { 
        x: 0, 
        opacity: 1, 
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 12,
          mass: 0.8
        }
      }
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-[#fafafa] flex items-center justify-center transition-opacity duration-300 ${stage === 3 ? 'opacity-0' : 'opacity-100'}`}>
      
      <div className="relative flex items-center justify-center w-full max-w-4xl h-32">
        <AnimatePresence mode="sync">
          
          {stage < 2 && (
            <motion.div
              key="fullname"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 0 ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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

          {stage >= 2 && (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.span
                variants={starVariants.left}
                initial="initial"
                animate="animate"
                className="text-3xl md:text-5xl text-neutral-900 inline-block origin-center"
              >
                &#10022;
              </motion.span>
              
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="text-8xl md:text-9xl font-bold tracking-tighter mx-4 md:mx-6"
                style={{
                  fontFamily: "'Kenia', cursive",
                  backgroundImage: 'linear-gradient(90deg, #C33764, #1D2671, #C33764)',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: 'ripeShine 3s linear infinite'
                }}
              >
                RIPE
              </motion.span>
              
              <motion.span
                variants={starVariants.right}
                initial="initial"
                animate="animate"
                className="text-3xl md:text-5xl text-neutral-900 inline-block origin-center"
              >
                &#10022;
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] origin-left"
        style={{ 
          background: 'linear-gradient(90deg, #C33764, #1D2671)',
          width: '100%' 
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: stage >= 2 ? 1 : stage === 1 ? 0.7 : 0.3 }}
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
