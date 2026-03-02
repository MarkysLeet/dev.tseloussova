'use client';

import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { sendTelegramMessage } from '../../app/actions';
import { PrivacyModal } from '../ui/PrivacyModal';

export const ContactForm = ({ id }: { id?: string }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const result = await sendTelegramMessage(null, formData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else if (result.message) {
          alert(result.message);
        } else {
          alert('Произошла ошибка при отправке формы. Попробуйте позже.');
        }
      }
    } catch (error) {
      console.error('Form error:', error);
      alert('Ошибка сети. Проверьте подключение к интернету.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id={id} className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-800/20 via-black to-black -z-10" />

      <div className="max-w-2xl mx-auto text-center mb-12">
        <Heading level="h2">ОБСУДИТЬ <span className="text-[#FFCC00]">ПРОЕКТ</span></Heading>
        <p className="text-gray-400 font-body text-lg">
          Заполните форму, и мы свяжемся с вами для бесплатной консультации.
        </p>
      </div>

      <div className="max-w-md mx-auto relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <Input
                label="Имя"
                id="name"
                name="name"
                placeholder="Как к вам обращаться?"
                required
                error={errors.name}
                onChange={() => setErrors(prev => ({ ...prev, name: '' }))}
              />

              <Input
                label="Telegram"
                id="telegram_contact"
                name="contact"
                placeholder="Ваш Telegram (@username)"
                required
                error={errors.contact}
                onChange={() => setErrors(prev => ({ ...prev, contact: '' }))}
              />

              <Textarea
                label="Проект"
                id="projectDetails"
                name="projectDetails"
                placeholder="Суть обращения / Ваш проект"
                rows={4}
              />

              <Button
                fullWidth
                type="submit"
                disabled={isLoading}
                className={isLoading ? 'opacity-70 cursor-wait' : ''}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Отправка...</span>
                  </div>
                ) : (
                  'Рассчитать стоимость'
                )}
              </Button>

              <p className="text-xs text-neutral-600 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с <button type="button" className="underline cursor-pointer text-neutral-600 bg-transparent border-none p-0 text-xs" onClick={() => setIsPrivacyModalOpen(true)} aria-label="Открыть политику конфиденциальности">политикой конфиденциальности</button> и обработкой персональных данных.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border border-[#FFCC00] bg-neutral-900/50"
            >
              <div className="w-20 h-20 bg-[#FFCC00] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,204,0,0.4)]">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-3xl uppercase text-white mb-4">Спасибо!</h3>
              <p className="font-body text-gray-300 text-lg">
                Ваша заявка принята. <br/> Мы свяжемся с вами в ближайшее время.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </Section>
  );
};
