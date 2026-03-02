'use client';

import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Typography';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Где проходит съемка?",
    a: "Мы снимаем в студиях, в вашем офисе или на улице — зависит от сценария. Подбор локаций берем на себя."
  },
  {
    q: "Нужно ли мне готовить текст?",
    a: "Нет. Мы пишем сценарии и раскадровки. Вам нужно только утвердить их и выучить (или прочитать с суфлера на съемке)."
  },
  {
    q: "Работаете по договору?",
    a: "Конечно. Работаем официально (ИП), предоставляем все закрывающие документы."
  },
];

export const FAQ = ({ id }: { id?: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Section id={id} className="bg-[#050505] text-white">
      <Heading level="h2" className="text-center mb-16">
        ЧАСТЫЕ <span className="text-[#FFCC00]">ВОПРОСЫ</span>
      </Heading>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="border-b border-neutral-800">
            <button
              onClick={() => toggle(idx)}
              id={`faq-question-${idx}`}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              className="w-full py-6 flex justify-between items-center text-left hover:text-[#FFCC00] transition-colors focus:outline-none group"
            >
              <span className="font-display font-bold text-lg md:text-xl uppercase tracking-wide group-hover:text-[#FFCC00] transition-colors">
                {item.q}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-[#FFCC00] transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-gray-400 font-body leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};
