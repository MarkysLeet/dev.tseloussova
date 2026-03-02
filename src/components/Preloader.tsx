'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;
    let isFinished = false;

    const completeLoading = () => {
      if (isFinished) return;
      isFinished = true;
      setProgress(100);
      timerId = setTimeout(() => setIsVisible(false), 300);
    };

    if (document.readyState === 'complete') {
      completeLoading();
      return;
    }

    const start = performance.now();
    const fastDuration = 1000; // 0 to 80% in 1s
    const slowDuration = 10000; // 80% to 99% in 10s (illusion of heavy loading)

    const tick = (now: number) => {
      if (isFinished) return;
      const elapsed = now - start;
      
      let pct = 0;
      if (elapsed < fastDuration) {
        pct = (elapsed / fastDuration) * 80;
      } else {
        const slowElapsed = elapsed - fastDuration;
        pct = 80 + (slowElapsed / slowDuration) * 19;
      }

      setProgress(Math.min(pct, 99));

      if (pct < 99) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    window.addEventListener('load', completeLoading);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      window.removeEventListener('load', completeLoading);
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
