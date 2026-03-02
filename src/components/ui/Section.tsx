import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', containerClassName = '', children }) => {
  return (
    <section id={id} className={`w-full py-20 md:py-32 ${className}`}>
      <div className={`max-w-7xl mx-auto px-6 md:px-12 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};
