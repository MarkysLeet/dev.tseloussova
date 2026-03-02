'use client';

import React from 'react';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Typography';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: 'Брифинг', desc: 'Созваниваемся, определяем цели и задачи контента. Анализируем нишу и формируем стратегию съёмки.' },
  { id: 2, title: 'Сценарии', desc: 'Разрабатываем индивидуальные сценарии в соответствии с поставленными целями и задачами. Согласовываем перед съёмкой.' },
  { id: 3, title: 'Съёмка', desc: 'Организуем процесс и проводим съёмочный день. За одну смену снимаем пакет из 10 видео.' },
  { id: 4, title: 'Монтаж', desc: 'Профессиональный монтаж, оформление и подготовка финального материала. Вносим согласованные правки.' },
];

export const Workflow = ({ id }: { id?: string }) => {
  return (
    <Section id={id} className="bg-[#050505] text-white overflow-hidden">
      <Heading level="h2" className="text-center mb-16 md:mb-24">
        КАК МЫ <span className="text-[#FFCC00]">РАБОТАЕМ</span>
      </Heading>

      <div className="relative max-w-6xl mx-auto">
        {/* Desktop Line - Base */}
        <div className="absolute top-[40px] left-0 right-0 h-[2px] bg-neutral-800 hidden md:block" />
        {/* Desktop Line - Animated Fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute top-[40px] left-0 h-[2px] bg-[#FFCC00] hidden md:block z-0"
        />

        {/* Mobile Line - Base */}
        <div className="absolute top-0 bottom-0 left-10 -translate-x-1/2 w-[2px] bg-neutral-800 md:hidden" />
        {/* Mobile Line - Animated Fill */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute top-0 bottom-0 left-10 -translate-x-1/2 w-[2px] bg-[#FFCC00] md:hidden z-0 origin-top"
        />

        {/* Mobile Layout (Vertical List) */}
        <div className="flex flex-col gap-8 relative z-10 md:hidden pl-0">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="flex flex-row items-start group"
            >
              {/* Step Circle */}
              <div className="w-20 h-20 shrink-0 bg-[#050505] border-2 border-[#FFCC00] text-[#FFCC00] font-display font-bold text-3xl flex items-center justify-center rounded-full group-hover:bg-[#FFCC00] group-hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(255,204,0,0.2)] z-10 relative">
                {step.id}
              </div>

              {/* Text Content */}
              <div className="ml-8 flex-1 pt-2 text-left">
                <h3 className="text-xl font-bold font-display uppercase mb-2 text-white">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Layout (Horizontal Grid) */}
        <div className="hidden md:grid grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-[#050505] border-2 border-[#FFCC00] text-[#FFCC00] font-display font-bold text-3xl flex items-center justify-center rounded-full mb-6 group-hover:bg-[#FFCC00] group-hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(255,204,0,0.2)] z-10 relative">
                {step.id}
              </div>

              <h3 className="text-xl font-bold font-display uppercase mb-4 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
