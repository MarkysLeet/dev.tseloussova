'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Hero = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden md:pt-20" aria-label="Главная секция">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://res.cloudinary.com/dcnwhciua/video/upload/v1771846115/hero2_wdazjm.mp4"
          poster="https://res.cloudinary.com/dcnwhciua/video/upload/so_0/v1771846115/hero2_wdazjm.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center -translate-y-12 md:translate-y-0">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-bold uppercase tracking-tighter text-5xl md:text-7xl lg:text-9xl leading-[0.9] text-white mb-8"
        >
          ПРОДАЮЩИЕ REELS <br />
          <span className="text-[#FFCC00]">ДЛЯ БИЗНЕСА</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-body text-gray-300 text-lg md:text-2xl max-w-3xl mb-12 leading-relaxed"
        >
          Генерируем поток заявок через короткие видео.
          Полный цикл производства: от стратегии до публикации.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Записаться на консультацию
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
