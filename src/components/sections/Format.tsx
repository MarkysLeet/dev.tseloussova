'use client';

import React from 'react';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';

export const Format = ({ id }: { id?: string }) => {
  return (
    <Section id={id} className="bg-[#FFCC00] text-black text-center relative overflow-hidden !py-12 md:!py-16">
      {/* Decorative - replaced with simple gradient/pattern using CSS only if needed, or just clean color */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <h2 className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter text-black mb-4">
          10 REELS
        </h2>
        <p className="font-display font-bold text-3xl md:text-5xl uppercase tracking-widest text-black/80 mb-4">
          ЗА
        </p>
        <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-[8rem] leading-none tracking-tighter text-black mb-8">
          1 СЪЕМОЧНЫЙ ДЕНЬ
        </h2>

        <p className="font-body text-black text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Экономьте время. Мы снимаем контент оптом, чтобы вы могли заниматься бизнесом, пока ваши соцсети работают на вас.
        </p>
      </motion.div>
    </Section>
  );
};
