import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', error, ...props }) => {
  return (
    <div className="mb-6 w-full group">
      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor={id} className={`block text-sm font-semibold uppercase tracking-wider transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#FFCC00]'}`}>
          {label}
        </label>
        {error && <span className="text-red-500 text-xs text-right">{error}</span>}
      </div>
      <input
        id={id}
        className={`w-full bg-[#111] border px-6 py-4 text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-[#FFCC00]'} ${className}`}
        {...props}
      />
    </div>
  );
};
