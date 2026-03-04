'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Instagram } from 'lucide-react';

export const AboutMe = ({ id }: { id?: string }) => {
  return (
    <Section id={id} className="bg-black text-white relative overflow-hidden">
      {/* Desktop Layout: Grid 12 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
        {/* Left Column: Image (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full"
        >
          <div className="relative w-full rounded-2xl overflow-hidden h-[65vh] lg:h-auto lg:aspect-[2730/4096]">
            <Image
              src="https://res.cloudinary.com/dcnwhciua/image/upload/v1771919388/aboutme_m4yzut.jpg"
              alt="Целоусова Арина"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </motion.div>

        {/* Right Column: Text (5 cols, start 8) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
        >
          <h2 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-2">
            Целоусова Арина
          </h2>
          <div className="text-yellow-400 text-xl font-medium mb-6">
            Продюсер видеоконтента
          </div>

          <div className="text-zinc-300 leading-relaxed text-lg mb-8 space-y-6">
            <p>
              Более 5 лет в индустрии видеопроизводства и продюсирования. Опыт работы с федеральными проектами, крупными брендами и артистами. Участие в съёмках с медийными фигурами и государственными структурами.
            </p>
            <p>
              Основатель контент-производства полного цикла. Реализация системного видеоконтента для бизнеса - от концепции и сценария до съёмки и финального монтажа.
            </p>
          </div>

          <div className="mt-6 w-full md:w-auto">
            <a
              href="https://www.instagram.com/tselous.sova"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-black active:scale-95 transition-all w-full md:w-auto rounded-full font-medium"
            >
              <span className="text-lg hidden md:inline">Больше рабочего процесса</span>
              <span className="text-lg inline md:hidden">Рабочий процесс</span>
              <Instagram className="w-5 h-5" />
            </a>
            <p className="text-[10px] text-zinc-500 mt-2 max-w-sm leading-tight text-center md:text-left">
              *Instagram принадлежит компании Meta, признанной экстремистской организацией и запрещенной в РФ.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
