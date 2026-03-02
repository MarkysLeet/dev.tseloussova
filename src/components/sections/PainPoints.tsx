'use client';

import React from 'react';
import { Section } from '../ui/Section';
import { Heading, Text } from '../ui/Typography';
import { Clock, Lightbulb, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const pains = [
  {
    icon: Clock,
    title: "Тратите часы на монтаж",
    desc: "Вместо развития бизнеса вы сидите в CapCut, пытаясь склеить переходы. Результат не оправдывает затраченного времени.",
  },
  {
    icon: Lightbulb,
    title: "Заканчиваются идеи",
    desc: "Непонятно, что снимать, чтобы зацепить аудиторию. Тренды меняются слишком быстро, и вы за ними не успеваете.",
  },
  {
    icon: TrendingDown,
    title: "Ролики не продают",
    desc: "Просмотры есть, но заявок нет. Вы делаете контент ради контента, а не ради прибыли.",
  },
];

export const PainPoints = ({ id }: { id?: string }) => {
  return (
    <Section id={id} className="bg-black text-white relative border-t border-neutral-900">
      <div className="mb-16 md:mb-24 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading level="h2">ЧТО <span className="text-[#FFCC00]">ТОРМОЗИТ</span> ВАШ РОСТ?</Heading>
          <Text className="max-w-2xl mx-auto">
            Создание контента — это работа, которая требует профессионального подхода, а не "еще одной задачи" в вашем списке.
          </Text>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pains.map((pain, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
            className="border border-neutral-800 p-8 md:p-10 hover:border-[#FFCC00] transition-colors duration-300 group bg-neutral-950"
          >
            <pain.icon className="w-12 h-12 text-[#FFCC00] mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold font-display uppercase mb-4 text-white">{pain.title}</h3>
            <p className="text-gray-400 leading-relaxed font-body">{pain.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
