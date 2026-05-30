import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add no-scroll class to body when loading
    document.body.classList.add('no-scroll');

    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoaded(true);
        setTimeout(() => {
          document.body.classList.remove('no-scroll');
          onComplete();
        }, 600); // Allow exit animations to finish
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.classList.remove('no-scroll');
    };
  }, [onComplete]);

  // Soundwave mock bars
  const waveBars = Array.from({ length: 15 }, (_, i) => i);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Neon Glow backdrops */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Loader Container */}
          <div className="relative flex flex-col items-center max-w-md w-full px-6">
            
            {/* Spinning Vinyl Record */}
            <div className="relative mb-8">
              {/* Vinyl outer ring */}
              <motion.div 
                className="w-48 h-48 rounded-full bg-[#111] border-[6px] border-[#222] shadow-[0_0_40px_rgba(123,46,255,0.3)] flex items-center justify-center relative overflow-hidden"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              >
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-6 rounded-full border border-white/5" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                <div className="absolute inset-14 rounded-full border border-white/5" />
                
                {/* Vinyl Label */}
                <div className="w-16 h-16 rounded-full bg-brand-gold border-4 border-black flex items-center justify-center relative">
                  <div className="w-4 h-4 rounded-full bg-[#050505]" />
                  <span className="absolute text-[8px] font-bold text-black font-montserrat tracking-widest uppercase origin-center rotate-45">
                    HMD
                  </span>
                </div>
              </motion.div>
              
              {/* Tonearm needle */}
              <motion.div 
                className="absolute top-0 -right-4 w-12 h-20 origin-top-left pointer-events-none"
                initial={{ rotate: -25 }}
                animate={{ rotate: -5 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Metal needle graphics */}
                <svg width="40" height="80" viewBox="0 0 40 80" fill="none" className="drop-shadow-lg">
                  <path d="M5 5 L25 15 L25 50 L18 62 L20 70" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="15" y="65" width="8" height="6" fill="#FFD700" rx="1" />
                </svg>
              </motion.div>
            </div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bebas text-white tracking-widest mb-1 text-glow-blue">
                DJ HAMIDA
              </h1>
              <p className="text-xs font-montserrat text-brand-gold tracking-[0.3em] uppercase mb-8">
                A La Bien Mix Party
              </p>
            </motion.div>

            {/* Animated Soundwave */}
            <div className="flex items-end gap-1.5 h-12 mb-8 justify-center">
              {waveBars.map((i) => {
                // Randomize speed/height parameters for organic music motion
                const delay = i * 0.05;
                const duration = 0.5 + Math.random() * 0.6;
                return (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-brand-purple via-brand-blue to-brand-gold"
                    initial={{ height: 4 }}
                    animate={{ 
                      height: [4, 48, 8, 36, 4] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: duration, 
                      delay: delay, 
                      ease: "easeInOut" 
                    }}
                  />
                );
              })}
            </div>

            {/* Percentage Display */}
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden relative mb-2">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-blue to-brand-purple"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center w-full text-[10px] font-montserrat tracking-widest text-white/50">
              <span className="uppercase">INITIALIZING SYSTEM</span>
              <span className="text-brand-blue font-bold">{progress}%</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
