'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar to 100% then hide
    const start = performance.now();
    const duration = 1800;
    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Small pause at 100% before exit
        timerId = setTimeout(() => setIsVisible(false), 300);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          aria-label="Загрузка"
          role="status"
        >
          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <span className="font-display font-bold uppercase tracking-[0.25em] text-2xl md:text-3xl text-white">
              REELS{' '}
              <span className="text-[#FFCC00]">PRODUCTION</span>
            </span>
          </motion.div>

          {/* Progress bar container */}
          <div className="w-48 md:w-64 h-px bg-neutral-800 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#FFCC00]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress percentage */}
          <motion.span
            className="mt-4 font-mono text-xs text-neutral-500 tracking-widest"
            aria-live="polite"
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
