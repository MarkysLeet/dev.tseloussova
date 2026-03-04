'use client';

import React from 'react';
import { User, Clapperboard, Layers, HelpCircle, Send } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const navItems = [
  { id: 'about', icon: User, label: 'Обо мне' },
  { id: 'cases', icon: Clapperboard, label: 'Кейсы' },
  { id: 'contact', icon: Send, label: 'Заявка', isCta: true },
  { id: 'format', icon: Layers, label: 'Формат' },
  { id: 'faq', icon: HelpCircle, label: 'Вопросы' },
];

export const MobileNavbar = () => {
  const activeId = useActiveSection(navItems.map(item => item.id));

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-lg border-t border-white/10 pb-safe" aria-label="Мобильная навигация">
      {/*
        Using grid-cols-5. The CTA is in the middle (index 2).
        Given the capsule shape is wider now, we need to ensure the grid cells
        are spaced appropriately or handled gracefully.
        grid-cols-5 divides width equally.
      */}
      <div className="grid grid-cols-5 items-center px-2 h-20 w-full max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = activeId === item.id;

          if (item.isCta) {
            return (
              <div key={item.id} className="relative h-full group">
                <button
                  onClick={() => scrollTo(item.id)}
                  aria-label={item.label}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFCC00] w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-[#FFCC00]/20 active:scale-95 transition-transform z-10"
                >
                  <item.icon className="w-8 h-8 text-black" />
                </button>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="flex flex-col items-center justify-center gap-1 h-full w-full active:scale-95 transition-transform"
                >
                  <div className="w-6 h-6" />
                  <span className="text-[#FFCC00] font-bold text-[10px] uppercase tracking-wide">
                    Заявка
                  </span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
              className="flex flex-col items-center justify-center gap-1 h-full w-full active:scale-95 transition-transform"
            >
              <item.icon
                className={`w-6 h-6 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-500'
                }`}
              />
              <span className={`text-[10px] font-medium transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-zinc-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
