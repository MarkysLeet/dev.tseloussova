'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-modal-title"
              className="bg-zinc-900 border border-neutral-800 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto modal-scroll pointer-events-auto relative shadow-2xl"
              data-lenis-prevent
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <h2 id="privacy-modal-title" className="text-2xl font-bold text-white mb-6 uppercase font-display">Политика конфиденциальности</h2>

              <div className="space-y-4 text-zinc-300 text-sm leading-relaxed font-body">
                <p>Настоящая Политика конфиденциальности (далее — Политика) действует в отношении всей информации, которую мы можем получить о Пользователе во время использования сайта и его сервисов.</p>

                <h3 className="text-lg text-[#FFCC00] font-bold mt-6 mb-2">1. Общие положения</h3>
                <p>1.1. Использование сервисов сайта означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации.</p>
                <p>1.2. В случае несогласия с этими условиями Пользователь должен воздержаться от использования сервисов.</p>

                <h3 className="text-lg text-[#FFCC00] font-bold mt-6 mb-2">2. Персональная информация Пользователей, которую обрабатывает сайт</h3>
                <p>2.1. В рамках настоящей Политики под «персональной информацией Пользователя» понимаются:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Персональная информация, которую Пользователь предоставляет о себе самостоятельно при заполнении форм обратной связи (включая имя, контактный телефон, адрес электронной почты, никнейм в Telegram).</li>
                  <li>Данные, которые автоматически передаются в процессе их использования с помощью установленного на устройстве Пользователя программного обеспечения (IP-адрес, данные файлов cookie, информация о браузере).</li>
                </ul>

                <h3 className="text-lg text-[#FFCC00] font-bold mt-6 mb-2">3. Цели обработки персональной информации Пользователей</h3>
                <p>3.1. Сайт собирает и хранит только ту персональную информацию, которая необходима для оказания услуг или исполнения соглашений и договоров с Пользователем.</p>
                <p>3.2. Персональную информацию Пользователя сайт обрабатывает в следующих целях:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Установление с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования сайта, оказания услуг, обработку запросов и заявок от Пользователя (для расчёта стоимости проектов и консультаций).</li>
                  <li>Улучшение качества работы сайта, удобства его использования, разработка новых сервисов и услуг.</li>
                </ul>

                <h3 className="text-lg text-[#FFCC00] font-bold mt-6 mb-2">4. Условия обработки персональной информации Пользователей и её передачи третьим лицам</h3>
                <p>4.1. Сайт хранит персональную информацию Пользователей в соответствии с внутренними регламентами конкретных сервисов.</p>
                <p>4.2. В отношении персональной информации Пользователя сохраняется ее конфиденциальность.</p>
                <p>4.3. Сайт вправе передать персональную информацию Пользователя третьим лицам только в случаях, предусмотренных российским или иным применимым законодательством в рамках установленной процедуры.</p>

                <h3 className="text-lg text-[#FFCC00] font-bold mt-6 mb-2">5. Реквизиты оператора персональных данных</h3>
                <p>Имя: Арина Целоусова</p>
                <p>Адрес: г. Урюпинск, Волгоградская обл.</p>
                <p>Email: ariwtsl@mail.ru</p>
                <p>Телефон: +79959190121</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
