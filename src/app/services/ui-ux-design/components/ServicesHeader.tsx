'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const ServicesHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`services-header ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-16 sm:py-24 md:py-32 lg:pt-[180px] lg:pb-[180px]`}>
      <div className="container px-4 md:px-[122px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-16">
        <h2 className={`text-4xl ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-5xl md:text-6xl lg:text-[64px] font-bold`}>
        UI/UX Design 
        </h2>
        <p className={`text-[18px] sm:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-black'} max-w-md`}>
        A dynamic duo that makes your product look stunning, grabs users' attention, makes it easy to navigate, and gives users a seamless and smooth experience that makes them want to come back.
        </p>
      </div>
    </div>
  );
};

export default ServicesHeader;