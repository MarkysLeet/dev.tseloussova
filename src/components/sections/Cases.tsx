'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Typography';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoModal } from '../ui/VideoModal';
import { Button } from '../ui/Button';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const reelsCases = [
  { id: 1, company: 'Brusconi motors', description: 'Съемка авто', videoSrc: 'https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1771845655/reels3_f6m63t.mp4' },
  { id: 2, company: 'Александр Ревва', description: 'Съемка клипа «ALARM»', videoSrc: 'https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1771845677/reels1_qesllg.mp4' },
  { id: 3, company: 'Премия FB «Человек года 2025»', description: 'Съемка для номинанта на премию', videoSrc: 'https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1771845725/reels2_thtdow.mp4' },
  { id: 4, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022326/IMG_7333_sdzlem.mp4", company: "Bork", description: "Съемка процесса обучения для сотрудников" },
  { id: 5, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022400/IMG_7190_r8fral.mp4", company: "Brusconi motors", description: "Съемка авто" },
  { id: 6, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022460/AQPCY6BH119KMhn157L7H_D_U6hjCAYx3SxigwrRxiNLjEJlTeFXPj3s2FBop_Eu3Gc_fm1s83.mp4", company: "Etalist", description: "Съемка продающего Reels" },
  { id: 7, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022461/AQOTYr2XdR6BGeqXnYVwiuhUgvHsbhM_IZU_Cmkjb9lgdgnouNFgI8VbIBr1QKi_cygmko.mp4", company: "Etalist", description: "Съемка продающего Reels" },
  { id: 8, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022511/IMG_1421_xkjofz.mp4", company: "Geneine clinic", description: "Съемка художественного Reels" },
  { id: 9, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022570/document_5832626026747796548_gtuqeb.mp4", company: "Riga Holiday", description: "Съемка продающего Reels" },
  { id: 10, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022574/AQMKTu9D4s378QgI0kBMQ7iBiDDqVp_JtsHpkSgqVBez8Hhwp25AfNAjvPtdjTs_g8p9rt.mp4", company: "Riga Holiday", description: "Съемка продающего Reels" },
  { id: 11, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022575/AQPKVQhKB4jwNSBq01YcqNCSFIBBfbhvPp52uoJwhG6A7SZM5xEJg39Py4c953C7ZEXkUFZ_dlxhpf.mp4", company: "Riga Holiday", description: "Съемка продающего Reels" },
  { id: 12, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022578/document_5832626026747796549_pr2s73.mp4", company: "Riga Holiday", description: "Съемка продающего Reels" },
  { id: 13, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022655/IMG_0350_bumwmc.mp4", company: "СберМаркетинг", description: "Съемка бизнес-завтрака" },
  { id: 14, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022684/AQN3EVFJMMQQ1x4bH7Vs4OzUsdXWuGKxZrkFSRxEKZ_J9JhNjcmXZH2OJc00FrIzfeZ2IVyLQaK_nby7wm.mp4", company: "ЖК «Звездный»", description: "Съемка продающего Reels" },
  { id: 15, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022685/AQNt7cm7reE2QvFzu6T7AuzmwQU5a8HQTtecU87CqR95Uhxz5OMEUj7vKQDGrE1_i6bjyx.mp4", company: "ЖК «Звездный»", description: "Съемка продающего Reels" },
  { id: 16, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022690/AQOqV9u19nlqZrnpmH7MjE3Mh5Ze5g1In_2UGgsIIQ2_K29HJGScrlJc7P2CCcg_uauebg.mp4", company: "ЖК «Звездный»", description: "Съемка продающего Reels" },
  { id: 17, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022691/AQNtRlG7Z_ts8zMA37gW5E6Dj2Eb0n2_URxvahLwmN_yE8NeOr7sqSR3rhrFsuT_gfqj1k.mp4", company: "ЖК «Звездный»", description: "Съемка продающего Reels" },
  { id: 18, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022744/AQOM_b7MZNw0vSPMoIicrcdCmGpOpeGkP_6_E4Ij2sub6df6tw0C2ycgGtjb6wQ_bdvssw.mp4", company: "Te100steron", description: "Съемка концерта группы" },
  { id: 19, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022777/AQPgPaZYGQ8PepGsZ5nuD_jmkMn42Vbg_w939XY0dajUByb1WhAFI8czH20n34tooBsizoIQWJG3R_doc88z.mp4", company: "Планета творчества", description: "Съемка продающего Reels" },
  { id: 20, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022777/IMG_9998_tw0unp.mp4", company: "Планета творчества", description: "Съемка продающего Reels" },
  { id: 21, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022764/AQMB_UpPHe0IuXuwiPGRzeLfSl8uHNskd4_VuZFVCrB3wnzjIEoVgHnsdQPfNb__ufuseh.mp4", company: "Планета творчества", description: "Съемка продающего Reels" },
  { id: 22, videoSrc: "https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772022852/IMG_3480_kozkqb.mp4", company: "Премия РУ-ТВ", description: "Съемка премии для Александра Реввы" }
];

const promoCases = [
  { id: 3, company: 'Деловой престиж', description: 'Работа для премии', videoSrc: 'https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1772650811/IMG_7297_t6uxwo.mp4' },
  { id: 1, company: 'RIGA HOLIDAY', description: 'Реклама для коттеджного поселка', videoSrc: 'https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1771847942/full1_uskqkv.mp4' },
  { id: 2, company: 'Сибирский Конор', description: 'Съемка и монтаж с открытия барбершопа', videoSrc: 'https://res.cloudinary.com/dcnwhciua/video/upload/q_auto,f_auto/v1771846115/hero2_wdazjm.mp4' },
];

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

interface VideoCardProps {
  video: {
    id: number | string;
    company: string;
    description: string;
    videoSrc: string;
  };
  index: number;
  openModal: (index: number) => void;
  variants: any;
  isActive?: boolean;
}

const MobileVideoCard = ({ video, index, openModal, variants }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState(index <= 2 ? video.videoSrc : '');

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl && videoEl.readyState >= 2) {
      setIsLoaded(true);
    }
  }, []);

  // Hybrid lazy loading observer
  useEffect(() => {
    if (src || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(video.videoSrc);
          observer.disconnect();
        }
      },
      {
        rootMargin: '800px',
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src, video.videoSrc]);

  // Autoplay observer
  useEffect(() => {
    const videoEl = videoRef.current;
    const containerEl = containerRef.current;

    if (!videoEl || !containerEl || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch((e) => console.log('Auto-play prevented:', e));
        } else {
          videoEl.pause();
        }
      },
      {
        threshold: 0.7, // Play when 70% visible
      }
    );

    observer.observe(containerEl);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <motion.div
      ref={containerRef}
      key={`mobile-${video.id}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px" }}
      className="group relative cursor-pointer w-[80vw] max-w-[320px] snap-center snap-always shrink-0"
      onClick={() => openModal(index)}
    >
      <div className={`aspect-[9/16] border border-neutral-800 transition-all duration-300 overflow-hidden relative rounded-xl ${!isLoaded ? 'bg-zinc-800/50 animate-pulse' : 'bg-transparent'}`}>
        {!isLoaded && (
          <div className="absolute inset-0 m-auto flex items-center justify-center">
             <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="mt-6">
        <h3 className="font-display font-bold text-2xl text-white mb-2 uppercase">{video.company}</h3>
        <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{video.description}</p>
      </div>
    </motion.div>
  );
};

const DesktopReelCard = ({ video, index, openModal, variants, isActive = false }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState(video.videoSrc); // Load all for carousel context, but could be lazy loaded

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl && videoEl.readyState >= 2) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current || !src) return;
    if (isActive) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    } else {
      videoRef.current.pause();
    }
  }, [isActive, src]);

  return (
    <motion.div
      ref={containerRef}
      key={`desktop-${video.id}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px" }}
      className={`group relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'scale-[1.15] z-10 opacity-100 mx-4' : 'scale-[0.85] z-0 opacity-40 mx-2'}`}
      onClick={() => openModal(index)}
    >
      <div className={`aspect-[9/16] border border-neutral-800 ${isActive ? 'border-[#FFCC00]' : ''} transition-all duration-700 overflow-hidden relative rounded-xl shadow-2xl ${!isLoaded ? 'bg-zinc-800/50 animate-pulse' : 'bg-transparent'}`}>
        {!isLoaded && (
          <div className="absolute inset-0 m-auto flex items-center justify-center">
             <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className={`mt-6 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2 uppercase text-[#FFCC00] text-center">{video.company}</h3>
        <p className="text-xs md:text-sm text-zinc-400 mt-1 line-clamp-2 text-center">{video.description}</p>
      </div>
    </motion.div>
  );
};

const PromoVideoCard = ({ video, index, openModal, variants, isActive = false }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState(video.videoSrc);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl && videoEl.readyState >= 2) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current || !src) return;
    if (isActive) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    } else {
      videoRef.current.pause();
    }
  }, [isActive, src]);

  return (
    <motion.div
      ref={containerRef}
      key={video.id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px" }}
      className={`group relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'scale-105 z-10 opacity-100' : 'scale-90 z-0 opacity-40'}`}
      onClick={() => openModal(index)}
    >
      <div className={`aspect-video w-full border border-neutral-800 ${isActive ? 'border-[#FFCC00]' : ''} transition-all duration-700 overflow-hidden relative rounded-xl shadow-2xl ${!isLoaded ? 'bg-zinc-800/50 animate-pulse' : 'bg-transparent'}`}>
        {!isLoaded && (
          <div className="absolute inset-0 m-auto flex items-center justify-center">
             <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className={`mt-6 transition-all duration-700 text-center ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h3 className="font-display font-bold text-lg md:text-xl text-white mb-2 uppercase text-[#FFCC00]">{video.company}</h3>
        <p className="text-xs md:text-sm text-zinc-400 mt-1 line-clamp-2">{video.description}</p>
      </div>
    </motion.div>
  );
};


export const Cases = ({ id }: { id?: string }) => {
  const [activeTab, setActiveTab] = useState<'reels' | 'promo'>('reels');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const tabs = [
    { id: 'reels', label: 'Reels' },
    { id: 'promo', label: 'Промо & YouTube' },
  ] as const;

  const currentVideos = activeTab === 'reels' ? reelsCases : promoCases;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      inViewThreshold: 0.5,
    },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Initial call
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const openModal = (index: number) => {
    setCurrentVideoIndex(index);
    setModalOpen(true);
  };

  return (
    <Section id={id} className="bg-neutral-950 text-white overflow-hidden">
      <Heading level="h2" className="text-center mb-10">
        РЕЗУЛЬТАТЫ <span className="text-[#FFCC00]">КЛИЕНТОВ</span>
      </Heading>

      <div className="flex justify-between items-center mb-12 relative w-full px-6 md:px-0">
        <div className="flex-1 hidden md:flex" />
        <div className="flex justify-center">
          <div className="bg-zinc-900/50 border border-white/10 rounded-full p-1 flex relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 active:scale-95 ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-yellow-400 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 hidden md:flex justify-end gap-3 z-20 relative">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900/80 border border-white/10 text-white hover:border-white/30 hover:text-[#FFCC00] transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900/80 border border-white/10 text-white hover:border-white/30 hover:text-[#FFCC00] transition-colors duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reels' ? (
          <motion.div
            key="reels"
            variants={tabContentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            exit="exit"
            className="flex flex-col gap-10 items-center w-full"
          >
            {/* Mobile View: Horizontal Carousel (ALL Items) */}
            <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-6 -mx-6 w-[100vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {currentVideos.map((c, index) => (
                <MobileVideoCard
                  key={`mobile-${c.id}`}
                  video={c}
                  index={index}
                  openModal={openModal}
                  variants={cardVariants}
                />
              ))}
            </div>

            {/* Desktop View: Carousel Embla */}
            <div
              className="hidden md:block w-full overflow-hidden"
              ref={emblaRef}
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
              }}
            >
              <div className="flex w-full items-center py-10">
                {currentVideos.map((c, index) => (
                  <div key={`desktop-${c.id}`} className="flex-[0_0_28%] min-w-0">
                    <DesktopReelCard
                      video={c}
                      index={index}
                      openModal={openModal}
                      variants={cardVariants}
                      isActive={index === selectedIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="promo"
            variants={tabContentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            exit="exit"
            className="flex flex-col gap-10 items-center w-full"
          >
            {/* Mobile View: Promo cards grid (existing fallback) */}
            <div className="grid md:hidden grid-cols-1 gap-6 px-6 md:px-0">
              {currentVideos.map((c, index) => (
                <PromoVideoCard
                  key={c.id}
                  video={c}
                  index={index}
                  openModal={openModal}
                  variants={cardVariants}
                />
              ))}
            </div>

            {/* Desktop View: Promo Carousel Embla */}
            <div
              className="hidden md:block w-full overflow-hidden"
              ref={emblaRef}
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
            >
              <div className="flex w-full items-center py-10">
                {currentVideos.map((c, index) => (
                  <div key={`desktop-promo-${c.id}`} className="flex-[0_0_65%] min-w-0">
                    <PromoVideoCard
                      video={c}
                      index={index}
                      openModal={openModal}
                      variants={cardVariants}
                      isActive={index === selectedIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIndex={currentVideoIndex}
        videos={currentVideos}
        orientation={activeTab === 'reels' ? 'vertical' : 'horizontal'}
      />
    </Section>
  );
};
