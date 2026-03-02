import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="mb-6 w-full group">
      <label htmlFor={id} className="block text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2 group-focus-within:text-[#FFCC00] transition-colors">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full bg-[#111] border border-gray-800 px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FFCC00] transition-all duration-300 resize-y min-h-[120px] ${className}`}
        {...props}
      />
    </div>
  );
};
