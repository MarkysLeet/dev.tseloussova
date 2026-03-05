'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X, ChevronUp, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useLenis } from 'lenis/react';

interface Video {
  id: number | string;
  videoSrc: string;
  company?: string;
  description?: string;
  title?: string;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
  videos: Video[];
  orientation: 'vertical' | 'horizontal';
}

const VideoSlide = ({ video, isActive, shouldLoad, orientation }: { video: Video; isActive: boolean; shouldLoad: boolean; orientation: 'vertical' | 'horizontal' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isActive) {
      videoEl.currentTime = 0;
      videoEl.muted = false; // Try to unmute by default
      setIsMuted(false);

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            // If autoplay with sound fails, try muted
            videoEl.muted = true;
            setIsMuted(true);
            videoEl.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          });
      }
    } else {
      videoEl.pause();
      setIsPlaying(false);
      videoEl.currentTime = 0;
    }
  }, [isActive]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Stop propagation to prevent drag/click conflicts
    const val = Number(e.target.value);
    if (videoRef.current) {
      const time = (val / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(val);
    }
  };

  // Auto-hide controls in horizontal mode
  useEffect(() => {
    if (orientation === 'horizontal' && isPlaying) {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, orientation, progress]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying && orientation === 'horizontal') {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  return (
    <div
      className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center h-full w-full"
      onClick={togglePlay}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {shouldLoad ? (
          <video
            ref={videoRef}
            src={video.videoSrc}
            className={`max-h-full max-w-full ${orientation === 'vertical' ? 'object-contain' : 'object-contain'} shadow-2xl bg-black`}
            playsInline
            loop
            preload={isActive ? 'auto' : 'auto'} // preload adjacent slides when shouldLoad is true
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="w-full h-full bg-black" />
        )}

        {/* Center Play Icon Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="bg-black/40 rounded-full p-6 backdrop-blur-sm border border-white/10">
                <Play className="w-12 h-12 text-white fill-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vertical UI (TikTok Style) */}
        {orientation === 'vertical' && (
          <>
            <div className="absolute bottom-0 left-0 w-full pt-32 pb-12 px-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10 flex flex-col items-center">
              <div className="w-full">
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{video.company || video.title}</h3>
                <p className="text-zinc-300 text-sm leading-snug">{video.description}</p>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-6 flex flex-col items-center text-white/70 pointer-events-none"
              >
                <ChevronUp className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Scrubber for Reels */}
            <div className="absolute bottom-0 left-0 w-full z-30" onClick={(e) => e.stopPropagation()}>
               <input
                 type="range"
                 min="0"
                 max="100"
                 value={progress}
                 onChange={handleSeek}
                 className={`w-full appearance-none bg-white/30 cursor-pointer focus:outline-none transition-all duration-300 ${isPlaying ? 'h-1 pointer-events-none' : 'h-3 pointer-events-auto'}`}
                 style={{
                    background: `linear-gradient(to right, #FFCC00 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                 }}
               />
               <style jsx>{`
                 input[type=range]::-webkit-slider-thumb {
                   -webkit-appearance: none;
                   width: 0;
                   height: 0;
                 }
                 input[type=range]::-moz-range-thumb {
                    width: 0;
                    height: 0;
                    border: none;
                 }
               `}</style>
            </div>
          </>
        )}

        {/* Horizontal UI (Promo Style) */}
        {orientation === 'horizontal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-30 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Info Overlay */}
            <div className="w-full max-w-4xl mx-auto px-2 pointer-events-none">
                 <h3 className="text-white font-bold text-lg">{video.company || video.title}</h3>
                 {video.description && <p className="text-zinc-400 text-sm">{video.description}</p>}
            </div>

            <div className="flex items-center gap-4 w-full max-w-4xl mx-auto">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#FFCC00] transition-colors p-2"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>

              {/* Progress Bar */}
              <div className="flex-1 relative h-10 flex items-center group">
                 <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#FFCC00] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:scale-0 group-hover:[&::-webkit-slider-thumb]:scale-100"
                  style={{
                    background: `linear-gradient(to right, #FFCC00 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                  }}
                />
              </div>

              {/* Volume */}
              <button
                onClick={toggleMute}
                className="text-white hover:text-[#FFCC00] transition-colors p-2"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  initialIndex,
  videos,
  orientation
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialIndex,
    loop: true,
    axis: orientation === 'vertical' ? 'y' : 'x',
    duration: 30
  });

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  // Motion values for drag
  const dragY = useMotionValue(0);
  const bgOpacity = useTransform(dragY, [-100, 0, 100], [0, 1, 0]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      if (emblaApi) {
        emblaApi.reInit({ axis: orientation === 'vertical' ? 'y' : 'x', startIndex: initialIndex });
        emblaApi.scrollTo(initialIndex, true);
        setSelectedIndex(initialIndex);
      }
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      dragY.set(0); // Reset drag position
    }
    return () => {
       lenis?.start();
       document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex, emblaApi, orientation, dragY, lenis]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen || !emblaApi) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (orientation === 'vertical') {
        if (e.key === 'ArrowDown') emblaApi.scrollNext();
        if (e.key === 'ArrowUp') emblaApi.scrollPrev();
      } else {
        if (e.key === 'ArrowRight') emblaApi.scrollNext();
        if (e.key === 'ArrowLeft') emblaApi.scrollPrev();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, emblaApi, orientation, onClose]);

  // Mouse Wheel Navigation for Vertical Mode
  useEffect(() => {
    if (!emblaApi || orientation !== 'vertical' || !isOpen) return;

    let lastWheelTime = 0;
    const throttleDelay = 500;

    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < throttleDelay) return;

      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          emblaApi.scrollNext();
          lastWheelTime = now;
        } else {
          emblaApi.scrollPrev();
          lastWheelTime = now;
        }
      }
    };

    const node = emblaApi.rootNode();
    node.addEventListener('wheel', onWheel, { passive: true });

    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi, orientation, isOpen]);

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.y) > 100) {
          onClose();
      }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Видео просмотр">
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: orientation === 'horizontal' ? bgOpacity : 1 }}
        onClick={onClose}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[120] text-white hover:text-white/80 transition-all p-2 bg-black/20 rounded-full backdrop-blur-sm hover:bg-black/40 group"
        aria-label="Close"
      >
        <X size={28} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Navigation for Horizontal Mode */}
      {orientation === 'horizontal' && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-[#FFCC00] transition-colors hidden md:block p-2"
            aria-label="Previous"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-[#FFCC00] transition-colors hidden md:block p-2"
            aria-label="Next"
          >
            <ChevronRight size={48} />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <motion.div
        className="w-full h-full flex items-center justify-center overflow-hidden relative z-[105]"
        drag={orientation === 'horizontal' ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{ y: dragY }}
        onDragEnd={onDragEnd}
      >
        <div
            className={`w-full h-full ${orientation === 'vertical' ? 'touch-pan-y' : 'touch-pan-x'} pointer-events-auto`}
            ref={emblaRef}
            onClick={(e) => e.stopPropagation()}
        >
            <div className={`flex w-full h-full ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}>
              {videos.map((video, index) => {
                const n = videos.length;
                const shouldLoad =
                  Math.abs(index - selectedIndex) <= 1 ||
                  (selectedIndex === 0 && index === n - 1) ||
                  (selectedIndex === n - 1 && index === 0);
                return (
                  <VideoSlide key={video.id} video={video} isActive={index === selectedIndex} shouldLoad={shouldLoad} orientation={orientation} />
                );
              })}
            </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};
