'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';

const sections = [
  { id: 'hero', name: 'Главная' },
  { id: 'pain', name: 'Проблемы' },
  { id: 'solution', name: 'Решение' },
  { id: 'about', name: 'Обо мне' },
  { id: 'cases', name: 'Кейсы' },
  { id: 'workflow', name: 'Этапы' },
  { id: 'format', name: 'Формат' },
  { id: 'faq', name: 'FAQ' },
  { id: 'contact', name: 'Заявка' },
];

const NavItem = ({
  section,
  isActive,
  onClick
}: {
  section: { id: string; name: string };
  isActive: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-end gap-4 outline-none py-2 group cursor-pointer"
      aria-label={`Scroll to ${section.name}`}
    >
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: isHovered || isActive ? 1 : 0,
          x: isHovered || isActive ? 0 : 20,
          color: isActive ? '#FFCC00' : '#ffffff'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-xs font-bold uppercase tracking-widest whitespace-nowrap font-display hidden md:block"
      >
        {section.name}
      </motion.span>

      <motion.div
        initial={{ width: 20, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
        animate={{
          width: isHovered || isActive ? 40 : 20,
          backgroundColor: isActive ? '#FFCC00' : 'rgba(255, 255, 255, 0.3)'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-[2px] rounded-full"
      />
    </button>
  );
};

export const DesktopSideNav = () => {
  const activeId = useActiveSection(sections.map(s => s.id));

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-1" aria-label="Навигация по разделам">
      {sections.map((section) => (
        <NavItem
          key={section.id}
          section={section}
          isActive={activeId === section.id}
          onClick={() => scrollTo(section.id)}
        />
      ))}
    </nav>
  );
};