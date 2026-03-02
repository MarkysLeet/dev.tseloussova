'use client';

import React from 'react';
import { Section } from '../ui/Section';
import { Heading, Text } from '../ui/Typography';
import { motion } from 'framer-motion';

export const Solution = ({ id }: { id?: string }) => {
  const points = [
    "Вы больше не думаете о сценариях и трендах.",
    "Оптимизируем процесс: максимум контента за одну смену.",
    "Продуманная стратегия публикаций.",
    "Качественная картинка, как у топовых блогеров.",
  ];

  return (
    <Section id={id} className="bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading level="h2" className="mb-12">
            МЫ БЕРЕМ <span className="text-[#FFCC00]">РУТИНУ НА СЕБЯ</span>
          </Heading>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <Text className="text-xl md:text-2xl mb-16 text-gray-300 max-w-3xl mx-auto">
            Наша команда выстраивает процесс так, чтобы вы тратили минимум времени, получая максимум результата. Видеомаркетинг под ключ.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left max-w-4xl mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1), ease: "easeOut" }}
              className="flex items-center space-x-4 p-4 border-l-2 border-[#FFCC00] bg-neutral-900/30"
            >
               <span className="font-display font-bold text-lg md:text-xl text-white uppercase tracking-wide">
                 {point}
               </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
