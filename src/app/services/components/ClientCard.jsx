'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const ClientCard = ({ logoSrc, name, description }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      p-4 sm:p-6 flex flex-col items-center w-full max-w-[277px] 
      h-auto sm:h-[402px] transition-all duration-300 ease-in-out 
      hover:-translate-y-4 hover:shadow-lg
      ${theme === 'dark' ? 'hover:shadow-white/10 border border-gray-800' : 'hover:shadow-black/10'}
    `}>
      <div className="relative w-full h-[160px] sm:h-[200px] mb-4 sm:mb-8 flex items-center justify-center">
        <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px]">
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <h3 className={`text-2xl sm:text-[26px] font-bold mb-2 sm:mb-4 text-center
        ${theme === 'dark' ? 'text-white' : 'text-black'}
        transition-colors duration-300`}
      >
        {name}
      </h3>
      <p className={`text-center text-base sm:text-[18px]
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        transition-colors duration-300`}
      >
        {description}
      </p>
    </div>
  );
};

export default ClientCard;