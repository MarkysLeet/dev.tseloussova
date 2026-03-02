import React from 'react';

interface HeadingProps {
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ level = 'h2', children, className = '' }) => {
  const Tag = level;
  const baseStyles = "font-display font-bold uppercase tracking-tight text-white";
  const sizes = {
    h1: "text-5xl md:text-7xl lg:text-8xl leading-[0.9]",
    h2: "text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12",
    h3: "text-2xl md:text-3xl mb-4",
    h4: "text-xl font-bold mb-2",
  };

  return <Tag className={`${baseStyles} ${sizes[level]} ${className}`}>{children}</Tag>;
};

export const Text: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <p className={`font-body text-gray-400 text-base md:text-lg leading-relaxed ${className}`}>{children}</p>
);
