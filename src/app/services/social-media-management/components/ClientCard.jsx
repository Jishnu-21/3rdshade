'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const ClientCard = ({ logoSrc, name, description }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      p-4 sm:p-6 flex flex-col items-center w-full max-w-[300px] 
      h-[400px] sm:h-[420px] transition-all duration-300 ease-in-out 
      hover:-translate-y-4 hover:shadow-lg rounded-lg
      ${theme === 'dark' ? 'hover:shadow-white/10 border border-gray-800' : 'hover:shadow-black/10'}
    `}>
      <div className="relative w-full h-[140px] sm:h-[160px] mb-4 sm:mb-6 flex items-center justify-center">
        <div className={`flex items-center justify-center w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] 
          ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          {logoSrc}
        </div>
      </div>
      <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center
        ${theme === 'dark' ? 'text-white' : 'text-black'}
        transition-colors duration-300 line-clamp-2`}
      >
        {name}
      </h3>
      <p className={`text-center text-sm sm:text-base
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        transition-colors duration-300 line-clamp-6 leading-relaxed`}
      >
        {description}
      </p>
    </div>
  );
};

export default ClientCard;