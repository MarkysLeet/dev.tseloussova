import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { Solution } from '@/components/sections/Solution';
import { AboutMe } from '@/components/sections/AboutMe';
import { Cases } from '@/components/sections/Cases';
import { Workflow } from '@/components/sections/Workflow';
import { Format } from '@/components/sections/Format';
import { FAQ } from '@/components/sections/FAQ';
import { ContactForm } from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Hero id="hero" />
      <PainPoints id="pain" />
      <Solution id="solution" />
      <AboutMe id="about" />
      <Cases id="cases" />
      <Workflow id="workflow" />
      <Format id="format" />
      <FAQ id="faq" />
      <ContactForm id="contact" />

      <footer className="py-8 px-6 md:px-12 border-t border-neutral-900 bg-[#050505] pb-32 md:pb-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-neutral-500 text-sm font-mono mb-4 md:mb-0">
          © {new Date().getFullYear()} КОНТЕНТ ПОД КЛЮЧ. <br className="md:hidden" /> Все права защищены.
        </p>
        <div className="text-xs text-zinc-500 md:text-right">
          Дизайн и разработка — Grozan Studio.
        </div>
      </footer>
    </main>
  );
}
