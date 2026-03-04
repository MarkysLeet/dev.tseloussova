'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { name: 'Обо мне', id: 'about' },
    { name: 'Кейсы', id: 'cases' },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0, x: "-50%" },
        hidden: { y: -100, x: "-50%" }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="hidden md:flex fixed top-4 left-1/2 z-50 w-auto max-w-5xl"
      aria-label="Основная навигация"
    >
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-lg">
        {/* Logo */}
        <button
          type="button"
          aria-label="Вернуться наверх"
          className="font-display font-bold text-xl tracking-wide cursor-pointer text-white whitespace-nowrap bg-transparent border-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          КОНТЕНТ ПОД КЛЮЧ
        </button>

        {/* Desktop Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Button */}
        <button
          onClick={() => scrollTo('contact')}
          className="bg-[#FFCC00] text-black font-bold px-5 py-2 rounded-full text-sm uppercase tracking-wide hover:bg-[#FFD633] transition-colors whitespace-nowrap"
        >
          Заявка
        </button>
      </div>
    </motion.nav>
  );
};
