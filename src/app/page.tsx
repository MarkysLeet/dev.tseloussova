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

      <footer className="py-8 text-center border-t border-neutral-900 bg-[#050505] pb-32 md:pb-8 flex flex-col items-center">
        <p className="text-neutral-500 text-sm font-mono">
          © {new Date().getFullYear()} REELS PRODUCTION. <br className="md:hidden" /> ALL RIGHTS RESERVED.
        </p>
        <div className="text-center text-xs text-zinc-500 mt-8">
          Design & Development by Grozan Studio.
        </div>
      </footer>
    </main>
  );
}
