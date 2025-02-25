"use client";

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface TimeButtonProps {
  label: string;
  time: string;
  className?: string;
}

const TimeButton: React.FC<TimeButtonProps> = ({ label, time, className }) => {
  const { theme } = useTheme();

  return (
    <button 
      onClick={() => window.location.href = '/contact-us'}
      className={`
        ${theme === 'dark' 
          ? 'bg-black text-white border-gray-700 hover:bg-white hover:text-black hover:border-white' 
          : 'bg-white text-black border-gray-300 hover:bg-black hover:text-white hover:border-black'
        }
        border rounded-[21px] 
        px-8 py-3 text-base
        overflow-hidden relative group
        transition-all duration-200 ease-in-out
        ${className || ''}
      `}
    >
      <div className="relative z-10">
        <span className={`
          block group-hover:opacity-0 transition-opacity duration-200
          ${theme === 'dark' ? 'text-white' : 'text-black'}
        `}>
          {label}: {time}
        </span>
        <span className={`
          font-bold absolute inset-0 flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          ${theme === 'dark' ? 'text-black' : 'text-white'}
        `}>
          Contact us
        </span>
      </div>
    </button>
  );
};

export default TimeButton;
